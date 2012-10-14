.PHONY: all
all: moment-datetime

min/:
	mkdir min/

.PHONY: moment-datetime pretty
moment-datetime: min/ min/moment-datetime.min.js pretty

pretty: min/ min/moment-datetime.min.pretty.js

min/moment-datetime.min.js: moment-datetime.js
	node_modules/.bin/uglifyjs -o $@ $<

min/moment-datetime.min.pretty.js: moment-datetime.js
	node_modules/.bin/uglifyjs -b -o $@ $<

.PHONY: test hint test-moment-datetime
test: hint test-moment-datetime
hint:
	node_modules/.bin/jshint moment-datetime.js

test-moment-datetime:
	node_modules/.bin/nodeunit ./test/moment-dt.js

.PHONY: clean
clean:
	rm -rf min/
