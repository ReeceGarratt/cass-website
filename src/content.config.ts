import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const caseStudies = defineCollection({
  loader: file('src/content/case-studies.json'),
  schema: z.object({
    title: z.string(),
    skills: z.array(z.string()).min(1),
    summary: z.string(),
    order: z.number().int(),
  }),
});

export const collections = { caseStudies };
