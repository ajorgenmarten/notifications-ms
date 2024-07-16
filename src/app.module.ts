import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron';
import { NotificationsService } from './notifications/notifications.service';
import { Notification, NotificationSchema } from './notifications/schemas/notification.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URI, { user: process.env.DB_USER, pass: process.env.DB_PASS, dbName: process.env.DB_NAME }),
    NotificationsModule, 
    AuthModule, 
    UsersModule,
    MongooseModule.forFeature([{ name: Notification.name, schema: NotificationSchema }])
  ],
  controllers: [AppController],
  providers: [AppService, NotificationsService, CronService],
})
export class AppModule {}
