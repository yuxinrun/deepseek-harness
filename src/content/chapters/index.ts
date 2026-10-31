import type { Chapter } from '../types'
import { parts } from '../types'
import { startChapters } from './start'
import { coreChapters } from './core'
import { architectureChapters } from './architecture'
import { productionChapters } from './production'
import { playbookChapters } from './playbook'
import { appendixChapters } from './appendix'

export const chapters: Chapter[] = [
  ...startChapters,
  ...coreChapters,
  ...architectureChapters,
  ...productionChapters,
  ...playbookChapters,
  ...appendixChapters,
]

export const chapterBySlug = (slug: string) => chapters.find((chapter) => chapter.slug === slug)

export const chaptersOfPart = (partId: string) => chapters.filter((chapter) => chapter.part === partId)

export const partGroups = parts
  .map((part) => ({ part, items: chaptersOfPart(part.id) }))
  .filter((group) => group.items.length > 0)

export const totalReadMinutes = chapters.reduce((sum, chapter) => sum + chapter.minutes, 0)

export const neighbourOf = (slug: string) => {
  const index = chapters.findIndex((chapter) => chapter.slug === slug)
  return { prev: index > 0 ? chapters[index - 1] : undefined, next: index >= 0 && index < chapters.length - 1 ? chapters[index + 1] : undefined }
}
