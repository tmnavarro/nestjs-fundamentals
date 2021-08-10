import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from './schemas/user.schema';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOkResponse({ type: User, isArray: true })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  getUsers(@Request() req): Promise<User[]> {
    console.log(req.user);
    return this.userService.findAll();
  }

  @ApiOkResponse({ type: User })
  @ApiNotFoundResponse()
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not Found');
    }
    return user;
  }

  @ApiCreatedResponse({
    type: User,
    description: 'Return created user.',
  })
  @ApiBadRequestResponse()
  @Post()
  async createUser(
    @Body() createUserData: RegisterDto,
  ): Promise<Partial<User>> {
    const user = await this.userService.findByEmail(createUserData.email);

    if (user) {
      throw new BadRequestException('User already exist.');
    }
    return this.userService.create(createUserData);
  }
}
