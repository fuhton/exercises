const transmitter = (options, originalCB) => {
	const {
		codes,
		message,
		timeouter,
		toggle,
	} = options;
	let chars = message.split('');
	let codeLength = [];

	const updateChars = () => chars.shift();
	const updateCodeLength = () => codeLength.shift();

	const sendMessage = item => {
		let lengths = 1;
		if ( item === '.' ) {
			lengths = 1;
		}
		timeouter(() => {
			toggle();
			updateCodeLength();
		}, lengths);
	}

	const processChar = (char) => {
		codeLength = codes[char].split('');
		while (codeLength.length) {
			sendMessage(chars[0]);
		}
		updateChars();
	}

	const processMessage = prev => {
		let result = '';
		let promiseResult = [];

		while (chars.length) {
			processChar(chars[0]);
		}

		originalCB();
	}

	toggle();
	processNode();
};

module.exports = transmitter;
