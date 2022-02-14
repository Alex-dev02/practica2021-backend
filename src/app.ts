import Koa from 'koa';
import "reflect-metadata";
import cors from '@koa/cors'
import logger from 'koa-logger';
import { Server } from 'http';

import { getRouters } from './utils/router';
import { createConn } from './utils/database';

const app = new Koa();
const io = new Server();

app.use(cors({origin: '*'}));

app.use(logger());

createConn();

const routers = getRouters();

routers.forEach(router => {
    app.use(router.routes());
});

io.on('connection', (socket) => {
    console.log('connected');
})

app.listen(process.env.PORT || 4000);