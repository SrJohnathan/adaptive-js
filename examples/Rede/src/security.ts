'server'

/*
import { createSecurity } from "@adaptive-js/extension-security";
import { setSecurityPlugin } from "@adaptive-js/adapter-nitro";

/!**
 * Security do app — secure by default.
 *
 * Em produção, troque `allowedOrigins` pelo domínio real (mesma lista do
 * `csrf.allowedOrigins` do auth em src/auth.ts).
 *
 * O handler Nitro deste toolchain é um entry fixo (não existe server/entry
 * executável), então o registro do plugin acontece aqui, no top-level de um
 * módulo 'server' que as páginas já importam via src/auth.ts. O nonce é
 * gerado após esse carregamento, garantindo header + nonce corretos.
 *!/
export const security = createSecurity({
  allowedOrigins: [
    "http://localhost:3000", // front (dev server do AdaptiveJS)
    "http://localhost:4000", // gateway de dev
    "https://app.redehub.com.br",
  ],
  csp: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    imgSrc: ["'self'", "data:", "https:"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    // O front chama o gateway de dev por HTTP e WebSocket; sem estas origens
    // o browser bloqueia o socket e os fetches.
    connectSrc: [
      "'self'",
      "http://localhost:4000",
      "ws://localhost:4000",
    ],
    frameAncestors: ["'none'"],
    baseUri: ["'self'"],
    formAction: ["'self'"],
    objectSrc: ["'none'"],
  },
});

setSecurityPlugin(security.asNitroPlugin());*/
