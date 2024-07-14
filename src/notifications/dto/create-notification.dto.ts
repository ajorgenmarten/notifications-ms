import { IsEmail, IsIn, IsMongoId, IsNotEmpty, IsString, Length, ValidateIf } from "class-validator";
import { ObjectId } from "mongoose";
export class CreateNotificationDto {
    @IsNotEmpty({ message: 'event name is required' })
    @IsString()
    @Length(3,50, { message: 'event name must be 3 to 50 characters' })
    eventName: string

    @IsNotEmpty({ message: 'type is required' })
    @IsIn(["snapshot", "lot"])
    type: "snapshot" | "lot"

    @IsNotEmpty({ message: 'sendBy is required' })
    @IsString()
    @Length(3,50, { message: 'sendBy must be 3 to 50 characters' })
    @IsIn(['system', 'email', 'push', 'sms', 'whatsapp'])
    sendBy: 'system' | 'email' | 'push' | 'sms' | 'whatsapp'

    @IsNotEmpty()
    @IsString()
    @Length(1, 1000)
    content: string

    @ValidateIf(obj => obj.sendBy === "email")
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ValidateIf(obj => obj.sendBy === "system")
    @IsNotEmpty()
    @IsMongoId()
    userId: ObjectId | string
}
