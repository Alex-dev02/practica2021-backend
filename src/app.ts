import Koa from 'koa';
import "reflect-metadata";
import cors from '@koa/cors'
import logger from 'koa-logger';

import { createServer } from 'http';
import { Server } from 'socket.io';

import { getRouters } from './utils/router';
import { createConn } from './utils/database';

const app = new Koa();
const httpServer = createServer(app.callback());
const io = new Server(httpServer, {});
app.use(cors({
  origin: process.env.ENV === 'DEV' ? '*' : process.env.ORIGIN 
}));
app.use(async (ctx: any, next: any) => {
  ctx.state.io =  io;
  await next();
});
app.use(logger());

createConn();

const routers = getRouters();

routers.forEach(router => {
  app.use(router.routes());
});

httpServer.listen(process.env.PORT  || 4000);