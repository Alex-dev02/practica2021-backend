import Router from "@koa/router";
import { getDatabaseSize, getLogs, getServerRuntime } from "../servicies/env_info.service";

const router = new Router();
router.prefix('/env_info');

router.get('/database-size', async(ctx: any, next: any): Promise<string> => {
  return ctx.body = await getDatabaseSize();
});

router.get('/server-runtime', (ctx: any, next: any): string => {
  return ctx.body = getServerRuntime(+(process.env.START_TIME ? process.env.START_TIME : 0));
});

router.get('/logs', (ctx: any, next: any): string | undefined => {
  return ctx.body = getLogs();  
});

export default router;