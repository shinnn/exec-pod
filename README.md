# exec-pod

[![NPM version](https://img.shields.io/npm/v/exec-pod.svg)](https://www.npmjs.com/package/exec-pod)
[![Build Status](https://travis-ci.org/shinnn/exec-pod.svg?branch=master)](https://travis-ci.org/shinnn/exec-pod)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/exec-pod.svg)](https://coveralls.io/github/shinnn/exec-pod)
[![Dependency Status](https://david-dm.org/shinnn/exec-pod.svg)](https://david-dm.org/shinnn/exec-pod)
[![devDependency Status](https://david-dm.org/shinnn/exec-pod/dev-status.svg)](https://david-dm.org/shinnn/exec-pod#info=devDependencies)

Run a [`pod`](https://github.com/CocoaPods/CocoaPods#cocoapods-the-cocoa-dependency-manager) subcommand and buffer the output like [`child_process#execFile`][execfile] does

```javascript
const execPod = require('exec-pod');

execPod('search', ['AWS']).then(output => {
  output; //=> '-> AWSAPIGateway (2.2.7)\n   Amazon Web Services SDK for iOS ...'
});
```

## Installation

[Use npm](https://docs.npmjs.com/cli/install):

```
npm install exec-pod
```

and make sure [`CocoaPods`](https://rubygems.org/gems/cocoapods/versions/0.39.0) is [installed](https://guides.cocoapods.org/using/getting-started.html#installation).

## API

```javascript
const execPod = require('exec-pod');
```

### execPod(*subcommand* [, *args*, *options*])

*subcommand*: `String` (one of the `pod` [subcommands](https://guides.cocoapods.org/terminal/commands.html) to run, e.g. `install`)  
*args*: `Array` of strings (arguments passed to the command)  
*options*: `Object`  
Return: [Promise](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-executor) instance

It runs the given `pod` subcommand and returns a [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise) instance.

When the command finishes successfilly, it will be [*fulfilled*](https://promisesaplus.com/#point-26) with the command output.

When it fails to run the command or the command itself fails, it will be [*rejected*](https://promisesaplus.com/#point-30) with an error.

```javascript
execPod('install', ['AFNetworking'], {bundleExec: true}).then(output => {
  output; //=> 'Updating spec repo `master` ... '
});
```

#### Options

All [`child_process#execFile`][execfile] options and `bundleExec` option (described below) are available.

##### options.bundleExec

Type: `Boolean`  
Default: `false`

`true` runs the `pod` command with [`bundle exec`](http://bundler.io/man/bundle-exec.1.html), instead of using globally installed `pod`.

## Related project

* [exec-pod-callback](https://github.com/shinnn/exec-pod-callback) ([Callback](http://thenodeway.io/posts/understanding-error-first-callbacks/)-style version)

## License

Copyright (c) 2015 - 2016 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).

[execfile]: https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options
