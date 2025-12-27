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
    return await this.questionRepository.save(questionObj);
  }
  async getAllByPagination(limit: number, page: number) {
    const skip: number = (page - 1) * limit;
    const [questions, total] = await this.questionRepository.findAndCount({
      skip,
      take: limit,
      order: {
        id: 'DESC',
      },
    });
    return {
      data: questions,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
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
    const question: Question | null = await this.questionRepository.findOne({
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
