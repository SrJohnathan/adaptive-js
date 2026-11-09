import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
export default function NotFoundPage() {
	return /* @__PURE__ */ _jsx("main", {
		className: "grid min-h-screen place-items-center bg-zinc-950 p-6 text-white",
		children: /* @__PURE__ */ _jsxs("section", {
			className: "max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-8",
			children: [
				/* @__PURE__ */ _jsx("span", {
					className: "text-sm font-black uppercase tracking-[0.2em] text-pink-300",
					children: "404"
				}),
				/* @__PURE__ */ _jsx("h1", {
					className: "mt-4 text-4xl font-black",
					children: "Pagina nao encontrada"
				}),
				/* @__PURE__ */ _jsx("p", {
					className: "mt-3 text-zinc-400",
					children: "Esta rota nao existe, ou voce tentou acessar uma pagina protegida sem sessao valida."
				}),
				/* @__PURE__ */ _jsx("a", {
					className: "mt-6 inline-flex rounded-full bg-gradient-to-r from-yellow-300 via-pink-400 to-violet-500 px-5 py-2 font-black text-zinc-950",
					href: "/",
					children: "Voltar para a Rede"
				})
			]
		})
	});
}

//# sourceMappingURL=404.js.map
