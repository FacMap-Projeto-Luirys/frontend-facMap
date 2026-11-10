import type { ReactNode } from "react";
import type { BadgeColor } from "../../data/content";
import { cx } from "../../utils/accent";
import s from "./Badge.module.css";

export function Badge({ children, color = "purple", className }: { children: ReactNode; color?: BadgeColor; className?: string }) {
  return <span className={cx(s.badge, s[color], className)}>{children}</span>;
}
