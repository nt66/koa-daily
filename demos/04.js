// 重点概念：中间件就是流水，是匹配路由之前以及之后所做的操作
// 中间件
const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa(); 

// 这里就是中间件（没有路由参数，全路由匹配）
app.use(async(ctx,next)=>{
  console.log(new Date());
  await next();
})

// 错误中间件
app.use(async(ctx,next)=>{
  console.log('中间件2');
  await next();
  if(ctx.status == 404){
    console.log('404');
    ctx.body = '这是一个404页面';
  }else{
    console.log(ctx.url);
   }
})

const main = async (ctx)=>{
  ctx.body='main page';
};

const news = async (ctx)=>{
  ctx.body = 'news page';
}

router.get('/',main);
router.get('/news',news);

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000,()=>{
  console.log('listening on port 3000');
})

