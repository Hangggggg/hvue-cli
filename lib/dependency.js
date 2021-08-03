const { frames, packages: { dependencies, devDependencies } } = require('../dependency.json');
const { commandOption } = require('./tool/command.js');

const initialFrames = frames.initialFrames;

const frameDependency = { vue: null, css: null, ajax: [] };

initFrameDependency(initialFrames); // 使用默认值初始化化 frameDependency

function initFrameDependency(frames) { // 不需要使用 addableFrames 进行判断，直接使用正则进行判断
  for (let frame of frames) {
    if (/^vue[23]$/.test(frame)) {
      frameDependency.vue = frame;
    } else if (/^(sa|le)ss$/.test(frame)) {
      frameDependency.css = frame;
    } else if (/^(axios|hfetch)$/.test(frame)) {
      frameDependency.ajax.includes(frame) || frameDependency.ajax.push(frame);
    }  
  }
}

function getDevDependencies() {
  return devDependencies.necessity.concat(
    frameDependency.vue === 'vue2' ? devDependencies.vue2 : devDependencies.vue3,
    frameDependency.css ? (frameDependency.css === 'less' ? devDependencies.less : devDependencies.sass) : []
  )
}

function getDependencies() {
  return dependencies.necessity.concat(
    frameDependency.vue === 'vue2' ? dependencies.vue2 : dependencies.vue3,
    frameDependency.ajax.includes('axios') ? dependencies.axios : [],
    frameDependency.ajax.includes('hfetch') ? dependencies.hfetch : []
  )
}

async function downloadPackages(projectName) {
  await commandOption('npm', ['i', ...getDependencies()], { cwd: `./${projectName}` }); // cwd 路径格式会自动转为当前操作系统的格式
  await commandOption('npm', ['i', '-D', ...getDevDependencies()], { cwd: `./${projectName}` });
}

module.exports = {
  frameDependency,
  initFrameDependency,
  downloadPackages
}

