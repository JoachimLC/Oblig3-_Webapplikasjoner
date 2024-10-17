import { ProjectProps, studentProp, MediaProps } from '../components/Types'
import { ofetch } from 'ofetch';
import { endpoints } from "../config/urls";
import { projectsSchema, mediasSchema, studentSchema } from '../helpers/validate';
import moment from 'moment';



export const fetchProjects = async (): Promise<ProjectProps[]> => {
    try {
        const response = await ofetch(endpoints.projects, {credentials: 'include'});
        
        console.log(projectsSchema.safeParse(response.data));
        
        projectsSchema.parse(response.data).forEach(project => {
            if (!moment(project.dateMade, 'YYYY-MM-DD', true).isValid()) {
                throw new Error(`Invalid date format for project ID ${project.id}: ${project.dateMade}`);
            }
        });

        return projectsSchema.parse(response.data); 
    } catch (error) {
        console.error("Error fetching projects:", error);
        throw error; 
    }
};

export const fetchMedia = async (): Promise<MediaProps[]> => {
    try {
        const response = await ofetch(endpoints.media);
        console.log(mediasSchema.safeParse(response.data));
        
        return mediasSchema.parse(response.data); 
    } catch (error) {
        console.error("Error fetching media:", error);
        throw error; 
    }
};

export const fetchStudentData = async (): Promise<studentProp> => {
    try {
        const response = await ofetch(endpoints.student);
        
        console.log(studentSchema.safeParse(response));

        return studentSchema.parse(response); 
    } catch (error) {
        console.error("Error fetching student data:", error);
        throw error; 
    }
};

export const createProject = async (project: ProjectProps, media: MediaProps): Promise<void> => {
    try {
        await ofetch(endpoints.projects, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: { project, media }, 
        });

    } catch (error) {
        console.error("Error adding project:", error);
        throw error;
    }
};