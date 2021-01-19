// 获取表单数据
// 1 koa-bodyparser
// 2 原生逻辑

const Koa = require('koa');
// const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();
const views = require('koa-views');
const serve = require('koa-static');
const getPostData = require('./unit/common');

const app = new Koa();
// app.use(bodyParser());
// 可配置多个static
app.use(serve(__dirname+'/static'));
app.use(views(__dirname,{
  extension: 'ejs',
}));

router.get('/',async(ctx)=>{
  await ctx.render('form');
});

router.post('/doApp',async(ctx)=>{
  //koa-bodyparse 寫法
  // console.log('body:',ctx.request.body, typeof ctx.request.body);
  // ctx.body = ctx.request.body;
  // 原生写法[注意用原生写法时 不能引用use(bodyParser) 否则失败]
  const data = await getPostData(ctx);
  console.log('data:',data);
  ctx.body = data;
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000,()=>{
  console.log('listening port 3000');
});
