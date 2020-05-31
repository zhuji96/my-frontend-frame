function useMemo(callback, args) {
	const state = getHookState(index++);

	if (argsChanged(state._args, args)) {
		state._args = args;
		state._callback = callback;
		state._value = callback();
	}

	return state._value;
}

function useCallback(callback, args) {
	return useMemo(() => callback, args);
}

function useRef(initialValue) {
	return useMemo(() => ({ current: initialValue }), []);
}
