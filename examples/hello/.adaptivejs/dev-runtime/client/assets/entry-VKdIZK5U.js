import { _ as jsx, a as signal, b as __exportAll, d as events, n as hydrateClientComponents, o as store, r as memo, s as batch, t as markClientExport, v as jsxs } from "./chunk-i_LCywE4.js";

//#region src/components/reactive-client.tsx
var reactive_client_exports = /* @__PURE__ */ __exportAll({
	ClienteAninhado: () => ClienteAninhado,
	ClienteBatch: () => ClienteBatch,
	ClienteClasse: () => ClienteClasse,
	ClienteCondicional: () => ClienteCondicional,
	ClienteListaMap: () => ClienteListaMap,
	ClienteListaReorder: () => ClienteListaReorder,
	ClienteMemo: () => ClienteMemo,
	ClienteStore: () => ClienteStore,
	ClienteTernario: () => ClienteTernario,
	ClienteTexto: () => ClienteTexto
});
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
const ClienteTernario = () => {
	const [ligado, setLigado] = signal(true);
	events(() => {
		console.log("[cliente/ternario] ligado =", ligado());
	});
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "cliente-ternario",
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
const ClienteListaMap = () => {
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
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "cliente-lista",
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
const ClienteListaReorder = () => {
	const [nomes, setNomes] = signal([
		"Ana",
		"Bruno",
		"Carla"
	]);
	events(() => {
		console.log("[cliente/reorder] nomes =", nomes());
	});
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "cliente-reorder",
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
			/* @__PURE__ */ jsx("p", { children: "Se o índice ficar preso no nome, a key não está sendo usada." })
		]
	});
};
const ClienteMemo = () => {
	const [a, setA] = signal(2);
	const [b, setB] = signal(3);
	const [calculos, setCalculos] = signal(0);
	const produto = memo(() => {
		setCalculos((n) => n + 1);
		console.log("[cliente/memo] recalculando produto");
		return a() * b();
	});
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "cliente-memo",
		children: [
			/* @__PURE__ */ jsx("h3", { children: "4. memo" }),
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
			}),
			/* @__PURE__ */ jsx("p", { children: "O contador é um signal justamente para o texto ser reativo. Se o produto mudar e o contador não, o memo não recalculou." })
		]
	});
};
const ClienteStore = () => {
	const s = store({
		nome: "visitante",
		visitas: 0
	});
	const [getNome, setNome] = s.nome;
	const [getVisitas, setVisitas] = s.visitas;
	events(() => {
		console.log("[cliente/store]", getNome(), getVisitas());
	});
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "cliente-store",
		children: [
			/* @__PURE__ */ jsx("h3", { children: "5. store" }),
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
const ClienteBatch = () => {
	const [x, setX] = signal(0);
	const [y, setY] = signal(0);
	const [z, setZ] = signal(0);
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "cliente-batch",
		children: [
			/* @__PURE__ */ jsx("h3", { children: "6. batch" }),
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
const ClienteCondicional = () => {
	const [mostrar, setMostrar] = signal(false);
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "cliente-condicional",
		children: [
			/* @__PURE__ */ jsx("h3", { children: "7. Condicional" }),
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
const ClienteClasse = () => {
	const [ligado, setLigado] = signal(true);
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "cliente-classe",
		children: [
			/* @__PURE__ */ jsx("h3", { children: "8. className / style" }),
			/* @__PURE__ */ jsx("div", {
				className: ligado() ? "verde" : "vermelho",
				children: "sem thunk: congelado"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: () => ligado() ? "verde" : "vermelho",
				children: ["com thunk: ", () => ligado() ? "verde" : "vermelho"]
			}),
			/* @__PURE__ */ jsx("div", {
				style: { color: ligado() ? "green" : "red" },
				children: "style estático"
			}),
			/* @__PURE__ */ jsx("div", {
				style: { color: () => ligado() ? "green" : "red" },
				children: "style com thunk"
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => setLigado(!ligado()),
				children: "alternar"
			})
		]
	});
};
const FilhoInterno = () => {
	const [n, setN] = signal(0);
	return /* @__PURE__ */ jsxs("button", {
		onClick: () => setN(n() + 1),
		"data-filho": () => n(),
		children: ["filho: ", () => n()]
	});
};
const ClienteAninhado = () => {
	const [pai, setPai] = signal(0);
	const [visivel, setVisivel] = signal(true);
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "cliente-aninhado",
		children: [
			/* @__PURE__ */ jsx("h3", { children: "9. Aninhado" }),
			/* @__PURE__ */ jsxs("button", {
				onClick: () => setPai(pai() + 1),
				"data-pai": () => pai(),
				children: ["pai: ", () => pai()]
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => setVisivel(!visivel()),
				children: () => visivel() ? "esconder filho" : "mostrar filho"
			}),
			() => visivel() ? /* @__PURE__ */ jsx(FilhoInterno, {}) : null,
			/* @__PURE__ */ jsx("p", { children: "Se o contador do filhozerar ao esconder, o escopo foi destruído." })
		]
	});
};
const ClienteTexto = () => {
	const [texto, setTexto] = signal("digite aqui");
	return /* @__PURE__ */ jsxs("div", {
		"data-teste": "cliente-texto",
		children: [
			/* @__PURE__ */ jsx("h3", { children: "10. Texto ligado" }),
			/* @__PURE__ */ jsx("input", {
				value: () => texto(),
				onInput: (e) => setTexto(e.target.value)
			}),
			/* @__PURE__ */ jsxs("p", {
				"data-len": () => texto().length,
				children: [
					"tamanho: ",
					() => texto().length,
					" — eco: ",
					() => texto()
				]
			}),
			/* @__PURE__ */ jsx("button", {
				onClick: () => setTexto(""),
				children: "limpar"
			})
		]
	});
};
typeof ClienteTernario === "function" && markClientExport(ClienteTernario, "components/reactive-client", "ClienteTernario", "client");
typeof ClienteListaMap === "function" && markClientExport(ClienteListaMap, "components/reactive-client", "ClienteListaMap", "client");
typeof ClienteListaReorder === "function" && markClientExport(ClienteListaReorder, "components/reactive-client", "ClienteListaReorder", "client");
typeof ClienteMemo === "function" && markClientExport(ClienteMemo, "components/reactive-client", "ClienteMemo", "client");
typeof ClienteStore === "function" && markClientExport(ClienteStore, "components/reactive-client", "ClienteStore", "client");
typeof ClienteBatch === "function" && markClientExport(ClienteBatch, "components/reactive-client", "ClienteBatch", "client");
typeof ClienteCondicional === "function" && markClientExport(ClienteCondicional, "components/reactive-client", "ClienteCondicional", "client");
typeof ClienteClasse === "function" && markClientExport(ClienteClasse, "components/reactive-client", "ClienteClasse", "client");
typeof ClienteAninhado === "function" && markClientExport(ClienteAninhado, "components/reactive-client", "ClienteAninhado", "client");
typeof ClienteTexto === "function" && markClientExport(ClienteTexto, "components/reactive-client", "ClienteTexto", "client");

//#endregion
//#region .adaptive-temp/dev-runtime-1791415595625-cveadg/temp/client-components/components__reactive-client.tsx
hydrateClientComponents("components/reactive-client", reactive_client_exports);

//#endregion
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnktVktkSVpLNVUuanMiLCJuYW1lcyI6WyJjbGllbnRNb2R1bGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9yZWFjdGl2ZS1jbGllbnQudHN4IiwiLi4vLi4vdGVtcC9jbGllbnQtY29tcG9uZW50cy9jb21wb25lbnRzX19yZWFjdGl2ZS1jbGllbnQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIidjbGllbnQnXG5cbmltcG9ydCB7IGJhdGNoLCBldmVudHMsIG1lbW8sIHNpZ25hbCwgc3RvcmUgfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3dlYlwiXG5cbi8qKlxuICogU3XDrXRlIGRlIHJlYXRpdmlkYWRlIHBhcmEgaWxoYXMgXCJjbGllbnRcIi5cbiAqXG4gKiBSRUdSQSBJTVBPUlRBTlRFOiB2YWxvciBkaW7Dom1pY28gdmFpIGRlbnRybyBkZSB0aHVuay5cbiAqICAgeygpID0+IHgoKX0gICAgICDihpIgZmlsaG8gcmVhdGl2byAocmFuZ2UgY29tIG1hcmNhZG9yZXMpXG4gKiAgIGF0dHI9eygpID0+IHgoKX0g4oaSIGF0cmlidXRvIGxpZ2FkbyBhIGVmZWl0b1xuICogICB7eCgpfSAgICAgICAgICAgIOKGkiBIVE1MIGVzdMOhdGljbywgY29uZ2VsYWRvIG5vIHByaW1laXJvIHJlbmRlclxuICpcbiAqIE8gc2Vydmlkb3IgbsOjbyByZW5kZXJpemEgZXN0YXMgaWxoYXM6IG8gSFRNTCBjaGVnYSB2YXppbyBlIHR1ZG8gYWNvbnRlY2VcbiAqIG5vIGJyb3dzZXIuIFNlIGEgdGVsYSBuw6NvIGF0dWFsaXphciBhbyBjbGljYXIsIMOpIHJlYXRpdmlkYWRlIOKAlCBuw6NvIFNTUi5cbiAqL1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIDEuIFRlcm7DoXJpbyDigJQgZG9pcyByYW1vcyB0cm9jYW5kbyBwb3Igc2luYWxcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgY29uc3QgQ2xpZW50ZVRlcm5hcmlvID0gKCkgPT4ge1xuICBjb25zdCBbbGlnYWRvLCBzZXRMaWdhZG9dID0gc2lnbmFsKHRydWUpXG5cbiAgZXZlbnRzKCgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIltjbGllbnRlL3Rlcm5hcmlvXSBsaWdhZG8gPVwiLCBsaWdhZG8oKSlcbiAgfSlcblxuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS10ZXN0ZT1cImNsaWVudGUtdGVybmFyaW9cIj5cbiAgICAgIDxoMz4xLiBUZXJuw6FyaW88L2gzPlxuICAgICAgPHAgZGF0YS12YWxvcj17KCkgPT4gKGxpZ2FkbygpID8gXCJTSU1cIiA6IFwiTkFPXCIpfT5cbiAgICAgICAgcmVzdWx0YWRvOiB7KCkgPT4gKGxpZ2FkbygpID8gXCJyYW1vIHZlcmRhZGVpcm9cIiA6IFwicmFtbyBmYWxzb1wiKX1cbiAgICAgIDwvcD5cbiAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0TGlnYWRvKCFsaWdhZG8oKSl9PmFsdGVybmFyPC9idXR0b24+XG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldExpZ2Fkbyh0cnVlKX0+cmVzZXQ8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIDIuIExpc3RhIGNvbSAubWFwXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGNvbnN0IENsaWVudGVMaXN0YU1hcCA9ICgpID0+IHtcbiAgY29uc3QgW2l0ZW5zLCBzZXRJdGVuc10gPSBzaWduYWw8c3RyaW5nW10+KFtcImFscGhhXCIsIFwiYmV0YVwiLCBcImdhbW1hXCJdKVxuXG4gIGV2ZW50cygoKSA9PiB7XG4gICAgY29uc29sZS5sb2coXCJbY2xpZW50ZS9saXN0YV0gaXRlbnMgPVwiLCBpdGVucygpKVxuICB9KVxuXG4gIGNvbnN0IGFkaWNpb25hciA9IChub21lOiBzdHJpbmcpID0+IHNldEl0ZW5zKFsuLi5pdGVucygpLCBub21lXSlcbiAgY29uc3QgcmVtb3ZlciA9IChpOiBudW1iZXIpID0+IHNldEl0ZW5zKGl0ZW5zKCkuZmlsdGVyKChfLCBpZHgpID0+IGlkeCAhPT0gaSkpXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtdGVzdGU9XCJjbGllbnRlLWxpc3RhXCI+XG4gICAgICA8aDM+Mi4gTGlzdGEgY29tIG1hcDwvaDM+XG4gICAgICA8c3BhbiBkYXRhLXRvdGFsPXsoKSA9PiBpdGVucygpLmxlbmd0aH0+dG90YWw6IHsoKSA9PiBpdGVucygpLmxlbmd0aH08L3NwYW4+XG4gICAgICA8dWw+XG4gICAgICAgIHsoKSA9PiBpdGVucygpLm1hcCgoaXRlbSwgaSkgPT4gKFxuICAgICAgICAgIDxsaSBrZXk9e2l0ZW19IGRhdGEtaXRlbT17aXRlbX0+XG4gICAgICAgICAgICB7aX06IHtpdGVtfVxuICAgICAgICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiByZW1vdmVyKGkpfT5yZW1vdmVyPC9idXR0b24+XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKSl9XG4gICAgICA8L3VsPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBhZGljaW9uYXIoXCJpdGVtLVwiICsgKGl0ZW5zKCkubGVuZ3RoICsgMSkpfT5cbiAgICAgICAgYWRpY2lvbmFyXG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0SXRlbnMoW10pfT5saW1wYXI8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIDMuIFJlb3JkZW5hciDigJQgYSBrZXkgcHJlY2lzYSBpbXBlZGlyIHJldXNvIGVycmFkbyBkZSBuw7Ncbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgY29uc3QgQ2xpZW50ZUxpc3RhUmVvcmRlciA9ICgpID0+IHtcbiAgY29uc3QgW25vbWVzLCBzZXROb21lc10gPSBzaWduYWwoW1wiQW5hXCIsIFwiQnJ1bm9cIiwgXCJDYXJsYVwiXSlcblxuICBldmVudHMoKCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKFwiW2NsaWVudGUvcmVvcmRlcl0gbm9tZXMgPVwiLCBub21lcygpKVxuICB9KVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXRlc3RlPVwiY2xpZW50ZS1yZW9yZGVyXCI+XG4gICAgICA8aDM+My4gUmVvcmRlbmFyIGxpc3RhPC9oMz5cbiAgICAgIDx1bD5cbiAgICAgICAgeygpID0+IG5vbWVzKCkubWFwKChub21lLCBpKSA9PiAoXG4gICAgICAgICAgPGxpIGtleT17bm9tZX0gZGF0YS1ub21lPXtub21lfT5cbiAgICAgICAgICAgIHtpfToge25vbWV9XG4gICAgICAgICAgPC9saT5cbiAgICAgICAgKSl9XG4gICAgICA8L3VsPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXROb21lcyhbLi4ubm9tZXMoKV0ucmV2ZXJzZSgpKX0+cmV2ZXJ0ZXI8L2J1dHRvbj5cbiAgICAgIDxwPlNlIG8gw61uZGljZSBmaWNhciBwcmVzbyBubyBub21lLCBhIGtleSBuw6NvIGVzdMOhIHNlbmRvIHVzYWRhLjwvcD5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIDQuIG1lbW8g4oCUIHZhbG9yIGRlcml2YWRvXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGNvbnN0IENsaWVudGVNZW1vID0gKCkgPT4ge1xuICBjb25zdCBbYSwgc2V0QV0gPSBzaWduYWwoMilcbiAgY29uc3QgW2IsIHNldEJdID0gc2lnbmFsKDMpXG4gIGNvbnN0IFtjYWxjdWxvcywgc2V0Q2FsY3Vsb3NdID0gc2lnbmFsKDApXG5cbiAgY29uc3QgcHJvZHV0byA9IG1lbW8oKCkgPT4ge1xuICAgIHNldENhbGN1bG9zKChuKSA9PiBuICsgMSlcbiAgICBjb25zb2xlLmxvZyhcIltjbGllbnRlL21lbW9dIHJlY2FsY3VsYW5kbyBwcm9kdXRvXCIpXG4gICAgcmV0dXJuIGEoKSAqIGIoKVxuICB9KVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXRlc3RlPVwiY2xpZW50ZS1tZW1vXCI+XG4gICAgICA8aDM+NC4gbWVtbzwvaDM+XG4gICAgICA8cCBkYXRhLXByb2R1dG89eygpID0+IHByb2R1dG8oKX0+YSAqIGIgPSB7KCkgPT4gcHJvZHV0bygpfTwvcD5cbiAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0QShhKCkgKyAxKX0+YSsrPC9idXR0b24+XG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldEIoYigpICsgMSl9PmIrKzwvYnV0dG9uPlxuICAgICAgPHAgZGF0YS1jYWxjdWxvcz17KCkgPT4gY2FsY3Vsb3MoKX0+Y8OhbGN1bG9zOiB7KCkgPT4gY2FsY3Vsb3MoKX08L3A+XG4gICAgICA8cD5cbiAgICAgICAgTyBjb250YWRvciDDqSB1bSBzaWduYWwganVzdGFtZW50ZSBwYXJhIG8gdGV4dG8gc2VyIHJlYXRpdm8uIFNlIG9cbiAgICAgICAgcHJvZHV0byBtdWRhciBlIG8gY29udGFkb3IgbsOjbywgbyBtZW1vIG7Do28gcmVjYWxjdWxvdS5cbiAgICAgIDwvcD5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIDUuIHN0b3JlIOKAlCBvYmpldG8gZGUgc2luYWlzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGNvbnN0IENsaWVudGVTdG9yZSA9ICgpID0+IHtcbiAgLy8gc3RvcmUgZGV2b2x2ZSB1bSBTaWduYWwgcG9yIGNoYXZlLCBlIFNpZ25hbCDDqSBhIHR1cGxhIFtnZXR0ZXIsIHNldHRlcl0uXG4gIC8vIE7Do28gZMOhIHBhcmEgZXNjcmV2ZXIgcy5ub21lKCk6IHRlbSBxdWUgZGVzZXN0cnV0dXJhci5cbiAgY29uc3QgcyA9IHN0b3JlKHsgbm9tZTogXCJ2aXNpdGFudGVcIiwgdmlzaXRhczogMCB9KVxuICBjb25zdCBbZ2V0Tm9tZSwgc2V0Tm9tZV0gPSBzLm5vbWVcbiAgY29uc3QgW2dldFZpc2l0YXMsIHNldFZpc2l0YXNdID0gcy52aXNpdGFzXG5cbiAgZXZlbnRzKCgpID0+IHtcbiAgICBjb25zb2xlLmxvZyhcIltjbGllbnRlL3N0b3JlXVwiLCBnZXROb21lKCksIGdldFZpc2l0YXMoKSlcbiAgfSlcblxuICByZXR1cm4gKFxuICAgIDxkaXYgZGF0YS10ZXN0ZT1cImNsaWVudGUtc3RvcmVcIj5cbiAgICAgIDxoMz41LiBzdG9yZTwvaDM+XG4gICAgICA8cCBkYXRhLW5vbWU9eygpID0+IGdldE5vbWUoKX0+bm9tZTogeygpID0+IGdldE5vbWUoKX08L3A+XG4gICAgICA8cCBkYXRhLXZpc2l0YXM9eygpID0+IGdldFZpc2l0YXMoKX0+dmlzaXRhczogeygpID0+IGdldFZpc2l0YXMoKX08L3A+XG4gICAgICA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHNldFZpc2l0YXMoKG4pID0+IG4gKyAxKX0+dmlzaXRhcjwvYnV0dG9uPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXROb21lKChuKSA9PiAobiA9PT0gXCJ2aXNpdGFudGVcIiA/IFwiZWRpdG9yXCIgOiBcInZpc2l0YW50ZVwiKSl9PlxuICAgICAgICB0cm9jYXIgbm9tZVxuICAgICAgPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyA2LiBiYXRjaCDigJQgdHLDqnMgc2luYWlzIG51bWEgYXR1YWxpemHDp8OjbyBzw7Ncbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgY29uc3QgQ2xpZW50ZUJhdGNoID0gKCkgPT4ge1xuICBjb25zdCBbeCwgc2V0WF0gPSBzaWduYWwoMClcbiAgY29uc3QgW3ksIHNldFldID0gc2lnbmFsKDApXG4gIGNvbnN0IFt6LCBzZXRaXSA9IHNpZ25hbCgwKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXRlc3RlPVwiY2xpZW50ZS1iYXRjaFwiPlxuICAgICAgPGgzPjYuIGJhdGNoPC9oMz5cbiAgICAgIDxwIGRhdGEteD17KCkgPT4geCgpfT54OiB7KCkgPT4geCgpfTwvcD5cbiAgICAgIDxwIGRhdGEteT17KCkgPT4geSgpfT55OiB7KCkgPT4geSgpfTwvcD5cbiAgICAgIDxwIGRhdGEtej17KCkgPT4geigpfT56OiB7KCkgPT4geigpfTwvcD5cbiAgICAgIDxidXR0b25cbiAgICAgICAgb25DbGljaz17KCkgPT5cbiAgICAgICAgICBiYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICBzZXRYKHgoKSArIDEpXG4gICAgICAgICAgICBzZXRZKHkoKSArIDEpXG4gICAgICAgICAgICBzZXRaKHooKSArIDEpXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgPlxuICAgICAgICBzb21hciBvcyB0csOqc1xuICAgICAgPC9idXR0b24+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICBzZXRYKHgoKSArIDEpXG4gICAgICAgICAgc2V0WSh5KCkgKyAxKVxuICAgICAgICAgIHNldFooeigpICsgMSlcbiAgICAgICAgfX1cbiAgICAgID5cbiAgICAgICAgc29tYXIgc2VtIGJhdGNoXG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIDcuIENvbmRpY2lvbmFsIOKAlCBleHRyYWkgZSByZWluc2VyZSBvIGJsb2NvXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuZXhwb3J0IGNvbnN0IENsaWVudGVDb25kaWNpb25hbCA9ICgpID0+IHtcbiAgY29uc3QgW21vc3RyYXIsIHNldE1vc3RyYXJdID0gc2lnbmFsKGZhbHNlKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXRlc3RlPVwiY2xpZW50ZS1jb25kaWNpb25hbFwiPlxuICAgICAgPGgzPjcuIENvbmRpY2lvbmFsPC9oMz5cbiAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0TW9zdHJhcighbW9zdHJhcigpKX0+XG4gICAgICAgIHsoKSA9PiAobW9zdHJhcigpID8gXCJlc2NvbmRlclwiIDogXCJtb3N0cmFyXCIpfVxuICAgICAgPC9idXR0b24+XG4gICAgICB7KCkgPT5cbiAgICAgICAgbW9zdHJhcigpID8gKFxuICAgICAgICAgIDxzZWN0aW9uIGRhdGEtYmxvY289XCJ2aXNpdmVsXCI+XG4gICAgICAgICAgICA8cD5CbG9jbyB2aXPDrXZlbDwvcD5cbiAgICAgICAgICA8L3NlY3Rpb24+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPHAgZGF0YS1ibG9jbz1cIm9jdWx0b1wiPk5hZGEgYXF1aTwvcD5cbiAgICAgICAgKVxuICAgICAgfVxuICAgIDwvZGl2PlxuICApXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gOC4gY2xhc3NOYW1lIGUgc3R5bGUgcmVhdGl2b3Ncbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgY29uc3QgQ2xpZW50ZUNsYXNzZSA9ICgpID0+IHtcbiAgY29uc3QgW2xpZ2Fkbywgc2V0TGlnYWRvXSA9IHNpZ25hbCh0cnVlKVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBkYXRhLXRlc3RlPVwiY2xpZW50ZS1jbGFzc2VcIj5cbiAgICAgIDxoMz44LiBjbGFzc05hbWUgLyBzdHlsZTwvaDM+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17bGlnYWRvKCkgPyBcInZlcmRlXCIgOiBcInZlcm1lbGhvXCJ9PnNlbSB0aHVuazogY29uZ2VsYWRvPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT17KCkgPT4gKGxpZ2FkbygpID8gXCJ2ZXJkZVwiIDogXCJ2ZXJtZWxob1wiKX0+XG4gICAgICAgIGNvbSB0aHVuazogeygpID0+IChsaWdhZG8oKSA/IFwidmVyZGVcIiA6IFwidmVybWVsaG9cIil9XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgc3R5bGU9e3sgY29sb3I6IGxpZ2FkbygpID8gXCJncmVlblwiIDogXCJyZWRcIiB9fT5zdHlsZSBlc3TDoXRpY288L2Rpdj5cbiAgICAgIDxkaXYgc3R5bGU9e3sgY29sb3I6ICgpID0+IChsaWdhZG8oKSA/IFwiZ3JlZW5cIiA6IFwicmVkXCIpIH19PlxuICAgICAgICBzdHlsZSBjb20gdGh1bmtcbiAgICAgIDwvZGl2PlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRMaWdhZG8oIWxpZ2FkbygpKX0+YWx0ZXJuYXI8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIDkuIEFuaW5oYW1lbnRvIOKAlCBlc3RhZG8gZGUgZmlsaG8gc29icmV2aXZlIGFvIHRvZ2dsZSBkbyBwYWlcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jb25zdCBGaWxob0ludGVybm8gPSAoKSA9PiB7XG4gIGNvbnN0IFtuLCBzZXROXSA9IHNpZ25hbCgwKVxuICByZXR1cm4gKFxuICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0TihuKCkgKyAxKX0gZGF0YS1maWxobz17KCkgPT4gbigpfT5cbiAgICAgIGZpbGhvOiB7KCkgPT4gbigpfVxuICAgIDwvYnV0dG9uPlxuICApXG59XG5cbmV4cG9ydCBjb25zdCBDbGllbnRlQW5pbmhhZG8gPSAoKSA9PiB7XG4gIGNvbnN0IFtwYWksIHNldFBhaV0gPSBzaWduYWwoMClcbiAgY29uc3QgW3Zpc2l2ZWwsIHNldFZpc2l2ZWxdID0gc2lnbmFsKHRydWUpXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtdGVzdGU9XCJjbGllbnRlLWFuaW5oYWRvXCI+XG4gICAgICA8aDM+OS4gQW5pbmhhZG88L2gzPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRQYWkocGFpKCkgKyAxKX0gZGF0YS1wYWk9eygpID0+IHBhaSgpfT5cbiAgICAgICAgcGFpOiB7KCkgPT4gcGFpKCl9XG4gICAgICA8L2J1dHRvbj5cbiAgICAgIDxidXR0b24gb25DbGljaz17KCkgPT4gc2V0VmlzaXZlbCghdmlzaXZlbCgpKX0+XG4gICAgICAgIHsoKSA9PiAodmlzaXZlbCgpID8gXCJlc2NvbmRlciBmaWxob1wiIDogXCJtb3N0cmFyIGZpbGhvXCIpfVxuICAgICAgPC9idXR0b24+XG4gICAgICB7KCkgPT4gKHZpc2l2ZWwoKSA/IDxGaWxob0ludGVybm8gLz4gOiBudWxsKX1cbiAgICAgIDxwPlNlIG8gY29udGFkb3IgZG8gZmlsaG96ZXJhciBhbyBlc2NvbmRlciwgbyBlc2NvcG8gZm9pIGRlc3RydcOtZG8uPC9wPlxuICAgIDwvZGl2PlxuICApXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gMTAuIFRleHRvIGxvbmdvIGNvbSB0aHJvdHRsZSDigJQgY2FkYSB0ZWNsYSByZS1yZW5kZXJpemFcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5leHBvcnQgY29uc3QgQ2xpZW50ZVRleHRvID0gKCkgPT4ge1xuICBjb25zdCBbdGV4dG8sIHNldFRleHRvXSA9IHNpZ25hbChcImRpZ2l0ZSBhcXVpXCIpXG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGRhdGEtdGVzdGU9XCJjbGllbnRlLXRleHRvXCI+XG4gICAgICA8aDM+MTAuIFRleHRvIGxpZ2FkbzwvaDM+XG4gICAgICA8aW5wdXRcbiAgICAgICAgdmFsdWU9eygpID0+IHRleHRvKCl9XG4gICAgICAgIG9uSW5wdXQ9eyhlOiBhbnkpID0+IHNldFRleHRvKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgIC8+XG4gICAgICA8cCBkYXRhLWxlbj17KCkgPT4gdGV4dG8oKS5sZW5ndGh9PlxuICAgICAgICB0YW1hbmhvOiB7KCkgPT4gdGV4dG8oKS5sZW5ndGh9IOKAlCBlY286IHsoKSA9PiB0ZXh0bygpfVxuICAgICAgPC9wPlxuICAgICAgPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiBzZXRUZXh0byhcIlwiKX0+bGltcGFyPC9idXR0b24+XG4gICAgPC9kaXY+XG4gIClcbn1cbiIsIlxuaW1wb3J0ICogYXMgY2xpZW50TW9kdWxlIGZyb20gXCIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9yZWFjdGl2ZS1jbGllbnQudHN4XCI7XG5pbXBvcnQgeyBoeWRyYXRlQ2xpZW50Q29tcG9uZW50cyB9IGZyb20gXCJAYWRhcHRpdmUtanMvd2ViXCI7XG5cbmh5ZHJhdGVDbGllbnRDb21wb25lbnRzKFwiY29tcG9uZW50cy9yZWFjdGl2ZS1jbGllbnRcIiwgY2xpZW50TW9kdWxlKTtcbmV4cG9ydCB7fTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsTUFBYSx3QkFBd0I7Q0FDbkMsTUFBTSxDQUFDLFFBQVEsYUFBYSxPQUFPLElBQUk7Q0FFdkMsYUFBYTtFQUNYLFFBQVEsSUFBSSwrQkFBK0IsT0FBTyxDQUFDO0NBQ3JELENBQUM7Q0FFRCxPQUNFLHFCQUFDLE9BQUQ7RUFBSyxjQUFXO1lBQWhCO0dBQ0Usb0JBQUMsTUFBRCxZQUFJLGNBQWU7R0FDbkIscUJBQUMsS0FBRDtJQUFHLG9CQUFtQixPQUFPLElBQUksUUFBUTtjQUF6QyxDQUFpRCxxQkFDNUIsT0FBTyxJQUFJLG9CQUFvQixZQUNqRDs7R0FDSCxvQkFBQyxVQUFEO0lBQVEsZUFBZSxVQUFVLENBQUMsT0FBTyxDQUFDO2NBQUc7R0FBZ0I7R0FDN0Qsb0JBQUMsVUFBRDtJQUFRLGVBQWUsVUFBVSxJQUFJO2NBQUc7R0FBYTtFQUNsRDs7QUFFVDtBQU1BLE1BQWEsd0JBQXdCO0NBQ25DLE1BQU0sQ0FBQyxPQUFPLFlBQVksT0FBaUI7RUFBQztFQUFTO0VBQVE7Q0FBTyxDQUFDO0NBRXJFLGFBQWE7RUFDWCxRQUFRLElBQUksMkJBQTJCLE1BQU0sQ0FBQztDQUNoRCxDQUFDO0NBRUQsTUFB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