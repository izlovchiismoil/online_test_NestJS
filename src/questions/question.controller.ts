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
@UseGuards(JwtAuthGuard)
@Controller('questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}
  @Post('create')
  async create(@Body() body: CreateQuestionDto) {
    return await this.questionService.create(body);
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Question | null> {
    return await this.questionService.getById(id);
  }
  @Get('')
  async getByPagination(@Query() { limit = 10, page = 1 }: PaginationDto) {
    return this.questionService.getAllByPagination(limit, page);
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.questionService.delete(id);
  }
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateQuestionDto,
  ) {
    return await this.questionService.update(id, body);
  }
}
