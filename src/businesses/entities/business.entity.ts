import { Category } from "src/categories/entities/category.entity";
import { Review } from "src/reviews/entities/review.entity";
import { Subcategory } from "src/subcategories/entities/subcategory.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, ManyToOne} from "typeorm";

@Entity()
export class Business {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 30})
    name: string;

    @Column({ type: 'varchar', length: 250})
    description: string;

    @Column({ type: 'varchar', length: 30})
    website: string;

    @Column()
    phoneNumber: number;

    @Column({ type: 'varchar', length: 30})
    email: string; 

    @Column({ type: 'varchar', length: 30})
    address: string;


    @Column({ default: 0 })
    averageRating: number; 

    @Column({ default: 0})
    numberOfRatings: number;

    @OneToMany(() => Review, (reviews) => reviews.business)
    reviews: Review[];

    @ManyToOne(() => Category, (category) => category.business)
    category: Category;

    @ManyToOne(() => Subcategory, (subcategory) => subcategory.business)
    subcategory: Subcategory;
}
