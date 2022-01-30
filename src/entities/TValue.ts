import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TValue {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column({nullable: false})
    value!: number;

    @Column({nullable: false})
    boardId!: string;
}