/*
* aysnc await demo
*/

function getData(){
  return new Promise((res,rej)=>{
    setTimeout(()=>{
      const name ='hualingfeng';
      console.log(2);
      res(name);
    },1000)
  })
};

async function test(){
 console.log(1);
 const data = await getData();
 console.log(data);
 console.log(3);
};

test();
