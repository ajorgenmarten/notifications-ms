import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotificationsModule } from './notifications/notifications.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://cocodev:cocodev@localhost:27017'), NotificationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
