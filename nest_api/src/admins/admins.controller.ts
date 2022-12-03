import { Controller, Get, Param } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { AdminsService } from './admins.service';
import { AdminEntity } from './admin.entity';
@Crud({
  model: {
    type: AdminEntity,
  },
})
@Controller('admins')
export class AdminsController {
  constructor(public service: AdminsService) { }

  
  @Get('/auth')
  async findAdmin(@Param() params) {
    return await this.service.findAdmin((admin) => admin.login === params.login);
  }
}
