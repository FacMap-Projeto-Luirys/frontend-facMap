import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { NONE_OPTION, type AreaId } from "../data/content";
import { readJSON, writeJSON } from "../utils/storage";

export type Answers = { periodo: string; tempo: string; atividade: string[]; contatos: string[] };

type AssessmentState = {
  answers: Answers;
  area: AreaId | null;
  scenario: AreaId | null;
  completed: boolean;
  checklist: Record<string, boolean>;
};

const EMPTY: AssessmentState = {
  answers: { periodo: "", tempo: "", atividade: [], contatos: [] },
  area: null,
  scenario: null,
  completed: false,
  checklist: {},
};

type AssessmentContextValue = AssessmentState & {
  profileComplete: boolean;
  setPeriodo: (v: string) => void;
  setTempo: (v: string) => void;
  toggleAtividade: (v: string) => void;
  toggleContato: (v: string) => void;
  selectArea: (id: AreaId) => void;
  setScenario: (id: AreaId) => void;
  complete: () => void;
  toggleChecklist: (id: string) => void;
  reset: () => void;
};

const AssessmentContext = createContext<AssessmentContextValue | null>(null);

/** Estado da avaliação, salvo por usuário no localStorage. Remonte com `key` ao trocar de usuário. */
export function AssessmentProvider({ storageId, children }: { storageId: string; children: ReactNode }) {
  const storageKey = `facmap:assessment:${storageId}`;
  const [state, setState] = useState<AssessmentState>(() => ({ ...EMPTY, ...readJSON<Partial<AssessmentState>>(storageKey, {}) }));

  useEffect(() => {
    writeJSON(storageKey, state);
  }, [storageKey, state]);

  const setAnswers = useCallback((fn: (a: Answers) => Answers) => setState((p) => ({ ...p, answers: fn(p.answers) })), []);

  const toggleContato = useCallback(
    (val: string) =>
      setAnswers((prev) => {
        if (val === NONE_OPTION) return { ...prev, contatos: prev.contatos.includes(val) ? [] : [val] };
        const list = prev.contatos.filter((c) => c !== NONE_OPTION);
        return { ...prev, contatos: list.includes(val) ? list.filter((c) => c !== val) : [...list, val] };
      }),
    [setAnswers],
  );

  const toggleAtividade = useCallback(
    (val: string) =>
      setAnswers((prev) => ({
        ...prev,
        atividade: prev.atividade.includes(val) ? prev.atividade.filter((i) => i !== val) : [...prev.atividade, val],
      })),
    [setAnswers],
  );

  const value = useMemo<AssessmentContextValue>(
    () => ({
      ...state,
      profileComplete: !!(state.answers.periodo && state.answers.tempo && state.answers.atividade.length > 0),
      setPeriodo: (v) => setAnswers((a) => ({ ...a, periodo: v })),
      setTempo: (v) => setAnswers((a) => ({ ...a, tempo: v })),
      toggleAtividade,
      toggleContato,
      selectArea: (id) => setState((p) => ({ ...p, area: id, scenario: null })),
      setScenario: (id) => setState((p) => ({ ...p, scenario: id })),
      complete: () => setState((p) => ({ ...p, completed: true })),
      toggleChecklist: (id) => setState((p) => ({ ...p, checklist: { ...p.checklist, [id]: !p.checklist[id] } })),
      reset: () => setState(EMPTY),
    }),
    [state, setAnswers, toggleAtividade, toggleContato],
  );

  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>;
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error("useAssessment deve ser usado dentro de <AssessmentProvider>");
  return ctx;
}
