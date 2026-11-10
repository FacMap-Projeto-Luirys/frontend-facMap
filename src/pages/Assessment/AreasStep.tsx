import { Button } from "../../components/Button/Button";
import { Icon } from "../../components/Icon/Icon";
import { useAssessment } from "../../context/AssessmentContext";
import { AREAS, SCENARIO_OPTS, SCENARIO_TEXT } from "../../data/content";
import { navigate, ROUTES } from "../../router";
import { accent, cx } from "../../utils/accent";
import { AssessmentLayout } from "./AssessmentLayout";
import s from "./Assessment.module.css";

export function AreasStep() {
  const { area, scenario, selectArea, setScenario } = useAssessment();
  const sel = AREAS.find((a) => a.id === area);

  return (
    <AssessmentLayout
      step={2}
      title="Conheça as áreas antes de escolher"
      subtitle="Selecione um caminho e veja um exemplo de atividade."
      actions={
        <>
          <Button variant="ghost" to={ROUTES.profile}>
            <Icon name="chevronLeft" size={16} />
            Voltar
          </Button>
          <div className={s.actionsRight}>
            {!area && <span className={s.actionHint}>Selecione uma área para continuar</span>}
            <Button size="lg" disabled={!area} onClick={() => navigate(ROUTES.result)}>
              Ver meu resultado
              <Icon name="chevronRight" size={18} />
            </Button>
          </div>
        </>
      }
    >
      <div className={s.areasLayout}>
        <div className={s.areaGrid} role="radiogroup" aria-label="Áreas de TI">
          {AREAS.map((a) => {
            const isSel = area === a.id;
            return (
              <button
                key={a.id}
                type="button"
                role="radio"
                aria-checked={isSel}
                onClick={() => selectArea(a.id)}
                className={cx(s.areaCard, isSel && s.areaCardSelected)}
                style={accent(a.color)}
              >
                <div className={s.areaCardTop}>
                  <span className={s.areaIcon}>
                    <Icon name={a.icon} size={20} />
                  </span>
                  <span className={s.areaCheck}>{isSel && <Icon name="check" size={12} color="white" strokeWidth={3} />}</span>
                </div>
                <h3 className={s.areaTitle}>{a.title}</h3>
                <p className={s.areaDesc}>{a.desc}</p>
                <div className={s.tags}>
                  {a.tags.map((t) => (
                    <span key={t} className={s.tag}>
                      {t}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        <aside className={s.scenarioCol}>
          {sel ? (
            <div key={sel.id} className={s.scenario} style={accent(sel.color)}>
              <div className={s.scenarioHead}>
                <Icon name={sel.icon} size={16} />
                Cenário prático · {sel.title}
              </div>
              <p className={s.scenarioText}>{SCENARIO_TEXT}</p>
              <div className={s.optionList} role="radiogroup" aria-label="O que você faria?">
                {SCENARIO_OPTS.map((opt) => {
                  const a = AREAS.find((x) => x.id === opt.area)!;
                  const isSel = scenario === opt.area;
                  return (
                    <button
                      key={opt.area}
                      type="button"
                      role="radio"
                      aria-checked={isSel}
                      onClick={() => setScenario(opt.area)}
                      className={cx(s.scenarioOpt, isSel && s.optionSelected)}
                      style={accent(a.color)}
                    >
                      <Icon name={opt.icon} size={16} />
                      {opt.text}
                    </button>
                  );
                })}
              </div>
              {scenario && (
                <p className={s.scenarioNote}>
                  Observamos sua curiosidade, sua forma de raciocinar e os tipos de problema que mais chamam sua atenção.
                </p>
              )}
            </div>
          ) : (
            <div className={s.scenarioEmpty}>
              <span className={s.scenarioEmptyIcon}>
                <Icon name="compass" size={26} />
              </span>
              <strong>Escolha uma área</strong>
              <p>Ao selecionar uma área, você verá um cenário prático para experimentar como é o dia a dia nela.</p>
            </div>
          )}
        </aside>
      </div>
    </AssessmentLayout>
  );
}
