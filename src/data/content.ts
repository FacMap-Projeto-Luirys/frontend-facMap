import type { IconName } from "../components/Icon/Icon";

export const COLORS = {
  navy: "#24323F",
  brand: "#1F6B3A",
  rose: "#B4233C",
  cyan: "#0891B2",
  green: "#059669",
  orange: "#D97706",
} as const;

export type BadgeColor = "brand" | "cyan" | "green" | "orange" | "navy" | "rose";

// ─── Landing / boas-vindas ───────────────────────────────────────────────────
export const BENEFITS: { icon: IconName; title: string; text: string; color: string }[] = [
  { icon: "user", title: "Feito para o seu curso", text: "Pensado para alunos de Sistemas de Informação da FACAPE", color: COLORS.brand },
  { icon: "shield", title: "Sem pré-requisitos", text: "Parte do que você já viu nos primeiros períodos", color: COLORS.cyan },
  { icon: "briefcase", title: "Ligado à faculdade", text: "Conecta seu plano aos estágios e projetos da FACAPE", color: COLORS.green },
];

export const JOURNEY = [
  { n: 1, label: "Conte sobre você", desc: "Período no curso, rotina e interesses.", color: COLORS.brand },
  { n: 2, label: "Experimente áreas", desc: "Veja cenários práticos de cada área.", color: COLORS.cyan },
  { n: 3, label: "Entenda o resultado", desc: "Descubra suas afinidades.", color: COLORS.green },
  { n: 4, label: "Monte seu PDI", desc: "Um plano de estudos possível.", color: COLORS.orange },
  { n: 5, label: "Acompanhe sua evolução", desc: "Tarefas semanais e oportunidades da FACAPE.", color: COLORS.navy },
];

// ─── Avaliação: perfil ────────────────────────────────────────────────────────
export const NONE_OPTION = "Ainda não conheço nenhum deles";

export const PERIODO_OPTS = ["1º período", "2º ao 4º período", "5º período ou mais"];
export const TEMPO_OPTS = ["Até 2 horas", "Cerca de 4 horas", "6 horas ou mais"];
export const ATIVIDADE_OPTS = [
  "Criar sites ou aplicativos",
  "Descobrir padrões em dados",
  "Proteger pessoas e sistemas",
  "Entender redes, servidores e serviços em nuvem",
];
export const CONTATO_OPTS = ["Git e GitHub", "Lógica de programação", "Terminal", "Banco de dados"];

// ─── Avaliação: áreas ─────────────────────────────────────────────────────────
export type AreaId = "dev" | "data" | "sec" | "infra";

export const AREAS: { id: AreaId; icon: IconName; title: string; desc: string; color: string; tags: string[] }[] = [
  { id: "dev", icon: "code", title: "Desenvolvimento de software", desc: "Criação de sites, aplicativos, APIs e soluções digitais.", color: COLORS.brand, tags: ["Frontend", "Backend", "APIs"] },
  { id: "data", icon: "chart", title: "Dados e Machine Learning", desc: "Análise de dados, visualizações, previsões e automações.", color: COLORS.cyan, tags: ["Python", "SQL", "BI"] },
  { id: "sec", icon: "shield", title: "Segurança", desc: "Proteção de sistemas, informações e usuários.", color: COLORS.rose, tags: ["Pentest", "Criptografia"] },
  { id: "infra", icon: "server", title: "Infraestrutura, redes e cloud", desc: "Redes, servidores, serviços em nuvem e disponibilidade.", color: COLORS.orange, tags: ["AWS", "Linux", "Docker"] },
];

export const SCENARIO_TEXT =
  "O sistema de matrícula da FACAPE ficou lento bem na semana em que todos os alunos acessam. O que você teria mais vontade de fazer?";

export const SCENARIO_OPTS: { icon: IconName; text: string; area: AreaId }[] = [
  { icon: "code", text: "Investigar onde está o problema", area: "dev" },
  { icon: "chart", text: "Analisar os dados de utilização", area: "data" },
  { icon: "shield", text: "Checar se há acessos suspeitos", area: "sec" },
  { icon: "server", text: "Verificar a infraestrutura e servidores", area: "infra" },
];

// ─── Avaliação: resultado ─────────────────────────────────────────────────────
export const RECOMMENDATIONS: { title: string; pct: number; color: string; icon: IconName; desc: string }[] = [
  { title: "Desenvolvimento de software", pct: 86, color: COLORS.brand, icon: "code", desc: "Criação de sites, aplicativos e soluções digitais." },
  { title: "Dados e Machine Learning", pct: 78, color: COLORS.cyan, icon: "chart", desc: "Análise de dados, visualizações e automações." },
];

export const WHY_RESULT: { icon: IconName; text: string }[] = [
  { icon: "star", text: "Interesse em construir soluções que outras pessoas utilizam" },
  { icon: "layers", text: "Facilidade para organizar problemas em etapas menores" },
  { icon: "chart", text: "Curiosidade para entender padrões e interpretar resultados" },
];

export const PDI_PREVIEW = [
  { period: "Semana 1", task: "Git e GitHub", color: COLORS.brand },
  { period: "Semanas 2–3", task: "HTML e CSS", color: COLORS.cyan },
  { period: "Semanas 4–6", task: "JavaScript básico", color: COLORS.green },
  { period: "Próxima etapa", task: "Projeto autoral", color: COLORS.orange },
];

// ─── Painel / PDI ─────────────────────────────────────────────────────────────
export const CHECKLIST = [
  { id: "c1", text: "Entender o que é controle de versão" },
  { id: "c2", text: "Criar uma conta e um repositório no GitHub" },
  { id: "c3", text: "Enviar o primeiro arquivo usando Git" },
];

export type OpportunityType = "estagio" | "extensao";

export type Opportunity = {
  id: string;
  name: string;
  fullName: string;
  category: string;
  type: OpportunityType;
  desc: string;
  skills: string[];
  areas: string[];
  color: string;
  badge: BadgeColor;
  detail: string;
};

export const OPPORTUNITIES: Opportunity[] = [
  { id: "nti", name: "NTI", fullName: "Núcleo de Tecnologia da Informação", category: "Estágio", type: "estagio", desc: "Apoio ao desenvolvimento e manutenção dos sistemas internos da FACAPE.", skills: ["Suporte técnico", "Redes", "Sistemas"], areas: ["Infraestrutura", "Desenvolvimento"], color: COLORS.brand, badge: "brand", detail: "O NTI da FACAPE é responsável pela infraestrutura tecnológica da instituição. Estudantes podem apoiar o desenvolvimento de soluções internas e suporte técnico." },
  { id: "nte", name: "NTE", fullName: "Núcleo de Tecnologia Educacional", category: "Estágio", type: "estagio", desc: "Desenvolvimento de recursos tecnológicos para apoio ao ensino.", skills: ["Suporte Técnico", "Plataformas", "Educação Digital"], areas: ["Tecnologia", "Atendimento"], color: COLORS.cyan, badge: "cyan", detail: "O NTE trabalha com tecnologias aplicadas à educação. Estudantes participam do desenvolvimento de plataformas e materiais digitais." },
  { id: "techhub", name: "TechHub", fullName: "Laboratório de Inovação TechHub", category: "Estágio", type: "estagio", desc: "Desenvolvimento prático de competências exigidas pelo mercado de tecnologia, com referência nas práticas da SantoDigital.", skills: ["IA", "Cloud", "Desenvolvimento Web"], areas: ["Desenvolvimento", "Inovação"], color: COLORS.green, badge: "green", detail: "O TechHub é um espaço de inovação onde estudantes desenvolvem projetos reais, praticam Git, colaboração e metodologias ágeis." },
  { id: "inovajr", name: "Inova Jr.", fullName: "Empresa Júnior de Tecnologia", category: "Estágio", type: "estagio", desc: "Empresa júnior onde estudantes desenvolvem projetos de tecnologia e vivenciam a rotina de uma empresa.", skills: ["Desenvolvimento Web", "Projetos", "Design"], areas: ["Desenvolvimento", "Inovação"], color: COLORS.orange, badge: "orange", detail: "A Inova Jr. é a empresa júnior da FACAPE. Os estudantes atendem clientes reais e aprendem gestão na prática." },
  { id: "fati", name: "FATI", fullName: "Projeto de Extensão FATI", category: "Extensão", type: "extensao", desc: "Projeto de extensão que promove aprendizado, inclusão digital e integração com pessoas da terceira idade.", skills: ["Ensino", "Inclusão Digital", "Impacto Social"], areas: ["Educação", "Extensão"], color: COLORS.brand, badge: "brand", detail: "O FATI leva educação em tecnologia para comunidades. Estudantes desenvolvem habilidades de ensino e comunicação." },
  { id: "recom", name: "RECOM", fullName: "Rede de Computadores e Comunicação", category: "Extensão", type: "extensao", desc: "Recondicionamento de computadores para doação, unindo prática em hardware e impacto social.", skills: ["Hardware", "Manutenção", "Impacto Social"], areas: ["Hardware", "Extensão"], color: COLORS.cyan, badge: "cyan", detail: "O RECOM atua em redes. Estudantes aprendem configuração, segurança e gerenciamento de redes de computadores." },
  { id: "agrolabs", name: "AGROLABS", fullName: "Laboratório de Agrotecnologia", category: "Extensão", type: "extensao", desc: "Pesquisa e desenvolvimento de soluções tecnológicas para desafios do agronegócio do Vale do São Francisco.", skills: ["IA", "IoT", "Cloud"], areas: ["Tecnologia", "Agronegócio"], color: COLORS.green, badge: "green", detail: "O AGROLABS desenvolve soluções para o agronegócio. Estudantes aplicam IoT e análise de dados em contextos rurais." },
];

export const DASHBOARD_NAV: { id: string; label: string; icon: IconName }[] = [
  { id: "overview", label: "Início", icon: "home" },
  { id: "trilha", label: "Trilha", icon: "layers" },
  { id: "oportunidades", label: "Vagas", icon: "briefcase" },
  { id: "disciplinas", label: "Disciplinas", icon: "book" },
  { id: "vaga", label: "Analisar", icon: "external" },
];
