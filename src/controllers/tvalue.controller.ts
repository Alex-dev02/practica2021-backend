import Router from '@koa/router';
import { DeleteResult } from 'typeorm';
import { TValue } from '../entities/TValue';
import { deleteTValue, getAllTValues, getLastAddedValue, getTValueById, saveTValue, updateTValue } from '../servicies/tvalue.service';

const router = new Router();
router.prefix('/tvalues');

router.post('/', async (ctx: any, next: any): Promise<TValue> => {
    return ctx.body = await saveTValue(ctx.query.value, ctx.query.boardId);
});

router.get('/single', async (ctx: any, next:any): Promise<TValue | undefined> => {
    return ctx.body = await getTValueById(ctx.query.id);
});

router.get('/last', async (ctx: any, next: any): Promise<TValue | undefined> => {
    return ctx.body = await getLastAddedValue();
});

router.get('/', async (ctx: any, next: any): Promise<TValue[]> => {
    return ctx.body = await getAllTValues();
});

router.put('/', async(ctx: any, next: any): Promise<TValue> => {
    return ctx.body = await updateTValue({
        id: ctx.query.id,
        value: ctx.query.value,
        boardId: ctx.query.boardId,
        created: ctx.query.created,
        updated: ctx.query.updated,
    });
});

router.delete('/', async(ctx: any, next: any): Promise<DeleteResult> => {
    return ctx.body = await deleteTValue(ctx.query.id);
})

export default router;