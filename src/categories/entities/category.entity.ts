import { Business } from "src/businesses/entities/business.entity";
import { Subcategory } from "src/subcategories/entities/subcategory.entity";
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @OneToMany(() => Business, (business) => business.category)
    business: Business[];

    @OneToMany(() => Subcategory, (subcategory) => subcategory.category)
    subcategory: Subcategory[];
}
