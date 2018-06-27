//tagged template literal functions
function addClamps(hardPartials, ...replacementPartials){
	updatedReplacementPartials = replacementPartials.map(partial => '[' + partial + ']');
	return hardPartials.reduce((str, partial, idx) => {
		return str += `${partial}${updatedReplacementPartials[idx] || ''}`
	}, '');
}

const quantity = 3;
const item = 'Apple';
const label = addClamps`We got ${quantity} piece(s) of ${item}`;

console.log(label);