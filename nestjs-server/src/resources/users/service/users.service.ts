import {
  Injectable,
  NotFoundException,
  BadRequestException
} from '@nestjs/common';
import { Prisma, PrismaPromise, user } from '@prisma/client';
import { PrismaService } from 'src/utils/prisma/service/prisma.service';
import { IUsersService } from '../interfaces/user-repository.interface';

@Injectable()
export class UsersService implements IUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findFirst(args: Prisma.userFindFirstArgs): Promise<user | null> {
    const user = await this._findFirst(args);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async create(args: Prisma.userCreateArgs): Promise<user> {
    const user = await this._create(args);

    if (!user) {
      throw new BadRequestException('Failed creating user');
    }

    return user;
  }

  async _findUnique(args: Prisma.userFindUniqueArgs): Promise<user | null> {
    return await this.prisma.user.findUnique(args);
  }

  async _findFirst(args: Prisma.userFindFirstArgs): Promise<user | null> {
    return await this.prisma.user.findFirst(args);
  }

  async _findMany(args: Prisma.userFindManyArgs): Promise<user[]> {
    return await this.prisma.user.findMany(args);
  }

  async _create(args: Prisma.userCreateArgs): Promise<user> {
    return await this.prisma.user.create(args);
  }

  async _update(args: Prisma.userUpdateArgs): Promise<user> {
    return await this.prisma.user.update(args);
  }

  async _updateMany(
    args: Prisma.userUpdateManyArgs
  ): Promise<PrismaPromise<Prisma.BatchPayload>> {
    return await this.prisma.user.updateMany(args);
  }

  async _upsert(args: Prisma.userUpsertArgs): Promise<user> {
    return await this.prisma.user.upsert(args);
  }

  async _delete(args: Prisma.userDeleteArgs): Promise<user> {
    return await this.prisma.user.delete(args);
  }

  async _deleteMany(
    args: Prisma.userDeleteManyArgs
  ): Promise<PrismaPromise<Prisma.BatchPayload>> {
    return await this.prisma.user.deleteMany(args);
  }

  async _aggregate(
    args: Prisma.UserAggregateArgs
  ): Promise<
    PrismaPromise<Prisma.GetUserAggregateType<Prisma.UserAggregateArgs>>
  > {
    return await this.prisma.user.aggregate(args);
  }
}
