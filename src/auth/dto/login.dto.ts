import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class ResponseLoginDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  token: string;
}
