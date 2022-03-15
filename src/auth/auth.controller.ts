import { Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsersDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async signUp(@Req() req: CreateUsersDTO, @Res() res): Promise<any> {
    return this.authService.userSignUp(req, res);
  }
}
