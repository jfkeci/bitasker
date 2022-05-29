import { IsNotEmpty, IsNumber } from 'class-validator';

export class TaskIdParamDto {
  @IsNumber()
  @IsNotEmpty()
  taskId: number;
}
