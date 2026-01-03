import { IsString } from 'class-validator';
import { Role } from '../../auth/enums/role.enum';

export class CreateUserDto {
  @IsString()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  username: string;
  @IsString()
  password: string;
  @IsString()
  role: Role;
}
