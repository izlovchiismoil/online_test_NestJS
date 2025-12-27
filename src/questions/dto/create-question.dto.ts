import { IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  title: string;
  @IsString()
  trueAnswer: string;
  @IsString()
  falseAnswer1: string;
  @IsString()
  falseAnswer2: string;
  @IsString()
  falseAnswer3: string;
}
