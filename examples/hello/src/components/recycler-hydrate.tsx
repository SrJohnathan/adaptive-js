'hydrate'
import {RecyclerView} from "@adaptive-js/components";
/**
 * A lista é feita para hydrate: o servidor monta a estrutura (viewport, spacer
 * e o pool de slots) e o client assume os mesmos nós para preencher o conteúdo.
 *
 * Os slots saem vazios do servidor porque ref não dispara no SSR — o
 * bindSlot depende do host. O primeiro scheduleFlush no client é quem enche,
 * reaproveitando os hosts que o servidor já deixou no lugar.
 *
 * Os controles e o contador também ficam aqui dentro porque eles dependem do
 * mesmo estado da lista: separados, o servidor os renderizaria com outro
 * snapshot e o client teria que substituir markup já hidratado.
 */

import { signal } from "@adaptive-js/web";



type Row = { id: number; label: string; done: boolean };

const TOTAL = 1000;
const ITEM_HEIGHT = 32;

function makeRows(count: number): Row[] {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        label: `linha ${i}`,
        done: i % 7 === 0,
    }));
}

export const ListaRecycler = () => {
    const [rows, setRows] = signal<Row[]>(makeRows(TOTAL));
    const [cliques, bumpCliques] = signal(0);
    const [ultimo, setUltimo] = signal<string>("nenhum");
    const [vazio, setVazio] = signal(false);

    const getRows = () => (vazio() ? [] : rows());

    return (
        <div class="page">
            <h1>RecyclerView</h1>

            <div class="controles">
                <button
                    type="button"
                    onClick={() => setVazio((v) => !v)}
                >
                    alternar vazio
                </button>
                <button
                    type="button"
                    onClick={() => {
                        setRows(rows().map(row => ({ ...row, done: true })));
                        bumpCliques((v) => v + 1);
                    }}
                >
                    marcar todos
                </button>
            </div>

            <p id="estado">
                itens: {() => getRows().length} | cliques: {() => cliques()} |
                ultimo: {() => ultimo()}
            </p>

            <RecyclerView<Row>
                items={getRows}
                itemHeight={ITEM_HEIGHT}
                height={320}
                width="100%"
                overscan={3}
                getItemKey={(row) => row.id}
                emptyState={<p id="vazio">nada aqui</p>}
                onItemClick={(row) => {
                    setUltimo(`${row.label} (id ${row.id})`);
                    bumpCliques((v) => v + 1);
                }}
                item={(row, index) => ({
                    type: "div",
                    class: () =>
                        `linha ${row.done ? "riscada" : ""} ${
                            index === 0 ? "primeira" : ""
                        }`,
                    props: {
                        "data-id": () => String(row.id),
                        "data-indice": () => String(index),
                        "data-pronta": () => (row.done ? "sim" : "nao"),
                    },
                    children: [
                        {
                            type: "span",
                            class: "idx",
                            value: () => `#${index}`,
                        },
                        {
                            type: "span",
                            class: "rotulo",
                            value: () => row.label,
                        },
                    ],
                })}
            />
        </div>
    );
};
