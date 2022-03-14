import { Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUsersDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async signUp(@Req() req: CreateUsersDTO): Promise<any> {
    return this.authService.userSignUp(req);
  }
}
