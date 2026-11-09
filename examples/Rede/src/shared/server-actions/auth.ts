"server";

import { auth, adapter } from "../../auth.ts";
import { revokeAuthToken } from "../../config/auth-service.ts";

export interface LoginInput {
  email: string;
  password?: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  name?: string;
}

export interface AuthCookie {
  name: string;
  value: string;
  header: string;
}

function adapterErrorStatus(err: unknown): number | null {
  const message = err instanceof Error ? err.message : String(err);
  const match = message.match(/HTTP (\d+)/);
  return match ? Number(match[1]) : null;
}

function appendSetCookie(context?: any, header?: string) {
  if (header && context?.event?.res?.headers?.append) {
    context.event.res.headers.append("set-cookie", header);
  }
}

/**
 * Server action desprotegida de login.
 * `auth.login()` faz o login completo em 1 chamada:
 * 1. Chama o request/login do adapter externo (valida na API Rust/Axum)
 * 2. Cria a sessão AdaptiveJS local (cache SSR)
 * 3. Gera o cookie da sessão
 */
export async function loginAction(input: LoginInput, context?: any) {
  const email = input.email?.trim().toLowerCase();
  if (!email) return { success: false, error: "Por favor, informe seu e-mail." };
  if (!input.password) return { success: false, error: "Informe sua senha." };

  try {
    const { user, cookie } = await auth.login(
      { email, password: input.password },
      context?.request
    );
    appendSetCookie(context, cookie.header);
    return { success: true, user, cookie };
  } catch {
    return { success: false, error: "E-mail ou senha inválidos." };
  }
}

/**
 * Server action desprotegida de registro.
 * Cria o usuário na API via `adapter.register` e depois inicia a sessão
 * AdaptiveJS local com o mesmo fluxo do login.
 */
export async function registerAction(input: RegisterInput, context?: any) {
  const email = input.email?.trim().toLowerCase();
  if (!email || !email.includes("@")) return { success: false, error: "Informe um e-mail válido." };
  if (!input.password || input.password.length < 8)
    return { success: false, error: "A senha deve ter pelo menos 8 caracteres." };

  try {
    const { user, token } = await adapter.register!({
      email,
      password: input.password,
      name: input.name,
    });

    if (!user?.id) {
      return { success: false, error: "Resposta inválida do servidor de auth." };
    }

    const { cookie } = await auth.createSession(user, {
      data: { authToken: token },
    });
    appendSetCookie(context, cookie.header);
    return { success: true, user, cookie };
  } catch (err) {
    if (adapterErrorStatus(err) === 409) {
      return { success: false, error: "Este e-mail já está cadastrado." };
    }
    return { success: false, error: "Erro ao criar sua conta." };
  }
}

/**
 * Server action desprotegida de logout.
 * Revoga o token na API (best-effort) e encerra a sessão AdaptiveJS local,
 * devolvendo o cookie em branco (Max-Age=0).
 */
export async function logoutAction(context?: any) {
  let token: string | undefined;
  try {
    const read = await auth.readSession(context?.request ?? { headers: {} });
    token = read.session?.data?.authToken;
  } catch {
    // segue sem token
  }

  try {
    if (token) await revokeAuthToken(token);
  } catch {
    // best-effort: a sessão local é encerrada mesmo se o serviço estiver fora
  }

  const { cookie } = await auth.logout(context?.request);
  appendSetCookie(context, cookie.header);
  return { success: true, cookie };
}