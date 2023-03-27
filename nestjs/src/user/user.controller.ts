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

@Controller('api')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  async createUser(@Body() createUserDto: CreateUserRequestDto) {
    const createdUser = this.userService.createUser(createUserDto);
    return createdUser;
  }

  @Get('user/:userId')
  async getUser(@Param('userId') userId: string) {
    const user = await this.userService.getUser(userId);
    return user;
  }

  @Get('user/:userId/avatar')
  @Header('Content-Type', 'text/plain')
  async getAvatar(@Param('userId') userId: string) {
    const base64File = await this.userService.getAvatar(userId);
    return base64File;
  }

  @Delete('user/:userId/avatar')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAvatar(@Param('userId') userId: string) {
    await this.userService.removeAvatar(userId);
  }
}
