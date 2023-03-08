import {
  IsEmail,
  Matches,
  IsString,
  MinLength,
  IsOptional,
  IsNotEmpty
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Match } from 'src/utils/decorators/match.decorator';

export class RegisterUserDto {
  @IsEmail({ message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email required' })
  @ApiProperty({ required: true })
  email: string;

  @IsOptional()
  @IsString({ message: 'Invalid first name' })
  @Matches(/^[a-zA-Z0-9_.]+$/, {
    message: 'First name should include only letters, numbers, "_" and "."'
  })
  @ApiProperty({ required: true })
  firstName?: string;

  @IsOptional()
  @IsString({ message: 'Invalid last name' })
  @Matches(/^[a-zA-Z0-9_.]+$/, {
    message: 'Last name should include only letters, numbers, "_" and "."'
  })
  @ApiProperty({ required: true })
  lastName?: string;

  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Password requires at least one upper case letter, one lower case letter, one digit and a special character'
  })
  @MinLength(8, { message: 'Requires minimally 8 characters' })
  @IsNotEmpty({ message: 'Password required' })
  @IsString({ message: 'Invalid password' })
  @ApiProperty({ required: true })
  password: string;

  @IsNotEmpty({ message: 'Password confirmation required' })
  @Match('password', { message: 'Password confirmation must match password' })
  @ApiProperty({ required: true, description: 'Must match password' })
  confirmPassword: string;
}
