import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsNotEmpty()
  title?: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: Array<string>;
}
