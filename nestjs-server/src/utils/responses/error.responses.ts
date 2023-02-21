import { ApiProperty } from '@nestjs/swagger';

class BadRequestExceptionObject {
  @ApiProperty({ default: 400 })
  code: number;

  @ApiProperty({ default: 'BadRequest' })
  title: string;

  @ApiProperty()
  message: string;
}
export class BadRequestExceptionResponse {
  @ApiProperty({ type: [BadRequestExceptionObject] })
  errors: BadRequestExceptionObject[];
}

class UnauthorizedExceptionObject {
  @ApiProperty({ default: 401 })
  code: number;

  @ApiProperty({ default: 'Unauthorized' })
  title: string;

  @ApiProperty()
  message: string;
}
export class UnauthorizedExceptionResponse {
  @ApiProperty({ type: [UnauthorizedExceptionObject] })
  errors: UnauthorizedExceptionObject[];
}

class ForbiddenExceptionObject {
  @ApiProperty({ default: 403 })
  code: number;

  @ApiProperty({ default: 'Forbidden' })
  title: string;

  @ApiProperty()
  message: string;
}
export class ForbiddenExceptionResponse {
  @ApiProperty({ type: [ForbiddenExceptionObject] })
  errors: ForbiddenExceptionObject[];
}

class NotFoundExceptionObject {
  @ApiProperty({ default: 404 })
  code: number;

  @ApiProperty({ default: 'NotFound' })
  title: string;

  @ApiProperty()
  message: string;
}
export class NotFoundExceptionResponse {
  @ApiProperty({ type: [NotFoundExceptionObject] })
  errors: NotFoundExceptionObject[];
}

class ConflictExceptionObject {
  @ApiProperty({ default: 409 })
  code: number;

  @ApiProperty({ default: 'Conflict' })
  title: string;

  @ApiProperty()
  message: string;
}
export class ConflictExceptionResponse {
  @ApiProperty({ type: [ConflictExceptionObject] })
  errors: ConflictExceptionObject[];
}

class InternalServerErrorExceptionObject {
  @ApiProperty({ default: 500 })
  code: number;

  @ApiProperty({ default: 'InternalServerError' })
  title: string;

  @ApiProperty()
  message: string;
}
export class InternalServerErrorExceptionResponse {
  @ApiProperty({ type: [InternalServerErrorExceptionObject] })
  errors: InternalServerErrorExceptionObject[];
}
