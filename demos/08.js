// cookie
// cookie 保存再客户端
// 解决http无状态
// 多个页面之间数据共享
/*
* 参数解释:
* maxAge  //过期毫秒数
* expires  //过期时间
* path  //路径，默认'/';控制访问cookie的域名路径;
* domain  //作用的域名
* secure  //false; true https才能访问
* httpOnly  //false js也能拿到; true知否服务端能拿到
* overwrite  //是否支持重写
*/

const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa();

router.get('/',async(ctx)=>{
  ctx.cookies.set('userInfo','huazi',{
    maxApge: 1000*60*60,
  })
  ctx.body = 'main page';
});

router.get('/news',async(ctx)=>{
  const userInfo = ctx.cookies.get('userInfo');
  console.log(userInfo);
  ctx.body = 'news page!!! & cookies:'+userInfo;
});

router.get('/shop',async(ctx)=>{
  const userInfo = ctx.cookies.get('userInfo');
  ctx.body = 'shop page!!! && cookies:'+userInfo;
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000,()=>{
  console.log('listening part on 3000');
})

