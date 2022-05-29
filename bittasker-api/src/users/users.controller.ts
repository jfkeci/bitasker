import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserIdParamDto } from './dto/user-id.param.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  findOne(@Param() param: UserIdParamDto) {
    return this.usersService.findOne(param.userId);
  }

  @Patch(':userId')
  update(@Param() param: UserIdParamDto, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(param.userId, updateUserDto);
  }

  @Delete(':userId')
  remove(@Param() param: UserIdParamDto) {
    return this.usersService.remove(param.userId);
  }
}
