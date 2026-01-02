import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: {
        title: createRoleDto.title,
      },
    });
    if (role) {
      throw new ConflictException('Role already exists');
    }
    const roleObj = this.roleRepository.create(createRoleDto);
    await this.roleRepository.save(roleObj);
    const newRole = await this.roleRepository.findOne({
      where: {
        title: createRoleDto.title,
      },
    });
    if (!newRole) {
      throw new NotFoundException('Role is not created');
    }
    return newRole;
  }
  async getAll(): Promise<Role[]> {
    const roles = await this.roleRepository.find();
    if (!roles) {
      throw new NotFoundException('Role not found');
    }
    return roles;
  }
  async getById(id: number): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }
  async delete(id: number): Promise<void> {
    const result = await this.roleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Role not found');
    }
  }
  async update(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.roleRepository.findOne({
      where: {
        id: id,
      },
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    Object.assign(role, updateRoleDto);
    return await this.roleRepository.save(role);
  }
}
