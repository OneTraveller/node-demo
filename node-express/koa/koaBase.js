const Koa = require('koa');
const app = new Koa();

// 基本使用
/* app.use(ctx => {
  ctx.body = 'hello koa';
}); */

// 配合async使用
/* app.use(async (ctx, next) => {
  const statr = Date.now();
  await next();
  const ms = Date.now() - statr;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  ctx.body = 'success';
}) */

// 断言
app.use(async (ctx, next) => {
  // if (!ctx.query.user) ctx.throw(400)
  ctx.assert(ctx.query.user, 400, 'user is required');
  await next();
  ctx.body = 'success';
})

app.listen(8080, () => console.log('server opening...'));