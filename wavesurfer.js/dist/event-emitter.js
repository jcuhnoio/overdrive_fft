/** A simple event emitter that can be used to listen to and emit events. */
class EventEmitter {
    constructor() {
        this.listeners = {};
        /** Subscribe to an event. Returns an unsubscribe function. */
        this.on = this.addEventListener;
        /** Unsubscribe from an event */
        this.un = this.removeEventListener;
    }
    /** Add an event listener */
    addEventListener(event, listener, options) {
        if (!this.listeners[event]) {
            this.listeners[event] = new Set();
        }
        this.listeners[event].add(listener);
        if (options === null || options === void 0 ? void 0 : options.once) {
            const unsubscribeOnce = () => {
                this.removeEventListener(event, unsubscribeOnce);
                this.removeEventListener(event, listener);
            };
            this.addEventListener(event, unsubscribeOnce);
            return unsubscribeOnce;
        }
        return () => this.removeEventListener(event, listener);
    }
    removeEventListener(event, listener) {
        var _a;
        (_a = this.listeners[event]) === null || _a === void 0 ? void 0 : _a.delete(listener);
    }
    /** Subscribe to an event only once */
    once(event, listener) {
        return this.on(event, listener, { once: true });
    }
    /** Clear all events */
    unAll() {
        this.listeners = {};
    }
    /** Emit an event */
    emit(eventName, ...args) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].forEach((listener) => listener(...args));
        }
    }
}
export default EventEmitter;
