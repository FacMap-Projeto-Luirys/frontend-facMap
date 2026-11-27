import { useState } from "react";
import { Badge } from "../../../components/Badge/Badge";
import { Button } from "../../../components/Button/Button";
import { Icon } from "../../../components/Icon/Icon";
import { COURSE_PLATFORMS, COURSE_TOPICS, COURSES, type Course } from "../../../data/content";
import { accent, cx } from "../../../utils/accent";
import { Disclaimer, SectionHead, useRecommendedAreas } from "./shared";
import s from "../Dashboard.module.css";

type Filter = "todos" | "gratuitos" | "pagos";

const FILTERS: { key: Filter; label: string }[] = [
  { key: "todos", label: "Todos" },
  { key: "gratuitos", label: "Gratuitos" },
  { key: "pagos", label: "Pagos" },
];

function CourseCard({ course }: { course: Course }) {
  const platform = COURSE_PLATFORMS[course.platform];
  return (
    <article className={s.oppCard}>
      <div className={s.courseMeta}>
        <span className={s.coursePlatform}>
          <Icon name="play" size={14} />
          {platform.label}
        </span>
        <Badge color={course.paid ? "orange" : "green"}>{course.paid ? "Pago" : "Gratuito"}</Badge>
      </div>
      <h3 className={s.courseTitle}>{course.title}</h3>
      <p className={s.oppFull}>{course.author}</p>
      <p className={s.oppDesc}>{course.desc}</p>
      <Button variant="outline" full size="sm" href={course.url} className={s.oppBtn}>
        {platform.cta}
        <Icon name="external" size={14} />
      </Button>
    </article>
  );
}

export function Courses() {
  const recommended = useRecommendedAreas();
  const [filter, setFilter] = useState<Filter>("todos");

  const list = COURSES.filter((c) => {
    if (filter === "gratuitos") return !c.paid;
    if (filter === "pagos") return c.paid;
    return true;
  });

  return (
    <>
      <SectionHead title="Cursos" subtitle="Cursos indicados para estudar por fora da faculdade, separados por tema." />

      <section className={s.oppSection}>
        <div className={s.oppHead}>
          <h2>
            {list.length} {list.length === 1 ? "curso" : "cursos"}
          </h2>
          <div className={s.filters} role="tablist" aria-label="Filtrar cursos por preço">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                role="tab"
                aria-selected={filter === f.key}
                className={cx(s.filter, filter === f.key && s.filterActive)}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {list.length === 0 && <p className={s.empty}>Nenhum curso neste filtro.</p>}

        {COURSE_TOPICS.map((topic) => {
          const items = list.filter((c) => c.topic === topic.id);
          if (items.length === 0) return null;
          const isMatch = topic.areas.some((a) => recommended.includes(a));
          return (
            <div key={topic.id} className={s.courseGroup} style={accent(topic.color)}>
              <div className={s.courseGroupHead}>
                <span className={s.affinityIcon}>
                  <Icon name={topic.icon} size={18} />
                </span>
                <div>
                  <div className={s.courseGroupTitle}>
                    <h3>{topic.title}</h3>
                    {isMatch && (
                      <span className={s.matchTag}>
                        <Icon name="star" size={12} />
                        Combina com seu perfil
                      </span>
                    )}
                  </div>
                  <p>{topic.text}</p>
                </div>
              </div>
              <div className={s.oppGrid}>
                {items.map((c) => (
                  <CourseCard key={c.id} course={c} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <Disclaimer>Preço e conteúdo dos cursos podem mudar. Confira na página de cada um antes de se inscrever.</Disclaimer>
    </>
  );
}
