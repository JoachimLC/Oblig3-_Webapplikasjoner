import type { DbProject, Project } from "../types/types";

export const fromDb = (dbProject: DbProject) => {
  return {
      id: dbProject.id,
      published: dbProject.published === 1,
      title: dbProject.title,
      description: dbProject.description,
      technologies: dbProject.technologies.split(','), 
      link: dbProject.link,
      dateMade: dbProject.dateMade,
      mediaId: dbProject.mediaId, 
  };
};


export const toDb = (project: Project): DbProject => {
  return {
    id: project.id,
    published: project.published ? 1 : 0,
    title: project.title,
    description: project.description,
    technologies: project.technologies.join(','),
    link: project.link,
    dateMade: project.dateMade,
    mediaId: project.mediaId,
  };
};