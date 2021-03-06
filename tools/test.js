process.on('uncaughtException', function(excp) {
  var sys = require('sys')
  console.log(sys.inspect(excp));
});

var tests = process.argv.slice(2);
if(tests.length < 1) {
  console.log('No tests to run');
  process.exit(1);
}

//console.log("running tests "+tests.join(', '));

var path          = require('path'),
    child_process = require('child_process'),
    assert        = require('assert');

var test_index = 0;
var do_test = function() {
  var test = tests[test_index];

  console.log("running test " + test + '...');
  var module_path = path.join(__dirname, '..', 'test', test + ".js");
  if (!path.existsSync(module_path)) throw "Could not find test path "+module_path;
  var run_this = [path.join(__dirname, 'one_test.js'), test];
  var test_child = child_process.spawn(process.argv[0], run_this, process.env);
  test_child.stdout.on('data', function(data) {
    assert.ok(false, data.toString());
  });
  test_child.stdout.on('data', function(data) {
    assert.ok(false, data.toString());
  });
  test_child.on('exit', function() {
    console.log('finished');
    test_index ++;
    if(test_index < tests.length) {
      setTimeout(do_test, 4000);
    }
  });

}
do_test();