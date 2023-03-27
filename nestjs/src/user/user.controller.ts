import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Get,
  Header,
} from '@nestjs/common';
import { UserService } from './user.service';
import CreateUserRequestDto from './dto/request/createUser.dto';

import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import GetUserResponseDto from './dto/response/getUser.dto';
import ReqResUserDto from './dto/response/reqResUser.dto';

const { CONFLICT, OK, NOT_FOUND, NO_CONTENT } = HttpStatus;

@ApiTags('User')
@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @ApiOperation({
    summary:
      'Stores an user in the database. After the creation, sends an email and rabbit event.',
  })
  @ApiBody({ type: CreateUserRequestDto })
  @ApiResponse({
    status: OK,
    description: 'User created successfully.',
    type: GetUserResponseDto,
  })
  @ApiResponse({ status: CONFLICT, description: 'User already exists.' })
  async createUser(@Body() createUserDto: CreateUserRequestDto) {
    const createdUser = this.userService.createUser(createUserDto);
    return createdUser;
  }

  @Get('user/:userId')
  @ApiOperation({
    summary:
      'Retrieves data from https://reqres.in/api/users/{userId} and returns a user in JSON representation.',
  })
  @ApiResponse({
    status: OK,
    description: 'User found.',
    type: ReqResUserDto,
  })
  @ApiResponse({ status: NOT_FOUND, description: 'User not found.' })
  async getUser(@Param('userId') userId: string) {
    const user = await this.userService.getUser(userId);
    return user;
  }

  @Get('user/:userId/avatar')
  @ApiOperation({
    summary:
      "Retrieves an user's avatar. If image is not present in the database, retrieve it from user's avatar URL and store it in the filesystem and in the database.",
  })
  @ApiResponse({ status: OK, description: 'User found.' })
  @ApiResponse({ status: NOT_FOUND, description: 'User not found.' })
  @Header('Content-Type', 'text/plain')
  async getAvatar(@Param('userId') userId: string) {
    const base64File = await this.userService.getAvatar(userId);
    return base64File;
  }

  @Delete('user/:userId/avatar')
  @ApiOperation({
    summary: 'Removes the file from the database and from the filesystem.',
  })
  @ApiResponse({
    status: NO_CONTENT,
    description: 'Avatar removed successfully.',
  })
  @ApiResponse({ status: NOT_FOUND, description: 'Avatar not found.' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAvatar(@Param('userId') userId: string) {
    await this.userService.removeAvatar(userId);
  }
}
