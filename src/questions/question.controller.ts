import {
  Body,
  Controller, Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { UseGuards } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role/role.guard';
import { Role } from '../auth/enums/role.enum';
import { PaginationDto } from './dto/pagination.dto';
import { Roles } from '../auth/decorators/role.decorator';
import type { JwtUser } from '../auth/interfaces/payload.interface';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.STUDENT, Role.ADMIN)
  @Post('create')
  async create(@CurrentUser() user: JwtUser, @Body() body: CreateQuestionDto) {
    return await this.questionService.create(user, body);
  }
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.STUDENT, Role.ADMIN)
  @Get(':id')
  async getByPk(@Param('id', ParseIntPipe) id: number) {
    return await this.questionService.getByPk(id);
  }
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Get('')
  getByPagination(@Query() paginationDto: PaginationDto) {
    return this.questionService.getByPagination(paginationDto);
  }
  @UseGuards(RoleGuard)
  @UseGuards(JwtAuthGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.questionService.delete(id);
  }
}
