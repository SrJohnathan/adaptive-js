/*
 * Copyright (c) 2026 Antonio Johnathan
 *
 * Licensed under the MIT License.
 * See LICENSE file in the project root for full license information.
 */
import { createEventSignal } from "./events.js";
export class AdaptiveObserver {
    _get;
    _set;
    _source;
    constructor(initial) {
        const [get, set] = createEventSignal(initial);
        this._get = get;
        this._set = set;
        this._source = set.__adaptiveSource;
    }
    get() {
        return this._get();
    }
    set(value) {
        this._set(value);
    }
    update(fn) {
        this._source.update(fn);
    }
    removeSubscriber(effect) {
        this._source.removeSubscriber(effect);
    }
    // compat: alguns lugares antigos acessavam .value direto
    get value() {
        return this._get();
    }
}
//# sourceMappingURL=adaptive-observer.js.map