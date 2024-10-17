import Experience from "./Experience";
import { ExperiencesProps } from "./Types";

export default function Experiences({ experiences }: ExperiencesProps) {
  return (
    <section >
    <h2>Erfaringer</h2>
    {experiences.length === 0 ? (
      <h2>Ingen erfaringer</h2>
    ) : (
      <ul className="list">
        {experiences.map((experience, index) => (
          <li key={index}>
            <Experience description={experience.description} />
          </li>
        ))}
      </ul>
    )}
  </section>
);
}