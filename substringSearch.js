String.prototype.substringSearch = function (substr) {	
	let result = new Array();
	const substrHash = hash(substr);
	let segmentHash = hash(this.substring(0, substr.length));
	
	let j;
	for(let i = 0; i < this.length - substr.length + 1; i++) {
		if (substrHash == segmentHash) {
			j = 0;
			while (j < substr.length && this[i + j] == substr[j])
				j++;
			if (j == substr.length)
				result.push(i);
		}
		segmentHash = (segmentHash - this.charCodeAt(i) * Math.pow(2, substr.length - 1)) * 2 + this.charCodeAt(i + substr.length);
	}
	
	if (result.length != 0)
		return result;
	else
		return [-1];	
}

function hash(input) {
	let sumCode = 0;
	for(let i = 0; i < input.length; i++)
		sumCode += (input.charCodeAt(i) * Math.pow(2, input.length - i - 1));
	return sumCode;
}
