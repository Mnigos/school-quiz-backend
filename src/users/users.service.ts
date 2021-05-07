import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IUser } from './interfaces/users.interface'
import { UserDoc } from './interfaces/usersDoc.interface'

import * as bcrypt from 'bcrypt'
@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly UserModel: Model<UserDoc>) {}
}
