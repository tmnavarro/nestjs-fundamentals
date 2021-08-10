import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @ApiProperty({ required: false })
  _id?: string;

  @ApiProperty()
  @Prop()
  firstName: string;

  @ApiProperty()
  @Prop()
  lastName: string;

  @ApiProperty()
  @Prop({ unique: true })
  email: string;

  @ApiProperty({ writeOnly: true })
  @Prop({ select: false })
  password: string;
}

export const userSchema = SchemaFactory.createForClass(User);
