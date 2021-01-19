const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

// 路由规则
router.get('/',async(ctx,next)=>{
   ctx.body = 'this is home page';
});
router.get('/my',async(ctx)=>{
  ctx.body = 'my page';
});
// get路由例子
router.get('/news',async(ctx)=>{
  console.log(ctx.query);
  console.log(ctx.querystring);
  console.log(ctx.request);
  ctx.body = '新闻页面';
});
// 动态路由例子
router.get('/list/:id',async(ctx)=>{
  console.log(ctx.params);
  ctx.body = '列表页'
});


// 1启动路由 2添加默认响应头
app.use(router.routes())
app.use(router.allowedMethods());

// 启动服务
app.listen(3000,()=>{
  console.log('listenting on port 3000');
});
