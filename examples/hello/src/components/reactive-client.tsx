'client'

import { batch, events, memo, signal, store } from "@adaptive-js/web"

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
  const [ligado, setLigado] = signal(true)

  events(() => {
    console.log("[cliente/ternario] ligado =", ligado())
  })

  return (
    <div data-teste="cliente-ternario">
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

export const ClienteListaMap = () => {
  const [itens, setItens] = signal<string[]>(["alpha", "beta", "gamma"])

  events(() => {
    console.log("[cliente/lista] itens =", itens())
  })

  const adicionar = (nome: string) => setItens([...itens(), nome])
  const remover = (i: number) => setItens(itens().filter((_, idx) => idx !== i))

  return (
    <div data-teste="cliente-lista">
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
// 3. Reordenar — a key precisa impedir reuso errado de nó
// ---------------------------------------------------------------------------

export const ClienteListaReorder = () => {
  const [nomes, setNomes] = signal(["Ana", "Bruno", "Carla"])

  events(() => {
    console.log("[cliente/reorder] nomes =", nomes())
  })

  return (
    <div data-teste="cliente-reorder">
      <h3>3. Reordenar lista</h3>
      <ul>
        {() => nomes().map((nome, i) => (
          <li key={nome} data-nome={nome}>
            {i}: {nome}
          </li>
        ))}
      </ul>
      <button onClick={() => setNomes([...nomes()].reverse())}>reverter</button>
      <p>Se o índice ficar preso no nome, a key não está sendo usada.</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 4. memo — valor derivado
// ---------------------------------------------------------------------------

export const ClienteMemo = () => {
  const [a, setA] = signal(2)
  const [b, setB] = signal(3)
  const [calculos, setCalculos] = signal(0)

  const produto = memo(() => {
    setCalculos((n) => n + 1)
    console.log("[cliente/memo] recalculando produto")
    return a() * b()
  })

  return (
    <div data-teste="cliente-memo">
      <h3>4. memo</h3>
      <p data-produto={() => produto()}>a * b = {() => produto()}</p>
      <button onClick={() => setA(a() + 1)}>a++</button>
      <button onClick={() => setB(b() + 1)}>b++</button>
      <p data-calculos={() => calculos()}>cálculos: {() => calculos()}</p>
      <p>
        O contador é um signal justamente para o texto ser reativo. Se o
        produto mudar e o contador não, o memo não recalculou.
      </p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 5. store — objeto de sinais
// ---------------------------------------------------------------------------

export const ClienteStore = () => {
  // store devolve um Signal por chave, e Signal é a tupla [getter, setter].
  // Não dá para escrever s.nome(): tem que desestruturar.
  const s = store({ nome: "visitante", visitas: 0 })
  const [getNome, setNome] = s.nome
  const [getVisitas, setVisitas] = s.visitas

  events(() => {
    console.log("[cliente/store]", getNome(), getVisitas())
  })

  return (
    <div data-teste="cliente-store">
      <h3>5. store</h3>
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
// 6. batch — três sinais numa atualização só
// ---------------------------------------------------------------------------

export const ClienteBatch = () => {
  const [x, setX] = signal(0)
  const [y, setY] = signal(0)
  const [z, setZ] = signal(0)

  return (
    <div data-teste="cliente-batch">
      <h3>6. batch</h3>
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
// 7. Condicional — extrai e reinsere o bloco
// ---------------------------------------------------------------------------

export const ClienteCondicional = () => {
  const [mostrar, setMostrar] = signal(false)

  return (
    <div data-teste="cliente-condicional">
      <h3>7. Condicional</h3>
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
// 8. className e style reativos
// ---------------------------------------------------------------------------

export const ClienteClasse = () => {
  const [ligado, setLigado] = signal(true)

  return (
    <div data-teste="cliente-classe">
      <h3>8. className / style</h3>
      <div className={ligado() ? "verde" : "vermelho"}>sem thunk: congelado</div>
      <div className={() => (ligado() ? "verde" : "vermelho")}>
        com thunk: {() => (ligado() ? "verde" : "vermelho")}
      </div>
      <div style={{ color: ligado() ? "green" : "red" }}>style estático</div>
      <div style={{ color: () => (ligado() ? "green" : "red") }}>
        style com thunk
      </div>
      <button onClick={() => setLigado(!ligado())}>alternar</button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 9. Aninhamento — estado de filho sobrevive ao toggle do pai
// ---------------------------------------------------------------------------

const FilhoInterno = () => {
  const [n, setN] = signal(0)
  return (
    <button onClick={() => setN(n() + 1)} data-filho={() => n()}>
      filho: {() => n()}
    </button>
  )
}

export const ClienteAninhado = () => {
  const [pai, setPai] = signal(0)
  const [visivel, setVisivel] = signal(true)

  return (
    <div data-teste="cliente-aninhado">
      <h3>9. Aninhado</h3>
      <button onClick={() => setPai(pai() + 1)} data-pai={() => pai()}>
        pai: {() => pai()}
      </button>
      <button onClick={() => setVisivel(!visivel())}>
        {() => (visivel() ? "esconder filho" : "mostrar filho")}
      </button>
      {() => (visivel() ? <FilhoInterno /> : null)}
      <p>Se o contador do filhozerar ao esconder, o escopo foi destruído.</p>
    </div>
  )
}

// ---------------------------------------------------------------------------
// 10. Texto longo com throttle — cada tecla re-renderiza
// ---------------------------------------------------------------------------

export const ClienteTexto = () => {
  const [texto, setTexto] = signal("digite aqui")

  return (
    <div data-teste="cliente-texto">
      <h3>10. Texto ligado</h3>
      <input
        value={() => texto()}
        onInput={(e: any) => setTexto(e.target.value)}
      />
      <p data-len={() => texto().length}>
        tamanho: {() => texto().length} — eco: {() => texto()}
      </p>
      <button onClick={() => setTexto("")}>limpar</button>
    </div>
  )
}
