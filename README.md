# JS template literals

Those little examples show what is possible with tagged template literals in Javascript.

The `translator.js` is probably the most interesting one.

```js
//setup
const LANG = 'de';
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

console.log(translate`3 ${'fruit_common'}`);
//3 Apfel

console.log(translate`3 ${'no_real_key'}`);
//3 no_real_key

console.log(translate`5 ${KEYSTORE.fruit_exotic}`);
//5 Drachenfrucht

console.log(translate`7 ${KEYSTORE.no_real_key}`);
//Error

console.log(translate`7 ${{de: 'Banane', en: 'banana'}}`);
//7 Banane

console.log(translate`7 ${{}}`);
//Error
```