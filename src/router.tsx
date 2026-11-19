import { useEffect, useSyncExternalStore, type AnchorHTMLAttributes, type MouseEvent } from "react";

/**
 * Roteador mínimo baseado em hash (#/rota).
 * Funciona em qualquer hospedagem estática sem configuração de servidor.
 */
export const ROUTES = {
  home: "/",
  login: "/login",
  signup: "/cadastro",
  profile: "/avaliacao/perfil",
  areas: "/avaliacao/areas",
  result: "/avaliacao/resultado",
  dashboard: "/painel",
} as const;

export type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];

function readPath(): string {
  const raw = window.location.hash.replace(/^#/, "");
  return raw || ROUTES.home;
}

const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

if (typeof window !== "undefined") {
  window.addEventListener("hashchange", notify);
  window.addEventListener("popstate", notify);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function navigate(to: string, options: { replace?: boolean } = {}) {
  const target = `#${to}`;
  if (options.replace) {
    window.history.replaceState(null, "", target);
    notify();
  } else if (window.location.hash === target) {
    notify();
  } else {
    window.location.hash = to;
    notify();
  }
}

export function usePath(): string {
  const path = useSyncExternalStore(subscribe, readPath, () => ROUTES.home);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [path]);

  return path;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string };

export function Link({ to, onClick, ...rest }: LinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
  };
  return <a href={`#${to}`} onClick={handleClick} {...rest} />;
}
