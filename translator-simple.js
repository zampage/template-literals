function translate(immutable, ...mutable){
	console.log(immutable);
	console.log(mutable);
	return immutable.reduce((str, partial, idx) => {
		let translation = mutable[idx] && mutable[idx][LANG] ? mutable[idx][LANG] : '';
		return str += partial + translation;
	}, '');
}

const LANG = 'de';
const hours = {de: 'Stunden', en: 'hours'};
const and = {de: 'und', en: 'and'};
const minutes = {de: 'Minuten', en: 'minutes'};
const translated = translate`6 ${hours} ${and} 35 ${minutes}`;

console.log(translated);

//
// LANG === 'de'
// 6 Stunden und 35 Minuten
//
// LANG === 'en'
// 6 hours and 35 minutes
//