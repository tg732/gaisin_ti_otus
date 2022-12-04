import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { TypeOrmCrudService  } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService extends TypeOrmCrudService<UserEntity> {
  constructor(@InjectRepository(UserEntity) repository: Repository<UserEntity>) {
    super(repository);
  }
}