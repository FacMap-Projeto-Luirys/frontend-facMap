import { Button } from "../../components/Button/Button";
import { Icon } from "../../components/Icon/Icon";
import { useAssessment } from "../../context/AssessmentContext";
import { ATIVIDADE_OPTS, COLORS, CONTATO_OPTS, NONE_OPTION, PERIODO_OPTS, TEMPO_OPTS } from "../../data/content";
import { navigate, ROUTES } from "../../router";
import { AssessmentLayout } from "./AssessmentLayout";
import { OptionCard, QuestionCard } from "./QuestionCard";
import s from "./Assessment.module.css";

export function ProfileStep() {
  const { answers, setPeriodo, setTempo, toggleAtividade, toggleContato, profileComplete } = useAssessment();

  return (
    <AssessmentLayout
      step={1}
      title="Vamos entender seu momento"
      subtitle="Não existe resposta certa. Queremos saber em que ponto do curso de SI da FACAPE você está, não testar tecnologia."
      actions={
        <>
          <Button variant="ghost" to={ROUTES.home}>
            <Icon name="chevronLeft" size={16} />
            Voltar
          </Button>
          <div className={s.actionsRight}>
            {!profileComplete && <span className={s.actionHint}>Responda as perguntas 1, 2 e 3 para continuar</span>}
            <Button size="lg" disabled={!profileComplete} onClick={() => navigate(ROUTES.areas)}>
              Experimentar áreas
              <Icon name="chevronRight" size={18} />
            </Button>
          </div>
        </>
      }
    >
      <div className={s.questionsGrid}>
        <QuestionCard num={1} label="Em qual período da faculdade você está?" color={COLORS.brand}>
          <div role="radiogroup" className={s.optionList}>
            {PERIODO_OPTS.map((o) => (
              <OptionCard key={o} label={o} selected={answers.periodo === o} onClick={() => setPeriodo(o)} color={COLORS.brand} />
            ))}
          </div>
        </QuestionCard>

        <QuestionCard num={2} label="Quanto tempo você consegue estudar por semana?" color={COLORS.cyan}>
          <div role="radiogroup" className={s.optionList}>
            {TEMPO_OPTS.map((o) => (
              <OptionCard key={o} label={o} selected={answers.tempo === o} onClick={() => setTempo(o)} color={COLORS.cyan} />
            ))}
          </div>
        </QuestionCard>

        <QuestionCard num={3} label="Qual atividade parece mais interessante?" hint="Pode marcar mais de uma" color={COLORS.green}>
          <div className={s.optionList}>
            {ATIVIDADE_OPTS.map((o) => (
              <OptionCard
                key={o}
                label={o}
                kind="check"
                selected={answers.atividade.includes(o)}
                onClick={() => toggleAtividade(o)}
                color={COLORS.green}
              />
            ))}
          </div>
        </QuestionCard>

        <QuestionCard num={4} label="Com quais assuntos você já teve contato?" hint="Pode marcar mais de um" color={COLORS.orange}>
          <div className={s.optionGrid}>
            {CONTATO_OPTS.map((o) => (
              <OptionCard
                key={o}
                label={o}
                kind="check"
                selected={answers.contatos.includes(o)}
                onClick={() => toggleContato(o)}
                color={COLORS.orange}
              />
            ))}
            <OptionCard
              label={NONE_OPTION}
              kind="check"
              selected={answers.contatos.includes(NONE_OPTION)}
              onClick={() => toggleContato(NONE_OPTION)}
              color={COLORS.orange}
              className={s.spanAll}
            />
          </div>
        </QuestionCard>
      </div>
    </AssessmentLayout>
  );
}
