const transmitter = (options, originalCB) => {
	const {
		codes,
		message,
		timeouter,
		toggle,
	} = options;
	let letters = message.split('');
	let curCodes = [];
	let curLoop = curCodes.length

	const sendMessage = (item, length = 1, callback) => {
		const lengths = item === '.' ? 1 : item === '-' ? 3 : length;
		timeouter(function() {
			toggle();
			callback();
		}, lengths);
	}

	const processCurCode = () => {
		if (!curCodes.length) return processMessage(true);
		const item = curCodes.shift();
		var callback = function() {
			if (curCodes.length > 0) {
				sendMessage('', 1, () => processCurCode() );
			} else {
				processCurCode();
			}
		};

		return sendMessage(item, 1, callback);
	}

	// Process a single letter
	const processMessage = prev => {
		if (!letters.length) return originalCB();
		const current = letters.shift();
		if (current === ' ') {
			return sendMessage('', 7, () => processMessage(true) );
		}
		curCodes = codes[current].split('');
		if (current !== ' ' && prev) {
			return sendMessage('', 3, () => processCurCode() );
		}
		processCurCode();
	}

	toggle();
	processMessage();
};

module.exports = transmitter;
