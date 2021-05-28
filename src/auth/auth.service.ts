import { HttpStatus, Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import * as bcrypt from 'bcrypt'
import { IUser } from '../users/interfaces/users.interface'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(user: IUser): Promise<any> {
    const { name, pass } = user
    const foundedUser = await this.usersService.getOneByName(name)
    if (
      foundedUser !== HttpStatus.BAD_REQUEST &&
      bcrypt.compare(pass, (foundedUser as IUser).pass)
    ) {
      const { _id, name } = foundedUser as IUser

      return {
        _id,
        name,
      }
    }

    return null
  }

  async login(user: IUser): Promise<{ access_token: string } | HttpStatus> {
    if (!user) return HttpStatus.BAD_REQUEST

    const { name, _id } = user

    return {
      access_token: this.jwtService.sign({ name, sub: _id }),
    }
  }

  async register(user: IUser): Promise<any> {
    return await this.usersService.create(user)
  }
}
