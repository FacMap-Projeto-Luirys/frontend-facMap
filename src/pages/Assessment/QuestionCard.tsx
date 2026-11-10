import type { ReactNode } from "react";
import { Icon } from "../../components/Icon/Icon";
import { accent, cx } from "../../utils/accent";
import s from "./Assessment.module.css";

export function QuestionCard({
  num,
  label,
  color,
  hint,
  children,
}: {
  num: number;
  label: string;
  color: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <fieldset className={s.questionCard} style={accent(color)}>
      <legend className={s.srOnly}>{label}</legend>
      <div className={s.questionHead} aria-hidden="true">
        <span className={s.questionNum}>{num}</span>
        <div>
          <div className={s.questionLabel}>{label}</div>
          {hint && <div className={s.questionHint}>{hint}</div>}
        </div>
      </div>
      <div className={s.options}>{children}</div>
    </fieldset>
  );
}

type OptionProps = {
  label: string;
  selected: boolean;
  onClick: () => void;
  color: string;
  kind?: "radio" | "check";
  className?: string;
};

export function OptionCard({ label, selected, onClick, color, kind = "radio", className }: OptionProps) {
  return (
    <button
      type="button"
      role={kind === "radio" ? "radio" : "checkbox"}
      aria-checked={selected}
      onClick={onClick}
      className={cx(s.option, selected && s.optionSelected, className)}
      style={accent(color)}
    >
      <span className={cx(kind === "radio" ? s.radioDot : s.checkDot)}>
        {selected && (kind === "radio" ? <span className={s.radioInner} /> : <Icon name="check" size={11} color="white" strokeWidth={3} />)}
      </span>
      {label}
    </button>
  );
}
