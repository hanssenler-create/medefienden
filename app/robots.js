export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://www.medefienden.cl/sitemap.xml",
    host: "https://www.medefienden.cl",
  };
}