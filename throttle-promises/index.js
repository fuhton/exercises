const throttlePromises = (limit, data) => {
	const results = [];
	const promises = data.map((el, i) => ({
		haveRun: false,
		then(resolve) {
			this.haveRun = true;
			el().then(res => {
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

		promises.slice(0, limit).map(el => {
			Promise.resolve(el).then(runNext);
		});
	});
};

module.exports = throttlePromises;
