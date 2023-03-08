import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiCreatedResponse
} from '@nestjs/swagger';
import {
  ConflictExceptionResponse,
  NotFoundExceptionResponse,
  BadRequestExceptionResponse,
  UnauthorizedExceptionResponse
} from 'src/utils/responses/error.responses';
import { LoginUserDto } from '../dto/login-user.dto';
import { AuthService } from '../service/auth.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RegisterUserDto } from '../dto/register-user.dto';
import { AuthUserResponseAttributes } from '../response/auth-user-response-attributes';

@ApiTags('Auth')
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('login')
  @ApiOperation({
    summary: 'Login user',
    description: 'User login\n\nReturns user with token'
  })
  @ApiNotFoundResponse({
    description: '404 - User not found',
    type: NotFoundExceptionResponse
  })
  @ApiUnauthorizedResponse({
    description: '401 - Invalid credentials',
    type: UnauthorizedExceptionResponse
  })
  @ApiBadRequestResponse({
    description: '400 - Invalid password/email',
    type: UnauthorizedExceptionResponse
  })
  @ApiOkResponse({ type: AuthUserResponseAttributes })
  login(@Body() body: LoginUserDto) {
    return this.authService.loginUser(body);
  }

  @HttpCode(201)
  @Post('register')
  @ApiOperation({
    summary: 'Register user',
    description:
      'User registration\n\nCreates a new user\nReturns user with token'
  })
  @ApiCreatedResponse({ type: AuthUserResponseAttributes })
  @ApiConflictResponse({
    description: '409 - Email/Username taken',
    type: ConflictExceptionResponse
  })
  @ApiBadRequestResponse({
    description: '400 - Invalid password/email',
    type: BadRequestExceptionResponse
  })
  @ApiOkResponse({ type: AuthUserResponseAttributes })
  register(@Body() body: RegisterUserDto) {
    return this.authService.registerUser(body);
  }
}
