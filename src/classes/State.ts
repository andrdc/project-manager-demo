import Listener from "../types/listener.type";

abstract class State<T> {
	protected listeners: Listener<T>[] = [];

	AddListener(listernerFunction: Listener<T>) {
		this.listeners.push(listernerFunction);

		console.debug('listener registered');
	}
}

export default State;