import { Controller, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
@Controller('question')
export class QuestionController {
  constructor(private questionService: QuestionService) {}
  @Post('create')
  createQuestion(): string {
    return this.questionService.createQuestion();
  }
}
