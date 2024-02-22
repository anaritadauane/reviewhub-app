import { Column, 
         Entity, 
         PrimaryGeneratedColumn,
         CreateDateColumn,
        ManyToOne, 
        OneToMany} from "typeorm";

import { User } from '../../user/entities/user.entity';
import { Business } from '../../businesses/entities/business.entity';
import { Comment } from '../../comments/entities/comment.entity';


@Entity()
export class Review {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30})
    title: string;

    @Column({ type: 'varchar'})
    description: string; 

    @CreateDateColumn({ type: 'timestamp'})
    datePosted: Date; 

    @Column({ default: 0 }) // default value for helpful count 
    helpfulCount: number;

    @ManyToOne(() => User, (user) => user.reviews)
    user: User;

    @ManyToOne(() => Business, (business) => business.reviews)
    business: Business;

    @OneToMany(() => Comment, (comment) => comment.review)
    comments: Comment[]

    // @OneToMany(() => Review, (reviews) => reviews.user)
    // reviews: Review[]
   
}
