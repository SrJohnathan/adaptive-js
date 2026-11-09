import { signal, useRouter } from "@adaptive-js/web";
import { LOGO_URL, USER_AVATAR } from "../../shared/omni-hub/mock-data.js";
import { SCREEN_ROUTES } from "../../shared/omni-hub/types.js";
import { openPalette } from "../../shared/omni-hub/palette-store.js";
import { showToast } from "../../shared/omni-hub/toast-store.js";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "@adaptive-js/web/jsx-runtime";
export function Header() {
	const router = useRouter();
	const [userMenuOpen, setUserMenuOpen] = signal(false);
	const goTo = (path) => {
		setUserMenuOpen(false);
		router.push(path);
	};
	return /* @__PURE__ */ _jsx("header", {
		className: "fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-outline-variant/20",
		children: /* @__PURE__ */ _jsxs("div", {
			className: "h-16 w-full px-4 sm:px-6 flex items-center justify-between gap-4",
			children: [
				/* @__PURE__ */ _jsxs("div", {
					onClick: () => goTo(SCREEN_ROUTES["catalogo-erp"]),
					className: "flex items-center gap-2 sm:gap-3 min-w-[180px] cursor-pointer hover:opacity-95 transition-opacity",
					children: [
						/* @__PURE__ */ _jsx("img", {
							alt: "Logo Rede Omnichannel",
							className: "h-8 w-auto object-contain",
							src: LOGO_URL
						}),
						/* @__PURE__ */ _jsx("span", {
							className: "font-headline-md tracking-tight text-primary font-bold",
							children: "Rede"
						}),
						/* @__PURE__ */ _jsx("span", {
							className: "hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm uppercase tracking-wider font-semibold",
							children: "Omni Hub"
						})
					]
				}),
				/* @__PURE__ */ _jsx("div", {
					className: "flex-1 max-w-xl hidden md:flex items-center",
					children: /* @__PURE__ */ _jsxs("button", {
						type: "button",
						onClick: openPalette,
						className: "w-full flex items-center justify-between bg-surface-container-low hover:bg-surface-container rounded-xl px-3.5 py-1.5 shadow-inner transition-colors text-left",
						children: [/* @__PURE__ */ _jsxs("div", {
							className: "flex items-center gap-2 text-on-surface-variant",
							children: [/* @__PURE__ */ _jsx("span", {
								className: "material-symbols-outlined text-[20px]",
								children: "search"
							}), /* @__PURE__ */ _jsx("span", {
								className: "font-body-sm text-on-surface-variant/70",
								children: "Pesquisar contatos, protocolos, mensagens..."
							})]
						}), /* @__PURE__ */ _jsx("kbd", {
							className: "hidden lg:inline-block font-code-sm px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-medium",
							children: "Ctrl K"
						})]
					})
				}),
				/* @__PURE__ */ _jsxs("div", {
					className: "flex items-center gap-3 sm:gap-4 ml-auto",
					children: [
						/* @__PURE__ */ _jsxs("div", {
							className: "hidden xl:flex items-center gap-4 px-3 py-1 rounded-xl bg-surface-container-low border border-outline-variant/20",
							children: [
								/* @__PURE__ */ _jsxs("div", {
									className: "flex flex-col text-left",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "font-label-sm text-on-surface-variant leading-none",
										children: "Campanhas Hoje"
									}), /* @__PURE__ */ _jsx("span", {
										className: "font-title-md text-primary font-bold mt-0.5",
										children: "14 disparos"
									})]
								}),
								/* @__PURE__ */ _jsx("div", { className: "w-px h-6 bg-outline-variant/40" }),
								/* @__PURE__ */ _jsxs("div", {
									className: "flex flex-col text-left",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "font-label-sm text-on-surface-variant leading-none",
										children: "Taxa Entrega"
									}), /* @__PURE__ */ _jsx("span", {
										className: "font-title-md text-tertiary font-bold mt-0.5",
										children: "98.7%"
									})]
								})
							]
						}),
						/* @__PURE__ */ _jsxs("div", {
							className: "hidden sm:flex items-center gap-1.5 bg-surface-container-low px-2.5 py-1 rounded-full border border-outline-variant/20",
							children: [/* @__PURE__ */ _jsx("span", { className: "w-2 h-2 rounded-full bg-primary-container animate-pulse" }), /* @__PURE__ */ _jsx("span", {
								className: "font-label-sm text-on-surface font-semibold",
								children: "Disponível"
							})]
						}),
						/* @__PURE__ */ _jsxs("button", {
							type: "button",
							className: "relative p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors",
							title: "Notificações da Operação",
							onClick: () => showToast("Notificações", "Nenhum alerta novo na operação.", "info"),
							children: [/* @__PURE__ */ _jsx("span", {
								className: "material-symbols-outlined text-[22px]",
								children: "notifications"
							}), /* @__PURE__ */ _jsx("span", { className: "absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-primary-container ring-2 ring-surface-container-lowest" })]
						}),
						/* @__PURE__ */ _jsxs("div", {
							className: "relative",
							children: [/* @__PURE__ */ _jsxs("button", {
								type: "button",
								onClick: () => setUserMenuOpen(!userMenuOpen()),
								className: "flex items-center gap-2.5 pl-1 p-1 rounded-xl hover:bg-surface-container-low transition-colors",
								children: [
									/* @__PURE__ */ _jsx("img", {
										alt: "Mariana Silva",
										className: "w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant",
										src: USER_AVATAR
									}),
									/* @__PURE__ */ _jsxs("div", {
										className: "hidden md:flex flex-col text-left",
										children: [/* @__PURE__ */ _jsx("span", {
											className: "font-title-md text-on-surface leading-tight font-semibold",
											children: "Mariana Silva"
										}), /* @__PURE__ */ _jsx("span", {
											className: "font-label-sm text-on-surface-variant",
											children: "Atendimento Sênior"
										})]
									}),
									/* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[16px] text-on-surface-variant hidden md:inline",
										children: "expand_more"
									})
								]
							}), () => userMenuOpen() ? /* @__PURE__ */ _jsxs("div", {
								className: "absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 py-2 z-50 animate-in fade-in",
								children: [
									/* @__PURE__ */ _jsxs("div", {
										className: "px-3 py-2 border-b border-outline-variant/20",
										children: [/* @__PURE__ */ _jsx("p", {
											className: "font-title-md text-on-surface font-bold",
											children: "Mariana Silva"
										}), /* @__PURE__ */ _jsx("p", {
											className: "font-label-sm text-on-surface-variant truncate",
											children: "mariana.silva@redehub.com.br"
										})]
									}),
									/* @__PURE__ */ _jsxs("button", {
										type: "button",
										onClick: () => goTo(SCREEN_ROUTES["configuracoes-conta"]),
										className: "w-full px-3 py-2 text-left font-body-sm text-on-surface hover:bg-surface-container-high flex items-center gap-2",
										children: [/* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[18px] text-primary",
											children: "manage_accounts"
										}), "Configurações de Conta"]
									}),
									/* @__PURE__ */ _jsxs("button", {
										type: "button",
										onClick: () => goTo(SCREEN_ROUTES["estudio-banners"]),
										className: "w-full px-3 py-2 text-left font-body-sm text-on-surface hover:bg-surface-container-high flex items-center gap-2",
										children: [/* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[18px] text-tertiary",
											children: "photo_library"
										}), "Estúdio de Banners & IA"]
									}),
									/* @__PURE__ */ _jsxs("button", {
										type: "button",
										onClick: () => goTo(SCREEN_ROUTES["autenticacao"]),
										className: "w-full px-3 py-2 text-left font-body-sm text-primary hover:bg-surface-container-high flex items-center gap-2 border-t border-outline-variant/20",
										children: [/* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[18px]",
											children: "lock_reset"
										}), "Tela de Login Corporativo"]
									})
								]
							}) : /* @__PURE__ */ _jsx(_Fragment, {})]
						})
					]
				})
			]
		})
	});
}

//# sourceMappingURL=header.__client_ssr.js.map
