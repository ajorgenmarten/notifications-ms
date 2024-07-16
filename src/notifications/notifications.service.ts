import { Injectable } from "@nestjs/common";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { InjectModel } from "@nestjs/mongoose";
import {
  Notification,
  NotificationDocument,
} from "./schemas/notification.schema";
import { Model } from "mongoose";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<NotificationDocument>
  ) {}

  create(createNotificationDto: CreateNotificationDto) {
    const model = new this.notificationModel(createNotificationDto);

    if (
      createNotificationDto.sendBy === "system" ||
      (!process.env.MAX_WAIT_TIME && !process.env.MAX_AMMOUNT_ELEMENTS)
    ) {
      // notificacion instantanea
      model.type = "snapshot";
    } else {
      // notificacion por lote
      model.type = "lot";
    }

    if (model.type === "snapshot") {
      if (model.sendBy === "email") {
        this.sendByEmail(model.email, model.content)
      }

      if (model.sendBy === "system") {
        this.sendBySystem(model.userId, model.content)
      }

      if (model.sendBy === "sms") {
        console.log("send by sms");
      }

      if (model.sendBy === "whatsapp") {
        console.log("send by whatsapp");
      }

      if (model.sendBy === "push") {
        console.log("send by push");
      }
    }

    return model.save();
  }

  all(userId: string) {
    return this.notificationModel.find({ userId });
  }

  read(_id: string) {
    return this.notificationModel.updateOne({ _id }, { status: true });
  }

  noread(_id: string) {
    return this.notificationModel.updateOne({ _id }, { status: false });
  }

  delete(_id: string) {
    return this.notificationModel.deleteOne({ _id });
  }

  sendByEmail(email, content) {
    console.log(`${email}: ${content}`)
  }

  sendBySystem(userId, content) {
    console.log(`${userId}: ${content}`)
  }

  countNotificationsByLot(notification: NotificationDocument) {
    const filterQuery = {
      eventName: notification.eventName,
      sendBy: notification.sendBy,
      email: undefined,
      userId: undefined
    }
    if (notification.sendBy == "email") {
      filterQuery.email = notification.email
    }
    else {
      filterQuery.userId = notification.userId
    }

    return this.notificationModel.find(filterQuery)
  }

  async getLotNotifications() {
    const notifications = this.notificationModel
      .aggregate([
        { $match: { type: "lot", status: false } },
        {
          $group: {
            _id: {
              eventName: "$eventName",
              sendBy: "$sendBy",
              email: "$email",
              userId: "$userId",
            },
            contents: {
              $push: "$content",
            },
          },
        },
      ])
      .exec();
    return await notifications;
  }
}
