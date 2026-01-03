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
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { UseGuards } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PaginationDto } from './dto/get-question-by-pagination.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleGuard } from '../auth/guards/role/role.guard';
import { Roles } from '../auth/decorators/role.decorator';
import { Role } from '../auth/enums/role.enum';
@UseGuards(RoleGuard)
@UseGuards(JwtAuthGuard)
@Controller('questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}
  @Roles(Role.ADMIN)
  @Post('create')
  async create(@Body() body: CreateQuestionDto) {
    return await this.questionService.create(body);
  }
  @Roles(Role.ADMIN, Role.STUDENT)
  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Question | null> {
    return await this.questionService.getById(id);
  }
  @Roles(Role.ADMIN, Role.STUDENT)
  @Get('')
  async getByPagination(@Query() { limit = 10, page = 1 }: PaginationDto) {
    return this.questionService.getAllByPagination(limit, page);
  }
  @Roles(Role.ADMIN)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.questionService.delete(id);
  }
  @Roles(Role.ADMIN)
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateQuestionDto,
  ) {
    return await this.questionService.update(id, body);
  }
}
