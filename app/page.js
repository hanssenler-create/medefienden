"use client";

import { useMemo, useState } from "react";

export default function MedefiendenHomepage() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    modalidad: "",
    area: "",
    descripcion: "",
  });

  const services = [
    {
      title: "Diagnóstico jurídico inicial",
      description:
        "Una revisión estratégica para entender el problema, ordenar los hechos y definir con claridad si conviene avanzar.",
    },
    {
      title: "Reunión prioritaria",
      description:
        "Atención online o presencial a domicilio con coordinación dentro de 24 horas hábiles una vez confirmado el proceso.",
    },
    {
      title: "Estrategia y representación",
      description:
        "Si el caso lo requiere, el diagnóstico permite definir una estrategia clara para gestión, negociación o litigación.",
    },
  ];

  const principles = [
    "Atención personalizada, no masiva.",
    "Tiempos definidos y reglas claras desde el inicio.",
    "Comunicación formal, cercana y respetuosa.",
    "Criterio jurídico antes que improvisación.",
  ];

  const steps = [
    {
      n: "01",
      title: "Completa el formulario y selecciona la modalidad",
      text: "Describe tu situación de forma simple. Esto permite ordenar los antecedentes antes de la reunión.",
    },
    {
      n: "02",
      title: "Pago y confirmación",
      text: "La reunión online tiene un valor de $45.000 y la presencial de $100.000.",
    },
    {
      n: "03",
      title: "Agenda prioritaria",
      text: "Se coordina la reunión dentro de 24 horas hábiles, según modalidad elegida.",
    },
    {
      n: "04",
      title: "Diagnóstico jurídico",
      text: "Se analiza el caso, se explican riesgos, alternativas y posibles caminos de acción.",
    },
  ];

  const modalidadInfo = useMemo(() => {
    if (formData.modalidad === "online") {
      return {
        label: "Reunión online vía telemática",
        amount: 45000,
        display: "$45.000 CLP",
      };
    }

    if (formData.modalidad === "presencial") {
      return {
        label: "Reunión presencial",
        amount: 100000,
        display: "$100.000 CLP",
      };
    }

    return {
      label: "Selecciona una modalidad",
      amount: 0,
      display: "-",
    };
  }, [formData.modalidad]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function pagarDiagnostico() {
    if (!formData.nombre.trim()) {
      alert("Por favor, ingresa tu nombre completo.");
      return;
    }

    if (!formData.email.trim()) {
      alert("Por favor, ingresa tu correo electrónico.");
      return;
    }

    if (!formData.modalidad) {
      alert("Por favor, selecciona una modalidad de reunión.");
      return;
    }

    if (!formData.descripcion.trim()) {
      alert("Por favor, describe brevemente tu caso antes de continuar.");
      return;
    }

   try {
  await fetch("/api/contacto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      modalidad: formData.modalidad,
      nombre: formData.nombre,
      email: formData.email,
      telefono: formData.telefono,
      area: formData.area,
      descripcion: formData.descripcion,
    }),
  });

  const response = await fetch("/api/crear-preferencia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modalidad: formData.modalidad,
          nombre: formData.nombre,
          email: formData.email,
          telefono: formData.telefono,
          area: formData.area,
          descripcion: formData.descripcion,
        }),
      });

      const data = await response.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("No se pudo generar el pago.");
      }
    } catch (error) {
      console.error(error);
      alert("Error al conectar con Mercado Pago.");
    }
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_35%),radial-gradient(circle_at_right,rgba(255,255,255,0.08),transparent_25%)]" />
        <div className="relative mx-auto max-w-7xl px-6 py-8 lg:px-10">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/logos/logo-principal.png"
                alt="Me Defienden"
                className="h-20 w-auto"
              />
              <span className="text-xs tracking-wide text-neutral-400">
                Consilium ante, Actio post.
              </span>
            </div>

            <nav className="hidden gap-8 text-sm text-neutral-300 md:flex">
              <a href="#servicios" className="transition hover:text-white">
                Servicios
              </a>
              <a href="#proceso" className="transition hover:text-white">
                Proceso
              </a>
              <a href="#criterio" className="transition hover:text-white">
                Criterio
              </a>
              <a href="#contacto" className="transition hover:text-white">
                Contacto
              </a>
            </nav>
          </header>

          <div className="grid gap-14 py-16 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
            <div className="max-w-3xl">
              <div className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-neutral-300 backdrop-blur">
                Atención jurídica estratégica para personas y pequeñas empresas
              </div>

              <h1 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">
                Defensa jurídica seria, clara y personalizada.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-300">
                Abogado con amplia experiencia en sector público y privado.
                Enfoque en materias civiles, administrativas y de familia. Cada
                caso se analiza estratégicamente desde el inicio, con reglas
                claras y tiempos definidos.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#contacto"
                  className="rounded-2xl bg-white px-6 py-3 text-sm font-medium text-neutral-950 shadow-lg shadow-white/10 transition hover:-translate-y-0.5"
                >
                  Solicitar diagnóstico
                </a>
                <a
                  href="#proceso"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >
                  Ver cómo funciona
                </a>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {[
                  ["24 horas hábiles", "Coordinación prioritaria"],
                  ["Online o presencial", "Según necesidad del caso"],
                  ["Atención personalizada", "Sin lógica de volumen"],
                ].map(([a, b]) => (
                  <div
                    key={a}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                  >
                    <div className="text-base font-semibold text-white">{a}</div>
                    <div className="mt-1 text-sm text-neutral-400">{b}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pl-6">
              <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 shadow-2xl shadow-black/30 backdrop-blur">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-sm uppercase tracking-[0.3em] text-neutral-400">
                      Perfil
                    </div>
                    <div className="mt-2 text-2xl font-semibold text-white">
                      Abogado fundador: Hans Senler Trapp
                    </div>
                  </div>

                  <div className="shrink-0 rounded-full border border-white/15 px-3 py-1 text-xs text-neutral-300">
                    Seriedad, compromiso y transparencia
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src="/images/abogado-fundador.png"
                    alt="Hans Senler Trapp"
                    className="h-[280px] w-full object-cover grayscale"
                  />
                </div>

                <div className="mt-6 rounded-3xl border border-white/10 bg-neutral-900/80 p-5">
                  <p className="text-sm leading-7 text-neutral-300">
                    Dilatada carrera en el sector público y privado, con
                    experiencia en estudios jurídicos, consultoras
                    internacionales y ejercicio profesional independiente.
                  </p>
                </div>

                <div className="mt-5 grid gap-3">
                  {principles.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-neutral-200"
                    >
                      <div className="mt-1 h-2.5 w-2.5 rounded-full bg-white" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="max-w-2xl">
          <div className="text-sm uppercase tracking-[0.3em] text-neutral-400">
            Servicios
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
            Un servicio jurídico estructurado, claro y enfocado en resultados
            reales.
          </h2>
          <p className="mt-4 text-base leading-8 text-neutral-300">
            No buscamos clientes masivos, sino un servicio personalizado.
            Seleccionamos bien los casos, explicamos con claridad y buscamos
            trabajar con criterio en materias civiles, administrativas y de
            familia, como también ser un valor agregado en pequeñas y medianas
            empresas.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/20 transition hover:-translate-y-1"
            >
              <div className="text-xl font-semibold text-white">
                {service.title}
              </div>
              <p className="mt-4 text-sm leading-7 text-neutral-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="proceso" className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="flex max-w-3xl flex-col gap-4">
            <div className="text-sm uppercase tracking-[0.3em] text-neutral-400">
              Proceso
            </div>
            <h2 className="text-3xl font-semibold text-white md:text-4xl">
              Un proceso claro para entender qué estás contratando y qué puedes
              esperar.
            </h2>
            <p className="text-base leading-8 text-neutral-300">
              Desde el primer contacto, el objetivo es ordenar el caso, definir
              expectativas y evitar improvisaciones.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.n}
                className="rounded-[1.75rem] border border-white/10 bg-neutral-900/70 p-6"
              >
                <div className="text-sm font-medium tracking-[0.25em] text-neutral-500">
                  {step.n}
                </div>
                <div className="mt-4 text-xl font-semibold text-white">
                  {step.title}
                </div>
                <p className="mt-3 text-sm leading-7 text-neutral-300">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="criterio" className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
            <div className="text-sm uppercase tracking-[0.3em] text-neutral-400">
              Nuestro Compromiso
            </div>
            <h2 className="mt-3 text-2xl font-semibold text-white">
              Seriedad, compromiso y transparencia.
            </h2>
            <p className="mt-4 text-base leading-8 text-neutral-300">
              Una atención jurídica pensada para personas y pequeñas empresas
              que buscan claridad, orden y criterio, sin informalidad ni
              promesas irreales.
            </p>
            <div className="mt-6 rounded-3xl border border-white/10 bg-neutral-950/70 p-5 text-sm leading-7 text-neutral-300">
              “Aquí no se promete lo imposible. Se evalúa el caso, se explica
              con claridad y se actúa con estrategia.”
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-500/10 to-white/5 p-8">
            <div className="text-sm tracking-[0.3em] text-neutral-500">
              Nuestros Principios
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                "Cobros justos: recibes una oferta de servicios clara.",
                "Recibes una propuesta concreta de lo que se ofrece hacer.",
                "Conversación franca y directa con el profesional de tu caso.",
                "Recibes reportes por teléfono o correo cuando corresponde.",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="text-sm leading-7 text-neutral-200">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="border-t border-white/10 bg-neutral-900">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:px-10">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-neutral-400">
              Contacto
            </div>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
              Solicita una revisión inicial de tu caso.
            </h2>

            <p className="mt-4 max-w-xl text-base leading-8 text-neutral-300">
              Completa tus datos, selecciona la modalidad de reunión y describe
              brevemente el problema. Para continuar, el pago se realiza al
              final del formulario.
            </p>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm uppercase tracking-[0.25em] text-neutral-500">
                Valores
              </div>

              <div className="mt-4 space-y-3 text-sm leading-7 text-neutral-200">
                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-neutral-950/70 px-4 py-3">
                  <span>Reunión online vía telemática</span>
                  <strong>$45.000</strong>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-white/10 bg-neutral-950/70 px-4 py-3">
                  <span>Reunión presencial</span>
                  <strong>$100.000</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20">
            <div className="grid gap-4 md:grid-cols-2">
              <input
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500"
                placeholder="Nombre completo"
              />
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500"
                placeholder="Correo electrónico"
              />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <input
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500"
                placeholder="Teléfono"
              />

              <select
                name="modalidad"
                value={formData.modalidad}
                onChange={handleChange}
                className="rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white outline-none"
              >
                <option value="">Modalidad de reunión</option>
                <option value="online">Online — $45.000</option>
                <option value="presencial">Presencial — $100.000</option>
              </select>
            </div>

            <div className="mt-4">
              <select
                name="area"
                value={formData.area}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white outline-none"
              >
                <option value="">Área o tipo de problema</option>
                <option value="civil">Civil</option>
                <option value="familia">Familia</option>
                <option value="administrativo">Administrativo</option>
                <option value="empresas">Empresas</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div className="mt-4">
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={5}
                className="w-full rounded-2xl border border-white/10 bg-neutral-950 px-4 py-3 text-sm text-white outline-none placeholder:text-neutral-500"
                placeholder="Describe brevemente tu situación y qué necesitas resolver."
              />
            </div>

            <div className="mt-4 rounded-2xl border border-blue-400/20 bg-blue-400/10 p-4 text-sm leading-7 text-blue-100">
              La solicitud se considera correctamente iniciada una vez realizado
              el pago. Luego se coordinará la reunión dentro de 24 horas hábiles.
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-neutral-950/70 p-4">
              <div className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                Resumen
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-neutral-300">
                <span>Modalidad seleccionada</span>
                <strong className="text-white">{modalidadInfo.label}</strong>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm text-neutral-300">
                <span>Valor a pagar</span>
                <strong className="text-white">{modalidadInfo.display}</strong>
              </div>
            </div>

            <button
              type="button"
              onClick={pagarDiagnostico}
              className="mt-5 w-full rounded-2xl bg-white px-6 py-3 text-sm font-medium text-neutral-950 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!formData.modalidad}
            >
              {formData.modalidad === "online"
                ? "Pagar reunión online — $45.000"
                : formData.modalidad === "presencial"
                  ? "Pagar reunión presencial — $100.000"
                  : "Selecciona una modalidad para continuar"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}