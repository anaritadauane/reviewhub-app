import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Exclude } from "class-transformer";

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


    @Column({ type: 'varchar', length: 40 })
    email: string;

    @Exclude()
    @Column({ type: 'varchar' })
    password: string
}
