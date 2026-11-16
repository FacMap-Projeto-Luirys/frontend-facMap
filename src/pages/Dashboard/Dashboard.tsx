import { useState } from "react";
import { Badge } from "../../components/Badge/Badge";
import { Button } from "../../components/Button/Button";
import { Icon } from "../../components/Icon/Icon";
import { Logo } from "../../components/Logo/Logo";
import { Modal } from "../../components/Modal/Modal";
import { ProgressBar } from "../../components/ProgressBar/ProgressBar";
import { UserChip } from "../../components/UserChip/UserChip";
import { useAssessment } from "../../context/AssessmentContext";
import { useAuth } from "../../context/AuthContext";
import {
  CHECKLIST,
  COLORS,
  DASHBOARD_NAV,
  OPPORTUNITIES,
  PDI_PREVIEW,
  RECOMMENDATIONS,
  type OpportunityType,
} from "../../data/content";
import { navigate, ROUTES } from "../../router";
import { accent, cx } from "../../utils/accent";
import s from "./Dashboard.module.css";

type Filter = "todas" | OpportunityType;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "estagio", label: "Estágios" },
  { key: "extensao", label: "Extensão" },
];

const ACTIVE_NAV = "oportunidades";

export function Dashboard() {
  const { user } = useAuth();
  const { answers, checklist, toggleChecklist, reset } = useAssessment();
  const [filter, setFilter] = useState<Filter>("todas");
  const [modalId, setModalId] = useState<string | null>(null);

  const firstName = user?.name.split(" ")[0] ?? "";
  const checkedCount = CHECKLIST.filter((i) => checklist[i.id]).length;
  const progress = Math.round((checkedCount / CHECKLIST.length) * 100);
  const weekDone = checkedCount === CHECKLIST.length;

  const filtered = OPPORTUNITIES.filter((o) => filter === "todas" || o.type === filter);
  const modalOpp = OPPORTUNITIES.find((o) => o.id === modalId) ?? null;

  const redo = () => {
    reset();
    navigate(ROUTES.profile);
  };

  const planInfo = [answers.periodo, answers.tempo && `${answers.tempo.toLowerCase()} por semana`].filter(Boolean).join(" · ");

  return (
    <div className={s.layout}>
      {/* ─── Sidebar (desktop) ───────────────────────────── */}
      <aside className={s.sidebar}>
        <Logo />
        <nav className={s.sideNav} aria-label="Menu do painel">
          {DASHBOARD_NAV.map((item) => (
            <span key={item.id} className={cx(s.sideItem, item.id === ACTIVE_NAV && s.sideItemActive)} aria-current={item.id === ACTIVE_NAV ? "page" : undefined}>
              <Icon name={item.icon} size={19} />
              {item.label}
            </span>
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
      <main className={s.main}>
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
          {/* Checklist semanal */}
          <section className={s.card}>
            <div className={s.cardHeadRow}>
              <div className={s.cardTitle}>
                <Icon name="star" size={16} color={COLORS.brand} />
                Minha semana
                <Badge color="brand">Git e GitHub</Badge>
              </div>
              <span className={cx(s.count, weekDone && s.countDone)}>
                {checkedCount}/{CHECKLIST.length}
              </span>
            </div>
            <ProgressBar pct={progress} color={weekDone ? COLORS.green : COLORS.brand} />
            <ul className={s.checklist}>
              {CHECKLIST.map((item) => {
                const done = !!checklist[item.id];
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={done}
                      className={cx(s.checkItem, done && s.checkItemDone)}
                      onClick={() => toggleChecklist(item.id)}
                    >
                      <span className={s.checkBox}>{done && <Icon name="check" size={12} color="white" strokeWidth={3} />}</span>
                      {item.text}
                    </button>
                  </li>
                );
              })}
            </ul>
            {weekDone && <p className={s.weekDone}>Semana concluída! 🎉</p>}
          </section>

          {/* Resumo do caminho */}
          <section className={s.card}>
            <div className={s.cardTitle}>
              <Icon name="compass" size={16} color={COLORS.brand} />
              Seu caminho
            </div>
            <div className={s.affinities}>
              {RECOMMENDATIONS.map((r) => (
                <div key={r.title} className={s.affinity} style={accent(r.color)}>
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
                {PDI_PREVIEW.map((p, i) => (
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

        {/* Oportunidades */}
        <section className={s.oppSection}>
          <div className={s.oppHead}>
            <h2>Conheça as oportunidades da FACAPE</h2>
            <div className={s.filters} role="tablist" aria-label="Filtrar oportunidades">
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  role="tab"
                  aria-selected={filter === f.key}
                  className={cx(s.filter, filter === f.key && s.filterActive)}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className={s.oppGrid}>
            {filtered.map((opp) => (
              <article key={opp.id} className={s.oppCard} style={accent(opp.color)}>
                <div className={s.oppTitleRow}>
                  <h3>{opp.name}</h3>
                  <Badge color={opp.badge}>{opp.category}</Badge>
                </div>
                <p className={s.oppFull}>{opp.fullName}</p>
                <p className={s.oppDesc}>{opp.desc}</p>
                <div className={s.tags}>
                  {opp.skills.map((sk) => (
                    <span key={sk} className={s.tag}>
                      {sk}
                    </span>
                  ))}
                </div>
                <div className={s.oppAreas}>
                  <Icon name="layers" size={13} />
                  {opp.areas.join(" · ")}
                </div>
                <Button variant="outline" full size="sm" onClick={() => setModalId(opp.id)} className={s.oppBtn}>
                  Conhecer oportunidade
                </Button>
              </article>
            ))}
          </div>
        </section>

        <div className={s.disclaimer}>
          <Icon name="info" size={15} />
          As informações deste protótipo são ilustrativas. Disponibilidade, requisitos e processos seletivos devem ser
          confirmados com a FACAPE.
        </div>
      </main>

      {/* ─── Bottom nav (mobile) ─────────────────────────── */}
      <nav className={s.bottomNav} aria-label="Menu do painel">
        {DASHBOARD_NAV.map((item) => (
          <span key={item.id} className={cx(s.bottomItem, item.id === ACTIVE_NAV && s.bottomItemActive)}>
            <Icon name={item.icon} size={20} />
            {item.label}
          </span>
        ))}
      </nav>

      {/* ─── Modal ───────────────────────────────────────── */}
      <Modal open={!!modalOpp} onClose={() => setModalId(null)} labelledBy="opp-title">
        {modalOpp && (
          <div className={s.modal} style={accent(modalOpp.color)}>
            <Badge color={modalOpp.badge}>{modalOpp.category}</Badge>
            <h3 id="opp-title" className={s.modalTitle}>
              {modalOpp.name}
            </h3>
            <p className={s.modalSub}>{modalOpp.fullName}</p>
            <p className={s.modalText}>{modalOpp.detail}</p>
            <div className={s.modalBlock}>
              <span className={s.modalLabel}>O que você pode desenvolver</span>
              <div className={s.tags}>
                {modalOpp.skills.map((sk) => (
                  <span key={sk} className={cx(s.tag, s.tagLg)}>
                    {sk}
                  </span>
                ))}
              </div>
            </div>
            <div className={s.modalWarn}>As informações são ilustrativas. Confirme disponibilidade e requisitos com a FACAPE.</div>
            <Button full onClick={() => setModalId(null)}>
              Entendido
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
}
