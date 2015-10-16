/*!
 * exec-pod | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/exec-pod
*/
'use strict';

const execPodCallback = require('exec-pod-callback');

module.exports = function execPod(subcommand, args, options) {
  if (options === undefined && !Array.isArray(args)) {
    options = args;
    args = [];
  }

  return new Promise(function executor(resolve, reject) {
    execPodCallback(subcommand, args, options, function callback(err, stdout, stderr) {
      if (err) {
        reject(err);
        return;
      }

      if (Buffer.isBuffer(stdout)) {
        resolve(Buffer.concat([stdout, stderr], stdout.length + stderr.length));
        return;
      }

      resolve(stdout + stderr);
    });
  });
};
