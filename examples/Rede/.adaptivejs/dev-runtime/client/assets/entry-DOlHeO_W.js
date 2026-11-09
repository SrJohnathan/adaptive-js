import { _ as jsx, b as __exportAll, c as signal, n as hydrateClientComponents, r as useRouter, t as markClientExport, v as jsxs } from "./chunk-CME3klQt.js";
import { t as Reveal } from "./chunk-DCCs5luT.js";
import { t as showToast } from "./chunk-BfKm4NCt.js";
import { a as MAP_IMAGE_URL, s as USER_AVATAR } from "./chunk-i84mfdyU.js";
import { t as SCREEN_ROUTES } from "./chunk-BAJW75ro.js";

//#region src/components/omni-hub/account-screen.tsx
var account_screen_exports = /* @__PURE__ */ __exportAll({ AccountScreen: () => AccountScreen });
const ACCOUNT_TABS = [
	{
		id: "profile",
		label: "Dados do Perfil & Contato",
		icon: "person"
	},
	{
		id: "address",
		label: "Endereço & Sede Fiscal",
		icon: "location_on"
	},
	{
		id: "billing",
		label: "Planos & Faturamento",
		icon: "credit_card"
	},
	{
		id: "security",
		label: "Segurança & Sessões",
		icon: "shield"
	},
	{
		id: "danger",
		label: "Zona Crítica",
		icon: "warning",
		isDanger: true
	}
];
const INVOICE_ITEMS = [
	{
		ref: "Outubro / 2024",
		val: "R$ 1.490,00",
		status: "Pago",
		nf: "NF-e #8841",
		date: "05/10/2024"
	},
	{
		ref: "Setembro / 2024",
		val: "R$ 1.490,00",
		status: "Pago",
		nf: "NF-e #8210",
		date: "05/09/2024"
	},
	{
		ref: "Agosto / 2024",
		val: "R$ 1.490,00",
		status: "Pago",
		nf: "NF-e #7644",
		date: "05/08/2024"
	}
];
function AccountScreen() {
	const router = useRouter();
	const [activeTab, setActiveTab] = signal("profile");
	const [fullName, setFullName] = signal("Mariana Silva");
	const [jobTitle, setJobTitle] = signal("Atendimento & Operações Sênior");
	const [email, setEmail] = signal("mariana.silva@redehub.com.br");
	const [phone2fa, setPhone2fa] = signal("+55 (11) 98821-4432");
	const [timezone, setTimezone] = signal("America/Sao_Paulo (GMT-3)");
	const [language, setLanguage] = signal("Português (Brasil)");
	const [cnpj, setCnpj] = signal("42.189.330/0001-44");
	const [razaoSocial, setRazaoSocial] = signal("REDE OMNICHANNEL TECNOLOGIA EM ALIMENTOS LTDA");
	const [cep, setCep] = signal("01419-001");
	const [street, setStreet] = signal("Alameda Santos");
	const [number, setNumber] = signal("1827");
	const [complement, setComplement] = signal("12º Andar - Conjunto 1204");
	const [neighborhood, setNeighborhood] = signal("Cerqueira César");
	const [city, setCity] = signal("São Paulo");
	const [state, setState] = signal("SP");
	const [showDeleteModal, setShowDeleteModal] = signal(false);
	const [deleteConfirmationText, setDeleteConfirmationText] = signal("");
	const handleLookupCep = () => {
		showToast("Buscando CEP", "Consultando base dos Correios e Receita Federal...", "info");
		setTimeout(() => {
			setStreet("Alameda Santos");
			setNeighborhood("Cerqueira César");
			setCity("São Paulo");
			setState("SP");
			showToast("CEP Localizado", "Alameda Santos, Cerqueira César - São Paulo/SP.");
		}, 600);
	};
	const handleDeleteAccount = () => {
		if (deleteConfirmationText().trim() === "EXCLUIR CONTA REDE") {
			setShowDeleteModal(false);
			showToast("Conta Encerrada", "Solicitação de exclusão processada com sucesso.", "warning");
			router.push(SCREEN_ROUTES["autenticacao"]);
		} else showToast("Erro de Validação", "Digite exatamente \"EXCLUIR CONTA REDE\" para confirmar.", "error");
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1440px] mx-auto",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ jsx("div", {
						className: "w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-on-primary shadow-md",
						children: /* @__PURE__ */ jsx("span", {
							className: "material-symbols-outlined text-[32px]",
							children: "domain"
						})
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx("h1", {
							className: "font-headline-lg text-on-surface font-bold",
							children: "Rede Jardins Paulista"
						}), /* @__PURE__ */ jsx("span", {
							className: "px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm font-bold",
							children: "Enterprise Ativo"
						})]
					}), /* @__PURE__ */ jsx("p", {
						className: "text-on-surface-variant font-body-sm mt-0.5",
						children: "Workspace ID #8921 • 12 Operadores Ativos • Totvs Protheus & iFood Conectados"
					})] })]
				}), /* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => router.push(SCREEN_ROUTES["catalogo-erp"]),
						className: "px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md transition-all flex items-center gap-1.5",
						children: [/* @__PURE__ */ jsx("span", {
							className: "material-symbols-outlined text-[18px]",
							children: "sync_alt"
						}), /* @__PURE__ */ jsx("span", { children: "Ver Integrações ERP" })]
					}), /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => router.push(SCREEN_ROUTES["autenticacao"]),
						className: "px-3.5 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-title-md transition-all flex items-center gap-1.5 border border-outline-variant/20",
						children: [/* @__PURE__ */ jsx("span", {
							className: "material-symbols-outlined text-[18px]",
							children: "lock"
						}), /* @__PURE__ */ jsx("span", { children: "Trocar Usuário" })]
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "flex border-b border-outline-variant/20 overflow-x-auto text-nowrap scrollbar-none gap-2",
				children: ACCOUNT_TABS.map((tab) => /* @__PURE__ */ jsxs("button", {
					type: "button",
					onClick: () => setActiveTab(tab.id),
					className: () => activeTab() === tab.id ? tab.isDanger ? "pb-3 px-4 flex items-center gap-2 font-title-md border-b-2 transition-all border-error text-error font-bold" : "pb-3 px-4 flex items-center gap-2 font-title-md border-b-2 transition-all border-primary text-primary font-bold" : "pb-3 px-4 flex items-center gap-2 font-title-md border-b-2 transition-all border-transparent text-on-surface-variant hover:text-on-surface",
					children: [/* @__PURE__ */ jsx("span", {
						className: () => `material-symbols-outlined text-[20px] ${activeTab() === tab.id ? tab.isDanger ? "text-error" : "text-primary" : "text-on-surface-variant"}`,
						children: tab.icon
					}), /* @__PURE__ */ jsx("span", { children: tab.label })]
				}, tab.id))
			}),
			/* @__PURE__ */ jsx(Reveal, {
				when: () => activeTab() === "profile",
				children: /* @__PURE__ */ jsx(Reveal.If, { children: /* @__PURE__ */ jsxs("form", {
					onSubmit: (event) => {
						event.preventDefault();
						showToast("Perfil Atualizado", "As informações pessoais e de contato foram salvas.", "success");
					},
					className: "grid grid-cols-1 lg:grid-cols-3 gap-6 items-start",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col items-center text-center gap-3",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "relative group cursor-pointer",
								children: [/* @__PURE__ */ jsx("img", {
									src: USER_AVATAR,
									alt: "Mariana Silva",
									className: "w-28 h-28 rounded-full object-cover ring-4 ring-primary/20 shadow-md"
								}), /* @__PURE__ */ jsx("div", {
									onClick: () => showToast("Foto de Perfil", "Selecione uma imagem JPG ou PNG de até 5MB.", "info"),
									className: "absolute inset-0 rounded-full bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity",
									children: /* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[24px]",
										children: "photo_camera"
									})
								})]
							}),
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsx("h3", {
									className: "font-headline-sm text-on-surface font-bold",
									children: "Mariana Silva"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "font-body-sm text-on-surface-variant",
									children: "Atendimento & Operações Sênior"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "mt-2 flex items-center justify-center gap-1.5",
									children: [/* @__PURE__ */ jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }), /* @__PURE__ */ jsx("span", {
										className: "font-label-sm text-tertiary font-semibold",
										children: "Conta Verificada Meta"
									})]
								})
							] }),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => showToast("Alterar Foto", "Upload de imagem concluído com sucesso!"),
								className: "w-full mt-2 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-md transition-colors border border-outline-variant/20",
								children: "Alterar Foto de Perfil"
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-2 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-4",
						children: [
							/* @__PURE__ */ jsx("h3", {
								className: "font-headline-md text-on-surface font-bold",
								children: "Informações do Operador"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "Nome Completo"
										}), /* @__PURE__ */ jsx("input", {
											type: "text",
											value: () => fullName(),
											onInput: (event) => setFullName(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none focus:ring-2 focus:ring-primary/20"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "Cargo na Operação"
										}), /* @__PURE__ */ jsx("input", {
											type: "text",
											value: () => jobTitle(),
											onInput: (event) => setJobTitle(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none focus:ring-2 focus:ring-primary/20"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "E-mail Corporativo"
										}), /* @__PURE__ */ jsx("input", {
											type: "email",
											value: () => email(),
											onInput: (event) => setEmail(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none focus:ring-2 focus:ring-primary/20"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "WhatsApp de Segurança 2FA"
										}), /* @__PURE__ */ jsx("input", {
											type: "text",
											value: () => phone2fa(),
											onInput: (event) => setPhone2fa(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none focus:ring-2 focus:ring-primary/20"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "Fuso Horário"
										}), /* @__PURE__ */ jsxs("select", {
											value: () => timezone(),
											onChange: (event) => setTimezone(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none focus:ring-2 focus:ring-primary/20",
											children: [
												/* @__PURE__ */ jsx("option", {
													value: "America/Sao_Paulo (GMT-3)",
													children: "America/Sao_Paulo (GMT-3)"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "America/Manaus (GMT-4)",
													children: "America/Manaus (GMT-4)"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "America/Belem (GMT-3)",
													children: "America/Belem (GMT-3)"
												})
											]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "Idioma da Interface"
										}), /* @__PURE__ */ jsxs("select", {
											value: () => language(),
											onChange: (event) => setLanguage(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none focus:ring-2 focus:ring-primary/20",
											children: [
												/* @__PURE__ */ jsx("option", {
													value: "Português (Brasil)",
													children: "Português (Brasil)"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "English (US)",
													children: "English (US)"
												}),
												/* @__PURE__ */ jsx("option", {
													value: "Español",
													children: "Español"
												})
											]
										})]
									})
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "pt-3 border-t border-outline-variant/20 flex justify-end",
								children: /* @__PURE__ */ jsx("button", {
									type: "submit",
									className: "px-6 py-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-md font-bold transition-all shadow-sm active:scale-95",
									children: "Salvar Alterações"
								})
							})
						]
					})]
				}) })
			}),
			/* @__PURE__ */ jsx(Reveal, {
				when: () => activeTab() === "address",
				children: /* @__PURE__ */ jsx(Reveal.If, { children: /* @__PURE__ */ jsxs("form", {
					onSubmit: (event) => {
						event.preventDefault();
						showToast("Endereço Salvo", "Dados fiscais e endereço da sede atualizados com sucesso.", "success");
					},
					className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-7 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsx("h3", {
									className: "font-headline-md text-on-surface font-bold",
									children: "Dados da Filial & Sede Fiscal"
								}), /* @__PURE__ */ jsx("span", {
									className: "px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-code-sm font-bold",
									children: "CNPJ Ativo"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "sm:col-span-2 flex flex-col gap-1.5",
										children: [/* @__PURE__ */ jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "Razão Social"
										}), /* @__PURE__ */ jsx("input", {
											type: "text",
											value: () => razaoSocial(),
											onInput: (event) => setRazaoSocial(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "CNPJ da Filial"
										}), /* @__PURE__ */ jsx("input", {
											type: "text",
											value: () => cnpj(),
											onInput: (event) => setCnpj(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-code-sm outline-none"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ jsx("label", {
												className: "font-label-md text-on-surface font-semibold",
												children: "CEP"
											}), /* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: handleLookupCep,
												className: "text-primary hover:underline text-[11px] font-bold",
												children: "Buscar Correios"
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ jsx("input", {
												type: "text",
												value: () => cep(),
												onInput: (event) => setCep(event.currentTarget.value),
												className: "flex-1 p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-code-sm outline-none"
											}), /* @__PURE__ */ jsx("button", {
												type: "button",
												onClick: handleLookupCep,
												className: "px-3 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface text-body-sm font-semibold",
												children: "Buscar"
											})]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "sm:col-span-2 flex flex-col gap-1.5",
										children: [/* @__PURE__ */ jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "Logradouro"
										}), /* @__PURE__ */ jsx("input", {
											type: "text",
											value: () => street(),
											onInput: (event) => setStreet(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "Número"
										}), /* @__PURE__ */ jsx("input", {
											type: "text",
											value: () => number(),
											onInput: (event) => setNumber(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "Complemento"
										}), /* @__PURE__ */ jsx("input", {
											type: "text",
											value: () => complement(),
											onInput: (event) => setComplement(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "Bairro"
										}), /* @__PURE__ */ jsx("input", {
											type: "text",
											value: () => neighborhood(),
											onInput: (event) => setNeighborhood(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none"
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex-1 flex flex-col gap-1.5",
											children: [/* @__PURE__ */ jsx("label", {
												className: "font-label-md text-on-surface font-semibold",
												children: "Cidade"
											}), /* @__PURE__ */ jsx("input", {
												type: "text",
												value: () => city(),
												onInput: (event) => setCity(event.currentTarget.value),
												className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none"
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "w-20 flex flex-col gap-1.5",
											children: [/* @__PURE__ */ jsx("label", {
												className: "font-label-md text-on-surface font-semibold",
												children: "UF"
											}), /* @__PURE__ */ jsx("input", {
												type: "text",
												value: () => state(),
												onInput: (event) => setState(event.currentTarget.value),
												className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none text-center font-bold"
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "pt-3 border-t border-outline-variant/20 flex justify-end",
								children: /* @__PURE__ */ jsx("button", {
									type: "submit",
									className: "px-6 py-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-md font-bold transition-all shadow-sm",
									children: "Salvar Endereço Fiscal"
								})
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-5 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-3",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsxs("span", {
									className: "font-title-md text-on-surface font-bold flex items-center gap-1.5",
									children: [/* @__PURE__ */ jsx("span", {
										className: "material-symbols-outlined text-[20px] text-primary",
										children: "pin_drop"
									}), "Raio de Entrega iFood & Logística"]
								}), /* @__PURE__ */ jsx("span", {
									className: "font-code-sm text-[11px] text-tertiary font-bold",
									children: "Raio 7.5 km"
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative w-full aspect-video sm:aspect-square max-h-80 rounded-xl overflow-hidden border border-outline-variant/20 shadow-inner group",
								children: [
									/* @__PURE__ */ jsx("img", {
										src: MAP_IMAGE_URL,
										alt: "Mapa da Região Jardins",
										className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									}),
									/* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary/10 pointer-events-none" }),
									/* @__PURE__ */ jsxs("div", {
										className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center",
										children: [/* @__PURE__ */ jsx("span", { className: "w-4 h-4 rounded-full bg-primary ring-4 ring-primary/30 animate-ping" }), /* @__PURE__ */ jsxs("div", {
											className: "bg-surface-container-lowest text-primary px-3 py-1 rounded-full shadow-lg font-headline-sm font-bold mt-1 text-nowrap flex items-center gap-1",
											children: [/* @__PURE__ */ jsx("span", {
												className: "material-symbols-outlined text-[16px]",
												children: "restaurant"
											}), "Hub Jardins Paulista"]
										})]
									})
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "font-body-sm text-on-surface-variant",
								children: "Endereço sincronizado com o raio de despacho do iFood Jardins e emissão automática de DANFE via Bling / Totvs."
							})
						]
					})]
				}) })
			}),
			/* @__PURE__ */ jsx(Reveal, {
				when: () => activeTab() === "billing",
				children: /* @__PURE__ */ jsx(Reveal.If, { children: /* @__PURE__ */ jsxs("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-5 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
									className: "font-label-sm uppercase tracking-wider text-on-surface-variant font-bold",
									children: "Plano Contratado"
								}), /* @__PURE__ */ jsx("h3", {
									className: "font-headline-lg text-on-surface font-extrabold mt-0.5",
									children: "Enterprise Pro"
								})] }), /* @__PURE__ */ jsxs("div", {
									className: "text-right",
									children: [/* @__PURE__ */ jsx("span", {
										className: "font-headline-lg text-primary font-bold",
										children: "R$ 1.490"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-[11px] text-on-surface-variant block",
										children: "/mês • Faturamento Totvs"
									})]
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-3 pt-2 border-t border-outline-variant/20",
								children: [
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between font-label-md text-on-surface mb-1",
										children: [/* @__PURE__ */ jsx("span", { children: "Sessões Meta WhatsApp Cloud API" }), /* @__PURE__ */ jsx("strong", {
											className: "font-code-sm",
											children: "42.890 / 60.000 (71%)"
										})]
									}), /* @__PURE__ */ jsx("div", {
										className: "w-full bg-surface-container-high h-2 rounded-full overflow-hidden",
										children: /* @__PURE__ */ jsx("div", { className: "bg-primary-container h-full w-[71%]" })
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between font-label-md text-on-surface mb-1",
										children: [/* @__PURE__ */ jsx("span", { children: "IA Copilot & Geração de Criativos" }), /* @__PURE__ */ jsx("strong", {
											className: "font-code-sm",
											children: "18.420 / 25.000 req (73%)"
										})]
									}), /* @__PURE__ */ jsx("div", {
										className: "w-full bg-surface-container-high h-2 rounded-full overflow-hidden",
										children: /* @__PURE__ */ jsx("div", { className: "bg-secondary-container h-full w-[73%]" })
									})] }),
									/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
										className: "flex justify-between font-label-md text-on-surface mb-1",
										children: [/* @__PURE__ */ jsx("span", { children: "Armazenamento de Imagens em Nuvem" }), /* @__PURE__ */ jsx("strong", {
											className: "font-code-sm",
											children: "14.2 GB / 50 GB"
										})]
									}), /* @__PURE__ */ jsx("div", {
										className: "w-full bg-surface-container-high h-2 rounded-full overflow-hidden",
										children: /* @__PURE__ */ jsx("div", { className: "bg-tertiary-container h-full w-[28%]" })
									})] })
								]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "p-3 bg-surface-container-low rounded-xl border border-outline-variant/20",
								children: [/* @__PURE__ */ jsx("span", {
									className: "text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-2",
									children: "Tráfego nos Últimos 7 Dias (Msgs & Pedidos)"
								}), /* @__PURE__ */ jsx("svg", {
									className: "w-full h-12 text-primary",
									viewBox: "0 0 100 25",
									preserveAspectRatio: "none",
									children: /* @__PURE__ */ jsx("path", {
										d: "M0,20 L15,16 L30,19 L45,10 L60,12 L75,4 L90,8 L100,2",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2.5"
									})
								})]
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => showToast("Upgrade de Plano", "Nossa equipe de contas corporativas entrará em contato para expandir o plano Enterprise.", "info"),
								className: "w-full py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary font-title-md font-bold transition-all text-center",
								children: "Fazer Upgrade de Capacidade"
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-7 flex flex-col gap-4",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-3",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsx("h4", {
									className: "font-title-lg text-on-surface font-bold",
									children: "Métodos de Pagamento Corporativos"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => showToast("Adicionar Cartão", "Formulário de cadastro de cartão de crédito corporativo.", "info"),
									className: "text-primary text-[12px] font-bold hover:underline",
									children: "+ Novo Método"
								})]
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-primary/30",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[28px] text-primary",
											children: "credit_card"
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
											className: "font-title-md text-on-surface font-bold block",
											children: "Mastercard Corporativo •••• 8824"
										}), /* @__PURE__ */ jsx("span", {
											className: "font-body-sm text-[11px] text-on-surface-variant",
											children: "Expira em 08/2028 • Débito automático ativo"
										})] })]
									}), /* @__PURE__ */ jsx("span", {
										className: "px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-[11px] font-bold",
										children: "Padrão"
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/20",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-[28px] text-tertiary",
											children: "pix"
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
											className: "font-title-md text-on-surface font-bold block",
											children: "PIX Automático & Boleto DDA"
										}), /* @__PURE__ */ jsx("span", {
											className: "font-body-sm text-[11px] text-on-surface-variant",
											children: "Banco Itaú Empresas • CNPJ 42.189.330/0001-44"
										})] })]
									}), /* @__PURE__ */ jsx("span", {
										className: "text-on-surface-variant text-[11px]",
										children: "Reserva"
									})]
								})]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-3",
							children: [/* @__PURE__ */ jsx("h4", {
								className: "font-title-lg text-on-surface font-bold",
								children: "Últimas Faturas & Notas Fiscais"
							}), /* @__PURE__ */ jsx("div", {
								className: "divide-y divide-outline-variant/15 font-body-sm",
								children: INVOICE_ITEMS.map((item) => /* @__PURE__ */ jsxs("div", {
									className: "py-2.5 flex items-center justify-between",
									children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
										className: "font-semibold text-on-surface block",
										children: item.ref
									}), /* @__PURE__ */ jsxs("span", {
										className: "text-[11px] text-on-surface-variant font-code-sm",
										children: [
											item.nf,
											" • Pago em ",
											item.date
										]
									})] }), /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx("span", {
											className: "font-title-md font-bold text-on-surface",
											children: item.val
										}), /* @__PURE__ */ jsx("button", {
											type: "button",
											onClick: () => showToast("Download NF-e", `Baixando arquivo PDF da ${item.nf}...`, "success"),
											className: "p-1.5 rounded-lg hover:bg-surface-container text-primary transition-colors",
											title: "Baixar Nota Fiscal em PDF",
											children: /* @__PURE__ */ jsx("span", {
												className: "material-symbols-outlined text-[20px]",
												children: "download"
											})
										})]
									})]
								}, item.nf))
							})]
						})]
					})]
				}) })
			}),
			/* @__PURE__ */ jsx(Reveal, {
				when: () => activeTab() === "security",
				children: /* @__PURE__ */ jsx(Reveal.If, { children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-3xl bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-5",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
								className: "font-headline-md text-on-surface font-bold",
								children: "Segurança Corporativa & Acesso"
							}), /* @__PURE__ */ jsx("p", {
								className: "font-body-sm text-on-surface-variant",
								children: "Proteja o acesso à sua conta de atendimento, catálogo e credenciais de webhooks."
							})] }), /* @__PURE__ */ jsx("span", {
								className: "px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-label-sm font-bold",
								children: "Proteção Alta"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ jsx("span", {
									className: "material-symbols-outlined text-primary text-[28px]",
									children: "verified_user"
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
									className: "font-title-md text-on-surface font-bold block",
									children: "Autenticação em Dois Fatores (2FA)"
								}), /* @__PURE__ */ jsx("p", {
									className: "font-body-sm text-on-surface-variant mt-0.5",
									children: "Requer confirmação no Google Authenticator ou código SMS ao conectar novos computadores na rede."
								})] })]
							}), /* @__PURE__ */ jsx("span", {
								className: "px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm font-bold shrink-0",
								children: "Ativo"
							})]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ jsx("h4", {
								className: "font-title-md text-on-surface font-bold",
								children: "Sessões Ativas em Dispositivos"
							}), /* @__PURE__ */ jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-primary text-[24px]",
											children: "laptop_mac"
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
											className: "font-semibold text-on-surface block",
											children: "Google Chrome no macOS • São Paulo, Brasil"
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[11px] text-tertiary font-code-sm",
											children: "Sessão Atual • IP 177.18.29.102"
										})] })]
									}), /* @__PURE__ */ jsx("span", {
										className: "px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold",
										children: "Agora"
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ jsx("span", {
											className: "material-symbols-outlined text-on-surface-variant text-[24px]",
											children: "smartphone"
										}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
											className: "font-semibold text-on-surface block",
											children: "Rede Omni App (Android) • Samsung Galaxy S23"
										}), /* @__PURE__ */ jsx("span", {
											className: "text-[11px] text-on-surface-variant font-code-sm",
											children: "Último acesso: Hoje às 08:30"
										})] })]
									}), /* @__PURE__ */ jsx("button", {
										type: "button",
										onClick: () => showToast("Sessão Desconectada", "Dispositivo Android deslogado com sucesso.", "info"),
										className: "text-error hover:underline text-label-sm font-semibold",
										children: "Desconectar"
									})]
								})]
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "pt-2 border-t border-outline-variant/20 flex justify-end",
							children: /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => showToast("Sessões Encerradas", "Todas as outras sessões foram invalidadas.", "success"),
								className: "px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md transition-all",
								children: "Encerrar Todas as Outras Sessões"
							})
						})
					]
				}) })
			}),
			/* @__PURE__ */ jsx(Reveal, {
				when: () => activeTab() === "danger",
				children: /* @__PURE__ */ jsx(Reveal.If, { children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-3xl bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-error/30 flex flex-col gap-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-2 text-error",
							children: [/* @__PURE__ */ jsx("span", {
								className: "material-symbols-outlined text-[28px]",
								children: "warning"
							}), /* @__PURE__ */ jsx("h3", {
								className: "font-headline-md font-bold",
								children: "Zona Crítica e Irreversível"
							})]
						}),
						/* @__PURE__ */ jsx("p", {
							className: "font-body-md text-on-surface-variant leading-relaxed",
							children: "As ações nesta seção têm impacto imediato sobre as operações do restaurante, cancelamento de canais Meta WhatsApp, desvinculação das credenciais do iFood e suspensão de webhooks do Totvs Protheus."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "p-4 rounded-xl bg-error-container/20 border border-error-container flex flex-col sm:flex-row sm:items-center justify-between gap-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("strong", {
								className: "font-title-md text-on-surface block",
								children: "Desconectar Hub & Excluir Workspace"
							}), /* @__PURE__ */ jsx("span", {
								className: "font-body-sm text-on-surface-variant",
								children: "Remove permanentemente logs de atendimento, histórico de conversas e regras automatizadas."
							})] }), /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setShowDeleteModal(true),
								className: "px-4 py-2 rounded-xl bg-error text-on-error font-title-md font-bold hover:bg-error/90 transition-all shrink-0 shadow-sm",
								children: "Excluir Workspace"
							})]
						})
					]
				}) })
			}),
			/* @__PURE__ */ jsx(Reveal, {
				when: () => showDeleteModal(),
				children: /* @__PURE__ */ jsx(Reveal.If, { children: /* @__PURE__ */ jsx("div", {
					className: "fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4",
					children: /* @__PURE__ */ jsxs("div", {
						className: "bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl border border-error/40 flex flex-col gap-4 animate-in fade-in zoom-in-95",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 text-error",
								children: [/* @__PURE__ */ jsx("span", {
									className: "material-symbols-outlined text-[32px]",
									children: "warning"
								}), /* @__PURE__ */ jsx("h3", {
									className: "font-headline-sm font-bold",
									children: "Confirmar Exclusão"
								})]
							}),
							/* @__PURE__ */ jsxs("p", {
								className: "font-body-sm text-on-surface-variant",
								children: [
									"Esta ação é ",
									/* @__PURE__ */ jsx("strong", { children: "definitiva" }),
									". Para confirmar que deseja desativar o workspace",
									" ",
									/* @__PURE__ */ jsx("strong", { children: "Rede Jardins Paulista (#8921)" }),
									", digite",
									" ",
									/* @__PURE__ */ jsx("span", {
										className: "font-mono font-bold text-on-surface",
										children: "EXCLUIR CONTA REDE"
									}),
									" abaixo:"
								]
							}),
							/* @__PURE__ */ jsx("input", {
								type: "text",
								value: () => deleteConfirmationText(),
								onInput: (event) => setDeleteConfirmationText(event.currentTarget.value),
								placeholder: "Digite EXCLUIR CONTA REDE",
								className: "p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface font-mono text-sm outline-none focus:ring-2 focus:ring-error"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-end gap-2 pt-2",
								children: [/* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: () => setShowDeleteModal(false),
									className: "px-4 py-2 rounded-xl bg-surface-container-high text-on-surface font-title-md font-semibold",
									children: "Cancelar"
								}), /* @__PURE__ */ jsx("button", {
									type: "button",
									onClick: handleDeleteAccount,
									className: "px-4 py-2 rounded-xl bg-error text-on-error font-title-md font-bold hover:bg-error/90 transition-all",
									children: "Confirmar e Excluir"
								})]
							})
						]
					})
				}) })
			})
		]
	});
}
typeof AccountScreen === "function" && markClientExport(AccountScreen, "components/omni-hub/account-screen", "AccountScreen", "hydrate");

//#endregion
//#region .adaptive-temp/dev-runtime-1791414636097-r2w5sp/temp/client-components/components__omni-hub__account-screen.tsx
hydrateClientComponents("components/omni-hub/account-screen", account_screen_exports);

//#endregion
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW50cnktRE9sSGVPX1cuanMiLCJuYW1lcyI6WyJjbGllbnRNb2R1bGUiXSwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY29tcG9uZW50cy9vbW5pLWh1Yi9hY2NvdW50LXNjcmVlbi50c3giLCIuLi8uLi90ZW1wL2NsaWVudC1jb21wb25lbnRzL2NvbXBvbmVudHNfX29tbmktaHViX19hY2NvdW50LXNjcmVlbi50c3giXSwic291cmNlc0NvbnRlbnQiOlsiXCJoeWRyYXRlXCI7XG5cbmltcG9ydCB7IHNpZ25hbCwgdXNlUm91dGVyIH0gZnJvbSBcIkBhZGFwdGl2ZS1qcy93ZWJcIjtcbmltcG9ydCB7IFVTRVJfQVZBVEFSLCBNQVBfSU1BR0VfVVJMIH0gZnJvbSBcIi4uLy4uL3NoYXJlZC9vbW5pLWh1Yi9tb2NrLWRhdGFcIjtcbmltcG9ydCB7IHNob3dUb2FzdCB9IGZyb20gXCIuLi8uLi9zaGFyZWQvb21uaS1odWIvdG9hc3Qtc3RvcmVcIjtcbmltcG9ydCB7IFNDUkVFTl9ST1VURVMgfSBmcm9tIFwiLi4vLi4vc2hhcmVkL29tbmktaHViL3R5cGVzXCI7XG5pbXBvcnQge1JldmVhbH0gZnJvbSBcIkBhZGFwdGl2ZS1qcy9jb21wb25lbnRzXCI7XG5cbmNvbnN0IEFDQ09VTlRfVEFCUzogeyBpZDogXCJwcm9maWxlXCIgfCBcImFkZHJlc3NcIiB8IFwiYmlsbGluZ1wiIHwgXCJzZWN1cml0eVwiIHwgXCJkYW5nZXJcIjsgbGFiZWw6IHN0cmluZzsgaWNvbjogc3RyaW5nOyBpc0Rhbmdlcj86IGJvb2xlYW4gfVtdID0gW1xuICB7IGlkOiBcInByb2ZpbGVcIiwgbGFiZWw6IFwiRGFkb3MgZG8gUGVyZmlsICYgQ29udGF0b1wiLCBpY29uOiBcInBlcnNvblwiIH0sXG4gIHsgaWQ6IFwiYWRkcmVzc1wiLCBsYWJlbDogXCJFbmRlcmXDp28gJiBTZWRlIEZpc2NhbFwiLCBpY29uOiBcImxvY2F0aW9uX29uXCIgfSxcbiAgeyBpZDogXCJiaWxsaW5nXCIsIGxhYmVsOiBcIlBsYW5vcyAmIEZhdHVyYW1lbnRvXCIsIGljb246IFwiY3JlZGl0X2NhcmRcIiB9LFxuICB7IGlkOiBcInNlY3VyaXR5XCIsIGxhYmVsOiBcIlNlZ3VyYW7Dp2EgJiBTZXNzw7Vlc1wiLCBpY29uOiBcInNoaWVsZFwiIH0sXG4gIHsgaWQ6IFwiZGFuZ2VyXCIsIGxhYmVsOiBcIlpvbmEgQ3LDrXRpY2FcIiwgaWNvbjogXCJ3YXJuaW5nXCIsIGlzRGFuZ2VyOiB0cnVlIH0sXG5dO1xuXG5jb25zdCBJTlZPSUNFX0lURU1TID0gW1xuICB7IHJlZjogXCJPdXR1YnJvIC8gMjAyNFwiLCB2YWw6IFwiUiQgMS40OTAsMDBcIiwgc3RhdHVzOiBcIlBhZ29cIiwgbmY6IFwiTkYtZSAjODg0MVwiLCBkYXRlOiBcIjA1LzEwLzIwMjRcIiB9LFxuICB7IHJlZjogXCJTZXRlbWJybyAvIDIwMjRcIiwgdmFsOiBcIlIkIDEuNDkwLDAwXCIsIHN0YXR1czogXCJQYWdvXCIsIG5mOiBcIk5GLWUgIzgyMTBcIiwgZGF0ZTogXCIwNS8wOS8yMDI0XCIgfSxcbiAgeyByZWY6IFwiQWdvc3RvIC8gMjAyNFwiLCB2YWw6IFwiUiQgMS40OTAsMDBcIiwgc3RhdHVzOiBcIlBhZ29cIiwgbmY6IFwiTkYtZSAjNzY0NFwiLCBkYXRlOiBcIjA1LzA4LzIwMjRcIiB9LFxuXTtcblxuZXhwb3J0IGZ1bmN0aW9uIEFjY291bnRTY3JlZW4oKSB7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCBbYWN0aXZlVGFiLCBzZXRBY3RpdmVUYWJdID0gc2lnbmFsPFwicHJvZmlsZVwiIHwgXCJhZGRyZXNzXCIgfCBcImJpbGxpbmdcIiB8IFwic2VjdXJpdHlcIiB8IFwiZGFuZ2VyXCI+KFwicHJvZmlsZVwiKTtcblxuICBjb25zdCBbZnVsbE5hbWUsIHNldEZ1bGxOYW1lXSA9IHNpZ25hbChcIk1hcmlhbmEgU2lsdmFcIik7XG4gIGNvbnN0IFtqb2JUaXRsZSwgc2V0Sm9iVGl0bGVdID0gc2lnbmFsKFwiQXRlbmRpbWVudG8gJiBPcGVyYcOnw7VlcyBTw6puaW9yXCIpO1xuICBjb25zdCBbZW1haWwsIHNldEVtYWlsXSA9IHNpZ25hbChcIm1hcmlhbmEuc2lsdmFAcmVkZWh1Yi5jb20uYnJcIik7XG4gIGNvbnN0IFtwaG9uZTJmYSwgc2V0UGhvbmUyZmFdID0gc2lnbmFsKFwiKzU1ICgxMSkgOTg4MjEtNDQzMlwiKTtcbiAgY29uc3QgW3RpbWV6b25lLCBzZXRUaW1lem9uZV0gPSBzaWduYWwoXCJBbWVyaWNhL1Nhb19QYXVsbyAoR01ULTMpXCIpO1xuICBjb25zdCBbbGFuZ3VhZ2UsIHNldExhbmd1YWdlXSA9IHNpZ25hbChcIlBvcnR1Z3XDqnMgKEJyYXNpbClcIik7XG5cbiAgY29uc3QgW2NucGosIHNldENucGpdID0gc2lnbmFsKFwiNDIuMTg5LjMzMC8wMDAxLTQ0XCIpO1xuICBjb25zdCBbcmF6YW9Tb2NpYWwsIHNldFJhemFvU29jaWFsXSA9IHNpZ25hbChcIlJFREUgT01OSUNIQU5ORUwgVEVDTk9MT0dJQSBFTSBBTElNRU5UT1MgTFREQVwiKTtcbiAgY29uc3QgW2NlcCwgc2V0Q2VwXSA9IHNpZ25hbChcIjAxNDE5LTAwMVwiKTtcbiAgY29uc3QgW3N0cmVldCwgc2V0U3RyZWV0XSA9IHNpZ25hbChcIkFsYW1lZGEgU2FudG9zXCIpO1xuICBjb25zdCBbbnVtYmVyLCBzZXROdW1iZXJdID0gc2lnbmFsKFwiMTgyN1wiKTtcbiAgY29uc3QgW2NvbXBsZW1lbnQsIHNldENvbXBsZW1lbnRdID0gc2lnbmFsKFwiMTLCuiBBbmRhciAtIENvbmp1bnRvIDEyMDRcIik7XG4gIGNvbnN0IFtuZWlnaGJvcmhvb2QsIHNldE5laWdoYm9yaG9vZF0gPSBzaWduYWwoXCJDZXJxdWVpcmEgQ8Opc2FyXCIpO1xuICBjb25zdCBbY2l0eSwgc2V0Q2l0eV0gPSBzaWduYWwoXCJTw6NvIFBhdWxvXCIpO1xuICBjb25zdCBbc3RhdGUsIHNldFN0YXRlXSA9IHNpZ25hbChcIlNQXCIpO1xuXG4gIGNvbnN0IFtzaG93RGVsZXRlTW9kYWwsIHNldFNob3dEZWxldGVNb2RhbF0gPSBzaWduYWwoZmFsc2UpO1xuICBjb25zdCBbZGVsZXRlQ29uZmlybWF0aW9uVGV4dCwgc2V0RGVsZXRlQ29uZmlybWF0aW9uVGV4dF0gPSBzaWduYWwoXCJcIik7XG5cbiAgY29uc3QgaGFuZGxlTG9va3VwQ2VwID0gKCkgPT4ge1xuICAgIHNob3dUb2FzdChcIkJ1c2NhbmRvIENFUFwiLCBcIkNvbnN1bHRhbmRvIGJhc2UgZG9zIENvcnJlaW9zIGUgUmVjZWl0YSBGZWRlcmFsLi4uXCIsIFwiaW5mb1wiKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNldFN0cmVldChcIkFsYW1lZGEgU2FudG9zXCIpO1xuICAgICAgc2V0TmVpZ2hib3Job29kKFwiQ2VycXVlaXJhIEPDqXNhclwiKTtcbiAgICAgIHNldENpdHkoXCJTw6NvIFBhdWxvXCIpO1xuICAgICAgc2V0U3RhdGUoXCJTUFwiKTtcbiAgICAgIHNob3dUb2FzdChcIkNFUCBMb2NhbGl6YWRvXCIsIFwiQWxhbWVkYSBTYW50b3MsIENlcnF1ZWlyYSBDw6lzYXIgLSBTw6NvIFBhdWxvL1NQLlwiKTtcbiAgICB9LCA2MDApO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZURlbGV0ZUFjY291bnQgPSAoKSA9PiB7XG4gICAgaWYgKGRlbGV0ZUNvbmZpcm1hdGlvblRleHQoKS50cmltKCkgPT09IFwiRVhDTFVJUiBDT05UQSBSRURFXCIpIHtcbiAgICAgIHNldFNob3dEZWxldGVNb2RhbChmYWxzZSk7XG4gICAgICBzaG93VG9hc3QoXCJDb250YSBFbmNlcnJhZGFcIiwgXCJTb2xpY2l0YcOnw6NvIGRlIGV4Y2x1c8OjbyBwcm9jZXNzYWRhIGNvbSBzdWNlc3NvLlwiLCBcIndhcm5pbmdcIik7XG4gICAgICByb3V0ZXIucHVzaChTQ1JFRU5fUk9VVEVTW1wiYXV0ZW50aWNhY2FvXCJdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2hvd1RvYXN0KFwiRXJybyBkZSBWYWxpZGHDp8Ojb1wiLCAnRGlnaXRlIGV4YXRhbWVudGUgXCJFWENMVUlSIENPTlRBIFJFREVcIiBwYXJhIGNvbmZpcm1hci4nLCBcImVycm9yXCIpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHNtOnAtNiBsZzpwLTggZmxleCBmbGV4LWNvbCBnYXAtNiB3LWZ1bGwgbWF4LXctWzE0NDBweF0gbXgtYXV0b1wiPlxuICAgICAgey8qIFdvcmtzcGFjZSBCYW5uZXIgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXN1cmZhY2UtY29udGFpbmVyLWxvd2VzdCByb3VuZGVkLXhsIHAtNSBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgZmxleCBmbGV4LWNvbCBtZDpmbGV4LXJvdyBtZDppdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIGdhcC00XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctMTQgaC0xNCByb3VuZGVkLTJ4bCBiZy1ncmFkaWVudC10by10ciBmcm9tLXByaW1hcnkgdG8tcHJpbWFyeS1jb250YWluZXIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgdGV4dC1vbi1wcmltYXJ5IHNoYWRvdy1tZFwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVszMnB4XVwiPmRvbWFpbjwvc3Bhbj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiZm9udC1oZWFkbGluZS1sZyB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2xkXCI+UmVkZSBKYXJkaW5zIFBhdWxpc3RhPC9oMT5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMi41IHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC0xMDAgdGV4dC1lbWVyYWxkLTgwMCBmb250LWxhYmVsLXNtIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgIEVudGVycHJpc2UgQXRpdm9cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBmb250LWJvZHktc20gbXQtMC41XCI+XG4gICAgICAgICAgICAgIFdvcmtzcGFjZSBJRCAjODkyMSDigKIgMTIgT3BlcmFkb3JlcyBBdGl2b3Mg4oCiIFRvdHZzIFByb3RoZXVzICYgaUZvb2QgQ29uZWN0YWRvc1xuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cblxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiByb3V0ZXIucHVzaChTQ1JFRU5fUk9VVEVTW1wiY2F0YWxvZ28tZXJwXCJdKX1cbiAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTMuNSBweS0yIHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItaGlnaCBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoZXN0IHRleHQtb24tc3VyZmFjZSBmb250LXRpdGxlLW1kIHRyYW5zaXRpb24tYWxsIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMThweF1cIj5zeW5jX2FsdDwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuPlZlciBJbnRlZ3Jhw6fDtWVzIEVSUDwvc3Bhbj5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHJvdXRlci5wdXNoKFNDUkVFTl9ST1VURVNbXCJhdXRlbnRpY2FjYW9cIl0pfVxuICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtMy41IHB5LTIgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXIgdGV4dC1wcmltYXJ5IGZvbnQtdGl0bGUtbWQgdHJhbnNpdGlvbi1hbGwgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTEuNSBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsxOHB4XVwiPmxvY2s8L3NwYW4+XG4gICAgICAgICAgICA8c3Bhbj5Ucm9jYXIgVXN1w6FyaW88L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG5cbiAgICAgIHsvKiBOYXZlZ2HDp8OjbyBwb3IgQWJhcyAqL31cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBib3JkZXItYiBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIG92ZXJmbG93LXgtYXV0byB0ZXh0LW5vd3JhcCBzY3JvbGxiYXItbm9uZSBnYXAtMlwiPlxuICAgICAgICB7QUNDT1VOVF9UQUJTLm1hcCgodGFiKSA9PiAoXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAga2V5PXt0YWIuaWR9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldEFjdGl2ZVRhYih0YWIuaWQpfVxuICAgICAgICAgICAgY2xhc3NOYW1lPXsoKSA9PlxuICAgICAgICAgICAgICBhY3RpdmVUYWIoKSA9PT0gdGFiLmlkXG4gICAgICAgICAgICAgICAgPyB0YWIuaXNEYW5nZXJcbiAgICAgICAgICAgICAgICAgID8gXCJwYi0zIHB4LTQgZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgZm9udC10aXRsZS1tZCBib3JkZXItYi0yIHRyYW5zaXRpb24tYWxsIGJvcmRlci1lcnJvciB0ZXh0LWVycm9yIGZvbnQtYm9sZFwiXG4gICAgICAgICAgICAgICAgICA6IFwicGItMyBweC00IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZvbnQtdGl0bGUtbWQgYm9yZGVyLWItMiB0cmFuc2l0aW9uLWFsbCBib3JkZXItcHJpbWFyeSB0ZXh0LXByaW1hcnkgZm9udC1ib2xkXCJcbiAgICAgICAgICAgICAgICA6IFwicGItMyBweC00IGZsZXggaXRlbXMtY2VudGVyIGdhcC0yIGZvbnQtdGl0bGUtbWQgYm9yZGVyLWItMiB0cmFuc2l0aW9uLWFsbCBib3JkZXItdHJhbnNwYXJlbnQgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgaG92ZXI6dGV4dC1vbi1zdXJmYWNlXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICBjbGFzc05hbWU9eygpID0+XG4gICAgICAgICAgICAgICAgYG1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMjBweF0gJHtcbiAgICAgICAgICAgICAgICAgIGFjdGl2ZVRhYigpID09PSB0YWIuaWQgPyAodGFiLmlzRGFuZ2VyID8gXCJ0ZXh0LWVycm9yXCIgOiBcInRleHQtcHJpbWFyeVwiKSA6IFwidGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIlxuICAgICAgICAgICAgICAgIH1gXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge3RhYi5pY29ufVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4+e3RhYi5sYWJlbH08L3NwYW4+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG5cbiAgICAgIDxSZXZlYWwgd2hlbj17KCkgPT4gYWN0aXZlVGFiKCkgPT09IFwicHJvZmlsZVwifT5cbiAgICAgICAgPFJldmVhbC5JZj5cbiAgICAgICAgICA8Zm9ybVxuICAgICAgICAgICAgICBvblN1Ym1pdD17KGV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBzaG93VG9hc3QoXCJQZXJmaWwgQXR1YWxpemFkb1wiLCBcIkFzIGluZm9ybWHDp8O1ZXMgcGVzc29haXMgZSBkZSBjb250YXRvIGZvcmFtIHNhbHZhcy5cIiwgXCJzdWNjZXNzXCIpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJncmlkIGdyaWQtY29scy0xIGxnOmdyaWQtY29scy0zIGdhcC02IGl0ZW1zLXN0YXJ0XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3Qgcm91bmRlZC14bCBwLTUgc2hhZG93LXNtIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIHRleHQtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZSBncm91cCBjdXJzb3ItcG9pbnRlclwiPlxuICAgICAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgICAgICBzcmM9e1VTRVJfQVZBVEFSfVxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJNYXJpYW5hIFNpbHZhXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidy0yOCBoLTI4IHJvdW5kZWQtZnVsbCBvYmplY3QtY292ZXIgcmluZy00IHJpbmctcHJpbWFyeS8yMCBzaGFkb3ctbWRcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2hvd1RvYXN0KFwiRm90byBkZSBQZXJmaWxcIiwgXCJTZWxlY2lvbmUgdW1hIGltYWdlbSBKUEcgb3UgUE5HIGRlIGF0w6kgNU1CLlwiLCBcImluZm9cIil9XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImFic29sdXRlIGluc2V0LTAgcm91bmRlZC1mdWxsIGJnLWJsYWNrLzQwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIHRleHQtd2hpdGUgb3BhY2l0eS0wIGdyb3VwLWhvdmVyOm9wYWNpdHktMTAwIHRyYW5zaXRpb24tb3BhY2l0eVwiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMjRweF1cIj5waG90b19jYW1lcmE8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1oZWFkbGluZS1zbSB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2xkXCI+TWFyaWFuYSBTaWx2YTwvaDM+XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIj5BdGVuZGltZW50byAmIE9wZXJhw6fDtWVzIFPDqm5pb3I8L3NwYW4+XG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm10LTIgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTIgaC0yIHJvdW5kZWQtZnVsbCBiZy1wcmltYXJ5IGFuaW1hdGUtcHVsc2VcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtbGFiZWwtc20gdGV4dC10ZXJ0aWFyeSBmb250LXNlbWlib2xkXCI+Q29udGEgVmVyaWZpY2FkYSBNZXRhPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNob3dUb2FzdChcIkFsdGVyYXIgRm90b1wiLCBcIlVwbG9hZCBkZSBpbWFnZW0gY29uY2x1w61kbyBjb20gc3VjZXNzbyFcIil9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgbXQtMiBweS0yIHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93IGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyIHRleHQtb24tc3VyZmFjZSBmb250LXRpdGxlLW1kIHRyYW5zaXRpb24tY29sb3JzIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBBbHRlcmFyIEZvdG8gZGUgUGVyZmlsXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tMiBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3Qgcm91bmRlZC14bCBwLTUgc2hhZG93LXNtIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGZsZXggZmxleC1jb2wgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1oZWFkbGluZS1tZCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2xkXCI+SW5mb3JtYcOnw7VlcyBkbyBPcGVyYWRvcjwvaDM+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb250LWxhYmVsLW1kIHRleHQtb24tc3VyZmFjZSBmb250LXNlbWlib2xkXCI+Tm9tZSBDb21wbGV0bzwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17KCkgPT4gZnVsbE5hbWUoKX1cbiAgICAgICAgICAgICAgICAgICAgICBvbklucHV0PXsoZXZlbnQpID0+IHNldEZ1bGxOYW1lKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93IGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIHRleHQtb24tc3VyZmFjZSBmb250LWJvZHktc20gb3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnkvMjBcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb250LWxhYmVsLW1kIHRleHQtb24tc3VyZmFjZSBmb250LXNlbWlib2xkXCI+Q2FyZ28gbmEgT3BlcmHDp8OjbzwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17KCkgPT4gam9iVGl0bGUoKX1cbiAgICAgICAgICAgICAgICAgICAgICBvbklucHV0PXsoZXZlbnQpID0+IHNldEpvYlRpdGxlKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93IGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIHRleHQtb24tc3VyZmFjZSBmb250LWJvZHktc20gb3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnkvMjBcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb250LWxhYmVsLW1kIHRleHQtb24tc3VyZmFjZSBmb250LXNlbWlib2xkXCI+RS1tYWlsIENvcnBvcmF0aXZvPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17KCkgPT4gZW1haWwoKX1cbiAgICAgICAgICAgICAgICAgICAgICBvbklucHV0PXsoZXZlbnQpID0+IHNldEVtYWlsKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93IGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIHRleHQtb24tc3VyZmFjZSBmb250LWJvZHktc20gb3V0bGluZS1ub25lIGZvY3VzOnJpbmctMiBmb2N1czpyaW5nLXByaW1hcnkvMjBcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb250LWxhYmVsLW1kIHRleHQtb24tc3VyZmFjZSBmb250LXNlbWlib2xkXCI+V2hhdHNBcHAgZGUgU2VndXJhbsOnYSAyRkE8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eygpID0+IHBob25lMmZhKCl9XG4gICAgICAgICAgICAgICAgICAgICAgb25JbnB1dD17KGV2ZW50KSA9PiBzZXRQaG9uZTJmYShldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLXhsIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2R5LXNtIG91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5LzIwXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9udC1sYWJlbC1tZCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1zZW1pYm9sZFwiPkZ1c28gSG9yw6FyaW88L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0XG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eygpID0+IHRpbWV6b25lKCl9XG4gICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9eyhldmVudCkgPT4gc2V0VGltZXpvbmUoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgdGV4dC1vbi1zdXJmYWNlIGZvbnQtYm9keS1zbSBvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctcHJpbWFyeS8yMFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQW1lcmljYS9TYW9fUGF1bG8gKEdNVC0zKVwiPkFtZXJpY2EvU2FvX1BhdWxvIChHTVQtMyk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQW1lcmljYS9NYW5hdXMgKEdNVC00KVwiPkFtZXJpY2EvTWFuYXVzIChHTVQtNCk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiQW1lcmljYS9CZWxlbSAoR01ULTMpXCI+QW1lcmljYS9CZWxlbSAoR01ULTMpPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb250LWxhYmVsLW1kIHRleHQtb24tc3VyZmFjZSBmb250LXNlbWlib2xkXCI+SWRpb21hIGRhIEludGVyZmFjZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3RcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17KCkgPT4gbGFuZ3VhZ2UoKX1cbiAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17KGV2ZW50KSA9PiBzZXRMYW5ndWFnZShldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTIuNSByb3VuZGVkLXhsIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2R5LXNtIG91dGxpbmUtbm9uZSBmb2N1czpyaW5nLTIgZm9jdXM6cmluZy1wcmltYXJ5LzIwXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJQb3J0dWd1w6pzIChCcmFzaWwpXCI+UG9ydHVndcOqcyAoQnJhc2lsKTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJFbmdsaXNoIChVUylcIj5FbmdsaXNoIChVUyk8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiRXNwYcOxb2xcIj5Fc3Bhw7FvbDwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0zIGJvcmRlci10IGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgZmxleCBqdXN0aWZ5LWVuZFwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNiBweS0yLjUgcm91bmRlZC14bCBiZy1wcmltYXJ5LWNvbnRhaW5lciBob3ZlcjpiZy1wcmltYXJ5IHRleHQtb24tcHJpbWFyeSBmb250LXRpdGxlLW1kIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctc20gYWN0aXZlOnNjYWxlLTk1XCJcbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgU2FsdmFyIEFsdGVyYcOnw7Vlc1xuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICA8L1JldmVhbC5JZj5cbiAgICAgIDwvUmV2ZWFsPlxuXG4gICAgICA8UmV2ZWFsIHdoZW49eygpID0+IGFjdGl2ZVRhYigpID09PSBcImFkZHJlc3NcIn0+XG4gICAgICAgIDxSZXZlYWwuSWY+XG4gICAgICAgICAgPGZvcm1cbiAgICAgICAgICAgICAgb25TdWJtaXQ9eyhldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgc2hvd1RvYXN0KFwiRW5kZXJlw6dvIFNhbHZvXCIsIFwiRGFkb3MgZmlzY2FpcyBlIGVuZGVyZcOnbyBkYSBzZWRlIGF0dWFsaXphZG9zIGNvbSBzdWNlc3NvLlwiLCBcInN1Y2Nlc3NcIik7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgbGc6Z3JpZC1jb2xzLTEyIGdhcC02IGl0ZW1zLXN0YXJ0XCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi03IGJnLXN1cmZhY2UtY29udGFpbmVyLWxvd2VzdCByb3VuZGVkLXhsIHAtNSBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgZmxleCBmbGV4LWNvbCBnYXAtNFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICA8aDMgY2xhc3NOYW1lPVwiZm9udC1oZWFkbGluZS1tZCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2xkXCI+RGFkb3MgZGEgRmlsaWFsICYgU2VkZSBGaXNjYWw8L2gzPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicHgtMi41IHB5LTAuNSByb3VuZGVkLWZ1bGwgYmctc3VyZmFjZS1jb250YWluZXItaGlnaCB0ZXh0LXByaW1hcnkgZm9udC1jb2RlLXNtIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICBDTlBKIEF0aXZvXG4gICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImdyaWQgZ3JpZC1jb2xzLTEgc206Z3JpZC1jb2xzLTIgZ2FwLTRcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic206Y29sLXNwYW4tMiBmbGV4IGZsZXgtY29sIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvbnQtbGFiZWwtbWQgdGV4dC1vbi1zdXJmYWNlIGZvbnQtc2VtaWJvbGRcIj5SYXrDo28gU29jaWFsPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXsoKSA9PiByYXphb1NvY2lhbCgpfVxuICAgICAgICAgICAgICAgICAgICAgIG9uSW5wdXQ9eyhldmVudCkgPT4gc2V0UmF6YW9Tb2NpYWwoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgdGV4dC1vbi1zdXJmYWNlIGZvbnQtYm9keS1zbSBvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb250LWxhYmVsLW1kIHRleHQtb24tc3VyZmFjZSBmb250LXNlbWlib2xkXCI+Q05QSiBkYSBGaWxpYWw8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eygpID0+IGNucGooKX1cbiAgICAgICAgICAgICAgICAgICAgICBvbklucHV0PXsoZXZlbnQpID0+IHNldENucGooZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgdGV4dC1vbi1zdXJmYWNlIGZvbnQtY29kZS1zbSBvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvbnQtbGFiZWwtbWQgdGV4dC1vbi1zdXJmYWNlIGZvbnQtc2VtaWJvbGRcIj5DRVA8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIG9uQ2xpY2s9e2hhbmRsZUxvb2t1cENlcH0gY2xhc3NOYW1lPVwidGV4dC1wcmltYXJ5IGhvdmVyOnVuZGVybGluZSB0ZXh0LVsxMXB4XSBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIEJ1c2NhciBDb3JyZWlvc1xuICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMlwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eygpID0+IGNlcCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25JbnB1dD17KGV2ZW50KSA9PiBzZXRDZXAoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4LTEgcC0yLjUgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgdGV4dC1vbi1zdXJmYWNlIGZvbnQtY29kZS1zbSBvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVMb29rdXBDZXB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC0zIHB5LTIuNSByb3VuZGVkLXhsIGJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2ggaG92ZXI6Ymctc3VyZmFjZS1jb250YWluZXIgdGV4dC1vbi1zdXJmYWNlIHRleHQtYm9keS1zbSBmb250LXNlbWlib2xkXCJcbiAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICBCdXNjYXJcbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzbTpjb2wtc3Bhbi0yIGZsZXggZmxleC1jb2wgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9udC1sYWJlbC1tZCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1zZW1pYm9sZFwiPkxvZ3JhZG91cm88L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eygpID0+IHN0cmVldCgpfVxuICAgICAgICAgICAgICAgICAgICAgIG9uSW5wdXQ9eyhldmVudCkgPT4gc2V0U3RyZWV0KGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93IGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIHRleHQtb24tc3VyZmFjZSBmb250LWJvZHktc20gb3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9udC1sYWJlbC1tZCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1zZW1pYm9sZFwiPk7Dum1lcm88L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eygpID0+IG51bWJlcigpfVxuICAgICAgICAgICAgICAgICAgICAgIG9uSW5wdXQ9eyhldmVudCkgPT4gc2V0TnVtYmVyKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93IGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIHRleHQtb24tc3VyZmFjZSBmb250LWJvZHktc20gb3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9udC1sYWJlbC1tZCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1zZW1pYm9sZFwiPkNvbXBsZW1lbnRvPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXsoKSA9PiBjb21wbGVtZW50KCl9XG4gICAgICAgICAgICAgICAgICAgICAgb25JbnB1dD17KGV2ZW50KSA9PiBzZXRDb21wbGVtZW50KGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93IGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIHRleHQtb24tc3VyZmFjZSBmb250LWJvZHktc20gb3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiZm9udC1sYWJlbC1tZCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1zZW1pYm9sZFwiPkJhaXJybzwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17KCkgPT4gbmVpZ2hib3Job29kKCl9XG4gICAgICAgICAgICAgICAgICAgICAgb25JbnB1dD17KGV2ZW50KSA9PiBzZXROZWlnaGJvcmhvb2QoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgdGV4dC1vbi1zdXJmYWNlIGZvbnQtYm9keS1zbSBvdXRsaW5lLW5vbmVcIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4LTEgZmxleCBmbGV4LWNvbCBnYXAtMS41XCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImZvbnQtbGFiZWwtbWQgdGV4dC1vbi1zdXJmYWNlIGZvbnQtc2VtaWJvbGRcIj5DaWRhZGU8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eygpID0+IGNpdHkoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uSW5wdXQ9eyhldmVudCkgPT4gc2V0Q2l0eShldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtMi41IHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93IGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIHRleHQtb24tc3VyZmFjZSBmb250LWJvZHktc20gb3V0bGluZS1ub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LTIwIGZsZXggZmxleC1jb2wgZ2FwLTEuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJmb250LWxhYmVsLW1kIHRleHQtb24tc3VyZmFjZSBmb250LXNlbWlib2xkXCI+VUY8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eygpID0+IHN0YXRlKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbklucHV0PXsoZXZlbnQpID0+IHNldFN0YXRlKGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0yLjUgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgdGV4dC1vbi1zdXJmYWNlIGZvbnQtYm9keS1zbSBvdXRsaW5lLW5vbmUgdGV4dC1jZW50ZXIgZm9udC1ib2xkXCJcbiAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwdC0zIGJvcmRlci10IGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgZmxleCBqdXN0aWZ5LWVuZFwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHgtNiBweS0yLjUgcm91bmRlZC14bCBiZy1wcmltYXJ5LWNvbnRhaW5lciBob3ZlcjpiZy1wcmltYXJ5IHRleHQtb24tcHJpbWFyeSBmb250LXRpdGxlLW1kIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCBzaGFkb3ctc21cIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICBTYWx2YXIgRW5kZXJlw6dvIEZpc2NhbFxuICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNSBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3Qgcm91bmRlZC14bCBwLTUgc2hhZG93LXNtIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGZsZXggZmxleC1jb2wgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC10aXRsZS1tZCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2xkIGZsZXggaXRlbXMtY2VudGVyIGdhcC0xLjVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsyMHB4XSB0ZXh0LXByaW1hcnlcIj5waW5fZHJvcDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgUmFpbyBkZSBFbnRyZWdhIGlGb29kICYgTG9nw61zdGljYVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1jb2RlLXNtIHRleHQtWzExcHhdIHRleHQtdGVydGlhcnkgZm9udC1ib2xkXCI+UmFpbyA3LjUga208L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlIHctZnVsbCBhc3BlY3QtdmlkZW8gc206YXNwZWN0LXNxdWFyZSBtYXgtaC04MCByb3VuZGVkLXhsIG92ZXJmbG93LWhpZGRlbiBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCBzaGFkb3ctaW5uZXIgZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgICAgICAgICAgc3JjPXtNQVBfSU1BR0VfVVJMfVxuICAgICAgICAgICAgICAgICAgICBhbHQ9XCJNYXBhIGRhIFJlZ2nDo28gSmFyZGluc1wiXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgb2JqZWN0LWNvdmVyIGdyb3VwLWhvdmVyOnNjYWxlLTEwNSB0cmFuc2l0aW9uLXRyYW5zZm9ybSBkdXJhdGlvbi01MDBcIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgaW5zZXQtMCBiZy1wcmltYXJ5LzEwIHBvaW50ZXItZXZlbnRzLW5vbmVcIj48L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhYnNvbHV0ZSB0b3AtMS8yIGxlZnQtMS8yIC10cmFuc2xhdGUteC0xLzIgLXRyYW5zbGF0ZS15LTEvMiBmbGV4IGZsZXgtY29sIGl0ZW1zLWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ3LTQgaC00IHJvdW5kZWQtZnVsbCBiZy1wcmltYXJ5IHJpbmctNCByaW5nLXByaW1hcnkvMzAgYW5pbWF0ZS1waW5nXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXN1cmZhY2UtY29udGFpbmVyLWxvd2VzdCB0ZXh0LXByaW1hcnkgcHgtMyBweS0xIHJvdW5kZWQtZnVsbCBzaGFkb3ctbGcgZm9udC1oZWFkbGluZS1zbSBmb250LWJvbGQgbXQtMSB0ZXh0LW5vd3JhcCBmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMTZweF1cIj5yZXN0YXVyYW50PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIEh1YiBKYXJkaW5zIFBhdWxpc3RhXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIj5cbiAgICAgICAgICAgICAgICAgIEVuZGVyZcOnbyBzaW5jcm9uaXphZG8gY29tIG8gcmFpbyBkZSBkZXNwYWNobyBkbyBpRm9vZCBKYXJkaW5zIGUgZW1pc3PDo28gYXV0b23DoXRpY2EgZGUgREFORkUgdmlhIEJsaW5nIC8gVG90dnMuXG4gICAgICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZm9ybT5cbiAgICAgICAgPC9SZXZlYWwuSWY+XG4gICAgICA8L1JldmVhbD5cblxuICAgICAgPFJldmVhbCB3aGVuPXsoKSA9PiBhY3RpdmVUYWIoKSA9PT0gXCJiaWxsaW5nXCJ9PlxuICAgICAgICA8UmV2ZWFsLklmPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZ3JpZCBncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMTIgZ2FwLTYgaXRlbXMtc3RhcnRcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJsZzpjb2wtc3Bhbi01IGJnLXN1cmZhY2UtY29udGFpbmVyLWxvd2VzdCByb3VuZGVkLXhsIHAtNSBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1vdXRsaW5lLXZhcmlhbnQvMjAgZmxleCBmbGV4LWNvbCBnYXAtNFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LWxhYmVsLXNtIHVwcGVyY2FzZSB0cmFja2luZy13aWRlciB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBmb250LWJvbGRcIj5cbiAgICAgICAgICAgICAgICAgICAgICBQbGFubyBDb250cmF0YWRvXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtaGVhZGxpbmUtbGcgdGV4dC1vbi1zdXJmYWNlIGZvbnQtZXh0cmFib2xkIG10LTAuNVwiPkVudGVycHJpc2UgUHJvPC9oMz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXJpZ2h0XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtaGVhZGxpbmUtbGcgdGV4dC1wcmltYXJ5IGZvbnQtYm9sZFwiPlIkIDEuNDkwPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBibG9ja1wiPi9tw6pzIOKAoiBGYXR1cmFtZW50byBUb3R2czwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTMgcHQtMiBib3JkZXItdCBib3JkZXItb3V0bGluZS12YXJpYW50LzIwXCI+XG4gICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1iZXR3ZWVuIGZvbnQtbGFiZWwtbWQgdGV4dC1vbi1zdXJmYWNlIG1iLTFcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5TZXNzw7VlcyBNZXRhIFdoYXRzQXBwIENsb3VkIEFQSTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cImZvbnQtY29kZS1zbVwiPjQyLjg5MCAvIDYwLjAwMCAoNzElKTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc3VyZmFjZS1jb250YWluZXItaGlnaCBoLTIgcm91bmRlZC1mdWxsIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctcHJpbWFyeS1jb250YWluZXIgaC1mdWxsIHctWzcxJV1cIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGp1c3RpZnktYmV0d2VlbiBmb250LWxhYmVsLW1kIHRleHQtb24tc3VyZmFjZSBtYi0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4+SUEgQ29waWxvdCAmIEdlcmHDp8OjbyBkZSBDcmlhdGl2b3M8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPHN0cm9uZyBjbGFzc05hbWU9XCJmb250LWNvZGUtc21cIj4xOC40MjAgLyAyNS4wMDAgcmVxICg3MyUpPC9zdHJvbmc+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoIGgtMiByb3VuZGVkLWZ1bGwgb3ZlcmZsb3ctaGlkZGVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zZWNvbmRhcnktY29udGFpbmVyIGgtZnVsbCB3LVs3MyVdXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBqdXN0aWZ5LWJldHdlZW4gZm9udC1sYWJlbC1tZCB0ZXh0LW9uLXN1cmZhY2UgbWItMVwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkFybWF6ZW5hbWVudG8gZGUgSW1hZ2VucyBlbSBOdXZlbTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cImZvbnQtY29kZS1zbVwiPjE0LjIgR0IgLyA1MCBHQjwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgYmctc3VyZmFjZS1jb250YWluZXItaGlnaCBoLTIgcm91bmRlZC1mdWxsIG92ZXJmbG93LWhpZGRlblwiPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctdGVydGlhcnktY29udGFpbmVyIGgtZnVsbCB3LVsyOCVdXCI+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3cgcm91bmRlZC14bCBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMFwiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwidGV4dC1bMTFweF0gZm9udC1ib2xkIHRleHQtb24tc3VyZmFjZS12YXJpYW50IHVwcGVyY2FzZSB0cmFja2luZy13aWRlciBibG9jayBtYi0yXCI+XG4gICAgICAgICAgICAgICAgICAgIFRyw6FmZWdvIG5vcyDDmmx0aW1vcyA3IERpYXMgKE1zZ3MgJiBQZWRpZG9zKVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHN2ZyBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0xMiB0ZXh0LXByaW1hcnlcIiB2aWV3Qm94PVwiMCAwIDEwMCAyNVwiIHByZXNlcnZlQXNwZWN0UmF0aW89XCJub25lXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwYXRoXG4gICAgICAgICAgICAgICAgICAgICAgZD1cIk0wLDIwIEwxNSwxNiBMMzAsMTkgTDQ1LDEwIEw2MCwxMiBMNzUsNCBMOTAsOCBMMTAwLDJcIlxuICAgICAgICAgICAgICAgICAgICAgIGZpbGw9XCJub25lXCJcbiAgICAgICAgICAgICAgICAgICAgICBzdHJva2U9XCJjdXJyZW50Q29sb3JcIlxuICAgICAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoPVwiMi41XCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICBzaG93VG9hc3QoXG4gICAgICAgICAgICAgICAgICAgICAgXCJVcGdyYWRlIGRlIFBsYW5vXCIsXG4gICAgICAgICAgICAgICAgICAgICAgXCJOb3NzYSBlcXVpcGUgZGUgY29udGFzIGNvcnBvcmF0aXZhcyBlbnRyYXLDoSBlbSBjb250YXRvIHBhcmEgZXhwYW5kaXIgbyBwbGFubyBFbnRlcnByaXNlLlwiLFxuICAgICAgICAgICAgICAgICAgICAgIFwiaW5mb1wiLFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ3LWZ1bGwgcHktMi41IHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItaGlnaCBob3ZlcjpiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoZXN0IHRleHQtcHJpbWFyeSBmb250LXRpdGxlLW1kIGZvbnQtYm9sZCB0cmFuc2l0aW9uLWFsbCB0ZXh0LWNlbnRlclwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgRmF6ZXIgVXBncmFkZSBkZSBDYXBhY2lkYWRlXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibGc6Y29sLXNwYW4tNyBmbGV4IGZsZXgtY29sIGdhcC00XCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3Qgcm91bmRlZC14bCBwLTUgc2hhZG93LXNtIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGZsZXggZmxleC1jb2wgZ2FwLTNcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoNCBjbGFzc05hbWU9XCJmb250LXRpdGxlLWxnIHRleHQtb24tc3VyZmFjZSBmb250LWJvbGRcIj5Nw6l0b2RvcyBkZSBQYWdhbWVudG8gQ29ycG9yYXRpdm9zPC9oND5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNob3dUb2FzdChcIkFkaWNpb25hciBDYXJ0w6NvXCIsIFwiRm9ybXVsw6FyaW8gZGUgY2FkYXN0cm8gZGUgY2FydMOjbyBkZSBjcsOpZGl0byBjb3Jwb3JhdGl2by5cIiwgXCJpbmZvXCIpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtcHJpbWFyeSB0ZXh0LVsxMnB4XSBmb250LWJvbGQgaG92ZXI6dW5kZXJsaW5lXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICsgTm92byBNw6l0b2RvXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2UteS0yXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuIHAtMyByb3VuZGVkLXhsIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyBib3JkZXIgYm9yZGVyLXByaW1hcnkvMzBcIj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtYXRlcmlhbC1zeW1ib2xzLW91dGxpbmVkIHRleHQtWzI4cHhdIHRleHQtcHJpbWFyeVwiPmNyZWRpdF9jYXJkPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC10aXRsZS1tZCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2xkIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWFzdGVyY2FyZCBDb3Jwb3JhdGl2byDigKLigKLigKLigKIgODgyNFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9keS1zbSB0ZXh0LVsxMXB4XSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEV4cGlyYSBlbSAwOC8yMDI4IOKAoiBEw6liaXRvIGF1dG9tw6F0aWNvIGF0aXZvXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQtZnVsbCBiZy1wcmltYXJ5LWZpeGVkIHRleHQtb24tcHJpbWFyeS1maXhlZCBmb250LWxhYmVsLXNtIHRleHQtWzExcHhdIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgUGFkcsOjb1xuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW4gcC0zIHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93IGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsyOHB4XSB0ZXh0LXRlcnRpYXJ5XCI+cGl4PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC10aXRsZS1tZCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2xkIGJsb2NrXCI+UElYIEF1dG9tw6F0aWNvICYgQm9sZXRvIEREQTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC1ib2R5LXNtIHRleHQtWzExcHhdIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQmFuY28gSXRhw7ogRW1wcmVzYXMg4oCiIENOUEogNDIuMTg5LjMzMC8wMDAxLTQ0XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtb24tc3VyZmFjZS12YXJpYW50IHRleHQtWzExcHhdXCI+UmVzZXJ2YTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYmctc3VyZmFjZS1jb250YWluZXItbG93ZXN0IHJvdW5kZWQteGwgcC01IHNoYWRvdy1zbSBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCBmbGV4IGZsZXgtY29sIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZm9udC10aXRsZS1sZyB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2xkXCI+w5psdGltYXMgRmF0dXJhcyAmIE5vdGFzIEZpc2NhaXM8L2g0PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRpdmlkZS15IGRpdmlkZS1vdXRsaW5lLXZhcmlhbnQvMTUgZm9udC1ib2R5LXNtXCI+XG4gICAgICAgICAgICAgICAgICAgIHtJTlZPSUNFX0lURU1TLm1hcCgoaXRlbSkgPT4gKFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtpdGVtLm5mfSBjbGFzc05hbWU9XCJweS0yLjUgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1iZXR3ZWVuXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtb24tc3VyZmFjZSBibG9ja1wiPntpdGVtLnJlZn08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtb24tc3VyZmFjZS12YXJpYW50IGZvbnQtY29kZS1zbVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtpdGVtLm5mfSDigKIgUGFnbyBlbSB7aXRlbS5kYXRlfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXRpdGxlLW1kIGZvbnQtYm9sZCB0ZXh0LW9uLXN1cmZhY2VcIj57aXRlbS52YWx9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2hvd1RvYXN0KFwiRG93bmxvYWQgTkYtZVwiLCBgQmFpeGFuZG8gYXJxdWl2byBQREYgZGEgJHtpdGVtLm5mfS4uLmAsIFwic3VjY2Vzc1wiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLTEuNSByb3VuZGVkLWxnIGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyIHRleHQtcHJpbWFyeSB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJCYWl4YXIgTm90YSBGaXNjYWwgZW0gUERGXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMjBweF1cIj5kb3dubG9hZDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9SZXZlYWwuSWY+XG4gICAgICA8L1JldmVhbD5cblxuICAgICAgPFJldmVhbCB3aGVuPXsoKSA9PiBhY3RpdmVUYWIoKSA9PT0gXCJzZWN1cml0eVwifT5cbiAgICAgICAgPFJldmVhbC5JZj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1heC13LTN4bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1sb3dlc3Qgcm91bmRlZC14bCBwLTUgc2hhZG93LXNtIGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGZsZXggZmxleC1jb2wgZ2FwLTVcIj5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cImZvbnQtaGVhZGxpbmUtbWQgdGV4dC1vbi1zdXJmYWNlIGZvbnQtYm9sZFwiPlNlZ3VyYW7Dp2EgQ29ycG9yYXRpdmEgJiBBY2Vzc288L2gzPlxuICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1ib2R5LXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50XCI+XG4gICAgICAgICAgICAgICAgICAgIFByb3RlamEgbyBhY2Vzc28gw6Agc3VhIGNvbnRhIGRlIGF0ZW5kaW1lbnRvLCBjYXTDoWxvZ28gZSBjcmVkZW5jaWFpcyBkZSB3ZWJob29rcy5cbiAgICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0yLjUgcHktMSByb3VuZGVkLWZ1bGwgYmctZW1lcmFsZC0xMDAgdGV4dC1lbWVyYWxkLTgwMCBmb250LWxhYmVsLXNtIGZvbnQtYm9sZFwiPlxuICAgICAgICAgICAgICAgICAgUHJvdGXDp8OjbyBBbHRhXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtNCByb3VuZGVkLXhsIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCBmbGV4IGl0ZW1zLXN0YXJ0IGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1zdGFydCBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LXByaW1hcnkgdGV4dC1bMjhweF1cIj52ZXJpZmllZF91c2VyPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiZm9udC10aXRsZS1tZCB0ZXh0LW9uLXN1cmZhY2UgZm9udC1ib2xkIGJsb2NrXCI+XG4gICAgICAgICAgICAgICAgICAgICAgQXV0ZW50aWNhw6fDo28gZW0gRG9pcyBGYXRvcmVzICgyRkEpXG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiZm9udC1ib2R5LXNtIHRleHQtb24tc3VyZmFjZS12YXJpYW50IG10LTAuNVwiPlxuICAgICAgICAgICAgICAgICAgICAgIFJlcXVlciBjb25maXJtYcOnw6NvIG5vIEdvb2dsZSBBdXRoZW50aWNhdG9yIG91IGPDs2RpZ28gU01TIGFvIGNvbmVjdGFyIG5vdm9zIGNvbXB1dGFkb3JlcyBuYSByZWRlLlxuICAgICAgICAgICAgICAgICAgICA8L3A+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJweC0zIHB5LTEgcm91bmRlZC1mdWxsIGJnLXByaW1hcnktZml4ZWQgdGV4dC1vbi1wcmltYXJ5LWZpeGVkIGZvbnQtbGFiZWwtc20gZm9udC1ib2xkIHNocmluay0wXCI+XG4gICAgICAgICAgICAgICAgICBBdGl2b1xuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIGdhcC0yXCI+XG4gICAgICAgICAgICAgICAgPGg0IGNsYXNzTmFtZT1cImZvbnQtdGl0bGUtbWQgdGV4dC1vbi1zdXJmYWNlIGZvbnQtYm9sZFwiPlNlc3PDtWVzIEF0aXZhcyBlbSBEaXNwb3NpdGl2b3M8L2g0PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZS15LTJcIj5cbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93IGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzIwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LXByaW1hcnkgdGV4dC1bMjRweF1cIj5sYXB0b3BfbWFjPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtb24tc3VyZmFjZSBibG9ja1wiPkdvb2dsZSBDaHJvbWUgbm8gbWFjT1Mg4oCiIFPDo28gUGF1bG8sIEJyYXNpbDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtWzExcHhdIHRleHQtdGVydGlhcnkgZm9udC1jb2RlLXNtXCI+U2Vzc8OjbyBBdHVhbCDigKIgSVAgMTc3LjE4LjI5LjEwMjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInB4LTIgcHktMC41IHJvdW5kZWQgYmctZW1lcmFsZC0xMDAgdGV4dC1lbWVyYWxkLTgwMCB0ZXh0LVsxMXB4XSBmb250LWJvbGRcIj5BZ29yYTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInAtMyByb3VuZGVkLXhsIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvdyBib3JkZXIgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCBmbGV4IGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWJldHdlZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgdGV4dC1bMjRweF1cIj5zbWFydHBob25lPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LXNlbWlib2xkIHRleHQtb24tc3VyZmFjZSBibG9ja1wiPlJlZGUgT21uaSBBcHAgKEFuZHJvaWQpIOKAoiBTYW1zdW5nIEdhbGF4eSBTMjM8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LVsxMXB4XSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudCBmb250LWNvZGUtc21cIj7Dmmx0aW1vIGFjZXNzbzogSG9qZSDDoHMgMDg6MzA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2hvd1RvYXN0KFwiU2Vzc8OjbyBEZXNjb25lY3RhZGFcIiwgXCJEaXNwb3NpdGl2byBBbmRyb2lkIGRlc2xvZ2FkbyBjb20gc3VjZXNzby5cIiwgXCJpbmZvXCIpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRleHQtZXJyb3IgaG92ZXI6dW5kZXJsaW5lIHRleHQtbGFiZWwtc20gZm9udC1zZW1pYm9sZFwiXG4gICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICBEZXNjb25lY3RhclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInB0LTIgYm9yZGVyLXQgYm9yZGVyLW91dGxpbmUtdmFyaWFudC8yMCBmbGV4IGp1c3RpZnktZW5kXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzaG93VG9hc3QoXCJTZXNzw7VlcyBFbmNlcnJhZGFzXCIsIFwiVG9kYXMgYXMgb3V0cmFzIHNlc3PDtWVzIGZvcmFtIGludmFsaWRhZGFzLlwiLCBcInN1Y2Nlc3NcIil9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBiZy1zdXJmYWNlLWNvbnRhaW5lci1oaWdoIGhvdmVyOmJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2hlc3QgdGV4dC1vbi1zdXJmYWNlIGZvbnQtdGl0bGUtbWQgdHJhbnNpdGlvbi1hbGxcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIEVuY2VycmFyIFRvZGFzIGFzIE91dHJhcyBTZXNzw7Vlc1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvUmV2ZWFsLklmPlxuICAgICAgPC9SZXZlYWw+XG5cbiAgICAgIDxSZXZlYWwgd2hlbj17KCkgPT4gYWN0aXZlVGFiKCkgPT09IFwiZGFuZ2VyXCJ9PlxuICAgICAgICA8UmV2ZWFsLklmPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWF4LXctM3hsIGJnLXN1cmZhY2UtY29udGFpbmVyLWxvd2VzdCByb3VuZGVkLXhsIHAtNSBzaGFkb3ctc20gYm9yZGVyIGJvcmRlci1lcnJvci8zMCBmbGV4IGZsZXgtY29sIGdhcC00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGdhcC0yIHRleHQtZXJyb3JcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtc3ltYm9scy1vdXRsaW5lZCB0ZXh0LVsyOHB4XVwiPndhcm5pbmc8L3NwYW4+XG4gICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LWhlYWRsaW5lLW1kIGZvbnQtYm9sZFwiPlpvbmEgQ3LDrXRpY2EgZSBJcnJldmVyc8OtdmVsPC9oMz5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvZHktbWQgdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnQgbGVhZGluZy1yZWxheGVkXCI+XG4gICAgICAgICAgICAgIEFzIGHDp8O1ZXMgbmVzdGEgc2XDp8OjbyB0w6ptIGltcGFjdG8gaW1lZGlhdG8gc29icmUgYXMgb3BlcmHDp8O1ZXMgZG8gcmVzdGF1cmFudGUsIGNhbmNlbGFtZW50byBkZSBjYW5haXMgTWV0YVxuICAgICAgICAgICAgICBXaGF0c0FwcCwgZGVzdmluY3VsYcOnw6NvIGRhcyBjcmVkZW5jaWFpcyBkbyBpRm9vZCBlIHN1c3BlbnPDo28gZGUgd2ViaG9va3MgZG8gVG90dnMgUHJvdGhldXMuXG4gICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC00IHJvdW5kZWQteGwgYmctZXJyb3ItY29udGFpbmVyLzIwIGJvcmRlciBib3JkZXItZXJyb3ItY29udGFpbmVyIGZsZXggZmxleC1jb2wgc206ZmxleC1yb3cgc206aXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlbiBnYXAtNFwiPlxuICAgICAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgICAgIDxzdHJvbmcgY2xhc3NOYW1lPVwiZm9udC10aXRsZS1tZCB0ZXh0LW9uLXN1cmZhY2UgYmxvY2tcIj5EZXNjb25lY3RhciBIdWIgJiBFeGNsdWlyIFdvcmtzcGFjZTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZvbnQtYm9keS1zbSB0ZXh0LW9uLXN1cmZhY2UtdmFyaWFudFwiPlxuICAgICAgICAgICAgICAgICAgUmVtb3ZlIHBlcm1hbmVudGVtZW50ZSBsb2dzIGRlIGF0ZW5kaW1lbnRvLCBoaXN0w7NyaWNvIGRlIGNvbnZlcnNhcyBlIHJlZ3JhcyBhdXRvbWF0aXphZGFzLlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNldFNob3dEZWxldGVNb2RhbCh0cnVlKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBiZy1lcnJvciB0ZXh0LW9uLWVycm9yIGZvbnQtdGl0bGUtbWQgZm9udC1ib2xkIGhvdmVyOmJnLWVycm9yLzkwIHRyYW5zaXRpb24tYWxsIHNocmluay0wIHNoYWRvdy1zbVwiXG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICBFeGNsdWlyIFdvcmtzcGFjZVxuICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L1JldmVhbC5JZj5cbiAgICAgIDwvUmV2ZWFsPlxuXG4gICAgICA8UmV2ZWFsIHdoZW49eygpID0+IHNob3dEZWxldGVNb2RhbCgpfT5cbiAgICAgICAgPFJldmVhbC5JZj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZpeGVkIGluc2V0LTAgei1bODBdIGJnLWJsYWNrLzUwIGJhY2tkcm9wLWJsdXItc20gZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgcC00XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXN1cmZhY2UtY29udGFpbmVyLWxvd2VzdCByb3VuZGVkLTJ4bCBtYXgtdy1tZCB3LWZ1bGwgcC02IHNoYWRvdy0yeGwgYm9yZGVyIGJvcmRlci1lcnJvci80MCBmbGV4IGZsZXgtY29sIGdhcC00IGFuaW1hdGUtaW4gZmFkZS1pbiB6b29tLWluLTk1XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTMgdGV4dC1lcnJvclwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLXN5bWJvbHMtb3V0bGluZWQgdGV4dC1bMzJweF1cIj53YXJuaW5nPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJmb250LWhlYWRsaW5lLXNtIGZvbnQtYm9sZFwiPkNvbmZpcm1hciBFeGNsdXPDo288L2gzPlxuICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJmb250LWJvZHktc20gdGV4dC1vbi1zdXJmYWNlLXZhcmlhbnRcIj5cbiAgICAgICAgICAgICAgICBFc3RhIGHDp8OjbyDDqSA8c3Ryb25nPmRlZmluaXRpdmE8L3N0cm9uZz4uIFBhcmEgY29uZmlybWFyIHF1ZSBkZXNlamEgZGVzYXRpdmFyIG8gd29ya3NwYWNle1wiIFwifVxuICAgICAgICAgICAgICAgIDxzdHJvbmc+UmVkZSBKYXJkaW5zIFBhdWxpc3RhICgjODkyMSk8L3N0cm9uZz4sIGRpZ2l0ZXtcIiBcIn1cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmb250LW1vbm8gZm9udC1ib2xkIHRleHQtb24tc3VyZmFjZVwiPkVYQ0xVSVIgQ09OVEEgUkVERTwvc3Bhbj4gYWJhaXhvOlxuICAgICAgICAgICAgICA8L3A+XG5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHZhbHVlPXsoKSA9PiBkZWxldGVDb25maXJtYXRpb25UZXh0KCl9XG4gICAgICAgICAgICAgICAgb25JbnB1dD17KGV2ZW50KSA9PiBzZXREZWxldGVDb25maXJtYXRpb25UZXh0KGV2ZW50LmN1cnJlbnRUYXJnZXQudmFsdWUpfVxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwiRGlnaXRlIEVYQ0xVSVIgQ09OVEEgUkVERVwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicC0zIHJvdW5kZWQteGwgYmctc3VyZmFjZS1jb250YWluZXItbG93IGJvcmRlciBib3JkZXItb3V0bGluZS12YXJpYW50LzMwIHRleHQtb24tc3VyZmFjZSBmb250LW1vbm8gdGV4dC1zbSBvdXRsaW5lLW5vbmUgZm9jdXM6cmluZy0yIGZvY3VzOnJpbmctZXJyb3JcIlxuICAgICAgICAgICAgICAvPlxuXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1lbmQgZ2FwLTIgcHQtMlwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0U2hvd0RlbGV0ZU1vZGFsKGZhbHNlKX1cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiByb3VuZGVkLXhsIGJnLXN1cmZhY2UtY29udGFpbmVyLWhpZ2ggdGV4dC1vbi1zdXJmYWNlIGZvbnQtdGl0bGUtbWQgZm9udC1zZW1pYm9sZFwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgQ2FuY2VsYXJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2hhbmRsZURlbGV0ZUFjY291bnR9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgcm91bmRlZC14bCBiZy1lcnJvciB0ZXh0LW9uLWVycm9yIGZvbnQtdGl0bGUtbWQgZm9udC1ib2xkIGhvdmVyOmJnLWVycm9yLzkwIHRyYW5zaXRpb24tYWxsXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICBDb25maXJtYXIgZSBFeGNsdWlyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvUmV2ZWFsLklmPlxuICAgICAgPC9SZXZlYWw+XG4gICAgPC9kaXY+XG4gICk7XG59IiwiXG5pbXBvcnQgKiBhcyBjbGllbnRNb2R1bGUgZnJvbSBcIi4uLy4uLy4uLy4uL3NyYy9jb21wb25lbnRzL29tbmktaHViL2FjY291bnQtc2NyZWVuLnRzeFwiO1xuaW1wb3J0IHsgaHlkcmF0ZUNsaWVudENvbXBvbmVudHMgfSBmcm9tIFwiQGFkYXB0aXZlLWpzL3dlYlwiO1xuXG5oeWRyYXRlQ2xpZW50Q29tcG9uZW50cyhcImNvbXBvbmVudHMvb21uaS1odWIvYWNjb3VudC1zY3JlZW5cIiwgY2xpZW50TW9kdWxlKTtcbmV4cG9ydCB7fTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFNQSxNQUFNLGVBQXFJO0NBQ3pJO0VBQUUsSUFBSTtFQUFXLE9BQU87RUFBNkIsTUFBTTtDQUFTO0NBQ3BFO0VBQUUsSUFBSTtFQUFXLE9BQU87RUFBMEIsTUFBTTtDQUFjO0NBQ3RFO0VBQUUsSUFBSTtFQUFXLE9BQU87RUFBd0IsTUFBTTtDQUFjO0NBQ3BFO0VBQUUsSUFBSTtFQUFZLE9BQU87RUFBdUIsTUFBTTtDQUFTO0NBQy9EO0VBQUUsSUFBSTtFQUFVLE9BQU87RUFBZ0IsTUFBTTtFQUFXLFVBQVU7Q0FBSztBQUN6RTtBQUVBLE1BQU0sZ0JBQWdCO0NBQ3BCO0VBQUUsS0FBSztFQUFrQixLQUFLO0VBQWUsUUFBUTtFQUFRLElBQUk7RUFBYyxNQUFNO0NBQWE7Q0FDbEc7RUFBRSxLQUFLO0VBQW1CLEtBQUs7RUFBZSxRQUFRO0VBQVEsSUFBSTtFQUFjLE1BQU07Q0FBYTtDQUNuRztFQUFFLEtBQUs7RUFBaUIsS0FBSztFQUFlLFFBQVE7RUFBUSxJQUFJO0VBQWMsTUFBTTtDQUFhO0FBQ25HO0FBRUEsU0FBZ0IsZ0JBQWdCO0NBQzlCLE1BQU0sU0FBUyxVQUFVO0NBQ3pCLE1BQU0sQ0FBQyxXQUFXLGdCQUFnQixPQUFrRSxTQUFTO0NBRTdHLE1BQU0sQ0FBQyxVQUFVLGVBQWUsT0FBTyxlQUFlO0NBQ3RELE1BQU0sQ0FBQyxVQUFVLGVBQWUsT0FBTyxnQ0FBZ0M7Q0FDdkUsTUFBTSxDQUFDLE9BQU8sWUFBWSxPQUFPLDhCQUE4QjtDQUMvRCxNQUFNLENBQUMsVUFBVSxlQUFlLE9BQU8scUJBQXFCO0NBQzVELE1BQU0s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