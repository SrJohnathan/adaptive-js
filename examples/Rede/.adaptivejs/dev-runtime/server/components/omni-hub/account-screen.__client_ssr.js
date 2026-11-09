import { signal, useRouter } from "@adaptive-js/web";
import { USER_AVATAR, MAP_IMAGE_URL } from "../../shared/omni-hub/mock-data.js?t=1791414636356";
import { showToast } from "../../shared/omni-hub/toast-store.js?t=1791414636356";
import { SCREEN_ROUTES } from "../../shared/omni-hub/types.js?t=1791414636356";
import { Reveal } from "@adaptive-js/components";
import { jsx as _jsx, jsxs as _jsxs } from "@adaptive-js/web/jsx-runtime";
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
export function AccountScreen() {
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
		} else {
			showToast("Erro de Validação", "Digite exatamente \"EXCLUIR CONTA REDE\" para confirmar.", "error");
		}
	};
	return /* @__PURE__ */ _jsxs("div", {
		className: "p-4 sm:p-6 lg:p-8 flex flex-col gap-6 w-full max-w-[1440px] mx-auto",
		children: [
			/* @__PURE__ */ _jsxs("div", {
				className: "bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col md:flex-row md:items-center justify-between gap-4",
				children: [/* @__PURE__ */ _jsxs("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ _jsx("div", {
						className: "w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-primary-container flex items-center justify-center text-on-primary shadow-md",
						children: /* @__PURE__ */ _jsx("span", {
							className: "material-symbols-outlined text-[32px]",
							children: "domain"
						})
					}), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ _jsx("h1", {
							className: "font-headline-lg text-on-surface font-bold",
							children: "Rede Jardins Paulista"
						}), /* @__PURE__ */ _jsx("span", {
							className: "px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm font-bold",
							children: "Enterprise Ativo"
						})]
					}), /* @__PURE__ */ _jsx("p", {
						className: "text-on-surface-variant font-body-sm mt-0.5",
						children: "Workspace ID #8921 • 12 Operadores Ativos • Totvs Protheus & iFood Conectados"
					})] })]
				}), /* @__PURE__ */ _jsxs("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ _jsxs("button", {
						type: "button",
						onClick: () => router.push(SCREEN_ROUTES["catalogo-erp"]),
						className: "px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md transition-all flex items-center gap-1.5",
						children: [/* @__PURE__ */ _jsx("span", {
							className: "material-symbols-outlined text-[18px]",
							children: "sync_alt"
						}), /* @__PURE__ */ _jsx("span", { children: "Ver Integrações ERP" })]
					}), /* @__PURE__ */ _jsxs("button", {
						type: "button",
						onClick: () => router.push(SCREEN_ROUTES["autenticacao"]),
						className: "px-3.5 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-title-md transition-all flex items-center gap-1.5 border border-outline-variant/20",
						children: [/* @__PURE__ */ _jsx("span", {
							className: "material-symbols-outlined text-[18px]",
							children: "lock"
						}), /* @__PURE__ */ _jsx("span", { children: "Trocar Usuário" })]
					})]
				})]
			}),
			/* @__PURE__ */ _jsx("div", {
				className: "flex border-b border-outline-variant/20 overflow-x-auto text-nowrap scrollbar-none gap-2",
				children: ACCOUNT_TABS.map((tab) => /* @__PURE__ */ _jsxs("button", {
					type: "button",
					onClick: () => setActiveTab(tab.id),
					className: () => activeTab() === tab.id ? tab.isDanger ? "pb-3 px-4 flex items-center gap-2 font-title-md border-b-2 transition-all border-error text-error font-bold" : "pb-3 px-4 flex items-center gap-2 font-title-md border-b-2 transition-all border-primary text-primary font-bold" : "pb-3 px-4 flex items-center gap-2 font-title-md border-b-2 transition-all border-transparent text-on-surface-variant hover:text-on-surface",
					children: [/* @__PURE__ */ _jsx("span", {
						className: () => `material-symbols-outlined text-[20px] ${activeTab() === tab.id ? tab.isDanger ? "text-error" : "text-primary" : "text-on-surface-variant"}`,
						children: tab.icon
					}), /* @__PURE__ */ _jsx("span", { children: tab.label })]
				}, tab.id))
			}),
			/* @__PURE__ */ _jsx(Reveal, {
				when: () => activeTab() === "profile",
				children: /* @__PURE__ */ _jsx(Reveal.If, { children: /* @__PURE__ */ _jsxs("form", {
					onSubmit: (event) => {
						event.preventDefault();
						showToast("Perfil Atualizado", "As informações pessoais e de contato foram salvas.", "success");
					},
					className: "grid grid-cols-1 lg:grid-cols-3 gap-6 items-start",
					children: [/* @__PURE__ */ _jsxs("div", {
						className: "bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col items-center text-center gap-3",
						children: [
							/* @__PURE__ */ _jsxs("div", {
								className: "relative group cursor-pointer",
								children: [/* @__PURE__ */ _jsx("img", {
									src: USER_AVATAR,
									alt: "Mariana Silva",
									className: "w-28 h-28 rounded-full object-cover ring-4 ring-primary/20 shadow-md"
								}), /* @__PURE__ */ _jsx("div", {
									onClick: () => showToast("Foto de Perfil", "Selecione uma imagem JPG ou PNG de até 5MB.", "info"),
									className: "absolute inset-0 rounded-full bg-black/40 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity",
									children: /* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[24px]",
										children: "photo_camera"
									})
								})]
							}),
							/* @__PURE__ */ _jsxs("div", { children: [
								/* @__PURE__ */ _jsx("h3", {
									className: "font-headline-sm text-on-surface font-bold",
									children: "Mariana Silva"
								}),
								/* @__PURE__ */ _jsx("span", {
									className: "font-body-sm text-on-surface-variant",
									children: "Atendimento & Operações Sênior"
								}),
								/* @__PURE__ */ _jsxs("div", {
									className: "mt-2 flex items-center justify-center gap-1.5",
									children: [/* @__PURE__ */ _jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }), /* @__PURE__ */ _jsx("span", {
										className: "font-label-sm text-tertiary font-semibold",
										children: "Conta Verificada Meta"
									})]
								})
							] }),
							/* @__PURE__ */ _jsx("button", {
								type: "button",
								onClick: () => showToast("Alterar Foto", "Upload de imagem concluído com sucesso!"),
								className: "w-full mt-2 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-title-md transition-colors border border-outline-variant/20",
								children: "Alterar Foto de Perfil"
							})
						]
					}), /* @__PURE__ */ _jsxs("div", {
						className: "lg:col-span-2 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-4",
						children: [
							/* @__PURE__ */ _jsx("h3", {
								className: "font-headline-md text-on-surface font-bold",
								children: "Informações do Operador"
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [
									/* @__PURE__ */ _jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ _jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "Nome Completo"
										}), /* @__PURE__ */ _jsx("input", {
											type: "text",
											value: () => fullName(),
											onInput: (event) => setFullName(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none focus:ring-2 focus:ring-primary/20"
										})]
									}),
									/* @__PURE__ */ _jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ _jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "Cargo na Operação"
										}), /* @__PURE__ */ _jsx("input", {
											type: "text",
											value: () => jobTitle(),
											onInput: (event) => setJobTitle(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none focus:ring-2 focus:ring-primary/20"
										})]
									}),
									/* @__PURE__ */ _jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ _jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "E-mail Corporativo"
										}), /* @__PURE__ */ _jsx("input", {
											type: "email",
											value: () => email(),
											onInput: (event) => setEmail(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none focus:ring-2 focus:ring-primary/20"
										})]
									}),
									/* @__PURE__ */ _jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ _jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "WhatsApp de Segurança 2FA"
										}), /* @__PURE__ */ _jsx("input", {
											type: "text",
											value: () => phone2fa(),
											onInput: (event) => setPhone2fa(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none focus:ring-2 focus:ring-primary/20"
										})]
									}),
									/* @__PURE__ */ _jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ _jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "Fuso Horário"
										}), /* @__PURE__ */ _jsxs("select", {
											value: () => timezone(),
											onChange: (event) => setTimezone(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none focus:ring-2 focus:ring-primary/20",
											children: [
												/* @__PURE__ */ _jsx("option", {
													value: "America/Sao_Paulo (GMT-3)",
													children: "America/Sao_Paulo (GMT-3)"
												}),
												/* @__PURE__ */ _jsx("option", {
													value: "America/Manaus (GMT-4)",
													children: "America/Manaus (GMT-4)"
												}),
												/* @__PURE__ */ _jsx("option", {
													value: "America/Belem (GMT-3)",
													children: "America/Belem (GMT-3)"
												})
											]
										})]
									}),
									/* @__PURE__ */ _jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ _jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "Idioma da Interface"
										}), /* @__PURE__ */ _jsxs("select", {
											value: () => language(),
											onChange: (event) => setLanguage(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none focus:ring-2 focus:ring-primary/20",
											children: [
												/* @__PURE__ */ _jsx("option", {
													value: "Português (Brasil)",
													children: "Português (Brasil)"
												}),
												/* @__PURE__ */ _jsx("option", {
													value: "English (US)",
													children: "English (US)"
												}),
												/* @__PURE__ */ _jsx("option", {
													value: "Español",
													children: "Español"
												})
											]
										})]
									})
								]
							}),
							/* @__PURE__ */ _jsx("div", {
								className: "pt-3 border-t border-outline-variant/20 flex justify-end",
								children: /* @__PURE__ */ _jsx("button", {
									type: "submit",
									className: "px-6 py-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-md font-bold transition-all shadow-sm active:scale-95",
									children: "Salvar Alterações"
								})
							})
						]
					})]
				}) })
			}),
			/* @__PURE__ */ _jsx(Reveal, {
				when: () => activeTab() === "address",
				children: /* @__PURE__ */ _jsx(Reveal.If, { children: /* @__PURE__ */ _jsxs("form", {
					onSubmit: (event) => {
						event.preventDefault();
						showToast("Endereço Salvo", "Dados fiscais e endereço da sede atualizados com sucesso.", "success");
					},
					className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",
					children: [/* @__PURE__ */ _jsxs("div", {
						className: "lg:col-span-7 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-4",
						children: [
							/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ _jsx("h3", {
									className: "font-headline-md text-on-surface font-bold",
									children: "Dados da Filial & Sede Fiscal"
								}), /* @__PURE__ */ _jsx("span", {
									className: "px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-code-sm font-bold",
									children: "CNPJ Ativo"
								})]
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
								children: [
									/* @__PURE__ */ _jsxs("div", {
										className: "sm:col-span-2 flex flex-col gap-1.5",
										children: [/* @__PURE__ */ _jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "Razão Social"
										}), /* @__PURE__ */ _jsx("input", {
											type: "text",
											value: () => razaoSocial(),
											onInput: (event) => setRazaoSocial(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none"
										})]
									}),
									/* @__PURE__ */ _jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ _jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "CNPJ da Filial"
										}), /* @__PURE__ */ _jsx("input", {
											type: "text",
											value: () => cnpj(),
											onInput: (event) => setCnpj(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-code-sm outline-none"
										})]
									}),
									/* @__PURE__ */ _jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ _jsxs("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ _jsx("label", {
												className: "font-label-md text-on-surface font-semibold",
												children: "CEP"
											}), /* @__PURE__ */ _jsx("button", {
												type: "button",
												onClick: handleLookupCep,
												className: "text-primary hover:underline text-[11px] font-bold",
												children: "Buscar Correios"
											})]
										}), /* @__PURE__ */ _jsxs("div", {
											className: "flex items-center gap-2",
											children: [/* @__PURE__ */ _jsx("input", {
												type: "text",
												value: () => cep(),
												onInput: (event) => setCep(event.currentTarget.value),
												className: "flex-1 p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-code-sm outline-none"
											}), /* @__PURE__ */ _jsx("button", {
												type: "button",
												onClick: handleLookupCep,
												className: "px-3 py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container text-on-surface text-body-sm font-semibold",
												children: "Buscar"
											})]
										})]
									}),
									/* @__PURE__ */ _jsxs("div", {
										className: "sm:col-span-2 flex flex-col gap-1.5",
										children: [/* @__PURE__ */ _jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "Logradouro"
										}), /* @__PURE__ */ _jsx("input", {
											type: "text",
											value: () => street(),
											onInput: (event) => setStreet(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none"
										})]
									}),
									/* @__PURE__ */ _jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ _jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "Número"
										}), /* @__PURE__ */ _jsx("input", {
											type: "text",
											value: () => number(),
											onInput: (event) => setNumber(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none"
										})]
									}),
									/* @__PURE__ */ _jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ _jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "Complemento"
										}), /* @__PURE__ */ _jsx("input", {
											type: "text",
											value: () => complement(),
											onInput: (event) => setComplement(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none"
										})]
									}),
									/* @__PURE__ */ _jsxs("div", {
										className: "flex flex-col gap-1.5",
										children: [/* @__PURE__ */ _jsx("label", {
											className: "font-label-md text-on-surface font-semibold",
											children: "Bairro"
										}), /* @__PURE__ */ _jsx("input", {
											type: "text",
											value: () => neighborhood(),
											onInput: (event) => setNeighborhood(event.currentTarget.value),
											className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none"
										})]
									}),
									/* @__PURE__ */ _jsxs("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ _jsxs("div", {
											className: "flex-1 flex flex-col gap-1.5",
											children: [/* @__PURE__ */ _jsx("label", {
												className: "font-label-md text-on-surface font-semibold",
												children: "Cidade"
											}), /* @__PURE__ */ _jsx("input", {
												type: "text",
												value: () => city(),
												onInput: (event) => setCity(event.currentTarget.value),
												className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none"
											})]
										}), /* @__PURE__ */ _jsxs("div", {
											className: "w-20 flex flex-col gap-1.5",
											children: [/* @__PURE__ */ _jsx("label", {
												className: "font-label-md text-on-surface font-semibold",
												children: "UF"
											}), /* @__PURE__ */ _jsx("input", {
												type: "text",
												value: () => state(),
												onInput: (event) => setState(event.currentTarget.value),
												className: "p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-on-surface font-body-sm outline-none text-center font-bold"
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ _jsx("div", {
								className: "pt-3 border-t border-outline-variant/20 flex justify-end",
								children: /* @__PURE__ */ _jsx("button", {
									type: "submit",
									className: "px-6 py-2.5 rounded-xl bg-primary-container hover:bg-primary text-on-primary font-title-md font-bold transition-all shadow-sm",
									children: "Salvar Endereço Fiscal"
								})
							})
						]
					}), /* @__PURE__ */ _jsxs("div", {
						className: "lg:col-span-5 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-3",
						children: [
							/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ _jsxs("span", {
									className: "font-title-md text-on-surface font-bold flex items-center gap-1.5",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "material-symbols-outlined text-[20px] text-primary",
										children: "pin_drop"
									}), "Raio de Entrega iFood & Logística"]
								}), /* @__PURE__ */ _jsx("span", {
									className: "font-code-sm text-[11px] text-tertiary font-bold",
									children: "Raio 7.5 km"
								})]
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "relative w-full aspect-video sm:aspect-square max-h-80 rounded-xl overflow-hidden border border-outline-variant/20 shadow-inner group",
								children: [
									/* @__PURE__ */ _jsx("img", {
										src: MAP_IMAGE_URL,
										alt: "Mapa da Região Jardins",
										className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									}),
									/* @__PURE__ */ _jsx("div", { className: "absolute inset-0 bg-primary/10 pointer-events-none" }),
									/* @__PURE__ */ _jsxs("div", {
										className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center",
										children: [/* @__PURE__ */ _jsx("span", { className: "w-4 h-4 rounded-full bg-primary ring-4 ring-primary/30 animate-ping" }), /* @__PURE__ */ _jsxs("div", {
											className: "bg-surface-container-lowest text-primary px-3 py-1 rounded-full shadow-lg font-headline-sm font-bold mt-1 text-nowrap flex items-center gap-1",
											children: [/* @__PURE__ */ _jsx("span", {
												className: "material-symbols-outlined text-[16px]",
												children: "restaurant"
											}), "Hub Jardins Paulista"]
										})]
									})
								]
							}),
							/* @__PURE__ */ _jsx("p", {
								className: "font-body-sm text-on-surface-variant",
								children: "Endereço sincronizado com o raio de despacho do iFood Jardins e emissão automática de DANFE via Bling / Totvs."
							})
						]
					})]
				}) })
			}),
			/* @__PURE__ */ _jsx(Reveal, {
				when: () => activeTab() === "billing",
				children: /* @__PURE__ */ _jsx(Reveal.If, { children: /* @__PURE__ */ _jsxs("div", {
					className: "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start",
					children: [/* @__PURE__ */ _jsxs("div", {
						className: "lg:col-span-5 bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-4",
						children: [
							/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("span", {
									className: "font-label-sm uppercase tracking-wider text-on-surface-variant font-bold",
									children: "Plano Contratado"
								}), /* @__PURE__ */ _jsx("h3", {
									className: "font-headline-lg text-on-surface font-extrabold mt-0.5",
									children: "Enterprise Pro"
								})] }), /* @__PURE__ */ _jsxs("div", {
									className: "text-right",
									children: [/* @__PURE__ */ _jsx("span", {
										className: "font-headline-lg text-primary font-bold",
										children: "R$ 1.490"
									}), /* @__PURE__ */ _jsx("span", {
										className: "text-[11px] text-on-surface-variant block",
										children: "/mês • Faturamento Totvs"
									})]
								})]
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "space-y-3 pt-2 border-t border-outline-variant/20",
								children: [
									/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsxs("div", {
										className: "flex justify-between font-label-md text-on-surface mb-1",
										children: [/* @__PURE__ */ _jsx("span", { children: "Sessões Meta WhatsApp Cloud API" }), /* @__PURE__ */ _jsx("strong", {
											className: "font-code-sm",
											children: "42.890 / 60.000 (71%)"
										})]
									}), /* @__PURE__ */ _jsx("div", {
										className: "w-full bg-surface-container-high h-2 rounded-full overflow-hidden",
										children: /* @__PURE__ */ _jsx("div", { className: "bg-primary-container h-full w-[71%]" })
									})] }),
									/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsxs("div", {
										className: "flex justify-between font-label-md text-on-surface mb-1",
										children: [/* @__PURE__ */ _jsx("span", { children: "IA Copilot & Geração de Criativos" }), /* @__PURE__ */ _jsx("strong", {
											className: "font-code-sm",
											children: "18.420 / 25.000 req (73%)"
										})]
									}), /* @__PURE__ */ _jsx("div", {
										className: "w-full bg-surface-container-high h-2 rounded-full overflow-hidden",
										children: /* @__PURE__ */ _jsx("div", { className: "bg-secondary-container h-full w-[73%]" })
									})] }),
									/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsxs("div", {
										className: "flex justify-between font-label-md text-on-surface mb-1",
										children: [/* @__PURE__ */ _jsx("span", { children: "Armazenamento de Imagens em Nuvem" }), /* @__PURE__ */ _jsx("strong", {
											className: "font-code-sm",
											children: "14.2 GB / 50 GB"
										})]
									}), /* @__PURE__ */ _jsx("div", {
										className: "w-full bg-surface-container-high h-2 rounded-full overflow-hidden",
										children: /* @__PURE__ */ _jsx("div", { className: "bg-tertiary-container h-full w-[28%]" })
									})] })
								]
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "p-3 bg-surface-container-low rounded-xl border border-outline-variant/20",
								children: [/* @__PURE__ */ _jsx("span", {
									className: "text-[11px] font-bold text-on-surface-variant uppercase tracking-wider block mb-2",
									children: "Tráfego nos Últimos 7 Dias (Msgs & Pedidos)"
								}), /* @__PURE__ */ _jsx("svg", {
									className: "w-full h-12 text-primary",
									viewBox: "0 0 100 25",
									preserveAspectRatio: "none",
									children: /* @__PURE__ */ _jsx("path", {
										d: "M0,20 L15,16 L30,19 L45,10 L60,12 L75,4 L90,8 L100,2",
										fill: "none",
										stroke: "currentColor",
										strokeWidth: "2.5"
									})
								})]
							}),
							/* @__PURE__ */ _jsx("button", {
								type: "button",
								onClick: () => showToast("Upgrade de Plano", "Nossa equipe de contas corporativas entrará em contato para expandir o plano Enterprise.", "info"),
								className: "w-full py-2.5 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary font-title-md font-bold transition-all text-center",
								children: "Fazer Upgrade de Capacidade"
							})
						]
					}), /* @__PURE__ */ _jsxs("div", {
						className: "lg:col-span-7 flex flex-col gap-4",
						children: [/* @__PURE__ */ _jsxs("div", {
							className: "bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-3",
							children: [/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ _jsx("h4", {
									className: "font-title-lg text-on-surface font-bold",
									children: "Métodos de Pagamento Corporativos"
								}), /* @__PURE__ */ _jsx("button", {
									type: "button",
									onClick: () => showToast("Adicionar Cartão", "Formulário de cadastro de cartão de crédito corporativo.", "info"),
									className: "text-primary text-[12px] font-bold hover:underline",
									children: "+ Novo Método"
								})]
							}), /* @__PURE__ */ _jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ _jsxs("div", {
									className: "flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-primary/30",
									children: [/* @__PURE__ */ _jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[28px] text-primary",
											children: "credit_card"
										}), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("span", {
											className: "font-title-md text-on-surface font-bold block",
											children: "Mastercard Corporativo •••• 8824"
										}), /* @__PURE__ */ _jsx("span", {
											className: "font-body-sm text-[11px] text-on-surface-variant",
											children: "Expira em 08/2028 • Débito automático ativo"
										})] })]
									}), /* @__PURE__ */ _jsx("span", {
										className: "px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-[11px] font-bold",
										children: "Padrão"
									})]
								}), /* @__PURE__ */ _jsxs("div", {
									className: "flex items-center justify-between p-3 rounded-xl bg-surface-container-low border border-outline-variant/20",
									children: [/* @__PURE__ */ _jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-[28px] text-tertiary",
											children: "pix"
										}), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("span", {
											className: "font-title-md text-on-surface font-bold block",
											children: "PIX Automático & Boleto DDA"
										}), /* @__PURE__ */ _jsx("span", {
											className: "font-body-sm text-[11px] text-on-surface-variant",
											children: "Banco Itaú Empresas • CNPJ 42.189.330/0001-44"
										})] })]
									}), /* @__PURE__ */ _jsx("span", {
										className: "text-on-surface-variant text-[11px]",
										children: "Reserva"
									})]
								})]
							})]
						}), /* @__PURE__ */ _jsxs("div", {
							className: "bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-3",
							children: [/* @__PURE__ */ _jsx("h4", {
								className: "font-title-lg text-on-surface font-bold",
								children: "Últimas Faturas & Notas Fiscais"
							}), /* @__PURE__ */ _jsx("div", {
								className: "divide-y divide-outline-variant/15 font-body-sm",
								children: INVOICE_ITEMS.map((item) => /* @__PURE__ */ _jsxs("div", {
									className: "py-2.5 flex items-center justify-between",
									children: [/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("span", {
										className: "font-semibold text-on-surface block",
										children: item.ref
									}), /* @__PURE__ */ _jsxs("span", {
										className: "text-[11px] text-on-surface-variant font-code-sm",
										children: [
											item.nf,
											" • Pago em ",
											item.date
										]
									})] }), /* @__PURE__ */ _jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ _jsx("span", {
											className: "font-title-md font-bold text-on-surface",
											children: item.val
										}), /* @__PURE__ */ _jsx("button", {
											type: "button",
											onClick: () => showToast("Download NF-e", `Baixando arquivo PDF da ${item.nf}...`, "success"),
											className: "p-1.5 rounded-lg hover:bg-surface-container text-primary transition-colors",
											title: "Baixar Nota Fiscal em PDF",
											children: /* @__PURE__ */ _jsx("span", {
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
			/* @__PURE__ */ _jsx(Reveal, {
				when: () => activeTab() === "security",
				children: /* @__PURE__ */ _jsx(Reveal.If, { children: /* @__PURE__ */ _jsxs("div", {
					className: "max-w-3xl bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-outline-variant/20 flex flex-col gap-5",
					children: [
						/* @__PURE__ */ _jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("h3", {
								className: "font-headline-md text-on-surface font-bold",
								children: "Segurança Corporativa & Acesso"
							}), /* @__PURE__ */ _jsx("p", {
								className: "font-body-sm text-on-surface-variant",
								children: "Proteja o acesso à sua conta de atendimento, catálogo e credenciais de webhooks."
							})] }), /* @__PURE__ */ _jsx("span", {
								className: "px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-label-sm font-bold",
								children: "Proteção Alta"
							})]
						}),
						/* @__PURE__ */ _jsxs("div", {
							className: "p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start justify-between gap-4",
							children: [/* @__PURE__ */ _jsxs("div", {
								className: "flex items-start gap-3",
								children: [/* @__PURE__ */ _jsx("span", {
									className: "material-symbols-outlined text-primary text-[28px]",
									children: "verified_user"
								}), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("span", {
									className: "font-title-md text-on-surface font-bold block",
									children: "Autenticação em Dois Fatores (2FA)"
								}), /* @__PURE__ */ _jsx("p", {
									className: "font-body-sm text-on-surface-variant mt-0.5",
									children: "Requer confirmação no Google Authenticator ou código SMS ao conectar novos computadores na rede."
								})] })]
							}), /* @__PURE__ */ _jsx("span", {
								className: "px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm font-bold shrink-0",
								children: "Ativo"
							})]
						}),
						/* @__PURE__ */ _jsxs("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ _jsx("h4", {
								className: "font-title-md text-on-surface font-bold",
								children: "Sessões Ativas em Dispositivos"
							}), /* @__PURE__ */ _jsxs("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ _jsxs("div", {
									className: "p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between",
									children: [/* @__PURE__ */ _jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-primary text-[24px]",
											children: "laptop_mac"
										}), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("span", {
											className: "font-semibold text-on-surface block",
											children: "Google Chrome no macOS • São Paulo, Brasil"
										}), /* @__PURE__ */ _jsx("span", {
											className: "text-[11px] text-tertiary font-code-sm",
											children: "Sessão Atual • IP 177.18.29.102"
										})] })]
									}), /* @__PURE__ */ _jsx("span", {
										className: "px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[11px] font-bold",
										children: "Agora"
									})]
								}), /* @__PURE__ */ _jsxs("div", {
									className: "p-3 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between",
									children: [/* @__PURE__ */ _jsxs("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ _jsx("span", {
											className: "material-symbols-outlined text-on-surface-variant text-[24px]",
											children: "smartphone"
										}), /* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("span", {
											className: "font-semibold text-on-surface block",
											children: "Rede Omni App (Android) • Samsung Galaxy S23"
										}), /* @__PURE__ */ _jsx("span", {
											className: "text-[11px] text-on-surface-variant font-code-sm",
											children: "Último acesso: Hoje às 08:30"
										})] })]
									}), /* @__PURE__ */ _jsx("button", {
										type: "button",
										onClick: () => showToast("Sessão Desconectada", "Dispositivo Android deslogado com sucesso.", "info"),
										className: "text-error hover:underline text-label-sm font-semibold",
										children: "Desconectar"
									})]
								})]
							})]
						}),
						/* @__PURE__ */ _jsx("div", {
							className: "pt-2 border-t border-outline-variant/20 flex justify-end",
							children: /* @__PURE__ */ _jsx("button", {
								type: "button",
								onClick: () => showToast("Sessões Encerradas", "Todas as outras sessões foram invalidadas.", "success"),
								className: "px-4 py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-title-md transition-all",
								children: "Encerrar Todas as Outras Sessões"
							})
						})
					]
				}) })
			}),
			/* @__PURE__ */ _jsx(Reveal, {
				when: () => activeTab() === "danger",
				children: /* @__PURE__ */ _jsx(Reveal.If, { children: /* @__PURE__ */ _jsxs("div", {
					className: "max-w-3xl bg-surface-container-lowest rounded-xl p-5 shadow-sm border border-error/30 flex flex-col gap-4",
					children: [
						/* @__PURE__ */ _jsxs("div", {
							className: "flex items-center gap-2 text-error",
							children: [/* @__PURE__ */ _jsx("span", {
								className: "material-symbols-outlined text-[28px]",
								children: "warning"
							}), /* @__PURE__ */ _jsx("h3", {
								className: "font-headline-md font-bold",
								children: "Zona Crítica e Irreversível"
							})]
						}),
						/* @__PURE__ */ _jsx("p", {
							className: "font-body-md text-on-surface-variant leading-relaxed",
							children: "As ações nesta seção têm impacto imediato sobre as operações do restaurante, cancelamento de canais Meta WhatsApp, desvinculação das credenciais do iFood e suspensão de webhooks do Totvs Protheus."
						}),
						/* @__PURE__ */ _jsxs("div", {
							className: "p-4 rounded-xl bg-error-container/20 border border-error-container flex flex-col sm:flex-row sm:items-center justify-between gap-4",
							children: [/* @__PURE__ */ _jsxs("div", { children: [/* @__PURE__ */ _jsx("strong", {
								className: "font-title-md text-on-surface block",
								children: "Desconectar Hub & Excluir Workspace"
							}), /* @__PURE__ */ _jsx("span", {
								className: "font-body-sm text-on-surface-variant",
								children: "Remove permanentemente logs de atendimento, histórico de conversas e regras automatizadas."
							})] }), /* @__PURE__ */ _jsx("button", {
								type: "button",
								onClick: () => setShowDeleteModal(true),
								className: "px-4 py-2 rounded-xl bg-error text-on-error font-title-md font-bold hover:bg-error/90 transition-all shrink-0 shadow-sm",
								children: "Excluir Workspace"
							})]
						})
					]
				}) })
			}),
			/* @__PURE__ */ _jsx(Reveal, {
				when: () => showDeleteModal(),
				children: /* @__PURE__ */ _jsx(Reveal.If, { children: /* @__PURE__ */ _jsx("div", {
					className: "fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4",
					children: /* @__PURE__ */ _jsxs("div", {
						className: "bg-surface-container-lowest rounded-2xl max-w-md w-full p-6 shadow-2xl border border-error/40 flex flex-col gap-4 animate-in fade-in zoom-in-95",
						children: [
							/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center gap-3 text-error",
								children: [/* @__PURE__ */ _jsx("span", {
									className: "material-symbols-outlined text-[32px]",
									children: "warning"
								}), /* @__PURE__ */ _jsx("h3", {
									className: "font-headline-sm font-bold",
									children: "Confirmar Exclusão"
								})]
							}),
							/* @__PURE__ */ _jsxs("p", {
								className: "font-body-sm text-on-surface-variant",
								children: [
									"Esta ação é ",
									/* @__PURE__ */ _jsx("strong", { children: "definitiva" }),
									". Para confirmar que deseja desativar o workspace",
									" ",
									/* @__PURE__ */ _jsx("strong", { children: "Rede Jardins Paulista (#8921)" }),
									", digite",
									" ",
									/* @__PURE__ */ _jsx("span", {
										className: "font-mono font-bold text-on-surface",
										children: "EXCLUIR CONTA REDE"
									}),
									" abaixo:"
								]
							}),
							/* @__PURE__ */ _jsx("input", {
								type: "text",
								value: () => deleteConfirmationText(),
								onInput: (event) => setDeleteConfirmationText(event.currentTarget.value),
								placeholder: "Digite EXCLUIR CONTA REDE",
								className: "p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-on-surface font-mono text-sm outline-none focus:ring-2 focus:ring-error"
							}),
							/* @__PURE__ */ _jsxs("div", {
								className: "flex items-center justify-end gap-2 pt-2",
								children: [/* @__PURE__ */ _jsx("button", {
									type: "button",
									onClick: () => setShowDeleteModal(false),
									className: "px-4 py-2 rounded-xl bg-surface-container-high text-on-surface font-title-md font-semibold",
									children: "Cancelar"
								}), /* @__PURE__ */ _jsx("button", {
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

//# sourceMappingURL=account-screen.__client_ssr.js.map
