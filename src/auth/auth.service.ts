import { Injectable, Req } from '@nestjs/common';
import { USERS } from 'src/mocks/users.mock';

@Injectable()
export class AuthService {
  users = USERS;

  async userSignUp(@Req() req): Promise<any> {
    this.users.push({ id: 5, ...req.body });
    console.log(this.users);
    return 'Successfully Created User';
  }
}
