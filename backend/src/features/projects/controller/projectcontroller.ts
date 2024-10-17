import { Hono } from "hono";
import { projectService, ProjectService } from "../service/projectservice";
import { projectSchema } from "../../../helper/validation";
import { isAdmin } from "../../users/utils/auth";

export const createProjectController = (projectService: ProjectService) => {
    const app = new Hono();

    app.get("/projects", async (c) => {
        try {
            console.log("Controller: Received request to get all projects");

            const projects = await projectService.getAllProjects();
            
            const filteredProjects = isAdmin(c.req)
                ? projects
                : projects.filter((project) => project.published);

            console.log("Controller: Sending response with projects:", filteredProjects);
            return c.json({ data: filteredProjects }, 200);
        } catch (error) {
            console.error("Error fetching projects in controller:", error);
            return c.json({ error: "Failed to fetch projects" }, 500);
        }
    });

    app.get("/projects/:id", async (c) => {
        const { id } = c.req.param();
        try {
            console.log(`Controller: Received request to get project by ID: ${id}`);
            const project = await projectService.getProjectById(id);
            if (!project) {
                return c.json({ error: "Project not found" }, 404);
            }
            console.log("Controller: Sending response with project:", project);
            return c.json({ data: project }, 200);
        } catch (error) {
            console.error("Error fetching project by ID in controller:", error);
            return c.json({ error: "Failed to fetch project" }, 500);
        }
    });

    app.get("/media", async (c) => {
        try {
            console.log("Controller: Received request to get all projects");
            const media = await projectService.getAllMedia();
            console.log("Controller: Sending response with media:", media);
            return c.json({ data: media }, 200);
        } catch (error) {
            console.error("Error fetching projects in controller:", error);
            return c.json({ error: "Failed to fetch projects" }, 500);
        }
    });

    app.post("/projects", async (c) => {
        try {
            const requestBody = await c.req.json();
            console.log("Controller: Received request to create a new project:", requestBody);

            const validationResult = projectSchema.safeParse(requestBody.project);
            if (!validationResult.success) {
                return c.json({ error: validationResult.error.errors }, 400);
            }

            const createdProject = await projectService.addNewProject(requestBody.project, requestBody.media);
            console.log("Controller: Sending response with the created project:", createdProject);
            return c.json({ data: createdProject }, 201);
        } catch (error) {
            console.error("Error creating project in controller:", error);
            return c.json({ error: "Failed to create project" }, 500);
        }
    });




    return app;
}

export const projectController = createProjectController(projectService);
