const { substringSearch } = require('./substringSearch.js');
let fs = require('fs');

let arg = process.argv;

fs.readFile(arg[3], (err, data) => {
	if (err) {
		console.error(err);
		return;
	}
	data = data.toString();
	let result = data.substringSearch(arg[2].toString());
	console.log(result.join(' '));
});
