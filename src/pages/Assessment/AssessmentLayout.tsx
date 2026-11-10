import type { ReactNode } from "react";
import { Icon } from "../../components/Icon/Icon";
import { Logo } from "../../components/Logo/Logo";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { UserChip } from "../../components/UserChip/UserChip";
import { cx } from "../../utils/accent";
import s from "./Assessment.module.css";

const STEPS = ["Seu perfil", "Áreas", "Resultado", "PDI"];

type Props = {
  step: 1 | 2 | 3;
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions: ReactNode;
};

export function AssessmentLayout({ step, title, subtitle, children, actions }: Props) {
  return (
    <div className={s.shell}>
      <header className={s.header}>
        <div className={s.headerInner}>
          <Logo />
          <ol className={s.stepper} aria-label="Etapas da avaliação">
            {STEPS.map((label, i) => {
              const n = i + 1;
              const state = n < step ? s.done : n === step ? s.current : "";
              return (
                <li key={label} className={cx(s.stepItem, state)} aria-current={n === step ? "step" : undefined}>
                  <span className={s.stepCircle}>{n < step ? <Icon name="check" size={13} strokeWidth={3} /> : n}</span>
                  <span className={s.stepLabel}>{label}</span>
                </li>
              );
            })}
          </ol>
          <UserChip />
        </div>
        <div className={s.progressRow}>
          <ProgressBar pct={step * 25} label="Progresso da avaliação" />
          <span className={s.progressText}>Etapa {step} de 4</span>
        </div>
      </header>

      <main className={s.main}>
        <div className={s.titleBlock}>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {children}
        <div className={s.actions}>{actions}</div>
      </main>
    </div>
  );
}
