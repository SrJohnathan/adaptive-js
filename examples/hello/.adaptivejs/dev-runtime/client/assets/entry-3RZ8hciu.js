import { _ as jsx, a as signal, b as __exportAll, d as events, f as isSSR, n as hydrateClientComponents, o as store, r as memo, s as batch, t as markClientExport, v as jsxs } from "./chunk-i_LCywE4.js";

//#region src/components/reactive-hydrate.tsx
var reactive_hydrate_exports = /* @__PURE__ */ __exportAll({
	HydrateBatch: () => HydrateBatch,
	HydrateCondicional: () => HydrateCondicional,
	HydrateEfeito: () => HydrateEfeito,
	HydrateListaMap: () => HydrateListaMap,
	HydrateListaObjetos: () => HydrateListaObjetos,
	HydrateListaReorder: () => HydrateListaReorder,
	HydrateMemo: () => HydrateMemo,
	HydrateQuebra: () => HydrateQuebra,
	HydrateRecebeProps: () => HydrateRecebeProps,
	HydrateStore: () => HydrateStore,
	HydrateTernario: () => HydrateTernario
});
/**
* Suíte de reatividade para ilhas "hydrate".
*
* Mesma regra do client: valor dinâmico vai dentro de thunk.
*   {() => x()}      → filho reativo (range com marcadores)
*   attr={() => x()} → atributo ligado a efeito
*
* A diferença é que o servidor renderiza o HTML inicial. Se o valor inicial
* não estiver na tela, o SSR não rodou — e o hydration vai complainar.
*
* Sobre `events()`: ele faz `if (isSSR()) return`, então o efeito NÃO roda no
* servidor. O console.log dentro dele aparece só no browser, depois do
* hydration — nunca no terminal do dev server.
*
* O que aparece no terminal é o `memo`: o cálculo inicial roda durante o
* render, antes do guard de SSR.
*/
const HydrateTernario = () => {
	const [ligado, setLigado] = signal(true);
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "hydrate-ternario",
		children: [
			/* @__PURE__ */ jsx("h3", { children: "1. Ternário" }),
			/* @__PURE__ */ jsxs("p", {
				"data-valor": () => ligado() ? "SIM" : "NAO",
				children: ["resultado: ", () => ligado() ? "ramo verdadeiro" : "ramo falso"]
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => setLigado(!ligado()),
				children: "alternar"
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => setLigado(true),
				children: "reset"
			})
		]
	});
};
const HydrateListaMap = () => {
	const [itens, setItens] = signal([
		"alpha",
		"beta",
		"gamma"
	]);
	const adicionar = (nome) => setItens([...itens(), nome]);
	const remover = (i) => setItens(itens().filter((_, idx) => idx !== i));
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "hydrate-lista",
		children: [
			/* @__PURE__ */ jsx("h3", { children: "2. Lista com map" }),
			/* @__PURE__ */ jsxs("span", {
				"data-total": () => itens().length,
				children: ["total: ", () => itens().length]
			}),
			/* @__PURE__ */ jsx("ul", { children: () => itens().map((item, i) => /* @__PURE__ */ jsxs("li", {
				"data-item": item,
				children: [
					i,
					": ",
					item,
					/* @__PURE__ */ jsx("button", {
						onClick: () => remover(i),
						children: "remover"
					})
				]
			}, item)) }),
			/* @__PURE__ */ jsx("button", {
				onClick: () => adicionar("item-" + (itens().length + 1)),
				children: "adicionar"
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => setItens([]),
				children: "limpar"
			})
		]
	});
};
const HydrateListaReorder = () => {
	const [nomes, setNomes] = signal([
		"Ana",
		"Bruno",
		"Carla"
	]);
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "hydrate-reorder",
		children: [
			/* @__PURE__ */ jsx("h3", { children: "3. Reordenar lista" }),
			/* @__PURE__ */ jsx("ul", { children: () => nomes().map((nome, i) => /* @__PURE__ */ jsxs("li", {
				"data-nome": nome,
				children: [
					i,
					": ",
					nome
				]
			}, nome)) }),
			/* @__PURE__ */ jsx("button", {
				onClick: () => setNomes([...nomes()].reverse()),
				children: "reverter"
			}),
			/* @__PURE__ */ jsxs("p", { children: [
				"O índice ",
				0,
				" deveria acompanhar a posição. Se o nome trocar mas o número ficar, a key não foi usada no diff."
			] })
		]
	});
};
const HydrateListaObjetos = () => {
	const [tarefas, setTarefas] = signal([
		{
			id: 1,
			texto: "estudar signals",
			feita: true
		},
		{
			id: 2,
			texto: "ler o renderToDOM",
			feita: false
		},
		{
			id: 3,
			texto: "testar no browser",
			feita: false
		}
	]);
	const alternar = (id) => setTarefas(tarefas().map((t) => t.id === id ? {
		...t,
		feita: !t.feita
	} : t));
	const feitas = () => tarefas().filter((t) => t.feita).length;
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "hydrate-objetos",
		children: [
			/* @__PURE__ */ jsx("h3", { children: "4. Lista de objetos" }),
			/* @__PURE__ */ jsxs("span", {
				"data-feitas": () => feitas(),
				children: [
					"feitas: ",
					() => feitas(),
					" / ",
					() => tarefas().length
				]
			}),
			/* @__PURE__ */ jsx("ul", { children: () => tarefas().map((t) => /* @__PURE__ */ jsx("li", {
				"data-feita": () => String(t.feita),
				children: /* @__PURE__ */ jsxs("button", {
					onClick: () => alternar(t.id),
					children: [
						() => t.feita ? "[x]" : "[ ]",
						" ",
						t.texto
					]
				})
			}, t.id)) })
		]
	});
};
const HydrateMemo = () => {
	const [a, setA] = signal(2);
	const [b, setB] = signal(3);
	const [calculos, setCalculos] = signal(0);
	const produto = memo(() => {
		setCalculos((n) => n + 1);
		console.log("[hydrate/memo] recalculando", a(), "*", b(), "=", a() * b());
		return a() * b();
	});
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "hydrate-memo",
		children: [
			/* @__PURE__ */ jsx("h3", { children: "5. memo" }),
			/* @__PURE__ */ jsxs("p", {
				"data-produto": () => produto(),
				children: ["a * b = ", () => produto()]
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => setA(a() + 1),
				children: "a++"
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => setB(b() + 1),
				children: "b++"
			}),
			/* @__PURE__ */ jsxs("p", {
				"data-calculos": () => calculos(),
				children: ["cálculos: ", () => calculos()]
			})
		]
	});
};
const HydrateStore = () => {
	const s = store({
		nome: "visitante",
		visitas: 0
	});
	const [getNome, setNome] = s.nome;
	const [getVisitas, setVisitas] = s.visitas;
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "hydrate-store",
		children: [
			/* @__PURE__ */ jsx("h3", { children: "6. store" }),
			/* @__PURE__ */ jsxs("p", {
				"data-nome": () => getNome(),
				children: ["nome: ", () => getNome()]
			}),
			/* @__PURE__ */ jsxs("p", {
				"data-visitas": () => getVisitas(),
				children: ["visitas: ", () => getVisitas()]
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => setVisitas((n) => n + 1),
				children: "visitar"
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => setNome((n) => n === "visitante" ? "editor" : "visitante"),
				children: "trocar nome"
			})
		]
	});
};
const HydrateBatch = () => {
	const [x, setX] = signal(0);
	const [y, setY] = signal(0);
	const [z, setZ] = signal(0);
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "hydrate-batch",
		children: [
			/* @__PURE__ */ jsx("h3", { children: "7. batch" }),
			/* @__PURE__ */ jsxs("p", {
				"data-x": () => x(),
				children: ["x: ", () => x()]
			}),
			/* @__PURE__ */ jsxs("p", {
				"data-y": () => y(),
				children: ["y: ", () => y()]
			}),
			/* @__PURE__ */ jsxs("p", {
				"data-z": () => z(),
				children: ["z: ", () => z()]
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => batch(() => {
					setX(x() + 1);
					setY(y() + 1);
					setZ(z() + 1);
				}),
				children: "somar os três"
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => {
					setX(x() + 1);
					setY(y() + 1);
					setZ(z() + 1);
				},
				children: "somar sem batch"
			})
		]
	});
};
const HydrateCondicional = () => {
	const [mostrar, setMostrar] = signal(false);
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "hydrate-condicional",
		children: [
			/* @__PURE__ */ jsx("h3", { children: "8. Condicional" }),
			/* @__PURE__ */ jsx("button", {
				onClick: () => setMostrar(!mostrar()),
				children: () => mostrar() ? "esconder" : "mostrar"
			}),
			() => mostrar() ? /* @__PURE__ */ jsx("section", {
				"data-bloco": "visivel",
				children: /* @__PURE__ */ jsx("p", { children: "Bloco visível" })
			}) : /* @__PURE__ */ jsx("p", {
				"data-bloco": "oculto",
				children: "Nada aqui"
			})
		]
	});
};
const HydrateRecebeProps = ({ titulo = "sem título", valor = 0 }) => {
	const [extra, setExtra] = signal(0);
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "hydrate-props",
		children: [
			/* @__PURE__ */ jsx("h3", { children: "9. Props + estado local" }),
			/* @__PURE__ */ jsxs("p", {
				"data-titulo": titulo,
				children: ["título do servidor: ", titulo]
			}),
			/* @__PURE__ */ jsxs("p", {
				"data-valor": valor,
				children: ["valor do servidor: ", valor]
			}),
			/* @__PURE__ */ jsxs("p", {
				"data-extra": () => extra(),
				children: ["local: ", () => extra()]
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => setExtra(extra() + 1),
				children: "incrementar local"
			}),
			/* @__PURE__ */ jsx("p", { children: "titulo e valor são estáticos de propósito: vêm do servidor e não têm signal por trás. Só o contador local responde ao clique." })
		]
	});
};
const HydrateEfeito = () => {
	const [n, setN] = signal(0);
	events(() => {
		console.log("[hydrate/efeito] n =", n());
	});
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "hydrate-efeito",
		children: [
			/* @__PURE__ */ jsx("h3", { children: "10. events()" }),
			/* @__PURE__ */ jsxs("p", {
				"data-n": () => n(),
				children: ["n: ", () => n()]
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => setN(n() + 1),
				children: "incrementar"
			}),
			/* @__PURE__ */ jsx("p", { children: "Este log só aparece no console do browser, nunca no terminal: o events() retorna cedo quando isSSR() é true. Se ele aparecer no terminal, o SSR não está rodando." })
		]
	});
};
/**
* Renderiza normal no servidor e lança no client. É o cenário que mais
* enganava: a ilha morre, o HTML do servidor continua na tela e, sem o painel
* de hydration, nada indicava que algo quebrou.
*
* Só quebra com o botão armado, senão ela mataria a página no primeiro load.
*/
const HydrateQuebra = ({ armado = false }) => {
	const [quebrar, setQuebrar] = signal(armado);
	if (!isSSR() && quebrar()) throw new Error("falha proposital dentro da hydration");
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "hydrate-quebra",
		children: [
			/* @__PURE__ */ jsx("h3", { children: "11. Quebra proposital" }),
			/* @__PURE__ */ jsx("p", { children: "No servidor isto renderiza normal. Com o botão armado a hidratação lança, e o painel dev tem que aparecer no canto inferior direito." }),
			/* @__PURE__ */ jsx("button", {
				onClick: () => setQuebrar((v) => !v),
				children: () => quebrar() ? "desarmar" : "armar a quebra"
			})
		]
	});
};
typeof HydrateTernario === "function" && markClientExport(HydrateTernario, "components/reactive-hydrate", "HydrateTernario", "hydrate");
typeof HydrateListaMap === "function" && markClientExport(HydrateListaMap, "components/reactive-hydrate", "HydrateListaMap", "hydrate");
typeof HydrateListaReorder === "function" && markClientExport(HydrateListaReorder, "components/reactive-hydrate", "HydrateListaReorder", "hydrate");
typeof HydrateListaObjetos === "function" && markClientExport(HydrateListaObjetos, "components/reactive-hydrate", "HydrateListaObjetos", "hydrate");
typeof HydrateMemo === "function" && markClientExport(HydrateMemo, "components/reactive-hydrate", "HydrateMemo", "hydrate");
typeof HydrateStore === "function" && markClientExport(HydrateStore, "components/reactive-hydrate", "HydrateStore", "hydrate");
typeof HydrateBatch === "function" && markClientExport(HydrateBatch, "components/reactive-hydrate", "HydrateBatch", "hydrate");
typeof HydrateCondicional === "function" && markClientExport(HydrateCondicional, "components/reactive-hydrate", "HydrateCondicional", "hydrate");
typeof HydrateRecebeProps === "function" && markClientExport(HydrateRecebeProps, "components/reactive-hydrate", "HydrateRecebeProps", "hydrate");
typeof HydrateEfeito === "function" && markClientExport(HydrateEfeito, "components/reactive-hydrate", "HydrateEfeito", "hydrate");
typeof HydrateQuebra === "function" && markClientExport(HydrateQuebra, "components/reactive-hydrate", "HydrateQuebra", "hydrate");

//#endregion
//#region .adaptive-temp/dev-runtime-1791415595625-cveadg/temp/client-components/components__reactive-hydrate.tsx
hydrateClientComponents("components/reactive-hydrate", reactive_hydrate_exports);

//#endregion
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnktM1JaOGhjaXUuanMiLCJuYW1lcyI6WyJjbGllbnRNb2R1bGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9yZWFjdGl2ZS1oeWRyYXRlLnRzeCIsIi4uLy4uL3RlbXAvY2xpZW50LWNvbXBvbmVudHMvY29tcG9uZW50c19fcmVhY3RpdmUtaHlkcmF0ZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiJ2h5ZHJhdGUnXG5cbmltcG9ydCB7IGJhdGNoLCBldmVudHMsIGlzU1NSLCBtZW1vLCBzaWduYWwsIHN0b3JlIH0gZnJvbSBcIkBhZGFwdGl2ZS1qcy93ZWJcIlxuXG4vKipcbiAqIFN1w610ZSBkZSByZWF0aXZpZGFkZSBwYXJhIGlsaGFzIFwiaHlkcmF0ZVwiLlxuICpcbiAqIE1lc21hIHJlZ3JhIGRvIGNsaWVudDogdmFsb3IgZGluw6JtaWNvIHZhaSBkZW50cm8gZGUgdGh1bmsuXG4gKiAgIHsoKSA9PiB4KCl9ICAgICAg4oaSIGZpbGhvIHJlYXRpdm8gKHJhbmdlIGNvbSBtYXJjYWRvcmVzKVxuICogICBhdHRyPXsoKSA9PiB4KCl9IOKGkiBhdHJpYnV0byBsaWdhZG8gYSBlZmVpdG9cbiAqXG4gKiBBIGRpZmVyZW7Dp2Egw6kgcXVlIG8gc2Vydmlkb3IgcmVuZGVyaXphIG8gSFRNTCBpbmljaWFsLiBTZSBvIHZhbG9yIGluaWNpYWxcbiAqIG7Do28gZXN0aXZlciBuYSB0ZWxhLCBvIFNTUiBuw6NvIHJvZG91IOKAlCBlIG8gaHlkcmF0aW9uIHZhaSBjb21wbGFpbmFyLlxuICpcbiAqIFNvYnJlIGBldmVudHMoKWA6IGVsZSBmYXogYGlmIChpc1NTUigpKSByZXR1cm5gLCBlbnTDo28gbyBlZmVpdG8gTsODTyByb2RhIG5vXG4gKiBzZXJ2aWRvci4gTyBjb25zb2xlLmxvZyBkZW50cm8gZGVsZSBhcGFyZWNlIHPDsyBubyBicm93c2VyLCBkZXBvaXMgZG9cbiAqIGh5ZHJhdGlvbiDigJQgbnVuY2Egbm8gdGVybWluYWwgZG8gZGV2IHNlcnZlci5cbiAqXG4gKiBPIHF1ZSBhcGFyZWNlIG5vIHRlcm1pbmFsIMOpIG8gYG1lbW9gOiBvIGPDoWxjdWxvIGluaWNpYWwgcm9kYSBkdXJhbnRlIG9cbiAqIHJlbmRlciwgYW50ZXMgZG8gZ3VhcmQgZGUgU1NSLlxuICovXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gMS4gVGVybsOhcmlvXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGNvbnN0IEh5ZHJhdGVUZXJuYXJpbyA9ICgpID0+IHtcbiAgY29uc3QgW2xpZ2Fkbywgc2V0TGlnYWRvXSA9IHNpZ25hbCh0cnVlKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXRlc3RlPVwiaHlkcmF0ZS10ZXJuYXJpb1wiPlxuICAgICAgPGgzPjEuIFRlcm7DoXJpbzwvaDM+XG4gICAgICA8cCBkYXRhLXZhbG9yPXsoKSA9PiAobGlnYWRvKCkgPyBcIlNJTVwiIDogXCJOQU9cIil9PlxuICAgICAgICByZXN1bHRhZG86IHsoKSA9PiAobGlnYWRvKCkgPyBcInJhbW8gdmVyZGFkZWlyb1wiIDogXCJyYW1vIGZhbHNvXCIpfVxuICAgICAgPC9wPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRMaWdhZG8oIWxpZ2FkbygpKX0+YWx0ZXJuYXI8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0TGlnYWRvKHRydWUpfT5yZXNldDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICApXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gMi4gTGlzdGEgY29tIC5tYXBcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgY29uc3QgSHlkcmF0ZUxpc3RhTWFwID0gKCkgPT4ge1xuICBjb25zdCBbaXRlbnMsIHNldEl0ZW5zXSA9IHNpZ25hbDxzdHJpbmdbXT4oW1wiYWxwaGFcIiwgXCJiZXRhXCIsIFwiZ2FtbWFcIl0pXG5cbiAgY29uc3QgYWRpY2lvbmFyID0gKG5vbWU6IHN0cmluZykgPT4gc2V0SXRlbnMoWy4uLml0ZW5zKCksIG5vbWVdKVxuICBjb25zdCByZW1vdmVyID0gKGk6IG51bWJlcikgPT4gc2V0SXRlbnMoaXRlbnMoKS5maWx0ZXIoKF8sIGlkeCkgPT4gaWR4ICE9PSBpKSlcblxuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS10ZXN0ZT1cImh5ZHJhdGUtbGlzdGFcIj5cbiAgICAgIDxoMz4yLiBMaXN0YSBjb20gbWFwPC9oMz5cbiAgICAgIDxzcGFuIGRhdGEtdG90YWw9eygpID0+IGl0ZW5zKCkubGVuZ3RofT50b3RhbDogeygpID0+IGl0ZW5zKCkubGVuZ3RofTwvc3Bhbj5cbiAgICAgIDx1bD5cbiAgICAgICAgeygpID0+IGl0ZW5zKCkubWFwKChpdGVtLCBpKSA9PiAoXG4gICAgICAgICAgPGxpIGtleT17aXRlbX0gZGF0YS1pdGVtPXtpdGVtfT5cbiAgICAgICAgICAgIHtpfToge2l0ZW19XG4gICAgICAgICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHJlbW92ZXIoaSl9PnJlbW92ZXI8L2J1dHRvbj5cbiAgICAgICAgICA8L2xpPlxuICAgICAgICApKX1cbiAgICAgIDwvdWw+XG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IGFkaWNpb25hcihcIml0ZW0tXCIgKyAoaXRlbnMoKS5sZW5ndGggKyAxKSl9PlxuICAgICAgICBhZGljaW9uYXJcbiAgICAgIDwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRJdGVucyhbXSl9PmxpbXBhcjwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICApXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gMy4gUmVvcmRlbmFyIOKAlCBvIHRlc3RlIHF1ZSBtYWlzIHJldmVsYSBrZXkgZXJyYWRhIGVtIGh5ZHJhdGlvblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydCBjb25zdCBIeWRyYXRlTGlzdGFSZW9yZGVyID0gKCkgPT4ge1xuICBjb25zdCBbbm9tZXMsIHNldE5vbWVzXSA9IHNpZ25hbChbXCJBbmFcIiwgXCJCcnVub1wiLCBcIkNhcmxhXCJdKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXRlc3RlPVwiaHlkcmF0ZS1yZW9yZGVyXCI+XG4gICAgICA8aDM+My4gUmVvcmRlbmFyIGxpc3RhPC9oMz5cbiAgICAgIDx1bD5cbiAgICAgICAgeygpID0+IG5vbWVzKCkubWFwKChub21lLCBpKSA9PiAoXG4gICAgICAgICAgPGxpIGtleT17bm9tZX0gZGF0YS1ub21lPXtub21lfT5cbiAgICAgICAgICAgIHtpfToge25vbWV9XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKSl9XG4gICAgICA8L3VsPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXROb21lcyhbLi4ubm9tZXMoKV0ucmV2ZXJzZSgpKX0+cmV2ZXJ0ZXI8L2J1dHRvbj5cbiAgICAgIDxwPlxuICAgICAgICBPIMOtbmRpY2UgezB9IGRldmVyaWEgYWNvbXBhbmhhciBhIHBvc2nDp8Ojby4gU2UgbyBub21lIHRyb2NhciBtYXMgb1xuICAgICAgICBuw7ptZXJvIGZpY2FyLCBhIGtleSBuw6NvIGZvaSB1c2FkYSBubyBkaWZmLlxuICAgICAgPC9wPlxuICAgIDwvZGl2PlxuICApXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gNC4gTGlzdGEgZGUgb2JqZXRvcyDigJQgbyBpdGVtIGludGVpcm8gw6kgcmVhdGl2b1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnR5cGUgVGFyZWZhID0geyBpZDogbnVtYmVyOyB0ZXh0bzogc3RyaW5nOyBmZWl0YTogYm9vbGVhbiB9XG5cbmV4cG9ydCBjb25zdCBIeWRyYXRlTGlzdGFPYmpldG9zID0gKCkgPT4ge1xuICBjb25zdCBbdGFyZWZhcywgc2V0VGFyZWZhc10gPSBzaWduYWw8VGFyZWZhW10+KFtcbiAgICB7IGlkOiAxLCB0ZXh0bzogXCJlc3R1ZGFyIHNpZ25hbHNcIiwgZmVpdGE6IHRydWUgfSxcbiAgICB7IGlkOiAyLCB0ZXh0bzogXCJsZXIgbyByZW5kZXJUb0RPTVwiLCBmZWl0YTogZmFsc2UgfSxcbiAgICB7IGlkOiAzLCB0ZXh0bzogXCJ0ZXN0YXIgbm8gYnJvd3NlclwiLCBmZWl0YTogZmFsc2UgfSxcbiAgXSlcblxuICBjb25zdCBhbHRlcm5hciA9IChpZDogbnVtYmVyKSA9PlxuICAgIHNldFRhcmVmYXMoXG4gICAgICB0YXJlZmFzKCkubWFwKCh0KSA9PiAodC5pZCA9PT0gaWQgPyB7IC4uLnQsIGZlaXRhOiAhdC5mZWl0YSB9IDogdCkpXG4gICAgKVxuXG4gIGNvbnN0IGZlaXRhcyA9ICgpID0+IHRhcmVmYXMoKS5maWx0ZXIoKHQpID0+IHQuZmVpdGEpLmxlbmd0aFxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXRlc3RlPVwiaHlkcmF0ZS1vYmpldG9zXCI+XG4gICAgICA8aDM+NC4gTGlzdGEgZGUgb2JqZXRvczwvaDM+XG4gICAgICA8c3BhbiBkYXRhLWZlaXRhcz17KCkgPT4gZmVpdGFzKCl9PlxuICAgICAgICBmZWl0YXM6IHsoKSA9PiBmZWl0YXMoKX0gLyB7KCkgPT4gdGFyZWZhcygpLmxlbmd0aH1cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDx1bD5cbiAgICAgICAgeygpID0+XG4gICAgICAgICAgdGFyZWZhcygpLm1hcCgodCkgPT4gKFxuICAgICAgICAgICAgPGxpIGtleT17dC5pZH0gZGF0YS1mZWl0YT17KCkgPT4gU3RyaW5nKHQuZmVpdGEpfT5cbiAgICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBhbHRlcm5hcih0LmlkKX0+XG4gICAgICAgICAgICAgICAgeygpID0+ICh0LmZlaXRhID8gXCJbeF1cIiA6IFwiWyBdXCIpfSB7dC50ZXh0b31cbiAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICkpXG4gICAgICAgIH1cbiAgICAgIDwvdWw+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyA1LiBtZW1vXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGNvbnN0IEh5ZHJhdGVNZW1vID0gKCkgPT4ge1xuICBjb25zdCBbYSwgc2V0QV0gPSBzaWduYWwoMilcbiAgY29uc3QgW2IsIHNldEJdID0gc2lnbmFsKDMpXG4gIGNvbnN0IFtjYWxjdWxvcywgc2V0Q2FsY3Vsb3NdID0gc2lnbmFsKDApXG5cbiAgY29uc3QgcHJvZHV0byA9IG1lbW8oKCkgPT4ge1xuICAgIHNldENhbGN1bG9zKChuKSA9PiBuICsgMSlcbiAgICBjb25zb2xlLmxvZyhcIltoeWRyYXRlL21lbW9dIHJlY2FsY3VsYW5kb1wiLCBhKCksIFwiKlwiLCBiKCksIFwiPVwiLCBhKCkgKiBiKCkpXG4gICAgcmV0dXJuIGEoKSAqIGIoKVxuICB9KVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXRlc3RlPVwiaHlkcmF0ZS1tZW1vXCI+XG4gICAgICA8aDM+NS4gbWVtbzwvaDM+XG4gICAgICA8cCBkYXRhLXByb2R1dG89eygpID0+IHByb2R1dG8oKX0+YSAqIGIgPSB7KCkgPT4gcHJvZHV0bygpfTwvcD5cbiAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0QShhKCkgKyAxKX0+YSsrPC9idXR0b24+XG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldEIoYigpICsgMSl9PmIrKzwvYnV0dG9uPlxuICAgICAgPHAgZGF0YS1jYWxjdWxvcz17KCkgPT4gY2FsY3Vsb3MoKX0+Y8OhbGN1bG9zOiB7KCkgPT4gY2FsY3Vsb3MoKX08L3A+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyA2LiBzdG9yZVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydCBjb25zdCBIeWRyYXRlU3RvcmUgPSAoKSA9PiB7XG4gIC8vIHN0b3JlIGRldm9sdmUgdW0gU2lnbmFsIHBvciBjaGF2ZSwgZSBTaWduYWwgw6kgYSB0dXBsYSBbZ2V0dGVyLCBzZXR0ZXJdLlxuICBjb25zdCBzID0gc3RvcmUoeyBub21lOiBcInZpc2l0YW50ZVwiLCB2aXNpdGFzOiAwIH0pXG4gIGNvbnN0IFtnZXROb21lLCBzZXROb21lXSA9IHMubm9tZVxuICBjb25zdCBbZ2V0VmlzaXRhcywgc2V0VmlzaXRhc10gPSBzLnZpc2l0YXNcblxuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS10ZXN0ZT1cImh5ZHJhdGUtc3RvcmVcIj5cbiAgICAgIDxoMz42LiBzdG9yZTwvaDM+XG4gICAgICA8cCBkYXRhLW5vbWU9eygpID0+IGdldE5vbWUoKX0+bm9tZTogeygpID0+IGdldE5vbWUoKX08L3A+XG4gICAgICA8cCBkYXRhLXZpc2l0YXM9eygpID0+IGdldFZpc2l0YXMoKX0+dmlzaXRhczogeygpID0+IGdldFZpc2l0YXMoKX08L3A+XG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldFZpc2l0YXMoKG4pID0+IG4gKyAxKX0+dmlzaXRhcjwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXROb21lKChuKSA9PiAobiA9PT0gXCJ2aXNpdGFudGVcIiA/IFwiZWRpdG9yXCIgOiBcInZpc2l0YW50ZVwiKSl9PlxuICAgICAgICB0cm9jYXIgbm9tZVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyA3LiBiYXRjaFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydCBjb25zdCBIeWRyYXRlQmF0Y2ggPSAoKSA9PiB7XG4gIGNvbnN0IFt4LCBzZXRYXSA9IHNpZ25hbCgwKVxuICBjb25zdCBbeSwgc2V0WV0gPSBzaWduYWwoMClcbiAgY29uc3QgW3osIHNldFpdID0gc2lnbmFsKDApXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtdGVzdGU9XCJoeWRyYXRlLWJhdGNoXCI+XG4gICAgICA8aDM+Ny4gYmF0Y2g8L2gzPlxuICAgICAgPHAgZGF0YS14PXsoKSA9PiB4KCl9Png6IHsoKSA9PiB4KCl9PC9wPlxuICAgICAgPHAgZGF0YS15PXsoKSA9PiB5KCl9Pnk6IHsoKSA9PiB5KCl9PC9wPlxuICAgICAgPHAgZGF0YS16PXsoKSA9PiB6KCl9Pno6IHsoKSA9PiB6KCl9PC9wPlxuICAgICAgPGJ1dHRvblxuICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgIGJhdGNoKCgpID0+IHtcbiAgICAgICAgICAgIHNldFgoeCgpICsgMSlcbiAgICAgICAgICAgIHNldFkoeSgpICsgMSlcbiAgICAgICAgICAgIHNldFooeigpICsgMSlcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICA+XG4gICAgICAgIHNvbWFyIG9zIHRyw6pzXG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b25cbiAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgIHNldFgoeCgpICsgMSlcbiAgICAgICAgICBzZXRZKHkoKSArIDEpXG4gICAgICAgICAgc2V0Wih6KCkgKyAxKVxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICBzb21hciBzZW0gYmF0Y2hcbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICApXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gOC4gQ29uZGljaW9uYWxcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgY29uc3QgSHlkcmF0ZUNvbmRpY2lvbmFsID0gKCkgPT4ge1xuICBjb25zdCBbbW9zdHJhciwgc2V0TW9zdHJhcl0gPSBzaWduYWwoZmFsc2UpXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtdGVzdGU9XCJoeWRyYXRlLWNvbmRpY2lvbmFsXCI+XG4gICAgICA8aDM+OC4gQ29uZGljaW9uYWw8L2gzPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRNb3N0cmFyKCFtb3N0cmFyKCkpfT5cbiAgICAgICAgeygpID0+IChtb3N0cmFyKCkgPyBcImVzY29uZGVyXCIgOiBcIm1vc3RyYXJcIil9XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIHsoKSA9PlxuICAgICAgICBtb3N0cmFyKCkgPyAoXG4gICAgICAgICAgPHNlY3Rpb24gZGF0YS1ibG9jbz1cInZpc2l2ZWxcIj5cbiAgICAgICAgICAgIDxwPkJsb2NvIHZpc8OtdmVsPC9wPlxuICAgICAgICAgIDwvc2VjdGlvbj5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8cCBkYXRhLWJsb2NvPVwib2N1bHRvXCI+TmFkYSBhcXVpPC9wPlxuICAgICAgICApXG4gICAgICB9XG4gICAgPC9kaXY+XG4gIClcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyA5LiBQcm9wcyBkbyBzZXJ2aWRvciArIGVzdGFkbyBsb2NhbFxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydCBjb25zdCBIeWRyYXRlUmVjZWJlUHJvcHMgPSAoe1xuICB0aXR1bG8gPSBcInNlbSB0w610dWxvXCIsXG4gIHZhbG9yID0gMCxcbn06IGFueSkgPT4ge1xuICBjb25zdCBbZXh0cmEsIHNldEV4dHJhXSA9IHNpZ25hbCgwKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXRlc3RlPVwiaHlkcmF0ZS1wcm9wc1wiPlxuICAgICAgPGgzPjkuIFByb3BzICsgZXN0YWRvIGxvY2FsPC9oMz5cbiAgICAgIDxwIGRhdGEtdGl0dWxvPXt0aXR1bG99PnTDrXR1bG8gZG8gc2Vydmlkb3I6IHt0aXR1bG99PC9wPlxuICAgICAgPHAgZGF0YS12YWxvcj17dmFsb3J9PnZhbG9yIGRvIHNlcnZpZG9yOiB7dmFsb3J9PC9wPlxuICAgICAgPHAgZGF0YS1leHRyYT17KCkgPT4gZXh0cmEoKX0+bG9jYWw6IHsoKSA9PiBleHRyYSgpfTwvcD5cbiAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0RXh0cmEoZXh0cmEoKSArIDEpfT5pbmNyZW1lbnRhciBsb2NhbDwvYnV0dG9uPlxuICAgICAgPHA+XG4gICAgICAgIHRpdHVsbyBlIHZhbG9yIHPDo28gZXN0w6F0aWNvcyBkZSBwcm9ww7NzaXRvOiB2w6ptIGRvIHNlcnZpZG9yIGUgbsOjbyB0w6ptXG4gICAgICAgIHNpZ25hbCBwb3IgdHLDoXMuIFPDsyBvIGNvbnRhZG9yIGxvY2FsIHJlc3BvbmRlIGFvIGNsaXF1ZS5cbiAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIDEwLiBFZmVpdG8gY29tIGV2ZW50cygpIOKAlCBvYnNlcnZlIG9uZGUgbyBsb2cgYXBhcmVjZVxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbmV4cG9ydCBjb25zdCBIeWRyYXRlRWZlaXRvID0gKCkgPT4ge1xuICBjb25zdCBbbiwgc2V0Tl0gPSBzaWduYWwoMClcblxuICBldmVudHMoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiW2h5ZHJhdGUvZWZlaXRvXSBuID1cIiwgbigpKVxuICB9KVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXRlc3RlPVwiaHlkcmF0ZS1lZmVpdG9cIj5cbiAgICAgIDxoMz4xMC4gZXZlbnRzKCk8L2gzPlxuICAgICAgPHAgZGF0YS1uPXsoKSA9PiBuKCl9Pm46IHsoKSA9PiBuKCl9PC9wPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXROKG4oKSArIDEpfT5pbmNyZW1lbnRhcjwvYnV0dG9uPlxuICAgICAgICA8cD5cbiAgICAgICAgICBFc3RlIGxvZyBzw7MgYXBhcmVjZSBubyBjb25zb2xlIGRvIGJyb3dzZXIsIG51bmNhIG5vIHRlcm1pbmFsOiBvXG4gICAgICAgICAgZXZlbnRzKCkgcmV0b3JuYSBjZWRvIHF1YW5kbyBpc1NTUigpIMOpIHRydWUuIFNlIGVsZSBhcGFyZWNlciBub1xuICAgICAgICAgIHRlcm1pbmFsLCBvIFNTUiBuw6NvIGVzdMOhIHJvZGFuZG8uXG4gICAgICAgIDwvcD5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIDExLiBRdWVicmEgcHJvcG9zaXRhbCDigJQgbyBwYWluZWwgZGUgZGV2IHRlbSBxdWUgbW9zdHJhciBpc3NvXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuLyoqXG4gKiBSZW5kZXJpemEgbm9ybWFsIG5vIHNlcnZpZG9yIGUgbGFuw6dhIG5vIGNsaWVudC4gw4kgbyBjZW7DoXJpbyBxdWUgbWFpc1xuICogZW5nYW5hdmE6IGEgaWxoYSBtb3JyZSwgbyBIVE1MIGRvIHNlcnZpZG9yIGNvbnRpbnVhIG5hIHRlbGEgZSwgc2VtIG8gcGFpbmVsXG4gKiBkZSBoeWRyYXRpb24sIG5hZGEgaW5kaWNhdmEgcXVlIGFsZ28gcXVlYnJvdS5cbiAqXG4gKiBTw7MgcXVlYnJhIGNvbSBvIGJvdMOjbyBhcm1hZG8sIHNlbsOjbyBlbGEgbWF0YXJpYSBhIHDDoWdpbmEgbm8gcHJpbWVpcm8gbG9hZC5cbiAqL1xuZXhwb3J0IGNvbnN0IEh5ZHJhdGVRdWVicmEgPSAoeyBhcm1hZG8gPSBmYWxzZSB9OiBhbnkpID0+IHtcbiAgY29uc3QgW3F1ZWJyYXIsIHNldFF1ZWJyYXJdID0gc2lnbmFsKGFybWFkbylcblxuICBpZiAoIWlzU1NSKCkgJiYgcXVlYnJhcigpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZmFsaGEgcHJvcG9zaXRhbCBkZW50cm8gZGEgaHlkcmF0aW9uXCIpXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS10ZXN0ZT1cImh5ZHJhdGUtcXVlYnJhXCI+XG4gICAgICA8aDM+MTEuIFF1ZWJyYSBwcm9wb3NpdGFsPC9oMz5cbiAgICAgIDxwPlxuICAgICAgICBObyBzZXJ2aWRvciBpc3RvIHJlbmRlcml6YSBub3JtYWwuIENvbSBvIGJvdMOjbyBhcm1hZG8gYSBoaWRyYXRhw6fDo29cbiAgICAgICAgbGFuw6dhLCBlIG8gcGFpbmVsIGRldiB0ZW0gcXVlIGFwYXJlY2VyIG5vIGNhbnRvIGluZmVyaW9yIGRpcmVpdG8uXG4gICAgICA8L3A+XG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldFF1ZWJyYXIoKHY6IGJvb2xlYW4pID0+ICF2KX0+XG4gICAgICAgIHsoKSA9PiAocXVlYnJhcigpID8gXCJkZXNhcm1hclwiIDogXCJhcm1hciBhIHF1ZWJyYVwiKX1cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICApXG59XG4iLCJcbmltcG9ydCAqIGFzIGNsaWVudE1vZHVsZSBmcm9tIFwiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvcmVhY3RpdmUtaHlkcmF0ZS50c3hcIjtcbmltcG9ydCB7IGh5ZHJhdGVDbGllbnRDb21wb25lbnRzIH0gZnJvbSBcIkBhZGFwdGl2ZS1qcy93ZWJcIjtcblxuaHlkcmF0ZUNsaWVudENvbXBvbmVudHMoXCJjb21wb25lbnRzL3JlYWN0aXZlLWh5ZHJhdGVcIiwgY2xpZW50TW9kdWxlKTtcbmV4cG9ydCB7fTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLE1BQWEsd0JBQXdCO0NBQ25DLE1BQU0sQ0FBQyxRQUFRLGFBQWEsT0FBTyxJQUFJO0NBRXZDLE9BQ0UscUJBQUMsT0FBRDtFQUFLLGNBQVc7WUFBaEI7R0FDRSxvQkFBQyxNQUFELFlBQUksY0FBZTtHQUNuQixxQkFBQyxLQUFEO0lBQUcsb0JBQW1CLE9BQU8sSUFBSSxRQUFRO2NB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