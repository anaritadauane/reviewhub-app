import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    password: '123ana456',
    username: 'anadauane', 
    entities: [], 
    database: 'reviewhub', 
    synchronize: true, 
    logging: true 
  }),
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
