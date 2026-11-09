import { signal, useRouter } from "@adaptive-js/web";
import { LOGO_URL } from "../../shared/omni-hub/mock-data.js";
import { showToast } from "../../shared/omni-hub/toast-store.js";
import { loginAction } from "../../shared/server-actions/auth.js";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
export function AuthScreen() {
	const router = useRouter();
	const [role, setRole] = signal("operator");
	const [email, setEmail] = signal("demo@example.com");
	const [password, setPassword] = signal("demo1234");
	const [showPassword, setShowPassword] = signal(false);
	const [rememberMe, setRememberMe] = signal(true);
	const [isLoading, setIsLoading] = signal(false);
	const [error, setError] = signal("");
	const goToApp = () => router.push("/");
	const handleSubmit = async (event) => {
		event.preventDefault();
		if (isLoading()) return;
		setError("");
		setIsLoading(true);
		showToast("Autenticando", "Validando credenciais na Cloud Engine da Rede...", "info");
		try {
			const response = await loginAction({
				email: email(),
				password: password()
			});
			if (!response.success) {
				setError(response.error || "Credenciais inválidas.");
				setIsLoading(false);
				return;
			}
			if (response.cookie) {
				document.cookie = response.cookie.header;
				document.cookie = `${response.cookie.name}=${encodeURIComponent(response.cookie.value)}; Path=/; SameSite=Lax`;
			}
			showToast("Bem-vindo!", "Sessão iniciada com sucesso.", "success");
			goToApp();
		} catch {
			setError("Erro de conexão ao tentar fazer login.");
			setIsLoading(false);
		}
	};
	return /* @__PURE__ */ _jsxs("div", {
		className: "min-h-screen w-full flex flex-col lg:flex-row bg-[#0f172a] text-[#f8fafc]",
		children: [/* @__PURE__ */ _jsxs("section", {
			className: "lg:w-[55%] relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden glass-panel-left border-r border-slate-800",
			children: [
				/* @__PURE__ */ _jsx("div", { className: "absolute inset-0 grid-pattern opacity-40 pointer-events-none" }),
				/* @__PURE__ */ _jsx("div", { className: "absolute -top-32 -left-32 w-96 h-96 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" }),
				/* @__PURE__ */ _jsx("div", { className: "absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" }),
				/* @__PURE__ */ _jsxs("div", {
					className: "relative z-10 flex items-center justify-between",
					children: [/* @__PURE__ */ _jsxs("button", {
						type: "button",
						onClick: () => router.push("/"),
						className: "flex items-center gap-3",
						title: "Voltar ao Painel Omni Hub",
						children: [
							/* @__PURE__ */ _jsx("img", {
								src: LOGO_URL,
								alt: "Logo Rede",
								className: "h-10 w-auto object-contain drop-shadow"
							}),
							/* @__PURE__ */ _jsx("span", {
								className: "font-headline-md text-white font-extrabold tracking-tight",
								children: "Rede"
							}),
							/* @__PURE__ */ _jsx("span", {
								className: "px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 font-label-sm font-semibold border border-sky-500/30",
								children: "Omni Hub"
							})
						]
					}), /* @__PURE__ */ _jsxs("span", {
						className: "hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] font-mono text-emerald-400",
						children: [/* @__PURE__ */ _jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }), "Cloud Engine v4.8 Operante"]
					})]
				}),
				/* @__PURE__ */ _jsxs("div", {
					className: "relative z-10 my-10 max-w-xl",
					children: [
						/* @__PURE__ */ _jsx("span", {
							className: "px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 font-label-sm font-bold border border-sky-500/20 inline-block mb-3",
							children: "Plataforma Unificada Corporativa"
						}),
						/* @__PURE__ */ _jsx("h2", {
							className: "font-headline-xl text-white font-extrabold tracking-tight leading-tight",
							children: "Orquestrador Inteligente de Atendimento, Cardápios ERP e Delivery."
						}),
						/* @__PURE__ */ _jsx("p", {
							className: "text-slate-300 font-body-md mt-4 leading-relaxed",
							children: "Centralize WhatsApp Cloud API, Instagram Direct e Telegram com sincronização bidirecional em tempo real ao Totvs Protheus e vitrines do iFood."
						}),
						/* @__PURE__ */ _jsxs("div", {
							className: "grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8",
							children: [
								/* @__PURE__ */ _jsxs("div", {
									className: "p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md",
									children: [
										/* @__PURE__ */ _jsx("span", {
											className: "text-[11px] text-slate-400 block",
											children: "iFood Jardins"
										}),
										/* @__PURE__ */ _jsx("strong", {
											className: "text-white font-headline-md block mt-0.5",
											children: "#8942-SP"
										}),
										/* @__PURE__ */ _jsxs("span", {
											className: "text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-1",
											children: [/* @__PURE__ */ _jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400" }), "Sincronizado 18ms"]
										})
									]
								}),
								/* @__PURE__ */ _jsxs("div", {
									className: "p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md",
									children: [
										/* @__PURE__ */ _jsx("span", {
											className: "text-[11px] text-slate-400 block",
											children: "Taxa de Entrega"
										}),
										/* @__PURE__ */ _jsx("strong", {
											className: "text-sky-400 font-headline-md block mt-0.5",
											children: "98.7%"
										}),
										/* @__PURE__ */ _jsx("span", {
											className: "text-[10px] text-slate-400 mt-1 block",
											children: "Meta WhatsApp Oficial"
										})
									]
								}),
								/* @__PURE__ */ _jsxs("div", {
									className: "p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md",
									children: [
										/* @__PURE__ */ _jsx("span", {
											className: "text-[11px] text-slate-400 block",
											children: "Copilot Omnichannel"
										}),
										/* @__PURE__ */ _jsx("strong", {
											className: "text-amber-400 font-headline-md block mt-0.5",
											children: "1.420"
										}),
										/* @__PURE__ */ _jsx("span", {
											className: "text-[10px] text-slate-400 mt-1 block",
											children: "msgs/min sob demanda"
										})
									]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ _jsxs("div", {
					className: "relative z-10 flex items-center justify-between text-[11px] text-slate-400 pt-6 border-t border-slate-800/80",
					children: [/* @__PURE__ */ _jsx("span", { children: "© 2024 Rede Omnichannel Tecnologia S.A." }), /* @__PURE__ */ _jsxs("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ _jsxs("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ _jsx("span", {
								className: "material-symbols-outlined text-[14px]",
								children: "lock"
							}), "Criptografia AES-256"]
						}), /* @__PURE__ */ _jsx("span", { children: "Meta Tech Provider" })]
					})]
				})
			]
		}), /* @__PURE__ */ _jsx("main", {
			className: "lg:w-[45%] flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-[#0b1120]",
			children: /* @__PURE__ */ _jsxs("div", {
				className: "w-full max-w-md flex flex-col gap-6",
				children: [
					/* @__PURE__ */ _jsxs("div", { children: [
						/* @__PURE__ */ _jsx("span", {
							className: "font-label-sm uppercase tracking-wider text-sky-400 font-bold",
							children: "Acesso Restrito"
						}),
						/* @__PURE__ */ _jsx("h1", {
							className: "font-headline-lg text-white font-extrabold mt-1",
							children: "Entrar no Hub Operacional"
						}),
						/* @__PURE__ */ _jsx("p", {
							className: "text-slate-400 font-body-sm mt-1",
							children: "Informe seu e-mail corporativo ou utilize o provedor de identidade da sua empresa."
						})
					] }),
					/* @__PURE__ */ _jsx("div", {
						className: "grid grid-cols-2 p-1 rounded-xl bg-slate-800/80 border border-slate-700",
						children: ["operator", "admin"].map((option) => {
							const isSelected = role() === option;
							return /* @__PURE__ */ _jsx("button", {
								type: "button",
								onClick: () => setRole(option),
								className: () => isSelected ? "py-2 rounded-lg font-title-md transition-all bg-sky-500 text-white font-bold shadow-md" : "py-2 rounded-lg font-title-md transition-all text-slate-400 hover:text-white",
								children: option === "operator" ? "Operador / Atendente" : "Administrador / Gestor"
							}, option);
						})
					}),
					/* @__PURE__ */ _jsx("div", { className: "flex flex-col gap-2.5" }),
					/* @__PURE__ */ _jsxs("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ _jsx("div", { className: "flex-1 h-px bg-slate-800" }),
							/* @__PURE__ */ _jsx("span", {
								className: "text-[11px] text-slate-400 uppercase tracking-wider font-semibold",
								children: "ou credenciais corporativas"
							}),
							/* @__PURE__ */ _jsx("div", { className: "flex-1 h-px bg-slate-800" })
						]
					}),
					() => error() ? /* @__PURE__ */ _jsx("div", {
						className: "rounded-xl border border-rose-500/40 bg-rose-500/15 p-3.5 text-sm font-medium text-rose-300",
						children: error()
					}) : /* @__PURE__ */ _jsx(_Fragment, { children: " " }),
					/* @__PURE__ */ _jsxs("form", {
						onSubmit: handleSubmit,
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ _jsxs("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ _jsx("label", {
									className: "font-label-md text-slate-300 font-semibold",
									children: "E-mail Corporativo"
								}), /* @__PURE__ */ _jsxs("div", {
									className: "flex items-center bg-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-700 focus-within:border-sky-500 transition-colors",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-slate-400 mr-2.5 text-[20px]",
										children: "mail"
									}), /* @__PURE__ */ _jsx("input", {
										type: "email",
										required: true,
										value: () => email(),
										onInput: (event) => setEmail(event.currentTarget.value),
										placeholder: "nome@suaempresa.com.br",
										className: "w-full bg-transparent border-none outline-none font-body-sm text-white placeholder:text-slate-500"
									})]
								})]
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ _jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ _jsx("label", {
										className: "font-label-md text-slate-300 font-semibold",
										children: "Senha"
									}), /* @__PURE__ */ _jsx("button", {
										type: "button",
										onClick: () => showToast("Recuperação de Senha", "Link de redefinição enviado para o e-mail cadastrado.", "info"),
										className: "text-[11px] text-sky-400 hover:underline",
										children: "Esqueceu a senha?"
									})]
								}), () => /* @__PURE__ */ _jsxs("div", {
									className: "flex items-center bg-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-700 focus-within:border-sky-500 transition-colors",
									children: [
										/* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-slate-400 mr-2.5 text-[20px]",
											children: "lock"
										}),
										/* @__PURE__ */ _jsx("input", {
											type: showPassword() ? "text" : "password",
											required: true,
											value: () => password(),
											onInput: (event) => setPassword(event.currentTarget.value),
											placeholder: "••••••••••••",
											className: "w-full bg-transparent border-none outline-none font-body-sm text-white placeholder:text-slate-500"
										}),
										/* @__PURE__ */ _jsx("button", {
											type: "button",
											onClick: () => setShowPassword((active) => !active),
											className: "text-slate-400 hover:text-white transition-colors",
											children: /* @__PURE__ */ _jsx("span", {
												className: "material-symbols-outlined text-[18px]",
												children: showPassword() ? "visibility_off" : "visibility"
											})
										})
									]
								})]
							}),
							/* @__PURE__ */ _jsx("div", {
								className: "flex items-center justify-between",
								children: /* @__PURE__ */ _jsxs("label", {
									className: "flex items-center gap-2 cursor-pointer text-slate-300 text-body-sm",
									children: [/* @__PURE__ */ _jsx("input", {
										type: "checkbox",
										checked: () => rememberMe(),
										onChange: (event) => setRememberMe(event.currentTarget.checked),
										className: "rounded bg-slate-900 border-slate-700 text-sky-500"
									}), /* @__PURE__ */ _jsx("span", { children: "Lembrar este dispositivo por 30 dias" })]
								})
							}),
							/* @__PURE__ */ _jsx("button", {
								type: "submit",
								disabled: () => isLoading(),
								className: "w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-headline-sm font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 mt-2 cursor-pointer",
								children: () => isLoading() ? /* @__PURE__ */ _jsxs(_Fragment, { children: [/* @__PURE__ */ _jsx("span", {
									className: "material-symbols-outlined text-[20px] animate-spin",
									children: "progress_activity"
								}), /* @__PURE__ */ _jsx("span", { children: "Iniciando Sessão..." })] }) : /* @__PURE__ */ _jsxs(_Fragment, { children: [/* @__PURE__ */ _jsx("span", { children: "Acessar Central de Atendimento" }), /* @__PURE__ */ _jsx("span", {
									className: "material-symbols-outlined text-[20px]",
									children: "arrow_forward"
								})] })
							})
						]
					}),
					/* @__PURE__ */ _jsxs("div", {
						className: "p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 text-[11px] flex items-center justify-between",
						children: [/* @__PURE__ */ _jsxs("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ _jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-400" }), "Todos os sistemas operacionais (99.98% SLA)"]
						}), /* @__PURE__ */ _jsx("span", {
							className: "font-mono text-slate-400",
							children: "Latência: 18ms"
						})]
					}),
					/* @__PURE__ */ _jsxs("button", {
						type: "button",
						onClick: () => router.push("/"),
						className: "flex items-center justify-center gap-1.5 text-[12px] text-slate-400 hover:text-white transition-colors",
						children: [/* @__PURE__ */ _jsx("span", {
							className: "material-symbols-outlined text-[16px]",
							children: "arrow_back"
						}), "Voltar ao Painel Omni Hub"]
					})
				]
			})
		})]
	});
}

//# sourceMappingURL=auth-screen.__client_ssr.js.map
