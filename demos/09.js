// session 保存在服务端
// 解决http无状态
// 多个页面之间数据共享
// 流程：浏览器访问服务器后生成session对象（key,value）然后将kay(cookie)返回给浏览器，下次请求浏览器带上session_key,
// 找到对应的session_value.验证成功
// 文档参考 https://www.npmjs.com/package/koa-session

const Koa = require('koa');
const router = require('koa-router')();
const session = require('koa-session');
const FileStore = require('session-file-store')(session);
const views = require('koa-views');

const app = new Koa();
app.keys = ['some secret hurr'];// 默认不管
 
const CONFIG = {
  key: 'koa.sess', /** 签名-默认不管 */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 86400000, /* 时效 */
  overwrite: true, /** 设不设都没用 (boolean) can overwrite or not (default true) */
  httpOnly: true, /** server端访问ture js&server都可以访问false (boolean) httpOnly or not (default true) */
  signed: true, /** 签名-不管  (boolean) signed or not (default true) */
  rolling: false, /** (boolean) 每次是否强制更新  Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) 每次是否快到了更新  renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
  secure: false, /** (boolean) https http  secure cookie*/
};

app.use(session(CONFIG,app));

router.get('/login',async(ctx)=>{
  ctx.session.userInfo = 'hualingfengNB';
  ctx.body = 'main page';
});

router.get('/news',async(ctx)=>{
  const userInfo = ctx.session.userInfo;
  console.log(userInfo);
  ctx.body = 'news page!!! & cookies:'+userInfo;
});

router.get('/shop',async(ctx)=>{
  const userInfo = ctx.session.userInfo;
  ctx.body = 'shop page!!! && cookies:'+userInfo;
})

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000,()=>{
  console.log('listening part on 3000');
})


