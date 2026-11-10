import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { readJSON, removeKey, writeJSON } from "../utils/storage";

/**
 * Autenticação simulada (somente front-end).
 * Contas e sessão ficam no localStorage do navegador — substitua pelas
 * chamadas da sua API quando o back-end existir.
 */
export type User = { name: string; email: string };
type StoredUser = User & { password: string };

const USERS_KEY = "facmap:users";
const SESSION_KEY = "facmap:session";

type SignupInput = { name: string; email: string; password: string };

type AuthContextValue = {
  user: User | null;
  login: (email: string, password: string) => Promise<string | null>;
  signup: (input: SignupInput) => Promise<string | null>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const normalize = (email: string) => email.trim().toLowerCase();
const fakeLatency = () => new Promise((r) => setTimeout(r, 500));

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => readJSON<User | null>(SESSION_KEY, null));

  const startSession = useCallback((u: User) => {
    setUser(u);
    writeJSON(SESSION_KEY, u);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      await fakeLatency();
      const users = readJSON<StoredUser[]>(USERS_KEY, []);
      const found = users.find((u) => u.email === normalize(email));
      if (!found || found.password !== password) return "E-mail ou senha incorretos.";
      startSession({ name: found.name, email: found.email });
      return null;
    },
    [startSession],
  );

  const signup = useCallback(
    async ({ name, email, password }: SignupInput) => {
      await fakeLatency();
      const users = readJSON<StoredUser[]>(USERS_KEY, []);
      const mail = normalize(email);
      if (users.some((u) => u.email === mail)) return "Já existe uma conta com este e-mail.";
      const newUser: StoredUser = { name: name.trim(), email: mail, password };
      writeJSON(USERS_KEY, [...users, newUser]);
      startSession({ name: newUser.name, email: newUser.email });
      return null;
    },
    [startSession],
  );

  const logout = useCallback(() => {
    setUser(null);
    removeKey(SESSION_KEY);
  }, []);

  const value = useMemo(() => ({ user, login, signup, logout }), [user, login, signup, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de <AuthProvider>");
  return ctx;
}
