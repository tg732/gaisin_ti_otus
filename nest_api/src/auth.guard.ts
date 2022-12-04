import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AdminsService } from './admins/admins.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AdminsService) private adminService: AdminsService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    return this.adminService.findAdmin([request.headers.login, request.headers.password]).then(res => {
      if (res) {
        return true;
      } else {
        return false;
      }
    });
    
  }
}
