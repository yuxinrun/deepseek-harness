import { useState } from 'react'
import { CodeBlock } from '../CodeBlock'
import { Icon, type IconName } from '../Icon'
import { useLang } from '../../i18n/LanguageContext'
import type { Pair } from '../../content/types'

type Template = {
  id: string
  icon: IconName
  label: Pair
  desc: Pair
  chapter: string
  code: { lang: string; title: Pair; body: string; note: Pair }[]
}

const ORANGE = 'https://www.huasheng.ai/orange-books/deepseek-harness/read/'

export const templates: Template[] = [
  {
    id: 'install',
    icon: 'terminal',
    label: { zh: '装与首跑', en: 'Install & first run' },
    desc: {
      zh: '先验 Node，再用隔离的 DSH_HOME 试跑一次，别拿真实项目当试验田。',
      en: 'Check Node first, then do one run inside an isolated DSH_HOME instead of testing on a real project.',
    },
    chapter: '/chapter/quickstart',
    code: [
      {
        lang: 'bash',
        title: { zh: '1 · 环境与最小试跑', en: '1 · Environment and minimal run' },
        body: `# 仓库要求 22.19+ 或 24+，但 npm 上的 dsh 包不拦老版本，先自己验
node -v

# 起网页版（0.1.0-rc.8 起自动开浏览器）
npx @deepseek-ai/dsh web

# 不想自动开浏览器
npx @deepseek-ai/dsh web --no-open

# 无界面跑一条任务（CI、脚本、远程机器）
npx @deepseek-ai/dsh --profile headless "你的任务"`,
        note: {
          zh: '试错第一步：把家目录挪开。DSH_HOME=/tmp/dsh-test npx @deepseek-ai/dsh web —— 配置、会话、插件全在这个临时目录里，删掉就当没发生过。',
          en: 'First step of any experiment: move the home directory aside. DSH_HOME=/tmp/dsh-test npx @deepseek-ai/dsh web — config, sessions and plugins all live in that temp folder; delete it and nothing happened.',
        },
      },
      {
        lang: 'bash',
        title: { zh: '2 · 代理与 npx 缓存两个坑', en: '2 · The proxy and npx-cache traps' },
        body: `# 界面上只报 MALFORMED_RESPONSE、绝口不提代理：先在同一个终端清干净
unset http_proxy https_proxy all_proxy HTTP_PROXY HTTPS_PROXY ALL_PROXY
npx @deepseek-ai/dsh web

# npx 按命令原文缓存：写法一变就重下一份，8月作者本机躺了三份约 1GB
du -sh ~/.dsh
ls ~/.npm/_npx/`,
        note: {
          zh: '卸载要两处一起删：~/.dsh 是配置与会话，~/.npm/_npx/ 才是安装包本体。固定同一行命令写法才能一直复用同一份缓存。',
          en: 'Uninstall means two places: ~/.dsh holds config and sessions, ~/.npm/_npx/ holds the package itself. Keep the command string identical and npx keeps reusing one copy.',
        },
      },
    ],
  },
  {
    id: 'config',
    icon: 'scroll',
    label: { zh: '配置与补丁', en: 'Config & patch' },
    desc: {
      zh: '先看出厂树，再做补丁。补丁整段替换，不是逐字段合并。',
      en: 'Read the factory tree before patching. Patches replace whole rows, not fields.',
    },
    chapter: '/chapter/quickstart',
    code: [
      {
        lang: 'bash',
        title: { zh: '三条 dump：出厂 / 我的 / 打上去', en: 'Three dumps: factory / mine / applied' },
        body: `# 导出出厂整棵配置树（不需要密钥，一分钟就有结果）
npx @deepseek-ai/dsh --profile web --dump-default-config > tree.yml

# 导出你当前实际生效的那棵
npx @deepseek-ai/dsh --profile web --dump-config > my.yml

# 用补丁跑一次，不改任何默认文件
npx @deepseek-ai/dsh --profile headless --patch my.yml "任务"`,
        note: {
          zh: '想确认某个键的真实写法，别猜：--dump-config 打出来的那份就是权威答案。改自己那份配置是热生效的、不用重启；改坏了它会保留上一棵能跑的树继续运行，并广播一条配置更新失败。',
          en: 'Do not guess a key name — the output of --dump-config is the authoritative answer. Editing your own config takes effect hot, no restart; a bad edit keeps the last working tree running and broadcasts a config-update failure.',
        },
      },
    ],
  },
  {
    id: 'permission',
    icon: 'shield',
    label: { zh: '权限三件套', en: 'Permission trio' },
    desc: {
      zh: '会话日志开头的三行事件就是权限的正式记账。逐字抄自实测，不是设计稿。',
      en: 'The three events opening a session log are the permission bookkeeping, copied verbatim from a real run.',
    },
    chapter: '/chapter/permissions',
    code: [
      {
        lang: 'json',
        title: { zh: '出厂默认 = 工作区内修改 + 问我', en: 'Factory default = workspace-write + ask' },
        body: `{"type": "permission/preset", "seq": 0, "data": {"preset": "workspace-write"}}
{"type": "sandbox/mode", "seq": 1, "data": {"mode": "workspace-write"}}
{"type": "approval/policy", "seq": 2, "data": {"policy": "ask"}}`,
        note: {
          zh: '8月和10月的同一场番茄钟实测，这三行一模一样。只有这一组是日志里逐字出现过的；read-only/ask 与 danger-full-access/never 是把「沙箱三档」和 ask/never 两个旋钮按书里取值拼出来的意图值，橙皮书没有一段现成日志佐证那种三行组合。',
          en: 'Identical in the Aug and Oct runs of the same tomato-clock session. Only this triple appears verbatim in a log; read-only/ask and danger-full-access/never are intent values assembled from the documented three sandbox tiers and the ask/never switch, with no ready log behind such a triple.',
        },
      },
      {
        lang: 'text',
        title: { zh: '三档怎么选', en: 'How to pick a tier' },
        body: `安全默认      read-only            ask     读代码、分析、写方案，不想它动手
日常（出厂）  workspace-write      ask     只能改你选的目录和系统临时区，别处一律拒绝
可信工作树    danger-full-access   never   你完全知道自己在干什么的时候`,
        note: {
          zh: '改权限只有两条被逐字记录的路：输入框左下角那个选择器（改本场）和设置→通用设置（改新会话默认档）。别把 permission/preset 往 --patch 的 YAML 里贴——那是事件字段名，不是配置键名。',
          en: 'Only two ways to change permissions are recorded verbatim: the selector at the lower-left of the input box (this session) and Settings → General (the new-session default). Never paste permission/preset into a --patch YAML — that is an event field name, not a config key.',
        },
      },
    ],
  },
  {
    id: 'plugin-rows',
    icon: 'puzzle',
    label: { zh: '插件清单行', en: 'Plugin-list rows' },
    desc: {
      zh: 'skill、MCP、主循环、模型适配器是同一种物件，也就同一种删法：一行 disabled: true。',
      en: 'Skills, MCP, the agent loop and the model adapter are the same object type, so they share one switch: disabled: true.',
    },
    chapter: '/chapter/skills-mcp-plugins',
    code: [
      {
        lang: 'yaml',
        title: { zh: 'skill 那一族 + 主循环 + 模型适配器', en: 'The skill family + agent loop + model adapter' },
        body: `- id: skill
  name: '@deepseek-ai/dsh-skill'
- id: skill-filesystem
  name: '@deepseek-ai/dsh-skill-filesystem'
- id: skill-badge
  name: '@deepseek-ai/dsh-skill-badge'
  disabled: true
- id: tool-skill
  name: '@deepseek-ai/dsh-tool-skill'

# 往下翻两百行：主循环和模型适配器跟 skill 同一种物件
- id: agent-loop
  name: '@deepseek-ai/dsh-agent-loop'
- id: llm-deepseek
  name: '@deepseek-ai/dsh-llm-deepseek'`,
        note: {
          zh: 'skill-badge 那行 disabled: true 是书里现成的例子：官方内置的 skill 随包发出去、在默认配置里关着，要用自己打开。补丁整段替换、不逐字段合并，改一个数字得把这行所有字段抄一遍。',
          en: 'The skill-badge line is the book\'s own example: an official built-in skill ships inside the package and stays disabled in the default config — open that line yourself to use it. Patches replace whole rows, so changing one number means copying every field on the line.',
        },
      },
      {
        lang: 'yaml',
        title: { zh: '挂一台 MCP 服务器（一台一行）', en: 'Mount one MCP server (one row each)' },
        body: `- id: mcp-github
  name: '@deepseek-ai/dsh-mcp-client'
  config:
    serverName: github
    transport: stdio
    command: npx
    args: ['-y', '@modelcontextprotocol/server-github']`,
        note: {
          zh: '同一个包装载两次、配置不同就是两台。Claude Code 那种「所有服务器塞进一个大对象」的配置不能整块搬过来，得拆成一行一行。出厂默认一份 MCP 行都没有——包带着，一台不挂。密钥要写在这段配置里：启动子进程前它会把看起来像凭据的环境变量全擦掉。',
          en: 'The same package mounted twice with different config equals two servers. Claude Code\'s "all servers in one big object" shape cannot be lifted whole — split it into rows. The default manifest has zero MCP rows: the client ships installed but mounts nothing. Keys belong inside this config block, because the launcher scrubs credential-looking environment variables before spawning a subprocess.',
        },
      },
    ],
  },
  {
    id: 'plugin-code',
    icon: 'code',
    label: { zh: '最小插件骨架', en: 'Minimal plugin' },
    desc: {
      zh: '官方定义只有一句：一个导出 apply 函数的 TypeScript 模块。That is the complete configuration。',
      en: 'The official definition is one line: a TypeScript module exporting an apply function. That is the complete configuration.',
    },
    chapter: '/chapter/skills-mcp-plugins',
    code: [
      {
        lang: 'ts',
        title: { zh: '官方教程里最小的那个例子', en: 'The smallest example in the official tutorial' },
        body: `import type { Context } from '@deepseek-ai/cordis'

export const name = 'hello-plugin'

export function apply(ctx: Context) {
  // Required dependencies are ready before apply runs.
  console.log('[hello-plugin] plugin loaded!')
}`,
        note: {
          zh: '要发给别人也是三个文件：package.json 声明「我贡献了什么」、一份 YAML 补丁写明「往零件清单插哪几行」、模块本体。装的时候用 npx @deepseek-ai/dsh plugin --profile web add 包名@next —— 结尾的 @next 不能省，省了装到旧版、接口对不上。',
          en: 'Shipping it to someone else is still three files: a package.json declaring what you provide, a YAML patch stating which rows to insert into the manifest, and the module. Install with npx @deepseek-ai/dsh plugin --profile web add name@next — the trailing @next is not optional; drop it and you get an older build whose interfaces do not match.',
        },
      },
      {
        lang: 'bash',
        title: { zh: '装、验、卸', en: 'Install, verify, remove' },
        body: `# 装一个额外的包（@next 不能省）
npx @deepseek-ai/dsh plugin --profile web add @deepseek-ai/dsh-hooks-claude-code@next

# 重启后开新会话，数工具数是否 +1（作者实测：标准 31→32、极简 3→4）
zstd -dc ~/.dsh/sessions/*/session-*/session.v4.jsonl.zstd \\
  | python3 -c "import json,sys; [print(len(d['data']['header']['tools'])) for d in map(json.loads, sys.stdin) if d.get('type')=='request/header']"

# 卸载：插件管理器的 remove_bundle，目标填包名
# remove_bundle -> @local/plugin-count-chinese`,
        note: {
          zh: '判断「装没装上」的标准是重启之后还在不在。改配置文件热生效，改插件包要重启。创造模式在内存里现挂的动态插件连五个不：不建文件、不装包、不改配置、重启不存活、不会被提升为正式插件。',
          en: 'The test for "is it installed" is whether it survives a restart. Config edits are hot; plugin packages need a restart. A dynamic plugin attached in memory by creator mode carries five nots: no file created, no package installed, no config changed, does not survive restart, never promoted to a real plugin.',
        },
      },
    ],
  },
  {
    id: 'forensics',
    icon: 'database',
    label: { zh: '会话日志取证', en: 'Session forensics' },
    desc: {
      zh: '62 种事件只有 5 种模型看得见。想知道你的 agent 真干了什么，读盘上那份。',
      en: 'Of 62 event types only 5 reach the model. To see what your agent actually did, read the on-disk copy.',
    },
    chapter: '/chapter/event-sourcing',
    code: [
      {
        lang: 'bash',
        title: { zh: '定位 → 确认压缩 → 解压读原文', en: 'Locate → confirm compression → decompress' },
        body: `# 位置：目录名是项目路径压平来的，一场会话一个子文件夹
ls ~/.dsh/sessions/

# 确认它真是 zstd 压缩的：魔数应该是 28b5 2ffd。它是压缩、不是加密
xxd -l 16 ~/.dsh/sessions/*/session-*/session.v4.jsonl.zstd

# 看日志原文
zstd -dc ~/.dsh/sessions/*/session-*/session.v4.jsonl.zstd | head

# 系统提示词全文（同一场日志里的另一类记录）
zstd -dc ~/.dsh/sessions/*/session-*/session.v4.jsonl.zstd \\
  | python3 -c "import json,sys; [print(d['data']) for d in map(json.loads, sys.stdin) if d.get('type')=='system/message']"`,
        note: {
          zh: '路径里的星号会卷进所有会话，只想看一场就换成那个目录名。8月的文件叫 session.jsonl.zstd（不带 .v4），老文件会迁移成新版本另存、原文件保留，同一场会话可能躺着两代文件。产品明确不引入保留期策略，删除只能手动删目录；日志只追加不改写，能从硬盘删掉整个文件夹，没法精确抹掉某一句。',
          en: 'The asterisk pulls in every session; name one directory to read a single run. The Aug file is session.jsonl.zstd (no .v4), and old files are migrated to a new version saved alongside the original, so one session may sit in two on-disk generations. The product ships no retention policy — deleting means deleting the directory by hand; the log is append-only, so you can remove the folder but cannot surgically erase one sentence.',
        },
      },
    ],
  },
]

export function ToolkitCenter() {
  const { zh } = useLang()
  const [active, setActive] = useState(templates[0].id)
  const current = templates.find((item) => item.id === active) ?? templates[0]

  return (
    <div className="lab-shell">
      <div className="lab-head">
        <span className="lab-icon" style={{ background: 'linear-gradient(135deg, var(--orange), #ea580c)' }}>
          <Icon name="wrench" size={19} />
        </span>
        <div>
          <h3>{zh ? '六个一键复制模板' : 'Six copy-ready templates'}</h3>
          <p>
            {zh
              ? '每一段都来自橙皮书里逐字记录过的命令行、日志或 YAML。可以直接贴进你的终端和补丁，每一行后面都写了为什么这么写。'
              : 'Every block below is transcribed from a command line, log or YAML recorded verbatim in the orange book. Paste it into your terminal or patch; each block says why it is written that way.'}
          </p>
        </div>
      </div>
      <div className="lab-body">
        <div className="tool-tabs" role="tablist" aria-label={zh ? '模板选择' : 'Choose a template'}>
          {templates.map((item) => (
            <button
              key={item.id}
              role="tab"
              type="button"
              aria-selected={item.id === active}
              className={`tool-tab ${item.id === active ? 'is-active' : ''}`}
              onClick={() => setActive(item.id)}
            >
              <Icon name={item.icon} size={12} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 5 }} />
              {zh ? item.label.zh : item.label.en}
            </button>
          ))}
        </div>

        <p className="tpl-desc">{zh ? current.desc.zh : current.desc.en}</p>

        <div className="tpl-stack">
          {current.code.map((block) => (
            <CodeBlock
              key={block.title.en}
              code={block.body}
              lang={block.lang}
              title={zh ? block.title.zh : block.title.en}
              note={zh ? block.note.zh : block.note.en}
            />
          ))}
        </div>

        <div className="chip-row" style={{ marginTop: 16 }}>
          <a className="chip" href={`${import.meta.env.BASE_URL}#${current.chapter}`}>
            {zh ? '看这一章的完整推导' : 'See the full derivation'}
            <Icon name="arrowUpRight" size={10} />
          </a>
          <a className="chip" href={ORANGE} target="_blank" rel="noreferrer noopener">
            {zh ? '花叔橙皮书原文' : 'Orange book source'}
            <Icon name="external" size={10} />
          </a>
        </div>
      </div>
    </div>
  )
}
