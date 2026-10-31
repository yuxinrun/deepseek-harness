import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon, type IconName } from '../Icon'
import { RichText } from '../RichText'
import { useLang } from '../../i18n/LanguageContext'
import type { Pair } from '../../content/types'

export type Exhibit = {
  id: string
  title: Pair
  tag: Pair
  icon: IconName
  symptom: Pair
  cause: Pair
  fix: Pair
  lesson?: Pair
  source?: { label: string; href: string }
  chapter: string
}

export const exhibits: Exhibit[] = [
  {
    id: 'green-tests-stale',
    title: { zh: '全绿的测试跑的是旧代码', en: 'One hundred seventy-eight green tests ran stale code' },
    tag: { zh: '事故 0001', en: 'Postmortem 0001' },
    icon: 'check',
    symptom: {
      zh: '编辑器桥有 178 个单元测试、行覆盖率 100%。真实编辑器（Zed）一连上，第一个请求就崩，报「拿不到本该注入的服务」。',
      en: 'The editor bridge had 178 unit tests and 100% line coverage. The first request from a real editor (Zed) crashed with a missing injected service.',
    },
    cause: {
      zh: '多写了一行 `export default apply`。加载器的规矩是「有默认件就只看默认件」，于是并排交出去的名字、服务申请单、配置全被丢掉，插件在什么都没申请到的环境里启动。',
      en: 'One extra line, `export default apply`. The loader honours a default export exclusively, so the sibling named exports — the name, the service request list, the schema — were dropped and the plugin booted having requested nothing.',
    },
    fix: {
      zh: '删掉那行；顺带修第二个 bug（服务查找只上溯祖先、不认兄弟）。所有测试改成走真实加载器，那条需要密钥的端到端测试补上 CI 凭证，并禁止拿本机残留编译产物当证据。',
      en: 'Delete the line, then fix the second bug (service lookup walked ancestors but not siblings). Tests now go through the real loader, CI got credentials for the end-to-end test, and stale local build output no longer counts as evidence.',
    },
    lesson: {
      zh: '覆盖率证明代码行被执行过；它不能说明功能是否按交付方式正常工作。',
      en: 'Coverage proves lines ran; it says nothing about whether the feature works as actually shipped.',
    },
    source: { label: 'DeepSeek Harness 仓库 docs/postmortem/', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
    chapter: '/chapter/postmortems',
  },
  {
    id: 'switch-wrong-slot',
    title: { zh: '写错位置的开关，把工具全关了', en: 'A switch in the wrong slot disabled every tool' },
    tag: { zh: '事故 0002', en: 'Postmortem 0002' },
    icon: 'lock',
    symptom: {
      zh: '读、写、改三个工具在所有模式下永久禁用。语法完全合法，加载时一句警告都没有。七个文件系统场景加一个混合场景，全在调用一个不存在的工具，而且测试是绿的。',
      en: 'Read, write and edit were permanently disabled in every mode. The syntax was legal and loading emitted no warning. Seven filesystem scenarios plus one mixed scenario were calling tools that did not exist, and the tests were green.',
    },
    cause: {
      zh: '「启不启用」这一格是直接照原样读的，值却是一小段现算的表达式。照原样读到的是一个对象，任何对象都算真，于是等于永久禁用。测试之所以绿，是因为中间有人刷新过快照：满屏的「找不到这个工具」被存成新的正确答案。',
      en: 'The enabled slot is read verbatim, but its value was an expression. Read verbatim that is an object, and every object is truthy, so the tools were disabled forever. The tests stayed green because someone refreshed the snapshots, storing “tool not found” as the new expected output.',
    },
    fix: {
      zh: '三道防护：那一格不许出现表达式并全仓扫描拒绝；快照工具拒绝把「找不到工具」收进预期输出；文件系统场景改用显式独立配置层。8 月 11 日这道禁令被自己推翻——加载器现在只求值那一格，因为 Windows 需要按平台开关某些行。',
      en: 'Three guards: no expressions in that slot plus a repo-wide scan that rejects them, the snapshot tool refusing to record missing-tool results, and filesystem scenarios moved to an explicit standalone config layer. On 2026-08-11 the ban was reversed — the loader now evaluates exactly that slot, because Windows needs per-platform rows.',
    },
    lesson: {
      zh: '快照刷新是 fixture 的生产过程，不是正确性审查。',
      en: 'Refreshing a snapshot is fixture production, not a correctness review.',
    },
    source: { label: 'DeepSeek Harness 仓库 docs/postmortem/', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
    chapter: '/chapter/postmortems',
  },
  {
    id: 'substitute-server',
    title: { zh: '它验收了一台替身服务器', en: 'It verified a substitute server' },
    tag: { zh: '事故 0003', en: 'Postmortem 0003' },
    icon: 'server',
    symptom: {
      zh: '用户在 3081 端口的网页界面里让它改主题。它改完源码，先说「你自己打开看看」；再起一个精简版开发服务器，命令一探、状态码 200，就宣布成功；最后找到正确启动方式，却起在 3334 并且只检查 3334。用户浏览器里是一片空白。',
      en: 'The user was on port 3081 and asked for a theme change. After editing source it pushed verification back (“open it yourself”), then started a slim dev server, probed it, saw HTTP 200 and declared success, and finally started the real thing on 3334 and checked only 3334. The user’s browser showed a blank page.',
    },
    cause: {
      zh: '网络通了不等于页面能看：完整界面还需要宿主注入一份启动清单，精简版不注入。更根本的是，这套系统从没告诉模型「你这个会话跑在哪个网址、哪个进程、什么模式」，它只知道当前工作目录，而那是用户选的目录，不是应用目录。',
      en: 'A live port is not a visible page: the full UI needs a host-injected manifest the slim server never provides. Deeper still, nothing told the model which URL, process and mode this session runs in — it only knew the working directory, which is the user’s workspace, not the app.',
    },
    fix: {
      zh: '把当前网址和运行模式做成模型能看见也能查的东西（`$DSH_WEB_URL`、`$DSH_WEB_MODE`；10 月改成从运行时上下文读网址），那个会误导人的精简服务器从此在启动阶段直接拒绝跑。',
      en: 'The session URL and mode became visible and queryable to the model (`$DSH_WEB_URL`, `$DSH_WEB_MODE`; October reads the URL from runtime context), and the misleading slim server now refuses to start at all.',
    },
    lesson: {
      zh: '一台替代服务，永远证明不了你那台页面变了。',
      en: 'A substitute server can never prove that your page changed.',
    },
    source: { label: 'DeepSeek Harness 仓库 docs/postmortem/', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
    chapter: '/chapter/postmortems',
  },
  {
    id: 'grep-as-sandbox-failure',
    title: { zh: '没搜到，被报成系统故障', en: 'An empty search reported as a system failure' },
    tag: { zh: '事故 0004', en: 'Postmortem 0004' },
    icon: 'bug',
    symptom: {
      zh: '在项目里搜一个关键词，搜索没搜到东西，按惯例以退出码 1 退出。这个正常结果被包装成「沙箱不可用」，再变成一句笼统的「搜索失败」。',
      en: 'A keyword search found nothing and exited with code 1, as grep does. That normal empty result was read as “sandbox unavailable” and surfaced as a generic “search failed”.',
    },
    cause: {
      zh: '在较老的 Linux 内核上，沙箱程序每次执行前会打印一行善意提示「我只能做到部分约束」，而它真出事时打印另一行诊断，两者开头是同一个前缀。harness 只用前缀 + 非零退出判断，于是把提醒当成了故障。',
      en: 'On older Linux kernels the sandbox runner prints an advisory line before every run, and prints a different diagnostic when it genuinely fails — both sharing one prefix. The harness keyed on prefix plus non-zero exit, so the advice read as an outage.',
    },
    fix: {
      zh: '加证据能避免这次这种撞车，但他们没假装修完：根因写得很明白——沙箱是靠读被关起来那个程序自己吐出来的文字来判断沙箱有没有出事，那个程序完全可以照着格式伪造那行字。真正的修法是另开一条带外通道，列为后续加固。',
      en: 'More evidence would prevent this particular collision, and they did not pretend it was fixed: the root cause states that sandbox health is judged from text printed by the confined process, which can deliberately reproduce that line and status. The real fix is an out-of-band channel, listed as future hardening.',
    },
    lesson: {
      zh: '约束没有被削弱，也没有命令跑在无约束状态下；损失在可用性和诊断的完整性上。',
      en: 'No constraint was weakened and nothing ran unconstrained; the loss was availability and diagnostic integrity.',
    },
    source: { label: 'DeepSeek Harness 仓库 docs/postmortem/', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
    chapter: '/chapter/postmortems',
  },
  {
    id: 'malformed-response',
    title: { zh: '公司代理吃掉请求，只留一个错误码', en: 'A corporate proxy ate the request and left one error code' },
    tag: { zh: '安装现场', en: 'Install floor' },
    icon: 'globe',
    symptom: {
      zh: '装完直接开一版，第一条消息回来一个 `MALFORMED_RESPONSE`，界面没有任何关于网络的提示。',
      en: 'Install, run, and the first message comes back as `MALFORMED_RESPONSE` with no network hint anywhere in the UI.',
    },
    cause: {
      zh: '机器上有公司代理或者自签证书，但 harness 没走系统代理。它把代理返回的 HTML 当成模型响应去解析，于是报格式错误，而不是报连不上。',
      en: 'A corporate proxy or self-signed certificate is in the path while the harness is not using the system proxy, so the proxy’s HTML gets parsed as a model response — a format error instead of a connectivity error.',
    },
    fix: {
      zh: '先把代理变量显式设好再起会话，并且用一条不发消息的命令验证配置能落地：确认拿到模型响应，再去谈任务本身。这一步别省，否则后面每个错误都要重新怀疑一遍环境。',
      en: 'Export the proxy variables explicitly before starting a session, then confirm configuration lands with a command that sends no message. Do not skip this — otherwise every later error means re-suspecting the environment.',
    },
    source: { label: '本站安装章节', href: 'https://yuxinrun.github.io/deepseek-harness' },
    chapter: '/chapter/quickstart',
  },
  {
    id: 'silent-hook-mismatch',
    title: { zh: '`Bash` 和 `bash`：一个字母的静默失败', en: 'Bash versus bash: a one-letter silent failure' },
    tag: { zh: '搬家现场', en: 'Migration floor' },
    icon: 'merge',
    symptom: {
      zh: '从 Claude Code 搬过来的钩子配置看着正常，事件也确实注册了，但某些钩子一次都没触发过；同时 `~/.claude/skills` 里的 skill 全部隐形。',
      en: 'Hooks migrated from Claude Code look registered yet some never fire, and skills under `~/.claude/skills` are entirely invisible.',
    },
    cause: {
      zh: '钩子桥只映射 30 个旧事件里的 7 个，名字大小写按字面匹配；`Bash` 匹配不到 `bash`。skill 目录扫描只走六条约定路径、且只下探一层，`~/.claude/skills` 不在名单里。',
      en: 'The hook bridge maps only 7 of the 30 legacy events and matches names literally, so `Bash` never matches `bash`. Skill scanning walks six documented paths, one level deep, and `~/.claude/skills` is not one of them.',
    },
    fix: {
      zh: '事件名一律按小写抄；把要用的 skill 目录软链到六条扫描路径之一，或者用 `DSH_AGENTS_HOME` 改根。搬完先用一条能打印 skill 数量的命令点名确认，别用「看起来没报错」当验收。',
      en: 'Copy event names in lowercase; symlink the skill directory into one of the six scan paths or move the root with `DSH_AGENTS_HOME`. Then confirm by name with a command that lists skills — “no error appeared” is not verification.',
    },
    lesson: {
      zh: '这一类错误的共同点不是难修，是没人告诉你它发生了。',
      en: 'The common thread is not that these are hard to fix; it is that nothing tells you they happened.',
    },
    source: { label: '本站搬家章节', href: 'https://yuxinrun.github.io/deepseek-harness' },
    chapter: '/chapter/migration',
  },
]

export function ErrorMuseum({ limit }: { limit?: number }) {
  const { t, zh } = useLang()
  const [openId, setOpenId] = useState<string | null>(null)
  const shown = limit ? exhibits.slice(0, limit) : exhibits

  return (
    <div className="lab-shell">
      <div className="lab-head">
        <span className="lab-icon" style={{ background: 'linear-gradient(135deg, var(--red), #ef4444)', boxShadow: '0 10px 22px -12px var(--red)' }}>
          <Icon name="bug" size={19} />
        </span>
        <div>
          <h3>{zh ? '错误博物馆' : 'Error museum'}</h3>
          <p>
            {zh
              ? '六个真实现场：现象、根因、怎么解。前四个是产品自己写进仓库的事故复盘，编号 0001 到 0004。'
              : 'Six real scenes: symptom, root cause, fix. The first four are postmortems the team wrote into the repo itself, numbered 0001 to 0004.'}
          </p>
        </div>
      </div>

      <div className="lab-body">
        <div style={{ display: 'grid', gap: 10 }}>
          {shown.map((exhibit) => (
            <details
              key={exhibit.id}
              className="error-card"
              open={openId === exhibit.id}
              onToggle={(event) => setOpenId((event.target as HTMLDetailsElement).open ? exhibit.id : null)}
            >
              <summary>
                <span className="e-icon">
                  <Icon name={exhibit.icon} size={15} />
                </span>
                <span style={{ minWidth: 0 }}>
                  <strong>{t(exhibit.title)}</strong>
                  <span>{t(exhibit.tag)}</span>
                </span>
                <Icon name="chevronDown" size={15} className="chev" />
              </summary>
              <div className="error-body">
                <div className="error-row">
                  <b>{zh ? '现象' : 'Symptom'}</b>
                  <span>
                    <RichText text={t(exhibit.symptom)} />
                  </span>
                </div>
                <div className="error-row">
                  <b>{zh ? '根因' : 'Cause'}</b>
                  <span>
                    <RichText text={t(exhibit.cause)} />
                  </span>
                </div>
                <div className="error-row">
                  <b>{zh ? '解决' : 'Fix'}</b>
                  <span>
                    <RichText text={t(exhibit.fix)} />
                  </span>
                </div>
                {exhibit.lesson ? (
                  <aside className="callout warn" style={{ marginTop: 4 }}>
                    <div className="callout-head">
                      <Icon name="spark" size={13} />
                      {zh ? '带走这一句' : 'Take this line'}
                    </div>
                    <p>{t(exhibit.lesson)}</p>
                  </aside>
                ) : null}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginTop: 2 }}>
                  {exhibit.source ? (
                    <a className="source-chip" href={exhibit.source.href} target="_blank" rel="noreferrer noopener">
                      {zh ? '来源' : 'Source'}
                      <Icon name="external" size={9} />
                      {exhibit.source.label}
                    </a>
                  ) : null}
                  <Link className="link-arrow" to={exhibit.chapter} style={{ fontSize: '0.74rem' }}>
                    {zh ? '去读对应的章' : 'Read the chapter'}
                    <Icon name="arrowRight" size={12} />
                  </Link>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
