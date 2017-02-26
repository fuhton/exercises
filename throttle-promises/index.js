const throttlePromises = (limit, data) => {
	const results = [];
	const promises = data.map((p, i) => ({
		haveRun: false,
		then(resolve) {
			this.haveRun = true;
			p().then(res => {
				results[i] = res;
				resolve(res);
			});
		}
	}));

	const findNext = () => data.findIndex((el, i) => {
		if (!promises[i].haveRun) return true;
	});

	return new Promise(resolve => {
		let running = 0;
		const runNext = () => {
			const next = findNext();
			if (-1 === next) {
				if (++running === limit) resolve(results)
			} else {
				Promise.resolve(promises[next]).then(runNext);
			}
		};

		promises.slice(0, limit).map(promise => {
			Promise.resolve(promise).then(runNext);
		});
	});
};

module.exports = throttlePromises;
