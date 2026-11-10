import { useEffect, useState, type AnchorHTMLAttributes, type MouseEvent } from "react";

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

export function navigate(to: string, options: { replace?: boolean } = {}) {
  if (options.replace) {
    window.history.replaceState(null, "", `#${to}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  } else {
    window.location.hash = to;
  }
}

export function usePath(): string {
  const [path, setPath] = useState(readPath);

  useEffect(() => {
    const onChange = () => {
      setPath(readPath());
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return path;
}

type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { to: string };

export function Link({ to, onClick, ...rest }: LinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
  };
  return <a href={`#${to}`} onClick={handleClick} {...rest} />;
}
