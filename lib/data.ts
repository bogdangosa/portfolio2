import { z } from "zod";
import projectsJson from "@/data/projects.json";
import experienceJson from "@/data/experience.json";
import siteJson from "@/data/site.json";

const Project = z.object({
  slug: z.string(),
  title: z.string(),
  tagline: z.string(),
  category: z.enum(["ai", "web", "mobile", "game"]),
  year: z.number(),
  featured: z.boolean().default(false),
  stack: z.array(z.string()),
  cover: z.string(),
  links: z.object({ github: z.string().nullable(), demo: z.string().nullable() }),
});
const Experience = z.object({
  hash: z.string(), date: z.string(), title: z.string(),
  org: z.string(), msg: z.string(), detail: z.string(),
});
const Site = z.object({
  name: z.string(), email: z.string(), roles: z.array(z.string()),
  statement: z.string(), bootLines: z.array(z.string()),
  socials: z.array(z.object({ label: z.string(), href: z.string() })),
});

// Validated at build time: a typo in the JSON fails the build.
export const projects = z.array(Project).parse(projectsJson);
export const experience = z.array(Experience).parse(experienceJson);
export const site = Site.parse(siteJson);
export type ProjectT = z.infer<typeof Project>;
export type ExperienceT = z.infer<typeof Experience>;
