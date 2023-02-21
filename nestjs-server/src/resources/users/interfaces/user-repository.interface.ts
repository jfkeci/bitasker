import { Prisma, PrismaPromise, user } from '@prisma/client';

export interface IUsersService {
  _findUnique(args: Prisma.userFindUniqueArgs): Promise<user | null>;

  _findFirst(args: Prisma.userFindFirstArgs): Promise<user | null>;

  _findMany(args: Prisma.userFindManyArgs): Promise<user[]>;

  _create(args: Prisma.userCreateArgs): Promise<user>;

  _update(args: Prisma.userUpdateArgs): Promise<user>;

  _upsert(args: Prisma.userUpsertArgs): Promise<user>;

  _delete(args: Prisma.userDeleteArgs): Promise<user>;

  _updateMany(
    args: Prisma.userUpdateManyArgs
  ): Promise<PrismaPromise<Prisma.BatchPayload>>;

  _deleteMany(
    args: Prisma.userDeleteManyArgs
  ): Promise<PrismaPromise<Prisma.BatchPayload>>;

  _aggregate(
    args: Prisma.UserAggregateArgs
  ): Promise<
    PrismaPromise<Prisma.GetUserAggregateType<Prisma.UserAggregateArgs>>
  >;
}
