import type { ReactNode } from 'react'
import { useLang } from '../../i18n/LanguageContext'
import { Icon, type IconName } from '../Icon'
import { EChart } from '../charts/EChart'
import type { DiagramId, Pair } from '../../content/types'

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="diagram">
      {children}
      <figcaption className="diagram-caption">{caption}</figcaption>
    </figure>
  )
}

function Node({ label, detail, tone, icon }: { label: Pair; detail?: Pair; tone?: 'accent' | 'orange' | 'green'; icon?: IconName }) {
  const { lang } = useLang()
  return (
    <div className={`diagram-node${tone ? ` is-${tone}` : ''}`}>
      {icon ? (
        <span className="diagram-node-icon">
          <Icon name={icon} size={13} />
        </span>
      ) : null}
      <b>{label[lang]}</b>
      {detail ? <span>{detail[lang]}</span> : null}
    </div>
  )
}

function Arrow({ vertical }: { vertical?: boolean }) {
  return (
    <span className={`diagram-arrow${vertical ? ' is-vertical' : ''}`} aria-hidden="true">
      <Icon name={vertical ? 'chevronDown' : 'chevronRight'} size={14} />
    </span>
  )
}

function Flow({ children }: { children: ReactNode }) {
  return <div className="diagram-flow">{children}</div>
}

function Kicker({ text }: { text: Pair }) {
  const { lang } = useLang()
  return <p className="diagram-kicker">{text[lang]}</p>
}

function Layer({ title, items, tone }: { title: Pair; items: Pair; tone?: 'accent' | 'orange' | 'green' }) {
  const { lang } = useLang()
  return (
    <div className={`diagram-layer${tone ? ` is-${tone}` : ''}`}>
      <strong>{title[lang]}</strong>
      <span>{items[lang]}</span>
    </div>
  )
}

function Legend({ items }: { items: { text: Pair; tone: 'accent' | 'orange' | 'green' | 'muted' }[] }) {
  const { lang } = useLang()
  return (
    <div className="diagram-legend">
      {items.map((item, index) => (
        <span key={index} className={`legend-dot is-${item.tone}`}>
          {item.text[lang]}
        </span>
      ))}
    </div>
  )
}

export function Diagram({ id, caption }: { id: DiagramId; caption: string }) {
  return <Frame caption={caption}>{build(id)}</Frame>
}

function build(id: DiagramId): ReactNode {
  switch (id) {
    case 'harness-layers':
      return <HarnessLayers />
    case 'modes-radar':
      return <ModesRadar />
    case 'cost-pie':
      return <CostPie />
    case 'pricing-bars':
      return <PricingBars />
    case 'permission-bounds':
      return <PermissionBounds />
    case 'approval-flow':
      return <ApprovalFlow />
    case 'event-stream':
      return <EventStream />
    case 'mode-decision':
      return <ModeDecision />
    case 'ralph-loop':
      return <RalphLoop />
    case 'plugin-layers':
      return <PluginLayers />
    case 'compaction':
      return <Compaction />
    default:
      return null
  }
}

/* ---------- 五层架构 ---------- */
function HarnessLayers() {
  return (
    <div className="diagram-stack">
      <Kicker
        text={{
          zh: '一次请求自上而下穿过五层。只有事件日志是真相，其余四层都可以从它重建或者被替换。',
          en: 'A request passes through five layers. Only the event log is truth; the other four can be rebuilt from it or swapped out.',
        }}
      />
      <div className="diagram-layers">
        <Layer
          tone="accent"
          title={{ zh: '① 界面层', en: '① Surfaces' }}
          items={{
            zh: '命令行 / 网页 / 桌面端 / 编辑器桥（ACP）。同一份日志，四种看法。',
            en: 'CLI, web, desktop, editor bridge (ACP). One log, four views.',
          }}
        />
        <Layer
          title={{ zh: '② 扩展点层', en: '② Extension points' }}
          items={{
            zh: '29 行「功能 → 扩展点」映射：skill、MCP、工具、模型、界面全部是普通插件。',
            en: 'A 29-row feature-to-extension map: skills, MCP, tools, models and UI are ordinary plugins.',
          }}
        />
        <Layer
          tone="orange"
          title={{ zh: '③ Agent 主循环', en: '③ Agent loop' }}
          items={{
            zh: '请求 → 工具调用 → 结果 → 再请求。连它都能用 disabled: true 关掉。',
            en: 'Request, tool call, result, repeat. Even this can be switched off with disabled: true.',
          }}
        />
        <Layer
          tone="green"
          title={{ zh: '④ 事件日志（唯一真相）', en: '④ Event log (the only truth)' }}
          items={{
            zh: '只能追加、不能回改。62 种事件，模型只看得见其中 5 种。',
            en: 'Append-only. 62 event kinds, only 5 of them visible to the model.',
          }}
        />
        <Layer
          title={{ zh: '⑤ 模型与沙箱', en: '⑤ Model & sandbox' }}
          items={{
            zh: 'DeepSeek API、工具执行沙箱（sandbox-exec / bubblewrap / 受限令牌）、文件系统。',
            en: 'DeepSeek API, tool sandbox (sandbox-exec / bubblewrap / restricted token), file system.',
          }}
        />
      </div>
      <Legend
        items={[
          { text: { zh: '可替换', en: 'Replaceable' }, tone: 'accent' },
          { text: { zh: '可关闭', en: 'Switchable off' }, tone: 'orange' },
          { text: { zh: '不可变', en: 'Immutable' }, tone: 'green' },
        ]}
      />
    </div>
  )
}

/* ---------- 四种模式：相对刻度雷达 ---------- */
function ModesRadar() {
  const { lang } = useLang()
  const axes = {
    tools: lang === 'zh' ? '工具面' : 'Tool surface',
    autonomy: lang === 'zh' ? '自主性' : 'Autonomy',
    light: lang === 'zh' ? '上下文轻量' : 'Context lightness',
    cost: lang === 'zh' ? '成本可控' : 'Cost control',
    ease: lang === 'zh' ? '上手容易' : 'Ease of start',
  }
  return (
    <div>
      <Kicker
        text={{
          zh: '刻度是 1–5 的相对值，按本版实测的工具数、提示词体积和首轮输入 token 折算；看形状，别看绝对数。',
          en: 'Relative 1-5 scores derived from tool counts, prompt size and first-round input tokens in this build. Read the shape, not the digits.',
        }}
      />
      <EChart
        height={300}
        ariaLabel={lang === 'zh' ? '四种模式能力雷达图' : 'Radar of the four modes'}
        option={(tokens) => {
          const colors = [tokens.accent, tokens.blue, tokens.green, tokens.orange]
          const sets = [
            { name: lang === 'zh' ? '标准（31 工具）' : 'Standard (31 tools)', value: [4, 4, 2, 3, 5] },
            { name: lang === 'zh' ? 'PTC（1 工具）' : 'PTC (1 tool)', value: [1, 4, 4, 4, 2] },
            { name: lang === 'zh' ? '极简（3 工具）' : 'Minimal (3 tools)', value: [1, 2, 5, 5, 4] },
            { name: lang === 'zh' ? '创造（34 工具）' : 'Creator (34 tools)', value: [5, 5, 1, 2, 2] },
          ]
          return {
            tooltip: {
              backgroundColor: tokens.panel,
              borderColor: tokens.line,
              textStyle: { color: tokens.ink, fontSize: 11 },
            },
            legend: {
              bottom: 0,
              icon: 'roundRect',
              itemWidth: 10,
              itemHeight: 6,
              textStyle: { color: tokens.muted, fontSize: 11 },
            },
            radar: {
              indicator: Object.values(axes).map((name) => ({ name, max: 5 })),
              radius: '60%',
              center: ['50%', '44%'],
              axisName: { color: tokens.muted, fontSize: 11 },
              splitLine: { lineStyle: { color: tokens.line } },
              splitArea: { show: false },
              axisLine: { lineStyle: { color: tokens.line } },
            },
            series: sets.map((set, index) => ({
              type: 'radar' as const,
              name: set.name,
              symbolSize: 4,
              lineStyle: { width: 2, color: colors[index] },
              itemStyle: { color: colors[index] },
              areaStyle: { color: colors[index], opacity: 0.1 },
              data: [{ value: set.value, name: set.name }],
            })),
          }
        }}
      />
    </div>
  )
}

/* ---------- 成本构成饼 ---------- */
function CostPie() {
  const { lang } = useLang()
  return (
    <div>
      <Kicker
        text={{
          zh: '番茄钟那条会话的实测账单：约 ¥0.16（平峰）。输出 token 只占 4% 的量，却占了 8 成的钱。',
          en: 'The measured bill for the pomodoro session: about ¥0.16 off-peak. Output is 4% of the tokens but 82% of the money.',
        }}
      />
      <EChart
        height={260}
        ariaLabel={lang === 'zh' ? '一次任务的成本构成' : 'Cost breakdown of one task'}
        option={(tokens) => ({
          tooltip: {
            trigger: 'item',
            backgroundColor: tokens.panel,
            borderColor: tokens.line,
            textStyle: { color: tokens.ink, fontSize: 11 },
            formatter: '{b}: {d}%',
          },
          legend: {
            bottom: 0,
            icon: 'roundRect',
            itemWidth: 10,
            itemHeight: 6,
            textStyle: { color: tokens.muted, fontSize: 11 },
          },
          series: [
            {
              type: 'pie',
              radius: ['48%', '72%'],
              center: ['50%', '44%'],
              avoidLabelOverlap: true,
              itemStyle: { borderColor: tokens.panel, borderWidth: 2 },
              label: { color: tokens.muted, fontSize: 11, formatter: '{d}%' },
              labelLine: { lineStyle: { color: tokens.line } },
              data: [
                {
                  name: lang === 'zh' ? '缓存命中输入 ¥0.0154' : 'Cached input ¥0.0154',
                  value: 0.0154,
                  itemStyle: { color: tokens.accent },
                },
                {
                  name: lang === 'zh' ? '未命中输入 ¥0.0138' : 'Uncached input ¥0.0138',
                  value: 0.0138,
                  itemStyle: { color: tokens.blue },
                },
                {
                  name: lang === 'zh' ? '输出 ¥0.1344' : 'Output ¥0.1344',
                  value: 0.1344,
                  itemStyle: { color: tokens.orange },
                },
              ],
            },
          ],
        })}
      />
    </div>
  )
}

/* ---------- 峰谷价对比 ---------- */
function PricingBars() {
  const { lang } = useLang()
  return (
    <div>
      <Kicker
        text={{
          zh: '人民币 / 百万 token，对数刻度。高峰（工作日 9–12、14–18 CST）就是平峰的两倍——同一句话，价格翻倍。',
          en: 'RMB per million tokens, log scale. Peak hours (weekdays 9-12 and 14-18 CST) are exactly twice off-peak.',
        }}
      />
      <EChart
        height={280}
        ariaLabel={lang === 'zh' ? '平峰与高峰价格对比' : 'Off-peak versus peak pricing'}
        option={(tokens) => ({
          tooltip: {
            trigger: 'axis',
            backgroundColor: tokens.panel,
            borderColor: tokens.line,
            textStyle: { color: tokens.ink, fontSize: 11 },
            valueFormatter: (value) => `¥${value}/M`,
          },
          legend: {
            bottom: 0,
            icon: 'roundRect',
            itemWidth: 10,
            itemHeight: 6,
            textStyle: { color: tokens.muted, fontSize: 11 },
          },
          grid: { left: 54, right: 16, top: 18, bottom: 52 },
          xAxis: {
            type: 'category',
            data:
              lang === 'zh'
                ? ['Flash 缓存入', 'Flash 未命中入', 'Flash 输出', 'Pro 缓存入', 'Pro 未命中入', 'Pro 输出']
                : ['Flash cached in', 'Flash uncached in', 'Flash output', 'Pro cached in', 'Pro uncached in', 'Pro output'],
            axisLine: { lineStyle: { color: tokens.line } },
            axisLabel: { color: tokens.muted, fontSize: 10, interval: 0 },
            axisTick: { show: false },
          },
          yAxis: {
            type: 'log',
            logBase: 10,
            min: 0.01,
            axisLabel: { color: tokens.muted, fontSize: 10, formatter: '¥{value}' },
            splitLine: { lineStyle: { color: tokens.line } },
          },
          series: [
            {
              name: lang === 'zh' ? '平峰' : 'Off-peak',
              type: 'bar',
              barWidth: 12,
              itemStyle: { color: tokens.accent, borderRadius: [4, 4, 0, 0] },
              data: [0.02, 1, 4, 0.15, 4.5, 13.5],
            },
            {
              name: lang === 'zh' ? '高峰（×2）' : 'Peak (×2)',
              type: 'bar',
              barWidth: 12,
              itemStyle: { color: tokens.orange, borderRadius: [4, 4, 0, 0] },
              data: [0.04, 2, 8, 0.3, 9, 27],
            },
          ],
        })}
      />
    </div>
  )
}

/* ---------- 权限边界 ---------- */
function PermissionBounds() {
  return (
    <div>
      <Kicker
        text={{
          zh: '三档不是「信任度」，是三条硬边界：读永远是底，写只在授权目录，出网必须人点头。',
          en: 'The three tiers are hard boundaries, not trust levels: reading is the floor, writing is scoped to granted directories, egress needs a human.',
        }}
      />
      <Flow>
        <Node
          tone="green"
          icon="shieldCheck"
          label={{ zh: '第 0 档 只读', en: 'Tier 0 Read-only' }}
          detail={{
            zh: '读文件、搜索、看目录。永远可用，也是升权失败后的回落点。',
            en: 'Read, search, list. Always available and the floor after a failed escalation.',
          }}
        />
        <Arrow />
        <Node
          tone="accent"
          icon="key"
          label={{ zh: '第 1 档 工作区内写', en: 'Tier 1 Write in workspace' }}
          detail={{
            zh: '写/改只限当前工作区；沙箱把命令关在里面，越界即失败。',
            en: 'Write/edit confined to the current workspace; the sandbox fails any escape.',
          }}
        />
        <Arrow />
        <Node
          tone="orange"
          icon="alert"
          label={{ zh: '第 2 档 升权', en: 'Tier 2 Escalation' }}
          detail={{
            zh: '带理由的申请 + 审批卡片，只重试一次；出网、装包、跨目录都走这里。',
            en: 'Justified request plus an approval card, retried once. Egress, installs and cross-directory writes land here.',
          }}
        />
      </Flow>
      <Legend
        items={[
          { text: { zh: '不需要批准', en: 'No approval' }, tone: 'green' },
          { text: { zh: '按目录授权', en: 'Scoped by directory' }, tone: 'accent' },
          { text: { zh: '每次都问人', en: 'Asks every time' }, tone: 'orange' },
          { text: { zh: '升权从不投机', en: 'Never speculative' }, tone: 'muted' },
        ]}
      />
    </div>
  )
}

/* ---------- 审批流 ---------- */
function ApprovalFlow() {
  return (
    <div className="diagram-stack">
      <Kicker
        text={{
          zh: '一次升权的完整路径。注意最后两步：拒绝不是死路，回落到只读继续干活。',
          en: 'The full escalation path. Note the last two steps: a denial is not a dead end, it falls back to read-only work.',
        }}
      />
      <Flow>
        <Node
          icon="code"
          label={{ zh: '模型申请', en: 'Model asks' }}
          detail={{ zh: '带 sandbox_permissions 与理由', en: 'sandbox_permissions + justification' }}
        />
        <Arrow />
        <Node
          icon="messages"
          label={{ zh: '审批卡片', en: 'Approval card' }}
          detail={{ zh: '人看见命令原文和范围', en: 'Human sees the exact command' }}
        />
        <Arrow />
        <Node
          tone="accent"
          icon="check"
          label={{ zh: '批准 → 沙箱内执行', en: 'Approve → run confined' }}
          detail={{ zh: '一次重试，不重复打扰', en: 'One retry, no nagging' }}
        />
      </Flow>
      <Flow>
        <Node
          tone="orange"
          icon="x"
          label={{ zh: '拒绝', en: 'Deny' }}
          detail={{ zh: '结果以「被拒绝」写进日志', en: 'Denial is written to the log' }}
        />
        <Arrow vertical={false} />
        <Node
          tone="green"
          icon="arrowLeft"
          label={{ zh: '回落只读', en: 'Fall back to read-only' }}
          detail={{ zh: '继续能做的部分，不硬闯', en: 'Keeps doing what is allowed' }}
        />
        <Arrow />
        <Node
          icon="scroll"
          label={{ zh: '全程留痕', en: 'Everything logged' }}
          detail={{ zh: '谁批的、批了什么、结果如何', en: 'Who approved what, and the result' }}
        />
      </Flow>
    </div>
  )
}

/* ---------- 事件流 ---------- */
function EventStream() {
  return (
    <div className="diagram-stack">
      <Kicker
        text={{
          zh: '一条会话就是这条只能追加的流水。165 行日志里只有少数几行会进模型的上下文，其余全留给人和审计。',
          en: 'A session is this append-only stream. Of 165 log lines only a handful enter the model context; the rest exist for humans and audit.',
        }}
      />
      <Flow>
        <Node
          tone="accent"
          label={{ zh: '用户消息', en: 'User message' }}
          detail={{ zh: '模型可见', en: 'model-visible' }}
        />
        <Arrow />
        <Node
          tone="accent"
          label={{ zh: '模型请求', en: 'Model request' }}
          detail={{ zh: '系统提示 + 工具规格 + skill 目录', en: 'system prompt + tool specs + skill index' }}
        />
        <Arrow />
        <Node
          tone="accent"
          label={{ zh: '模型回复 / 工具调用', en: 'Reply / tool call' }}
          detail={{ zh: '模型可见', en: 'model-visible' }}
        />
        <Arrow />
        <Node
          tone="accent"
          label={{ zh: '工具结果', en: 'Tool result' }}
          detail={{ zh: '超 50,000 字节先卸载再回', en: 'spilled first if over 50,000 bytes' }}
        />
      </Flow>
      <Flow>
        <Node
          tone="green"
          label={{ zh: '审计事件', en: 'Audit events' }}
          detail={{ zh: 'token 计数、缓存命中、耗时', en: 'token counts, cache hits, duration' }}
        />
        <Arrow />
        <Node
          tone="green"
          label={{ zh: '权限与审批', en: 'Permission & approval' }}
          detail={{ zh: '谁批的、批了哪条命令', en: 'who approved which command' }}
        />
        <Arrow />
        <Node
          tone="green"
          label={{ zh: '生命周期', en: 'Lifecycle' }}
          detail={{ zh: '崩溃补记、压缩、卸载', en: 'crash repair, compaction, spill' }}
        />
        <Arrow />
        <Node
          tone="orange"
          label={{ zh: 'session.v4.jsonl.zstd', en: 'session.v4.jsonl.zstd' }}
          detail={{ zh: '~/.dsh/sessions/<ws>/，魔数 28b5 2ffd', en: '~/.dsh/sessions/<ws>/, magic 28b5 2ffd' }}
        />
      </Flow>
      <Legend
        items={[
          { text: { zh: '模型看得见（62 种里占 5 种）', en: 'Model-visible (5 of 62 kinds)' }, tone: 'accent' },
          { text: { zh: '只写给人和审计', en: 'Humans and audit only' }, tone: 'green' },
          { text: { zh: '落盘文件', en: 'On-disk file' }, tone: 'orange' },
        ]}
      />
    </div>
  )
}

/* ---------- 模式选择决策 ---------- */
function ModeDecision() {
  return (
    <div className="diagram-stack">
      <Kicker
        text={{
          zh: '三个问题决定用哪个模式。默认走标准，另外三个都是「有明确理由才切」。',
          en: 'Three questions pick the mode. Standard is the default; the other three need a stated reason.',
        }}
      />
      <Flow>
        <Node
          label={{ zh: '① 要不要让它自己写代码扩展能力？', en: '1. Should it extend itself?' }}
          detail={{ zh: '要 → 创造模式（34 工具）', en: 'Yes → creator mode (34 tools)' }}
          tone="orange"
        />
        <Arrow />
        <Node
          label={{ zh: '② 任务能不能编排成一段程序？', en: '2. Can the task be a program?' }}
          detail={{ zh: '能 → PTC（1 个 run_code）', en: 'Yes → PTC (one run_code)' }}
          tone="accent"
        />
        <Arrow />
        <Node
          label={{ zh: '③ 是在做基准测试吗？', en: '3. Is this a benchmark?' }}
          detail={{ zh: '是 → 极简（3 工具，225 字提示）', en: 'Yes → minimal (3 tools, 225-char prompt)' }}
          tone="green"
        />
      </Flow>
      <Flow>
        <Node
          tone="accent"
          icon="gauge"
          label={{ zh: '都不是 → 标准模式', en: 'None of the above → standard' }}
          detail={{ zh: '31 个工具、5,608 字提示，日常干活的默认档', en: '31 tools, 5,608-char prompt; the everyday tier' }}
        />
      </Flow>
    </div>
  )
}

/* ---------- Ralph 循环 ---------- */
function RalphLoop() {
  return (
    <div className="diagram-stack">
      <Kicker
        text={{
          zh: '自主长跑的循环体。0.1.7-rc.1 起默认关闭；产品里上限 64 轮，包里的默认值是 256。',
          en: 'The long-run loop. Off by default since 0.1.7-rc.1; the product caps at 64 rounds while the package default is 256.',
        }}
      />
      <Flow>
        <Node
          tone="accent"
          icon="target"
          label={{ zh: '目标（4 个阶段）', en: 'Goal (4 phases)' }}
          detail={{ zh: '激活不持久化，重启就没了', en: 'Activation is not persisted' }}
        />
        <Arrow />
        <Node
          icon="list"
          label={{ zh: '计划一步', en: 'Plan one step' }}
          detail={{ zh: '子代理可并行 fork', en: 'subagent_fork for parallelism' }}
        />
        <Arrow />
        <Node
          icon="terminal"
          label={{ zh: '执行', en: 'Execute' }}
          detail={{ zh: '工具调用全部进日志', en: 'every tool call is logged' }}
        />
        <Arrow />
        <Node
          tone="orange"
          icon="scale"
          label={{ zh: '自检报告（3 种判定）', en: 'Self-report (3 verdicts)' }}
          detail={{ zh: '报告超大直接算失败', en: 'an oversize report counts as failure' }}
        />
      </Flow>
      <div className="diagram-loopback">
        <Icon name="merge" size={13} />
        <span>
          {
            <LoopText />
          }
        </span>
      </div>
    </div>
  )
}

function LoopText() {
  const { lang } = useLang()
  return (
    <>
      {lang === 'zh'
        ? '「继续」回到计划；「完成」收尾；连续 3 轮判定卡住，闸门停止循环并把现场交回给人。'
        : '“continue” loops back to planning, “done” wraps up, and three consecutive stuck verdicts trip the gate, stop the loop and hand the scene back to a human.'}
    </>
  )
}

/* ---------- 插件分层 ---------- */
function PluginLayers() {
  return (
    <div className="diagram-stack">
      <Kicker
        text={{
          zh: '插件不是打进产品里的，是清单里的行。十月 dump-default-config 一共 190 行、1,229 行 YAML、23 行写着 disabled: true。',
          en: 'Plugins are rows in a list, not build-time code. In October dump-default-config emits 190 rows, 1,229 YAML lines, 23 of them disabled: true.',
        }}
      />
      <div className="diagram-layers">
        <Layer
          tone="accent"
          title={{ zh: '插件清单（YAML 行）', en: 'Plugin list (YAML rows)' }}
          items={{
            zh: 'skill、skill-filesystem、tool-skill、agent-loop、llm-deepseek、mcp-* …… 顺序即优先级，加一行 = 加能力，disabled: true = 摘掉。',
            en: 'skill, skill-filesystem, tool-skill, agent-loop, llm-deepseek, mcp-* … order is priority; a row adds a capability, disabled: true unplugs it.',
          }}
        />
        <Layer
          title={{ zh: 'Cordis 组合内核', en: 'Cordis composition kernel' }}
          items={{
            zh: '9 个内置包、2,600+ 行、8/10 改名 @deepseek-ai/；typert 生成约 30 个可调用方法。',
            en: '9 vendored packages, 2,600+ lines, renamed to @deepseek-ai/ on 8/10; typert generates roughly 30 callable methods.',
          }}
        />
        <Layer
          tone="orange"
          title={{ zh: '服务注册表（先到先得）', en: 'Service registry (first wins)' }}
          items={{
            zh: '同名服务第二次注册直接报错：service "<name>" has been registered at …。谁赢由清单顺序决定，不看谁更「聪明」。',
            en: 'A second registration of the same name fails hard: service "<name>" has been registered at … . Order in the list decides, not cleverness.',
          }}
        />
        <Layer
          tone="green"
          title={{ zh: '交给模型的能力', en: 'Capabilities handed to the model' }}
          items={{
            zh: '工具、skill 目录、MCP 桥（只桥工具，资源和提示词明确不桥）。',
            en: 'Tools, the skill index, and the MCP bridge (tools only; resources and prompts are explicitly out).',
          }}
        />
      </div>
      <Legend
        items={[
          { text: { zh: '可增可删', en: 'Add / remove' }, tone: 'accent' },
          { text: { zh: '冲突会响', en: 'Conflicts make noise' }, tone: 'orange' },
          { text: { zh: '模型最终看到的', en: 'What the model finally sees' }, tone: 'green' },
        ]}
      />
    </div>
  )
}

/* ---------- 上下文三条出口 ---------- */
function Compaction() {
  return (
    <div className="diagram-stack">
      <Kicker
        text={{
          zh: '上下文变大有三条不同的出口，代价完全不同。搞混它们，就会把「压缩」当成免费的。',
          en: 'Growth has three different exits with different costs. Confuse them and you will assume compaction is free.',
        }}
      />
      <Flow>
        <Node
          label={{ zh: '上下文涨到阈值', en: 'Context hits the threshold' }}
          detail={{ zh: '模型看不见被折叠的部分', en: 'the model stops seeing the folded part' }}
          tone="accent"
        />
      </Flow>
      <Flow>
        <Node
          tone="accent"
          icon="activity"
          label={{ zh: '压缩 compaction', en: 'Compaction' }}
          detail={{
            zh: '旧回合换成摘要。省 token，但细节永久丢失，模型得重读文件才能拿回来。',
            en: 'Older turns become a summary. Cheaper, but detail is lost for good and the model must re-read files.',
          }}
        />
        <Node
          tone="green"
          icon="trash"
          label={{ zh: '裁剪 trim', en: 'Trim' }}
          detail={{
            zh: '整段丢掉不再相关的回合。最省，也最容易让模型忘了你十分钟前的约束。',
            en: 'Drops whole turns. Cheapest, and the easiest way to lose a constraint stated ten minutes ago.',
          }}
        />
        <Node
          tone="orange"
          icon="database"
          label={{ zh: '卸载 spill', en: 'Spill' }}
          detail={{
            zh: '单条结果超 50,000 字节先落盘，只给摘要和路径。实测一例 171,000 字节，日志记 14,385 字节被省略。',
            en: 'A single result over 50,000 bytes goes to disk with a stub and path. One measured case: 171,000 bytes, log records 14,385 omitted.',
          }}
        />
      </Flow>
      <Legend
        items={[
          { text: { zh: '三者都只改「模型看得见什么」，不改日志', en: 'All three change model visibility, never the log' }, tone: 'muted' },
          { text: { zh: '想查历史：读 session 文件，别问模型', en: 'To check history, read the session file' }, tone: 'orange' },
        ]}
      />
    </div>
  )
}
