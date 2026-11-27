import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "../../router";
import { cx } from "../../utils/accent";
import s from "./Button.module.css";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "light";
type Size = "sm" | "md" | "lg";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & { to?: undefined; href?: undefined };
type LinkButtonProps = CommonProps & { to: string; href?: undefined; onClick?: () => void };
/** Link para fora do app: abre em outra aba. */
type ExternalButtonProps = CommonProps & { href: string; to?: undefined };

export function Button(props: ButtonProps | LinkButtonProps | ExternalButtonProps) {
  const { variant = "primary", size = "md", full = false, className, children } = props;
  const classes = cx(s.btn, s[variant], s[size], full && s.full, className);

  if (props.href !== undefined) {
    return (
      <a href={props.href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  if (props.to !== undefined) {
    return (
      <Link to={props.to} className={classes} onClick={props.onClick}>
        {children}
      </Link>
    );
  }

  const { variant: _v, size: _s, full: _f, className: _c, children: _ch, to: _t, href: _h, type = "button", ...rest } = props;
  return (
    <button type={type} className={classes} {...rest}>
      {children}
    </button>
  );
}
