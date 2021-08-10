import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginData: LoginDto) {
    const user = await this.userService.findByLogin(loginData.email);

    if (!user || !bcrypt.compareSync(loginData.password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.jwtService.sign({ userId: user._id });

    return {
      user: await this.userService.findByEmail(loginData.email),
      token,
    };
  }

  async register(registerData: RegisterDto) {
    const user = await this.userService.findByEmail(registerData.email);

    if (user) {
      throw new BadRequestException('Email already registered');
    }

    registerData.password = await bcrypt.hash(registerData.password, 10);

    return this.userService.create(registerData);
  }
}
