import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly _reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles: string[] = this._reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!roles) {
      return true;
    }

    // tslint:disable-next-line:no-console
    console.log('here');
    // tslint:disable-next-line:no-console
    console.log(roles);

    const request = context.switchToHttp().getRequest();
    const { user } = request;
    // tslint:disable-next-line:no-console
    console.log(user);

    return user && roles.includes(user.role);
  }
}
