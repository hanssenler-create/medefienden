import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {

  try {

    const data = await req.json();

    const {
      nombre,
      email,
      telefono,
      modalidad,
      area,
      descripcion,
    } = data;

    const result = await resend.emails.send({

      from: "Me Defienden <onboarding@resend.dev>",

      to: "medefienden.agenda@gmail.com",

      subject: "Nueva solicitud de contacto - Me Defienden",

      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">

          <h2 style="color:#111;">
            Nueva solicitud recibida 
          </h2>

          <hr />

          <p>
            <strong>Nombre:</strong> ${nombre}
          </p>

          <p>
            <strong>Email:</strong> ${email}
          </p>

          <p>
            <strong>Teléfono:</strong> ${telefono}
          </p>

          <p>
            <strong>Modalidad:</strong> ${modalidad}
          </p>

          <p>
            <strong>Área:</strong> ${area}
          </p>

          <hr />

          <p>
            <strong>Descripción del caso:</strong>
          </p>

          <p>
            ${descripcion}
          </p>

        </div>
      `,
    });

    console.log("RESULTADO RESEND:", result);

    return Response.json({
      success: true,
    });

  } catch (error) {

    console.error("ERROR RESEND:", error);

    return Response.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
