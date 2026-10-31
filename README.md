# DeepSeek Harness 实战指南 / DeepSeek Harness Field Guide

《DeepSeek Harness 从入门到生产实战指南》—— 一本写给工程师的双语实战手册：从十分钟装好、跑通第一条命令，到插件内核、成本账本与生产踩坑。

> 鱼心快跑，Bug 追不到 / Yuxin Rush, Bugs Gone

- 在线地址 / Live: <https://yuxinrun.github.io/deepseek-harness>
- 上游项目 / Upstream: <https://github.com/deepseek-ai/DeepSeek-Harness>
- 内容来源 / Source book: 花叔《DeepSeek Harness：从开机到拆开》（橙皮书）

## 这个站点里有什么

| 区域 | 路径 | 内容 |
| --- | --- | --- |
| 首页 | `#/` | 定位、数据速览、章节入口 |
| 章节总览 | `#/chapters` | 6 个部分 · 17 章 + 4 篇附录，按部分分组 |
| 单章阅读 | `#/chapter/:slug` | 左侧目录 + 正文 + 右侧大纲滚动定位，代码块带行号与一键复制 |
| 实战实验室 | `#/lab` | 模式选择器、成本计算器、权限档位模拟器三个可交互模块 |
| 发布门禁 | `#/gates` | 12 条上线前检查项，勾选状态持久化在 localStorage |
| 错误博物馆 | `#/errors` | 6 张真实事故卡片：现象、根因、修法 |
| 工具箱 | `#/toolkit` | 6 组可直接复制的配置与脚本模板 |
| 关于 | `#/about` | 内容溯源、数据口径、明确的未知项 |

全站中英双语（右上角切换，偏好写入 `dsh-lang`）、浅色 / 深色 / 跟随系统三档主题（写入 `dsh-theme`）。所有图示随主题重新取色。

## 快速开始

需要 Node.js 18 / 20 / 22 及以上（Vite 6 的要求）。

```bash
npm install
npm run dev          # http://localhost:5173/deepseek-harness/
```

其它脚本：

```bash
npm run typecheck    # tsc -b --noEmit，严格模式，0 error 才算过
npm run build        # 类型检查 + 产物输出到 dist/
npm run preview      # 本地预览构建产物
```

## 技术栈

React 19 · TypeScript 5.7（strict）· Vite 6 · Tailwind CSS 3.4 · ECharts 5.6（按需动态导入，单独 chunk 懒加载）· Lucide 图标 · React Router 7（HashRouter）。

排版用 Manrope 与 JetBrains Mono 可变字体，通过 `@fontsource-variable` 本地打包，不依赖外部 CDN。

## 内容怎么写

正文是数据，不是 JSX。`src/content/types.ts` 定义了 `Block` 联合类型（`p` / `list` / `cards` / `callout` / `code` / `table` / `steps` / `checklist` / `diagram` / `stats` / `quote` / `links`），`ContentRenderer.tsx` 负责渲染，因此新增章节不用碰组件。

```
src/content/
├── site.ts            # 站名、导航、文案、12 个姊妹项目
├── types.ts           # Pair / Block / Section / Chapter / Source
└── chapters/
    ├── start.ts       # 第 1 部分：开机与上手
    ├── core.ts        # 第 2 部分：主循环与工具
    ├── architecture.ts# 第 3 部分：插件与内核
    ├── production.ts  # 第 4 部分：成本与生产
    ├── playbook.ts    # 第 5 部分：实战手册
    └── appendix.ts    # 附录
```

每条 `zh` / `en` 文案放在同一个 `Pair` 里成对维护；来源写在 `Source = { label, href }`，渲染成新窗口打开的链接芯片。命令与配置以实测过的原文写入 `code` 块，不放占位文本。

## 部署到 GitHub Pages

`.github/workflows/deploy.yml` 在 push 到 `main` 时执行 `npm ci && npm run build`，把 `dist/` 作为 Pages 产物发布。仓库 Settings → Pages 选择 **GitHub Actions** 作为来源即可，无需 `gh-pages` 分支。

子路径由 `vite.config.ts` 的 `base: '/deepseek-harness/'` 决定，配合 HashRouter 保证深层链接在 Pages 上刷新不 404。换仓库名时同步改这三处：

```
vite.config.ts        base
src/content/site.ts   github / homepage
public/sitemap.xml    https://yuxinrun.github.io/deepseek-harness/#/…
```

## 数据口径

站内所有数字标注了采集时间与版本（DeepSeek Harness `0.2.1-rc.2`，2025 年 10 月快照）：工具数量与系统提示长度、事件类型数、单价与倍率、缓存命中折扣、会话日志的压缩格式与保留期，都来自橙皮书的实测记录与官方公开页面。模型换代后这些数字会变，`#/about` 列出了本站明确不假装知道的部分。

## 许可与致谢

内容基于花叔《DeepSeek Harness：从开机到拆开》橙皮书及 DeepSeek / Anthropic / OpenAI / LangChain / Composio 官方公开资料重新组织。商标与项目名归各自所有者。
