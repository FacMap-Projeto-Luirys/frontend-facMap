import { useEffect, useState } from "react";
import { Badge } from "../../components/Badge/Badge";
import { Button } from "../../components/Button/Button";
import { Icon } from "../../components/Icon/Icon";
import { Logo } from "../../components/Logo/Logo";
import { useAssessment } from "../../context/AssessmentContext";
import { useAuth } from "../../context/AuthContext";
import { AREAS, BENEFITS, JOURNEY, OPPORTUNITIES, RECOMMENDATIONS } from "../../data/content";
import { Link, ROUTES } from "../../router";
import { accent, cx } from "../../utils/accent";
import s from "./Landing.module.css";

const SECTIONS = [
  { id: "como-funciona", label: "Como funciona" },
  { id: "areas", label: "Áreas" },
  { id: "oportunidades", label: "Oportunidades" },
];

export function Landing() {
  const { user } = useAuth();
  const { completed } = useAssessment();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const startTo = user ? (completed ? ROUTES.dashboard : ROUTES.profile) : ROUTES.signup;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className={s.page}>
      {/* ─── Navbar ─────────────────────────────────────────── */}
      <header className={cx(s.nav, (scrolled || menuOpen) && s.navScrolled)}>
        <div className={cx("container", s.navInner)}>
          <Logo />

          <nav className={cx(s.menu, menuOpen && s.menuOpen)} aria-label="Navegação principal">
            <ul className={s.links}>
              {SECTIONS.map((sec) => (
                <li key={sec.id}>
                  <button className={s.link} onClick={() => scrollTo(sec.id)}>
                    {sec.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className={s.navActions}>
              {user ? (
                <Button to={startTo} size="sm">
                  {completed ? "Meu painel" : "Continuar avaliação"}
                  <Icon name="arrow" size={14} />
                </Button>
              ) : (
                <>
                  <Button to={ROUTES.login} variant="ghost" size="sm">
                    Entrar
                  </Button>
                  <Button to={ROUTES.signup} size="sm">
                    Criar conta
                  </Button>
                </>
              )}
            </div>
          </nav>

          <button
            className={s.menuToggle}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? "x" : "menu"} size={22} />
          </button>
        </div>
      </header>

      {/* ─── Hero ───────────────────────────────────────────── */}
      <section className={s.hero}>
        <div className={cx("container", s.heroInner)}>
          <div className={s.heroText}>
            <Badge color="cyan">FACAPE · Sistemas de Informação</Badge>
            <h1 className={s.heroTitle}>
              Descubra por onde <span className={s.highlight}>começar em TI</span>
            </h1>
            <p className={s.heroLead}>
              Uma avaliação simples transforma seus interesses, sua rotina e o que você aprende na faculdade em
              próximos passos possíveis.
            </p>
            <div className={s.heroCtas}>
              <Button to={startTo} size="lg">
                Começar avaliação
                <Icon name="arrow" size={18} />
              </Button>
              {!user && (
                <Button to={ROUTES.login} variant="outline" size="lg">
                  Já tenho conta
                </Button>
              )}
            </div>
            <div className={s.heroMeta}>
              <span>
                <Icon name="clock" size={15} /> Leva cerca de 5 minutos
              </span>
              <span>
                <Icon name="shield" size={15} /> Sem conhecimento técnico
              </span>
            </div>
          </div>

          <div className={s.heroVisual} aria-hidden="true">
            <div className={s.journeyCard}>
              <div className={s.cardHead}>
                <span className={s.cardHeadIcon}>
                  <Icon name="layers" size={14} color="white" />
                </span>
                <strong>Sua jornada em 5 etapas</strong>
              </div>
              <ol className={s.journeyList}>
                {JOURNEY.map((step) => (
                  <li key={step.n} style={accent(step.color)}>
                    <span className={s.stepDot}>{step.n}</span>
                    {step.label}
                  </li>
                ))}
              </ol>
              <div className={s.heroTip}>
                <Icon name="star" size={16} />
                Você não precisa saber qual carreira quer seguir.
              </div>
            </div>

            <div className={s.floatCard}>
              <span className={s.floatIcon} style={accent(RECOMMENDATIONS[0].color)}>
                <Icon name={RECOMMENDATIONS[0].icon} size={18} />
              </span>
              <div>
                <div className={s.floatLabel}>Sua maior afinidade</div>
                <div className={s.floatTitle}>Desenvolvimento</div>
              </div>
              <div className={s.floatPct}>{RECOMMENDATIONS[0].pct}%</div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Benefícios ─────────────────────────────────────── */}
      <section className={s.benefits}>
        <div className={cx("container", s.benefitsGrid)}>
          {BENEFITS.map((b) => (
            <div key={b.title} className={s.benefit} style={accent(b.color)}>
              <span className={s.benefitIcon}>
                <Icon name={b.icon} size={20} />
              </span>
              <div>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Como funciona ──────────────────────────────────── */}
      <section id="como-funciona" className={s.section}>
        <div className="container">
          <header className={s.sectionHead}>
            <Badge color="purple">Como funciona</Badge>
            <h2>Sua jornada em 5 etapas</h2>
            <p>Da primeira dúvida ao primeiro projeto: um caminho guiado, no seu ritmo.</p>
          </header>
          <ol className={s.steps}>
            {JOURNEY.map((step) => (
              <li key={step.n} className={s.step} style={accent(step.color)}>
                <span className={s.stepNum}>{step.n}</span>
                <h3>{step.label}</h3>
                <p>{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Áreas ──────────────────────────────────────────── */}
      <section id="areas" className={cx(s.section, s.sectionAlt)}>
        <div className="container">
          <header className={s.sectionHead}>
            <Badge color="cyan">Áreas de TI</Badge>
            <h2>Conheça as áreas antes de escolher</h2>
            <p>Você experimenta cenários práticos de cada área e descobre o que mais combina com você.</p>
          </header>
          <div className={s.areasGrid}>
            {AREAS.map((area) => (
              <article key={area.id} className={s.areaCard} style={accent(area.color)}>
                <span className={s.areaIcon}>
                  <Icon name={area.icon} size={22} />
                </span>
                <h3>{area.title}</h3>
                <p>{area.desc}</p>
                <div className={s.tags}>
                  {area.tags.map((t) => (
                    <span key={t} className={s.tag}>
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Oportunidades ──────────────────────────────────── */}
      <section id="oportunidades" className={s.section}>
        <div className="container">
          <header className={s.sectionHead}>
            <Badge color="green">Oportunidades da FACAPE</Badge>
            <h2>Estágios e projetos de extensão</h2>
            <p>Seu PDI conecta o que você estuda às oportunidades reais dentro da faculdade.</p>
          </header>
          <div className={s.oppGrid}>
            {OPPORTUNITIES.map((opp) => (
              <div key={opp.id} className={s.oppItem} style={accent(opp.color)}>
                <span className={s.oppBar} />
                <div className={s.oppBody}>
                  <div className={s.oppTop}>
                    <strong>{opp.name}</strong>
                    <Badge color={opp.badge}>{opp.category}</Badge>
                  </div>
                  <span className={s.oppFull}>{opp.fullName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA final ──────────────────────────────────────── */}
      <section className={s.ctaSection}>
        <div className={cx("container", s.ctaInner)}>
          <div>
            <h2>Pronto para dar o primeiro passo?</h2>
            <p>Crie sua conta gratuita e receba um plano de desenvolvimento feito para o seu momento.</p>
          </div>
          <Button to={startTo} variant="light" size="lg">
            {user ? "Continuar" : "Criar minha conta"}
            <Icon name="arrow" size={18} />
          </Button>
        </div>
      </section>

      {/* ─── Footer ─────────────────────────────────────────── */}
      <footer className={s.footer}>
        <div className={cx("container", s.footerInner)}>
          <Logo subtitle={false} />
          <p>
            As informações deste protótipo são ilustrativas. Disponibilidade, requisitos e processos seletivos devem
            ser confirmados com a FACAPE.
          </p>
          <nav className={s.footerLinks}>
            <Link to={ROUTES.login}>Entrar</Link>
            <Link to={ROUTES.signup}>Criar conta</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
