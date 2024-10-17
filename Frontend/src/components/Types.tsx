export type studentProp = {
  name: string;
  degree: string;
  points: number;
  email: string;
  experiences: ExperienceProps[];
};

export type ContactProps = {
    email: string;
  };

export type HeaderProps = {
    student: string;
    degree: string;
    points: number;
    email: string;
  };

export type TitleProps = {
    title?: string;
    };
  

export type ProjectProps = {
    id: string;
    published: boolean;
    title: string;
    description: string;
    technologies: string[];
    link: string;
    dateMade: string;
    mediaId: string;
  };

  
export type ProjectsProps = {
    projects: {
        id: string;
        published: boolean;
        title: string;
        description: string;
        technologies: string[];
        link: string;
        dateMade: string;
        mediaId: string;
      }[];
  };

  
export type MediaProps = {
    media_id: string;
    media_type: string;
    media_url: string;
    media_description: string;
};




export type submitProjectProps = {
    setProjectData: (callback: (prevProjects: any[]) => any[]) => void;
    setMediaData: (callback: (prevMedia: MediaProps[]) => MediaProps[]) => void; 

  };

export type ExperiencesProps = {
    experiences: ExperienceProps[];
  };

export type ExperienceProps = {
    description?: string;
  };