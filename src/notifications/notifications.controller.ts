import { Controller, Post, Body, UseGuards, Get, Param, Patch, Delete } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';

@ApiBearerAuth()
@ApiTags('notifications')
@UseGuards(JwtGuard)
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get('/:userId')
  all(@Param('userId') userId: string) {
    return this.notificationsService.all(userId)
  }
  
  @Patch('/:notificationId')
  read(@Param('notificationId') notificationId: string) {
    return this.notificationsService.read(notificationId)
  }

  @Patch('/noread/:notificationId')
  noread(@Param('notificationId') notificationId: string) {
    return this.notificationsService.noread(notificationId)
  }

  @Delete('/:notificationId')
  remove(@Param('notificationId') notificationId: string) {
    return this.notificationsService.delete(notificationId)
  }



}
