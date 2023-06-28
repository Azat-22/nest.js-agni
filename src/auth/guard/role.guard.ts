import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roleName = this.reflector.get<string>('roles', context.getHandler());
    if (!roleName) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    console.log(user);
    return this.matchRoles(roleName, user?.role?.name);
  }

  private matchRoles(roleName, userRole) {
    return roleName === userRole;
  }
}
