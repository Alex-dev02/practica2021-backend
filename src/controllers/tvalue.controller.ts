import Router from '@koa/router';
import { TValue } from '../entities/TValue';
import { getAllTValues, saveTValue } from '../servicies/tvalue.service';

const router = new Router();
router.prefix('/tvalues');

router.get('/', async (ctx: any, next: any): Promise<TValue[]> => {
    return ctx.body = await getAllTValues();
})

router.post('/', async (ctx: any, next: any): Promise<TValue> => {
    return ctx.body = await saveTValue(ctx.query.value, ctx.query.boardId);
});

export default router;