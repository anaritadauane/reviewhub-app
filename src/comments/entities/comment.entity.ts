import { Review } from "src/reviews/entities/review.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    datePosted: Date;

    @ManyToOne(() => Review, (review) => review.comments)
    review: Review;

    @ManyToOne(() => User, (user) => user.comment)
    user: User;

}
