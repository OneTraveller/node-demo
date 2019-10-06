const Koa = require('koa');
const session = require('koa-session');

const app = new Koa();
app.listen(8080);

app.keys = [
  'afdfee34hghsgfsf',
  'afdfeetreve34hghsgfsf',
  'afdfee34hgdfdhsgfsf',
];

app.use(session({
  maxAge: 20 * 60 * 1000, // 有效期 20分钟
  renew: true, // 自动续期
}, app));

app.use(ctx => {
  if (!ctx.session.view) {
    ctx.session.view = 0;
  }
  ctx.session.view++;

  ctx.body = `欢迎你第${ctx.session.view}次来访`;
})