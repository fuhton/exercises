const debounce = (callback, timeout) => {
	// I'm running node5.12 because. Please don't hate
	var cur = null;

	// Return a new function so our scope is defined
	return function() {
		const definedCallback = () => {
			// Modify the context, then reset
			callback.apply(this, arguments);
			cur = null;
		};
		// Allow us to to be called multiple times, but keep our integrity
		if (cur) clearTimeout(cur);
		// Set a new timeout
		cur = setTimeout(definedCallback, timeout);
	}
};

module.exports = debounce;
