import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string().max(60),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    summary: z.string().max(80),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string().max(12)).default([]),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    priority: z.number().min(0).max(100).default(0),
    role: z.string(),
    stack: z.array(z.string()).min(1),
    repoUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    videoUrl: z.string().url().optional(),
    videoPoster: z.string().optional(),
    highlights: z.array(z.string()).max(3).default([]),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().max(60),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    summary: z.string().max(80),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    cover: z.string().optional(),
    tags: z.array(z.string().max(12)).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects, blog };
