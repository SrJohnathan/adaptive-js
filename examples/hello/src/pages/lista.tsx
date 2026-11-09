import { ListaRecycler } from "../components/recycler-hydrate";

/**
 * A página só monta a fronteira.
 *
 * A lista é hydrate: o servidor emite a estrutura (viewport, spacer e o pool
 * de slots) e o client assume os mesmos nós para encher o conteúdo.
 */
export default function Lista() {
    return <ListaRecycler />;
}
