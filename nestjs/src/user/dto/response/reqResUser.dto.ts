import { ApiProperty } from '@nestjs/swagger';

export default class ReqResUserDto {
  @ApiProperty({ example: '123', description: "User's id" })
  id: string;

  @ApiProperty({ example: 'hello@world.com', description: "User's email" })
  email: string;

  @ApiProperty({ example: 'First', description: "User's first name" })
  first_name: string;

  @ApiProperty({ example: 'Last', description: "User's last name" })
  last_name: string;

  @ApiProperty({
    example: 'https://reqres.in/img/faces/4-image.jpg',
    description: "User's avatar URL",
  })
  avatar: string;
}
