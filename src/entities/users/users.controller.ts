import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Post('register')
  async register(@Body() dto: AuthDto) {
    const oldUser = await this.userService.findOne(dto.email);
    if (oldUser) {
      throw new BadRequestException('Пользователь уже зарегистрирован');
    }
    return this.userService.createUser(dto);
  }
}
