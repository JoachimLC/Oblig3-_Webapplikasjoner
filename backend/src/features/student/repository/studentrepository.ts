import prisma from '../../../../prisma/dbinit';
import { fromDb } from '../mappers/mappers';
import type { Student } from '../types/types';

export const createStudentRepository = (db: typeof prisma) => {
  const listStudents = async (): Promise<Student[]> => {
    const data = await db.student.findMany({
      include: {
        experiences: true,
      },
    });
    return data.map(fromDb);
  };

 

  return { listStudents };
};

export type StudentRepository = ReturnType<typeof createStudentRepository>;
