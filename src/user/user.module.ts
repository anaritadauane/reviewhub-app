import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';

@Module({
  imports:[TypeOrmModule.ForFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
