import { DeleteResult, getConnection } from "typeorm";
import { Board } from "../entities/Board";
import { TValue } from "../entities/TValue";
import { saveBoard } from "./board.service";

export const saveTValue = async(value: number, boardId: string): Promise<TValue> => {
	let board: Board|undefined = 
		await getConnection().getRepository(Board).findOne({where:{boardId}});
	if (!board) {
		board = await saveBoard(boardId);
	}   
	const tvalue = new TValue();
	tvalue.board = board;
	tvalue.value = value;
	return await getConnection().getRepository(TValue).save(tvalue);
}

export const getTValueById = async(id: string): Promise<TValue | undefined> => {
  return await getConnection().getRepository(TValue).findOne({
    where: {
      id,
    },
    relations: ['board']
  });
}

export const getLastAddedValue = async(): Promise<TValue| undefined> => {
  return await getConnection().getRepository(TValue).findOne({
    order: {
      created: 'DESC',
    },
    relations: ['board']
  });
}

export const getAllTValues = async(): Promise<TValue[]> => {
  return await getConnection().getRepository(TValue).find({
    relations: ['board']
  });
}

export const updateTValue = async(newTValue: TValue): Promise<TValue> => {
  return await getConnection().getRepository(TValue).save(newTValue);
}

export const deleteTValue = async(tvalueId: string): Promise<DeleteResult> => {
  return await getConnection().getRepository(TValue).delete({id: tvalueId});
}
