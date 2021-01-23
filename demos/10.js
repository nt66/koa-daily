/**
 * 统一用户中心登录demo
 * express
 */

const express = require('express')
const session = require('express-session')
const path = require('path');
const FileStore = require('session-file-store')(session)
const { read } = require('./unit');
const fs = require('fs'); 

const app = express()
const src = './sessions/';
const port = 3000

// 判断是否是文件|文件夹
// fs.stat('sessions',(err,stats)=>{
//   console.log('目录'+stats.isDirectory())
// })

// function read(dir){
//   return new Promise((resolve,reject)=>{
//       fs.readFile(dir,'utf-8',(err,data)=>{
//           if(err){
//             reject(err);
//           }else{
//             resolve(data.toString());
//           }
//       })
//   })
// }

// 设置session
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

// 创建目录
fs.exists('dictionary',(exists)=>{
  if(!exists){
      console.log("该文件或目录不存在！");
      fs.mkdir('dictionary',(err)=>{
      console.log('目录创建成功');
      }) 
  }
});

//localhost:3000/login?token=111222
app.get('/login', (req, res) => {
  const {token} = req.query;
  req.session.token = token;
  req.session.tenId = 1;
  fs.writeFile(`./dictionary/${token}.txt`,`${req.session.id}`,(err)=>{
    if(err){
      console.log(err);
      return false;
    }
    return res.send('login page 已登录'+'<br/>'+req.session.id+'<br/>'+req.session.token);
  });
  // fs.readdir('sessions',(err,data)=>{
  //   if(err){
  //     console.log(err);
  //     return false;
  //   }
  //   console.log(data);
  // })
  // fs.rename(`${src}${req.session.id}.json`,`${src}${token}.json`,(err)=>{
  //   if(err){
  //     console.log(err);
  //     return false;
  //   }
  // });
});

app.get('/logout', async(req, res) => {
  const {token} = req.query;
  const sessionId = await read(`./dictionary/${token}.txt`);
  // console.log('sessionId',sessionId);
  if(sessionId){
    req.sessionStore.destroy(sessionId);
    fs.unlink(`./dictionary/${token}.txt`, (err) => {
      if (err) throw err;
        console.log('文件已被删除');
    });
    // res.send('用户已退出!!!:'+'<br/>');
  }else{
    console.log('登录失败!!!');
  }
  res.send('ok');
  // res.send('login page 已退出:'+'<br/>');
  // req.session.destroy(token);
  // fs.readFile(`./dictionary/${token}.txt`,(err,data)=>{
  //   if(err){
  //     console.log(err);
  //     return false;
  //   }
  //   const sessionId = data.toString();
  //   // console.log('req.session.id'+typeof req.session.id,req.session.id);
  //   // console.log('sessionId'+typeof sessionId,sessionId);
  //   req.sessionStore.destroy(sessionId,(err)=>{
  //     if(err){
  //       console.log(err);
  //       return false;
  //       res.send('session删除失败，退出失败:'+'<br/>'+JSON.stringify(err));
  //     }
  //     // return res.redirect('/admin');
  //     res.send('用户已退出:'+'<br/>');
  //   })
  //   // req.sessionStore.destroy(req.session.id);
  //   // res.send('login page 已退出:'+'<br/>');
  // })
  // req.sessionStore.destroy(req.session.id);
});

// 最终跳转地址
app.get('/admin', async(req, res) => {
  // res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.write('<p>用户中心</p>');
  res.end();
});

app.get('/api/v1',(req,res)=>{
    return res.json({
      return_code: 20000,
      return_msg: 'success',
      data:{
        vaule:'666'
      }
    });
})

app.get('/s1', (req, res) => {
  req.sessionStore.list((err,sessions)=>{
    if(err){
      return res.send('s1 page'+'<br/>');
    }
    console.log('sesssions',sessions);
    return res.send('s1 page'+'<br/>'+JSON.stringify(sessions));
  })
  
});

app.use('/', function (req, res) {
  if (req.session.views) {
    req.session.views++;
    res.setHeader('Content-Type', 'text/html');
    res.write('<p>views: ' + req.session.views + '</p>');
    res.end();
  } else {
    // req.session.views = 1;
    res.end('Welcome to the file session demo. Refresh page!');
  }
});

app.listen(port, () => console.log(`app listening on port ${port}!`))