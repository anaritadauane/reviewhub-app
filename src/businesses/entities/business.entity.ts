import { Entity, Column, PrimaryGeneratedColumn} from "typeorm";

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
}
