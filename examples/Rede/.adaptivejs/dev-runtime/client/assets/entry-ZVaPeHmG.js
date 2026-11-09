import { _ as jsx, b as __exportAll, c as signal, g as Fragment, n as hydrateClientComponents, r as useRouter, t as markClientExport, v as jsxs, y as callServerAction } from "./chunk-CME3klQt.js";
import { t as showToast } from "./chunk-BfKm4NCt.js";
import { r as LOGO_URL } from "./chunk-i84mfdyU.js";

//#region src/shared/server-actions/auth.ts
const loginAction = (...args) => callServerAction("shared/server-actions/auth", "loginAction", args);

//#endregion
//#region src/components/omni-hub/auth-screen.tsx
var auth_screen_exports = /* @__PURE__ */ __exportAll({ AuthScreen: () => AuthScreen });
function AuthScreen() {
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
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen w-full flex flex-col lg:flex-row bg-[#0f172a] text-[#f8fafc]",
		children: [/* @__PURE__ */ jsxs("section", {
			className: "lg:w-[55%] relative flex flex-col justify-between p-8 sm:p-12 lg:p-16 overflow-hidden glass-panel-left border-r border-slate-800",
			children: [
				/* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid-pattern opacity-40 pointer-events-none" }),
				/* @__PURE__ */ jsx("div", { className: "absolute -top-32 -left-32 w-96 h-96 rounded-full bg-sky-500/15 blur-3xl pointer-events-none" }),
				/* @__PURE__ */ jsx("div", { className: "absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" }),
				/* @__PURE__ */ jsxs("div", {
					className: "relative z-10 flex items-center justify-between",
					children: [/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => router.push("/"),
						className: "flex items-center gap-3",
						title: "Voltar ao Painel Omni Hub",
						children: [
							/* @__PURE__ */ jsx("img", {
								src: LOGO_URL,
								alt: "Logo Rede",
								className: "h-10 w-auto object-contain drop-shadow"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "font-headline-md text-white font-extrabold tracking-tight",
								children: "Rede"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 font-label-sm font-semibold border border-sky-500/30",
								children: "Omni Hub"
							})
						]
					}), /* @__PURE__ */ jsxs("span", {
						className: "hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] font-mono text-emerald-400",
						children: [/* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse" }), "Cloud Engine v4.8 Operante"]
					})]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "relative z-10 my-10 max-w-xl",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 font-label-sm font-bold border border-sky-500/20 inline-block mb-3",
							children: "Plataforma Unificada Corporativa"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "font-headline-xl text-white font-extrabold tracking-tight leading-tight",
							children: "Orquestrador Inteligente de Atendimento, Cardápios ERP e Delivery."
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-slate-300 font-body-md mt-4 leading-relaxed",
							children: "Centralize WhatsApp Cloud API, Instagram Direct e Telegram com sincronização bidirecional em tempo real ao Totvs Protheus e vitrines do iFood."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-[11px] text-slate-400 block",
											children: "iFood Jardins"
										}),
										/* @__PURE__ */ jsx("strong", {
											className: "text-white font-headline-md block mt-0.5",
											children: "#8942-SP"
										}),
										/* @__PURE__ */ jsxs("span", {
											className: "text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-1",
											children: [/* @__PURE__ */ jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-emerald-400" }), "Sincronizado 18ms"]
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-[11px] text-slate-400 block",
											children: "Taxa de Entrega"
										}),
										/* @__PURE__ */ jsx("strong", {
											className: "text-sky-400 font-headline-md block mt-0.5",
											children: "98.7%"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-[10px] text-slate-400 mt-1 block",
											children: "Meta WhatsApp Oficial"
										})
									]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 backdrop-blur-md",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "text-[11px] text-slate-400 block",
											children: "Copilot Omnichannel"
										}),
										/* @__PURE__ */ jsx("strong", {
											className: "text-amber-400 font-headline-md block mt-0.5",
											children: "1.420"
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-[10px] text-slate-400 mt-1 block",
											children: "msgs/min sob demanda"
										})
									]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "relative z-10 flex items-center justify-between text-[11px] text-slate-400 pt-6 border-t border-slate-800/80",
					children: [/* @__PURE__ */ jsx("span", { children: "© 2024 Rede Omnichannel Tecnologia S.A." }), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ jsx("span", {
								className: "material-symbols-outlined text-[14px]",
								children: "lock"
							}), "Criptografia AES-256"]
						}), /* @__PURE__ */ jsx("span", { children: "Meta Tech Provider" })]
					})]
				})
			]
		}), /* @__PURE__ */ jsx("main", {
			className: "lg:w-[45%] flex items-center justify-center p-6 sm:p-10 lg:p-12 bg-[#0b1120]",
			children: /* @__PURE__ */ jsxs("div", {
				className: "w-full max-w-md flex flex-col gap-6",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("span", {
							className: "font-label-sm uppercase tracking-wider text-sky-400 font-bold",
							children: "Acesso Restrito"
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "font-headline-lg text-white font-extrabold mt-1",
							children: "Entrar no Hub Operacional"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "text-slate-400 font-body-sm mt-1",
							children: "Informe seu e-mail corporativo ou utilize o provedor de identidade da sua empresa."
						})
					] }),
					/* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 p-1 rounded-xl bg-slate-800/80 border border-slate-700",
						children: ["operator", "admin"].map((option) => {
							const isSelected = role() === option;
							return /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setRole(option),
								className: () => isSelected ? "py-2 rounded-lg font-title-md transition-all bg-sky-500 text-white font-bold shadow-md" : "py-2 rounded-lg font-title-md transition-all text-slate-400 hover:text-white",
								children: option === "operator" ? "Operador / Atendente" : "Administrador / Gestor"
							}, option);
						})
					}),
					/* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2.5" }),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-slate-800" }),
							/* @__PURE__ */ jsx("span", {
								className: "text-[11px] text-slate-400 uppercase tracking-wider font-semibold",
								children: "ou credenciais corporativas"
							}),
							/* @__PURE__ */ jsx("div", { className: "flex-1 h-px bg-slate-800" })
						]
					}),
					() => error() ? /* @__PURE__ */ jsx("div", {
						className: "rounded-xl border border-rose-500/40 bg-rose-500/15 p-3.5 text-sm font-medium text-rose-300",
						children: error()
					}) : /* @__PURE__ */ jsx(Fragment, { children: " " }),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: handleSubmit,
						className: "flex flex-col gap-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ jsx("label", {
									className: "font-label-md text-slate-300 font-semibold",
									children: "E-mail Corporativo"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center bg-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-700 focus-within:border-sky-500 transition-colors",
									children: [/* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-slate-400 mr-2.5 text-[20px]",
										children: "mail"
									}), /* @__PURE__ */ jsx("input", {
										type: "email",
										required: true,
										value: () => email(),
										onInput: (event) => setEmail(event.currentTarget.value),
										placeholder: "nome@suaempresa.com.br",
										className: "w-full bg-transparent border-none outline-none font-body-sm text-white placeholder:text-slate-500"
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex flex-col gap-1.5",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("label", {
										className: "font-label-md text-slate-300 font-semibold",
										children: "Senha"
									}), /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => showToast("Recuperação de Senha", "Link de redefinição enviado para o e-mail cadastrado.", "info"),
										className: "text-[11px] text-sky-400 hover:underline",
										children: "Esqueceu a senha?"
									})]
								}), () => /* @__PURE__ */ jsxs("div", {
									className: "flex items-center bg-slate-900 rounded-xl px-3.5 py-2.5 border border-slate-700 focus-within:border-sky-500 transition-colors",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-slate-400 mr-2.5 text-[20px]",
											children: "lock"
										}),
										/* @__PURE__ */ jsx("input", {
											type: showPassword() ? "text" : "password",
											required: true,
											value: () => password(),
											onInput: (event) => setPassword(event.currentTarget.value),
											placeholder: "••••••••••••",
											className: "w-full bg-transparent border-none outline-none font-body-sm text-white placeholder:text-slate-500"
										}),
										/* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => setShowPassword((active) => !active),
											className: "text-slate-400 hover:text-white transition-colors",
											children: /* @__PURE__ */ jsx("span", {
												className: "material-symbols-outlined text-[18px]",
												children: showPassword() ? "visibility_off" : "visibility"
											})
										})
									]
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex items-center justify-between",
								children: /* @__PURE__ */ jsxs("label", {
									className: "flex items-center gap-2 cursor-pointer text-slate-300 text-body-sm",
									children: [/* @__PURE__ */ jsx("input", {
										type: "checkbox",
										checked: () => rememberMe(),
										onChange: (event) => setRememberMe(event.currentTarget.checked),
										className: "rounded bg-slate-900 border-slate-700 text-sky-500"
									}), /* @__PURE__ */ jsx("span", { children: "Lembrar este dispositivo por 30 dias" })]
								})
							}),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: () => isLoading(),
								className: "w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-headline-sm font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 mt-2 cursor-pointer",
								children: () => isLoading() ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
									className: "material-symbols-outlined text-[20px] animate-spin",
									children: "progress_activity"
								}), /* @__PURE__ */ jsx("span", { children: "Iniciando Sessão..." })] }) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", { children: "Acessar Central de Atendimento" }), /* @__PURE__ */ jsx("span", {
									className: "material-symbols-outlined text-[20px]",
									children: "arrow_forward"
								})] })
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-400 text-[11px] flex items-center justify-between",
						children: [/* @__PURE__ */ jsxs("span", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-emerald-400" }), "Todos os sistemas operacionais (99.98% SLA)"]
						}), /* @__PURE__ */ jsx("span", {
							className: "font-mono text-slate-400",
							children: "Latência: 18ms"
						})]
					}),
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => router.push("/"),
						className: "flex items-center justify-center gap-1.5 text-[12px] text-slate-400 hover:text-white transition-colors",
						children: [/* @__PURE__ */ jsx("span", {
							className: "material-symbols-outlined text-[16px]",
							children: "arrow_back"
						}), "Voltar ao Painel Omni Hub"]
					})
				]
			})
		})]
	});
}
typeof AuthScreen === "function" && markClientExport(AuthScreen, "components/omni-hub/auth-screen", "AuthScreen", "hydrate");

//#endregion
//#region .adaptive-temp/dev-runtime-1791414636097-r2w5sp/temp/client-components/components__omni-hub__auth-screen.tsx
hydrateClientComponents("components/omni-hub/auth-screen", auth_screen_exports);

//#endregion
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnktWlZhUGVIbUcuanMiLCJuYW1lcyI6WyJjbGllbnRNb2R1bGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2hhcmVkL3NlcnZlci1hY3Rpb25zL2F1dGgudHMiLCIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9vbW5pLWh1Yi9hdXRoLXNjcmVlbi50c3giLCIuLi8uLi90ZW1wL2NsaWVudC1jb21wb25lbnRzL2NvbXBvbmVudHNfX29tbmktaHViX19hdXRoLXNjcmVlbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY2FsbFNlcnZlckFjdGlvbiB9IGZyb20gXCJAYWRhcHRpdmUtanMvd2ViXCI7XG5leHBvcnQgY29uc3QgbG9naW5BY3Rpb24gPSAoLi4uYXJncykgPT4gY2FsbFNlcnZlckFjdGlvbihcInNoYXJlZC9zZXJ2ZXItYWN0aW9ucy9hdXRoXCIsIFwibG9naW5BY3Rpb25cIiwgYXJncyk7XG5leHBvcnQgY29uc3QgcmVnaXN0ZXJBY3Rpb24gPSAoLi4uYXJncykgPT4gY2FsbFNlcnZlckFjdGlvbihcInNoYXJlZC9zZXJ2ZXItYWN0aW9ucy9hdXRoXCIsIFwicmVnaXN0ZXJBY3Rpb25cIiwgYXJncyk7XG5leHBvcnQgY29uc3QgbG9nb3V0QWN0aW9uID0gKC4uLmFyZ3MpID0+IGNhbGxTZXJ2ZXJBY3Rpb24oXCJzaGFyZWQvc2VydmVyLWFjdGlvbnMvYXV0aFwiLCBcImxvZ291dEFjdGlvblwiLCBhcmdzKTsiLCJcImh5ZHJhdGVcIjtcblxuaW1wb3J0IHsgc2lnbmFsLCB1c2VSb3V0ZXIgfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3dlYlwiO1xuaW1wb3J0IHsgTE9HT19VUkwgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL29tbmktaHViL21vY2stZGF0YVwiO1xuaW1wb3J0IHsgc2hvd1RvYXN0IH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9vbW5pLWh1Yi90b2FzdC1zdG9yZVwiO1xuaW1wb3J0IHsgbG9naW5BY3Rpb24gfSBmcm9tIFwiLi4vLi4vc2hhcmVkL3NlcnZlci1hY3Rpb25zL2F1dGgudHNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIEF1dGhTY3JlZW4oKSB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCBbcm9sZSwgc2V0Um9sZV0gPSBzaWduYWw8XCJvcGVyYXRvclwiIHwgXCJhZG1pblwiPihcIm9wZXJhdG9yXCIpO1xuICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IHNpZ25hbChcImRlbW9AZXhhbXBsZS5jb21cIik7XG4gIGNvbnN0IFtwYXNzd29yZCwgc2V0UGFzc3dvcmRdID0gc2lnbmFsKFwiZGVtbzEyMzRcIik7XG4gIGNvbnN0IFtzaG93UGFzc3dvcmQsIHNldFNob3dQYXNzd29yZF0gPSBzaWduYWwoZmFsc2UpO1xuICBjb25zdCBbcmVtZW1iZXJNZSwgc2V0UmVtZW1iZXJNZV0gPSBzaWduYWwodHJ1ZSk7XG4gIGNvbnN0IFtpc0xvYWRpbmcsIHNldElzTG9hZGluZ10gPSBzaWduYWwoZmFsc2UpO1xuICBjb25zdCBbZXJyb3IsIHNldEVycm9yXSA9IHNpZ25hbChcIlwiKTtcblxuICBjb25zdCBnb1RvQXBwID0gKCkgPT4gcm91dGVyLnB1c2goXCIvXCIpO1xuXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChldmVudDogeyBwcmV2ZW50RGVmYXVsdDogKCkgPT4gdm9pZCB9KSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoaXNMb2FkaW5nKCkpIHJldHVybjtcbiAgICBzZXRFcnJvcihcIlwiKTtcbiAgICBzZXRJc0xvYWRpbmcodHJ1ZSk7XG4gICAgc2hvd1RvYXN0KFwiQXV0ZW50aWNhbmRvXCIsIFwiVmFsaWRhbmRvIGNyZWRlbmNpYWlzIG5hIENsb3VkIEVuZ2luZSBkYSBSZWRlLi4uXCIsIFwiaW5mb1wiKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGxvZ2luQWN0aW9uKHtcbiAgICAgICAgZW1haWw6IGVtYWlsKCksXG4gICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCgpLFxuICAgICAgfSk7XG5cbiAgICAgIGlmICghcmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICBzZXRFcnJvcihyZXNwb25zZS5lcnJvciB8fCBcIkNyZWRlbmNpYWlzIGludsOhbGlkYXMuXCIpO1xuICAgICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChyZXNwb25zZS5jb29raWUpIHtcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gcmVzcG9uc2UuY29va2llLmhlYWRlcjtcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gYCR7cmVzcG9uc2UuY29va2llLm5hbWV9PSR7ZW5jb2RlVVJJQ29tcG9uZW50KHJlc3BvbnNlLmNvb2tpZS52YWx1ZSl9OyBQYXRoPS87IFNhbWVTaXRlPUxheGA7XG4gICAgICB9XG5cbiAgICAgIHNob3dUb2FzdChcbiAgICAgICAgXCJCZW0tdmluZG8hXCIsXG4gICAgICAgIFwiU2Vzc8OjbyBpbmljaWFkYSBjb20gc3VjZXNzby5cIixcbiAgICAgICAgXCJzdWNjZXNzXCIsXG4gICAgICApO1xuICAgICAgZ29Ub0FwcCgpO1xuICAgIH0gY2F0Y2gge1xuICAgICAgc2V0RXJyb3IoXCJFcnJvIGRlIGNvbmV4w6NvIGFvIHRlbnRhciBmYXplciBsb2dpbi5cIik7XG4gICAgICBzZXRJc0xvYWRpbmcoZmFsc2UpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibWluLWgtc2NyZWVuIHctZnVsbCBmbGV4IGZsZXgtY29sIGxnOmZsZXgtcm93IGJnLVsjMGYxNzJhXSB0ZXh0LVsjZjhmYWZjXVwiPlxuICAgICAgey8qIENPTFVOQSBFU1FVRVJEQTogSEVSTyBDT1JQT1JBVElWTyAmIFRFTEVNRVRSSUEgQU8gVklWTyAqL31cbiAgICAgIDxzZWN0aW9uIGNsYXNzTmFtZT1cImxnOnctWzU1JV0gcmVsYXRpdmUgZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWJldHdlZW4gcC04IHNtOnAtMTIgbGc6cC0xNiBvdmVyZmxvdy1oaWRkZW4gZ2xhc3MtcGFuZWwtbGVmdCBib3JkZXItciBib3JkZXItc2xhdGUtODAwXCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBncmlkLXBhdHRlcm4gb3BhY2l0eS00MCBwb2ludGVyLWV2ZW50cy1ub25lXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgLXRvcC0zMiAtbGVmdC0zMiB3LTk2IGgtOTYgcm91bmRlZC1mdWxsIGJnLXNreS01MDAvMTUgYmx1ci0zeGwgcG9pbnRlci1ldmVudHMtbm9uZVwiPjwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImFic29sdXRlIC1ib3R0b20tMzIgLXJpZ2h0LTMyIHctOTYgaC05NiByb3VuZGVkLWZ1bGwgYmctYmx1ZS02MDAvMTUgYmx1ci0zeGwgcG9pbnRlci1ldmVudHMtbm9uZVwiPjwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgei0xMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHJvdXRlci5wdXNoKFwiL1wiKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCJcbiAgICAgICAgICAgIHRpdGxlPVwiVm9sdGFyIGFvIFBhaW5lbCBPbW5pIEh1YlwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGltZyBzcmM9e0xPR09fVVJMfSBhbHQ9XCJMb2dvIFJlZGVcIiBjbGFzc05hbWU9XCJoLTEwIHctYXV0byBvYmplY3QtY29udGFpbiBkcm9wLXNoYWRvd1wiIC8+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWhlYWRsaW5lLW1kIHRleHQtd2hpdGUgZm9udC1leHRyYWJvbGQgdHJhY2tpbmctdGlnaHRcIj5SZWRlPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMi41IHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctc2t5LTUwMC8yMCB0ZXh0LXNreS00MDAgZm9udC1sYWJlbC1zbSBmb250LXNlbWlib2xkIGJvcmRlciBib3JkZXItc2t5LTUwMC8zMFwiPlxuICAgICAgICAgICAgICBPbW5pIEh1YlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaGlkZGVuIHNtOmZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHB4LTMgcHktMSByb3VuZGVkLWZ1bGwgYmctc2xhdGUtODAwLzgwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwIHRleHQtWzExcHhdIGZvbnQtbW9ubyB0ZXh0LWVtZXJhbGQtNDAwXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTQwMCBhbmltYXRlLXB1bHNlXCI+PC9zcGFuPlxuICAgICAgICAgICAgQ2xvdWQgRW5naW5lIHY0LjggT3BlcmFudGVcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVsYXRpdmUgei0xMCBteS0xMCBtYXgtdy14bFwiPlxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTMgcHktMSByb3VuZGVkLWZ1bGwgYmctc2t5LTUwMC8xMCB0ZXh0LXNreS00MDAgZm9udC1sYWJlbC1zbSBmb250LWJvbGQgYm9yZGVyIGJvcmRlci1za3ktNTAwLzIwIGlubGluZS1ibG9jayBtYi0zXCI+XG4gICAgICAgICAgICBQbGF0YWZvcm1hIFVuaWZpY2FkYSBDb3Jwb3JhdGl2YVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8aDIgY2xhc3NOYW1lPVwiZm9udC1oZWFkbGluZS14bCB0ZXh0LXdoaXRlIGZvbnQtZXh0cmFib2xkIHRyYWNraW5nLXRpZ2h0IGxlYWRpbmctdGlnaHRcIj5cbiAgICAgICAgICAgIE9ycXVlc3RyYWRvciBJbnRlbGlnZW50ZSBkZSBBdGVuZGltZW50bywgQ2FyZMOhcGlvcyBFUlAgZSBEZWxpdmVyeS5cbiAgICAgICAgICA8L2gyPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtMzAwIGZvbnQtYm9keS1tZCBtdC00IGxlYWRpbmctcmVsYXhlZFwiPlxuICAgICAgICAgICAgQ2VudHJhbGl6ZSBXaGF0c0FwcCBDbG91ZCBBUEksIEluc3RhZ3JhbSBEaXJlY3QgZSBUZWxlZ3JhbSBjb20gc2luY3Jvbml6YcOnw6NvIGJpZGlyZWNpb25hbCBlbSB0ZW1wbyByZWFsIGFvXG4gICAgICAgICAgICBUb3R2cyBQcm90aGV1cyBlIHZpdHJpbmVzIGRvIGlGb29kLlxuICAgICAgICAgIDwvcD5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMyBnYXAtMyBtdC04XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMy41IHJvdW5kZWQteGwgYmctc2xhdGUtODAwLzYwIGJvcmRlciBib3JkZXItc2xhdGUtNzAwLzYwIGJhY2tkcm9wLWJsdXItbWRcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgYmxvY2tcIj5pRm9vZCBKYXJkaW5zPC9zcGFuPlxuICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtd2hpdGUgZm9udC1oZWFkbGluZS1tZCBibG9jayBtdC0wLjVcIj4jODk0Mi1TUDwvc3Ryb25nPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMHB4XSB0ZXh0LWVtZXJhbGQtNDAwIGZvbnQtc2VtaWJvbGQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEgbXQtMVwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInctMS41IGgtMS41IHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTQwMFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICBTaW5jcm9uaXphZG8gMThtc1xuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTgwMC82MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMC82MCBiYWNrZHJvcC1ibHVyLW1kXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGJsb2NrXCI+VGF4YSBkZSBFbnRyZWdhPC9zcGFuPlxuICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cInRleHQtc2t5LTQwMCBmb250LWhlYWRsaW5lLW1kIGJsb2NrIG10LTAuNVwiPjk4LjclPC9zdHJvbmc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIG10LTEgYmxvY2tcIj5NZXRhIFdoYXRzQXBwIE9maWNpYWw8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTMuNSByb3VuZGVkLXhsIGJnLXNsYXRlLTgwMC82MCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMC82MCBiYWNrZHJvcC1ibHVyLW1kXCI+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIGJsb2NrXCI+Q29waWxvdCBPbW5pY2hhbm5lbDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJ0ZXh0LWFtYmVyLTQwMCBmb250LWhlYWRsaW5lLW1kIGJsb2NrIG10LTAuNVwiPjEuNDIwPC9zdHJvbmc+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzEwcHhdIHRleHQtc2xhdGUtNDAwIG10LTEgYmxvY2tcIj5tc2dzL21pbiBzb2IgZGVtYW5kYTwvc3Bhbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHotMTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHRleHQtWzExcHhdIHRleHQtc2xhdGUtNDAwIHB0LTYgYm9yZGVyLXQgYm9yZGVyLXNsYXRlLTgwMC84MFwiPlxuICAgICAgICAgIDxzcGFuPsKpIDIwMjQgUmVkZSBPbW5pY2hhbm5lbCBUZWNub2xvZ2lhIFMuQS48L3NwYW4+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTFcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxNHB4XVwiPmxvY2s8L3NwYW4+XG4gICAgICAgICAgICAgIENyaXB0b2dyYWZpYSBBRVMtMjU2XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj5NZXRhIFRlY2ggUHJvdmlkZXI8L3NwYW4+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9zZWN0aW9uPlxuXG4gICAgICB7LyogQ09MVU5BIERJUkVJVEE6IEZPUk1VTMOBUklPIERFIExPR0lOIENPUlBPUkFUSVZPICovfVxuICAgICAgPG1haW4gY2xhc3NOYW1lPVwibGc6dy1bNDUlXSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBwLTYgc206cC0xMCBsZzpwLTEyIGJnLVsjMGIxMTIwXVwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBtYXgtdy1tZCBmbGV4IGZsZXgtY29sIGdhcC02XCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbGFiZWwtc20gdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIHRleHQtc2t5LTQwMCBmb250LWJvbGRcIj5BY2Vzc28gUmVzdHJpdG88L3NwYW4+XG4gICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiZm9udC1oZWFkbGluZS1sZyB0ZXh0LXdoaXRlIGZvbnQtZXh0cmFib2xkIG10LTFcIj5FbnRyYXIgbm8gSHViIE9wZXJhY2lvbmFsPC9oMT5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGZvbnQtYm9keS1zbSBtdC0xXCI+XG4gICAgICAgICAgICAgIEluZm9ybWUgc2V1IGUtbWFpbCBjb3Jwb3JhdGl2byBvdSB1dGlsaXplIG8gcHJvdmVkb3IgZGUgaWRlbnRpZGFkZSBkYSBzdWEgZW1wcmVzYS5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMiBwLTEgcm91bmRlZC14bCBiZy1zbGF0ZS04MDAvODAgYm9yZGVyIGJvcmRlci1zbGF0ZS03MDBcIj5cbiAgICAgICAgICAgIHsoW1wib3BlcmF0b3JcIiwgXCJhZG1pblwiXSBhcyBjb25zdCkubWFwKChvcHRpb24pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHJvbGUoKSA9PT0gb3B0aW9uO1xuICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIGtleT17b3B0aW9ufVxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRSb2xlKG9wdGlvbil9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eygpID0+XG4gICAgICAgICAgICAgICAgICAgIGlzU2VsZWN0ZWRcbiAgICAgICAgICAgICAgICAgICAgICA/IFwicHktMiByb3VuZGVkLWxnIGZvbnQtdGl0bGUtbWQgdHJhbnNpdGlvbi1hbGwgYmctc2t5LTUwMCB0ZXh0LXdoaXRlIGZvbnQtYm9sZCBzaGFkb3ctbWRcIlxuICAgICAgICAgICAgICAgICAgICAgIDogXCJweS0yIHJvdW5kZWQtbGcgZm9udC10aXRsZS1tZCB0cmFuc2l0aW9uLWFsbCB0ZXh0LXNsYXRlLTQwMCBob3Zlcjp0ZXh0LXdoaXRlXCJcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7b3B0aW9uID09PSBcIm9wZXJhdG9yXCIgPyBcIk9wZXJhZG9yIC8gQXRlbmRlbnRlXCIgOiBcIkFkbWluaXN0cmFkb3IgLyBHZXN0b3JcIn1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pfVxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0yLjVcIj5cbiAgICAgICAgICAgey8qIDxidXR0b25cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZVNzb0dvb2dsZX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eygpID0+IGlzTG9hZGluZygpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMi41IHB4LTQgcm91bmRlZC14bCBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtd2hpdGUgZm9udC10aXRsZS1tZCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMyB0cmFuc2l0aW9uLWNvbG9ycyBhY3RpdmU6c2NhbGUtOTUgZGlzYWJsZWQ6b3BhY2l0eS01MFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzdmcgY2xhc3NOYW1lPVwidy01IGgtNVwiIHZpZXdCb3g9XCIwIDAgMjQgMjRcIj5cbiAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgZmlsbD1cIiM0Mjg1RjRcIlxuICAgICAgICAgICAgICAgICAgZD1cIk0yMi41NiAxMi4yNWMwLS43OC0uMDctMS41My0uMi0yLjI1SDEydjQuMjZoNS45MmMtLjI2IDEuMzctMS4wNCAyLjUzLTIuMjEgMy4zMXYyLjc3aDMuNTdjMi4wOC0xLjkyIDMuMjgtNC43NCAzLjI4LTguMDl6XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICBmaWxsPVwiIzM0QTg1M1wiXG4gICAgICAgICAgICAgICAgICBkPVwiTTEyIDIzYzIuOTcgMCA1LjQ2LS45OCA3LjI4LTIuNjZsLTMuNTctMi43N2MtLjk4LjY2LTIuMjMgMS4wNi0zLjcxIDEuMDYtMi44NiAwLTUuMjktMS45My02LjE2LTQuNTNIMi4xOHYyLjg0QzMuOTkgMjAuNTMgNy43IDIzIDEyIDIzelwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8cGF0aFxuICAgICAgICAgICAgICAgICAgZmlsbD1cIiNGQkJDMDVcIlxuICAgICAgICAgICAgICAgICAgZD1cIk01Ljg0IDE0LjA5Yy0uMjItLjY2LS4zNS0xLjM2LS4zNS0yLjA5cy4xMy0xLjQzLjM1LTIuMDlWNy4wNkgyLjE4QzEuNDMgOC41NSAxIDEwLjIyIDEgMTJzLjQzIDMuNDUgMS4xOCA0Ljk0bDIuODUtMi4yMi44MS0uNjN6XCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICBmaWxsPVwiI0VBNDMzNVwiXG4gICAgICAgICAgICAgICAgICBkPVwiTTEyIDUuMzhjMS42MiAwIDMuMDYuNTYgNC4yMSAxLjY0bDMuMTUtMy4xNUMxNy40NSAyLjA5IDE0Ljk3IDEgMTIgMSA3LjcgMSAzLjk5IDMuNDcgMi4xOCA3LjA2bDMuNjYgMi44NGMuODctMi42IDMuMy00LjUyIDYuMTYtNC41MnpcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICA8c3Bhbj5FbnRyYXIgY29tIEdvb2dsZSBXb3Jrc3BhY2U8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj4qL31cblxuICAgICAgICB7LyogICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU3NvTWV0YX1cbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eygpID0+IGlzTG9hZGluZygpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMi41IHB4LTQgcm91bmRlZC14bCBiZy1zbGF0ZS04MDAgaG92ZXI6Ymctc2xhdGUtNzAwIHRleHQtd2hpdGUgZm9udC10aXRsZS1tZCBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMyB0cmFuc2l0aW9uLWNvbG9ycyBhY3RpdmU6c2NhbGUtOTUgZGlzYWJsZWQ6b3BhY2l0eS01MFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMjBweF0gdGV4dC1za3ktNDAwXCI+YWxsX2luY2x1c2l2ZTwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4+Q29udGludWFyIGNvbSBNZXRhIEJ1c2luZXNzIElEPC9zcGFuPlxuICAgICAgICAgICAgPC9idXR0b24+Ki99XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBoLXB4IGJnLXNsYXRlLTgwMFwiPjwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gdGV4dC1zbGF0ZS00MDAgdXBwZXJjYXNlIHRyYWNraW5nLXdpZGVyIGZvbnQtc2VtaWJvbGRcIj5cbiAgICAgICAgICAgICAgb3UgY3JlZGVuY2lhaXMgY29ycG9yYXRpdmFzXG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgtMSBoLXB4IGJnLXNsYXRlLTgwMFwiPjwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgeygpID0+XG4gICAgICAgICAgICBlcnJvcigpID8gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvdW5kZWQteGwgYm9yZGVyIGJvcmRlci1yb3NlLTUwMC80MCBiZy1yb3NlLTUwMC8xNSBwLTMuNSB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtcm9zZS0zMDBcIj5cbiAgICAgICAgICAgICAgICB7ZXJyb3IoKX1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApIDogKDw+IDwvPilcbiAgICAgICAgICB9XG5cbiAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17aGFuZGxlU3VibWl0fSBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9udC1sYWJlbC1tZCB0ZXh0LXNsYXRlLTMwMCBmb250LXNlbWlib2xkXCI+RS1tYWlsIENvcnBvcmF0aXZvPC9sYWJlbD5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBiZy1zbGF0ZS05MDAgcm91bmRlZC14bCBweC0zLjUgcHktMi41IGJvcmRlciBib3JkZXItc2xhdGUtNzAwIGZvY3VzLXdpdGhpbjpib3JkZXItc2t5LTUwMCB0cmFuc2l0aW9uLWNvbG9yc1wiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1zbGF0ZS00MDAgbXItMi41IHRleHQtWzIwcHhdXCI+bWFpbDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJlbWFpbFwiXG4gICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgdmFsdWU9eygpID0+IGVtYWlsKCl9XG4gICAgICAgICAgICAgICAgICBvbklucHV0PXsoZXZlbnQpID0+IHNldEVtYWlsKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCJub21lQHN1YWVtcHJlc2EuY29tLmJyXCJcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBiZy10cmFuc3BhcmVudCBib3JkZXItbm9uZSBvdXRsaW5lLW5vbmUgZm9udC1ib2R5LXNtIHRleHQtd2hpdGUgcGxhY2Vob2xkZXI6dGV4dC1zbGF0ZS01MDBcIlxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMS41XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvbnQtbGFiZWwtbWQgdGV4dC1zbGF0ZS0zMDAgZm9udC1zZW1pYm9sZFwiPlNlbmhhPC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNob3dUb2FzdChcIlJlY3VwZXJhw6fDo28gZGUgU2VuaGFcIiwgXCJMaW5rIGRlIHJlZGVmaW5pw6fDo28gZW52aWFkbyBwYXJhIG8gZS1tYWlsIGNhZGFzdHJhZG8uXCIsIFwiaW5mb1wiKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtc2t5LTQwMCBob3Zlcjp1bmRlcmxpbmVcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIEVzcXVlY2V1IGEgc2VuaGE/XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICB7KCkgPT4gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgYmctc2xhdGUtOTAwIHJvdW5kZWQteGwgcHgtMy41IHB5LTIuNSBib3JkZXIgYm9yZGVyLXNsYXRlLTcwMCBmb2N1cy13aXRoaW46Ym9yZGVyLXNreS01MDAgdHJhbnNpdGlvbi1jb2xvcnNcIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1zbGF0ZS00MDAgbXItMi41IHRleHQtWzIwcHhdXCI+bG9jazwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPXtzaG93UGFzc3dvcmQoKSA/IFwidGV4dFwiIDogXCJwYXNzd29yZFwifVxuICAgICAgICAgICAgICAgICAgICByZXF1aXJlZFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17KCkgPT4gcGFzc3dvcmQoKX1cbiAgICAgICAgICAgICAgICAgICAgb25JbnB1dD17KGV2ZW50KSA9PiBzZXRQYXNzd29yZChldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9XCLigKLigKLigKLigKLigKLigKLigKLigKLigKLigKLigKLigKJcIlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctdHJhbnNwYXJlbnQgYm9yZGVyLW5vbmUgb3V0bGluZS1ub25lIGZvbnQtYm9keS1zbSB0ZXh0LXdoaXRlIHBsYWNlaG9sZGVyOnRleHQtc2xhdGUtNTAwXCJcbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRTaG93UGFzc3dvcmQoKGFjdGl2ZSkgPT4gIWFjdGl2ZSl9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzE4cHhdXCI+XG4gICAgICAgICAgICAgICAgICAgICAge3Nob3dQYXNzd29yZCgpID8gXCJ2aXNpYmlsaXR5X29mZlwiIDogXCJ2aXNpYmlsaXR5XCJ9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBjdXJzb3ItcG9pbnRlciB0ZXh0LXNsYXRlLTMwMCB0ZXh0LWJvZHktc21cIj5cbiAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICBjaGVja2VkPXsoKSA9PiByZW1lbWJlck1lKCl9XG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRSZW1lbWJlck1lKGV2ZW50LmN1cnJlbnRUYXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJyb3VuZGVkIGJnLXNsYXRlLTkwMCBib3JkZXItc2xhdGUtNzAwIHRleHQtc2t5LTUwMFwiXG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8c3Bhbj5MZW1icmFyIGVzdGUgZGlzcG9zaXRpdm8gcG9yIDMwIGRpYXM8L3NwYW4+XG4gICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgZGlzYWJsZWQ9eygpID0+IGlzTG9hZGluZygpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMyBweC00IHJvdW5kZWQteGwgYmctc2t5LTUwMCBob3ZlcjpiZy1za3ktNDAwIHRleHQtd2hpdGUgZm9udC1oZWFkbGluZS1zbSBmb250LWJvbGQgc2hhZG93LWxnIHRyYW5zaXRpb24tYWxsIGFjdGl2ZTpzY2FsZS05NSBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMiBkaXNhYmxlZDpvcGFjaXR5LTUwIG10LTIgY3Vyc29yLXBvaW50ZXJcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7KCkgPT5cbiAgICAgICAgICAgICAgICBpc0xvYWRpbmcoKSA/IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMjBweF0gYW5pbWF0ZS1zcGluXCI+cHJvZ3Jlc3NfYWN0aXZpdHk8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkluaWNpYW5kbyBTZXNzw6NvLi4uPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgIDw+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPkFjZXNzYXIgQ2VudHJhbCBkZSBBdGVuZGltZW50bzwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsyMHB4XVwiPmFycm93X2ZvcndhcmQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZm9ybT5cblxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zLjUgcm91bmRlZC14bCBiZy1zbGF0ZS05MDAvOTAgYm9yZGVyIGJvcmRlci1zbGF0ZS04MDAgdGV4dC1zbGF0ZS00MDAgdGV4dC1bMTFweF0gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1lbWVyYWxkLTQwMFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgVG9kb3Mgb3Mgc2lzdGVtYXMgb3BlcmFjaW9uYWlzICg5OS45OCUgU0xBKVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1tb25vIHRleHQtc2xhdGUtNDAwXCI+TGF0w6puY2lhOiAxOG1zPC9zcGFuPlxuICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiByb3V0ZXIucHVzaChcIi9cIil9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlciBnYXAtMS41IHRleHQtWzEycHhdIHRleHQtc2xhdGUtNDAwIGhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMTZweF1cIj5hcnJvd19iYWNrPC9zcGFuPlxuICAgICAgICAgICAgVm9sdGFyIGFvIFBhaW5lbCBPbW5pIEh1YlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvbWFpbj5cbiAgICA8L2Rpdj5cbiAgKTtcbn0iLCJcbmltcG9ydCAqIGFzIGNsaWVudE1vZHVsZSBmcm9tIFwiLi4vLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvb21uaS1odWIvYXV0aC1zY3JlZW4udHN4XCI7XG5pbXBvcnQgeyBoeWRyYXRlQ2xpZW50Q29tcG9uZW50cyB9IGZyb20gXCJAYWRhcHRpdmUtanMvd2ViXCI7XG5cbmh5ZHJhdGVDbGllbnRDb21wb25lbnRzKFwiY29tcG9uZW50cy9vbW5pLWh1Yi9hdXRoLXNjcmVlblwiLCBjbGllbnRNb2R1bGUpO1xuZXhwb3J0IHt9O1xuIl0sIm1hcHBpbmdzIjoiOzs7OztBQUNBLE1BQWEsZUFBZSxHQUFHLFNBQVMsaUJBQWlCLDhCQUE4QixlQUFlLElBQUk7Ozs7O0FDSTFHLFNBQWdCLGFBQWE7Q0FDM0IsTUFBTSxTQUFTLFVBQVU7Q0FDekIsTUFBTSxDQUFDLE1BQU0sV0FBVyxPQUE2QixVQUFVO0NBQy9ELE1BQU0sQ0FBQyxPQUFP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