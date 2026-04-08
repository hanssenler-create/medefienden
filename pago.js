require("dotenv").config({ path: ".env.local" });

const express = require("express");
const cors = require("cors");
const { MercadoPagoConfig, Preference } = require("mercadopago");

const app = express();
app.use(cors());
app.use(express.json());

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

app.post("/crear-preferencia", async (req, res) => {
  try {
    const { modalidad, nombre, email, telefono, area, descripcion } = req.body;

    let titulo = "";
    let monto = 0;

    if (modalidad === "online") {
      titulo = "Reunión jurídica online - MEDEFIENDEN";
      monto = 45000;
    } else if (modalidad === "presencial") {
      titulo = "Reunión jurídica presencial - MEDEFIENDEN";
      monto = 100000;
    } else {
      return res.status(400).json({ error: "Modalidad inválida" });
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
          nombre: nombre || "",
          email: email || "",
          telefono: telefono || "",
          area: area || "",
          descripcion: descripcion || "",
          modalidad: modalidad || "",
        },
        back_urls: {
          success: "http://localhost:3000/",
          failure: "http://localhost:3000/",
          pending: "http://localhost:3000/",
        },
      },
    });

    res.json({
      id: response.id,
      init_point: response.init_point,
    });
  } catch (error) {
    console.log("ERROR MP:", error);
    res.status(500).json({ error: "Error al crear preferencia" });
  }
});

app.listen(3001, () => {
  console.log("Servidor pago corriendo en http://localhost:3001");
});