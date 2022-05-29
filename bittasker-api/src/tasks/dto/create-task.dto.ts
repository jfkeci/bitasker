import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  createdBy: number;
  @IsString()
  @IsNotEmpty()
  title: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  tags?: Array<string>;
  @IsNumber()
  @IsOptional()
  parent?: number;
}
