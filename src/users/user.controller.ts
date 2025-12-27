import {
  Controller,
  Get,
  Body,
  Post,
  Param,
  Delete,
  ParseIntPipe,
  Patch,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../questions/dto/get-question-by-pagination.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('create')
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return await this.userService.getById(id);
  }
  @Get('')
  async getByPagination(@Query() { limit = 10, page = 1 }: PaginationDto) {
    return this.userService.getAllByPagination(limit, page);
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.delete(id);
  }
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(id, updateUserDto);
  }
}
