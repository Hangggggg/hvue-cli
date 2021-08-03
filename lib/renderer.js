const util = require('util');
const { writeFile } = require('fs/promises');
const ejs = require('ejs');
const spath = require('./tool/spath');

const renderFileAsync = util.promisify(ejs.renderFile);

async function renderWebpackConfig(projectName, data, options) {
  await renderFileAsync(spath.resolve(__dirname, './template/webpack.common.ejs'), data, options)
  .then(str => writeFile(`./${projectName}/config/webpack.common.js`, str));
  await renderFileAsync(spath.resolve(__dirname, './template/webpack.development.ejs'), data, options)
  .then(str => writeFile(`./${projectName}/config/webpack.development.js`, str));
  await renderFileAsync(spath.resolve(__dirname, './template/webpack.production.ejs'), data, options)
  .then(str => writeFile(`./${projectName}/config/webpack.production.js`, str));
}

async function renderPackage(projectName, data, options) {
  await renderFileAsync(spath.resolve(__dirname, './template/package.ejs'), data, options)
  .then(str => writeFile(`./${projectName}/package.json`, str));
}

module.exports = {
  renderWebpackConfig,
  renderPackage
}
