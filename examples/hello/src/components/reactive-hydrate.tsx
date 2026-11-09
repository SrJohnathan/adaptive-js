'hydrate'

import { batch, events, isSSR, memo, signal, store } from "@adaptive-js/web"

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
  const [ligado, setLigado] = signal(true)

  return (
    <div data-teste="hydrate-ternario">
      <h3>1. Ternário</h3>
      <p data-valor={() => (ligado() ? "SIM" : "NAO")}>
        resultado: {() => (ligado() ? "ramo verdadeiro" : "ramo falso")}
      </p>
      <button onClick={() => setLigado(!ligado())}>alternar</button>
      <button onClick={() => setLigado(true)}>reset</button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 2. Lista com .map
// ---------------------------------------------------------------------------

export const HydrateListaMap = () => {
  const [itens, setItens] = signal<string[]>(["alpha", "beta", "gamma"])

  const adicionar = (nome: string) => setItens([...itens(), nome])
  const remover = (i: number) => setItens(itens().filter((_, idx) => idx !== i))

  return (
    <div data-teste="hydrate-lista">
      <h3>2. Lista com map</h3>
      <span data-total={() => itens().length}>total: {() => itens().length}</span>
      <ul>
        {() => itens().map((item, i) => (
          <li key={item} data-item={item}>
            {i}: {item}
            <button onClick={() => remover(i)}>remover</button>
          </li>
        ))}
      </ul>
      <button onClick={() => adicionar("item-" + (itens().length + 1))}>
        adicionar
      </button>
      <button onClick={() => setItens([])}>limpar</button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 3. Reordenar — o teste que mais revela key errada em hydration
// ---------------------------------------------------------------------------

export const HydrateListaReorder = () => {
  const [nomes, setNomes] = signal(["Ana", "Bruno", "Carla"])

  return (
    <div data-teste="hydrate-reorder">
      <h3>3. Reordenar lista</h3>
      <ul>
        {() => nomes().map((nome, i) => (
          <li key={nome} data-nome={nome}>
            {i}: {nome}
          </li>
        ))}
      </ul>
      <button onClick={() => setNomes([...nomes()].reverse())}>reverter</button>
      <p>
        O índice {0} deveria acompanhar a posição. Se o nome trocar mas o
        número ficar, a key não foi usada no diff.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 4. Lista de objetos — o item inteiro é reativo
// ---------------------------------------------------------------------------

type Tarefa = { id: number; texto: string; feita: boolean }

export const HydrateListaObjetos = () => {
  const [tarefas, setTarefas] = signal<Tarefa[]>([
    { id: 1, texto: "estudar signals", feita: true },
    { id: 2, texto: "ler o renderToDOM", feita: false },
    { id: 3, texto: "testar no browser", feita: false },
  ])

  const alternar = (id: number) =>
    setTarefas(
      tarefas().map((t) => (t.id === id ? { ...t, feita: !t.feita } : t))
    )

  const feitas = () => tarefas().filter((t) => t.feita).length

  return (
    <div data-teste="hydrate-objetos">
      <h3>4. Lista de objetos</h3>
      <span data-feitas={() => feitas()}>
        feitas: {() => feitas()} / {() => tarefas().length}
      </span>
      <ul>
        {() =>
          tarefas().map((t) => (
            <li key={t.id} data-feita={() => String(t.feita)}>
              <button onClick={() => alternar(t.id)}>
                {() => (t.feita ? "[x]" : "[ ]")} {t.texto}
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 5. memo
// ---------------------------------------------------------------------------

export const HydrateMemo = () => {
  const [a, setA] = signal(2)
  const [b, setB] = signal(3)
  const [calculos, setCalculos] = signal(0)

  const produto = memo(() => {
    setCalculos((n) => n + 1)
    console.log("[hydrate/memo] recalculando", a(), "*", b(), "=", a() * b())
    return a() * b()
  })

  return (
    <div data-teste="hydrate-memo">
      <h3>5. memo</h3>
      <p data-produto={() => produto()}>a * b = {() => produto()}</p>
      <button onClick={() => setA(a() + 1)}>a++</button>
      <button onClick={() => setB(b() + 1)}>b++</button>
      <p data-calculos={() => calculos()}>cálculos: {() => calculos()}</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 6. store
// ---------------------------------------------------------------------------

export const HydrateStore = () => {
  // store devolve um Signal por chave, e Signal é a tupla [getter, setter].
  const s = store({ nome: "visitante", visitas: 0 })
  const [getNome, setNome] = s.nome
  const [getVisitas, setVisitas] = s.visitas

  return (
    <div data-teste="hydrate-store">
      <h3>6. store</h3>
      <p data-nome={() => getNome()}>nome: {() => getNome()}</p>
      <p data-visitas={() => getVisitas()}>visitas: {() => getVisitas()}</p>
      <button onClick={() => setVisitas((n) => n + 1)}>visitar</button>
      <button onClick={() => setNome((n) => (n === "visitante" ? "editor" : "visitante"))}>
        trocar nome
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 7. batch
// ---------------------------------------------------------------------------

export const HydrateBatch = () => {
  const [x, setX] = signal(0)
  const [y, setY] = signal(0)
  const [z, setZ] = signal(0)

  return (
    <div data-teste="hydrate-batch">
      <h3>7. batch</h3>
      <p data-x={() => x()}>x: {() => x()}</p>
      <p data-y={() => y()}>y: {() => y()}</p>
      <p data-z={() => z()}>z: {() => z()}</p>
      <button
        onClick={() =>
          batch(() => {
            setX(x() + 1)
            setY(y() + 1)
            setZ(z() + 1)
          })
        }
      >
        somar os três
      </button>
      <button
        onClick={() => {
          setX(x() + 1)
          setY(y() + 1)
          setZ(z() + 1)
        }}
      >
        somar sem batch
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 8. Condicional
// ---------------------------------------------------------------------------

export const HydrateCondicional = () => {
  const [mostrar, setMostrar] = signal(false)

  return (
    <div data-teste="hydrate-condicional">
      <h3>8. Condicional</h3>
      <button onClick={() => setMostrar(!mostrar())}>
        {() => (mostrar() ? "esconder" : "mostrar")}
      </button>
      {() =>
        mostrar() ? (
          <section data-bloco="visivel">
            <p>Bloco visível</p>
          </section>
        ) : (
          <p data-bloco="oculto">Nada aqui</p>
        )
      }
    </div>
  )
}

// ---------------------------------------------------------------------------
// 9. Props do servidor + estado local
// ---------------------------------------------------------------------------

export const HydrateRecebeProps = ({
  titulo = "sem título",
  valor = 0,
}: any) => {
  const [extra, setExtra] = signal(0)

  return (
    <div data-teste="hydrate-props">
      <h3>9. Props + estado local</h3>
      <p data-titulo={titulo}>título do servidor: {titulo}</p>
      <p data-valor={valor}>valor do servidor: {valor}</p>
      <p data-extra={() => extra()}>local: {() => extra()}</p>
      <button onClick={() => setExtra(extra() + 1)}>incrementar local</button>
      <p>
        titulo e valor são estáticos de propósito: vêm do servidor e não têm
        signal por trás. Só o contador local responde ao clique.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 10. Efeito com events() — observe onde o log aparece
// ---------------------------------------------------------------------------

export const HydrateEfeito = () => {
  const [n, setN] = signal(0)

  events(() => {
    console.log("[hydrate/efeito] n =", n())
  })

  return (
    <div data-teste="hydrate-efeito">
      <h3>10. events()</h3>
      <p data-n={() => n()}>n: {() => n()}</p>
      <button onClick={() => setN(n() + 1)}>incrementar</button>
        <p>
          Este log só aparece no console do browser, nunca no terminal: o
          events() retorna cedo quando isSSR() é true. Se ele aparecer no
          terminal, o SSR não está rodando.
        </p>
      </div>
    )
  }

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
export const HydrateQuebra = ({ armado = false }: any) => {
  const [quebrar, setQuebrar] = signal(armado)

  if (!isSSR() && quebrar()) {
    throw new Error("falha proposital dentro da hydration")
  }

  return (
    <div data-teste="hydrate-quebra">
      <h3>11. Quebra proposital</h3>
      <p>
        No servidor isto renderiza normal. Com o botão armado a hidratação
        lança, e o painel dev tem que aparecer no canto inferior direito.
      </p>
      <button onClick={() => setQuebrar((v: boolean) => !v)}>
        {() => (quebrar() ? "desarmar" : "armar a quebra")}
      </button>
    </div>
  )
}
