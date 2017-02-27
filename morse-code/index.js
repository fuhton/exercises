const transmitter = (options, originalCallback) => {
	const { codes, message, timeouter, toggle } = options;
	let curChar = message.split('');
	let curCodes = [];

	const sendToggle = (length, callback = defaultToggleCallback) => {
		timeouter(() => {
			toggle();
			callback();
		}, length);
	}

	const defaultToggleCallback = () => {
		if (curCodes.length) return sendToggle(1, processCurCode);
		return processCurCode();
	};

	const processCurCode = () => {
		if (!curCodes.length) return processMessage(true);
		// Only testing two outcomes here anyway...
		return sendToggle(curCodes.shift() === '.' ? 1 : 3);
	}

	// Order is intentional here
	const processMessage = prev => {
		if (!curChar.length) return originalCallback();
		const current = curChar.shift();
		if (current === ' ') return sendToggle(7, processMessage);
		curCodes = codes[current].split('');
		if (prev) return sendToggle(3, processCurCode);
		processCurCode();
	}

	toggle();
	processMessage();
};

module.exports = transmitter;
