import { Badge } from "../../components/Badge/Badge";
import { Button } from "../../components/Button/Button";
import { Icon } from "../../components/Icon/Icon";
import { useAssessment } from "../../context/AssessmentContext";
import { PDI_PREVIEW, RECOMMENDATIONS, WHY_RESULT } from "../../data/content";
import { navigate, ROUTES } from "../../router";
import { accent } from "../../utils/accent";
import { AssessmentLayout } from "./AssessmentLayout";
import s from "./Assessment.module.css";

export function ResultStep() {
  const { complete } = useAssessment();

  const createPdi = () => {
    complete();
    navigate(ROUTES.dashboard);
  };

  return (
    <AssessmentLayout
      step={3}
      title="Dois caminhos para começar explorando"
      subtitle="Com base nas suas respostas, estas são as áreas com maior afinidade com o seu perfil dentro do curso de SI."
      actions={
        <>
          <Button variant="ghost" to={ROUTES.profile}>
            <Icon name="chevronLeft" size={16} />
            Revisar respostas
          </Button>
          <Button size="lg" onClick={createPdi}>
            Criar meu PDI
            <Icon name="arrow" size={18} />
          </Button>
        </>
      }
    >
      <div className={s.resultGrid}>
        <div className={s.resultMain}>
          <div className={s.recGrid}>
            {RECOMMENDATIONS.map((r, i) => (
              <article key={r.title} className={s.recCard} style={accent(r.color)}>
                {i === 0 && <span className={s.recRibbon}>Maior afinidade</span>}
                <div className={s.recTop}>
                  <span className={s.recIcon}>
                    <Icon name={r.icon} size={22} />
                  </span>
                  <div className={s.recPct}>
                    <strong>{r.pct}%</strong>
                    <span>afinidade</span>
                  </div>
                </div>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
                <div className={s.recBar}>
                  <div style={{ width: `${r.pct}%` }} />
                </div>
              </article>
            ))}
          </div>

          <div className={s.notice}>
            <Icon name="refresh" size={16} />
            Este é seu ponto de partida, não seu destino. Você poderá refazer a avaliação quando quiser.
          </div>

          <section className={s.card}>
            <h3 className={s.cardTitle}>Por que esse resultado?</h3>
            <ul className={s.whyList}>
              {WHY_RESULT.map((w) => (
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

        <div className={s.resultSide}>
          <section className={s.card}>
            <h3 className={s.cardTitle}>
              <Icon name="book" size={16} /> Ponte com a faculdade
            </h3>
            <div className={s.discipline}>
              <span>Disciplina</span>
              <strong>Algoritmos e Lógica</strong>
            </div>
            <p className={s.cardText}>
              Ajuda a estruturar soluções e desenvolver o raciocínio utilizado em programação e análise de dados.
            </p>
          </section>

          <section className={s.card}>
            <h3 className={s.cardTitle}>
              <span className={s.cardTitleIcon}>
                <Icon name="book" size={13} color="white" />
              </span>
              Prévia do PDI
              <Badge color="brand">Rascunho</Badge>
            </h3>
            <ul className={s.pdiList}>
              {PDI_PREVIEW.map((p) => (
                <li key={p.task} style={accent(p.color)}>
                  <span className={s.pdiBar} />
                  <div>
                    <span className={s.pdiPeriod}>{p.period}</span>
                    <strong>{p.task}</strong>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </AssessmentLayout>
  );
}
