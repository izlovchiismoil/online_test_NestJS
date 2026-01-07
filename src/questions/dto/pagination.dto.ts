import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Question } from '../entities/question.entity';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;
}

export class PaginationMetaDto {
  @IsInt()
  @Min(0)
  total: number;

  @IsInt()
  @Min(1)
  page: number;

  @IsInt()
  @Min(1)
  limit: number;

  @IsInt()
  @Min(1)
  totalPages: number;
}

export class QuestionPaginationResponseDto {
  data: Question[];
  meta: PaginationMetaDto;
}
