import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('/register')
  register(@Body() userObject: AuthUserDto) {
    return this.authService.register(userObject)
  }

  @Post('/login')
  login(@Body() userObject: AuthUserDto) {
    return this.authService.login(userObject)
  }
}
