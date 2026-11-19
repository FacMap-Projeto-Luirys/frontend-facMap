import { useState } from "react";
import { Icon } from "../../../components/Icon/Icon";
import { useAssessment } from "../../../context/AssessmentContext";
import { AREAS, COLORS, DISCIPLINES, type AreaId } from "../../../data/content";
import { accent, cx } from "../../../utils/accent";
import { Disclaimer, SectionHead, useRecommendedAreas } from "./shared";
import s from "../Dashboard.module.css";

type Filter = "perfil" | "todas" | AreaId;

const areaOf = (id: AreaId) => AREAS.find((a) => a.id === id)!;

export function Disciplines() {
  const { result } = useAssessment();
  const recommended = useRecommendedAreas();
  const [filter, setFilter] = useState<Filter>("perfil");

  const filters: { key: Filter; label: string }[] = [
    { key: "perfil", label: "Para você" },
    { key: "todas", label: "Todas" },
    ...AREAS.map((a) => ({ key: a.id as Filter, label: a.title.split(/[ ,]/)[0] })),
  ];

  const list = DISCIPLINES.filter((d) => {
    if (filter === "todas") return true;
    if (filter === "perfil") return d.areas.some((a) => recommended.includes(a));
    return d.areas.includes(filter);
  });

  return (
    <>
      <SectionHead title="Disciplinas" subtitle="As matérias do curso de SI que mais ajudam no caminho que você escolheu." />

      {result && (
        <section className={cx(s.card, s.highlight)} style={accent(result.scores[0]?.color ?? COLORS.brand)}>
          <span className={s.highlightIcon}>
            <Icon name="book" size={22} />
          </span>
          <div>
            <span className={s.highlightLabel}>Ponte com a faculdade · disciplina-chave</span>
            <h2 className={s.highlightTitle}>{result.discipline.name}</h2>
            <p className={s.cardText}>{result.discipline.text}</p>
          </div>
        </section>
      )}

      <section className={s.oppSection}>
        <div className={s.oppHead}>
          <h2>
            {list.length} {list.length === 1 ? "disciplina" : "disciplinas"}
          </h2>
          <div className={s.filters} role="tablist" aria-label="Filtrar disciplinas">
            {filters.map((f) => (
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

        <div className={s.discGrid}>
          {list.map((d) => {
            const main = areaOf(d.areas[0]);
            const isKey = !!result && d.name.startsWith(result.discipline.name);
            return (
              <article key={d.name} className={s.discCard} style={accent(main.color)}>
                <div className={s.discTop}>
                  <span className={s.affinityIcon}>
                    <Icon name={main.icon} size={16} />
                  </span>
                  {isKey && <span className={s.matchTag}>Disciplina-chave</span>}
                </div>
                <h3>{d.name}</h3>
                <p>{d.text}</p>
                <div className={s.tags}>
                  {d.areas.map((a) => {
                    const area = areaOf(a);
                    return (
                      <span key={a} className={s.tag} style={accent(area.color)}>
                        {area.title}
                      </span>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <Disclaimer>Os nomes das disciplinas podem variar de acordo com a matriz curricular. Confirme a grade com a coordenação do curso.</Disclaimer>
    </>
  );
}
