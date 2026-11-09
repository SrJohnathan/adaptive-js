export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-zinc-950 p-6 text-white">
      <section className="max-w-md rounded-3xl border border-white/10 bg-zinc-900 p-8">
        <span className="text-sm font-black uppercase tracking-[0.2em] text-pink-300">404</span>
        <h1 className="mt-4 text-4xl font-black">Pagina nao encontrada</h1>
        <p className="mt-3 text-zinc-400">
          Esta rota nao existe, ou voce tentou acessar uma pagina protegida sem sessao valida.
        </p>
        <a className="mt-6 inline-flex rounded-full bg-gradient-to-r from-yellow-300 via-pink-400 to-violet-500 px-5 py-2 font-black text-zinc-950" href="/">
          Voltar para a Rede
        </a>
      </section>
    </main>
  );
}
