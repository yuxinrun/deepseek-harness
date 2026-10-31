import { Link } from 'react-router-dom'
import { Shell } from '../components/layout/Shell'
import { Icon } from '../components/Icon'
import { LogoMark } from '../components/Logo'
import { Reveal } from '../components/Reveal'
import { chapters, partGroups, totalReadMinutes } from '../content/chapters'
import { nav, sisters, site, ui } from '../content/site'
import { useLang } from '../i18n/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'

const ORANGE_BOOK = 'https://www.huasheng.ai/orange-books/deepseek-harness/read/'

export function About() {
  const { t, zh } = useLang()
  usePageMeta({
    title: zh ? '关于本站' : 'About',
    description: t(site.description),
  })

  const facts = [
    { value: String(chapters.length), label: { zh: '个可阅读入口', en: 'readable entries' }, sub: { zh: '17 章 + 4 篇附录', en: '17 chapters + 4 appendices' } },
    { value: String(partGroups.length), label: { zh: '个部分', en: 'parts' }, sub: { zh: 'I 上手 → VI 附录', en: 'I start → VI appendix' } },
    { value: String(totalReadMinutes), label: { zh: '分钟阅读量', en: 'minutes of reading' }, sub: { zh: '按每章标称时长累加', en: 'sum of per-chapter estimates' } },
    { value: '6', label: { zh: '个交互模块', en: 'interactive modules' }, sub: { zh: '实验室 · 门禁 · 博物馆 · 工具箱', en: 'lab · gates · museum · toolkit' } },
  ]

  return (
    <Shell>
      <div className="about-hero">
        <div>
          <p className="eyebrow">
            <Icon name="book" size={12} />
            {t(nav.about)}
          </p>
          <h1 className="display">{zh ? '这本手册是怎么写出来的' : 'How this handbook was written'}</h1>
          <p style={{ marginTop: 12, fontSize: '0.95rem', lineHeight: 1.8, color: 'var(--muted)', maxWidth: 640 }}>{t(ui.brandLine)}</p>
          <div className="chip-row" style={{ marginTop: 16 }}>
            <a className="chip" href={site.github} target="_blank" rel="noreferrer noopener">
              GitHub
              <Icon name="external" size={10} />
            </a>
            <a className="chip" href={site.upstream} target="_blank" rel="noreferrer noopener">
              {zh ? '上游仓库' : 'Upstream repo'}
              <Icon name="external" size={10} />
            </a>
            <a className="chip" href={ORANGE_BOOK} target="_blank" rel="noreferrer noopener">
              {zh ? '花叔橙皮书' : 'Huashu orange book'}
              <Icon name="external" size={10} />
            </a>
            <a className="chip" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
        </div>
        <div className="about-avatar" aria-hidden="true">
          <span className="ring" />
          <LogoMark size={92} />
        </div>
      </div>

      <div className="about-stats">
        {facts.map((fact) => (
          <div className="stat-card" key={fact.label.en}>
            <div className="stat-value">{fact.value}</div>
            <div className="stat-label">{t(fact.label)}</div>
            <div className="stat-sub">{t(fact.sub)}</div>
          </div>
        ))}
      </div>

      <Reveal as="section" className="about-block">
        <h2 className="about-title">{zh ? '内容从哪来' : 'Where the content comes from'}</h2>
        <p>
          {zh
            ? '主线是花叔的橙皮书《DeepSeek Harness：从开机到拆开》——17 个小节、四次事故复盘、两次实测（8 月与 10 月同一套动作各跑一遍）。本站把它的顺序重排成「上手 → 原理 → 架构 → 生产 → 工具包 → 附录」，每一处关键事实旁边都挂一个「来源」标签，指向橙皮书原文或官方页面。第二层来源是官方仓库与文档、DeepSeek 价目页、Anthropic 与 OpenAI 的工程文章、MCP 规范，以及 Composio 那份跨 harness 的评测。'
            : 'The spine is Huashu’s orange book — 17 sections, four postmortems, and two measurement passes (the same actions run once in Aug and once in Oct). This site reshuffles its order into start → mechanics → architecture → production → playbook → appendices, and hangs a Source chip beside every load-bearing fact, pointing at the book or an official page. The second layer is the official repo and docs, DeepSeek’s price list, engineering posts from Anthropic and OpenAI, the MCP specification, and Composio’s cross-harness evaluation.'}
        </p>
      </Reveal>

      <Reveal as="section" className="about-block">
        <h2 className="about-title">{zh ? '数字的口径' : 'How numbers are dated'}</h2>
        <p>
          {zh
            ? '这是一个还在动的预览版：0.2.1-rc.2（10 月快照）。凡是没写月份的数字，都指 10 月；8 月公开时的值一律标注「8月」。工具数量、系统提示词字符数、事件类型条数这类东西每次发版都会变，本站不做「最新版」的承诺，只对某个快照负责——这也是每章都让你自己 `--dump-config`、自己去数日志的原因：你的版本可能和这里的每一个数字都不一样。'
            : 'This is a moving preview: 0.2.1-rc.2, an Oct snapshot. Any number without a month is an Oct number; Aug values are labelled Aug. Tool counts, prompt lengths and event-type counts change with every release, so this site makes no “latest” promise — it is accountable to a snapshot, which is why each chapter tells you to run --dump-config and count the log yourself: your build may differ from every figure here.'}
        </p>
        <aside className="callout warn" style={{ marginTop: 14 }}>
          <div className="callout-head">
            <Icon name="alert" size={14} />
            {zh ? '本站明确不假装知道的事' : 'What this site refuses to fake'}
          </div>
          <p>
            {zh
              ? '权限档位在配置文件里的 YAML 键名、创造模式 10 月版系统提示词的字符数、完整的键盘快捷键表、被删除的界面入口清单——橙皮书没写，本站就写「未记录」，并且告诉你用什么命令自己把它问出来。宁可少一段，也不编一个看起来对的数字。'
              : 'The YAML key that pins a permission tier, the Oct prompt length for creator mode, the full shortcut table, the list of removed UI entries — where the orange book is silent this site says “not documented” and gives you the command to ask the product directly. Better one paragraph short than one confident invention.'}
          </p>
        </aside>
      </Reveal>

      <Reveal as="section" className="about-block">
        <h2 className="about-title">{zh ? '作者与品牌' : 'Author and brand'}</h2>
        <p>
          {zh
            ? '作者是鱼心，出自「鱼心快跑 / YUXIN RUNS」这个系列，口号是「鱼心快跑，Bug 追不到」。本站是姊妹项目之一，导航栏和图标用的是 DeepSeek Harness 自己的标志（缰绳 + 插件 + 方括号 + 节点），不是品牌 Logo。'
            : 'Written by Yuxin under the YUXIN RUNS brand, slogan “Yuxin Rush, Bugs Gone”. This site is one of the family’s sister projects; the nav mark and favicon are DeepSeek Harness’s own logo (a rein, a plugin, brackets and nodes), not the brand logo.'}
        </p>
      </Reveal>

      <Reveal as="section" className="about-block">
        <h2 className="about-title">{zh ? '姊妹项目' : 'Sister projects'}</h2>
        <p>
          {zh
            ? '同一个体系里的另外 12 本：Agent 基础、本体论、循环工程、缰绳工程、评估、技能中心、可观测性、记忆、多 Agent 协作、网关、MCP。当前这个仓库负责 DeepSeek Harness 这一本。'
            : 'Twelve siblings: agent basics, ontology, loop engineering, harness engineering, evaluation, skill hubs, observability, memory, multi-agent, gateways, MCP. This repo owns the DeepSeek Harness volume.'}
        </p>
        <div className="link-grid" style={{ marginTop: 14 }}>
          {sisters.map((sister) => (
            <a
              key={sister.slug}
              className="link-card"
              href={`https://yuxinrun.github.io/${sister.slug}`}
              target="_blank"
              rel="noreferrer noopener"
            >
              <strong>
                {t(sister.title)}
                <Icon name="arrowUpRight" size={12} style={{ marginLeft: 5, verticalAlign: '-1px' }} />
              </strong>
              <span>{t(sister.desc)}</span>
              <span className="chip" style={{ alignSelf: 'flex-start', marginTop: 4 }}>
                {sister.tag}
              </span>
            </a>
          ))}
        </div>
      </Reveal>

      <aside className="chapter-end" style={{ marginTop: 30 }}>
        <div>
          <h3>{t(ui.endTitle)}</h3>
          <p>{t(ui.endDesc)}</p>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link className="btn btn-primary" to="/chapter/quickstart">
            {t(ui.startReading)}
            <Icon name="arrowRight" size={14} />
          </Link>
          <Link className="btn btn-ghost" to="/gates">
            {t(nav.gates)}
            <Icon name="shieldCheck" size={14} />
          </Link>
        </div>
      </aside>
    </Shell>
  )
}
