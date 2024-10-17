import { Hono } from "hono";
import { cors } from "hono/cors";
import { projectController } from "./features/projects/controller/projectcontroller";
import { studentController } from "./features/student/controller/studentcontroller";

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

console.log("Mounting project controller...");
app.route("/", projectController);
app.route("/", studentController);

console.log("App setup complete.");
export default app;
