import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from 'src/users/entities/user.entity';
import { UserSchema } from 'src/users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guard/jwt.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    }]),
    JwtModule.register({
      secret: process.env.SECRET_TOKEN,
    }),
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})


export class AuthModule {}
