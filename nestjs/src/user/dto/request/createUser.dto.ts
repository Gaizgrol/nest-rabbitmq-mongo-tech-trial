import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export default class CreateUserRequestDto {
  @ApiProperty({ example: 'hello@world.com', description: "User's email" })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'First', description: "User's first name" })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Last', description: "User's last name" })
  @IsNotEmpty()
  lastName: string;
}
