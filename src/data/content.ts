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
  { icon: "user", title: "Feito para o seu curso", text: "Pensado para alunos de Ciência da Computação da FACAPE", color: COLORS.brand },
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

// O resultado da avaliação (afinidades, "por que", disciplina e prévia do PDI) é calculado
// pelo backend a partir de backend-facMap/app/data/assessment.json.

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
  /** Áreas da avaliação com as quais a oportunidade combina (usado para recomendar). */
  fit: AreaId[];
  color: string;
  badge: BadgeColor;
  detail: string;
};

export const OPPORTUNITIES: Opportunity[] = [
  { id: "nti", name: "NTI", fullName: "Núcleo de Tecnologia da Informação", category: "Estágio", type: "estagio", desc: "Apoio ao desenvolvimento e manutenção dos sistemas internos da FACAPE.", skills: ["Suporte técnico", "Redes", "Sistemas"], areas: ["Infraestrutura", "Desenvolvimento"], fit: ["infra", "dev", "sec"], color: COLORS.brand, badge: "brand", detail: "O NTI da FACAPE é responsável pela infraestrutura tecnológica da instituição. Estudantes podem apoiar o desenvolvimento de soluções internas e suporte técnico." },
  { id: "nte", name: "NTE", fullName: "Núcleo de Tecnologia Educacional", category: "Estágio", type: "estagio", desc: "Desenvolvimento de recursos tecnológicos para apoio ao ensino.", skills: ["Suporte Técnico", "Plataformas", "Educação Digital"], areas: ["Tecnologia", "Atendimento"], fit: ["dev", "infra"], color: COLORS.cyan, badge: "cyan", detail: "O NTE trabalha com tecnologias aplicadas à educação. Estudantes participam do desenvolvimento de plataformas e materiais digitais." },
  { id: "techhub", name: "TechHub", fullName: "Laboratório de Inovação TechHub", category: "Estágio", type: "estagio", desc: "Desenvolvimento prático de competências exigidas pelo mercado de tecnologia, com referência nas práticas da SantoDigital.", skills: ["IA", "Cloud", "Desenvolvimento Web"], areas: ["Desenvolvimento", "Inovação"], fit: ["dev", "data", "infra"], color: COLORS.green, badge: "green", detail: "O TechHub é um espaço de inovação onde estudantes desenvolvem projetos reais, praticam Git, colaboração e metodologias ágeis." },
  { id: "inovajr", name: "Inova Jr.", fullName: "Empresa Júnior de Tecnologia", category: "Estágio", type: "estagio", desc: "Empresa júnior onde estudantes desenvolvem projetos de tecnologia e vivenciam a rotina de uma empresa.", skills: ["Desenvolvimento Web", "Projetos", "Design"], areas: ["Desenvolvimento", "Inovação"], fit: ["dev"], color: COLORS.orange, badge: "orange", detail: "A Inova Jr. é a empresa júnior da FACAPE. Os estudantes atendem clientes reais e aprendem gestão na prática." },
  { id: "fati", name: "FATI", fullName: "Projeto de Extensão FATI", category: "Extensão", type: "extensao", desc: "Projeto de extensão que promove aprendizado, inclusão digital e integração com pessoas da terceira idade.", skills: ["Ensino", "Inclusão Digital", "Impacto Social"], areas: ["Educação", "Extensão"], fit: [], color: COLORS.brand, badge: "brand", detail: "O FATI leva educação em tecnologia para comunidades. Estudantes desenvolvem habilidades de ensino e comunicação." },
  { id: "recom", name: "RECOM", fullName: "Rede de Computadores e Comunicação", category: "Extensão", type: "extensao", desc: "Recondicionamento de computadores para doação, unindo prática em hardware e impacto social.", skills: ["Hardware", "Manutenção", "Impacto Social"], areas: ["Hardware", "Extensão"], fit: ["infra", "sec"], color: COLORS.cyan, badge: "cyan", detail: "O RECOM atua em redes. Estudantes aprendem configuração, segurança e gerenciamento de redes de computadores." },
  { id: "agrolabs", name: "AGROLABS", fullName: "Laboratório de Agrotecnologia", category: "Extensão", type: "extensao", desc: "Pesquisa e desenvolvimento de soluções tecnológicas para desafios do agronegócio do Vale do São Francisco.", skills: ["IA", "IoT", "Cloud"], areas: ["Tecnologia", "Agronegócio"], fit: ["data", "infra"], color: COLORS.green, badge: "green", detail: "O AGROLABS desenvolve soluções para o agronegócio. Estudantes aplicam IoT e análise de dados em contextos rurais." },
];

// ─── Painel: navegação ───────────────────────────────────────────────────────
export type DashboardSection = "overview" | "trilha" | "oportunidades" | "disciplinas" | "vaga";

export const DASHBOARD_NAV: { id: DashboardSection; label: string; icon: IconName; path: string }[] = [
  { id: "overview", label: "Início", icon: "home", path: "/painel" },
  { id: "trilha", label: "Trilha", icon: "layers", path: "/painel/trilha" },
  { id: "oportunidades", label: "Vagas", icon: "briefcase", path: "/painel/vagas" },
  { id: "disciplinas", label: "Disciplinas", icon: "book", path: "/painel/disciplinas" },
  { id: "vaga", label: "Analisar", icon: "external", path: "/painel/analisar" },
];

// ─── Painel: disciplinas ─────────────────────────────────────────────────────
export type Discipline = { name: string; areas: AreaId[]; text: string };

export const DISCIPLINES: Discipline[] = [
  { name: "Algoritmos e Lógica de Programação", areas: ["dev", "data"], text: "Base do raciocínio usado para resolver problemas com código, em qualquer área." },
  { name: "Estrutura de Dados", areas: ["dev", "data"], text: "Listas, filas, árvores e grafos: como organizar informações para o programa ser eficiente." },
  { name: "Programação Orientada a Objetos", areas: ["dev"], text: "Organiza sistemas maiores em classes e objetos, como na maioria dos projetos do mercado." },
  { name: "Engenharia de Software", areas: ["dev"], text: "Requisitos, testes, versionamento e metodologias ágeis para trabalhar em equipe." },
  { name: "Desenvolvimento Web", areas: ["dev"], text: "HTML, CSS, JavaScript e APIs: a prática de criar sites e aplicações." },
  { name: "Banco de Dados", areas: ["data", "dev"], text: "Modelagem e SQL, a base para guardar e consultar informações de qualquer sistema." },
  { name: "Estatística e Probabilidade", areas: ["data"], text: "Média, variância e distribuições: o que você precisa para interpretar dados com segurança." },
  { name: "Inteligência Artificial", areas: ["data"], text: "Introdução a aprendizado de máquina, classificação e previsão." },
  { name: "Redes de Computadores", areas: ["infra", "sec"], text: "Como os dados trafegam (TCP/IP, HTTP, DNS), base para infraestrutura e segurança." },
  { name: "Sistemas Operacionais", areas: ["infra", "sec"], text: "Processos, memória, permissões e arquivos, o que sustenta servidores e a nuvem." },
  { name: "Segurança da Informação", areas: ["sec"], text: "Criptografia, autenticação, vulnerabilidades e boas práticas de proteção." },
  { name: "Sistemas Distribuídos e Computação em Nuvem", areas: ["infra", "dev"], text: "Como sistemas rodam em vários servidores e serviços de nuvem ao mesmo tempo." },
];

// ─── Painel: analisar vaga ───────────────────────────────────────────────────
/** Palavras-chave procuradas no texto da vaga (sem acentos, minúsculas). */
export const JOB_SKILLS: { label: string; area: AreaId; keywords: string[] }[] = [
  { label: "Git e GitHub", area: "dev", keywords: ["git", "github", "gitlab", "versionamento"] },
  { label: "HTML e CSS", area: "dev", keywords: ["html", "css", "sass", "tailwind"] },
  { label: "JavaScript / TypeScript", area: "dev", keywords: ["javascript", "typescript", "js", "ts"] },
  { label: "React / Front-end", area: "dev", keywords: ["react", "vue", "angular", "front-end", "frontend", "next.js", "nextjs"] },
  { label: "Back-end e APIs", area: "dev", keywords: ["api", "apis", "rest", "back-end", "backend", "node", "node.js", "fastapi", "django", "spring", "laravel"] },
  { label: "Java / C# / PHP", area: "dev", keywords: ["java", "c#", ".net", "php", "kotlin"] },
  { label: "Mobile", area: "dev", keywords: ["mobile", "android", "ios", "flutter", "react native"] },
  { label: "Testes", area: "dev", keywords: ["teste", "testes", "jest", "tdd", "qa"] },
  { label: "SQL e Banco de Dados", area: "data", keywords: ["sql", "mysql", "postgresql", "postgres", "banco de dados", "oracle", "mongodb"] },
  { label: "Python", area: "data", keywords: ["python", "pandas", "numpy", "jupyter"] },
  { label: "Excel / Planilhas", area: "data", keywords: ["excel", "planilha", "planilhas", "google sheets"] },
  { label: "BI e Dashboards", area: "data", keywords: ["power bi", "powerbi", "tableau", "bi", "dashboard", "dashboards", "looker"] },
  { label: "Estatística e Análise", area: "data", keywords: ["estatistica", "analise de dados", "analytics", "indicadores", "kpi", "kpis"] },
  { label: "Machine Learning / IA", area: "data", keywords: ["machine learning", "ia", "inteligencia artificial", "scikit-learn", "modelos preditivos", "llm"] },
  { label: "Segurança da Informação", area: "sec", keywords: ["seguranca", "seguranca da informacao", "ciberseguranca", "cybersecurity", "lgpd"] },
  { label: "Pentest e Vulnerabilidades", area: "sec", keywords: ["pentest", "vulnerabilidade", "vulnerabilidades", "owasp", "ethical hacking"] },
  { label: "Monitoramento e Resposta", area: "sec", keywords: ["siem", "soc", "firewall", "incidentes", "antivirus", "ids"] },
  { label: "Criptografia e Acesso", area: "sec", keywords: ["criptografia", "autenticacao", "iam", "controle de acesso", "mfa"] },
  { label: "Linux e Terminal", area: "infra", keywords: ["linux", "terminal", "bash", "shell", "ubuntu"] },
  { label: "Redes", area: "infra", keywords: ["redes", "rede", "tcp/ip", "dns", "dhcp", "roteadores", "switches", "vpn"] },
  { label: "Cloud", area: "infra", keywords: ["cloud", "nuvem", "aws", "azure", "gcp", "google cloud"] },
  { label: "Docker e DevOps", area: "infra", keywords: ["docker", "kubernetes", "devops", "ci/cd", "terraform", "pipeline"] },
  { label: "Suporte e Infraestrutura", area: "infra", keywords: ["suporte", "infraestrutura", "servidores", "servidor", "hardware", "windows server", "help desk"] },
];

export const JOB_EXAMPLE = `Estágio em Desenvolvimento Web
Buscamos estudante de Sistemas de Informação para apoiar o time de produto.
Requisitos: conhecimentos em HTML, CSS e JavaScript; noções de React; versionamento com Git.
Diferenciais: consumo de APIs REST, SQL básico e vontade de aprender sobre testes.`;
