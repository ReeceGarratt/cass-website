import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

const caseStudies = defineCollection({
  loader: file('src/content/case-studies.json'),
  schema: z
    .object({
      title: z.string(),
      /** D-057: the words before Figma's line break in this case
       * study's detailed (home page) card title. Only for titles that
       * wrap differently at the card's width. */
      cardTitleBreak: z.string().optional(),
      client: z.string(),
      skills: z.array(z.string()).min(1),
      summary: z.string(),
      order: z.number().int(),
    })
    .refine(
      (data) =>
        data.cardTitleBreak === undefined ||
        data.title.startsWith(`${data.cardTitleBreak} `),
      {
        message: 'cardTitleBreak must be the words at the start of title',
        path: ['cardTitleBreak'],
      },
    ),
});

export const collections = { caseStudies };
