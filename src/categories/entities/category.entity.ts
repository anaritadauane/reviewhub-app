import { Business } from '../../businesses/entities/business.entity';
import { Subcategory } from '../../subcategories/entities/subcategory.entity';
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
