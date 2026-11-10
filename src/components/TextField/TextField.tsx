import { useId, useState, type InputHTMLAttributes } from "react";
import { cx } from "../../utils/accent";
import { Icon, type IconName } from "../Icon/Icon";
import s from "./TextField.module.css";

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label: string;
  icon?: IconName;
  error?: string;
  hint?: string;
  onValueChange: (value: string) => void;
};

export function TextField({ label, icon, error, hint, type = "text", onValueChange, className, ...rest }: Props) {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={cx(s.field, className)}>
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
      <div className={cx(s.control, !!error && s.invalid)}>
        {icon && <Icon name={icon} size={18} className={s.icon} />}
        <input
          id={id}
          type={isPassword && showPassword ? "text" : type}
          className={s.input}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          onChange={(e) => onValueChange(e.target.value)}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            className={s.toggle}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            <Icon name={showPassword ? "eyeOff" : "eye"} size={18} />
          </button>
        )}
      </div>
      {error ? (
        <span id={`${id}-error`} className={s.error}>
          {error}
        </span>
      ) : (
        hint && (
          <span id={`${id}-hint`} className={s.hint}>
            {hint}
          </span>
        )
      )}
    </div>
  );
}
