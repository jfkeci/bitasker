import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserResponseAttributes } from 'src/resources/users/response/user-response-attributes';

export class AuthUserResponseAttributes extends PickType(
  UserResponseAttributes,
  [
    'id',
    'authState',
    'firstName',
    'lastName',
    'username',
    'email',
    'createdAt',
    'updatedAt'
  ]
) {
  @ApiProperty()
  authToken: string;
}
