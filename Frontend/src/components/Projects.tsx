import Project from "./Project";
import { ProjectsProps } from "./Types";
import { MediaProps } from "./Types";


export default function Projects({ projects, mediaData }: ProjectsProps & { mediaData: MediaProps[] }) {
  return (
    <section>
      <h2 className="projects-title">Oversikt over prosjekter</h2>
      <div className="grid-articles">
        {projects.length === 0 ? (
          <h2>Ingen prosjekter</h2>
        ) : (
          projects
          .map((project) => (
            <article className="grid-article-item" key={project.id}>
              <Project
                id={project.id}
                published={project.published}
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                link={project.link}
                dateMade={project.dateMade}
                mediaId={project.mediaId}
                media={mediaData}
              />
            </article>
          ))
        )}
      </div>
    </section>
  );
}
