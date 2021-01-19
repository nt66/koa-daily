function getPostData(ctx) {
  console.log('getPostData000:');
  return new Promise((resolve, reject)=>{
    try {
      let str = '';
      ctx.req.on('data',(chunk)=>{
        //console.log('chunk:',chunk)
        str += chunk;
      });
      ctx.req.on('end',(chunk)=>{
        //consoole.log('str:'+str);
        resolve(str);
      });
    } catch (err) {
        reject(err);
    }
  });
}

// exports.getPostData = getPostData;
module.exports = getPostData;
