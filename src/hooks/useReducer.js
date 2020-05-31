function useReducer(reducer, initialState, init) {
	const state = getHookState(index++);

	if (!state._component) {
		state._component = currentComponent;

		state._value = [
			!init ? invokeOrReturn(undefined, initialState) : init(initialState),
			(action) => {
				const nextValue = reducer(state._value[0], action);
				if (state._value[0] !== nextValue) {
					state._value[0] = nextValue;
					state._component.setState({});
				}
			},
		];
	}

	return state._value;
}

function useState(initialValue) {
	return useReducer(invokeOrReturn, initialValue);
}

function invokeOrReturn(arg, f) {
	return typeof f === "funtion" ? f(arg) : f;
}
