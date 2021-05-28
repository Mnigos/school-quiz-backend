import { Controller, Request, Post, UseGuards, Res, Get, HttpStatus } from '@nestjs/common'
import { AuthService } from './auth/auth.service'
import { LocalAuthGuard } from './auth/local-auth.guard'

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/register')
  async register(@Request() req) {
    return this.authService.register(req.body)
  }

  @Post('auth/login')
  async login(@Request() req, @Res({ passthrough: true }) res) {
    const service = await this.authService.login(req.body)

    if (service === HttpStatus.BAD_REQUEST) return service

    const { access_token } = service

    res.cookie('jwt', access_token, { httpOnly: true })

    return { access_token }
  }

  @Get('auth/user')
  async user(@Request() req) {
    return { access_token: req.cookies['jwt'] }
  }
}
