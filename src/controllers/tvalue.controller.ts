import Router from '@koa/router';
import { DeleteResult } from 'typeorm';
import { TValue } from '../entities/TValue';
import { deleteTValue, getAllTValues, getLastAddedValue, getTValueById, saveTValue, updateTValue } from '../servicies/tvalue.service';
import {newTValueValidator, updateTValueValidator} from '../data_validators/TValueValidator';
import { uuidValidator } from '../data_validators/SimpleTypesValidators';
import { NewTValueSchema, UpdateTValueSchema } from '../data_validators/ValidationInterfaces';

const router = new Router();
router.prefix('/tvalues');

router.post('/', async (ctx: any, next: any): Promise<TValue> => {
  const queryData: NewTValueSchema = {
    value: +ctx.query.value,
    board: ctx.query.boardId
  };

  if (!newTValueValidator(queryData))
    return ctx.body = newTValueValidator.errors as any;
  const tvalue: TValue =  await saveTValue(+ctx.query.value, ctx.query.boardId, ctx.state.io);
  const tvalueToSend = {
    value: tvalue.value,
    board: tvalue.board.boardId
  }
  const io = ctx.state.io;
  await io.emit("new-tvalue", tvalueToSend);
  return ctx.body = tvalue;
});

router.get('/ping', async (ctx: any, next: any): Promise<string> => {
  return ctx.body = 'OK';
});

router.get('/single', async (ctx: any, next:any): Promise<TValue | undefined> => {
  if (!uuidValidator(ctx.query.id))
    return ctx.body = uuidValidator.errors as any;
  return ctx.body = await getTValueById(ctx.query.id);
});

router.get('/last', async (ctx: any, next: any): Promise<TValue | undefined> => {
  return ctx.body = await getLastAddedValue();
});

router.get('/all', async (ctx: any, next: any): Promise<TValue[]> => {
  return ctx.body = await getAllTValues();
});

router.put('/update', async(ctx: any, next: any): Promise<TValue> => {
  const queryData: UpdateTValueSchema = {
    id: ctx.query.id,
    value: +ctx.query.value,
    board: ctx.query.boardId
  };

  if (!updateTValueValidator(queryData))
    return ctx.body = updateTValueValidator.errors as any;

  return ctx.body = await updateTValue({
    id: ctx.query.id,
    value: +ctx.query.value,
    board: ctx.query.boardId
  } as TValue);
});

router.delete('/', async(ctx: any, next: any): Promise<DeleteResult> => {
  if (!uuidValidator(ctx.query.id))
    return ctx.body = uuidValidator.errors as any;
  return ctx.body = await deleteTValue(ctx.query.id);
});

export default router;