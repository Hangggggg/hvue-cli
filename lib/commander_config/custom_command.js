const { program } = require('commander');
const { initFrameDependency, downloadPackages } = require('../dependency.js'); 
const { initProjectStructure } = require('../structure.js');

program 
    .command('create <projectName>')
    .description('create a vue project')
    .option('-D, --dep [frames...]', 'add dependent frames')
    .action(async (projectName, args) => { // 异步执行
        args?.dep?.length && initFrameDependency(args.dep);
        try {
          await initProjectStructure(projectName);
          await downloadPackages(projectName);
        } catch (e) {
          console.error(e);
        }
    });
    