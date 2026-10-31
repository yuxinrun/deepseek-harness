import { useState } from 'react'
import { Icon } from '../Icon'
import { useLang } from '../../i18n/LanguageContext'
import type { Pair } from '../../content/types'

type Tier = 'readonly' | 'workspace' | 'escalate'
type Verdict = 'allow' | 'ask' | 'deny'

const tiers: { id: Tier; name: Pair; blurb: Pair; preset: string }[] = [
  {
    id: 'readonly',
    name: { zh: '第 0 档 · 只读', en: 'Tier 0 · Read-only' },
    blurb: {
      zh: '能读、能搜、能看目录。写和跑命令都问人。适合先看代码再决定的活儿。',
      en: 'Reads, searches, lists. Writing and commands always ask. Good before you trust the task.',
    },
    preset: 'permission/preset = read-only · sandbox/mode = restricted · approval/policy = ask',
  },
  {
    id: 'workspace',
    name: { zh: '第 1 档 · 工作区内写', en: 'Tier 1 · Write in workspace' },
    blurb: {
      zh: '日常档：写和改只限当前工作区，命令在沙箱里跑；出网、装包、越界要人批。',
      en: 'The daily tier: writes stay inside the workspace, commands run sandboxed; egress, installs and escapes need approval.',
    },
    preset: 'permission/preset = workspace-write · sandbox/mode = sandboxed · approval/policy = ask',
  },
  {
    id: 'escalate',
    name: { zh: '第 2 档 · 允许升权', en: 'Tier 2 · Escalation allowed' },
    blurb: {
      zh: '模型可以带着理由申请更大范围，仍然每次弹卡片。它从不投机申请。',
      en: 'The model may request a wider scope with a justification; every request still raises a card. Escalation is never speculative.',
    },
    preset: 'permission/preset = workspace-write · sandbox/mode = sandboxed · approval/policy = ask-on-escalation',
  },
]

const scenarios: { id: string; label: Pair; path: string; per: Record<Tier, { verdict: Verdict; why: Pair }> }[] = [
  {
    id: 'read',
    label: { zh: '读一个项目内的文件', en: 'Read a file inside the project' },
    path: './src/index.css',
    per: {
      readonly: { verdict: 'allow', why: { zh: '读永远是底，也是升权失败后的回落点。', en: 'Reading is the floor and the fallback after a denied escalation.' } },
      workspace: { verdict: 'allow', why: { zh: '不需要批准，直接进日志。', en: 'No approval; the call is written straight to the log.' } },
      escalate: { verdict: 'allow', why: { zh: '同上，档位更高不会让读变贵。', en: 'Same as above — a higher tier never makes reading costlier.' } },
    },
  },
  {
    id: 'write',
    label: { zh: '改工作区内的源码文件', en: 'Edit a source file in the workspace' },
    path: './src/pages/Home.tsx',
    per: {
      readonly: { verdict: 'ask', why: { zh: '只读档下任何写都要人点头。', en: 'Under read-only every write asks a human.' } },
      workspace: { verdict: 'allow', why: { zh: '在工作区边界内，沙箱直接放行。', en: 'Inside the workspace boundary, so the sandbox lets it through.' } },
      escalate: { verdict: 'allow', why: { zh: '同上。', en: 'Same as above.' } },
    },
  },
  {
    id: 'install',
    label: { zh: '装一个 npm 依赖', en: 'Install an npm dependency' },
    path: 'pnpm add echarts',
    per: {
      readonly: { verdict: 'deny', why: { zh: '写 node_modules + 出网，只读档直接拒。', en: 'Writes node_modules and needs egress; read-only denies.' } },
      workspace: { verdict: 'ask', why: { zh: '弹审批卡片；拒绝后回落到只读继续干。', en: 'Raises an approval card; a denial falls back to read-only work.' } },
      escalate: { verdict: 'ask', why: { zh: '带 sandbox_permissions + 理由申请，一次重试。', en: 'Requests sandbox_permissions with a justification, retried once.' } },
    },
  },
  {
    id: 'egress',
    label: { zh: ' curl 一个外部接口', en: 'curl an external endpoint' },
    path: 'curl -s https://api.deepseek.com',
    per: {
      readonly: { verdict: 'deny', why: { zh: '沙箱没有网络出口。', en: 'The sandbox has no network exit.' } },
      workspace: { verdict: 'ask', why: { zh: '出网永远问人——命令在沙箱外才是可信可执行代码。', en: 'Egress always asks — the command is trusted code outside the sandbox.' } },
      escalate: { verdict: 'ask', why: { zh: '同上，档位不改变出网要人批这件事。', en: 'Same: no tier removes the human from egress.' } },
    },
  },
  {
    id: 'config',
    label: { zh: '改自己的配置目录', en: 'Edit its own config directory' },
    path: '~/.dsh/config.yaml',
    per: {
      readonly: { verdict: 'deny', why: { zh: '工作区外，直接拒。', en: 'Outside the workspace — denied.' } },
      workspace: { verdict: 'ask', why: { zh: '跨目录写要走审批。', en: 'Cross-directory writes need approval.' } },
      escalate: { verdict: 'ask', why: { zh: '注意：配置目录里的凭据文件是 0600，但模型读得到——这是文档承认的缺口。', en: 'Note: credential files are 0600 yet the model can read them — a documented gap.' } },
    },
  },
  {
    id: 'delete',
    label: { zh: '删除工作区外的目录', en: 'Delete a directory outside the workspace' },
    path: 'rm -rf ../scratch',
    per: {
      readonly: { verdict: 'deny', why: { zh: '破坏性 + 越界。', en: 'Destructive and out of bounds.' } },
      workspace: { verdict: 'deny', why: { zh: '沙箱按边界拒，不是靠提示词劝。', en: 'The sandbox rejects on the boundary, not on a prompt.' } },
      escalate: { verdict: 'ask', why: { zh: '可以带理由申请；崩溃后这条调用的结局由日志判定。', en: 'It may ask with a justification; after a crash the log decides what the outcome was.' } },
    },
  },
  {
    id: 'push',
    label: { zh: 'git push 到远端', en: 'git push to a remote' },
    path: 'git push origin main',
    per: {
      readonly: { verdict: 'deny', why: { zh: '出网 + 改共享状态。', en: 'Egress plus shared state.' } },
      workspace: { verdict: 'ask', why: { zh: '这是最该人看一眼的一类：推出去就不好收回。', en: 'The one a human should actually look at: a push is hard to take back.' } },
      escalate: { verdict: 'ask', why: { zh: '审批卡片会显示命令原文。', en: 'The approval card shows the exact command.' } },
    },
  },
]

const badge: Record<Verdict, { tone: string; text: Pair }> = {
  allow: { tone: 'ok', text: { zh: '直接放行', en: 'Allowed' } },
  ask: { tone: 'warn', text: { zh: '弹审批卡片', en: 'Asks a human' } },
  deny: { tone: 'bad', text: { zh: '沙箱拒绝', en: 'Denied' } },
}

export function PermissionSim() {
  const { t, zh } = useLang()
  const [tier, setTier] = useState<Tier>('workspace')
  const [scenarioId, setScenarioId] = useState('install')
  const scenario = scenarios.find((item) => item.id === scenarioId) ?? scenarios[0]
  const outcome = scenario.per[tier]
  const active = tiers.find((item) => item.id === tier) ?? tiers[1]

  return (
    <div className="lab-shell">
      <div className="lab-head">
        <span className="lab-icon" style={{ background: 'linear-gradient(135deg, var(--green), #10b981)', boxShadow: '0 10px 22px -12px var(--green)' }}>
          <Icon name="shieldCheck" size={19} />
        </span>
        <div>
          <h3>{zh ? '权限边界模拟器' : 'Permission boundary simulator'}</h3>
          <p>
            {zh
              ? '选一档权限，再点一个动作，看它是放行、弹卡片还是被沙箱拒。三档是三条硬边界，不是三种信任度。'
              : 'Pick a tier, tap an action, and see whether it is allowed, escalated or blocked. Three hard boundaries, not three levels of trust.'}
          </p>
        </div>
      </div>

      <div className="lab-body">
        <div className="perm-grid">
          {tiers.map((item) => (
            <button key={item.id} type="button" className={`perm-card ${tier === item.id ? 'is-active' : ''}`} onClick={() => setTier(item.id)}>
              <strong>{t(item.name)}</strong>
              <span>{t(item.blurb)}</span>
            </button>
          ))}
        </div>

        <p className="code-title" style={{ marginTop: 14, marginBottom: 6, color: 'var(--faint)', fontFamily: 'var(--font-mono)', fontSize: 10 }}>
          {active.preset}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: zh ? 'minmax(0,1fr) 300px' : 'minmax(0,1fr) 340px', gap: 16, marginTop: 14 }}>
          <div className="scenario-list" role="listbox" aria-label={zh ? '动作列表' : 'Actions'}>
            {scenarios.map((item) => (
              <button
                key={item.id}
                type="button"
                className="scenario-btn"
                aria-pressed={item.id === scenarioId}
                onClick={() => setScenarioId(item.id)}
                style={item.id === scenarioId ? { borderColor: 'var(--accent)', background: 'var(--accent-soft)' } : undefined}
              >
                <Icon name="terminal" size={13} style={{ color: 'var(--faint)', flex: 'none' }} />
                <span>{t(item.label)}</span>
                <span className="path">{item.path}</span>
              </button>
            ))}
          </div>

          <div className="perm-verdict">
            <p className="lab-result-label">{zh ? '结果' : 'Outcome'}</p>
            <p style={{ margin: '8px 0 4px' }}>
              <span className={`chip ${badge[outcome.verdict].tone}`}>
                <Icon name={outcome.verdict === 'allow' ? 'check' : outcome.verdict === 'ask' ? 'messages' : 'lock'} size={11} />
                {t(badge[outcome.verdict].text)}
              </span>
            </p>
            <h4 style={{ marginTop: 10 }}>{t(scenario.label)}</h4>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--faint)', margin: '4px 0 8px' }}>{scenario.path}</p>
            <p>{t(outcome.why)}</p>

            {outcome.verdict === 'ask' ? (
              <Flow zh={zh} />
            ) : null}
          </div>
        </div>

        <div className="chip-row" style={{ marginTop: 16 }}>
          <span className="chip">
            <Icon name="cpu" size={11} />
            {zh ? '沙箱后端：macOS sandbox-exec / Linux bubblewrap→Landlock / Windows 受限令牌' : 'Backends: sandbox-exec / bubblewrap→Landlock / restricted token'}
          </span>
          <span className="chip bad">
            <Icon name="alert" size={11} />
            {zh ? '不是 seccomp，别按 seccomp 的假设写规则' : 'Not seccomp — do not reason from seccomp assumptions'}
          </span>
          <span className="chip warn">
            <Icon name="key" size={11} />
            {zh ? '凭据文件 0600，模型读得到：文档里承认的缺口' : 'Credential file is 0600 yet model-readable: a documented gap'}
          </span>
        </div>
      </div>
    </div>
  )
}

function Flow({ zh }: { zh: boolean }) {
  const steps: Pair[] = [
    { zh: '模型带理由申请 sandbox_permissions', en: 'Model requests sandbox_permissions with a justification' },
    { zh: '界面弹出审批卡片，显示命令原文', en: 'A card appears with the exact command' },
    { zh: '人批准 → 沙箱内执行；只重试一次', en: 'Human approves → confined run; retried once' },
    { zh: '人拒绝 → 回落到只读，继续能做的部分', en: 'Human denies → falls back to read-only, keeps working' },
  ]
  return (
    <ol className="step-list" style={{ marginTop: 14 }}>
      {steps.map((step, index) => (
        <li className="step-item" key={index}>
          <span className="step-num">{index + 1}</span>
          <div>
            <p style={{ paddingTop: 6 }}>{step.zh && step.en ? (zh ? step.zh : step.en) : ''}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
