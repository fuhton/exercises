const transmitter = (options, originalCB) => {
	const {
		codes,
		message,
		timeouter,
		toggle,
	} = options;
	let chars = message.split('');

	const processMorse = (item, callback) => {
		let lengths = 1;
		if ( item === '.' ) {
			lengths = 1;
		}
		console.log(timeouter);
		return timeouter(() => {
			console.log(item);
			toggle();
			callback();
		}, 1);
	}

	const processChar = (char) => {
		const charCode = codes[char];
		//var p = Promise.resolve();
//
		//charCode.split('').forEach(function(item){
		//	p = p.then(function(){ return processMorse(item); });
		//});
		//return p.then(promise => {
		//	console.log( promise);
	//	});
		//const promiseResult = Promise.resolve(charCode.split('')).each(processMorse);
		//return Promise.all( p ).then(values => {
		//	console.log( values);
		//	resolve(values);
		//}, reason => {
		//	console.log(reason)
		//});
	}

	const updateChars = () => chars.shift();

	const processMessage = prev => {
		let result = '';
		let promiseResult = [];

		while (chars.length) {
			processChar(chars[0]);
		}

		//chars.forEach(function(char){
		//	p = p.then(function(){
		//		const charCode = codes[char];
		//		return timeouter(() => {
		//			console.log(item);
		//			toggle();
		//		}, 1)
		//	});
		//});

		//chars.forEach(function(char){
		//	p = p.then(function(){ return processChar(char); });
		//});

		//chars.map( char => {
		//	promiseResult.push( new Promise((resolve, reject) => {
		//		return processChar(char, resolve);
		//	}) );
		//} );
		//return p.then(values => {
		//	console.log('attheend');
		originalCB();
		//});
	}

	toggle();
	processMessage();
};

module.exports = transmitter;
