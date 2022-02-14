import { DeleteResult, getConnection } from "typeorm";
import { Board } from "../entities/Board";

export const saveBoard = async (boardId: string): Promise<Board> => {
	const board = new Board();
	board.boardId = boardId;
	return await getConnection().getRepository(Board).save(board);
}

export const getAllBoards = async (): Promise<Board[]> => {
	return await getConnection().getRepository(Board).find();
}

export const getNumberOfBoards = async (): Promise<number> =>{
	return await getConnection().getRepository(Board).count();
}

export const updateBoard = async (newBoard: Board): Promise<Board> => {
	return await getConnection().getRepository(Board).save(newBoard);
}

export const deleteBoard = async (boardId: string): Promise<DeleteResult> =>{
	return await getConnection().getRepository(Board).delete({id: boardId});
}