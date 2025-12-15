import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

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
    return await this.userRepository.save(userObj);
  }
  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
