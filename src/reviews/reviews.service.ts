import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
// import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(@InjectRepository(Review) private repo : Repository<Review>){}

  // creates a new review 
  create(createReviewDto: CreateReviewDto) {
    const review = this.repo.create(createReviewDto);

    return this.repo.save(review);
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

  async update(id: number, attrs: Partial<Review>) {
    const review = await this.repo.findOne({ where: {id}});
    if(!review){
      throw new NotFoundException('Review not found');
    }

    Object.assign(review, attrs);
    return this.repo.save(review);
  }

  async remove(id: number) {
    const review = await this.repo.findOne({ where: {id}});

    if(!review){
      throw new NotFoundException('Review not found');
    }
    return this.repo.remove(review);
  }
}
