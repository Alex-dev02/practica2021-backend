import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class TValue {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column({nullable: false})
    value!: number;

    @Column({nullable: false})
    boardId!: string;

    @CreateDateColumn()
    created!: Date;

    @UpdateDateColumn()
    updated!: Date;
}