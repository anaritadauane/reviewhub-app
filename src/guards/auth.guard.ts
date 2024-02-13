// this guard is to prevent some access if the user is not signin 

import {
 CanActivate, 
 ExecutionContext
} from '@nestjs/common';
// import { Observable } from 'rxjs';

 export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext) { // context is the incoming request
        const request = context.switchToHttp().getRequest();
        return request.session.userId;
    }
 }