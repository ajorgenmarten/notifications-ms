import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI, { user: process.env.DB_USER, pass: process.env.DB_PASS, dbName: process.env.DB_NAME }),
    NotificationsModule, 
    AuthModule, 
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
