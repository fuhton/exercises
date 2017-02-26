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
				//if there's more to the code, add a dot after
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
		curCodes = codes[letters.shift()].split('');
		if (prev) {
			return sendMessage('', 3, () => processCurCode() );
		}
		// Will do more when ther are more characters to process
		processCurCode(curCodes);
	}

	toggle();
	processMessage();
};

module.exports = transmitter;
