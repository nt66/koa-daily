// ejs 模板引擎
const Koa = require('koa');
const views = require('koa-views');
const router = require('koa-router')();

const app = new Koa();

// 这样配置模板后缀名必须是html
// app.use(views(__dirname,{
//   map:{html:'ejs'}
// }));

// 这样配置模板后缀名必须是ejs
app.use(views(__dirname, {
  extension: 'ejs',
})) 

router.get('/', async (ctx) => {
  // 传入参数供模板使用
  const title = '我是ejs模板'
  await ctx.render('index',{
    title
  });
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log('listening on port 3000');
});
