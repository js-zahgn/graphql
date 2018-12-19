const Koa = require('koa');
const Router = require('koa-router');
const cors = require('koa2-cors');
const KoaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');

const { database } = require('./mongodb');

database();

const GraphqlRouter = require('./router');

const port = 4008;

const app = new Koa();
const router = new Router();

app.use(cors());

app.use(bodyParser());
app.use(KoaStatic(__dirname + '/public'));

app.use(GraphqlRouter.routes())

app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => console.log(`[Server] starting at port ${port}`));