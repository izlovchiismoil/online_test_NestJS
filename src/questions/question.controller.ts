import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { Question } from './entities/question.entity';
import { UpdateQuestionDto } from './dto/update-question.dto';
@Controller('questions')
export class QuestionController {
  constructor(private questionService: QuestionService) {}
  @Post('create')
  async create(@Body() body: CreateQuestionDto) {
    return await this.questionService.create(body);
  }
  @Get(':id')
  async getById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Question | null> {
    return await this.questionService.getById(id);
  }
  @Get('')
  async getAll(): Promise<Question[]> {
    return await this.questionService.getAll();
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
