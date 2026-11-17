import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { api, ApiError, clearToken, getToken, setToken, UNAUTHORIZED_EVENT } from "../utils/api";
import { readJSON, removeKey, writeJSON } from "../utils/storage";

/**
 * Autenticação via API (JWT).
 * O token fica no localStorage e é enviado no header Authorization das rotas protegidas.
 */
export type User = { id: number; name: string; email: string };

type TokenResponse = { access_token: string; token_type: string; expires_in: number; user: User };

const SESSION_KEY = "facmap:session";

type SignupInput = { name: string; email: string; password: string };

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (input: SignupInput) => Promise<string | null>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const messageOf = (e: unknown) => (e instanceof ApiError ? e.message : "Algo deu errado. Tente novamente.");

export function AuthProvider({ children }: { children: ReactNode }) {
  // Mostra o usuário salvo de imediato (sem piscar a tela de login) e valida o token em seguida.
  const [user, setUser] = useState<User | null>(() => (getToken() ? readJSON<User | null>(SESSION_KEY, null) : null));

  const startSession = useCallback((res: TokenResponse) => {
    setToken(res.access_token);
    writeJSON(SESSION_KEY, res.user);
    setUser(res.user);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    removeKey(SESSION_KEY);
    setUser(null);
  }, []);

  // Token expirado/inválido em qualquer chamada → encerra a sessão.
  useEffect(() => {
    window.addEventListener(UNAUTHORIZED_EVENT, logout);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, logout);
  }, [logout]);

  // Confere o token salvo ao abrir o app e atualiza os dados do usuário.
  useEffect(() => {
    if (!getToken()) return;
    api<User>("/users/me", { auth: true })
      .then((u) => {
        writeJSON(SESSION_KEY, u);
        setUser(u);
      })
      .catch(() => {
        /* 401 já faz logout pelo evento; erro de rede mantém a sessão local */
      });
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        startSession(await api<TokenResponse>("/auth/login", { method: "POST", body: { email, password } }));
        return null;
      } catch (e) {
        return messageOf(e);
      }
    },
    [startSession],
  );

  const signup = useCallback(
    async ({ name, email, password }: SignupInput) => {
      try {
        startSession(await api<TokenResponse>("/auth/register", { method: "POST", body: { name, email, password } }));
        return null;
      } catch (e) {
        return messageOf(e);
      }
    },
    [startSession],
  );

  const value = useMemo(() => ({ user, login, signup, logout }), [user, login, signup, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}
