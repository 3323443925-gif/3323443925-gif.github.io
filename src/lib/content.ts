import type { CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Post = CollectionEntry<'blog'>;

export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort(
    (a, b) =>
      Number(b.data.featured) - Number(a.data.featured) ||
      b.data.priority - a.data.priority ||
      b.data.date.valueOf() - a.data.date.valueOf(),
  );
}

export function publicProjects(projects: Project[]): Project[] {
  return sortProjects(projects.filter((project) => !project.data.draft));
}

export function sortPosts(posts: Post[]): Post[] {
  return [...posts].sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export function publicPosts(posts: Post[]): Post[] {
  return sortPosts(posts.filter((post) => !post.data.draft));
}

export function formatDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
}

export function readingTime(body: string): number {
  const text = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_~|=-]/g, ' ')
    .replace(/\s+/g, '');
  return Math.max(1, Math.ceil(text.length / 400));
}

export function postReadingTime(post: Post): number {
  return readingTime(post.body ?? '');
}

export function adjacent<T>(items: T[], index: number): { prev?: T; next?: T } {
  return {
    prev: index > 0 ? items[index - 1] : undefined,
    next: index < items.length - 1 ? items[index + 1] : undefined,
  };
}
