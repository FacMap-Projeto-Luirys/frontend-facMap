import { readJSON, removeKey, writeJSON } from "./storage";

/**
 * URL do backend. Configure com VITE_API_URL no .env do frontend e, na Vercel, em
 * Settings → Environment Variables. O valor é embutido no build: depois de mudar, faça um redeploy.
 */
export const API_URL = (import.meta.env.VITE_API_URL || "http://localhost:8000").replace(/\/$/, "");

if (import.meta.env.PROD && !import.meta.env.VITE_API_URL) {
  console.error(
    "[FacMap] VITE_API_URL não foi definida no build de produção: o app está chamando http://localhost:8000. " +
      "Cadastre a variável na Vercel e faça um redeploy.",
  );
}

const TOKEN_KEY = "facmap:token";

/** Disparado quando a API responde 401 numa rota protegida (token expirado/inválido). */
export const UNAUTHORIZED_EVENT = "facmap:unauthorized";

export const getToken = () => readJSON<string | null>(TOKEN_KEY, null);
export const setToken = (token: string) => writeJSON(TOKEN_KEY, token);
export const clearToken = () => removeKey(TOKEN_KEY);

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

/** Extrai a mensagem de erro do FastAPI ({ detail: string | [{ msg }] }). */
function errorMessage(status: number, body: unknown): string {
  const detail = (body as { detail?: unknown } | null)?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail) && detail[0]?.msg) return String(detail[0].msg);
  if (status >= 500) return "Erro no servidor. Tente novamente em instantes.";
  return "Não foi possível concluir a operação.";
}

type Options = { method?: string; body?: unknown; auth?: boolean };

export async function api<T>(path: string, { method = "GET", body, auth = false }: Options = {}): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const token = auth ? getToken() : null;
  if (token) headers.Authorization = `Bearer ${token}`;

  let res: Response;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, "Não foi possível conectar ao servidor. Verifique sua conexão.");
  }

  const data = res.status === 204 ? null : await res.json().catch(() => null);
  if (!res.ok) {
    if (res.status === 401 && auth) window.dispatchEvent(new Event(UNAUTHORIZED_EVENT));
    throw new ApiError(res.status, errorMessage(res.status, data));
  }
  return data as T;
}
