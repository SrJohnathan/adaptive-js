import { HydrateComponet, HydrateComponetChildClient } from "../components/hydrate.js";
import { ClientComponet } from "../components/client.js";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@adaptive-js/web/jsx-runtime";
export default function Root() {
	const t = true;
	const f = false;
	const array = [
		"a",
		"b",
		"c"
	];
	const nums = [
		1,
		2,
		3
	];
	const empty = [];
	return /* @__PURE__ */ _jsxs(_Fragment, { children: [
		/* @__PURE__ */ _jsx("div", { children: "Ola mundo" }),
		/* @__PURE__ */ _jsxs("div", { children: [
			/* @__PURE__ */ _jsx("p", { children: "a" }),
			/* @__PURE__ */ _jsx("p", { children: "b" }),
			/* @__PURE__ */ _jsx("p", { children: "c" })
		] }),
		/* @__PURE__ */ _jsxs(_Fragment, { children: [/* @__PURE__ */ _jsx("span", { children: "x" }), /* @__PURE__ */ _jsx("span", { children: "y" })] }),
		/* @__PURE__ */ _jsx("ul", { children: array.map((item) => /* @__PURE__ */ _jsx("li", { children: item })) }),
		/* @__PURE__ */ _jsx("ul", { children: nums.map((n) => /* @__PURE__ */ _jsx("li", { children: n }, n)) }),
		/* @__PURE__ */ _jsx("ul", { children: empty.map((e) => /* @__PURE__ */ _jsx("li", { children: e })) }),
		t ? /* @__PURE__ */ _jsx("p", { children: "SIM" }) : /* @__PURE__ */ _jsx("p", { children: "NAO" }),
		f ? /* @__PURE__ */ _jsx("p", { children: "SIM" }) : /* @__PURE__ */ _jsx("p", { children: "NAO" }),
		null,
		undefined,
		false,
		true,
		/* @__PURE__ */ _jsx("div", { children: "0" }),
		/* @__PURE__ */ _jsx("div", { children: 0 }),
		/* @__PURE__ */ _jsx("div", { children: "" }),
		/* @__PURE__ */ _jsx("div", { children: () => "ola mundo" }),
		/* @__PURE__ */ _jsx("div", { children: () => /* @__PURE__ */ _jsx("em", { children: "fn" }) }),
		/* @__PURE__ */ _jsx("div", { children: () => [1, 2] }),
		/* @__PURE__ */ _jsx("div", { children: Child({}) }),
		/* @__PURE__ */ _jsx("div", { children: /* @__PURE__ */ _jsx(Child, {}) }),
		/* @__PURE__ */ _jsx(Wrapper, { children: /* @__PURE__ */ _jsx("b", { children: "dentro" }) }),
		/* @__PURE__ */ _jsx("div", {
			className: "caixa",
			id: "i1",
			title: "oi"
		}),
		/* @__PURE__ */ _jsx("input", {
			disabled: true,
			readOnly: true
		}),
		/* @__PURE__ */ _jsx("div", { style: {
			color: "red",
			fontSize: 12,
			marginTop: 0
		} }),
		/* @__PURE__ */ _jsx("img", {
			src: "a.png",
			alt: "a"
		}),
		/* @__PURE__ */ _jsx("br", {}),
		/* @__PURE__ */ _jsx("hr", {}),
		/* @__PURE__ */ _jsx("input", {
			type: "text",
			value: "v"
		}),
		/* @__PURE__ */ _jsx("div", { children: "<script>alert(1)<\/script>" }),
		/* @__PURE__ */ _jsx("div", { title: "aspas \" e & < >" }),
		/* @__PURE__ */ _jsx("p", { children: "5 < 6 && 7 > 3" }),
		/* @__PURE__ */ _jsxs("svg", {
			viewBox: "0 0 24 24",
			strokeWidth: 2,
			children: [/* @__PURE__ */ _jsx("circle", {
				cx: 12,
				cy: 12,
				r: 10,
				strokeWidth: 2
			}), /* @__PURE__ */ _jsx("path", { d: "M0 0 L10 10" })]
		}),
		/* @__PURE__ */ _jsx("svg", { children: /* @__PURE__ */ _jsx("line", {
			strokeLinecap: "round",
			fillRule: "evenodd",
			vectorEffect: "none"
		}) }),
		/* @__PURE__ */ _jsx("div", {
			tabIndex: 0,
			"data-id": "7",
			"data-value": 42,
			"aria-hidden": true
		}),
		/* @__PURE__ */ _jsx("my-element", {
			"some-attr": "v",
			"another-prop": "w"
		}),
		/* @__PURE__ */ _jsx("div", { children: "via props" }),
		/* @__PURE__ */ _jsx("div", { children: /* @__PURE__ */ _jsx("section", { children: /* @__PURE__ */ _jsx("article", { children: /* @__PURE__ */ _jsx("p", { children: "profundo" }) }) }) }),
		/* @__PURE__ */ _jsx("div", { "data-computed": (() => "fn-prop")() }),
		/* @__PURE__ */ _jsx("div", { children: [
			"txt",
			1,
			null,
			false,
			/* @__PURE__ */ _jsx("i", { children: "el" })
		] }),
		/* @__PURE__ */ _jsx(HydrateComponet, {}),
		/* @__PURE__ */ _jsx(ClientComponet, {}),
		/* @__PURE__ */ _jsx(HydrateComponetChildClient, {})
	] });
}
function Child(props) {
	return /* @__PURE__ */ _jsxs("em", { children: ["child", props.children] });
}
function Wrapper(props) {
	return /* @__PURE__ */ _jsx("div", {
		className: "wrap",
		children: props.children
	});
}

//# sourceMappingURL=index.js.map
