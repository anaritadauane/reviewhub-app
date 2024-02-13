import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBusinessDto } from './dto/create-business.dto';
// import { UpdateBusinessDto } from './dto/update-business.dto';
import { Business } from './entities/business.entity';

@Injectable()
export class BusinessesService {
  constructor(@InjectRepository(Business) private repo: Repository<Business>){}

  create(createBusinessDto: CreateBusinessDto) {
    const business = this.repo.create(createBusinessDto);

    return this.repo.save(business);
  }

  findAll() {
    return `This action returns all businesses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} business`;
  }

  update(id: number, attrs: Partial<Business>) {
    return `This action updates a #${id} business`;
  }

  remove(id: number) {
    return `This action removes a #${id} business`;
  }
}
