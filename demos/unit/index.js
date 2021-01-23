const fs = require('fs'); 

exports.getPostData = (ctx)=> {
  console.log('getPostData000:');
  return new Promise((resolve, reject)=>{
    try {
      let str = '';
      ctx.req.on('data',(chunk)=>{
        str += chunk;
      });
      ctx.req.on('end',(chunk)=>{
        resolve(str);
      });
    } catch (err) {
        reject(err);
    }
  });
};

exports.read = (dir)=>{
  return new Promise((resolve,reject)=>{
      fs.readFile(dir,'utf-8',(err,data)=>{
          if(err){
            reject(err);
          }else{
            resolve(data.toString());
          }
      })
  })
};

// exports.getPostData = getPostData;
// module.exports = getPostData;
