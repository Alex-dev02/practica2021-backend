import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TValue {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column()
    value!: number;

    @Column()
    boardId!: string;
}