(function(undefined){
	var moment;
	if (typeof require !== 'undefined'){
		moment = require('moment');
	}else{
		moment = this.moment;
	}
	
	var replacements = {
		'a': 'ddd',
		'A': 'dddd',
		'b': 'MMM',
		'B': 'MMMM',
		//'c': //%c is defined too vaguely
		'd': 'DD',
		//'f': JS have no support for microseconds and moment.js have no support for milliseconds
		'H': 'HH',
		'I': 'hh',
		'j': 'DDDD',
		'm': 'MM',
		'M': 'mm',
		'p': 'A',
		'S': 'ss',
		'U': 'ww',//ww is for Sunday-based week
		'w': 'd',
		//'W': 'ww',//%W is weeknumber for weeks starting from Monday and it is not implemented in moment.js
		//'x':
		//'X': //%x and %X are defined too vaguely to be implemented 
		'y': 'YY',
		'Y': 'YYYY',
		'z': 'ZZ',
		//'Z': 'z', - moment.js does not support timezone names
		'%': '%'
	};
	
	var convert_format = function(format){
		var moment_format = '', directive_index = 0, replacement, unformatted;
		while (format.indexOf('%') !== -1){
			directive_index = format.indexOf('%') + 1;
			replacement = replacements[format[directive_index]];
			unformatted = format.substr(0, directive_index-1);
			if (unformatted.length){
				unformatted = '[' + unformatted.replace(/(\[|\])/g, '\\$&') +']';
			}
			moment_format += unformatted + (replacement ? replacement : format[directive_index]);
			format = format.substr(directive_index+1);
		}
		return moment_format;
	};
	
	moment.fn.strftime = function(format){
		var moment_format = convert_format(format);
		return moment.fn.format.call(this, moment_format);
	};
	moment.fn.strptime = function(input, format){
		var moment_format;
		if (typeof format == 'string'){
			moment_format = convert_format(format);
		}else{
			moment_format = [];
			for(var i=0; i<format.length; i++){
				moment_format.push(convert_format(format[i]));
			}
		}
		return moment(input, moment_format);
	};
	
	if (typeof module !== 'undefined' && module.exports){
		module.exports = moment;
	}else{
		this.moment = moment;
	}
}).call();
