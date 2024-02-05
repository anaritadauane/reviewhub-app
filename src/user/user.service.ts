import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor( @InjectRepository(User) private repo : Repository<User>)
  {}

  create(createUserDto: CreateUserDto) {
    const user = this.repo.create(createUserDto);

    return this.repo.save(user);
  }

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: number) {
    if(!id){
      return null;
    }
    return this.repo.findOne({ where: {id}});
  }

  update(id: number, attrs: Partial<User>) {
    const user = this.repo.findOne({ where: {id}});
    if(!user){
      throw new NotFoundException('User not found');
    }

    Object.assign(user, attrs);
    return this.repo.save(user);


  }

  remove(id: number) {
    const user = this.repo.findOne({ where: {id}})

    if(!user){
      throw new NotFoundExpection('User not found')
    }
    return this.repo.remove(user)
}
