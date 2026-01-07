import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import {
  PaginationDto,
  QuestionPaginationResponseDto,
} from './dto/pagination.dto';
import { JwtUser } from '../auth/interfaces/payload.interface';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}
  async create(
    user: JwtUser,
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: {
        title: createQuestionDto.title,
      },
    });
    if (question) {
      throw new ConflictException('Question already exists');
    }
    const questionObj = this.questionRepository.create({
      title: createQuestionDto.title,
      answers: createQuestionDto.answers,
      userId: user.id,
    });
    return await this.questionRepository.save(questionObj);
  }
  async getByPk(id: number): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { id },
      relations: {
        answers: true,
        user: true,
      },
    });
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    return question;
  }
  async getByPagination(
    paginationDto: PaginationDto,
  ): Promise<QuestionPaginationResponseDto> {
    const page = paginationDto.page ?? 1;
    const limit = paginationDto.limit ?? 10;

    const skip = (page - 1) * limit;

    const [questions, total] = await this.questionRepository.findAndCount({
      skip,
      take: limit,
      order: { id: 'DESC' },
      relations: {
        answers: true,
        user: true,
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
}
