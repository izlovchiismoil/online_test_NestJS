import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsNumber()
  role: number;
}
