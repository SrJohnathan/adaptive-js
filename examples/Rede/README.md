# Rede

Projeto AdaptiveJS — front mínimo de uma mini rede social com inspiração em X e vibe de Orkut, com SSR, hidratação DOM-first, reatividade fine-grained, roteamento por arquivos e Tailwind.

## Stack

- **Framework:** [AdaptiveJS](https://github.com/antonioweb/adaptivejs) (`@adaptive-js/*`)
- **Linguagem:** TypeScript + TSX
- **Runtime web:** `@adaptive-js/web`
- **UI:** Tailwind CSS
- **Build / dev:** `@adaptive-js/ci`
- **Deploy SSR:** `@adaptive-js/adapter-nitro`
- **Extensões locais:** auth, i18n, ícones animados

Por enquanto o feed usa dados mockados no front. O backend ficara para uma fase seguinte, em microsservicos Rust.

## Começar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Outros scripts:

```bash
npm run build     # build de produção
npm run preview   # preview do build
npm run start     # sobe o server de produção
npm run typecheck
```

## Estrutura

```txt
Rede/
  dependency.ts          # entry client global (libs, tema, side effects)
  index.html             # shell HTML
  public/
    styles.css           # CSS global (Tailwind / BeerCSS / plain)
  src/
    features/
      feed/              # timeline, composer e dados mockados
      layout/            # shell da aplicacao
      theme/             # controlador claro/escuro inspirado no exemplo hello2
    pages/
      index.tsx          # rota /
      explorar.tsx       # rota /explorar
      404.tsx            # página HTTP 404 customizada
    shared/
      types.ts           # contratos compartilhados do front
    auth.ts              # auth server-side (se extensão auth)
    i18n.ts              # i18n (se extensão i18n)
  language/              # JSON de idiomas (se extensão i18n)
  AGENTS.md              # guia para agentes / LLMs
```

### Rotas

Arquivos em `src/pages` viram rotas automaticamente:

| Arquivo | Rota |
|---|---|
| `src/pages/index.tsx` | `/` |
| `src/pages/about.tsx` | `/about` |
| `src/pages/dashboard/index.tsx` | `/dashboard` |
| `src/pages/404.tsx` | página 404 (não é rota normal) |

### Modos de execução

- **`server`** — lógica só no servidor (actions, helpers)
- **`hydrate`** — HTML no server + interatividade no client
- **`client`** — monta direto no browser

## Extensões (opcionais)

Se o scaffold incluiu extensões:

| Extensão | Pacote | Uso típico |
|---|---|---|
| auth | `@adaptive-js/extension-auth` | sessões, `protectPage`, CSRF |
| i18n | `@adaptive-js/extension-i18n` | traduções reativas |
| icons | `@adaptive-js/extension-lucide-animation-icons` | ícones animados |

## Documentação para agentes

- [`AGENTS.md`](./AGENTS.md) — primeiros passos e trilha de SaaS
- [`.cursor/skills/adaptivejs/SKILL.md`](./.cursor/skills/adaptivejs/SKILL.md) — APIs AdaptiveJS com exemplos de código


## Licença

MIT (herdada do AdaptiveJS, salvo indicação contrária no seu projeto).
