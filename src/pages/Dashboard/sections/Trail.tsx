import { Icon } from "../../../components/Icon/Icon";
import { ProgressBar } from "../../../components/ProgressBar/ProgressBar";
import { useAssessment } from "../../../context/AssessmentContext";
import { COLORS } from "../../../data/content";
import { accent, cx } from "../../../utils/accent";
import { SectionHead, WeekChecklist } from "./shared";
import s from "../Dashboard.module.css";

/** As etapas do PDI ficam no mesmo mapa do checklist (salvo por usuário), com prefixo próprio. */
const pdiKey = (task: string) => `pdi:${task}`;

export function Trail() {
  const { result, checklist, toggleChecklist } = useAssessment();
  if (!result) return null;

  const steps = result.pdi;
  const doneCount = steps.filter((p) => checklist[pdiKey(p.task)]).length;
  const currentIndex = steps.findIndex((p) => !checklist[pdiKey(p.task)]);
  const pct = Math.round((doneCount / Math.max(steps.length, 1)) * 100);
  const top = result.scores[0];

  return (
    <>
      <SectionHead title="Sua trilha" subtitle={`PDI focado em ${top?.title ?? "sua área"}. Marque cada etapa ao concluir.`}>
        <div className={s.stageBox}>
          <div className={s.stageText}>
            <Icon name="layers" size={14} />
            {doneCount} de {steps.length} etapas
          </div>
          <ProgressBar pct={pct} color={pct === 100 ? COLORS.green : COLORS.brand} />
        </div>
      </SectionHead>

      <div className={s.topGrid}>
        {/* Linha do tempo do PDI */}
        <section className={s.card}>
          <div className={s.cardTitle}>
            <Icon name="map" size={16} color={COLORS.brand} />
            Plano de Desenvolvimento Individual
          </div>
          <ol className={s.timeline}>
            {steps.map((p, i) => {
              const done = !!checklist[pdiKey(p.task)];
              const current = i === currentIndex;
              return (
                <li key={p.task} className={cx(s.timelineItem, done && s.timelineDone, current && s.timelineCurrent)} style={accent(p.color)}>
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={done}
                    className={s.timelineCheck}
                    onClick={() => toggleChecklist(pdiKey(p.task))}
                    aria-label={`Marcar "${p.task}" como ${done ? "não concluída" : "concluída"}`}
                  >
                    {done ? <Icon name="check" size={13} color="white" strokeWidth={3} /> : i + 1}
                  </button>
                  <div className={s.timelineBody}>
                    <span className={s.trailPeriod}>{p.period}</span>
                    <strong>{p.task}</strong>
                    {current && <span className={s.timelineNow}>Você está aqui</span>}
                    {done && <span className={s.timelineOk}>Concluída</span>}
                  </div>
                </li>
              );
            })}
          </ol>
          {pct === 100 && <p className={s.weekDone}>Trilha concluída! Hora de refazer a avaliação e subir de nível. 🚀</p>}
        </section>

        <WeekChecklist />
      </div>

      <div className={s.topGrid}>
        {/* Afinidade com todas as áreas */}
        <section className={s.card}>
          <div className={s.cardTitle}>
            <Icon name="compass" size={16} color={COLORS.brand} />
            Afinidade com cada área
          </div>
          <div className={s.affinities}>
            {result.scores.map((r, i) => (
              <div key={r.area} className={s.affinity} style={accent(r.color)}>
                <span className={s.affinityIcon}>
                  <Icon name={r.icon} size={16} />
                </span>
                <div className={s.affinityBody}>
                  <div className={s.affinityTop}>
                    <span>
                      {r.title}
                      {i === 0 && <em className={s.topPick}> · maior afinidade</em>}
                    </span>
                    <strong>{r.pct}%</strong>
                  </div>
                  <ProgressBar pct={r.pct} color={r.color} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Por que esse resultado */}
        <section className={s.card}>
          <div className={s.cardTitle}>
            <Icon name="info" size={16} color={COLORS.brand} />
            Por que essa trilha?
          </div>
          <ul className={s.whyList}>
            {result.why.map((w) => (
              <li key={w.text}>
                <span className={s.whyIcon}>
                  <Icon name={w.icon} size={15} />
                </span>
                {w.text}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
