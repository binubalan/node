// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var assert = require('assert');
var common = require('../common');

var start = Date.now();
var maxMem = 0;

var interval = setInterval(function() {
  try {
    require('vm').runInNewContext('throw 1;');
  } catch (e) {
  }

  var rss = process.memoryUsage().rss;
  maxMem = Math.max(rss, maxMem);


  if (Date.now() - start > 5 * 1000) {
    // wait 10 seconds.
    clearInterval(interval);
  }
}, 1);

process.on('exit', function() {
  console.error('max mem: %dmb', Math.round(maxMem / (1024 * 1024)));
  // make sure we stay below 100mb
  assert.ok(maxMem < 50 * 1024 * 1024);
});
