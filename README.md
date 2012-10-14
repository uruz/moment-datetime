moments-datetime
================

An attempt to mimic moment.js onto python `datetime` interface: `strptime`, `strftime` functions and maybe others.

For now it's just a pure JS reimplementation of [moment-strftime](https://github.com/benjaminoakes/moment-strftime) with some additions.

##Installation

### Browser

  * [Development version](https://raw.github.com/uruz/moment-datetime/master/moment-datetime.js)
  * [Minified version](https://raw.github.com/uruz/moment-datetime/master/min/moment-datetime.min.js)
  
### Node.js/CommonJS

`moment-datetime` is a Node.js package. 

    npm install moment-datetime
    
*Note*: I know nearly nothing about node.js, so it's a lot like voodoo-programming. Don't hesitate to report issues and send pull requests!

## Usage

`moment-datetime` adds a `strftime` method to the moment object and `strptime` method to its prototype. It's simple:

    moment().strftime("%m/%d/%y %I:%M %p"); // => '01/17/12 08:54 PM'
    moment.fn.strptime('01/17/12 08:54 PM', "%m/%d/%y %I:%M %p").toArray(); // [2012, 0, 17, 20, 54, 0, 0, false]
    
## Known Issues

* Some of format specifications don't work. Some cases are a moment.js's issues, some are javascript's.
* Several tests fail. They should not; I'm investigating that. 
    
## Resources

* [C strftime](http://pubs.opengroup.org/onlinepubs/007908799/xsh/strftime.html)
* [C strptime](http://pubs.opengroup.org/onlinepubs/007908799/xsh/strptime.html)
* [Python strftime and strptime](http://docs.python.org/library/datetime.html#strftime-strptime-behavior)
* [PHP strftime](http://php.net/manual/en/function.strftime.php)
* [PHP strptime](php.net/manual/en/function.strptime.php)
* [Python strptime test suite](http://hg.python.org/cpython/file/3cfe50908fbd/Lib/test/test_strptime.py)
* [Python strftime test suite](http://hg.python.org/cpython/file/3cfe50908fbd/Lib/test/test_strftime.py)



## License

(The MIT License)

Copyright (c) 2012 Benjamin Oakes

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
