import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskIdParamDto } from './dto/task-id-param.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get('/projects')
  findAll() {
    return this.tasksService.findAll({ parent: null });
  }

  @Get('/:taskId/subtasks/')
  findAllTaskSubtasks(@Param() param: TaskIdParamDto) {
    return this.tasksService.findAll({
      id: param.taskId,
      include: { tasks: true },
    });
  }

  @Get(':taskId')
  findOne(@Param() param: TaskIdParamDto) {
    return this.tasksService.findOne(param.taskId);
  }

  @Patch(':taskId')
  update(@Param() param: TaskIdParamDto, @Body() data: UpdateTaskDto) {
    return this.tasksService.update(param.taskId, data);
  }

  @Delete(':taskId')
  remove(@Param() param: TaskIdParamDto) {
    return this.tasksService.remove(param.taskId);
  }
}
