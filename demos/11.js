const path = require('path');
const pathObj = path.parse(__filename);
const pathDir = path.parse(__dirname,'../');
console.log(pathObj);
console.log(pathDir);
