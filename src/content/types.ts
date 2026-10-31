import type { IconName } from '../components/Icon'

export type Pair = { zh: string; en: string }

export type Accent = 'violet' | 'blue' | 'orange' | 'green'

export type Level = 'starter' | 'builder' | 'advanced' | 'production' | 'reference'

export type Source = { label: string; href: string }

export type DiagramId =
  | 'harness-layers'
  | 'modes-radar'
  | 'cost-pie'
  | 'pricing-bars'
  | 'permission-bounds'
  | 'event-stream'
  | 'plugin-layers'
  | 'mode-decision'
  | 'approval-flow'
  | 'ralph-loop'
  | 'compaction'

export type Block =
  | { type: 'p'; zh: string; en: string; source?: Source }
  | { type: 'list'; ordered?: boolean; zh: string[]; en: string[]; source?: Source }
  | { type: 'cards'; items: { icon?: IconName; title: Pair; desc: Pair }[] }
  | { type: 'callout'; tone: 'tip' | 'warn' | 'idea' | 'note'; title: Pair; zh: string; en: string; source?: Source }
  | { type: 'code'; lang: string; title: string; code: string; note?: Pair; source?: Source }
  | { type: 'table'; head: Pair[]; rows: Pair[][]; note?: Pair; source?: Source }
  | { type: 'steps'; items: { title: Pair; desc: Pair }[]; source?: Source }
  | { type: 'checklist'; title?: Pair; items: Pair[]; source?: Source }
  | { type: 'diagram'; id: DiagramId; caption: Pair }
  | { type: 'stats'; items: { value: string; label: Pair; sub?: Pair }[]; source?: Source }
  | { type: 'quote'; zh: string; en: string; cite?: Pair; source?: Source }
  | { type: 'links'; title?: Pair; items: { label: Pair; href: string; desc?: Pair; tag?: string }[] }

export type Section = {
  id: string
  title: Pair
  blocks: Block[]
}

export type Part = {
  id: string
  num: string
  title: Pair
  desc: Pair
}

export type Chapter = {
  slug: string
  num: string
  part: string
  icon: IconName
  level: Level
  minutes: number
  accent: Accent
  title: Pair
  subtitle: Pair
  promise: Pair
  sections: Section[]
  sources: Source[]
  sisters?: string[]
}

export const levelLabel: Record<Level, Pair> = {
  starter: { zh: '入门', en: 'Starter' },
  builder: { zh: '进阶', en: 'Builder' },
  advanced: { zh: '深入', en: 'Advanced' },
  production: { zh: '生产', en: 'Production' },
  reference: { zh: '速查', en: 'Reference' },
}

export const parts: Part[] = [
  {
    id: 'start',
    num: 'I',
    title: { zh: '快速上手篇', en: 'Getting Started' },
    desc: { zh: '开箱即用：安装、权限、模式与搬家。', en: 'Install, permissions, modes, and migration.' },
  },
  {
    id: 'core',
    num: 'II',
    title: { zh: '核心原理篇', en: 'Core Mechanics' },
    desc: { zh: '事件流、成本、创造模式与 PTC。', en: 'Event streams, cost, creator mode, and PTC.' },
  },
  {
    id: 'architecture',
    num: 'III',
    title: { zh: '进阶架构篇', en: 'Architecture' },
    desc: { zh: '长任务、三层能力、插件内核与 AI 代码库。', en: 'Long tasks, capability layers, plugin kernel, AI codebase.' },
  },
  {
    id: 'production',
    num: 'IV',
    title: { zh: '生产踩坑篇', en: 'Production' },
    desc: { zh: '事故复盘、避坑清单与这套系统的赌注。', en: 'Postmortems, pitfalls, and the bets behind it.' },
  },
  {
    id: 'playbook',
    num: 'V',
    title: { zh: '实战工具包篇', en: 'Playbook' },
    desc: { zh: '命令速查与可直接套用的配置模板。', en: 'Command reference and copy-ready templates.' },
  },
  {
    id: 'appendix',
    num: 'VI',
    title: { zh: '附录资源篇', en: 'Appendices' },
    desc: { zh: '术语、版本、延伸阅读与姊妹项目。', en: 'Glossary, versions, reading list, sister projects.' },
  },
]

export const partById = (id: string) => parts.find((part) => part.id === id)
