import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { IconName } from "../components/Icon/Icon";
import { NONE_OPTION, type AreaId } from "../data/content";
import { api, ApiError } from "../utils/api";
import { readJSON, writeJSON } from "../utils/storage";

export type Answers = { periodo: string; tempo: string; atividade: string[]; contatos: string[] };

/** Resultado calculado pelo backend a partir do assessment.json. */
export type AreaScore = { area: AreaId; title: string; desc: string; icon: IconName; color: string; score: number; max_score: number; pct: number };
export type AssessmentResult = {
  id: number;
  version: number;
  created_at: string;
  answers: Record<string, string | string[]>;
  top_area: AreaId;
  scores: AreaScore[];
  recommendations: AreaScore[];
  why: { icon: IconName; text: string }[];
  discipline: { name: string; text: string };
  pdi: { period: string; task: string; color: string }[];
};

type AssessmentState = {
  answers: Answers;
  area: AreaId | null;
  scenario: AreaId | null;
  result: AssessmentResult | null;
  completed: boolean;
  checklist: Record<string, boolean>;
};

const EMPTY: AssessmentState = {
  answers: { periodo: "", tempo: "", atividade: [], contatos: [] },
  area: null,
  scenario: null,
  result: null,
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
  /** Envia as respostas para a API e guarda o resultado. Retorna a mensagem de erro, se houver. */
  submit: () => Promise<string | null>;
  complete: () => void;
  toggleChecklist: (id: string) => void;
  reset: () => void;
};

const AssessmentContext = createContext<AssessmentContextValue | null>(null);

const asList = (v: unknown) => (Array.isArray(v) ? v.map(String) : []);
const asText = (v: unknown) => (typeof v === "string" ? v : "");

/**
 * Estado da avaliação, salvo por usuário no localStorage. Remonte com `key` ao trocar de usuário.
 * Qualquer mudança nas respostas descarta o resultado anterior (ele é recalculado pela API).
 */
export function AssessmentProvider({
  storageId,
  authenticated,
  children,
}: {
  storageId: string;
  authenticated: boolean;
  children: ReactNode;
}) {
  const storageKey = `facmap:assessment:${storageId}`;
  const [state, setState] = useState<AssessmentState>(() => ({ ...EMPTY, ...readJSON<Partial<AssessmentState>>(storageKey, {}) }));

  useEffect(() => {
    writeJSON(storageKey, state);
  }, [storageKey, state]);

  // Sem nada salvo neste navegador? Recupera a última avaliação do usuário na API.
  useEffect(() => {
    if (!authenticated || state.result || state.answers.periodo) return;
    let active = true;
    api<AssessmentResult>("/assessment/latest", { auth: true })
      .then((r) => {
        if (!active) return;
        setState((p) =>
          p.result || p.answers.periodo
            ? p
            : {
                ...p,
                answers: {
                  periodo: asText(r.answers.periodo),
                  tempo: asText(r.answers.tempo),
                  atividade: asList(r.answers.atividade),
                  contatos: asList(r.answers.contatos),
                },
                area: (asText(r.answers.area) || null) as AreaId | null,
                scenario: (asText(r.answers.scenario) || null) as AreaId | null,
                result: r,
                completed: true,
              },
        );
      })
      .catch(() => {
        /* 404 = ainda não fez a avaliação */
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated]);

  const setAnswers = useCallback(
    (fn: (a: Answers) => Answers) => setState((p) => ({ ...p, answers: fn(p.answers), result: null })),
    [],
  );

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

  const { answers, area, scenario } = state;
  const submit = useCallback(async () => {
    try {
      const result = await api<AssessmentResult>("/assessment", {
        method: "POST",
        auth: true,
        body: { answers: { ...answers, area, scenario } },
      });
      setState((p) => ({ ...p, result }));
      return null;
    } catch (e) {
      return e instanceof ApiError ? e.message : "Não foi possível calcular seu resultado.";
    }
  }, [answers, area, scenario]);

  const value = useMemo<AssessmentContextValue>(
    () => ({
      ...state,
      profileComplete: !!(state.answers.periodo && state.answers.tempo && state.answers.atividade.length > 0),
      setPeriodo: (v) => setAnswers((a) => ({ ...a, periodo: v })),
      setTempo: (v) => setAnswers((a) => ({ ...a, tempo: v })),
      toggleAtividade,
      toggleContato,
      selectArea: (id) => setState((p) => (p.area === id ? p : { ...p, area: id, scenario: null, result: null })),
      setScenario: (id) => setState((p) => (p.scenario === id ? p : { ...p, scenario: id, result: null })),
      submit,
      complete: () => setState((p) => ({ ...p, completed: true })),
      toggleChecklist: (id) => setState((p) => ({ ...p, checklist: { ...p.checklist, [id]: !p.checklist[id] } })),
      reset: () => setState(EMPTY),
    }),
    [state, setAnswers, toggleAtividade, toggleContato, submit],
  );

  return <AssessmentContext.Provider value={value}>{children}</AssessmentContext.Provider>;
}

export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error("useAssessment deve ser usado dentro de <AssessmentProvider>");
  return ctx;
}
