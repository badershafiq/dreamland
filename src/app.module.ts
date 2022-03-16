import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
// import { DatabaseModule } from './database.module';
import { TokensModule } from './tokens/tokens.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'dev',
      password: '123',
      database: 'dreamland',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    TokensModule,
  ],
})
export class AppModule {}
