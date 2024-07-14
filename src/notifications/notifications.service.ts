import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Notification, NotificationDocument } from './schemas/notification.schema';
import { Model } from 'mongoose';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>) {}

  create(createNotificationDto: CreateNotificationDto) {
    return this.notificationModel.create(createNotificationDto)
  }

  all(userId: string) {
    return this.notificationModel.find({ userId })
  }

  read(_id: string) {
    return this.notificationModel.updateOne({ _id }, { status: true })
  }

  noread(_id: string) {
    return this.notificationModel.updateOne({ _id }, { status: false })
  }

  delete(_id: string) {
    return this.notificationModel.deleteOne({ _id })
  }
}
