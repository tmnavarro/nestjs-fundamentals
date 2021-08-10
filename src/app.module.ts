import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
