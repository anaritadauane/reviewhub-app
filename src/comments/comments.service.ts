import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
// import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor( @InjectRepository(Comment) private repo: Repository<Comment>){}
  create(createCommentDto: CreateCommentDto) {
    const comment = this.repo.create(createCommentDto);
    return this.repo.save(comment)
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    if(!id){
      return null;
    }
    return this.repo.findOne({ where: {id}});
  }

  async update(id: number, attrs: Partial<Comment>) {
    const comment = await this.repo.findOne({ where: {id}});

    if(!id){
      throw new NotFoundException('Comment not found');
    }

    Object.assign(comment, attrs);
    return this.repo.save(comment);
  }



  async remove(id: number) {
    const comment = await this.repo.findOne({ where: {id}});

    if(!id){
      throw new NotFoundException('Comment not found');
    }

    return this.repo.remove(comment);
  }
}
