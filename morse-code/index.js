const transmitter = (options, originalCB) => {
	const handler = {
		set(target, key, value) {
			target[key] = value;
			processMessage(value);
		},
	};

	const otherHandler = {
		set(target, key, value) {
			if ( key === 'length' && !value ) {
				target[key] = value;
				updateChars();
				return true;
			}
			target[key] = value;
			processChar();
			return true;
		},
	};

	const {
		codes,
		message,
		timeouter,
		toggle,
	} = options;
	let chars = new Proxy(message.split(''), handler);
	let codeLength = [];//= new Proxy([], otherHandler);
	let curLoop = codeLength.length

	const updateChars = () => chars.shift();
	const updateCodeLength = () => codeLength.shift();

	const sendMessage = (item, length = 1) => {
		const lengths = item === '.' ? 1 : item === '-' ? 3 : length;
		timeouter(function() {
			toggle();
			updateCodeLength();
		}, lengths);
	}

	const processChar = (option = codeLength[0]) => {
		if (codeLength.length === curLoop) return;
		curLoop = codeLength.length
		sendMessage(option);
	}

	const processMessage = prev => {
		if (codeLength.length !== curLoop) {
			sendMessage('', 1);
		}
		if (!chars.length) originalCB();
		codeLength = new Proxy(codes[chars[0]].split(''), otherHandler);
		processChar();
	}

	toggle();
	processMessage();
};

module.exports = transmitter;
