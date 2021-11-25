String.prototype.substringSearch = function (substr, parametr = 'RabinKarp', test = 'N') {	
	let result = new Array();
	switch (parametr) {
		case 'RabinKarp':
			result = alogorythmRabinKarp(this, substr, test);
			break;
		case 'bruteForce':
			result = bruteForce(this, substr);
			break;
		case 'goodHash':
			result = goodHash(this, substr, test);
			break;
		default:
			throw new Error(`Invalid command: ${parametr}`)
	}
	return result;	
}

function alogorythmRabinKarp(input, substr, test) {	
	let collisionCount = 0;
	let result = new Array();
	const substrHash = hash(substr);
	let segmentHash = hash(input.substring(0, substr.length));
	let j = 0;
	for(let i = 0; i < input.length - substr.length + 1; i++) {
		if (substrHash == segmentHash) {
			j = 0;
			while (j < substr.length && input[i + j] == substr[j])
				j++;
			if (j == substr.length)
				result.push(i);
			else
				collisionCount += 1;
		}
		segmentHash = (segmentHash - input.charCodeAt(i) * Math.pow(2, substr.length - 1)) * 2 + input.charCodeAt(i + substr.length);
	}
	if (test != 'N')
		return collisionCount;
	else 
		return result;
	
	function hash(input) {
		let sumCode = 0;
		for(let i = 0; i < input.length; i++)
			sumCode += (input.charCodeAt(i) * Math.pow(2, input.length - i - 1));
		return sumCode;
	}
}

function bruteForce(input, substr) {	
	let result = new Array();
	let j = 0;
	for(let i = 0; i < input.length - substr.length + 1; i++) {
		j = 0;
		while (j < substr.length && input[i + j] == substr[j])
			j++;
		if (j == substr.length)
			result.push(i);
	}
	return result;
}

function goodHash(input, substr, test) {	
	let collisionCount = 0;
	let result = new Array();
	const substrHash = hash(substr);
	let segmentHash = hash(input.substring(0, substr.length));
	let j = 0;
	for(let i = 0; i < input.length - substr.length + 1; i++) {
		if (substrHash == segmentHash) {
			j = 0;
			while (j < substr.length && input[i + j] == substr[j])
				j++;
			if (j == substr.length)
				result.push(i);
			else
				collisionCount += 1;
		}
		segmentHash -= (input.charCodeAt(i) * input.charCodeAt(i));
		segmentHash += (input.charCodeAt(i + substr.length) * input.charCodeAt(i + substr.length));
	}
	
	if (test != 'N')
		return collisionCount;
	else 
		return result;
	
	function hash(input) {
		let sumCode = 0;
		for(let i = 0; i < input.length; i++)
			sumCode += (input.charCodeAt(i) * input.charCodeAt(i))
		return sumCode;
	}
}


