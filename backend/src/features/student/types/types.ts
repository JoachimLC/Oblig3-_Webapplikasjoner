
export type Student = {
    name: string;
    degree: string;
    points: number;
    email: string;
    experiences: {
      description: string;
    }[];
  };
  
  export type DbStudent = {
    id: string;
    name: string;
    degree: string;
    points: number;
    email: string;
    experiences: DbExperience[];
  };
  
  export type Experience = {
    description: string;
  };
  
  export type DbExperience = {
    id: string;
    description: string;
    student_id: string;
  };
  