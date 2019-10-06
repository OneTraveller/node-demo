const Koa = require('koa');
const Router = require('koa-router');
const body = require('koa-better-body');

const app = new Koa();
const router = new Router();

app.use(body({
  uploadDir: 'koa/upload'
}));

router.post('/upload', ctx => {
  ctx.body = 'upload success';
})

app.listen(8080, () => console.log('server opening...'));
app.use(router.routes());