import {HydrateComponet, HydrateComponetChildClient} from "../components/hydrate";
import {ClientComponet} from "../components/client";

export default function Root() {
  const t = true
  const f = false
  const array = ["a", "b", "c"]
  const nums = [1, 2, 3]
  const empty: string[] = []

  return (
    <>
      {/* 1 - texto simples */}
      <div>Ola mundo</div>

      {/* 2 - multiplos filhos no 3o argumento */}
      <div>
        <p>a</p>
        <p>b</p>
        <p>c</p>
      </div>

      {/* 3 - fragmento aninhado */}
      <>
        <span>x</span>
        <span>y</span>
      </>

      {/* 4 - array de filhos */}
      <ul>
        {array.map((item) => (
          <li>{item}</li>
        ))}
      </ul>

      {/* 5 - key em lista */}
      <ul>
        {nums.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>

      {/* 6 - lista vazia */}
      <ul>{empty.map((e) => <li>{e}</li>)}</ul>

      {/* 7 - condicional verdadeiro / falso */}
      {t ? <p>SIM</p> : <p>NAO</p>}
      {f ? <p>SIM</p> : <p>NAO</p>}

      {/* 8 - null / undefined nao renderizam */}
      {null}
      {undefined}
      {false}
      {true}

      {/* 9 - zero e string vazia NAO sao filtrados */}
      <div>0</div>
      <div>{0}</div>
      <div>{""}</div>

      {/* 10 - thunk: vira comentario de range */}
      <div>{() => "ola mundo"}</div>
      <div>{() => <em>fn</em>}</div>
      <div>{() => [1, 2]}</div>

      {/* 11 - componente como filho */}
      <div>{Child({})}</div>
      <div><Child /></div>
      <Wrapper>
        <b>dentro</b>
      </Wrapper>

      {/* 12 - atributos: className, boolean, style */}
      <div className="caixa" id="i1" title="oi" />
      <input disabled readOnly />
      <div style={{ color: "red", fontSize: 12, marginTop: 0 }} />

      {/* 13 - tags void */}
      <img src="a.png" alt="a" />
      <br />
      <hr />
      <input type="text" value="v" />

      {/* 14 - escape de html e atributo */}
      <div>&lt;script&gt;alert(1)&lt;/script&gt;</div>
      <div title={'aspas " e & < >'} />
      <p>5 &lt; 6 &amp;&amp; 7 &gt; 3</p>

      {/* 15 - svg */}
      <svg viewBox="0 0 24 24" strokeWidth={2}>
        <circle cx={12} cy={12} r={10} strokeWidth={2} />
        <path d="M0 0 L10 10" />
      </svg>

      {/* 16 - camelCase em svg vira kebab */}
      <svg>
        <line strokeLinecap="round" fillRule="evenodd" vectorEffect="none" />
      </svg>

      {/* 17 - atributos numericos e data-* */}
      <div tabIndex={0} data-id="7" data-value={42} aria-hidden={true} />

      {/* 18 - atributos customizados */}
      <my-element some-attr="v" another-prop="w" />

      {/* 19 - children em props.children (1o argumento so) */}
      <div children="via props" />

      {/* 20 - aninhamento profundo */}
      <div>
        <section>
          <article>
            <p>profundo</p>
          </article>
        </section>
      </div>

      {/* 21 - prop que e funcao (thunk de prop) */}
      <div data-computed={(() => "fn-prop")()} />

      {/* 22 - lista mista de tipos */}
      <div>{["txt", 1, null, false, <i>el</i>]}</div>

        <HydrateComponet/>
        <ClientComponet/>
        <HydrateComponetChildClient/>
    </>
  )
}

function Child(props: { children?: any }) {
  return <em>child{props.children}</em>
}

function Wrapper(props: { children : any }) {
  return <div className="wrap">{props.children}</div>
}
