import { Business } from "src/businesses/entities/business.entity";
import { Category } from "src/categories/entities/category.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Subcategory {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;


    @OneToMany(() => Business, (business) => business.subcategory)
    business: Business[];

   @ManyToOne(() => Category, (category) => category.subcategory)
   category: Category;
}

    
