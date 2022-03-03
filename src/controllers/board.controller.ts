import Router from "@koa/router";
import { DeleteResult } from "typeorm";
import { newBoardValidator, updateBoardValidator } from "../data_validators/BoardValidator";
import { uuidValidator } from "../data_validators/SimpleTypesValidators";
import { NewBoardSchema, UpdateBoardSchema } from "../data_validators/ValidationInterfaces";
import { Board } from "../entities/Board";
import {deleteBoard, getAllBoards, getNumberOfBoards, saveBoard, updateBoard} from "../servicies/board.service";

const router = new Router();
router.prefix('/boards');

router.post('/create', async(ctx: any, next: any): Promise<Board> => {
  const queryData: NewBoardSchema = {
    board: ctx.query.boardId
  }
  if (!newBoardValidator(queryData))
    return ctx.body = newBoardValidator.errors as any;

  return ctx.body = await saveBoard(ctx.query.boardId);
});

router.get('/all', async(ctx: any, next: any): Promise<Board[]> => {
 return ctx.body = await getAllBoards();
});

router.get('/count', async(ctx: any, next: any): Promise<number>=> {
	return ctx.body = await getNumberOfBoards();
});

router.put('/update', async(ctx: any, next: any): Promise<Board> =>{
	const queryData: UpdateBoardSchema = {
    id: ctx.query.id,
    board: ctx.query.boardId
  }
  if (!updateBoardValidator(queryData))
    return ctx.body = updateBoardValidator.errors as any;
  return ctx.body = await updateBoard({
		id: ctx.query.id,
		boardId: ctx.query.boardId,
	} as Board);
})

router.delete('/', async(ctx: any, next: any): Promise<DeleteResult> => {
  if (!uuidValidator(ctx.query.id))
    return ctx.body = uuidValidator.errors as any;
  return ctx.body = await deleteBoard(ctx.query.id);
});

export default router;