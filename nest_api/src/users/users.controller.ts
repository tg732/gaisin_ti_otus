import { Controller, UseGuards } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { UsersService } from './users.service';
import { UserEntity } from './user.entity';
import { AuthGuard } from 'src/auth.guard';
@UseGuards(AuthGuard)
@Crud({
  model: {
    type: UserEntity,
  },
})
@Controller('users')
export class UsersController {
  constructor(public service: UsersService) { }
}