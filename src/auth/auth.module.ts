import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { BasicStrategy } from './auth-basic.strategy';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule, ConfigModule],
  providers: [BasicStrategy, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
