import { Controller, Post, Body, Session } from '@nestjs/common';
import { UserService } from './user.service';
import * as session from 'express-session';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto, @Session() session) {
    const user = await this.userService.login(loginUserDto);
    console.log(session);
    session.user = {
      id: user.id,
      username: user.username,
    };

    return 'success';
  }
}
