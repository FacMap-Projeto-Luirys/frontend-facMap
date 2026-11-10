import type { ReactNode } from "react";
import { Icon } from "../../components/Icon/Icon";
import { Logo } from "../../components/Logo/Logo";
import { BENEFITS } from "../../data/content";
import { Link, ROUTES } from "../../router";
import { accent } from "../../utils/accent";
import s from "./Auth.module.css";

type Props = { title: string; subtitle: string; children: ReactNode; footer: ReactNode };

export function AuthLayout({ title, subtitle, children, footer }: Props) {
  return (
    <div className={s.page}>
      <aside className={s.brand}>
        <Logo inverted />
        <div className={s.brandBody}>
          <h2>
            Descubra por onde <span>começar em TI</span>
          </h2>
          <p>Seus interesses, sua rotina e o que você aprende na FACAPE transformados em próximos passos possíveis.</p>
          <ul className={s.brandList}>
            {BENEFITS.map((b) => (
              <li key={b.title} style={accent(b.color)}>
                <span className={s.brandIcon}>
                  <Icon name={b.icon} size={16} />
                </span>
                {b.text}
              </li>
            ))}
          </ul>
        </div>
        <div className={s.brandQuote}>
          <Icon name="star" size={16} />
          Você não precisa saber qual carreira quer seguir.
        </div>
      </aside>

      <main className={s.formSide}>
        <div className={s.topBar}>
          <Logo className={s.mobileLogo} />
          <Link to={ROUTES.home} className={s.backLink}>
            <Icon name="chevronLeft" size={16} />
            Voltar ao início
          </Link>
        </div>

        <div className={s.formWrap}>
          <header className={s.formHead}>
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </header>
          {children}
          <div className={s.formFooter}>{footer}</div>
        </div>
      </main>
    </div>
  );
}
