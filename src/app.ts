import Koa from 'koa';
import "reflect-metadata";

import { getRouters } from './utils/router';
import { createConn } from './utils/database';

const app = new Koa();

createConn();

const routers = getRouters();

routers.forEach(router => {
    app.use(router.routes());
});

app.listen(process.env.PORT || 3000);