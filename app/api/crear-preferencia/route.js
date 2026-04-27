import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

export async function POST(req) {
  try {
    const { modalidad, nombre, email, telefono, area, descripcion } =
      await req.json();

    let titulo = "";
    let monto = 0;

    if (modalidad === "online") {
      titulo = "Reunión jurídica online - MEDEFIENDEN";
      monto = 45000;
    } else if (modalidad === "presencial") {
      titulo = "Reunión jurídica presencial - MEDEFIENDEN";
      monto = 100000;
    } else {
      return Response.json({ error: "Modalidad inválida" }, { status: 400 });
    }

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            title: titulo,
            quantity: 1,
            unit_price: monto,
            currency_id: "CLP",
          },
        ],
        payer: {
          name: nombre || "",
          email: email || "",
        },
        metadata: {
          nombre,
          email,
          telefono,
          area,
          descripcion,
          modalidad,
        },
   back_urls: {
  success: "https://medefienden.vercel.app/gracias",
  failure: "https://medefienden.vercel.app/error",
  pending: "https://medefienden.vercel.app/pendiente",
},
auto_return: "approved",
    },
});

    return Response.json({
      id: response.id,
      init_point: response.init_point,
    });
  } catch (error) {
    console.error("ERROR MP:", error);
    return Response.json(
      { error: "Error al crear preferencia" },
      { status: 500 }
    );
  }
}