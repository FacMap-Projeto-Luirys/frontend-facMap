import { Link, ROUTES } from "../../router";
import { cx } from "../../utils/accent";
import s from "./Logo.module.css";

type Props = { inverted?: boolean; subtitle?: boolean; to?: string; className?: string };

export function Logo({ inverted = false, subtitle = true, to = ROUTES.home, className }: Props) {
  return (
    <Link to={to} className={cx(s.logo, inverted && s.inverted, className)} aria-label="FacMap — página inicial">
      <span className={s.mark}>
        {/* a mesma marca da landing (três barras) */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
          <rect x="2" y="2.5" width="20" height="5.5" rx="2.75" />
          <rect x="2" y="9.25" width="14" height="5.5" rx="2.75" />
          <rect x="2" y="16" width="8" height="5.5" rx="2.75" />
        </svg>
      </span>
      <span className={s.text}>
        <span className={s.name}>
          Fac<span className={s.accent}>Map</span>
        </span>
        {subtitle && <span className={s.subtitle}>Orientação para alunos da FACAPE</span>}
      </span>
    </Link>
  );
}
