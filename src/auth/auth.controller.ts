import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, ResponseLoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() registerData: RegisterDto) {
    return this.authService.register(registerData);
  }

  @ApiCreatedResponse({
    type: ResponseLoginDto,
    description: 'Return auth user and Barer token',
  })
  @Post('/login')
  async login(@Body() credential: LoginDto): Promise<ResponseLoginDto> {
    return this.authService.login(credential);
  }
}
