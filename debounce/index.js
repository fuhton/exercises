const debounce = (callback, timeout) => {
	let cur = null;

	// Make sure our scope is contained
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
