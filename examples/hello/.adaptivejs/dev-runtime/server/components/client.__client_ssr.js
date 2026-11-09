import { events, signal } from "@adaptive-js/web";
import { jsx as _jsx } from "@adaptive-js/web/jsx-runtime";
export const ClientComponet = () => {
	const [test, setTest] = signal(0);
	events(() => {
		console.log(test());
	});
	return /* @__PURE__ */ _jsx("div", {
		onClick: () => {
			setTest(test() + 1);
		},
		children: "Cliente Render"
	});
};

//# sourceMappingURL=client.__client_ssr.js.map
