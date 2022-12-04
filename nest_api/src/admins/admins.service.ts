import { Injectable } from '@nestjs/common';
import { AdminEntity } from './admin.entity';
import { TypeOrmCrudService  } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AdminsService extends TypeOrmCrudService<AdminEntity> {
  private repository: Repository<AdminEntity>
  
  constructor(@InjectRepository(AdminEntity) repository: Repository<AdminEntity>) {
    super(repository);
    this.repository = repository;
  }

  async findAdmin(param): Promise<AdminEntity> {
    const record = await this.repository.findOneBy({
      login: param[0],
      password: param[1]
    });
    //this.checkNotFound(record);
    return record;
  }
}