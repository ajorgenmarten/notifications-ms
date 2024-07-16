import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { NotificationsService } from "./notifications/notifications.service";

@Injectable()
export class CronService {

    constructor(private readonly notificationsService: NotificationsService) { }

    @Cron(process.env.MAX_AMMOUNT_ELEMENTS)
    async handleCron() {
        console.log('send notifications')
        const a = await this.notificationsService.getLotNotifications() //("6693370ecfdc8b87691680af")
        try {
            const promises = a.map(async notificationLot => {
                const content = notificationLot.contents.join('\n')
                if (notificationLot._id.sendBy === "email") {
                    await this.notificationsService.sendByEmail(notificationLot._id.email, content)
                }
                if(notificationLot._id.sendBy === "system") {
                    await this.notificationsService.sendBySystem(notificationLot._id.userId, content)
                }
                return notificationLot
            })
            const logs = await Promise.all(promises)
            console.log('send notifications: ', logs)
        } catch (error) {
            console.log(error.message)
        }
    }

}