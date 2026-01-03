import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationDto } from '../questions/dto/get-question-by-pagination.dto';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '../auth/enums/role.enum';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role/role.guard';

@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Roles(Role.ADMIN)
  @Post('create')
  async create(@Body() body: CreateUserDto) {
    return await this.userService.create(body);
  }
  @Roles(Role.ADMIN, Role.STUDENT)
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return await this.userService.getById(id);
  }
  @Roles(Role.ADMIN)
  @Get('')
  async getByPagination(@Query() { limit = 10, page = 1 }: PaginationDto) {
    return this.userService.getAllByPagination(limit, page);
  }
  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.userService.delete(id);
  }
  @Roles(Role.ADMIN, Role.STUDENT)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.update(id, updateUserDto);
  }
}
