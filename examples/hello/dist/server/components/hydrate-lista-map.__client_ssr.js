import { signal } from "@adaptive-js/web";
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
// Simple component that displays different content based on props
const TestItem = (props) => /* @__PURE__ */ _jsxs("div", {
	style: {
		border: "1px solid #ccc",
		padding: "8px",
		margin: "4px"
	},
	children: [
		/* @__PURE__ */ _jsx("strong", { children: props.label }),
		": ",
		() => props.count()
	]
});
// Another simple component with different styling
const TestItemAlt = (props) => /* @__PURE__ */ _jsxs("div", {
	style: {
		border: "2px solid #f00",
		padding: "8px",
		margin: "4px",
		background: "#ffe0e0"
	},
	children: [
		/* @__PURE__ */ _jsx("em", { children: props.label }),
		" = ",
		() => props.count() * 2
	]
});
export default function HydrateListaMap() {
	// Signal that drives the list render
	const [counter, setCounter] = signal(0);
	// Items to render - alternating between two component types
	const items = () => [
		{
			id: 1,
			label: "Item A",
			component: TestItem
		},
		{
			id: 2,
			label: "Item B",
			component: TestItemAlt
		},
		{
			id: 3,
			label: "Item C",
			component: TestItem
		},
		{
			id: 4,
			label: "Item D",
			component: TestItemAlt
		},
		{
			id: 5,
			label: "Item E",
			component: TestItem
		}
	];
	return /* @__PURE__ */ _jsxs("div", {
		style: {
			padding: "20px",
			fontFamily: "monospace"
		},
		children: [
			/* @__PURE__ */ _jsx("h2", { children: "HydrateListaMap Test" }),
			/* @__PURE__ */ _jsxs("div", {
				style: { marginBottom: "20px" },
				children: [/* @__PURE__ */ _jsxs("p", { children: [
					/* @__PURE__ */ _jsx("strong", { children: "Counter:" }),
					" ",
					() => counter()
				] }), /* @__PURE__ */ _jsx("button", {
					onClick: () => setCounter(counter() + 1),
					style: {
						padding: "8px 16px",
						fontSize: "14px",
						cursor: "pointer",
						background: "#007bff",
						color: "white",
						border: "none",
						borderRadius: "4px"
					},
					children: "Increment Counter"
				})]
			}),
			/* @__PURE__ */ _jsxs("div", {
				style: {
					background: "#f5f5f5",
					padding: "12px",
					borderRadius: "4px",
					marginBottom: "16px"
				},
				children: [/* @__PURE__ */ _jsx("strong", { children: "Test Instructions:" }), /* @__PURE__ */ _jsxs("ol", { children: [
					/* @__PURE__ */ _jsx("li", { children: "Wait for page to fully hydrate" }),
					/* @__PURE__ */ _jsx("li", { children: "Click \"Increment Counter\" button" }),
					/* @__PURE__ */ _jsx("li", { children: "Expected: All items below should update to show new counter value" }),
					/* @__PURE__ */ _jsx("li", { children: "Actual (bug): Items stay the same, counter doesn't propagate to components" })
				] })]
			}),
			/* @__PURE__ */ _jsxs("div", {
				style: {
					border: "2px solid #333",
					padding: "16px",
					background: "#fff"
				},
				children: [/* @__PURE__ */ _jsx("h3", { children: "Items (should update when counter changes):" }), () => items().map((item) => {
					const Component = item.component;
					return /* @__PURE__ */ _jsx(Component, {
						label: item.label,
						count: () => counter() + item.id
					}, item.id);
				})]
			}),
			/* @__PURE__ */ _jsxs("div", {
				style: {
					marginTop: "20px",
					padding: "12px",
					background: "#e8f4f8",
					borderRadius: "4px",
					fontSize: "12px"
				},
				children: [/* @__PURE__ */ _jsx("strong", { children: "Diagnosis Notes:" }), /* @__PURE__ */ _jsxs("ul", { children: [
					/* @__PURE__ */ _jsx("li", { children: "✓ Client mode: Should update correctly" }),
					/* @__PURE__ */ _jsx("li", { children: "✓ Single component type: Should update correctly" }),
					/* @__PURE__ */ _jsx("li", { children: "✗ Hydrate + varied components in .map(): Props don't trigger re-renders" }),
					/* @__PURE__ */ _jsxs("li", { children: ["Issue likely in: ", /* @__PURE__ */ _jsx("code", { children: "packages/web/src/hy/hydrate/reactive.ts" })] })
				] })]
			})
		]
	});
}

//# sourceMappingURL=hydrate-lista-map.__client_ssr.js.map
