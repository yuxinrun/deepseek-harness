import { Link } from 'react-router-dom'
import { Shell } from '../components/layout/Shell'
import { ContentRenderer } from '../components/ContentRenderer'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { LogoMark } from '../components/Logo'
import { chapters, partGroups, totalReadMinutes } from '../content/chapters'
import { levelLabel } from '../content/types'
import { nav, sisters, sisterUrl, site, ui } from '../content/site'
import { useLang } from '../i18n/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'

const tickerFacts = [
  { zh: '0.2.1-rc.2 预览版', en: '0.2.1-rc.2 preview' },
  { zh: '4 种模式 · 31/1/3/34 个工具', en: '4 modes · 31/1/3/34 tools' },
  { zh: '62 种事件，模型只看 5 种', en: '62 event kinds, 5 model-visible' },
  { zh: '一次番茄钟任务 ≈ ¥0.16', en: 'one pomodoro task ≈ ¥0.16' },
  { zh: '22,395 次提交 / 1,268 篇设计笔记', en: '22,395 commits / 1,268 design notes' },
  { zh: '四篇事故复盘公开', en: 'four public postmortems' },
]

export function Home() {
  const { t, zh } = useLang()
  usePageMeta({
    title: undefined,
    description: t(site.description),
  })

  return (
    <Shell wide sidebar={false}>
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div>
              <span className="hero-badge">
                <span className="dot" />
                {zh ? '实战手册 · 中英双语 · 0.2.1-rc.2' : 'FIELD GUIDE · BILINGUAL · 0.2.1-rc.2'}
              </span>
              <h1 className="display hero-title">
                {zh ? (
                  <>
                    把 DeepSeek Harness
                    <br />
                    <span className="gradient-text">从开机讲到拆开</span>
                  </>
                ) : (
                  <>
                    DeepSeek Harness,
                    <br />
                    <span className="gradient-text">from first run to internals</span>
                  </>
                )}
              </h1>
              <p className="hero-lead">
                {zh
                  ? '十分钟跑通第一件活，然后一层层往下拆：权限边界、四种模式、事件日志、成本账本、插件内核、四次真实事故复盘。每条命令都能复制就跑，每个关键事实都挂着来源链接。'
                  : 'Get a real task done in ten minutes, then take it apart layer by layer: permission boundaries, the four modes, the event log, the cost ledger, the plugin kernel, and four real postmortems. Every command is copy-runnable; every key fact carries a source.'}
              </p>
              <div className="hero-actions">
                <Link className="btn btn-primary" to="/chapter/quickstart">
                  <Icon name="rocket" size={15} />
                  {zh ? '十分钟上手' : 'Ten-minute start'}
                </Link>
                <Link className="btn btn-ghost" to="/lab">
                  <Icon name="flask" size={15} />
                  {t(ui.openLab)}
                </Link>
                <Link className="btn btn-ghost" to="/chapters">
                  {t(ui.browseChapters)}
                  <Icon name="arrowRight" size={15} />
                </Link>
              </div>
              <div className="hero-meta">
                <span>
                  <b>{chapters.length}</b>
                  {zh ? '章 + 附录' : 'chapters + appendices'}
                </span>
                <span>
                  <b>{partGroups.length}</b>
                  {zh ? '个部分' : 'parts'}
                </span>
                <span>
                  <b>{totalReadMinutes}</b>
                  {zh ? '分钟阅读量' : 'min of reading'}
                </span>
                <span>
                  <b>6</b>
                  {zh ? '个交互模块' : 'interactive modules'}
                </span>
              </div>
              <p className="hero-source">
                {zh ? '事实主源：花叔《DeepSeek Harness：从开机到拆开》橙皮书 + 官方公开文档' : 'Primary source: Huashu’s orange book plus official public docs'}
              </p>
            </div>

            <div className="hero-visual">
              <div className="hero-terminal">
                <div className="hero-terminal-bar">
                  <i />
                  <i />
                  <i />
                  <span>dsh · first real task</span>
                </div>
                <div className="hero-terminal-body">
                  <div className="cmt">{zh ? '# 装完直接开一版，别急着配' : '# install, then run — do not configure first'}</div>
                  <div>
                    <span className="cmd">$</span> npx deepseek-harness@latest
                  </div>
                  <div className="ok">{zh ? '✓ 会话已就绪 · 标准模式 · 31 个工具' : '✓ session ready · standard mode · 31 tools'}</div>
                  <div>
                    <span className="cmd">&gt;</span> {zh ? '把 README 里的安装步骤改成能跑的脚本' : 'turn the README install steps into a runnable script'}
                  </div>
                  <div className="cmt">{zh ? '  → 工具调用：read / write / bash（沙箱内）' : '  → tool calls: read / write / bash (sandboxed)'}</div>
                  <div className="warn">{zh ? '  ⚠ 首次输入 ≈ 18,117 token，缓存命中 98.2%' : '  ⚠ first input ≈ 18,117 tokens, 98.2% cache hit'}</div>
                  <div className="ok">{zh ? '✓ 完成 · 账单 ≈ ¥0.16 · 日志 165 行' : '✓ done · bill ≈ ¥0.16 · 165 log lines'}</div>
                  <div>
                    <span className="cmd">$</span> dsh session export --out ./today.jsonl<span className="cur" />
                  </div>
                </div>
              </div>
              <p className="hero-note">
                <Icon name="scroll" size={12} />
                {zh ? '这一屏的每个数字都来自原始日志，不是宣传图' : 'every number on this screen comes from a raw log, not a deck'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">
          {[0, 1].map((copy) => (
            <div className="ticker-group" key={copy}>
              {tickerFacts.map((fact, index) => (
                <span key={index}>
                  {t(fact)}
                  <i>◆</i>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="section-index">01 / {zh ? '怎么读' : 'how to read'}</p>
              <h2 className="section-title">{zh ? '三个入口，按你现在的手艺选' : 'Three doors, pick the one that fits your skill'}</h2>
              <p className="section-desc">
                {zh
                  ? '这本书不是线性读的。刚装上就先去第一部分；已经用了几周、账单开始疼，直接跳第五、六章；要拆架构或者写插件，从第九到十一章进。'
                  : 'This is not a linear book. Fresh install goes to Part I; if the bill started hurting, jump to chapters 5-6; to take the architecture apart or write a plugin, enter at chapters 9-11.'}
              </p>
            </div>
            <Link className="link-arrow" to="/chapters">
              {t(ui.allChapters)}
              <Icon name="arrowRight" size={14} />
            </Link>
          </div>

          <div className="card-grid">
            {[
              {
                icon: 'rocket' as const,
                title: { zh: '我刚装上', en: 'Just installed' },
                desc: {
                  zh: '十分钟跑通第一件活，再搞清它被允许碰什么。别在没跑通之前改配置。',
                  en: 'Get one real task done in ten minutes, then learn what it may touch. Do not configure before it runs.',
                },
                to: '/chapter/quickstart',
              },
              {
                icon: 'coins' as const,
                title: { zh: '账单开始疼', en: 'The bill hurts' },
                desc: {
                  zh: '入场费、缓存命中、峰谷两倍价、压缩与卸载——四章把成本讲成一个数。',
                  en: 'Entry fee, cache hits, 2x peak pricing, compaction and spill — four chapters turn cost into arithmetic.',
                },
                to: '/chapter/cost',
              },
              {
                icon: 'puzzle' as const,
                title: { zh: '我要动手拆', en: 'I want to take it apart' },
                desc: {
                  zh: '插件清单、Cordis 内核、服务注册冲突、AI 写出来的代码库长什么样。',
                  en: 'Plugin lists, the Cordis kernel, registration conflicts, and what an AI-written codebase looks like.',
                },
                to: '/chapter/skills-mcp-plugins',
              },
            ].map((item, index) => (
              <Reveal key={item.to} delay={index * 80}>
                <Link className="card card-hover" to={item.to} style={{ display: 'block', padding: 18, height: '100%' }}>
                  <span className="ic" style={{ display: 'grid', placeItems: 'center', width: 34, height: 34, borderRadius: 9, color: 'var(--accent)', background: 'var(--accent-soft)', marginBottom: 10 }}>
                    <Icon name={item.icon} size={17} />
                  </span>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 750 }}>{t(item.title)}</h3>
                  <p style={{ marginTop: 6, fontSize: '0.8rem', lineHeight: 1.7, color: 'var(--muted)' }}>{t(item.desc)}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="section-index">02 / {zh ? '章节地图' : 'chapter map'}</p>
              <h2 className="section-title">{zh ? '六个部分，二十一个入口' : 'Six parts, twenty-one doors'}</h2>
              <p className="section-desc">
                {zh
                  ? '上手 → 原理 → 架构 → 踩坑 → 工具包 → 附录。每章末尾挂着来源清单和延伸阅读。'
                  : 'Start → mechanics → architecture → pitfalls → playbook → appendices. Every chapter ends with its sources and further reading.'}
              </p>
            </div>
          </div>

          {partGroups.map((group, groupIndex) => (
            <Reveal key={group.part.id} delay={groupIndex * 60}>
              <div style={{ marginBottom: 30 }}>
                <div className="chapter-section-head" style={{ marginBottom: 12 }}>
                  <span className="chapter-num">{group.part.num}</span>
                  <h3 style={{ fontSize: '1rem', fontWeight: 750 }}>{t(group.part.title)}</h3>
                  <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{t(group.part.desc)}</span>
                </div>
                <div className="chapter-grid">
                  {group.items.map((chapter, index) => (
                    <Reveal key={chapter.slug} delay={index * 40}>
                      <Link className="chapter-card" to={`/chapter/${chapter.slug}`}>
                        <div className="chapter-card-top">
                          <span className="chapter-num">{chapter.num}</span>
                          <Icon name={chapter.icon} size={16} style={{ color: 'var(--faint)' }} />
                        </div>
                        <h3>{t(chapter.title)}</h3>
                        <p>{t(chapter.subtitle)}</p>
                        <div className="chapter-card-foot">
                          <span>{t(levelLabel[chapter.level])}</span>
                          <span>·</span>
                          <span>
                            {chapter.minutes} {t(ui.minutes)}
                          </span>
                          <span style={{ marginLeft: 'auto' }}>
                            <Icon name="arrowRight" size={12} />
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="section-index">03 / {zh ? '动手' : 'hands-on'}</p>
              <h2 className="section-title">{zh ? '六个模块，读完就敲' : 'Six modules, use them right away'}</h2>
              <p className="section-desc">
                {zh
                  ? '选择题实验室、成本计算器、权限模拟器、发布门禁清单、错误博物馆、配置模板中心。清单勾选存在你本机浏览器里。'
                  : 'A mode-selection lab, a cost calculator, a permission simulator, a release-gate checklist, an error museum and a template center. Your checkmarks stay in your own browser.'}
              </p>
            </div>
          </div>

          <div className="card-grid">
            {[
              { to: '/lab', icon: 'flask' as const, title: { zh: '实战实验室', en: 'The lab' }, desc: { zh: '三问选模式、拖滑块算钱、模拟一次升权审批。', en: 'Pick a mode in three questions, drag sliders to price a run, simulate one escalation.' } },
              { to: '/gates', icon: 'shieldCheck' as const, title: { zh: '发布门禁清单', en: 'Release gates' }, desc: { zh: '12 项上线前检查，勾过的自动记住。', en: '12 pre-launch checks; your ticks persist locally.' } },
              { to: '/errors', icon: 'bug' as const, title: { zh: '错误博物馆', en: 'Error museum' }, desc: { zh: '六个真实失败现场：现象、根因、怎么解。', en: 'Six real failures: symptom, root cause, fix.' } },
              { to: '/toolkit', icon: 'wrench' as const, title: { zh: '工具箱', en: 'Toolkit' }, desc: { zh: '六套模板一键复制，改了就能跑。', en: 'Six templates, one click to copy, edit and run.' } },
              { to: '/chapter/postmortems', icon: 'scroll' as const, title: { zh: '四次事故复盘', en: 'Four postmortems' }, desc: { zh: '178 个绿测试跑的是旧代码；验收了一台替身服务器。', en: '178 green tests ran stale code; one run verified a substitute server.' } },
              { to: '/chapter/commands', icon: 'terminal' as const, title: { zh: '命令速查', en: 'Command reference' }, desc: { zh: 'CLI、斜杠命令、日志取证、环境变量。', en: 'CLI, slash commands, log forensics, env vars.' } },
            ].map((item, index) => (
              <Reveal key={item.to} delay={index * 50}>
                <Link className="card card-hover" to={item.to} style={{ display: 'block', padding: 16, height: '100%' }}>
                  <span style={{ display: 'grid', placeItems: 'center', width: 32, height: 32, borderRadius: 9, color: 'var(--orange)', background: 'var(--orange-soft)', marginBottom: 10 }}>
                    <Icon name={item.icon} size={16} />
                  </span>
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 750 }}>{t(item.title)}</h3>
                  <p style={{ marginTop: 5, fontSize: '0.78rem', lineHeight: 1.65, color: 'var(--muted)' }}>{t(item.desc)}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="section-index">04 / {zh ? '来源与家族' : 'sources & family'}</p>
              <h2 className="section-title">{zh ? '事实从哪儿来，还能去哪儿' : 'Where the facts come from, and where else to go'}</h2>
              <p className="section-desc">
                {zh
                  ? '本站的骨架来自花叔的橙皮书，加上 DeepSeek、Anthropic、OpenAI、LangChain、Composio 的公开文档与实测数据。查不到的，直接标「未验证」，不编。'
                  : 'The spine of this site is Huashu’s orange book plus public docs and measurements from DeepSeek, Anthropic, OpenAI, LangChain and Composio. Anything unverifiable is labelled unverified instead of invented.'}
              </p>
            </div>
            <a className="link-arrow" href="https://www.huasheng.ai/orange-books/deepseek-harness/read/" target="_blank" rel="noreferrer noopener">
              {zh ? '橙皮书原文' : 'Read the orange book'}
              <Icon name="arrowUpRight" size={14} />
            </a>
          </div>

          <ContentRenderer
            blocks={[
              {
                type: 'stats',
                items: [
                  { value: '22,395', label: { zh: '次提交', en: 'commits' }, sub: { zh: '10 月 20 日', en: 'as of Oct 20' } },
                  { value: '1,268', label: { zh: '篇设计笔记', en: 'design notes' }, sub: { zh: '含 8 篇被否方案', en: 'incl. 8 rejected' } },
                  { value: '27', label: { zh: '道机器门禁', en: 'mechanical gates' }, sub: { zh: '8 月统计', en: 'counted in Aug' } },
                  { value: '4', label: { zh: '篇公开事故复盘', en: 'public postmortems' }, sub: { zh: '0001–0004', en: '0001–0004' } },
                  { value: '46.7%→66.7%', label: { zh: '同模型换缰绳的通过率', en: 'same model, other harness' }, sub: { zh: 'Composio 240 次实测', en: 'Composio, 240 runs' } },
                ],
              },
            ]}
          />

          <div className="link-grid" style={{ marginTop: 22 }}>
            {sisters
              .filter((sister) => sister.slug !== 'deepseek-harness')
              .map((sister) => (
                <a className="link-card" key={sister.slug} href={sisterUrl(sister.slug)} target="_blank" rel="noreferrer noopener">
                  <strong>
                    {t(sister.title)}
                    <Icon name="arrowUpRight" size={12} style={{ marginLeft: 5, verticalAlign: '-1px' }} />
                  </strong>
                  <span>{t(sister.desc)}</span>
                  <span className="chip" style={{ alignSelf: 'flex-start', marginTop: 4 }}>{sister.tag}</span>
                </a>
              ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="chapter-end">
            <div>
              <p className="eyebrow">
                <LogoMark size={20} />
                {site.brand} · {site.author}
              </p>
              <h3>{t(ui.endTitle)}</h3>
              <p>{t(ui.endDesc)}</p>
            </div>
            <div className="hero-actions" style={{ margin: 0 }}>
              <Link className="btn btn-accent" to="/gates">
                <Icon name="check" size={15} />
                {t(ui.footerTools)}
              </Link>
              <Link className="btn btn-ghost" to="/about">
                {t(nav.about)}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Shell>
  )
}
