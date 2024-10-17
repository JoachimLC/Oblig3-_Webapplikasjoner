
import { Hono } from "hono";
import { studentService, StudentService } from "../service/studentservice";

export const createStudentController = (studentService: StudentService) => {
  const app = new Hono();


  app.get("/student", async (c) => {
    try {
      console.log("Controller: Received request to get all students");
      const student = await studentService.getAllStudents(); 
      console.log("Controller: Sending response with student:", student);
      return c.json(student, 200); 
    } catch (error) {
      console.error("Error fetching student:", error);
      return c.json({ error: "Failed to fetch student" }, 500);
    }
  });

  return app;
};

export const studentController = createStudentController(studentService);
