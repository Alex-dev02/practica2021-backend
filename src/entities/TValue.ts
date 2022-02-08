import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import {Board} from "./Board";

@Entity()
export class TValue {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column({nullable: false})
    value!: number;

    @CreateDateColumn()
    created!: Date;

    @UpdateDateColumn()
    updated!: Date;

    @ManyToOne(() => Board, board => board.values)
    board!: Board;
}