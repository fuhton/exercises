const push = '$push';
const unshift = '$unshift';
const splice = '$splice';
const set = '$set';
const merge = '$merge';
const apply = '$apply';

const avilCommands = {};
avilCommands[push] = true;
avilCommands[unshift] = true;
avilCommands[splice] = true;
avilCommands[set] = true;
avilCommands[merge] = true;
avilCommands[apply] = true;

const shallowCopy = option => {
	if ('object' === typeof option) {
		return Object.assign(new option.constructor(), option);
	} else {
		return option;
	}
}

const update = (state, mods) => {
	if (!!mods[set]) {
		return mods[set];
	}

	let newState = shallowCopy(state);

	if (!!mods[merge]) Object.assign(newState, mods[merge]);
	if (!!mods[push]) mods[push].forEach( item => newState.push(item) );
	if (!!mods[unshift]) mods[unshift].forEach( item => newState.unshift(item) );
	if (!!mods[splice]) mods[splice].forEach( item => newState.splice.apply(newState, item) );
	if (!!mods[apply]) newState = mods[apply](newState);

	Object.keys(mods).map( k => {
		if (!(avilCommands.hasOwnProperty(k) && avilCommands[k])) {
			newState[k] = update(state[k], mods[k]);
		}
	})

	return newState;
}

module.exports = update;
