phosphor-arrays
===============

[![Build Status](https://travis-ci.org/phosphorjs/phosphor-arrays.svg)](https://travis-ci.org/phosphorjs/phosphor-arrays?branch=master)
[![Coverage Status](https://coveralls.io/repos/phosphorjs/phosphor-arrays/badge.svg?branch=master&service=github)](https://coveralls.io/github/phosphorjs/phosphor-arrays?branch=master)

The `phosphor-arrays` module provides a collection of array utility functions
to perform common operations such as in-place array modification, maping a
function across all the items, and search for elements matching a given
condition.



<a name='install'></a>Package Install
-------------------------------------

**Prerequisites**
- [node](http://nodejs.org/)

```bash
npm install --save phosphor-arrays
```


Source Build
------------

**Prerequisites**
- [git](http://git-scm.com/)
- [node](http://nodejs.org/)

```bash
git clone https://github.com/phosphorjs/phosphor-arrays.git
cd phosphor-arrays
npm install
```

**Rebuild**
```bash
npm run clean
npm run build
```


Run Tests
---------

Follow the source build instructions first.

```bash
npm test
```


Build Docs
----------

Follow the source build instructions first.

```bash
npm run docs
```

Navigate to `docs/index.html`.


Supported Runtimes
------------------

The runtime versions which are currently *known to work* are listed below.
Earlier versions may also work, but come with no guarantees.

- Node 0.12.7+
- IE 11+
- Firefox 32+
- Chrome 38+


Bundle for the Browser
----------------------

Follow the package install instructions first.

Any bundler that understands how to `require()` files with .js and .css
extensions can be used with this package.

Usage Examples
--------------

**Note:** This module is fully compatible with TypeScript/Node/Babel/ES6/ES5.
Simply add the type declarations when using a TypeScript.


To test the `phosphor-arrays` module on a node interactive shell, after
[installing](#install) it, open a terminal in your current working directory
and run

```
node
```

Then import the module into Node with the following command:

```node
> arrays = require('./node_modules/phosphor-arrays/lib/index.js')
```

This makes all the functions from this module available. You can run a few
tests to see how they work.

The `forEach()` routine executes a callback function for each element in the
array. It takes 2 mandatory parameters: the array and the callback function.
Two additional parameters can be used: a number to set the start index, and a
boolean value to determine whether the iteration wraps around around at the end
of the array executing the callback for the remaining elements.

```node
> function logger(value) {
... console.log(value);
... }

> data = [1, 2, 3, 4];
[ 1, 2, 3, 4 ]

> arrays.forEach(data, logger);
1
2
3
4

> arrays.forEach(data, logger, 2);
3
4

> arrays.forEach(data, logger, 2, true);
3
4
1
2
```

The callback can individually access values and their corresponding indexes:

```node
> arrays.forEach(data, (v, i) => {
... if (v === 3) return i;
... });
2
```

A similar function, `rforEach()`, can execute the callback in reverse order. It
takes the same parameters as `forEach()`:

```node
> arrays.rforEach(data, logger);
4
3
2
1

> arrays.rforEach(data, logger, 2);
3
2
1

> arrays.rforEach(data, logger, 2, true);
3
2
1
4
```

There are also functions to find the first element that matches a predicate. 
You can either retrieve the value with `find()` or its index with
`findIndex()`.

```node
> function isEven(value) {
... return value % 2 === 0;
... }

> data = [1, 2, 3, 4, 3, 2, 1];
[ 1, 2, 3, 4, 3, 2, 1 ]


> arrays.find(data, isEven)
2
> arrays.find(data, isEven, 4)
2
> arrays.find(data, isEven, 6)
undefined
> arrays.find(data, isEven, 6, true)
2

> arrays.findIndex(data, isEven)
1
> arrays.findIndex(data, isEven, 4)
5
> arrays.findIndex(data, isEven, 6)
-1
> arrays.findIndex(data, isEven, 6, true)
1
```

The first two parameters are mandatory: the array of values to be searched and
the predicate function to apply. Additional parameters can be passed to set the
starting index of the search and determine whether the search wraps around the
end of the array.

The `rfind` and `rfindIndex` functions are the counterparts of `find` and
`findIndex`, respectively, to perform reverse search:

```node
> arrays.rfind(data, isEven)
2
> arrays.rfind(data, isEven, 0)
undefined
> arrays.rfind(data, isEven, 0, true)
2

> arrays.rfindIndex(data, isEven)
5
> arrays.rfindIndex(data, isEven, 0)
-1
> arrays.rfindIndex(data, isEven, 0, true)
5
```

The `phosphor-arrays` module also provides functions for in-place array
manipulation.

Insert a new element at a specified index with `insert()`. 

```node
> data = [0, 1, 2, 3 ,4];
[ 0, 1, 2, 3, 4 ]
> arrays.insert(data, 0, 12);
0
> data;
[ 12, 0, 1, 2, 3, 4 ]
> arrays.insert(data, -3, 9);
0
> data;
[ 9, 12, 0, 1, 2, 3, 4 ]
> arrays.insert(data, 95, 10);
7
> data;
[ 9, 12, 0, 1, 2, 3, 4, 10 ]

```

Remove values by either looking for its first occurrence with
`remove()` or providing an index with `removeAt()`.  

```node
> data = [0, 1, 2, 3, 4];
[ 0, 1, 2, 3, 4 ]
> arrays.remove(data, 2);
2
> data;
[ 0, 1, 3, 4 ]
> arrays.remove(data, 7);
-1
> data;
[ 0, 1, 3, 4 ]

> data = [0, 1, 2, 3, 4];
[ 0, 1, 2, 3, 4 ]
> arrays.removeAt(data, 1);
1
> data;
[ 0, 2, 3, 4 ]
> arrays.removeAt(data, 10);
undefined
> data;
[ 0, 2, 3, 4 ]
```


It is also possible to rearrange the data. Use `move()` to move an element to a
new position, `reverse()` to reverse the items in a given range, and `rotate()`
to rotate the items by a positive or negative delta.

```node
> data = [0, 1, 2, 3, 4];
[ 0, 1, 2, 3, 4 ]
> arrays.move(data, 1, 2)
true
> data
[ 0, 2, 1, 3, 4 ]
> arrays.move(data, -1, 0)
false
> data
[ 0, 2, 1, 3, 4 ]

> data = [0, 1, 2, 3, 4];
[ 0, 1, 2, 3, 4 ]
> arrays.reverse(data);
[ 4, 3, 2, 1, 0 ]
> arrays.reverse(data, 1, 3)
[ 4, 1, 2, 3, 0 ]

> data = [0, 1, 2, 3, 4];
[ 0, 1, 2, 3, 4 ]
> arrays.rotate(data, 2);
[ 2, 3, 4, 0, 1 ]
> arrays.rotate(data, -2);
[ 0, 1, 2, 3, 4 ]
> arrays.rotate(data, 10);
[ 0, 1, 2, 3, 4 ]
> arrays.rotate(data, 9);
[ 4, 0, 1, 2, 3 ]
```

This module also includes routines to perform a binary search using a
comparison function that returns `true` if an array element is less than the
given value.

Use `lowerBound()` to search for the first item greater than or equal to the
value, and `upperBound()` to search for the first item greater than the value.
Both functions return the corresponding index.

```node
> function numberCmp(a, b) {
... return a < b;
... }

> data = [0, 3, 4, 7, 7, 9];
[ 0, 3, 4, 7, 7, 9 ]
> arrays.lowerBound(data, 0, numberCmp)
0
> arrays.lowerBound(data, 7, numberCmp)
3
> arrays.lowerBound(data, -1, numberCmp)
0

> arrays.upperBound(data, 0, numberCmp)
1
> arrays.upperBound(data, 7, numberCmp)
5
> arrays.upperBound(data, -1, numberCmp)
0
```

API
---

[API Docs](http://phosphorjs.github.io/phosphor-arrays/api/globals.html)


