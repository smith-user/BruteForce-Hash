const { substringSearch } = require('./substringSearch.js');
let fs = require('fs')

let report = [];
let countFailure = 0;

// ------------------------------------ TestCases: ------------------------------------

convTest('abababacaba', 'aba').toBe('0 2 4 8');
convTest('abababacaba', 'baa').toBe('-1');
convTest('Hello, world', 'l').toBe('2 3 10');
convTest('abrakadabra', 'abra').toBe('0 7');
convTest('aaaaaaaaaab', 'ab').toBe('9');

// ------------------------------------------------------------------------------------
function convTest(str, substr) {
	return {
		toBe: exp => {
			let result;
			report.push(`"${substr}" -> "${str}":`);
			result = str.substringSearch(substr).join(' ');
			if (result == exp) {
				report.push(`\tSuccess! '${result}'`);
			} else {
				report.push(`\tFailed! Value is   '${result}', \n\tbut expectation is '${exp}'.`);
				countFailure += 1;
			}
		}
	}
}


fs.writeFile('reportSearch.txt', report.join('\n'), (err) => {
		if (err){
			console.err(err);
			return;
		}
		console.log(`The tests are finished! Failed tests: ${countFailure}.`);
		console.log('Read more in reportConv.txt');
	});
