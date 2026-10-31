import { useEffect, useMemo, useState } from 'react'
import { Icon } from '../Icon'
import { useLang } from '../../i18n/LanguageContext'
import type { Pair } from '../../content/types'

export const gateItems: { id: string; label: Pair; detail: Pair; chapter: string }[] = [
  {
    id: 'pin',
    label: { zh: '版本被钉住，并且写了为什么', en: 'The version is pinned, with the reason written down' },
    detail: {
      zh: '预览版会破坏兼容。记下 0.2.1-rc.2 这类具体版本和它对应的行为，出问题才有对照物。',
      en: 'Preview builds break compatibility. Record the exact version, e.g. 0.2.1-rc.2, and the behaviour it implies, so regressions have something to be compared against.',
    },
    chapter: '/chapter/versions',
  },
  {
    id: 'loader',
    label: { zh: '用交付方式验证过一次，不是手工挂载', en: 'Verified through the real delivery path, not hand-mounted' },
    detail: {
      zh: '事故 0001：178 个单元测试全绿、行覆盖率 100%，因为每个测试都绕过加载器手工挂插件。',
      en: 'Postmortem 0001: 178 green tests and 100% line coverage, because every test hand-mounted the plugin and skipped the loader.',
    },
    chapter: '/chapter/postmortems',
  },
  {
    id: 'snapshot',
    label: { zh: '快照刷新经过语义审查，不是无脑重录', en: 'Snapshot refreshes were reviewed semantically, not blindly re-recorded' },
    detail: {
      zh: '事故 0002：有人刷新过快照，把「找不到工具」存成了新的正确答案，七个场景于是稳定地失败着变绿。',
      en: 'Postmortem 0002: one snapshot refresh stored “tool not found” as the new expected output, and seven scenarios went on faithfully verifying a stable failure.',
    },
    chapter: '/chapter/postmortems',
  },
  {
    id: 'target',
    label: { zh: '验收指定确切地址，并从外部观察', en: 'Verification names the exact target and observes it from outside' },
    detail: {
      zh: '事故 0003：它验了 3334，用户在 3081。网络就绪、构建成功、启动清单是三件不同的事实。',
      en: 'Postmortem 0003: it verified port 3334 while the user sat on 3081. Network-ready, build-success and manifest-present are three different facts.',
    },
    chapter: '/chapter/postmortems',
  },
  {
    id: 'attribution',
    label: { zh: '沙箱状态判断不靠被关程序的 stderr', en: 'Sandbox status is not inferred from the confined program’s stderr' },
    detail: {
      zh: '事故 0004：一次正常的空搜索结果（退出码 1）撞上善意提示，被判成「沙箱不可用」。',
      en: 'Postmortem 0004: a normal empty search (exit code 1) collided with an advisory line and was labelled “sandbox unavailable”.',
    },
    chapter: '/chapter/postmortems',
  },
  {
    id: 'budget',
    label: { zh: '算过入场费和峰值价', en: 'Entry fee and peak pricing were computed' },
    detail: {
      zh: '10 月入场约 18,117 token，其中 skill 目录按个计费；高峰是工作日 9–12、14–18 CST，价格翻倍。',
      en: 'In October entry costs about 18,117 tokens, with the skill index billed per entry; peak hours are weekdays 9-12 and 14-18 CST at double price.',
    },
    chapter: '/chapter/cost',
  },
  {
    id: 'cache',
    label: { zh: '缓存命中路径验证过，而不是只看百分比', en: 'The cache-hit path is proven, not just the percentage' },
    detail: {
      zh: '缓存按 64 token 为单位、写入免费、能活几小时到几天；命中率掉到 0 大约是 3.55 倍，不是 50 倍。',
      en: 'Cache units are 64 tokens, writing is free, entries live hours to days; a full miss costs about 3.55x, not 50x.',
    },
    chapter: '/chapter/cost',
  },
  {
    id: 'telemetry',
    label: { zh: '遥测与日志上传策略已确认', en: 'Telemetry and log-upload policy is settled' },
    detail: {
      zh: '上传会话日志的开关出厂即开，内容是对话、工具参数和工具结果；匿名编号不受遥测设置影响。涉密项目先关掉。',
      en: 'Session-log upload ships switched on and carries your conversation plus tool arguments and results; the anonymous id ignores the telemetry setting. Switch it off before sensitive work.',
    },
    chapter: '/chapter/pitfalls',
  },
  {
    id: 'disk',
    label: { zh: '会话日志有保留期方案（它不会自己删）', en: 'You have a retention plan for session logs (nothing deletes itself)' },
    detail: {
      zh: '每个项目的会话都存在同一个目录，产品明确不引入保留期策略。一条最普通的命令也会落下 35 行物理记录。',
      en: 'Every project’s sessions land in one directory and the product deliberately ships no retention policy. Even one trivial command leaves 35 physical records.',
    },
    chapter: '/chapter/event-sourcing',
  },
  {
    id: 'conflict',
    label: { zh: '插件顺序固定，注册冲突有人负责', en: 'Plugin order is fixed and someone owns registration conflicts' },
    detail: {
      zh: '同名服务第二次注册直接报错 service "…" has been registered at …，谁赢由清单顺序决定。',
      en: 'A second registration of the same service fails with service "…" has been registered at … ; the list order decides the winner.',
    },
    chapter: '/chapter/plugin-conflicts',
  },
  {
    id: 'survive',
    label: { zh: '动态生成的插件按「不能重启存活」设计', en: 'Dynamically generated plugins are designed assuming they do not survive a restart' },
    detail: {
      zh: '内存里挂的插件不落文件、不改配置、不会被提升为正式插件；10 月起创造模式改用插件管理器安装。',
      en: 'An in-memory hook writes no files, changes no config and is never promoted; since October creator mode installs through the plugin manager instead.',
    },
    chapter: '/chapter/creator-mode',
  },
  {
    id: 'docs',
    label: { zh: '不信文档，先跑一遍再写进流程', en: 'Do not trust the docs — run it once before making it process' },
    detail: {
      zh: '本站抓到过三处文档落后于代码：工具数写 5 实测 7、改名工具还留在喂给模型的 skill 文件里、三处文档说 9 个内置包私有而它们全在 npm 上。',
      en: 'This site caught three cases of docs lagging code: a README saying five tools where the runtime had seven, a renamed tool still in a model-facing skill file, and three docs calling the nine vendored packages private while all nine are on npm.',
    },
    chapter: '/chapter/pitfalls',
  },
]

const STORAGE_KEY = 'dsh-gates-v1'

export function ReleaseGates() {
  const { t, zh } = useLang()
  const [done, setDone] = useState<string[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setDone(JSON.parse(stored) as string[])
    } catch {
      /* storage unavailable */
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(done))
    } catch {
      /* storage unavailable */
    }
  }, [done, loaded])

  const progress = useMemo(() => (done.length / gateItems.length) * 100, [done])
  const toggle = (id: string) => setDone((previous) => (previous.includes(id) ? previous.filter((item) => item !== id) : [...previous, id]))

  return (
    <div className="lab-shell">
      <div className="lab-head">
        <span className="lab-icon" style={{ background: 'linear-gradient(135deg, var(--blue), #2563eb)' }}>
          <Icon name="shieldCheck" size={19} />
        </span>
        <div>
          <h3>{zh ? '上线前 12 道门禁' : 'Twelve gates before you ship'}</h3>
          <p>
            {zh
              ? '每一道都对应这本书里一次真实的翻车。勾过的状态存在你这台机器的浏览器里，不上传。'
              : 'Each gate maps to a real failure recorded in this book. Your ticks live in this browser only — nothing is uploaded.'}
          </p>
        </div>
      </div>

      <div className="lab-body">
        <div className="gate-progress">
          <div className="bar">
            <i style={{ width: `${progress}%` }} />
          </div>
          <span>
            {done.length}/{gateItems.length}
          </span>
          <button type="button" className="btn btn-sm btn-ghost" onClick={() => setDone([])}>
            <Icon name="trash" size={13} />
            {zh ? '清空' : 'Reset'}
          </button>
        </div>

        <div className="gate-list">
          {gateItems.map((item, index) => {
            const checked = done.includes(item.id)
            return (
              <button key={item.id} type="button" className={`gate-item ${checked ? 'is-done' : ''}`} onClick={() => toggle(item.id)} aria-pressed={checked}>
                <span className="gate-box">
                  <Icon name="check" size={12} />
                </span>
                <span className="gate-text">
                  <strong>
                    {String(index + 1).padStart(2, '0')} · {t(item.label)}
                  </strong>
                  <span>{t(item.detail)}</span>
                </span>
              </button>
            )
          })}
        </div>

        <div className="chip-row" style={{ marginTop: 16 }}>
          {gateItems.map((item) => (
            <a key={item.id} className="chip" href={`${import.meta.env.BASE_URL}#${item.chapter}`}>
              {t(item.label).slice(0, zh ? 12 : 18)}…
              <Icon name="arrowUpRight" size={10} />
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
