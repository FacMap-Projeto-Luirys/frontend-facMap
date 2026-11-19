import { useMemo, useState, type FormEvent } from "react";
import { Button } from "../../../components/Button/Button";
import { Icon } from "../../../components/Icon/Icon";
import { ProgressBar } from "../../../components/ProgressBar/ProgressBar";
import { useAssessment } from "../../../context/AssessmentContext";
import { AREAS, COLORS, JOB_EXAMPLE, JOB_SKILLS, OPPORTUNITIES, type AreaId } from "../../../data/content";
import { accent, cx } from "../../../utils/accent";
import { Disclaimer, OpportunityGrid, SectionHead, useRecommendedAreas } from "./shared";
import s from "../Dashboard.module.css";

/** Minúsculas e sem acentos, para comparar com as palavras-chave. */
const normalize = (text: string) => text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const escapeRegex = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** Procura a palavra inteira (evita achar "ia" dentro de "experiência", por exemplo). */
const hasKeyword = (text: string, kw: string) => new RegExp(`(^|[^a-z0-9])${escapeRegex(kw)}($|[^a-z0-9])`).test(text);

/** Assuntos da pergunta 4 da avaliação → habilidade correspondente da vaga. */
const CONTACT_TO_SKILL: Record<string, string> = {
  "Git e GitHub": "Git e GitHub",
  "Banco de dados": "SQL e Banco de Dados",
  Terminal: "Linux e Terminal",
};

type Analysis = {
  skills: (typeof JOB_SKILLS)[number][];
  byArea: { area: (typeof AREAS)[number]; count: number; pct: number }[];
  mainArea: AreaId | null;
  fit: number;
};

function analyze(text: string, recommended: AreaId[]): Analysis {
  const norm = normalize(text);
  const skills = JOB_SKILLS.filter((sk) => sk.keywords.some((kw) => hasKeyword(norm, normalize(kw))));
  const total = skills.length || 1;
  const byArea = AREAS.map((area) => {
    const count = skills.filter((sk) => sk.area === area.id).length;
    return { area, count, pct: Math.round((count / total) * 100) };
  }).sort((a, b) => b.count - a.count);
  const mainArea = byArea[0]?.count ? byArea[0].area.id : null;
  const fit = skills.length ? Math.round((skills.filter((sk) => recommended.includes(sk.area)).length / skills.length) * 100) : 0;
  return { skills, byArea, mainArea, fit };
}

export function JobAnalyzer() {
  const { answers } = useAssessment();
  const recommended = useRecommendedAreas();
  const [text, setText] = useState("");
  const [analyzed, setAnalyzed] = useState<string | null>(null);

  const result = useMemo(() => (analyzed ? analyze(analyzed, recommended) : null), [analyzed, recommended]);
  const known = new Set(answers.contatos.map((c) => CONTACT_TO_SKILL[c]).filter(Boolean));

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) setAnalyzed(text);
  };

  const mainArea = result?.mainArea ? AREAS.find((a) => a.id === result.mainArea)! : null;
  const verdict =
    !result || !result.skills.length
      ? null
      : result.fit >= 60
        ? { title: "Boa combinação com o seu caminho", text: "A maior parte do que a vaga pede está nas áreas recomendadas para você.", color: COLORS.green }
        : result.fit >= 30
          ? { title: "Combinação parcial", text: "Parte da vaga conversa com o seu perfil. Os itens marcados como \"para estudar\" mostram o que falta.", color: COLORS.orange }
          : { title: "Fora do seu foco atual", text: "A vaga é de outra área. Vale como experiência, mas o seu PDI não prepara diretamente para ela.", color: COLORS.rose };

  const relatedOpps = result?.mainArea ? OPPORTUNITIES.filter((o) => o.fit.includes(result.mainArea!)).slice(0, 3) : [];

  return (
    <>
      <SectionHead title="Analisar vaga" subtitle="Cole a descrição de uma vaga ou estágio e veja o quanto ela combina com o seu perfil." />

      <form className={s.card} onSubmit={onSubmit}>
        <label htmlFor="job-text" className={s.cardTitle}>
          <Icon name="briefcase" size={16} color={COLORS.brand} />
          Descrição da vaga
        </label>
        <textarea
          id="job-text"
          className={s.textarea}
          rows={8}
          placeholder="Ex.: Estágio em desenvolvimento. Requisitos: HTML, CSS, JavaScript, Git..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className={s.formActions}>
          <Button
            variant="ghost"
            onClick={() => {
              setText(JOB_EXAMPLE);
              setAnalyzed(JOB_EXAMPLE);
            }}
          >
            Usar exemplo
          </Button>
          {analyzed && (
            <Button
              variant="ghost"
              onClick={() => {
                setText("");
                setAnalyzed(null);
              }}
            >
              <Icon name="x" size={14} />
              Limpar
            </Button>
          )}
          <Button type="submit" disabled={!text.trim()}>
            Analisar vaga
            <Icon name="arrow" size={16} />
          </Button>
        </div>
      </form>

      {result && !result.skills.length && (
        <div className={s.empty}>
          <Icon name="info" size={18} />
          Não encontramos habilidades técnicas conhecidas no texto. Tente colar a parte de requisitos da vaga.
        </div>
      )}

      {result && verdict && (
        <>
          <section className={cx(s.card, s.verdict)} style={accent(verdict.color)}>
            <div className={s.verdictScore}>
              <strong>{result.fit}%</strong>
              <span>compatível</span>
            </div>
            <div>
              <h2 className={s.highlightTitle}>{verdict.title}</h2>
              <p className={s.cardText}>{verdict.text}</p>
              {mainArea && (
                <p className={s.verdictArea}>
                  <Icon name={mainArea.icon} size={14} />
                  Área principal da vaga: <strong>{mainArea.title}</strong>
                </p>
              )}
            </div>
          </section>

          <div className={s.topGrid}>
            <section className={s.card}>
              <div className={s.cardTitle}>
                <Icon name="check" size={16} color={COLORS.brand} />
                Habilidades pedidas ({result.skills.length})
              </div>
              <ul className={s.skillList}>
                {result.skills.map((sk) => {
                  const area = AREAS.find((a) => a.id === sk.area)!;
                  const has = known.has(sk.label);
                  const inPath = recommended.includes(sk.area);
                  return (
                    <li key={sk.label} style={accent(area.color)}>
                      <span className={s.affinityIcon}>
                        <Icon name={area.icon} size={14} />
                      </span>
                      <span className={s.skillName}>{sk.label}</span>
                      <span className={cx(s.skillStatus, has ? s.skillHas : inPath ? s.skillPath : s.skillGap)}>
                        {has ? "Você já teve contato" : inPath ? "No seu caminho" : "Para estudar"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>

            <section className={s.card}>
              <div className={s.cardTitle}>
                <Icon name="chart" size={16} color={COLORS.brand} />
                Distribuição por área
              </div>
              <div className={s.affinities}>
                {result.byArea.map(({ area, count, pct }) => (
                  <div key={area.id} className={s.affinity} style={accent(area.color)}>
                    <span className={s.affinityIcon}>
                      <Icon name={area.icon} size={16} />
                    </span>
                    <div className={s.affinityBody}>
                      <div className={s.affinityTop}>
                        <span>
                          {area.title}
                          {recommended.includes(area.id) && <em className={s.topPick}> · seu perfil</em>}
                        </span>
                        <strong>
                          {count} {count === 1 ? "item" : "itens"}
                        </strong>
                      </div>
                      <ProgressBar pct={pct} color={area.color} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {relatedOpps.length > 0 && (
            <section className={s.oppSection}>
              <div className={s.oppHead}>
                <h2>Onde praticar isso na FACAPE</h2>
              </div>
              <OpportunityGrid items={relatedOpps} recommended={recommended} />
            </section>
          )}
        </>
      )}

      <Disclaimer>A análise procura palavras-chave no texto e é só um ponto de partida. Leia a vaga com atenção antes de se candidatar.</Disclaimer>
    </>
  );
}
