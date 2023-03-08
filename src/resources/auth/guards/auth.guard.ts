import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  InternalServerErrorException
} from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { WinstonLogger, WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UsersService } from 'src/resources/users/service/users.service';

export interface JwtPayloadId extends jwt.JwtPayload {
  id?: string;
  notifications?: boolean;
}

@Injectable()
export class AuthGuard implements CanActivate {
  private currentUser;

  constructor(
    private readonly userService: UsersService,
    @Inject(WINSTON_MODULE_PROVIDER) private logger: WinstonLogger
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const contextName = context.getClass().name;
    const req = context.switchToHttp().getRequest();

    if (!this.ignoreAuth(contextName)) {
      const id = getIdFromToken(req);

      if (!id) throw new UnauthorizedException();

      const result = await this.authUser(id);

      if (this.currentUser) req.currentUser = this.currentUser;

      return result;
    }

    return true;
  }

  /**
   * Add controllers that AuthGuard will ignore
   *
   * @param className - string
   * @returns boolean
   */
  private ignoreAuth(className: string): boolean {
    const ignoredControllers = ['AuthController'];

    return (
      process.env.NODE_ENV === 'development' &&
      ignoredControllers.includes(className)
    );
  }

  private async authUser(userId: string | null): Promise<boolean> {
    if (!userId) return false;

    try {
      const user = await this.userService._findFirst({
        where: { id: userId }
      });

      if (user) this.currentUser = { ...user };

      if (!user) return false;
    } catch (err) {
      this.logger.error(err);
      return false;
    }

    return true;
  }
}

export const getIdFromToken = (req: Request): string | null | undefined => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    return null;
  }

  if (token) {
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtPayloadId;

      if (decoded.notifications) throw new UnauthorizedException();

      return decoded.id;
    } catch (error) {
      throw new InternalServerErrorException(`Failed parsing jwt|${error}`);
    }
  }

  return null;
};
