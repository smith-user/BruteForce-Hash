const { substringSearch } = require('./substringSearch.js');
let fs = require('fs');
let arg = process.argv;

let data;
try {
	data = fs.readFileSync(arg[3]);
} catch (err) {
	console.error(err);
	return;
}
data = data.toString();

let substring;
try {
	substring = fs.readFileSync(arg[2]);
} catch (err) {
	console.error(err);
	return;
}
substring = substring.toString();
if (substring.charAt(substring.length - 1) == '\n')
	substring = substring.substring(0, substring.length - 1);

console.log(`Search "${substring.substring(0,20)}"${substring.length > 20 ? '...' : ''}(${arg[2]}) in "${arg[3]}"`);
let result = data.substringSearch(substring.toString());

console.log(`MATCH: ${result.length}`);
if (result.length != 0)
	printResult(result);
mesureTime(data, substring);

function mesureTime(input, substr) {
	let result;
	let data1;
	let data2;
	console.log('-'.repeat('18') + 'Statistics' + '-'.repeat('18'))
	data1 = (new Date()).valueOf();
	result = input.substringSearch(substr, 'RabinKarp', 'test');
	data2 = (new Date()).valueOf();
	console.log(`Algorythm Rabin-Karp:      ${data2-data1} ms, (${result} collisions)`);
	
	data1 = (new Date()).valueOf();
	result = input.substringSearch(substr, 'goodHash', 'test');
	data2 = (new Date()).valueOf();
	console.log(`Good Hash(Sum of squares): ${data2-data1} ms, (${result} collisions)`);
	
	data1 = (new Date()).valueOf();
	result = input.substringSearch(substr, 'bruteForce');
	data2 = (new Date()).valueOf();
	console.log(`Brute Force:               ${data2-data1} ms`);
}

function printResult(array) {
	let digits = array[array.length - 1].toString().length;
	const count = 10;
	let str = '';
	for (let i = 0; i < array.length; i++) {
		let digitsCount = array[i].toString().length;
		str += ' '.repeat(digits - digitsCount) + array[i] + ' '
		if ( (i + 1) % 10 == 0) {
			console.log(str);
			str = '';
		}
	}
	if (str != '')
		console.log(str);	
} 
