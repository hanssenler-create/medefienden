export default function Page() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <section className="max-w-2xl w-full p-10 rounded-3xl border border-white/10 bg-white/5 text-center">
        <p className="text-sm tracking-[0.35em] uppercase text-white/40 mb-4">
          Confirmación
        </p>

        <h1 className="text-4xl font-semibold mb-6">
          Gracias por confiar en Me Defienden
        </h1>

        <p className="text-white/70 text-lg mb-8 leading-relaxed">
          Su pago ha sido recibido correctamente. Dentro de las próximas 24 horas hábiles nos pondremos en contacto con usted para coordinar su reunión de análisis de antecedentes jurídicos.
        </p>

        <a
          href="/"
          className="inline-block bg-white text-black px-6 py-3 rounded-full font-medium"
        >
          Volver al inicio
        </a>
      </section>
    </main>
  );
}
