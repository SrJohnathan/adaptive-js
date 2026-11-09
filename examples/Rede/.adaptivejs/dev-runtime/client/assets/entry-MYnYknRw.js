import { _ as jsx, b as __exportAll, c as signal, g as Fragment, n as hydrateClientComponents, r as useRouter, t as markClientExport, v as jsxs } from "./chunk-CME3klQt.js";
import { t as showToast } from "./chunk-BfKm4NCt.js";
import { r as LOGO_URL, s as USER_AVATAR } from "./chunk-i84mfdyU.js";
import { t as SCREEN_ROUTES } from "./chunk-BAJW75ro.js";
import { n as openPalette } from "./chunk-EnkDTPL5.js";

//#region src/components/omni-hub/header.tsx
var header_exports = /* @__PURE__ */ __exportAll({ Header: () => Header });
function Header() {
	const router = useRouter();
	const [userMenuOpen, setUserMenuOpen] = signal(false);
	const goTo = (path) => {
		setUserMenuOpen(false);
		router.push(path);
	};
	return /* @__PURE__ */ jsx("header", {
		className: "fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/20",
		children: /* @__PURE__ */ jsxs("div", {
			className: "h-16 w-full px-4 sm:px-6 flex items-center justify-between gap-4",
			children: [
				/* @__PURE__ */ jsxs("div", {
					onClick: () => goTo(SCREEN_ROUTES["catalogo-erp"]),
					className: "flex items-center gap-2 sm:gap-3 min-w-[180px] cursor-pointer hover:opacity-95 transition-opacity",
					children: [
						/* @__PURE__ */ jsx("img", {
							alt: "Logo Rede Omnichannel",
							className: "h-8 w-auto object-contain",
							src: LOGO_URL
						}),
						/* @__PURE__ */ jsx("span", {
							className: "font-headline-md tracking-tight text-primary font-bold",
							children: "Rede"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm uppercase tracking-wider font-semibold",
							children: "Omni Hub"
						})
					]
				}),
				/* @__PURE__ */ jsx("div", {
					className: "flex-1 max-w-xl hidden md:flex items-center",
					children: /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: openPalette,
						className: "w-full flex items-center justify-between bg-surface-container-low hover:bg-surface-container rounded-xl px-3.5 py-1.5 shadow-inner transition-colors text-left",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 text-on-surface-variant",
							children: [/* @__PURE__ */ jsx("span", {
								className: "material-symbols-outlined text-[20px]",
								children: "search"
							}), /* @__PURE__ */ jsx("span", {
								className: "font-body-sm text-on-surface-variant/70",
								children: "Pesquisar contatos, protocolos, mensagens..."
							})]
						}), /* @__PURE__ */ jsx("kbd", {
							className: "hidden lg:inline-block font-code-sm px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-medium",
							children: "Ctrl K"
						})]
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-3 sm:gap-4 ml-auto",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "hidden xl:flex items-center gap-4 px-3 py-1 rounded-xl bg-surface-container-low border border-outline-variant/20",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col text-left",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-label-sm text-on-surface-variant leading-none",
										children: "Campanhas Hoje"
									}), /* @__PURE__ */ jsx("span", {
										className: "font-title-md text-primary font-bold mt-0.5",
										children: "14 disparos"
									})]
								}),
								/* @__PURE__ */ jsx("div", { className: "w-px h-6 bg-outline-variant/40" }),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col text-left",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-label-sm text-on-surface-variant leading-none",
										children: "Taxa Entrega"
									}), /* @__PURE__ */ jsx("span", {
										className: "font-title-md text-tertiary font-bold mt-0.5",
										children: "98.7%"
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "hidden sm:flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1 rounded-full border border-outline-variant/20",
							children: [/* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-primary-container animate-pulse" }), /* @__PURE__ */ jsx("span", {
								className: "font-label-sm text-on-surface font-semibold",
								children: "Disponível"
							})]
						}),
						/* @__PURE__ */ jsxs("button", {
							type: "button",
							className: "relative p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors",
							title: "Notificações da Operação",
							onClick: () => showToast("Notificações", "Nenhum alerta novo na operação.", "info"),
							children: [/* @__PURE__ */ jsx("span", {
								className: "material-symbols-outlined text-[22px]",
								children: "notifications"
							}), /* @__PURE__ */ jsx("span", { className: "absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-primary-container ring-2 ring-surface-container-lowest" })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "relative",
							children: [/* @__PURE__ */ jsxs("button", {
								type: "button",
								onClick: () => setUserMenuOpen(!userMenuOpen()),
								className: "flex items-center gap-2.5 pl-1 p-1 rounded-xl hover:bg-surface-container-low transition-colors",
								children: [
									/* @__PURE__ */ jsx("img", {
										alt: "Mariana Silva",
										className: "w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant",
										src: USER_AVATAR
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "hidden md:flex flex-col text-left",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-title-md text-on-surface leading-tight font-semibold",
											children: "Mariana Silva"
										}), /* @__PURE__ */ jsx("span", {
											className: "font-label-sm text-on-surface-variant",
											children: "Atendimento Sênior"
										})]
									}),
									/* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[16px] text-on-surface-variant hidden md:inline",
										children: "expand_more"
									})
								]
							}), () => userMenuOpen() ? /* @__PURE__ */ jsxs("div", {
								className: "absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 py-2 z-50 animate-in fade-in",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "px-3 py-2 border-b border-outline-variant/20",
										children: [/* @__PURE__ */ jsx("p", {
											className: "font-title-md text-on-surface font-bold",
											children: "Mariana Silva"
										}), /* @__PURE__ */ jsx("p", {
											className: "font-label-sm text-on-surface-variant truncate",
											children: "mariana.silva@redehub.com.br"
										})]
									}),
									/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => goTo(SCREEN_ROUTES["configuracoes-conta"]),
										className: "w-full px-3 py-2 text-left font-body-sm text-on-surface hover:bg-surface-container-high flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[18px] text-primary",
											children: "manage_accounts"
										}), "Configurações de Conta"]
									}),
									/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => goTo(SCREEN_ROUTES["estudio-banners"]),
										className: "w-full px-3 py-2 text-left font-body-sm text-on-surface hover:bg-surface-container-high flex items-center gap-2",
										children: [/* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[18px] text-tertiary",
											children: "photo_library"
										}), "Estúdio de Banners & IA"]
									}),
									/* @__PURE__ */ jsxs("button", {
										type: "button",
										onClick: () => goTo(SCREEN_ROUTES["autenticacao"]),
										className: "w-full px-3 py-2 text-left font-body-sm text-primary hover:bg-surface-container-high flex items-center gap-2 border-t border-outline-variant/20",
										children: [/* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "lock_reset"
										}), "Tela de Login Corporativo"]
									})
								]
							}) : /* @__PURE__ */ jsx(Fragment, {})]
						})
					]
				})
			]
		})
	});
}
typeof Header === "function" && markClientExport(Header, "components/omni-hub/header", "Header", "hydrate");

//#endregion
//#region .adaptive-temp/dev-runtime-1791414636097-r2w5sp/temp/client-components/components__omni-hub__header.tsx
hydrateClientComponents("components/omni-hub/header", header_exports);

//#endregion
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnktTVluWWtuUncuanMiLCJuYW1lcyI6WyJjbGllbnRNb2R1bGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9vbW5pLWh1Yi9oZWFkZXIudHN4IiwiLi4vLi4vdGVtcC9jbGllbnQtY29tcG9uZW50cy9jb21wb25lbnRzX19vbW5pLWh1Yl9faGVhZGVyLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJcImh5ZHJhdGVcIjtcblxuaW1wb3J0IHsgc2lnbmFsLCB1c2VSb3V0ZXIgfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3dlYlwiO1xuaW1wb3J0IHsgTE9HT19VUkwsIFVTRVJfQVZBVEFSIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9vbW5pLWh1Yi9tb2NrLWRhdGFcIjtcbmltcG9ydCB7IFNDUkVFTl9ST1VURVMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL29tbmktaHViL3R5cGVzXCI7XG5pbXBvcnQgeyBvcGVuUGFsZXR0ZSB9IGZyb20gXCIuLi8uLi9zaGFyZWQvb21uaS1odWIvcGFsZXR0ZS1zdG9yZVwiO1xuaW1wb3J0IHsgc2hvd1RvYXN0IH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9vbW5pLWh1Yi90b2FzdC1zdG9yZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gSGVhZGVyKCkge1xuICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcbiAgY29uc3QgW3VzZXJNZW51T3Blbiwgc2V0VXNlck1lbnVPcGVuXSA9IHNpZ25hbChmYWxzZSk7XG5cbiAgY29uc3QgZ29UbyA9IChwYXRoOiBzdHJpbmcpID0+IHtcbiAgICBzZXRVc2VyTWVudU9wZW4oZmFsc2UpO1xuICAgIHJvdXRlci5wdXNoKHBhdGgpO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGhlYWRlciBjbGFzc05hbWU9XCJmaXhlZCB0b3AtMCBsZWZ0LTAgcmlnaHQtMCB6LTUwIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvd2VzdCBzaGFkb3ctWzBfMXB4XzhweF9yZ2JhKDAsMCwwLDAuMDQpXSBib3JkZXItYiBib3JkZXItb3V0bGluZS12YXJpYW50LzIwXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImgtMTYgdy1mdWxsIHB4LTQgc206cHgtNiBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gZ2FwLTRcIj5cbiAgICAgICAgey8qIEJyYW5kIC8gTG9nbyAqL31cbiAgICAgICAgPGRpdlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGdvVG8oU0NSRUVOX1JPVVRFU1tcImNhdGFsb2dvLWVycFwiXSl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgc206Z2FwLTMgbWluLXctWzE4MHB4XSBjdXJzb3ItcG9pbnRlciBob3ZlcjpvcGFjaXR5LTk1IHRyYW5zaXRpb24tb3BhY2l0eVwiXG4gICAgICAgID5cbiAgICAgICAgICA8aW1nIGFsdD1cIkxvZ28gUmVkZSBPbW5pY2hhbm5lbFwiIGNsYXNzTmFtZT1cImgtOCB3LWF1dG8gb2JqZWN0LWNvbnRhaW5cIiBzcmM9e0xPR09fVVJMfSAvPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtaGVhZGxpbmUtbWQgdHJhY2tpbmctdGlnaHQgdGV4dC1wcmltYXJ5IGZvbnQtYm9sZFwiPlJlZGU8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlkZGVuIHNtOmlubGluZS1mbGV4IGl0ZW1zLWNlbnRlciBweC0yIHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctc3VyZmFjZS1jb250YWluZXItaGlnaCB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBmb250LWxhYmVsLXNtIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBmb250LXNlbWlib2xkXCI+XG4gICAgICAgICAgICBPbW5pIEh1YlxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgey8qIEdsb2JhbCBTZWFyY2ggQmFyIHdpdGggQ3RybCtLICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBtYXgtdy14bCBoaWRkZW4gbWQ6ZmxleCBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e29wZW5QYWxldHRlfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXIgcm91bmRlZC14bCBweC0zLjUgcHktMS41IHNoYWRvdy1pbm5lciB0cmFuc2l0aW9uLWNvbG9ycyB0ZXh0LWxlZnRcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsyMHB4XVwiPnNlYXJjaDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2R5LXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50LzcwXCI+XG4gICAgICAgICAgICAgICAgUGVzcXVpc2FyIGNvbnRhdG9zLCBwcm90b2NvbG9zLCBtZW5zYWdlbnMuLi5cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8a2JkIGNsYXNzTmFtZT1cImhpZGRlbiBsZzppbmxpbmUtYmxvY2sgZm9udC1jb2RlLXNtIHB4LTEuNSBweS0wLjUgcm91bmRlZCBiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoZXN0IHRleHQtb24tc3VyZmFjZS12YXJpYW50IGZvbnQtbWVkaXVtXCI+XG4gICAgICAgICAgICAgIEN0cmwgS1xuICAgICAgICAgICAgPC9rYmQ+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIHsvKiBSaWdodCBTZWN0aW9uICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zIHNtOmdhcC00IG1sLWF1dG9cIj5cbiAgICAgICAgICB7LyogT3BlcmF0aW9uYWwgTWV0cmljcyAqL31cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhpZGRlbiB4bDpmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNCBweC0zIHB5LTEgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjBcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCB0ZXh0LWxlZnRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1sYWJlbC1zbSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBsZWFkaW5nLW5vbmVcIj5DYW1wYW5oYXMgSG9qZTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC10aXRsZS1tZCB0ZXh0LXByaW1hcnkgZm9udC1ib2xkIG10LTAuNVwiPjE0IGRpc3Bhcm9zPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctcHggaC02IGJnLW91dGxpbmUtdmFyaWFudC80MFwiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIHRleHQtbGVmdFwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWxhYmVsLXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGxlYWRpbmctbm9uZVwiPlRheGEgRW50cmVnYTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC10aXRsZS1tZCB0ZXh0LXRlcnRpYXJ5IGZvbnQtYm9sZCBtdC0wLjVcIj45OC43JTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgey8qIEF2YWlsYWJpbGl0eSBQaWxsICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlkZGVuIHNtOmZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjUgYmctc3VyZmFjZS1jb250YWluZXItbG93IHB4LTIuNSBweS0xIHJvdW5kZWQtZnVsbCBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidy0yIGgtMiByb3VuZGVkLWZ1bGwgYmctcHJpbWFyeS1jb250YWluZXIgYW5pbWF0ZS1wdWxzZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbGFiZWwtc20gdGV4dC1vbi1zdXJmYWNlIGZvbnQtc2VtaWJvbGRcIj5EaXNwb27DrXZlbDwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIHsvKiBOb3RpZmljYXRpb24gQmVsbCAqL31cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInJlbGF0aXZlIHAtMiByb3VuZGVkLXhsIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2ggaG92ZXI6dGV4dC1vbi1zdXJmYWNlIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgIHRpdGxlPVwiTm90aWZpY2HDp8O1ZXMgZGEgT3BlcmHDp8Ojb1wiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzaG93VG9hc3QoXCJOb3RpZmljYcOnw7Vlc1wiLCBcIk5lbmh1bSBhbGVydGEgbm92byBuYSBvcGVyYcOnw6NvLlwiLCBcImluZm9cIil9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsyMnB4XVwiPm5vdGlmaWNhdGlvbnM8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMS41IHJpZ2h0LTEuNSB3LTIuNSBoLTIuNSByb3VuZGVkLWZ1bGwgYmctcHJpbWFyeS1jb250YWluZXIgcmluZy0yIHJpbmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0XCI+PC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgey8qIFVzZXIgUHJvZmlsZSAmIERyb3Bkb3duICovfVxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmVcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFVzZXJNZW51T3BlbighdXNlck1lbnVPcGVuKCkpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMi41IHBsLTEgcC0xIHJvdW5kZWQteGwgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXItbG93IHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgIGFsdD1cIk1hcmlhbmEgU2lsdmFcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctOCBoLTggcm91bmRlZC1mdWxsIG9iamVjdC1jb3ZlciByaW5nLTEgcmluZy1vdXRsaW5lLXZhcmlhbnRcIlxuICAgICAgICAgICAgICAgIHNyYz17VVNFUl9BVkFUQVJ9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGlkZGVuIG1kOmZsZXggZmxleC1jb2wgdGV4dC1sZWZ0XCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC10aXRsZS1tZCB0ZXh0LW9uLXN1cmZhY2UgbGVhZGluZy10aWdodCBmb250LXNlbWlib2xkXCI+TWFyaWFuYSBTaWx2YTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWxhYmVsLXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+QXRlbmRpbWVudG8gU8Oqbmlvcjwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMTZweF0gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgaGlkZGVuIG1kOmlubGluZVwiPlxuICAgICAgICAgICAgICAgIGV4cGFuZF9tb3JlXG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7KCkgPT4gIHVzZXJNZW51T3BlbigpID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcmlnaHQtMCBtdC0yIHctNTYgYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IHJvdW5kZWQteGwgc2hhZG93LXhsIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzMwIHB5LTIgei01MCBhbmltYXRlLWluIGZhZGUtaW5cIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicHgtMyBweS0yIGJvcmRlci1iIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC10aXRsZS1tZCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2xkXCI+TWFyaWFuYSBTaWx2YTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1sYWJlbC1zbSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCB0cnVuY2F0ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgIG1hcmlhbmEuc2lsdmFAcmVkZWh1Yi5jb20uYnJcbiAgICAgICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBnb1RvKFNDUkVFTl9ST1VURVNbXCJjb25maWd1cmFjb2VzLWNvbnRhXCJdKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMgcHktMiB0ZXh0LWxlZnQgZm9udC1ib2R5LXNtIHRleHQtb24tc3VyZmFjZSBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxOHB4XSB0ZXh0LXByaW1hcnlcIj5tYW5hZ2VfYWNjb3VudHM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIENvbmZpZ3VyYcOnw7VlcyBkZSBDb250YVxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBnb1RvKFNDUkVFTl9ST1VURVNbXCJlc3R1ZGlvLWJhbm5lcnNcIl0pfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHgtMyBweS0yIHRleHQtbGVmdCBmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlIGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2ggZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE4cHhdIHRleHQtdGVydGlhcnlcIj5waG90b19saWJyYXJ5PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICBFc3TDumRpbyBkZSBCYW5uZXJzICYgSUFcbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gZ29UbyhTQ1JFRU5fUk9VVEVTW1wiYXV0ZW50aWNhY2FvXCJdKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy1mdWxsIHB4LTMgcHktMiB0ZXh0LWxlZnQgZm9udC1ib2R5LXNtIHRleHQtcHJpbWFyeSBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoIGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGJvcmRlci10IGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjBcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE4cHhdXCI+bG9ja19yZXNldDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgVGVsYSBkZSBMb2dpbiBDb3Jwb3JhdGl2b1xuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICkgOiA8PjwvPlxuICAgICAgICAgICAgfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvaGVhZGVyPlxuICApO1xufSIsIlxuaW1wb3J0ICogYXMgY2xpZW50TW9kdWxlIGZyb20gXCIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9vbW5pLWh1Yi9oZWFkZXIudHN4XCI7XG5pbXBvcnQgeyBoeWRyYXRlQ2xpZW50Q29tcG9uZW50cyB9IGZyb20gXCJAYWRhcHRpdmUtanMvd2ViXCI7XG5cbmh5ZHJhdGVDbGllbnRDb21wb25lbnRzKFwiY29tcG9uZW50cy9vbW5pLWh1Yi9oZWFkZXJcIiwgY2xpZW50TW9kdWxlKTtcbmV4cG9ydCB7fTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFNQSxTQUFnQixTQUFTO0NBQ3ZCLE1BQU0sU0FBUyxVQUFVO0NBQ3pCLE1BQU0sQ0FBQyxjQUFjLG1CQUFtQixPQUFPLEtBQUs7Q0FFcEQsTUFBTSxRQUFRLFNBQWlCO0VBQzdCLGdCQUFnQixLQUFLO0VBQ3JCLE9BQU8sS0FBSyxJQUFJO0NBQ2xCO0NBRUEsT0FDRSxvQkFBQyxVQUFEO0VBQVEsV0FBVTtZQUNoQixxQkFBQyxPQUFEO0dBQUssV0FBVTthQUFmO0lBRUUscUJBQUMsT0FBRDtLQUNFLGVBQWUsS0FBSyxjQUFjLGVBQWU7S0FDakQsV0FBVTtlQUZaO01BSUUsb0JBQUMsT0FBRDtPQUFLLEtBQUk7T0FBd0IsV0FBVTtPQUE0QixLQUFLO01BQVc7TUFDdkYsb0JBQUMsUUFBRDtPQUFNLFdBQVU7aUJBQXlEO01BQVU7TUFDbkYsb0JBQUMsUUFBRDtPQUFNLFdBQVU7aUJBQXFLO01BRS9LO0tBQ0g7O0lBR0wsb0JBQUMsT0FBRDtLQUFLLFdBQVU7ZUFDYixxQkFBQyxVQUFEO01BQ0UsTUFBSztNQUNMLFNBQVM7TUFDVCxXQUFVO2dCQUhaLENBS0UscUJBQUMsT0FBRDtPQUFLLFdBQVU7aUJBQWYsQ0FDRSxvQkFBQyxRQUFEO1FBQU0sV0FBVTtrQkFBd0M7T0FBWSxJQUNwRSxvQkFBQyxRQUFEO1FBQU0sV0FBVTtrQkFBMEM7T0FFcEQsRUFDSDtVQUNMLG9CQUFDLE9BQUQ7T0FBSyxXQUFVO2lCQUE2SDtNQUV2SSxFQUNDOztJQUNMO0lBR0wscUJBQUMsT0FBRDtLQUFLLFdBQVU7ZUFBZjtNQUVFLHFCQUFDLE9BQUQ7T0FBSyxXQUFVO2lCQUFmO1FBQ0UscUJBQUMsT0FBRDtTQUFLLFdBQVU7bUJBQWYsQ0FDRSxvQkFBQyxRQUFEO1VBQU0sV0FBVTtvQkFBcUQ7U0FBb0IsSUFDekYsb0JBQUMsUUFBRDtVQUFNLFdBQVU7b0JBQThDO1NBQWlCLEVBQzVFOztRQUNMLG9CQUFDLE9BQUQsRUFBSyxXQUFVLGlDQUFzQztRQUNyRCxxQkFBQyxPQUFEO1NBQUssV0FBVTttQkFBZixDQUNFLG9CQUFDLFFBQUQ7VUFBTSxXQUFVO29CQUFxRDtTQUFrQixJQUN2RixvQkFBQyxRQUFEO1VBQU0sV0FBVTtvQkFBK0M7U0FBVyxFQUN2RTs7T0FDRjs7TUFHTCxxQkFBQyxPQUFEO09BQUssV0FBVTtpQkFBZixDQUNFLG9CQUFDLFFBQUQsRUFBTSxXQUFVLDBEQUFnRSxJQUNoRixvQkFBQyxRQUFEO1FBQU0sV0FBVTtrQkFBOEM7T0FBZ0IsRUFDM0U7O01BR0wscUJBQUMsVUFBRDtPQUNFLE1BQUs7T0FDTCxXQUFVO09BQ1YsT0FBTTtPQUNOLGVBQWUsVUFBVSxnQkFBZ0IsbUNBQW1DLE1BQU07aUJBSnBGLENBTUUsb0JBQUMsUUFBRDtRQUFNLFdBQVU7a0JBQXdDO09BQW1CLElBQzNFLG9CQUFDLFFBQUQsRUFBTSxXQUFVLGdIQUFzSCxFQUNoSTs7TUFHUixxQkFBQyxPQUFEO09BQUssV0FBVTtpQkFBZixDQUNFLHFCQUFDLFVBQUQ7UUFDRSxNQUFLO1FBQ0wsZUFBZSxnQkFBZ0IsQ0FBQyxhQUFhLENBQUM7UUFDOUMsV0FBVTtrQkFIWjtTQUtFLG9CQUFDLE9BQUQ7VUFDRSxLQUFJO1VBQ0osV0FBVTtVQUNWLEtBQUs7U0FDTjtTQUNELHFCQUFDLE9BQUQ7VUFBSyxXQUFVO29CQUFmLENBQ0Usb0JBQUMsUUFBRDtXQUFNLFdBQVU7cUJBQTREO1VBQW1CLElBQy9GLG9CQUFDLFFBQUQ7V0FBTSxXQUFVO3FCQUF3QztVQUF3QixFQUM3RTs7U0FDTCxvQkFBQyxRQUFEO1VBQU0sV0FBVTtvQkFBaUY7U0FFM0Y7UUFDQTtpQkFFQSxhQUFhLElBQ2pCLHFCQUFDLE9BQUQ7UUFBSyxXQUFVO2tCQUFmO1NBQ0UscUJBQUMsT0FBRDtVQUFLLFdBQVU7b0JBQWYsQ0FDRSxvQkFBQyxLQUFEO1dBQUcsV0FBVTtxQkFBMEM7VUFBZ0IsSUFDdkUsb0JBQUMsS0FBRDtXQUFHLFdBQVU7cUJBQWlEO1VBRTNELEVBQ0E7O1NBQ0wscUJBQUMsVUFBRDtVQUNFLE1BQUs7VUFDTCxlQUFlLEtBQUssY0FBYyxzQkFBc0I7VUFDeEQsV0FBVTtvQkFIWixDQUtFLG9CQUFDLFFBQUQ7V0FBTSxXQUFVO3FCQUFxRDtVQUFxQixJQUFDLHdCQUVyRjs7U0FDUixxQkFBQyxVQUFEO1VBQ0UsTUFBSztVQUNMLGVBQWUsS0FBSyxjQUFjLGtCQUFrQjtVQUNwRCxXQUFVO29CQUhaLENBS0Usb0JBQUMsUUFBRDtXQUFNLFdBQVU7cUJBQXNEO1VBQW1CLElBQUMseUJBRXBGOztTQUNSLHFCQUFDLFVBQUQ7VUFDRSxNQUFLO1VBQ0wsZUFBZSxLQUFLLGNBQWMsZUFBZTtVQUNqRCxXQUFVO29CQUhaLENBS0Usb0JBQUMsUUFBRDtXQUFNLFdBQVU7cUJBQXdDO1VBQWdCLElBQUMsMkJBRW5FOztRQUNMO1lBQ0gsK0JBQUksRUFFUDs7S0FDRjs7R0FDRjs7Q0FDQztBQUVaO0FBR0EsT0FBTyxXQUFXLGNBQWMsaUJBQWlCLFFBQVEsOEJBQThCLFVBQVUsU0FBUzs7OztBQzdJMUcsd0JBQXdCLDhCQUE4QkEsY0FBWSJ9