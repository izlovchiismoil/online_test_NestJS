import { Injectable } from '@nestjs/common';

@Injectable()
export class QuestionService {
  createQuestion(): string {
    return 'Creates new question!';
  }
}
