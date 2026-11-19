import type { ComponentType } from "react";
import { Icon } from "../../components/Icon/Icon";
import { Logo } from "../../components/Logo/Logo";
import { UserChip } from "../../components/UserChip/UserChip";
import { useAssessment } from "../../context/AssessmentContext";
import { DASHBOARD_NAV, type DashboardSection } from "../../data/content";
import { Link, navigate, ROUTES } from "../../router";
import { cx } from "../../utils/accent";
import { Disciplines } from "./sections/Disciplines";
import { JobAnalyzer } from "./sections/JobAnalyzer";
import { Opportunities } from "./sections/Opportunities";
import { Overview } from "./sections/Overview";
import { Trail } from "./sections/Trail";
import s from "./Dashboard.module.css";

/** Descobre a seção ativa a partir da rota (#/painel/trilha → "trilha"). Rota desconhecida cai no Início. */
function sectionFromPath(path: string): DashboardSection {
  return DASHBOARD_NAV.find((item) => item.path === path)?.id ?? "overview";
}

const SECTIONS: Record<DashboardSection, ComponentType> = {
  overview: Overview,
  trilha: Trail,
  oportunidades: Opportunities,
  disciplinas: Disciplines,
  vaga: JobAnalyzer,
};

export function Dashboard({ path }: { path: string }) {
  const { reset } = useAssessment();
  const active = sectionFromPath(path);
  const Section = SECTIONS[active];

  const redo = () => {
    reset();
    navigate(ROUTES.profile);
  };

  return (
    <div className={s.layout}>
      {/* ─── Sidebar (desktop) ───────────────────────────── */}
      <aside className={s.sidebar}>
        <Logo />
        <nav className={s.sideNav} aria-label="Menu do painel">
          {DASHBOARD_NAV.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={cx(s.sideItem, item.id === active && s.sideItemActive)}
              aria-current={item.id === active ? "page" : undefined}
            >
              <Icon name={item.icon} size={19} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className={s.sideFooter}>
          <button className={s.redoBtn} onClick={redo}>
            <Icon name="refresh" size={16} />
            Refazer avaliação
          </button>
          <UserChip />
        </div>
      </aside>

      {/* ─── Topbar (mobile/tablet) ──────────────────────── */}
      <header className={s.topbar}>
        <Logo subtitle={false} />
        <div className={s.topbarRight}>
          <button className={s.topRedo} onClick={redo} aria-label="Refazer avaliação">
            <Icon name="refresh" size={15} />
            <span>Refazer</span>
          </button>
          <UserChip compact />
        </div>
      </header>

      {/* ─── Conteúdo ────────────────────────────────────── */}
      {/* key: reinicia a animação de entrada a cada troca de seção */}
      <main key={active} className={s.main}>
        <Section />
      </main>

      {/* ─── Bottom nav (mobile) ─────────────────────────── */}
      <nav className={s.bottomNav} aria-label="Menu do painel">
        {DASHBOARD_NAV.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={cx(s.bottomItem, item.id === active && s.bottomItemActive)}
            aria-current={item.id === active ? "page" : undefined}
          >
            <Icon name={item.icon} size={20} />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
