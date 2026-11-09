import { batch, events, isSSR, memo, signal, store } from "@adaptive-js/web";
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
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
// ---------------------------------------------------------------------------
// 1. Ternário
// ---------------------------------------------------------------------------
export const HydrateTernario = () => {
	const [ligado, setLigado] = signal(true);
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "hydrate-ternario",
		children: [
			/* @__PURE__ */ _jsx("h3", { children: "1. Ternário" }),
			/* @__PURE__ */ _jsxs("p", {
				"data-valor": () => ligado() ? "SIM" : "NAO",
				children: ["resultado: ", () => ligado() ? "ramo verdadeiro" : "ramo falso"]
			}),
			/* @__PURE__ */ _jsx("button", {
				onClick: () => setLigado(!ligado()),
				children: "alternar"
			}),
			/* @__PURE__ */ _jsx("button", {
				onClick: () => setLigado(true),
				children: "reset"
			})
		]
	});
};
// ---------------------------------------------------------------------------
// 2. Lista com .map
// ---------------------------------------------------------------------------
export const HydrateListaMap = () => {
	const [itens, setItens] = signal([
		"alpha",
		"beta",
		"gamma"
	]);
	const adicionar = (nome) => setItens([...itens(), nome]);
	const remover = (i) => setItens(itens().filter((_, idx) => idx !== i));
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "hydrate-lista",
		children: [
			/* @__PURE__ */ _jsx("h3", { children: "2. Lista com map" }),
			/* @__PURE__ */ _jsxs("span", {
				"data-total": () => itens().length,
				children: ["total: ", () => itens().length]
			}),
			/* @__PURE__ */ _jsx("ul", { children: () => itens().map((item, i) => /* @__PURE__ */ _jsxs("li", {
				"data-item": item,
				children: [
					i,
					": ",
					item,
					/* @__PURE__ */ _jsx("button", {
						onClick: () => remover(i),
						children: "remover"
					})
				]
			}, item)) }),
			/* @__PURE__ */ _jsx("button", {
				onClick: () => adicionar("item-" + (itens().length + 1)),
				children: "adicionar"
			}),
			/* @__PURE__ */ _jsx("button", {
				onClick: () => setItens([]),
				children: "limpar"
			})
		]
	});
};
// ---------------------------------------------------------------------------
// 3. Reordenar — o teste que mais revela key errada em hydration
// ---------------------------------------------------------------------------
export const HydrateListaReorder = () => {
	const [nomes, setNomes] = signal([
		"Ana",
		"Bruno",
		"Carla"
	]);
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "hydrate-reorder",
		children: [
			/* @__PURE__ */ _jsx("h3", { children: "3. Reordenar lista" }),
			/* @__PURE__ */ _jsx("ul", { children: () => nomes().map((nome, i) => /* @__PURE__ */ _jsxs("li", {
				"data-nome": nome,
				children: [
					i,
					": ",
					nome
				]
			}, nome)) }),
			/* @__PURE__ */ _jsx("button", {
				onClick: () => setNomes([...nomes()].reverse()),
				children: "reverter"
			}),
			/* @__PURE__ */ _jsxs("p", { children: [
				"O índice ",
				0,
				" deveria acompanhar a posição. Se o nome trocar mas o número ficar, a key não foi usada no diff."
			] })
		]
	});
};
export const HydrateListaObjetos = () => {
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
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "hydrate-objetos",
		children: [
			/* @__PURE__ */ _jsx("h3", { children: "4. Lista de objetos" }),
			/* @__PURE__ */ _jsxs("span", {
				"data-feitas": () => feitas(),
				children: [
					"feitas: ",
					() => feitas(),
					" / ",
					() => tarefas().length
				]
			}),
			/* @__PURE__ */ _jsx("ul", { children: () => tarefas().map((t) => /* @__PURE__ */ _jsx("li", {
				"data-feita": () => String(t.feita),
				children: /* @__PURE__ */ _jsxs("button", {
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
// ---------------------------------------------------------------------------
// 5. memo
// ---------------------------------------------------------------------------
export const HydrateMemo = () => {
	const [a, setA] = signal(2);
	const [b, setB] = signal(3);
	const [calculos, setCalculos] = signal(0);
	const produto = memo(() => {
		setCalculos((n) => n + 1);
		console.log("[hydrate/memo] recalculando", a(), "*", b(), "=", a() * b());
		return a() * b();
	});
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "hydrate-memo",
		children: [
			/* @__PURE__ */ _jsx("h3", { children: "5. memo" }),
			/* @__PURE__ */ _jsxs("p", {
				"data-produto": () => produto(),
				children: ["a * b = ", () => produto()]
			}),
			/* @__PURE__ */ _jsx("button", {
				onClick: () => setA(a() + 1),
				children: "a++"
			}),
			/* @__PURE__ */ _jsx("button", {
				onClick: () => setB(b() + 1),
				children: "b++"
			}),
			/* @__PURE__ */ _jsxs("p", {
				"data-calculos": () => calculos(),
				children: ["cálculos: ", () => calculos()]
			})
		]
	});
};
// ---------------------------------------------------------------------------
// 6. store
// ---------------------------------------------------------------------------
export const HydrateStore = () => {
	// store devolve um Signal por chave, e Signal é a tupla [getter, setter].
	const s = store({
		nome: "visitante",
		visitas: 0
	});
	const [getNome, setNome] = s.nome;
	const [getVisitas, setVisitas] = s.visitas;
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "hydrate-store",
		children: [
			/* @__PURE__ */ _jsx("h3", { children: "6. store" }),
			/* @__PURE__ */ _jsxs("p", {
				"data-nome": () => getNome(),
				children: ["nome: ", () => getNome()]
			}),
			/* @__PURE__ */ _jsxs("p", {
				"data-visitas": () => getVisitas(),
				children: ["visitas: ", () => getVisitas()]
			}),
			/* @__PURE__ */ _jsx("button", {
				onClick: () => setVisitas((n) => n + 1),
				children: "visitar"
			}),
			/* @__PURE__ */ _jsx("button", {
				onClick: () => setNome((n) => n === "visitante" ? "editor" : "visitante"),
				children: "trocar nome"
			})
		]
	});
};
// ---------------------------------------------------------------------------
// 7. batch
// ---------------------------------------------------------------------------
export const HydrateBatch = () => {
	const [x, setX] = signal(0);
	const [y, setY] = signal(0);
	const [z, setZ] = signal(0);
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "hydrate-batch",
		children: [
			/* @__PURE__ */ _jsx("h3", { children: "7. batch" }),
			/* @__PURE__ */ _jsxs("p", {
				"data-x": () => x(),
				children: ["x: ", () => x()]
			}),
			/* @__PURE__ */ _jsxs("p", {
				"data-y": () => y(),
				children: ["y: ", () => y()]
			}),
			/* @__PURE__ */ _jsxs("p", {
				"data-z": () => z(),
				children: ["z: ", () => z()]
			}),
			/* @__PURE__ */ _jsx("button", {
				onClick: () => batch(() => {
					setX(x() + 1);
					setY(y() + 1);
					setZ(z() + 1);
				}),
				children: "somar os três"
			}),
			/* @__PURE__ */ _jsx("button", {
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
// ---------------------------------------------------------------------------
// 8. Condicional
// ---------------------------------------------------------------------------
export const HydrateCondicional = () => {
	const [mostrar, setMostrar] = signal(false);
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "hydrate-condicional",
		children: [
			/* @__PURE__ */ _jsx("h3", { children: "8. Condicional" }),
			/* @__PURE__ */ _jsx("button", {
				onClick: () => setMostrar(!mostrar()),
				children: () => mostrar() ? "esconder" : "mostrar"
			}),
			() => mostrar() ? /* @__PURE__ */ _jsx("section", {
				"data-bloco": "visivel",
				children: /* @__PURE__ */ _jsx("p", { children: "Bloco visível" })
			}) : /* @__PURE__ */ _jsx("p", {
				"data-bloco": "oculto",
				children: "Nada aqui"
			})
		]
	});
};
// ---------------------------------------------------------------------------
// 9. Props do servidor + estado local
// ---------------------------------------------------------------------------
export const HydrateRecebeProps = ({ titulo = "sem título", valor = 0 }) => {
	const [extra, setExtra] = signal(0);
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "hydrate-props",
		children: [
			/* @__PURE__ */ _jsx("h3", { children: "9. Props + estado local" }),
			/* @__PURE__ */ _jsxs("p", {
				"data-titulo": titulo,
				children: ["título do servidor: ", titulo]
			}),
			/* @__PURE__ */ _jsxs("p", {
				"data-valor": valor,
				children: ["valor do servidor: ", valor]
			}),
			/* @__PURE__ */ _jsxs("p", {
				"data-extra": () => extra(),
				children: ["local: ", () => extra()]
			}),
			/* @__PURE__ */ _jsx("button", {
				onClick: () => setExtra(extra() + 1),
				children: "incrementar local"
			}),
			/* @__PURE__ */ _jsx("p", { children: "titulo e valor são estáticos de propósito: vêm do servidor e não têm signal por trás. Só o contador local responde ao clique." })
		]
	});
};
// ---------------------------------------------------------------------------
// 10. Efeito com events() — observe onde o log aparece
// ---------------------------------------------------------------------------
export const HydrateEfeito = () => {
	const [n, setN] = signal(0);
	events(() => {
		console.log("[hydrate/efeito] n =", n());
	});
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "hydrate-efeito",
		children: [
			/* @__PURE__ */ _jsx("h3", { children: "10. events()" }),
			/* @__PURE__ */ _jsxs("p", {
				"data-n": () => n(),
				children: ["n: ", () => n()]
			}),
			/* @__PURE__ */ _jsx("button", {
				onClick: () => setN(n() + 1),
				children: "incrementar"
			}),
			/* @__PURE__ */ _jsx("p", { children: "Este log só aparece no console do browser, nunca no terminal: o events() retorna cedo quando isSSR() é true. Se ele aparecer no terminal, o SSR não está rodando." })
		]
	});
};
// ---------------------------------------------------------------------------
// 11. Quebra proposital — o painel de dev tem que mostrar isso
// ---------------------------------------------------------------------------
/**
* Renderiza normal no servidor e lança no client. É o cenário que mais
* enganava: a ilha morre, o HTML do servidor continua na tela e, sem o painel
* de hydration, nada indicava que algo quebrou.
*
* Só quebra com o botão armado, senão ela mataria a página no primeiro load.
*/
export const HydrateQuebra = ({ armado = false }) => {
	const [quebrar, setQuebrar] = signal(armado);
	if (!isSSR() && quebrar()) {
		throw new Error("falha proposital dentro da hydration");
	}
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "hydrate-quebra",
		children: [
			/* @__PURE__ */ _jsx("h3", { children: "11. Quebra proposital" }),
			/* @__PURE__ */ _jsx("p", { children: "No servidor isto renderiza normal. Com o botão armado a hidratação lança, e o painel dev tem que aparecer no canto inferior direito." }),
			/* @__PURE__ */ _jsx("button", {
				onClick: () => setQuebrar((v) => !v),
				children: () => quebrar() ? "desarmar" : "armar a quebra"
			})
		]
	});
};

//# sourceMappingURL=reactive-hydrate.__client_ssr.js.map
