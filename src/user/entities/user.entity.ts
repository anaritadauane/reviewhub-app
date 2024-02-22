import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { Review } from '../../reviews/entities/review.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30 })
    firstName : string; 

    @Column({ type: 'varchar', length: 30 })
    surname: string;


    @Column({ type: 'varchar', length: 15 })
    username: string;

    // @Column()
    // dob: Date;
    @OneToMany(() => Review, (reviews) => reviews.user)
    reviews: Review[]

    @OneToMany(() => Comment, (comment) => comment.user)
    comment: Comment[]

    @Column({ type: 'varchar', length: 40 })
    email: string;

    @Exclude()
    @Column({ type: 'varchar' })
    password: string
}
