import { useState } from "react";
import { OPPORTUNITIES, type AreaId, type OpportunityType } from "../../../data/content";
import { cx } from "../../../utils/accent";
import { Disclaimer, OpportunityGrid, SectionHead, useRecommendedAreas } from "./shared";
import s from "../Dashboard.module.css";

type Filter = "todas" | "recomendadas" | OpportunityType;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "todas", label: "Todas" },
  { key: "recomendadas", label: "Para você" },
  { key: "estagio", label: "Estágios" },
  { key: "extensao", label: "Extensão" },
];

export function Opportunities() {
  const recommended = useRecommendedAreas();
  const [filter, setFilter] = useState<Filter>("todas");

  const isMatch = (fit: AreaId[]) => fit.some((a) => recommended.includes(a));
  const filtered = OPPORTUNITIES.filter((o) => {
    if (filter === "todas") return true;
    if (filter === "recomendadas") return isMatch(o.fit);
    return o.type === filter;
  });
  // As que combinam com o perfil aparecem primeiro.
  const sorted = [...filtered].sort((a, b) => Number(isMatch(b.fit)) - Number(isMatch(a.fit)));

  return (
    <>
      <SectionHead title="Oportunidades da FACAPE" subtitle="Núcleos, estágios e projetos de extensão para colocar seu PDI em prática." />

      <section className={s.oppSection}>
        <div className={s.oppHead}>
          <h2>
            {sorted.length} {sorted.length === 1 ? "oportunidade" : "oportunidades"}
          </h2>
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

        {sorted.length > 0 ? (
          <OpportunityGrid items={sorted} recommended={recommended} />
        ) : (
          <p className={s.empty}>Nenhuma oportunidade neste filtro.</p>
        )}
      </section>

      <Disclaimer>
        As informações deste protótipo são ilustrativas. Disponibilidade, requisitos e processos seletivos devem ser confirmados com a
        FACAPE.
      </Disclaimer>
    </>
  );
}
