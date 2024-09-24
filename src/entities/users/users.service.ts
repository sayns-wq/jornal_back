import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { genSaltSync, hashSync } from 'bcryptjs';
import { Role } from 'src/auth/roles';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async createUser(userData: AuthDto): Promise<User | undefined> {
    const salt = genSaltSync(10);
    const newUser = this.userRepository.create({
      email: userData.email,
      passwordHash: hashSync(userData.password, salt),
      role: Role.User,
      username: 'anonim',
    });
    await this.userRepository.save(newUser);
    return newUser;
  }
}
