import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}
  async create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question: Question | null = await this.questionRepository.findOne({
      where: { title: createQuestionDto.title },
    });
    if (question) {
      throw new ConflictException('Question already exists');
    }
    const questionObj = this.questionRepository.create(createQuestionDto);
    const savedQuestion = await this.questionRepository.save(questionObj);
    if (!savedQuestion) throw new NotFoundException('Question is not created');
    const newQuestion = await this.questionRepository.findOne({
      where: { id: savedQuestion.id },
    });
    if (!newQuestion) throw new NotFoundException('Question is not created');
    return newQuestion;
  }
  async getAll(): Promise<Question[]> {
    const questions: Question[] = await this.questionRepository.find();
    if (!questions || questions.length === 0) {
      throw new NotFoundException('Questions not found');
    }
    return questions;
  }
  async getById(id: number): Promise<Question | null> {
    const question: Question | null = await this.questionRepository.findOne({
      where: { id },
    });
    if (!question) throw new NotFoundException('Question not found');
    return question;
  }
  async update(
    id: number,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const question: Question | null = await this.questionRepository.findOne(
      {
      where: { id },
    });
    if (!question) throw new NotFoundException('Question not found');
    Object.assign(question, updateQuestionDto);
    return await this.questionRepository.save(question);
  }
  async delete(id: number): Promise<void> {
    const result = await this.questionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Question not found');
    }
  }
}
