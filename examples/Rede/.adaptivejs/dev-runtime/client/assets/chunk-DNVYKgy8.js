import { _ as jsx, a as init, b as __exportAll, t as markClientExport, y as callServerAction } from "./chunk-CME3klQt.js";
import { _ as setOnlineAgents, c as isTyping, d as removeConversation, g as setLastError, h as setConnection, l as markConversationRead, n as applyBootstrap, p as selectedConversationId, r as applyConversation, t as appendMessage, v as setTyping } from "./chunk-DSTwi42U.js";
import { t as showToast } from "./chunk-BfKm4NCt.js";

//#region ../../node_modules/engine.io-parser/build/esm/commons.js
const PACKET_TYPES = Object.create(null);
PACKET_TYPES["open"] = "0";
PACKET_TYPES["close"] = "1";
PACKET_TYPES["ping"] = "2";
PACKET_TYPES["pong"] = "3";
PACKET_TYPES["message"] = "4";
PACKET_TYPES["upgrade"] = "5";
PACKET_TYPES["noop"] = "6";
const PACKET_TYPES_REVERSE = Object.create(null);
Object.keys(PACKET_TYPES).forEach((key) => {
	PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
});
const ERROR_PACKET = {
	type: "error",
	data: "parser error"
};

//#endregion
//#region ../../node_modules/engine.io-parser/build/esm/encodePacket.browser.js
const withNativeBlob$1 = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
const withNativeArrayBuffer$2 = typeof ArrayBuffer === "function";
const isView$1 = (obj) => {
	return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
};
const encodePacket = ({ type, data }, supportsBinary, callback) => {
	if (withNativeBlob$1 && data instanceof Blob) {
		if (supportsBinary) return callback(data);
		else return encodeBlobAsBase64(data, callback);
	} else if (withNativeArrayBuffer$2 && (data instanceof ArrayBuffer || isView$1(data))) {
		if (supportsBinary) return callback(data);
		else return encodeBlobAsBase64(new Blob([data]), callback);
	}
	return callback(PACKET_TYPES[type] + (data || ""));
};
const encodeBlobAsBase64 = (data, callback) => {
	const fileReader = new FileReader();
	fileReader.onload = function() {
		const content = fileReader.result.split(",")[1];
		callback("b" + (content || ""));
	};
	return fileReader.readAsDataURL(data);
};
function toArray(data) {
	if (data instanceof Uint8Array) return data;
	else if (data instanceof ArrayBuffer) return new Uint8Array(data);
	else return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
}
let TEXT_ENCODER;
function encodePacketToBinary(packet, callback) {
	if (withNativeBlob$1 && packet.data instanceof Blob) return packet.data.arrayBuffer().then(toArray).then(callback);
	else if (withNativeArrayBuffer$2 && (packet.data instanceof ArrayBuffer || isView$1(packet.data))) return callback(toArray(packet.data));
	encodePacket(packet, false, (encoded) => {
		if (!TEXT_ENCODER) TEXT_ENCODER = new TextEncoder();
		callback(TEXT_ENCODER.encode(encoded));
	});
}

//#endregion
//#region ../../node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const lookup$1 = typeof Uint8Array === "undefined" ? [] : /* @__PURE__ */ new Uint8Array(256);
for (let i = 0; i < 64; i++) lookup$1[chars.charCodeAt(i)] = i;
const decode$1 = (base64) => {
	let bufferLength = base64.length * .75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
	if (base64[base64.length - 1] === "=") {
		bufferLength--;
		if (base64[base64.length - 2] === "=") bufferLength--;
	}
	const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
	for (i = 0; i < len; i += 4) {
		encoded1 = lookup$1[base64.charCodeAt(i)];
		encoded2 = lookup$1[base64.charCodeAt(i + 1)];
		encoded3 = lookup$1[base64.charCodeAt(i + 2)];
		encoded4 = lookup$1[base64.charCodeAt(i + 3)];
		bytes[p++] = encoded1 << 2 | encoded2 >> 4;
		bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
		bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
	}
	return arraybuffer;
};

//#endregion
//#region ../../node_modules/engine.io-parser/build/esm/decodePacket.browser.js
const withNativeArrayBuffer$1 = typeof ArrayBuffer === "function";
const decodePacket = (encodedPacket, binaryType) => {
	if (typeof encodedPacket !== "string") return {
		type: "message",
		data: mapBinary(encodedPacket, binaryType)
	};
	const type = encodedPacket.charAt(0);
	if (type === "b") return {
		type: "message",
		data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
	};
	if (!PACKET_TYPES_REVERSE[type]) return ERROR_PACKET;
	return encodedPacket.length > 1 ? {
		type: PACKET_TYPES_REVERSE[type],
		data: encodedPacket.substring(1)
	} : { type: PACKET_TYPES_REVERSE[type] };
};
const decodeBase64Packet = (data, binaryType) => {
	if (withNativeArrayBuffer$1) {
		const decoded = decode$1(data);
		return mapBinary(decoded, binaryType);
	} else return {
		base64: true,
		data
	};
};
const mapBinary = (data, binaryType) => {
	switch (binaryType) {
		case "blob": if (data instanceof Blob) return data;
		else return new Blob([data]);
		default: if (data instanceof ArrayBuffer) return data;
		else return data.buffer;
	}
};

//#endregion
//#region ../../node_modules/engine.io-parser/build/esm/index.js
const SEPARATOR = String.fromCharCode(30);
const encodePayload = (packets, callback) => {
	const length = packets.length;
	const encodedPackets = new Array(length);
	let count = 0;
	packets.forEach((packet, i) => {
		encodePacket(packet, false, (encodedPacket) => {
			encodedPackets[i] = encodedPacket;
			if (++count === length) callback(encodedPackets.join(SEPARATOR));
		});
	});
};
const decodePayload = (encodedPayload, binaryType) => {
	const encodedPackets = encodedPayload.split(SEPARATOR);
	const packets = [];
	for (let i = 0; i < encodedPackets.length; i++) {
		const decodedPacket = decodePacket(encodedPackets[i], binaryType);
		packets.push(decodedPacket);
		if (decodedPacket.type === "error") break;
	}
	return packets;
};
function createPacketEncoderStream() {
	return new TransformStream({ transform(packet, controller) {
		encodePacketToBinary(packet, (encodedPacket) => {
			const payloadLength = encodedPacket.length;
			let header;
			if (payloadLength < 126) {
				header = /* @__PURE__ */ new Uint8Array(1);
				new DataView(header.buffer).setUint8(0, payloadLength);
			} else if (payloadLength < 65536) {
				header = /* @__PURE__ */ new Uint8Array(3);
				const view = new DataView(header.buffer);
				view.setUint8(0, 126);
				view.setUint16(1, payloadLength);
			} else {
				header = /* @__PURE__ */ new Uint8Array(9);
				const view = new DataView(header.buffer);
				view.setUint8(0, 127);
				view.setBigUint64(1, BigInt(payloadLength));
			}
			if (packet.data && typeof packet.data !== "string") header[0] |= 128;
			controller.enqueue(header);
			controller.enqueue(encodedPacket);
		});
	} });
}
let TEXT_DECODER;
function totalLength(chunks) {
	return chunks.reduce((acc, chunk) => acc + chunk.length, 0);
}
function concatChunks(chunks, size) {
	if (chunks[0].length === size) return chunks.shift();
	const buffer = new Uint8Array(size);
	let j = 0;
	for (let i = 0; i < size; i++) {
		buffer[i] = chunks[0][j++];
		if (j === chunks[0].length) {
			chunks.shift();
			j = 0;
		}
	}
	if (chunks.length && j < chunks[0].length) chunks[0] = chunks[0].slice(j);
	return buffer;
}
function createPacketDecoderStream(maxPayload, binaryType) {
	if (!TEXT_DECODER) TEXT_DECODER = new TextDecoder();
	const chunks = [];
	let state = 0;
	let expectedLength = -1;
	let isBinary = false;
	return new TransformStream({ transform(chunk, controller) {
		chunks.push(chunk);
		while (true) {
			if (state === 0) {
				if (totalLength(chunks) < 1) break;
				const header = concatChunks(chunks, 1);
				isBinary = (header[0] & 128) === 128;
				expectedLength = header[0] & 127;
				if (expectedLength < 126) state = 3;
				else if (expectedLength === 126) state = 1;
				else state = 2;
			} else if (state === 1) {
				if (totalLength(chunks) < 2) break;
				const headerArray = concatChunks(chunks, 2);
				expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
				state = 3;
			} else if (state === 2) {
				if (totalLength(chunks) < 8) break;
				const headerArray = concatChunks(chunks, 8);
				const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
				const n = view.getUint32(0);
				if (n > Math.pow(2, 21) - 1) {
					controller.enqueue(ERROR_PACKET);
					break;
				}
				expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
				state = 3;
			} else {
				if (totalLength(chunks) < expectedLength) break;
				const data = concatChunks(chunks, expectedLength);
				controller.enqueue(decodePacket(isBinary ? data : TEXT_DECODER.decode(data), binaryType));
				state = 0;
			}
			if (expectedLength === 0 || expectedLength > maxPayload) {
				controller.enqueue(ERROR_PACKET);
				break;
			}
		}
	} });
}

//#endregion
//#region ../../node_modules/@socket.io/component-emitter/lib/esm/index.js
/**
* Initialize a new `Emitter`.
*
* @api public
*/
function Emitter(obj) {
	if (obj) return mixin(obj);
}
/**
* Mixin the emitter properties.
*
* @param {Object} obj
* @return {Object}
* @api private
*/
function mixin(obj) {
	for (var key in Emitter.prototype) obj[key] = Emitter.prototype[key];
	return obj;
}
/**
* Listen on the given `event` with `fn`.
*
* @param {String} event
* @param {Function} fn
* @return {Emitter}
* @api public
*/
Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
	this._callbacks = this._callbacks || {};
	(this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
	return this;
};
/**
* Adds an `event` listener that will be invoked a single
* time then automatically removed.
*
* @param {String} event
* @param {Function} fn
* @return {Emitter}
* @api public
*/
Emitter.prototype.once = function(event, fn) {
	function on() {
		this.off(event, on);
		fn.apply(this, arguments);
	}
	on.fn = fn;
	this.on(event, on);
	return this;
};
/**
* Remove the given callback for `event` or all
* registered callbacks.
*
* @param {String} event
* @param {Function} fn
* @return {Emitter}
* @api public
*/
Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
	this._callbacks = this._callbacks || {};
	if (0 == arguments.length) {
		this._callbacks = {};
		return this;
	}
	var callbacks = this._callbacks["$" + event];
	if (!callbacks) return this;
	if (1 == arguments.length) {
		delete this._callbacks["$" + event];
		return this;
	}
	var cb;
	for (var i = 0; i < callbacks.length; i++) {
		cb = callbacks[i];
		if (cb === fn || cb.fn === fn) {
			callbacks.splice(i, 1);
			break;
		}
	}
	if (callbacks.length === 0) delete this._callbacks["$" + event];
	return this;
};
/**
* Emit `event` with the given args.
*
* @param {String} event
* @param {Mixed} ...
* @return {Emitter}
*/
Emitter.prototype.emit = function(event) {
	this._callbacks = this._callbacks || {};
	var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
	for (var i = 1; i < arguments.length; i++) args[i - 1] = arguments[i];
	if (callbacks) {
		callbacks = callbacks.slice(0);
		for (var i = 0, len = callbacks.length; i < len; ++i) callbacks[i].apply(this, args);
	}
	return this;
};
Emitter.prototype.emitReserved = Emitter.prototype.emit;
/**
* Return array of callbacks for `event`.
*
* @param {String} event
* @return {Array}
* @api public
*/
Emitter.prototype.listeners = function(event) {
	this._callbacks = this._callbacks || {};
	return this._callbacks["$" + event] || [];
};
/**
* Check if this emitter has `event` handlers.
*
* @param {String} event
* @return {Boolean}
* @api public
*/
Emitter.prototype.hasListeners = function(event) {
	return !!this.listeners(event).length;
};

//#endregion
//#region ../../node_modules/engine.io-client/build/esm/globals.js
const nextTick = (() => {
	if (typeof Promise === "function" && typeof Promise.resolve === "function") return (cb) => Promise.resolve().then(cb);
	else return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
})();
const globalThisShim = (() => {
	if (typeof self !== "undefined") return self;
	else if (typeof window !== "undefined") return window;
	else return Function("return this")();
})();
const defaultBinaryType = "arraybuffer";
function createCookieJar() {}

//#endregion
//#region ../../node_modules/engine.io-client/build/esm/util.js
function pick(obj, ...attr) {
	return attr.reduce((acc, k) => {
		if (obj.hasOwnProperty(k)) acc[k] = obj[k];
		return acc;
	}, {});
}
const NATIVE_SET_TIMEOUT = globalThisShim.setTimeout;
const NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
function installTimerFunctions(obj, opts) {
	if (opts.useNativeTimers) {
		obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
		obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
	} else {
		obj.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim);
		obj.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim);
	}
}
const BASE64_OVERHEAD = 1.33;
function byteLength(obj) {
	if (typeof obj === "string") return utf8Length(obj);
	return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
}
function utf8Length(str) {
	let c = 0, length = 0;
	for (let i = 0, l = str.length; i < l; i++) {
		c = str.charCodeAt(i);
		if (c < 128) length += 1;
		else if (c < 2048) length += 2;
		else if (c < 55296 || c >= 57344) length += 3;
		else {
			i++;
			length += 4;
		}
	}
	return length;
}
/**
* Generates a random 8-characters string.
*/
function randomString() {
	return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
}

//#endregion
//#region ../../node_modules/engine.io-client/build/esm/contrib/parseqs.js
/**
* Compiles a querystring
* Returns string representation of the object
*
* @param {Object}
* @api private
*/
function encode(obj) {
	let str = "";
	for (let i in obj) if (obj.hasOwnProperty(i)) {
		if (str.length) str += "&";
		str += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]);
	}
	return str;
}
/**
* Parses a simple querystring into an object
*
* @param {String} qs
* @api private
*/
function decode(qs) {
	let qry = {};
	let pairs = qs.split("&");
	for (let i = 0, l = pairs.length; i < l; i++) {
		let pair = pairs[i].split("=");
		qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	}
	return qry;
}

//#endregion
//#region ../../node_modules/engine.io-client/build/esm/transport.js
var TransportError = class extends Error {
	constructor(reason, description, context) {
		super(reason);
		this.description = description;
		this.context = context;
		this.type = "TransportError";
	}
};
var Transport = class extends Emitter {
	/**
	* Transport abstract constructor.
	*
	* @param {Object} opts - options
	* @protected
	*/
	constructor(opts) {
		super();
		this.writable = false;
		installTimerFunctions(this, opts);
		this.opts = opts;
		this.query = opts.query;
		this.socket = opts.socket;
		this.supportsBinary = !opts.forceBase64;
	}
	/**
	* Emits an error.
	*
	* @param {String} reason
	* @param description
	* @param context - the error context
	* @return {Transport} for chaining
	* @protected
	*/
	onError(reason, description, context) {
		super.emitReserved("error", new TransportError(reason, description, context));
		return this;
	}
	/**
	* Opens the transport.
	*/
	open() {
		this.readyState = "opening";
		this.doOpen();
		return this;
	}
	/**
	* Closes the transport.
	*/
	close() {
		if (this.readyState === "opening" || this.readyState === "open") {
			this.doClose();
			this.onClose();
		}
		return this;
	}
	/**
	* Sends multiple packets.
	*
	* @param {Array} packets
	*/
	send(packets) {
		if (this.readyState === "open") this.write(packets);
	}
	/**
	* Called upon open
	*
	* @protected
	*/
	onOpen() {
		this.readyState = "open";
		this.writable = true;
		super.emitReserved("open");
	}
	/**
	* Called with data.
	*
	* @param {String} data
	* @protected
	*/
	onData(data) {
		const packet = decodePacket(data, this.socket.binaryType);
		this.onPacket(packet);
	}
	/**
	* Called with a decoded packet.
	*
	* @protected
	*/
	onPacket(packet) {
		super.emitReserved("packet", packet);
	}
	/**
	* Called upon close.
	*
	* @protected
	*/
	onClose(details) {
		this.readyState = "closed";
		super.emitReserved("close", details);
	}
	/**
	* Pauses the transport, in order not to lose packets during an upgrade.
	*
	* @param onPause
	*/
	pause(onPause) {}
	createUri(schema, query = {}) {
		return schema + "://" + this._hostname() + this._port() + this.opts.path + this._query(query);
	}
	_hostname() {
		const hostname = this.opts.hostname;
		return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
	}
	_port() {
		if (this.opts.port && (this.opts.secure && Number(this.opts.port) !== 443 || !this.opts.secure && Number(this.opts.port) !== 80)) return ":" + this.opts.port;
		else return "";
	}
	_query(query) {
		const encodedQuery = encode(query);
		return encodedQuery.length ? "?" + encodedQuery : "";
	}
};

//#endregion
//#region ../../node_modules/engine.io-client/build/esm/transports/polling.js
var Polling = class extends Transport {
	constructor() {
		super(...arguments);
		this._polling = false;
	}
	get name() {
		return "polling";
	}
	/**
	* Opens the socket (triggers polling). We write a PING message to determine
	* when the transport is open.
	*
	* @protected
	*/
	doOpen() {
		this._poll();
	}
	/**
	* Pauses polling.
	*
	* @param {Function} onPause - callback upon buffers are flushed and transport is paused
	* @package
	*/
	pause(onPause) {
		this.readyState = "pausing";
		const pause = () => {
			this.readyState = "paused";
			onPause();
		};
		if (this._polling || !this.writable) {
			let total = 0;
			if (this._polling) {
				total++;
				this.once("pollComplete", function() {
					--total || pause();
				});
			}
			if (!this.writable) {
				total++;
				this.once("drain", function() {
					--total || pause();
				});
			}
		} else pause();
	}
	/**
	* Starts polling cycle.
	*
	* @private
	*/
	_poll() {
		this._polling = true;
		this.doPoll();
		this.emitReserved("poll");
	}
	/**
	* Overloads onData to detect payloads.
	*
	* @protected
	*/
	onData(data) {
		const callback = (packet) => {
			if ("opening" === this.readyState && packet.type === "open") this.onOpen();
			if ("close" === packet.type) {
				this.onClose({ description: "transport closed by the server" });
				return false;
			}
			this.onPacket(packet);
		};
		decodePayload(data, this.socket.binaryType).forEach(callback);
		if ("closed" !== this.readyState) {
			this._polling = false;
			this.emitReserved("pollComplete");
			if ("open" === this.readyState) this._poll();
		}
	}
	/**
	* For polling, send a close packet.
	*
	* @protected
	*/
	doClose() {
		const close = () => {
			this.write([{ type: "close" }]);
		};
		if ("open" === this.readyState) close();
		else this.once("open", close);
	}
	/**
	* Writes a packets payload.
	*
	* @param {Array} packets - data packets
	* @protected
	*/
	write(packets) {
		this.writable = false;
		encodePayload(packets, (data) => {
			this.doWrite(data, () => {
				this.writable = true;
				this.emitReserved("drain");
			});
		});
	}
	/**
	* Generates uri for connection.
	*
	* @private
	*/
	uri() {
		const schema = this.opts.secure ? "https" : "http";
		const query = this.query || {};
		if (false !== this.opts.timestampRequests) query[this.opts.timestampParam] = randomString();
		if (!this.supportsBinary && !query.sid) query.b64 = 1;
		return this.createUri(schema, query);
	}
};

//#endregion
//#region ../../node_modules/engine.io-client/build/esm/contrib/has-cors.js
let value = false;
try {
	value = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
} catch (err) {}
const hasCORS = value;

//#endregion
//#region ../../node_modules/engine.io-client/build/esm/transports/polling-xhr.js
function empty() {}
var BaseXHR = class extends Polling {
	/**
	* XHR Polling constructor.
	*
	* @param {Object} opts
	* @package
	*/
	constructor(opts) {
		super(opts);
		if (typeof location !== "undefined") {
			const isSSL = "https:" === location.protocol;
			let port = location.port;
			if (!port) port = isSSL ? "443" : "80";
			this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
		}
	}
	/**
	* Sends data.
	*
	* @param {String} data - data to send.
	* @param {Function} fn - called upon flush.
	* @private
	*/
	doWrite(data, fn) {
		const req = this.request({
			method: "POST",
			data
		});
		req.on("success", fn);
		req.on("error", (xhrStatus, context) => {
			this.onError("xhr post error", xhrStatus, context);
		});
	}
	/**
	* Starts a poll cycle.
	*
	* @private
	*/
	doPoll() {
		const req = this.request();
		req.on("data", this.onData.bind(this));
		req.on("error", (xhrStatus, context) => {
			this.onError("xhr poll error", xhrStatus, context);
		});
		this.pollXhr = req;
	}
};
var Request = class Request extends Emitter {
	/**
	* Request constructor
	*
	* @param {Object} options
	* @package
	*/
	constructor(createRequest, uri, opts) {
		super();
		this.createRequest = createRequest;
		installTimerFunctions(this, opts);
		this._opts = opts;
		this._method = opts.method || "GET";
		this._uri = uri;
		this._data = void 0 !== opts.data ? opts.data : null;
		this._create();
	}
	/**
	* Creates the XHR object and sends the request.
	*
	* @private
	*/
	_create() {
		var _a;
		const opts = pick(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
		opts.xdomain = !!this._opts.xd;
		const xhr = this._xhr = this.createRequest(opts);
		try {
			xhr.open(this._method, this._uri, true);
			try {
				if (this._opts.extraHeaders) {
					xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
					for (let i in this._opts.extraHeaders) if (this._opts.extraHeaders.hasOwnProperty(i)) xhr.setRequestHeader(i, this._opts.extraHeaders[i]);
				}
			} catch (e) {}
			if ("POST" === this._method) try {
				xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
			} catch (e) {}
			try {
				xhr.setRequestHeader("Accept", "*/*");
			} catch (e) {}
			(_a = this._opts.cookieJar) === null || _a === void 0 || _a.addCookies(xhr);
			if ("withCredentials" in xhr) xhr.withCredentials = this._opts.withCredentials;
			if (this._opts.requestTimeout) xhr.timeout = this._opts.requestTimeout;
			xhr.onreadystatechange = () => {
				var _a;
				if (xhr.readyState === 3) (_a = this._opts.cookieJar) === null || _a === void 0 || _a.parseCookies(xhr.getResponseHeader("set-cookie"));
				if (4 !== xhr.readyState) return;
				if (200 === xhr.status || 1223 === xhr.status) this._onLoad();
				else this.setTimeoutFn(() => {
					this._onError(typeof xhr.status === "number" ? xhr.status : 0);
				}, 0);
			};
			xhr.send(this._data);
		} catch (e) {
			this.setTimeoutFn(() => {
				this._onError(e);
			}, 0);
			return;
		}
		if (typeof document !== "undefined") {
			this._index = Request.requestsCount++;
			Request.requests[this._index] = this;
		}
	}
	/**
	* Called upon error.
	*
	* @private
	*/
	_onError(err) {
		this.emitReserved("error", err, this._xhr);
		this._cleanup(true);
	}
	/**
	* Cleans up house.
	*
	* @private
	*/
	_cleanup(fromError) {
		if ("undefined" === typeof this._xhr || null === this._xhr) return;
		this._xhr.onreadystatechange = empty;
		if (fromError) try {
			this._xhr.abort();
		} catch (e) {}
		if (typeof document !== "undefined") delete Request.requests[this._index];
		this._xhr = null;
	}
	/**
	* Called upon load.
	*
	* @private
	*/
	_onLoad() {
		const data = this._xhr.responseText;
		if (data !== null) {
			this.emitReserved("data", data);
			this.emitReserved("success");
			this._cleanup();
		}
	}
	/**
	* Aborts the request.
	*
	* @package
	*/
	abort() {
		this._cleanup();
	}
};
Request.requestsCount = 0;
Request.requests = {};
/**
* Aborts pending requests when unloading the window. This is needed to prevent
* memory leaks (e.g. when using IE) and to ensure that no spurious error is
* emitted.
*/
if (typeof document !== "undefined") {
	if (typeof attachEvent === "function") attachEvent("onunload", unloadHandler);
	else if (typeof addEventListener === "function") {
		const terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
		addEventListener(terminationEvent, unloadHandler, false);
	}
}
function unloadHandler() {
	for (let i in Request.requests) if (Request.requests.hasOwnProperty(i)) Request.requests[i].abort();
}
const hasXHR2 = (function() {
	const xhr = newRequest({ xdomain: false });
	return xhr && xhr.responseType !== null;
})();
/**
* HTTP long-polling based on the built-in `XMLHttpRequest` object.
*
* Usage: browser
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
*/
var XHR = class extends BaseXHR {
	constructor(opts) {
		super(opts);
		const forceBase64 = opts && opts.forceBase64;
		this.supportsBinary = hasXHR2 && !forceBase64;
	}
	request(opts = {}) {
		Object.assign(opts, { xd: this.xd }, this.opts);
		return new Request(newRequest, this.uri(), opts);
	}
};
function newRequest(opts) {
	const xdomain = opts.xdomain;
	try {
		if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) return new XMLHttpRequest();
	} catch (e) {}
	if (!xdomain) try {
		return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
	} catch (e) {}
}

//#endregion
//#region ../../node_modules/engine.io-client/build/esm/transports/websocket.js
const isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
var BaseWS = class extends Transport {
	get name() {
		return "websocket";
	}
	doOpen() {
		const uri = this.uri();
		const protocols = this.opts.protocols;
		const opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
		if (this.opts.extraHeaders) opts.headers = this.opts.extraHeaders;
		try {
			this.ws = this.createSocket(uri, protocols, opts);
		} catch (err) {
			return this.emitReserved("error", err);
		}
		this.ws.binaryType = this.socket.binaryType;
		this.addEventListeners();
	}
	/**
	* Adds event listeners to the socket
	*
	* @private
	*/
	addEventListeners() {
		this.ws.onopen = () => {
			if (this.opts.autoUnref) this.ws._socket.unref();
			this.onOpen();
		};
		this.ws.onclose = (closeEvent) => this.onClose({
			description: "websocket connection closed",
			context: closeEvent
		});
		this.ws.onmessage = (ev) => this.onData(ev.data);
		this.ws.onerror = (e) => this.onError("websocket error", e);
	}
	write(packets) {
		this.writable = false;
		for (let i = 0; i < packets.length; i++) {
			const packet = packets[i];
			const lastPacket = i === packets.length - 1;
			encodePacket(packet, this.supportsBinary, (data) => {
				try {
					this.doWrite(packet, data);
				} catch (e) {}
				if (lastPacket) nextTick(() => {
					this.writable = true;
					this.emitReserved("drain");
				}, this.setTimeoutFn);
			});
		}
	}
	doClose() {
		if (typeof this.ws !== "undefined") {
			this.ws.onerror = () => {};
			this.ws.close();
			this.ws = null;
		}
	}
	/**
	* Generates uri for connection.
	*
	* @private
	*/
	uri() {
		const schema = this.opts.secure ? "wss" : "ws";
		const query = this.query || {};
		if (this.opts.timestampRequests) query[this.opts.timestampParam] = randomString();
		if (!this.supportsBinary) query.b64 = 1;
		return this.createUri(schema, query);
	}
};
const WebSocketCtor = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
/**
* WebSocket transport based on the built-in `WebSocket` object.
*
* Usage: browser, Node.js (since v21), Deno, Bun
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket
* @see https://caniuse.com/mdn-api_websocket
* @see https://nodejs.org/api/globals.html#websocket
*/
var WS = class extends BaseWS {
	createSocket(uri, protocols, opts) {
		return !isReactNative ? protocols ? new WebSocketCtor(uri, protocols) : new WebSocketCtor(uri) : new WebSocketCtor(uri, protocols, opts);
	}
	doWrite(_packet, data) {
		this.ws.send(data);
	}
};

//#endregion
//#region ../../node_modules/engine.io-client/build/esm/transports/webtransport.js
/**
* WebTransport transport based on the built-in `WebTransport` object.
*
* Usage: browser, Node.js (with the `@fails-components/webtransport` package)
*
* @see https://developer.mozilla.org/en-US/docs/Web/API/WebTransport
* @see https://caniuse.com/webtransport
*/
var WT = class extends Transport {
	get name() {
		return "webtransport";
	}
	doOpen() {
		try {
			this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
		} catch (err) {
			return this.emitReserved("error", err);
		}
		this._transport.closed.then(() => {
			this.onClose();
		}).catch((err) => {
			this.onError("webtransport error", err);
		});
		this._transport.ready.then(() => {
			this._transport.createBidirectionalStream().then((stream) => {
				const decoderStream = createPacketDecoderStream(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
				const reader = stream.readable.pipeThrough(decoderStream).getReader();
				const encoderStream = createPacketEncoderStream();
				encoderStream.readable.pipeTo(stream.writable);
				this._writer = encoderStream.writable.getWriter();
				const read = () => {
					reader.read().then(({ done, value }) => {
						if (done) return;
						this.onPacket(value);
						read();
					}).catch((err) => {});
				};
				read();
				const packet = { type: "open" };
				if (this.query.sid) packet.data = `{"sid":"${this.query.sid}"}`;
				this._writer.write(packet).then(() => this.onOpen());
			});
		});
	}
	write(packets) {
		this.writable = false;
		for (let i = 0; i < packets.length; i++) {
			const packet = packets[i];
			const lastPacket = i === packets.length - 1;
			this._writer.write(packet).then(() => {
				if (lastPacket) nextTick(() => {
					this.writable = true;
					this.emitReserved("drain");
				}, this.setTimeoutFn);
			});
		}
	}
	doClose() {
		var _a;
		(_a = this._transport) === null || _a === void 0 || _a.close();
	}
};

//#endregion
//#region ../../node_modules/engine.io-client/build/esm/transports/index.js
const transports = {
	websocket: WS,
	webtransport: WT,
	polling: XHR
};

//#endregion
//#region ../../node_modules/engine.io-client/build/esm/contrib/parseuri.js
/**
* Parses a URI
*
* Note: we could also have used the built-in URL object, but it isn't supported on all platforms.
*
* See:
* - https://developer.mozilla.org/en-US/docs/Web/API/URL
* - https://caniuse.com/url
* - https://www.rfc-editor.org/rfc/rfc3986#appendix-B
*
* History of the parse() method:
* - first commit: https://github.com/socketio/socket.io-client/commit/4ee1d5d94b3906a9c052b459f1a818b15f38f91c
* - export into its own module: https://github.com/socketio/engine.io-client/commit/de2c561e4564efeb78f1bdb1ba39ef81b2822cb3
* - reimport: https://github.com/socketio/engine.io-client/commit/df32277c3f6d622eec5ed09f493cae3f3391d242
*
* @author Steven Levithan <stevenlevithan.com> (MIT license)
* @api private
*/
const re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
const parts = [
	"source",
	"protocol",
	"authority",
	"userInfo",
	"user",
	"password",
	"host",
	"port",
	"relative",
	"path",
	"directory",
	"file",
	"query",
	"anchor"
];
function parse(str) {
	if (str.length > 8e3) throw "URI too long";
	const src = str, b = str.indexOf("["), e = str.indexOf("]");
	if (b != -1 && e != -1) str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
	let m = re.exec(str || ""), uri = {}, i = 14;
	while (i--) uri[parts[i]] = m[i] || "";
	if (b != -1 && e != -1) {
		uri.source = src;
		uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
		uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
		uri.ipv6uri = true;
	}
	uri.pathNames = pathNames(uri, uri["path"]);
	uri.queryKey = queryKey(uri, uri["query"]);
	return uri;
}
function pathNames(obj, path) {
	const names = path.replace(/\/{2,9}/g, "/").split("/");
	if (path.slice(0, 1) == "/" || path.length === 0) names.splice(0, 1);
	if (path.slice(-1) == "/") names.splice(names.length - 1, 1);
	return names;
}
function queryKey(uri, query) {
	const data = {};
	query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
		if ($1) data[$1] = $2;
	});
	return data;
}

//#endregion
//#region ../../node_modules/engine.io-client/build/esm/socket.js
const withEventListeners = typeof addEventListener === "function" && typeof removeEventListener === "function";
const OFFLINE_EVENT_LISTENERS = [];
if (withEventListeners) addEventListener("offline", () => {
	OFFLINE_EVENT_LISTENERS.forEach((listener) => listener());
}, false);
/**
* This class provides a WebSocket-like interface to connect to an Engine.IO server. The connection will be established
* with one of the available low-level transports, like HTTP long-polling, WebSocket, or WebTransport.
*
* This class comes with an upgrade mechanism, which means that once the connection is established with the first
* low-level transport, it will try to upgrade to a better transport.
*
* @example
* import { Socket } from "engine.io-client";
*
* const socket = new Socket();
*
* socket.on("open", () => {
*   socket.send("hello");
* });
*
*/
var Socket$1 = class Socket$1 extends Emitter {
	constructor(uri, opts = {}) {
		var _a, _b;
		super();
		this.binaryType = defaultBinaryType;
		this.writeBuffer = [];
		this._prevBufferLen = 0;
		this._upgrades = [];
		this._pingInterval = -1;
		this._pingTimeout = -1;
		this._maxPayload = -1;
		/**
		* The expiration timestamp of the {@link _pingTimeoutTimer} object is tracked, in case the timer is throttled and the
		* callback is not fired on time. This can happen for example when a laptop is suspended or when a phone is locked.
		*/
		this._pingTimeoutTime = Infinity;
		if (uri && "object" === typeof uri) {
			opts = uri;
			uri = null;
		}
		if (uri) {
			const parsedUri = parse(uri);
			opts.hostname = parsedUri.host;
			opts.secure = parsedUri.protocol === "https" || parsedUri.protocol === "wss";
			opts.port = parsedUri.port;
			if (parsedUri.query) opts.query = parsedUri.query;
		} else if (opts.host) opts.hostname = parse(opts.host).host;
		installTimerFunctions(this, opts);
		this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
		if (opts.hostname && !opts.port) opts.port = this.secure ? "443" : "80";
		this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
		this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
		if (opts.transportImplementations && opts.transports) throw new Error("specifying both 'transportImplementations' and 'transports' options is not supported");
		if (opts.transportImplementations || ((_a = opts.transports) === null || _a === void 0 ? void 0 : _a.length) && typeof opts.transports[0] === "function") {
			this.transports = [];
			this._transportsByName = Object.create(null);
			((_b = opts.transportImplementations) !== null && _b !== void 0 ? _b : opts.transports).forEach((t) => {
				const transportName = t.prototype.name;
				this.transports.push(transportName);
				this._transportsByName[transportName] = t;
			});
		} else {
			this.transports = opts.transports ? [...opts.transports] : [
				"polling",
				"websocket",
				"webtransport"
			];
			this._transportsByName = transports;
		}
		this.opts = Object.assign({
			path: "/engine.io",
			agent: false,
			withCredentials: false,
			upgrade: true,
			timestampParam: "t",
			rememberUpgrade: false,
			addTrailingSlash: true,
			rejectUnauthorized: true,
			perMessageDeflate: { threshold: 1024 },
			transportOptions: {},
			closeOnBeforeunload: false
		}, opts);
		this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : "");
		if (typeof this.opts.query === "string") this.opts.query = decode(this.opts.query);
		if (withEventListeners) {
			if (this.opts.closeOnBeforeunload) {
				this._beforeunloadEventListener = () => {
					if (this.transport) {
						this.transport.removeAllListeners();
						this.transport.close();
					}
				};
				addEventListener("beforeunload", this._beforeunloadEventListener, false);
			}
			if (this.hostname !== "localhost") {
				this._offlineEventListener = () => {
					this._onClose("transport close", { description: "network connection lost" });
				};
				OFFLINE_EVENT_LISTENERS.push(this._offlineEventListener);
			}
		}
		if (this.opts.withCredentials) this._cookieJar = /* @__PURE__ */ createCookieJar();
		this._open();
	}
	/**
	* Creates transport of the given type.
	*
	* @param {String} name - transport name
	* @return {Transport}
	* @private
	*/
	createTransport(name) {
		const query = Object.assign({}, this.opts.query);
		query.EIO = 4;
		query.transport = name;
		if (this.id) query.sid = this.id;
		const opts = Object.assign({}, this.opts, {
			query,
			socket: this,
			hostname: this.hostname,
			secure: this.secure,
			port: this.port
		}, this.opts.transportOptions[name]);
		return new this._transportsByName[name](opts);
	}
	/**
	* Initializes transport to use and starts probe.
	*
	* @private
	*/
	_open() {
		if (this.transports.length === 0) {
			this.setTimeoutFn(() => {
				this.emitReserved("error", "No transports available");
			}, 0);
			return;
		}
		const transportName = this.opts.rememberUpgrade && Socket$1.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
		this.readyState = "opening";
		const transport = this.createTransport(transportName);
		transport.open();
		this.setTransport(transport);
	}
	/**
	* Sets the current transport. Disables the existing one (if any).
	*
	* @private
	*/
	setTransport(transport) {
		if (this.transport) this.transport.removeAllListeners();
		this.transport = transport;
		transport.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", (reason) => this._onClose("transport close", reason));
	}
	/**
	* Probes a transport.
	*
	* @param {String} name - transport name
	* @private
	*/
	_probe(name) {
		let transport = this.createTransport(name);
		let failed = false;
		Socket$1.priorWebsocketSuccess = false;
		const onTransportOpen = () => {
			if (failed) return;
			transport.send([{
				type: "ping",
				data: "probe"
			}]);
			transport.once("packet", (msg) => {
				if (failed) return;
				if ("pong" === msg.type && "probe" === msg.data) {
					this.upgrading = true;
					this.emitReserved("upgrading", transport);
					if (!transport) return;
					Socket$1.priorWebsocketSuccess = "websocket" === transport.name;
					this.transport.pause(() => {
						if (failed) return;
						if ("closed" === this.readyState) return;
						cleanup();
						this.setTransport(transport);
						transport.send([{ type: "upgrade" }]);
						this.emitReserved("upgrade", transport);
						transport = null;
						this.upgrading = false;
						this.flush();
					});
				} else {
					const err = /* @__PURE__ */ new Error("probe error");
					err.transport = transport.name;
					this.emitReserved("upgradeError", err);
				}
			});
		};
		function freezeTransport() {
			if (failed) return;
			failed = true;
			cleanup();
			transport.close();
			transport = null;
		}
		const onerror = (err) => {
			const error = /* @__PURE__ */ new Error("probe error: " + err);
			error.transport = transport.name;
			freezeTransport();
			this.emitReserved("upgradeError", error);
		};
		function onTransportClose() {
			onerror("transport closed");
		}
		function onclose() {
			onerror("socket closed");
		}
		function onupgrade(to) {
			if (transport && to.name !== transport.name) freezeTransport();
		}
		const cleanup = () => {
			transport.removeListener("open", onTransportOpen);
			transport.removeListener("error", onerror);
			transport.removeListener("close", onTransportClose);
			this.off("close", onclose);
			this.off("upgrading", onupgrade);
		};
		transport.once("open", onTransportOpen);
		transport.once("error", onerror);
		transport.once("close", onTransportClose);
		this.once("close", onclose);
		this.once("upgrading", onupgrade);
		if (this._upgrades.indexOf("webtransport") !== -1 && name !== "webtransport") this.setTimeoutFn(() => {
			if (!failed) transport.open();
		}, 200);
		else transport.open();
	}
	/**
	* Called when connection is deemed open.
	*
	* @private
	*/
	onOpen() {
		this.readyState = "open";
		Socket$1.priorWebsocketSuccess = "websocket" === this.transport.name;
		this.emitReserved("open");
		this.flush();
		if ("open" === this.readyState && this.opts.upgrade) for (let i = 0; i < this._upgrades.length; i++) this._probe(this._upgrades[i]);
	}
	/**
	* Handles a packet.
	*
	* @private
	*/
	_onPacket(packet) {
		if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
			this.emitReserved("packet", packet);
			this.emitReserved("heartbeat");
			switch (packet.type) {
				case "open":
					this.onHandshake(JSON.parse(packet.data));
					break;
				case "ping":
					this._sendPacket("pong");
					this.emitReserved("ping");
					this.emitReserved("pong");
					this._resetPingTimeout();
					break;
				case "error":
					const err = /* @__PURE__ */ new Error("server error");
					err.code = packet.data;
					this._onError(err);
					break;
				case "message":
					this.emitReserved("data", packet.data);
					this.emitReserved("message", packet.data);
			}
		}
	}
	/**
	* Called upon handshake completion.
	*
	* @param {Object} data - handshake obj
	* @private
	*/
	onHandshake(data) {
		this.emitReserved("handshake", data);
		this.id = data.sid;
		this.transport.query.sid = data.sid;
		this._upgrades = this._filterUpgrades(data.upgrades);
		this._pingInterval = data.pingInterval;
		this._pingTimeout = data.pingTimeout;
		this._maxPayload = data.maxPayload;
		this.onOpen();
		if ("closed" === this.readyState) return;
		this._resetPingTimeout();
	}
	/**
	* Sets and resets ping timeout timer based on server pings.
	*
	* @private
	*/
	_resetPingTimeout() {
		this.clearTimeoutFn(this._pingTimeoutTimer);
		const delay = this._pingInterval + this._pingTimeout;
		this._pingTimeoutTime = Date.now() + delay;
		this._pingTimeoutTimer = this.setTimeoutFn(() => {
			this._onClose("ping timeout");
		}, delay);
		if (this.opts.autoUnref) this._pingTimeoutTimer.unref();
	}
	/**
	* Called on `drain` event
	*
	* @private
	*/
	_onDrain() {
		this.writeBuffer.splice(0, this._prevBufferLen);
		this._prevBufferLen = 0;
		if (0 === this.writeBuffer.length) this.emitReserved("drain");
		else this.flush();
	}
	/**
	* Flush write buffers.
	*
	* @private
	*/
	flush() {
		if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
			const packets = this._getWritablePackets();
			this.transport.send(packets);
			this._prevBufferLen = packets.length;
			this.emitReserved("flush");
		}
	}
	/**
	* Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
	* long-polling)
	*
	* @private
	*/
	_getWritablePackets() {
		if (!(this._maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1)) return this.writeBuffer;
		let payloadSize = 1;
		for (let i = 0; i < this.writeBuffer.length; i++) {
			const data = this.writeBuffer[i].data;
			if (data) payloadSize += byteLength(data);
			if (i > 0 && payloadSize > this._maxPayload) return this.writeBuffer.slice(0, i);
			payloadSize += 2;
		}
		return this.writeBuffer;
	}
	/**
	* Checks whether the heartbeat timer has expired but the socket has not yet been notified.
	*
	* Note: this method is private for now because it does not really fit the WebSocket API, but if we put it in the
	* `write()` method then the message would not be buffered by the Socket.IO client.
	*
	* @return {boolean}
	* @private
	*/
	_hasPingExpired() {
		if (!this._pingTimeoutTime) return true;
		const hasExpired = Date.now() > this._pingTimeoutTime;
		if (hasExpired) {
			this._pingTimeoutTime = 0;
			nextTick(() => {
				this._onClose("ping timeout");
			}, this.setTimeoutFn);
		}
		return hasExpired;
	}
	/**
	* Sends a message.
	*
	* @param {String} msg - message.
	* @param {Object} options.
	* @param {Function} fn - callback function.
	* @return {Socket} for chaining.
	*/
	write(msg, options, fn) {
		this._sendPacket("message", msg, options, fn);
		return this;
	}
	/**
	* Sends a message. Alias of {@link Socket#write}.
	*
	* @param {String} msg - message.
	* @param {Object} options.
	* @param {Function} fn - callback function.
	* @return {Socket} for chaining.
	*/
	send(msg, options, fn) {
		this._sendPacket("message", msg, options, fn);
		return this;
	}
	/**
	* Sends a packet.
	*
	* @param {String} type - packet type.
	* @param {String} data.
	* @param {Object} options.
	* @param {Function} fn - callback function.
	* @private
	*/
	_sendPacket(type, data, options, fn) {
		if ("function" === typeof data) {
			fn = data;
			data = void 0;
		}
		if ("function" === typeof options) {
			fn = options;
			options = null;
		}
		if ("closing" === this.readyState || "closed" === this.readyState) return;
		options = options || {};
		options.compress = false !== options.compress;
		const packet = {
			type,
			data,
			options
		};
		this.emitReserved("packetCreate", packet);
		this.writeBuffer.push(packet);
		if (fn) this.once("flush", fn);
		this.flush();
	}
	/**
	* Closes the connection.
	*/
	close() {
		const close = () => {
			this._onClose("forced close");
			this.transport.close();
		};
		const cleanupAndClose = () => {
			this.off("upgrade", cleanupAndClose);
			this.off("upgradeError", cleanupAndClose);
			close();
		};
		const waitForUpgrade = () => {
			this.once("upgrade", cleanupAndClose);
			this.once("upgradeError", cleanupAndClose);
		};
		if ("opening" === this.readyState || "open" === this.readyState) {
			this.readyState = "closing";
			if (this.writeBuffer.length) this.once("drain", () => {
				if (this.upgrading) waitForUpgrade();
				else close();
			});
			else if (this.upgrading) waitForUpgrade();
			else close();
		}
		return this;
	}
	/**
	* Called upon transport error
	*
	* @private
	*/
	_onError(err) {
		Socket$1.priorWebsocketSuccess = false;
		if (this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening") {
			this.transports.shift();
			return this._open();
		}
		this.emitReserved("error", err);
		this._onClose("transport error", err);
	}
	/**
	* Called upon transport close.
	*
	* @private
	*/
	_onClose(reason, description) {
		if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
			this.clearTimeoutFn(this._pingTimeoutTimer);
			this.transport.removeAllListeners("close");
			this.transport.close();
			this.transport.removeAllListeners();
			if (withEventListeners) {
				if (this._beforeunloadEventListener) removeEventListener("beforeunload", this._beforeunloadEventListener, false);
				if (this._offlineEventListener) {
					const i = OFFLINE_EVENT_LISTENERS.indexOf(this._offlineEventListener);
					if (i !== -1) OFFLINE_EVENT_LISTENERS.splice(i, 1);
				}
			}
			this.readyState = "closed";
			this.id = null;
			this.emitReserved("close", reason, description);
			this.writeBuffer = [];
			this._prevBufferLen = 0;
		}
	}
	/**
	* Filters upgrades, returning only those matching client transports.
	*
	* @param {Array} upgrades - server upgrades
	* @private
	*/
	_filterUpgrades(upgrades) {
		const filteredUpgrades = [];
		for (let i = 0; i < upgrades.length; i++) if (~this.transports.indexOf(upgrades[i])) filteredUpgrades.push(upgrades[i]);
		return filteredUpgrades;
	}
};
Socket$1.protocol = 4;

//#endregion
//#region ../../node_modules/engine.io-client/build/esm/index.js
const protocol$1 = Socket$1.protocol;

//#endregion
//#region ../../node_modules/socket.io-client/build/esm/url.js
/**
* URL parser.
*
* @param uri - url
* @param path - the request path of the connection
* @param loc - An object meant to mimic window.location.
*        Defaults to window.location.
* @public
*/
function url(uri, path = "", loc) {
	let obj = uri;
	loc = loc || typeof location !== "undefined" && location;
	if (null == uri) uri = loc.protocol + "//" + loc.host;
	if (typeof uri === "string") {
		if ("/" === uri.charAt(0)) {
			if ("/" === uri.charAt(1)) uri = loc.protocol + uri;
			else uri = loc.host + uri;
		}
		if (!/^(https?|wss?):\/\//.test(uri)) {
			if ("undefined" !== typeof loc) uri = loc.protocol + "//" + uri;
			else uri = "https://" + uri;
		}
		obj = parse(uri);
	}
	if (!obj.port) {
		if (/^(http|ws)$/.test(obj.protocol)) obj.port = "80";
		else if (/^(http|ws)s$/.test(obj.protocol)) obj.port = "443";
	}
	obj.path = obj.path || "/";
	const host = obj.host.indexOf(":") !== -1 ? "[" + obj.host + "]" : obj.host;
	obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
	obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
	return obj;
}

//#endregion
//#region ../../node_modules/socket.io-parser/build/esm/is-binary.js
const withNativeArrayBuffer = typeof ArrayBuffer === "function";
const isView = (obj) => {
	return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
const withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
/**
* Returns true if obj is a Buffer, an ArrayBuffer, a Blob or a File.
*
* @private
*/
function isBinary(obj) {
	return withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj)) || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File;
}
function hasBinary(obj, toJSON) {
	if (!obj || typeof obj !== "object") return false;
	if (Array.isArray(obj)) {
		for (let i = 0, l = obj.length; i < l; i++) if (hasBinary(obj[i])) return true;
		return false;
	}
	if (isBinary(obj)) return true;
	if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) return hasBinary(obj.toJSON(), true);
	for (const key in obj) if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) return true;
	return false;
}

//#endregion
//#region ../../node_modules/socket.io-parser/build/esm/binary.js
/**
* Replaces every Buffer | ArrayBuffer | Blob | File in packet with a numbered placeholder.
*
* @param {Object} packet - socket.io event packet
* @return {Object} with deconstructed packet and list of buffers
* @public
*/
function deconstructPacket(packet) {
	const buffers = [];
	const packetData = packet.data;
	const pack = packet;
	pack.data = _deconstructPacket(packetData, buffers);
	pack.attachments = buffers.length;
	return {
		packet: pack,
		buffers
	};
}
function _deconstructPacket(data, buffers, toJSON) {
	if (!data) return data;
	if (isBinary(data)) {
		const placeholder = {
			_placeholder: true,
			num: buffers.length
		};
		buffers.push(data);
		return placeholder;
	} else if (Array.isArray(data)) {
		const newData = new Array(data.length);
		for (let i = 0; i < data.length; i++) newData[i] = _deconstructPacket(data[i], buffers);
		return newData;
	} else if (typeof data === "object" && !(data instanceof Date)) {
		if (data.toJSON && typeof data.toJSON === "function" && !toJSON) return _deconstructPacket(data.toJSON(), buffers, true);
		const newData = {};
		for (const key in data) if (Object.prototype.hasOwnProperty.call(data, key)) newData[key] = _deconstructPacket(data[key], buffers);
		return newData;
	}
	return data;
}
/**
* Reconstructs a binary packet from its placeholder packet and buffers
*
* @param {Object} packet - event packet with placeholders
* @param {Array} buffers - binary buffers to put in placeholder positions
* @return {Object} reconstructed packet
* @public
*/
function reconstructPacket(packet, buffers) {
	packet.data = _reconstructPacket(packet.data, buffers);
	delete packet.attachments;
	return packet;
}
function _reconstructPacket(data, buffers) {
	if (!data) return data;
	if (data && data._placeholder === true) {
		if (typeof data.num === "number" && data.num >= 0 && data.num < buffers.length) return buffers[data.num];
		else throw new Error("illegal attachments");
	} else if (Array.isArray(data)) for (let i = 0; i < data.length; i++) data[i] = _reconstructPacket(data[i], buffers);
	else if (typeof data === "object") {
		for (const key in data) if (Object.prototype.hasOwnProperty.call(data, key)) data[key] = _reconstructPacket(data[key], buffers);
	}
	return data;
}

//#endregion
//#region ../../node_modules/socket.io-parser/build/esm/index.js
var esm_exports = /* @__PURE__ */ __exportAll({
	Decoder: () => Decoder,
	Encoder: () => Encoder,
	PacketType: () => PacketType,
	isPacketValid: () => isPacketValid,
	protocol: () => 5
});
/**
* These strings must not be used as event names, as they have a special meaning.
*/
const RESERVED_EVENTS$1 = [
	"connect",
	"connect_error",
	"disconnect",
	"disconnecting",
	"newListener",
	"removeListener"
];
/**
* Protocol version.
*
* @public
*/
const protocol = 5;
var PacketType;
(function(PacketType) {
	PacketType[PacketType["CONNECT"] = 0] = "CONNECT";
	PacketType[PacketType["DISCONNECT"] = 1] = "DISCONNECT";
	PacketType[PacketType["EVENT"] = 2] = "EVENT";
	PacketType[PacketType["ACK"] = 3] = "ACK";
	PacketType[PacketType["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
	PacketType[PacketType["BINARY_EVENT"] = 5] = "BINARY_EVENT";
	PacketType[PacketType["BINARY_ACK"] = 6] = "BINARY_ACK";
})(PacketType || (PacketType = {}));
/**
* A socket.io Encoder instance
*/
var Encoder = class {
	/**
	* Encoder constructor
	*
	* @param {function} replacer - custom replacer to pass down to JSON.parse
	*/
	constructor(replacer) {
		this.replacer = replacer;
	}
	/**
	* Encode a packet as a single string if non-binary, or as a
	* buffer sequence, depending on packet type.
	*
	* @param {Object} obj - packet object
	*/
	encode(obj) {
		if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
			if (hasBinary(obj)) return this.encodeAsBinary({
				type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
				nsp: obj.nsp,
				data: obj.data,
				id: obj.id
			});
		}
		return [this.encodeAsString(obj)];
	}
	/**
	* Encode packet as string.
	*/
	encodeAsString(obj) {
		let str = "" + obj.type;
		if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) str += obj.attachments + "-";
		if (obj.nsp && "/" !== obj.nsp) str += obj.nsp + ",";
		if (null != obj.id) str += obj.id;
		if (null != obj.data) str += JSON.stringify(obj.data, this.replacer);
		return str;
	}
	/**
	* Encode packet as 'buffer sequence' by removing blobs, and
	* deconstructing packet into object with placeholders and
	* a list of buffers.
	*/
	encodeAsBinary(obj) {
		const deconstruction = deconstructPacket(obj);
		const pack = this.encodeAsString(deconstruction.packet);
		const buffers = deconstruction.buffers;
		buffers.unshift(pack);
		return buffers;
	}
};
/**
* A socket.io Decoder instance
*
* @return {Object} decoder
*/
var Decoder = class Decoder extends Emitter {
	/**
	* Decoder constructor
	*/
	constructor(opts) {
		super();
		this.opts = Object.assign({
			reviver: void 0,
			maxAttachments: 10
		}, typeof opts === "function" ? { reviver: opts } : opts);
	}
	/**
	* Decodes an encoded packet string into packet JSON.
	*
	* @param {String} obj - encoded packet
	*/
	add(obj) {
		let packet;
		if (typeof obj === "string") {
			if (this.reconstructor) throw new Error("got plaintext data when reconstructing a packet");
			packet = this.decodeString(obj);
			const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
			if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
				packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
				this.reconstructor = new BinaryReconstructor(packet);
			} else super.emitReserved("decoded", packet);
		} else if (isBinary(obj) || obj.base64) {
			if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
			else {
				packet = this.reconstructor.takeBinaryData(obj);
				if (packet) {
					this.reconstructor = null;
					super.emitReserved("decoded", packet);
				}
			}
		} else throw new Error("Unknown type: " + obj);
	}
	/**
	* Decode a packet String (JSON data)
	*
	* @param {String} str
	* @return {Object} packet
	*/
	decodeString(str) {
		let i = 0;
		const p = { type: Number(str.charAt(0)) };
		if (PacketType[p.type] === void 0) throw new Error("unknown packet type " + p.type);
		if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
			const start = i + 1;
			while (str.charAt(++i) !== "-" && i != str.length);
			const buf = str.substring(start, i);
			if (buf != Number(buf) || str.charAt(i) !== "-") throw new Error("Illegal attachments");
			const n = Number(buf);
			if (!isInteger(n) || n < 1) throw new Error("Illegal attachments");
			else if (n > this.opts.maxAttachments) throw new Error("too many attachments");
			p.attachments = n;
		}
		if ("/" === str.charAt(i + 1)) {
			const start = i + 1;
			while (++i) {
				if ("," === str.charAt(i)) break;
				if (i === str.length) break;
			}
			p.nsp = str.substring(start, i);
		} else p.nsp = "/";
		const next = str.charAt(i + 1);
		if ("" !== next && Number(next) == next) {
			const start = i + 1;
			while (++i) {
				const c = str.charAt(i);
				if (null == c || Number(c) != c) {
					--i;
					break;
				}
				if (i === str.length) break;
			}
			p.id = Number(str.substring(start, i + 1));
		}
		if (str.charAt(++i)) {
			const payload = this.tryParse(str.substr(i));
			if (Decoder.isPayloadValid(p.type, payload)) p.data = payload;
			else throw new Error("invalid payload");
		}
		return p;
	}
	tryParse(str) {
		try {
			return JSON.parse(str, this.opts.reviver);
		} catch (e) {
			return false;
		}
	}
	static isPayloadValid(type, payload) {
		switch (type) {
			case PacketType.CONNECT: return isObject(payload);
			case PacketType.DISCONNECT: return payload === void 0;
			case PacketType.CONNECT_ERROR: return typeof payload === "string" || isObject(payload);
			case PacketType.EVENT:
			case PacketType.BINARY_EVENT: return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS$1.indexOf(payload[0]) === -1);
			case PacketType.ACK:
			case PacketType.BINARY_ACK: return Array.isArray(payload);
		}
	}
	/**
	* Deallocates a parser's resources
	*/
	destroy() {
		if (this.reconstructor) {
			this.reconstructor.finishedReconstruction();
			this.reconstructor = null;
		}
	}
};
/**
* A manager of a binary event's 'buffer sequence'. Should
* be constructed whenever a packet of type BINARY_EVENT is
* decoded.
*
* @param {Object} packet
* @return {BinaryReconstructor} initialized reconstructor
*/
var BinaryReconstructor = class {
	constructor(packet) {
		this.packet = packet;
		this.buffers = [];
		this.reconPack = packet;
	}
	/**
	* Method to be called when binary data received from connection
	* after a BINARY_EVENT packet.
	*
	* @param {Buffer | ArrayBuffer} binData - the raw binary data received
	* @return {null | Object} returns null if more binary data is expected or
	*   a reconstructed packet object if all buffers have been received.
	*/
	takeBinaryData(binData) {
		this.buffers.push(binData);
		if (this.buffers.length === this.reconPack.attachments) {
			const packet = reconstructPacket(this.reconPack, this.buffers);
			this.finishedReconstruction();
			return packet;
		}
		return null;
	}
	/**
	* Cleans up binary packet reconstruction variables.
	*/
	finishedReconstruction() {
		this.reconPack = null;
		this.buffers = [];
	}
};
function isNamespaceValid(nsp) {
	return typeof nsp === "string";
}
const isInteger = Number.isInteger || function(value) {
	return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
};
function isAckIdValid(id) {
	return id === void 0 || isInteger(id);
}
function isObject(value) {
	return Object.prototype.toString.call(value) === "[object Object]";
}
function isDataValid(type, payload) {
	switch (type) {
		case PacketType.CONNECT: return payload === void 0 || isObject(payload);
		case PacketType.DISCONNECT: return payload === void 0;
		case PacketType.EVENT: return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS$1.indexOf(payload[0]) === -1);
		case PacketType.ACK: return Array.isArray(payload);
		case PacketType.CONNECT_ERROR: return typeof payload === "string" || isObject(payload);
		default: return false;
	}
}
function isPacketValid(packet) {
	return isNamespaceValid(packet.nsp) && isAckIdValid(packet.id) && isDataValid(packet.type, packet.data);
}

//#endregion
//#region ../../node_modules/socket.io-client/build/esm/on.js
function on(obj, ev, fn) {
	obj.on(ev, fn);
	return function subDestroy() {
		obj.off(ev, fn);
	};
}

//#endregion
//#region ../../node_modules/socket.io-client/build/esm/socket.js
/**
* Internal events.
* These events can't be emitted by the user.
*/
const RESERVED_EVENTS = Object.freeze({
	connect: 1,
	connect_error: 1,
	disconnect: 1,
	disconnecting: 1,
	newListener: 1,
	removeListener: 1
});
/**
* A Socket is the fundamental class for interacting with the server.
*
* A Socket belongs to a certain Namespace (by default /) and uses an underlying {@link Manager} to communicate.
*
* @example
* const socket = io();
*
* socket.on("connect", () => {
*   console.log("connected");
* });
*
* // send an event to the server
* socket.emit("foo", "bar");
*
* socket.on("foobar", () => {
*   // an event was received from the server
* });
*
* // upon disconnection
* socket.on("disconnect", (reason) => {
*   console.log(`disconnected due to ${reason}`);
* });
*/
var Socket = class extends Emitter {
	/**
	* `Socket` constructor.
	*/
	constructor(io, nsp, opts) {
		super();
		/**
		* Whether the socket is currently connected to the server.
		*
		* @example
		* const socket = io();
		*
		* socket.on("connect", () => {
		*   console.log(socket.connected); // true
		* });
		*
		* socket.on("disconnect", () => {
		*   console.log(socket.connected); // false
		* });
		*/
		this.connected = false;
		/**
		* Whether the connection state was recovered after a temporary disconnection. In that case, any missed packets will
		* be transmitted by the server.
		*/
		this.recovered = false;
		/**
		* Buffer for packets received before the CONNECT packet
		*/
		this.receiveBuffer = [];
		/**
		* Buffer for packets that will be sent once the socket is connected
		*/
		this.sendBuffer = [];
		/**
		* The queue of packets to be sent with retry in case of failure.
		*
		* Packets are sent one by one, each waiting for the server acknowledgement, in order to guarantee the delivery order.
		* @private
		*/
		this._queue = [];
		/**
		* A sequence to generate the ID of the {@link QueuedPacket}.
		* @private
		*/
		this._queueSeq = 0;
		this.ids = 0;
		/**
		* A map containing acknowledgement handlers.
		*
		* The `withError` attribute is used to differentiate handlers that accept an error as first argument:
		*
		* - `socket.emit("test", (err, value) => { ... })` with `ackTimeout` option
		* - `socket.timeout(5000).emit("test", (err, value) => { ... })`
		* - `const value = await socket.emitWithAck("test")`
		*
		* From those that don't:
		*
		* - `socket.emit("test", (value) => { ... });`
		*
		* In the first case, the handlers will be called with an error when:
		*
		* - the timeout is reached
		* - the socket gets disconnected
		*
		* In the second case, the handlers will be simply discarded upon disconnection, since the client will never receive
		* an acknowledgement from the server.
		*
		* @private
		*/
		this.acks = {};
		this.flags = {};
		this.io = io;
		this.nsp = nsp;
		if (opts && opts.auth) this.auth = opts.auth;
		this._opts = Object.assign({}, opts);
		if (this.io._autoConnect) this.open();
	}
	/**
	* Whether the socket is currently disconnected
	*
	* @example
	* const socket = io();
	*
	* socket.on("connect", () => {
	*   console.log(socket.disconnected); // false
	* });
	*
	* socket.on("disconnect", () => {
	*   console.log(socket.disconnected); // true
	* });
	*/
	get disconnected() {
		return !this.connected;
	}
	/**
	* Subscribe to open, close and packet events
	*
	* @private
	*/
	subEvents() {
		if (this.subs) return;
		const io = this.io;
		this.subs = [
			on(io, "open", this.onopen.bind(this)),
			on(io, "packet", this.onpacket.bind(this)),
			on(io, "error", this.onerror.bind(this)),
			on(io, "close", this.onclose.bind(this))
		];
	}
	/**
	* Whether the Socket will try to reconnect when its Manager connects or reconnects.
	*
	* @example
	* const socket = io();
	*
	* console.log(socket.active); // true
	*
	* socket.on("disconnect", (reason) => {
	*   if (reason === "io server disconnect") {
	*     // the disconnection was initiated by the server, you need to manually reconnect
	*     console.log(socket.active); // false
	*   }
	*   // else the socket will automatically try to reconnect
	*   console.log(socket.active); // true
	* });
	*/
	get active() {
		return !!this.subs;
	}
	/**
	* "Opens" the socket.
	*
	* @example
	* const socket = io({
	*   autoConnect: false
	* });
	*
	* socket.connect();
	*/
	connect() {
		if (this.connected) return this;
		this.subEvents();
		if (!this.io["_reconnecting"]) this.io.open();
		if ("open" === this.io._readyState) this.onopen();
		return this;
	}
	/**
	* Alias for {@link connect()}.
	*/
	open() {
		return this.connect();
	}
	/**
	* Sends a `message` event.
	*
	* This method mimics the WebSocket.send() method.
	*
	* @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
	*
	* @example
	* socket.send("hello");
	*
	* // this is equivalent to
	* socket.emit("message", "hello");
	*
	* @return self
	*/
	send(...args) {
		args.unshift("message");
		this.emit.apply(this, args);
		return this;
	}
	/**
	* Override `emit`.
	* If the event is in `events`, it's emitted normally.
	*
	* @example
	* socket.emit("hello", "world");
	*
	* // all serializable datastructures are supported (no need to call JSON.stringify)
	* socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
	*
	* // with an acknowledgement from the server
	* socket.emit("hello", "world", (val) => {
	*   // ...
	* });
	*
	* @return self
	*/
	emit(ev, ...args) {
		var _a, _b, _c;
		if (RESERVED_EVENTS.hasOwnProperty(ev)) throw new Error("\"" + ev.toString() + "\" is a reserved event name");
		args.unshift(ev);
		if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
			this._addToQueue(args);
			return this;
		}
		const packet = {
			type: PacketType.EVENT,
			data: args
		};
		packet.options = {};
		packet.options.compress = this.flags.compress !== false;
		if ("function" === typeof args[args.length - 1]) {
			const id = this.ids++;
			const ack = args.pop();
			this._registerAckCallback(id, ack);
			packet.id = id;
		}
		const isTransportWritable = (_b = (_a = this.io.engine) === null || _a === void 0 ? void 0 : _a.transport) === null || _b === void 0 ? void 0 : _b.writable;
		const isConnected = this.connected && !((_c = this.io.engine) === null || _c === void 0 ? void 0 : _c._hasPingExpired());
		if (this.flags.volatile && !isTransportWritable) {} else if (isConnected) {
			this.notifyOutgoingListeners(packet);
			this.packet(packet);
		} else this.sendBuffer.push(packet);
		this.flags = {};
		return this;
	}
	/**
	* @private
	*/
	_registerAckCallback(id, ack) {
		var _a;
		const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
		if (timeout === void 0) {
			this.acks[id] = ack;
			return;
		}
		const timer = this.io.setTimeoutFn(() => {
			delete this.acks[id];
			for (let i = 0; i < this.sendBuffer.length; i++) if (this.sendBuffer[i].id === id) this.sendBuffer.splice(i, 1);
			ack.call(this, /* @__PURE__ */ new Error("operation has timed out"));
		}, timeout);
		const fn = (...args) => {
			this.io.clearTimeoutFn(timer);
			ack.apply(this, args);
		};
		fn.withError = true;
		this.acks[id] = fn;
	}
	/**
	* Emits an event and waits for an acknowledgement
	*
	* @example
	* // without timeout
	* const response = await socket.emitWithAck("hello", "world");
	*
	* // with a specific timeout
	* try {
	*   const response = await socket.timeout(1000).emitWithAck("hello", "world");
	* } catch (err) {
	*   // the server did not acknowledge the event in the given delay
	* }
	*
	* @return a Promise that will be fulfilled when the server acknowledges the event
	*/
	emitWithAck(ev, ...args) {
		return new Promise((resolve, reject) => {
			const fn = (arg1, arg2) => {
				return arg1 ? reject(arg1) : resolve(arg2);
			};
			fn.withError = true;
			args.push(fn);
			this.emit(ev, ...args);
		});
	}
	/**
	* Add the packet to the queue.
	* @param args
	* @private
	*/
	_addToQueue(args) {
		let ack;
		if (typeof args[args.length - 1] === "function") ack = args.pop();
		const packet = {
			id: this._queueSeq++,
			tryCount: 0,
			pending: false,
			args,
			flags: Object.assign({ fromQueue: true }, this.flags)
		};
		args.push((err, ...responseArgs) => {
			if (packet !== this._queue[0]) {}
			if (err !== null) {
				if (packet.tryCount > this._opts.retries) {
					this._queue.shift();
					if (ack) ack(err);
				}
			} else {
				this._queue.shift();
				if (ack) ack(null, ...responseArgs);
			}
			packet.pending = false;
			return this._drainQueue();
		});
		this._queue.push(packet);
		this._drainQueue();
	}
	/**
	* Send the first packet of the queue, and wait for an acknowledgement from the server.
	* @param force - whether to resend a packet that has not been acknowledged yet
	*
	* @private
	*/
	_drainQueue(force = false) {
		if (!this.connected || this._queue.length === 0) return;
		const packet = this._queue[0];
		if (packet.pending && !force) return;
		packet.pending = true;
		packet.tryCount++;
		this.flags = packet.flags;
		this.emit.apply(this, packet.args);
	}
	/**
	* Sends a packet.
	*
	* @param packet
	* @private
	*/
	packet(packet) {
		packet.nsp = this.nsp;
		this.io._packet(packet);
	}
	/**
	* Called upon engine `open`.
	*
	* @private
	*/
	onopen() {
		if (typeof this.auth == "function") this.auth((data) => {
			this._sendConnectPacket(data);
		});
		else this._sendConnectPacket(this.auth);
	}
	/**
	* Sends a CONNECT packet to initiate the Socket.IO session.
	*
	* @param data
	* @private
	*/
	_sendConnectPacket(data) {
		this.packet({
			type: PacketType.CONNECT,
			data: this._pid ? Object.assign({
				pid: this._pid,
				offset: this._lastOffset
			}, data) : data
		});
	}
	/**
	* Called upon engine or manager `error`.
	*
	* @param err
	* @private
	*/
	onerror(err) {
		if (!this.connected) this.emitReserved("connect_error", err);
	}
	/**
	* Called upon engine `close`.
	*
	* @param reason
	* @param description
	* @private
	*/
	onclose(reason, description) {
		this.connected = false;
		delete this.id;
		this.emitReserved("disconnect", reason, description);
		this._clearAcks();
	}
	/**
	* Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
	* the server.
	*
	* @private
	*/
	_clearAcks() {
		Object.keys(this.acks).forEach((id) => {
			if (!this.sendBuffer.some((packet) => String(packet.id) === id)) {
				const ack = this.acks[id];
				delete this.acks[id];
				if (ack.withError) ack.call(this, /* @__PURE__ */ new Error("socket has been disconnected"));
			}
		});
	}
	/**
	* Called with socket packet.
	*
	* @param packet
	* @private
	*/
	onpacket(packet) {
		if (!(packet.nsp === this.nsp)) return;
		switch (packet.type) {
			case PacketType.CONNECT:
				if (packet.data && packet.data.sid) this.onconnect(packet.data.sid, packet.data.pid);
				else this.emitReserved("connect_error", /* @__PURE__ */ new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
				break;
			case PacketType.EVENT:
			case PacketType.BINARY_EVENT:
				this.onevent(packet);
				break;
			case PacketType.ACK:
			case PacketType.BINARY_ACK:
				this.onack(packet);
				break;
			case PacketType.DISCONNECT:
				this.ondisconnect();
				break;
			case PacketType.CONNECT_ERROR:
				this.destroy();
				const err = new Error(packet.data.message);
				err.data = packet.data.data;
				this.emitReserved("connect_error", err);
		}
	}
	/**
	* Called upon a server event.
	*
	* @param packet
	* @private
	*/
	onevent(packet) {
		const args = packet.data || [];
		if (null != packet.id) args.push(this.ack(packet.id));
		if (this.connected) this.emitEvent(args);
		else this.receiveBuffer.push(Object.freeze(args));
	}
	emitEvent(args) {
		if (this._anyListeners && this._anyListeners.length) {
			const listeners = this._anyListeners.slice();
			for (const listener of listeners) listener.apply(this, args);
		}
		super.emit.apply(this, args);
		if (this._pid && args.length && typeof args[args.length - 1] === "string") this._lastOffset = args[args.length - 1];
	}
	/**
	* Produces an ack callback to emit with an event.
	*
	* @private
	*/
	ack(id) {
		const self = this;
		let sent = false;
		return function(...args) {
			if (sent) return;
			sent = true;
			self.packet({
				type: PacketType.ACK,
				id,
				data: args
			});
		};
	}
	/**
	* Called upon a server acknowledgement.
	*
	* @param packet
	* @private
	*/
	onack(packet) {
		const ack = this.acks[packet.id];
		if (typeof ack !== "function") return;
		delete this.acks[packet.id];
		if (ack.withError) packet.data.unshift(null);
		ack.apply(this, packet.data);
	}
	/**
	* Called upon server connect.
	*
	* @private
	*/
	onconnect(id, pid) {
		this.id = id;
		this.recovered = pid && this._pid === pid;
		this._pid = pid;
		this.connected = true;
		this.emitBuffered();
		this._drainQueue(true);
		this.emitReserved("connect");
	}
	/**
	* Emit buffered events (received and emitted).
	*
	* @private
	*/
	emitBuffered() {
		this.receiveBuffer.forEach((args) => this.emitEvent(args));
		this.receiveBuffer = [];
		this.sendBuffer.forEach((packet) => {
			this.notifyOutgoingListeners(packet);
			this.packet(packet);
		});
		this.sendBuffer = [];
	}
	/**
	* Called upon server disconnect.
	*
	* @private
	*/
	ondisconnect() {
		this.destroy();
		this.onclose("io server disconnect");
	}
	/**
	* Called upon forced client/server side disconnections,
	* this method ensures the manager stops tracking us and
	* that reconnections don't get triggered for this.
	*
	* @private
	*/
	destroy() {
		if (this.subs) {
			this.subs.forEach((subDestroy) => subDestroy());
			this.subs = void 0;
		}
		this.io["_destroy"](this);
	}
	/**
	* Disconnects the socket manually. In that case, the socket will not try to reconnect.
	*
	* If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
	*
	* @example
	* const socket = io();
	*
	* socket.on("disconnect", (reason) => {
	*   // console.log(reason); prints "io client disconnect"
	* });
	*
	* socket.disconnect();
	*
	* @return self
	*/
	disconnect() {
		if (this.connected) this.packet({ type: PacketType.DISCONNECT });
		this.destroy();
		if (this.connected) this.onclose("io client disconnect");
		return this;
	}
	/**
	* Alias for {@link disconnect()}.
	*
	* @return self
	*/
	close() {
		return this.disconnect();
	}
	/**
	* Sets the compress flag.
	*
	* @example
	* socket.compress(false).emit("hello");
	*
	* @param compress - if `true`, compresses the sending data
	* @return self
	*/
	compress(compress) {
		this.flags.compress = compress;
		return this;
	}
	/**
	* Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
	* ready to send messages.
	*
	* @example
	* socket.volatile.emit("hello"); // the server may or may not receive it
	*
	* @returns self
	*/
	get volatile() {
		this.flags.volatile = true;
		return this;
	}
	/**
	* Sets a modifier for a subsequent event emission that the callback will be called with an error when the
	* given number of milliseconds have elapsed without an acknowledgement from the server:
	*
	* @example
	* socket.timeout(5000).emit("my-event", (err) => {
	*   if (err) {
	*     // the server did not acknowledge the event in the given delay
	*   }
	* });
	*
	* @returns self
	*/
	timeout(timeout) {
		this.flags.timeout = timeout;
		return this;
	}
	/**
	* Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
	* callback.
	*
	* @example
	* socket.onAny((event, ...args) => {
	*   console.log(`got ${event}`);
	* });
	*
	* @param listener
	*/
	onAny(listener) {
		this._anyListeners = this._anyListeners || [];
		this._anyListeners.push(listener);
		return this;
	}
	/**
	* Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
	* callback. The listener is added to the beginning of the listeners array.
	*
	* @example
	* socket.prependAny((event, ...args) => {
	*   console.log(`got event ${event}`);
	* });
	*
	* @param listener
	*/
	prependAny(listener) {
		this._anyListeners = this._anyListeners || [];
		this._anyListeners.unshift(listener);
		return this;
	}
	/**
	* Removes the listener that will be fired when any event is emitted.
	*
	* @example
	* const catchAllListener = (event, ...args) => {
	*   console.log(`got event ${event}`);
	* }
	*
	* socket.onAny(catchAllListener);
	*
	* // remove a specific listener
	* socket.offAny(catchAllListener);
	*
	* // or remove all listeners
	* socket.offAny();
	*
	* @param listener
	*/
	offAny(listener) {
		if (!this._anyListeners) return this;
		if (listener) {
			const listeners = this._anyListeners;
			for (let i = 0; i < listeners.length; i++) if (listener === listeners[i]) {
				listeners.splice(i, 1);
				return this;
			}
		} else this._anyListeners = [];
		return this;
	}
	/**
	* Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
	* e.g. to remove listeners.
	*/
	listenersAny() {
		return this._anyListeners || [];
	}
	/**
	* Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
	* callback.
	*
	* Note: acknowledgements sent to the server are not included.
	*
	* @example
	* socket.onAnyOutgoing((event, ...args) => {
	*   console.log(`sent event ${event}`);
	* });
	*
	* @param listener
	*/
	onAnyOutgoing(listener) {
		this._anyOutgoingListeners = this._anyOutgoingListeners || [];
		this._anyOutgoingListeners.push(listener);
		return this;
	}
	/**
	* Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
	* callback. The listener is added to the beginning of the listeners array.
	*
	* Note: acknowledgements sent to the server are not included.
	*
	* @example
	* socket.prependAnyOutgoing((event, ...args) => {
	*   console.log(`sent event ${event}`);
	* });
	*
	* @param listener
	*/
	prependAnyOutgoing(listener) {
		this._anyOutgoingListeners = this._anyOutgoingListeners || [];
		this._anyOutgoingListeners.unshift(listener);
		return this;
	}
	/**
	* Removes the listener that will be fired when any event is emitted.
	*
	* @example
	* const catchAllListener = (event, ...args) => {
	*   console.log(`sent event ${event}`);
	* }
	*
	* socket.onAnyOutgoing(catchAllListener);
	*
	* // remove a specific listener
	* socket.offAnyOutgoing(catchAllListener);
	*
	* // or remove all listeners
	* socket.offAnyOutgoing();
	*
	* @param [listener] - the catch-all listener (optional)
	*/
	offAnyOutgoing(listener) {
		if (!this._anyOutgoingListeners) return this;
		if (listener) {
			const listeners = this._anyOutgoingListeners;
			for (let i = 0; i < listeners.length; i++) if (listener === listeners[i]) {
				listeners.splice(i, 1);
				return this;
			}
		} else this._anyOutgoingListeners = [];
		return this;
	}
	/**
	* Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
	* e.g. to remove listeners.
	*/
	listenersAnyOutgoing() {
		return this._anyOutgoingListeners || [];
	}
	/**
	* Notify the listeners for each packet sent
	*
	* @param packet
	*
	* @private
	*/
	notifyOutgoingListeners(packet) {
		if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
			const listeners = this._anyOutgoingListeners.slice();
			for (const listener of listeners) listener.apply(this, packet.data);
		}
	}
};

//#endregion
//#region ../../node_modules/socket.io-client/build/esm/contrib/backo2.js
/**
* Initialize backoff timer with `opts`.
*
* - `min` initial timeout in milliseconds [100]
* - `max` max timeout [10000]
* - `jitter` [0]
* - `factor` [2]
*
* @param {Object} opts
* @api public
*/
function Backoff(opts) {
	opts = opts || {};
	this.ms = opts.min || 100;
	this.max = opts.max || 1e4;
	this.factor = opts.factor || 2;
	this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
	this.attempts = 0;
}
/**
* Return the backoff duration.
*
* @return {Number}
* @api public
*/
Backoff.prototype.duration = function() {
	var ms = this.ms * Math.pow(this.factor, this.attempts++);
	if (this.jitter) {
		var rand = Math.random();
		var deviation = Math.floor(rand * this.jitter * ms);
		ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
	}
	return Math.min(ms, this.max) | 0;
};
/**
* Reset the number of attempts.
*
* @api public
*/
Backoff.prototype.reset = function() {
	this.attempts = 0;
};
/**
* Set the minimum duration
*
* @api public
*/
Backoff.prototype.setMin = function(min) {
	this.ms = min;
};
/**
* Set the maximum duration
*
* @api public
*/
Backoff.prototype.setMax = function(max) {
	this.max = max;
};
/**
* Set the jitter
*
* @api public
*/
Backoff.prototype.setJitter = function(jitter) {
	this.jitter = jitter;
};

//#endregion
//#region ../../node_modules/socket.io-client/build/esm/manager.js
var Manager = class extends Emitter {
	constructor(uri, opts) {
		var _a;
		super();
		this.nsps = {};
		this.subs = [];
		if (uri && "object" === typeof uri) {
			opts = uri;
			uri = void 0;
		}
		opts = opts || {};
		opts.path = opts.path || "/socket.io";
		this.opts = opts;
		installTimerFunctions(this, opts);
		this.reconnection(opts.reconnection !== false);
		this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
		this.reconnectionDelay(opts.reconnectionDelay || 1e3);
		this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
		this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : .5);
		this.backoff = new Backoff({
			min: this.reconnectionDelay(),
			max: this.reconnectionDelayMax(),
			jitter: this.randomizationFactor()
		});
		this.timeout(null == opts.timeout ? 2e4 : opts.timeout);
		this._readyState = "closed";
		this.uri = uri;
		const _parser = opts.parser || esm_exports;
		this.encoder = new _parser.Encoder();
		this.decoder = new _parser.Decoder();
		this._autoConnect = opts.autoConnect !== false;
		if (this._autoConnect) this.open();
	}
	reconnection(v) {
		if (!arguments.length) return this._reconnection;
		this._reconnection = !!v;
		if (!v) this.skipReconnect = true;
		return this;
	}
	reconnectionAttempts(v) {
		if (v === void 0) return this._reconnectionAttempts;
		this._reconnectionAttempts = v;
		return this;
	}
	reconnectionDelay(v) {
		var _a;
		if (v === void 0) return this._reconnectionDelay;
		this._reconnectionDelay = v;
		(_a = this.backoff) === null || _a === void 0 || _a.setMin(v);
		return this;
	}
	randomizationFactor(v) {
		var _a;
		if (v === void 0) return this._randomizationFactor;
		this._randomizationFactor = v;
		(_a = this.backoff) === null || _a === void 0 || _a.setJitter(v);
		return this;
	}
	reconnectionDelayMax(v) {
		var _a;
		if (v === void 0) return this._reconnectionDelayMax;
		this._reconnectionDelayMax = v;
		(_a = this.backoff) === null || _a === void 0 || _a.setMax(v);
		return this;
	}
	timeout(v) {
		if (!arguments.length) return this._timeout;
		this._timeout = v;
		return this;
	}
	/**
	* Starts trying to reconnect if reconnection is enabled and we have not
	* started reconnecting yet
	*
	* @private
	*/
	maybeReconnectOnOpen() {
		if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) this.reconnect();
	}
	/**
	* Sets the current transport `socket`.
	*
	* @param {Function} fn - optional, callback
	* @return self
	* @public
	*/
	open(fn) {
		if (~this._readyState.indexOf("open")) return this;
		this.engine = new Socket$1(this.uri, this.opts);
		const socket = this.engine;
		const self = this;
		this._readyState = "opening";
		this.skipReconnect = false;
		const openSubDestroy = on(socket, "open", function() {
			self.onopen();
			fn && fn();
		});
		const onError = (err) => {
			this.cleanup();
			this._readyState = "closed";
			this.emitReserved("error", err);
			if (fn) fn(err);
			else this.maybeReconnectOnOpen();
		};
		const errorSub = on(socket, "error", onError);
		if (false !== this._timeout) {
			const timeout = this._timeout;
			const timer = this.setTimeoutFn(() => {
				openSubDestroy();
				onError(/* @__PURE__ */ new Error("timeout"));
				socket.close();
			}, timeout);
			if (this.opts.autoUnref) timer.unref();
			this.subs.push(() => {
				this.clearTimeoutFn(timer);
			});
		}
		this.subs.push(openSubDestroy);
		this.subs.push(errorSub);
		return this;
	}
	/**
	* Alias for open()
	*
	* @return self
	* @public
	*/
	connect(fn) {
		return this.open(fn);
	}
	/**
	* Called upon transport open.
	*
	* @private
	*/
	onopen() {
		this.cleanup();
		this._readyState = "open";
		this.emitReserved("open");
		const socket = this.engine;
		this.subs.push(on(socket, "ping", this.onping.bind(this)), on(socket, "data", this.ondata.bind(this)), on(socket, "error", this.onerror.bind(this)), on(socket, "close", this.onclose.bind(this)), on(this.decoder, "decoded", this.ondecoded.bind(this)));
	}
	/**
	* Called upon a ping.
	*
	* @private
	*/
	onping() {
		this.emitReserved("ping");
	}
	/**
	* Called with data.
	*
	* @private
	*/
	ondata(data) {
		try {
			this.decoder.add(data);
		} catch (e) {
			this.onclose("parse error", e);
		}
	}
	/**
	* Called when parser fully decodes a packet.
	*
	* @private
	*/
	ondecoded(packet) {
		nextTick(() => {
			this.emitReserved("packet", packet);
		}, this.setTimeoutFn);
	}
	/**
	* Called upon socket error.
	*
	* @private
	*/
	onerror(err) {
		this.emitReserved("error", err);
	}
	/**
	* Creates a new socket for the given `nsp`.
	*
	* @return {Socket}
	* @public
	*/
	socket(nsp, opts) {
		let socket = this.nsps[nsp];
		if (!socket) {
			socket = new Socket(this, nsp, opts);
			this.nsps[nsp] = socket;
		} else if (this._autoConnect && !socket.active) socket.connect();
		return socket;
	}
	/**
	* Called upon a socket close.
	*
	* @param socket
	* @private
	*/
	_destroy(socket) {
		const nsps = Object.keys(this.nsps);
		for (const nsp of nsps) if (this.nsps[nsp].active) return;
		this._close();
	}
	/**
	* Writes a packet.
	*
	* @param packet
	* @private
	*/
	_packet(packet) {
		const encodedPackets = this.encoder.encode(packet);
		for (let i = 0; i < encodedPackets.length; i++) this.engine.write(encodedPackets[i], packet.options);
	}
	/**
	* Clean up transport subscriptions and packet buffer.
	*
	* @private
	*/
	cleanup() {
		this.subs.forEach((subDestroy) => subDestroy());
		this.subs.length = 0;
		this.decoder.destroy();
	}
	/**
	* Close the current socket.
	*
	* @private
	*/
	_close() {
		this.skipReconnect = true;
		this._reconnecting = false;
		this.onclose("forced close");
	}
	/**
	* Alias for close()
	*
	* @private
	*/
	disconnect() {
		return this._close();
	}
	/**
	* Called when:
	*
	* - the low-level engine is closed
	* - the parser encountered a badly formatted packet
	* - all sockets are disconnected
	*
	* @private
	*/
	onclose(reason, description) {
		var _a;
		this.cleanup();
		(_a = this.engine) === null || _a === void 0 || _a.close();
		this.backoff.reset();
		this._readyState = "closed";
		this.emitReserved("close", reason, description);
		if (this._reconnection && !this.skipReconnect) this.reconnect();
	}
	/**
	* Attempt a reconnection.
	*
	* @private
	*/
	reconnect() {
		if (this._reconnecting || this.skipReconnect) return this;
		const self = this;
		if (this.backoff.attempts >= this._reconnectionAttempts) {
			this.backoff.reset();
			this.emitReserved("reconnect_failed");
			this._reconnecting = false;
		} else {
			const delay = this.backoff.duration();
			this._reconnecting = true;
			const timer = this.setTimeoutFn(() => {
				if (self.skipReconnect) return;
				this.emitReserved("reconnect_attempt", self.backoff.attempts);
				if (self.skipReconnect) return;
				self.open((err) => {
					if (err) {
						self._reconnecting = false;
						self.reconnect();
						this.emitReserved("reconnect_error", err);
					} else self.onreconnect();
				});
			}, delay);
			if (this.opts.autoUnref) timer.unref();
			this.subs.push(() => {
				this.clearTimeoutFn(timer);
			});
		}
	}
	/**
	* Called upon successful reconnect.
	*
	* @private
	*/
	onreconnect() {
		const attempt = this.backoff.attempts;
		this._reconnecting = false;
		this.backoff.reset();
		this.emitReserved("reconnect", attempt);
	}
};

//#endregion
//#region ../../node_modules/socket.io-client/build/esm/index.js
/**
* Managers cache.
*/
const cache = {};
function lookup(uri, opts) {
	if (typeof uri === "object") {
		opts = uri;
		uri = void 0;
	}
	opts = opts || {};
	const parsed = url(uri, opts.path || "/socket.io");
	const source = parsed.source;
	const id = parsed.id;
	const path = parsed.path;
	const sameNamespace = cache[id] && path in cache[id]["nsps"];
	const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
	let io;
	if (newConnection) io = new Manager(source, opts);
	else {
		if (!cache[id]) cache[id] = new Manager(source, opts);
		io = cache[id];
	}
	if (parsed.query && !opts.query) opts.query = parsed.queryKey;
	return io.socket(parsed.path, opts);
}
Object.assign(lookup, {
	Manager,
	Socket,
	io: lookup,
	connect: lookup
});

//#endregion
//#region src/shared/server-actions/realtime.ts
const realtimeCredentialsAction = (...args) => callServerAction("shared/server-actions/realtime", "realtimeCredentialsAction", args);

//#endregion
//#region src/features/chat/ContextSocket.tsx
var ContextSocket_exports = /* @__PURE__ */ __exportAll({
	ContextSocket: () => ContextSocket,
	deleteConversation: () => deleteConversation,
	isTyping: () => isTyping,
	joinConversation: () => joinConversation,
	leaveConversation: () => leaveConversation,
	notifyTyping: () => notifyTyping,
	readConversation: () => readConversation,
	sendAgentMessage: () => sendAgentMessage
});
/**
* O front não fala com a porta do realtime: fala com o gateway de dev
* (server/gateway-dev), que é quem conhece os serviços. `/socket.io` é
* repassado intacto pelo gateway até o realtime.
*/
const GATEWAY_PORT = 4e3;
const SOCKET_PATH = "/socket.io";
let activeSocket = null;
const realtimeUrl = () => {
	if (typeof window === "undefined") return `http://localhost:${GATEWAY_PORT}`;
	return `${window.location.protocol}//${window.location.hostname}:${GATEWAY_PORT}`;
};
/** Entra (e sai) da sala de uma conversa no realtime. */
function joinConversation(conversationId) {
	activeSocket?.emit("conversation:join", { conversationId });
}
function leaveConversation(conversationId) {
	activeSocket?.emit("conversation:leave", { conversationId });
}
/** Envia a mensagem do agente; o eco `message:new` do servidor renderiza na tela. */
function sendAgentMessage(conversationId, text, senderName) {
	if (!activeSocket?.connected) return false;
	activeSocket.emit("message:send", {
		conversationId,
		text,
		senderName
	});
	return true;
}
function notifyTyping(conversationId, value) {
	if (!activeSocket?.connected) return;
	activeSocket.emit("typing:set", {
		conversationId,
		isTyping: value
	});
}
/**
* Apaga a conversa com todas as mensagens.
*
* O `conversation:removed` volta pelo mesmo socket e é quem tira o item da
* lista — inclusive na aba de outro agente. Optimista aqui não faz sentido:
* se o servidor recusar, a lista não muda e o agente continua vendo o item.
*/
function deleteConversation(conversationId) {
	if (!activeSocket?.connected) return;
	activeSocket.emit("conversation:delete", { conversationId });
}
function readConversation(conversationId) {
	if (!activeSocket?.connected) return;
	activeSocket.emit("conversation:read", { conversationId });
}
const ContextSocket = ({ children }) => {
	init(() => {
		let disposed = false;
		let typingTimer = null;
		const scheduleStopTyping = (conversationId) => {
			if (typingTimer) clearTimeout(typingTimer);
			typingTimer = setTimeout(() => notifyTyping(conversationId, false), 1200);
		};
		const setup = async () => {
			let token = "";
			let user = "";
			try {
				const credentials = await realtimeCredentialsAction();
				if (disposed) return;
				token = credentials.token || "";
				user = credentials.user || "";
			} catch {}
			const socket = lookup(realtimeUrl(), {
				path: SOCKET_PATH,
				transports: ["websocket", "polling"],
				reconnection: true,
				reconnectionDelayMax: 1e4,
				auth: {
					token,
					user
				}
			});
			activeSocket = socket;
			setConnection("connecting");
			socket.on("connect", () => {
				setConnection("online");
				setLastError("");
				const current = selectedConversationId();
				if (current) {
					socket.emit("conversation:join", { conversationId: current });
					readConversation(current);
					markConversationRead(current);
				}
			});
			socket.on("reconnect", () => {});
			socket.on("disconnect", () => setConnection("offline"));
			socket.on("connect_error", (error) => {
				setConnection("offline");
				setLastError(error.message);
			});
			socket.on("session:ready", (payload) => {
				setOnlineAgents(payload.onlineAgents);
				const label = payload.agent?.name || user || "Agente";
				showToast("Realtime conectado", `Sessão de ${label} ativa.`, "info");
			});
			socket.on("conversations:snapshot", (payload) => {
				console.log("Conversation:snapshot", payload);
				applyBootstrap(payload);
			});
			socket.on("conversation:new", (payload) => {
				applyConversation(payload.conversation);
			});
			socket.on("conversation:state", (payload) => {
				applyConversation(payload.conversation);
			});
			socket.on("message:new", (payload) => {
				appendMessage(payload.conversationId, payload.message, payload.conversation);
				if (payload.message.sender === "client") {
					setTyping(payload.conversationId, false);
					scheduleStopTyping(payload.conversationId);
					if (payload.conversationId === selectedConversationId()) {
						readConversation(payload.conversationId);
						markConversationRead(payload.conversationId);
					}
				}
			});
			socket.on("conversation:updated", (payload) => {
				applyConversation(payload.conversation);
			});
			socket.on("conversation:removed", (payload) => {
				if (payload.id === selectedConversationId()) leaveConversation(payload.id);
				removeConversation(payload.id);
			});
			socket.on("typing:update", (payload) => {
				if (payload.sender === "agent") return;
				setTyping(payload.conversationId, Boolean(payload.isTyping));
			});
			socket.on("presence:online", (payload) => {
				setOnlineAgents(payload.onlineAgents);
			});
			socket.on("presence:offline", (payload) => {
				setOnlineAgents(payload.onlineAgents);
			});
			socket.on("session:error", (message) => {
				setLastError(message);
				showToast("Sessão realtime", message, "error");
			});
			socket.on("error", (payload) => {
				const message = payload?.error || "Erro no realtime";
				setLastError(message);
				showToast("Realtime", message, "warning");
			});
		};
		setup();
		return () => {
			disposed = true;
			if (typingTimer) clearTimeout(typingTimer);
			activeSocket?.removeAllListeners();
			activeSocket?.disconnect();
			activeSocket = null;
			setConnection("offline");
		};
	});
	return /* @__PURE__ */ jsx("div", { children });
};
typeof joinConversation === "function" && markClientExport(joinConversation, "features/chat/ContextSocket", "joinConversation", "hydrate");
typeof leaveConversation === "function" && markClientExport(leaveConversation, "features/chat/ContextSocket", "leaveConversation", "hydrate");
typeof sendAgentMessage === "function" && markClientExport(sendAgentMessage, "features/chat/ContextSocket", "sendAgentMessage", "hydrate");
typeof notifyTyping === "function" && markClientExport(notifyTyping, "features/chat/ContextSocket", "notifyTyping", "hydrate");
typeof deleteConversation === "function" && markClientExport(deleteConversation, "features/chat/ContextSocket", "deleteConversation", "hydrate");
typeof readConversation === "function" && markClientExport(readConversation, "features/chat/ContextSocket", "readConversation", "hydrate");
typeof ContextSocket === "function" && markClientExport(ContextSocket, "features/chat/ContextSocket", "ContextSocket", "hydrate");
typeof isTyping === "function" && markClientExport(isTyping, "features/chat/ContextSocket", "isTyping", "hydrate");

//#endregion
export { readConversation as a, notifyTyping as i, deleteConversation as n, sendAgentMessage as o, joinConversation as r, ContextSocket_exports as t };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmstRE5WWUtneTguanMiLCJuYW1lcyI6WyJ3aXRoTmF0aXZlQmxvYiIsIndpdGhOYXRpdmVBcnJheUJ1ZmZlciIsImlzVmlldyIsImxvb2t1cCIsImRlY29kZSIsIndpdGhOYXRpdmVBcnJheUJ1ZmZlciIsImRlY29kZSIsImdsb2JhbFRoaXMiLCJnbG9iYWxUaGlzIiwiZ2xvYmFsVGhpcyIsIlNvY2tldCIsIkRFRkFVTFRfVFJBTlNQT1JUUyIsInByb3RvY29sIiwiU29ja2V0IiwiUkVTRVJWRURfRVZFTlRTIiwicGFyc2VyIiwiRW5naW5lIiwiaW8iXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLXBhcnNlci9idWlsZC9lc20vY29tbW9ucy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9lbmNvZGVQYWNrZXQuYnJvd3Nlci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9jb250cmliL2Jhc2U2NC1hcnJheWJ1ZmZlci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9kZWNvZGVQYWNrZXQuYnJvd3Nlci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tcGFyc2VyL2J1aWxkL2VzbS9pbmRleC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9Ac29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyL2xpYi9lc20vaW5kZXguanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vZ2xvYmFscy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS91dGlsLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2NvbnRyaWIvcGFyc2Vxcy5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnQuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0cy9wb2xsaW5nLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2NvbnRyaWIvaGFzLWNvcnMuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vdHJhbnNwb3J0cy9wb2xsaW5nLXhoci5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3dlYnNvY2tldC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL3dlYnRyYW5zcG9ydC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9lbmdpbmUuaW8tY2xpZW50L2J1aWxkL2VzbS90cmFuc3BvcnRzL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2NvbnRyaWIvcGFyc2V1cmkuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvZW5naW5lLmlvLWNsaWVudC9idWlsZC9lc20vc29ja2V0LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2VuZ2luZS5pby1jbGllbnQvYnVpbGQvZXNtL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvYnVpbGQvZXNtL3VybC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tcGFyc2VyL2J1aWxkL2VzbS9pcy1iaW5hcnkuanMiLCIuLi8uLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9idWlsZC9lc20vYmluYXJ5LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1wYXJzZXIvYnVpbGQvZXNtL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvYnVpbGQvZXNtL29uLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvYnVpbGQvZXNtL3NvY2tldC5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9jb250cmliL2JhY2tvMi5qcyIsIi4uLy4uLy4uLy4uLy4uLy4uL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2J1aWxkL2VzbS9tYW5hZ2VyLmpzIiwiLi4vLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvYnVpbGQvZXNtL2luZGV4LmpzIiwiLi4vLi4vLi4vLi4vc3JjL3NoYXJlZC9zZXJ2ZXItYWN0aW9ucy9yZWFsdGltZS50cyIsIi4uLy4uLy4uLy4uL3NyYy9mZWF0dXJlcy9jaGF0L0NvbnRleHRTb2NrZXQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFBBQ0tFVF9UWVBFUyA9IE9iamVjdC5jcmVhdGUobnVsbCk7IC8vIG5vIE1hcCA9IG5vIHBvbHlmaWxsXG5QQUNLRVRfVFlQRVNbXCJvcGVuXCJdID0gXCIwXCI7XG5QQUNLRVRfVFlQRVNbXCJjbG9zZVwiXSA9IFwiMVwiO1xuUEFDS0VUX1RZUEVTW1wicGluZ1wiXSA9IFwiMlwiO1xuUEFDS0VUX1RZUEVTW1wicG9uZ1wiXSA9IFwiM1wiO1xuUEFDS0VUX1RZUEVTW1wibWVzc2FnZVwiXSA9IFwiNFwiO1xuUEFDS0VUX1RZUEVTW1widXBncmFkZVwiXSA9IFwiNVwiO1xuUEFDS0VUX1RZUEVTW1wibm9vcFwiXSA9IFwiNlwiO1xuY29uc3QgUEFDS0VUX1RZUEVTX1JFVkVSU0UgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuT2JqZWN0LmtleXMoUEFDS0VUX1RZUEVTKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICBQQUNLRVRfVFlQRVNfUkVWRVJTRVtQQUNLRVRfVFlQRVNba2V5XV0gPSBrZXk7XG59KTtcbmNvbnN0IEVSUk9SX1BBQ0tFVCA9IHsgdHlwZTogXCJlcnJvclwiLCBkYXRhOiBcInBhcnNlciBlcnJvclwiIH07XG5leHBvcnQgeyBQQUNLRVRfVFlQRVMsIFBBQ0tFVF9UWVBFU19SRVZFUlNFLCBFUlJPUl9QQUNLRVQgfTtcbiIsImltcG9ydCB7IFBBQ0tFVF9UWVBFUyB9IGZyb20gXCIuL2NvbW1vbnMuanNcIjtcbmNvbnN0IHdpdGhOYXRpdmVCbG9iID0gdHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiB8fFxuICAgICh0eXBlb2YgQmxvYiAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoQmxvYikgPT09IFwiW29iamVjdCBCbG9iQ29uc3RydWN0b3JdXCIpO1xuY29uc3Qgd2l0aE5hdGl2ZUFycmF5QnVmZmVyID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSBcImZ1bmN0aW9uXCI7XG4vLyBBcnJheUJ1ZmZlci5pc1ZpZXcgbWV0aG9kIGlzIG5vdCBkZWZpbmVkIGluIElFMTBcbmNvbnN0IGlzVmlldyA9IChvYmopID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgID8gQXJyYXlCdWZmZXIuaXNWaWV3KG9iailcbiAgICAgICAgOiBvYmogJiYgb2JqLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyO1xufTtcbmNvbnN0IGVuY29kZVBhY2tldCA9ICh7IHR5cGUsIGRhdGEgfSwgc3VwcG9ydHNCaW5hcnksIGNhbGxiYWNrKSA9PiB7XG4gICAgaWYgKHdpdGhOYXRpdmVCbG9iICYmIGRhdGEgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgIGlmIChzdXBwb3J0c0JpbmFyeSkge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZUJsb2JBc0Jhc2U2NChkYXRhLCBjYWxsYmFjayk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAod2l0aE5hdGl2ZUFycmF5QnVmZmVyICYmXG4gICAgICAgIChkYXRhIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIgfHwgaXNWaWV3KGRhdGEpKSkge1xuICAgICAgICBpZiAoc3VwcG9ydHNCaW5hcnkpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBlbmNvZGVCbG9iQXNCYXNlNjQobmV3IEJsb2IoW2RhdGFdKSwgY2FsbGJhY2spO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIHBsYWluIHN0cmluZ1xuICAgIHJldHVybiBjYWxsYmFjayhQQUNLRVRfVFlQRVNbdHlwZV0gKyAoZGF0YSB8fCBcIlwiKSk7XG59O1xuY29uc3QgZW5jb2RlQmxvYkFzQmFzZTY0ID0gKGRhdGEsIGNhbGxiYWNrKSA9PiB7XG4gICAgY29uc3QgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgZmlsZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBmaWxlUmVhZGVyLnJlc3VsdC5zcGxpdChcIixcIilbMV07XG4gICAgICAgIGNhbGxiYWNrKFwiYlwiICsgKGNvbnRlbnQgfHwgXCJcIikpO1xuICAgIH07XG4gICAgcmV0dXJuIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChkYXRhKTtcbn07XG5mdW5jdGlvbiB0b0FycmF5KGRhdGEpIHtcbiAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZGF0YSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZGF0YS5idWZmZXIsIGRhdGEuYnl0ZU9mZnNldCwgZGF0YS5ieXRlTGVuZ3RoKTtcbiAgICB9XG59XG5sZXQgVEVYVF9FTkNPREVSO1xuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZVBhY2tldFRvQmluYXJ5KHBhY2tldCwgY2FsbGJhY2spIHtcbiAgICBpZiAod2l0aE5hdGl2ZUJsb2IgJiYgcGFja2V0LmRhdGEgaW5zdGFuY2VvZiBCbG9iKSB7XG4gICAgICAgIHJldHVybiBwYWNrZXQuZGF0YS5hcnJheUJ1ZmZlcigpLnRoZW4odG9BcnJheSkudGhlbihjYWxsYmFjayk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHdpdGhOYXRpdmVBcnJheUJ1ZmZlciAmJlxuICAgICAgICAocGFja2V0LmRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlciB8fCBpc1ZpZXcocGFja2V0LmRhdGEpKSkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sodG9BcnJheShwYWNrZXQuZGF0YSkpO1xuICAgIH1cbiAgICBlbmNvZGVQYWNrZXQocGFja2V0LCBmYWxzZSwgKGVuY29kZWQpID0+IHtcbiAgICAgICAgaWYgKCFURVhUX0VOQ09ERVIpIHtcbiAgICAgICAgICAgIFRFWFRfRU5DT0RFUiA9IG5ldyBUZXh0RW5jb2RlcigpO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrKFRFWFRfRU5DT0RFUi5lbmNvZGUoZW5jb2RlZCkpO1xuICAgIH0pO1xufVxuZXhwb3J0IHsgZW5jb2RlUGFja2V0IH07XG4iLCIvLyBpbXBvcnRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9zb2NrZXRpby9iYXNlNjQtYXJyYXlidWZmZXJcbmNvbnN0IGNoYXJzID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuLy8gVXNlIGEgbG9va3VwIHRhYmxlIHRvIGZpbmQgdGhlIGluZGV4LlxuY29uc3QgbG9va3VwID0gdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnID8gW10gOiBuZXcgVWludDhBcnJheSgyNTYpO1xuZm9yIChsZXQgaSA9IDA7IGkgPCBjaGFycy5sZW5ndGg7IGkrKykge1xuICAgIGxvb2t1cFtjaGFycy5jaGFyQ29kZUF0KGkpXSA9IGk7XG59XG5leHBvcnQgY29uc3QgZW5jb2RlID0gKGFycmF5YnVmZmVyKSA9PiB7XG4gICAgbGV0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpLCBpLCBsZW4gPSBieXRlcy5sZW5ndGgsIGJhc2U2NCA9ICcnO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gMykge1xuICAgICAgICBiYXNlNjQgKz0gY2hhcnNbYnl0ZXNbaV0gPj4gMl07XG4gICAgICAgIGJhc2U2NCArPSBjaGFyc1soKGJ5dGVzW2ldICYgMykgPDwgNCkgfCAoYnl0ZXNbaSArIDFdID4+IDQpXTtcbiAgICAgICAgYmFzZTY0ICs9IGNoYXJzWygoYnl0ZXNbaSArIDFdICYgMTUpIDw8IDIpIHwgKGJ5dGVzW2kgKyAyXSA+PiA2KV07XG4gICAgICAgIGJhc2U2NCArPSBjaGFyc1tieXRlc1tpICsgMl0gJiA2M107XG4gICAgfVxuICAgIGlmIChsZW4gJSAzID09PSAyKSB7XG4gICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDEpICsgJz0nO1xuICAgIH1cbiAgICBlbHNlIGlmIChsZW4gJSAzID09PSAxKSB7XG4gICAgICAgIGJhc2U2NCA9IGJhc2U2NC5zdWJzdHJpbmcoMCwgYmFzZTY0Lmxlbmd0aCAtIDIpICsgJz09JztcbiAgICB9XG4gICAgcmV0dXJuIGJhc2U2NDtcbn07XG5leHBvcnQgY29uc3QgZGVjb2RlID0gKGJhc2U2NCkgPT4ge1xuICAgIGxldCBidWZmZXJMZW5ndGggPSBiYXNlNjQubGVuZ3RoICogMC43NSwgbGVuID0gYmFzZTY0Lmxlbmd0aCwgaSwgcCA9IDAsIGVuY29kZWQxLCBlbmNvZGVkMiwgZW5jb2RlZDMsIGVuY29kZWQ0O1xuICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDFdID09PSAnPScpIHtcbiAgICAgICAgYnVmZmVyTGVuZ3RoLS07XG4gICAgICAgIGlmIChiYXNlNjRbYmFzZTY0Lmxlbmd0aCAtIDJdID09PSAnPScpIHtcbiAgICAgICAgICAgIGJ1ZmZlckxlbmd0aC0tO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IGFycmF5YnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKGJ1ZmZlckxlbmd0aCksIGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlidWZmZXIpO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgICAgICBlbmNvZGVkMSA9IGxvb2t1cFtiYXNlNjQuY2hhckNvZGVBdChpKV07XG4gICAgICAgIGVuY29kZWQyID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkgKyAxKV07XG4gICAgICAgIGVuY29kZWQzID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkgKyAyKV07XG4gICAgICAgIGVuY29kZWQ0ID0gbG9va3VwW2Jhc2U2NC5jaGFyQ29kZUF0KGkgKyAzKV07XG4gICAgICAgIGJ5dGVzW3ArK10gPSAoZW5jb2RlZDEgPDwgMikgfCAoZW5jb2RlZDIgPj4gNCk7XG4gICAgICAgIGJ5dGVzW3ArK10gPSAoKGVuY29kZWQyICYgMTUpIDw8IDQpIHwgKGVuY29kZWQzID4+IDIpO1xuICAgICAgICBieXRlc1twKytdID0gKChlbmNvZGVkMyAmIDMpIDw8IDYpIHwgKGVuY29kZWQ0ICYgNjMpO1xuICAgIH1cbiAgICByZXR1cm4gYXJyYXlidWZmZXI7XG59O1xuIiwiaW1wb3J0IHsgRVJST1JfUEFDS0VULCBQQUNLRVRfVFlQRVNfUkVWRVJTRSwgfSBmcm9tIFwiLi9jb21tb25zLmpzXCI7XG5pbXBvcnQgeyBkZWNvZGUgfSBmcm9tIFwiLi9jb250cmliL2Jhc2U2NC1hcnJheWJ1ZmZlci5qc1wiO1xuY29uc3Qgd2l0aE5hdGl2ZUFycmF5QnVmZmVyID0gdHlwZW9mIEFycmF5QnVmZmVyID09PSBcImZ1bmN0aW9uXCI7XG5leHBvcnQgY29uc3QgZGVjb2RlUGFja2V0ID0gKGVuY29kZWRQYWNrZXQsIGJpbmFyeVR5cGUpID0+IHtcbiAgICBpZiAodHlwZW9mIGVuY29kZWRQYWNrZXQgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IFwibWVzc2FnZVwiLFxuICAgICAgICAgICAgZGF0YTogbWFwQmluYXJ5KGVuY29kZWRQYWNrZXQsIGJpbmFyeVR5cGUpLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb25zdCB0eXBlID0gZW5jb2RlZFBhY2tldC5jaGFyQXQoMCk7XG4gICAgaWYgKHR5cGUgPT09IFwiYlwiKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBcIm1lc3NhZ2VcIixcbiAgICAgICAgICAgIGRhdGE6IGRlY29kZUJhc2U2NFBhY2tldChlbmNvZGVkUGFja2V0LnN1YnN0cmluZygxKSwgYmluYXJ5VHlwZSksXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IHBhY2tldFR5cGUgPSBQQUNLRVRfVFlQRVNfUkVWRVJTRVt0eXBlXTtcbiAgICBpZiAoIXBhY2tldFR5cGUpIHtcbiAgICAgICAgcmV0dXJuIEVSUk9SX1BBQ0tFVDtcbiAgICB9XG4gICAgcmV0dXJuIGVuY29kZWRQYWNrZXQubGVuZ3RoID4gMVxuICAgICAgICA/IHtcbiAgICAgICAgICAgIHR5cGU6IFBBQ0tFVF9UWVBFU19SRVZFUlNFW3R5cGVdLFxuICAgICAgICAgICAgZGF0YTogZW5jb2RlZFBhY2tldC5zdWJzdHJpbmcoMSksXG4gICAgICAgIH1cbiAgICAgICAgOiB7XG4gICAgICAgICAgICB0eXBlOiBQQUNLRVRfVFlQRVNfUkVWRVJTRVt0eXBlXSxcbiAgICAgICAgfTtcbn07XG5jb25zdCBkZWNvZGVCYXNlNjRQYWNrZXQgPSAoZGF0YSwgYmluYXJ5VHlwZSkgPT4ge1xuICAgIGlmICh3aXRoTmF0aXZlQXJyYXlCdWZmZXIpIHtcbiAgICAgICAgY29uc3QgZGVjb2RlZCA9IGRlY29kZShkYXRhKTtcbiAgICAgICAgcmV0dXJuIG1hcEJpbmFyeShkZWNvZGVkLCBiaW5hcnlUeXBlKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiB7IGJhc2U2NDogdHJ1ZSwgZGF0YSB9OyAvLyBmYWxsYmFjayBmb3Igb2xkIGJyb3dzZXJzXG4gICAgfVxufTtcbmNvbnN0IG1hcEJpbmFyeSA9IChkYXRhLCBiaW5hcnlUeXBlKSA9PiB7XG4gICAgc3dpdGNoIChiaW5hcnlUeXBlKSB7XG4gICAgICAgIGNhc2UgXCJibG9iXCI6XG4gICAgICAgICAgICBpZiAoZGF0YSBpbnN0YW5jZW9mIEJsb2IpIHtcbiAgICAgICAgICAgICAgICAvLyBmcm9tIFdlYlNvY2tldCArIGJpbmFyeVR5cGUgXCJibG9iXCJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGZyb20gSFRUUCBsb25nLXBvbGxpbmcgb3IgV2ViVHJhbnNwb3J0XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBCbG9iKFtkYXRhXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIGNhc2UgXCJhcnJheWJ1ZmZlclwiOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgICAgICAgICAgICAgIC8vIGZyb20gSFRUUCBsb25nLXBvbGxpbmcgKGJhc2U2NCkgb3IgV2ViU29ja2V0ICsgYmluYXJ5VHlwZSBcImFycmF5YnVmZmVyXCJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGZyb20gV2ViVHJhbnNwb3J0IChVaW50OEFycmF5KVxuICAgICAgICAgICAgICAgIHJldHVybiBkYXRhLmJ1ZmZlcjtcbiAgICAgICAgICAgIH1cbiAgICB9XG59O1xuIiwiaW1wb3J0IHsgZW5jb2RlUGFja2V0LCBlbmNvZGVQYWNrZXRUb0JpbmFyeSB9IGZyb20gXCIuL2VuY29kZVBhY2tldC5qc1wiO1xuaW1wb3J0IHsgZGVjb2RlUGFja2V0IH0gZnJvbSBcIi4vZGVjb2RlUGFja2V0LmpzXCI7XG5pbXBvcnQgeyBFUlJPUl9QQUNLRVQsIH0gZnJvbSBcIi4vY29tbW9ucy5qc1wiO1xuY29uc3QgU0VQQVJBVE9SID0gU3RyaW5nLmZyb21DaGFyQ29kZSgzMCk7IC8vIHNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9EZWxpbWl0ZXIjQVNDSUlfZGVsaW1pdGVkX3RleHRcbmNvbnN0IGVuY29kZVBheWxvYWQgPSAocGFja2V0cywgY2FsbGJhY2spID0+IHtcbiAgICAvLyBzb21lIHBhY2tldHMgbWF5IGJlIGFkZGVkIHRvIHRoZSBhcnJheSB3aGlsZSBlbmNvZGluZywgc28gdGhlIGluaXRpYWwgbGVuZ3RoIG11c3QgYmUgc2F2ZWRcbiAgICBjb25zdCBsZW5ndGggPSBwYWNrZXRzLmxlbmd0aDtcbiAgICBjb25zdCBlbmNvZGVkUGFja2V0cyA9IG5ldyBBcnJheShsZW5ndGgpO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgcGFja2V0cy5mb3JFYWNoKChwYWNrZXQsIGkpID0+IHtcbiAgICAgICAgLy8gZm9yY2UgYmFzZTY0IGVuY29kaW5nIGZvciBiaW5hcnkgcGFja2V0c1xuICAgICAgICBlbmNvZGVQYWNrZXQocGFja2V0LCBmYWxzZSwgKGVuY29kZWRQYWNrZXQpID0+IHtcbiAgICAgICAgICAgIGVuY29kZWRQYWNrZXRzW2ldID0gZW5jb2RlZFBhY2tldDtcbiAgICAgICAgICAgIGlmICgrK2NvdW50ID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhlbmNvZGVkUGFja2V0cy5qb2luKFNFUEFSQVRPUikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5jb25zdCBkZWNvZGVQYXlsb2FkID0gKGVuY29kZWRQYXlsb2FkLCBiaW5hcnlUeXBlKSA9PiB7XG4gICAgY29uc3QgZW5jb2RlZFBhY2tldHMgPSBlbmNvZGVkUGF5bG9hZC5zcGxpdChTRVBBUkFUT1IpO1xuICAgIGNvbnN0IHBhY2tldHMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVuY29kZWRQYWNrZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGRlY29kZWRQYWNrZXQgPSBkZWNvZGVQYWNrZXQoZW5jb2RlZFBhY2tldHNbaV0sIGJpbmFyeVR5cGUpO1xuICAgICAgICBwYWNrZXRzLnB1c2goZGVjb2RlZFBhY2tldCk7XG4gICAgICAgIGlmIChkZWNvZGVkUGFja2V0LnR5cGUgPT09IFwiZXJyb3JcIikge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHBhY2tldHM7XG59O1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBhY2tldEVuY29kZXJTdHJlYW0oKSB7XG4gICAgcmV0dXJuIG5ldyBUcmFuc2Zvcm1TdHJlYW0oe1xuICAgICAgICB0cmFuc2Zvcm0ocGFja2V0LCBjb250cm9sbGVyKSB7XG4gICAgICAgICAgICBlbmNvZGVQYWNrZXRUb0JpbmFyeShwYWNrZXQsIChlbmNvZGVkUGFja2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF5bG9hZExlbmd0aCA9IGVuY29kZWRQYWNrZXQubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGxldCBoZWFkZXI7XG4gICAgICAgICAgICAgICAgLy8gaW5zcGlyZWQgYnkgdGhlIFdlYlNvY2tldCBmb3JtYXQ6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJTb2NrZXRzX0FQSS9Xcml0aW5nX1dlYlNvY2tldF9zZXJ2ZXJzI2RlY29kaW5nX3BheWxvYWRfbGVuZ3RoXG4gICAgICAgICAgICAgICAgaWYgKHBheWxvYWRMZW5ndGggPCAxMjYpIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyID0gbmV3IFVpbnQ4QXJyYXkoMSk7XG4gICAgICAgICAgICAgICAgICAgIG5ldyBEYXRhVmlldyhoZWFkZXIuYnVmZmVyKS5zZXRVaW50OCgwLCBwYXlsb2FkTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocGF5bG9hZExlbmd0aCA8IDY1NTM2KSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlciA9IG5ldyBVaW50OEFycmF5KDMpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aWV3ID0gbmV3IERhdGFWaWV3KGhlYWRlci5idWZmZXIpO1xuICAgICAgICAgICAgICAgICAgICB2aWV3LnNldFVpbnQ4KDAsIDEyNik7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcuc2V0VWludDE2KDEsIHBheWxvYWRMZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyID0gbmV3IFVpbnQ4QXJyYXkoOSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZpZXcgPSBuZXcgRGF0YVZpZXcoaGVhZGVyLmJ1ZmZlcik7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcuc2V0VWludDgoMCwgMTI3KTtcbiAgICAgICAgICAgICAgICAgICAgdmlldy5zZXRCaWdVaW50NjQoMSwgQmlnSW50KHBheWxvYWRMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZmlyc3QgYml0IGluZGljYXRlcyB3aGV0aGVyIHRoZSBwYXlsb2FkIGlzIHBsYWluIHRleHQgKDApIG9yIGJpbmFyeSAoMSlcbiAgICAgICAgICAgICAgICBpZiAocGFja2V0LmRhdGEgJiYgdHlwZW9mIHBhY2tldC5kYXRhICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlclswXSB8PSAweDgwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLmVucXVldWUoaGVhZGVyKTtcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyLmVucXVldWUoZW5jb2RlZFBhY2tldCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9KTtcbn1cbmxldCBURVhUX0RFQ09ERVI7XG5mdW5jdGlvbiB0b3RhbExlbmd0aChjaHVua3MpIHtcbiAgICByZXR1cm4gY2h1bmtzLnJlZHVjZSgoYWNjLCBjaHVuaykgPT4gYWNjICsgY2h1bmsubGVuZ3RoLCAwKTtcbn1cbmZ1bmN0aW9uIGNvbmNhdENodW5rcyhjaHVua3MsIHNpemUpIHtcbiAgICBpZiAoY2h1bmtzWzBdLmxlbmd0aCA9PT0gc2l6ZSkge1xuICAgICAgICByZXR1cm4gY2h1bmtzLnNoaWZ0KCk7XG4gICAgfVxuICAgIGNvbnN0IGJ1ZmZlciA9IG5ldyBVaW50OEFycmF5KHNpemUpO1xuICAgIGxldCBqID0gMDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICBidWZmZXJbaV0gPSBjaHVua3NbMF1baisrXTtcbiAgICAgICAgaWYgKGogPT09IGNodW5rc1swXS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNodW5rcy5zaGlmdCgpO1xuICAgICAgICAgICAgaiA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNodW5rcy5sZW5ndGggJiYgaiA8IGNodW5rc1swXS5sZW5ndGgpIHtcbiAgICAgICAgY2h1bmtzWzBdID0gY2h1bmtzWzBdLnNsaWNlKGopO1xuICAgIH1cbiAgICByZXR1cm4gYnVmZmVyO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVBhY2tldERlY29kZXJTdHJlYW0obWF4UGF5bG9hZCwgYmluYXJ5VHlwZSkge1xuICAgIGlmICghVEVYVF9ERUNPREVSKSB7XG4gICAgICAgIFRFWFRfREVDT0RFUiA9IG5ldyBUZXh0RGVjb2RlcigpO1xuICAgIH1cbiAgICBjb25zdCBjaHVua3MgPSBbXTtcbiAgICBsZXQgc3RhdGUgPSAwIC8qIFN0YXRlLlJFQURfSEVBREVSICovO1xuICAgIGxldCBleHBlY3RlZExlbmd0aCA9IC0xO1xuICAgIGxldCBpc0JpbmFyeSA9IGZhbHNlO1xuICAgIHJldHVybiBuZXcgVHJhbnNmb3JtU3RyZWFtKHtcbiAgICAgICAgdHJhbnNmb3JtKGNodW5rLCBjb250cm9sbGVyKSB7XG4gICAgICAgICAgICBjaHVua3MucHVzaChjaHVuayk7XG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PT0gMCAvKiBTdGF0ZS5SRUFEX0hFQURFUiAqLykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodG90YWxMZW5ndGgoY2h1bmtzKSA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlciA9IGNvbmNhdENodW5rcyhjaHVua3MsIDEpO1xuICAgICAgICAgICAgICAgICAgICBpc0JpbmFyeSA9IChoZWFkZXJbMF0gJiAweDgwKSA9PT0gMHg4MDtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWRMZW5ndGggPSBoZWFkZXJbMF0gJiAweDdmO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXhwZWN0ZWRMZW5ndGggPCAxMjYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlID0gMyAvKiBTdGF0ZS5SRUFEX1BBWUxPQUQgKi87XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZXhwZWN0ZWRMZW5ndGggPT09IDEyNikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAxIC8qIFN0YXRlLlJFQURfRVhURU5ERURfTEVOR1RIXzE2ICovO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAyIC8qIFN0YXRlLlJFQURfRVhURU5ERURfTEVOR1RIXzY0ICovO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHN0YXRlID09PSAxIC8qIFN0YXRlLlJFQURfRVhURU5ERURfTEVOR1RIXzE2ICovKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0b3RhbExlbmd0aChjaHVua3MpIDwgMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGVyQXJyYXkgPSBjb25jYXRDaHVua3MoY2h1bmtzLCAyKTtcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWRMZW5ndGggPSBuZXcgRGF0YVZpZXcoaGVhZGVyQXJyYXkuYnVmZmVyLCBoZWFkZXJBcnJheS5ieXRlT2Zmc2V0LCBoZWFkZXJBcnJheS5sZW5ndGgpLmdldFVpbnQxNigwKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAzIC8qIFN0YXRlLlJFQURfUEFZTE9BRCAqLztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc3RhdGUgPT09IDIgLyogU3RhdGUuUkVBRF9FWFRFTkRFRF9MRU5HVEhfNjQgKi8pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvdGFsTGVuZ3RoKGNodW5rcykgPCA4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkZXJBcnJheSA9IGNvbmNhdENodW5rcyhjaHVua3MsIDgpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aWV3ID0gbmV3IERhdGFWaWV3KGhlYWRlckFycmF5LmJ1ZmZlciwgaGVhZGVyQXJyYXkuYnl0ZU9mZnNldCwgaGVhZGVyQXJyYXkubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbiA9IHZpZXcuZ2V0VWludDMyKDApO1xuICAgICAgICAgICAgICAgICAgICBpZiAobiA+IE1hdGgucG93KDIsIDUzIC0gMzIpIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIG1heGltdW0gc2FmZSBpbnRlZ2VyIGluIEphdmFTY3JpcHQgaXMgMl41MyAtIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShFUlJPUl9QQUNLRVQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0ZWRMZW5ndGggPSBuICogTWF0aC5wb3coMiwgMzIpICsgdmlldy5nZXRVaW50MzIoNCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlID0gMyAvKiBTdGF0ZS5SRUFEX1BBWUxPQUQgKi87XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodG90YWxMZW5ndGgoY2h1bmtzKSA8IGV4cGVjdGVkTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gY29uY2F0Q2h1bmtzKGNodW5rcywgZXhwZWN0ZWRMZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLmVucXVldWUoZGVjb2RlUGFja2V0KGlzQmluYXJ5ID8gZGF0YSA6IFRFWFRfREVDT0RFUi5kZWNvZGUoZGF0YSksIGJpbmFyeVR5cGUpKTtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUgPSAwIC8qIFN0YXRlLlJFQURfSEVBREVSICovO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoZXhwZWN0ZWRMZW5ndGggPT09IDAgfHwgZXhwZWN0ZWRMZW5ndGggPiBtYXhQYXlsb2FkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIuZW5xdWV1ZShFUlJPUl9QQUNLRVQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG5leHBvcnQgY29uc3QgcHJvdG9jb2wgPSA0O1xuZXhwb3J0IHsgZW5jb2RlUGFja2V0LCBlbmNvZGVQYXlsb2FkLCBkZWNvZGVQYWNrZXQsIGRlY29kZVBheWxvYWQsIH07XG4iLCIvKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIEVtaXR0ZXIob2JqKSB7XG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xufVxuXG4vKipcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xuICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHJldHVybiB7RW1pdHRlcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUub24gPVxuRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcbiAgKHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdKVxuICAgIC5wdXNoKGZuKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcbiAgZnVuY3Rpb24gb24oKSB7XG4gICAgdGhpcy5vZmYoZXZlbnQsIG9uKTtcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9XG5cbiAgb24uZm4gPSBmbjtcbiAgdGhpcy5vbihldmVudCwgb24pO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLm9mZiA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPVxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICAvLyBhbGxcbiAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIHRoaXMuX2NhbGxiYWNrcyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gc3BlY2lmaWMgZXZlbnRcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XG4gIGlmICghY2FsbGJhY2tzKSByZXR1cm4gdGhpcztcblxuICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXG4gIHZhciBjYjtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcbiAgICBjYiA9IGNhbGxiYWNrc1tpXTtcbiAgICBpZiAoY2IgPT09IGZuIHx8IGNiLmZuID09PSBmbikge1xuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJlbW92ZSBldmVudCBzcGVjaWZpYyBhcnJheXMgZm9yIGV2ZW50IHR5cGVzIHRoYXQgbm9cbiAgLy8gb25lIGlzIHN1YnNjcmliZWQgZm9yIHRvIGF2b2lkIG1lbW9yeSBsZWFrLlxuICBpZiAoY2FsbGJhY2tzLmxlbmd0aCA9PT0gMCkge1xuICAgIGRlbGV0ZSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEVtaXQgYGV2ZW50YCB3aXRoIHRoZSBnaXZlbiBhcmdzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHBhcmFtIHtNaXhlZH0gLi4uXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbihldmVudCl7XG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcblxuICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSlcbiAgICAsIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XG5cbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgfVxuXG4gIGlmIChjYWxsYmFja3MpIHtcbiAgICBjYWxsYmFja3MgPSBjYWxsYmFja3Muc2xpY2UoMCk7XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gYWxpYXMgdXNlZCBmb3IgcmVzZXJ2ZWQgZXZlbnRzIChwcm90ZWN0ZWQgbWV0aG9kKVxuRW1pdHRlci5wcm90b3R5cGUuZW1pdFJlc2VydmVkID0gRW1pdHRlci5wcm90b3R5cGUuZW1pdDtcblxuLyoqXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7QXJyYXl9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbkVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuRW1pdHRlci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xuICByZXR1cm4gISEgdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcbn07XG4iLCJleHBvcnQgY29uc3QgbmV4dFRpY2sgPSAoKCkgPT4ge1xuICAgIGNvbnN0IGlzUHJvbWlzZUF2YWlsYWJsZSA9IHR5cGVvZiBQcm9taXNlID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFByb21pc2UucmVzb2x2ZSA9PT0gXCJmdW5jdGlvblwiO1xuICAgIGlmIChpc1Byb21pc2VBdmFpbGFibGUpIHtcbiAgICAgICAgcmV0dXJuIChjYikgPT4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihjYik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gKGNiLCBzZXRUaW1lb3V0Rm4pID0+IHNldFRpbWVvdXRGbihjYiwgMCk7XG4gICAgfVxufSkoKTtcbmV4cG9ydCBjb25zdCBnbG9iYWxUaGlzU2hpbSA9ICgoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3c7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1xuICAgIH1cbn0pKCk7XG5leHBvcnQgY29uc3QgZGVmYXVsdEJpbmFyeVR5cGUgPSBcImFycmF5YnVmZmVyXCI7XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ29va2llSmFyKCkgeyB9XG4iLCJpbXBvcnQgeyBnbG9iYWxUaGlzU2hpbSBhcyBnbG9iYWxUaGlzIH0gZnJvbSBcIi4vZ2xvYmFscy5ub2RlLmpzXCI7XG5leHBvcnQgZnVuY3Rpb24gcGljayhvYmosIC4uLmF0dHIpIHtcbiAgICByZXR1cm4gYXR0ci5yZWR1Y2UoKGFjYywgaykgPT4ge1xuICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KGspKSB7XG4gICAgICAgICAgICBhY2Nba10gPSBvYmpba107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB7fSk7XG59XG4vLyBLZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSByZWFsIHRpbWVvdXQgZnVuY3Rpb25zIHNvIHRoZXkgY2FuIGJlIHVzZWQgd2hlbiBvdmVycmlkZGVuXG5jb25zdCBOQVRJVkVfU0VUX1RJTUVPVVQgPSBnbG9iYWxUaGlzLnNldFRpbWVvdXQ7XG5jb25zdCBOQVRJVkVfQ0xFQVJfVElNRU9VVCA9IGdsb2JhbFRoaXMuY2xlYXJUaW1lb3V0O1xuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbGxUaW1lckZ1bmN0aW9ucyhvYmosIG9wdHMpIHtcbiAgICBpZiAob3B0cy51c2VOYXRpdmVUaW1lcnMpIHtcbiAgICAgICAgb2JqLnNldFRpbWVvdXRGbiA9IE5BVElWRV9TRVRfVElNRU9VVC5iaW5kKGdsb2JhbFRoaXMpO1xuICAgICAgICBvYmouY2xlYXJUaW1lb3V0Rm4gPSBOQVRJVkVfQ0xFQVJfVElNRU9VVC5iaW5kKGdsb2JhbFRoaXMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgb2JqLnNldFRpbWVvdXRGbiA9IGdsb2JhbFRoaXMuc2V0VGltZW91dC5iaW5kKGdsb2JhbFRoaXMpO1xuICAgICAgICBvYmouY2xlYXJUaW1lb3V0Rm4gPSBnbG9iYWxUaGlzLmNsZWFyVGltZW91dC5iaW5kKGdsb2JhbFRoaXMpO1xuICAgIH1cbn1cbi8vIGJhc2U2NCBlbmNvZGVkIGJ1ZmZlcnMgYXJlIGFib3V0IDMzJSBiaWdnZXIgKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NClcbmNvbnN0IEJBU0U2NF9PVkVSSEVBRCA9IDEuMzM7XG4vLyB3ZSBjb3VsZCBhbHNvIGhhdmUgdXNlZCBgbmV3IEJsb2IoW29ial0pLnNpemVgLCBidXQgaXQgaXNuJ3Qgc3VwcG9ydGVkIGluIElFOVxuZXhwb3J0IGZ1bmN0aW9uIGJ5dGVMZW5ndGgob2JqKSB7XG4gICAgaWYgKHR5cGVvZiBvYmogPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgcmV0dXJuIHV0ZjhMZW5ndGgob2JqKTtcbiAgICB9XG4gICAgLy8gYXJyYXlidWZmZXIgb3IgYmxvYlxuICAgIHJldHVybiBNYXRoLmNlaWwoKG9iai5ieXRlTGVuZ3RoIHx8IG9iai5zaXplKSAqIEJBU0U2NF9PVkVSSEVBRCk7XG59XG5mdW5jdGlvbiB1dGY4TGVuZ3RoKHN0cikge1xuICAgIGxldCBjID0gMCwgbGVuZ3RoID0gMDtcbiAgICBmb3IgKGxldCBpID0gMCwgbCA9IHN0ci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICBpZiAoYyA8IDB4ODApIHtcbiAgICAgICAgICAgIGxlbmd0aCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGMgPCAweDgwMCkge1xuICAgICAgICAgICAgbGVuZ3RoICs9IDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoYyA8IDB4ZDgwMCB8fCBjID49IDB4ZTAwMCkge1xuICAgICAgICAgICAgbGVuZ3RoICs9IDM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBsZW5ndGggKz0gNDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbGVuZ3RoO1xufVxuLyoqXG4gKiBHZW5lcmF0ZXMgYSByYW5kb20gOC1jaGFyYWN0ZXJzIHN0cmluZy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbVN0cmluZygpIHtcbiAgICByZXR1cm4gKERhdGUubm93KCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygzKSArXG4gICAgICAgIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyLCA1KSk7XG59XG4iLCIvLyBpbXBvcnRlZCBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9nYWxrbi9xdWVyeXN0cmluZ1xuLyoqXG4gKiBDb21waWxlcyBhIHF1ZXJ5c3RyaW5nXG4gKiBSZXR1cm5zIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgb2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVuY29kZShvYmopIHtcbiAgICBsZXQgc3RyID0gJyc7XG4gICAgZm9yIChsZXQgaSBpbiBvYmopIHtcbiAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgaWYgKHN0ci5sZW5ndGgpXG4gICAgICAgICAgICAgICAgc3RyICs9ICcmJztcbiAgICAgICAgICAgIHN0ciArPSBlbmNvZGVVUklDb21wb25lbnQoaSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQob2JqW2ldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufVxuLyoqXG4gKiBQYXJzZXMgYSBzaW1wbGUgcXVlcnlzdHJpbmcgaW50byBhbiBvYmplY3RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlKHFzKSB7XG4gICAgbGV0IHFyeSA9IHt9O1xuICAgIGxldCBwYWlycyA9IHFzLnNwbGl0KCcmJyk7XG4gICAgZm9yIChsZXQgaSA9IDAsIGwgPSBwYWlycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgbGV0IHBhaXIgPSBwYWlyc1tpXS5zcGxpdCgnPScpO1xuICAgICAgICBxcnlbZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMF0pXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKTtcbiAgICB9XG4gICAgcmV0dXJuIHFyeTtcbn1cbiIsImltcG9ydCB7IGRlY29kZVBhY2tldCB9IGZyb20gXCJlbmdpbmUuaW8tcGFyc2VyXCI7XG5pbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbmltcG9ydCB7IGluc3RhbGxUaW1lckZ1bmN0aW9ucyB9IGZyb20gXCIuL3V0aWwuanNcIjtcbmltcG9ydCB7IGVuY29kZSB9IGZyb20gXCIuL2NvbnRyaWIvcGFyc2Vxcy5qc1wiO1xuZXhwb3J0IGNsYXNzIFRyYW5zcG9ydEVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIGNvbnN0cnVjdG9yKHJlYXNvbiwgZGVzY3JpcHRpb24sIGNvbnRleHQpIHtcbiAgICAgICAgc3VwZXIocmVhc29uKTtcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IGRlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICB0aGlzLnR5cGUgPSBcIlRyYW5zcG9ydEVycm9yXCI7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFRyYW5zcG9ydCBleHRlbmRzIEVtaXR0ZXIge1xuICAgIC8qKlxuICAgICAqIFRyYW5zcG9ydCBhYnN0cmFjdCBjb25zdHJ1Y3Rvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzIC0gb3B0aW9uc1xuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgaW5zdGFsbFRpbWVyRnVuY3Rpb25zKHRoaXMsIG9wdHMpO1xuICAgICAgICB0aGlzLm9wdHMgPSBvcHRzO1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gb3B0cy5xdWVyeTtcbiAgICAgICAgdGhpcy5zb2NrZXQgPSBvcHRzLnNvY2tldDtcbiAgICAgICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9ICFvcHRzLmZvcmNlQmFzZTY0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbWl0cyBhbiBlcnJvci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSByZWFzb25cbiAgICAgKiBAcGFyYW0gZGVzY3JpcHRpb25cbiAgICAgKiBAcGFyYW0gY29udGV4dCAtIHRoZSBlcnJvciBjb250ZXh0XG4gICAgICogQHJldHVybiB7VHJhbnNwb3J0fSBmb3IgY2hhaW5pbmdcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgb25FcnJvcihyZWFzb24sIGRlc2NyaXB0aW9uLCBjb250ZXh0KSB7XG4gICAgICAgIHN1cGVyLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIG5ldyBUcmFuc3BvcnRFcnJvcihyZWFzb24sIGRlc2NyaXB0aW9uLCBjb250ZXh0KSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPcGVucyB0aGUgdHJhbnNwb3J0LlxuICAgICAqL1xuICAgIG9wZW4oKSB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwib3BlbmluZ1wiO1xuICAgICAgICB0aGlzLmRvT3BlbigpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xvc2VzIHRoZSB0cmFuc3BvcnQuXG4gICAgICovXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFwib3BlbmluZ1wiIHx8IHRoaXMucmVhZHlTdGF0ZSA9PT0gXCJvcGVuXCIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9DbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIG11bHRpcGxlIHBhY2tldHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYWNrZXRzXG4gICAgICovXG4gICAgc2VuZChwYWNrZXRzKSB7XG4gICAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT09IFwib3BlblwiKSB7XG4gICAgICAgICAgICB0aGlzLndyaXRlKHBhY2tldHMpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gdGhpcyBtaWdodCBoYXBwZW4gaWYgdGhlIHRyYW5zcG9ydCB3YXMgc2lsZW50bHkgY2xvc2VkIGluIHRoZSBiZWZvcmV1bmxvYWQgZXZlbnQgaGFuZGxlclxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIG9wZW5cbiAgICAgKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvbk9wZW4oKSB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwib3BlblwiO1xuICAgICAgICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgc3VwZXIuZW1pdFJlc2VydmVkKFwib3BlblwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdpdGggZGF0YS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uRGF0YShkYXRhKSB7XG4gICAgICAgIGNvbnN0IHBhY2tldCA9IGRlY29kZVBhY2tldChkYXRhLCB0aGlzLnNvY2tldC5iaW5hcnlUeXBlKTtcbiAgICAgICAgdGhpcy5vblBhY2tldChwYWNrZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBhIGRlY29kZWQgcGFja2V0LlxuICAgICAqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9uUGFja2V0KHBhY2tldCkge1xuICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJwYWNrZXRcIiwgcGFja2V0KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gY2xvc2UuXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgb25DbG9zZShkZXRhaWxzKSB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwiY2xvc2VkXCI7XG4gICAgICAgIHN1cGVyLmVtaXRSZXNlcnZlZChcImNsb3NlXCIsIGRldGFpbHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQYXVzZXMgdGhlIHRyYW5zcG9ydCwgaW4gb3JkZXIgbm90IHRvIGxvc2UgcGFja2V0cyBkdXJpbmcgYW4gdXBncmFkZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBvblBhdXNlXG4gICAgICovXG4gICAgcGF1c2Uob25QYXVzZSkgeyB9XG4gICAgY3JlYXRlVXJpKHNjaGVtYSwgcXVlcnkgPSB7fSkge1xuICAgICAgICByZXR1cm4gKHNjaGVtYSArXG4gICAgICAgICAgICBcIjovL1wiICtcbiAgICAgICAgICAgIHRoaXMuX2hvc3RuYW1lKCkgK1xuICAgICAgICAgICAgdGhpcy5fcG9ydCgpICtcbiAgICAgICAgICAgIHRoaXMub3B0cy5wYXRoICtcbiAgICAgICAgICAgIHRoaXMuX3F1ZXJ5KHF1ZXJ5KSk7XG4gICAgfVxuICAgIF9ob3N0bmFtZSgpIHtcbiAgICAgICAgY29uc3QgaG9zdG5hbWUgPSB0aGlzLm9wdHMuaG9zdG5hbWU7XG4gICAgICAgIHJldHVybiBob3N0bmFtZS5pbmRleE9mKFwiOlwiKSA9PT0gLTEgPyBob3N0bmFtZSA6IFwiW1wiICsgaG9zdG5hbWUgKyBcIl1cIjtcbiAgICB9XG4gICAgX3BvcnQoKSB7XG4gICAgICAgIGlmICh0aGlzLm9wdHMucG9ydCAmJlxuICAgICAgICAgICAgKCh0aGlzLm9wdHMuc2VjdXJlICYmIE51bWJlcih0aGlzLm9wdHMucG9ydCkgIT09IDQ0MykgfHxcbiAgICAgICAgICAgICAgICAoIXRoaXMub3B0cy5zZWN1cmUgJiYgTnVtYmVyKHRoaXMub3B0cy5wb3J0KSAhPT0gODApKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiOlwiICsgdGhpcy5vcHRzLnBvcnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfcXVlcnkocXVlcnkpIHtcbiAgICAgICAgY29uc3QgZW5jb2RlZFF1ZXJ5ID0gZW5jb2RlKHF1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIGVuY29kZWRRdWVyeS5sZW5ndGggPyBcIj9cIiArIGVuY29kZWRRdWVyeSA6IFwiXCI7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVHJhbnNwb3J0IH0gZnJvbSBcIi4uL3RyYW5zcG9ydC5qc1wiO1xuaW1wb3J0IHsgcmFuZG9tU3RyaW5nIH0gZnJvbSBcIi4uL3V0aWwuanNcIjtcbmltcG9ydCB7IGVuY29kZVBheWxvYWQsIGRlY29kZVBheWxvYWQgfSBmcm9tIFwiZW5naW5lLmlvLXBhcnNlclwiO1xuZXhwb3J0IGNsYXNzIFBvbGxpbmcgZXh0ZW5kcyBUcmFuc3BvcnQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlciguLi5hcmd1bWVudHMpO1xuICAgICAgICB0aGlzLl9wb2xsaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIGdldCBuYW1lKCkge1xuICAgICAgICByZXR1cm4gXCJwb2xsaW5nXCI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE9wZW5zIHRoZSBzb2NrZXQgKHRyaWdnZXJzIHBvbGxpbmcpLiBXZSB3cml0ZSBhIFBJTkcgbWVzc2FnZSB0byBkZXRlcm1pbmVcbiAgICAgKiB3aGVuIHRoZSB0cmFuc3BvcnQgaXMgb3Blbi5cbiAgICAgKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBkb09wZW4oKSB7XG4gICAgICAgIHRoaXMuX3BvbGwoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUGF1c2VzIHBvbGxpbmcuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvblBhdXNlIC0gY2FsbGJhY2sgdXBvbiBidWZmZXJzIGFyZSBmbHVzaGVkIGFuZCB0cmFuc3BvcnQgaXMgcGF1c2VkXG4gICAgICogQHBhY2thZ2VcbiAgICAgKi9cbiAgICBwYXVzZShvblBhdXNlKSB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwicGF1c2luZ1wiO1xuICAgICAgICBjb25zdCBwYXVzZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwicGF1c2VkXCI7XG4gICAgICAgICAgICBvblBhdXNlKCk7XG4gICAgICAgIH07XG4gICAgICAgIGlmICh0aGlzLl9wb2xsaW5nIHx8ICF0aGlzLndyaXRhYmxlKSB7XG4gICAgICAgICAgICBsZXQgdG90YWwgPSAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3BvbGxpbmcpIHtcbiAgICAgICAgICAgICAgICB0b3RhbCsrO1xuICAgICAgICAgICAgICAgIHRoaXMub25jZShcInBvbGxDb21wbGV0ZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIC0tdG90YWwgfHwgcGF1c2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy53cml0YWJsZSkge1xuICAgICAgICAgICAgICAgIHRvdGFsKys7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNlKFwiZHJhaW5cIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAtLXRvdGFsIHx8IHBhdXNlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBwYXVzZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyBwb2xsaW5nIGN5Y2xlLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcG9sbCgpIHtcbiAgICAgICAgdGhpcy5fcG9sbGluZyA9IHRydWU7XG4gICAgICAgIHRoaXMuZG9Qb2xsKCk7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicG9sbFwiKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcmxvYWRzIG9uRGF0YSB0byBkZXRlY3QgcGF5bG9hZHMuXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgb25EYXRhKGRhdGEpIHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSAocGFja2V0KSA9PiB7XG4gICAgICAgICAgICAvLyBpZiBpdHMgdGhlIGZpcnN0IG1lc3NhZ2Ugd2UgY29uc2lkZXIgdGhlIHRyYW5zcG9ydCBvcGVuXG4gICAgICAgICAgICBpZiAoXCJvcGVuaW5nXCIgPT09IHRoaXMucmVhZHlTdGF0ZSAmJiBwYWNrZXQudHlwZSA9PT0gXCJvcGVuXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3BlbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgaXRzIGEgY2xvc2UgcGFja2V0LCB3ZSBjbG9zZSB0aGUgb25nb2luZyByZXF1ZXN0c1xuICAgICAgICAgICAgaWYgKFwiY2xvc2VcIiA9PT0gcGFja2V0LnR5cGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uQ2xvc2UoeyBkZXNjcmlwdGlvbjogXCJ0cmFuc3BvcnQgY2xvc2VkIGJ5IHRoZSBzZXJ2ZXJcIiB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBvdGhlcndpc2UgYnlwYXNzIG9uRGF0YSBhbmQgaGFuZGxlIHRoZSBtZXNzYWdlXG4gICAgICAgICAgICB0aGlzLm9uUGFja2V0KHBhY2tldCk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIGRlY29kZSBwYXlsb2FkXG4gICAgICAgIGRlY29kZVBheWxvYWQoZGF0YSwgdGhpcy5zb2NrZXQuYmluYXJ5VHlwZSkuZm9yRWFjaChjYWxsYmFjayk7XG4gICAgICAgIC8vIGlmIGFuIGV2ZW50IGRpZCBub3QgdHJpZ2dlciBjbG9zaW5nXG4gICAgICAgIGlmIChcImNsb3NlZFwiICE9PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIC8vIGlmIHdlIGdvdCBkYXRhIHdlJ3JlIG5vdCBwb2xsaW5nXG4gICAgICAgICAgICB0aGlzLl9wb2xsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBvbGxDb21wbGV0ZVwiKTtcbiAgICAgICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcG9sbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRm9yIHBvbGxpbmcsIHNlbmQgYSBjbG9zZSBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgZG9DbG9zZSgpIHtcbiAgICAgICAgY29uc3QgY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLndyaXRlKFt7IHR5cGU6IFwiY2xvc2VcIiB9XSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gaW4gY2FzZSB3ZSdyZSB0cnlpbmcgdG8gY2xvc2Ugd2hpbGVcbiAgICAgICAgICAgIC8vIGhhbmRzaGFraW5nIGlzIGluIHByb2dyZXNzIChHSC0xNjQpXG4gICAgICAgICAgICB0aGlzLm9uY2UoXCJvcGVuXCIsIGNsb3NlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBXcml0ZXMgYSBwYWNrZXRzIHBheWxvYWQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYWNrZXRzIC0gZGF0YSBwYWNrZXRzXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHdyaXRlKHBhY2tldHMpIHtcbiAgICAgICAgdGhpcy53cml0YWJsZSA9IGZhbHNlO1xuICAgICAgICBlbmNvZGVQYXlsb2FkKHBhY2tldHMsIChkYXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRvV3JpdGUoZGF0YSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZHJhaW5cIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlcyB1cmkgZm9yIGNvbm5lY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHVyaSgpIHtcbiAgICAgICAgY29uc3Qgc2NoZW1hID0gdGhpcy5vcHRzLnNlY3VyZSA/IFwiaHR0cHNcIiA6IFwiaHR0cFwiO1xuICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMucXVlcnkgfHwge307XG4gICAgICAgIC8vIGNhY2hlIGJ1c3RpbmcgaXMgZm9yY2VkXG4gICAgICAgIGlmIChmYWxzZSAhPT0gdGhpcy5vcHRzLnRpbWVzdGFtcFJlcXVlc3RzKSB7XG4gICAgICAgICAgICBxdWVyeVt0aGlzLm9wdHMudGltZXN0YW1wUGFyYW1dID0gcmFuZG9tU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnN1cHBvcnRzQmluYXJ5ICYmICFxdWVyeS5zaWQpIHtcbiAgICAgICAgICAgIHF1ZXJ5LmI2NCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlVXJpKHNjaGVtYSwgcXVlcnkpO1xuICAgIH1cbn1cbiIsIi8vIGltcG9ydGVkIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2NvbXBvbmVudC9oYXMtY29yc1xubGV0IHZhbHVlID0gZmFsc2U7XG50cnkge1xuICAgIHZhbHVlID0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAnd2l0aENyZWRlbnRpYWxzJyBpbiBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbn1cbmNhdGNoIChlcnIpIHtcbiAgICAvLyBpZiBYTUxIdHRwIHN1cHBvcnQgaXMgZGlzYWJsZWQgaW4gSUUgdGhlbiBpdCB3aWxsIHRocm93XG4gICAgLy8gd2hlbiB0cnlpbmcgdG8gY3JlYXRlXG59XG5leHBvcnQgY29uc3QgaGFzQ09SUyA9IHZhbHVlO1xuIiwiaW1wb3J0IHsgUG9sbGluZyB9IGZyb20gXCIuL3BvbGxpbmcuanNcIjtcbmltcG9ydCB7IEVtaXR0ZXIgfSBmcm9tIFwiQHNvY2tldC5pby9jb21wb25lbnQtZW1pdHRlclwiO1xuaW1wb3J0IHsgaW5zdGFsbFRpbWVyRnVuY3Rpb25zLCBwaWNrIH0gZnJvbSBcIi4uL3V0aWwuanNcIjtcbmltcG9ydCB7IGdsb2JhbFRoaXNTaGltIGFzIGdsb2JhbFRoaXMgfSBmcm9tIFwiLi4vZ2xvYmFscy5ub2RlLmpzXCI7XG5pbXBvcnQgeyBoYXNDT1JTIH0gZnJvbSBcIi4uL2NvbnRyaWIvaGFzLWNvcnMuanNcIjtcbmZ1bmN0aW9uIGVtcHR5KCkgeyB9XG5leHBvcnQgY2xhc3MgQmFzZVhIUiBleHRlbmRzIFBvbGxpbmcge1xuICAgIC8qKlxuICAgICAqIFhIUiBQb2xsaW5nIGNvbnN0cnVjdG9yLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdHNcbiAgICAgKiBAcGFja2FnZVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgc3VwZXIob3B0cyk7XG4gICAgICAgIGlmICh0eXBlb2YgbG9jYXRpb24gIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGlzU1NMID0gXCJodHRwczpcIiA9PT0gbG9jYXRpb24ucHJvdG9jb2w7XG4gICAgICAgICAgICBsZXQgcG9ydCA9IGxvY2F0aW9uLnBvcnQ7XG4gICAgICAgICAgICAvLyBzb21lIHVzZXIgYWdlbnRzIGhhdmUgZW1wdHkgYGxvY2F0aW9uLnBvcnRgXG4gICAgICAgICAgICBpZiAoIXBvcnQpIHtcbiAgICAgICAgICAgICAgICBwb3J0ID0gaXNTU0wgPyBcIjQ0M1wiIDogXCI4MFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy54ZCA9XG4gICAgICAgICAgICAgICAgKHR5cGVvZiBsb2NhdGlvbiAhPT0gXCJ1bmRlZmluZWRcIiAmJlxuICAgICAgICAgICAgICAgICAgICBvcHRzLmhvc3RuYW1lICE9PSBsb2NhdGlvbi5ob3N0bmFtZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgcG9ydCAhPT0gb3B0cy5wb3J0O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGRhdGEuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YSAtIGRhdGEgdG8gc2VuZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiAtIGNhbGxlZCB1cG9uIGZsdXNoLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgZG9Xcml0ZShkYXRhLCBmbikge1xuICAgICAgICBjb25zdCByZXEgPSB0aGlzLnJlcXVlc3Qoe1xuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgIH0pO1xuICAgICAgICByZXEub24oXCJzdWNjZXNzXCIsIGZuKTtcbiAgICAgICAgcmVxLm9uKFwiZXJyb3JcIiwgKHhoclN0YXR1cywgY29udGV4dCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkVycm9yKFwieGhyIHBvc3QgZXJyb3JcIiwgeGhyU3RhdHVzLCBjb250ZXh0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN0YXJ0cyBhIHBvbGwgY3ljbGUuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGRvUG9sbCgpIHtcbiAgICAgICAgY29uc3QgcmVxID0gdGhpcy5yZXF1ZXN0KCk7XG4gICAgICAgIHJlcS5vbihcImRhdGFcIiwgdGhpcy5vbkRhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgIHJlcS5vbihcImVycm9yXCIsICh4aHJTdGF0dXMsIGNvbnRleHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMub25FcnJvcihcInhociBwb2xsIGVycm9yXCIsIHhoclN0YXR1cywgY29udGV4dCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnBvbGxYaHIgPSByZXE7XG4gICAgfVxufVxuZXhwb3J0IGNsYXNzIFJlcXVlc3QgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0IGNvbnN0cnVjdG9yXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICAgICAqIEBwYWNrYWdlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY3JlYXRlUmVxdWVzdCwgdXJpLCBvcHRzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlUmVxdWVzdCA9IGNyZWF0ZVJlcXVlc3Q7XG4gICAgICAgIGluc3RhbGxUaW1lckZ1bmN0aW9ucyh0aGlzLCBvcHRzKTtcbiAgICAgICAgdGhpcy5fb3B0cyA9IG9wdHM7XG4gICAgICAgIHRoaXMuX21ldGhvZCA9IG9wdHMubWV0aG9kIHx8IFwiR0VUXCI7XG4gICAgICAgIHRoaXMuX3VyaSA9IHVyaTtcbiAgICAgICAgdGhpcy5fZGF0YSA9IHVuZGVmaW5lZCAhPT0gb3B0cy5kYXRhID8gb3B0cy5kYXRhIDogbnVsbDtcbiAgICAgICAgdGhpcy5fY3JlYXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgdGhlIFhIUiBvYmplY3QgYW5kIHNlbmRzIHRoZSByZXF1ZXN0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfY3JlYXRlKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IG9wdHMgPSBwaWNrKHRoaXMuX29wdHMsIFwiYWdlbnRcIiwgXCJwZnhcIiwgXCJrZXlcIiwgXCJwYXNzcGhyYXNlXCIsIFwiY2VydFwiLCBcImNhXCIsIFwiY2lwaGVyc1wiLCBcInJlamVjdFVuYXV0aG9yaXplZFwiLCBcImF1dG9VbnJlZlwiKTtcbiAgICAgICAgb3B0cy54ZG9tYWluID0gISF0aGlzLl9vcHRzLnhkO1xuICAgICAgICBjb25zdCB4aHIgPSAodGhpcy5feGhyID0gdGhpcy5jcmVhdGVSZXF1ZXN0KG9wdHMpKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHhoci5vcGVuKHRoaXMuX21ldGhvZCwgdGhpcy5fdXJpLCB0cnVlKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX29wdHMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgeGhyLnNldERpc2FibGVIZWFkZXJDaGVjayAmJiB4aHIuc2V0RGlzYWJsZUhlYWRlckNoZWNrKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpIGluIHRoaXMuX29wdHMuZXh0cmFIZWFkZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fb3B0cy5leHRyYUhlYWRlcnMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihpLCB0aGlzLl9vcHRzLmV4dHJhSGVhZGVyc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgICAgICBpZiAoXCJQT1NUXCIgPT09IHRoaXMuX21ldGhvZCkge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsIFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKFwiQWNjZXB0XCIsIFwiKi8qXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgICAgKF9hID0gdGhpcy5fb3B0cy5jb29raWVKYXIpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5hZGRDb29raWVzKHhocik7XG4gICAgICAgICAgICAvLyBpZTYgY2hlY2tcbiAgICAgICAgICAgIGlmIChcIndpdGhDcmVkZW50aWFsc1wiIGluIHhocikge1xuICAgICAgICAgICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0aGlzLl9vcHRzLndpdGhDcmVkZW50aWFscztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLl9vcHRzLnJlcXVlc3RUaW1lb3V0KSB7XG4gICAgICAgICAgICAgICAgeGhyLnRpbWVvdXQgPSB0aGlzLl9vcHRzLnJlcXVlc3RUaW1lb3V0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIChfYSA9IHRoaXMuX29wdHMuY29va2llSmFyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EucGFyc2VDb29raWVzKFxuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIHhoci5nZXRSZXNwb25zZUhlYWRlcihcInNldC1jb29raWVcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoNCAhPT0geGhyLnJlYWR5U3RhdGUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAoMjAwID09PSB4aHIuc3RhdHVzIHx8IDEyMjMgPT09IHhoci5zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25Mb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBtYWtlIHN1cmUgdGhlIGBlcnJvcmAgZXZlbnQgaGFuZGxlciB0aGF0J3MgdXNlci1zZXRcbiAgICAgICAgICAgICAgICAgICAgLy8gZG9lcyBub3QgdGhyb3cgaW4gdGhlIHNhbWUgdGljayBhbmQgZ2V0cyBjYXVnaHQgaGVyZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vbkVycm9yKHR5cGVvZiB4aHIuc3RhdHVzID09PSBcIm51bWJlclwiID8geGhyLnN0YXR1cyA6IDApO1xuICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLnNlbmQodGhpcy5fZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIE5lZWQgdG8gZGVmZXIgc2luY2UgLmNyZWF0ZSgpIGlzIGNhbGxlZCBkaXJlY3RseSBmcm9tIHRoZSBjb25zdHJ1Y3RvclxuICAgICAgICAgICAgLy8gYW5kIHRodXMgdGhlICdlcnJvcicgZXZlbnQgY2FuIG9ubHkgYmUgb25seSBib3VuZCAqYWZ0ZXIqIHRoaXMgZXhjZXB0aW9uXG4gICAgICAgICAgICAvLyBvY2N1cnMuICBUaGVyZWZvcmUsIGFsc28sIHdlIGNhbm5vdCB0aHJvdyBoZXJlIGF0IGFsbC5cbiAgICAgICAgICAgIHRoaXMuc2V0VGltZW91dEZuKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkVycm9yKGUpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy5faW5kZXggPSBSZXF1ZXN0LnJlcXVlc3RzQ291bnQrKztcbiAgICAgICAgICAgIFJlcXVlc3QucmVxdWVzdHNbdGhpcy5faW5kZXhdID0gdGhpcztcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlcnJvci5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX29uRXJyb3IoZXJyKSB7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZXJyb3JcIiwgZXJyLCB0aGlzLl94aHIpO1xuICAgICAgICB0aGlzLl9jbGVhbnVwKHRydWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDbGVhbnMgdXAgaG91c2UuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9jbGVhbnVwKGZyb21FcnJvcikge1xuICAgICAgICBpZiAoXCJ1bmRlZmluZWRcIiA9PT0gdHlwZW9mIHRoaXMuX3hociB8fCBudWxsID09PSB0aGlzLl94aHIpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl94aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZW1wdHk7XG4gICAgICAgIGlmIChmcm9tRXJyb3IpIHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgdGhpcy5feGhyLmFib3J0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgZGVsZXRlIFJlcXVlc3QucmVxdWVzdHNbdGhpcy5faW5kZXhdO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3hociA9IG51bGw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGxvYWQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9vbkxvYWQoKSB7XG4gICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLl94aHIucmVzcG9uc2VUZXh0O1xuICAgICAgICBpZiAoZGF0YSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkYXRhXCIsIGRhdGEpO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJzdWNjZXNzXCIpO1xuICAgICAgICAgICAgdGhpcy5fY2xlYW51cCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFib3J0cyB0aGUgcmVxdWVzdC5cbiAgICAgKlxuICAgICAqIEBwYWNrYWdlXG4gICAgICovXG4gICAgYWJvcnQoKSB7XG4gICAgICAgIHRoaXMuX2NsZWFudXAoKTtcbiAgICB9XG59XG5SZXF1ZXN0LnJlcXVlc3RzQ291bnQgPSAwO1xuUmVxdWVzdC5yZXF1ZXN0cyA9IHt9O1xuLyoqXG4gKiBBYm9ydHMgcGVuZGluZyByZXF1ZXN0cyB3aGVuIHVubG9hZGluZyB0aGUgd2luZG93LiBUaGlzIGlzIG5lZWRlZCB0byBwcmV2ZW50XG4gKiBtZW1vcnkgbGVha3MgKGUuZy4gd2hlbiB1c2luZyBJRSkgYW5kIHRvIGVuc3VyZSB0aGF0IG5vIHNwdXJpb3VzIGVycm9yIGlzXG4gKiBlbWl0dGVkLlxuICovXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGlmICh0eXBlb2YgYXR0YWNoRXZlbnQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGF0dGFjaEV2ZW50KFwib251bmxvYWRcIiwgdW5sb2FkSGFuZGxlcik7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBhZGRFdmVudExpc3RlbmVyID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY29uc3QgdGVybWluYXRpb25FdmVudCA9IFwib25wYWdlaGlkZVwiIGluIGdsb2JhbFRoaXMgPyBcInBhZ2VoaWRlXCIgOiBcInVubG9hZFwiO1xuICAgICAgICBhZGRFdmVudExpc3RlbmVyKHRlcm1pbmF0aW9uRXZlbnQsIHVubG9hZEhhbmRsZXIsIGZhbHNlKTtcbiAgICB9XG59XG5mdW5jdGlvbiB1bmxvYWRIYW5kbGVyKCkge1xuICAgIGZvciAobGV0IGkgaW4gUmVxdWVzdC5yZXF1ZXN0cykge1xuICAgICAgICBpZiAoUmVxdWVzdC5yZXF1ZXN0cy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgUmVxdWVzdC5yZXF1ZXN0c1tpXS5hYm9ydCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuY29uc3QgaGFzWEhSMiA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgeGhyID0gbmV3UmVxdWVzdCh7XG4gICAgICAgIHhkb21haW46IGZhbHNlLFxuICAgIH0pO1xuICAgIHJldHVybiB4aHIgJiYgeGhyLnJlc3BvbnNlVHlwZSAhPT0gbnVsbDtcbn0pKCk7XG4vKipcbiAqIEhUVFAgbG9uZy1wb2xsaW5nIGJhc2VkIG9uIHRoZSBidWlsdC1pbiBgWE1MSHR0cFJlcXVlc3RgIG9iamVjdC5cbiAqXG4gKiBVc2FnZTogYnJvd3NlclxuICpcbiAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1hNTEh0dHBSZXF1ZXN0XG4gKi9cbmV4cG9ydCBjbGFzcyBYSFIgZXh0ZW5kcyBCYXNlWEhSIHtcbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIHN1cGVyKG9wdHMpO1xuICAgICAgICBjb25zdCBmb3JjZUJhc2U2NCA9IG9wdHMgJiYgb3B0cy5mb3JjZUJhc2U2NDtcbiAgICAgICAgdGhpcy5zdXBwb3J0c0JpbmFyeSA9IGhhc1hIUjIgJiYgIWZvcmNlQmFzZTY0O1xuICAgIH1cbiAgICByZXF1ZXN0KG9wdHMgPSB7fSkge1xuICAgICAgICBPYmplY3QuYXNzaWduKG9wdHMsIHsgeGQ6IHRoaXMueGQgfSwgdGhpcy5vcHRzKTtcbiAgICAgICAgcmV0dXJuIG5ldyBSZXF1ZXN0KG5ld1JlcXVlc3QsIHRoaXMudXJpKCksIG9wdHMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG5ld1JlcXVlc3Qob3B0cykge1xuICAgIGNvbnN0IHhkb21haW4gPSBvcHRzLnhkb21haW47XG4gICAgLy8gWE1MSHR0cFJlcXVlc3QgY2FuIGJlIGRpc2FibGVkIG9uIElFXG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAmJiAoIXhkb21haW4gfHwgaGFzQ09SUykpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZSkgeyB9XG4gICAgaWYgKCF4ZG9tYWluKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IGdsb2JhbFRoaXNbW1wiQWN0aXZlXCJdLmNvbmNhdChcIk9iamVjdFwiKS5qb2luKFwiWFwiKV0oXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgVHJhbnNwb3J0IH0gZnJvbSBcIi4uL3RyYW5zcG9ydC5qc1wiO1xuaW1wb3J0IHsgcGljaywgcmFuZG9tU3RyaW5nIH0gZnJvbSBcIi4uL3V0aWwuanNcIjtcbmltcG9ydCB7IGVuY29kZVBhY2tldCB9IGZyb20gXCJlbmdpbmUuaW8tcGFyc2VyXCI7XG5pbXBvcnQgeyBnbG9iYWxUaGlzU2hpbSBhcyBnbG9iYWxUaGlzLCBuZXh0VGljayB9IGZyb20gXCIuLi9nbG9iYWxzLm5vZGUuanNcIjtcbi8vIGRldGVjdCBSZWFjdE5hdGl2ZSBlbnZpcm9ubWVudFxuY29uc3QgaXNSZWFjdE5hdGl2ZSA9IHR5cGVvZiBuYXZpZ2F0b3IgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICB0eXBlb2YgbmF2aWdhdG9yLnByb2R1Y3QgPT09IFwic3RyaW5nXCIgJiZcbiAgICBuYXZpZ2F0b3IucHJvZHVjdC50b0xvd2VyQ2FzZSgpID09PSBcInJlYWN0bmF0aXZlXCI7XG5leHBvcnQgY2xhc3MgQmFzZVdTIGV4dGVuZHMgVHJhbnNwb3J0IHtcbiAgICBnZXQgbmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFwid2Vic29ja2V0XCI7XG4gICAgfVxuICAgIGRvT3BlbigpIHtcbiAgICAgICAgY29uc3QgdXJpID0gdGhpcy51cmkoKTtcbiAgICAgICAgY29uc3QgcHJvdG9jb2xzID0gdGhpcy5vcHRzLnByb3RvY29scztcbiAgICAgICAgLy8gUmVhY3QgTmF0aXZlIG9ubHkgc3VwcG9ydHMgdGhlICdoZWFkZXJzJyBvcHRpb24sIGFuZCB3aWxsIHByaW50IGEgd2FybmluZyBpZiBhbnl0aGluZyBlbHNlIGlzIHBhc3NlZFxuICAgICAgICBjb25zdCBvcHRzID0gaXNSZWFjdE5hdGl2ZVxuICAgICAgICAgICAgPyB7fVxuICAgICAgICAgICAgOiBwaWNrKHRoaXMub3B0cywgXCJhZ2VudFwiLCBcInBlck1lc3NhZ2VEZWZsYXRlXCIsIFwicGZ4XCIsIFwia2V5XCIsIFwicGFzc3BocmFzZVwiLCBcImNlcnRcIiwgXCJjYVwiLCBcImNpcGhlcnNcIiwgXCJyZWplY3RVbmF1dGhvcml6ZWRcIiwgXCJsb2NhbEFkZHJlc3NcIiwgXCJwcm90b2NvbFZlcnNpb25cIiwgXCJvcmlnaW5cIiwgXCJtYXhQYXlsb2FkXCIsIFwiZmFtaWx5XCIsIFwiY2hlY2tTZXJ2ZXJJZGVudGl0eVwiKTtcbiAgICAgICAgaWYgKHRoaXMub3B0cy5leHRyYUhlYWRlcnMpIHtcbiAgICAgICAgICAgIG9wdHMuaGVhZGVycyA9IHRoaXMub3B0cy5leHRyYUhlYWRlcnM7XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMud3MgPSB0aGlzLmNyZWF0ZVNvY2tldCh1cmksIHByb3RvY29scywgb3B0cyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZW1pdFJlc2VydmVkKFwiZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndzLmJpbmFyeVR5cGUgPSB0aGlzLnNvY2tldC5iaW5hcnlUeXBlO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZHMgZXZlbnQgbGlzdGVuZXJzIHRvIHRoZSBzb2NrZXRcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIHRoaXMud3Mub25vcGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5hdXRvVW5yZWYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndzLl9zb2NrZXQudW5yZWYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25PcGVuKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMud3Mub25jbG9zZSA9IChjbG9zZUV2ZW50KSA9PiB0aGlzLm9uQ2xvc2Uoe1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwid2Vic29ja2V0IGNvbm5lY3Rpb24gY2xvc2VkXCIsXG4gICAgICAgICAgICBjb250ZXh0OiBjbG9zZUV2ZW50LFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy53cy5vbm1lc3NhZ2UgPSAoZXYpID0+IHRoaXMub25EYXRhKGV2LmRhdGEpO1xuICAgICAgICB0aGlzLndzLm9uZXJyb3IgPSAoZSkgPT4gdGhpcy5vbkVycm9yKFwid2Vic29ja2V0IGVycm9yXCIsIGUpO1xuICAgIH1cbiAgICB3cml0ZShwYWNrZXRzKSB7XG4gICAgICAgIHRoaXMud3JpdGFibGUgPSBmYWxzZTtcbiAgICAgICAgLy8gZW5jb2RlUGFja2V0IGVmZmljaWVudCBhcyBpdCB1c2VzIFdTIGZyYW1pbmdcbiAgICAgICAgLy8gbm8gbmVlZCBmb3IgZW5jb2RlUGF5bG9hZFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhY2tldHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHBhY2tldCA9IHBhY2tldHNbaV07XG4gICAgICAgICAgICBjb25zdCBsYXN0UGFja2V0ID0gaSA9PT0gcGFja2V0cy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgZW5jb2RlUGFja2V0KHBhY2tldCwgdGhpcy5zdXBwb3J0c0JpbmFyeSwgKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBTb21ldGltZXMgdGhlIHdlYnNvY2tldCBoYXMgYWxyZWFkeSBiZWVuIGNsb3NlZCBidXQgdGhlIGJyb3dzZXIgZGlkbid0XG4gICAgICAgICAgICAgICAgLy8gaGF2ZSBhIGNoYW5jZSBvZiBpbmZvcm1pbmcgdXMgYWJvdXQgaXQgeWV0LCBpbiB0aGF0IGNhc2Ugc2VuZCB3aWxsXG4gICAgICAgICAgICAgICAgLy8gdGhyb3cgYW4gZXJyb3JcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRvV3JpdGUocGFja2V0LCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGxhc3RQYWNrZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZmFrZSBkcmFpblxuICAgICAgICAgICAgICAgICAgICAvLyBkZWZlciB0byBuZXh0IHRpY2sgdG8gYWxsb3cgU29ja2V0IHRvIGNsZWFyIHdyaXRlQnVmZmVyXG4gICAgICAgICAgICAgICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMud3JpdGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkcmFpblwiKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgdGhpcy5zZXRUaW1lb3V0Rm4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGRvQ2xvc2UoKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy53cyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy53cy5vbmVycm9yID0gKCkgPT4geyB9O1xuICAgICAgICAgICAgdGhpcy53cy5jbG9zZSgpO1xuICAgICAgICAgICAgdGhpcy53cyA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogR2VuZXJhdGVzIHVyaSBmb3IgY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdXJpKCkge1xuICAgICAgICBjb25zdCBzY2hlbWEgPSB0aGlzLm9wdHMuc2VjdXJlID8gXCJ3c3NcIiA6IFwid3NcIjtcbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLnF1ZXJ5IHx8IHt9O1xuICAgICAgICAvLyBhcHBlbmQgdGltZXN0YW1wIHRvIFVSSVxuICAgICAgICBpZiAodGhpcy5vcHRzLnRpbWVzdGFtcFJlcXVlc3RzKSB7XG4gICAgICAgICAgICBxdWVyeVt0aGlzLm9wdHMudGltZXN0YW1wUGFyYW1dID0gcmFuZG9tU3RyaW5nKCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29tbXVuaWNhdGUgYmluYXJ5IHN1cHBvcnQgY2FwYWJpbGl0aWVzXG4gICAgICAgIGlmICghdGhpcy5zdXBwb3J0c0JpbmFyeSkge1xuICAgICAgICAgICAgcXVlcnkuYjY0ID0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVVcmkoc2NoZW1hLCBxdWVyeSk7XG4gICAgfVxufVxuY29uc3QgV2ViU29ja2V0Q3RvciA9IGdsb2JhbFRoaXMuV2ViU29ja2V0IHx8IGdsb2JhbFRoaXMuTW96V2ViU29ja2V0O1xuLyoqXG4gKiBXZWJTb2NrZXQgdHJhbnNwb3J0IGJhc2VkIG9uIHRoZSBidWlsdC1pbiBgV2ViU29ja2V0YCBvYmplY3QuXG4gKlxuICogVXNhZ2U6IGJyb3dzZXIsIE5vZGUuanMgKHNpbmNlIHYyMSksIERlbm8sIEJ1blxuICpcbiAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL1dlYlNvY2tldFxuICogQHNlZSBodHRwczovL2Nhbml1c2UuY29tL21kbi1hcGlfd2Vic29ja2V0XG4gKiBAc2VlIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvZ2xvYmFscy5odG1sI3dlYnNvY2tldFxuICovXG5leHBvcnQgY2xhc3MgV1MgZXh0ZW5kcyBCYXNlV1Mge1xuICAgIGNyZWF0ZVNvY2tldCh1cmksIHByb3RvY29scywgb3B0cykge1xuICAgICAgICByZXR1cm4gIWlzUmVhY3ROYXRpdmVcbiAgICAgICAgICAgID8gcHJvdG9jb2xzXG4gICAgICAgICAgICAgICAgPyBuZXcgV2ViU29ja2V0Q3Rvcih1cmksIHByb3RvY29scylcbiAgICAgICAgICAgICAgICA6IG5ldyBXZWJTb2NrZXRDdG9yKHVyaSlcbiAgICAgICAgICAgIDogbmV3IFdlYlNvY2tldEN0b3IodXJpLCBwcm90b2NvbHMsIG9wdHMpO1xuICAgIH1cbiAgICBkb1dyaXRlKF9wYWNrZXQsIGRhdGEpIHtcbiAgICAgICAgdGhpcy53cy5zZW5kKGRhdGEpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IFRyYW5zcG9ydCB9IGZyb20gXCIuLi90cmFuc3BvcnQuanNcIjtcbmltcG9ydCB7IG5leHRUaWNrIH0gZnJvbSBcIi4uL2dsb2JhbHMubm9kZS5qc1wiO1xuaW1wb3J0IHsgY3JlYXRlUGFja2V0RGVjb2RlclN0cmVhbSwgY3JlYXRlUGFja2V0RW5jb2RlclN0cmVhbSwgfSBmcm9tIFwiZW5naW5lLmlvLXBhcnNlclwiO1xuLyoqXG4gKiBXZWJUcmFuc3BvcnQgdHJhbnNwb3J0IGJhc2VkIG9uIHRoZSBidWlsdC1pbiBgV2ViVHJhbnNwb3J0YCBvYmplY3QuXG4gKlxuICogVXNhZ2U6IGJyb3dzZXIsIE5vZGUuanMgKHdpdGggdGhlIGBAZmFpbHMtY29tcG9uZW50cy93ZWJ0cmFuc3BvcnRgIHBhY2thZ2UpXG4gKlxuICogQHNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2ViVHJhbnNwb3J0XG4gKiBAc2VlIGh0dHBzOi8vY2FuaXVzZS5jb20vd2VidHJhbnNwb3J0XG4gKi9cbmV4cG9ydCBjbGFzcyBXVCBleHRlbmRzIFRyYW5zcG9ydCB7XG4gICAgZ2V0IG5hbWUoKSB7XG4gICAgICAgIHJldHVybiBcIndlYnRyYW5zcG9ydFwiO1xuICAgIH1cbiAgICBkb09wZW4oKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB0aGlzLl90cmFuc3BvcnQgPSBuZXcgV2ViVHJhbnNwb3J0KHRoaXMuY3JlYXRlVXJpKFwiaHR0cHNcIiksIHRoaXMub3B0cy50cmFuc3BvcnRPcHRpb25zW3RoaXMubmFtZV0pO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIGVycik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdHJhbnNwb3J0LmNsb3NlZFxuICAgICAgICAgICAgLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkVycm9yKFwid2VidHJhbnNwb3J0IGVycm9yXCIsIGVycik7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBub3RlOiB3ZSBjb3VsZCBoYXZlIHVzZWQgYXN5bmMvYXdhaXQsIGJ1dCB0aGF0IHdvdWxkIHJlcXVpcmUgc29tZSBhZGRpdGlvbmFsIHBvbHlmaWxsc1xuICAgICAgICB0aGlzLl90cmFuc3BvcnQucmVhZHkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl90cmFuc3BvcnQuY3JlYXRlQmlkaXJlY3Rpb25hbFN0cmVhbSgpLnRoZW4oKHN0cmVhbSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRlY29kZXJTdHJlYW0gPSBjcmVhdGVQYWNrZXREZWNvZGVyU3RyZWFtKE51bWJlci5NQVhfU0FGRV9JTlRFR0VSLCB0aGlzLnNvY2tldC5iaW5hcnlUeXBlKTtcbiAgICAgICAgICAgICAgICBjb25zdCByZWFkZXIgPSBzdHJlYW0ucmVhZGFibGUucGlwZVRocm91Z2goZGVjb2RlclN0cmVhbSkuZ2V0UmVhZGVyKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZW5jb2RlclN0cmVhbSA9IGNyZWF0ZVBhY2tldEVuY29kZXJTdHJlYW0oKTtcbiAgICAgICAgICAgICAgICBlbmNvZGVyU3RyZWFtLnJlYWRhYmxlLnBpcGVUbyhzdHJlYW0ud3JpdGFibGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3dyaXRlciA9IGVuY29kZXJTdHJlYW0ud3JpdGFibGUuZ2V0V3JpdGVyKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVhZCA9ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmVhZGVyXG4gICAgICAgICAgICAgICAgICAgICAgICAucmVhZCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoeyBkb25lLCB2YWx1ZSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZG9uZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25QYWNrZXQodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZCgpO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZWFkKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcGFja2V0ID0geyB0eXBlOiBcIm9wZW5cIiB9O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnF1ZXJ5LnNpZCkge1xuICAgICAgICAgICAgICAgICAgICBwYWNrZXQuZGF0YSA9IGB7XCJzaWRcIjpcIiR7dGhpcy5xdWVyeS5zaWR9XCJ9YDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fd3JpdGVyLndyaXRlKHBhY2tldCkudGhlbigoKSA9PiB0aGlzLm9uT3BlbigpKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgd3JpdGUocGFja2V0cykge1xuICAgICAgICB0aGlzLndyaXRhYmxlID0gZmFsc2U7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGFja2V0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgcGFja2V0ID0gcGFja2V0c1tpXTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RQYWNrZXQgPSBpID09PSBwYWNrZXRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB0aGlzLl93cml0ZXIud3JpdGUocGFja2V0KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobGFzdFBhY2tldCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZHJhaW5cIik7XG4gICAgICAgICAgICAgICAgICAgIH0sIHRoaXMuc2V0VGltZW91dEZuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBkb0Nsb3NlKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIChfYSA9IHRoaXMuX3RyYW5zcG9ydCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNsb3NlKCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgWEhSIH0gZnJvbSBcIi4vcG9sbGluZy14aHIubm9kZS5qc1wiO1xuaW1wb3J0IHsgV1MgfSBmcm9tIFwiLi93ZWJzb2NrZXQubm9kZS5qc1wiO1xuaW1wb3J0IHsgV1QgfSBmcm9tIFwiLi93ZWJ0cmFuc3BvcnQuanNcIjtcbmV4cG9ydCBjb25zdCB0cmFuc3BvcnRzID0ge1xuICAgIHdlYnNvY2tldDogV1MsXG4gICAgd2VidHJhbnNwb3J0OiBXVCxcbiAgICBwb2xsaW5nOiBYSFIsXG59O1xuIiwiLy8gaW1wb3J0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZ2Fsa24vcGFyc2V1cmlcbi8qKlxuICogUGFyc2VzIGEgVVJJXG4gKlxuICogTm90ZTogd2UgY291bGQgYWxzbyBoYXZlIHVzZWQgdGhlIGJ1aWx0LWluIFVSTCBvYmplY3QsIGJ1dCBpdCBpc24ndCBzdXBwb3J0ZWQgb24gYWxsIHBsYXRmb3Jtcy5cbiAqXG4gKiBTZWU6XG4gKiAtIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9VUkxcbiAqIC0gaHR0cHM6Ly9jYW5pdXNlLmNvbS91cmxcbiAqIC0gaHR0cHM6Ly93d3cucmZjLWVkaXRvci5vcmcvcmZjL3JmYzM5ODYjYXBwZW5kaXgtQlxuICpcbiAqIEhpc3Rvcnkgb2YgdGhlIHBhcnNlKCkgbWV0aG9kOlxuICogLSBmaXJzdCBjb21taXQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9zb2NrZXRpby9zb2NrZXQuaW8tY2xpZW50L2NvbW1pdC80ZWUxZDVkOTRiMzkwNmE5YzA1MmI0NTlmMWE4MThiMTVmMzhmOTFjXG4gKiAtIGV4cG9ydCBpbnRvIGl0cyBvd24gbW9kdWxlOiBodHRwczovL2dpdGh1Yi5jb20vc29ja2V0aW8vZW5naW5lLmlvLWNsaWVudC9jb21taXQvZGUyYzU2MWU0NTY0ZWZlYjc4ZjFiZGIxYmEzOWVmODFiMjgyMmNiM1xuICogLSByZWltcG9ydDogaHR0cHM6Ly9naXRodWIuY29tL3NvY2tldGlvL2VuZ2luZS5pby1jbGllbnQvY29tbWl0L2RmMzIyNzdjM2Y2ZDYyMmVlYzVlZDA5ZjQ5M2NhZTNmMzM5MWQyNDJcbiAqXG4gKiBAYXV0aG9yIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPiAoTUlUIGxpY2Vuc2UpXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuY29uc3QgcmUgPSAvXig/Oig/IVteOkBcXC8/I10rOlteOkBcXC9dKkApKGh0dHB8aHR0cHN8d3N8d3NzKTpcXC9cXC8pPygoPzooKFteOkBcXC8/I10qKSg/OjooW146QFxcLz8jXSopKT8pP0ApPygoPzpbYS1mMC05XXswLDR9Oil7Miw3fVthLWYwLTldezAsNH18W146XFwvPyNdKikoPzo6KFxcZCopKT8pKCgoXFwvKD86W14/I10oPyFbXj8jXFwvXSpcXC5bXj8jXFwvLl0rKD86Wz8jXXwkKSkpKlxcLz8pPyhbXj8jXFwvXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLztcbmNvbnN0IHBhcnRzID0gW1xuICAgICdzb3VyY2UnLCAncHJvdG9jb2wnLCAnYXV0aG9yaXR5JywgJ3VzZXJJbmZvJywgJ3VzZXInLCAncGFzc3dvcmQnLCAnaG9zdCcsICdwb3J0JywgJ3JlbGF0aXZlJywgJ3BhdGgnLCAnZGlyZWN0b3J5JywgJ2ZpbGUnLCAncXVlcnknLCAnYW5jaG9yJ1xuXTtcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZShzdHIpIHtcbiAgICBpZiAoc3RyLmxlbmd0aCA+IDgwMDApIHtcbiAgICAgICAgdGhyb3cgXCJVUkkgdG9vIGxvbmdcIjtcbiAgICB9XG4gICAgY29uc3Qgc3JjID0gc3RyLCBiID0gc3RyLmluZGV4T2YoJ1snKSwgZSA9IHN0ci5pbmRleE9mKCddJyk7XG4gICAgaWYgKGIgIT0gLTEgJiYgZSAhPSAtMSkge1xuICAgICAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDAsIGIpICsgc3RyLnN1YnN0cmluZyhiLCBlKS5yZXBsYWNlKC86L2csICc7JykgKyBzdHIuc3Vic3RyaW5nKGUsIHN0ci5sZW5ndGgpO1xuICAgIH1cbiAgICBsZXQgbSA9IHJlLmV4ZWMoc3RyIHx8ICcnKSwgdXJpID0ge30sIGkgPSAxNDtcbiAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgIHVyaVtwYXJ0c1tpXV0gPSBtW2ldIHx8ICcnO1xuICAgIH1cbiAgICBpZiAoYiAhPSAtMSAmJiBlICE9IC0xKSB7XG4gICAgICAgIHVyaS5zb3VyY2UgPSBzcmM7XG4gICAgICAgIHVyaS5ob3N0ID0gdXJpLmhvc3Quc3Vic3RyaW5nKDEsIHVyaS5ob3N0Lmxlbmd0aCAtIDEpLnJlcGxhY2UoLzsvZywgJzonKTtcbiAgICAgICAgdXJpLmF1dGhvcml0eSA9IHVyaS5hdXRob3JpdHkucmVwbGFjZSgnWycsICcnKS5yZXBsYWNlKCddJywgJycpLnJlcGxhY2UoLzsvZywgJzonKTtcbiAgICAgICAgdXJpLmlwdjZ1cmkgPSB0cnVlO1xuICAgIH1cbiAgICB1cmkucGF0aE5hbWVzID0gcGF0aE5hbWVzKHVyaSwgdXJpWydwYXRoJ10pO1xuICAgIHVyaS5xdWVyeUtleSA9IHF1ZXJ5S2V5KHVyaSwgdXJpWydxdWVyeSddKTtcbiAgICByZXR1cm4gdXJpO1xufVxuZnVuY3Rpb24gcGF0aE5hbWVzKG9iaiwgcGF0aCkge1xuICAgIGNvbnN0IHJlZ3ggPSAvXFwvezIsOX0vZywgbmFtZXMgPSBwYXRoLnJlcGxhY2UocmVneCwgXCIvXCIpLnNwbGl0KFwiL1wiKTtcbiAgICBpZiAocGF0aC5zbGljZSgwLCAxKSA9PSAnLycgfHwgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgbmFtZXMuc3BsaWNlKDAsIDEpO1xuICAgIH1cbiAgICBpZiAocGF0aC5zbGljZSgtMSkgPT0gJy8nKSB7XG4gICAgICAgIG5hbWVzLnNwbGljZShuYW1lcy5sZW5ndGggLSAxLCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIG5hbWVzO1xufVxuZnVuY3Rpb24gcXVlcnlLZXkodXJpLCBxdWVyeSkge1xuICAgIGNvbnN0IGRhdGEgPSB7fTtcbiAgICBxdWVyeS5yZXBsYWNlKC8oPzpefCYpKFteJj1dKik9PyhbXiZdKikvZywgZnVuY3Rpb24gKCQwLCAkMSwgJDIpIHtcbiAgICAgICAgaWYgKCQxKSB7XG4gICAgICAgICAgICBkYXRhWyQxXSA9ICQyO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG59XG4iLCJpbXBvcnQgeyB0cmFuc3BvcnRzIGFzIERFRkFVTFRfVFJBTlNQT1JUUyB9IGZyb20gXCIuL3RyYW5zcG9ydHMvaW5kZXguanNcIjtcbmltcG9ydCB7IGluc3RhbGxUaW1lckZ1bmN0aW9ucywgYnl0ZUxlbmd0aCB9IGZyb20gXCIuL3V0aWwuanNcIjtcbmltcG9ydCB7IGRlY29kZSB9IGZyb20gXCIuL2NvbnRyaWIvcGFyc2Vxcy5qc1wiO1xuaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwiLi9jb250cmliL3BhcnNldXJpLmpzXCI7XG5pbXBvcnQgeyBFbWl0dGVyIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbmltcG9ydCB7IHByb3RvY29sIH0gZnJvbSBcImVuZ2luZS5pby1wYXJzZXJcIjtcbmltcG9ydCB7IGNyZWF0ZUNvb2tpZUphciwgZGVmYXVsdEJpbmFyeVR5cGUsIG5leHRUaWNrLCB9IGZyb20gXCIuL2dsb2JhbHMubm9kZS5qc1wiO1xuY29uc3Qgd2l0aEV2ZW50TGlzdGVuZXJzID0gdHlwZW9mIGFkZEV2ZW50TGlzdGVuZXIgPT09IFwiZnVuY3Rpb25cIiAmJlxuICAgIHR5cGVvZiByZW1vdmVFdmVudExpc3RlbmVyID09PSBcImZ1bmN0aW9uXCI7XG5jb25zdCBPRkZMSU5FX0VWRU5UX0xJU1RFTkVSUyA9IFtdO1xuaWYgKHdpdGhFdmVudExpc3RlbmVycykge1xuICAgIC8vIHdpdGhpbiBhIFNlcnZpY2VXb3JrZXIsIGFueSBldmVudCBoYW5kbGVyIGZvciB0aGUgJ29mZmxpbmUnIGV2ZW50IG11c3QgYmUgYWRkZWQgb24gdGhlIGluaXRpYWwgZXZhbHVhdGlvbiBvZiB0aGVcbiAgICAvLyBzY3JpcHQsIHNvIHdlIGNyZWF0ZSBvbmUgc2luZ2xlIGV2ZW50IGxpc3RlbmVyIGhlcmUgd2hpY2ggd2lsbCBmb3J3YXJkIHRoZSBldmVudCB0byB0aGUgc29ja2V0IGluc3RhbmNlc1xuICAgIGFkZEV2ZW50TGlzdGVuZXIoXCJvZmZsaW5lXCIsICgpID0+IHtcbiAgICAgICAgT0ZGTElORV9FVkVOVF9MSVNURU5FUlMuZm9yRWFjaCgobGlzdGVuZXIpID0+IGxpc3RlbmVyKCkpO1xuICAgIH0sIGZhbHNlKTtcbn1cbi8qKlxuICogVGhpcyBjbGFzcyBwcm92aWRlcyBhIFdlYlNvY2tldC1saWtlIGludGVyZmFjZSB0byBjb25uZWN0IHRvIGFuIEVuZ2luZS5JTyBzZXJ2ZXIuIFRoZSBjb25uZWN0aW9uIHdpbGwgYmUgZXN0YWJsaXNoZWRcbiAqIHdpdGggb25lIG9mIHRoZSBhdmFpbGFibGUgbG93LWxldmVsIHRyYW5zcG9ydHMsIGxpa2UgSFRUUCBsb25nLXBvbGxpbmcsIFdlYlNvY2tldCwgb3IgV2ViVHJhbnNwb3J0LlxuICpcbiAqIFRoaXMgY2xhc3MgY29tZXMgd2l0aCBhbiB1cGdyYWRlIG1lY2hhbmlzbSwgd2hpY2ggbWVhbnMgdGhhdCBvbmNlIHRoZSBjb25uZWN0aW9uIGlzIGVzdGFibGlzaGVkIHdpdGggdGhlIGZpcnN0XG4gKiBsb3ctbGV2ZWwgdHJhbnNwb3J0LCBpdCB3aWxsIHRyeSB0byB1cGdyYWRlIHRvIGEgYmV0dGVyIHRyYW5zcG9ydC5cbiAqXG4gKiBAZXhhbXBsZVxuICogaW1wb3J0IHsgU29ja2V0IH0gZnJvbSBcImVuZ2luZS5pby1jbGllbnRcIjtcbiAqXG4gKiBjb25zdCBzb2NrZXQgPSBuZXcgU29ja2V0KCk7XG4gKlxuICogc29ja2V0Lm9uKFwib3BlblwiLCAoKSA9PiB7XG4gKiAgIHNvY2tldC5zZW5kKFwiaGVsbG9cIik7XG4gKiB9KTtcbiAqXG4gKi9cbmV4cG9ydCBjbGFzcyBTb2NrZXQgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmksIG9wdHMgPSB7fSkge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmJpbmFyeVR5cGUgPSBkZWZhdWx0QmluYXJ5VHlwZTtcbiAgICAgICAgdGhpcy53cml0ZUJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLl9wcmV2QnVmZmVyTGVuID0gMDtcbiAgICAgICAgdGhpcy5fdXBncmFkZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fcGluZ0ludGVydmFsID0gLTE7XG4gICAgICAgIHRoaXMuX3BpbmdUaW1lb3V0ID0gLTE7XG4gICAgICAgIHRoaXMuX21heFBheWxvYWQgPSAtMTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBleHBpcmF0aW9uIHRpbWVzdGFtcCBvZiB0aGUge0BsaW5rIF9waW5nVGltZW91dFRpbWVyfSBvYmplY3QgaXMgdHJhY2tlZCwgaW4gY2FzZSB0aGUgdGltZXIgaXMgdGhyb3R0bGVkIGFuZCB0aGVcbiAgICAgICAgICogY2FsbGJhY2sgaXMgbm90IGZpcmVkIG9uIHRpbWUuIFRoaXMgY2FuIGhhcHBlbiBmb3IgZXhhbXBsZSB3aGVuIGEgbGFwdG9wIGlzIHN1c3BlbmRlZCBvciB3aGVuIGEgcGhvbmUgaXMgbG9ja2VkLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fcGluZ1RpbWVvdXRUaW1lID0gSW5maW5pdHk7XG4gICAgICAgIGlmICh1cmkgJiYgXCJvYmplY3RcIiA9PT0gdHlwZW9mIHVyaSkge1xuICAgICAgICAgICAgb3B0cyA9IHVyaTtcbiAgICAgICAgICAgIHVyaSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHVyaSkge1xuICAgICAgICAgICAgY29uc3QgcGFyc2VkVXJpID0gcGFyc2UodXJpKTtcbiAgICAgICAgICAgIG9wdHMuaG9zdG5hbWUgPSBwYXJzZWRVcmkuaG9zdDtcbiAgICAgICAgICAgIG9wdHMuc2VjdXJlID1cbiAgICAgICAgICAgICAgICBwYXJzZWRVcmkucHJvdG9jb2wgPT09IFwiaHR0cHNcIiB8fCBwYXJzZWRVcmkucHJvdG9jb2wgPT09IFwid3NzXCI7XG4gICAgICAgICAgICBvcHRzLnBvcnQgPSBwYXJzZWRVcmkucG9ydDtcbiAgICAgICAgICAgIGlmIChwYXJzZWRVcmkucXVlcnkpXG4gICAgICAgICAgICAgICAgb3B0cy5xdWVyeSA9IHBhcnNlZFVyaS5xdWVyeTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvcHRzLmhvc3QpIHtcbiAgICAgICAgICAgIG9wdHMuaG9zdG5hbWUgPSBwYXJzZShvcHRzLmhvc3QpLmhvc3Q7XG4gICAgICAgIH1cbiAgICAgICAgaW5zdGFsbFRpbWVyRnVuY3Rpb25zKHRoaXMsIG9wdHMpO1xuICAgICAgICB0aGlzLnNlY3VyZSA9XG4gICAgICAgICAgICBudWxsICE9IG9wdHMuc2VjdXJlXG4gICAgICAgICAgICAgICAgPyBvcHRzLnNlY3VyZVxuICAgICAgICAgICAgICAgIDogdHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiICYmIFwiaHR0cHM6XCIgPT09IGxvY2F0aW9uLnByb3RvY29sO1xuICAgICAgICBpZiAob3B0cy5ob3N0bmFtZSAmJiAhb3B0cy5wb3J0KSB7XG4gICAgICAgICAgICAvLyBpZiBubyBwb3J0IGlzIHNwZWNpZmllZCBtYW51YWxseSwgdXNlIHRoZSBwcm90b2NvbCBkZWZhdWx0XG4gICAgICAgICAgICBvcHRzLnBvcnQgPSB0aGlzLnNlY3VyZSA/IFwiNDQzXCIgOiBcIjgwXCI7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ob3N0bmFtZSA9XG4gICAgICAgICAgICBvcHRzLmhvc3RuYW1lIHx8XG4gICAgICAgICAgICAgICAgKHR5cGVvZiBsb2NhdGlvbiAhPT0gXCJ1bmRlZmluZWRcIiA/IGxvY2F0aW9uLmhvc3RuYW1lIDogXCJsb2NhbGhvc3RcIik7XG4gICAgICAgIHRoaXMucG9ydCA9XG4gICAgICAgICAgICBvcHRzLnBvcnQgfHxcbiAgICAgICAgICAgICAgICAodHlwZW9mIGxvY2F0aW9uICE9PSBcInVuZGVmaW5lZFwiICYmIGxvY2F0aW9uLnBvcnRcbiAgICAgICAgICAgICAgICAgICAgPyBsb2NhdGlvbi5wb3J0XG4gICAgICAgICAgICAgICAgICAgIDogdGhpcy5zZWN1cmVcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCI0NDNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOiBcIjgwXCIpO1xuICAgICAgICBpZiAob3B0cy50cmFuc3BvcnRJbXBsZW1lbnRhdGlvbnMgJiYgb3B0cy50cmFuc3BvcnRzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJzcGVjaWZ5aW5nIGJvdGggJ3RyYW5zcG9ydEltcGxlbWVudGF0aW9ucycgYW5kICd0cmFuc3BvcnRzJyBvcHRpb25zIGlzIG5vdCBzdXBwb3J0ZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdHMudHJhbnNwb3J0SW1wbGVtZW50YXRpb25zIHx8XG4gICAgICAgICAgICAoKChfYSA9IG9wdHMudHJhbnNwb3J0cykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmxlbmd0aCkgJiYgdHlwZW9mIG9wdHMudHJhbnNwb3J0c1swXSA9PT0gXCJmdW5jdGlvblwiKSkge1xuICAgICAgICAgICAgLy8gJ3RyYW5zcG9ydHMnIG9wdGlvbiBhcyBhbiBhcnJheSBvZiB0cmFuc3BvcnQgaW1wbGVtZW50YXRpb25zIGlzIGtlcHQgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0cyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fdHJhbnNwb3J0c0J5TmFtZSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgICAgICAoKF9iID0gb3B0cy50cmFuc3BvcnRJbXBsZW1lbnRhdGlvbnMpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IG9wdHMudHJhbnNwb3J0cykuZm9yRWFjaCgodCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHRyYW5zcG9ydE5hbWUgPSB0LnByb3RvdHlwZS5uYW1lO1xuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0cy5wdXNoKHRyYW5zcG9ydE5hbWUpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3RyYW5zcG9ydHNCeU5hbWVbdHJhbnNwb3J0TmFtZV0gPSB0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydHMgPSBvcHRzLnRyYW5zcG9ydHNcbiAgICAgICAgICAgICAgICA/IFsuLi5vcHRzLnRyYW5zcG9ydHNdXG4gICAgICAgICAgICAgICAgOiBbXCJwb2xsaW5nXCIsIFwid2Vic29ja2V0XCIsIFwid2VidHJhbnNwb3J0XCJdO1xuICAgICAgICAgICAgdGhpcy5fdHJhbnNwb3J0c0J5TmFtZSA9IERFRkFVTFRfVFJBTlNQT1JUUztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm9wdHMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIHBhdGg6IFwiL2VuZ2luZS5pb1wiLFxuICAgICAgICAgICAgYWdlbnQ6IGZhbHNlLFxuICAgICAgICAgICAgd2l0aENyZWRlbnRpYWxzOiBmYWxzZSxcbiAgICAgICAgICAgIHVwZ3JhZGU6IHRydWUsXG4gICAgICAgICAgICB0aW1lc3RhbXBQYXJhbTogXCJ0XCIsXG4gICAgICAgICAgICByZW1lbWJlclVwZ3JhZGU6IGZhbHNlLFxuICAgICAgICAgICAgYWRkVHJhaWxpbmdTbGFzaDogdHJ1ZSxcbiAgICAgICAgICAgIHJlamVjdFVuYXV0aG9yaXplZDogdHJ1ZSxcbiAgICAgICAgICAgIHBlck1lc3NhZ2VEZWZsYXRlOiB7XG4gICAgICAgICAgICAgICAgdGhyZXNob2xkOiAxMDI0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYW5zcG9ydE9wdGlvbnM6IHt9LFxuICAgICAgICAgICAgY2xvc2VPbkJlZm9yZXVubG9hZDogZmFsc2UsXG4gICAgICAgIH0sIG9wdHMpO1xuICAgICAgICB0aGlzLm9wdHMucGF0aCA9XG4gICAgICAgICAgICB0aGlzLm9wdHMucGF0aC5yZXBsYWNlKC9cXC8kLywgXCJcIikgK1xuICAgICAgICAgICAgICAgICh0aGlzLm9wdHMuYWRkVHJhaWxpbmdTbGFzaCA/IFwiL1wiIDogXCJcIik7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5vcHRzLnF1ZXJ5ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLm9wdHMucXVlcnkgPSBkZWNvZGUodGhpcy5vcHRzLnF1ZXJ5KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAod2l0aEV2ZW50TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmNsb3NlT25CZWZvcmV1bmxvYWQpIHtcbiAgICAgICAgICAgICAgICAvLyBGaXJlZm94IGNsb3NlcyB0aGUgY29ubmVjdGlvbiB3aGVuIHRoZSBcImJlZm9yZXVubG9hZFwiIGV2ZW50IGlzIGVtaXR0ZWQgYnV0IG5vdCBDaHJvbWUuIFRoaXMgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgICAgICAgICAvLyBlbnN1cmVzIGV2ZXJ5IGJyb3dzZXIgYmVoYXZlcyB0aGUgc2FtZSAobm8gXCJkaXNjb25uZWN0XCIgZXZlbnQgYXQgdGhlIFNvY2tldC5JTyBsZXZlbCB3aGVuIHRoZSBwYWdlIGlzXG4gICAgICAgICAgICAgICAgLy8gY2xvc2VkL3JlbG9hZGVkKVxuICAgICAgICAgICAgICAgIHRoaXMuX2JlZm9yZXVubG9hZEV2ZW50TGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnRyYW5zcG9ydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2lsZW50bHkgY2xvc2UgdGhlIHRyYW5zcG9ydFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBhZGRFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIHRoaXMuX2JlZm9yZXVubG9hZEV2ZW50TGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmhvc3RuYW1lICE9PSBcImxvY2FsaG9zdFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb2ZmbGluZUV2ZW50TGlzdGVuZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29uQ2xvc2UoXCJ0cmFuc3BvcnQgY2xvc2VcIiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwibmV0d29yayBjb25uZWN0aW9uIGxvc3RcIixcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBPRkZMSU5FX0VWRU5UX0xJU1RFTkVSUy5wdXNoKHRoaXMuX29mZmxpbmVFdmVudExpc3RlbmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5vcHRzLndpdGhDcmVkZW50aWFscykge1xuICAgICAgICAgICAgdGhpcy5fY29va2llSmFyID0gY3JlYXRlQ29va2llSmFyKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fb3BlbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIHRyYW5zcG9ydCBvZiB0aGUgZ2l2ZW4gdHlwZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIC0gdHJhbnNwb3J0IG5hbWVcbiAgICAgKiBAcmV0dXJuIHtUcmFuc3BvcnR9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBjcmVhdGVUcmFuc3BvcnQobmFtZSkge1xuICAgICAgICBjb25zdCBxdWVyeSA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0cy5xdWVyeSk7XG4gICAgICAgIC8vIGFwcGVuZCBlbmdpbmUuaW8gcHJvdG9jb2wgaWRlbnRpZmllclxuICAgICAgICBxdWVyeS5FSU8gPSBwcm90b2NvbDtcbiAgICAgICAgLy8gdHJhbnNwb3J0IG5hbWVcbiAgICAgICAgcXVlcnkudHJhbnNwb3J0ID0gbmFtZTtcbiAgICAgICAgLy8gc2Vzc2lvbiBpZCBpZiB3ZSBhbHJlYWR5IGhhdmUgb25lXG4gICAgICAgIGlmICh0aGlzLmlkKVxuICAgICAgICAgICAgcXVlcnkuc2lkID0gdGhpcy5pZDtcbiAgICAgICAgY29uc3Qgb3B0cyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMub3B0cywge1xuICAgICAgICAgICAgcXVlcnksXG4gICAgICAgICAgICBzb2NrZXQ6IHRoaXMsXG4gICAgICAgICAgICBob3N0bmFtZTogdGhpcy5ob3N0bmFtZSxcbiAgICAgICAgICAgIHNlY3VyZTogdGhpcy5zZWN1cmUsXG4gICAgICAgICAgICBwb3J0OiB0aGlzLnBvcnQsXG4gICAgICAgIH0sIHRoaXMub3B0cy50cmFuc3BvcnRPcHRpb25zW25hbWVdKTtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzLl90cmFuc3BvcnRzQnlOYW1lW25hbWVdKG9wdHMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbml0aWFsaXplcyB0cmFuc3BvcnQgdG8gdXNlIGFuZCBzdGFydHMgcHJvYmUuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9vcGVuKCkge1xuICAgICAgICBpZiAodGhpcy50cmFuc3BvcnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgLy8gRW1pdCBlcnJvciBvbiBuZXh0IHRpY2sgc28gaXQgY2FuIGJlIGxpc3RlbmVkIHRvXG4gICAgICAgICAgICB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBcIk5vIHRyYW5zcG9ydHMgYXZhaWxhYmxlXCIpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdHJhbnNwb3J0TmFtZSA9IHRoaXMub3B0cy5yZW1lbWJlclVwZ3JhZGUgJiZcbiAgICAgICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgJiZcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0cy5pbmRleE9mKFwid2Vic29ja2V0XCIpICE9PSAtMVxuICAgICAgICAgICAgPyBcIndlYnNvY2tldFwiXG4gICAgICAgICAgICA6IHRoaXMudHJhbnNwb3J0c1swXTtcbiAgICAgICAgdGhpcy5yZWFkeVN0YXRlID0gXCJvcGVuaW5nXCI7XG4gICAgICAgIGNvbnN0IHRyYW5zcG9ydCA9IHRoaXMuY3JlYXRlVHJhbnNwb3J0KHRyYW5zcG9ydE5hbWUpO1xuICAgICAgICB0cmFuc3BvcnQub3BlbigpO1xuICAgICAgICB0aGlzLnNldFRyYW5zcG9ydCh0cmFuc3BvcnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydC4gRGlzYWJsZXMgdGhlIGV4aXN0aW5nIG9uZSAoaWYgYW55KS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc2V0VHJhbnNwb3J0KHRyYW5zcG9ydCkge1xuICAgICAgICBpZiAodGhpcy50cmFuc3BvcnQpIHtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNldCB1cCB0cmFuc3BvcnRcbiAgICAgICAgdGhpcy50cmFuc3BvcnQgPSB0cmFuc3BvcnQ7XG4gICAgICAgIC8vIHNldCB1cCB0cmFuc3BvcnQgbGlzdGVuZXJzXG4gICAgICAgIHRyYW5zcG9ydFxuICAgICAgICAgICAgLm9uKFwiZHJhaW5cIiwgdGhpcy5fb25EcmFpbi5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm9uKFwicGFja2V0XCIsIHRoaXMuX29uUGFja2V0LmJpbmQodGhpcykpXG4gICAgICAgICAgICAub24oXCJlcnJvclwiLCB0aGlzLl9vbkVycm9yLmJpbmQodGhpcykpXG4gICAgICAgICAgICAub24oXCJjbG9zZVwiLCAocmVhc29uKSA9PiB0aGlzLl9vbkNsb3NlKFwidHJhbnNwb3J0IGNsb3NlXCIsIHJlYXNvbikpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcm9iZXMgYSB0cmFuc3BvcnQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSAtIHRyYW5zcG9ydCBuYW1lXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcHJvYmUobmFtZSkge1xuICAgICAgICBsZXQgdHJhbnNwb3J0ID0gdGhpcy5jcmVhdGVUcmFuc3BvcnQobmFtZSk7XG4gICAgICAgIGxldCBmYWlsZWQgPSBmYWxzZTtcbiAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBvblRyYW5zcG9ydE9wZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5zZW5kKFt7IHR5cGU6IFwicGluZ1wiLCBkYXRhOiBcInByb2JlXCIgfV0pO1xuICAgICAgICAgICAgdHJhbnNwb3J0Lm9uY2UoXCJwYWNrZXRcIiwgKG1zZykgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmYWlsZWQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAoXCJwb25nXCIgPT09IG1zZy50eXBlICYmIFwicHJvYmVcIiA9PT0gbXNnLmRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGdyYWRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInVwZ3JhZGluZ1wiLCB0cmFuc3BvcnQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRyYW5zcG9ydClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgU29ja2V0LnByaW9yV2Vic29ja2V0U3VjY2VzcyA9IFwid2Vic29ja2V0XCIgPT09IHRyYW5zcG9ydC5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5wYXVzZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcImNsb3NlZFwiID09PSB0aGlzLnJlYWR5U3RhdGUpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYW51cCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUcmFuc3BvcnQodHJhbnNwb3J0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zcG9ydC5zZW5kKFt7IHR5cGU6IFwidXBncmFkZVwiIH1dKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwidXBncmFkZVwiLCB0cmFuc3BvcnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBncmFkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZsdXNoKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKFwicHJvYmUgZXJyb3JcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgZXJyLnRyYW5zcG9ydCA9IHRyYW5zcG9ydC5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInVwZ3JhZGVFcnJvclwiLCBlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBmcmVlemVUcmFuc3BvcnQoKSB7XG4gICAgICAgICAgICBpZiAoZmFpbGVkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIC8vIEFueSBjYWxsYmFjayBjYWxsZWQgYnkgdHJhbnNwb3J0IHNob3VsZCBiZSBpZ25vcmVkIHNpbmNlIG5vd1xuICAgICAgICAgICAgZmFpbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGNsZWFudXAoKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5jbG9zZSgpO1xuICAgICAgICAgICAgdHJhbnNwb3J0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICAvLyBIYW5kbGUgYW55IGVycm9yIHRoYXQgaGFwcGVucyB3aGlsZSBwcm9iaW5nXG4gICAgICAgIGNvbnN0IG9uZXJyb3IgPSAoZXJyKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcihcInByb2JlIGVycm9yOiBcIiArIGVycik7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICBlcnJvci50cmFuc3BvcnQgPSB0cmFuc3BvcnQubmFtZTtcbiAgICAgICAgICAgIGZyZWV6ZVRyYW5zcG9ydCgpO1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJ1cGdyYWRlRXJyb3JcIiwgZXJyb3IpO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBvblRyYW5zcG9ydENsb3NlKCkge1xuICAgICAgICAgICAgb25lcnJvcihcInRyYW5zcG9ydCBjbG9zZWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gV2hlbiB0aGUgc29ja2V0IGlzIGNsb3NlZCB3aGlsZSB3ZSdyZSBwcm9iaW5nXG4gICAgICAgIGZ1bmN0aW9uIG9uY2xvc2UoKSB7XG4gICAgICAgICAgICBvbmVycm9yKFwic29ja2V0IGNsb3NlZFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBXaGVuIHRoZSBzb2NrZXQgaXMgdXBncmFkZWQgd2hpbGUgd2UncmUgcHJvYmluZ1xuICAgICAgICBmdW5jdGlvbiBvbnVwZ3JhZGUodG8pIHtcbiAgICAgICAgICAgIGlmICh0cmFuc3BvcnQgJiYgdG8ubmFtZSAhPT0gdHJhbnNwb3J0Lm5hbWUpIHtcbiAgICAgICAgICAgICAgICBmcmVlemVUcmFuc3BvcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBSZW1vdmUgYWxsIGxpc3RlbmVycyBvbiB0aGUgdHJhbnNwb3J0IGFuZCBvbiBzZWxmXG4gICAgICAgIGNvbnN0IGNsZWFudXAgPSAoKSA9PiB7XG4gICAgICAgICAgICB0cmFuc3BvcnQucmVtb3ZlTGlzdGVuZXIoXCJvcGVuXCIsIG9uVHJhbnNwb3J0T3Blbik7XG4gICAgICAgICAgICB0cmFuc3BvcnQucmVtb3ZlTGlzdGVuZXIoXCJlcnJvclwiLCBvbmVycm9yKTtcbiAgICAgICAgICAgIHRyYW5zcG9ydC5yZW1vdmVMaXN0ZW5lcihcImNsb3NlXCIsIG9uVHJhbnNwb3J0Q2xvc2UpO1xuICAgICAgICAgICAgdGhpcy5vZmYoXCJjbG9zZVwiLCBvbmNsb3NlKTtcbiAgICAgICAgICAgIHRoaXMub2ZmKFwidXBncmFkaW5nXCIsIG9udXBncmFkZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRyYW5zcG9ydC5vbmNlKFwib3BlblwiLCBvblRyYW5zcG9ydE9wZW4pO1xuICAgICAgICB0cmFuc3BvcnQub25jZShcImVycm9yXCIsIG9uZXJyb3IpO1xuICAgICAgICB0cmFuc3BvcnQub25jZShcImNsb3NlXCIsIG9uVHJhbnNwb3J0Q2xvc2UpO1xuICAgICAgICB0aGlzLm9uY2UoXCJjbG9zZVwiLCBvbmNsb3NlKTtcbiAgICAgICAgdGhpcy5vbmNlKFwidXBncmFkaW5nXCIsIG9udXBncmFkZSk7XG4gICAgICAgIGlmICh0aGlzLl91cGdyYWRlcy5pbmRleE9mKFwid2VidHJhbnNwb3J0XCIpICE9PSAtMSAmJlxuICAgICAgICAgICAgbmFtZSAhPT0gXCJ3ZWJ0cmFuc3BvcnRcIikge1xuICAgICAgICAgICAgLy8gZmF2b3IgV2ViVHJhbnNwb3J0XG4gICAgICAgICAgICB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFmYWlsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNwb3J0Lm9wZW4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJhbnNwb3J0Lm9wZW4oKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2hlbiBjb25uZWN0aW9uIGlzIGRlZW1lZCBvcGVuLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbk9wZW4oKSB7XG4gICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwib3BlblwiO1xuICAgICAgICBTb2NrZXQucHJpb3JXZWJzb2NrZXRTdWNjZXNzID0gXCJ3ZWJzb2NrZXRcIiA9PT0gdGhpcy50cmFuc3BvcnQubmFtZTtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJvcGVuXCIpO1xuICAgICAgICB0aGlzLmZsdXNoKCk7XG4gICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5yZWFkeVN0YXRlICYmIHRoaXMub3B0cy51cGdyYWRlKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3VwZ3JhZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJvYmUodGhpcy5fdXBncmFkZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgYSBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9vblBhY2tldChwYWNrZXQpIHtcbiAgICAgICAgaWYgKFwib3BlbmluZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgfHxcbiAgICAgICAgICAgIFwib3BlblwiID09PSB0aGlzLnJlYWR5U3RhdGUgfHxcbiAgICAgICAgICAgIFwiY2xvc2luZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicGFja2V0XCIsIHBhY2tldCk7XG4gICAgICAgICAgICAvLyBTb2NrZXQgaXMgbGl2ZSAtIGFueSBwYWNrZXQgY291bnRzXG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImhlYXJ0YmVhdFwiKTtcbiAgICAgICAgICAgIHN3aXRjaCAocGFja2V0LnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFwib3BlblwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uSGFuZHNoYWtlKEpTT04ucGFyc2UocGFja2V0LmRhdGEpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcInBpbmdcIjpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VuZFBhY2tldChcInBvbmdcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicGluZ1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJwb25nXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9yZXNldFBpbmdUaW1lb3V0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJlcnJvclwiOlxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoXCJzZXJ2ZXIgZXJyb3JcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgZXJyLmNvZGUgPSBwYWNrZXQuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb25FcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIFwibWVzc2FnZVwiOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImRhdGFcIiwgcGFja2V0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcIm1lc3NhZ2VcIiwgcGFja2V0LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBoYW5kc2hha2UgY29tcGxldGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIC0gaGFuZHNoYWtlIG9ialxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25IYW5kc2hha2UoZGF0YSkge1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImhhbmRzaGFrZVwiLCBkYXRhKTtcbiAgICAgICAgdGhpcy5pZCA9IGRhdGEuc2lkO1xuICAgICAgICB0aGlzLnRyYW5zcG9ydC5xdWVyeS5zaWQgPSBkYXRhLnNpZDtcbiAgICAgICAgdGhpcy5fdXBncmFkZXMgPSB0aGlzLl9maWx0ZXJVcGdyYWRlcyhkYXRhLnVwZ3JhZGVzKTtcbiAgICAgICAgdGhpcy5fcGluZ0ludGVydmFsID0gZGF0YS5waW5nSW50ZXJ2YWw7XG4gICAgICAgIHRoaXMuX3BpbmdUaW1lb3V0ID0gZGF0YS5waW5nVGltZW91dDtcbiAgICAgICAgdGhpcy5fbWF4UGF5bG9hZCA9IGRhdGEubWF4UGF5bG9hZDtcbiAgICAgICAgdGhpcy5vbk9wZW4oKTtcbiAgICAgICAgLy8gSW4gY2FzZSBvcGVuIGhhbmRsZXIgY2xvc2VzIHNvY2tldFxuICAgICAgICBpZiAoXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLl9yZXNldFBpbmdUaW1lb3V0KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgYW5kIHJlc2V0cyBwaW5nIHRpbWVvdXQgdGltZXIgYmFzZWQgb24gc2VydmVyIHBpbmdzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcmVzZXRQaW5nVGltZW91dCgpIHtcbiAgICAgICAgdGhpcy5jbGVhclRpbWVvdXRGbih0aGlzLl9waW5nVGltZW91dFRpbWVyKTtcbiAgICAgICAgY29uc3QgZGVsYXkgPSB0aGlzLl9waW5nSW50ZXJ2YWwgKyB0aGlzLl9waW5nVGltZW91dDtcbiAgICAgICAgdGhpcy5fcGluZ1RpbWVvdXRUaW1lID0gRGF0ZS5ub3coKSArIGRlbGF5O1xuICAgICAgICB0aGlzLl9waW5nVGltZW91dFRpbWVyID0gdGhpcy5zZXRUaW1lb3V0Rm4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fb25DbG9zZShcInBpbmcgdGltZW91dFwiKTtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICBpZiAodGhpcy5vcHRzLmF1dG9VbnJlZikge1xuICAgICAgICAgICAgdGhpcy5fcGluZ1RpbWVvdXRUaW1lci51bnJlZigpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCBvbiBgZHJhaW5gIGV2ZW50XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9vbkRyYWluKCkge1xuICAgICAgICB0aGlzLndyaXRlQnVmZmVyLnNwbGljZSgwLCB0aGlzLl9wcmV2QnVmZmVyTGVuKTtcbiAgICAgICAgLy8gc2V0dGluZyBwcmV2QnVmZmVyTGVuID0gMCBpcyB2ZXJ5IGltcG9ydGFudFxuICAgICAgICAvLyBmb3IgZXhhbXBsZSwgd2hlbiB1cGdyYWRpbmcsIHVwZ3JhZGUgcGFja2V0IGlzIHNlbnQgb3ZlcixcbiAgICAgICAgLy8gYW5kIGEgbm9uemVybyBwcmV2QnVmZmVyTGVuIGNvdWxkIGNhdXNlIHByb2JsZW1zIG9uIGBkcmFpbmBcbiAgICAgICAgdGhpcy5fcHJldkJ1ZmZlckxlbiA9IDA7XG4gICAgICAgIGlmICgwID09PSB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkcmFpblwiKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZmx1c2goKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBGbHVzaCB3cml0ZSBidWZmZXJzLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBmbHVzaCgpIHtcbiAgICAgICAgaWYgKFwiY2xvc2VkXCIgIT09IHRoaXMucmVhZHlTdGF0ZSAmJlxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQud3JpdGFibGUgJiZcbiAgICAgICAgICAgICF0aGlzLnVwZ3JhZGluZyAmJlxuICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhY2tldHMgPSB0aGlzLl9nZXRXcml0YWJsZVBhY2tldHMoKTtcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0LnNlbmQocGFja2V0cyk7XG4gICAgICAgICAgICAvLyBrZWVwIHRyYWNrIG9mIGN1cnJlbnQgbGVuZ3RoIG9mIHdyaXRlQnVmZmVyXG4gICAgICAgICAgICAvLyBzcGxpY2Ugd3JpdGVCdWZmZXIgYW5kIGNhbGxiYWNrQnVmZmVyIG9uIGBkcmFpbmBcbiAgICAgICAgICAgIHRoaXMuX3ByZXZCdWZmZXJMZW4gPSBwYWNrZXRzLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZmx1c2hcIik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5zdXJlIHRoZSBlbmNvZGVkIHNpemUgb2YgdGhlIHdyaXRlQnVmZmVyIGlzIGJlbG93IHRoZSBtYXhQYXlsb2FkIHZhbHVlIHNlbnQgYnkgdGhlIHNlcnZlciAob25seSBmb3IgSFRUUFxuICAgICAqIGxvbmctcG9sbGluZylcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2dldFdyaXRhYmxlUGFja2V0cygpIHtcbiAgICAgICAgY29uc3Qgc2hvdWxkQ2hlY2tQYXlsb2FkU2l6ZSA9IHRoaXMuX21heFBheWxvYWQgJiZcbiAgICAgICAgICAgIHRoaXMudHJhbnNwb3J0Lm5hbWUgPT09IFwicG9sbGluZ1wiICYmXG4gICAgICAgICAgICB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aCA+IDE7XG4gICAgICAgIGlmICghc2hvdWxkQ2hlY2tQYXlsb2FkU2l6ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud3JpdGVCdWZmZXI7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHBheWxvYWRTaXplID0gMTsgLy8gZmlyc3QgcGFja2V0IHR5cGVcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLndyaXRlQnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gdGhpcy53cml0ZUJ1ZmZlcltpXS5kYXRhO1xuICAgICAgICAgICAgaWYgKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBwYXlsb2FkU2l6ZSArPSBieXRlTGVuZ3RoKGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkgPiAwICYmIHBheWxvYWRTaXplID4gdGhpcy5fbWF4UGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLndyaXRlQnVmZmVyLnNsaWNlKDAsIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF5bG9hZFNpemUgKz0gMjsgLy8gc2VwYXJhdG9yICsgcGFja2V0IHR5cGVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy53cml0ZUJ1ZmZlcjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2tzIHdoZXRoZXIgdGhlIGhlYXJ0YmVhdCB0aW1lciBoYXMgZXhwaXJlZCBidXQgdGhlIHNvY2tldCBoYXMgbm90IHlldCBiZWVuIG5vdGlmaWVkLlxuICAgICAqXG4gICAgICogTm90ZTogdGhpcyBtZXRob2QgaXMgcHJpdmF0ZSBmb3Igbm93IGJlY2F1c2UgaXQgZG9lcyBub3QgcmVhbGx5IGZpdCB0aGUgV2ViU29ja2V0IEFQSSwgYnV0IGlmIHdlIHB1dCBpdCBpbiB0aGVcbiAgICAgKiBgd3JpdGUoKWAgbWV0aG9kIHRoZW4gdGhlIG1lc3NhZ2Ugd291bGQgbm90IGJlIGJ1ZmZlcmVkIGJ5IHRoZSBTb2NrZXQuSU8gY2xpZW50LlxuICAgICAqXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIC8qIHByaXZhdGUgKi8gX2hhc1BpbmdFeHBpcmVkKCkge1xuICAgICAgICBpZiAoIXRoaXMuX3BpbmdUaW1lb3V0VGltZSlcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBjb25zdCBoYXNFeHBpcmVkID0gRGF0ZS5ub3coKSA+IHRoaXMuX3BpbmdUaW1lb3V0VGltZTtcbiAgICAgICAgaWYgKGhhc0V4cGlyZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX3BpbmdUaW1lb3V0VGltZSA9IDA7XG4gICAgICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25DbG9zZShcInBpbmcgdGltZW91dFwiKTtcbiAgICAgICAgICAgIH0sIHRoaXMuc2V0VGltZW91dEZuKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGFzRXhwaXJlZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBtZXNzYWdlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1zZyAtIG1lc3NhZ2UuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gLSBjYWxsYmFjayBmdW5jdGlvbi5cbiAgICAgKiBAcmV0dXJuIHtTb2NrZXR9IGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICB3cml0ZShtc2csIG9wdGlvbnMsIGZuKSB7XG4gICAgICAgIHRoaXMuX3NlbmRQYWNrZXQoXCJtZXNzYWdlXCIsIG1zZywgb3B0aW9ucywgZm4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBtZXNzYWdlLiBBbGlhcyBvZiB7QGxpbmsgU29ja2V0I3dyaXRlfS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtc2cgLSBtZXNzYWdlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQHJldHVybiB7U29ja2V0fSBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgc2VuZChtc2csIG9wdGlvbnMsIGZuKSB7XG4gICAgICAgIHRoaXMuX3NlbmRQYWNrZXQoXCJtZXNzYWdlXCIsIG1zZywgb3B0aW9ucywgZm4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gdHlwZSAtIHBhY2tldCB0eXBlLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gY2FsbGJhY2sgZnVuY3Rpb24uXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfc2VuZFBhY2tldCh0eXBlLCBkYXRhLCBvcHRpb25zLCBmbikge1xuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2YgZGF0YSkge1xuICAgICAgICAgICAgZm4gPSBkYXRhO1xuICAgICAgICAgICAgZGF0YSA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoXCJmdW5jdGlvblwiID09PSB0eXBlb2Ygb3B0aW9ucykge1xuICAgICAgICAgICAgZm4gPSBvcHRpb25zO1xuICAgICAgICAgICAgb3B0aW9ucyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFwiY2xvc2luZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgfHwgXCJjbG9zZWRcIiA9PT0gdGhpcy5yZWFkeVN0YXRlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIG9wdGlvbnMuY29tcHJlc3MgPSBmYWxzZSAhPT0gb3B0aW9ucy5jb21wcmVzcztcbiAgICAgICAgY29uc3QgcGFja2V0ID0ge1xuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGRhdGE6IGRhdGEsXG4gICAgICAgICAgICBvcHRpb25zOiBvcHRpb25zLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBhY2tldENyZWF0ZVwiLCBwYWNrZXQpO1xuICAgICAgICB0aGlzLndyaXRlQnVmZmVyLnB1c2gocGFja2V0KTtcbiAgICAgICAgaWYgKGZuKVxuICAgICAgICAgICAgdGhpcy5vbmNlKFwiZmx1c2hcIiwgZm4pO1xuICAgICAgICB0aGlzLmZsdXNoKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlcyB0aGUgY29ubmVjdGlvbi5cbiAgICAgKi9cbiAgICBjbG9zZSgpIHtcbiAgICAgICAgY29uc3QgY2xvc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9vbkNsb3NlKFwiZm9yY2VkIGNsb3NlXCIpO1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgY2xlYW51cEFuZENsb3NlID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vZmYoXCJ1cGdyYWRlXCIsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICAgICAgICB0aGlzLm9mZihcInVwZ3JhZGVFcnJvclwiLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgd2FpdEZvclVwZ3JhZGUgPSAoKSA9PiB7XG4gICAgICAgICAgICAvLyB3YWl0IGZvciB1cGdyYWRlIHRvIGZpbmlzaCBzaW5jZSB3ZSBjYW4ndCBzZW5kIHBhY2tldHMgd2hpbGUgcGF1c2luZyBhIHRyYW5zcG9ydFxuICAgICAgICAgICAgdGhpcy5vbmNlKFwidXBncmFkZVwiLCBjbGVhbnVwQW5kQ2xvc2UpO1xuICAgICAgICAgICAgdGhpcy5vbmNlKFwidXBncmFkZUVycm9yXCIsIGNsZWFudXBBbmRDbG9zZSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChcIm9wZW5pbmdcIiA9PT0gdGhpcy5yZWFkeVN0YXRlIHx8IFwib3BlblwiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwiY2xvc2luZ1wiO1xuICAgICAgICAgICAgaWYgKHRoaXMud3JpdGVCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmNlKFwiZHJhaW5cIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy51cGdyYWRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnVwZ3JhZGluZykge1xuICAgICAgICAgICAgICAgIHdhaXRGb3JVcGdyYWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgZXJyb3JcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX29uRXJyb3IoZXJyKSB7XG4gICAgICAgIFNvY2tldC5wcmlvcldlYnNvY2tldFN1Y2Nlc3MgPSBmYWxzZTtcbiAgICAgICAgaWYgKHRoaXMub3B0cy50cnlBbGxUcmFuc3BvcnRzICYmXG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydHMubGVuZ3RoID4gMSAmJlxuICAgICAgICAgICAgdGhpcy5yZWFkeVN0YXRlID09PSBcIm9wZW5pbmdcIikge1xuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnRzLnNoaWZ0KCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb3BlbigpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgdGhpcy5fb25DbG9zZShcInRyYW5zcG9ydCBlcnJvclwiLCBlcnIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgY2xvc2UuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9vbkNsb3NlKHJlYXNvbiwgZGVzY3JpcHRpb24pIHtcbiAgICAgICAgaWYgKFwib3BlbmluZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUgfHxcbiAgICAgICAgICAgIFwib3BlblwiID09PSB0aGlzLnJlYWR5U3RhdGUgfHxcbiAgICAgICAgICAgIFwiY2xvc2luZ1wiID09PSB0aGlzLnJlYWR5U3RhdGUpIHtcbiAgICAgICAgICAgIC8vIGNsZWFyIHRpbWVyc1xuICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVvdXRGbih0aGlzLl9waW5nVGltZW91dFRpbWVyKTtcbiAgICAgICAgICAgIC8vIHN0b3AgZXZlbnQgZnJvbSBmaXJpbmcgYWdhaW4gZm9yIHRyYW5zcG9ydFxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQucmVtb3ZlQWxsTGlzdGVuZXJzKFwiY2xvc2VcIik7XG4gICAgICAgICAgICAvLyBlbnN1cmUgdHJhbnNwb3J0IHdvbid0IHN0YXkgb3BlblxuICAgICAgICAgICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgICAgICAgIC8vIGlnbm9yZSBmdXJ0aGVyIHRyYW5zcG9ydCBjb21tdW5pY2F0aW9uXG4gICAgICAgICAgICB0aGlzLnRyYW5zcG9ydC5yZW1vdmVBbGxMaXN0ZW5lcnMoKTtcbiAgICAgICAgICAgIGlmICh3aXRoRXZlbnRMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYmVmb3JldW5sb2FkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVFdmVudExpc3RlbmVyKFwiYmVmb3JldW5sb2FkXCIsIHRoaXMuX2JlZm9yZXVubG9hZEV2ZW50TGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX29mZmxpbmVFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGkgPSBPRkZMSU5FX0VWRU5UX0xJU1RFTkVSUy5pbmRleE9mKHRoaXMuX29mZmxpbmVFdmVudExpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBPRkZMSU5FX0VWRU5UX0xJU1RFTkVSUy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzZXQgcmVhZHkgc3RhdGVcbiAgICAgICAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IFwiY2xvc2VkXCI7XG4gICAgICAgICAgICAvLyBjbGVhciBzZXNzaW9uIGlkXG4gICAgICAgICAgICB0aGlzLmlkID0gbnVsbDtcbiAgICAgICAgICAgIC8vIGVtaXQgY2xvc2UgZXZlbnRcbiAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiY2xvc2VcIiwgcmVhc29uLCBkZXNjcmlwdGlvbik7XG4gICAgICAgICAgICAvLyBjbGVhbiBidWZmZXJzIGFmdGVyLCBzbyB1c2VycyBjYW4gc3RpbGxcbiAgICAgICAgICAgIC8vIGdyYWIgdGhlIGJ1ZmZlcnMgb24gYGNsb3NlYCBldmVudFxuICAgICAgICAgICAgdGhpcy53cml0ZUJ1ZmZlciA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fcHJldkJ1ZmZlckxlbiA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRmlsdGVycyB1cGdyYWRlcywgcmV0dXJuaW5nIG9ubHkgdGhvc2UgbWF0Y2hpbmcgY2xpZW50IHRyYW5zcG9ydHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FycmF5fSB1cGdyYWRlcyAtIHNlcnZlciB1cGdyYWRlc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2ZpbHRlclVwZ3JhZGVzKHVwZ3JhZGVzKSB7XG4gICAgICAgIGNvbnN0IGZpbHRlcmVkVXBncmFkZXMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB1cGdyYWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKH50aGlzLnRyYW5zcG9ydHMuaW5kZXhPZih1cGdyYWRlc1tpXSkpXG4gICAgICAgICAgICAgICAgZmlsdGVyZWRVcGdyYWRlcy5wdXNoKHVwZ3JhZGVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmlsdGVyZWRVcGdyYWRlcztcbiAgICB9XG59XG5Tb2NrZXQucHJvdG9jb2wgPSBwcm90b2NvbDtcbiIsImltcG9ydCB7IFNvY2tldCB9IGZyb20gXCIuL3NvY2tldC5qc1wiO1xuZXhwb3J0IHsgU29ja2V0IH07XG5leHBvcnQgY29uc3QgcHJvdG9jb2wgPSBTb2NrZXQucHJvdG9jb2w7XG5leHBvcnQgeyBUcmFuc3BvcnQsIFRyYW5zcG9ydEVycm9yLCB9IGZyb20gXCIuL3RyYW5zcG9ydC5qc1wiO1xuZXhwb3J0IHsgdHJhbnNwb3J0cyB9IGZyb20gXCIuL3RyYW5zcG9ydHMvaW5kZXguanNcIjtcbmV4cG9ydCB7IGluc3RhbGxUaW1lckZ1bmN0aW9ucyB9IGZyb20gXCIuL3V0aWwuanNcIjtcbmV4cG9ydCB7IHBhcnNlIH0gZnJvbSBcIi4vY29udHJpYi9wYXJzZXVyaS5qc1wiO1xuZXhwb3J0IHsgbmV4dFRpY2sgfSBmcm9tIFwiLi9nbG9iYWxzLm5vZGUuanNcIjtcbmV4cG9ydCB7IEZldGNoIH0gZnJvbSBcIi4vdHJhbnNwb3J0cy9wb2xsaW5nLWZldGNoLmpzXCI7XG5leHBvcnQgeyBYSFIgYXMgTm9kZVhIUiB9IGZyb20gXCIuL3RyYW5zcG9ydHMvcG9sbGluZy14aHIubm9kZS5qc1wiO1xuZXhwb3J0IHsgWEhSIH0gZnJvbSBcIi4vdHJhbnNwb3J0cy9wb2xsaW5nLXhoci5qc1wiO1xuZXhwb3J0IHsgV1MgYXMgTm9kZVdlYlNvY2tldCB9IGZyb20gXCIuL3RyYW5zcG9ydHMvd2Vic29ja2V0Lm5vZGUuanNcIjtcbmV4cG9ydCB7IFdTIGFzIFdlYlNvY2tldCB9IGZyb20gXCIuL3RyYW5zcG9ydHMvd2Vic29ja2V0LmpzXCI7XG5leHBvcnQgeyBXVCBhcyBXZWJUcmFuc3BvcnQgfSBmcm9tIFwiLi90cmFuc3BvcnRzL3dlYnRyYW5zcG9ydC5qc1wiO1xuIiwiaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwiZW5naW5lLmlvLWNsaWVudFwiO1xuLyoqXG4gKiBVUkwgcGFyc2VyLlxuICpcbiAqIEBwYXJhbSB1cmkgLSB1cmxcbiAqIEBwYXJhbSBwYXRoIC0gdGhlIHJlcXVlc3QgcGF0aCBvZiB0aGUgY29ubmVjdGlvblxuICogQHBhcmFtIGxvYyAtIEFuIG9iamVjdCBtZWFudCB0byBtaW1pYyB3aW5kb3cubG9jYXRpb24uXG4gKiAgICAgICAgRGVmYXVsdHMgdG8gd2luZG93LmxvY2F0aW9uLlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gdXJsKHVyaSwgcGF0aCA9IFwiXCIsIGxvYykge1xuICAgIGxldCBvYmogPSB1cmk7XG4gICAgLy8gZGVmYXVsdCB0byB3aW5kb3cubG9jYXRpb25cbiAgICBsb2MgPSBsb2MgfHwgKHR5cGVvZiBsb2NhdGlvbiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBsb2NhdGlvbik7XG4gICAgaWYgKG51bGwgPT0gdXJpKVxuICAgICAgICB1cmkgPSBsb2MucHJvdG9jb2wgKyBcIi8vXCIgKyBsb2MuaG9zdDtcbiAgICAvLyByZWxhdGl2ZSBwYXRoIHN1cHBvcnRcbiAgICBpZiAodHlwZW9mIHVyaSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoXCIvXCIgPT09IHVyaS5jaGFyQXQoMCkpIHtcbiAgICAgICAgICAgIGlmIChcIi9cIiA9PT0gdXJpLmNoYXJBdCgxKSkge1xuICAgICAgICAgICAgICAgIHVyaSA9IGxvYy5wcm90b2NvbCArIHVyaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHVyaSA9IGxvYy5ob3N0ICsgdXJpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghL14oaHR0cHM/fHdzcz8pOlxcL1xcLy8udGVzdCh1cmkpKSB7XG4gICAgICAgICAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIGxvYykge1xuICAgICAgICAgICAgICAgIHVyaSA9IGxvYy5wcm90b2NvbCArIFwiLy9cIiArIHVyaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHVyaSA9IFwiaHR0cHM6Ly9cIiArIHVyaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBwYXJzZVxuICAgICAgICBvYmogPSBwYXJzZSh1cmkpO1xuICAgIH1cbiAgICAvLyBtYWtlIHN1cmUgd2UgdHJlYXQgYGxvY2FsaG9zdDo4MGAgYW5kIGBsb2NhbGhvc3RgIGVxdWFsbHlcbiAgICBpZiAoIW9iai5wb3J0KSB7XG4gICAgICAgIGlmICgvXihodHRwfHdzKSQvLnRlc3Qob2JqLnByb3RvY29sKSkge1xuICAgICAgICAgICAgb2JqLnBvcnQgPSBcIjgwXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoL14oaHR0cHx3cylzJC8udGVzdChvYmoucHJvdG9jb2wpKSB7XG4gICAgICAgICAgICBvYmoucG9ydCA9IFwiNDQzXCI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb2JqLnBhdGggPSBvYmoucGF0aCB8fCBcIi9cIjtcbiAgICBjb25zdCBpcHY2ID0gb2JqLmhvc3QuaW5kZXhPZihcIjpcIikgIT09IC0xO1xuICAgIGNvbnN0IGhvc3QgPSBpcHY2ID8gXCJbXCIgKyBvYmouaG9zdCArIFwiXVwiIDogb2JqLmhvc3Q7XG4gICAgLy8gZGVmaW5lIHVuaXF1ZSBpZFxuICAgIG9iai5pZCA9IG9iai5wcm90b2NvbCArIFwiOi8vXCIgKyBob3N0ICsgXCI6XCIgKyBvYmoucG9ydCArIHBhdGg7XG4gICAgLy8gZGVmaW5lIGhyZWZcbiAgICBvYmouaHJlZiA9XG4gICAgICAgIG9iai5wcm90b2NvbCArXG4gICAgICAgICAgICBcIjovL1wiICtcbiAgICAgICAgICAgIGhvc3QgK1xuICAgICAgICAgICAgKGxvYyAmJiBsb2MucG9ydCA9PT0gb2JqLnBvcnQgPyBcIlwiIDogXCI6XCIgKyBvYmoucG9ydCk7XG4gICAgcmV0dXJuIG9iajtcbn1cbiIsImNvbnN0IHdpdGhOYXRpdmVBcnJheUJ1ZmZlciA9IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gXCJmdW5jdGlvblwiO1xuY29uc3QgaXNWaWV3ID0gKG9iaikgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgPyBBcnJheUJ1ZmZlci5pc1ZpZXcob2JqKVxuICAgICAgICA6IG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcjtcbn07XG5jb25zdCB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5jb25zdCB3aXRoTmF0aXZlQmxvYiA9IHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAodHlwZW9mIEJsb2IgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdG9TdHJpbmcuY2FsbChCbG9iKSA9PT0gXCJbb2JqZWN0IEJsb2JDb25zdHJ1Y3Rvcl1cIik7XG5jb25zdCB3aXRoTmF0aXZlRmlsZSA9IHR5cGVvZiBGaWxlID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAodHlwZW9mIEZpbGUgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdG9TdHJpbmcuY2FsbChGaWxlKSA9PT0gXCJbb2JqZWN0IEZpbGVDb25zdHJ1Y3Rvcl1cIik7XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBvYmogaXMgYSBCdWZmZXIsIGFuIEFycmF5QnVmZmVyLCBhIEJsb2Igb3IgYSBGaWxlLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0JpbmFyeShvYmopIHtcbiAgICByZXR1cm4gKCh3aXRoTmF0aXZlQXJyYXlCdWZmZXIgJiYgKG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IGlzVmlldyhvYmopKSkgfHxcbiAgICAgICAgKHdpdGhOYXRpdmVCbG9iICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IpIHx8XG4gICAgICAgICh3aXRoTmF0aXZlRmlsZSAmJiBvYmogaW5zdGFuY2VvZiBGaWxlKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaGFzQmluYXJ5KG9iaiwgdG9KU09OKSB7XG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaGFzQmluYXJ5KG9ialtpXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChpc0JpbmFyeShvYmopKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAob2JqLnRvSlNPTiAmJlxuICAgICAgICB0eXBlb2Ygb2JqLnRvSlNPTiA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgIGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGhhc0JpbmFyeShvYmoudG9KU09OKCksIHRydWUpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkgJiYgaGFzQmluYXJ5KG9ialtrZXldKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuIiwiaW1wb3J0IHsgaXNCaW5hcnkgfSBmcm9tIFwiLi9pcy1iaW5hcnkuanNcIjtcbi8qKlxuICogUmVwbGFjZXMgZXZlcnkgQnVmZmVyIHwgQXJyYXlCdWZmZXIgfCBCbG9iIHwgRmlsZSBpbiBwYWNrZXQgd2l0aCBhIG51bWJlcmVkIHBsYWNlaG9sZGVyLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQgLSBzb2NrZXQuaW8gZXZlbnQgcGFja2V0XG4gKiBAcmV0dXJuIHtPYmplY3R9IHdpdGggZGVjb25zdHJ1Y3RlZCBwYWNrZXQgYW5kIGxpc3Qgb2YgYnVmZmVyc1xuICogQHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjb25zdHJ1Y3RQYWNrZXQocGFja2V0KSB7XG4gICAgY29uc3QgYnVmZmVycyA9IFtdO1xuICAgIGNvbnN0IHBhY2tldERhdGEgPSBwYWNrZXQuZGF0YTtcbiAgICBjb25zdCBwYWNrID0gcGFja2V0O1xuICAgIHBhY2suZGF0YSA9IF9kZWNvbnN0cnVjdFBhY2tldChwYWNrZXREYXRhLCBidWZmZXJzKTtcbiAgICBwYWNrLmF0dGFjaG1lbnRzID0gYnVmZmVycy5sZW5ndGg7IC8vIG51bWJlciBvZiBiaW5hcnkgJ2F0dGFjaG1lbnRzJ1xuICAgIHJldHVybiB7IHBhY2tldDogcGFjaywgYnVmZmVyczogYnVmZmVycyB9O1xufVxuZnVuY3Rpb24gX2RlY29uc3RydWN0UGFja2V0KGRhdGEsIGJ1ZmZlcnMsIHRvSlNPTikge1xuICAgIGlmICghZGF0YSlcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgaWYgKGlzQmluYXJ5KGRhdGEpKSB7XG4gICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0geyBfcGxhY2Vob2xkZXI6IHRydWUsIG51bTogYnVmZmVycy5sZW5ndGggfTtcbiAgICAgICAgYnVmZmVycy5wdXNoKGRhdGEpO1xuICAgICAgICByZXR1cm4gcGxhY2Vob2xkZXI7XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgY29uc3QgbmV3RGF0YSA9IG5ldyBBcnJheShkYXRhLmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbmV3RGF0YVtpXSA9IF9kZWNvbnN0cnVjdFBhY2tldChkYXRhW2ldLCBidWZmZXJzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIGRhdGEgPT09IFwib2JqZWN0XCIgJiYgIShkYXRhIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgaWYgKGRhdGEudG9KU09OICYmIHR5cGVvZiBkYXRhLnRvSlNPTiA9PT0gXCJmdW5jdGlvblwiICYmICF0b0pTT04pIHtcbiAgICAgICAgICAgIHJldHVybiBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YS50b0pTT04oKSwgYnVmZmVycywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbmV3RGF0YSA9IHt9O1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBkYXRhKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkpIHtcbiAgICAgICAgICAgICAgICBuZXdEYXRhW2tleV0gPSBfZGVjb25zdHJ1Y3RQYWNrZXQoZGF0YVtrZXldLCBidWZmZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3RGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIGRhdGE7XG59XG4vKipcbiAqIFJlY29uc3RydWN0cyBhIGJpbmFyeSBwYWNrZXQgZnJvbSBpdHMgcGxhY2Vob2xkZXIgcGFja2V0IGFuZCBidWZmZXJzXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCAtIGV2ZW50IHBhY2tldCB3aXRoIHBsYWNlaG9sZGVyc1xuICogQHBhcmFtIHtBcnJheX0gYnVmZmVycyAtIGJpbmFyeSBidWZmZXJzIHRvIHB1dCBpbiBwbGFjZWhvbGRlciBwb3NpdGlvbnNcbiAqIEByZXR1cm4ge09iamVjdH0gcmVjb25zdHJ1Y3RlZCBwYWNrZXRcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlY29uc3RydWN0UGFja2V0KHBhY2tldCwgYnVmZmVycykge1xuICAgIHBhY2tldC5kYXRhID0gX3JlY29uc3RydWN0UGFja2V0KHBhY2tldC5kYXRhLCBidWZmZXJzKTtcbiAgICBkZWxldGUgcGFja2V0LmF0dGFjaG1lbnRzOyAvLyBubyBsb25nZXIgdXNlZnVsXG4gICAgcmV0dXJuIHBhY2tldDtcbn1cbmZ1bmN0aW9uIF9yZWNvbnN0cnVjdFBhY2tldChkYXRhLCBidWZmZXJzKSB7XG4gICAgaWYgKCFkYXRhKVxuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICBpZiAoZGF0YSAmJiBkYXRhLl9wbGFjZWhvbGRlciA9PT0gdHJ1ZSkge1xuICAgICAgICBjb25zdCBpc0luZGV4VmFsaWQgPSB0eXBlb2YgZGF0YS5udW0gPT09IFwibnVtYmVyXCIgJiZcbiAgICAgICAgICAgIGRhdGEubnVtID49IDAgJiZcbiAgICAgICAgICAgIGRhdGEubnVtIDwgYnVmZmVycy5sZW5ndGg7XG4gICAgICAgIGlmIChpc0luZGV4VmFsaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBidWZmZXJzW2RhdGEubnVtXTsgLy8gYXBwcm9wcmlhdGUgYnVmZmVyIChzaG91bGQgYmUgbmF0dXJhbCBvcmRlciBhbnl3YXkpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGF0dGFjaG1lbnRzXCIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkYXRhW2ldID0gX3JlY29uc3RydWN0UGFja2V0KGRhdGFbaV0sIGJ1ZmZlcnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSkge1xuICAgICAgICAgICAgICAgIGRhdGFba2V5XSA9IF9yZWNvbnN0cnVjdFBhY2tldChkYXRhW2tleV0sIGJ1ZmZlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xufVxuIiwiaW1wb3J0IHsgRW1pdHRlciB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG5pbXBvcnQgeyBkZWNvbnN0cnVjdFBhY2tldCwgcmVjb25zdHJ1Y3RQYWNrZXQgfSBmcm9tIFwiLi9iaW5hcnkuanNcIjtcbmltcG9ydCB7IGlzQmluYXJ5LCBoYXNCaW5hcnkgfSBmcm9tIFwiLi9pcy1iaW5hcnkuanNcIjtcbi8qKlxuICogVGhlc2Ugc3RyaW5ncyBtdXN0IG5vdCBiZSB1c2VkIGFzIGV2ZW50IG5hbWVzLCBhcyB0aGV5IGhhdmUgYSBzcGVjaWFsIG1lYW5pbmcuXG4gKi9cbmNvbnN0IFJFU0VSVkVEX0VWRU5UUyA9IFtcbiAgICBcImNvbm5lY3RcIiwgLy8gdXNlZCBvbiB0aGUgY2xpZW50IHNpZGVcbiAgICBcImNvbm5lY3RfZXJyb3JcIiwgLy8gdXNlZCBvbiB0aGUgY2xpZW50IHNpZGVcbiAgICBcImRpc2Nvbm5lY3RcIiwgLy8gdXNlZCBvbiBib3RoIHNpZGVzXG4gICAgXCJkaXNjb25uZWN0aW5nXCIsIC8vIHVzZWQgb24gdGhlIHNlcnZlciBzaWRlXG4gICAgXCJuZXdMaXN0ZW5lclwiLCAvLyB1c2VkIGJ5IHRoZSBOb2RlLmpzIEV2ZW50RW1pdHRlclxuICAgIFwicmVtb3ZlTGlzdGVuZXJcIiwgLy8gdXNlZCBieSB0aGUgTm9kZS5qcyBFdmVudEVtaXR0ZXJcbl07XG4vKipcbiAqIFByb3RvY29sIHZlcnNpb24uXG4gKlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgY29uc3QgcHJvdG9jb2wgPSA1O1xuZXhwb3J0IHZhciBQYWNrZXRUeXBlO1xuKGZ1bmN0aW9uIChQYWNrZXRUeXBlKSB7XG4gICAgUGFja2V0VHlwZVtQYWNrZXRUeXBlW1wiQ09OTkVDVFwiXSA9IDBdID0gXCJDT05ORUNUXCI7XG4gICAgUGFja2V0VHlwZVtQYWNrZXRUeXBlW1wiRElTQ09OTkVDVFwiXSA9IDFdID0gXCJESVNDT05ORUNUXCI7XG4gICAgUGFja2V0VHlwZVtQYWNrZXRUeXBlW1wiRVZFTlRcIl0gPSAyXSA9IFwiRVZFTlRcIjtcbiAgICBQYWNrZXRUeXBlW1BhY2tldFR5cGVbXCJBQ0tcIl0gPSAzXSA9IFwiQUNLXCI7XG4gICAgUGFja2V0VHlwZVtQYWNrZXRUeXBlW1wiQ09OTkVDVF9FUlJPUlwiXSA9IDRdID0gXCJDT05ORUNUX0VSUk9SXCI7XG4gICAgUGFja2V0VHlwZVtQYWNrZXRUeXBlW1wiQklOQVJZX0VWRU5UXCJdID0gNV0gPSBcIkJJTkFSWV9FVkVOVFwiO1xuICAgIFBhY2tldFR5cGVbUGFja2V0VHlwZVtcIkJJTkFSWV9BQ0tcIl0gPSA2XSA9IFwiQklOQVJZX0FDS1wiO1xufSkoUGFja2V0VHlwZSB8fCAoUGFja2V0VHlwZSA9IHt9KSk7XG4vKipcbiAqIEEgc29ja2V0LmlvIEVuY29kZXIgaW5zdGFuY2VcbiAqL1xuZXhwb3J0IGNsYXNzIEVuY29kZXIge1xuICAgIC8qKlxuICAgICAqIEVuY29kZXIgY29uc3RydWN0b3JcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHJlcGxhY2VyIC0gY3VzdG9tIHJlcGxhY2VyIHRvIHBhc3MgZG93biB0byBKU09OLnBhcnNlXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocmVwbGFjZXIpIHtcbiAgICAgICAgdGhpcy5yZXBsYWNlciA9IHJlcGxhY2VyO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbmNvZGUgYSBwYWNrZXQgYXMgYSBzaW5nbGUgc3RyaW5nIGlmIG5vbi1iaW5hcnksIG9yIGFzIGFcbiAgICAgKiBidWZmZXIgc2VxdWVuY2UsIGRlcGVuZGluZyBvbiBwYWNrZXQgdHlwZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSBwYWNrZXQgb2JqZWN0XG4gICAgICovXG4gICAgZW5jb2RlKG9iaikge1xuICAgICAgICBpZiAob2JqLnR5cGUgPT09IFBhY2tldFR5cGUuRVZFTlQgfHwgb2JqLnR5cGUgPT09IFBhY2tldFR5cGUuQUNLKSB7XG4gICAgICAgICAgICBpZiAoaGFzQmluYXJ5KG9iaikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5lbmNvZGVBc0JpbmFyeSh7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IG9iai50eXBlID09PSBQYWNrZXRUeXBlLkVWRU5UXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFBhY2tldFR5cGUuQklOQVJZX0VWRU5UXG4gICAgICAgICAgICAgICAgICAgICAgICA6IFBhY2tldFR5cGUuQklOQVJZX0FDSyxcbiAgICAgICAgICAgICAgICAgICAgbnNwOiBvYmoubnNwLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBvYmouZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgaWQ6IG9iai5pZCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3RoaXMuZW5jb2RlQXNTdHJpbmcob2JqKV07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVuY29kZSBwYWNrZXQgYXMgc3RyaW5nLlxuICAgICAqL1xuICAgIGVuY29kZUFzU3RyaW5nKG9iaikge1xuICAgICAgICAvLyBmaXJzdCBpcyB0eXBlXG4gICAgICAgIGxldCBzdHIgPSBcIlwiICsgb2JqLnR5cGU7XG4gICAgICAgIC8vIGF0dGFjaG1lbnRzIGlmIHdlIGhhdmUgdGhlbVxuICAgICAgICBpZiAob2JqLnR5cGUgPT09IFBhY2tldFR5cGUuQklOQVJZX0VWRU5UIHx8XG4gICAgICAgICAgICBvYmoudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfQUNLKSB7XG4gICAgICAgICAgICBzdHIgKz0gb2JqLmF0dGFjaG1lbnRzICsgXCItXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhIG5hbWVzcGFjZSBvdGhlciB0aGFuIGAvYFxuICAgICAgICAvLyB3ZSBhcHBlbmQgaXQgZm9sbG93ZWQgYnkgYSBjb21tYSBgLGBcbiAgICAgICAgaWYgKG9iai5uc3AgJiYgXCIvXCIgIT09IG9iai5uc3ApIHtcbiAgICAgICAgICAgIHN0ciArPSBvYmoubnNwICsgXCIsXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gaW1tZWRpYXRlbHkgZm9sbG93ZWQgYnkgdGhlIGlkXG4gICAgICAgIGlmIChudWxsICE9IG9iai5pZCkge1xuICAgICAgICAgICAgc3RyICs9IG9iai5pZDtcbiAgICAgICAgfVxuICAgICAgICAvLyBqc29uIGRhdGFcbiAgICAgICAgaWYgKG51bGwgIT0gb2JqLmRhdGEpIHtcbiAgICAgICAgICAgIHN0ciArPSBKU09OLnN0cmluZ2lmeShvYmouZGF0YSwgdGhpcy5yZXBsYWNlcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRW5jb2RlIHBhY2tldCBhcyAnYnVmZmVyIHNlcXVlbmNlJyBieSByZW1vdmluZyBibG9icywgYW5kXG4gICAgICogZGVjb25zdHJ1Y3RpbmcgcGFja2V0IGludG8gb2JqZWN0IHdpdGggcGxhY2Vob2xkZXJzIGFuZFxuICAgICAqIGEgbGlzdCBvZiBidWZmZXJzLlxuICAgICAqL1xuICAgIGVuY29kZUFzQmluYXJ5KG9iaikge1xuICAgICAgICBjb25zdCBkZWNvbnN0cnVjdGlvbiA9IGRlY29uc3RydWN0UGFja2V0KG9iaik7XG4gICAgICAgIGNvbnN0IHBhY2sgPSB0aGlzLmVuY29kZUFzU3RyaW5nKGRlY29uc3RydWN0aW9uLnBhY2tldCk7XG4gICAgICAgIGNvbnN0IGJ1ZmZlcnMgPSBkZWNvbnN0cnVjdGlvbi5idWZmZXJzO1xuICAgICAgICBidWZmZXJzLnVuc2hpZnQocGFjayk7IC8vIGFkZCBwYWNrZXQgaW5mbyB0byBiZWdpbm5pbmcgb2YgZGF0YSBsaXN0XG4gICAgICAgIHJldHVybiBidWZmZXJzOyAvLyB3cml0ZSBhbGwgdGhlIGJ1ZmZlcnNcbiAgICB9XG59XG4vKipcbiAqIEEgc29ja2V0LmlvIERlY29kZXIgaW5zdGFuY2VcbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGRlY29kZXJcbiAqL1xuZXhwb3J0IGNsYXNzIERlY29kZXIgZXh0ZW5kcyBFbWl0dGVyIHtcbiAgICAvKipcbiAgICAgKiBEZWNvZGVyIGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLm9wdHMgPSBPYmplY3QuYXNzaWduKHtcbiAgICAgICAgICAgIHJldml2ZXI6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIG1heEF0dGFjaG1lbnRzOiAxMCxcbiAgICAgICAgfSwgdHlwZW9mIG9wdHMgPT09IFwiZnVuY3Rpb25cIiA/IHsgcmV2aXZlcjogb3B0cyB9IDogb3B0cyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlY29kZXMgYW4gZW5jb2RlZCBwYWNrZXQgc3RyaW5nIGludG8gcGFja2V0IEpTT04uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gb2JqIC0gZW5jb2RlZCBwYWNrZXRcbiAgICAgKi9cbiAgICBhZGQob2JqKSB7XG4gICAgICAgIGxldCBwYWNrZXQ7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JqID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yZWNvbnN0cnVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ290IHBsYWludGV4dCBkYXRhIHdoZW4gcmVjb25zdHJ1Y3RpbmcgYSBwYWNrZXRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYWNrZXQgPSB0aGlzLmRlY29kZVN0cmluZyhvYmopO1xuICAgICAgICAgICAgY29uc3QgaXNCaW5hcnlFdmVudCA9IHBhY2tldC50eXBlID09PSBQYWNrZXRUeXBlLkJJTkFSWV9FVkVOVDtcbiAgICAgICAgICAgIGlmIChpc0JpbmFyeUV2ZW50IHx8IHBhY2tldC50eXBlID09PSBQYWNrZXRUeXBlLkJJTkFSWV9BQ0spIHtcbiAgICAgICAgICAgICAgICBwYWNrZXQudHlwZSA9IGlzQmluYXJ5RXZlbnQgPyBQYWNrZXRUeXBlLkVWRU5UIDogUGFja2V0VHlwZS5BQ0s7XG4gICAgICAgICAgICAgICAgLy8gYmluYXJ5IHBhY2tldCdzIGpzb25cbiAgICAgICAgICAgICAgICB0aGlzLnJlY29uc3RydWN0b3IgPSBuZXcgQmluYXJ5UmVjb25zdHJ1Y3RvcihwYWNrZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gbm9uLWJpbmFyeSBmdWxsIHBhY2tldFxuICAgICAgICAgICAgICAgIHN1cGVyLmVtaXRSZXNlcnZlZChcImRlY29kZWRcIiwgcGFja2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0JpbmFyeShvYmopIHx8IG9iai5iYXNlNjQpIHtcbiAgICAgICAgICAgIC8vIHJhdyBiaW5hcnkgZGF0YVxuICAgICAgICAgICAgaWYgKCF0aGlzLnJlY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnb3QgYmluYXJ5IGRhdGEgd2hlbiBub3QgcmVjb25zdHJ1Y3RpbmcgYSBwYWNrZXRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYWNrZXQgPSB0aGlzLnJlY29uc3RydWN0b3IudGFrZUJpbmFyeURhdGEob2JqKTtcbiAgICAgICAgICAgICAgICBpZiAocGFja2V0KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlY2VpdmVkIGZpbmFsIGJ1ZmZlclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlY29uc3RydWN0b3IgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBzdXBlci5lbWl0UmVzZXJ2ZWQoXCJkZWNvZGVkXCIsIHBhY2tldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biB0eXBlOiBcIiArIG9iaik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVjb2RlIGEgcGFja2V0IFN0cmluZyAoSlNPTiBkYXRhKVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAgICAqIEByZXR1cm4ge09iamVjdH0gcGFja2V0XG4gICAgICovXG4gICAgZGVjb2RlU3RyaW5nKHN0cikge1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIC8vIGxvb2sgdXAgdHlwZVxuICAgICAgICBjb25zdCBwID0ge1xuICAgICAgICAgICAgdHlwZTogTnVtYmVyKHN0ci5jaGFyQXQoMCkpLFxuICAgICAgICB9O1xuICAgICAgICBpZiAoUGFja2V0VHlwZVtwLnR5cGVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInVua25vd24gcGFja2V0IHR5cGUgXCIgKyBwLnR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGxvb2sgdXAgYXR0YWNobWVudHMgaWYgdHlwZSBiaW5hcnlcbiAgICAgICAgaWYgKHAudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfRVZFTlQgfHxcbiAgICAgICAgICAgIHAudHlwZSA9PT0gUGFja2V0VHlwZS5CSU5BUllfQUNLKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGkgKyAxO1xuICAgICAgICAgICAgd2hpbGUgKHN0ci5jaGFyQXQoKytpKSAhPT0gXCItXCIgJiYgaSAhPSBzdHIubGVuZ3RoKSB7IH1cbiAgICAgICAgICAgIGNvbnN0IGJ1ZiA9IHN0ci5zdWJzdHJpbmcoc3RhcnQsIGkpO1xuICAgICAgICAgICAgaWYgKGJ1ZiAhPSBOdW1iZXIoYnVmKSB8fCBzdHIuY2hhckF0KGkpICE9PSBcIi1cIikge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIklsbGVnYWwgYXR0YWNobWVudHNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBuID0gTnVtYmVyKGJ1Zik7XG4gICAgICAgICAgICBpZiAoIWlzSW50ZWdlcihuKSB8fCBuIDwgMSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIklsbGVnYWwgYXR0YWNobWVudHNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuID4gdGhpcy5vcHRzLm1heEF0dGFjaG1lbnRzKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidG9vIG1hbnkgYXR0YWNobWVudHNcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwLmF0dGFjaG1lbnRzID0gbjtcbiAgICAgICAgfVxuICAgICAgICAvLyBsb29rIHVwIG5hbWVzcGFjZSAoaWYgYW55KVxuICAgICAgICBpZiAoXCIvXCIgPT09IHN0ci5jaGFyQXQoaSArIDEpKSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGkgKyAxO1xuICAgICAgICAgICAgd2hpbGUgKCsraSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGMgPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICAgICAgICAgIGlmIChcIixcIiA9PT0gYylcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IHN0ci5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcC5uc3AgPSBzdHIuc3Vic3RyaW5nKHN0YXJ0LCBpKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHAubnNwID0gXCIvXCI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gbG9vayB1cCBpZFxuICAgICAgICBjb25zdCBuZXh0ID0gc3RyLmNoYXJBdChpICsgMSk7XG4gICAgICAgIGlmIChcIlwiICE9PSBuZXh0ICYmIE51bWJlcihuZXh0KSA9PSBuZXh0KSB7XG4gICAgICAgICAgICBjb25zdCBzdGFydCA9IGkgKyAxO1xuICAgICAgICAgICAgd2hpbGUgKCsraSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGMgPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICAgICAgICAgIGlmIChudWxsID09IGMgfHwgTnVtYmVyKGMpICE9IGMpIHtcbiAgICAgICAgICAgICAgICAgICAgLS1pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IHN0ci5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcC5pZCA9IE51bWJlcihzdHIuc3Vic3RyaW5nKHN0YXJ0LCBpICsgMSkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGxvb2sgdXAganNvbiBkYXRhXG4gICAgICAgIGlmIChzdHIuY2hhckF0KCsraSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSB0aGlzLnRyeVBhcnNlKHN0ci5zdWJzdHIoaSkpO1xuICAgICAgICAgICAgaWYgKERlY29kZXIuaXNQYXlsb2FkVmFsaWQocC50eXBlLCBwYXlsb2FkKSkge1xuICAgICAgICAgICAgICAgIHAuZGF0YSA9IHBheWxvYWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbnZhbGlkIHBheWxvYWRcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHA7XG4gICAgfVxuICAgIHRyeVBhcnNlKHN0cikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2Uoc3RyLCB0aGlzLm9wdHMucmV2aXZlcik7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgaXNQYXlsb2FkVmFsaWQodHlwZSwgcGF5bG9hZCkge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5DT05ORUNUOlxuICAgICAgICAgICAgICAgIHJldHVybiBpc09iamVjdChwYXlsb2FkKTtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5ESVNDT05ORUNUOlxuICAgICAgICAgICAgICAgIHJldHVybiBwYXlsb2FkID09PSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQ09OTkVDVF9FUlJPUjpcbiAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIHBheWxvYWQgPT09IFwic3RyaW5nXCIgfHwgaXNPYmplY3QocGF5bG9hZCk7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuRVZFTlQ6XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQklOQVJZX0VWRU5UOlxuICAgICAgICAgICAgICAgIHJldHVybiAoQXJyYXkuaXNBcnJheShwYXlsb2FkKSAmJlxuICAgICAgICAgICAgICAgICAgICAodHlwZW9mIHBheWxvYWRbMF0gPT09IFwibnVtYmVyXCIgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgcGF5bG9hZFswXSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFJFU0VSVkVEX0VWRU5UUy5pbmRleE9mKHBheWxvYWRbMF0pID09PSAtMSkpKTtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5BQ0s6XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQklOQVJZX0FDSzpcbiAgICAgICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShwYXlsb2FkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZWFsbG9jYXRlcyBhIHBhcnNlcidzIHJlc291cmNlc1xuICAgICAqL1xuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnJlY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMucmVjb25zdHJ1Y3Rvci5maW5pc2hlZFJlY29uc3RydWN0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLnJlY29uc3RydWN0b3IgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBBIG1hbmFnZXIgb2YgYSBiaW5hcnkgZXZlbnQncyAnYnVmZmVyIHNlcXVlbmNlJy4gU2hvdWxkXG4gKiBiZSBjb25zdHJ1Y3RlZCB3aGVuZXZlciBhIHBhY2tldCBvZiB0eXBlIEJJTkFSWV9FVkVOVCBpc1xuICogZGVjb2RlZC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGFja2V0XG4gKiBAcmV0dXJuIHtCaW5hcnlSZWNvbnN0cnVjdG9yfSBpbml0aWFsaXplZCByZWNvbnN0cnVjdG9yXG4gKi9cbmNsYXNzIEJpbmFyeVJlY29uc3RydWN0b3Ige1xuICAgIGNvbnN0cnVjdG9yKHBhY2tldCkge1xuICAgICAgICB0aGlzLnBhY2tldCA9IHBhY2tldDtcbiAgICAgICAgdGhpcy5idWZmZXJzID0gW107XG4gICAgICAgIHRoaXMucmVjb25QYWNrID0gcGFja2V0O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gYmluYXJ5IGRhdGEgcmVjZWl2ZWQgZnJvbSBjb25uZWN0aW9uXG4gICAgICogYWZ0ZXIgYSBCSU5BUllfRVZFTlQgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtCdWZmZXIgfCBBcnJheUJ1ZmZlcn0gYmluRGF0YSAtIHRoZSByYXcgYmluYXJ5IGRhdGEgcmVjZWl2ZWRcbiAgICAgKiBAcmV0dXJuIHtudWxsIHwgT2JqZWN0fSByZXR1cm5zIG51bGwgaWYgbW9yZSBiaW5hcnkgZGF0YSBpcyBleHBlY3RlZCBvclxuICAgICAqICAgYSByZWNvbnN0cnVjdGVkIHBhY2tldCBvYmplY3QgaWYgYWxsIGJ1ZmZlcnMgaGF2ZSBiZWVuIHJlY2VpdmVkLlxuICAgICAqL1xuICAgIHRha2VCaW5hcnlEYXRhKGJpbkRhdGEpIHtcbiAgICAgICAgdGhpcy5idWZmZXJzLnB1c2goYmluRGF0YSk7XG4gICAgICAgIGlmICh0aGlzLmJ1ZmZlcnMubGVuZ3RoID09PSB0aGlzLnJlY29uUGFjay5hdHRhY2htZW50cykge1xuICAgICAgICAgICAgLy8gZG9uZSB3aXRoIGJ1ZmZlciBsaXN0XG4gICAgICAgICAgICBjb25zdCBwYWNrZXQgPSByZWNvbnN0cnVjdFBhY2tldCh0aGlzLnJlY29uUGFjaywgdGhpcy5idWZmZXJzKTtcbiAgICAgICAgICAgIHRoaXMuZmluaXNoZWRSZWNvbnN0cnVjdGlvbigpO1xuICAgICAgICAgICAgcmV0dXJuIHBhY2tldDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYW5zIHVwIGJpbmFyeSBwYWNrZXQgcmVjb25zdHJ1Y3Rpb24gdmFyaWFibGVzLlxuICAgICAqL1xuICAgIGZpbmlzaGVkUmVjb25zdHJ1Y3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVjb25QYWNrID0gbnVsbDtcbiAgICAgICAgdGhpcy5idWZmZXJzID0gW107XG4gICAgfVxufVxuZnVuY3Rpb24gaXNOYW1lc3BhY2VWYWxpZChuc3ApIHtcbiAgICByZXR1cm4gdHlwZW9mIG5zcCA9PT0gXCJzdHJpbmdcIjtcbn1cbi8vIHNlZSBodHRwczovL2Nhbml1c2UuY29tL21kbi1qYXZhc2NyaXB0X2J1aWx0aW5zX251bWJlcl9pc2ludGVnZXJcbmNvbnN0IGlzSW50ZWdlciA9IE51bWJlci5pc0ludGVnZXIgfHxcbiAgICBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09IFwibnVtYmVyXCIgJiZcbiAgICAgICAgICAgIGlzRmluaXRlKHZhbHVlKSAmJlxuICAgICAgICAgICAgTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlKTtcbiAgICB9O1xuZnVuY3Rpb24gaXNBY2tJZFZhbGlkKGlkKSB7XG4gICAgcmV0dXJuIGlkID09PSB1bmRlZmluZWQgfHwgaXNJbnRlZ2VyKGlkKTtcbn1cbi8vIHNlZSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy84NTExMjgxL2NoZWNrLWlmLWEtdmFsdWUtaXMtYW4tb2JqZWN0LWluLWphdmFzY3JpcHRcbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09IFwiW29iamVjdCBPYmplY3RdXCI7XG59XG5mdW5jdGlvbiBpc0RhdGFWYWxpZCh0eXBlLCBwYXlsb2FkKSB7XG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgUGFja2V0VHlwZS5DT05ORUNUOlxuICAgICAgICAgICAgcmV0dXJuIHBheWxvYWQgPT09IHVuZGVmaW5lZCB8fCBpc09iamVjdChwYXlsb2FkKTtcbiAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkRJU0NPTk5FQ1Q6XG4gICAgICAgICAgICByZXR1cm4gcGF5bG9hZCA9PT0gdW5kZWZpbmVkO1xuICAgICAgICBjYXNlIFBhY2tldFR5cGUuRVZFTlQ6XG4gICAgICAgICAgICByZXR1cm4gKEFycmF5LmlzQXJyYXkocGF5bG9hZCkgJiZcbiAgICAgICAgICAgICAgICAodHlwZW9mIHBheWxvYWRbMF0gPT09IFwibnVtYmVyXCIgfHxcbiAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBwYXlsb2FkWzBdID09PSBcInN0cmluZ1wiICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBSRVNFUlZFRF9FVkVOVFMuaW5kZXhPZihwYXlsb2FkWzBdKSA9PT0gLTEpKSk7XG4gICAgICAgIGNhc2UgUGFja2V0VHlwZS5BQ0s6XG4gICAgICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheShwYXlsb2FkKTtcbiAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkNPTk5FQ1RfRVJST1I6XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHBheWxvYWQgPT09IFwic3RyaW5nXCIgfHwgaXNPYmplY3QocGF5bG9hZCk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGlzUGFja2V0VmFsaWQocGFja2V0KSB7XG4gICAgcmV0dXJuIChpc05hbWVzcGFjZVZhbGlkKHBhY2tldC5uc3ApICYmXG4gICAgICAgIGlzQWNrSWRWYWxpZChwYWNrZXQuaWQpICYmXG4gICAgICAgIGlzRGF0YVZhbGlkKHBhY2tldC50eXBlLCBwYWNrZXQuZGF0YSkpO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIG9uKG9iaiwgZXYsIGZuKSB7XG4gICAgb2JqLm9uKGV2LCBmbik7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHN1YkRlc3Ryb3koKSB7XG4gICAgICAgIG9iai5vZmYoZXYsIGZuKTtcbiAgICB9O1xufVxuIiwiaW1wb3J0IHsgUGFja2V0VHlwZSB9IGZyb20gXCJzb2NrZXQuaW8tcGFyc2VyXCI7XG5pbXBvcnQgeyBvbiB9IGZyb20gXCIuL29uLmpzXCI7XG5pbXBvcnQgeyBFbWl0dGVyLCB9IGZyb20gXCJAc29ja2V0LmlvL2NvbXBvbmVudC1lbWl0dGVyXCI7XG4vKipcbiAqIEludGVybmFsIGV2ZW50cy5cbiAqIFRoZXNlIGV2ZW50cyBjYW4ndCBiZSBlbWl0dGVkIGJ5IHRoZSB1c2VyLlxuICovXG5jb25zdCBSRVNFUlZFRF9FVkVOVFMgPSBPYmplY3QuZnJlZXplKHtcbiAgICBjb25uZWN0OiAxLFxuICAgIGNvbm5lY3RfZXJyb3I6IDEsXG4gICAgZGlzY29ubmVjdDogMSxcbiAgICBkaXNjb25uZWN0aW5nOiAxLFxuICAgIC8vIEV2ZW50RW1pdHRlciByZXNlcnZlZCBldmVudHM6IGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvZXZlbnRzLmh0bWwjZXZlbnRzX2V2ZW50X25ld2xpc3RlbmVyXG4gICAgbmV3TGlzdGVuZXI6IDEsXG4gICAgcmVtb3ZlTGlzdGVuZXI6IDEsXG59KTtcbi8qKlxuICogQSBTb2NrZXQgaXMgdGhlIGZ1bmRhbWVudGFsIGNsYXNzIGZvciBpbnRlcmFjdGluZyB3aXRoIHRoZSBzZXJ2ZXIuXG4gKlxuICogQSBTb2NrZXQgYmVsb25ncyB0byBhIGNlcnRhaW4gTmFtZXNwYWNlIChieSBkZWZhdWx0IC8pIGFuZCB1c2VzIGFuIHVuZGVybHlpbmcge0BsaW5rIE1hbmFnZXJ9IHRvIGNvbW11bmljYXRlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBzb2NrZXQgPSBpbygpO1xuICpcbiAqIHNvY2tldC5vbihcImNvbm5lY3RcIiwgKCkgPT4ge1xuICogICBjb25zb2xlLmxvZyhcImNvbm5lY3RlZFwiKTtcbiAqIH0pO1xuICpcbiAqIC8vIHNlbmQgYW4gZXZlbnQgdG8gdGhlIHNlcnZlclxuICogc29ja2V0LmVtaXQoXCJmb29cIiwgXCJiYXJcIik7XG4gKlxuICogc29ja2V0Lm9uKFwiZm9vYmFyXCIsICgpID0+IHtcbiAqICAgLy8gYW4gZXZlbnQgd2FzIHJlY2VpdmVkIGZyb20gdGhlIHNlcnZlclxuICogfSk7XG4gKlxuICogLy8gdXBvbiBkaXNjb25uZWN0aW9uXG4gKiBzb2NrZXQub24oXCJkaXNjb25uZWN0XCIsIChyZWFzb24pID0+IHtcbiAqICAgY29uc29sZS5sb2coYGRpc2Nvbm5lY3RlZCBkdWUgdG8gJHtyZWFzb259YCk7XG4gKiB9KTtcbiAqL1xuZXhwb3J0IGNsYXNzIFNvY2tldCBleHRlbmRzIEVtaXR0ZXIge1xuICAgIC8qKlxuICAgICAqIGBTb2NrZXRgIGNvbnN0cnVjdG9yLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlvLCBuc3AsIG9wdHMpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdoZXRoZXIgdGhlIHNvY2tldCBpcyBjdXJyZW50bHkgY29ubmVjdGVkIHRvIHRoZSBzZXJ2ZXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIGNvbnN0IHNvY2tldCA9IGlvKCk7XG4gICAgICAgICAqXG4gICAgICAgICAqIHNvY2tldC5vbihcImNvbm5lY3RcIiwgKCkgPT4ge1xuICAgICAgICAgKiAgIGNvbnNvbGUubG9nKHNvY2tldC5jb25uZWN0ZWQpOyAvLyB0cnVlXG4gICAgICAgICAqIH0pO1xuICAgICAgICAgKlxuICAgICAgICAgKiBzb2NrZXQub24oXCJkaXNjb25uZWN0XCIsICgpID0+IHtcbiAgICAgICAgICogICBjb25zb2xlLmxvZyhzb2NrZXQuY29ubmVjdGVkKTsgLy8gZmFsc2VcbiAgICAgICAgICogfSk7XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogV2hldGhlciB0aGUgY29ubmVjdGlvbiBzdGF0ZSB3YXMgcmVjb3ZlcmVkIGFmdGVyIGEgdGVtcG9yYXJ5IGRpc2Nvbm5lY3Rpb24uIEluIHRoYXQgY2FzZSwgYW55IG1pc3NlZCBwYWNrZXRzIHdpbGxcbiAgICAgICAgICogYmUgdHJhbnNtaXR0ZWQgYnkgdGhlIHNlcnZlci5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmVjb3ZlcmVkID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCdWZmZXIgZm9yIHBhY2tldHMgcmVjZWl2ZWQgYmVmb3JlIHRoZSBDT05ORUNUIHBhY2tldFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZWNlaXZlQnVmZmVyID0gW107XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBCdWZmZXIgZm9yIHBhY2tldHMgdGhhdCB3aWxsIGJlIHNlbnQgb25jZSB0aGUgc29ja2V0IGlzIGNvbm5lY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgcXVldWUgb2YgcGFja2V0cyB0byBiZSBzZW50IHdpdGggcmV0cnkgaW4gY2FzZSBvZiBmYWlsdXJlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBQYWNrZXRzIGFyZSBzZW50IG9uZSBieSBvbmUsIGVhY2ggd2FpdGluZyBmb3IgdGhlIHNlcnZlciBhY2tub3dsZWRnZW1lbnQsIGluIG9yZGVyIHRvIGd1YXJhbnRlZSB0aGUgZGVsaXZlcnkgb3JkZXIuXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9xdWV1ZSA9IFtdO1xuICAgICAgICAvKipcbiAgICAgICAgICogQSBzZXF1ZW5jZSB0byBnZW5lcmF0ZSB0aGUgSUQgb2YgdGhlIHtAbGluayBRdWV1ZWRQYWNrZXR9LlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fcXVldWVTZXEgPSAwO1xuICAgICAgICB0aGlzLmlkcyA9IDA7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBIG1hcCBjb250YWluaW5nIGFja25vd2xlZGdlbWVudCBoYW5kbGVycy5cbiAgICAgICAgICpcbiAgICAgICAgICogVGhlIGB3aXRoRXJyb3JgIGF0dHJpYnV0ZSBpcyB1c2VkIHRvIGRpZmZlcmVudGlhdGUgaGFuZGxlcnMgdGhhdCBhY2NlcHQgYW4gZXJyb3IgYXMgZmlyc3QgYXJndW1lbnQ6XG4gICAgICAgICAqXG4gICAgICAgICAqIC0gYHNvY2tldC5lbWl0KFwidGVzdFwiLCAoZXJyLCB2YWx1ZSkgPT4geyAuLi4gfSlgIHdpdGggYGFja1RpbWVvdXRgIG9wdGlvblxuICAgICAgICAgKiAtIGBzb2NrZXQudGltZW91dCg1MDAwKS5lbWl0KFwidGVzdFwiLCAoZXJyLCB2YWx1ZSkgPT4geyAuLi4gfSlgXG4gICAgICAgICAqIC0gYGNvbnN0IHZhbHVlID0gYXdhaXQgc29ja2V0LmVtaXRXaXRoQWNrKFwidGVzdFwiKWBcbiAgICAgICAgICpcbiAgICAgICAgICogRnJvbSB0aG9zZSB0aGF0IGRvbid0OlxuICAgICAgICAgKlxuICAgICAgICAgKiAtIGBzb2NrZXQuZW1pdChcInRlc3RcIiwgKHZhbHVlKSA9PiB7IC4uLiB9KTtgXG4gICAgICAgICAqXG4gICAgICAgICAqIEluIHRoZSBmaXJzdCBjYXNlLCB0aGUgaGFuZGxlcnMgd2lsbCBiZSBjYWxsZWQgd2l0aCBhbiBlcnJvciB3aGVuOlxuICAgICAgICAgKlxuICAgICAgICAgKiAtIHRoZSB0aW1lb3V0IGlzIHJlYWNoZWRcbiAgICAgICAgICogLSB0aGUgc29ja2V0IGdldHMgZGlzY29ubmVjdGVkXG4gICAgICAgICAqXG4gICAgICAgICAqIEluIHRoZSBzZWNvbmQgY2FzZSwgdGhlIGhhbmRsZXJzIHdpbGwgYmUgc2ltcGx5IGRpc2NhcmRlZCB1cG9uIGRpc2Nvbm5lY3Rpb24sIHNpbmNlIHRoZSBjbGllbnQgd2lsbCBuZXZlciByZWNlaXZlXG4gICAgICAgICAqIGFuIGFja25vd2xlZGdlbWVudCBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmFja3MgPSB7fTtcbiAgICAgICAgdGhpcy5mbGFncyA9IHt9O1xuICAgICAgICB0aGlzLmlvID0gaW87XG4gICAgICAgIHRoaXMubnNwID0gbnNwO1xuICAgICAgICBpZiAob3B0cyAmJiBvcHRzLmF1dGgpIHtcbiAgICAgICAgICAgIHRoaXMuYXV0aCA9IG9wdHMuYXV0aDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9vcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0cyk7XG4gICAgICAgIGlmICh0aGlzLmlvLl9hdXRvQ29ubmVjdClcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRoZSBzb2NrZXQgaXMgY3VycmVudGx5IGRpc2Nvbm5lY3RlZFxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCBzb2NrZXQgPSBpbygpO1xuICAgICAqXG4gICAgICogc29ja2V0Lm9uKFwiY29ubmVjdFwiLCAoKSA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhzb2NrZXQuZGlzY29ubmVjdGVkKTsgLy8gZmFsc2VcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIHNvY2tldC5vbihcImRpc2Nvbm5lY3RcIiwgKCkgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coc29ja2V0LmRpc2Nvbm5lY3RlZCk7IC8vIHRydWVcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICBnZXQgZGlzY29ubmVjdGVkKCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuY29ubmVjdGVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmUgdG8gb3BlbiwgY2xvc2UgYW5kIHBhY2tldCBldmVudHNcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgc3ViRXZlbnRzKCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjb25zdCBpbyA9IHRoaXMuaW87XG4gICAgICAgIHRoaXMuc3VicyA9IFtcbiAgICAgICAgICAgIG9uKGlvLCBcIm9wZW5cIiwgdGhpcy5vbm9wZW4uYmluZCh0aGlzKSksXG4gICAgICAgICAgICBvbihpbywgXCJwYWNrZXRcIiwgdGhpcy5vbnBhY2tldC5iaW5kKHRoaXMpKSxcbiAgICAgICAgICAgIG9uKGlvLCBcImVycm9yXCIsIHRoaXMub25lcnJvci5iaW5kKHRoaXMpKSxcbiAgICAgICAgICAgIG9uKGlvLCBcImNsb3NlXCIsIHRoaXMub25jbG9zZS5iaW5kKHRoaXMpKSxcbiAgICAgICAgXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgU29ja2V0IHdpbGwgdHJ5IHRvIHJlY29ubmVjdCB3aGVuIGl0cyBNYW5hZ2VyIGNvbm5lY3RzIG9yIHJlY29ubmVjdHMuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IHNvY2tldCA9IGlvKCk7XG4gICAgICpcbiAgICAgKiBjb25zb2xlLmxvZyhzb2NrZXQuYWN0aXZlKTsgLy8gdHJ1ZVxuICAgICAqXG4gICAgICogc29ja2V0Lm9uKFwiZGlzY29ubmVjdFwiLCAocmVhc29uKSA9PiB7XG4gICAgICogICBpZiAocmVhc29uID09PSBcImlvIHNlcnZlciBkaXNjb25uZWN0XCIpIHtcbiAgICAgKiAgICAgLy8gdGhlIGRpc2Nvbm5lY3Rpb24gd2FzIGluaXRpYXRlZCBieSB0aGUgc2VydmVyLCB5b3UgbmVlZCB0byBtYW51YWxseSByZWNvbm5lY3RcbiAgICAgKiAgICAgY29uc29sZS5sb2coc29ja2V0LmFjdGl2ZSk7IC8vIGZhbHNlXG4gICAgICogICB9XG4gICAgICogICAvLyBlbHNlIHRoZSBzb2NrZXQgd2lsbCBhdXRvbWF0aWNhbGx5IHRyeSB0byByZWNvbm5lY3RcbiAgICAgKiAgIGNvbnNvbGUubG9nKHNvY2tldC5hY3RpdmUpOyAvLyB0cnVlXG4gICAgICogfSk7XG4gICAgICovXG4gICAgZ2V0IGFjdGl2ZSgpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zdWJzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBcIk9wZW5zXCIgdGhlIHNvY2tldC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3Qgc29ja2V0ID0gaW8oe1xuICAgICAqICAgYXV0b0Nvbm5lY3Q6IGZhbHNlXG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiBzb2NrZXQuY29ubmVjdCgpO1xuICAgICAqL1xuICAgIGNvbm5lY3QoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbm5lY3RlZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB0aGlzLnN1YkV2ZW50cygpO1xuICAgICAgICBpZiAoIXRoaXMuaW9bXCJfcmVjb25uZWN0aW5nXCJdKVxuICAgICAgICAgICAgdGhpcy5pby5vcGVuKCk7IC8vIGVuc3VyZSBvcGVuXG4gICAgICAgIGlmIChcIm9wZW5cIiA9PT0gdGhpcy5pby5fcmVhZHlTdGF0ZSlcbiAgICAgICAgICAgIHRoaXMub25vcGVuKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3Ige0BsaW5rIGNvbm5lY3QoKX0uXG4gICAgICovXG4gICAgb3BlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29ubmVjdCgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kcyBhIGBtZXNzYWdlYCBldmVudC5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIG1pbWljcyB0aGUgV2ViU29ja2V0LnNlbmQoKSBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9XZWJTb2NrZXQvc2VuZFxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzb2NrZXQuc2VuZChcImhlbGxvXCIpO1xuICAgICAqXG4gICAgICogLy8gdGhpcyBpcyBlcXVpdmFsZW50IHRvXG4gICAgICogc29ja2V0LmVtaXQoXCJtZXNzYWdlXCIsIFwiaGVsbG9cIik7XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKi9cbiAgICBzZW5kKC4uLmFyZ3MpIHtcbiAgICAgICAgYXJncy51bnNoaWZ0KFwibWVzc2FnZVwiKTtcbiAgICAgICAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3ZlcnJpZGUgYGVtaXRgLlxuICAgICAqIElmIHRoZSBldmVudCBpcyBpbiBgZXZlbnRzYCwgaXQncyBlbWl0dGVkIG5vcm1hbGx5LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzb2NrZXQuZW1pdChcImhlbGxvXCIsIFwid29ybGRcIik7XG4gICAgICpcbiAgICAgKiAvLyBhbGwgc2VyaWFsaXphYmxlIGRhdGFzdHJ1Y3R1cmVzIGFyZSBzdXBwb3J0ZWQgKG5vIG5lZWQgdG8gY2FsbCBKU09OLnN0cmluZ2lmeSlcbiAgICAgKiBzb2NrZXQuZW1pdChcImhlbGxvXCIsIDEsIFwiMlwiLCB7IDM6IFtcIjRcIl0sIDU6IFVpbnQ4QXJyYXkuZnJvbShbNl0pIH0pO1xuICAgICAqXG4gICAgICogLy8gd2l0aCBhbiBhY2tub3dsZWRnZW1lbnQgZnJvbSB0aGUgc2VydmVyXG4gICAgICogc29ja2V0LmVtaXQoXCJoZWxsb1wiLCBcIndvcmxkXCIsICh2YWwpID0+IHtcbiAgICAgKiAgIC8vIC4uLlxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICovXG4gICAgZW1pdChldiwgLi4uYXJncykge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgaWYgKFJFU0VSVkVEX0VWRU5UUy5oYXNPd25Qcm9wZXJ0eShldikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignXCInICsgZXYudG9TdHJpbmcoKSArICdcIiBpcyBhIHJlc2VydmVkIGV2ZW50IG5hbWUnKTtcbiAgICAgICAgfVxuICAgICAgICBhcmdzLnVuc2hpZnQoZXYpO1xuICAgICAgICBpZiAodGhpcy5fb3B0cy5yZXRyaWVzICYmICF0aGlzLmZsYWdzLmZyb21RdWV1ZSAmJiAhdGhpcy5mbGFncy52b2xhdGlsZSkge1xuICAgICAgICAgICAgdGhpcy5fYWRkVG9RdWV1ZShhcmdzKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhY2tldCA9IHtcbiAgICAgICAgICAgIHR5cGU6IFBhY2tldFR5cGUuRVZFTlQsXG4gICAgICAgICAgICBkYXRhOiBhcmdzLFxuICAgICAgICB9O1xuICAgICAgICBwYWNrZXQub3B0aW9ucyA9IHt9O1xuICAgICAgICBwYWNrZXQub3B0aW9ucy5jb21wcmVzcyA9IHRoaXMuZmxhZ3MuY29tcHJlc3MgIT09IGZhbHNlO1xuICAgICAgICAvLyBldmVudCBhY2sgY2FsbGJhY2tcbiAgICAgICAgaWYgKFwiZnVuY3Rpb25cIiA9PT0gdHlwZW9mIGFyZ3NbYXJncy5sZW5ndGggLSAxXSkge1xuICAgICAgICAgICAgY29uc3QgaWQgPSB0aGlzLmlkcysrO1xuICAgICAgICAgICAgY29uc3QgYWNrID0gYXJncy5wb3AoKTtcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVyQWNrQ2FsbGJhY2soaWQsIGFjayk7XG4gICAgICAgICAgICBwYWNrZXQuaWQgPSBpZDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpc1RyYW5zcG9ydFdyaXRhYmxlID0gKF9iID0gKF9hID0gdGhpcy5pby5lbmdpbmUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS50cmFuc3BvcnQpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi53cml0YWJsZTtcbiAgICAgICAgY29uc3QgaXNDb25uZWN0ZWQgPSB0aGlzLmNvbm5lY3RlZCAmJiAhKChfYyA9IHRoaXMuaW8uZW5naW5lKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuX2hhc1BpbmdFeHBpcmVkKCkpO1xuICAgICAgICBjb25zdCBkaXNjYXJkUGFja2V0ID0gdGhpcy5mbGFncy52b2xhdGlsZSAmJiAhaXNUcmFuc3BvcnRXcml0YWJsZTtcbiAgICAgICAgaWYgKGRpc2NhcmRQYWNrZXQpIHtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChpc0Nvbm5lY3RlZCkge1xuICAgICAgICAgICAgdGhpcy5ub3RpZnlPdXRnb2luZ0xpc3RlbmVycyhwYWNrZXQpO1xuICAgICAgICAgICAgdGhpcy5wYWNrZXQocGFja2V0KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5wdXNoKHBhY2tldCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5mbGFncyA9IHt9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcmVnaXN0ZXJBY2tDYWxsYmFjayhpZCwgYWNrKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgdGltZW91dCA9IChfYSA9IHRoaXMuZmxhZ3MudGltZW91dCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5fb3B0cy5hY2tUaW1lb3V0O1xuICAgICAgICBpZiAodGltZW91dCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmFja3NbaWRdID0gYWNrO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc3QgdGltZXIgPSB0aGlzLmlvLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5hY2tzW2lkXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zZW5kQnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc2VuZEJ1ZmZlcltpXS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZW5kQnVmZmVyLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhY2suY2FsbCh0aGlzLCBuZXcgRXJyb3IoXCJvcGVyYXRpb24gaGFzIHRpbWVkIG91dFwiKSk7XG4gICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICBjb25zdCBmbiA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICB0aGlzLmlvLmNsZWFyVGltZW91dEZuKHRpbWVyKTtcbiAgICAgICAgICAgIGFjay5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfTtcbiAgICAgICAgZm4ud2l0aEVycm9yID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hY2tzW2lkXSA9IGZuO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbWl0cyBhbiBldmVudCBhbmQgd2FpdHMgZm9yIGFuIGFja25vd2xlZGdlbWVudFxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiAvLyB3aXRob3V0IHRpbWVvdXRcbiAgICAgKiBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNvY2tldC5lbWl0V2l0aEFjayhcImhlbGxvXCIsIFwid29ybGRcIik7XG4gICAgICpcbiAgICAgKiAvLyB3aXRoIGEgc3BlY2lmaWMgdGltZW91dFxuICAgICAqIHRyeSB7XG4gICAgICogICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHNvY2tldC50aW1lb3V0KDEwMDApLmVtaXRXaXRoQWNrKFwiaGVsbG9cIiwgXCJ3b3JsZFwiKTtcbiAgICAgKiB9IGNhdGNoIChlcnIpIHtcbiAgICAgKiAgIC8vIHRoZSBzZXJ2ZXIgZGlkIG5vdCBhY2tub3dsZWRnZSB0aGUgZXZlbnQgaW4gdGhlIGdpdmVuIGRlbGF5XG4gICAgICogfVxuICAgICAqXG4gICAgICogQHJldHVybiBhIFByb21pc2UgdGhhdCB3aWxsIGJlIGZ1bGZpbGxlZCB3aGVuIHRoZSBzZXJ2ZXIgYWNrbm93bGVkZ2VzIHRoZSBldmVudFxuICAgICAqL1xuICAgIGVtaXRXaXRoQWNrKGV2LCAuLi5hcmdzKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmbiA9IChhcmcxLCBhcmcyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFyZzEgPyByZWplY3QoYXJnMSkgOiByZXNvbHZlKGFyZzIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZuLndpdGhFcnJvciA9IHRydWU7XG4gICAgICAgICAgICBhcmdzLnB1c2goZm4pO1xuICAgICAgICAgICAgdGhpcy5lbWl0KGV2LCAuLi5hcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCB0aGUgcGFja2V0IHRvIHRoZSBxdWV1ZS5cbiAgICAgKiBAcGFyYW0gYXJnc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2FkZFRvUXVldWUoYXJncykge1xuICAgICAgICBsZXQgYWNrO1xuICAgICAgICBpZiAodHlwZW9mIGFyZ3NbYXJncy5sZW5ndGggLSAxXSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICBhY2sgPSBhcmdzLnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHBhY2tldCA9IHtcbiAgICAgICAgICAgIGlkOiB0aGlzLl9xdWV1ZVNlcSsrLFxuICAgICAgICAgICAgdHJ5Q291bnQ6IDAsXG4gICAgICAgICAgICBwZW5kaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIGFyZ3MsXG4gICAgICAgICAgICBmbGFnczogT2JqZWN0LmFzc2lnbih7IGZyb21RdWV1ZTogdHJ1ZSB9LCB0aGlzLmZsYWdzKSxcbiAgICAgICAgfTtcbiAgICAgICAgYXJncy5wdXNoKChlcnIsIC4uLnJlc3BvbnNlQXJncykgPT4ge1xuICAgICAgICAgICAgaWYgKHBhY2tldCAhPT0gdGhpcy5fcXVldWVbMF0pIHtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGhhc0Vycm9yID0gZXJyICE9PSBudWxsO1xuICAgICAgICAgICAgaWYgKGhhc0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhY2tldC50cnlDb3VudCA+IHRoaXMuX29wdHMucmV0cmllcykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9xdWV1ZS5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhY2soZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3F1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgaWYgKGFjaykge1xuICAgICAgICAgICAgICAgICAgICBhY2sobnVsbCwgLi4ucmVzcG9uc2VBcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYWNrZXQucGVuZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RyYWluUXVldWUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX3F1ZXVlLnB1c2gocGFja2V0KTtcbiAgICAgICAgdGhpcy5fZHJhaW5RdWV1ZSgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZW5kIHRoZSBmaXJzdCBwYWNrZXQgb2YgdGhlIHF1ZXVlLCBhbmQgd2FpdCBmb3IgYW4gYWNrbm93bGVkZ2VtZW50IGZyb20gdGhlIHNlcnZlci5cbiAgICAgKiBAcGFyYW0gZm9yY2UgLSB3aGV0aGVyIHRvIHJlc2VuZCBhIHBhY2tldCB0aGF0IGhhcyBub3QgYmVlbiBhY2tub3dsZWRnZWQgeWV0XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9kcmFpblF1ZXVlKGZvcmNlID0gZmFsc2UpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbm5lY3RlZCB8fCB0aGlzLl9xdWV1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwYWNrZXQgPSB0aGlzLl9xdWV1ZVswXTtcbiAgICAgICAgaWYgKHBhY2tldC5wZW5kaW5nICYmICFmb3JjZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHBhY2tldC5wZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgcGFja2V0LnRyeUNvdW50Kys7XG4gICAgICAgIHRoaXMuZmxhZ3MgPSBwYWNrZXQuZmxhZ3M7XG4gICAgICAgIHRoaXMuZW1pdC5hcHBseSh0aGlzLCBwYWNrZXQuYXJncyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbmRzIGEgcGFja2V0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcGFja2V0KHBhY2tldCkge1xuICAgICAgICBwYWNrZXQubnNwID0gdGhpcy5uc3A7XG4gICAgICAgIHRoaXMuaW8uX3BhY2tldChwYWNrZXQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlbmdpbmUgYG9wZW5gLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbm9wZW4oKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5hdXRoID09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgdGhpcy5hdXRoKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2VuZENvbm5lY3RQYWNrZXQoZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbmRDb25uZWN0UGFja2V0KHRoaXMuYXV0aCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogU2VuZHMgYSBDT05ORUNUIHBhY2tldCB0byBpbml0aWF0ZSB0aGUgU29ja2V0LklPIHNlc3Npb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZGF0YVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3NlbmRDb25uZWN0UGFja2V0KGRhdGEpIHtcbiAgICAgICAgdGhpcy5wYWNrZXQoe1xuICAgICAgICAgICAgdHlwZTogUGFja2V0VHlwZS5DT05ORUNULFxuICAgICAgICAgICAgZGF0YTogdGhpcy5fcGlkXG4gICAgICAgICAgICAgICAgPyBPYmplY3QuYXNzaWduKHsgcGlkOiB0aGlzLl9waWQsIG9mZnNldDogdGhpcy5fbGFzdE9mZnNldCB9LCBkYXRhKVxuICAgICAgICAgICAgICAgIDogZGF0YSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGVuZ2luZSBvciBtYW5hZ2VyIGBlcnJvcmAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gZXJyXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmVycm9yKGVycikge1xuICAgICAgICBpZiAoIXRoaXMuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNvbm5lY3RfZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBlbmdpbmUgYGNsb3NlYC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSByZWFzb25cbiAgICAgKiBAcGFyYW0gZGVzY3JpcHRpb25cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uY2xvc2UocmVhc29uLCBkZXNjcmlwdGlvbikge1xuICAgICAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgICAgICBkZWxldGUgdGhpcy5pZDtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJkaXNjb25uZWN0XCIsIHJlYXNvbiwgZGVzY3JpcHRpb24pO1xuICAgICAgICB0aGlzLl9jbGVhckFja3MoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2xlYXJzIHRoZSBhY2tub3dsZWRnZW1lbnQgaGFuZGxlcnMgdXBvbiBkaXNjb25uZWN0aW9uLCBzaW5jZSB0aGUgY2xpZW50IHdpbGwgbmV2ZXIgcmVjZWl2ZSBhbiBhY2tub3dsZWRnZW1lbnQgZnJvbVxuICAgICAqIHRoZSBzZXJ2ZXIuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9jbGVhckFja3MoKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuYWNrcykuZm9yRWFjaCgoaWQpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGlzQnVmZmVyZWQgPSB0aGlzLnNlbmRCdWZmZXIuc29tZSgocGFja2V0KSA9PiBTdHJpbmcocGFja2V0LmlkKSA9PT0gaWQpO1xuICAgICAgICAgICAgaWYgKCFpc0J1ZmZlcmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gbm90ZTogaGFuZGxlcnMgdGhhdCBkbyBub3QgYWNjZXB0IGFuIGVycm9yIGFzIGZpcnN0IGFyZ3VtZW50IGFyZSBpZ25vcmVkIGhlcmVcbiAgICAgICAgICAgICAgICBjb25zdCBhY2sgPSB0aGlzLmFja3NbaWRdO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmFja3NbaWRdO1xuICAgICAgICAgICAgICAgIGlmIChhY2sud2l0aEVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjay5jYWxsKHRoaXMsIG5ldyBFcnJvcihcInNvY2tldCBoYXMgYmVlbiBkaXNjb25uZWN0ZWRcIikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB3aXRoIHNvY2tldCBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gcGFja2V0XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbnBhY2tldChwYWNrZXQpIHtcbiAgICAgICAgY29uc3Qgc2FtZU5hbWVzcGFjZSA9IHBhY2tldC5uc3AgPT09IHRoaXMubnNwO1xuICAgICAgICBpZiAoIXNhbWVOYW1lc3BhY2UpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHN3aXRjaCAocGFja2V0LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5DT05ORUNUOlxuICAgICAgICAgICAgICAgIGlmIChwYWNrZXQuZGF0YSAmJiBwYWNrZXQuZGF0YS5zaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbmNvbm5lY3QocGFja2V0LmRhdGEuc2lkLCBwYWNrZXQuZGF0YS5waWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJjb25uZWN0X2Vycm9yXCIsIG5ldyBFcnJvcihcIkl0IHNlZW1zIHlvdSBhcmUgdHJ5aW5nIHRvIHJlYWNoIGEgU29ja2V0LklPIHNlcnZlciBpbiB2Mi54IHdpdGggYSB2My54IGNsaWVudCwgYnV0IHRoZXkgYXJlIG5vdCBjb21wYXRpYmxlIChtb3JlIGluZm9ybWF0aW9uIGhlcmU6IGh0dHBzOi8vc29ja2V0LmlvL2RvY3MvdjMvbWlncmF0aW5nLWZyb20tMi14LXRvLTMtMC8pXCIpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuRVZFTlQ6XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQklOQVJZX0VWRU5UOlxuICAgICAgICAgICAgICAgIHRoaXMub25ldmVudChwYWNrZXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBQYWNrZXRUeXBlLkFDSzpcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5CSU5BUllfQUNLOlxuICAgICAgICAgICAgICAgIHRoaXMub25hY2socGFja2V0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgUGFja2V0VHlwZS5ESVNDT05ORUNUOlxuICAgICAgICAgICAgICAgIHRoaXMub25kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFBhY2tldFR5cGUuQ09OTkVDVF9FUlJPUjpcbiAgICAgICAgICAgICAgICB0aGlzLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IocGFja2V0LmRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgZXJyLmRhdGEgPSBwYWNrZXQuZGF0YS5kYXRhO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwiY29ubmVjdF9lcnJvclwiLCBlcnIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGEgc2VydmVyIGV2ZW50LlxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25ldmVudChwYWNrZXQpIHtcbiAgICAgICAgY29uc3QgYXJncyA9IHBhY2tldC5kYXRhIHx8IFtdO1xuICAgICAgICBpZiAobnVsbCAhPSBwYWNrZXQuaWQpIHtcbiAgICAgICAgICAgIGFyZ3MucHVzaCh0aGlzLmFjayhwYWNrZXQuaWQpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdEV2ZW50KGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZWNlaXZlQnVmZmVyLnB1c2goT2JqZWN0LmZyZWV6ZShhcmdzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZW1pdEV2ZW50KGFyZ3MpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FueUxpc3RlbmVycyAmJiB0aGlzLl9hbnlMaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9hbnlMaXN0ZW5lcnMuc2xpY2UoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3VwZXIuZW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgaWYgKHRoaXMuX3BpZCAmJiBhcmdzLmxlbmd0aCAmJiB0eXBlb2YgYXJnc1thcmdzLmxlbmd0aCAtIDFdID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB0aGlzLl9sYXN0T2Zmc2V0ID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByb2R1Y2VzIGFuIGFjayBjYWxsYmFjayB0byBlbWl0IHdpdGggYW4gZXZlbnQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGFjayhpZCkge1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IHNlbnQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgICAgICAvLyBwcmV2ZW50IGRvdWJsZSBjYWxsYmFja3NcbiAgICAgICAgICAgIGlmIChzZW50KVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHNlbnQgPSB0cnVlO1xuICAgICAgICAgICAgc2VsZi5wYWNrZXQoe1xuICAgICAgICAgICAgICAgIHR5cGU6IFBhY2tldFR5cGUuQUNLLFxuICAgICAgICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICAgICAgICBkYXRhOiBhcmdzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGEgc2VydmVyIGFja25vd2xlZGdlbWVudC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uYWNrKHBhY2tldCkge1xuICAgICAgICBjb25zdCBhY2sgPSB0aGlzLmFja3NbcGFja2V0LmlkXTtcbiAgICAgICAgaWYgKHR5cGVvZiBhY2sgIT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRlbGV0ZSB0aGlzLmFja3NbcGFja2V0LmlkXTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZSBGSVhNRSBhY2sgaXMgaW5jb3JyZWN0bHkgaW5mZXJyZWQgYXMgJ25ldmVyJ1xuICAgICAgICBpZiAoYWNrLndpdGhFcnJvcikge1xuICAgICAgICAgICAgcGFja2V0LmRhdGEudW5zaGlmdChudWxsKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGFjay5hcHBseSh0aGlzLCBwYWNrZXQuZGF0YSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHNlcnZlciBjb25uZWN0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmNvbm5lY3QoaWQsIHBpZCkge1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMucmVjb3ZlcmVkID0gcGlkICYmIHRoaXMuX3BpZCA9PT0gcGlkO1xuICAgICAgICB0aGlzLl9waWQgPSBwaWQ7IC8vIGRlZmluZWQgb25seSBpZiBjb25uZWN0aW9uIHN0YXRlIHJlY292ZXJ5IGlzIGVuYWJsZWRcbiAgICAgICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmVtaXRCdWZmZXJlZCgpO1xuICAgICAgICB0aGlzLl9kcmFpblF1ZXVlKHRydWUpO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNvbm5lY3RcIik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEVtaXQgYnVmZmVyZWQgZXZlbnRzIChyZWNlaXZlZCBhbmQgZW1pdHRlZCkuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGVtaXRCdWZmZXJlZCgpIHtcbiAgICAgICAgdGhpcy5yZWNlaXZlQnVmZmVyLmZvckVhY2goKGFyZ3MpID0+IHRoaXMuZW1pdEV2ZW50KGFyZ3MpKTtcbiAgICAgICAgdGhpcy5yZWNlaXZlQnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuc2VuZEJ1ZmZlci5mb3JFYWNoKChwYWNrZXQpID0+IHtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5T3V0Z29pbmdMaXN0ZW5lcnMocGFja2V0KTtcbiAgICAgICAgICAgIHRoaXMucGFja2V0KHBhY2tldCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNlbmRCdWZmZXIgPSBbXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gc2VydmVyIGRpc2Nvbm5lY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uZGlzY29ubmVjdCgpIHtcbiAgICAgICAgdGhpcy5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMub25jbG9zZShcImlvIHNlcnZlciBkaXNjb25uZWN0XCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBmb3JjZWQgY2xpZW50L3NlcnZlciBzaWRlIGRpc2Nvbm5lY3Rpb25zLFxuICAgICAqIHRoaXMgbWV0aG9kIGVuc3VyZXMgdGhlIG1hbmFnZXIgc3RvcHMgdHJhY2tpbmcgdXMgYW5kXG4gICAgICogdGhhdCByZWNvbm5lY3Rpb25zIGRvbid0IGdldCB0cmlnZ2VyZWQgZm9yIHRoaXMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnMpIHtcbiAgICAgICAgICAgIC8vIGNsZWFuIHN1YnNjcmlwdGlvbnMgdG8gYXZvaWQgcmVjb25uZWN0aW9uc1xuICAgICAgICAgICAgdGhpcy5zdWJzLmZvckVhY2goKHN1YkRlc3Ryb3kpID0+IHN1YkRlc3Ryb3koKSk7XG4gICAgICAgICAgICB0aGlzLnN1YnMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pb1tcIl9kZXN0cm95XCJdKHRoaXMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNjb25uZWN0cyB0aGUgc29ja2V0IG1hbnVhbGx5LiBJbiB0aGF0IGNhc2UsIHRoZSBzb2NrZXQgd2lsbCBub3QgdHJ5IHRvIHJlY29ubmVjdC5cbiAgICAgKlxuICAgICAqIElmIHRoaXMgaXMgdGhlIGxhc3QgYWN0aXZlIFNvY2tldCBpbnN0YW5jZSBvZiB0aGUge0BsaW5rIE1hbmFnZXJ9LCB0aGUgbG93LWxldmVsIGNvbm5lY3Rpb24gd2lsbCBiZSBjbG9zZWQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IHNvY2tldCA9IGlvKCk7XG4gICAgICpcbiAgICAgKiBzb2NrZXQub24oXCJkaXNjb25uZWN0XCIsIChyZWFzb24pID0+IHtcbiAgICAgKiAgIC8vIGNvbnNvbGUubG9nKHJlYXNvbik7IHByaW50cyBcImlvIGNsaWVudCBkaXNjb25uZWN0XCJcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIHNvY2tldC5kaXNjb25uZWN0KCk7XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHNlbGZcbiAgICAgKi9cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMucGFja2V0KHsgdHlwZTogUGFja2V0VHlwZS5ESVNDT05ORUNUIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJlbW92ZSBzb2NrZXQgZnJvbSBwb29sXG4gICAgICAgIHRoaXMuZGVzdHJveSgpO1xuICAgICAgICBpZiAodGhpcy5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIC8vIGZpcmUgZXZlbnRzXG4gICAgICAgICAgICB0aGlzLm9uY2xvc2UoXCJpbyBjbGllbnQgZGlzY29ubmVjdFwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWxpYXMgZm9yIHtAbGluayBkaXNjb25uZWN0KCl9LlxuICAgICAqXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICovXG4gICAgY2xvc2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpc2Nvbm5lY3QoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgY29tcHJlc3MgZmxhZy5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc29ja2V0LmNvbXByZXNzKGZhbHNlKS5lbWl0KFwiaGVsbG9cIik7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gY29tcHJlc3MgLSBpZiBgdHJ1ZWAsIGNvbXByZXNzZXMgdGhlIHNlbmRpbmcgZGF0YVxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqL1xuICAgIGNvbXByZXNzKGNvbXByZXNzKSB7XG4gICAgICAgIHRoaXMuZmxhZ3MuY29tcHJlc3MgPSBjb21wcmVzcztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgYSBtb2RpZmllciBmb3IgYSBzdWJzZXF1ZW50IGV2ZW50IGVtaXNzaW9uIHRoYXQgdGhlIGV2ZW50IG1lc3NhZ2Ugd2lsbCBiZSBkcm9wcGVkIHdoZW4gdGhpcyBzb2NrZXQgaXMgbm90XG4gICAgICogcmVhZHkgdG8gc2VuZCBtZXNzYWdlcy5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc29ja2V0LnZvbGF0aWxlLmVtaXQoXCJoZWxsb1wiKTsgLy8gdGhlIHNlcnZlciBtYXkgb3IgbWF5IG5vdCByZWNlaXZlIGl0XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBzZWxmXG4gICAgICovXG4gICAgZ2V0IHZvbGF0aWxlKCkge1xuICAgICAgICB0aGlzLmZsYWdzLnZvbGF0aWxlID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNldHMgYSBtb2RpZmllciBmb3IgYSBzdWJzZXF1ZW50IGV2ZW50IGVtaXNzaW9uIHRoYXQgdGhlIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHdpdGggYW4gZXJyb3Igd2hlbiB0aGVcbiAgICAgKiBnaXZlbiBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCB3aXRob3V0IGFuIGFja25vd2xlZGdlbWVudCBmcm9tIHRoZSBzZXJ2ZXI6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHNvY2tldC50aW1lb3V0KDUwMDApLmVtaXQoXCJteS1ldmVudFwiLCAoZXJyKSA9PiB7XG4gICAgICogICBpZiAoZXJyKSB7XG4gICAgICogICAgIC8vIHRoZSBzZXJ2ZXIgZGlkIG5vdCBhY2tub3dsZWRnZSB0aGUgZXZlbnQgaW4gdGhlIGdpdmVuIGRlbGF5XG4gICAgICogICB9XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyBzZWxmXG4gICAgICovXG4gICAgdGltZW91dCh0aW1lb3V0KSB7XG4gICAgICAgIHRoaXMuZmxhZ3MudGltZW91dCA9IHRpbWVvdXQ7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuIFRoZSBldmVudCBuYW1lIGlzIHBhc3NlZCBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlXG4gICAgICogY2FsbGJhY2suXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHNvY2tldC5vbkFueSgoZXZlbnQsIC4uLmFyZ3MpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGBnb3QgJHtldmVudH1gKTtcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsaXN0ZW5lclxuICAgICAqL1xuICAgIG9uQW55KGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuX2FueUxpc3RlbmVycyA9IHRoaXMuX2FueUxpc3RlbmVycyB8fCBbXTtcbiAgICAgICAgdGhpcy5fYW55TGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFueSBldmVudCBpcyBlbWl0dGVkLiBUaGUgZXZlbnQgbmFtZSBpcyBwYXNzZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZVxuICAgICAqIGNhbGxiYWNrLiBUaGUgbGlzdGVuZXIgaXMgYWRkZWQgdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgbGlzdGVuZXJzIGFycmF5LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzb2NrZXQucHJlcGVuZEFueSgoZXZlbnQsIC4uLmFyZ3MpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGBnb3QgZXZlbnQgJHtldmVudH1gKTtcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSBsaXN0ZW5lclxuICAgICAqL1xuICAgIHByZXBlbmRBbnkobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5fYW55TGlzdGVuZXJzID0gdGhpcy5fYW55TGlzdGVuZXJzIHx8IFtdO1xuICAgICAgICB0aGlzLl9hbnlMaXN0ZW5lcnMudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBhbnkgZXZlbnQgaXMgZW1pdHRlZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3QgY2F0Y2hBbGxMaXN0ZW5lciA9IChldmVudCwgLi4uYXJncykgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coYGdvdCBldmVudCAke2V2ZW50fWApO1xuICAgICAqIH1cbiAgICAgKlxuICAgICAqIHNvY2tldC5vbkFueShjYXRjaEFsbExpc3RlbmVyKTtcbiAgICAgKlxuICAgICAqIC8vIHJlbW92ZSBhIHNwZWNpZmljIGxpc3RlbmVyXG4gICAgICogc29ja2V0Lm9mZkFueShjYXRjaEFsbExpc3RlbmVyKTtcbiAgICAgKlxuICAgICAqIC8vIG9yIHJlbW92ZSBhbGwgbGlzdGVuZXJzXG4gICAgICogc29ja2V0Lm9mZkFueSgpO1xuICAgICAqXG4gICAgICogQHBhcmFtIGxpc3RlbmVyXG4gICAgICovXG4gICAgb2ZmQW55KGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5fYW55TGlzdGVuZXJzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBpZiAobGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGNvbnN0IGxpc3RlbmVycyA9IHRoaXMuX2FueUxpc3RlbmVycztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyID09PSBsaXN0ZW5lcnNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYW55TGlzdGVuZXJzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRoYXQgYXJlIGxpc3RlbmluZyBmb3IgYW55IGV2ZW50IHRoYXQgaXMgc3BlY2lmaWVkLiBUaGlzIGFycmF5IGNhbiBiZSBtYW5pcHVsYXRlZCxcbiAgICAgKiBlLmcuIHRvIHJlbW92ZSBsaXN0ZW5lcnMuXG4gICAgICovXG4gICAgbGlzdGVuZXJzQW55KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYW55TGlzdGVuZXJzIHx8IFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGZpcmVkIHdoZW4gYW55IGV2ZW50IGlzIGVtaXR0ZWQuIFRoZSBldmVudCBuYW1lIGlzIHBhc3NlZCBhcyB0aGUgZmlyc3QgYXJndW1lbnQgdG8gdGhlXG4gICAgICogY2FsbGJhY2suXG4gICAgICpcbiAgICAgKiBOb3RlOiBhY2tub3dsZWRnZW1lbnRzIHNlbnQgdG8gdGhlIHNlcnZlciBhcmUgbm90IGluY2x1ZGVkLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBzb2NrZXQub25BbnlPdXRnb2luZygoZXZlbnQsIC4uLmFyZ3MpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGBzZW50IGV2ZW50ICR7ZXZlbnR9YCk7XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBvbkFueU91dGdvaW5nKGxpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzID0gdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMgfHwgW107XG4gICAgICAgIHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIHRoYXQgd2lsbCBiZSBmaXJlZCB3aGVuIGFueSBldmVudCBpcyBlbWl0dGVkLiBUaGUgZXZlbnQgbmFtZSBpcyBwYXNzZWQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIHRoZVxuICAgICAqIGNhbGxiYWNrLiBUaGUgbGlzdGVuZXIgaXMgYWRkZWQgdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgbGlzdGVuZXJzIGFycmF5LlxuICAgICAqXG4gICAgICogTm90ZTogYWNrbm93bGVkZ2VtZW50cyBzZW50IHRvIHRoZSBzZXJ2ZXIgYXJlIG5vdCBpbmNsdWRlZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogc29ja2V0LnByZXBlbmRBbnlPdXRnb2luZygoZXZlbnQsIC4uLmFyZ3MpID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKGBzZW50IGV2ZW50ICR7ZXZlbnR9YCk7XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gbGlzdGVuZXJcbiAgICAgKi9cbiAgICBwcmVwZW5kQW55T3V0Z29pbmcobGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMgPSB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycyB8fCBbXTtcbiAgICAgICAgdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMudW5zaGlmdChsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIHRoZSBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgZmlyZWQgd2hlbiBhbnkgZXZlbnQgaXMgZW1pdHRlZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3QgY2F0Y2hBbGxMaXN0ZW5lciA9IChldmVudCwgLi4uYXJncykgPT4ge1xuICAgICAqICAgY29uc29sZS5sb2coYHNlbnQgZXZlbnQgJHtldmVudH1gKTtcbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBzb2NrZXQub25BbnlPdXRnb2luZyhjYXRjaEFsbExpc3RlbmVyKTtcbiAgICAgKlxuICAgICAqIC8vIHJlbW92ZSBhIHNwZWNpZmljIGxpc3RlbmVyXG4gICAgICogc29ja2V0Lm9mZkFueU91dGdvaW5nKGNhdGNoQWxsTGlzdGVuZXIpO1xuICAgICAqXG4gICAgICogLy8gb3IgcmVtb3ZlIGFsbCBsaXN0ZW5lcnNcbiAgICAgKiBzb2NrZXQub2ZmQW55T3V0Z29pbmcoKTtcbiAgICAgKlxuICAgICAqIEBwYXJhbSBbbGlzdGVuZXJdIC0gdGhlIGNhdGNoLWFsbCBsaXN0ZW5lciAob3B0aW9uYWwpXG4gICAgICovXG4gICAgb2ZmQW55T3V0Z29pbmcobGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLl9hbnlPdXRnb2luZ0xpc3RlbmVycztcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RlbmVyID09PSBsaXN0ZW5lcnNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdGhhdCBhcmUgbGlzdGVuaW5nIGZvciBhbnkgZXZlbnQgdGhhdCBpcyBzcGVjaWZpZWQuIFRoaXMgYXJyYXkgY2FuIGJlIG1hbmlwdWxhdGVkLFxuICAgICAqIGUuZy4gdG8gcmVtb3ZlIGxpc3RlbmVycy5cbiAgICAgKi9cbiAgICBsaXN0ZW5lcnNBbnlPdXRnb2luZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzIHx8IFtdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBOb3RpZnkgdGhlIGxpc3RlbmVycyBmb3IgZWFjaCBwYWNrZXQgc2VudFxuICAgICAqXG4gICAgICogQHBhcmFtIHBhY2tldFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBub3RpZnlPdXRnb2luZ0xpc3RlbmVycyhwYWNrZXQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzICYmIHRoaXMuX2FueU91dGdvaW5nTGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5fYW55T3V0Z29pbmdMaXN0ZW5lcnMuc2xpY2UoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgbGlzdGVuZXIgb2YgbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIuYXBwbHkodGhpcywgcGFja2V0LmRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuIiwiLyoqXG4gKiBJbml0aWFsaXplIGJhY2tvZmYgdGltZXIgd2l0aCBgb3B0c2AuXG4gKlxuICogLSBgbWluYCBpbml0aWFsIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIFsxMDBdXG4gKiAtIGBtYXhgIG1heCB0aW1lb3V0IFsxMDAwMF1cbiAqIC0gYGppdHRlcmAgWzBdXG4gKiAtIGBmYWN0b3JgIFsyXVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5leHBvcnQgZnVuY3Rpb24gQmFja29mZihvcHRzKSB7XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgdGhpcy5tcyA9IG9wdHMubWluIHx8IDEwMDtcbiAgICB0aGlzLm1heCA9IG9wdHMubWF4IHx8IDEwMDAwO1xuICAgIHRoaXMuZmFjdG9yID0gb3B0cy5mYWN0b3IgfHwgMjtcbiAgICB0aGlzLmppdHRlciA9IG9wdHMuaml0dGVyID4gMCAmJiBvcHRzLmppdHRlciA8PSAxID8gb3B0cy5qaXR0ZXIgOiAwO1xuICAgIHRoaXMuYXR0ZW1wdHMgPSAwO1xufVxuLyoqXG4gKiBSZXR1cm4gdGhlIGJhY2tvZmYgZHVyYXRpb24uXG4gKlxuICogQHJldHVybiB7TnVtYmVyfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuQmFja29mZi5wcm90b3R5cGUuZHVyYXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIG1zID0gdGhpcy5tcyAqIE1hdGgucG93KHRoaXMuZmFjdG9yLCB0aGlzLmF0dGVtcHRzKyspO1xuICAgIGlmICh0aGlzLmppdHRlcikge1xuICAgICAgICB2YXIgcmFuZCA9IE1hdGgucmFuZG9tKCk7XG4gICAgICAgIHZhciBkZXZpYXRpb24gPSBNYXRoLmZsb29yKHJhbmQgKiB0aGlzLmppdHRlciAqIG1zKTtcbiAgICAgICAgbXMgPSAoTWF0aC5mbG9vcihyYW5kICogMTApICYgMSkgPT0gMCA/IG1zIC0gZGV2aWF0aW9uIDogbXMgKyBkZXZpYXRpb247XG4gICAgfVxuICAgIHJldHVybiBNYXRoLm1pbihtcywgdGhpcy5tYXgpIHwgMDtcbn07XG4vKipcbiAqIFJlc2V0IHRoZSBudW1iZXIgb2YgYXR0ZW1wdHMuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuQmFja29mZi5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5hdHRlbXB0cyA9IDA7XG59O1xuLyoqXG4gKiBTZXQgdGhlIG1pbmltdW0gZHVyYXRpb25cbiAqXG4gKiBAYXBpIHB1YmxpY1xuICovXG5CYWNrb2ZmLnByb3RvdHlwZS5zZXRNaW4gPSBmdW5jdGlvbiAobWluKSB7XG4gICAgdGhpcy5tcyA9IG1pbjtcbn07XG4vKipcbiAqIFNldCB0aGUgbWF4aW11bSBkdXJhdGlvblxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cbkJhY2tvZmYucHJvdG90eXBlLnNldE1heCA9IGZ1bmN0aW9uIChtYXgpIHtcbiAgICB0aGlzLm1heCA9IG1heDtcbn07XG4vKipcbiAqIFNldCB0aGUgaml0dGVyXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuQmFja29mZi5wcm90b3R5cGUuc2V0Sml0dGVyID0gZnVuY3Rpb24gKGppdHRlcikge1xuICAgIHRoaXMuaml0dGVyID0gaml0dGVyO1xufTtcbiIsImltcG9ydCB7IFNvY2tldCBhcyBFbmdpbmUsIGluc3RhbGxUaW1lckZ1bmN0aW9ucywgbmV4dFRpY2ssIH0gZnJvbSBcImVuZ2luZS5pby1jbGllbnRcIjtcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gXCIuL3NvY2tldC5qc1wiO1xuaW1wb3J0ICogYXMgcGFyc2VyIGZyb20gXCJzb2NrZXQuaW8tcGFyc2VyXCI7XG5pbXBvcnQgeyBvbiB9IGZyb20gXCIuL29uLmpzXCI7XG5pbXBvcnQgeyBCYWNrb2ZmIH0gZnJvbSBcIi4vY29udHJpYi9iYWNrbzIuanNcIjtcbmltcG9ydCB7IEVtaXR0ZXIsIH0gZnJvbSBcIkBzb2NrZXQuaW8vY29tcG9uZW50LWVtaXR0ZXJcIjtcbmV4cG9ydCBjbGFzcyBNYW5hZ2VyIGV4dGVuZHMgRW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IodXJpLCBvcHRzKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5uc3BzID0ge307XG4gICAgICAgIHRoaXMuc3VicyA9IFtdO1xuICAgICAgICBpZiAodXJpICYmIFwib2JqZWN0XCIgPT09IHR5cGVvZiB1cmkpIHtcbiAgICAgICAgICAgIG9wdHMgPSB1cmk7XG4gICAgICAgICAgICB1cmkgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgICAgIG9wdHMucGF0aCA9IG9wdHMucGF0aCB8fCBcIi9zb2NrZXQuaW9cIjtcbiAgICAgICAgdGhpcy5vcHRzID0gb3B0cztcbiAgICAgICAgaW5zdGFsbFRpbWVyRnVuY3Rpb25zKHRoaXMsIG9wdHMpO1xuICAgICAgICB0aGlzLnJlY29ubmVjdGlvbihvcHRzLnJlY29ubmVjdGlvbiAhPT0gZmFsc2UpO1xuICAgICAgICB0aGlzLnJlY29ubmVjdGlvbkF0dGVtcHRzKG9wdHMucmVjb25uZWN0aW9uQXR0ZW1wdHMgfHwgSW5maW5pdHkpO1xuICAgICAgICB0aGlzLnJlY29ubmVjdGlvbkRlbGF5KG9wdHMucmVjb25uZWN0aW9uRGVsYXkgfHwgMTAwMCk7XG4gICAgICAgIHRoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgob3B0cy5yZWNvbm5lY3Rpb25EZWxheU1heCB8fCA1MDAwKTtcbiAgICAgICAgdGhpcy5yYW5kb21pemF0aW9uRmFjdG9yKChfYSA9IG9wdHMucmFuZG9taXphdGlvbkZhY3RvcikgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogMC41KTtcbiAgICAgICAgdGhpcy5iYWNrb2ZmID0gbmV3IEJhY2tvZmYoe1xuICAgICAgICAgICAgbWluOiB0aGlzLnJlY29ubmVjdGlvbkRlbGF5KCksXG4gICAgICAgICAgICBtYXg6IHRoaXMucmVjb25uZWN0aW9uRGVsYXlNYXgoKSxcbiAgICAgICAgICAgIGppdHRlcjogdGhpcy5yYW5kb21pemF0aW9uRmFjdG9yKCksXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnRpbWVvdXQobnVsbCA9PSBvcHRzLnRpbWVvdXQgPyAyMDAwMCA6IG9wdHMudGltZW91dCk7XG4gICAgICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICB0aGlzLnVyaSA9IHVyaTtcbiAgICAgICAgY29uc3QgX3BhcnNlciA9IG9wdHMucGFyc2VyIHx8IHBhcnNlcjtcbiAgICAgICAgdGhpcy5lbmNvZGVyID0gbmV3IF9wYXJzZXIuRW5jb2RlcigpO1xuICAgICAgICB0aGlzLmRlY29kZXIgPSBuZXcgX3BhcnNlci5EZWNvZGVyKCk7XG4gICAgICAgIHRoaXMuX2F1dG9Db25uZWN0ID0gb3B0cy5hdXRvQ29ubmVjdCAhPT0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLl9hdXRvQ29ubmVjdClcbiAgICAgICAgICAgIHRoaXMub3BlbigpO1xuICAgIH1cbiAgICByZWNvbm5lY3Rpb24odikge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVjb25uZWN0aW9uO1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3Rpb24gPSAhIXY7XG4gICAgICAgIGlmICghdikge1xuICAgICAgICAgICAgdGhpcy5za2lwUmVjb25uZWN0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgcmVjb25uZWN0aW9uQXR0ZW1wdHModikge1xuICAgICAgICBpZiAodiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlY29ubmVjdGlvbkF0dGVtcHRzO1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cyA9IHY7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZWNvbm5lY3Rpb25EZWxheSh2KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheTtcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uRGVsYXkgPSB2O1xuICAgICAgICAoX2EgPSB0aGlzLmJhY2tvZmYpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRNaW4odik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByYW5kb21pemF0aW9uRmFjdG9yKHYpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBpZiAodiA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JhbmRvbWl6YXRpb25GYWN0b3I7XG4gICAgICAgIHRoaXMuX3JhbmRvbWl6YXRpb25GYWN0b3IgPSB2O1xuICAgICAgICAoX2EgPSB0aGlzLmJhY2tvZmYpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRKaXR0ZXIodik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZWNvbm5lY3Rpb25EZWxheU1heCh2KSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgaWYgKHYgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWNvbm5lY3Rpb25EZWxheU1heDtcbiAgICAgICAgdGhpcy5fcmVjb25uZWN0aW9uRGVsYXlNYXggPSB2O1xuICAgICAgICAoX2EgPSB0aGlzLmJhY2tvZmYpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRNYXgodik7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICB0aW1lb3V0KHYpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RpbWVvdXQ7XG4gICAgICAgIHRoaXMuX3RpbWVvdXQgPSB2O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3RhcnRzIHRyeWluZyB0byByZWNvbm5lY3QgaWYgcmVjb25uZWN0aW9uIGlzIGVuYWJsZWQgYW5kIHdlIGhhdmUgbm90XG4gICAgICogc3RhcnRlZCByZWNvbm5lY3RpbmcgeWV0XG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG1heWJlUmVjb25uZWN0T25PcGVuKCkge1xuICAgICAgICAvLyBPbmx5IHRyeSB0byByZWNvbm5lY3QgaWYgaXQncyB0aGUgZmlyc3QgdGltZSB3ZSdyZSBjb25uZWN0aW5nXG4gICAgICAgIGlmICghdGhpcy5fcmVjb25uZWN0aW5nICYmXG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3Rpb24gJiZcbiAgICAgICAgICAgIHRoaXMuYmFja29mZi5hdHRlbXB0cyA9PT0gMCkge1xuICAgICAgICAgICAgLy8ga2VlcHMgcmVjb25uZWN0aW9uIGZyb20gZmlyaW5nIHR3aWNlIGZvciB0aGUgc2FtZSByZWNvbm5lY3Rpb24gbG9vcFxuICAgICAgICAgICAgdGhpcy5yZWNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBjdXJyZW50IHRyYW5zcG9ydCBgc29ja2V0YC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIC0gb3B0aW9uYWwsIGNhbGxiYWNrXG4gICAgICogQHJldHVybiBzZWxmXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIG9wZW4oZm4pIHtcbiAgICAgICAgaWYgKH50aGlzLl9yZWFkeVN0YXRlLmluZGV4T2YoXCJvcGVuXCIpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIHRoaXMuZW5naW5lID0gbmV3IEVuZ2luZSh0aGlzLnVyaSwgdGhpcy5vcHRzKTtcbiAgICAgICAgY29uc3Qgc29ja2V0ID0gdGhpcy5lbmdpbmU7XG4gICAgICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9yZWFkeVN0YXRlID0gXCJvcGVuaW5nXCI7XG4gICAgICAgIHRoaXMuc2tpcFJlY29ubmVjdCA9IGZhbHNlO1xuICAgICAgICAvLyBlbWl0IGBvcGVuYFxuICAgICAgICBjb25zdCBvcGVuU3ViRGVzdHJveSA9IG9uKHNvY2tldCwgXCJvcGVuXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYub25vcGVuKCk7XG4gICAgICAgICAgICBmbiAmJiBmbigpO1xuICAgICAgICB9KTtcbiAgICAgICAgY29uc3Qgb25FcnJvciA9IChlcnIpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2xlYW51cCgpO1xuICAgICAgICAgICAgdGhpcy5fcmVhZHlTdGF0ZSA9IFwiY2xvc2VkXCI7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImVycm9yXCIsIGVycik7XG4gICAgICAgICAgICBpZiAoZm4pIHtcbiAgICAgICAgICAgICAgICBmbihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gT25seSBkbyB0aGlzIGlmIHRoZXJlIGlzIG5vIGZuIHRvIGhhbmRsZSB0aGUgZXJyb3JcbiAgICAgICAgICAgICAgICB0aGlzLm1heWJlUmVjb25uZWN0T25PcGVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIGVtaXQgYGVycm9yYFxuICAgICAgICBjb25zdCBlcnJvclN1YiA9IG9uKHNvY2tldCwgXCJlcnJvclwiLCBvbkVycm9yKTtcbiAgICAgICAgaWYgKGZhbHNlICE9PSB0aGlzLl90aW1lb3V0KSB7XG4gICAgICAgICAgICBjb25zdCB0aW1lb3V0ID0gdGhpcy5fdGltZW91dDtcbiAgICAgICAgICAgIC8vIHNldCB0aW1lclxuICAgICAgICAgICAgY29uc3QgdGltZXIgPSB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgb3BlblN1YkRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICBvbkVycm9yKG5ldyBFcnJvcihcInRpbWVvdXRcIikpO1xuICAgICAgICAgICAgICAgIHNvY2tldC5jbG9zZSgpO1xuICAgICAgICAgICAgfSwgdGltZW91dCk7XG4gICAgICAgICAgICBpZiAodGhpcy5vcHRzLmF1dG9VbnJlZikge1xuICAgICAgICAgICAgICAgIHRpbWVyLnVucmVmKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnN1YnMucHVzaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhclRpbWVvdXRGbih0aW1lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN1YnMucHVzaChvcGVuU3ViRGVzdHJveSk7XG4gICAgICAgIHRoaXMuc3Vicy5wdXNoKGVycm9yU3ViKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciBvcGVuKClcbiAgICAgKlxuICAgICAqIEByZXR1cm4gc2VsZlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBjb25uZWN0KGZuKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm9wZW4oZm4pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiB0cmFuc3BvcnQgb3Blbi5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25vcGVuKCkge1xuICAgICAgICAvLyBjbGVhciBvbGQgc3Vic1xuICAgICAgICB0aGlzLmNsZWFudXAoKTtcbiAgICAgICAgLy8gbWFyayBhcyBvcGVuXG4gICAgICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBcIm9wZW5cIjtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJvcGVuXCIpO1xuICAgICAgICAvLyBhZGQgbmV3IHN1YnNcbiAgICAgICAgY29uc3Qgc29ja2V0ID0gdGhpcy5lbmdpbmU7XG4gICAgICAgIHRoaXMuc3Vicy5wdXNoKG9uKHNvY2tldCwgXCJwaW5nXCIsIHRoaXMub25waW5nLmJpbmQodGhpcykpLCBvbihzb2NrZXQsIFwiZGF0YVwiLCB0aGlzLm9uZGF0YS5iaW5kKHRoaXMpKSwgb24oc29ja2V0LCBcImVycm9yXCIsIHRoaXMub25lcnJvci5iaW5kKHRoaXMpKSwgb24oc29ja2V0LCBcImNsb3NlXCIsIHRoaXMub25jbG9zZS5iaW5kKHRoaXMpKSwgXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgb24odGhpcy5kZWNvZGVyLCBcImRlY29kZWRcIiwgdGhpcy5vbmRlY29kZWQuYmluZCh0aGlzKSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgdXBvbiBhIHBpbmcuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9ucGluZygpIHtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJwaW5nXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDYWxsZWQgd2l0aCBkYXRhLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBvbmRhdGEoZGF0YSkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5kZWNvZGVyLmFkZChkYXRhKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgdGhpcy5vbmNsb3NlKFwicGFyc2UgZXJyb3JcIiwgZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW4gcGFyc2VyIGZ1bGx5IGRlY29kZXMgYSBwYWNrZXQuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9uZGVjb2RlZChwYWNrZXQpIHtcbiAgICAgICAgLy8gdGhlIG5leHRUaWNrIGNhbGwgcHJldmVudHMgYW4gZXhjZXB0aW9uIGluIGEgdXNlci1wcm92aWRlZCBldmVudCBsaXN0ZW5lciBmcm9tIHRyaWdnZXJpbmcgYSBkaXNjb25uZWN0aW9uIGR1ZSB0byBhIFwicGFyc2UgZXJyb3JcIlxuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInBhY2tldFwiLCBwYWNrZXQpO1xuICAgICAgICB9LCB0aGlzLnNldFRpbWVvdXRGbik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIHNvY2tldCBlcnJvci5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25lcnJvcihlcnIpIHtcbiAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJlcnJvclwiLCBlcnIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IHNvY2tldCBmb3IgdGhlIGdpdmVuIGBuc3BgLlxuICAgICAqXG4gICAgICogQHJldHVybiB7U29ja2V0fVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBzb2NrZXQobnNwLCBvcHRzKSB7XG4gICAgICAgIGxldCBzb2NrZXQgPSB0aGlzLm5zcHNbbnNwXTtcbiAgICAgICAgaWYgKCFzb2NrZXQpIHtcbiAgICAgICAgICAgIHNvY2tldCA9IG5ldyBTb2NrZXQodGhpcywgbnNwLCBvcHRzKTtcbiAgICAgICAgICAgIHRoaXMubnNwc1tuc3BdID0gc29ja2V0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2F1dG9Db25uZWN0ICYmICFzb2NrZXQuYWN0aXZlKSB7XG4gICAgICAgICAgICBzb2NrZXQuY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzb2NrZXQ7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENhbGxlZCB1cG9uIGEgc29ja2V0IGNsb3NlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHNvY2tldFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2Rlc3Ryb3koc29ja2V0KSB7XG4gICAgICAgIGNvbnN0IG5zcHMgPSBPYmplY3Qua2V5cyh0aGlzLm5zcHMpO1xuICAgICAgICBmb3IgKGNvbnN0IG5zcCBvZiBuc3BzKSB7XG4gICAgICAgICAgICBjb25zdCBzb2NrZXQgPSB0aGlzLm5zcHNbbnNwXTtcbiAgICAgICAgICAgIGlmIChzb2NrZXQuYWN0aXZlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Nsb3NlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFdyaXRlcyBhIHBhY2tldC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBwYWNrZXRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9wYWNrZXQocGFja2V0KSB7XG4gICAgICAgIGNvbnN0IGVuY29kZWRQYWNrZXRzID0gdGhpcy5lbmNvZGVyLmVuY29kZShwYWNrZXQpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVuY29kZWRQYWNrZXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS53cml0ZShlbmNvZGVkUGFja2V0c1tpXSwgcGFja2V0Lm9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFuIHVwIHRyYW5zcG9ydCBzdWJzY3JpcHRpb25zIGFuZCBwYWNrZXQgYnVmZmVyLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBjbGVhbnVwKCkge1xuICAgICAgICB0aGlzLnN1YnMuZm9yRWFjaCgoc3ViRGVzdHJveSkgPT4gc3ViRGVzdHJveSgpKTtcbiAgICAgICAgdGhpcy5zdWJzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMuZGVjb2Rlci5kZXN0cm95KCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsb3NlIHRoZSBjdXJyZW50IHNvY2tldC5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2Nsb3NlKCkge1xuICAgICAgICB0aGlzLnNraXBSZWNvbm5lY3QgPSB0cnVlO1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbmNsb3NlKFwiZm9yY2VkIGNsb3NlXCIpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBbGlhcyBmb3IgY2xvc2UoKVxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBkaXNjb25uZWN0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY2xvc2UoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHdoZW46XG4gICAgICpcbiAgICAgKiAtIHRoZSBsb3ctbGV2ZWwgZW5naW5lIGlzIGNsb3NlZFxuICAgICAqIC0gdGhlIHBhcnNlciBlbmNvdW50ZXJlZCBhIGJhZGx5IGZvcm1hdHRlZCBwYWNrZXRcbiAgICAgKiAtIGFsbCBzb2NrZXRzIGFyZSBkaXNjb25uZWN0ZWRcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgb25jbG9zZShyZWFzb24sIGRlc2NyaXB0aW9uKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgdGhpcy5jbGVhbnVwKCk7XG4gICAgICAgIChfYSA9IHRoaXMuZW5naW5lKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2xvc2UoKTtcbiAgICAgICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuX3JlYWR5U3RhdGUgPSBcImNsb3NlZFwiO1xuICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcImNsb3NlXCIsIHJlYXNvbiwgZGVzY3JpcHRpb24pO1xuICAgICAgICBpZiAodGhpcy5fcmVjb25uZWN0aW9uICYmICF0aGlzLnNraXBSZWNvbm5lY3QpIHtcbiAgICAgICAgICAgIHRoaXMucmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQXR0ZW1wdCBhIHJlY29ubmVjdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgcmVjb25uZWN0KCkge1xuICAgICAgICBpZiAodGhpcy5fcmVjb25uZWN0aW5nIHx8IHRoaXMuc2tpcFJlY29ubmVjdClcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMuYmFja29mZi5hdHRlbXB0cyA+PSB0aGlzLl9yZWNvbm5lY3Rpb25BdHRlbXB0cykge1xuICAgICAgICAgICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLmVtaXRSZXNlcnZlZChcInJlY29ubmVjdF9mYWlsZWRcIik7XG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGRlbGF5ID0gdGhpcy5iYWNrb2ZmLmR1cmF0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSB0cnVlO1xuICAgICAgICAgICAgY29uc3QgdGltZXIgPSB0aGlzLnNldFRpbWVvdXRGbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuc2tpcFJlY29ubmVjdClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicmVjb25uZWN0X2F0dGVtcHRcIiwgc2VsZi5iYWNrb2ZmLmF0dGVtcHRzKTtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBhZ2FpbiBmb3IgdGhlIGNhc2Ugc29ja2V0IGNsb3NlZCBpbiBhYm92ZSBldmVudHNcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5za2lwUmVjb25uZWN0KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgc2VsZi5vcGVuKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5fcmVjb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnJlY29ubmVjdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0UmVzZXJ2ZWQoXCJyZWNvbm5lY3RfZXJyb3JcIiwgZXJyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYub25yZWNvbm5lY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSwgZGVsYXkpO1xuICAgICAgICAgICAgaWYgKHRoaXMub3B0cy5hdXRvVW5yZWYpIHtcbiAgICAgICAgICAgICAgICB0aW1lci51bnJlZigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5zdWJzLnB1c2goKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJUaW1lb3V0Rm4odGltZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2FsbGVkIHVwb24gc3VjY2Vzc2Z1bCByZWNvbm5lY3QuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIG9ucmVjb25uZWN0KCkge1xuICAgICAgICBjb25zdCBhdHRlbXB0ID0gdGhpcy5iYWNrb2ZmLmF0dGVtcHRzO1xuICAgICAgICB0aGlzLl9yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5iYWNrb2ZmLnJlc2V0KCk7XG4gICAgICAgIHRoaXMuZW1pdFJlc2VydmVkKFwicmVjb25uZWN0XCIsIGF0dGVtcHQpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IHVybCB9IGZyb20gXCIuL3VybC5qc1wiO1xuaW1wb3J0IHsgTWFuYWdlciB9IGZyb20gXCIuL21hbmFnZXIuanNcIjtcbmltcG9ydCB7IFNvY2tldCwgfSBmcm9tIFwiLi9zb2NrZXQuanNcIjtcbi8qKlxuICogTWFuYWdlcnMgY2FjaGUuXG4gKi9cbmNvbnN0IGNhY2hlID0ge307XG5mdW5jdGlvbiBsb29rdXAodXJpLCBvcHRzKSB7XG4gICAgaWYgKHR5cGVvZiB1cmkgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgb3B0cyA9IHVyaTtcbiAgICAgICAgdXJpID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICBjb25zdCBwYXJzZWQgPSB1cmwodXJpLCBvcHRzLnBhdGggfHwgXCIvc29ja2V0LmlvXCIpO1xuICAgIGNvbnN0IHNvdXJjZSA9IHBhcnNlZC5zb3VyY2U7XG4gICAgY29uc3QgaWQgPSBwYXJzZWQuaWQ7XG4gICAgY29uc3QgcGF0aCA9IHBhcnNlZC5wYXRoO1xuICAgIGNvbnN0IHNhbWVOYW1lc3BhY2UgPSBjYWNoZVtpZF0gJiYgcGF0aCBpbiBjYWNoZVtpZF1bXCJuc3BzXCJdO1xuICAgIGNvbnN0IG5ld0Nvbm5lY3Rpb24gPSBvcHRzLmZvcmNlTmV3IHx8XG4gICAgICAgIG9wdHNbXCJmb3JjZSBuZXcgY29ubmVjdGlvblwiXSB8fFxuICAgICAgICBmYWxzZSA9PT0gb3B0cy5tdWx0aXBsZXggfHxcbiAgICAgICAgc2FtZU5hbWVzcGFjZTtcbiAgICBsZXQgaW87XG4gICAgaWYgKG5ld0Nvbm5lY3Rpb24pIHtcbiAgICAgICAgaW8gPSBuZXcgTWFuYWdlcihzb3VyY2UsIG9wdHMpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaWYgKCFjYWNoZVtpZF0pIHtcbiAgICAgICAgICAgIGNhY2hlW2lkXSA9IG5ldyBNYW5hZ2VyKHNvdXJjZSwgb3B0cyk7XG4gICAgICAgIH1cbiAgICAgICAgaW8gPSBjYWNoZVtpZF07XG4gICAgfVxuICAgIGlmIChwYXJzZWQucXVlcnkgJiYgIW9wdHMucXVlcnkpIHtcbiAgICAgICAgb3B0cy5xdWVyeSA9IHBhcnNlZC5xdWVyeUtleTtcbiAgICB9XG4gICAgcmV0dXJuIGlvLnNvY2tldChwYXJzZWQucGF0aCwgb3B0cyk7XG59XG4vLyBzbyB0aGF0IFwibG9va3VwXCIgY2FuIGJlIHVzZWQgYm90aCBhcyBhIGZ1bmN0aW9uIChlLmcuIGBpbyguLi4pYCkgYW5kIGFzIGFcbi8vIG5hbWVzcGFjZSAoZS5nLiBgaW8uY29ubmVjdCguLi4pYCksIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5XG5PYmplY3QuYXNzaWduKGxvb2t1cCwge1xuICAgIE1hbmFnZXIsXG4gICAgU29ja2V0LFxuICAgIGlvOiBsb29rdXAsXG4gICAgY29ubmVjdDogbG9va3VwLFxufSk7XG4vKipcbiAqIFByb3RvY29sIHZlcnNpb24uXG4gKlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgeyBwcm90b2NvbCB9IGZyb20gXCJzb2NrZXQuaW8tcGFyc2VyXCI7XG4vKipcbiAqIEV4cG9zZSBjb25zdHJ1Y3RvcnMgZm9yIHN0YW5kYWxvbmUgYnVpbGQuXG4gKlxuICogQHB1YmxpY1xuICovXG5leHBvcnQgeyBNYW5hZ2VyLCBTb2NrZXQsIGxvb2t1cCBhcyBpbywgbG9va3VwIGFzIGNvbm5lY3QsIGxvb2t1cCBhcyBkZWZhdWx0LCB9O1xuZXhwb3J0IHsgRmV0Y2gsIE5vZGVYSFIsIFhIUiwgTm9kZVdlYlNvY2tldCwgV2ViU29ja2V0LCBXZWJUcmFuc3BvcnQsIH0gZnJvbSBcImVuZ2luZS5pby1jbGllbnRcIjtcbiIsImltcG9ydCB7IGNhbGxTZXJ2ZXJBY3Rpb24gfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3dlYlwiO1xuZXhwb3J0IGNvbnN0IHJlYWx0aW1lQ3JlZGVudGlhbHNBY3Rpb24gPSAoLi4uYXJncykgPT4gY2FsbFNlcnZlckFjdGlvbihcInNoYXJlZC9zZXJ2ZXItYWN0aW9ucy9yZWFsdGltZVwiLCBcInJlYWx0aW1lQ3JlZGVudGlhbHNBY3Rpb25cIiwgYXJncyk7IiwiXCJoeWRyYXRlXCI7XG5cbmltcG9ydCB7IGluaXQgfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3dlYlwiO1xuaW1wb3J0IHsgaW8sIHR5cGUgU29ja2V0IH0gZnJvbSBcInNvY2tldC5pby1jbGllbnRcIjtcbmltcG9ydCB7IHJlYWx0aW1lQ3JlZGVudGlhbHNBY3Rpb24gfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NlcnZlci1hY3Rpb25zL3JlYWx0aW1lLnRzXCI7XG5pbXBvcnQgeyBzaG93VG9hc3QgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL29tbmktaHViL3RvYXN0LXN0b3JlLnRzXCI7XG5pbXBvcnQge1xuICBhcHBlbmRNZXNzYWdlLFxuICBhcHBseUJvb3RzdHJhcCxcbiAgYXBwbHlDb252ZXJzYXRpb24sXG4gIGlzVHlwaW5nLFxuICBtYXJrQ29udmVyc2F0aW9uUmVhZCxcbiAgcmVtb3ZlQ29udmVyc2F0aW9uLFxuICBzZXRDb25uZWN0aW9uLFxuICBzZXRMYXN0RXJyb3IsXG4gIHNldE9ubGluZUFnZW50cyxcbiAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZCxcbiAgc2V0VHlwaW5nLFxuICB0eXBlIEJvb3RzdHJhcFBheWxvYWQsXG59IGZyb20gXCIuL3JlYWN0aXZlcy1oZWxwZXMudHNcIjtcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uSXRlbSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvb21uaS1odWIvdHlwZXMudHNcIjtcblxuLyoqXG4gKiBPIGZyb250IG7Do28gZmFsYSBjb20gYSBwb3J0YSBkbyByZWFsdGltZTogZmFsYSBjb20gbyBnYXRld2F5IGRlIGRldlxuICogKHNlcnZlci9nYXRld2F5LWRldiksIHF1ZSDDqSBxdWVtIGNvbmhlY2Ugb3Mgc2VydmnDp29zLiBgL3NvY2tldC5pb2Agw6lcbiAqIHJlcGFzc2FkbyBpbnRhY3RvIHBlbG8gZ2F0ZXdheSBhdMOpIG8gcmVhbHRpbWUuXG4gKi9cbmNvbnN0IEdBVEVXQVlfUE9SVCA9IDQwMDA7XG5jb25zdCBTT0NLRVRfUEFUSCA9IFwiL3NvY2tldC5pb1wiO1xuXG5sZXQgYWN0aXZlU29ja2V0OiBTb2NrZXQgfCBudWxsID0gbnVsbDtcblxuY29uc3QgcmVhbHRpbWVVcmwgPSAoKTogc3RyaW5nID0+IHtcbiAgaWYgKHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIpIHJldHVybiBgaHR0cDovL2xvY2FsaG9zdDoke0dBVEVXQVlfUE9SVH1gO1xuICByZXR1cm4gYCR7d2luZG93LmxvY2F0aW9uLnByb3RvY29sfS8vJHt3aW5kb3cubG9jYXRpb24uaG9zdG5hbWV9OiR7R0FURVdBWV9QT1JUfWA7XG59O1xuXG4vKiogRW50cmEgKGUgc2FpKSBkYSBzYWxhIGRlIHVtYSBjb252ZXJzYSBubyByZWFsdGltZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBqb2luQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgYWN0aXZlU29ja2V0Py5lbWl0KFwiY29udmVyc2F0aW9uOmpvaW5cIiwgeyBjb252ZXJzYXRpb25JZCB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxlYXZlQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgYWN0aXZlU29ja2V0Py5lbWl0KFwiY29udmVyc2F0aW9uOmxlYXZlXCIsIHsgY29udmVyc2F0aW9uSWQgfSk7XG59XG5cbi8qKiBFbnZpYSBhIG1lbnNhZ2VtIGRvIGFnZW50ZTsgbyBlY28gYG1lc3NhZ2U6bmV3YCBkbyBzZXJ2aWRvciByZW5kZXJpemEgbmEgdGVsYS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzZW5kQWdlbnRNZXNzYWdlKFxuICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICB0ZXh0OiBzdHJpbmcsXG4gIHNlbmRlck5hbWU6IHN0cmluZyxcbik6IGJvb2xlYW4ge1xuICBpZiAoIWFjdGl2ZVNvY2tldD8uY29ubmVjdGVkKSByZXR1cm4gZmFsc2U7XG4gIGFjdGl2ZVNvY2tldC5lbWl0KFwibWVzc2FnZTpzZW5kXCIsIHsgY29udmVyc2F0aW9uSWQsIHRleHQsIHNlbmRlck5hbWUgfSk7XG4gIHJldHVybiB0cnVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbm90aWZ5VHlwaW5nKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsIHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gIGlmICghYWN0aXZlU29ja2V0Py5jb25uZWN0ZWQpIHJldHVybjtcbiAgYWN0aXZlU29ja2V0LmVtaXQoXCJ0eXBpbmc6c2V0XCIsIHsgY29udmVyc2F0aW9uSWQsIGlzVHlwaW5nOiB2YWx1ZSB9KTtcbn1cblxuLyoqXG4gKiBBcGFnYSBhIGNvbnZlcnNhIGNvbSB0b2RhcyBhcyBtZW5zYWdlbnMuXG4gKlxuICogTyBgY29udmVyc2F0aW9uOnJlbW92ZWRgIHZvbHRhIHBlbG8gbWVzbW8gc29ja2V0IGUgw6kgcXVlbSB0aXJhIG8gaXRlbSBkYVxuICogbGlzdGEg4oCUIGluY2x1c2l2ZSBuYSBhYmEgZGUgb3V0cm8gYWdlbnRlLiBPcHRpbWlzdGEgYXF1aSBuw6NvIGZheiBzZW50aWRvOlxuICogc2UgbyBzZXJ2aWRvciByZWN1c2FyLCBhIGxpc3RhIG7Do28gbXVkYSBlIG8gYWdlbnRlIGNvbnRpbnVhIHZlbmRvIG8gaXRlbS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUNvbnZlcnNhdGlvbihjb252ZXJzYXRpb25JZDogc3RyaW5nKTogdm9pZCB7XG4gIGlmICghYWN0aXZlU29ja2V0Py5jb25uZWN0ZWQpIHJldHVybjtcbiAgYWN0aXZlU29ja2V0LmVtaXQoXCJjb252ZXJzYXRpb246ZGVsZXRlXCIsIHsgY29udmVyc2F0aW9uSWQgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWFkQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgaWYgKCFhY3RpdmVTb2NrZXQ/LmNvbm5lY3RlZCkgcmV0dXJuO1xuICBhY3RpdmVTb2NrZXQuZW1pdChcImNvbnZlcnNhdGlvbjpyZWFkXCIsIHsgY29udmVyc2F0aW9uSWQgfSk7XG59XG5cbmludGVyZmFjZSBNZXNzYWdlRW52ZWxvcGUge1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICBtZXNzYWdlOiBDb252ZXJzYXRpb25JdGVtW1wibWVzc2FnZXNcIl1bbnVtYmVyXTtcbiAgY29udmVyc2F0aW9uPzogQ29udmVyc2F0aW9uSXRlbTtcbn1cblxuaW50ZXJmYWNlIENvbnZlcnNhdGlvbkVudmVsb3BlIHtcbiAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25JdGVtO1xufVxuXG5pbnRlcmZhY2UgVHlwaW5nRW52ZWxvcGUge1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICBpc1R5cGluZzogYm9vbGVhbjtcbiAgc2VuZGVyOiBcImNsaWVudFwiIHwgXCJhZ2VudFwiIHwgXCJzeXN0ZW1cIjtcbiAgc2VuZGVyTmFtZT86IHN0cmluZyB8IG51bGw7XG59XG5cbmludGVyZmFjZSBQcmVzZW5jZUVudmVsb3BlIHtcbiAgYWdlbnROYW1lOiBzdHJpbmc7XG4gIG9ubGluZUFnZW50czogbnVtYmVyO1xuICBvbmxpbmU6IGJvb2xlYW47XG59XG5cbmludGVyZmFjZSBTZXNzaW9uUmVhZHkge1xuICBzaWQ6IHN0cmluZztcbiAgYWdlbnQ6IHsgbmFtZTogc3RyaW5nOyBlbWFpbDogc3RyaW5nIH07XG4gIG9ubGluZUFnZW50czogbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgQ29udGV4dFNvY2tldCA9ICh7IGNoaWxkcmVuIH06IHsgY2hpbGRyZW4/OiBhbnkgfSkgPT4ge1xuICBpbml0KCgpID0+IHtcbiAgICBsZXQgZGlzcG9zZWQgPSBmYWxzZTtcbiAgICBsZXQgdHlwaW5nVGltZXI6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+IHwgbnVsbCA9IG51bGw7XG5cbiAgICBjb25zdCBzY2hlZHVsZVN0b3BUeXBpbmcgPSAoY29udmVyc2F0aW9uSWQ6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKHR5cGluZ1RpbWVyKSBjbGVhclRpbWVvdXQodHlwaW5nVGltZXIpO1xuICAgICAgdHlwaW5nVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IG5vdGlmeVR5cGluZyhjb252ZXJzYXRpb25JZCwgZmFsc2UpLCAxMjAwKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc2V0dXAgPSBhc3luYyAoKSA9PiB7XG4gICAgICBsZXQgdG9rZW4gPSBcIlwiO1xuICAgICAgbGV0IHVzZXIgPSBcIlwiO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgY3JlZGVudGlhbHMgPSBhd2FpdCByZWFsdGltZUNyZWRlbnRpYWxzQWN0aW9uKCk7XG4gICAgICAgIGlmIChkaXNwb3NlZCkgcmV0dXJuO1xuICAgICAgICB0b2tlbiA9IGNyZWRlbnRpYWxzLnRva2VuIHx8IFwiXCI7XG4gICAgICAgIHVzZXIgPSBjcmVkZW50aWFscy51c2VyIHx8IFwiXCI7XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLy8gU2VtIHNlc3PDo28gKG91IFJQQyBpbmRpc3BvbsOtdmVsKTogbyByZWFsdGltZSBjYWkgbm8gYWdlbnRlIGRlIGRldi5cbiAgICAgIH1cblxuICAgICAgY29uc3Qgc29ja2V0ID0gaW8ocmVhbHRpbWVVcmwoKSwge1xuICAgICAgICBwYXRoOiBTT0NLRVRfUEFUSCxcbiAgICAgICAgdHJhbnNwb3J0czogW1wid2Vic29ja2V0XCIsIFwicG9sbGluZ1wiXSxcbiAgICAgICAgcmVjb25uZWN0aW9uOiB0cnVlLFxuICAgICAgICByZWNvbm5lY3Rpb25EZWxheU1heDogMTAwMDAsXG4gICAgICAgIGF1dGg6IHsgdG9rZW4sIHVzZXIgfSxcbiAgICAgIH0pO1xuXG4gICAgICBhY3RpdmVTb2NrZXQgPSBzb2NrZXQ7XG4gICAgICBzZXRDb25uZWN0aW9uKFwiY29ubmVjdGluZ1wiKTtcblxuICAgICAgc29ja2V0Lm9uKFwiY29ubmVjdFwiLCAoKSA9PiB7XG4gICAgICAgIHNldENvbm5lY3Rpb24oXCJvbmxpbmVcIik7XG4gICAgICAgIHNldExhc3RFcnJvcihcIlwiKTtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IHNlbGVjdGVkQ29udmVyc2F0aW9uSWQoKTtcbiAgICAgICAgaWYgKGN1cnJlbnQpIHtcbiAgICAgICAgICBzb2NrZXQuZW1pdChcImNvbnZlcnNhdGlvbjpqb2luXCIsIHsgY29udmVyc2F0aW9uSWQ6IGN1cnJlbnQgfSk7XG4gICAgICAgICAgcmVhZENvbnZlcnNhdGlvbihjdXJyZW50KTtcbiAgICAgICAgICBtYXJrQ29udmVyc2F0aW9uUmVhZChjdXJyZW50KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cblxuICAgICAgc29ja2V0Lm9uKFwicmVjb25uZWN0XCIsICgpID0+IHtcbiAgICAgIH0pXG5cbiAgICAgIHNvY2tldC5vbihcImRpc2Nvbm5lY3RcIiwgKCkgPT4gc2V0Q29ubmVjdGlvbihcIm9mZmxpbmVcIikpO1xuXG4gICAgICBzb2NrZXQub24oXCJjb25uZWN0X2Vycm9yXCIsIChlcnJvcjogRXJyb3IpID0+IHtcbiAgICAgICAgc2V0Q29ubmVjdGlvbihcIm9mZmxpbmVcIik7XG4gICAgICAgIHNldExhc3RFcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgIH0pO1xuXG4gICAgICBzb2NrZXQub24oXCJzZXNzaW9uOnJlYWR5XCIsIChwYXlsb2FkOiBTZXNzaW9uUmVhZHkpID0+IHtcbiAgICAgICAgc2V0T25saW5lQWdlbnRzKHBheWxvYWQub25saW5lQWdlbnRzKTtcbiAgICAgICAgY29uc3QgbGFiZWwgPSBwYXlsb2FkLmFnZW50Py5uYW1lIHx8IHVzZXIgfHwgXCJBZ2VudGVcIjtcbiAgICAgICAgc2hvd1RvYXN0KFwiUmVhbHRpbWUgY29uZWN0YWRvXCIsIGBTZXNzw6NvIGRlICR7bGFiZWx9IGF0aXZhLmAsIFwiaW5mb1wiKTtcbiAgICAgIH0pO1xuXG4gICAgICBzb2NrZXQub24oXCJjb252ZXJzYXRpb25zOnNuYXBzaG90XCIsIChwYXlsb2FkOiBCb290c3RyYXBQYXlsb2FkKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ29udmVyc2F0aW9uOnNuYXBzaG90XCIsIHBheWxvYWQpO1xuICAgICAgICBhcHBseUJvb3RzdHJhcChwYXlsb2FkKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBDb252ZXJzYSBxdWUgYWNhYm91IGRlIG5hc2NlcjogbyBjb250YXRvIGFpbmRhIG7Do28gdGluaGEgZXNjcml0by4gT1xuICAgICAgLy8gYG1lc3NhZ2U6bmV3YCBxdWUgdmVtIGxvZ28gZGVwb2lzIG7Do28gYmFzdGEsIHBvcnF1ZSBgYXBwZW5kTWVzc2FnZWBcbiAgICAgIC8vIGRlc2NhcnRhIG1lbnNhZ2VtIGRlIGNvbnZlcnNhIHF1ZSBuw6NvIGVzdMOhIG5hIGxpc3RhIOKAlCBzZW0gZXN0ZVxuICAgICAgLy8gaGFuZGxlciwgbyBwcmltZWlybyBjb250YXRvIGRlIHVtYSBzZXNzw6NvIG5vdmEgbnVuY2EgYXBhcmVjaWEuXG4gICAgICBzb2NrZXQub24oXCJjb252ZXJzYXRpb246bmV3XCIsIChwYXlsb2FkOiBDb252ZXJzYXRpb25FbnZlbG9wZSkgPT4ge1xuICAgICAgICBhcHBseUNvbnZlcnNhdGlvbihwYXlsb2FkLmNvbnZlcnNhdGlvbik7XG4gICAgICB9KTtcblxuICAgICAgc29ja2V0Lm9uKFwiY29udmVyc2F0aW9uOnN0YXRlXCIsIChwYXlsb2FkOiBDb252ZXJzYXRpb25FbnZlbG9wZSkgPT4ge1xuICAgICAgICBhcHBseUNvbnZlcnNhdGlvbihwYXlsb2FkLmNvbnZlcnNhdGlvbik7XG4gICAgICB9KTtcblxuICAgICAgc29ja2V0Lm9uKFwibWVzc2FnZTpuZXdcIiwgKHBheWxvYWQ6IE1lc3NhZ2VFbnZlbG9wZSkgPT4ge1xuICAgICAgICBhcHBlbmRNZXNzYWdlKHBheWxvYWQuY29udmVyc2F0aW9uSWQsIHBheWxvYWQubWVzc2FnZSwgcGF5bG9hZC5jb252ZXJzYXRpb24pO1xuICAgICAgICBpZiAocGF5bG9hZC5tZXNzYWdlLnNlbmRlciA9PT0gXCJjbGllbnRcIikge1xuICAgICAgICAgIHNldFR5cGluZyhwYXlsb2FkLmNvbnZlcnNhdGlvbklkLCBmYWxzZSk7XG4gICAgICAgICAgc2NoZWR1bGVTdG9wVHlwaW5nKHBheWxvYWQuY29udmVyc2F0aW9uSWQpO1xuICAgICAgICAgIGlmIChwYXlsb2FkLmNvbnZlcnNhdGlvbklkID09PSBzZWxlY3RlZENvbnZlcnNhdGlvbklkKCkpIHtcbiAgICAgICAgICAgIHJlYWRDb252ZXJzYXRpb24ocGF5bG9hZC5jb252ZXJzYXRpb25JZCk7XG4gICAgICAgICAgICBtYXJrQ29udmVyc2F0aW9uUmVhZChwYXlsb2FkLmNvbnZlcnNhdGlvbklkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBzb2NrZXQub24oXCJjb252ZXJzYXRpb246dXBkYXRlZFwiLCAocGF5bG9hZDogQ29udmVyc2F0aW9uRW52ZWxvcGUpID0+IHtcbiAgICAgICAgYXBwbHlDb252ZXJzYXRpb24ocGF5bG9hZC5jb252ZXJzYXRpb24pO1xuICAgICAgfSk7XG5cbiAgICAgIHNvY2tldC5vbihcImNvbnZlcnNhdGlvbjpyZW1vdmVkXCIsIChwYXlsb2FkOiB7IGlkOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICAvLyBTYWkgZGEgc2FsYSBhbnRlcyBkZSBsaW1wYXI6IGRlcG9pcyBkZSBhcGFnYWRhLCBuw6NvIGZheiBzZW50aWRvXG4gICAgICAgIC8vIGNvbnRpbnVhciBlbnRyYW5kbyBubyBgbWVzc2FnZTpuZXdgIGRlIHVtYSBjb252ZXJzYSBxdWUgbsOjbyBleGlzdGUuXG4gICAgICAgIGlmIChwYXlsb2FkLmlkID09PSBzZWxlY3RlZENvbnZlcnNhdGlvbklkKCkpIGxlYXZlQ29udmVyc2F0aW9uKHBheWxvYWQuaWQpO1xuICAgICAgICByZW1vdmVDb252ZXJzYXRpb24ocGF5bG9hZC5pZCk7XG4gICAgICB9KTtcblxuICAgICAgc29ja2V0Lm9uKFwidHlwaW5nOnVwZGF0ZVwiLCAocGF5bG9hZDogVHlwaW5nRW52ZWxvcGUpID0+IHtcbiAgICAgICAgaWYgKHBheWxvYWQuc2VuZGVyID09PSBcImFnZW50XCIpIHJldHVybjtcbiAgICAgICAgc2V0VHlwaW5nKHBheWxvYWQuY29udmVyc2F0aW9uSWQsIEJvb2xlYW4ocGF5bG9hZC5pc1R5cGluZykpO1xuICAgICAgfSk7XG5cbiAgICAgIHNvY2tldC5vbihcInByZXNlbmNlOm9ubGluZVwiLCAocGF5bG9hZDogUHJlc2VuY2VFbnZlbG9wZSkgPT4ge1xuICAgICAgICBzZXRPbmxpbmVBZ2VudHMocGF5bG9hZC5vbmxpbmVBZ2VudHMpO1xuICAgICAgfSk7XG5cbiAgICAgIHNvY2tldC5vbihcInByZXNlbmNlOm9mZmxpbmVcIiwgKHBheWxvYWQ6IFByZXNlbmNlRW52ZWxvcGUpID0+IHtcbiAgICAgICAgc2V0T25saW5lQWdlbnRzKHBheWxvYWQub25saW5lQWdlbnRzKTtcbiAgICAgIH0pO1xuXG4gICAgICBzb2NrZXQub24oXCJzZXNzaW9uOmVycm9yXCIsIChtZXNzYWdlOiBzdHJpbmcpID0+IHtcbiAgICAgICAgc2V0TGFzdEVycm9yKG1lc3NhZ2UpO1xuICAgICAgICBzaG93VG9hc3QoXCJTZXNzw6NvIHJlYWx0aW1lXCIsIG1lc3NhZ2UsIFwiZXJyb3JcIik7XG4gICAgICB9KTtcblxuICAgICAgc29ja2V0Lm9uKFwiZXJyb3JcIiwgKHBheWxvYWQ6IHsgZXJyb3I/OiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gcGF5bG9hZD8uZXJyb3IgfHwgXCJFcnJvIG5vIHJlYWx0aW1lXCI7XG4gICAgICAgIHNldExhc3RFcnJvcihtZXNzYWdlKTtcbiAgICAgICAgc2hvd1RvYXN0KFwiUmVhbHRpbWVcIiwgbWVzc2FnZSwgXCJ3YXJuaW5nXCIpO1xuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZvaWQgc2V0dXAoKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkaXNwb3NlZCA9IHRydWU7XG4gICAgICBpZiAodHlwaW5nVGltZXIpIGNsZWFyVGltZW91dCh0eXBpbmdUaW1lcik7XG4gICAgICBhY3RpdmVTb2NrZXQ/LnJlbW92ZUFsbExpc3RlbmVycygpO1xuICAgICAgYWN0aXZlU29ja2V0Py5kaXNjb25uZWN0KCk7XG4gICAgICBhY3RpdmVTb2NrZXQgPSBudWxsO1xuICAgICAgc2V0Q29ubmVjdGlvbihcIm9mZmxpbmVcIik7XG4gICAgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIDxkaXY+e2NoaWxkcmVufTwvZGl2Pjtcbn07XG5cbmV4cG9ydCB7IGlzVHlwaW5nIH07XG4iXSwiaWdub3JlTGlzdCI6WzAsMSwyLDMsNCw1LDYsNyw4LDksMTAsMTEsMTIsMTMsMTQsMTUsMTYsMTcsMTgsMTksMjAsMjEsMjIsMjMsMjQsMjUsMjYsMjddLCJtYXBwaW5ncyI6Ijs7Ozs7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