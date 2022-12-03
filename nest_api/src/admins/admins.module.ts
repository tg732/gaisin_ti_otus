/*import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';

@Module({
  controllers: [AdminsController],
  providers: [AdminsService]
})
export class AdminsModule {}*/


import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsController } from './admins.controller';
import { AdminEntity } from './admin.entity';
import { AdminsService } from './admins.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminEntity]),
  ],
  controllers: [
    AdminsController,
  ],
  providers: [
    AdminsService,
  ],
})
export class AdminsModule { }