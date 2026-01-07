import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Answer } from './entities/answer.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Question, Answer])],
  providers: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionModule {}
