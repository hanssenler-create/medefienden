import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://www.medefienden.cl"),

  title: {
    default: "Me Defienden | Abogados en Chile",
    template: "%s | Me Defienden",
  },

  description:
    "Abogados en Chile especializados en Derecho de Familia, Derecho Civil, Derecho Laboral y Derecho Administrativo. Asesoría jurídica para personas y empresas. Agenda tu consulta online.",

  keywords: [
    "abogado",
    "abogados chile",
    "derecho de familia",
    "divorcio",
    "pensión de alimentos",
    "cuidado personal",
    "derecho civil",
    "derecho laboral",
    "derecho administrativo",
    "consulta jurídica",
    "abogado online",
    "Me Defienden",
  ],

  authors: [
    {
      name: "Me Defienden",
    },
  ],

  creator: "Me Defienden",
  publisher: "Me Defienden",

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "Me Defienden | Abogados en Chile",
    description:
      "Asesoría jurídica para personas y empresas. Agenda tu consulta jurídica online.",
    url: "https://www.medefienden.cl",
    siteName: "Me Defienden",
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es-CL">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        {children}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FWCVX8N6J5"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FWCVX8N6J5');
          `}
        </Script>
      </body>
    </html>
  );
}