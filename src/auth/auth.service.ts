import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/entities/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email);

    if (!user) {
      throw new UnauthorizedException(`User (${email}) is not found`);
    }
    const isCorrectPassword = await compare(password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new UnauthorizedException(`password is incorrect`);
    }
    return { email: user.email };
  }
  async signIn(email: string) {
    const payload = email;
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
