import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TValue } from "./TValue";

@Entity()
export class Board{
  @PrimaryGeneratedColumn('uuid')
  id!: string;

	@Column()
	boardId!: string;

	@CreateDateColumn()
	created!: Date;
	
	@UpdateDateColumn()
	updated!: Date;

  @OneToMany(() => TValue, tvalue => tvalue.board)
  values!: TValue[];
}