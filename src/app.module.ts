import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import { AuthService } from './user/auth.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: '123ana456',
    username: 'anadauane', 
    entities: [User], 
    database: 'reviewhub', 
    synchronize: true, 
    logging: false 
  }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
