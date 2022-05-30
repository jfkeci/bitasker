import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTaskDto) {
    const user = await this.prisma.users.findUnique({
      where: { id: data.createdBy },
    });

    if (!user) throw new NotFoundException('No user found');

    const task = await this._createOne(data);

    if (!task) throw new BadRequestException('Failed to create task');

    return task;
  }

  async findAll(query: Record<string, any>, include?: Record<string, any>) {
    const tasks = await this.prisma.tasks.findMany({
      where: query,
      include: include ?? null,
    });

    if (!tasks) throw new NotFoundException('No tasks found');

    return tasks;
  }

  async findTaskSubtasks(id: number) {
    const tasks = await this._findAll({ id }, { tasks: true });

    if (!tasks) throw new NotFoundException('No tasks found');

    return tasks;
  }

  async findOne(id: number) {
    const task = await this._findOne({ id });

    if (!task) throw new NotFoundException('No task found');

    return task;
  }

  async update(id: number, data: UpdateTaskDto) {
    const updatedTask = await this._updateOne({ id }, data);

    if (!updatedTask) throw new BadRequestException('Failed to update task');

    return updatedTask;
  }

  async remove(id: number) {
    const deletedTask = await this._deleteOne({ id });

    if (!deletedTask) throw new BadRequestException('Failed to delete task');

    return deletedTask;
  }

  async _createOne(data: CreateTaskDto) {
    return await this.prisma.tasks.create({ data: data });
  }

  async _findAll(query: Record<string, any>, include?: Record<string, any>) {
    return await this.prisma.tasks.findMany({
      where: query,
      include: include ?? {},
    });
  }

  async _findOne(query: Record<string, any>) {
    return await this.prisma.tasks.findUnique({ where: query });
  }

  async _findFirst(query: Record<string, any>) {
    return await this.prisma.tasks.findFirst({ where: query });
  }

  async _deleteOne(query: Record<string, any>) {
    return await this.prisma.tasks.delete({ where: query });
  }

  async _updateOne(query: Record<string, any>, data: Record<string, any>) {
    return await this.prisma.tasks.update({ where: query, data: data });
  }
}
