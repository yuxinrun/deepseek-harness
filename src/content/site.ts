import type { Pair } from './types'

export const site = {
  name: { zh: 'DeepSeek Harness 实战指南', en: 'DeepSeek Harness Field Guide' } as Pair,
  shortName: { zh: 'DeepSeek Harness', en: 'DeepSeek Harness' } as Pair,
  tagline: {
    zh: '从开机到拆开，从入门到生产',
    en: 'From first run to internals, from demo to production',
  } as Pair,
  description: {
    zh: '把 DeepSeek Harness 讲透讲明白的系统化实战手册。',
    en: 'A systematic, hands-on handbook that explains DeepSeek Harness end to end.',
  } as Pair,
  github: 'https://github.com/yuxinrun/deepseek-harness',
  upstream: 'https://github.com/deepseek-ai/DeepSeek-Harness',
  homepage: 'https://www.yuxin.run',
  email: 'hi@yuxin.run',
  author: '鱼心',
  brand: '鱼心快跑',
  brandEn: 'YUXIN RUNS',
  slogan: { zh: '鱼心快跑，Bug 追不到', en: 'Yuxin Rush, Bugs Gone' },
}

export type Sister = {
  slug: string
  title: Pair
  desc: Pair
  tag: string
}

export const sisters: Sister[] = [
  {
    slug: 'better-agent',
    title: { zh: '如何构建更好的 Agent', en: 'How to Build Better Agents' },
    desc: { zh: 'Agent 入门实战指南：心智模型、上下文、工具、评估。', en: 'A field guide to agents: mental models, context, tools, evals.' },
    tag: 'Agent 基础',
  },
  {
    slug: 'agent-ontology',
    title: { zh: '智能体本体论', en: 'Agent Ontology' },
    desc: { zh: '把 Agent 的概念、边界与关系拆清楚。', en: 'Concepts, boundaries, and relationships of agents.' },
    tag: '概念',
  },
  {
    slug: 'agent-loop-engineering',
    title: { zh: 'Agent 循环工程', en: 'Agent Loop Engineering' },
    desc: { zh: '主循环、停止条件、状态机与错误恢复。', en: 'Main loops, stop conditions, state machines, recovery.' },
    tag: '架构',
  },
  {
    slug: 'harness-engineering',
    title: { zh: '缰绳工程通用指南', en: 'Harness Engineering' },
    desc: { zh: '模型之外的脚手架：工具、权限、日志与成本。', en: 'The scaffolding around models: tools, permissions, logs, cost.' },
    tag: '通用',
  },
  {
    slug: 'deepseek-harness',
    title: { zh: 'DeepSeek Harness 实战指南', en: 'DeepSeek Harness Field Guide' },
    desc: { zh: '从十分钟上手到插件内核与生产踩坑。', en: 'From a ten-minute start to plugin internals and production pitfalls.' },
    tag: '当前',
  },
  {
    slug: 'agent-evaluation-patterns',
    title: { zh: 'Agent 评估模式', en: 'Agent Evaluation Patterns' },
    desc: { zh: '离线集、在线评估、LLM-as-judge 与回归门禁。', en: 'Offline sets, online evals, judges, and regression gates.' },
    tag: '评估',
  },
  {
    slug: 'agent-skillhub-patterns',
    title: { zh: 'Agent 技能中心模式', en: 'Agent Skill Hub Patterns' },
    desc: { zh: 'Skill 的注册、发现、版本与权限治理。', en: 'Skill registration, discovery, versioning, governance.' },
    tag: '技能',
  },
  {
    slug: 'agent-observability-patterns',
    title: { zh: 'Agent 可观测性模式', en: 'Agent Observability Patterns' },
    desc: { zh: 'Trace、事件流、回放与告警设计。', en: 'Traces, event streams, replay, and alerting.' },
    tag: '可观测性',
  },
  {
    slug: 'agent-memory-patterns',
    title: { zh: 'Agent 记忆模式', en: 'Agent Memory Patterns' },
    desc: { zh: '短期上下文、长期记忆与检索策略。', en: 'Short-term context, long-term memory, retrieval.' },
    tag: '记忆',
  },
  {
    slug: 'a2a-patterns',
    title: { zh: 'Agent 间协作模式', en: 'Agent-to-Agent Patterns' },
    desc: { zh: '多 Agent 分工、通信协议与交接契约。', en: 'Multi-agent roles, protocols, and handoff contracts.' },
    tag: '多 Agent',
  },
  {
    slug: 'llm-gateway-patterns',
    title: { zh: 'LLM 网关模式', en: 'LLM Gateway Patterns' },
    desc: { zh: '路由、限流、缓存、计费与故障转移。', en: 'Routing, rate limits, caching, billing, failover.' },
    tag: '基础设施',
  },
  {
    slug: 'mcp-patterns',
    title: { zh: 'MCP 协议模式', en: 'MCP Protocol Patterns' },
    desc: { zh: 'MCP 服务端、客户端与工具契约设计。', en: 'MCP servers, clients, and tool contracts.' },
    tag: '协议',
  },
]

export const sisterUrl = (slug: string) => `https://yuxinrun.github.io/${slug}`

export const nav = {
  home: { zh: '首页', en: 'Home' } as Pair,
  chapters: { zh: '章节', en: 'Chapters' } as Pair,
  lab: { zh: '实战实验室', en: 'Lab' } as Pair,
  toolkit: { zh: '工具箱', en: 'Toolkit' } as Pair,
  gates: { zh: '发布门禁', en: 'Gates' } as Pair,
  errors: { zh: '错误博物馆', en: 'Error Museum' } as Pair,
  knowledge: { zh: '知识体系', en: 'Knowledge' } as Pair,
  about: { zh: '关于', en: 'About' } as Pair,
}

export const ui = {
  startReading: { zh: '开始阅读', en: 'Start reading' } as Pair,
  browseChapters: { zh: '浏览章节', en: 'Browse chapters' } as Pair,
  openLab: { zh: '打开实验室', en: 'Open the lab' } as Pair,
  allChapters: { zh: '全部章节', en: 'All chapters' } as Pair,
  onThisPage: { zh: '本页大纲', en: 'On this page' } as Pair,
  sidebarLabel: { zh: '章节目录', en: 'Contents' } as Pair,
  prev: { zh: '上一章', en: 'Previous' } as Pair,
  next: { zh: '下一章', en: 'Next' } as Pair,
  back: { zh: '返回', en: 'Back' } as Pair,
  minutes: { zh: '分钟', en: 'min' } as Pair,
  copy: { zh: '复制', en: 'Copy' } as Pair,
  copied: { zh: '已复制', en: 'Copied' } as Pair,
  copyLink: { zh: '复制本章链接', en: 'Copy chapter link' } as Pair,
  linkCopied: { zh: '链接已复制', en: 'Link copied' } as Pair,
  sources: { zh: '本章来源', en: 'Sources' } as Pair,
  endTitle: { zh: '别急着翻页，先把清单用一遍。', en: 'Before you turn the page, use the checklist.' } as Pair,
  endDesc: {
    zh: '读完不等于学会。把本章的命令和检查项落进你的项目，才算真正拿到手。',
    en: 'Reading is not learning. Apply the commands and checks to your own project.',
  } as Pair,
  goLab: { zh: '去实验室验证', en: 'Test it in the lab' } as Pair,
  source: { zh: '来源', en: 'Source' } as Pair,
  readMore: { zh: '延伸阅读', en: 'Further reading' } as Pair,
  sisterLink: { zh: '延伸阅读', en: 'Read next' } as Pair,
  themeLight: { zh: '浅色模式', en: 'Light mode' } as Pair,
  themeDark: { zh: '深色模式', en: 'Dark mode' } as Pair,
  themeSystem: { zh: '跟随系统', en: 'Follow system' } as Pair,
  openMenu: { zh: '打开菜单', en: 'Open menu' } as Pair,
  closeMenu: { zh: '关闭菜单', en: 'Close menu' } as Pair,
  language: { zh: '切换语言', en: 'Switch language' } as Pair,
  skip: { zh: '跳到正文', en: 'Skip to content' } as Pair,
  backTop: { zh: '回到顶部', en: 'Back to top' } as Pair,
  brandLine: {
    zh: '写给想真正把 DeepSeek Harness 用起来的工程师。少一点发布会词汇，多一点原始日志、账单和踩坑。',
    en: 'For engineers who want to actually use DeepSeek Harness. Less launch-deck vocabulary; more raw logs, bills, and pitfalls.',
  } as Pair,
  footerHandbook: { zh: '手册', en: 'Handbook' } as Pair,
  footerTools: { zh: '工具与实验', en: 'Tools & labs' } as Pair,
  footerSisters: { zh: '姊妹项目', en: 'Sister projects' } as Pair,
  footerCredit: { zh: '内容致谢', en: 'Credits' } as Pair,
  copyright: { zh: '© 2026 鱼心快跑 · Yuxin Runs', en: '© 2026 Yuxin Runs' } as Pair,
  builtWith: {
    zh: '基于花叔《DeepSeek Harness：从开机到拆开》橙皮书与官方公开资料重构。',
    en: 'Rebuilt from Huashu’s orange book and public official material.',
  } as Pair,
  current: { zh: '当前', en: 'CURRENT' } as Pair,
}
