import type { Chapter } from '../types'

export const playbookChapters: Chapter[] = [
  {
    slug: 'commands',
    num: '16',
    part: 'playbook',
    icon: 'terminal',
    level: 'reference',
    minutes: 10,
    accent: 'orange',
    title: {
      zh: '命令、快捷键与日志速查',
      en: 'Commands, Shortcuts and Log Reference',
    },
    subtitle: {
      zh: '每一条命令都在本机敲过；抄下来直接跑，跑不通拿取数命令回来抽查。',
      en: 'Every command here was actually typed on a real machine. Copy it, run it, and verify with the same probes.',
    },
    promise: {
      zh: '读完你能独立敲出安装、导出、卸载和翻日志的每一条命令，并判断一个故障该翻哪一章。',
      en: 'You will be able to run install, export, and log-forensics commands yourself, and route any failure to the right chapter.',
    },
    sections: [
      {
        id: 'cli-surface',
        title: { zh: '命令行接口：装、跑、导出、装包', en: 'CLI Surface: Install, Run, Export, Add Packages' },
        blocks: [
          {
            type: 'p',
            zh: '8月它只有一条路：先装 Node.js，再在终端敲一行 npx。0.2版官网 deepseek.com/harness 另给了桌面安装包（macOS 约 265MB、Windows 约 289MB，10月17日更新，官网要求 macOS 13 以上、Intel Mac 暂不支持）。本章所有实测都走 npx 那条路。',
            en: 'In Aug there was one path only: install Node.js, then type a single npx line in a terminal. From 0.2 the site deepseek.com/harness also offers desktop installers (macOS about 265MB, Windows about 289MB, updated Oct 17; the site requires macOS 13+ and does not yet support Intel Macs). Every measurement in this chapter uses the npx path.',
            source: { label: 'DeepSeek 官方文档 / DeepSeek Docs', href: 'https://api-docs.deepseek.com/' },
          },
          {
            type: 'p',
            zh: '官方那句「在已安装 Node.js 开发工具链的系统中，可用 npx 快速启动」一句话塞了三个坎。README 只说装 Node.js，不写版本；仓库根目录要求 22.19 以上或 24 以上，但发到 npm 的 dsh 包不带这个门槛，安装器不会拦一个太老的版本。先验一下：',
            en: 'The official line "with a Node.js toolchain installed you can start fast via npx" packs three traps into one sentence. The README says only "install Node.js", no version; the repo root requires 22.19+ or 24+, but the dsh package published to npm carries no such gate, so the installer will not stop a too-old version. Check first:',
          },
          {
            type: 'code',
            lang: 'bash',
            title: '确认有没有 Node',
            code: `node -v
# 回你 v 开头的版本号就是有；回你 command not found，去下面这页下安装包
# If it prints a v-number you are good; "command not found" means grab an installer here
# https://nodejs.org/en/download`,
          },
          {
            type: 'code',
            lang: 'bash',
            title: '装并起网页版（第一次要下两三百MB、解出八百多MB，没有进度条）',
            code: `# 起网页版；0.1.0-rc.8 起会自动打开浏览器
npx @deepseek-ai/dsh web

# 不想它弹浏览器（10月实测），固定端口再加 --port 3095
npx @deepseek-ai/dsh web --no-open

# 一次性跑完就退：本书大部分实测走这条，它没有斜杠命令、也没有审批弹窗
npx @deepseek-ai/dsh --profile headless "你的任务"

# 换个家目录跑、不碰已有会话：试错前先做这一步，所有数据落到这个新家
DSH_HOME=/tmp/dsh-test npx @deepseek-ai/dsh web`,
            note: {
              zh: '清空 npm 缓存后计时的首次启动约 2 分 45 秒，前两分半只有一个转圈符号，没有百分比、没有大小。别以为它卡了，它在下。',
              en: 'A first run on an emptied npm cache took about 2 minutes 45 seconds; for the first two and a half minutes there was only a spinner, no percentage or size. It is downloading, not hung.',
            },
            source: { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '国内开着代理软件，启动前先清环境变量', en: 'Behind a Proxy in China: Clear the Variables First' },
            zh: '开着代理时，界面只报 `MALFORMED_RESPONSE`、完全不提代理——请求两秒内服务端回了成功，读到的流格式不对才报的错，代理为什么弄坏流没人查。启动前在同一个终端里清掉：`unset http_proxy https_proxy all_proxy HTTP_PROXY HTTPS_PROXY ALL_PROXY`，再敲 npx 那条。10月实测，同一个任务清完一次就过。',
            en: 'With a proxy running, the UI only shows `MALFORMED_RESPONSE` and never mentions the proxy — the request returns success within two seconds, then the stream is malformed and that is the error; nobody checked why the proxy broke the flow. Before launching, clear them in the same terminal: `unset http_proxy https_proxy all_proxy HTTP_PROXY HTTPS_PROXY ALL_PROXY`, then run the npx line. Tested in Oct: after clearing, the same task passed on the first try.',
            source: { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'p',
            zh: '`npx` 按命令原文缓存：写法不同（加不加 `@latest`、加不加版本号）就各存一份一模一样的安装包，8月作者本机躺了三份合计约 1GB。想每次用同一份，就固定同一行命令；想卸干净，光删 `~/.dsh` 不够，`~/.npm/_npx/` 里那几份也得删。',
            en: '`npx` caches by the exact command string: different spellings (with or without `@latest`, with or without a version) each store an identical copy of the package — the author had three copies totaling about 1GB in Aug. To reuse one copy, always type the same line; to fully remove, deleting `~/.dsh` is not enough, you must also clear the copies under `~/.npm/_npx/`.',
          },
          {
            type: 'code',
            lang: 'bash',
            title: '导出配置树 + 查磁盘占用',
            code: `# 导出出厂整棵配置树（无需密钥，一分钟就有结果）：出厂长什么样看这个
npx @deepseek-ai/dsh --profile web --dump-default-config > tree.yml

# 你自己改过之后长什么样：把 --dump-default-config 换成 --dump-config
npx @deepseek-ai/dsh --profile web --dump-config > my.yml

# 临时挂一段自己的配置：装了包不等于挂上了，绝大多数额外的包都得靠这一步
npx @deepseek-ai/dsh --profile headless --patch my.yml "任务"

# 算它占了多少磁盘：大头从来不在 ~/.dsh，用不同写法起过它缓存就有好几份
du -sh ~/.dsh
du -sh ~/.npm/_npx/*/node_modules`,
            note: {
              zh: '10月 `--profile web --dump-default-config` 打出 1,229 行 YAML、骨架 190 行插件、23 行停用、24 处出处标记；8月是 490 行、129 行骨架、25 行停用。',
              en: 'In Oct `--profile web --dump-default-config` emits 1,229 YAML lines with a 190-line plugin skeleton, 23 disabled lines, and 24 provenance markers; Aug was 490 lines, a 129-line skeleton, 25 disabled.',
            },
            source: { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'code',
            lang: 'bash',
            title: 'dsh plugin：它是 pnpm 的转发器',
            code: `# 装一个额外的包：结尾的 @next 不能省，省了会装到旧版、接口对不上（10月仍然如此）
npx @deepseek-ai/dsh plugin --profile web add @deepseek-ai/dsh-hooks-claude-code@next

# 验某个包的版本标签：上一条的坑就靠它验
npm view @deepseek-ai/dsh-base dist-tags --json

# 判断一个包到底发没发布：自己打接口，看返回 200 还是 404
curl -s -o /dev/null -w "%{http_code}" https://registry.npmjs.org/@deepseek-ai/dsh-lsp
# 200`,
            note: {
              zh: '官方参考手册直说：`dsh plugin` 基本只是 pnpm 的转发器——配置目录不存在时先建一个，把参数原样转给 pnpm，工作目录切过去。所以 add / remove / update 这些动词全都原样可用，从 npm、Git、本地目录、压缩包都能装。8月没做插件市场，直接借了整个 npm 生态。',
              en: 'The reference manual says it plainly: `dsh plugin` is essentially a pnpm forwarder — it creates the config directory if missing, forwards your arguments verbatim to pnpm, and switches the working directory there. So the verbs add / remove / update all work as-is, and you can install from npm, Git, a local directory, or an archive. In Aug there was no plugin marketplace; they borrowed the whole npm ecosystem.',
            },
          },
          {
            type: 'table',
            head: [
              { zh: '你想干什么', en: 'What you want to do' },
              { zh: '敲什么', en: 'What to type' },
              { zh: '注意', en: 'Watch out' },
            ],
            rows: [
              [
                { zh: '装并起网页版', en: 'Install and launch the web app' },
                { zh: '`npx @deepseek-ai/dsh web`', en: '`npx @deepseek-ai/dsh web`' },
                { zh: '首次下两三百MB、解出八百多MB，无进度条', en: 'First run downloads 200–300MB, unpacks 800+MB, no progress bar' },
              ],
              [
                { zh: '换一套运行形态', en: 'Switch the run profile' },
                { zh: '`--profile web` / `--profile headless`', en: '`--profile web` / `--profile headless`' },
                { zh: '四选一的模式菜单只在网页版里存在，无界面模式直接按标准那份走', en: 'The four-way mode menu only exists in the web app; headless always runs the standard preset' },
              ],
              [
                { zh: '导出/查看配置树', en: 'Export or inspect the config tree' },
                { zh: '`--dump-default-config` / `--dump-config`', en: '`--dump-default-config` / `--dump-config`' },
                { zh: '前者是出厂、后者含你改过的', en: 'The former is factory default, the latter includes your edits' },
              ],
              [
                { zh: '装不在默认闭包里的包', en: 'Install a package outside the default closure' },
                { zh: '`npx @deepseek-ai/dsh plugin ... add 包名@next`', en: '`npx @deepseek-ai/dsh plugin ... add name@next`' },
                { zh: '`@next` 后缀不能省；装了还要用 `--patch` 挂上', en: 'The `@next` suffix is mandatory; after install you still mount it via `--patch`' },
              ],
              [
                { zh: '`dsh config set ...`', en: '`dsh config set ...`' },
                { zh: '（橙皮书未给出这条命令）', en: '(not documented in the orange book)' },
                { zh: '书里改配置只有两条路：`--patch` 的插件行补丁 + 设置→通用设置里的选择器；没有 `dsh config set` 这种按 key 写的命令被记录在案，别照抄', en: 'The book documents only two config paths: the plugin-row patch via `--patch`, and the selector under Settings → General. No key-style `dsh config set` command is on record — do not copy-paste it' },
              ],
            ],
            note: {
              zh: '仓库有 219 个包、默认只装 184 个，差的 35 个（8月）全在 npm 上、要单独敲一条；到10月按仓库算不在默认安装里的官方包涨到 48 个。',
              en: 'The repo has 219 packages but the default install pulls only 184; the missing 35 (Aug) are all on npm and need a separate command — by Oct the count of official packages outside the default closure had grown to 48.',
            },
            source: { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'checklist',
            title: { zh: '敲下第一行 npx 之前', en: 'Before You Type the First npx Line' },
            items: [
              { zh: '先跑 `node -v`：README 不写版本，仓库要求 22.19+ 或 24+，但发到 npm 的 dsh 包不带这个门槛、安装器不拦太老的版本', en: 'Run `node -v` first: the README omits the version, the repo requires 22.19+ or 24+, but the dsh package on npm carries no gate and the installer will not stop an old version' },
              { zh: '定好你要用的那一行 npx 命令并固定它——写法一变 npx 就重下一份，8月作者本机躺了三份合计约 1GB', en: 'Pick one exact npx line and reuse it — change the spelling and npx fetches a fresh copy; the author had three copies (~1GB) in Aug' },
              { zh: '国内开着代理：在同一个终端里 `unset` 掉那六个代理变量再启动', en: 'Behind a proxy in China: unset those six proxy variables in the same terminal before launching' },
              { zh: '试错前先设 `DSH_HOME=/tmp/dsh-test` 隔离，别碰平时的配置和会话', en: 'Before experimenting, set `DSH_HOME=/tmp/dsh-test` to isolate so your normal config and sessions stay untouched' },
              { zh: '确认密钥文件权限是 0600（仅自己可读），否则整个进程根本起不来——报错里会把 chmod 那条原样给你', en: 'Confirm the credential file is 0600 (owner-read-only), or the process refuses to start at all — the error prints the chmod fix verbatim' },
            ],
          },
        ],
      },
      {
        id: 'slash-commands',
        title: { zh: '会话内斜杠命令：什么时候伸手', en: 'In-Session Slash Commands: When to Reach for Them' },
        blocks: [
          {
            type: 'p',
            zh: '这些命令只在网页版会话里有；无界面模式没有斜杠命令。8月产品一共 6 条、全是插件注册的，想加一条得写代码；10月源码里还能看到 `/new`、`/clear`、`/model`、`/rename`，但用户可见的完整清单作者没逐条点。自定义斜杠命令至今不支持。下表只列橙皮书逐字对照过的那几条。',
            en: 'These exist only in a web-app session; headless mode has no slash commands. In Aug there were 6 in total, all registered by plugins, and adding one meant writing code; in Oct the source still shows `/new`, `/clear`, `/model`, `/rename`, but the user-visible full list was never clicked through. Custom slash commands are still unsupported. The table lists only those the orange book compared verbatim.',
          },
          {
            type: 'table',
            head: [
              { zh: '命令', en: 'Command' },
              { zh: '它做什么', en: 'What it does' },
              { zh: '什么时候伸手', en: 'When to reach for it' },
              { zh: '代价', en: 'What it costs' },
            ],
            rows: [
              [
                { zh: '`/compact`', en: '`/compact`' },
                { zh: '调一次模型把旧对话缩成摘要；原文一条不少留在日志原位，只是从「模型可见那一面」被遮住', en: 'Calls the model once to fold old turns into a summary; the originals stay intact in the log, merely hidden from the model-visible face' },
                { zh: '上下文占用（小圆环）顶到快满、准备收尾时', en: 'When the context ring is nearly full and you are wrapping up' },
                { zh: '一次模型调用，要花钱；和 Claude Code 对得上', en: 'One model call, so it costs money; maps directly to Claude Code' },
              ],
              [
                { zh: '`/plan`', en: '`/plan`' },
                { zh: '把「计划模式」做成了一条命令（Claude Code 那边是用快捷键切档）', en: 'Turns "plan mode" into a command (Claude Code toggles it with a shortcut)' },
                { zh: '想让它先出施工图、你点头才开工时', en: 'When you want a blueprint before any work starts' },
                { zh: '工具清单一个字不变，只在提示里加一句「现在别用」——它拦不住东西，硬限制来自沙箱和审批', en: 'The tool list is unchanged, only a "hold off" line is added to the prompt — it stops nothing; hard limits come from the sandbox and approval policy' },
              ],
              [
                { zh: '`/export`', en: '`/export`' },
                { zh: '导出这场会话', en: 'Export this session' },
                { zh: '要留档、要转给别人复现出错现场时', en: 'To archive, or hand a failure scene to someone else to reproduce' },
                { zh: '只有网页版有', en: 'Web app only' },
              ],
              [
                { zh: '`/permission`', en: '`/permission`' },
                { zh: '改权限档位；单数、只能三选一', en: 'Change the permission tier; singular form, three-way choice only' },
                { zh: '本场会话临时想升或降权限时', en: 'To raise or lower rights for this session' },
                { zh: '对应 Claude Code 的 `/permissions`（复数、逐条名单）——概念对不上，见搬家那章', en: 'Loosely maps to Claude Code `/permissions` (plural, per-rule list) — the concepts do not align, see the migration chapter' },
              ],
              [
                { zh: '`/goal`', en: '`/goal`' },
                { zh: 'DSH 独有：立一件长期的事，有编号、有版本、改它要你批；四相位进行中/暂停/卡住/完成', en: 'DSH-only: file a long-lived item with an id and version, edits need your approval; four states active / paused / blocked / done' },
                { zh: '想让它自己盯一件比一次对话长的活时', en: 'When you want it to keep watching a job longer than one conversation' },
                { zh: '重开一个会话它自己不会开始干活——「激活」开关故意不写进持久记录', en: 'Reopening a session never auto-resumes work — the "activate" switch is deliberately kept out of the persisted record' },
              ],
              [
                { zh: '`/feedback`', en: '`/feedback`' },
                { zh: 'DSH 独有：0.1.5 版起产品里多了它，能直接从会话提交反馈', en: 'DSH-only: added in 0.1.5 so you can file feedback straight from a session' },
                { zh: '撞上问题、想原地报上去时', en: 'When you hit a problem and want to report it in place' },
                { zh: '仓库首页问题单是关着的，所有反馈全导去讨论区（10月讨论区累计一万多条）', en: 'Issues are disabled upstream; all feedback is routed to the discussion board (10k+ threads by Oct)' },
              ],
            ],
            source: { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'p',
            zh: '`/compact` 的账在[第 6 章](/chapter/cost)：它调一次模型，把被遮住的整段历史按当前价再算一遍，是三个省地方的手段里最贵的一层（外溢免费、裁剪免费、压缩要钱）。真想看它到底省没省，去[成本计算器](/lab?tab=cost)。',
            en: '`/compact`\'s bill is detailed in [Chapter 6](/chapter/cost): it calls the model once and re-charges the whole hidden span at the current price, making it the priciest of the three space-saving layers (spill is free, pruning is free, compaction costs money). To see whether it actually saved anything, open the [cost calculator](/lab?tab=cost).',
          },
        ],
      },
      {
        id: 'log-forensics',
        title: { zh: '会话日志取证：位置、解压、谁看得见', en: 'Session-Log Forensics: Location, Decompression, Visibility' },
        blocks: [
          {
            type: 'p',
            zh: '会话日志的盘上位置是 `~/.dsh/sessions/<工作区>/session-*/session.v4.jsonl.zstd`。目录名是项目路径压平来的，中文会转成码点；一场会话一个子文件夹，里面一个压缩过的 `session.v4.jsonl.zstd`（8月叫 `session.jsonl.zstd`，老文件会被迁移成新版本另存、原文件保留，所以同一场会话可能躺着两代文件）。',
            en: 'Logs live at `~/.dsh/sessions/<workspace>/session-*/session.v4.jsonl.zstd`. The directory name is the project path flattened, with Chinese turned into code points; one session per subfolder, each holding a compressed `session.v4.jsonl.zstd` (in Aug it was `session.jsonl.zstd`; old files are migrated to a new version saved alongside, so one session may sit in two on-disk generations).',
          },
          {
            type: 'code',
            lang: 'bash',
            title: '先确认它是压缩的、再解压来读',
            code: `# 找会话存在哪
ls ~/.dsh/sessions/

# 确认它真是 zstd 压缩过的：魔数应该是 28b5 2ffd。它不是加密，一行命令就能解开
xxd -l 16 ~/.dsh/sessions/*/session-*/session.v4.jsonl.zstd
# 28b5 2ffd ...

# 看会话日志原文
zstd -dc ~/.dsh/sessions/*/session-*/session.v4.jsonl.zstd | head

# 数模型手里有几件工具（从发给模型那个信封的 request/header 里数）
zstd -dc ~/.dsh/sessions/*/session-*/session.v4.jsonl.zstd | python3 -c "import json,sys; [print(len(d['data']['header']['tools'])) for d in map(json.loads, sys.stdin) if d.get('type')=='request/header']"`,
            note: {
              zh: '路径里的星号会把所有会话卷进来，只想看一场就把它换成那一场的目录名。10月番茄钟那一场这条打出 31，8月不带 `.v4` 的文件打出 25。系统提示词全文在同一场日志一条 `system/message` 记录里，把 `type` 换掉就能打出来。',
              en: 'The asterisk in the path pulls in every session; to read one, replace it with that session\'s directory name. In Oct the tomato-clock session printed 31, and the Aug file without `.v4` printed 25. The full system prompt is in a `system/message` record of the same log — swap the `type` to dump it.',
            },
            source: { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'steps',
            items: [
              {
                title: { zh: '找到会话文件', en: 'Locate the session file' },
                desc: { zh: '`ls ~/.dsh/sessions/`：目录名是项目路径压平来的，一场会话一个子文件夹，里面一个 `session.v4.jsonl.zstd`', en: '`ls ~/.dsh/sessions/`: directory names are flattened project paths, one subfolder per session, each with a `session.v4.jsonl.zstd`' },
              },
              {
                title: { zh: '确认它真是压缩的', en: 'Confirm it is really compressed' },
                desc: { zh: '`xxd -l 16` 应该看到魔数 `28b5 2ffd`——它是压缩、不是加密，一行命令就能解开', en: '`xxd -l 16` should show the magic `28b5 2ffd` — it is compressed, not encrypted, one command opens it' },
              },
              {
                title: { zh: '数模型手里有几件工具', en: 'Count the tools the model holds' },
                desc: { zh: '`zstd -dc ... | python3 ... request/header` 打出 31（8月不带 `.v4` 是 25）；把 `type` 换成 `system/message` 就能打出系统提示词全文', en: '`zstd -dc ... | python3 ... request/header` prints 31 (25 in Aug, no `.v4`); swap `type` to `system/message` to dump the full system prompt' },
              },
            ],
            source: { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'table',
            head: [
              { zh: '怎么区分', en: 'How to tell them apart' },
              { zh: '10月现值', en: 'Oct snapshot' },
              { zh: '8月原值', en: 'Aug snapshot' },
            ],
            rows: [
              [
                { zh: '事件类型总数 / 模型看得见的种数', en: 'Total event types / types visible to the model' },
                { zh: '62 种 / 5 种（多出的两种是系统消息、开发者消息）', en: '62 kinds / 5 visible (the two extras are system and developer messages)' },
                { zh: '44 种 / 3 种（只有你说了什么、它说了什么、工具返回了什么）', en: '44 kinds / 3 visible (only what you said, what it said, what a tool returned)' },
              ],
              [
                { zh: '审批、沙箱模式、权限变更这些', en: 'Approval, sandbox mode, permission changes' },
                { zh: '只进日志、不进模型的眼睛；翻日志就有「上周那次到底在什么权限下改的这个文件」的答案', en: 'Logged only, never in the model\'s eyes; the log answers "under what rights did it edit that file last week"' },
                { zh: '同上', en: 'Same as left' },
              ],
              [
                { zh: '番茄钟那一场（17步、一个 573 行的文件）', en: 'The tomato-clock session (17 steps, one 573-line file)' },
                { zh: '165 行、出现 22 种事件类型；多出「工作区改动」「会话日志上传已被接收」这类', en: '165 lines, 22 event types present; extras include "workspace change" and "session-log upload accepted"' },
                { zh: '一句「有哪些文件」落 44 行，模型只看得见 6 行（三条 user/message、两条 assistant/message、一条 tool/result）', en: 'One "what files are here" line wrote 44 rows; the model saw only 6 (three user/message, two assistant/message, one tool/result)' },
              ],
              [
                { zh: '取数命令', en: 'How to pull the numbers' },
                { zh: '官方事件目录 `docs/persistence-catalog.md`；`grep -cE \'^#### \'` 数的时候注意有 24 个三级标题是命名空间不是事件', en: 'Official catalog `docs/persistence-catalog.md`; when counting with `grep -cE \'^#### \'` remember 24 of the level-3 headings are namespaces, not events' },
                { zh: '同上（8月口径）', en: 'Same method (Aug)' },
              ],
            ],
            note: {
              zh: '「行数」不是「事件数」：8月那 44 行里打包行每行装好几条碎片，事件编号一路排到 125。0.2 版取消了单独的碎片行，逐字流连同时间间隔嵌进每条助手消息里。',
              en: '"Lines" are not "events": in the Aug 44 lines, packed rows each held several fragments, so event sequence numbers climbed to 125. From 0.2 there are no separate fragment lines — the verbatim stream, with time gaps, is embedded inside each assistant message.',
            },
            source: { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'callout',
            tone: 'note',
            title: { zh: '外溢(spill)阈值：50,000 字节', en: 'The Spill Threshold: 50,000 bytes' },
            zh: '单条工具结果太大就当场存成文件，模型只看到摘要和路径、想要还能取回。作者实测：造一个 171,000 字节的文件让它 `cat`，截断当场发生，结果里两行提示——一行说完整输出在哪个临时文件，一行说被省略了 14,385 字节、完整结果存在哪、可用 read 或 grep 去查。倒推回去，剩下的内容正好压在 50,000 字节上限以内，一字节不差。外溢出来的文件不在 `~/.dsh/` 里，在系统临时目录下面，每跑一次新建一个、不回收——清干净时别只盯着 `~/.dsh`。',
            en: 'When a single tool result is too large it is written to a file on the spot; the model sees only a summary and a path, and can still fetch the whole thing back. The author\'s test: a 171,000-byte file `cat`\'d triggered truncation immediately — the result carried two lines, one pointing to the temp file holding the full output, one saying 14,385 bytes were omitted, where the complete result is stored, and that read or grep can retrieve it. Back-calculating, the retained content sits exactly within the 50,000-byte ceiling, byte for byte. Spill files are not under `~/.dsh/` but in the system temp directory, and every run creates a new one without reclaiming them — when cleaning, do not only look at `~/.dsh`.',
            source: { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'p',
            zh: '删除会话：从 0.1.7 起归档能筛选、能恢复，但作者没找到界面上的「删除」入口（右键不出菜单、会话旁的「…」没点）。想真删，只能去 `~/.dsh/sessions/` 里手动删目录。日志只追加、不改写，你说过的每句话都留在硬盘上，能整个删文件夹，但没法从一段对话里精确抹掉某一句。',
            en: 'Deleting a session: from 0.1.7 archives can be filtered and restored, but the author never found a "delete" entry in the UI (right-click shows no menu, the "…" beside a session was never clicked). To truly delete, remove the directory by hand under `~/.dsh/sessions/`. The log is append-only, never rewritten — every sentence you said stays on disk; you can delete the whole folder, but you cannot surgically erase one sentence from a conversation.',
          },
        ],
      },
      {
        id: 'shortcuts-ui',
        title: { zh: '快捷键与界面入口：开关都在哪', en: 'Shortcuts and UI Entry Points: Where Each Switch Lives' },
        blocks: [
          {
            type: 'p',
            zh: '橙皮书没有一张集中的键盘快捷键表——这一节只写它在附录和各章里逐字提到的界面入口，其余标「未记录」。',
            en: 'The orange book has no single consolidated keyboard-shortcut table — this section lists only the UI entry points it names verbatim in the appendix and each chapter, and marks everything else as not documented.',
          },
          {
            type: 'table',
            head: [
              { zh: '界面入口', en: 'UI entry point' },
              { zh: '在哪', en: 'Where it lives' },
              { zh: '说明', en: 'Notes' },
            ],
            rows: [
              [
                { zh: '模式选择器（四选一）', en: 'Mode selector (four-way)' },
                { zh: '新会话输入框上方，「默认工作区」旁边', en: 'Above the new-session input, next to "Default workspace"' },
                { zh: '只在空白会话时可切换；第一句话发出后只剩一个灰色标签、点它没反应，想换开一场新会话', en: 'Switchable only while the session is blank; after the first line it is a gray label that does nothing — open a new session to change' },
              ],
              [
                { zh: '自动化任务（定时任务）', en: 'Automated tasks (scheduling)' },
                { zh: '10月左边栏一级入口', en: 'A first-level item in the left sidebar in Oct' },
                { zh: '8月出厂零命中、要自己加八行接线；10月标准模式里有四件定时任务工具（建/删/列/改），最短每分钟一次', en: 'Aug shipped at zero hits and needed eight lines of wiring; Oct\'s standard mode has four schedule tools (create/delete/list/edit), down to once a minute' },
              ],
              [
                { zh: '权限档位', en: 'Permission tier' },
                { zh: '输入框左下角的选择器；设置→通用设置改的是新会话默认档', en: 'The selector at the lower-left of the input; Settings → General changes the default for new sessions' },
                { zh: '两个独立旋钮被打包成一个选择器：文件沙箱三档 + 一个「问不问」开关', en: 'Two independent dials are bundled into one selector: a three-tier file sandbox plus an ask-or-not switch' },
              ],
              [
                { zh: '上传 Session Log（会话日志上传）', en: 'Upload session log' },
                { zh: '设置→通用设置', en: 'Settings → General' },
                { zh: '10月默认开（8月遥测默认关）；10月清单里第 8 行是 session-log-deepseek 这个零件', en: 'On by default in Oct (telemetry was off by default in Aug); line 8 of the Oct manifest is the session-log-deepseek part' },
              ],
              [
                { zh: 'Agent 预设页', en: 'Agent presets page' },
                { zh: '设置→Agent 预设', en: 'Settings → Agent presets' },
                { zh: '四段模式各自的说明和用法（内部代号 standard/ptc/minimal/cordis）；最底下一行「自定义：让Agent帮我创建预设模式」是造第五个模式的入口', en: 'Each of the four modes shows its description and usage (internal codes standard/ptc/minimal/cordis); the bottom line "Custom: let the agent create a preset" is the entry to build a fifth mode' },
              ],
              [
                { zh: '插件页', en: 'Plugin page' },
                { zh: '左边栏「插件」；设置页右上角「打开配置文件」', en: 'Sidebar "Plugins"; the "Open config file" button at the top-right of Settings' },
                { zh: '能点着改的只有 4 张卡（子智能体、网页搜索、Agent 循环、终端）+ 4 个实验性开关；190 行里的绝大多数只能改配置文件', en: 'Only 4 cards are clickable (subagents, web search, agent loop, terminal) plus 4 experimental toggles; most of the 190 lines are config-file only' },
              ],
              [
                { zh: '键盘快捷键（集中表）', en: 'Keyboard shortcuts (central list)' },
                { zh: '未记录', en: 'Not documented' },
                { zh: '橙皮书没给出成体系的快捷键清单，别自己编；已知的是 Claude Code 那边用快捷键切计划模式，DSH 把它做成了 `/plan`', en: 'The orange book gives no systematic shortcut list — do not invent one; what is known is that Claude Code toggles plan mode with a shortcut while DSH turned it into `/plan`' },
              ],
            ],
            source: { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'callout',
            tone: 'tip',
            title: { zh: '「显示代码工作视图」这一个开关管着三样东西', en: 'One Switch, "Show Code Work View", Gates Three Things' },
            zh: '出厂开着。它开着时，模式选择器才给完整的四个模式、才有「轨迹」页和代码差异视图；关掉后选择器变成什么样作者没截对比图。轨迹页长得像浏览器开发者工具的网络面板：一行一条记录、粗线分轮次、顶部时间轴按真实起止画，助手条还切成等待和吐字两段。',
            en: 'On by default. While it is on, the mode selector shows the full four modes and the Trajectory page and code-diff view appear; the author never captured what the selector looks like when off. The Trajectory page resembles a browser devtools network panel: one row per record, thick lines separating turns, a top timeline drawn from real start/end, and the assistant bar split into a waiting segment and a streaming segment.',
          },
        ],
      },
      {
        id: 'env-vars',
        title: { zh: '环境变量：书里点到名的三个', en: 'Environment Variables: The Three It Names' },
        blocks: [
          {
            type: 'table',
            head: [
              { zh: '变量', en: 'Variable' },
              { zh: '它管什么', en: 'What it controls' },
              { zh: '10月是否核实', en: 'Verified in Oct?' },
            ],
            rows: [
              [
                { zh: '`DSH_HOME`', en: '`DSH_HOME`' },
                { zh: '把整个家目录（配置、凭据、会话数据）指到别处；`$DSH_HOME/AGENTS.md` 是全局规则第一读取位', en: 'Redirects the whole home directory (config, credentials, session data); `$DSH_HOME/AGENTS.md` is the first global-rules read path' },
                { zh: '已核实：10月实测都在隔离的 `DSH_HOME` 里做的，`DSH_HOME=/tmp/dsh-test npx ...` 是书里推荐的试错第一步', en: 'Verified: Oct measurements were all taken inside an isolated `DSH_HOME`, and `DSH_HOME=/tmp/dsh-test npx ...` is the book\'s recommended first step before experimenting' },
              ],
              [
                { zh: '`DSH_AGENTS_HOME`', en: '`DSH_AGENTS_HOME`' },
                { zh: '改全局规则文件的位置；0.2.1-rc.1 起先读 `$DSH_HOME/AGENTS.md`，再读 `~/.agents/AGENTS.md`', en: 'Moves the global-rules location; from 0.2.1-rc.1 it reads `$DSH_HOME/AGENTS.md` first, then `~/.agents/AGENTS.md`' },
                { zh: '已核实（属 0.2 版起的特性）', en: 'Verified (a feature from 0.2 onward)' },
              ],
              [
                { zh: '`DSH_WEB_URL` / `DSH_WEB_MODE`', en: '`DSH_WEB_URL` / `DSH_WEB_MODE`' },
                { zh: '把当前网址和运行模式做成模型能看见、也能用命令查到的东西', en: 'Expose the current URL and run mode so the model can see and query them' },
                { zh: '未核实：作者原话「10月的系统提示词改成了从运行时上下文里读网址，这两个变量还在不在我没查」——这是 8月的一条修复，10月存废未知', en: 'Not verified: the author\'s own words — "Oct moved URL reading into the runtime context, and I did not check whether these two variables still exist". This was an Aug fix; its Oct status is unknown' },
              ],
            ],
            note: {
              zh: '还有一个坑不在上面：密钥文件的权限必须是仅自己可读（0600），否则整个进程根本起不来——好在报错里会把 chmod 那条修复命令原样给你，照抄即可。缺密钥、密钥里混进换行、密钥无效，这三种报错并不一样，别一律当成「没配上」。',
              en: 'One trap the table does not cover: the credential file must be readable only by its owner (0600), or the whole process refuses to start — fortunately the error prints the exact chmod fix, so copy it verbatim. Missing key, key with an embedded newline, and invalid key all throw different errors; do not lump them together as "not configured".',
            },
            source: { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'code',
            lang: 'bash',
            title: '凭据读取顺序（0.2 版）',
            code: `# 网页/桌面：界面里存的 key > 启动时环境变量 > 项目里的 .env > 它自己家目录下的 .env
# 无界面命令行：默认只看环境变量和 .env，不读你在界面里存的 key
export DEEPSEEK_API_KEY=sk-xxxxxxxx   # 从 DeepSeek 开放平台单独申请，按量扣钱`,
            note: {
              zh: '「登录」用的是 DeepSeek 平台账号（走余额和赠金）；「添加 API Key」要去开放平台单独申请一把 key。deepseek.com 上聊天的那个身份和开放平台的 key 仍不是一回事。这条读取顺序来自 0.2.1-rc.1 发布说明和凭据模块文档，作者没逐层验证。',
              en: '"Log in" uses the DeepSeek platform account (balance and grants); "Add API Key" needs a separately applied key that bills by usage. The chat identity on deepseek.com and an open-platform key are still different things. This read order comes from the 0.2.1-rc.1 release notes and the credentials module doc; the author did not verify each layer.',
            },
          },
        ],
      },
      {
        id: 'break-index',
        title: { zh: '出事了翻哪：症状 → 去处速查', en: 'When It Breaks: Symptom to Destination' },
        blocks: [
          {
            type: 'p',
            zh: '这套东西的收益全在「出事之后」。下表把橙皮书里逐字出现过的症状，对到站内该翻的那一页。',
            en: 'All the payoff of this design arrives "after it breaks". The table below maps symptoms the orange book states verbatim to the page you should open.',
          },
          {
            type: 'table',
            head: [
              { zh: '症状', en: 'Symptom' },
              { zh: '第一反应', en: 'First instinct' },
              { zh: '翻哪', en: 'Where to look' },
            ],
            rows: [
              [
                { zh: '界面只报 `MALFORMED_RESPONSE`、一个字不提代理', en: 'UI shows `MALFORMED_RESPONSE` and never mentions the proxy' },
                { zh: '先想代理：清掉 `http_proxy` 等六个变量再启动', en: 'Think proxy first: clear the six `http_proxy`-family variables and relaunch' },
                { zh: '[错误博物馆](/errors)', en: '[Error museum](/errors)' },
              ],
              [
                { zh: '某个功能「好像没生效」、也不报错', en: 'A feature "seems to do nothing", with no error' },
                { zh: '先怀疑它压根没被挂上，而不是配置写错——配置写错会大声报错，「包不在」才是安静失败', en: 'Suspect it was never mounted rather than a config typo — a bad config fails loudly, "missing package" is the quiet kind' },
                { zh: '[错误博物馆](/errors)', en: '[Error museum](/errors)' },
              ],
              [
                { zh: '照搬的钩子装好了、看着在跑、一条都没拦', en: 'A copied hook installs, looks live, blocks nothing' },
                { zh: '工具名大小写：Claude Code 用 Bash、DSH 全小写 bash，对不上整条不触发且不给报错', en: 'Tool-name casing: Claude Code uses Bash, DSH uses all-lowercase bash; a mismatch silently disables the rule' },
                { zh: '[错误博物馆](/errors)', en: '[Error museum](/errors)' },
              ],
              [
                { zh: '账单比预期高、怀疑缓存没命中', en: 'The bill is higher than expected, cache-miss suspected' },
                { zh: '缓存全失效时总账是 3.55 倍不是 50 倍；先看前缀有没有中途改过', en: 'A full cache miss is 3.55x, not 50x; first check whether the prefix changed mid-session' },
                { zh: '[第 6 章](/chapter/cost) · [成本计算器](/lab?tab=cost)', en: '[Chapter 6](/chapter/cost) · [cost calculator](/lab?tab=cost)' },
              ],
              [
                { zh: '改了插件行配置、怕改坏', en: 'You edited a plugin row and fear breaking it' },
                { zh: '改自己那份配置是热生效的、不用重启；改坏它会保留上一棵能跑的树继续运行、并广播一条配置更新失败', en: 'Your own config is hot-applied, no restart; a bad edit keeps the last working tree running and broadcasts a config-update failure' },
                { zh: '[发布门禁](/gates)', en: '[Release gates](/gates)' },
              ],
              [
                { zh: '想验某数字对不对、想抽查全书', en: 'Want to verify a number or spot-check the whole book' },
                { zh: '先跑一次 `--dump-default-config`（不需要密钥，一分钟出结果），再把速查表三的取数命令挨个敲一遍', en: 'Run `--dump-default-config` first (no key needed, one minute), then type through the appendix probes one by one' },
                { zh: '[实战实验室](/lab) · [工具箱](/toolkit)', en: '[Lab](/lab) · [Toolkit](/toolkit)' },
              ],
            ],
            note: {
              zh: '仓库有 27 道机械门禁、11 篇被否决笔记（10月 8 篇）、4 篇事故复盘（编号 0001–0004）。凡是跟「装坏了」有关的，[发布门禁](/gates)那页有它们的原始判词。',
              en: 'The repo runs 27 mechanical gates, keeps 11 rejected-proposal notes (8 by Oct), and has 4 postmortems numbered 0001–0004. Anything about "installed it wrong" is quoted on the [release-gates](/gates) page.',
            },
          },
          {
            type: 'quote',
            zh: '如果你跑出来的和书里不一样，优先信你自己那一次。取数命令我全写上了，本来就是留着给你推翻我用的。',
            en: 'If what you run disagrees with the book, trust your own run first. I wrote down every probe command — they are there precisely so you can overturn me.',
            cite: { zh: '花叔《DeepSeek Harness》§99 附录', en: 'Huashu, "DeepSeek Harness", Appendix §99' },
            source: { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
        ],
      },
      {
        id: 'references',
        title: { zh: '去工具箱抄、去相关章细看', en: 'Copy from the Toolkit, Read On in Related Chapters' },
        blocks: [
          {
            type: 'links',
            title: { zh: '本章延伸', en: 'Where to go next' },
            items: [
              {
                label: { zh: '工具箱：一键复制中心', en: 'Toolkit: one-click copy center' },
                href: '/toolkit',
                desc: { zh: '本章每条命令、每段配置都在工具箱里可一键复制', en: 'Every command and snippet here is copyable in one click in the toolkit' },
                tag: 'playbook',
              },
              {
                label: { zh: '配置模板库', en: 'Configuration Template Library' },
                href: '/chapter/templates',
                desc: { zh: '把这里的值抄成能直接贴的权限、模式、插件、成本模板', en: 'Turn these values into paste-ready permission, mode, plugin, and cost templates' },
                tag: '17',
              },
              {
                label: { zh: '第 6 章：一次任务到底多少钱', en: 'Chapter 6: What One Task Actually Costs' },
                href: '/chapter/cost',
                desc: { zh: '`/compact` 的账、入场费、缓存命中全在这里细算', en: 'The `/compact` bill, entry fee, and cache-hit arithmetic live here' },
              },
              {
                label: { zh: '错误博物馆', en: 'Error Museum' },
                href: '/errors',
                desc: { zh: '代理、静默失效、大小写这些事故逐字复原', en: 'Proxy, silent failures, and casing incidents, reconstructed verbatim' },
              },
              {
                label: { zh: 'MCP GitHub server', en: 'MCP GitHub server' },
                href: 'https://github.com/modelcontextprotocol/server-github',
                desc: { zh: '`mcp-github` 那行补丁里 `command` 拉起来的正是它', en: 'This is what the `command` in the mcp-github patch row launches' },
                tag: 'external',
              },
              {
                label: { zh: 'npm 包页', en: 'npm package page' },
                href: 'https://www.npmjs.com/package/deepseek-harness',
                desc: { zh: '确认 latest/next 各指向哪一版', en: 'Confirm what latest/next each point to' },
                tag: 'external',
              },
              {
                label: { zh: 'Node 下载', en: 'Node download' },
                href: 'https://nodejs.org/en/download',
                desc: { zh: '`node -v` 回 command not found 时从这里装', en: 'Install from here when `node -v` says command not found' },
                tag: 'external',
              },
            ],
          },
        ],
      },
    ],
    sources: [
      { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
      { label: 'DeepSeek 官方文档 / DeepSeek Docs', href: 'https://api-docs.deepseek.com/' },
      { label: 'DeepSeek Harness 上游仓库 / Upstream Repo', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
      { label: 'npm 包页 / npm Package', href: 'https://www.npmjs.com/package/deepseek-harness' },
      { label: 'Node 下载 / Node Download', href: 'https://nodejs.org/en/download' },
    ],
    sisters: ['harness-engineering', 'agent-observability-patterns'],
  },
  {
    slug: 'templates',
    num: '17',
    part: 'playbook',
    icon: 'wrench',
    level: 'reference',
    minutes: 12,
    accent: 'green',
    title: {
      zh: '配置模板库：抄了就能用',
      en: 'The Configuration Template Library',
    },
    subtitle: {
      zh: '六份抄了就能贴的模板：权限、模式、插件、最小骨架、成本护栏、搬家。',
      en: 'Six paste-ready templates: permissions, modes, plugins, the minimal skeleton, cost guardrails, and migration.',
    },
    promise: {
      zh: '读完你能把这些模板直接贴进自己的补丁和设置，并逐行说清每一行为什么这么写。',
      en: 'You will be able to paste these templates into your own patch and settings and explain, line by line, why each value is what it is.',
    },
    sections: [
      {
        id: 'permission-presets',
        title: { zh: '模板一：权限三件套与升权梯子', en: 'Template 1: The Permission Trio and the Escalation Ladder' },
        blocks: [
          {
            type: 'p',
            zh: '什么都没设置时，会话日志开头就是这三行事件（逐字抄自 8月和 10月的同一场番茄钟实测，两次一模一样）。它是权限的正式记账：这场开在哪一档、沙箱什么模式、审批策略是什么。',
            en: 'When you set nothing, these three event lines open the session log (copied verbatim from the same tomato-clock run in both Aug and Oct — the two were identical). This is the product\'s formal bookkeeping for permissions: which tier it opened on, which sandbox mode, and which approval policy.',
            source: { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'code',
            lang: 'json',
            title: '出厂默认 = 工作区内修改 + 问我（日志逐字原文）',
            code: `{"type": "permission/preset", "seq": 0, "data": {"preset": "workspace-write"}}
{"type": "sandbox/mode", "seq": 1, "data": {"mode": "workspace-write"}}
{"type": "approval/policy", "seq": 2, "data": {"policy": "ask"}}`,
            note: {
              zh: '只有这一场（workspace-write + ask）是日志里逐字出现的。下面两档是把「沙箱三档」和「ask/never」两个旋钮按书里记录的取值拼出来的意图值：安全默认取 read-only、可信工作树取 danger-full-access——档位英文串都有出处，但把三行凑成 read-only/never 那种组合，橙皮书没有一段现成日志或 YAML 佐证。',
              en: 'Only this row (workspace-write + ask) appears verbatim in a log. The two tiers below are the intent values assembled from the documented three sandbox tiers and the ask/never switch: safe-default takes read-only, trusted-worktree takes danger-full-access — each English mode string has a source, but no ready log or YAML in the orange book confirms a read-only/never triple.',
            },
          },
          {
            type: 'table',
            head: [
              { zh: '档位', en: 'Preset' },
              { zh: 'sandbox/mode', en: 'sandbox/mode' },
              { zh: 'approval/policy', en: 'approval/policy' },
              { zh: '什么时候用', en: 'When to use' },
            ],
            rows: [
              [
                { zh: '安全默认（仅可查看，8月叫「只读」）', en: 'Safe default (read-only; called "只读" in Aug)' },
                { zh: '`read-only`', en: '`read-only`' },
                { zh: '`ask`', en: '`ask`' },
                { zh: '让它读代码、做分析、写方案，你不想它动手', en: 'Read code, analyze, draft plans — you do not want it to touch anything' },
              ],
              [
                { zh: '日常（工作区内修改，出厂勾在这）', en: 'Day-to-day (workspace-write; shipped here)' },
                { zh: '`workspace-write`', en: '`workspace-write`' },
                { zh: '`ask`', en: '`ask`' },
                { zh: '绝大多数情况：只能改你选的目录和系统临时区，别处一律拒绝', en: 'Almost always: edits only your chosen directory and the system temp area, everything else denied' },
              ],
              [
                { zh: '可信工作树（完全权限，8月叫「完全放开」）', en: 'Trusted worktree (full access; "完全放开" in Aug)' },
                { zh: '`danger-full-access`', en: '`danger-full-access`' },
                { zh: '`never`', en: '`never`' },
                { zh: '你完全知道自己在干什么的时候；这一档本来就没有需要举手的操作', en: 'When you know exactly what you are doing; this tier has no action that would raise a hand anyway' },
              ],
            ],
            note: {
              zh: '「自动审查」是 0.2 版实验性的第四档（每次工具调用前让模型自己判断该不该放行），挂在插件页一个默认关着的插件后面，作者没开过、不评价靠不靠谱。',
              en: '"Auto review" is a fourth, experimental tier in 0.2 — the model judges each tool call before it runs — sitting behind a plugin that is off by default; the author never enabled it and offers no verdict on it.',
            },
            source: { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '在配置里钉死一个档位：文件级 YAML key 未记录', en: 'Pinning a Tier in the Config File: the YAML Key Is Not Documented' },
            zh: '橙皮书里改权限只有两条被逐字记录的路：点输入框左下角那个选择器（改本场），和设置→通用设置（改新会话默认档）。`--patch` 的 YAML 只演示了插件行（`id` + `name` + `disabled`），没有给一条「按 key 写权限档位」的 config-file 语法。别照着 `permission/preset: read-only` 往补丁里贴——那是事件字段名，不是配置键名。要精确的持久配置写法，先 `--dump-config` 看它真实落在哪一行。',
            en: 'The orange book records only two ways to change permissions, both verbatim: the selector at the lower-left of the input (this session) and Settings → General (the new-session default). The `--patch` YAML is demonstrated only for plugin rows (`id` + `name` + `disabled`); no config-file syntax for setting a permission tier by key is given. Do not paste `permission/preset: read-only` into a patch — that is an event field name, not a config key. To find where it truly lands, run `--dump-config` and look.',
          },
          {
            type: 'code',
            lang: 'text',
            title: '撞墙那一刻模型逐字收到的两行（升权梯子）',
            code: `[sandbox: file access denied under workspace-write mode]
[sandbox: escalation available — retry this exact operation once with sandbox_permissions
(the narrowest wider mode that suffices) + justification; the approval prompt asks the user]`,
            note: {
              zh: '三道闸：一、只能升不能平移，且必须严格更宽，一个不变宽的请求根本不打扰你、执行那一刻就被打回；二、仅可查看(read-only)是地板，没有任何东西能往下升到它；三、重试只有一次、必须在同一轮里，「升权从不投机」。拒绝之后模型收到 `the user rejected escalating this command to "danger-full-access"`，那条命令从来没有执行过。',
              en: 'Three gates: (1) only upward, never sideways, and strictly wider — a request that is not wider never bothers you and is rejected at execution; (2) read-only is the floor — nothing can escalate down into it; (3) retry happens once, within the same turn, and "escalation is never speculative". After a refusal the model gets `the user rejected escalating this command to "danger-full-access"`, and that command never executed.',
            },
            source: { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
        ],
      },
      {
        id: 'mode-switching',
        title: { zh: '模板二：模式切换，钉住哪一个', en: 'Template 2: Mode Switching, Which One to Pin' },
        blocks: [
          {
            type: 'p',
            zh: '四个模式内部代号是 `standard`、`ptc`、`minimal`、`cordis`（创造模式界面英文叫 Creator、目录名却是 cordis）。界面里只在空白会话时四选一；走无界面命令行或 Python 那条路没有「四选一」，用的是另一套配置。钉模式 = 挂哪份 agent preset 清单。',
            en: 'The four modes\' internal codes are `standard`, `ptc`, `minimal`, `cordis` (creator is "Creator mode" in the UI but the folder is cordis). In the UI you pick once, only while a session is blank; headless or the Python path has no four-way pick and uses a different config. Pinning a mode means mounting that agent-preset manifest.',
          },
          {
            type: 'table',
            head: [
              { zh: '模式（代号）', en: 'Mode (code)' },
              { zh: '模型手里工具数', en: 'Tools the model holds' },
              { zh: '系统提示词字符数', en: 'System-prompt size (chars)' },
              { zh: '它其实换掉了什么', en: 'What it actually changes' },
            ],
            rows: [
              [
                { zh: '标准（`standard`）', en: 'Standard (`standard`)' },
                { zh: '31 件（8月 25）', en: '31 (25 in Aug)' },
                { zh: '5,608（8月 4,100）', en: '5,608 (4,100 in Aug)' },
                { zh: '99% 的人 99% 时候用它：文件、命令行、检索、技能、计划、目标、子代理、工作流、定时任务、联网', en: 'What 99% of people use 99% of the time: files, shell, search, skills, plans, goals, subagents, workflows, scheduling, web' },
              ],
              [
                { zh: 'PTC（`ptc`）', en: 'PTC (`ptc`)' },
                { zh: '1 件（只有 `run_code`）', en: '1 (only `run_code`)' },
                { zh: '41,267（8月 35,643）', en: '41,267 (35,643 in Aug)' },
                { zh: '能力不减，但模型改成写一段程序去调别的工具；省的是中间结果体积，不是那张报关单', en: 'Same power, but the model writes a program to call tools; it saves intermediate-result size, not the manifest' },
              ],
              [
                { zh: '极简（`minimal`）', en: 'Minimal (`minimal`)' },
                { zh: '3 件（命令行、读图、切换工作目录）', en: '3 (shell, image read, change working dir)' },
                { zh: '225', en: '225' },
                { zh: '那份配置只有 62 行、搜 skill 零命中：没有搜索、没有子代理、没有你的技能库——是拿来量模型本身的', en: 'A 62-line config with zero hits for "skill": no search, no subagents, no skill library — built to measure the raw model' },
              ],
              [
                { zh: '创造（`cordis`）', en: 'Creator (`cordis`)' },
                { zh: '34 件（31 + 两件只读自检 + 插件管理器）', en: '34 (31 + two read-only self-checks + plugin manager)' },
                { zh: '（橙皮书未给 10月字符数）', en: '(Oct char count not documented)' },
                { zh: '它改的是 dsh 本身：写插件、装插件；装插件那一步要点「允许一次」交出完全权限', en: 'It edits DSH itself: write and install plugins; installing one costs a "allow once" click that grants full access' },
              ],
            ],
            note: {
              zh: '你装的插件对四个模式都生效：作者装完数汉字插件后，极简模式手里从 3 件变 4 件。这个数会变——版本、模式、插件都会让它变。',
              en: 'A plugin you install takes effect across all four modes: after the CJK counter was installed, the minimal mode went from 3 tools to 4. This number moves — version, mode, and plugins all change it.',
            },
            source: { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'code',
            lang: 'bash',
            title: '怎么切、切错了怎么办',
            code: `# 界面：新会话输入框上方的模式选择器（只在会话空白时可切）
# 第一句话发出后只剩一个写着模式名的灰色标签，点它没反应——想换开一场新会话

# 无界面/脚本：没有四选一，走 profile + patch 指定那份清单
npx @deepseek-ai/dsh --profile headless --patch my.yml "任务"

# 造第五个模式：设置→Agent 预设 最底下一行「自定义：让Agent帮我创建预设模式」
# 交给 agent 写配置，它要写也得过你的批准（8月网页里的 YAML 编辑器被整个删掉了）`,
            note: {
              zh: '为什么只允许空白会话切换：他们的工程笔记原话——一旦跑过一轮，那段历史就是在旧工具集下产生的，换掉工具会让已经记下的调用变成孤儿。',
              en: 'Why only a blank session can switch: their note says it plainly — once a turn has run, that history was produced under the old tool set, and swapping tools would strand the logged calls.',
            },
          },
        ],
      },
      {
        id: 'plugin-list-rowset',
        title: { zh: '模板三：插件清单里的那几行', en: 'Template 3: The Plugin-List Row Set' },
        blocks: [
          {
            type: 'p',
            zh: 'dsh 把 skill 和 MCP 本身都做成了普通插件——在 `--dump-default-config` 打出的那份清单里，它们跟 agent 主循环是同一种物件、同一种删法。想关 skill，就是加一行 `disabled: true`，手势和关任何一个别的零件一样。',
            en: 'DSH makes skills and MCP into ordinary plugins — in the manifest from `--dump-default-config` they are the same kind of object as the agent loop and disabled the same way. To turn skills off, add `disabled: true`, exactly the gesture you use for any other part.',
          },
          {
            type: 'code',
            lang: 'yaml',
            title: 'skill 那一族 + 主循环 + 模型适配器',
            code: `- id: skill
  name: '@deepseek-ai/dsh-skill'
- id: skill-filesystem
  name: '@deepseek-ai/dsh-skill-filesystem'
- id: skill-badge
  name: '@deepseek-ai/dsh-skill-badge'
  disabled: true
- id: tool-skill
  name: '@deepseek-ai/dsh-tool-skill'

# 往下翻两百行：agent 主循环和 DeepSeek 模型适配器，跟 skill 同一种物件
- id: agent-loop
  name: '@deepseek-ai/dsh-agent-loop'
- id: llm-deepseek
  name: '@deepseek-ai/dsh-llm-deepseek'`,
            note: {
              zh: '`skill-badge` 那行 `disabled: true` 是书里现成的例子：他们做了一个官方内置 skill、随包发出去，然后在默认配置里关着，你想用得自己去把那一行打开。补丁是整段替换、不是逐字段合并——改一个数字得把这行的所有字段抄一遍。',
              en: 'The `skill-badge` line with `disabled: true` is the book\'s own example: they shipped an official skill and then disabled it in the default config, so you must open that line yourself to use it. Patches replace whole rows, not field-merge — to change one number you copy every field on the line.',
            },
            source: { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'code',
            lang: 'yaml',
            title: '挂一台 MCP 服务器（一台一行，两台两行）',
            code: `- id: mcp-github
  name: '@deepseek-ai/dsh-mcp-client'
  config:
    serverName: github
    transport: stdio
    command: npx
    args: ['-y', '@modelcontextprotocol/server-github']`,
            note: {
              zh: '同一个包 `@deepseek-ai/dsh-mcp-client` 被装载两次、配置不同就是一台接一台。Claude Code 那种把所有服务器塞进一个大对象的配置不能整块端过来，得拆成一行一行写。默认状态：作者 dump 出来的那份里 MCP 一行都没有——包随安装带上了，但一台也不挂，因为「每条服务器启动命令都是 agent 沙箱之外的可信可执行代码」。',
              en: 'The same package `@deepseek-ai/dsh-mcp-client` mounted twice with different config equals two servers. Claude Code\'s "everything in one big object" config cannot be lifted whole — split it into rows. Default state: the author\'s dump had zero MCP rows — the client ships installed but mounts no server, because "each server start command is trusted executable code outside the agent sandbox".',
            },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: 'MCP 只桥接工具这一类能力', en: 'The MCP Bridge Only Carries Tools' },
            zh: '协议的动词只有三个：工具、资源、提示模板。dsh 8月只接第一个，0.2 版补上了读资源，提示模板仍然不支持。所以「换掉 agent 主循环」这种动作在协议里根本没有对应概念。密钥得写在那段配置里，因为启动子进程前它会把看起来像凭据的环境变量全擦掉；服务器崩了不会自动重连、工具还挂在那儿；启动超时用 60 秒默认值，一个反应慢的服务器会拖慢整个启动。',
            en: 'The protocol has only three verbs: tools, resources, prompt templates. DSH bridged tools only in Aug, added read-resources in 0.2, and still does not support prompt templates. So "replace the agent loop" has no counterpart in the protocol at all. Keys must go inside that config block, because the launcher scrubs credential-looking environment variables before spawning a subprocess; a crashed server does not auto-reconnect and the tool stays listed; the start timeout is the 60-second default, so one slow server drags the whole launch.',
          },
        ],
      },
      {
        id: 'minimal-plugin',
        title: { zh: '模板四：最小插件骨架与重启边界', en: 'Template 4: The Minimal Plugin Skeleton and the Restart Boundary' },
        blocks: [
          {
            type: 'p',
            zh: '文档给插件下的定义只有一句：一个导出 `apply` 函数的 TypeScript 模块。框架加载它时调用这个函数、递给它一个上下文对象，插件拿着它去注册自己的能力。紧接着还补了一句 That is the complete configuration——没有清单文件、没有注册中心、没有一长串生命周期钩子。',
            en: 'The doc defines a plugin in one line: a TypeScript module exporting an `apply` function. On load, the framework calls it with a context object, and the plugin uses that object to register its capabilities. It then adds "That is the complete configuration" — no manifest file, no registry, no long chain of lifecycle hooks.',
          },
          {
            type: 'code',
            lang: 'ts',
            title: '官方教程里最小的那个例子',
            code: `import type { Context } from '@deepseek-ai/cordis'

export const name = 'hello-plugin'

export function apply(ctx: Context) {
  // Required dependencies are ready before apply runs.
  console.log('[hello-plugin] plugin loaded!')
}`,
            note: {
              zh: '要发给别人，也是三个文件：一个 `package.json` 声明「我贡献了什么」、一个 YAML 补丁文件写明「往那份零件清单插哪几行」、一个模块本体。装的时候敲 `dsh plugin` 那条。注册任何东西的那一刻必须同时交出怎么撤销它——这条规矩带来热重载：卸了再装就能替换一个正在运行的插件。',
              en: 'To ship it to others it is also three files: a `package.json` declaring what you provide, a YAML patch stating which lines to insert into the manifest, and the module itself. You install with the `dsh plugin` command. Registering anything forces you to hand over how to undo it at the same moment — that rule is what makes hot reload work: unload and reload replaces a running plugin.',
            },
            source: { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'list',
            ordered: false,
            zh: [
              '重启边界·8月：创造模式那套动态插件只活在进程内存里，连五个「不」——不创建插件文件、不安装包、不改动配置、重启之后不存活、不能被自动提升为正式插件。风险声明原文：这个沙箱隔离全局变量，但它不是安全边界，请把这套工具当成 bash 权限来对待。',
              '重启边界·10月：那条「内存里现挂」的路换成了写插件包、经你点「允许一次」装进去。装好留不留得住，看的是重启之后还在不在——作者重启开新会话，标准模式 31→32 件、极简 3→4 件，多的都是它。',
              '卸载：插件管理器的 `remove_bundle`，目标填 `@local/plugin-count-chinese`（这是作者那个汉字计数器插件的包名）。',
            ],
            en: [
              'Restart boundary, Aug: a dynamic plugin in creator mode lives only in the process\'s memory, with five "nots" — it creates no plugin file, installs no package, changes no config, does not survive a restart, and cannot be auto-promoted to a real plugin. The risk note read: this sandbox isolates globals but is not a security boundary; treat these tools like bash access.',
              'Restart boundary, Oct: the "attach it live in memory" path was replaced by writing a plugin package and installing it only after you click "allow once" — persistence is judged by whether it is still there after a restart. The author restarted into a fresh session: standard went 31 to 32 tools and minimal 3 to 4, the extra being that plugin.',
              'Uninstall: the plugin manager\'s `remove_bundle`, target `@local/plugin-count-chinese` (the author\'s CJK-counter package name).',
            ],
          },
          {
            type: 'callout',
            tone: 'note',
            title: { zh: '改配置热生效、改插件包要重启', en: 'Config Edits Are Hot; Plugin Packages Need a Restart' },
            zh: '改自己那份配置文件是热生效的、不用重启；改坏了它会保留上一棵能跑的树继续运行、并广播一条配置更新失败。但创造模式在内存里挂的动态插件重启就没——要留成一件真东西，得有人按正常流程写一个真的插件、装进去、重启。',
            en: 'Editing your own config file takes effect hot, no restart; a bad edit keeps the last working tree running and broadcasts a config-update failure. But a dynamic plugin attached in memory by creator mode dies on restart — to persist it as a real thing, someone must follow the normal flow: write a real plugin, install it, restart.',
          },
        ],
      },
      {
        id: 'cost-guardrails',
        title: { zh: '模板五：成本护栏（缓存、峰谷、单价）', en: 'Template 5: Cost Guardrails (Cache, Peak/Off-peak, Prices)' },
        blocks: [
          {
            type: 'p',
            zh: 'DeepSeek 这两个月价动过两回：8月17日起峰谷定价，9月10日 V4.1-Flash 上线下调 Flash、Pro 不变，10月17日换成 V4.1-Flash-1017 只换模型不动价。下面是 10月20日官方中文价目页（元每百万 token）。',
            en: 'DeepSeek changed price twice in two months: peak/off-peak from Aug 17, Flash cut when V4.1-Flash launched on Sep 10 (Pro unchanged), and the Oct 17 switch to V4.1-Flash-1017 changed only the model, not the price. The figures below are from the official Chinese pricing page on Oct 20 (RMB per million tokens).',
            source: { label: 'DeepSeek 定价页 / DeepSeek Pricing', href: 'https://api-docs.deepseek.com/quick_start/pricing' },
          },
          {
            type: 'table',
            head: [
              { zh: '计价项（元/百万token）', en: 'Line (RMB/million tokens)' },
              { zh: 'Flash（界面上的 V4.1-Flash 1017）', en: 'Flash (V4.1-Flash 1017 in the UI)' },
              { zh: 'Pro（V4-Pro）', en: 'Pro (V4-Pro)' },
            ],
            rows: [
              [
                { zh: '输入·缓存命中（低谷 / 高峰）', en: 'Input, cache hit (off-peak / peak)' },
                { zh: '0.02 / 0.04', en: '0.02 / 0.04' },
                { zh: '0.15 / 0.30', en: '0.15 / 0.30' },
              ],
              [
                { zh: '输入·缓存未命中（低谷 / 高峰）', en: 'Input, cache miss (off-peak / peak)' },
                { zh: '1 / 2', en: '1 / 2' },
                { zh: '4.5 / 9', en: '4.5 / 9' },
              ],
              [
                { zh: '输出（低谷 / 高峰）', en: 'Output (off-peak / peak)' },
                { zh: '4 / 8', en: '4 / 8' },
                { zh: '13.5 / 27', en: '13.5 / 27' },
              ],
              [
                { zh: '命中价 ÷ 未命中价', en: 'Hit price ÷ miss price' },
                { zh: '1/50', en: '1/50' },
                { zh: '1/30（8月是 1/120）', en: '1/30 (1/120 in Aug)' },
              ],
            ],
            note: {
              zh: '高峰 = 北京时间工作日（法定节假日除外）上午 9 点到 12 点、下午 2 点到 6 点；其余都是低谷，低谷价正好是高峰价的一半。同一件活白天做和晚上做，钱差一倍。另外内置联网搜索走官方 Search/Fetch 接口，各按每千次成功请求 5 元计，北京时间 11 月 1 日零点起收费。',
              en: 'Peak is Beijing-time weekdays (holidays excluded), 9–12 AM and 2–6 PM; everything else is off-peak, at exactly half the peak price. The same job done by day versus by night differs 2x. Built-in web search uses the official Search/Fetch APIs at RMB 5 per thousand successful requests each, billed from midnight Beijing time on Nov 1.',
            },
            source: { label: 'DeepSeek 定价页 / DeepSeek Pricing', href: 'https://api-docs.deepseek.com/quick_start/pricing' },
          },
          {
            type: 'code',
            lang: 'text',
            title: '缓存护栏：让前缀别断、单位是 64',
            code: `- DeepSeek 官方文档：64 个 token 是一个存储单元，不足 64 的不缓存（作者机器上验过，零头真不给算）
- 8月flash五步流水的命中数 13952 / 14464 / 16512 / 18176 全是 64 的整数倍
- 「命中比未命中便宜 50 倍」说的是单价；落到总账没有 50 倍，因为输出不打折
- 同一跑若缓存全部失效：$0.0034 -> $0.0121，是 3.55 倍。"省 50 倍"这种话不能写
- 三条能照做：别在会话中途改配置/换人格/开关工具（要改就在新会话开头改）；要贴图就开头贴；顺序也算数，工具重排一次内容没改缓存照样掉`,
            note: {
              zh: '前缀 = 从第一个字算起、连着不断的那一段。第一请求全价、之后每轮走缓存价：8月那跑第一步 13,838 全价、命中 0，第二步整个前缀被认下、全价只剩 267，全程命中率 80.4%。番茄钟那场输出 token 只占总量的 4%，却占了账单的八成多——想省钱，少让它写长东西比少给它看东西有用。',
              en: 'The prefix is the run of text from the first character, unbroken. The first request is full price and every later turn rides the cache: in the Aug run, step 1 was 13,838 at full price with zero hits, step 2 had the whole prefix recognized so only 267 stayed at full price, hitting 80.4% across the run. In the tomato-clock session, output tokens were only 4% of the total but over 80% of the bill — to save money, make it write less than make it read less.',
            },
            source: { label: 'Anthropic 提示缓存 / Anthropic Prompt Caching', href: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching' },
          },
          {
            type: 'stats',
            items: [
              {
                value: '13,809',
                label: { zh: 'token 入场费（8月）', en: 'Token entry fee (Aug)' },
                sub: { zh: '一句 29 token 的话，harness 先替付了 13,809 个 token', en: 'A 29-token question, but the harness prepaid 13,809 tokens' },
              },
              {
                value: '47.0% / 45.1%',
                label: { zh: '入场费大头是工具说明书 / 技能目录', en: 'Entry fee dominated by tool manifest / skill catalog' },
                sub: { zh: '工具说明书 6,510、本机 skill 目录 6,242 token', en: 'Tool manifest 6,510, local skill catalog 6,242 tokens' },
              },
              {
                value: '82%',
                label: { zh: '57 个 skill 让开机成本涨幅', en: 'Cost inflation from 57 skills' },
                sub: { zh: '从约 7,600 涨到 13,838；每开一场、每派一个子代理都重付一次', en: 'From about 7,600 to 13,838; re-paid on every new session and every subagent' },
              },
            ],
            source: { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '模型选择护栏：别让网页点一下改掉你所有命令行任务', en: 'Model-choice Guardrail: One Web Click Must Not Rewrite Every Headless Job' },
            zh: '8月作者用命令行明确指定 flash，日志里写的却是 pro——因为另一窗口开着网页版、他在网页点了一下模型下拉框，那个选择被写进共享的全局设置文件，而它层级压过命令行参数。3 倍差价、静默发生。0.2 版把设置改存到每个 profile 自己的插件配置里、凭据读取也分开，这个坑可能已经不在了，作者没复测。跑之前先看一眼那份设置，跑完先看日志里的请求上下文。界面上没有金额只有 token，且上下文占用按「4 字符 = 1 token」估——中文密度实测 1.71 字符一个 token，显示 40% 时可能实际已 90%。',
            en: 'In Aug the author pinned flash on the command line, but the log read pro — because a web-app window was open and a single click in its model dropdown had been written into a shared global settings file whose precedence beat the CLI argument. A 3x price difference, silently. In 0.2 settings moved into each profile\'s own plugin config and credential reads were split, so this trap may already be gone; the author did not retest. Before a run, glance at that settings file; after, read the request context in the log. The UI shows only tokens, never money, and estimates context usage at "4 chars = 1 token" — measured Chinese density is 1.71 chars per token, so 40% on the bar may really be 90%.',
          },
        ],
      },
      {
        id: 'migration',
        title: { zh: '模板六：从 Claude Code 搬家的清单', en: 'Template 6: The Move-in-from-Claude-Code Checklist' },
        blocks: [
          {
            type: 'p',
            zh: '一句话版：文字类资产几乎完全兼容，skill 和规则文件放那儿它就认；配置类（MCP、钩子、权限）零件都在、接线自己接；历史数据完全不通。',
            en: 'One-line version: text assets are almost fully compatible — drop skills and rule files and it reads them; config assets (MCP, hooks, permissions) have the parts present but you do the wiring; historical data does not transfer at all.',
          },
          {
            type: 'code',
            lang: 'text',
            title: 'skill 目录布局：扫六个位置、只往下看一层',
            code: `DSH 按顺序扫六个位置（10月起有文件监听，新增/改名/删除不用重启）：
  1. 项目里的两个
  2. 你自己配的一个
  3. 它自己家目录下的一个
  4. 公共抽屉 ~/.agents/skills   <- 默认值、排第五、零配置就能读到（作者8月57个、10月74个全被白捡）
  5. 随包自带的一个
一个文件夹配一份 SKILL.md（或干脆一个 Markdown 文件）
只往下看一层：文件夹里直接放说明书才算数，再嵌套不认（官方写「刻意排除」）
名字字段必须全小写加连字符；拼错一个字整份 skill 作废、只留一条警告
它读文件里写的 name，不是文件夹名（huashu-weread 列出来却是 huashu-weread-advisor）

# ~/.claude/skills 不在扫描名单里：那是一坨实实在在的文件夹，DSH 看不见。补救两条路：
ln -s ~/.agents/skills ~/.claude/skills      # 做一条指向公共抽屉的软链
# 或在配置里加一条自定义路径（作者本机的 ~/.claude/skills 早就是一条软链，所以没撞上）

# 数自己有几个 skill（别用 ls ~/.agents/skills | wc -l，那会把 .git 也算进去）
ls -d ~/.agents/skills/*/ | wc -l`,
            note: {
              zh: '这些都建立在你用标准模式的前提下：极简模式那份配置只有 62 行、skill 这个词零命中——在那个模式下你的技能库整个不存在。',
              en: 'All of this assumes standard mode: the minimal-mode config is only 62 lines with zero hits for "skill" — in that mode your entire skill library does not exist.',
            },
            source: { label: 'Claude Code settings', href: 'https://docs.claude.com/en/docs/claude-code/settings' },
          },
          {
            type: 'code',
            lang: 'text',
            title: '规则文件：AGENTS.md 与 CLAUDE.md 逐字节相同才去重',
            code: `同一个目录下：两份文件内容逐字节相同 -> 只算一份；漂移了一点 -> 两份都塞进去（你会白花一份 token）
  作者验法：CLAUDE.md 是指向 AGENTS.md 的软链 -> 模型只报两条来源；换成内容不同的真文件 -> 报三条、AGENTS.md 排前面
全局规则读取顺序（0.2.1-rc.1 起）：
  $DSH_HOME/AGENTS.md -> ~/.agents/AGENTS.md      # DSH_AGENTS_HOME 可改位置
你放在 ~/.claude/CLAUDE.md 的那份它仍然读不到：挪过去，或做软链
.claude/rules/ 那个目录和 @某个路径 这种导入写法：明说不支持，用了就当普通文字原样塞给模型
它不监视规则文件的外部编辑：改完不立刻生效，得等它下一次读写更深的目录、或上下文压缩之后`,
            note: {
              zh: '作者那份 4,790 字符的 ~/.agents/AGENTS.md 在 10月的会话日志里原样出现、标着来源，每场会话照付这笔 token。',
              en: 'The author\'s 4,790-char `~/.agents/AGENTS.md` appeared verbatim in the Oct session log, source-tagged, and is paid on every session.',
            },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '照搬钩子配置最可能的结局：装好了、一条都没生效', en: 'Copying a Hooks Config: Installed, Zero Rules Firing' },
            zh: '钩子按工具名匹配：Claude Code 用首字母大写那套（Bash），DSH 全是小写（bash）。对不上整条不触发，而且它一句报错都不会给你。验法：把要拦的工具名写成全小写、挂上、跑一句最简单的 shell 任务，看它是不是真被拦住了。Claude Code 那边 30 个事件它只认 7 个（会话开始、每句话提交前、工具调用前后、停止、子代理起止），剩下 23 个既不翻译也不吭声。另外「预先批准」这个动作 DSH 侧根本没有对应物，它只有拒绝和问一下两种。',
            en: 'Hooks match on tool names: Claude Code uses capitalized (Bash), DSH is all lowercase (bash). A mismatch silently disables the whole rule and gives you no error at all. To verify: write the target tool name in lowercase, mount it, run the simplest shell task, and check it really got blocked. It recognizes only 7 of Claude Code\'s 30 events (session start, before each submit, before/after a tool call, stop, subagent start/stop); the other 23 are neither translated nor announced. And "pre-approval" has no counterpart on the DSH side — it has only reject and ask.',
          },
          {
            type: 'checklist',
            title: { zh: '搬家验收：三条最要紧的自己跑一遍', en: 'Move-in Acceptance: Run These Three Yourself' },
            items: [
              { zh: 'skill 有没有被读到：装完第一句打「把你现在能调用的技能全部列出来，一行一个」，跟 `ls -d ~/.agents/skills/*/ | wc -l` 对数——对不上就是有 skill 名字字段写错被静默作废', en: 'Skills read? First line, ask it to "list every skill you can call, one per line", and compare against `ls -d ~/.agents/skills/*/ | wc -l` — a mismatch means a skill name field is misspelled and silently voided' },
              { zh: '规则文件有没有生效：在临时目录放三份规则文件、每份埋一个只有你认得的暗号，让模型把它收到的规则来源原样复述一遍（十分钟）', en: 'Rule files live? Put three rule files in a temp dir, bury a passphrase only you recognize in each, and have the model restate the sources it received verbatim (ten minutes)' },
              { zh: '钩子拦没拦住：这条最要紧，因为它静默失效。把要拦的工具名写成全小写、挂上、跑一句最简单的 shell 任务，看它是不是真被拦住——拦不住时一句报错都不会给你', en: 'Hooks firing? This one matters most because it fails silently. Write the target tool name in all lowercase, mount it, run the simplest shell task, and check it really blocked — when it does not, it gives you no error' },
            ],
            source: { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
        ],
      },
      {
        id: 'template-links',
        title: { zh: '抄进工具箱，抄回相关章', en: 'Copy into the Toolkit, Link Back to Chapters' },
        blocks: [
          {
            type: 'links',
            title: { zh: '模板延伸', en: 'Template references' },
            items: [
              {
                label: { zh: '工具箱：一键复制中心', en: 'Toolkit: one-click copy center' },
                href: '/toolkit',
                desc: { zh: '这六份模板都能在那里一键复制', en: 'All six templates are one-click copyable there' },
                tag: 'playbook',
              },
              {
                label: { zh: '命令、快捷键与日志速查', en: 'Commands, Shortcuts and Log Reference' },
                href: '/chapter/commands',
                desc: { zh: '改配置前先 --dump-config 看它真实落在哪一行', en: 'Before editing config, run --dump-config to see where each value really lands' },
                tag: '16',
              },
              {
                label: { zh: '第 6 章：一次任务到底多少钱', en: 'Chapter 6: What One Task Actually Costs' },
                href: '/chapter/cost',
                desc: { zh: '成本护栏那笔入场费、缓存流水、逐块称重三步全在这里', en: 'The entry fee, the cache run, and the three-step weigh are all there' },
              },
              {
                label: { zh: 'MCP 规范', en: 'MCP Specification' },
                href: 'https://modelcontextprotocol.io/',
                desc: { zh: '工具/资源/提示模板三个动词，dsh 目前接第一和第二', en: 'The three verbs tool/resource/prompt — DSH covers the first, and resources from 0.2' },
                tag: 'external',
              },
              {
                label: { zh: 'Claude Code settings', en: 'Claude Code settings' },
                href: 'https://docs.claude.com/en/docs/claude-code/settings',
                desc: { zh: '搬家清单里那些搬不了的概念，对照它自己那份文档看', en: 'Compare against its own doc for the concepts that will not migrate' },
                tag: 'external',
              },
              {
                label: { zh: 'DeepSeek 定价页', en: 'DeepSeek Pricing' },
                href: 'https://api-docs.deepseek.com/quick_start/pricing',
                desc: { zh: '元/百万 token 的官方价目，10月快照以这一页为准', en: 'The official RMB/million-token table; treat this page as the Oct snapshot' },
                tag: 'external',
              },
            ],
          },
        ],
      },
    ],
    sources: [
      { label: '花叔橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
      { label: 'DeepSeek 定价页 / DeepSeek Pricing', href: 'https://api-docs.deepseek.com/quick_start/pricing' },
      { label: 'Anthropic 提示缓存 / Anthropic Prompt Caching', href: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching' },
      { label: 'MCP 规范 / MCP Specification', href: 'https://modelcontextprotocol.io/' },
      { label: 'Claude Code settings', href: 'https://docs.claude.com/en/docs/claude-code/settings' },
    ],
    sisters: ['harness-engineering', 'mcp-patterns', 'agent-skillhub-patterns'],
  },
]
