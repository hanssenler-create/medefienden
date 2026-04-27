export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <section className="max-w-2xl w-full p-10 rounded-3xl border border-white/10 bg-white/5 text-center">
        <p className="text-sm tracking-[0.35em] uppercase text-white/40 mb-4">
          Pago no completado
        </p>

        <h1 className="text-4xl font-semibold mb-6">
          No fue posible finalizar el pago
        </h1>

        <p className="text-white/70 text-lg mb-8 leading-relaxed">
          La operación fue cancelada o no pudo completarse correctamente. Si desea,
          puede intentarlo nuevamente o tomar contacto para asistencia.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="/#contacto"
            className="inline-block bg-white text-black px-6 py-3 rounded-full font-medium"
          >
            Intentar nuevamente
          </a>

          <a
            href="/"
            className="inline-block border border-white/20 px-6 py-3 rounded-full font-medium"
          >
            Volver al inicio
          </a>
        </div>
      </section>
    </main>
  );
}