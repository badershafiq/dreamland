import { createConnection } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'dev',
        password: '123',
        database: 'dreamland',
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
  },
];
