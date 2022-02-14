import Router from "@koa/router";
import { DeleteResult } from "typeorm";
import { Board } from "../entities/Board";
import {deleteBoard, getAllBoards, getNumberOfBoards, saveBoard, updateBoard} from "../servicies/board.service";

const router = new Router();
router.prefix('/boards');

router.post('/create', async(ctx: any, next: any): Promise<Board> => {
	return ctx.body = await saveBoard(ctx.query.boardId);
})

router.get('/all', async(ctx: any, next: any): Promise<Board[]> => {
 return ctx.body = await getAllBoards();
});

router.get('/count', async(ctx: any, next: any): Promise<number>=> {
	return ctx.body = await getNumberOfBoards();
});

router.put('/update', async(ctx: any, next: any): Promise<Board> =>{
	return ctx.body = await updateBoard({
		id: ctx.query.id,
		boardId: ctx.query.boardId,
	} as Board);
})

router.delete('/', async(ctx: any, next: any): Promise<DeleteResult> => {
	return ctx.body = await deleteBoard(ctx.query.boardId);
});

export default router;