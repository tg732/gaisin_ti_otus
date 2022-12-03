import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './Users/Users.module';
import * as path from 'path';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '*.{ts,js}')),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'testdb',
        entities: [path.join(__dirname, "**/*.entity{.ts,.js}")],
        synchronize: true,
      })
    }),
    UsersModule,
    AdminsModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
  ],
})
export class AppModule { }