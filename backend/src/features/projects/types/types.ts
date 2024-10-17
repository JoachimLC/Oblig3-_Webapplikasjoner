export type Project = {
    id: string;
    published: boolean;
    title: string;
    description: string;
    technologies: string[];
    link: string;
    dateMade: string;
    mediaId: string | null;
  };
  

  export type DbProject = {
    id: string;
    published: number; 
    title: string;
    description: string;
    technologies: string;
    link: string;
    dateMade: string; 
    mediaId: string | null;
  };