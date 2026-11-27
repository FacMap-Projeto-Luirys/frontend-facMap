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
export type DashboardSection = "overview" | "trilha" | "cursos" | "oportunidades" | "disciplinas" | "vaga";

export const DASHBOARD_NAV: { id: DashboardSection; label: string; icon: IconName; path: string }[] = [
  { id: "overview", label: "Início", icon: "home", path: "/painel" },
  { id: "trilha", label: "Trilha", icon: "layers", path: "/painel/trilha" },
  { id: "cursos", label: "Cursos", icon: "play", path: "/painel/cursos" },
  { id: "oportunidades", label: "Vagas", icon: "briefcase", path: "/painel/vagas" },
  { id: "disciplinas", label: "Disciplinas", icon: "book", path: "/painel/disciplinas" },
  { id: "vaga", label: "Analisar", icon: "external", path: "/painel/analisar" },
];

// ─── Painel: cursos ──────────────────────────────────────────────────────────
export type CourseTopic = "logica" | "web" | "dados" | "ml" | "seguranca" | "infra";

export const COURSE_TOPICS: {
  id: CourseTopic;
  title: string;
  /** Rótulo curto, usado no filtro. */
  short: string;
  text: string;
  icon: IconName;
  color: string;
  /** Áreas da avaliação para as quais o tema é indicado. Vazio = base para todas. */
  areas: AreaId[];
}[] = [
  { id: "logica", title: "Lógica de programação", short: "Lógica", text: "A base de qualquer área. Comece por aqui.", icon: "compass", color: COLORS.navy, areas: [] },
  { id: "web", title: "Desenvolvimento web", short: "Web", text: "Sites e aplicações: HTML, CSS, JavaScript e APIs.", icon: "code", color: COLORS.brand, areas: ["dev"] },
  { id: "dados", title: "Dados", short: "Dados", text: "Python, SQL e estatística para analisar dados.", icon: "chart", color: COLORS.cyan, areas: ["data"] },
  { id: "ml", title: "Machine Learning", short: "Machine Learning", text: "Modelos que aprendem com os dados e fazem previsões.", icon: "layers", color: COLORS.green, areas: ["data"] },
  { id: "seguranca", title: "Cibersegurança", short: "Segurança", text: "Proteger sistemas e redes, e testar falhas de forma ética.", icon: "shield", color: COLORS.rose, areas: ["sec"] },
  { id: "infra", title: "Infraestrutura, redes e cloud", short: "Infra e cloud", text: "Linux, redes, contêineres e serviços em nuvem.", icon: "server", color: COLORS.orange, areas: ["infra"] },
];

export const COURSE_PLATFORMS = {
  youtube: { label: "YouTube", cta: "Ver playlist no YouTube" },
  udemy: { label: "Udemy", cta: "Ver curso na Udemy" },
  coursera: { label: "Coursera", cta: "Ver curso no Coursera" },
  odin: { label: "The Odin Project", cta: "Ver curso" },
  khan: { label: "Khan Academy", cta: "Ver curso na Khan Academy" },
  kaggle: { label: "Kaggle", cta: "Ver curso no Kaggle" },
  google: { label: "Google", cta: "Ver curso do Google" },
  netacad: { label: "Cisco NetAcad", cta: "Ver curso na Cisco" },
  portswigger: { label: "PortSwigger", cta: "Ver curso na PortSwigger" },
  aws: { label: "AWS Skill Builder", cta: "Ver curso na AWS" },
  mslearn: { label: "Microsoft Learn", cta: "Ver curso na Microsoft" },
} satisfies Record<string, { label: string; cta: string }>;

export type CoursePlatform = keyof typeof COURSE_PLATFORMS;

export type Course = {
  id: string;
  topic: CourseTopic;
  title: string;
  author: string;
  platform: CoursePlatform;
  paid: boolean;
  /** Idioma das aulas, quando não é português. */
  lang?: "en";
  desc: string;
  /** No YouTube, o link da playlist; nas outras plataformas, a página do curso. */
  url: string;
};

export const COURSES: Course[] = [
  { id: "guanabara-algoritmos", topic: "logica", title: "Curso de Algoritmos", author: "Gustavo Guanabara · Curso em Vídeo", platform: "youtube", paid: false, desc: "Aulas curtas e descontraídas, do primeiro algoritmo até estruturas de repetição, procedimentos e funções.", url: "https://www.youtube.com/playlist?list=PLHz_AreHm4dmSj0MHol_aoNYCSGFqvfXV" },
  { id: "nelio-algoritmos", topic: "logica", title: "Algoritmos e Lógica de Programação: o curso completo", author: "Nelio Alves", platform: "udemy", paid: true, desc: "Começa com Portugol no VisualG e depois passa por C, C++, Python, C# e Java, com mais de 50 exercícios corrigidos.", url: "https://www.udemy.com/course/curso-algoritmos-logica-de-programacao/" },

  // Desenvolvimento web
  { id: "cev-html", topic: "web", title: "Curso de HTML5 e CSS3 (módulo 1 de 5)", author: "Gustavo Guanabara · Curso em Vídeo", platform: "youtube", paid: false, desc: "Criação de sites com HTML e CSS atuais, com exercícios, desafios e material em PDF. Os outros módulos estão no mesmo canal.", url: "https://www.youtube.com/playlist?list=PLHz_AreHm4dkZ9-atkcmcBaMZdmLHft8n" },
  { id: "cev-js", topic: "web", title: "Curso de JavaScript e ECMAScript para iniciantes", author: "Gustavo Guanabara · Curso em Vídeo", platform: "youtube", paid: false, desc: "Seis módulos, com apoio do Google: comandos básicos, DOM, condições, repetições e próximos passos na linguagem.", url: "https://www.youtube.com/playlist?list=PLHz_AreHm4dlsK3Nr9GVvXCbpQyHQl1o1" },
  { id: "odin", topic: "web", title: "The Odin Project", author: "Comunidade The Odin Project", platform: "odin", paid: false, lang: "en", desc: "Currículo full stack aberto: fundamentos de HTML, CSS, JavaScript e Git, depois JavaScript e Node.js, sempre com projetos.", url: "https://www.theodinproject.com/" },
  { id: "cod3r-web", topic: "web", title: "Curso Web Moderno Completo com JavaScript + Projetos", author: "Leonardo Leitão · Cod3r", platform: "udemy", paid: true, desc: "Do HTML e CSS ao JavaScript moderno, Node.js, React e Vue, passando por bancos de dados, com vários projetos práticos.", url: "https://www.udemy.com/course/curso-web/" },

  // Dados
  { id: "teo-python", topic: "dados", title: "Introdução à Programação com Python", author: "Téo Me Why", platform: "youtube", paid: false, desc: "Python do zero com um cientista de dados. É o pré-requisito que o canal indica antes dos cursos de dados, como o de Pandas.", url: "https://www.youtube.com/playlist?list=PLvlkVRRKOYFRXdquucikNbwYeFzzzYIGb" },
  { id: "cev-mysql", topic: "dados", title: "Curso de Banco de Dados MySQL", author: "Gustavo Guanabara · Curso em Vídeo", platform: "youtube", paid: false, desc: "O que é um banco de dados e como criar, alterar e consultar tabelas com SQL no MySQL.", url: "https://www.youtube.com/playlist?list=PLHz_AreHm4dkBs-795Dsgvau_ekxg8g1r" },
  { id: "khan-estatistica", topic: "dados", title: "Estatística e probabilidade", author: "Khan Academy", platform: "khan", paid: false, desc: "A estatística que a análise de dados usa: gráficos, médias, dispersão, probabilidade e inferência, com exercícios.", url: "https://pt.khanacademy.org/math/statistics-probability" },
  { id: "amaral-cientista", topic: "dados", title: "Formação Cientista de Dados com Python", author: "Fernando Amaral", platform: "udemy", paid: true, desc: "Formação ampla em ciência de dados com Python, da estatística e visualização até modelos de machine learning.", url: "https://www.udemy.com/course/formacao-cientista-de-dados-com-python/" },

  // Machine Learning
  { id: "google-mlcc", topic: "ml", title: "Curso intensivo de machine learning", author: "Google", platform: "google", paid: false, desc: "Introdução prática do Google: regressão, classificação, preparo dos dados e redes neurais, com exercícios interativos.", url: "https://developers.google.com/machine-learning/crash-course?hl=pt-br" },
  { id: "kaggle-ml", topic: "ml", title: "Intro to Machine Learning", author: "Kaggle Learn", platform: "kaggle", paid: false, lang: "en", desc: "Microcurso para montar os primeiros modelos em Python (árvore de decisão e random forest), direto no navegador.", url: "https://www.kaggle.com/learn/intro-to-machine-learning" },
  { id: "jones-ml", topic: "ml", title: "Machine Learning e Data Science com Python de A a Z", author: "Jones Granatyr · IA Expert Academy", platform: "udemy", paid: true, desc: "Os principais algoritmos de classificação, regressão e agrupamento, explicados do zero e aplicados com Python.", url: "https://www.udemy.com/course/machine-learning-e-data-science-com-python-y/" },
  { id: "ng-ml", topic: "ml", title: "Machine Learning Specialization", author: "Andrew Ng · DeepLearning.AI e Stanford", platform: "coursera", paid: true, lang: "en", desc: "Três cursos para iniciantes: regressão, classificação, redes neurais, árvores de decisão e aprendizado não supervisionado.", url: "https://www.coursera.org/specializations/machine-learning-introduction" },

  // Cibersegurança
  { id: "cisco-cyber", topic: "seguranca", title: "Introduction to Cybersecurity", author: "Cisco Networking Academy", platform: "netacad", paid: false, lang: "en", desc: "Primeiro contato com a área: ameaças e ataques comuns, como proteger seus dados e as carreiras em segurança.", url: "https://www.netacad.com/courses/introduction-to-cybersecurity" },
  { id: "mb-cero", topic: "seguranca", title: "CERO: Curso de Engenharia Reversa Online", author: "Fernando Mercês · Mente Binária", platform: "youtube", paid: false, desc: "Como os programas funcionam por dentro: executáveis, assembly e depuradores. Base para análise de malware.", url: "https://www.youtube.com/playlist?list=PLIfZMtpPYFP6zLKlnyAeWY1I85VpyshAA" },
  { id: "portswigger", topic: "seguranca", title: "Web Security Academy", author: "PortSwigger", platform: "portswigger", paid: false, lang: "en", desc: "Laboratórios práticos sobre as principais falhas de aplicações web, como SQL injection e XSS.", url: "https://portswigger.net/web-security" },
  { id: "google-cyber", topic: "seguranca", title: "Certificado Profissional de Segurança Cibernética do Google", author: "Google · Coursera", platform: "coursera", paid: true, desc: "Formação para iniciantes: fundamentos de segurança, redes, Linux, SQL, Python e ferramentas de monitoramento.", url: "https://www.coursera.org/professional-certificates/google-cybersecurity" },

  // Infraestrutura, redes e cloud
  { id: "aws-cpe", topic: "infra", title: "AWS Cloud Practitioner Essentials", author: "Amazon Web Services", platform: "aws", paid: false, desc: "Conceitos de nuvem e os principais serviços da AWS: computação, armazenamento, redes, segurança e preços.", url: "https://aws.amazon.com/pt/training/digital/aws-cloud-practitioner-essentials/" },
  { id: "az-900", topic: "infra", title: "AZ-900: introdução à infraestrutura de nuvem", author: "Microsoft", platform: "mslearn", paid: false, desc: "Conceitos de nuvem e os serviços básicos do Azure, preparando para a certificação AZ-900.", url: "https://learn.microsoft.com/pt-br/training/courses/az-900t00" },
  { id: "cisco-net", topic: "infra", title: "Networking Basics", author: "Cisco Networking Academy", platform: "netacad", paid: false, lang: "en", desc: "Como as redes funcionam: endereçamento IP, protocolos, equipamentos e montagem de uma rede simples.", url: "https://www.netacad.com/courses/networking-basics" },
  { id: "battisti-docker", topic: "infra", title: "Docker para Desenvolvedores (com Docker Swarm e Kubernetes)", author: "Matheus Battisti · Hora de Codar", platform: "udemy", paid: true, desc: "Contêineres com Docker do básico ao deploy, com Docker Compose, Docker Swarm e introdução ao Kubernetes.", url: "https://www.udemy.com/course/docker-para-desenvolvedores-com-docker-swarm-e-kubernetes/" },
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
