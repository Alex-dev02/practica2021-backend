import Koa from 'koa';
import "reflect-metadata";
import cors from '@koa/cors'
import logger from 'koa-logger';
import koaBody from 'koa-body';

import { createServer } from 'http';
import { Server } from 'socket.io';

import { getRouters } from './utils/router';
import { createDBConnection } from './utils/database';
import { stream } from './utils/logsfileStream';

const app = new Koa();
app.use(koaBody());

const httpServer = createServer(app.callback());
const io = new Server(httpServer, {});

app.use(cors({
  origin: process.env.ENV === 'DEV' ? '*' : process.env.ORIGIN 
}));

app.use((ctx: any, next: any) => {
  stream.write(
    `${new Date()} ` + JSON.stringify(ctx) +
      '\nreq.body:' + JSON.stringify(ctx.request.body) + '\n'
    );
  next();
})

app.use(async (ctx: any, next: any) => {
  ctx.state.io =  io;
  await next();
});

app.use(logger());

createDBConnection();

const routers = getRouters();

routers.forEach(router => {
  app.use(router.routes());
});

httpServer.listen(process.env.PORT  || 4000);