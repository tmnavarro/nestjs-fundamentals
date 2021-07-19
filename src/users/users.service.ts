import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: any = [{ id: 1, name: 'User 1' }];

  findAll(name?: string): User[] {
    if (name) {
      return this.users.filter((user) => user.name === name);
    }
    return this.users;
  }

  findById(userId: number): User {
    return this.users.find((user) => user.id === userId);
  }

  create(createUserData: CreateUserDto): User {
    const newUser = { id: Date.now(), ...createUserData };

    this.users.push(newUser);

    return newUser;
  }
}
