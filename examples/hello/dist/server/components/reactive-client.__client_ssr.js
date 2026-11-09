import { batch, events, memo, signal, store } from "@adaptive-js/web";
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
/**
* Suíte de reatividade para ilhas "client".
*
* REGRA IMPORTANTE: valor dinâmico vai dentro de thunk.
*   {() => x()}      → filho reativo (range com marcadores)
*   attr={() => x()} → atributo ligado a efeito
*   {x()}            → HTML estático, congelado no primeiro render
*
* O servidor não renderiza estas ilhas: o HTML chega vazio e tudo acontece
* no browser. Se a tela não atualizar ao clicar, é reatividade — não SSR.
*/
// ---------------------------------------------------------------------------
// 1. Ternário — dois ramos trocando por sinal
// ---------------------------------------------------------------------------
export const ClienteTernario = () => {
	const [ligado, setLigado] = signal(true);
	events(() => {
		console.log("[cliente/ternario] ligado =", ligado());
	});
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "cliente-ternario",
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
export const ClienteListaMap = () => {
	const [itens, setItens] = signal([
		"alpha",
		"beta",
		"gamma"
	]);
	events(() => {
		console.log("[cliente/lista] itens =", itens());
	});
	const adicionar = (nome) => setItens([...itens(), nome]);
	const remover = (i) => setItens(itens().filter((_, idx) => idx !== i));
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "cliente-lista",
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
// 3. Reordenar — a key precisa impedir reuso errado de nó
// ---------------------------------------------------------------------------
export const ClienteListaReorder = () => {
	const [nomes, setNomes] = signal([
		"Ana",
		"Bruno",
		"Carla"
	]);
	events(() => {
		console.log("[cliente/reorder] nomes =", nomes());
	});
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "cliente-reorder",
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
			/* @__PURE__ */ _jsx("p", { children: "Se o índice ficar preso no nome, a key não está sendo usada." })
		]
	});
};
// ---------------------------------------------------------------------------
// 4. memo — valor derivado
// ---------------------------------------------------------------------------
export const ClienteMemo = () => {
	const [a, setA] = signal(2);
	const [b, setB] = signal(3);
	const [calculos, setCalculos] = signal(0);
	const produto = memo(() => {
		setCalculos((n) => n + 1);
		console.log("[cliente/memo] recalculando produto");
		return a() * b();
	});
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "cliente-memo",
		children: [
			/* @__PURE__ */ _jsx("h3", { children: "4. memo" }),
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
			}),
			/* @__PURE__ */ _jsx("p", { children: "O contador é um signal justamente para o texto ser reativo. Se o produto mudar e o contador não, o memo não recalculou." })
		]
	});
};
// ---------------------------------------------------------------------------
// 5. store — objeto de sinais
// ---------------------------------------------------------------------------
export const ClienteStore = () => {
	// store devolve um Signal por chave, e Signal é a tupla [getter, setter].
	// Não dá para escrever s.nome(): tem que desestruturar.
	const s = store({
		nome: "visitante",
		visitas: 0
	});
	const [getNome, setNome] = s.nome;
	const [getVisitas, setVisitas] = s.visitas;
	events(() => {
		console.log("[cliente/store]", getNome(), getVisitas());
	});
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "cliente-store",
		children: [
			/* @__PURE__ */ _jsx("h3", { children: "5. store" }),
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
// 6. batch — três sinais numa atualização só
// ---------------------------------------------------------------------------
export const ClienteBatch = () => {
	const [x, setX] = signal(0);
	const [y, setY] = signal(0);
	const [z, setZ] = signal(0);
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "cliente-batch",
		children: [
			/* @__PURE__ */ _jsx("h3", { children: "6. batch" }),
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
// 7. Condicional — extrai e reinsere o bloco
// ---------------------------------------------------------------------------
export const ClienteCondicional = () => {
	const [mostrar, setMostrar] = signal(false);
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "cliente-condicional",
		children: [
			/* @__PURE__ */ _jsx("h3", { children: "7. Condicional" }),
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
// 8. className e style reativos
// ---------------------------------------------------------------------------
export const ClienteClasse = () => {
	const [ligado, setLigado] = signal(true);
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "cliente-classe",
		children: [
			/* @__PURE__ */ _jsx("h3", { children: "8. className / style" }),
			/* @__PURE__ */ _jsx("div", {
				className: ligado() ? "verde" : "vermelho",
				children: "sem thunk: congelado"
			}),
			/* @__PURE__ */ _jsxs("div", {
				className: () => ligado() ? "verde" : "vermelho",
				children: ["com thunk: ", () => ligado() ? "verde" : "vermelho"]
			}),
			/* @__PURE__ */ _jsx("div", {
				style: { color: ligado() ? "green" : "red" },
				children: "style estático"
			}),
			/* @__PURE__ */ _jsx("div", {
				style: { color: () => ligado() ? "green" : "red" },
				children: "style com thunk"
			}),
			/* @__PURE__ */ _jsx("button", {
				onClick: () => setLigado(!ligado()),
				children: "alternar"
			})
		]
	});
};
// ---------------------------------------------------------------------------
// 9. Aninhamento — estado de filho sobrevive ao toggle do pai
// ---------------------------------------------------------------------------
const FilhoInterno = () => {
	const [n, setN] = signal(0);
	return /* @__PURE__ */ _jsxs("button", {
		onClick: () => setN(n() + 1),
		"data-filho": () => n(),
		children: ["filho: ", () => n()]
	});
};
export const ClienteAninhado = () => {
	const [pai, setPai] = signal(0);
	const [visivel, setVisivel] = signal(true);
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "cliente-aninhado",
		children: [
			/* @__PURE__ */ _jsx("h3", { children: "9. Aninhado" }),
			/* @__PURE__ */ _jsxs("button", {
				onClick: () => setPai(pai() + 1),
				"data-pai": () => pai(),
				children: ["pai: ", () => pai()]
			}),
			/* @__PURE__ */ _jsx("button", {
				onClick: () => setVisivel(!visivel()),
				children: () => visivel() ? "esconder filho" : "mostrar filho"
			}),
			() => visivel() ? /* @__PURE__ */ _jsx(FilhoInterno, {}) : null,
			/* @__PURE__ */ _jsx("p", { children: "Se o contador do filhozerar ao esconder, o escopo foi destruído." })
		]
	});
};
// ---------------------------------------------------------------------------
// 10. Texto longo com throttle — cada tecla re-renderiza
// ---------------------------------------------------------------------------
export const ClienteTexto = () => {
	const [texto, setTexto] = signal("digite aqui");
	return /* @__PURE__ */ _jsxs("div", {
		"data-teste": "cliente-texto",
		children: [
			/* @__PURE__ */ _jsx("h3", { children: "10. Texto ligado" }),
			/* @__PURE__ */ _jsx("input", {
				value: () => texto(),
				onInput: (e) => setTexto(e.target.value)
			}),
			/* @__PURE__ */ _jsxs("p", {
				"data-len": () => texto().length,
				children: [
					"tamanho: ",
					() => texto().length,
					" — eco: ",
					() => texto()
				]
			}),
			/* @__PURE__ */ _jsx("button", {
				onClick: () => setTexto(""),
				children: "limpar"
			})
		]
	});
};

//# sourceMappingURL=reactive-client.__client_ssr.js.map
