import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/names')
  names(): string[] {
    return ['alberto', 'alejandro', 'pedro']
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
