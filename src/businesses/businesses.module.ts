import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessesService } from './businesses.service';
import { BusinessesController } from './businesses.controller';
import { Business } from './entities/business.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ Business ])],
  controllers: [BusinessesController],
  providers: [BusinessesService],
})
export class BusinessesModule {}
