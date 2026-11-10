import { accent, cx } from "../../utils/accent";
import s from "./ProgressBar.module.css";

type Props = { pct: number; color?: string; thick?: boolean; className?: string; label?: string };

export function ProgressBar({ pct, color = "#6D28D9", thick = false, className, label }: Props) {
  const value = Math.max(0, Math.min(100, pct));
  return (
    <div
      className={cx(s.track, thick && s.thick, className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      style={accent(color)}
    >
      <div className={s.fill} style={{ width: `${value}%` }} />
    </div>
  );
}
