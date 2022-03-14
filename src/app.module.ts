import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database.module';
import { TokensModule } from './tokens/tokens.module';
// import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DatabaseModule, AuthModule, TokensModule],
})
export class AppModule {}
