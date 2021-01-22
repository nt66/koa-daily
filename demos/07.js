// 获取表单数据
// 1 koa-bodyparser
// 2 原生逻辑

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const views = require('koa-views');
const getPostData = require('./unit/common');

const app = new Koa();
app.use(bodyParser());
app.use(views(__dirname,{
  extension: 'ejs',
}));

router.get('/',async(ctx)=>{
  await ctx.render('form');
});

router.post('/doApp',async(ctx)=>{
  // koa-bodyparse 寫法
  // console.log('body:',ctx.request.body, typeof ctx.request.body);
  // ctx.body = ctx.request.body;
  
  // 原生写法
  const data = await getPostData(ctx);
  console.log('原生获取post data',data);
  ctx.body = data;
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000,()=>{
  console.log('listening port 3000');
});