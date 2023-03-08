import {
  Injectable,
  ConflictException,
  UnauthorizedException
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { genJwt } from 'src/utils/gen-token.utils';
import { LoginUserDto } from '../dto/login-user.dto';
import { RegisterUserDto } from '../dto/register-user.dto';
import { UsersService } from 'src/resources/users/service/users.service';

@Injectable()
export class AuthService {
  private jwtConfig;

  constructor(
    private readonly config: ConfigService,
    private readonly userService: UsersService
  ) {
    this.jwtConfig = this.config.get<{ secret: string; expiry: number }>('jwt');
  }

  async loginUser(data: LoginUserDto) {
    const user = await this.userService._findFirst({
      where: { email: data.email }
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await genJwt(user.id, this.jwtConfig.secret, false);

    return { ...user, password: null, token };
  }

  async registerUser(data: RegisterUserDto) {
    let existingUser = await this.userService._findFirst({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new ConflictException('Email taken');
    }

    data.password = await bcrypt.hash(data.password, 10);

    const user = await this.userService.create({
      data: {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName
      }
    });

    const token = await genJwt(user.id, this.jwtConfig.secret, false);

    return { ...user, password: null, token };
  }
}
