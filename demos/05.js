// 重点概念：中间件就是流水，是匹配路由之前以及之后所做的操作
// 中间件执行顺序详解
// 像事件的捕捉和冒泡
const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa();

app.use(async(ctx,next)=>{
   console.log('1.中间件1');
   await next();
   console.log('5.最后回来');
});

app.use(async(ctx,next)=>{
   console.log('2.中间件2');
   await next();
   console.log('4.回来');
});

router.get('/my',(ctx)=>{
  console.log('3.我的页面')
  ctx.body="我的页面";
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000,()=>{
  console.log('listening on port 3000');
});

