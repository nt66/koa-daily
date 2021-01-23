/**
 * 统一用户中心登录demo
 * express
 */

const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const app = express()
const port = 3000

app.use(session({
  name:'s11key', // session名称 store()时不需要
  secret: 'session_dt', // 签名
  resave: false, // 每次是否都重新保存会话
  store: new FileStore,  // 本地存储session（文本文件，也可以选择其他store，比如redis的）
  saveUninitialized:false, // 是否自动保存未初始化的session
  cookie: {
    maxAge: 1000*60*60*24*3,   // 有效期1小时，毫秒 store()时不需要
  }
}));


app.get('/login', (req, res) => {
  const {token} = req.query;
  req.session.token = token;
  req.session.tenId = 1;
  req.sessionStore.touch(token,req.session,(err,session)=>{
    console.log('login session',session);
  })
  res.send('login page 已登录'+'<br/>'+req.session.id+'<br/>'+req.session.token);
});

app.get('/logout', (req, res) => {
  const {token} = req.query;
  // req.session.token = token;
  // req.session.destroy(token);
  req.sessionStore.destroy(token)
  res.send('login page 已退出:'+'<br/>'+JSON.stringify(req.session.token));
});

app.get('/s1', (req, res) => {
  // console.log(req.sessionStore.all());
  req.sessionStore.list((err,sessions)=>{
    console.log('sesssions',sessions);
  })
  res.send('s1 page'+'<br/>');
});

app.use('/', function (req, res) {
  if (req.session.views) {
    req.session.views++;
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>views: ' + req.session.views + '</p>');
    res.end();
  } else {
    req.session.views = 1;
    res.end('Welcome to the file session demo. Refresh page!');
  }
});

app.listen(port, () => console.log(`app listening on port ${port}!`))