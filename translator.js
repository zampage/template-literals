function translate(immutable, ...mutable){
	return immutable.reduce((str, partial, idx) => {
		const m = mutable[idx];
		let translation = '';

		const setTranslation = function(storeobject, key){
			let t = storeobject[LANG];
			if(!t){
				//show key if no translation exists
				t = key;
				console.warn(`There is no translation in "${LANG}" for "${key}"`);
			}
			return t;
		}

		//item to translate exists
		if(idx < mutable.length){
			//item is a string key
			if(typeof m === 'string'){
				let translationKey = m;
				let translationObject = KEYSTORE[m];
				if(!translationObject){
					console.warn(`Key "${m}" does not exist in keystore!`);
					translation = m;
				}else{
					translation = setTranslation(translationObject, translationKey);
				}
			}

			//item is a translation object from keystore
			else{
				let translationKey = Object.keys(KEYSTORE).find(key => KEYSTORE[key] == m);
				let translationObject = m;
				if(!translationKey){
					if(typeof translationObject === 'object' && typeof translationObject[LANG] === 'string'){
						console.warn(`Consider adding "${JSON.stringify(translationObject)}" to the keystore!`);
					}else{
						throw new Error(`"${JSON.stringify(translationObject)}" is not a valid keystore object!`);
					}
				}
				translation = setTranslation(translationObject, translationKey);
			}
		}

		return str += partial + translation;
	}, '');
}

//setup
let LANG = 'de';
const KEYSTORE = {
	fruit_common: {
		de: 'Apfel',
		en: 'apple'
	},
	fruit_exotic: {
		de: 'Drachenfrucht',
		en: 'dragonfruit'
	}
};

//output
console.log(translate`3 ${'fruit_common'}`);					//3 Apfel
console.log(translate`3 ${'no_real_key'}`);						//3 no_real_key
console.log(translate`5 ${KEYSTORE.fruit_exotic}`);				//5 Drachenfrucht
//console.log(translate`7 ${KEYSTORE.no_real_key}`);			//Error
console.log(translate`7 ${{de: 'Banane', en: 'banana'}}`);		//7 Banane
//console.log(translate`7 ${{}}`);								//Error