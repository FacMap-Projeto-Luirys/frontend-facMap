import { Icon } from "../../../components/Icon/Icon";
import { ProgressBar } from "../../../components/ProgressBar/ProgressBar";
import { useAssessment } from "../../../context/AssessmentContext";
import { useAuth } from "../../../context/AuthContext";
import { COLORS, DASHBOARD_NAV, OPPORTUNITIES } from "../../../data/content";
import { Link } from "../../../router";
import { accent, cx } from "../../../utils/accent";
import { OpportunityGrid, useRecommendedAreas, WeekChecklist } from "./shared";
import s from "../Dashboard.module.css";

const pathOf = (id: string) => DASHBOARD_NAV.find((n) => n.id === id)!.path;

export function Overview() {
  const { user } = useAuth();
  const { answers, result } = useAssessment();
  const recommended = useRecommendedAreas();

  const firstName = user?.name.split(" ")[0] ?? "";
  const planInfo = [answers.periodo, answers.tempo && `${answers.tempo.toLowerCase()} por semana`].filter(Boolean).join(" · ");
  const topOpps = OPPORTUNITIES.filter((o) => o.fit.some((a) => recommended.includes(a))).slice(0, 3);

  return (
    <>
      <section className={s.hero}>
        <div>
          <h1>Olá, {firstName}! Este é o seu próximo passo.</h1>
          <p>Plano inicial{planInfo && ` · ${planInfo}`}</p>
        </div>
        <div className={s.stageBox}>
          <div className={s.stageText}>
            <Icon name="check" size={14} strokeWidth={3} />
            Etapa 4 de 4 · Concluído
          </div>
          <ProgressBar pct={100} color={COLORS.green} />
        </div>
      </section>

      <div className={s.topGrid}>
        <WeekChecklist />

        {/* Resumo do caminho */}
        <section className={s.card}>
          <div className={s.cardHeadRow}>
            <div className={s.cardTitle}>
              <Icon name="compass" size={16} color={COLORS.brand} />
              Seu caminho
            </div>
            <Link to={pathOf("trilha")} className={s.seeAll}>
              Ver trilha
              <Icon name="chevronRight" size={14} />
            </Link>
          </div>
          <div className={s.affinities}>
            {result?.recommendations.map((r) => (
              <div key={r.area} className={s.affinity} style={accent(r.color)}>
                <span className={s.affinityIcon}>
                  <Icon name={r.icon} size={16} />
                </span>
                <div className={s.affinityBody}>
                  <div className={s.affinityTop}>
                    <span>{r.title}</span>
                    <strong>{r.pct}%</strong>
                  </div>
                  <ProgressBar pct={r.pct} color={r.color} />
                </div>
              </div>
            ))}
          </div>
          <div className={s.trail}>
            <span className={s.trailLabel}>Trilha do PDI</span>
            <ol className={s.trailList}>
              {result?.pdi.map((p, i) => (
                <li key={p.task} className={cx(i === 0 && s.trailCurrent)} style={accent(p.color)}>
                  <span className={s.trailDot} />
                  <div>
                    <span className={s.trailPeriod}>{p.period}</span>
                    <strong>{p.task}</strong>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>

      {/* Atalhos para as outras seções */}
      <div className={s.shortcuts}>
        {DASHBOARD_NAV.filter((n) => n.id !== "overview").map((n) => (
          <Link key={n.id} to={n.path} className={s.shortcut}>
            <span className={s.shortcutIcon}>
              <Icon name={n.icon} size={18} />
            </span>
            <span className={s.shortcutText}>
              <strong>{n.label}</strong>
              <span>
                {n.id === "trilha" && "Seu PDI semana a semana"}
                {n.id === "oportunidades" && "Estágios e extensão da FACAPE"}
                {n.id === "disciplinas" && "Matérias ligadas ao seu perfil"}
                {n.id === "vaga" && "Cole uma vaga e veja se combina"}
              </span>
            </span>
            <Icon name="chevronRight" size={16} />
          </Link>
        ))}
      </div>

      {topOpps.length > 0 && (
        <section className={s.oppSection}>
          <div className={s.oppHead}>
            <h2>Recomendadas para você</h2>
            <Link to={pathOf("oportunidades")} className={s.seeAll}>
              Ver todas as vagas
              <Icon name="chevronRight" size={14} />
            </Link>
          </div>
          <OpportunityGrid items={topOpps} recommended={recommended} />
        </section>
      )}
    </>
  );
}
