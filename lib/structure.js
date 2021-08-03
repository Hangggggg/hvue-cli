const process = require('process');
const spath = require('./tool/spath.js'); // 直接在命令行中输入的路径必须为当前操作系统的路径，所以需要对路径进行特殊处理
const sfs = require('./tool/sfs.js');
const { commandOption } = require('./tool/command.js');
const { renderWebpackConfig, renderPackage } = require('./renderer.js');
const { frameDependency } = require('./dependency.js'); 

function copyBaseStructure(projectName) {
  if (process.platform === 'win32') {
    return commandOption('xcopy', [spath.resolve(__dirname, './static'), `${projectName}`, '/e']);
  } 
  return commandOption('cp', [spath.resolve(__dirname, './static/*'), `${projectName}`, '-r']);
}

// 创建目录使用 fs.mkdir ，而不使用 命令 mkdir 的原因是，在 windows 上，mkdir 创建同名目录，不会报错，会影响后续代码的执行
// 拷贝 static 使用 命令，而不使用 fs 的原因是，fs 只提供了单个文件的拷贝，处理复杂结构，需要自己实现
async function initProjectStructure(projectName) {
  await sfs.createDirectory(projectName);
  await copyBaseStructure(projectName);
  await renderWebpackConfig(projectName, Object.assign({ projectName }, frameDependency), {});
  await renderPackage(projectName, { projectName }, {});
}

module.exports = {
  initProjectStructure
}
