import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

const configservice = new ConfigService()

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(configservice.get('DB_URI'), { dbName: configservice.get('DB_NAME') }), 
    NotificationsModule, 
    AuthModule, 
    UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
