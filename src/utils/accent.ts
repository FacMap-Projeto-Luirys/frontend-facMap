import type { CSSProperties } from "react";

/**
 * Define a variável CSS --accent usada pelos módulos CSS para colorir
 * cartões, tags e seleções dinamicamente (via color-mix).
 */
export function accent(color: string, extra?: CSSProperties): CSSProperties {
  return { ["--accent" as string]: color, ...extra } as CSSProperties;
}

export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
