import { Column, 
         Entity, 
         PrimaryGeneratedColumn,
         CreateDateColumn } from "typeorm";


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
}
