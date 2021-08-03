// sfs 特殊文件模块
const fs = require('fs');

const sfs = {
  createDirectory(projectName) { 
    return fs.promises.mkdir(projectName);
  }
}

module.exports = sfs