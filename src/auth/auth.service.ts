import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { AuthUserDto } from './dto/auth-user.dto';
import { hash, compare } from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>, private JwtService: JwtService){}

  async register(userObject: AuthUserDto) {
    const exist = await this.userModel.findOne({ email: userObject.email })
    if (exist) throw new HttpException("there is already a user with this email", 400)
    const { password } = userObject
    const hashedPassword = await hash(password, 10)
    userObject.password = hashedPassword
    return await this.userModel.create(userObject)
  }

  async login(userObject: AuthUserDto) {
    const user = await this.userModel.findOne({ email: userObject.email })
    if ( !user ) throw new HttpException('user email not registered', HttpStatus.NOT_FOUND)
    const checkpassword = await compare(userObject.password, user.password)
    if ( !checkpassword ) throw new HttpException('unauthorized', HttpStatus.FORBIDDEN)
    const token = await this.JwtService.sign({ id: user._id, email: user.email })
    return token
  }
}
