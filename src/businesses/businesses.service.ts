import { Injectable, NotFoundException } from '@nestjs/common';
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
    return this.repo.find();
  }

  findOne(id: number) {
    if(!id){
      return null;
    }

    return this.repo.findOne({ where: {id}})
  }

  async update(id: number, attrs: Partial<Business>) {
    
    const business = await this.repo.findOne({ where: {id}});

    if(!business){
      throw new NotFoundException('Business not found');
    }

    Object.assign(business, attrs);
    return this.repo.save(business);
  }

  async remove(id: number) {
    const business = await this.repo.findOne({ where: {id}});

    if(!business){
      throw new NotFoundException('Business not found');
    }
    return this.repo.remove(business);
  }


  async rateBusiness(id: number, rating: number){
    const business = await this.repo.findOne({ where: {id}});

    if(business){
      business.averageRating = ( business.averageRating * business.numberOfRatings + rating ) / ( business.numberOfRatings + 1 )

      // increment total number of rating 
      business.numberOfRatings++;
    }

    // save the updated value of the business
    await this.repo.save(business);
  }
}
