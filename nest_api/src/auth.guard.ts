import { Injectable, CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    // TODO: искать логин и пароль админа в БД adminService.findAdmin(request.headers.login, request.headers.password)
    return request.headers.token === 'password';
  }
}
