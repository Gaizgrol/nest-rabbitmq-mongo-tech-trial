import { ApiProperty } from '@nestjs/swagger';
import { ObjectID } from 'typeorm';

export default class GetUserResponseDto {
  @ApiProperty({
    example: 'fa50fa',
    description: "User's object identifier",
    type: String,
  })
  oid: string | ObjectID;

  @ApiProperty({ example: '123', description: "User's id" })
  id: string;

  @ApiProperty({ example: 'hello@world.com', description: "User's email" })
  email: string;

  @ApiProperty({ example: 'First', description: "User's first name" })
  firstName: string;

  @ApiProperty({ example: 'Last', description: "User's last name" })
  lastName: string;
}
