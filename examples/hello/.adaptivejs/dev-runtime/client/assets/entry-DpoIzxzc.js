import { _ as jsx, a as signal, b as __exportAll, d as events, g as Fragment, n as hydrateClientComponents, t as markClientExport, v as jsxs, y as callServerAction } from "./chunk-i_LCywE4.js";
import { t as ClientComponet } from "./chunk-DN-WYAzQ.js";
import "./chunk-BA1xHxXS.js";

//#region ../../extension/components/dist/skeleton-loader.js
const SkeletonLoader = (props) => {
	const getValue = (prop, fallback) => {
		if (typeof prop === "function") return prop();
		return prop !== void 0 ? prop : fallback;
	};
	const formatDimension = (val) => {
		if (val === void 0) return void 0;
		return typeof val === "number" ? `${val}px` : val;
	};
	const variant = () => getValue(props.variant, "text");
	const animated = () => getValue(props.animated, true);
	const lines = () => getValue(props.lines, 1);
	const customClass = () => getValue(props.class, "");
	const customStyle = () => getValue(props.style, {});
	const theme = () => getValue(props.theme, void 0);
	const resolveWidth = () => getValue(props.width, void 0);
	const resolveHeight = () => getValue(props.height, void 0);
	const computedWidth = () => {
		const rawWidth = resolveWidth();
		if (rawWidth !== void 0) return formatDimension(rawWidth);
		return variant() === "circular" ? "40px" : "100%";
	};
	const computedHeight = () => {
		const rawHeight = resolveHeight();
		if (rawHeight !== void 0) return formatDimension(rawHeight);
		const v = variant();
		if (v === "text") return "1em";
		if (v === "circular") return "40px";
		if (v === "card") return "180px";
		return "100px";
	};
	const containerStyle = () => ({
		display: "flex",
		flexDirection: "column",
		gap: "8px",
		...customStyle()
	});
	const baseStyle = () => ({
		width: computedWidth(),
		height: computedHeight(),
		...customStyle()
	});
	return jsxs(Fragment, { children: [() => {
		const v = variant();
		const l = lines();
		if (v === "text" && l > 1) return jsx("div", {
			class: () => `skeleton-container ${customClass()}`,
			style: containerStyle,
			children: Array.from({ length: l }).map((_, index) => jsx(SkeletonLoader, {
				variant: "text",
				width: () => {
					const resolved = resolveWidth();
					return index === l - 1 && !resolved ? "70%" : resolved;
				},
				height: props.height,
				animated: props.animated,
				theme: props.theme
			}, index))
		});
		return jsx("div", {
			class: () => `skeleton-base skeleton-${v} ${animated() ? "skeleton-animated" : ""} ${theme() ? `skeleton-theme-${theme()}` : ""} ${customClass()}`,
			style: baseStyle
		});
	}, jsx("style", { children: `
        .skeleton-base {
          display: inline-block;
          background-color: var(--skeleton-bg, #e2e8f0);
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
        }

        .skeleton-text {
          border-radius: 4px;
          margin-top: 0.25em;
          margin-bottom: 0.25em;
        }

        .skeleton-circular {
          border-radius: 50%;
        }

        .skeleton-rectangular {
          border-radius: 0px;
        }

        .skeleton-rounded {
          border-radius: 8px;
        }

        .skeleton-card {
          border-radius: 12px;
        }

        .skeleton-animated::after {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          transform: translateX(-100%);
          background-image: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0,
            var(--skeleton-shine-a, rgba(255, 255, 255, 0.4)) 20%,
            var(--skeleton-shine-b, rgba(255, 255, 255, 0.6)) 60%,
            rgba(255, 255, 255, 0)
          );
          animation: skeleton-shimmer 1.5s infinite;
          content: '';
        }

        @keyframes skeleton-shimmer {
          100% {
            transform: translateX(100%);
          }
        }

        /* theme="dark" força escuro */
        .skeleton-theme-dark {
          --skeleton-bg: #2d3748;
          --skeleton-shine-a: rgba(255, 255, 255, 0.08);
          --skeleton-shine-b: rgba(255, 255, 255, 0.16);
        }

        /* sem theme: segue o sistema. theme="light" fica de fora e usa o padrão claro */
        @media (prefers-color-scheme: dark) {
          .skeleton-base:not(.skeleton-theme-light):not(.skeleton-theme-dark) {
            --skeleton-bg: #2d3748;
            --skeleton-shine-a: rgba(255, 255, 255, 0.08);
            --skeleton-shine-b: rgba(255, 255, 255, 0.16);
          }
        }
      ` })] });
};

//#endregion
//#region src/actions/index.ts
const somar = (...args) => callServerAction("actions/index", "somar", args);

//#endregion
//#region src/components/hydrate.tsx
var hydrate_exports = /* @__PURE__ */ __exportAll({
	HydrateComponet: () => HydrateComponet,
	HydrateComponetChildClient: () => HydrateComponetChildClient,
	HydrateComponetErrorDigito: () => HydrateComponetErrorDigito
});
const HydrateComponet = () => {
	const [test, setTest] = signal(0);
	events(() => {
		console.log(test());
	});
	return /* @__PURE__ */ jsx("div", {
		onClick: () => {
			somar(5, 10).then((value) => setTest(value));
		},
		children: "Hydrate Render"
	});
};
const HydrateComponetChildClient = () => {
	return /* @__PURE__ */ jsxs("div", { children: [
		/* @__PURE__ */ jsx("div", { children: "Hydrate Render Filho" }),
		/* @__PURE__ */ jsx(SkeletonLoader, {
			theme: "light",
			animated: true,
			variant: "rectangular"
		}),
		/* @__PURE__ */ jsx(ClientComponet, {})
	] });
};
const HydrateComponetErrorDigito = () => {
	return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { children: "Hydrate Render" }) });
};
typeof HydrateComponet === "function" && markClientExport(HydrateComponet, "components/hydrate", "HydrateComponet", "hydrate");
typeof HydrateComponetChildClient === "function" && markClientExport(HydrateComponetChildClient, "components/hydrate", "HydrateComponetChildClient", "hydrate");
typeof HydrateComponetErrorDigito === "function" && markClientExport(HydrateComponetErrorDigito, "components/hydrate", "HydrateComponetErrorDigito", "hydrate");

//#endregion
//#region .adaptive-temp/dev-runtime-1791415595625-cveadg/temp/client-components/components__hydrate.tsx
hydrateClientComponents("components/hydrate", hydrate_exports);

//#endregion
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnktRHBvSXp4emMuanMiLCJuYW1lcyI6WyJfanN4cyIsIl9GcmFnbWVudCIsIl9qc3giLCJjbGllbnRNb2R1bGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9leHRlbnNpb24vY29tcG9uZW50cy9kaXN0L3NrZWxldG9uLWxvYWRlci5qcyIsIi4uLy4uLy4uLy4uL3NyYy9hY3Rpb25zL2luZGV4LnRzIiwiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvaHlkcmF0ZS50c3giLCIuLi8uLi90ZW1wL2NsaWVudC1jb21wb25lbnRzL2NvbXBvbmVudHNfX2h5ZHJhdGUudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGpzeCBhcyBfanN4LCBGcmFnbWVudCBhcyBfRnJhZ21lbnQsIGpzeHMgYXMgX2pzeHMgfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3dlYi9qc3gtcnVudGltZVwiO1xuZXhwb3J0IGNvbnN0IFNrZWxldG9uTG9hZGVyID0gKHByb3BzKSA9PiB7XG4gICAgLy8gSGVscGVyIHBhcmEgcmVzb2x2ZXIgcHJvcHMgcXVlIHBvZGVtIHZpciBjb21vIFNpZ25hbC9GdW7Dp8OjbyBvdSB2YWxvciBkaXJldG9cbiAgICBjb25zdCBnZXRWYWx1ZSA9IChwcm9wLCBmYWxsYmFjaykgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHByb3AgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgcmV0dXJuIHByb3AoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJvcCAhPT0gdW5kZWZpbmVkID8gcHJvcCA6IGZhbGxiYWNrO1xuICAgIH07XG4gICAgY29uc3QgZm9ybWF0RGltZW5zaW9uID0gKHZhbCkgPT4ge1xuICAgICAgICBpZiAodmFsID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gdHlwZW9mIHZhbCA9PT0gXCJudW1iZXJcIiA/IGAke3ZhbH1weGAgOiB2YWw7XG4gICAgfTtcbiAgICBjb25zdCB2YXJpYW50ID0gKCkgPT4gZ2V0VmFsdWUocHJvcHMudmFyaWFudCwgXCJ0ZXh0XCIpO1xuICAgIGNvbnN0IGFuaW1hdGVkID0gKCkgPT4gZ2V0VmFsdWUocHJvcHMuYW5pbWF0ZWQsIHRydWUpO1xuICAgIGNvbnN0IGxpbmVzID0gKCkgPT4gZ2V0VmFsdWUocHJvcHMubGluZXMsIDEpO1xuICAgIGNvbnN0IGN1c3RvbUNsYXNzID0gKCkgPT4gZ2V0VmFsdWUocHJvcHMuY2xhc3MsIFwiXCIpO1xuICAgIGNvbnN0IGN1c3RvbVN0eWxlID0gKCkgPT4gZ2V0VmFsdWUocHJvcHMuc3R5bGUsIHt9KTtcbiAgICBjb25zdCB0aGVtZSA9ICgpID0+IGdldFZhbHVlKHByb3BzLnRoZW1lLCB1bmRlZmluZWQpO1xuICAgIC8vIFJlc29sdmUgd2lkdGgvaGVpZ2h0IHF1ZSBwb2RlbSB2aXIgY29tbyB2YWxvciBkaXJldG8gb3UgY29tbyB0aHVua1xuICAgIGNvbnN0IHJlc29sdmVXaWR0aCA9ICgpID0+IGdldFZhbHVlKHByb3BzLndpZHRoLCB1bmRlZmluZWQpO1xuICAgIGNvbnN0IHJlc29sdmVIZWlnaHQgPSAoKSA9PiBnZXRWYWx1ZShwcm9wcy5oZWlnaHQsIHVuZGVmaW5lZCk7XG4gICAgY29uc3QgY29tcHV0ZWRXaWR0aCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgcmF3V2lkdGggPSByZXNvbHZlV2lkdGgoKTtcbiAgICAgICAgaWYgKHJhd1dpZHRoICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgICByZXR1cm4gZm9ybWF0RGltZW5zaW9uKHJhd1dpZHRoKTtcbiAgICAgICAgcmV0dXJuIHZhcmlhbnQoKSA9PT0gXCJjaXJjdWxhclwiID8gXCI0MHB4XCIgOiBcIjEwMCVcIjtcbiAgICB9O1xuICAgIGNvbnN0IGNvbXB1dGVkSGVpZ2h0ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCByYXdIZWlnaHQgPSByZXNvbHZlSGVpZ2h0KCk7XG4gICAgICAgIGlmIChyYXdIZWlnaHQgIT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXREaW1lbnNpb24ocmF3SGVpZ2h0KTtcbiAgICAgICAgY29uc3QgdiA9IHZhcmlhbnQoKTtcbiAgICAgICAgaWYgKHYgPT09IFwidGV4dFwiKVxuICAgICAgICAgICAgcmV0dXJuIFwiMWVtXCI7XG4gICAgICAgIGlmICh2ID09PSBcImNpcmN1bGFyXCIpXG4gICAgICAgICAgICByZXR1cm4gXCI0MHB4XCI7XG4gICAgICAgIGlmICh2ID09PSBcImNhcmRcIilcbiAgICAgICAgICAgIHJldHVybiBcIjE4MHB4XCI7XG4gICAgICAgIHJldHVybiBcIjEwMHB4XCI7XG4gICAgfTtcbiAgICBjb25zdCBjb250YWluZXJTdHlsZSA9ICgpID0+ICh7XG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxuICAgICAgICBmbGV4RGlyZWN0aW9uOiBcImNvbHVtblwiLFxuICAgICAgICBnYXA6IFwiOHB4XCIsXG4gICAgICAgIC4uLmN1c3RvbVN0eWxlKCksXG4gICAgfSk7XG4gICAgY29uc3QgYmFzZVN0eWxlID0gKCkgPT4gKHtcbiAgICAgICAgd2lkdGg6IGNvbXB1dGVkV2lkdGgoKSxcbiAgICAgICAgaGVpZ2h0OiBjb21wdXRlZEhlaWdodCgpLFxuICAgICAgICAuLi5jdXN0b21TdHlsZSgpLFxuICAgIH0pO1xuICAgIHJldHVybiAoX2pzeHMoX0ZyYWdtZW50LCB7IGNoaWxkcmVuOiBbKCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHYgPSB2YXJpYW50KCk7XG4gICAgICAgICAgICAgICAgY29uc3QgbCA9IGxpbmVzKCk7XG4gICAgICAgICAgICAgICAgLy8gU2UgZm9yIHZhcmlhbnRlICd0ZXh0JyBjb20gbcO6bHRpcGxhcyBsaW5oYXNcbiAgICAgICAgICAgICAgICBpZiAodiA9PT0gXCJ0ZXh0XCIgJiYgbCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChfanN4KFwiZGl2XCIsIHsgY2xhc3M6ICgpID0+IGBza2VsZXRvbi1jb250YWluZXIgJHtjdXN0b21DbGFzcygpfWAsIHN0eWxlOiBjb250YWluZXJTdHlsZSwgY2hpbGRyZW46IEFycmF5LmZyb20oeyBsZW5ndGg6IGwgfSkubWFwKChfLCBpbmRleCkgPT4gKF9qc3goU2tlbGV0b25Mb2FkZXIsIHsgdmFyaWFudDogXCJ0ZXh0XCIsIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIENvcnJlw6fDo286IGF2YWxpYSBvIHZhbG9yIHJlYWwgZG8gd2lkdGggYW50ZXMgZG8gZmFsbGJhY2sgZGUgNzAlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzb2x2ZWQgPSByZXNvbHZlV2lkdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4ID09PSBsIC0gMSAmJiAhcmVzb2x2ZWQgPyBcIjcwJVwiIDogcmVzb2x2ZWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgaGVpZ2h0OiBwcm9wcy5oZWlnaHQsIGFuaW1hdGVkOiBwcm9wcy5hbmltYXRlZCwgdGhlbWU6IHByb3BzLnRoZW1lIH0sIGluZGV4KSkpIH0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIChfanN4KFwiZGl2XCIsIHsgY2xhc3M6ICgpID0+IGBza2VsZXRvbi1iYXNlIHNrZWxldG9uLSR7dn0gJHthbmltYXRlZCgpID8gXCJza2VsZXRvbi1hbmltYXRlZFwiIDogXCJcIn0gJHt0aGVtZSgpID8gYHNrZWxldG9uLXRoZW1lLSR7dGhlbWUoKX1gIDogXCJcIn0gJHtjdXN0b21DbGFzcygpfWAsIHN0eWxlOiBiYXNlU3R5bGUgfSkpO1xuICAgICAgICAgICAgfSwgX2pzeChcInN0eWxlXCIsIHsgY2hpbGRyZW46IGBcbiAgICAgICAgLnNrZWxldG9uLWJhc2Uge1xuICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1za2VsZXRvbi1iZywgI2UyZThmMCk7XG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5za2VsZXRvbi10ZXh0IHtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgICAgbWFyZ2luLXRvcDogMC4yNWVtO1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDAuMjVlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC5za2VsZXRvbi1jaXJjdWxhciB7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICB9XG5cbiAgICAgICAgLnNrZWxldG9uLXJlY3Rhbmd1bGFyIHtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAwcHg7XG4gICAgICAgIH1cblxuICAgICAgICAuc2tlbGV0b24tcm91bmRlZCB7XG4gICAgICAgICAgYm9yZGVyLXJhZGl1czogOHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLnNrZWxldG9uLWNhcmQge1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7XG4gICAgICAgIH1cblxuICAgICAgICAuc2tlbGV0b24tYW5pbWF0ZWQ6OmFmdGVyIHtcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtMTAwJSk7XG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KFxuICAgICAgICAgICAgOTBkZWcsXG4gICAgICAgICAgICByZ2JhKDI1NSwgMjU1LCAyNTUsIDApIDAsXG4gICAgICAgICAgICB2YXIoLS1za2VsZXRvbi1zaGluZS1hLCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNCkpIDIwJSxcbiAgICAgICAgICAgIHZhcigtLXNrZWxldG9uLXNoaW5lLWIsIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KSkgNjAlLFxuICAgICAgICAgICAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwKVxuICAgICAgICAgICk7XG4gICAgICAgICAgYW5pbWF0aW9uOiBza2VsZXRvbi1zaGltbWVyIDEuNXMgaW5maW5pdGU7XG4gICAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIH1cblxuICAgICAgICBAa2V5ZnJhbWVzIHNrZWxldG9uLXNoaW1tZXIge1xuICAgICAgICAgIDEwMCUge1xuICAgICAgICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDEwMCUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qIHRoZW1lPVwiZGFya1wiIGZvcsOnYSBlc2N1cm8gKi9cbiAgICAgICAgLnNrZWxldG9uLXRoZW1lLWRhcmsge1xuICAgICAgICAgIC0tc2tlbGV0b24tYmc6ICMyZDM3NDg7XG4gICAgICAgICAgLS1za2VsZXRvbi1zaGluZS1hOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDgpO1xuICAgICAgICAgIC0tc2tlbGV0b24tc2hpbmUtYjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjE2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qIHNlbSB0aGVtZTogc2VndWUgbyBzaXN0ZW1hLiB0aGVtZT1cImxpZ2h0XCIgZmljYSBkZSBmb3JhIGUgdXNhIG8gcGFkcsOjbyBjbGFybyAqL1xuICAgICAgICBAbWVkaWEgKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKSB7XG4gICAgICAgICAgLnNrZWxldG9uLWJhc2U6bm90KC5za2VsZXRvbi10aGVtZS1saWdodCk6bm90KC5za2VsZXRvbi10aGVtZS1kYXJrKSB7XG4gICAgICAgICAgICAtLXNrZWxldG9uLWJnOiAjMmQzNzQ4O1xuICAgICAgICAgICAgLS1za2VsZXRvbi1zaGluZS1hOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDgpO1xuICAgICAgICAgICAgLS1za2VsZXRvbi1zaGluZS1iOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMTYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgYCB9KV0gfSkpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNrZWxldG9uLWxvYWRlci5qcy5tYXAiLCJpbXBvcnQgeyBjYWxsU2VydmVyQWN0aW9uIH0gZnJvbSBcIkBhZGFwdGl2ZS1qcy93ZWJcIjtcbmV4cG9ydCBjb25zdCBzb21hciA9ICguLi5hcmdzKSA9PiBjYWxsU2VydmVyQWN0aW9uKFwiYWN0aW9ucy9pbmRleFwiLCBcInNvbWFyXCIsIGFyZ3MpO1xuZXhwb3J0IGNvbnN0IGVjbyA9ICguLi5hcmdzKSA9PiBjYWxsU2VydmVyQWN0aW9uKFwiYWN0aW9ucy9pbmRleFwiLCBcImVjb1wiLCBhcmdzKTtcbmV4cG9ydCBjb25zdCBsZXJTZWdyZWRvID0gKC4uLmFyZ3MpID0+IGNhbGxTZXJ2ZXJBY3Rpb24oXCJhY3Rpb25zL2luZGV4XCIsIFwibGVyU2VncmVkb1wiLCBhcmdzKTtcbmV4cG9ydCBjb25zdCB2ZXJDb250ZXh0byA9ICguLi5hcmdzKSA9PiBjYWxsU2VydmVyQWN0aW9uKFwiYWN0aW9ucy9pbmRleFwiLCBcInZlckNvbnRleHRvXCIsIGFyZ3MpO1xuZXhwb3J0IGNvbnN0IGZhbGhhciA9ICguLi5hcmdzKSA9PiBjYWxsU2VydmVyQWN0aW9uKFwiYWN0aW9ucy9pbmRleFwiLCBcImZhbGhhclwiLCBhcmdzKTtcbmV4cG9ydCBjb25zdCBpbnNwZWNpb25hciA9ICguLi5hcmdzKSA9PiBjYWxsU2VydmVyQWN0aW9uKFwiYWN0aW9ucy9pbmRleFwiLCBcImluc3BlY2lvbmFyXCIsIGFyZ3MpOyIsIidoeWRyYXRlJ1xuaW1wb3J0IHtTa2VsZXRvbkxvYWRlcn0gZnJvbSBcIkBhZGFwdGl2ZS1qcy9jb21wb25lbnRzXCI7XG5pbXBvcnQge3NvbWFyfSBmcm9tIFwiLi4vYWN0aW9uc1wiO1xuaW1wb3J0IHtldmVudHMsIHNpZ25hbH0gZnJvbSBcIkBhZGFwdGl2ZS1qcy93ZWJcIjtcbmltcG9ydCB7Q2xpZW50Q29tcG9uZXR9IGZyb20gXCIuL2NsaWVudFwiO1xuXG5leHBvcnQgY29uc3QgSHlkcmF0ZUNvbXBvbmV0ID0gKCkgPT4ge1xuXG5cbiAgICBjb25zdCBbdGVzdCxzZXRUZXN0XSA9IHNpZ25hbCgwKVxuXG4gICAgZXZlbnRzKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2codGVzdCgpKVxuICAgIH0pXG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2IG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICAgIHNvbWFyKDUsMTApLnRoZW4odmFsdWUgPT4gICBzZXRUZXN0KCAgdmFsdWUgKSApXG5cbiAgICAgICAgfX0gPkh5ZHJhdGUgUmVuZGVyPC9kaXY+XG4gICAgKVxufVxuXG5leHBvcnQgY29uc3QgSHlkcmF0ZUNvbXBvbmV0Q2hpbGRDbGllbnQgPSAoKSA9PiB7XG5cbiAgICByZXR1cm4gKDxkaXY+XG4gICAgICAgICAgICA8ZGl2Pkh5ZHJhdGUgUmVuZGVyIEZpbGhvPC9kaXY+XG4gICAgICAgICAgICA8U2tlbGV0b25Mb2FkZXIgIHRoZW1lPXsgXCJsaWdodFwiIH0gYW5pbWF0ZWQ9e3RydWV9IHZhcmlhbnQ9e1wicmVjdGFuZ3VsYXJcIn0gLz5cbiAgICAgICAgICAgIDxDbGllbnRDb21wb25ldC8+XG4gICAgPC9kaXY+XG5cblxuXG4gICAgKVxufVxuXG5cbmV4cG9ydCBjb25zdCBIeWRyYXRlQ29tcG9uZXRFcnJvckRpZ2l0byA9ICgpID0+IHtcblxuICAgIHJldHVybiAoPD5cbiAgICAgICAgICAgIDxkaXY+SHlkcmF0ZSBSZW5kZXI8L2Rpdj5cblxuICAgICAgICA8Lz5cblxuICAgIClcbn0iLCJcbmltcG9ydCAqIGFzIGNsaWVudE1vZHVsZSBmcm9tIFwiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvaHlkcmF0ZS50c3hcIjtcbmltcG9ydCB7IGh5ZHJhdGVDbGllbnRDb21wb25lbnRzIH0gZnJvbSBcIkBhZGFwdGl2ZS1qcy93ZWJcIjtcblxuaHlkcmF0ZUNsaWVudENvbXBvbmVudHMoXCJjb21wb25lbnRzL2h5ZHJhdGVcIiwgY2xpZW50TW9kdWxlKTtcbmV4cG9ydCB7fTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxNQUFhLGtCQUFrQixVQUFVO0NBRXJDLE1BQU0sWUFBWSxNQUFNLGFBQWE7RUFDakMsSUFBSSxPQUFPLFNBQVMsWUFDaEIsT0FBTyxLQUFLO0VBRWhCLE9BQU8sU0FBUyxTQUFZLE9BQU87Q0FDdkM7Q0FDQSxNQUFNLG1CQUFtQixRQUFRO0VBQzdCLElBQUksUUFBUSxRQUNSLE9BQU87RUFDWCxPQUFPLE9BQU8sUUFBUSxXQUFXLEdBQUcsSUFBSSxNQUFNO0NBQ2xEO0NBQ0EsTUFBTSxnQkFBZ0IsU0FBUyxNQUFNLFNBQVMsTUFBTTtDQUNwRCxNQUFNLGlCQUFpQixTQUFTLE1BQU0sVUFBVSxJQUFJO0NBQ3BELE1BQU0sY0FBYyxTQUFTLE1BQU0sT0FBTyxDQUFDO0NBQzNDLE1BQU0sb0JBQW9CLFNBQVMsTUFBTSxPQUFPLEVBQUU7Q0FDbEQsTUFBTSxvQkFBb0IsU0FBUyxNQUFNLE9BQU8sQ0FBQyxDQUFDO0NBQ2xELE1BQU0sY0FBYyxTQUFTLE1BQU0sT0FBTyxNQUFTO0NBRW5ELE1BQU0scUJBQXFCLFNBQVMsTUFBTSxPQUFPLE1BQVM7Q0FDMUQsTUFBTSxzQkFBc0IsU0FBUyxNQUFNLFFBQVEsTUFBUztDQUM1RCxNQUFNLHNCQUFzQjtFQUN4QixNQUFNLFdBQVcsYUFBYTtFQUM5QixJQUFJLGFBQWEsUUFDYixPQUFPLGdCQUFnQixRQUFRO0VBQ25DLE9BQU8sUUFBUSxNQUFNLGFBQWEsU0FBUztDQUMvQztDQUNBLE1BQU0sdUJBQXVCO0VBQ3pCLE1BQU0sWUFBWSxjQUFjO0VBQ2hDLElBQUksY0FBYyxRQUNkLE9BQU8s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