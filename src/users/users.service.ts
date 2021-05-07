import { HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { IUser } from './interfaces/users.interface'
import { UserDoc } from './interfaces/usersDoc.interface'

import * as bcrypt from 'bcrypt'
@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private readonly UserModel: Model<UserDoc>) {}

  async getAll(): Promise<IUser[]> {
    return await this.UserModel.find().exec()
  }

  async getOneById(_id: string): Promise<IUser | HttpStatus> {
    const user = await this.UserModel.findOne({ _id }).exec()

    if (!user) return HttpStatus.BAD_REQUEST

    return user
  }

  async getOneByName(name: string): Promise<IUser | HttpStatus> {
    const user = await this.UserModel.findOne({ name }).exec()

    if (!user) return HttpStatus.BAD_REQUEST

    return user
  }

  async update(user: IUser): Promise<IUser | HttpStatus> {
    const { _id } = user

    if (!_id) return HttpStatus.BAD_REQUEST

    this.UserModel.updateOne({ _id }, user)

    return await this.UserModel.findOne({ _id }).exec()
  }

  async create(user: IUser): Promise<boolean> {
    const { name, pass } = user

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(pass, salt)

    await this.UserModel.create({
      name,
      pass: hash,
    } as IUser)

    return true
  }
}
