import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument, ObjectId, SchemaTypes } from "mongoose"

export type NotificationDocument = HydratedDocument<Notification>


@Schema({ versionKey: false })
export class Notification {
    @Prop()
    eventName: string

    @Prop()
    type: "snapshot" | "lot"

    @Prop({ type: Boolean, default: false })
    status: boolean

    @Prop()
    sendBy: 'system' | 'email' | 'push' | 'sms' | 'whatsapp'

    @Prop()
    content: string

    @Prop()
    email: string

    @Prop({type: SchemaTypes.ObjectId})
    userId: ObjectId
}

export const NotificationSchema = SchemaFactory.createForClass(Notification)