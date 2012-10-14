//This is adapted version of python's test_strptime test suite
var moment = require("moment");
var dt = require('../moment-datetime');

var eat_dogfood = function(test, directive, method){
	var src = moment(),
		strf_output = src.strftime(directive),
		strp = moment.fn.strptime(strf_output, directive),
		strp_to_cmp, src_to_cmp;
	if (typeof method == 'function'){
		strp_to_cmp = method(strp);
		src_to_cmp = method(strp);
	}else{
		strp_to_cmp = strp[method]();
		src_to_cmp = src[method]();
	}
	test.equal(strp_to_cmp, src_to_cmp, "[Testing of '"+directive+"' directive failed]: expected ["+src_to_cmp+"] but got ["+strp_to_cmp+"]");
};

var get_day_of_year = function(moment_){
    var jan1 = new Date(moment_.year(), 0, 1);
    var date = new Date(moment_.year(), moment_.month(), moment_.date());
    return Math.ceil((date - jan1) / 864e5)+1; // year starts with day 1
};

exports.strfptime = {
	'multiformat': function(test){
		test.expect(3);
		test.ok(moment.fn.strptime('2012', '%Y').year() == 2012);
		test.ok(moment.fn.strptime('2012', ['%Y', '%m%y']).year() == 2012);
		test.ok(moment.fn.strptime('2012', ['%y%m', '%Y']).year() == 2020);
		//test.ok(moment.fn.strptime('2012', ['kkk', '%Y']).year() == 2012);
		test.done();
	},
	'documentation_examples': function(test){
		test.expect(2);
		test.equal(moment([2012, 0, 17, 20, 54, 0]).strftime("%d-%m-%y %I:%M %p"), '17-01-12 08:54 PM');
		test.equal(moment.fn.strptime('01/17/12 08:54 PM', "%m/%d/%y %I:%M %p").toArray().join('-'), '2012-0-17-20-54-0-0-false');
		test.done();
	},
	//test below are ported from python	
    'year' : function(test) {
        test.expect(6);
        eat_dogfood(test, '%y', 'year');
        eat_dogfood(test, '%Y', 'year');
		var centurybounds = {
			1900: ['71', '99'], //1900: ['69', '99'],
			2000: ['00', '70']  //2000: ['00', '68']
		};
		for(var century=1900;century<2100;century+=100){
			for (var j=0; j<2; j++){
				var strp_year = moment.fn.strptime(centurybounds[century][j], '%y').year();
				var expected_result = century + parseInt(centurybounds[century][j], 10);
				test.ok(expected_result == strp_year, "%y test failed: exptected "+expected_result+", but got "+strp_year); 
			}
		}
        test.done();
    },
    'month': function(test) {
    	test.expect(3);
    	eat_dogfood(test, '%b', 'month');
    	eat_dogfood(test, '%B', 'month');
    	eat_dogfood(test, '%m', 'month');
    	test.done();
    },
    'day': function(test) {
    	test.expect(1);
    	eat_dogfood(test, '%d', 'date');
    	test.done();
    },
    'hour': function(test) {
    	test.expect(2);
    	eat_dogfood(test, '%H', 'hours');
    	eat_dogfood(test, '%I %p', 'hours');
    	test.done();
    },
    'minute': function(test) {
    	test.expect(1);
    	eat_dogfood(test, '%M', 'minutes');
    	test.done();
    },
    'seconds': function(test) {
    	test.expect(1);
    	eat_dogfood(test, '%S', 'seconds');
    	test.done();
    },
    'fraction': function(test) {
    	test.expect(0);
    	//to be added when moment will support %f
    	test.done();
    },
    'weekday': function(test) {
    	test.expect(3);
    	eat_dogfood(test, '%A', 'day');
    	eat_dogfood(test, '%a', 'day');
    	eat_dogfood(test, '%w', 'day');
    	test.done();    	
    },
    'julian': function(test) {
    	test.expect(1);
    	eat_dogfood(test, '%j', get_day_of_year);
    	test.done();
    },
    'percent': function(test) {
    	test.expect(1);
    	eat_dogfood(test, '%m %% %Y', function(mm){
    		return mm.year() + ',' + mm.month();
    	});
    	test.done();
    },
    'caseinsensitive': function(test){
    	test.expect(2);
    	var src = moment();
    	var strf_output = src.strftime('%B');
    	test.equal(moment.fn.strptime(strf_output.toUpperCase(), '%B').month(), src.month(), 'All caps failed');
    	test.equal(moment.fn.strptime(strf_output.toLowerCase(), '%B').month(), src.month(), 'All lower failed');
    	test.done();
    },
    'escaping': function(test){
    	test.expect(3);
    	eat_dogfood(test, '.^$*+?{}\[]|)(', 'month');
    	eat_dogfood(test, '[[[', 'month');
    	eat_dogfood(test, ']]]', 'month');
    	test.done();    	
    },
    'feb29': function(test){
    	test.expect(1);
    	var mm29f = moment.fn.strptime('Feb 29', '%b %d');
    	var mm1m = moment.fn.strptime('Mar 1', '%b %d');
    	test.ok(mm29f < mm1m, 'Feb 29 error');
    	test.done();
    },
    '12ampm': function(test){
    	test.expect(2);
        test.equal(moment.fn.strptime('12 PM', '%I %p').hours(), 12);
        test.equal(moment.fn.strptime('12 AM', '%I %p').hours(), 0);
    	test.done();
    },
    'alljulian': function(test){
    	//test.expect(366);
    	test.expect(3);
    	for (var i=1; i<4; i++){
    		//test.equal(get_day_of_year(moment.fn.strptime(i+' 2004', '%j %Y')), i);
    		pad = '';
    		if (i < 100){
    			pad = '0';
    		}
    		if (i < 10){
    			pad += '0'
    		}
    		var mmnt = moment.fn.strptime(pad+i+' 2004', '%j %Y');
    		var doy = get_day_of_year(mmnt);
    		test.equal(doy, ''+i);
    	}
    	test.done();
    },
    'julian_calculation': function(test){
    	test.expect(1);
    	eat_dogfood(test, '%Y %m %d %H %M %S %w %Z', get_day_of_year);
    	test.done();
    },
    'gregorian_calculation': function(test){
    	test.expect(1);
    	eat_dogfood(test, '%Y %H %M %S %w %j %Z', function(mmnt){
    		return mmnt.year() + '-' + mmnt.month() + '-' + mmnt.date();
    	});
    	test.done();
    },
    'day_of_week_calculation': function(test){
    	test.expect(1);
    	eat_dogfood(test, '%Y %m %d %H %S %j %Z', 'day');
    	test.done();
    },
    'week_of_year_and_day_of_week_calculation': function(test){
    	test.expect(20);
        var test_helper = function(ymd_tuple, test_reason){
        	var format_string = '%Y %U %w';
        	var dt_date = moment(ymd_tuple.slice(0));
        	var strp_input = dt_date.strftime(format_string);
        	var strp_output = moment.fn.strptime(strp_input, format_string);
        	test.ok((strp_output.year() == ymd_tuple[0]) &&
        			(strp_output.month() == ymd_tuple[1]) && 
        			(strp_output.date() == ymd_tuple[2]), test_reason + ': expected [' + ymd_tuple.join('-') + '], got [' + strp_output.year() + '-' + strp_output.month() + '-' + strp_output.date() + ']');
        };
        test_helper([1901, 1, 3], "week 0");
        test_helper([1901, 1, 8], "common case");
        test_helper([1901, 1, 13], "day on Sunday");
        test_helper([1901, 1, 14], "day on Monday");
        test_helper([1905, 1, 1], "Jan 1 on Sunday");
        test_helper([1906, 1, 1], "Jan 1 on Monday");
        test_helper([1906, 1, 7], "first Sunday in a year starting on Monday");
        test_helper([1905, 12, 31], "Dec 31 on Sunday");
        test_helper([1906, 12, 31], "Dec 31 on Monday");
        test_helper([2008, 12, 29], "Monday in the last week of the year");
        test_helper([2008, 12, 22], "Monday in the second-to-last week of the year");
        test_helper([1978, 10, 23], "randomly chosen date");
        test_helper([2004, 12, 18], "randomly chosen date");
        test_helper([1978, 10, 23], "year starting and ending on Monday while date not on Sunday or Monday");
        test_helper([1917, 12, 17], "year starting and ending on Monday with a Monday not at the beginning or end of the year");
        test_helper([1917, 12, 31], "Dec 31 on Monday with year starting and ending on Monday");
        test_helper([2007, 1, 7], "First Sunday of 2007");
        test_helper([2007, 1, 14], "Second Sunday of 2007");
        test_helper([2006, 12, 31], "Last Sunday of 2006");
        test_helper([2006, 12, 24], "Second to last Sunday of 2006");
    	test.done();
    }
};
