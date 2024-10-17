import prisma from '../../../../prisma/dbinit';
import { fromDb, toDb } from '../mappers/mappers'; 
import type { Project,DbProject } from '../types/types';

export const createProjectRepository = (db: typeof prisma) => {

    const listProjects = async (): Promise<Project[]> => {
        console.log("Repository: Fetching all projects...");
        const data = await db.project.findMany();
        console.log("Repository: Projects fetched from database:", data);
        return data.map((project) => fromDb(project));
    };

    const listMedia = async () => {
        console.log("Repository: Fetching all media...");
        const mediaData = await db.media.findMany();
        console.log("Repository: Media fetched from database:", mediaData);
        return mediaData;
    };

    const createProject = async (projectData: Project, mediaData: any) => {
        console.log("Repository: Adding a new project to the database...");

        const dbProjectData: DbProject = toDb(projectData);


        const { mediaId, ...projectWithoutMediaId } = dbProjectData;


        const createdProject = await db.project.create({
            data: {
                ...projectWithoutMediaId,
                media: {
                    create: {
                        media_id: mediaData.media_id,
                        media_type: mediaData.media_type,
                        media_url: mediaData.media_url,
                        media_description: mediaData.media_description,
                    },
                },
            },
        });

        console.log("Repository: Project added to the database:", createdProject);
        return createdProject;
    };

    const getProjectById = async (id: string): Promise<Project | null> => {
        console.log(`Repository: Fetching project by ID: ${id}...`);
        const data = await db.project.findUnique({
            where: { id },
        });
        console.log("Repository: Project fetched:", data);
        return data ? fromDb(data) : null;
    };

    return { listProjects, listMedia, createProject, getProjectById };

};

export type ProjectRepository = ReturnType<typeof createProjectRepository>;
