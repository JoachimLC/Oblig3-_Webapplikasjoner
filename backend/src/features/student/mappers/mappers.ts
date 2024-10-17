import type { Student as PrismaStudent, Experience } from "@prisma/client";

export const fromDb = (dbStudent: PrismaStudent & { experiences: { description: string }[] }) => {
  return {
    name: dbStudent.name,
    degree: dbStudent.degree,
    points: dbStudent.points,
    email: dbStudent.email,
    experiences: dbStudent.experiences.map(exp => ({
      description: exp.description,
    })),
  };
};

