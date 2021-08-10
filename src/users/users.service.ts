import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(createUserData: RegisterDto): Promise<Partial<User>> {
    return this.userModel.create(createUserData);
  }

  async findById(userId: string): Promise<User> {
    return this.userModel.findOne({ _id: userId });
  }

  async findByLogin(email: string): Promise<Partial<User>> {
    return this.userModel.findOne({ email }, ['_id', 'password']);
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({});
  }
}
