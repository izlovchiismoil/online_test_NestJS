import { Controller, Get, Body, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post('create')
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }
  @Get('all')
  async getAllUsers(): Promise<User[]> {
    return await this.userService.getAllUsers();
  }
}
