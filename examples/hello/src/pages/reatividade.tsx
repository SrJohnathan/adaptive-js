import { ClientComponet } from "../components/client";
import {
  ClienteAninhado,
  ClienteBatch,
  ClienteClasse,
  ClienteCondicional,
  ClienteListaMap,
  ClienteListaReorder,
  ClienteMemo,
  ClienteStore,
  ClienteTernario,
  ClienteTexto,
} from "../components/reactive-client";
import {
  HydrateBatch,
  HydrateCondicional,
  HydrateEfeito,
  HydrateListaMap,
  HydrateListaObjetos,
  HydrateListaReorder,
  HydrateMemo,
  HydrateQuebra,
  HydrateRecebeProps,
  HydrateStore,
  HydrateTernario,
} from "../components/reactive-hydrate";

/**
 * Página de teste de reatividade.
 *
 * Divido client e hydrate em seções porque o ponto de partida é diferente:
 * o hydrate chega com HTML do servidor, o client chega vazio.
 *
 * Como ler os resultados:
 * - Hydrate: todo valor inicial TEM de estar na tela antes de clicar.
 * - Client: as ilhas só existem depois que o bundle roda.
 *
 * Cada caso tem data-teste no elemento raiz. Abre o devtools, filtra por
 * `[data-teste]` e vai clicando.
 */
export default function ReatividadePage() {
  return (
    <div>
      <h1>Reatividade</h1>
      <p>
        Valor dinâmico dentro de thunk: <code>{"{() => x()}"}</code> para
        filho, <code>{"attr={() => x()}"}</code> para atributo. Sem o thunk a
        leitura é estática.
      </p>

      <section>
        <h2>Hydrate</h2>
        <p>Chegam renderizados pelo servidor. O valor inicial tem de estar na tela.</p>
        <HydrateTernario />
        <HydrateListaMap />
        <HydrateListaReorder />
        <HydrateListaObjetos />
        <HydrateMemo />
        <HydrateStore />
        <HydrateBatch />
        <HydrateCondicional />
        <HydrateRecebeProps titulo="título do servidor" valor={7} />
        <HydrateEfeito />
        <HydrateQuebra />
      </section>

      <section>
        <h2>Client</h2>
        <p>Chegam vazios e são montados pelo bundle no browser.</p>
        <ClienteTernario />
        <ClienteListaMap />
        <ClienteListaReorder />
        <ClienteMemo />
        <ClienteStore />
        <ClienteBatch />
        <ClienteCondicional />
        <ClienteClasse />
        <ClienteAninhado />
        <ClienteTexto />
      </section>

      <section>
        <h2>Client dentro de hydrate</h2>
        <p>Se as ilhas se sobrescrevem, aparece conteúdo duplicado.</p>
        <HydrateTernario />
        <ClientComponet />
      </section>
    </div>
  );
}
