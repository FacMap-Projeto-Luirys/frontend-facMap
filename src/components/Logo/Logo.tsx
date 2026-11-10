import { Link, ROUTES } from "../../router";
import { cx } from "../../utils/accent";
import { Icon } from "../Icon/Icon";
import s from "./Logo.module.css";

type Props = { inverted?: boolean; subtitle?: boolean; to?: string; className?: string };

export function Logo({ inverted = false, subtitle = true, to = ROUTES.home, className }: Props) {
  return (
    <Link to={to} className={cx(s.logo, inverted && s.inverted, className)} aria-label="FacMap — página inicial">
      <span className={s.mark}>
        <Icon name="compass" size={18} color="white" />
      </span>
      <span className={s.text}>
        <span className={s.name}>
          Fac<span className={s.accent}>Map</span>
        </span>
        {subtitle && <span className={s.subtitle}>Orientação de carreira em TI</span>}
      </span>
    </Link>
  );
}
