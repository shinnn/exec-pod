'use strict';

const execPod = require('.');
const test = require('tape');

test('execPod()', t => {
  t.plan(5);

  t.equal(execPod.name, 'execPod', 'should have a function name.');

  execPod('search', ['AFNetworking']).then(output => {
    t.ok(
      /https:\/\/github.com\/AFNetworking\/AFNetworking/.test(output),
      'should be fulfilled when it successfully runs a command.'
    );
  }).catch(t.fail);

  execPod('try').then(t.fail, err => {
    t.ok(
      /Command failed: pod try\n\[!] A Pod name or URL is required\./.test(err.message),
      'should be rejected when the a command fails.'
    );
  }).catch(t.fail);

  execPod('search', ['AFNetworking'], {encoding: null}).then(buffer => {
    t.ok(Buffer.isBuffer(buffer), 'should pass Buffer output as it is.');
  }).catch(t.fail);

  execPod('setup', {encoding: 'base64'}).then(output => {
    t.ok(
      new RegExp(new Buffer('Setting up CocoaPods ').toString('base64')).test(output),
      'should accept exec-pod-callback options.'
    );
  }).catch(t.fail);
});
