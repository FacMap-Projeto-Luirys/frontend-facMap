import { useState, type ReactNode } from "react";
import { Badge } from "../../../components/Badge/Badge";
import { Button } from "../../../components/Button/Button";
import { Icon } from "../../../components/Icon/Icon";
import { Modal } from "../../../components/Modal/Modal";
import { ProgressBar } from "../../../components/ProgressBar/ProgressBar";
import { useAssessment } from "../../../context/AssessmentContext";
import { CHECKLIST, COLORS, OPPORTUNITIES, type AreaId, type Opportunity } from "../../../data/content";
import { accent, cx } from "../../../utils/accent";
import s from "../Dashboard.module.css";

/** Áreas recomendadas pela avaliação (as de maior afinidade). */
export function useRecommendedAreas(): AreaId[] {
  const { result } = useAssessment();
  return (result?.recommendations ?? []).map((r) => r.area);
}

export function SectionHead({ title, subtitle, children }: { title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className={s.hero}>
      <div>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export function WeekChecklist() {
  const { checklist, toggleChecklist } = useAssessment();
  const checkedCount = CHECKLIST.filter((i) => checklist[i.id]).length;
  const progress = Math.round((checkedCount / CHECKLIST.length) * 100);
  const weekDone = checkedCount === CHECKLIST.length;

  return (
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
  );
}

export function OpportunityGrid({ items, recommended = [] }: { items: Opportunity[]; recommended?: AreaId[] }) {
  const [modalId, setModalId] = useState<string | null>(null);
  const modalOpp = OPPORTUNITIES.find((o) => o.id === modalId) ?? null;

  return (
    <>
      <div className={s.oppGrid}>
        {items.map((opp) => {
          const isMatch = opp.fit.some((a) => recommended.includes(a));
          return (
            <article key={opp.id} className={s.oppCard} style={accent(opp.color)}>
              <div className={s.oppTitleRow}>
                <h3>{opp.name}</h3>
                <Badge color={opp.badge}>{opp.category}</Badge>
              </div>
              <p className={s.oppFull}>{opp.fullName}</p>
              {isMatch && (
                <span className={s.matchTag}>
                  <Icon name="star" size={12} />
                  Combina com seu perfil
                </span>
              )}
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
          );
        })}
      </div>

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
    </>
  );
}

export function Disclaimer({ children }: { children: ReactNode }) {
  return (
    <div className={s.disclaimer}>
      <Icon name="info" size={15} />
      <span>{children}</span>
    </div>
  );
}
