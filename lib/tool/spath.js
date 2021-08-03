// spath 特殊路径模块
const path = require('path');
const spath = require('process').platform === 'win32' ? path.win32 : path.posix;

module.exports = spath;