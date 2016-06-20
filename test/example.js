var tap = require('tap');

// you can test stuff just using the top level object.
// no suites or subtests required.

tap.equal(1, 1, 'check if numbers still work');
tap.notEqual(1, 2, '1 should not equal 2');
