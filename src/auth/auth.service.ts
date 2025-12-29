import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from './dto/auth.dto';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}
  async login(payloadDto: AuthPayloadDto) {
    const user: User | null = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username = :username', { username: payloadDto.username })
      .getOne();
    if (!user) throw new UnauthorizedException('Username or password required');
    const isMatch = await bcrypt.compare(payloadDto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Username or password required');
    }
    return {
      access_token: this.jwtService.sign({
        id: user.id,
      }),
    };
  }
}
