import { z } from 'zod';

export const projectSchema = z.object({
  id: z.string().optional(),
  published: z.boolean(),
  title: z.string().min(3),
  description: z.string().refine((val) => val.trim().split(/\s+/).length >= 2),
  technologies: z.array(z.string()).nonempty(),
  link: z.string().url(),
  dateMade: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  mediaId: z.string().optional(),
});