import type { Chapter } from '../types'

export const coreChapters: Chapter[] = [
  {
    slug: 'event-sourcing',
    num: '05',
    part: 'core',
    icon: 'scroll',
    level: 'builder',
    minutes: 16,
    accent: 'blue',
    title: { zh: '每一次运行都有迹可循', en: 'Every Run Leaves a Trace' },
    subtitle: {
      zh: '8月一句最普通的提问，在硬盘上留下44行日志，模型只看得见6行。',
      en: 'One ordinary question in Aug left 44 log lines on disk, and the model saw only six of them.',
    },
    promise: {
      zh: '读完这章，你能在自己电脑上找到那份会话日志、解开它，并说清楚模型这一轮到底看见了哪几条记录。',
      en: 'You will be able to find your own session log on disk, decompress it, and name exactly which records the model saw on a given turn.',
    },
    sections: [
      {
        id: 'why-traces',
        title: { zh: '我最想要的功能很土', en: 'The Feature I Wanted Was Dull' },
        blocks: [
          {
            type: 'p',
            zh: '你大概有过这种时候：让 agent 改一个卡片的间距，它动了三个别的地方；让它跑一个流程，二十分钟后结果不对。回头只看得到一屏它写给你的漂亮总结，看不到它中间在想什么、读到了什么、哪一步开始跑偏。这时候你能做的只有一件事——**猜**。',
            en: 'You have been there. You ask the agent to nudge one card spacing and it touches three other places. You ask it to run a flow and twenty minutes later the result is wrong. What is left on screen is a tidy summary written by the agent, not the intermediate state: what it was thinking, what it read, which step went off the rails. All that remains is guessing.',
          },
          {
            type: 'quote',
            zh: '最抓狂的是它做错了，我不知道为什么。做错可以重来，不知道为什么错，下一轮还是撞同一堵墙。',
            en: 'The maddening part is that it got it wrong and I do not know why. A wrong run can be redone; not knowing why means the next run hits the same wall.',
            cite: { zh: '橙皮书 §05', en: 'Orange Book, section 05' },
            source: { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'p',
            zh: 'DSH 把地基换掉了：一切先落成一条**只追加、不改写**的事件日志，模型那一面只是这份日志的一个投影。8月作者在空文件夹里放了一个 15 字节的 Python 文件，打了一句「用一句中文说明当前目录下有哪些文件」，它想了一下、跑了个 `ls -la`、两秒出头回了一句。听起来毫无可记，日志里落下了 44 行。',
            en: 'DSH replaces that foundation: everything lands in one append-only event log first, and the model side is only a projection of it. In Aug the author dropped a 15-byte Python file into an empty folder and typed one line asking which files were present. The agent thought for a moment, ran `ls -la`, and answered two seconds later. Nothing worth mentioning, and 44 lines landed in the log.',
          },
          {
            type: 'stats',
            items: [
              {
                value: '44',
                label: { zh: '一句提问留下的日志行数', en: 'log lines from one question' },
                sub: { zh: '8月实跑，事件编号排到125', en: 'Aug run; event ids reach 125' },
              },
              {
                value: '6',
                label: { zh: '其中带「模型可见」标记的行', en: 'lines marked model-visible' },
                sub: { zh: '3条user + 2条assistant + 1条工具结果', en: '3 user, 2 assistant, 1 tool result' },
              },
              {
                value: '62',
                label: { zh: '10月官方事件目录里的事件类型', en: 'event types in the Oct official catalog' },
                sub: { zh: '8月是44种', en: '44 in Aug' },
              },
              {
                value: '5',
                label: { zh: '其中模型看得见的类型', en: 'of those, types visible to the model' },
                sub: { zh: '8月是3种，比例几乎没变', en: '3 in Aug; the ratio barely moved' },
              },
            ],
          },
          {
            type: 'diagram',
            id: 'event-stream',
            caption: { zh: '8月那一场的读法：右边信封里的6行是模型这一轮唯一看见的，左边被砖墙挡住的一条都没进它眼睛。', en: 'How the Aug run reads: the six records inside the envelope are the only ones the model saw this turn; everything behind the wall never entered its context.' },
          },
        ],
      },
      {
        id: 'read-the-log',
        title: { zh: '方式就两条命令', en: 'It Takes Two Commands' },
        blocks: [
          {
            type: 'p',
            zh: '系统提示词全文、工具清单全文、技能目录全文——官方文档里没有的东西，作者拿到它们的方式只有一个：打开自己电脑上那个日志文件，往下翻。会话文件的落法是 `~/.dsh/sessions/<工作区>/session-*/session.v4.jsonl.zstd`，目录名由项目路径压平而来，一场会话一个子文件夹。8月那个文件叫 `session.jsonl.zstd`，不带版本号。',
            en: 'The full system prompt, the full tool list, the full skill catalog: things absent from the official docs, obtained one way only, by opening the log file on your own machine and scrolling down. Sessions live at `~/.dsh/sessions/<workspace>/session-*/session.v4.jsonl.zstd`, the directory name flattened from the project path, one subfolder per session. In Aug that file was `session.jsonl.zstd`, with no version suffix.',
            source: { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'code',
            lang: 'bash',
            title: '先找到会话文件在哪',
            code: `ls ~/.dsh/sessions/`,
            note: { zh: '目录名由项目路径压平而来，一场会话一个子文件夹；那个 `.zstd` 文件是压缩的、不是加密的，解开就能读。', en: 'The directory name is flattened from the project path, one subfolder per session; that `.zstd` file is compressed, not encrypted - open it and it reads plainly.' },
          },
          {
            type: 'code',
            lang: 'bash',
            title: '确认它是压缩而不是加密',
            code: `xxd -l 16 ~/.dsh/sessions/*/session-*/session.v4.jsonl.zstd`,
            note: { zh: '开头魔数是 28b5 2ffd，也就是标准 zstd 帧；解一行命令就能开，不是加密。', en: 'The leading magic is 28b5 2ffd, a plain zstd frame: one command opens it. It is compressed, not encrypted.' },
          },
          {
            type: 'code',
            lang: 'bash',
            title: '数一数模型手里有几件工具',
            code: `zstd -dc ~/.dsh/sessions/*/session-*/session.v4.jsonl.zstd | python3 -c "import json,sys; [print(len(d['data']['header']['tools'])) for d in map(json.loads, sys.stdin) if d.get('type')=='request/header']"`,
            note: { zh: '10月番茄钟那一场打出来是 31；8月的文件名不带 .v4，同一条思路打出来是 25。', en: 'The Oct pomodoro run prints 31; drop the .v4 for the Aug file and the same idea prints 25.' },
          },
          {
            type: 'code',
            lang: 'bash',
            title: '翻原文',
            code: `zstd -dc ~/.dsh/sessions/*/session-*/session.v4.jsonl.zstd | head`,
          },
          {
            type: 'callout',
            tone: 'tip',
            title: { zh: '路径里的星号会把所有会话卷进来', en: 'The glob sweeps in every session' },
            zh: '只想看一场，就把 `*` 换成那一场的目录名。系统提示词全文在同一场日志的 `system/message` 那条记录里，把命令里的 `type` 换一下就能打出来。这一节所有东西都是从这类命令的输出里翻出来的。',
            en: 'To read one session only, replace the `*` with that session folder name. The full system prompt sits in the `system/message` record of the same log; swap the `type` in the command and it prints. Everything in this chapter came out of commands like these.',
          },
        ],
      },
      {
        id: 'event-types',
        title: { zh: '44行里，模型只看见6行', en: 'Six of Forty-Four Lines' },
        blocks: [
          {
            type: 'table',
            head: [
              { zh: '记录', en: 'Record' },
              { zh: '行数', en: 'Lines' },
              { zh: '这是什么', en: 'What it is' },
            ],
            rows: [
              [{ zh: 'assistant/chunk', en: 'assistant/chunk' }, { zh: '13', en: '13' }, { zh: '模型一个词一个词吐出来的原始碎片', en: 'Raw fragments as the model streamed token by token' }],
              [{ zh: '三种打包行', en: 'Three packed lines' }, { zh: '7', en: '7' }, { zh: '同类碎片连着来三条以上，就压成一行存', en: 'Three or more consecutive fragments collapsed into one line' }],
              [{ zh: 'user/message', en: 'user/message' }, { zh: '3', en: '3' }, { zh: '模型收到的三条：我打的那句、运行时状态、可用技能目录', en: 'The three the model received: the prompt, runtime state, skill catalog' }],
              [{ zh: 'assistant/message', en: 'assistant/message' }, { zh: '2', en: '2' }, { zh: '两轮各组装出一条完整的助手回复', en: 'One assembled assistant reply per turn' }],
              [{ zh: 'step/start · step/end', en: 'step/start and step/end' }, { zh: '4', en: '4' }, { zh: '两次「想一下、调个工具」的起止', en: 'Open and close of two think-then-call steps' }],
              [{ zh: 'agent/inbox/spliced', en: 'agent/inbox/spliced' }, { zh: '2', en: '2' }, { zh: '我那句话进队列、出队列', en: 'The message entering and leaving the queue' }],
              [{ zh: '标题相关', en: 'Title records' }, { zh: '3', en: '3' }, { zh: '先拿前13个字凑合当标题，再叫模型起了个正式的', en: 'First 13 characters as a stub title, then a real title from the model' }],
              [{ zh: 'turn/start · turn/end', en: 'turn/start and turn/end' }, { zh: '2', en: '2' }, { zh: '这一整轮的开和关', en: 'The whole turn opening and closing' }],
              [{ zh: 'tool/call · tool/result', en: 'tool/call and tool/result' }, { zh: '2', en: '2' }, { zh: '它决定跑 `ls -la`，以及跑完拿回了什么', en: 'The decision to run `ls -la` and what came back' }],
              [
                { zh: 'request/header · request/context', en: 'request/header and request/context' },
                { zh: '2', en: '2' },
                { zh: '发给模型那个信封的完整快照', en: 'A full snapshot of the envelope sent to the model' },
              ],
              [{ zh: '权限三件套', en: 'Three permission records' }, { zh: '3', en: '3' }, { zh: '开工前把权限、沙箱、审批策略各记一条', en: 'Permission, sandbox and approval policy each logged before work starts' }],
              [{ zh: '文件头', en: 'File header' }, { zh: '1', en: '1' }, { zh: '会话id、创建时间、工作目录', en: 'Session id, creation time, working directory' }],
              [{ zh: '合计', en: 'Total' }, { zh: '44', en: '44' }, { zh: '其中只有6行带「模型可见」标记', en: 'Only six of them carry the model-visible mark' }],
            ],
            note: { zh: '44 是文件行数，不是事件数：那7行打包行每行装着好几条碎片，事件编号一路排到125。产品当时一共定义了44种事件类型，跟44行纯属巧合。', en: 'Forty-four is a line count, not an event count: the seven packed lines each carry several fragments, so event ids run up to 125. The product defined 44 event types at the time - the match with 44 lines is pure coincidence.' },
            source: { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'list',
            zh: [
              '**模型可见的只有 6 行**：三条 `user/message`、两条 `assistant/message`、一条 `tool/result`。',
              '**剩下 38 行模型一个字都读不到**：权限记录、沙箱模式、轮次边界、原始碎片、给标题起名字那次单独的模型调用，全部只进日志，不进上下文。',
              '**事件类型层面**：8月整个产品定义的 44 种事件里只有 3 种是模型看得见的（你说了什么、它说了什么、工具返回了什么），其余 41 种是记给你和给审计看的；到10月，62 种里模型看得见 5 种，多出来的两种是系统消息和开发者消息。',
            ],
            en: [
              '**Six lines are model-visible**: three `user/message`, two `assistant/message`, one `tool/result`.',
              '**The other 38 lines are unreadable by the model**: permission records, sandbox mode, turn boundaries, raw fragments, and the separate model call that generated the title all go to the log, never into context.',
              '**At the type level**: of the 44 event types the product defined in Aug, only 3 were model-visible (what you said, what it said, what a tool returned); the other 41 exist for you and for auditors. By Oct, 5 of 62 types are model-visible - the two extra ones are system and developer messages.',
            ],
          },
          {
            type: 'p',
            zh: '10月的0.2版把存法改了：会话文件名变成 `session.v4.jsonl.zstd`，每个事件占一行，那种单独的 `assistant/chunk` 碎片行不见了，逐字吐出的内容连同时间间隔嵌进了每条助手消息里。番茄钟那一场（17步、一个573行的文件）落下 **165 行、22 种事件类型**，多出来的有「工作区改动」「会话日志上传已被接收」这类。',
            en: 'The Oct 0.2 release changed how things are stored: the file became `session.v4.jsonl.zstd`, one event per line, and the standalone `assistant/chunk` rows disappeared - the verbatim stream, with its timing gaps, now rides inside each assistant message. The pomodoro run (17 steps, one 573-line file) left **165 lines across 22 event types**, adding kinds such as workspace mutation and session-log-upload-acknowledged.',
          },
          {
            type: 'callout',
            tone: 'idea',
            title: { zh: '一个类比，以及它在哪里失真', en: 'One analogy, and where it breaks' },
            zh: '像一场庭审：书记员把一切都记下来，谁几点进来、哪次异议被驳回、休庭多久；陪审团只听三样，证人的话、律师的话、呈上来的证物。**失真在这儿**：陪审团听到的是「现场发生的」，模型看到的是「现算出来的」。它的历史不是攒起来的，是每次发请求时从日志里重新投影一遍。所以「模型忘了」和「日志丢了」在这个产品里是两件完全不同的事。',
            en: 'It resembles a trial: the clerk records everything - who entered when, which objection was overruled, how long the recess lasted - while the jury hears only three things, witness words, counsel words, and exhibits. **Where it breaks**: a jury hears what happened on site, whereas the model sees what was recomputed. Its history is not accumulated but re-projected from the log before every request. So "the model forgot" and "the log lost it" are two entirely different events in this product.',
          },
        ],
      },
      {
        id: 'invariant',
        title: { zh: '一条写死的规矩', en: 'An Invariant Hard-Coded in the Repo' },
        blocks: [
          {
            type: 'quote',
            zh: 'Model-visible ⟺ logged：任何进到模型请求里的东西，都必须能从会话日志里重建出来；新增一种模型可见的输入，就必须新增一种会话事件。',
            en: 'Model-visible if and only if logged: anything that enters a model request must be reconstructible from the session log; add a kind of model-visible input and you must add a kind of session event.',
            cite: {
              zh: '仓库根目录的开发规约（橙皮书中译）',
              en: 'Root-level development convention of the repo (translated in the Orange Book)',
            },
            source: { label: '上游仓库 / DeepSeek-Harness', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
          },
          {
            type: 'p',
            zh: '"模型看到的一切都会写进日志"听起来像宣传语，实际上它是一条写死的规矩，翻成人话就是**它在跟你保证「我没有偷偷给模型看别的东西」**。而且这句保证每次发请求之前都要被代码自己比对一遍：把这一次真要发出去的消息列表，跟从日志重新算一遍应该得到的消息列表放在一起比，模型、系统提示词、温度、输出上限、工具清单等六项逐项比。对不上，抛异常，这次请求发不出去。',
            en: 'That slogan is in fact a hard-coded rule, and in plain language it says: **I promise I did not sneak anything else into the model\'s view**. The promise is machine-checked before every request - the message list about to be sent is compared against the list recomputed from the log, field by field across six items including model, system prompt, temperature, output limit and tool list. On any mismatch it throws, and the request does not go out.',
          },
          {
            type: 'list',
            ordered: true,
            zh: [
              '**缓存自动命中**：日志只追加不改写，投影出来的请求天然就是上一次请求的延长，模型那边的缓存自动命中。官方的原话是「稳定性是涌现出来的，不是管出来的」，这条也是省钱的那条。',
              '**逐字节可复原**：在绝大多数 agent 产品里，「模型到底看到了什么」是一个没有人能回答的问题——系统提示词运行时拼、工具描述运行时生成、插件往上下文里塞了谁也不清楚，出事只能猜。在这里它能逐字节复原。',
              '**分叉、恢复、回放共用一套状态**：见下一节的三种读法。',
            ],
            en: [
              '**Cache hits come free**: an append-only log means each projected request is naturally a continuation of the previous one, so the provider cache hits. Their own words are "stability emerges, it is not managed" - and this is also the money-saving one.',
              '**Byte-for-byte reconstruction**: in most agent products "what did the model actually see" is an unanswerable question, because the system prompt is assembled at runtime, tool descriptions are generated at runtime, and nobody knows what a plugin injected. Here it can be restored byte for byte.',
              '**One set of state serves fork, resume and replay**: see the three reads below.',
            ],
          },
          {
            type: 'checklist',
            title: { zh: '这条不变量在实践上意味着什么', en: 'What the invariant buys in practice' },
            items: [
              {
                zh: '每次请求前，真发出去的消息列表和从日志重投影的列表逐项比对，不一致就抛异常。',
                en: 'Before every request the outgoing message list is compared field by field against the log projection; any mismatch throws.',
              },
              {
                zh: '新增一种模型可见输入，必须同时新增一种会话事件，否则这道比对过不去。',
                en: 'A new kind of model-visible input requires a new kind of session event, otherwise the check will not pass.',
              },
              {
                zh: '「模型忘了」和「日志丢了」是两个独立故障，排查方向完全不同。',
                en: 'The model forgetting and the log losing data are two independent failures, with different debugging directions.',
              },
              {
                zh: '出问题时可以打包真实日志交给别人复现，不需要交出 API 密钥。',
                en: 'When something breaks you can hand over the packaged log for someone else to reproduce, without sharing an API key.',
              },
            ],
          },
        ],
      },
      {
        id: 'what-the-model-saw',
        title: { zh: '把它给模型看的东西挖出来', en: 'Digging Out What It Showed the Model' },
        blocks: [
          {
            type: 'p',
            zh: '那两条 `request/header` 记的是发给模型那个信封的完整快照：用了哪个模型、多少输出上限、系统提示词的全文、工具清单的全文。作者从里面直接拿到了三样官方文档没有的东西。',
            en: 'The two `request/header` records hold a complete snapshot of the envelope sent to the model: which model, what output ceiling, the full system prompt, the full tool list. From them the author pulled three things the official docs do not publish.',
          },
          {
            type: 'cards',
            items: [
              {
                icon: 'scroll',
                title: { zh: '完整系统提示词', en: 'The full system prompt' },
                desc: { zh: '8月标准模式 4,100 个字符，10月 5,608 个，逐字原文。开头是 You are an AI agent powered by DeepSeek Harness.，后面全是行为规矩：看文本用 read 工具别用 cat、每个 bash 结果的退出码标记都要检查、后台任务编号要记住别忙等也别重复跑。', en: '4,100 characters in the Aug standard mode, 5,608 in Oct, verbatim including punctuation. It opens with "You are an AI agent powered by DeepSeek Harness." and the rest is behaviour rules: use read for text files rather than cat, check the exit-code marker on every bash result, remember background task ids, do not busy-wait, do not re-run.' },
              },
              {
                icon: 'wrench',
                title: { zh: '那一刻挂着的工具', en: 'The tools attached at that moment' },
                desc: { zh: '8月 25 件、10月 31 件，逐个有名有姓：读、写、编辑、搜索、跑命令、开子代理、发消息、定目标、起工作流。这份名单出自无界面模式实跑；网页标准模式那份也是 25 件，但内容不完全一样——这边有 str_replace_editor，那边有 ask_user_question。', en: '25 in Aug, 31 in Oct, each named: read, write, edit, search, run a command, spawn a subagent, send a message, set a goal, start a workflow. The list came from a headless run; the web standard mode also had 25 but not identical content - the headless side has str_replace_editor, the web side has ask_user_question.' },
              },
              {
                icon: 'library',
                title: { zh: '本机技能目录', en: 'The local skill catalog' },
                desc: { zh: '一万六千多字符，原样躺在一条 `user/message` 里。8月是 57 个技能的名字和描述，作者一个字都没配置过，它自己扫出来塞进去的。10月这条旁边多了一条全局规则，就是 `~/.agents/AGENTS.md` 的全文，来源标得清清楚楚。', en: 'Over sixteen thousand characters sitting verbatim in one `user/message`. In Aug it was the names and descriptions of 57 skills the author had never configured for this product - it scanned them itself. In Oct a global rule rides alongside: the full text of `~/.agents/AGENTS.md`, with its origin clearly labelled.' },
              },
            ],
          },
          {
            type: 'list',
            zh: [
              '**新增防注入**：10月加了「网页搜索和抓取回来的内容是不可信的外部数据」这类话。',
              '**新增交付说明**：多了一大段讲交付文件卡片怎么用、回答里引用文件要带行号链接。',
              '**挪走工作目录**：工作目录那句话从系统提示词移进了每轮的运行时上下文。',
            ],
            en: [
              '**New anti-injection wording**: Oct adds lines such as web search and fetch results are untrusted external data.',
              '**New delivery instructions**: a long passage on how to use delivery file cards and how to cite files with line-number links.',
              '**Working directory relocated**: that sentence moved out of the system prompt into the per-turn runtime context.',
            ],
          },
          {
            type: 'p',
            zh: '网页版会话里有个页签，中文就叫**「轨迹」**（设置里「显示代码工作视图」开着时才有，出厂是开的），长得像浏览器开发者工具的网络面板：一行一条记录，粗线分轮次，顶部时间轴按真实起止时刻从左往右画。助手那条时间条还被切成两段——第一个字吐出来之前的等待和吐字的过程，颜色不一样，比例是真的。轨迹里每一条塞给模型的上下文都标着是谁塞的：那次实跑的三条 `user/message` 来源分别写着「用户」「`@deepseek-ai/dsh-system-prompt`」和「skill-catalog」。',
            en: 'The web session has a tab called **Trace** in Chinese, available while Show code work view is on in settings (on by default). It looks like a browser network panel: one record per row, thick rules between turns, a timeline across the top drawn from real start and end times. The assistant bar is split in two - wait-to-first-token versus streaming - in different colours, at true proportions. Every piece of context injected into the model is labelled with who injected it: the three `user/message` rows in that run were attributed to the user, to `@deepseek-ai/dsh-system-prompt`, and to skill-catalog.',
          },
          {
            type: 'callout',
            tone: 'note',
            title: { zh: '宁可丑，不可失真', en: 'Rather ugly than false' },
            zh: '来源标签里那个是 npm 包名，挺难看，是他们主动选的。更省事的做法是在界面里存一张对照表把包名翻译成好看的中文，这个方案被明确否掉：**一份恢复出来的日志，它的生产者可能已经不在了，但仍然得渲染出来**。标签从日志里读，一年前的会话、别人机器上产生的日志、某个已经改了名的插件，界面照样认得；存对照表的话这些场景恰好全部失效。代价他们也写明：想要好看的标签，自己在记录里写一个。',
            en: 'That source label is an npm package name, ugly, and chosen deliberately. The cheaper route - a lookup table in the UI that translates package names into pretty labels - was explicitly rejected: **a recovered log may have been produced by something that no longer exists, and it still has to render**. Read the label from the log and a year-old session, a log produced on someone else\'s machine, or a plugin that has since been renamed all still render; with a lookup table exactly those cases fail. The cost is stated plainly: want a pretty label, write one into the record yourself.',
            source: { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
        ],
      },
      {
        id: 'context-shaping',
        title: { zh: '压缩、裁剪、外溢，三样别混', en: 'Compaction, Trim, Spill: Three Different Things' },
        blocks: [
          {
            type: 'p',
            zh: '你在别的 agent 里敲 `/compact`，发生的是一大片对话被换成一段摘要，原文没了，你只能相信那段摘要，出问题回不去。这里不一样：**被压掉的事件一条不少地留在日志原位**，只是从模型可见的那一面被遮住了；摘要是另外新写的一条消息，上面标着「我遮住了第几条到第几条」。作者翻了仓库自带的一份压缩样本，被压掉那条事件的编号是 4，它还在文件里，位置都没动；同一段还记着这段摘要是哪个模型写的、限了多少 token、实际花了多少，所以「这段摘要是谁写的」有一个持久的答案。',
            en: 'Type /compact in other agents and a large span of dialogue is replaced by a summary; the original is gone, you must trust the summary, and there is no way back. Here it is different: **the compacted events stay in the log, not one fewer, at their original positions**, merely hidden from the model-facing side. The summary is a separately written message labelled with the range of ids it covers. In the sample compaction shipped in the repo, the compacted event still has id 4 and had not moved; the same region also records which model wrote the summary, its token cap and its actual cost, so "who wrote this summary" has a durable answer.',
          },
          {
            type: 'diagram',
            id: 'compaction',
            caption: { zh: '日志原文一条不动，遮住的只是模型那一面：摘要带着「我遮住了第4到第几条」另起一行，顺序从便宜到贵是外溢、裁剪、压缩。', en: 'Nothing in the log moves; only the model-facing side is masked. The summary is a separate line stating the id range it covers, and the order from cheap to expensive is spill, trim, compaction.' },
          },
          {
            type: 'table',
            head: [
              { zh: '机制', en: 'Mechanism' },
              { zh: '什么时候动手', en: 'When it acts' },
              { zh: '模型还拿得回原文吗', en: 'Can the model get the original back' },
              { zh: '要不要花钱', en: 'Does it cost money' },
            ],
            rows: [
              [
                { zh: '外溢（spill）', en: 'Spill' },
                { zh: '某一条工具结果太大，当场就存成文件', en: 'One tool result is too large, so it is written out to a file on the spot' },
                { zh: '能，给了它文件路径，想看可以自己去读', en: 'Yes - it gets a path and may read it back' },
                { zh: '不用，不调模型', en: 'No - no model call' },
              ],
              [
                { zh: '裁剪（trim）', en: 'Trim' },
                { zh: '上下文压力上来了，先机械地把老的工具结果掐头去尾', en: 'Context pressure rises, so old tool results are mechanically cut at head and tail' },
                { zh: '不能，中间那段对模型永久消失', en: 'No - the middle is permanently gone for the model' },
                { zh: '不用，不调模型', en: 'No - no model call' },
              ],
              [
                { zh: '压缩（compact）', en: 'Compaction' },
                { zh: '裁完还是满，才叫模型把老对话总结成一段', en: 'Only when still full after trimming does a model summarise the old dialogue' },
                { zh: '不能', en: 'No' },
                { zh: '要，一次模型调用', en: 'Yes - one model call' },
              ],
            ],
            note: { zh: '顺序是从便宜到贵。裁完会重新量一次，压力降下去了就不叫模型。三样都不改日志，改的只是模型那一面。', en: 'Cheapest first. After trimming, pressure is measured again and no model is called if it dropped. None of the three touches the log; all three change only the model-facing side.' },
          },
          {
            type: 'p',
            zh: '外溢和裁剪这两层实跑验过：造一个 **171,000 字节**的文件让它 `cat`，截断当场发生，模型看到的结果里带着两行提示，一行说完整输出在哪个临时文件里，一行说**被省略了 14,385 字节**、完整结果存在哪、可以用 read 或 grep 去查。倒推回去，剩下的内容正好压在 **五万字节**的上限以内，一字节不差。第三层的压缩没跑到——那一场没把上下文顶到需要叫模型总结的位置，所以压缩触发之后是什么行为，书里每一句都来自源码和文档，不是实测。',
            en: 'Spill and trim were verified on a real run: feed it a **171,000-byte** file through `cat` and truncation happens immediately, with two hint lines in what the model sees - one naming the temp file holding the full output, one saying **14,385 bytes were omitted**, where the complete result lives, and that read or grep can query it. Working backwards, what remained sits exactly inside the **50,000-byte** ceiling, to the byte. The third layer, compaction, never fired in that session, so everything the book says about post-trigger behaviour comes from source and docs, not measurement.',
            source: { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '外溢文件不在 ~/.dsh/ 里，而且不回收', en: 'Spilled files are not under ~/.dsh/ and are never reclaimed' },
            zh: '外溢出来的那些文件在**系统临时目录**下面，每跑一次 dsh 就新建一个，不回收。作者本机跑了几次之后有 16 个这样的目录，绝大多数是空的。哪天你要清干净，别只盯着 `~/.dsh/`。',
            en: 'Spilled files land in the **system temp directory**, and a new one is created for every dsh run with nothing reclaimed. After a few runs the author\'s machine held 16 such directories, most of them empty. When you clean up, do not look only at `~/.dsh/`.',
          },
        ],
      },
      {
        id: 'replay-and-price',
        title: { zh: '三种读法，和它的代价', en: 'Three Reads, and Their Price' },
        blocks: [
          {
            type: 'steps',
            items: [
              {
                title: { zh: '分叉：从半路换一条线', en: 'Fork: branch from partway through' },
                desc: { zh: '聊到第20轮觉得走错了，想回到第12轮换个说法重来，同时保留原来那条线。做法是把日志前面那一段拷出来当种子，造一个新会话。一条规矩：切口必须落在一整轮的外面，切在半轮中间直接拒绝，不给你偷偷截齐。', en: 'Twenty turns in and you know it is wrong, so you want to go back to turn 12 with different wording and keep the original line. Copy the head of the log as a seed and create a new session. One rule: the cut must fall outside a complete turn; a cut in the middle of a half turn is refused outright, never silently rounded.' },
              },
              {
                title: { zh: '恢复：整份日志当种子', en: 'Resume: the whole log as the seed' },
                desc: { zh: '关掉终端第二天再打开，就是把整份日志读出来当种子。跨项目恢复之后，这台机器上每个项目的会话日志都堆在同一个目录里。', en: 'Close the terminal and reopen it the next day: the entire log is read back as the seed. Since cross-project resume landed, every project\'s session logs on a machine pile into one directory.' },
              },
              {
                title: { zh: '回放：拿日志当剧本', en: 'Replay: the log as a script' },
                desc: { zh: '拿一份真实日志当剧本，不用 API 密钥就能把整个流程重跑一遍。这本来是他们内部的测试设施，对你的含义是：出错现场可以打包，别人拿到能复现。', en: 'Take a real log as a script and run the whole flow without an API key. It began as their internal test harness; for you it means a failure scene can be packaged and reproduced by someone else.' },
              },
            ],
          },
          {
            type: 'p',
            zh: '这三件事在别的产品里通常是三套独立机制，这里是同一个动作的三种叫法，好处是它们的行为不会互相打架，因为**根本就没有三份状态**。',
            en: 'In other products these are usually three independent mechanisms. Here they are one operation with three names, so their behaviour cannot fight each other - **there simply is not a third copy of the state**.',
          },
          {
            type: 'quote',
            zh: '这次工具调用在被记录之后中断了，但没有任何结果被持久记录。它的结局未知。要不要重试，请从这个工具的语义出发判断：只有当操作是只读或幂等时才重试；如果它可能有副作用，先去核实外部状态或者问用户。不要盲目重试。',
            en: 'This tool call was interrupted after it was recorded, and no result was ever persisted. Its outcome is unknown. Decide whether to retry from the semantics of this tool: retry only if the operation is read-only or idempotent; if it may have side effects, verify external state first, or ask the user. Do not retry blindly.',
            cite: {
              zh: '崩溃后系统为那次调用合成的工具结果（§12）',
              en: 'The tool result the system synthesises for an interrupted call after a crash (section 12)',
            },
            source: { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'list',
            zh: [
              '**另一条文案给的是没来得及开始的那种**：这次调用在被记录为已开始之前就中断了，如果还需要，重试即可。两句话的差别，是「我不知道那个删除命令有没有执行」和「那个删除命令肯定没执行」的差别。断电重启之后，它把不确定性原样交给模型，并当场给出判断规则；这套机制10月还在，文案是8月抄的。',
              '**磁盘**：8月仓库里有一份最小样本，任务是「跑个 echo 然后回一个词」，留下 35 条物理记录；那句「有哪些文件」是 44 行。这就是「每一次运行都有迹可循」的字面价格。',
              '**一直涨**：官方原文写得很坦白——本决策不引入任何保留期策略。也就是没有自动清理，磁盘是你的。',
              '**格式会变**：8月会话格式版本号是 0，明说老格式直接拒读、不做迁移；两个月里从 0 升到 4，这一代做了迁移，每一代都有到下一代的转换，老文件原样保留、新版本另存一份。所以你的 `~/.dsh/sessions/` 里可能同一场会话躺着两代文件。',
              '**删不掉**：只追加、不改写是全部好处的来源，也意味着你说过的每句话都留在硬盘上某个地方。你可以整个删掉那个文件夹，但没法「从这段对话里精确抹掉某一句」，那等于打断整条链子。',
            ],
            en: [
              '**A second wording covers a call that never started**: the call was interrupted before being recorded as started, so just retry if you still need it. The difference between the two sentences is the difference between "I do not know whether that delete ran" and "that delete definitely did not run". After a power-cut restart the uncertainty is handed to the model as-is, together with an on-the-spot decision rule; the mechanism was still present in Oct, and the wording quoted here was written in Aug.',
              '**Disk**: the repo carried a minimal sample in Aug - the task was run an echo and reply with one word, and it left 35 physical records. The "which files are here" question left 44 lines. That is the literal price of every run leaving a trace.',
              '**It only grows**: the decision text is blunt - this decision introduces no retention policy at all. No automatic cleanup; the disk is yours.',
              '**The format changes**: the Aug session format was version 0 and old files were refused outright with no migration. In two months it went 0 to 4, and this generation does migrate - each generation converts to the next, the old file is kept and the new one saved alongside. So one session may sit in `~/.dsh/sessions/` as two generations of files.',
              '**You cannot delete selectively**: append-only is the source of every benefit, and it also means every sentence you said remains somewhere on disk. You may remove the whole folder, but you cannot precisely erase one sentence from a conversation - that would break the chain.',
            ],
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '这三样我一次都没实跑过', en: 'None of these three was actually run' },
            en: 'One thing the author did not verify: if you fork at step 5, do the files already changed by steps 6 to 10 get rolled back? The research never found a clear answer, and the lean is that they do not, because a fork copies the log, not your hard drive. But fork, resume and replay were never run in anger by the author, so do not take that on faith - nor any wording in this chapter about them.',
            zh: '有一条作者没验：如果从第5步分叉，那第6到10步已经改过的文件会不会回滚？调研到最后也没找到明确答案，他倾向于认为不会，因为分叉复制的是日志，不是你的硬盘。但分叉、恢复、回放这三样他一次都没实跑过，这条别照着书里说的信。',
          },
          {
            type: 'callout',
            tone: 'idea',
            title: { zh: '被否掉的方案：信封比内容还大', en: 'Rejected: the envelope bigger than the letter' },
            zh: '2026年6月20日有人提案：别再一条条存模型吐字的原始碎片了，只留组装好的完整消息。理由很实在，日志被这些几十字节的小东西撑爆了。提案被否，理由分两半：一半是失败的流——模型吐了一半崩掉的内容只活在碎片里，撞上输出上限的那一轮甚至没有完整消息，只有碎片承载着账单；另一半是无密钥回放整个建立在这些碎片上。结论一句话：**除非有一个一点信息都不丢的替代品，否则不能删**。他们最后选择去压缩存储格式，没有剪掉内容。到10月单独的碎片行没了，因为9月1日一篇设计笔记把带时间的逐字流嵌进了每条助手消息，失败的那次尝试另记一条——「记全」这条底线没动，只是换了地方。',
            en: 'On 2026-06-20 someone proposed stopping the per-fragment storage of raw streaming and keeping only assembled messages. The reason was solid: logs were stuffed with dozens of tiny records, the envelope bigger than the letter. It was rejected, for two halves of one reason. First, failure flows: content the model streamed and then crashed on lives only in fragments, and a turn that hit the output ceiling has no complete message at all - only fragments carry the bill. Second, keyless replay is built entirely on those fragments. The conclusion in one line: **nothing may be deleted unless there is a substitute that loses no information**. They compressed the storage format instead of cutting content. By Oct the standalone fragment rows were gone because a design note on 2026-09-01 embedded the timed verbatim stream inside each assistant message, with a failed attempt recorded separately. The line "record everything" did not move; it changed address.',
          },
          {
            type: 'p',
            zh: '这套东西的收益全在「出事之后」，成本却是天天在付。顺的时候你完全用不上它；一旦不顺，它能让你不靠猜。想知道某一轮到底发了什么，接着看[第 6 章](/chapter/cost)把账单从同一份日志里逐项拆出来。',
            en: 'Every benefit of this design lives after something goes wrong, while the cost is paid daily. When things run smoothly you never use it; when they do not, it lets you stop guessing. To see what was actually sent in one turn, [chapter 6](/chapter/cost) itemises the bill from the same log.',
          },
          {
            type: 'links',
            title: { zh: '接着往下', en: 'Where to go next' },
            items: [
              {
                label: { zh: '第 6 章：一次任务到底多少钱', en: 'Chapter 6: what one task actually costs' },
                href: '/chapter/cost',
                desc: { zh: '同一份日志，拆成账单。', en: 'The same log, turned into a bill.' },
                tag: 'internal',
              },
              {
                label: { zh: '错误博物馆：它出过什么事', en: 'Error museum: what has gone wrong' },
                href: '/errors',
                desc: { zh: '崩溃恢复那段文案的出处（橙皮书 §12）。', en: 'Where the crash-recovery wording comes from (Orange Book section 12).' },
                tag: 'internal',
              },
              {
                label: { zh: '橙皮书原文', en: 'The Orange Book' },
                href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/',
                desc: { zh: '§05 每一次运行都有迹可循。', en: 'Section 05, every run leaves a trace.' },
                tag: 'source',
              },
              {
                label: { zh: '上游仓库', en: 'Upstream repository' },
                href: 'https://github.com/deepseek-ai/DeepSeek-Harness',
                desc: { zh: 'Model-visible 那条开发规约在仓库根目录。', en: 'The model-visible development convention sits at the repo root.' },
                tag: 'source',
              },
            ],
          },
        ],
      },
    ],
    sources: [
      { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
      { label: '上游仓库 / DeepSeek-Harness', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
      { label: 'DeepSeek API 文档 / DeepSeek Docs', href: 'https://api-docs.deepseek.com/' },
    ],
    sisters: ['agent-observability-patterns', 'agent-memory-patterns'],
  },
  {
    slug: 'cost',
    num: '06',
    part: 'core',
    icon: 'coins',
    level: 'builder',
    minutes: 18,
    accent: 'orange',
    title: { zh: '一次任务到底多少钱', en: 'What One Task Actually Costs' },
    subtitle: {
      zh: '一句29个token的提问，先付了13,809个token的入场费。',
      en: 'A 29-token question first paid an entry fee of 13,809 tokens.',
    },
    promise: {
      zh: '读完这章，你能从自己的会话日志里把一场任务的账单逐项拆出来，并算清入场费、缓存命中和高峰价各自吃掉多少。',
      en: 'You will be able to itemise one task from your own session log and work out how much the entry fee, the cache hits and peak pricing each consume.',
    },
    sections: [
      {
        id: 'two-paths',
        title: { zh: '两条付费的路，都没有包月', en: 'Two Ways to Pay, Neither Flat-Rate' },
        blocks: [
          {
            type: 'p',
            zh: '第一屏让你选「登录 DeepSeek 账号」还是「添加 API Key」。按发布说明，登录走的是 DeepSeek 平台账号的余额和赠金，作者没看到包月。**它仍然没有「包月」**：不管走哪条路，都是用多少扣多少。',
            en: 'The first screen asks you to sign in with a DeepSeek account or add an API key. Per the release notes, sign-in spends the balance and grants on your DeepSeek platform account, and no flat plan was found. **There still is no flat plan**: on either path you pay for what you use.',
          },
          {
            type: 'table',
            head: [
              { zh: '产品', en: 'Product' },
              { zh: '计费结构', en: 'Billing structure' },
              { zh: '你实际感受到的', en: 'What you actually feel' },
            ],
            rows: [
              [
                { zh: 'Claude Code', en: 'Claude Code' },
                { zh: '订阅为主，也可挂 API key', en: 'Subscription first, an API key can be attached' },
                { zh: '额度用完就停，不是账单变大', en: 'It stops when the quota runs out; the bill does not grow' },
              ],
              [{ zh: 'Codex', en: 'Codex' }, { zh: '订阅为主，也可挂 API key', en: 'Subscription first, an API key can be attached' }, { zh: '同上', en: 'Same as above' }],
              [
                { zh: 'DSH', en: 'DSH' },
                { zh: 'DeepSeek 账号余额，或 API key，都按量', en: 'DeepSeek account balance or an API key, both metered' },
                { zh: '余额扣完会提示；API key 这边账单一直涨', en: 'A prompt when the balance runs out; on an API key the bill just keeps growing' },
              ],
            ],
          },
          {
            type: 'quote',
            zh: '订阅制是包月自助餐：交完钱吃到额度上限，服务员把你拦在门口，说下个窗口再来。按量制是点菜，不会有人拦你，但账单一直在长。',
            en: 'A subscription is an all-you-can-eat buffet: you pay, you eat up to the quota, and the staff stop you at the door until the next window. Metered billing is ordering a la carte - nobody stops you, but the ticket keeps growing.',
            cite: { zh: '橙皮书 §06', en: 'Orange Book, section 06' },
          },
          {
            type: 'callout',
            tone: 'note',
            title: { zh: '这个类比在哪里失真', en: 'Where the analogy breaks' },
            zh: '自助餐的额度是硬的，而 Claude 的订阅额度可以再买按量额度接着花，所以订阅的天花板也是软的；默认行为不同——订阅默认拦你，按量默认放行。账号余额那条路有一个「额度不足」的提示，作者没登录，没见过它长什么样。凭据的读取顺序到0.2版也改了：网页和桌面端优先用界面里保存的 key，其次才是启动时的环境变量、项目里的 `.env`、它自己家目录下的 `.env`；没有界面的命令行模式默认只看环境变量和 `.env`，不读界面里存的 key。这条来自 0.2.1-rc.1 的发布说明和凭据模块文档，未逐层验证。',
            en: 'A buffet quota is hard, but a Claude subscription quota can be topped up with metered credit, so that ceiling is soft too. The defaults differ: a subscription blocks you by default, metered spending proceeds by default. The account-balance path reportedly shows an insufficient-balance notice - the author never signed in and has not seen it. Credential resolution order changed by 0.2: web and desktop prefer the key saved in the UI, then the launch environment variable, then the project `.env`, then the `.env` in its own home directory; headless CLI mode looks only at environment variables and `.env` and does not read UI-saved keys. This comes from the 0.2.1-rc.1 release notes and the credentials module doc, unverified layer by layer.',
          },
        ],
      },
      {
        id: 'price-list',
        title: { zh: '10月的价目表', en: 'The October Price List' },
        blocks: [
          {
            type: 'p',
            zh: 'DeepSeek 的 API 价格这两个月动过两回：8月17日起改成峰谷定价；9月10日 V4.1-Flash 上线时下调了 Flash，Pro 不变；10月17日换成 V4.1-Flash-1017 只是换模型，价格没动。下面是10月20日官方中文价目页上的数，**单位是元每百万 token**。',
            en: 'DeepSeek API prices moved twice in these two months: peak/off-peak pricing from Aug 17; Flash was cut when V4.1-Flash launched on Sep 10 while Pro stayed; the Oct 17 swap to V4.1-Flash-1017 changed the model only, not the price. These are the figures on the official Chinese price page of Oct 20, **in RMB per million tokens**.',
            source: { label: 'DeepSeek 官方定价页 / DeepSeek Pricing', href: 'https://api-docs.deepseek.com/quick_start/pricing' },
          },
          {
            type: 'table',
            head: [
              { zh: '计费项', en: 'Billable item' },
              { zh: 'Flash（界面上的 DeepSeek-V4.1-Flash 1017）', en: 'Flash (shown in the UI as DeepSeek-V4.1-Flash 1017)' },
              { zh: 'Pro（DeepSeek-V4-Pro）', en: 'Pro (DeepSeek-V4-Pro)' },
            ],
            rows: [
              [{ zh: '输入，缓存命中（低谷 / 高峰）', en: 'Input, cache hit (off-peak / peak)' }, { zh: '0.02 / 0.04', en: '0.02 / 0.04' }, { zh: '0.15 / 0.30', en: '0.15 / 0.30' }],
              [{ zh: '输入，缓存未命中（低谷 / 高峰）', en: 'Input, cache miss (off-peak / peak)' }, { zh: '1 / 2', en: '1 / 2' }, { zh: '4.5 / 9', en: '4.5 / 9' }],
              [{ zh: '输出（低谷 / 高峰）', en: 'Output (off-peak / peak)' }, { zh: '4 / 8', en: '4 / 8' }, { zh: '13.5 / 27', en: '13.5 / 27' }],
            ],
            note: { zh: '高峰是北京时间工作日（法定节假日除外）上午9点到12点、下午2点到6点，其余都是低谷，低谷价正好是高峰价的一半。同一件活白天做和晚上做，钱差一倍。', en: 'Peak hours in Beijing time are weekdays (public holidays excepted) 09:00-12:00 and 14:00-18:00; everything else is off-peak, at exactly half the peak price. The same job done by day or by night differs by 2x.' },
          },
          {
            type: 'diagram',
            id: 'pricing-bars',
            caption: { zh: '同一件事的三种单价：缓存命中的输入几乎白送，未命中的输入贵五十倍，输出最贵——账单的重心永远在右边那根柱子上。', en: 'Three unit prices for the same token: a cache-hit input is nearly free, a miss costs fifty times more, and output is dearer still - the bill always leans on the right-hand bar.' },
          },
          {
            type: 'list',
            zh: [
              '**缓存命中价的两个口径**：Pro 现在是未命中价的 1/30，8月是 1/120；Flash 仍然是 1/50。',
              '**一笔新钱**：内置的联网搜索走官方 Search 和 Fetch 两个接口，各按**每千次成功请求 5 元**计，北京时间 11月1日零点起开始收费。',
              '**缓存按 64 个 token 一个存储单元计费**，不足 64 的不缓存；**缓存写入不收费**，寿命是几小时到几天。',
              '**模型名也换过一轮**：8月书里写的 `deepseek-v4-flash`，官方现在让你用 `deepseek-flash`，旧名暂时还能调，但会被路由到新模型、按新价收费。界面显示「DeepSeek-V4.1-Flash 1017」，会话日志里记的是 `deepseek-flash`，指的是同一个东西。',
            ],
            en: [
              '**Two cache-hit ratios**: Pro is now 1/30 of the miss price, and was 1/120 in Aug; Flash remains 1/50.',
              '**A new line item**: built-in web access goes through the official Search and Fetch endpoints, billed at **5 RMB per thousand successful requests each**, charging from 00:00 Beijing time on Nov 1.',
              '**Cache is billed in 64-token storage units** - anything under 64 is not cached; **cache writes are free**, and lifetime runs from hours to days.',
              '**The model name changed too**: the book wrote `deepseek-v4-flash` in Aug, while the official name now is `deepseek-flash`. The old name still resolves but is routed to the new model and billed at the new price. The UI shows DeepSeek-V4.1-Flash 1017, the session log records `deepseek-flash`, and they are the same thing.',
            ],
          },
          {
            type: 'p',
            zh: '作为对照，Anthropic 文档里写着 Claude Code 按量计费的实测：平均每个开发者每个活跃日约 **13 美元**，90% 的用户低于 **30 美元一天**。两边的任务、模型、工具集都不一样，谁划算这里不下结论。',
            en: 'For contrast, Anthropic documentation reports metered-billing measurements for Claude Code: about **13 US dollars per developer per active day on average**, with 90% of users below **30 dollars a day**. Tasks, models and tool sets differ on both sides, so no conclusion about who is cheaper is drawn here.',
            source: { label: 'Claude Code 文档 / Claude Code Docs', href: 'https://docs.anthropic.com/en/docs/claude-code/overview' },
          },
        ],
      },
      {
        id: 'real-bill',
        title: { zh: '两个真实任务的账', en: 'Two Real Tasks, Itemised' },
        blocks: [
          {
            type: 'p',
            zh: '两场都是10月的默认设置：标准模式（第二场是创造模式）、Flash、High 推理档，凌晨低谷时段跑的。账从会话日志里逐项读出来，算法就是三个数分别乘单价再相加。',
            en: 'Both ran in Oct with default settings: standard mode (creator mode for the second), Flash, the High reasoning tier, in the small hours during off-peak pricing. The bill is read item by item out of the session log - three numbers multiplied by their unit prices and summed.',
          },
          {
            type: 'table',
            head: [
              { zh: '番茄钟单文件网页（低谷价逐项算术）', en: 'Pomodoro single-file page (off-peak arithmetic)' },
              { zh: 'token', en: 'tokens' },
              { zh: '单价（元/百万）', en: 'Unit price (RMB per million)' },
              { zh: '小计', en: 'Subtotal' },
            ],
            rows: [
              [
                { zh: '缓存命中的输入', en: 'Cache-hit input' },
                { zh: '768,896', en: '768,896' },
                { zh: '0.02', en: '0.02' },
                { zh: '76.9 万 × 0.02 ≈ 0.0154 元，约1分5厘', en: '768.9k x 0.02 = about 0.0154 RMB' },
              ],
              [{ zh: '未命中的输入', en: 'Cache-miss input' }, { zh: '13,816', en: '13,816' }, { zh: '1', en: '1' }, { zh: '1.4 万 × 1 ≈ 0.0138 元，约1分4厘', en: '13.8k x 1 = about 0.0138 RMB' }],
              [{ zh: '输出', en: 'Output' }, { zh: '33,601', en: '33,601' }, { zh: '4', en: '4' }, { zh: '3.4 万 × 4 ≈ 0.1344 元，约1毛3', en: '33.6k x 4 = about 0.1344 RMB' }],
              [
                { zh: '合计（约 81.6 万 token，输入侧命中率 98.2%）', en: 'Total (about 816k tokens, 98.2% hit rate on input)' },
                { zh: '816,313', en: '816,313' },
                { zh: '—', en: '-' },
                { zh: '低谷约 0.16 元，高峰约 0.33 元', en: 'About 0.16 RMB off-peak, about 0.33 RMB at peak' },
              ],
            ],
            note: { zh: '这场活是 4分53秒、17步、写出一个573行的文件。输出 token 只占总量的 4%，却占了账单的八成多——缓存命中到 98% 之后，钱基本花在输出上。想省钱，少让它写长东西比少给它看东西有用。', en: 'The job took 4m53s and 17 steps and produced one 573-line file. Output tokens are 4% of the total but over 80% of the bill: once the cache hits 98%, the money goes to output. To spend less, make it write less rather than show it less.' },
            source: { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'table',
            head: [
              { zh: '项', en: 'Item' },
              { zh: '番茄钟单文件网页', en: 'Pomodoro single-file page' },
              { zh: '给自己造一个数汉字的插件（[第 7 章](/chapter/creator-mode)）', en: 'Building a Chinese-character counting plugin ([chapter 7](/chapter/creator-mode))' },
            ],
            rows: [
              [{ zh: '耗时', en: 'Wall clock' }, { zh: '4分53秒，17步', en: '4m53s, 17 steps' }, { zh: '2分26秒，49步', en: '2m26s, 49 steps' }],
              [{ zh: '缓存命中的输入', en: 'Cache-hit input' }, { zh: '768,896', en: '768,896' }, { zh: '2,802,176', en: '2,802,176' }],
              [{ zh: '未命中的输入', en: 'Cache-miss input' }, { zh: '13,816', en: '13,816' }, { zh: '66,796', en: '66,796' }],
              [{ zh: '输出', en: 'Output' }, { zh: '33,601', en: '33,601' }, { zh: '21,619', en: '21,619' }],
              [{ zh: '低谷价折算', en: 'Off-peak cost' }, { zh: '约 0.16 元', en: 'About 0.16 RMB' }, { zh: '约 0.21 元', en: 'About 0.21 RMB' }],
              [{ zh: '高峰价折算', en: 'Peak cost' }, { zh: '约 0.33 元', en: 'About 0.33 RMB' }, { zh: '约 0.42 元', en: 'About 0.42 RMB' }],
            ],
          },
          {
            type: 'p',
            zh: '8月用的是一件更小的活：读四个文件、写一份 README。当时的模型和价目表下，flash 约 2.4 分钱、pro 约 7 分钱，三十几秒跑完。这组数现在作废了，模型和价格都换过，留在这儿只为说明一件事：**两个模型的 token 用量几乎一样，Pro 贵出来的部分全来自单价，不是因为它更啰嗦。**',
            en: 'In Aug the job was smaller: read four files, write one README. Under the model and price list of the day, flash cost about 2.4 fen and pro about 7 fen, finishing in the thirties of a second. Those figures are now void - both model and price changed - and are kept for one point only: **the two models used almost the same number of tokens, so everything Pro costs more comes from the unit price, not from being more verbose.**',
          },
        ],
      },
      {
        id: 'entry-fee',
        title: { zh: '你打第一个字之前，已经付了一笔入场费', en: 'You Paid an Entry Fee Before Typing' },
        blocks: [
          {
            type: 'p',
            zh: '8月作者把一笔账拆开之后才发现，真正花钱的地方跟想的完全不一样。日志里那次请求的系统提示词和工具清单，逐块发给 API 称重、一项一项做差。那次第一个请求的未命中输入是 **13,838 个 token**，构成是这样（8月数据）：',
            en: 'Only after pulling one Aug bill apart did the author find that the money went somewhere unexpected. The system prompt and tool list recorded in the log were sent to the API block by block to be weighed, differenced one by one. The first request of that run had **13,838 uncached input tokens**, made up as follows (Aug data):',
            source: { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'table',
            head: [
              { zh: '组成部分', en: 'Component' },
              { zh: 'token', en: 'Tokens' },
              { zh: '占比', en: 'Share' },
            ],
            rows: [
              [{ zh: '25 个工具的说明书', en: 'Documentation for 25 tools' }, { zh: '6,510', en: '6,510' }, { zh: '47.0%', en: '47.0%' }],
              [{ zh: '本机 skill 目录清单', en: 'Local skill catalog' }, { zh: '6,242', en: '6,242' }, { zh: '45.1%', en: '45.1%' }],
              [{ zh: '系统提示词', en: 'System prompt' }, { zh: '844', en: '844' }, { zh: '6.1%', en: '6.1%' }],
              [{ zh: '运行环境快照', en: 'Runtime environment snapshot' }, { zh: '129', en: '129' }, { zh: '0.9%', en: '0.9%' }],
              [{ zh: '协议本身的固定开销', en: 'Protocol overhead' }, { zh: '82', en: '82' }, { zh: '0.6%', en: '0.6%' }],
              [{ zh: '我实际问的那句话', en: 'The question I actually typed' }, { zh: '29', en: '29' }, { zh: '0.2%', en: '0.2%' }],
            ],
            note: { zh: '一句话版本：我问了一句29个token的话，harness 替我先付了 13,809 个 token 的入场费。六项是逐项做差称出来的，相加是 13,836，跟日志里 13,838 那个真值差 2 个 token，来自取整——这类差值法有 ±2 量级的误差，别拿计算器较真。', en: 'In one line: I asked a 29-token question and the harness prepaid 13,809 tokens of entry fee. The six components were differenced out and sum to 13,836 against the logged truth of 13,838 - a two-token rounding gap. This differencing method carries an error of about plus or minus two tokens, so do not fight it with a calculator.' },
          },
          {
            type: 'diagram',
            id: 'cost-pie',
            caption: { zh: '8月入场费的构成：工具说明书 47% + 技能目录 45.1% 占掉九成二，系统提示词只有 6.1%，我真正问的那句话是一条看不见的窄缝。', en: 'The Aug entry fee: tool docs (47%) plus skill catalog (45.1%) take 92%, the system prompt is 6.1%, and the question actually typed is a sliver nobody can see.' },
          },
          {
            type: 'list',
            zh: [
              '**最贵的三件工具**是流程编排、命令行和那个专门做字符串替换的编辑器（代码里叫 `workflow`、`bash`、`str_replace_editor`），加起来 2,344 个 token，占工具预算的 36%。最贵的那件是 `workflow`，979 个 token，将近那句提问的 34 倍，**而它在这次任务里一次都没被调用**。',
              '**10月这笔入场费变重了**：番茄钟那一场第一个请求是 18,117 个 token，其中 17,920 个命中了缓存（前一场失败的会话已经把同样的开头焐热了）。构成没再逐项称重，只量了字符数——标准模式工具从 25 件变成 31 件，说明书 28,552 个字符；系统提示词 5,608 个字符；本机技能目录 16,062 个字符（这时 skill 池已经是 74 个）；另外多了一段8月没有的全局规则，4,790 个字符。结构跟8月一样，大头仍然是工具说明书和技能目录。',
              '**打个比方**：你跟一个新来的助理说「帮我看看这几个文件」，但每次开口之前都得先把员工手册、工具间清单、公司技能培训目录完整念一遍给他听，因为他上一句说完就失忆了。你那句话三秒，念手册二十分钟。',
            ],
            en: [
              '**The three dearest tools** are workflow orchestration, the shell, and the string-replacement editor (`workflow`, `bash`, `str_replace_editor` in code): 2,344 tokens together, 36% of the tool budget. The single dearest is `workflow` at 979 tokens, roughly 34 times the typed question - **and it was never called in that task**.',
              '**The fee got heavier by Oct**: the first request of the pomodoro run was 18,117 tokens, of which 17,920 hit the cache, because an earlier failed session had already warmed the same prefix. Components were not re-weighed, only measured in characters - standard mode went from 25 tools to 31 with 28,552 characters of documentation, the system prompt was 5,608 characters, the local skill catalog 16,062 characters (the skill pool had reached 74), plus a global-rules block that Aug did not have, 4,790 characters. Same shape as Aug: tool docs and the skill catalog dominate.',
              '**An analogy**: you tell a brand-new assistant to look at a few files, but before every request the staff handbook, the tool-room inventory and the training catalogue must be read out in full, because the assistant forgets everything after each sentence. Your sentence takes three seconds; the handbook takes twenty minutes.',
            ],
          },
          {
            type: 'code',
            lang: 'bash',
            title: '第一步：把信封从日志里捞出来',
            code: `zstd -dc ~/.dsh/sessions/*/session-*/session.v4.jsonl.zstd | python3 -c "import json,sys; [print(len(d['data']['header']['tools'])) for d in map(json.loads, sys.stdin) if d.get('type')=='request/header']"`,
            note: { zh: '10月番茄钟那一场打出来是 31 件工具；8月文件名不带 .v4，打出来是 25。系统提示词全文在同一场日志一条 system/message 记录里。', en: 'The Oct pomodoro run prints 31 tools; the Aug file has no .v4 and prints 25. The full system prompt is in one system/message record of the same session.' },
          },
          {
            type: 'code',
            lang: 'bash',
            title: '第二步：只为了看那张回执',
            code: `curl -s https://api.deepseek.com/chat/completions \\
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"model":"deepseek-flash","max_tokens":1,"messages":[{"role":"user","content":""}]}'`,
            note: { zh: 'max_tokens 设成 1，它不会真回答你，只把账单回给你；回执里的 prompt_tokens 就是这一块的重量。这条发的是空消息，量的是协议本身的固定开销。', en: 'Setting max_tokens to 1 stops it from actually answering and returns only the receipt; prompt_tokens in that receipt is the weight of the block. This call sends an empty message and measures the protocol overhead alone.' },
          },
          {
            type: 'code',
            lang: 'text',
            title: '第三步：全部用减法',
            code: `第一条 curl 发的是空消息，量出来是协议本身的 82 个 token。

系统提示词：把第一条 curl 里的 content 换成第一步从日志里捞出来的全文，原样再发一次。
    两次回执的 prompt_tokens 相减 = 844，就是表里「系统提示词」那一行。

工具说明书：整份清单发一次，拿掉其中一件再发一次，差出来的是那一件的价钱。
    workflow 单件 979；workflow + bash + str_replace_editor 三件合计 2,344，占工具预算的 36%。

从头称一遍的总数就是这么来的：工具 6,510 + 技能目录 6,242 + 系统提示词 844
    + 运行环境快照 129 + 协议固定开销 82 + 我那句提问 29 = 13,836，日志真值 13,838。`,
            note: { zh: '这一步没有新命令，只有把同一条 curl 的 content 换成你自己在第一步里捞出来的原文、再相减一次。称出来的六项相加是 13,836，与日志里的 13,838 差 2 个 token，来自取整。', en: 'This step introduces no new command: swap the content of the same curl for the text you extracted in step one, send it, and subtract. The six weighed parts sum to 13,836 against the logged 13,838, a two-token rounding gap.' },
          },
          {
            type: 'p',
            zh: '那笔入场费里，将近一半是作者自己带进来的。清单第二行那 6,242 个 token 来自一条注入消息，内容是一份可用技能清单，列着 **57 个 skill 的名字和简介**——不是 DSH 的，是他自己那个本来给 Claude Code、Codex、Kimi Code 三家共用、放在 `~/.agents/skills` 的技能池。**DSH 装上就把它们全端走了，不用配置，不用迁移，也没问过他。**',
            en: 'Nearly half of that entry fee was the author\'s own doing. The 6,242 tokens in row two come from one injected message holding a skill list naming **57 skills with their descriptions** - not DSH\'s, but the author\'s own pool shared between Claude Code, Codex and Kimi Code, living in `~/.agents/skills`. **DSH picked the whole thing up on install: no configuration, no migration, and it did not ask.**',
          },
          {
            type: 'code',
            lang: 'bash',
            title: '先看一眼你的技能池有多大',
            code: `ls -d ~/.agents/skills/*/ | wc -l`,
            note: { zh: '这个数字直接决定你的开机成本：57 个 skill 让每一次会话的开机成本从大约 7,600 涨到 13,838，翻了 82%。', en: 'This number decides your boot cost: 57 skills pushed the per-session boot cost from roughly 7,600 to 13,838, up 82%.' },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '技能目录不是一次性的，而且你没用它', en: 'The catalog is not one-off, and you did not use it' },
            zh: '好的那面是：如果你也攒了一堆 skill，最担心的「家当能不能搬过去」在这一项上答案是不用搬，它读的就是那个目录，开箱可用。另一面是账单：这 57 个 skill 让开机成本翻了 82%，而且**每开一个新会话付一次，每派一个子代理付一次**——这次任务真正用到的 skill 数量是零。到0.2版它又多端走一样东西：`~/.agents/AGENTS.md` 里的全局规则，0.2.1-rc.1 起默认读这个位置，作者那份 4,790 个字符，每场会话照付。约 7,600 那个数是 13,838 减去实测的 6,242 算出来的，不是在干净机器上真跑一次得到的，误差几十 token 量级；注入清单里 57 条与目录里 57 个数量对得上，但逐名比对有两条不在里面、另有两条来路不明，DSH 同时也扫项目目录下的 skill，这两个来源没拆开验证——数量级和结论不受影响。',
            en: 'The good side: if you have accumulated a pile of skills, the worry about whether your belongings can be moved is answered here - they need no moving, DSH reads that directory directly and it works out of the box. The other side is the bill: those 57 skills raised boot cost by 82%, and **you pay it again for every new session and for every subagent dispatched**, while the number of skills actually used in that task was zero. By 0.2 one more thing is picked up: the global rules at `~/.agents/AGENTS.md`, read from that location by default since 0.2.1-rc.1 - the author\'s file is 4,790 characters, paid on every session. The roughly-7,600 figure is 13,838 minus the measured 6,242 rather than a clean-machine run, so it is off by tens of tokens; the 57 injected entries match the 57 in the directory in count, but two names are absent on a line-by-line comparison and two others have unclear provenance, and DSH also scans skills under the project directory without those sources being separated. Neither the order of magnitude nor the conclusion changes.',
          },
        ],
      },
      {
        id: 'prefix-cache',
        title: { zh: '第二句话开始命中缓存', en: 'The Second Sentence Hits the Cache' },
        blocks: [
          {
            type: 'p',
            zh: '看到 13,838 这个数，第一反应是每轮都要付一次，那还得了。实际**只有第一次是全价**。模型读你的提示词是边看边把每个字加工成一堆中间状态，加工要算力所以收钱；加工完的东西可以留着，下次如果开头一大段一模一样就直接取用，这就是缓存命中。那「开头一大段」叫**前缀**——从第一个字算起、连着不断的那一段；「前缀稳定」意思就是这一段一个字都没变。这一章跑的是 flash，它的缓存命中价是未命中价的 1/50。',
            en: 'Seeing 13,838, the first thought is paying that every turn, which would be ruinous. In practice **only the first request pays full price**. Reading your prompt is a per-character transformation into intermediate state; that takes compute, so it is billed. The result can be retained, and if the leading span is byte-identical next time it is reused: that is a cache hit. The leading span is the **prefix** - everything contiguous from the very first character, and a stable prefix means not one character of it changed. This chapter ran flash, whose hit price is 1/50 of the miss price.',
          },
          {
            type: 'table',
            head: [
              { zh: '步', en: 'Step' },
              { zh: '未命中（全价）', en: 'Miss (full price)' },
              { zh: '缓存命中（1/50 价）', en: 'Cache hit (1/50 price)' },
              { zh: '输出', en: 'Output' },
            ],
            rows: [
              [{ zh: '1', en: '1' }, { zh: '13,838', en: '13,838' }, { zh: '0', en: '0' }, { zh: '190', en: '190' }],
              [{ zh: '2', en: '2' }, { zh: '267', en: '267' }, { zh: '13,952', en: '13,952' }, { zh: '332', en: '332' }],
              [{ zh: '3', en: '3' }, { zh: '786', en: '786' }, { zh: '14,464', en: '14,464' }, { zh: '1,384', en: '1,384' }],
              [{ zh: '4', en: '4' }, { zh: '319', en: '319' }, { zh: '16,512', en: '16,512' }, { zh: '1,442', en: '1,442' }],
              [{ zh: '5', en: '5' }, { zh: '177', en: '177' }, { zh: '18,176', en: '18,176' }, { zh: '449', en: '449' }],
            ],
            note: { zh: '8月 flash 那一跑的五步流水。第一步 13,838 全价、缓存是 0，库房空的；第二步整个前缀被认下来，全价计费的只剩 267 个。全程缓存命中率 80.4%。', en: 'The five-step flow of that Aug flash run. Step one pays 13,838 in full with zero cache - the warehouse was empty. By step two the whole prefix is recognised and only 267 tokens are billed at full price. Hit rate across the run: 80.4%.' },
          },
          {
            type: 'p',
            zh: '那四个命中数全部是 64 的整数倍：13,952、14,464、16,512、18,176，除以 64 余数都是 0。DeepSeek 官方文档写着「64 个 token 是一个存储单元，不足 64 的不缓存」，这句话在这台机器上被验出来了——**零头真的不给你算**。再看第四次跑：同一个目录、同一个任务、同一个模型，跟上一次隔了 2分21秒，但换了一个进程、一个全新会话，开机那 13,838 个 token 里命中了 13,824 个，全价的只剩 13 个；那一跑步数更多、输出更多，**成本却只有上一跑的 52.5%**。',
            en: 'All four hit counts are exact multiples of 64: 13,952, 14,464, 16,512 and 18,176 all divide by 64 with remainder zero. The official docs state that 64 tokens is one storage unit and anything under 64 is not cached, and this was verified on the author\'s machine - **the remainder really is not credited**. Then a fourth run: same directory, same task, same model, 2m21s after the previous one but a new process and a brand-new session. Of the 13,838 boot tokens, 13,824 hit the cache and only 13 were billed full price; that run had more steps and more output yet **cost only 52.5% of the previous one**.',
            source: { label: 'DeepSeek API 文档 / DeepSeek Docs', href: 'https://api-docs.deepseek.com/quick_start/pricing' },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '「省50倍」这种话不能写', en: 'Do not write "fifty times cheaper"' },
            zh: '一个容易被抄错的地方：**「命中比未命中便宜 50 倍」说的是单价**。落到总账上没有 50 倍，因为输出 token 不打折。同一跑如果缓存全部失效，成本从 $0.0034 变成 $0.0121，是 **3.55 倍**。',
            en: 'One thing people copy wrong: **the 50x figure is a unit price**. The total bill does not move 50x, because output tokens are never discounted. If the cache failed completely on that same run, the cost went from $0.0034 to $0.0121 - a factor of **3.55**.',
          },
          {
            type: 'p',
            zh: '作为对照，Anthropic 文档里写着他们的缓存寿命：订阅状态下一小时，用按量额度时掉到五分钟，用 API key 或云厂商接入默认五分钟。DeepSeek 这边是**几小时到几天，而且缓存写入不收费**。这个差别直接决定你敢不敢把一件活拆成好几个会话慢慢做。',
            en: 'For comparison, Anthropic documentation gives their cache lifetime as one hour on a subscription, dropping to five minutes when metered credit is used, and five minutes by default for API-key or cloud-marketplace access. DeepSeek runs **hours to days, and cache writes are free**. That difference decides whether you dare split one job across several sessions.',
            source: { label: 'Anthropic 提示缓存 / Anthropic Prompt Caching', href: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching' },
          },
          {
            type: 'p',
            zh: '他们把「会不会打断缓存」做成了每个包的必填卡。每个包的 README 必须以一个固定结构结尾，其中有一节叫 **KV Cache effect**，专门写「我这个零件会不会让缓存失效」，填法规定得很细：区分只追加、稳定重复前缀、替换更早的内容、独立发一次请求这四种行为，然后点名本包的哪些改动会打断复用。8月执行情况是 219 个包里 215 个填了（10月包数已变成三百多个，没重数），剩下 4 个走白名单豁免，而豁免理由逐条写在门禁脚本的源码里，脚本还会检查这 4 个名字是不是真实存在的包、理由是不是空的、有没有人同时挤进两份名单——那个检查脚本本身 38KB。',
            en: 'Whether a change breaks the cache was made a mandatory card on every package. Each package README must end in a fixed structure containing a section called **KV Cache effect** describing whether this part can invalidate the cache, with prescribed filling: distinguish append-only, stable repeated prefix, replacing earlier content, and one-off request, then name which changes in this package break reuse. In Aug, 215 of 219 packages filled it (the count passed three hundred by Oct, not recounted); the remaining four take a whitelist exemption whose reasons are written into the gate script source line by line, and that script also checks the four names are real packages, that no reason is empty, and that nobody slipped onto both lists. The check script itself is 38KB.',
            source: { label: '上游仓库 / DeepSeek-Harness', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
          },
          {
            type: 'checklist',
            title: { zh: '三条可以直接照做的', en: 'Three things to do exactly' },
            items: [
              {
                zh: '不要在会话中途改配置、换人格、开关工具；要改就在新会话开头改。',
                en: 'Do not change config, persona or tool switches mid-session; make changes at the start of a new session.',
              },
              {
                zh: '要贴图就在开头贴，别贴到一半——加图那个包老实写了，加一张图会让请求后缀失效。',
                en: 'Paste images at the beginning, not halfway through; the image package honestly documents that adding one invalidates the request suffix.',
              },
              {
                zh: '顺序也算数：工具重排一次，内容一个字没改，缓存照样掉。',
                en: 'Order counts: reorder the tools once and the cache drops even though not one character changed.',
              },
              {
                zh: '想知道某个能力贵不贵，打开它的 README 直接跳到 KV Cache effect 那一节：写着 append-only 的便宜，写着「从第一个变动的 token 起复用失效」的贵。',
                en: 'To price a capability, jump to the KV Cache effect section of its README: append-only is cheap, anything reading "reuse breaks from the first changed token" is expensive.',
              },
            ],
          },
        ],
      },
      {
        id: 'traps',
        title: { zh: '三个只有自己跑一次才会撞上的坑', en: 'Three Traps You Hit Only by Running It' },
        blocks: [
          {
            type: 'cards',
            items: [
              {
                icon: 'alert',
                title: { zh: '最贵的坑：网页点一下，改掉所有命令行任务', en: 'The dearest trap: one click on the web UI' },
                desc: { zh: '8月用命令行明确指定跑 flash，日志里写的却是 pro。原因是同一时间另一个窗口开着网页版，在网页上点了一下模型下拉框，那个选择被写进了共享的全局设置文件，而这个文件的层级压过命令行参数。**3 倍差价，静默发生。** 跑之前先看一眼那份设置文件，跑完先看日志里的请求上下文。0.2 版把设置改存到每个 profile 自己的插件配置里，命令行和网页的凭据读取也分开了，这个坑可能已经不在，作者没复测。', en: 'In Aug the CLI explicitly asked for flash, yet the log recorded pro. Another window had the web UI open at the time, and one click in its model dropdown wrote that choice into the shared global settings file, which outranks command-line arguments. **A 3x price difference, silently.** Check that settings file before running and check the request context in the log after. The 0.2 release moved settings into each profile\'s own plugin config and separated CLI from web credential reading, so this trap may be gone - not retested.' },
              },
              {
                icon: 'gauge',
                title: { zh: '第二坑：这个产品自己不算钱', en: 'Second trap: the product does not price itself' },
                desc: { zh: '10月界面上仍然只有 token，用量明细里没有一个金额。那个上下文占用进度条用的尺子是「4 个字符等于 1 token」，量英文差不多，量中文会短一半。它不是全程瞎猜，每次模型回话都会带回真实数字做校准，但中文长对话里偏差越攒越多。', en: 'Even in Oct the UI shows tokens only - not one amount anywhere in the usage breakdown. The context-usage bar measures with "4 characters per token", which is roughly right for English and half wrong for Chinese. It is not guessing throughout: every model reply brings back real numbers for calibration, but in long Chinese conversations the drift accumulates.' },
              },
              {
                icon: 'brain',
                title: { zh: '第三坑：默认思考强度是 High', en: 'Third trap: reasoning effort defaults to High' },
                desc: { zh: '现在有 Low、High、Max 三档，8月只有一档可选。8月 flash 那一跑的 3,797 个输出 token 里，有 1,444 个是思考 token，占 38%，**全部按输出价计费**。调低理论上能砍掉这部分，但质量会怎样没测，不替读者说。', en: 'There are now Low, High and Max tiers; Aug had one setting. Of the 3,797 output tokens in that Aug flash run, 1,444 were thinking tokens - 38% - and **all of them are billed at output prices**. Lowering the tier should in theory cut this, but quality impact was not measured, so no claim is made.' },
              },
            ],
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '中文是 1.71 个字符一个 token，界面按 4 算', en: 'Chinese is 1.71 characters per token; the UI assumes 4' },
            zh: '实测中文密度是 **1.71 个字符一个 token**，而界面上那个上下文占用进度条声明的换算率是 4 个字符等于 1 token。也就是说进度条显示 40% 时，实际可能已经 90%。别拿这根条子当安全边际的依据：真正要看的数字在会话日志的 request/context 里，那里记的是模型侧回执的真实 token 数。想知道自己现在的占用，[去工具箱](/toolkit)按日志算，不要看条。',
            en: 'Measured Chinese density is **1.71 characters per token**, while the context-usage bar assumes 4 characters per token. A bar reading 40% can mean 90% in reality. Do not treat that bar as your safety margin: the number that matters is in the session log\'s request/context, which records the real token counts returned by the model side. To know your actual usage, compute it from the log via the [toolkit](/toolkit) rather than reading the bar.',
          },
          {
            type: 'p',
            zh: '顺带把 PTC 模式那笔账放这儿：8月跑了一次，结果跟「把一堆工具收成 1 个应该更省」这个直觉是反的——工具说明书确实从 26,894 字符缩到 897，但系统提示词从 4,100 涨到 35,643，**首轮真实输入反而多了约 9%**（13,818 对 15,040）。那 25 件工具的定义没有消失，只是从一种格式换成了另一种，搬进了系统提示词。10月只在 PTC 里问了一句不调工具的话，量到模型手里仍然只有 `run_code`，系统提示词涨到 41,267 个字符，结构没变。完整对照在[第 8 章](/chapter/ptc)，别拿这里这组数算总账——那组两侧模型和任务都不同。',
            en: 'The PTC bill belongs here too: an Aug run came out against the intuition that collapsing many tools into one should be cheaper. Tool documentation did shrink from 26,894 to 897 characters, but the system prompt grew from 4,100 to 35,643, so **the first-round real input grew about 9%** (13,818 versus 15,040). The definitions of those 25 tools did not vanish - they changed format and moved into the system prompt. In Oct a single no-tool question in PTC mode still showed the model holding only `run_code`, with the system prompt grown to 41,267 characters and the same structure. The full comparison is in [chapter 8](/chapter/ptc); do not settle totals from the pair here, whose two sides used different models and different tasks.',
          },
          {
            type: 'callout',
            tone: 'idea',
            title: { zh: '被否掉的方案：明知道用不上，还是得带上', en: 'Rejected: carrying what you will not use' },
            zh: '自动压缩会在对话中途触发，那一刻厂商的缓存刚被上一次请求焐热，而默认摘要器另发一个请求、用一套专门的摘要系统提示词，结果同一段历史被按全价付了两次，恰好发生在对话最长的时候。修法是**把摘要指令从请求头部搬到对话尾部**，让它变成热请求的延长线。另有三条省钱的直觉全被驳回：保留摘要器自己的系统提示词其余复用——系统提示词是厂商最先缓存的那一段，头一变后面写什么都没用；只发被遮住的那段历史不带头——第一个 token 就分叉了；摘要器又不调工具所以把工具说明书省掉——工具说明书是被缓存序列的一部分，省掉它后面每个 token 全部错位。**明知道摘要器一个工具都不会用，还是要把那份两万多字符的工具说明书原样带上，因为少传反而更贵。**（出自 2026-07-21-compaction-summary-prefix-cache-reuse 那篇笔记的被拒方案一节）',
            en: 'Automatic compaction fires mid-conversation, when the provider cache has just been warmed by the previous request, while the default summariser issued its own request with a dedicated summary system prompt - so the same stretch of history was paid for twice at full price, precisely when the conversation was longest. The fix was to **move the summarising instruction from the head of the request to the tail of the conversation**, turning it into a continuation of a warm request. Three cost-saving intuitions were rejected outright. Keep the summariser\'s own system prompt and reuse the rest: the system prompt is the first segment the provider caches, so changing the head invalidates everything after it. Send only the masked history with no prefix: it forks at the very first token. Drop the tool documentation since the summariser never calls tools: tool docs are part of the cached sequence, and removing them misaligns every token behind them. **Knowing the summariser will not call a single tool, that twenty-thousand-character tool manifest still travels verbatim, because sending less costs more.** From the rejected-options section of the note 2026-07-21-compaction-summary-prefix-cache-reuse.',
            source: { label: '上游仓库 / DeepSeek-Harness', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
          },
        ],
      },
      {
        id: 'estimate',
        title: { zh: '估自己的账', en: 'Estimating Your Own Bill' },
        blocks: [
          {
            type: 'steps',
            items: [
              {
                title: { zh: '拿一个锚点，再乘上你的任务数', en: 'Take one anchor, then multiply by your task count' },
                desc: { zh: '把「一件让它认真做的小活，低谷价一两毛钱」当锚（番茄钟那场约 0.16 元），按你一天的任务数乘一遍，再看你是白天用还是晚上用——高峰翻倍。变量是你会不会因为便宜就无节制地开新会话，因为每开一个新会话都要重付一次入场费。', en: 'Use "one small job done properly costs a tenth or two of a yuan off-peak" as the anchor (the pomodoro run cost about 0.16 RMB), multiply by your daily task count, then factor in whether you work by day or by night - peak doubles it. The variable is whether cheapness makes you open new sessions without restraint, since every new session repays the entry fee.' },
              },
              {
                title: { zh: '数一下你的技能池', en: 'Count your skill pool' },
                desc: { zh: '`ls -d ~/.agents/skills/*/ | wc -l`。这个数字直接决定你的开机成本，而且它是你自己的资产带来的，不是产品的锅。同一句话，一台攒了 57 个 skill 的机器和一台干净机器，入场费差 82%。', en: 'Run `ls -d ~/.agents/skills/*/ | wc -l`. That number decides your boot cost, and it comes from your own assets rather than from the product. Same sentence, one machine with 57 skills versus a clean one: an 82% difference in entry fee.' },
              },
              {
                title: { zh: '遇到「便宜105倍」这种标题停一下', en: 'Stop at any headline reading "105x cheaper"' },
                desc: { zh: '那个数是真的，但它测的是模型：评测机构 Artificial Analysis 同一套题跑下来，V4-Flash 的模型 API 花费是某个前沿模型的 1/105，代价是评测分数低 10 分——**那是模型价差，不是 harness 价差**。真正测 harness 的是 Composio 那组实验：固定同一个模型，套 8 个不同的 agent 工具，每次成功的成本差 7 倍。这两个数作者都没独立复现，是照着公开方法学读的，而且两件事互相独立，**别把它们乘在一起**。', en: 'The number is real but it measures the model: on Artificial Analysis\'s same benchmark suite, V4-Flash\'s model API spend came out 1/105 of a certain frontier model, at a benchmark score 10 points lower - **that is a model price gap, not a harness price gap**. What actually measures harnesses is the Composio experiment: one fixed model behind eight different agent tools, with a 7x spread in cost per success. Neither figure was independently reproduced - both were read from published methodology - and the two are independent, so **do not multiply them together**.' },
              },
            ],
          },
          {
            type: 'stats',
            items: [
              {
                value: '92.1%',
                label: { zh: '入场费里工具说明书加技能目录的占比', en: 'Tool docs plus skill catalog as a share of the entry fee' },
                sub: { zh: '8月：47.0% + 45.1%', en: 'Aug: 47.0% + 45.1%' },
              },
              {
                value: '0.2%',
                label: { zh: '你真正问的那句话', en: 'The question you actually typed' },
                sub: { zh: '29 个 token', en: '29 tokens' },
              },
              {
                value: '3.55x',
                label: { zh: '缓存全部失效时的总成本倍数', en: 'Total cost multiple when the cache fails outright' },
                sub: { zh: '$0.0034 变成 $0.0121', en: '$0.0034 becomes $0.0121' },
              },
              {
                value: '2x',
                label: { zh: '工作日高峰对低谷', en: 'Weekday peak against off-peak' },
                sub: { zh: '9-12 点和 14-18 点，北京时间', en: '09:00-12:00 and 14:00-18:00 Beijing time' },
              },
            ],
          },
          {
            type: 'links',
            title: { zh: '接着往下', en: 'Where to go next' },
            items: [
              {
                label: { zh: '成本计算器', en: 'Cost calculator' },
                href: '/lab?tab=cost',
                desc: { zh: '把三个数填进去，自己算一遍。', en: 'Enter the three numbers and run it yourself.' },
                tag: 'internal',
              },
              {
                label: { zh: '第 8 章：让模型写程序', en: 'Chapter 8: letting the model write a program' },
                href: '/chapter/ptc',
                desc: { zh: 'PTC 那笔反直觉的账，同模型同任务的严格对照。', en: 'The counter-intuitive PTC bill under a strict same-model, same-task comparison.' },
                tag: 'internal',
              },
              {
                label: { zh: 'DeepSeek 官方定价页', en: 'DeepSeek pricing' },
                href: 'https://api-docs.deepseek.com/quick_start/pricing',
                desc: { zh: '峰谷时间与新模型名以这里为准。', en: 'Peak windows and current model names are authoritative here.' },
                tag: 'source',
              },
              {
                label: { zh: 'Anthropic 提示缓存', en: 'Anthropic prompt caching' },
                href: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching',
                desc: { zh: '缓存寿命的对照口径。', en: 'The comparison point for cache lifetimes.' },
                tag: 'source',
              },
              {
                label: { zh: 'Composio', en: 'Composio' },
                href: 'https://composio.dev/',
                desc: { zh: '同模型套 8 个工具、成本差 7 倍的那组实验。', en: 'The eight-tools-one-model experiment showing a 7x cost spread.' },
                tag: 'source',
              },
            ],
          },
        ],
      },
    ],
    sources: [
      { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
      { label: 'DeepSeek 官方定价页 / DeepSeek Pricing', href: 'https://api-docs.deepseek.com/quick_start/pricing' },
      { label: 'Anthropic 提示缓存 / Anthropic Prompt Caching', href: 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching' },
      { label: 'Claude Code 文档 / Claude Code Docs', href: 'https://docs.anthropic.com/en/docs/claude-code/overview' },
      { label: 'Composio', href: 'https://composio.dev/' },
    ],
    sisters: ['llm-gateway-patterns', 'better-agent', 'agent-observability-patterns'],
  },
  {
    slug: 'creator-mode',
    num: '07',
    part: 'core',
    icon: 'plug',
    level: 'advanced',
    minutes: 17,
    accent: 'violet',
    title: { zh: '它给自己长出一只手', en: 'It Grows Itself a Hand' },
    subtitle: {
      zh: '8月那只手活不过一次重启，10月它换了条路，手留下来了。',
      en: 'The Aug hand did not survive a restart. In Oct it took another road, and the hand stayed.',
    },
    promise: {
      zh: '读完这章，你能判断哪条「让它自己加工具」的路会留下文件、留下审批记录，也能自己跑一遍并读懂那两行工具清单日志。',
      en: 'You will be able to tell which route for "add yourself a tool" leaves files and approval records behind, run it yourself, and read the two tool-list log lines.',
    },
    sections: [
      {
        id: 'missing-tool',
        title: { zh: '它少一件工具的时候，我该等谁', en: 'When One Tool Is Missing' },
        blocks: [
          {
            type: 'p',
            zh: '用任何 agent 久了都会撞上同一堵墙：你要的那个动作，它手里恰好没有。比如想知道一段文字里有多少个汉字——听着简单，但工具清单里没有这一项。以往的解法只有三条：**等官方更新、去外面找一个装上、或者自己写一个再重启**。这三条路有个共同点，都得离开当前这场对话，你正想着的这件事被硬生生切断了。',
            en: 'Any agent used long enough runs into the same wall: the action you want is not in its hands. Take counting Chinese characters in a piece of text - it sounds trivial, but no such tool is in the list. There used to be three answers: **wait for the vendor, install something from outside, or write it yourself and restart**. All three share one property: you must leave the current conversation, and the thought you were holding gets cut in half.',
          },
          {
            type: 'p',
            zh: '想试的是第四条路：**能不能让它在对话进行到一半的时候，自己把缺的这件工具长出来，然后立刻用上**。§03 提过的创造模式就是为这件事准备的。8月那次起了一个干净的隔离环境，什么都没预先配置，直接把话丢过去。',
            en: 'The experiment was a fourth route: **can it grow the missing tool mid-conversation and use it immediately**. Creator mode, introduced in chapter 3, exists for exactly this. The Aug attempt used a clean isolated environment with nothing preconfigured, and the instruction was simply thrown in.',
          },
          {
            type: 'code',
            lang: 'text',
            title: '8月打进去的那句话',
            code: `先用 cordis_inspect 看一下你自己此刻的运行时，告诉我你看到了什么（服务、插件、工具各多少个）。
然后给你自己现场造一个新插件：给模型新增一个叫 count_chinese 的工具，作用是统计一段文本里的汉字个数。
造完把它挂上去，然后立刻用它统计这句话：「探索未至之境」。`,
            note: { zh: '「运行时」指的是它此刻真的在跑着的那一套东西；「服务」是这个产品给零件起的正式叫法。', en: '"Runtime" means the set of parts actually running right now; "service" is the product\'s formal word for a part.' },
          },
          {
            type: 'table',
            head: [
              { zh: '它报的项（8月自检）', en: 'What it reported (Aug self-inspection)' },
              { zh: '自检时', en: 'At inspection' },
              { zh: '造完之后', en: 'After building' },
            ],
            rows: [
              [{ zh: '服务', en: 'Services' }, { zh: '55 个', en: '55' }, { zh: '55 个', en: '55' }],
              [{ zh: '模型能看见的工具', en: 'Tools visible to the model' }, { zh: '32 个', en: '32' }, { zh: '33 个（新增 count_chinese）', en: '33, with count_chinese added' }],
              [{ zh: '动态插件', en: 'Dynamic plugins' }, { zh: '0 个', en: '0' }, { zh: '1 个（cjk-1）', en: '1, id cjk-1' }],
            ],
            note: { zh: '那个 32 要跟别的章节对一下账：32 等于8月标准模式那 25 件工具，加上创造模式多给的 7 件自指工具。三分多钟之后它回话，中间作者一个字都没再输入。实测调用：喂进「探索未至之境」，返回 6——探、索、未、至、之、境，六个字全是汉字，答案是对的。', en: 'The 32 needs reconciling with other chapters: 25 standard-mode tools in Aug plus the 7 self-referential tools creator mode adds. It replied after a little over three minutes with no further input from the author. The measured call: feed in the six-character phrase, get back 6 - correct, every character is a Chinese ideograph.' },
            source: { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
        ],
      },
      {
        id: 'aug-reading',
        title: { zh: '前十四步，它在读自己的说明书', en: 'The First Fourteen Steps Were Reading' },
        blocks: [
          {
            type: 'table',
            head: [
              { zh: '它干了什么', en: 'What it did' },
              { zh: '次数', en: 'Calls' },
            ],
            rows: [
              [{ zh: '查自己此刻的运行时（三个 `cordis_inspect` 开头的工具）', en: 'Inspected its own runtime (three tools prefixed `cordis_inspect`)' }, { zh: '6', en: '6' }],
              [{ zh: '在自己的安装目录里翻文件结构（跑命令）', en: 'Walked the file structure inside its own install directory (shell)' }, { zh: '6', en: '6' }],
              [{ zh: '读类型声明文件', en: 'Read type declaration files' }, { zh: '4', en: '4' }],
              [{ zh: '搜 `defineTool` 这个函数到底写在哪', en: 'Searched for where `defineTool` is actually defined' }, { zh: '3', en: '3' }],
              [{ zh: '加载一份叫 `cordis-plugin-development` 的技能', en: 'Loaded the skill named `cordis-plugin-development`' }, { zh: '1', en: '1' }],
            ],
            note: { zh: '整场 19 步、24 次工具调用，前 14 步、20 次调用一件正事都没干，全在读它自己的说明书。最后那一条是它自己想起来的，作者没提——它第一步就同时干了两件事：一边查运行时，一边把这份「怎么写动态插件」的技能调了出来。真正动手只花了最后 4 次调用：提交定义、挂进活的运行时、回头确认工具数变成 33、然后用一次。', en: 'Nineteen steps and 24 tool calls in total; the first 14 steps and 20 calls did no real work, reading its own manual instead. The last row was recalled by itself, unprompted - its very first step did two things at once: inspecting the runtime and pulling up the "how to write a dynamic plugin" skill. Actual construction took only the final 4 calls: submit the definition, attach it to the live runtime, confirm the tool count became 33, then use it once.' },
          },
          {
            type: 'code',
            lang: 'bash',
            title: '它读的文件长这样',
            code: `ls ~/.npm/_npx/*/node_modules/@deepseek-ai/dsh-tools/lib/types/types.d.ts`,
            note: { zh: '橙皮书里这条路径是 ~/.npm/_npx/.../node_modules/@deepseek-ai/dsh-tools/lib/types/types.d.ts。类型声明文件可以理解成一份零件的规格书：这个函数吃几个参数、每个参数长什么样、返回什么。它先后读了三份这种东西。', en: 'The Orange Book writes the path as ~/.npm/_npx/.../node_modules/@deepseek-ai/dsh-tools/lib/types/types.d.ts. A declaration file is a parts specification: what arguments a function takes, their shapes, what it returns. It read three of them.' },
          },
          {
            type: 'quote',
            zh: '一个 agent 在读自己身上零件的规格书，为的是给自己再装一个零件。',
            en: 'An agent reading the specification of its own parts in order to fit another part to itself.',
            cite: { zh: '橙皮书 §07', en: 'Orange Book, section 07' },
          },
          {
            type: 'p',
            zh: '它先查再写。凭记忆写也能写出个大概，但参数名、注册方式对不上，会在挂载那一步被拒绝。下面是它提交上去的全部代码，作者一个字没改：',
            en: 'It inspected before writing. From memory it could have produced something approximately right, but a mismatched parameter name or registration form gets rejected at the attach step. Below is everything it submitted, unchanged by the author:',
          },
          {
            type: 'code',
            lang: 'ts',
            title: '它写的那二十行（8月，逐字）',
            code: `return {
  apply(ctx) {
    harness.registerTool(ctx, harness.defineTool({
      name: 'count_chinese',
      description: '统计一段文本中的汉字（中日韩统一表意文字，含扩展区与兼容区）个数，返回汉字数量。',
      parameters: {
        text: { type: 'string', required: true, description: '要统计的文本' },
      },
      output: {
        schema: { type: 'integer' },
        render(args, value) {
          return [{ type: 'text', text: '「' + args.text + '」中共有 ' + value + ' 个汉字' }]
        },
      },
      async execute(args) {
        const matches = args.text.match(/[\\u3400-\\u4dbf\\u4e00-\\u9fff\\uf900-\\ufaff]/g)
        return matches ? matches.length : 0
      },
    }))
  },
}`,
            note: { zh: '中间那行 const matches 是用来判断「这个字算不算汉字」的：它写了三段范围，不是一段。第二段是平时打的常用汉字，第一段是扩展区里的冷僻字，第三段是兼容区。随手写的话，一段常用区就能交差、测试也能过，因为那六个字全落在第二段里——它多写的那两段，在这次任务里一次都没用上。', en: 'The const matches line decides whether a character counts as Chinese: three code-point ranges, not one. The second is everyday characters, the first the extension-plane rarities, the third the compatibility block. A careless version would pass the test with only the second range, since all six characters fall there - the two extra ranges were never used by this task.' },
            source: { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'list',
            zh: [
              '**官方文档写的是五个动词**：查看、定义、运行、停止、注销。',
              '**运行时里实测到的是七个**：那个「查看」已经被拆成三件，分别对应列出来、按条件查、查自己。',
              '**五个变七版本身不是大事，值得写出来是因为差异出现在工具名字上，而名字是要念给模型听的。** 文档落后于代码，在这个仓库里不是个别现象，所以这本书凡是出现具体工具名的地方，一律以实跑到的运行时为准，不照文档抄。',
            ],
            en: [
              '**The official doc lists five verbs**: inspect, define, run, stop, unregister.',
              '**Seven were measured in the live runtime**: that "inspect" had already been split into three - list, query by condition, and query itself.',
              '**Five becoming seven is not itself news; it is worth writing down because the drift is in tool names, and names are read aloud to the model.** Documentation lagging code is not an isolated phenomenon in this repo, so wherever this site cites a concrete tool name it follows the measured runtime rather than the docs.',
            ],
          },
        ],
      },
      {
        id: 'aug-boundary',
        title: { zh: '8月：这只手活不过一次重启', en: 'Aug: The Hand Dies With the Process' },
        blocks: [
          {
            type: 'table',
            head: [
              { zh: '8月这一趟的账', en: 'The Aug bill' },
              { zh: '值', en: 'Value' },
            ],
            rows: [
              [{ zh: '步数 / 工具调用', en: 'Steps / tool calls' }, { zh: '19 步 / 24 次', en: '19 steps / 24 calls' }],
              [{ zh: '系统提示词', en: 'System prompt' }, { zh: '17,663 字符', en: '17,663 characters' }],
              [{ zh: '那 32 件工具的说明书', en: 'Documentation for those 32 tools' }, { zh: '33,867 字符', en: '33,867 characters' }],
              [{ zh: '新输入 token', en: 'New input tokens' }, { zh: '131,494', en: '131,494' }],
              [{ zh: '输出 token', en: 'Output tokens' }, { zh: '11,349', en: '11,349' }],
              [{ zh: '缓存命中 token', en: 'Cache-hit tokens' }, { zh: '863,232', en: '863,232' }],
              [{ zh: '模型实际耗时', en: 'Model-side time' }, { zh: '2分27秒', en: '2m27s' }],
              [{ zh: '折成钱', en: 'In money' }, { zh: '按8月当天价目表约 7 美分', en: 'About 7 US cents at the Aug price list' }],
            ],
            note: { zh: '缓存命中量是新输入量的 6.6 倍：一场翻了几十个文件、来回 19 步的长会话，真正按新内容计费的只有 13 万 token，剩下 86 万都是重复的前缀。按官方定价页8月当天的价格，Pro 缓存命中的单价大约是未命中的一百二十分之一。如果那 86 万全部按新内容计费，账单会翻到六倍多。这道算术是作者自己做的，那张价目表后来又改过几次。', en: 'Cache hits are 6.6 times new input: in a long session that opened dozens of files across 19 steps, only about 130k tokens were billed as new content while 860k were repeated prefix. At the Aug price list, Pro cache-hit input was roughly one hundred and twentieth of the miss price. Had those 860k been billed as new, the ticket would have multiplied past six. The arithmetic is the author\'s, and the price list changed several times afterwards.' },
            source: { label: 'DeepSeek 官方定价页 / DeepSeek Pricing', href: 'https://api-docs.deepseek.com/quick_start/pricing' },
          },
          {
            type: 'p',
            zh: '它自己在小结最后主动交了底：这个插件目前还在运行中，不需要可以停掉（版本留着，随时能恢复），也可以永久删除。官方文档写得更死——**动态包只活在这个进程的内存里**，然后连着的五个「不」：',
            en: 'Its own summary volunteered the limit: the plugin is still running, it may be stopped (the version is kept and can be reattached) or permanently removed. The official doc is harsher - **a dynamic bundle lives only in this process\'s memory** - followed by five consecutive "will not"s:',
          },
          {
            type: 'list',
            zh: [
              '不创建任何插件文件；',
              '不安装任何包；',
              '不改动任何配置；',
              '重启之后不存活；',
              '也**不能被自动提升为正式插件**。',
            ],
            en: [
              'It creates no plugin file;',
              'it installs no package;',
              'it changes no configuration;',
              'it does not survive a restart;',
              'and it **cannot be automatically promoted to a real plugin**.',
            ],
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '它不是安全边界，请当成 bash 权限来对待', en: 'Not a security boundary - treat it as bash access' },
            zh: '它长出来的这只手，没有任何机制能把它沉淀成一件真东西；想留下来，得有人按正常流程写一个真的插件、装进去、重启。风险声明是他们自己写的，橙皮书原样搬过来：「这个沙箱隔离全局变量，**但它不是安全边界**……请把这套工具当成 bash 权限来对待。」翻译成人话：开在这个模式上的会话，你要当成「我把这台电脑的命令行直接交出去了」来对待，因为模型写的那段代码是拿去对着活的运行时求值的，它不像别的工具那样有一层壳兜着。所以这个模式不是默认给你的，得你自己去选。',
            en: 'There was no mechanism to turn that hand into a durable thing; keeping it meant someone writing a real plugin through the normal flow, installing it and restarting. The risk statement is theirs, reproduced verbatim in the Orange Book: the sandbox isolates globals, **but it is not a security boundary** - treat these tools as bash permission. In plain language: a session in this mode should be treated as having handed over your command line, because the code the model writes is evaluated against the live runtime, without the shell that wraps other tools. That is why the mode is not given by default - you have to select it.',
            source: { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
        ],
      },
      {
        id: 'oct-run',
        title: { zh: '10月：同一句话，再打一遍', en: 'Oct: The Same Sentence, Again' },
        blocks: [
          {
            type: 'code',
            lang: 'text',
            title: '10月打进去的那句话（0.2.1-rc.2）',
            code: `给你自己加一个能数汉字个数的工具，做成插件装上。
装好之后，用这个新工具数一下「探索未至之境」有几个汉字。`,
            note: { zh: '没提 cordis_inspect，没提怎么挂载，只说「做成插件装上」。模式选创造模式，模型是默认的 Flash 加 High 档，同样是一个全新的隔离目录，时间是10月20日早上。结果：2分26秒，49步，56次工具调用，答案还是 6。', en: 'No mention of cordis_inspect or of attaching anything, only "make it a plugin and install it". Creator mode, default Flash at High tier, a fresh isolated directory, on the morning of Oct 20. Result: 2m26s, 49 steps, 56 tool calls, and the answer is still 6.' },
          },
          {
            type: 'p',
            zh: '这一次它手里的工具不一样了。**0.1.6-alpha.2 起，创造模式默认不再给那套「定义、运行、停止、注销」的动态工具**，换成了两件只读的自检工具（列出、查询）加一个插件管理器。于是它没法再往活的运行时里塞一段代码，只能老老实实写一个插件包，叫插件管理器装上。那套动态工具还在，挂在一个默认不装的可选覆盖层里。',
            en: 'The toolset had changed. **Since 0.1.6-alpha.2, creator mode no longer ships the define/run/stop/unregister dynamic tools by default**; it gives two read-only inspection tools (list, query) plus a plugin manager instead. So it could not push code into the live runtime and had to write a real plugin bundle and ask the plugin manager to install it. The dynamic tools still exist, behind an optional overlay that is not installed by default.',
          },
          {
            type: 'table',
            head: [
              { zh: '阶段', en: 'Phase' },
              { zh: '调用', en: 'Calls' },
              { zh: '它在干什么', en: 'What it was doing' },
            ],
            rows: [
              [
                { zh: '读', en: 'Read' },
                { zh: '第 1 到 28 次', en: 'Calls 1-28' },
                {
                  zh: '先加载 `cordis-plugin-development` 技能，再用自检工具看运行时，然后去安装目录里翻几个现成的官方插件（比如管待办清单的那个）的源码和类型声明',
                  en: 'Loaded the `cordis-plugin-development` skill, inspected the runtime with the self-check tools, then read the source and declarations of several shipped official plugins (the todo-list one, for instance)',
                },
              ],
              [
                { zh: '写', en: 'Write' },
                { zh: '第 29 到 37 次', en: 'Calls 29-37' },
                { zh: '建目录，写 7 个文件，用 node 跑一遍语法检查和计数测试', en: 'Created the directory, wrote 7 files, ran a syntax check and a counting test with node' },
              ],
              [
                { zh: '装', en: 'Install' },
                { zh: '第 38 到 45 次', en: 'Calls 38-45' },
                { zh: '叫插件管理器安装，失败一次，修好环境，再装', en: 'Called the plugin manager to install, failed once, fixed the environment, installed again' },
              ],
              [
                { zh: '验', en: 'Verify' },
                { zh: '第 46 到 56 次', en: 'Calls 46-56' },
                { zh: '用自检工具确认新工具在列表里，实际调用两次，顺手查了查自己画的图标', en: 'Confirmed with the self-check tools that the new tool is in the list, called it twice, and checked the icon it had drawn' },
              ],
            ],
            note: { zh: '8月是前 14 步、20 次调用在读，动手只占最后 4 次。10月读的比例下来了一些，但仍然有一半的调用花在读上——它给自己加东西之前，先把自己身上现成的同类零件拆开看一遍。这个习惯两个版本都有。', en: 'In Aug, 14 steps and 20 calls were reading, with only the last 4 doing anything. The Oct reading share dropped but is still about half of all calls - before adding a part to itself it takes apart the similar parts already fitted. Both versions show the habit.' },
          },
          {
            type: 'diagram',
            id: 'plugin-layers',
            caption: { zh: '8月走的是内存里的那条路：定义 → 挂进活的运行时，没有文件；10月走的是插件管理器那条路：写包 → 审批 → 装盘 → 重启还在。', en: 'Aug took the in-memory road - define, then attach to the live runtime, no files. Oct took the plugin-manager road - write the bundle, get approval, install to disk, survive a restart.' },
          },
          {
            type: 'code',
            lang: 'text',
            title: '10月交上来的是一个插件包',
            code: `plugins/count-chinese/
├── index.js          # 注册 count_chinese 工具，66 行
├── package.json      # 零依赖，没有构建和安装脚本
├── cordis.patch.yml  # 告诉 dsh 启动时把这个插件插进去，4 行
├── locale/zh.json    # 插件页上显示的中文名「汉字计数器」
├── locale/en.json    # 英文名
├── icon.svg          # 它自己画的图标
└── README.md`,
            note: { zh: 'index.js 之外的那些文件在8月那 20 行里都没有对应物。名字、图标、多语言说明、给人看的 README，是一件插件要在插件管理页上作为「一件东西」被人看见、被人管理所需要的。多语言标题和图标是 0.1.7-rc.1 引入的可选声明，官方模板默认都带。', en: 'None of the files besides index.js had a counterpart in the Aug twenty lines. Name, icon, localised descriptions and a human README are what a plugin needs in order to appear and be manageable as one object on the plugin page. Localised titles and icons became optional declarations in 0.1.7-rc.1, and the official template ships both.' },
          },
          {
            type: 'p',
            zh: '判断「算不算汉字」那一行也变了。8月它写了三段码位范围；这次它用的是 Unicode 的一个属性，一行：',
            en: 'The line deciding what counts as Chinese changed too. Aug wrote three code-point ranges; Oct used one Unicode property, in one line:',
          },
          {
            type: 'code',
            lang: 'ts',
            title: '10月的判据',
            code: `const HAN = /\\p{Unified_Ideograph}/gu`,
            note: { zh: '这个属性把基本区和所有扩展区都包进去了。它在回答里列了测过的边界：扩展A、扩展B的冷僻字算；标点、字母、数字、日文假名、韩文不算，连「々」这种重复符号也不算。返回值也多了一项，汉字数之外还给了总字符数。', en: 'The property covers the base block and every extension plane. It listed the boundaries it tested: extension A and B rarities count; punctuation, letters, digits, Japanese kana and Hangul do not, and neither does a repetition mark such as the Japanese iteration symbol. The return value grew a second field - total character count alongside the Chinese count.' },
          },
        ],
      },
      {
        id: 'oct-approval',
        title: { zh: '装插件这一步，要你点一次头', en: 'Installing Needs Your Click' },
        blocks: [
          {
            type: 'p',
            zh: '它写完文件，叫插件管理器安装，输入框被一张审批卡片顶掉了。卡片原文：「允许本次操作使用 danger-full-access 权限：`plugin_manager {"action":"install_bundle", ...}`. Profile changes persist across sessions; installed Host code runs outside the workspace sandbox.」卡片里那段英文是插件管理器自己的说明，不是模型写的。后半句翻译过来是：**这次改动会跨会话保留；装进去的代码跑在工作区沙箱外面**。这句话把8月那段「它不是安全边界」的风险声明，换成了一个每次都要你亲手点的按钮。作者点了「允许一次」。',
            en: 'After writing the files it asked the plugin manager to install, and the input box was replaced by an approval card reading: allow this operation with danger-full-access permission - `plugin_manager {"action":"install_bundle", ...}`; profile changes persist across sessions; installed Host code runs outside the workspace sandbox. That English text is the plugin manager\'s own explanation, not the model\'s. It converts the Aug "this is not a security boundary" disclosure into a button you press every time. The author clicked allow once.',
            source: { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'diagram',
            id: 'approval-flow',
            caption: { zh: '一次装插件要弹两次审批：安装本身一次，环境修复后重试再一次；中间那次失败是找不到 pnpm。', en: 'One plugin install raises two approval cards - the install itself, then a retry after the environment fix; the failure in between was a missing pnpm.' },
          },
          {
            type: 'steps',
            items: [
              {
                title: { zh: '第一次装失败了，它没替作者改系统', en: 'The first install failed, and it did not edit the system' },
                desc: { zh: '安装报错：找不到 pnpm——插件管理器要用 pnpm 装包，这台电脑上没装。它先查本机有哪些包管理器，发现有一个 corepack 缓存着 **pnpm 11.15.1**；它知道 `corepack enable pnpm` 能一劳永逸，但那条命令会往 `/opt/homebrew/bin` 里写东西。它没跑，而是在 npx 缓存那个本来就归 dsh 用的目录里放了一个小脚本，把 pnpm 指过去，再装一次。', en: 'The install failed: pnpm not found - the plugin manager installs with pnpm, and this machine had none. It surveyed the available package managers, found a corepack cache holding **pnpm 11.15.1**, and knew that `corepack enable pnpm` would fix it permanently, but that command writes into `/opt/homebrew/bin`. So it did not run it; instead it dropped a small script in the npx cache directory that already belongs to dsh, pointed pnpm there, and retried.' },
              },
              {
                title: { zh: '又弹了一次审批，这次装上了', en: 'A second approval card, then success' },
                desc: { zh: '收尾的回答里它单独开了一节「三件你该知道但没提的」，第一件就是这个：一劳永逸的修法是 `corepack enable pnpm`，但它会往 `/opt/homebrew/bin` 写东西，属于系统改动，我等你点头再做。第三件是卸载方法：插件管理器的 **`remove_bundle`**，目标填 **`@local/plugin-count-chinese`**。', en: 'Its closing answer opened a section titled "three things you should know that I did not ask about". The first was exactly this: the permanent fix is `corepack enable pnpm`, but it writes into `/opt/homebrew/bin`, which is a system change, so I will wait for your nod. The third was how to uninstall: the plugin manager\'s **`remove_bundle`**, with the target **`@local/plugin-count-chinese`**.' },
              },
              {
                title: { zh: '重启之后，它还在', en: 'After a restart, it is still there' },
                desc: { zh: '这是8月那一遍做不到的部分。把 dsh 整个关掉、重新启动、开一个标准模式的新会话问「用 count_chinese 数一下「从开机到拆开」有几个汉字」：**3 秒、2 步、一次工具调用，答 6**。这一场请求头里标准模式的工具从 31 件变成 32 件；又在 PTC 和极简模式里各开了一场，极简模式手里从 3 件变成 4 件，多的也是它。插件页「已安装插件」那一栏多了一张卡片，红色图标是它自己画的。', en: 'This is the part the Aug run could not do. Quitting dsh entirely, relaunching, and opening a standard-mode session asking count_chinese to count the characters of a six-character phrase took **3 seconds, 2 steps, one tool call, and answered 6**. In that session the standard-mode tool list in the request header went from 31 to 32; separate PTC and minimal-mode sessions showed minimal mode going from 3 tools to 4, the extra one being the same tool. The installed-plugins section gained a card with a red icon the plugin drew itself.' },
              },
            ],
          },
          {
            type: 'code',
            lang: 'bash',
            title: '只有翻日志才看得见的那一下',
            code: `zstd -dc ~/.dsh/sessions/*/session-*/session.v4.jsonl.zstd | grep -c '"type":"request/header"'
zstd -dc ~/.dsh/sessions/*/session-*/session.v4.jsonl.zstd | python3 -c "import json,sys; [print(d['data']['reason'], len(d['data']['header']['tools'])) for d in map(json.loads, sys.stdin) if d.get('type')=='request/header']"`,
            note: { zh: '每次请求发给模型之前，系统会把「你现在有哪些工具」这份清单塞进请求头里；日志只在这份清单变化时记一条，那场会话整场只记了两条，打出来是 initial 32 和 change 33。第一条在开头，第二条在第 17 步，多出来的正是 count_chinese；连它自己给出的记录理由都写在那儿——一条是开局，一条是变了。8月的文件名不带 .v4。', en: 'Before every request the system puts the current tool list into the request header, and the log records one line only when that list changes - that session logged exactly two, printing initial 32 and change 33. The first is at the start, the second at step 17, the addition being count_chinese, and even the recorded reason is there: one for opening, one for changed. The Aug filename has no .v4.' },
          },
          {
            type: 'p',
            zh: '10月这一趟的账：缓存命中 280 万 token，未命中 6.7 万，输出 2.2 万，按10月低谷价约**两毛一**。这条路慢一点——8月那次只用了 4 次调用就挂上去，10月装插件这一段花了 8 次调用和两次审批。换来的是，第二天早上你打开它，能说清楚它身上多了什么、是谁装的、怎么拿掉。',
            en: 'The Oct bill: about 2.8 million cache-hit tokens, 67k misses and 22k output, roughly **0.21 RMB at off-peak pricing**. This road is slower - Aug attached in 4 calls, whereas the Oct install phase alone took 8 calls and two approvals. What you buy is that the next morning you can say what was added, who installed it, and how to take it off.',
          },
        ],
      },
      {
        id: 'why-the-invariant',
        title: { zh: '约束不是技术，是那条不变量', en: 'The Constraint Was Not Technology' },
        blocks: [
          {
            type: 'quote',
            zh: '再往前想一步，这其实有一点「自进化软件」的雏形了。DSH 现在已经可以让 Agent 检查自己的 runtime，现场写一个插件并挂载上去，然后在后续的任务里直接使用这个刚刚获得的能力。当然，现在这部分还比较实验性：动态生成的插件只存在于内存里，重启就没了，也还不能自动沉淀成一个永久插件。',
            en: 'Thinking one step further, this has a hint of self-evolving software. DSH can already let the agent inspect its own runtime, write a plugin on the spot, attach it, and then use that newly acquired capability in later tasks. This part is still experimental: dynamically generated plugins exist only in memory, vanish on restart, and cannot yet settle automatically into a permanent plugin.',
            cite: { zh: '内测开发者 JY（@jiayuan_jy）', en: 'Beta developer JY (@jiayuan_jy)' },
            source: { label: 'JY 推文 / JY on X', href: 'https://x.com/jiayuan_jy/status/2087911060154314963' },
          },
          {
            type: 'p',
            zh: '他说的每一句，8月那场实测都对上了，包括后半段那个限制。剩下的问题是：**长出来的东西，凭什么留得下来？** 10月这一遍给了答案，留下来的条件是三样——写成一个有名字、有图标、有说明的插件包；装之前你点一次「允许一次」；装完在插件页能看到、能关、能卸。他们把「改自己」整条路挪到了插件管理器上，每一步都留下文件、留下审批记录。',
            en: 'Every clause matched the Aug measurement, including the limitation in the second half. The open question is: **on what grounds does something grown this way get to stay?** The Oct run answered it with three conditions - write it as a plugin bundle with a name, an icon and a description; click "allow once" before installing; and after installation be able to see, disable and uninstall it on the plugin page. The whole "modify itself" path was moved onto the plugin manager, leaving files and approval records at every step.',
          },
          {
            type: 'callout',
            tone: 'idea',
            title: { zh: '卡住它的不是能不能，是那两条规矩', en: 'What blocked it was not capability but two rules' },
            zh: '8月那遍已经证明技术上做得到——4 次调用就把新工具挂进了活的运行时。真正划界的是两件事。第一是[第 5 章](/chapter/event-sourcing)那条不变量：模型可见的一切必须能从日志重建，所以清单变化必须由日志记下来（initial 32 / change 33 就是这条规矩在工作），而不是靠内存里一段没人知道的代码。第二是那份在启动那一刻就冻住的配置：8月它能改自己的运行时、改不了那份配置；10月它能改那份配置了，只是要过你这一关。而那份配置的一部分，就叫「模式」。这不是技术做不到，是他们不肯让「改自己」这件事绕过文件与审批。',
            en: 'The Aug run proved the capability existed - four calls were enough to attach a new tool to the live runtime. Two things drew the line. First, the invariant from [chapter 5](/chapter/event-sourcing): everything model-visible must be reconstructible from the log, which is why the tool-list change had to be recorded (initial 32 / change 33 is that rule working) rather than living as untracked code in memory. Second, the configuration frozen at launch: in Aug it could change its runtime but not that file, and in Oct it can change the file but only through you - and one section of that configuration is called "mode". The limit was never technical; it was a refusal to let self-modification bypass files and approval.',
          },
          {
            type: 'callout',
            tone: 'note',
            title: { zh: '被否掉的方案：什么被留在外面，以及为什么', en: 'Rejected: what was left outside, and why' },
            zh: '8月那套自指工具，他们**明确决定不装进默认的那份组装里**。理由是那层隔离壳的位置不对：模型写的代码在 harness 自己的进程里求值，而管束程序的那道机制只管得住它另外派出去的进程。笔记里的原话是，在网页界面上，沙箱和审批这两道关是被绕过而不是被执行。那篇笔记专门开了一节，标题叫「什么被留在外面，以及为什么」，作者写明这一节存在的目的，是让「我们忘了装」和「我们决定不装」这两件事保持可分辨。同一个模式还有一条被否掉的路：教 agent 用设置页上那个「有没有坏」的字段来自查作品——否决理由是它对每一种真正要命的失败都放行，而**把它当成验证来呈现，恰恰是原来那份指引让人感觉「已经完整了」的原因**。',
            en: 'The Aug self-referential toolset was **deliberately kept out of the default assembly**. The reason: the isolation shell sits in the wrong place - code the model writes is evaluated inside the harness\'s own process, while the mechanism that constrains programs only governs processes it spawns. The note says plainly that on the web UI, sandbox and approval are bypassed rather than enforced. That note opens a section titled "what was left outside, and why", whose stated purpose is to keep "we forgot to ship it" distinguishable from "we decided not to ship it". A second route in the same mode was also rejected: teaching the agent to self-check using the "is it broken" field on the settings page - refused because it passes every failure that actually matters, and **presenting it as verification is precisely what made the original guidance feel complete**.',
            source: { label: '上游仓库 / DeepSeek-Harness', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
          },
          {
            type: 'p',
            zh: '如果你要自己写一个最小插件，官方教程里最小的那个例子是这样（作者不写代码，这一条是给读者的门槛参照）：',
            en: 'If you want to write a minimal plugin yourself, the smallest example in the official tutorial looks like this - the author does not write code, so treat it as a threshold reference:',
          },
          {
            type: 'code',
            lang: 'ts',
            title: '最小插件的形状',
            code: `import type { Context } from '@deepseek-ai/cordis'

export const name = 'hello-plugin'

export function apply(ctx: Context) {
  // Required dependencies are ready before apply runs.
  console.log('[hello-plugin] plugin loaded!')
}`,
            note: { zh: '一个插件就是「一个有名字的模块 + 一个 apply 函数」。对比8月那 20 行：它把同样的 apply 函数交给运行时求值，不落盘。', en: 'A plugin is one named module plus an apply function. Compare the Aug twenty lines: same apply function, evaluated by the runtime instead of written to disk.' },
            source: { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'links',
            title: { zh: '接着往下', en: 'Where to go next' },
            items: [
              {
                label: { zh: '第 5 章：每一次运行都有迹可循', en: 'Chapter 5: every run leaves a trace' },
                href: '/chapter/event-sourcing',
                desc: { zh: 'initial 32 / change 33 那两条日志的来历。', en: 'Where the initial 32 / change 33 records come from.' },
                tag: 'internal',
              },
              {
                label: { zh: '第 8 章：创造模式那一栏', en: 'Chapter 8, the creator-mode entry' },
                href: '/chapter/ptc',
                desc: { zh: '31 件工具加 3 件，插件管理器的位置。', en: 'Thirty-one tools plus three, and where the plugin manager sits.' },
                tag: 'internal',
              },
              {
                label: { zh: 'JY 的公开观察', en: 'JY\'s public observation' },
                href: 'https://x.com/jiayuan_jy/status/2087911060154314963',
                desc: { zh: '「自进化软件」雏形那句话的原文。', en: 'The original wording behind the self-evolving-software remark.' },
                tag: 'source',
              },
              {
                label: { zh: '上游仓库', en: 'Upstream repository' },
                href: 'https://github.com/deepseek-ai/DeepSeek-Harness',
                desc: { zh: 'cordis 插件层与那节「什么被留在外面」。', en: 'The cordis plugin layer and the left-out section.' },
                tag: 'source',
              },
              {
                label: { zh: '发布门禁', en: 'Release gates' },
                href: '/gates',
                desc: { zh: '审批卡片与配置冻结在门禁里的位置。', en: 'Where approval cards and the frozen config sit in the gates.' },
                tag: 'internal',
              },
            ],
          },
        ],
      },
    ],
    sources: [
      { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
      { label: 'JY 推文 / JY on X', href: 'https://x.com/jiayuan_jy/status/2087911060154314963' },
      { label: '上游仓库 / DeepSeek-Harness', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
      { label: 'DeepSeek 官方文档 / DeepSeek Docs', href: 'https://api-docs.deepseek.com/' },
    ],
    sisters: ['harness-engineering', 'agent-skillhub-patterns', 'mcp-patterns'],
  },
  {
    slug: 'ptc',
    num: '08',
    part: 'core',
    icon: 'code',
    level: 'advanced',
    minutes: 15,
    accent: 'green',
    title: { zh: '让模型写程序：PTC 的账', en: 'Program Tool Calling: the Counter-Intuitive Bill' },
    subtitle: {
      zh: '把25件工具收成1件，结果首轮多花9%、总账全面更贵。',
      en: 'Collapsing 25 tools into one cost 9% more on the first round and more everywhere else.',
    },
    promise: {
      zh: '读完这章，你能用一句话判断手里的活该不该切到 PTC，并能从日志里指出它省的和付的分别是哪一项。',
      en: 'You will be able to decide in one sentence whether your job belongs in PTC, and point from the log at exactly what it saved and what it paid for.',
    },
    sections: [
      {
        id: 'the-old-way',
        title: { zh: '先看它现在是怎么被使唤的', en: 'How the Model Is Driven Today' },
        blocks: [
          {
            type: 'p',
            zh: '让它干一件十几步的活，会有一个很实在的体感：越干越慢，而且越干越健忘。这不是错觉，结构就是这么定的。现在这类工具的干活方式是一问一答：模型说「读这个文件」，系统把整份文件内容塞回它眼前；它看完说「改第30行」，改完的结果又塞回去；它再说「跑一下测试」，测试输出接着塞。十步就是十个来回，而且每一轮的中间结果都留在它眼前，一路堆着不走。',
            en: 'Give it a job of a dozen steps and there is a concrete feel: it slows down as it goes and gets more forgetful as it goes. That is not an illusion, it is how the structure is defined. These tools work question and answer: the model says read this file, the system pushes the whole file back in front of it; it says edit line 30, the result is pushed back; it says run the tests, the test output is pushed back. Ten steps are ten round trips, and every intermediate result stays in view, piling up.',
          },
          {
            type: 'quote',
            zh: '每一个中间的工具结果都会在下一次请求时重新进入模型上下文……对多步工具工作而言，这既费 token 又是串行的。模型没法组合工具，除非每次调用都走一整个模型往返，而每一次往返都把整个中间结果拖回上下文，不管模型需不需要。',
            en: 'Every intermediate tool result re-enters the model context on the next request... for multi-step tool work this is both token-expensive and serial. The model cannot compose tools unless each call takes a full model round trip, and every round trip drags the entire intermediate result back into context whether the model needs it or not.',
            cite: { zh: '仓库里对这条老路的描述（橙皮书中译）', en: 'The repo\'s description of this old path (translated in the Orange Book)' },
            source: { label: '上游仓库 / DeepSeek-Harness', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
          },
          {
            type: 'list',
            zh: [
              '**慢**：十次工具调用等于十次模型推理。',
              '**挤**：模型的注意力被一堆它其实已经不需要看的原文占着。',
              '**第三笔藏在开口之前**：标准模式是背着全套家伙上门的维修师傅，螺丝刀、万用表、梯子都在，搞不定还能打电话叫同事。失真是——真师傅不会因为带了梯子就每次开口前把梯子说明书念一遍，而这里**二三十件工具的说明书每一轮对话都要重新发一遍给模型**。这笔固定开销每轮都付，也正是下一个模式想动的地方。',
            ],
            en: [
              '**Slow**: ten tool calls equal ten model inferences.',
              '**Crowded**: the model\'s attention is occupied by source text it no longer needs to look at.',
              '**A third cost sits before it even speaks**: standard mode is a repair technician arriving with the full kit - screwdrivers, multimeter, ladder - and a colleague to phone if stuck. The distortion: a real technician does not read out the ladder manual before every sentence, yet here **the documentation for two or three dozen tools is resent to the model every single turn**. That fixed overhead is paid every turn, and it is exactly what the next mode wants to touch.',
            ],
          },
        ],
      },
      {
        id: 'what-ptc-is',
        title: { zh: 'PTC 改的是什么', en: 'What PTC Changes' },
        blocks: [
          {
            type: 'p',
            zh: '界面上说它有标准模式的全部能力，还能让模型用一个程序把多步操作串起来。实际是：**模型眼前只剩一件工具，就是那个「跑一段代码」的入口 `run_code`**。它不再一件件点，而是写一段 TypeScript 程序，想调几次工具就在程序里调几次，想循环就循环，跑完只把自己挑出来的那点结论说出来。',
            en: 'The UI says it has all of standard mode\'s capability plus the ability to chain multi-step operations in one program. In practice **only one tool remains in front of the model: the run-a-piece-of-code entry point, `run_code`**. It stops clicking tools one by one and instead writes a TypeScript program, calling tools as often as it likes, looping as it likes, and reporting only the conclusion it chose to surface.',
          },
          {
            type: 'code',
            lang: 'text',
            title: '系统提示词里的题眼（逐字）',
            code: `用 return 和/或 console.log(...) 产出结果。
只有你打印或返回的东西会回到你这里，中间工具结果永远不进入对话，所以只提取你需要的。`,
            note: { zh: '这条规矩是明写给模型看的。10月量到模型手里仍然只有 run_code 一件，系统提示词 41,267 个字符，结构没变。', en: 'This rule is written for the model to read plainly. In Oct the model still held only run_code, with a 41,267-character system prompt and the same structure.' },
            source: { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'callout',
            tone: 'idea',
            title: { zh: '那25件工具去哪了：报关单挪进信封', en: 'Where the 25 tools went: the customs slip moves inside the envelope' },
            zh: '没消失，只是换了个地方待着。把一次请求想成一个寄出去的信封：那25件工具原来是一张报关单，夹在信封外面，收件方先看报关单再拆信；PTC 模式把这张报关单撕下来，**一字不落地抄成一份说明，跟信纸一起装进信封里**。东西一件没少，字数一个没省，变的只是位置。执行层面卡得很死，点名任何其他工具的调用都会被当场判为未知工具。',
            en: 'They did not disappear, they relocated. Treat one request as an outgoing envelope: in standard mode the 25 tools are a customs declaration clipped outside, read before the letter is opened. PTC tears that declaration off and **copies it, word for word, into an instruction sheet filed inside the envelope with the letter**. Nothing was removed, not one character was saved, only the position changed. At execution time it is clamped hard - any call naming another tool is judged an unknown tool on the spot.',
          },
          {
            type: 'cards',
            items: [
              {
                icon: 'target',
                title: { zh: '谁会用', en: 'Who uses it' },
                desc: { zh: '做那种「一口气有十几步、中间产物又大」的活的人。比如把一个目录里所有文件读一遍、算点东西、只要一个结论。', en: 'Anyone whose job is a dozen steps at once with large intermediate output - read every file in a directory, compute something, want one conclusion back.' },
              },
              {
                icon: 'check',
                title: { zh: '不用它会怎样', en: 'What you lose by not using it' },
                desc: { zh: '你什么能力都不会少。它是可选项而不是默认形态，这一点是他们主动选的，理由在本章末尾的被否方案里。日常类比：标准模式是你对着助理一句句下指令，每句都要听完整段回话；PTC 是你写一张纸条——把这三个文件都打开，找出所有含 TODO 的行，只把行号告诉我——他照做，只回你一串行号。', en: 'No capability at all. It is optional rather than the default shape, chosen deliberately, for the reasons in the rejected-options note at the end of this chapter. The everyday analogy: standard mode is instructing an assistant sentence by sentence and hearing each reply in full; PTC is passing a note - open these three files, find every line containing TODO, give me only the line numbers - and getting back a list of numbers.' },
              },
            ],
          },
          {
            type: 'p',
            zh: '名字这件事比看上去可疑。8月这个模式在英文界面里叫 Code mode，代码目录就叫 `code`，「PTC」这三个字母只存在于中文界面，作者翻遍仓库也没找到它是什么的缩写。到 0.1.0-rc.7，英文也改叫 PTC mode 了，代码包后来改名叫 `ptc-runtime`。行业里有一个同名缩写，指的是让模型用程序去调工具，含义对得上；仓库里仍然没有一处展开过这三个字母。顺带一提，「创造模式」英文叫 Creator mode，目录名却是 `cordis`，那是它挂的插件包的名字——中文界面这一栏跟代码里的叫法基本是各叫各的。',
            en: 'The name is more suspicious than it looks. In Aug this mode was called Code mode in the English UI and its code directory was `code`, while the three letters PTC existed only in the Chinese UI - the author searched the repo and never found what they abbreviate. By 0.1.0-rc.7 the English UI also became PTC mode, and the code package later took the name `ptc-runtime`. There is an industry abbreviation of the same letters meaning the model calling tools through a program, and the sense matches; the repo still expands the letters nowhere. Incidentally, creator mode is Creator mode in English but its directory is `cordis`, after the plugin package it hangs - the Chinese UI labels and the code names largely live separate lives.',
          },
        ],
      },
      {
        id: 'fixed-cost',
        title: { zh: '模型开口前就背上的那笔账', en: 'The Debt It Carries Before Speaking' },
        blocks: [
          {
            type: 'p',
            zh: '8月在 0.1 版上做的对照实验：一个只有三个小文件的临时目录，一句大白话任务——把工作区里所有文件找出来，逐个统计行数和字符数，找出最大的那个，最后写成一份报告。模型选 V4-Pro、推理档拉到最高；然后同一句任务、同一批文件，用标准模式再跑一遍，并把标准模式那侧的默认模型也顶成 V4-Pro、推理档一样拉满，两边真的可比。',
            en: 'The controlled experiment was run in Aug on 0.1: a temp directory holding three small files and one plain-language task - find every file in the workspace, count lines and characters for each, identify the largest, and write a report. Model V4-Pro, reasoning tier maxed. Then the same task and the same files again in standard mode, with that side\'s default model also forced to V4-Pro and its tier maxed, so the two were genuinely comparable.',
          },
          {
            type: 'table',
            head: [
              { zh: '模型开口前就背上的固定账', en: 'Fixed debt before the model speaks' },
              { zh: '标准模式', en: 'Standard mode' },
              { zh: 'PTC 模式', en: 'PTC mode' },
            ],
            rows: [
              [{ zh: '模型看得见的工具数', en: 'Tools visible to the model' }, { zh: '25 件', en: '25' }, { zh: '1 件', en: '1' }],
              [{ zh: '工具参数表的体积', en: 'Tool parameter table' }, { zh: '26,894 字符', en: '26,894 characters' }, { zh: '897 字符', en: '897 characters' }],
              [{ zh: '系统提示词', en: 'System prompt' }, { zh: '4,100 字符', en: '4,100 characters' }, { zh: '35,643 字符', en: '35,643 characters' }],
              [{ zh: '第一轮真实输入 token', en: 'First-round real input tokens' }, { zh: '13,842', en: '13,842' }, { zh: '15,040', en: '15,040' }],
            ],
            note: { zh: '看第二行和第三行：工具参数表确实从两万六缩到了九百，省得很漂亮；但系统提示词从四千涨到了三万五。那25件工具的类型定义一个字都没有消失。换算到第一轮真正发出去的输入，PTC 不但没省，还多花了大约 9%。', en: 'Read rows two and three: the parameter table really did shrink from twenty-six thousand to nine hundred, a beautiful saving, while the system prompt grew from four thousand to thirty-five thousand. Not one character of those 25 tools\' type definitions disappeared. Converted into the input actually sent on the first round, PTC did not save anything - it spent about 9% more.' },
            source: { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'quote',
            zh: '所以正确的说法是：PTC 不省在前面。它要省，只能省在后面。',
            en: 'So the correct statement is: PTC does not save at the front. If it saves anywhere, it is at the back.',
            cite: { zh: '橙皮书 §08', en: 'Orange Book, section 08' },
          },
          {
            type: 'p',
            zh: '三万五的系统提示词每轮都发一遍，那不烧钱吗？这一场的账是 **140,672 个缓存命中对 17,591 个新输入**——那一大段从第二轮起就走缓存价。按官方定价表 8月13日的快照，V4-Pro 缓存命中的输入价是每百万 0.003625 美元，未命中 0.435 美元，差一百二十倍。',
            en: 'A thirty-five-thousand-character system prompt resent every turn - does that not burn money? This run tallied **140,672 cache-hit tokens against 17,591 new input tokens**: that large block has been travelling at cache price since the second round. On the official price list snapshot of Aug 13, V4-Pro cache-hit input was USD 0.003625 per million and a miss 0.435, a factor of one hundred and twenty.',
            source: { label: 'DeepSeek 官方定价页 / DeepSeek Pricing', href: 'https://api-docs.deepseek.com/quick_start/pricing' },
          },
          {
            type: 'p',
            zh: '还有一笔开口前的固定成本两边一模一样，正好能当尺子用：每次请求都会额外注入一份这台机器上的 skill 目录，两场会话里都是 **16,542 个字符，一个字不差**；任务原话只有 57 个字符。**290 倍。** 这笔钱跟选哪个模式没关系，是自己攒的东西被读进去了，[第 6 章](/chapter/cost)专门算过它值多少钱。这个 16,542 是从日志里一个字一个字数出来的，不是拿减法估的。',
            en: 'One more fixed cost before speaking is identical on both sides and makes a useful ruler: every request additionally injects this machine\'s skill catalog, and in both sessions it measured **16,542 characters, to the character**, while the task sentence itself was 57 characters. **A ratio of 290.** That money has nothing to do with which mode you pick - it is your own accumulated material being read in, priced in [chapter 6](/chapter/cost). The 16,542 was counted character by character out of the log, not estimated by subtraction.',
          },
        ],
      },
      {
        id: 'inner-and-programs',
        title: { zh: '省的是中间结果，不是那张报关单', en: 'It Saves Intermediates, Not the Slip' },
        blocks: [
          {
            type: 'list',
            zh: [
              '**模型真正开口调工具：5 次**，全是「跑一段代码」。',
              '**这 5 段程序在里面实际发起的操作：15 次**——找文件 3 次、跑命令 3 次、写文件 5 次、读文件 4 次。',
              '**回到模型面前的，只有那 5 段程序各自挑出来的结论。** 中间那 10 次的输出，完整的文件列表、Python 脚本打印的一大坨统计、每个文件的原文，从头到尾没有进过模型的眼睛。',
            ],
            en: [
              '**The model genuinely called tools 5 times**, every one of them run-a-piece-of-code.',
              '**Those five programs launched 15 operations inside themselves** - 3 file globs, 3 shell commands, 5 writes, 4 reads.',
              '**What came back to the model was only the conclusion each of the five programs picked out.** The other 10 outputs - the full file list, the slab of statistics the Python script printed, the source of every file - never entered the model\'s view.',
            ],
          },
          {
            type: 'p',
            zh: '有一件事跟[第 5 章](/chapter/event-sourcing)那份会话日志接得上：那 10 次操作不是蒸发了。它们以「代码内派发」这一类事件老老实实落在会话日志里，**模型读不到，但你能倒带看**。',
            en: 'One thing connects back to the session log in [chapter 5](/chapter/event-sourcing): those 10 operations did not evaporate. They land in the log as code-internal dispatch events - **unreadable by the model, but rewinderable by you**.',
          },
          {
            type: 'code',
            lang: 'ts',
            title: '第一段程序：它在探路',
            code: `const ws = ".../scratchpad/dsh-lab";
const g = await tools.glob({ pattern: "**/*", path: ws });
console.log("root:", g.root);
console.log("count:", g.paths.length);
const py = await tools.bash({
  command: "python3 --version 2>&1; echo ---; wc --version 2>&1 | head -1",
  description: "Check python3 and wc availability"
});
console.log("tools:", py.stdout.text);
return { root: g.root, count: g.paths.length, sample: g.paths.slice(0, 20) };`,
            note: { zh: '不写代码也能看出两件事：工具在这里是一组普通的函数，写法跟调用任何一个现成的库没区别；它拿到的返回值是有结构的东西（路径列表、命令的标准输出），能直接拿去算，而不是一坨等着被猜格式的文字。模型敢直接写「这个结果的某某字段」，是因为抄进信封里的那份说明已经把形状告诉它了。', en: 'Two things show without being a coder: tools here are ordinary functions, called exactly like any library, and the values back are structured - path lists, command stdout - so they can be computed on instead of being text whose format must be guessed. The model dares to write "the such-and-such field of this result" because the specification copied into the envelope already told it the shape.' },
          },
          {
            type: 'code',
            lang: 'ts',
            title: '第二段程序：用 JavaScript 编排，中途落盘一段 Python 做计算',
            code: `// Write file list as JSON (avoids shell quoting issues)
await tools.write({ file_path: "/tmp/dsh_files.json", content: JSON.stringify(absPaths) });

const py = \`import sys, json
  ...
print(json.dumps(out, ensure_ascii=False))
\`;
await tools.write({ file_path: "/tmp/dsh_count.py", content: py });

const run = await tools.bash({ command: "python3 /tmp/dsh_count.py", ... });
const stats = JSON.parse(run.stdout.text);`,
            note: { zh: '注释是它自己写的：用 JSON 传文件列表，是为了绕开命令行的引号转义——它知道那儿是个坑。拿到 Python 打印的结果之后，它在 JavaScript 里排序、求和、拼成 Markdown 表格，写进报告，最后还顺手删掉了两个临时文件。到这儿它写的已经是个小程序了。两处省略号是橙皮书转录时的节选，其余逐字。', en: 'The comment is its own: passing the file list as JSON avoids shell quoting - it knew that was a trap. After parsing what Python printed it sorted, summed and assembled a Markdown table in JavaScript, wrote the report, and deleted the two temp files on the way out. By then what it wrote was a small program. The two ellipses are the Orange Book\'s own abridgement while transcribing; everything else is verbatim.' },
          },
          {
            type: 'table',
            head: [
              { zh: '第几次程序', en: 'Which program' },
              { zh: '它在干什么', en: 'What it was doing' },
            ],
            rows: [
              [{ zh: '1', en: '1' }, { zh: '探路：列文件，确认统计工具能用', en: 'Scouting: list files, confirm the counting tools work' }],
              [{ zh: '2', en: '2' }, { zh: '统计，写出第一版报告', en: 'Compute the statistics and write the first draft of the report' }],
              [{ zh: '3', en: '3' }, { zh: '回读校验：把三个文件和自己刚写的报告都读一遍对答案', en: 'Read back to verify: reread the three files and the report it had just written' }],
              [{ zh: '4', en: '4' }, { zh: '发现「最大的文件」有并列，重写一版，补上口径说明', en: 'Discover the largest file is a tie, rewrite, add a note on the counting rule' }],
              [{ zh: '5', en: '5' }, { zh: '再修一次：把报告自己排除出统计范围，写最终版', en: 'Fix once more: exclude the report itself from the statistics, write the final version' }],
            ],
            note: { zh: '第3步是自发的，任务里没有一个字让它校验。第5步补的那个漏洞更细：它写出来的那份报告本身也躺在工作区里，会被下一轮统计扫进去——这是那种人也经常想不到的自指坑。代价是慢：光第一轮它就思考了 9,056 个 token，整场输出里 76% 是在想而不是在写，这是最高推理档的表现，不免费。', en: 'Step 3 was spontaneous - nothing in the task asked for verification. The hole closed at step 5 is subtler: the report it wrote also lies in the workspace and gets swept up by the next round of counting, a self-referential trap a person often misses. The price is slowness: the first round alone spent 9,056 thinking tokens, and 76% of all output was thinking rather than writing. That is what the top reasoning tier costs, and it is not free.' },
          },
        ],
      },
      {
        id: 'the-bill',
        title: { zh: '两边都答对了，然后账单差了一个数量级', en: 'Both Right, Bills an Order Apart' },
        blocks: [
          {
            type: 'table',
            head: [
              { zh: '跑完这一件活的总代价', en: 'Total cost of this one job' },
              { zh: '标准模式', en: 'Standard mode' },
              { zh: 'PTC 模式', en: 'PTC mode' },
            ],
            rows: [
              [{ zh: '步数', en: 'Steps' }, { zh: '4', en: '4' }, { zh: '6', en: '6' }],
              [{ zh: '模型开口调工具', en: 'Model tool calls' }, { zh: '7 次', en: '7' }, { zh: '5 次', en: '5' }],
              [{ zh: '程序内部派发的调用', en: 'Dispatches inside the programs' }, { zh: '0', en: '0' }, { zh: '15 次', en: '15' }],
              [{ zh: '新输入 token 合计', en: 'New input tokens' }, { zh: '14,447', en: '14,447' }, { zh: '17,591', en: '17,591' }],
              [{ zh: '输出 token 合计', en: 'Output tokens' }, { zh: '1,416', en: '1,416' }, { zh: '17,235', en: '17,235' }],
              [{ zh: '其中思考', en: 'of which thinking' }, { zh: '739', en: '739' }, { zh: '13,095', en: '13,095' }],
              [{ zh: '端到端耗时', en: 'End-to-end time' }, { zh: '21.9 秒', en: '21.9 s' }, { zh: '305.9 秒', en: '305.9 s' }],
            ],
            note: { zh: '答案两边都对：都统计出了行数和字符数，都写出了报告，都发现「最大的文件」有两个并列。慢十几倍，输出 token 十二倍，连新输入都多了 22%。它唯一少的是模型开口的次数，5 次对 7 次，而那恰好是这张表里最不值钱的一项。', en: 'Both answers were correct: both counted lines and characters, both produced a report, both found the largest file was a tie. An order of magnitude slower, twelve times the output tokens, and even new input 22% higher. The only thing it did with less was calling tools from the model - 5 against 7 - which happens to be the cheapest line on this table.' },
            source: { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '在这件活上，PTC 全面更贵', en: 'On this job PTC is more expensive across the board' },
            zh: '原因是前面那条机制自己写好的：PTC 省的是中间结果的体积，而这件活的中间结果一共三个小文件，压根没什么可藏的。入场费照付，首轮就多掏 1,198 个 token，什么也没换回来。多出来的部分几乎全在输出侧——模型得先把整套流程在脑子里过一遍再写成程序，13,095 个思考token 花在这儿，中途还自己回读校验、前后重写了两版报告。所以「PTC 更省」这个说法，在这台机器上不成立。**PTC 是一个赌注：你赌这件活的中间会产生一大堆不需要模型看见的东西。任务越碎、中间产物越大，赌赢的面越大；小任务上它稳输，因为根本没有东西可藏，你为那张用不上的报关单付了全款。**',
            en: 'The reason is written into the mechanism itself: PTC saves intermediate volume, and this job\'s intermediates were three small files with essentially nothing worth hiding. The entry fee was still paid, the first round cost 1,198 extra tokens, and nothing came back for it. Almost all the excess sits on the output side - the model must replay the whole procedure in its head before writing it as a program, which is where 13,095 thinking tokens went, plus spontaneous rereading and two report rewrites. So "PTC is cheaper" does not hold on this machine. **PTC is a wager: you bet that the middle of this job will produce a mass of things the model need not see. The more fragmented the task and the larger the intermediates, the wider the winning side; on a small task it loses reliably, because there is nothing to hide and you pay full price for a customs slip you will not use.**',
          },
          {
            type: 'stats',
            items: [
              {
                value: '+9%',
                label: { zh: '首轮真实输入', en: 'First-round real input' },
                sub: { zh: '13,842 → 15,040', en: '13,842 to 15,040' },
              },
              {
                value: '12x',
                label: { zh: '输出 token', en: 'Output tokens' },
                sub: { zh: '1,416 → 17,235（其中思考 739 → 13,095）', en: '1,416 to 17,235; thinking 739 to 13,095' },
              },
              {
                value: '305.9s',
                label: { zh: 'PTC 那场的端到端耗时', en: 'End-to-end time in the PTC run' },
                sub: { zh: '标准模式那场 21.9 秒，慢十几倍', en: '21.9 s in standard mode - an order of magnitude slower' },
              },
              {
                value: '15 : 5',
                label: { zh: '内部派发对模型开口', en: 'Inner dispatches against model calls' },
                sub: { zh: '中间 10 次的输出从没进过模型', en: 'The 10 middling outputs never entered the model' },
              },
            ],
          },
          {
            type: 'callout',
            tone: 'note',
            title: { zh: '限定得跟数字一起交出来', en: 'Hand over the caveats with the numbers' },
            zh: '这是单次实验，没有重复测量，模型本身有随机性，换个时间再跑一次差出几十秒完全正常。所以能说的是「在我这个只有三个小文件的任务上，它慢了十几倍」，说不了「实测证明 PTC 慢 14 倍」。差别不在语气客气不客气，后面那句话是在替一个没做过的实验背书。另外这组对照是8月在0.1版上做的，10月没有重跑整场对照，只量了工具数和系统提示词。',
            en: 'This is a single experiment with no repeated measurement, the model is stochastic, and rerunning at another time could easily shift the wall clock by tens of seconds. So the defensible claim is "on my three-small-file task it was an order of magnitude slower", not "measured proof that PTC is 14x slower". The difference is not politeness: the second sentence endorses an experiment nobody ran. The comparison was made in Aug on 0.1; the full comparison was not rerun in Oct, where only tool counts and system prompt length were measured.',
          },
          {
            type: 'p',
            zh: '决策就一句话：**我这件活，是不是步骤多、中间产物大、最后只要一个结论？** 是，值得切到 PTC 试一次；不是，老实待在标准模式里。',
            en: 'The decision is one sentence: **does this job have many steps, large intermediates, and only one conclusion wanted at the end?** If yes, it is worth one try in PTC; if no, stay honestly in standard mode.',
          },
        ],
      },
      {
        id: 'three-divergences',
        title: { zh: '同一条路，三家走法不一样', en: 'Three Houses, Three Versions of the Road' },
        blocks: [
          {
            type: 'p',
            zh: '让模型写程序去编排工具不是 DeepSeek 首创：Cloudflare 最早提出这个思路，写的是 TypeScript、跑在它自家的轻量隔离环境里；Anthropic 的 Programmatic Tool Calling 让模型写 Python、跑在托管的容器里。DeepSeek 在立项笔记里直接点名引用了 Cloudflare，是明确的后来者。它在三个地方走了不同的路。',
            en: 'Having the model write programs to orchestrate tools is not a DeepSeek invention: Cloudflare proposed the idea first, in TypeScript inside its own lightweight isolation environment, and Anthropic\'s Programmatic Tool Calling has the model write Python in a hosted container. DeepSeek cites Cloudflare by name in its project note, an explicit latecomer. It parts company at three points.',
          },
          {
            type: 'list',
            zh: [
              '**第一，它不靠省掉参数表来限制模型，它在执行环节堵死。** 这是被一次真实事故逼出来的：8月7日那篇修复笔记写着，把模式改成 PTC 只收敛了「广播面」，没收敛「执行面」——发给模型的确实只有一件工具，但执行器那边照单全收；模型只要直接喊出一个原生工具名，调用照样穿过管线执行了，尽管它的参数表从来没发出去过。那句结论值得抄下来：**当直接调用方能绕过时，省略参数表不构成任何强制。** 修法是在执行器里堵，而且拒绝消息还带着回家的路——明确告诉模型「只有跑代码这一件能直接调，其他的请在程序里调」，因为一句光秃秃的「未知工具」会让模型以为是部署坏了，而不是纠正自己。作为对照，Anthropic 在自家文档里把同一件事写成了警告：别把这个字段当安全边界，你的客户端仍然要准备好处理模型的直呼。',
              '**第二，它默认不让程序之间共享状态。** 每跑一段程序开一个全新的隔离环境，跑完就死，上一段程序留下的变量下一段拿不到。这在性能上是往后退的：跨调用的状态对会话日志不可见，会打破「每个请求都是日志的纯函数」这条保证。翻译成人话就是，他们宁可慢一点，也要保住「这场会话能一字不差地重建出来」。8月它干脆没给这个选项；0.2.1-rc.1 起加了一个可选的内存模式，变量、函数、导入的模块能跨调用复用，默认仍然是每次全新。',
              '**第三，它全程一个省钱数字都不给。** 包文档里的措辞非常克制：这是拿末端工具的参数表换生成的 SDK 文本加一个传输入口，「而不是承诺一个普适的减少」。立项笔记更直白——什么时候该用哪个模式，属于发布之后才能学到的东西。几家公布过的降幅数字量级差得非常远，因为它们量的根本不是同一件事。',
            ],
            en: [
              '**One: it does not restrict the model by withholding a parameter table - it blocks at execution.** This was forced out by a real incident. A fix note dated Aug 7 records that switching the mode to PTC converged only the broadcast surface, not the execution surface: the model genuinely received one tool, but the executor accepted everything; if the model simply named a native tool, the call still travelled through the pipeline and executed, even though its parameter table had never been sent. The conclusion deserves copying down: **when the direct caller can bypass it, omitting the parameter table enforces nothing.** The fix was made inside the executor, and the rejection message even shows the way home - only the run-code tool may be called directly, call the others inside your program - because a bare "unknown tool" makes the model think the deployment broke rather than think to correct itself. For contrast, Anthropic documents the same fact as a warning: do not treat that field as a security boundary, your client must still be ready to handle direct calls from the model.',
              '**Two: by default programs share no state with each other.** Every run gets a fresh isolated environment, dies when it finishes, and variables from the previous program are unavailable to the next. That is a step backwards in performance, accepted because cross-call state is invisible to the session log and would break the guarantee that **every request is a pure function of the log** - in plain language, they would rather be slower than lose the promise that this session can be rebuilt to the character. Aug offered no option at all; from 0.2.1-rc.1 there is an optional memory mode in which variables, functions and imported modules can be reused across calls, while the default stays fresh-every-time.',
              '**Three: it never quotes a savings figure.** The package documentation is deliberately restrained: this trades end-tool parameter tables for generated SDK text plus one transport entry, "rather than promising a universal reduction". The project note is blunter - which mode to use when is something to be learned after release. The reduction numbers various houses have published differ wildly in magnitude because they are not measuring the same thing.',
            ],
          },
          {
            type: 'callout',
            tone: 'idea',
            title: { zh: '被否掉的方案', en: 'Rejected options' },
            zh: '第一个被否的是「干脆不设模式，所有人都只走这一种」——那是它参考的那篇 Cloudflare 博文的原教旨做法。否决理由：编码 agent 最家常的那几个动作，跑个命令、读个文件、改一行，本来就最适合原生调用，逼着每一次编辑都套一层程序，是在给常见情况上税。所以 PTC 是可选模式，不是默认形态。第二条：8月界面上一次 PTC 运行永远只显示一张卡片（0.1.3-alpha.2 起可以展开看里面的命令和输出），他们考虑过给程序里的每一次操作各建一张卡片，否掉了——中间值有意是执行局部的、永不面向模型的，摊成很多张卡片会把一条实现轨迹暴露给你，而不是你和模型实际发起的那一个操作。第三条更值得记：修那个「能绕过去直呼工具」的漏洞时，有个省事的方案是写一个默认插件去拦。否决理由一句话说死了——**一条安全上的不变量，绝不能依赖部署方恰好组装了正确的插件。**',
            en: 'The first rejection was "no modes at all, everyone takes this one road" - the fundamentalist version of the Cloudflare post it drew on. Reason: the everyday actions of a coding agent - run a command, read a file, change one line - are already best served by native calls, so forcing every edit through a program taxes the common case. Hence PTC is optional, not default. Second: in Aug one PTC run always displayed a single card (expandable into its commands and output from 0.1.3-alpha.2); giving every operation inside the program its own card was rejected, because intermediate values are deliberately execution-local and never model-facing, and spreading them into many cards would expose an implementation trace rather than the one operation you and the model actually initiated. Third, and most worth remembering: when fixing the hole that let the model call tools directly, the easy route was a default plugin to intercept. The refusal fits in one line - **a security invariant must never depend on the deployment happening to assemble the right plugin.**',
            source: { label: '上游仓库 / DeepSeek-Harness', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
          },
        ],
      },
      {
        id: 'other-modes',
        title: { zh: '四个模式其实是四份清单', en: 'Four Modes Are Four Manifests' },
        blocks: [
          {
            type: 'diagram',
            id: 'mode-decision',
            caption: { zh: '进门那道四选一的题，实质是在四份清单之间挑一份：换模式等于换掉模型手里那套工具，所以只有空白会话才能切。', en: 'The four-way choice at first launch is really picking one of four manifests: switching mode swaps the toolset in the model\'s hands, which is why only a blank session may switch.' },
          },
          {
            type: 'table',
            head: [
              { zh: '模式', en: 'Mode' },
              { zh: '模型手里有什么（10月实测）', en: 'What the model holds (measured in Oct)' },
              { zh: '系统提示词', en: 'System prompt' },
              { zh: '它是干什么用的', en: 'What it is for' },
            ],
            rows: [
              [
                { zh: '标准模式', en: 'Standard' },
                { zh: '31 件工具', en: '31 tools' },
                { zh: '5,608 字符', en: '5,608 characters' },
                { zh: '日常那一条路，二三十件工具说明书每轮重发', en: 'The everyday road, where two or three dozen tool manuals are resent every turn' },
              ],
              [
                { zh: 'PTC 模式', en: 'PTC' },
                { zh: '只有 1 件：`run_code`', en: 'One only: `run_code`' },
                { zh: '41,267 字符', en: '41,267 characters' },
                { zh: '步骤多、中间产物大、最后只要一个结论', en: 'Many steps, large intermediates, one conclusion wanted' },
              ],
              [
                { zh: '极简模式', en: 'Minimal' },
                { zh: '3 件：持久命令行、读图片、切换工作目录（装上数汉字插件后变 4 件）', en: 'Three: a persistent shell, an image reader, a working-directory switcher (four once the counting plugin was installed)' },
                { zh: '225 字符', en: '225 characters' },
                { zh: '量模型本身有多强，不帮你干活', en: 'Measuring how strong the model itself is, not doing your work' },
              ],
              [
                { zh: '创造模式', en: 'Creator' },
                { zh: '标准 31 件 + 3 件：列出运行时、按条件查询运行时、插件管理器（前两件只读）', en: 'The 31 plus three: list the runtime, query it by condition, and the plugin manager - the first two read-only' },
                { zh: '8月另有 7 件自指工具，见[第 7 章](/chapter/creator-mode)', en: 'Aug had 7 self-referential tools instead; see [chapter 7](/chapter/creator-mode)' },
                { zh: '把这个东西改造成自己那一套', en: 'Reshaping the product into your own configuration' },
              ],
            ],
            note: { zh: '极简模式界面描述原文：「Agent 使用终端和图片读取工具，并支持上下文压缩，适合测试和对比其基础表现。」8月它是另一副样子：持久命令行加一个只会四招的文件编辑器（看、建、替换、插入），没有上下文压缩；两个月里它换掉了编辑器，加了读图，也加上了上下文压缩和 /compact。8月它在 Windows 上跑不起来，因为硬绑了 bash；0.1.0-rc.8 起 Windows 默认用持久的 PowerShell，这条没在 Windows 上验。', en: 'The minimal mode\'s own UI text: the agent uses terminal and image-reading tools and supports context compaction, suited to testing and comparing baseline behaviour. In Aug it looked different: a persistent shell plus a four-trick file editor (view, create, replace, insert) and no compaction; over two months the editor was swapped out, image reading and context compaction plus /compact were added. In Aug it did not run on Windows because bash was hard-bound; from 0.1.0-rc.8 Windows defaults to a persistent PowerShell - not verified on Windows.' },
          },
          {
            type: 'p',
            zh: '业内那些模型排行榜的分数，从来都是模型加脚手架的联合成绩：工具越花哨、提示词越贴心、上下文管理越聪明，分数越高，同一个模型换一套脚手架能差出一大截。想知道模型自己几斤几两，就得把脚手架扒干净——极简模式就是这套扒干净的配置。8月读到的设计笔记里，扒掉的东西有几样一般人想不到：上下文压缩被拿掉，因为只要压缩机制还在，模型的历史就有可能被一段摘要偷偷换掉，那测的就不是模型；运行时环境说明被拿掉；系统提示词被锁死，任何插件都加不进一个字；还有一样——他们本来可以把沙箱开到完全放开，但拒绝了，理由是即使权限全部放开，工具的参数表里仍然会挂着「沙箱权限」和「申请理由」这两个字段，模型仍然看得见有个沙箱在。**他们要去掉的是限制在模型眼里的痕迹。**',
            en: 'Leaderboard scores are always joint results of model plus scaffolding: the fancier the tools, the more considerate the prompt, the smarter the context management, the higher the score, and one model can swing widely across scaffolds. To weigh the model alone you strip the scaffolding, and minimal mode is precisely that stripped configuration. The design notes read in Aug list removals a normal person would not think of: context compaction was taken out, because while compaction exists the model\'s history can be quietly replaced by a summary and what you measure is no longer the model; the runtime environment description was taken out; the system prompt was locked so that no plugin could add a single character; and although they could have opened the sandbox completely, they refused - even with permissions fully open, the tool parameter tables would still carry the sandbox-permission and justification fields, so the model would still see a sandbox in its eyes. **What they removed was the trace of limits in the model\'s view.**',
          },
          {
            type: 'callout',
            tone: 'note',
            title: { zh: '这几条里至少有一条已被他们自己推翻', en: 'At least one of these has already been reversed' },
            zh: '「不要上下文压缩」到 0.2.1 被推翻，发布说明写的是「极简模式支持读图和自动压缩」，为什么改没找到对应的设计笔记。另外作者装的那个数汉字插件也出现在了极简模式手里，可见「任何插件都加不进来」这条也不再是绝对。它现在是一个「只给最少工具」的模式。谁会用：要给模型跑分的人、想拿它当对照组的人；不用它会怎样：你什么都不会损失。',
            en: 'The no-compaction rule was reversed by 0.2.1, whose release notes read "minimal mode supports image reading and automatic compaction"; no design note explaining why was found. The Chinese-character plugin the author installed also appeared in minimal mode\'s hands, so "no plugin can add anything" is no longer absolute either. What remains is a mode that simply gives the fewest tools. Who uses it: anyone scoring a model or wanting a control group. Cost of not using it: nothing.',
            source: { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'p',
            zh: '这四个模式在代码里是**四份清单文件**，写着「这个模式由哪些插件组成」。8月它们是四份完整的配置，251、262、262、62 行；到 0.1.7-rc.1 改成了在一个基础组合上打补丁的写法，四份补丁分别是 128、134、136、78 行（行数是对着仓库源码数的）。切换模式这个动作，实质是换一份清单、重新组装一个 agent——这也顺手解释了为什么只有空白会话才能切：换清单等于换掉模型手里那套工具，而已经跑过的对话记录是在旧工具下产生的，换了就对不上了。想要第五个模式：设置 → Agent 预设那一页最底下有一行「自定义：让 Agent 帮我创建预设模式」；8月唯一的造法是复制一份现成的配置再改。',
            en: 'The four modes are, in code, **four manifest files** stating which plugins compose each mode. In Aug they were four complete configurations of 251, 262, 262 and 62 lines; by 0.1.7-rc.1 the style became patching one base composition, with four patches of 128, 134, 136 and 78 lines (counted against the repo source). Switching mode is therefore swapping a manifest and reassembling an agent, which also explains why only a blank session may switch: changing the manifest changes the toolset in the model\'s hands, while the dialogue already recorded was produced under the old tools and no longer lines up. For a fifth mode: the bottom row of Settings, Agent presets, reads custom - let the agent help me create a preset mode. In Aug the only way to build one was to copy an existing configuration and edit it.',
          },
          {
            type: 'links',
            title: { zh: '接着往下', en: 'Where to go next' },
            items: [
              {
                label: { zh: '第 5 章：每一次运行都有迹可循', en: 'Chapter 5: every run leaves a trace' },
                href: '/chapter/event-sourcing',
                desc: { zh: '"每个请求都是日志的纯函数"这条保证的来历。', en: 'Where the "every request is a pure function of the log" guarantee comes from.' },
                tag: 'internal',
              },
              {
                label: { zh: '第 6 章：一次任务到底多少钱', en: 'Chapter 6: what one task actually costs' },
                href: '/chapter/cost',
                desc: { zh: '入场费、缓存命中和那笔 16,542 字符的公摊。', en: 'The entry fee, cache hits, and that shared 16,542-character bill.' },
                tag: 'internal',
              },
              {
                label: { zh: '第 7 章：它给自己长出一只手', en: 'Chapter 7: it grows itself a hand' },
                href: '/chapter/creator-mode',
                desc: { zh: '创造模式那 7 件自指工具和那 3 件新工具。', en: 'The 7 self-referential tools of Aug and the 3 that replaced them.' },
                tag: 'internal',
              },
              {
                label: { zh: 'Anthropic 代码执行工具', en: 'Anthropic code execution tool' },
                href: 'https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/code-execution-tool',
                desc: { zh: '同一个字段，别家写成警告：客户端仍要处理模型的直呼。', en: 'The same field, documented elsewhere as a warning about direct model calls.' },
                tag: 'source',
              },
              {
                label: { zh: 'OpenAI function calling', en: 'OpenAI function calling' },
                href: 'https://platform.openai.com/docs/guides/function-calling',
                desc: { zh: '对照：一件件原生调用的那条老路长什么样。', en: 'For contrast, what the native call-at-a-time road looks like.' },
                tag: 'source',
              },
            ],
          },
        ],
      },
    ],
    sources: [
      { label: '橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
      { label: '上游仓库 / DeepSeek-Harness', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
      { label: 'DeepSeek 官方定价页 / DeepSeek Pricing', href: 'https://api-docs.deepseek.com/quick_start/pricing' },
      { label: 'Anthropic 代码执行工具 / Anthropic Code Execution', href: 'https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/code-execution-tool' },
    ],
    sisters: ['agent-loop-engineering', 'better-agent', 'harness-engineering'],
  },
]
