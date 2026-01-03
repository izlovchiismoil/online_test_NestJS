import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user: User | null = await this.userRepository.findOne({
      where: {
        username: createUserDto.username,
      },
    });
    if (user) {
      throw new ConflictException('User already exists');
    }
    const userObj = this.userRepository.create(createUserDto);
    userObj.password = await bcrypt.hash(createUserDto.password, 10);
    const savedUser = await this.userRepository.save(userObj);
    if (!savedUser) {
      throw new BadRequestException('User is not created');
    }
    const newUser = await this.userRepository.findOne({
      where: { id: savedUser.id },
    });
    if (!newUser) {
      throw new NotFoundException('User does not exist');
    }
    return newUser;
  }
  async getById(id: number): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  async getAllByPagination(limit: number, page: number) {
    const skip: number = (page - 1) * limit;
    const [users, total] = await this.userRepository.findAndCount({
      skip,
      take: limit,
      order: {
        id: 'DESC',
      },
    });
    return {
      data: users,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
  async delete(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('User not removed');
    }
  }
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (updateUserDto.password?.length) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    } else {
      delete updateUserDto.password;
    }
    Object.assign(user, updateUserDto);

    const updated = await this.userRepository.save(user);
    if (!updated) {
      throw new NotFoundException('User is not updated');
    }
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    if (!updatedUser) {
      throw new NotFoundException('User is not updated');
    }
    return updatedUser;
  }
}
