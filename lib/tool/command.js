const process = require('process');
const { spawn } = require('child_process');

function commandOption(command, args, options) {
  return new Promise((resolve, reject) => {
    let childProcess = spawn(command, args, Object.assign({ shell: true }, options));
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);
    childProcess.on('error', error => reject(error));
    childProcess.on('close', () => resolve());
})  
}

module.exports = {
  commandOption
}