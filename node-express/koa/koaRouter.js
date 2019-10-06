const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// 使用路由
app.use(router.routes());

/* router.get('/user', async (ctx, next) => {
  ctx.body = 'hello koa-router';
  await next();
}) */

// 带参数
/* router.get('/user/:id', (ctx, next) => {
  ctx.body = 'hello koa-router';
  console.log(ctx.params)
}) */

// 路由嵌套
router.get('/user', ctx => {
  ctx.body = 'this is user';
})
router.get('/user/login', ctx => {
  ctx.body = 'this is user login'
})

app.listen(8080, () => console.log('server opening...'))