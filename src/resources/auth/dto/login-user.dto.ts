import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsEmail({ message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email required' })
  @ApiProperty({ required: true })
  email: string;

  @MinLength(8, { message: 'Minimal password length is 8 characters' })
  @IsNotEmpty({ message: 'Password required' })
  @IsString({ message: 'Invalid password' })
  @ApiProperty({ required: true })
  password: string;
}
