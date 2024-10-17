import prisma from "../../../../prisma/dbinit";
import type { ProjectRepository } from "../repository/projectrepository";
import { createProjectRepository } from "../repository/projectrepository";
import type { Project } from "../types/types";

export const createProjectService = (repository: ProjectRepository) => {
  
  const getAllProjects = async () => {
    console.log("Service: Calling repository to list all projects...");
    const projects = await repository.listProjects();
    console.log("Service: Received projects from repository:", projects);
    return projects;
  };
  
  const getAllMedia = async () => {
    console.log("Service: Calling repository to list all media...");
    const media = await repository.listMedia();
    console.log("Service: Received media from repository:", media);
    return media;
  };

  const addNewProject = async (projectData: Project, mediaData: any) => {
    console.log("Service: Adding a new project...");
    const createdProject = await repository.createProject(projectData, mediaData);
    console.log("Service: Project added successfully:", createdProject);
    return createdProject;
  };

  const getProjectById = async (id: string) => {
    console.log(`Service: Fetching project by ID: ${id}...`);
    const project = await repository.getProjectById(id);
    console.log("Service: Received project from repository:", project);
    return project;
};

  return {
    getAllProjects,
    getAllMedia,
    addNewProject,
    getProjectById

  };
};

export const projectService = createProjectService(createProjectRepository(prisma));

export type ProjectService = ReturnType<typeof createProjectService>;
