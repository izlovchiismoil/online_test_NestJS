import { Role } from '../enums/role.enum';

export interface JwtUser {
  id: number;
  role: Role;
}
