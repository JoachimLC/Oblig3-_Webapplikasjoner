import prisma from "../../../../prisma/dbinit";
import type { StudentRepository } from "../repository/studentrepository";
import { createStudentRepository } from "../repository/studentrepository";

export const createStudentService = (repository: StudentRepository) => {
  const getAllStudents = async () => {
    console.log("Service: Fetching all students...");
    const students = await repository.listStudents();
    console.log("Service: Received students from repository:", students);
    return students[0];
  };


  return {
    getAllStudents,
  };
};

export const studentService = createStudentService(createStudentRepository(prisma));

export type StudentService = ReturnType<typeof createStudentService>;
