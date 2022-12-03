import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
@Crud({
  model: {
    type: UserEntity,
  },
})
@Controller('users')
export class UsersController {
  constructor(public service: UsersService) { }
}