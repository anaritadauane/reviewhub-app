import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserService } from './user.service';
import { AuthService} from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';

@Module({
  imports:[TypeOrmModule.forFeature([User]),],
  controllers: [UserController],
  providers: [UserService, AuthService, 
    {
      provide: APP_INTERCEPTOR, // adding a globally scoped interceptor 
      useClass: CurrentUserInterceptor
    }],

})
export class UserModule {}
