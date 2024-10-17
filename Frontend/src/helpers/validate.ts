import { z } from 'zod';

export const projectSchema = z.object({
    id: z.string(),
    published: z.boolean(),
    title: z.string().min(3 ),
    description: z.string().refine((val) => val.trim().split(/\s+/).length >= 2),
    link: z.string().url(),
    technologies: z.array(z.string()).min(1),
    dateMade: z.string(),
    mediaId: z.string(),
});

export const projectsSchema = z.array(projectSchema)

export const mediaSchema = z.object({
    media_id: z.string(),
    media_type: z.string(),
    media_url: z.string().url(),
    media_description: z.string(),
});

export const mediasSchema = z.array(mediaSchema)

export const experienceSchema = z.object({
    description: z.string().min(5),
  });

export const studentSchema = z.object({
    name: z.string().min(2),
    degree: z.string().min(2),
    points: z.number().min(0),
    email: z.string().email(),
    experiences: z.array(experienceSchema).min(1),
});