import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    let user = await this._findUnique({ email: data.email });

    if (user) throw new ConflictException('Email taken');

    user = await this._findUnique({ username: data.username });

    if (user) throw new ConflictException('Email taken');

    const newUser = this._createOne(data);

    if (!newUser) throw new BadRequestException('Failed to create user');

    return newUser;
  }

  async _findUnique(query: Record<string, any>) {
    return await this.prisma.users.findUnique({ where: query });
  }

  async _createOne(data: CreateUserDto) {
    return await this.prisma.users.create({ data: data });
  }

  async findAll() {
    const users = await this._findAll({});

    if (!users) throw new NotFoundException('No user found');

    return users;
  }

  async _findAll(query: Record<string, any>) {
    return await this.prisma.users.findMany({ where: query });
  }

  async _deleteOne(query: Record<string, any>) {
    return await this.prisma.users.delete({ where: query });
  }

  async _updateOne(query: Record<string, any>, data: UpdateUserDto) {
    return await this.prisma.users.update({ where: query, data: data });
  }

  async findOne(id: number) {
    const user = await this._findUnique({ id });

    if (!user) throw new NotFoundException('No user found');

    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    let user;

    if (data.email) {
      user = await this._findUnique({ email: data.email });

      if (user) throw new ConflictException('Email taken');
    }

    if (data.username) {
      user = await this._findUnique({ username: data.username });

      if (user) throw new ConflictException('Email taken');
    }

    const updatedUser = this._updateOne({ id }, data);

    if (!updatedUser) throw new BadRequestException('Failed to create user');

    return updatedUser;
  }

  async remove(id: number) {
    const deletedUser = await this._deleteOne({ id });

    if (!deletedUser) throw new BadRequestException('Failed to delete user');

    return deletedUser;
  }
}
