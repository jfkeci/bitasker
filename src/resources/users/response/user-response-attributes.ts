import { ApiProperty } from '@nestjs/swagger';

export class UserResponseAttributes {
  @ApiProperty()
  id: string;

  @ApiProperty()
  authState: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createdAt: string;

  @ApiProperty()
  updatedAt: string;
}
