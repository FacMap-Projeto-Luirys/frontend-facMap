import { useState } from "react";
import { Badge } from "../../../components/Badge/Badge";
import { Button } from "../../../components/Button/Button";
import { Icon } from "../../../components/Icon/Icon";
import { COURSE_PLATFORMS, COURSE_TOPICS, COURSES, type Course, type CourseTopic } from "../../../data/content";
import { accent, cx } from "../../../utils/accent";
import { Disclaimer, SectionHead, useRecommendedAreas } from "./shared";
import s from "../Dashboard.module.css";

type Price = "todos" | "gratuitos" | "pagos";
type TopicFilter = "todas" | "perfil" | CourseTopic;

const PRICES: { key: Price; label: string }[] = [
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
  const [price, setPrice] = useState<Price>("todos");
  const [topicFilter, setTopicFilter] = useState<TopicFilter>("todas");

  const isBase = (t: (typeof COURSE_TOPICS)[number]) => t.areas.length === 0;
  const isMatch = (t: (typeof COURSE_TOPICS)[number]) => t.areas.some((a) => recommended.includes(a));

  // Lógica (a base) primeiro, depois as áreas que combinam com o perfil, depois as outras.
  const topics = [...COURSE_TOPICS]
    .sort((a, b) => Number(isBase(b)) - Number(isBase(a)) || Number(isMatch(b)) - Number(isMatch(a)))
    .filter((t) => {
      if (topicFilter === "todas") return true;
      if (topicFilter === "perfil") return isBase(t) || isMatch(t);
      return t.id === topicFilter;
    });

  const byPrice = COURSES.filter((c) => (price === "gratuitos" ? !c.paid : price === "pagos" ? c.paid : true));
  const groups = topics
    .map((topic) => ({ topic, items: byPrice.filter((c) => c.topic === topic.id) }))
    .filter((g) => g.items.length > 0);
  const total = groups.reduce((n, g) => n + g.items.length, 0);

  const topicFilters: { key: TopicFilter; label: string }[] = [
    { key: "todas", label: "Todas as áreas" },
    ...(recommended.length > 0 ? [{ key: "perfil" as const, label: "Para você" }] : []),
    ...COURSE_TOPICS.filter((t) => COURSES.some((c) => c.topic === t.id)).map((t) => ({ key: t.id, label: t.short })),
  ];

  return (
    <>
      <SectionHead title="Cursos" subtitle="Cursos indicados para estudar por fora da faculdade, separados por área." />

      <section className={s.oppSection}>
        <div className={s.oppHead}>
          <h2>
            {total} {total === 1 ? "curso" : "cursos"}
          </h2>
          <div className={s.filters} role="tablist" aria-label="Filtrar cursos por preço">
            {PRICES.map((f) => (
              <button
                key={f.key}
                role="tab"
                aria-selected={price === f.key}
                className={cx(s.filter, price === f.key && s.filterActive)}
                onClick={() => setPrice(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className={cx(s.filters, s.courseTopics)} role="tablist" aria-label="Filtrar cursos por área">
          {topicFilters.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={topicFilter === f.key}
              className={cx(s.filter, topicFilter === f.key && s.filterActive)}
              onClick={() => setTopicFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {groups.length === 0 && <p className={s.empty}>Nenhum curso neste filtro.</p>}

        {groups.map(({ topic, items }) => (
          <div key={topic.id} className={s.courseGroup} style={accent(topic.color)}>
            <div className={s.courseGroupHead}>
              <span className={s.affinityIcon}>
                <Icon name={topic.icon} size={18} />
              </span>
              <div>
                <div className={s.courseGroupTitle}>
                  <h3>{topic.title}</h3>
                  {isMatch(topic) && (
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
        ))}
      </section>

      <Disclaimer>Preço e conteúdo dos cursos podem mudar. Confira na página de cada um antes de se inscrever.</Disclaimer>
    </>
  );
}
