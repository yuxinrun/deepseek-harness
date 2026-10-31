import type { Chapter } from '../types'

const ORANGE_BOOK = {
  label: '橙皮书《DeepSeek Harness：从开机到拆开》（花叔）/ Huashu Orange Book',
  href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/',
}
const REPO = { label: 'DeepSeek Harness 仓库', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' }

export const architectureChapters: Chapter[] = [
  {
    slug: 'long-tasks',
    num: '09',
    part: 'architecture',
    icon: 'workflow',
    level: 'advanced',
    minutes: 16,
    accent: 'orange',
    title: { zh: '让它自己干完一件长活', en: 'Letting It Finish a Long Task Alone' },
    subtitle: {
      zh: '派子代理、定目标、开 Ralph 循环、挂定时任务：四种不需要你盯着的跑法。',
      en: 'Subagents, goals, the Ralph loop, scheduled tasks: four ways to run without watching.',
    },
    promise: {
      zh: '能把一件比一次对话长的活交给 DSH 自己跑完，并知道每种跑法在哪里失控。',
      en: 'Hand DSH a task longer than one conversation and know where each mechanism can drift out of control.',
    },
    sections: [
      {
        id: 'three-shapes',
        title: { zh: '长活的三种形状', en: 'Three Shapes of Long Work' },
        blocks: [
          {
            type: 'p',
            zh: '「AI 能不能替我盯着一件事」，多数 agent 给的答案是「你可以在提示词里让它循环」。在 DSH 里，这件事落在几个工具上：派子代理、定目标、外包一个回合，以及 10 月新加的定时任务。它把「派人干活」直接做成了工具，而不是靠一段提示词去教。',
            en: 'Ask most agents to keep an eye on something for you and the answer is put a loop in your prompt. In DSH the job lands on real tools: dispatching subagents, setting a goal, outsourcing a turn, and the scheduled tasks added in October. Delegating work is a tool, not a prompt trick.',
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '长活有三种形状：把一个仓库里的同一类问题从头改到尾；每周去看一遍几个竞品更新了什么、写成一页；把一本书的三十章按同一套标准过一遍。三件事只有一个共同点——它们都比一次对话长。',
            en: 'Long work has three shapes: sweep one class of problem across an entire repository; review a set of competitors every week and distill one page; run thirty chapters of a book through the same rubric. They share exactly one trait: each outlasts a single conversation.',
            source: ORANGE_BOOK,
          },
          {
            type: 'stats',
            items: [
              {
                value: '25 → 31',
                label: { zh: '标准模式工具总数（8 月 → 10 月）', en: 'Total tools in standard mode (Aug to Oct)' },
                sub: { zh: '8 月本机原样打印的清单', en: 'List dumped verbatim from the author machine in Aug' },
              },
              {
                value: '5',
                label: { zh: '其中与指挥别的 agent 有关的工具', en: 'Tools about commanding other agents' },
                sub: { zh: '五分之一的位置给了「跟同僚打交道」，两个月一个没少', en: 'A fifth of the slots went to coworker control, unchanged after two months' },
              },
              {
                value: '1 层 / 8 个',
                label: { zh: '默认派发深度 / 同时最多子代理', en: 'Default nesting depth / max concurrent subagents' },
                sub: { zh: '设置→插件里的「子智能体」可改', en: 'Editable under Settings - Plugins - Sub-agents' },
              },
            ],
          },
        ],
      },
      {
        id: 'five-agent-tools',
        title: { zh: '多 agent 的五个工具', en: 'The Five Multi-Agent Tools' },
        blocks: [
          {
            type: 'table',
            head: [
              { zh: '它能干什么', en: 'What it does' },
              { zh: '工具名', en: 'Tool' },
              { zh: '关键差别', en: 'Key difference' },
            ],
            rows: [
              [
                { zh: '起一个全新的子 agent 去干活', en: 'Start a brand-new subagent' },
                { zh: '`subagent`', en: '`subagent`' },
                { zh: '全新会话，看不到你俩之前聊了什么', en: 'Fresh session; blind to your prior conversation' },
              ],
              [
                { zh: '带着上文起一个', en: 'Start one that inherits context' },
                { zh: '`subagent_fork`', en: '`subagent_fork`' },
                { zh: '用父会话已完成的轮次当种子', en: 'Seeded with the parent session completed turns' },
              ],
              [
                { zh: '看看现在有谁在跑', en: 'See who is running now' },
                { zh: '`list_agents`', en: '`list_agents`' },
                { zh: '后台可续聊的那些都在这儿', en: 'Lists the background agents you can keep talking to' },
              ],
              [
                { zh: '给某个在跑的补一句话', en: 'Add an instruction to a running agent' },
                { zh: '`send_message`', en: '`send_message`' },
                { zh: '不用等它跑完', en: 'No need to wait for it to finish' },
              ],
              [
                { zh: '把某一个叫停', en: 'Stop one specific agent' },
                { zh: '`interrupt_agent`', en: '`interrupt_agent`' },
                { zh: '只停那一个，别的继续', en: 'Halts only that one; the rest keep going' },
              ],
            ],
            source: ORANGE_BOOK,
          },
          {
            type: 'code',
            lang: 'text',
            title: '模型可见工具清单里的五个「指挥同僚」工具',
            code: `# 8 月清单共 25 个工具，10 月标准模式涨到 31 个，下面五个一个没少
subagent         # 全新会话起一个子 agent，不带你的对话历史
subagent_fork    # 带着父会话已完成的轮次起一个
list_agents      # 现在有哪些后台 agent 在跑、可以续聊
send_message     # 不等跑完，给某个在跑的补一句话
interrupt_agent  # 只叫停这一个，其余继续`,
            note: {
              zh: '这五个工具名照抄 8 月本机原样打印的清单。',
              en: 'The five tool names are copied from the Aug list dumped verbatim on the author machine.',
            },
          },
          {
            type: 'p',
            zh: '两个月里这块又加了几样：子代理和父会话之间能双向发消息了（早先子代理只能单向「汇报」）；派子代理时可以指定用哪家的模型、多大推理强度；默认只往下派一层、同时最多留 8 个子代理，设置→插件里的「子智能体」能改。还有一个实验性的「智能体团队」插件，默认关着，打开后有成员列表和共享任务看板，作者没开过。',
            en: 'Over two months the family grew: subagents and parents now message in both directions (before, a subagent could only report upward); you can pin a model and reasoning effort per dispatch; by default it nests one level deep with at most 8 concurrent subagents, editable in Settings - Plugins - Sub-agents. There is also an experimental Agents Team plugin, off by default, adding a member roster and a shared task board the author never enabled.',
            source: ORANGE_BOOK,
          },
          {
            type: 'callout',
            tone: 'note',
            title: { zh: '「我把活干完了」不是结果', en: '"I finished" is not a result' },
            zh: '子代理向上级汇报那个工具的说明书，对模型是这么写的：那个 agent 和你共享工作区，但它不会自动收到你的对话记录、工具输出或者推理过程——所以「你把活干完了」本身并不是一个结果，交回来的必须是干了什么、验证了什么。',
            en: 'The reporting tool description says it straight to the model: the subagent shares your workspace but never automatically receives your conversation, tool outputs, or reasoning. So "you got it done" is not a result by itself; what comes back must be what was done and what was verified.',
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '顺带一句常被误读的：计划模式拦不住东西。文档写明它只是软性指引，真正的限制来自沙箱和审批策略，两边互不读写对方的状态。进了计划模式，工具清单一个字都不变，只在提示里加一句「现在别用」。原因写在配置注释里：藏工具会改变提示词开头，把暖好的缓存打掉——用一句规则的成本，换掉一次全量重算的成本。',
            en: 'A common misreading: plan mode blocks nothing. The docs state it is soft guidance only; real limits come from the sandbox and approval policy, and the two never read each other state. Entering plan mode leaves the tool list untouched and just appends "do not use these now" to the prompt. The config comment gives the reason: hiding tools would change the prompt prefix and destroy the warmed cache. One rule line buys back a full recompute.',
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'goal-and-stuck',
        title: { zh: '目标与「卡住」的机械闸门', en: 'Goals and the Mechanical Stuck Gate' },
        blocks: [
          {
            type: 'p',
            zh: '目标是挂在同一个会话上的一件长期的事。它只有四个相位：进行中、暂停、卡住、完成，另外带一个轮数上限，防止它自己没完没了地转。',
            en: 'A goal is a long-lived object attached to one session. It has exactly four phases - in progress, paused, stuck, done - plus a round cap so it can never spin forever on its own.',
            source: ORANGE_BOOK,
          },
          {
            type: 'list',
            ordered: false,
            zh: [
              '「卡住」的定义直接写给模型看：只有在同一个阻塞条件连续三轮都还在的时候，才可以标成卡住，并且要在理由里写清楚那个具体的条件是什么。',
              '困难、不确定，或者还剩下有用的活没干完——都不算卡住。这三样最常见的托词被逐个点名否掉。',
              '机械闸门：一次自动轮次里报「卡住」，在满三轮之前会被直接拒掉。文档自己给这道闸门降了预期——它只是一个机械下界，判断不了「是不是同一个问题」。',
            ],
            en: [
              'The definition of stuck goes straight to the model: only when the same blocking condition persists for three consecutive rounds may it be marked stuck, and the reason must name that exact condition.',
              'Difficulty, uncertainty, or still-useful-work-left do not count as stuck. The three most common excuses are named and rejected one by one.',
              'A mechanical gate rejects any stuck report before round three of an automatic run. The docs deflate it themselves: it is only a mechanical lower bound and cannot judge whether it is the same problem.',
            ],
            source: ORANGE_BOOK,
          },
          {
            type: 'callout',
            tone: 'idea',
            title: { zh: '该写进任何安全清单的一条', en: 'A rule for every safety checklist' },
            zh: '重新打开一个会话，它自己永远不会开始干目标里的活。目标的「激活」开关是故意不写进持久记录的——你合上电脑第二天打开，它不会已经自己跑了一晚上。要它继续，你得亲口再说一次。',
            en: 'Reopen a session and it will never start working on its goal by itself. Goal activation is deliberately not persisted: close your laptop, open it the next morning, and it has not been running all night. To continue, you must say so again yourself.',
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'borrowed-turn',
        title: { zh: '把一个回合外包给隔壁', en: 'Outsourcing a Turn to the Neighbors' },
        blocks: [
          {
            type: 'p',
            zh: '子代理这件事上，DSH 有一个在别处没见过的设计：六个后端藏在同一个接口后面，差异大到离谱——从「在本进程里起一个全新的孩子」，一路到「另一个产品里的一个被委派的回合」。其中两个后端一个通向 Codex、一个通向 Claude Code，用的是你本机已经装好、已经登录好的那个真产品进程。它只借一个回合，跑完把整棵进程树杀干净，对方的会话 id 从不写进你这边的记录，也明确不碰对方的登录、模型选择和设置——那样会在人家自己的配置旁边再造出第二个权威。',
            en: 'Subagents hide one of the strangest designs around: six backends behind one interface, from spawning a fresh child in-process all the way to a delegated turn inside another product. Two of those backends route to Codex and to Claude Code, driving the real, already-logged-in app on your machine. It borrows exactly one turn, then kills the entire process tree; the other side session id never enters your records, and it explicitly refuses to touch their login, model choice, or settings - that would create a second authority next to their own config.',
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '8 月出厂的标准模式配置里，这两行是关着的，旁边留着一句注释，大意是「复制一份这个配置，把 disabled 去掉，就能用了」。照着做之前先查了一遍，结果是：那句注释已经跟不上代码了。就在公开当天、仓库对外开放前的几个小时里，团队把这两个后端从生产安装包里拆了出去，理由是不想让每一次普通安装都顺带下载一整套外部 SDK。现在的实情是：调用它的工具包在，被调用的那个后端不在——只去掉 disabled 不够，你还得自己装那个后端包。这些包都在 npm 上，差别只是一条安装命令。',
            en: 'In the Aug factory standard-mode config these two lines shipped disabled, with a comment along the lines of copy this config, remove disabled, and it works. Checking first revealed the comment had already fallen behind the code: on release day, hours before the repo opened, the team moved both backends out of the production installer so that no ordinary install would drag in a full external SDK. The current reality: the calling toolkit is present, the called backend is not. Removing disabled alone is not enough - you have to install the backend package yourself, from npm, one install command apart.',
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '到 0.1.0-rc.8，这两个后端被做成了「按需安装的组合包」；0.2.1-rc.1 的发布说明写的是在插件页的官方列表里按需安装。作者 10 月在插件页没看到官方列表，可能藏在实验性插件的「更多」里，没点进去，这条没复测，属于未验证。',
            en: 'By 0.1.0-rc.8 the two backends had become on-demand composite packages, and the 0.2.1-rc.1 release notes say you install them from the official list on the plugins page. The author did not see that list in October - it may hide under More in the experimental section, unclicked and untested, so treat this detail as unverified.',
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'ralph-loop',
        title: { zh: 'Ralph 循环：每轮换一个失忆的新工人', en: 'The Ralph Loop: A Fresh Amnesiac Worker Each Round' },
        blocks: [
          {
            type: 'p',
            zh: '先说状态：Ralph 循环从 0.1.7-rc.1 起默认不再启用，标准模式的工具清单里已经没有它，要用得自己在配置里打开。这一节留着，是因为它背后「每轮换一个失忆的新工人」的思路在别的工具里也常见。机制是：给定一个不可更改的目标，反复地把目标交给一个完全崭新的工人——每轮开一个全新子会话，不带上一轮的任何对话，只靠两样东西传递状态：共享的工作区，和一份有字数上限的交接单。这套做法致敬 Geoffrey Huntley 在 2025 年 7 月写下的技法，但仓库里没有任何地方提到过他的名字。',
            en: 'Status first: the Ralph loop is off by default since 0.1.7-rc.1, gone from the standard-mode tool list, and must be enabled in config. It stays here because the idea behind it - a fresh amnesiac worker each round - recurs across agent tooling. The mechanism: given an immutable goal, hand that goal again and again to a brand-new worker. Every round opens a fresh subconversation carrying nothing from the last, passing state through exactly two things: the shared workspace, and a word-limited handoff note. It honors the technique Geoffrey Huntley wrote down in July 2025, though the repository never once mentions his name.',
            source: ORANGE_BOOK,
          },
          {
            type: 'diagram',
            id: 'ralph-loop',
            caption: {
              zh: '每一轮都是一个全新子会话，唯一穿过轮与轮之间的是共享工作区和一份有界交接单——工作区本身就是记忆。',
              en: 'Each round is a brand-new subconversation; the only things crossing between rounds are the shared workspace and one bounded handoff note - the workspace itself is the memory.',
            },
          },
          {
            type: 'quote',
            zh: '共享工作区和它当前的工作树，是长期记忆和事实来源。动手之前先检查它们，保住已有的工作，做具体的、在范围内的活，并且验证你改动的东西。把上一份报告仅仅当作一份有界交接单，拿工作区去核对它。（每一轮的提示词是写死的，这是其中最要紧的两句。）',
            en: 'The shared workspace and its current worktree are the long-term memory and the source of truth. Inspect them before acting, preserve existing work, do concrete scoped work, and verify what you changed. Treat the previous report as nothing but a bounded handoff, and check it against the workspace. (The per-round prompt is hardcoded; these are its two most load-bearing sentences.)',
            cite: { zh: 'DSH Ralph 循环写死提示词', en: 'The hardcoded Ralph round prompt' },
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '为什么故意失忆反而有效：一段长对话里，模型的上下文会被三样东西污染——早期的错误尝试、绕过的死胡同，还有它给自己讲的那个「我已经做过什么」的故事，而且它们的占比越来越大。这套循环押的注是工作区本身就是记忆：第四十七轮那个全新工人，打开工作区看到的是前四十六轮真实留下的文件，不是关于那些文件的叙述，也没有挫败感和自我合理化。类比：一个项目做了三个月，每个人都被历史绑住（「这块我们试过，不行」），于是每天早上换一批完全不知道历史的新人，只给他们看代码和一张便签。赌的是「隐性知识本来就不该是隐性的，它应该落在工作区里」——所以关键是那句「验证你改动的东西」。',
            en: 'Why engineered amnesia works: in a long conversation the context gets poisoned by three things - early wrong attempts, dead ends already routed around, and the story the model tells about what it has done - each growing as a share of the window. The loop bets that the workspace is the memory: worker forty-seven opens the tree and sees what forty-six rounds actually left behind, not a narrative about it, and carries none of the frustration or self-justification. Analogy: a three-month-old project where everyone is chained to history ("we tried that, it failed"), so each morning a batch of newcomers who know no history gets only the code and one sticky note. The wager is that tacit knowledge should never be tacit - it belongs in the workspace - which is why "verify what you changed" is the load-bearing line.',
            source: ORANGE_BOOK,
          },
          {
            type: 'code',
            lang: 'text',
            title: '交接单的三种结论与轮数上限（约束很紧）',
            code: `# 报告只许三种结论：
#   继续(continue) —— 必须至少给出一条下一步
#   完成(done)     —— 必须拿得出具体证据，且不能留下一步
#   卡住(stuck)    —— 必须写出一个具体的阻塞点
# 报告超长的处理：不截断，直接判失败
max_rounds_product_default = 64   # 8 月出厂标准模式设的上限
max_rounds_package_default = 256  # 包自己的默认值，别当成产品实际值`,
            note: {
              zh: '注意 64 与 256 的分工：产品配置给 64，包默认 256，别把包的默认值当成产品的实际值。',
              en: 'Mind the split: the Aug product config caps rounds at 64 while the package default is 256 - never read the package default as the product value.',
            },
            source: ORANGE_BOOK,
          },
          {
            type: 'table',
            head: [
              { zh: '词', en: 'Term' },
              { zh: '指的是什么', en: 'What it means' },
              { zh: '怎么读', en: 'How to read it' },
            ],
            rows: [
              [
                { zh: '回合 (turn)', en: 'turn' },
                { zh: '你说一句话、它把这件事办完', en: 'You say one thing; it gets the job done' },
                { zh: '一次用户请求的完整闭环', en: 'One closed user request' },
              ],
              [
                { zh: '步 (step)', en: 'step' },
                { zh: '办的过程里每一次「想一下再动手」', en: 'Each think-then-act inside the run' },
                { zh: '作者那次简单任务：1 个回合、2 个步（44 行日志里 step/start 与 step/end 各两条）', en: 'The author simple task: 1 turn, 2 steps (44 log lines, two step/start and two step/end)' },
              ],
              [
                { zh: '轮 (round)', en: 'round' },
                { zh: '循环里每换一个全新工人重来一遍', en: 'Each swap in a brand-new worker' },
                { zh: '回合与步的比例告诉你它话痨到什么程度；看到一比三十，那不是在干活，是在原地打转', en: 'Turn-to-step ratio measures rambling; 1:30 means spinning in place, not working' },
              ],
            ],
            note: {
              zh: '三个绕人的词先钉死：回合 / 步 / 轮。',
              en: 'Pin down the three confusing words first: turn, step, round.',
            },
            source: ORANGE_BOOK,
          },
          {
            type: 'quote',
            zh: '完成与否是工人的自我宣称，不是独立评估。独立评审者、评审驱动的续跑、完成证书、对抗性验证器，全部有意推迟。界面上关于完成和阻塞的文案也被要求明确写成「某个工人报告了这个结果」，而不是「已认证完成」。',
            en: 'Completion is a worker self-declaration, not an independent assessment. Independent reviewers, review-driven continuation, completion certificates, and adversarial validators were all deliberately deferred. Even the UI copy for done and blocked had to read "a worker reported this result", never "verified complete".',
            cite: { zh: 'DSH 文档自陈的局限', en: 'DSH own documented limitation' },
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '所以整套机制里没有任何东西能保证第三十轮说的「我完成了」是真的；它只保证了一个形式约束：说完成就必须给出证据，且不许再留下一步。作者把丑话说在前面：这个循环他一次都没实跑过，本节全部来自源码、文档和配置——未验证。',
            en: 'Nothing in the loop guarantees that round thirty "I am done" is true. It enforces one formal constraint only: claim done and you must produce evidence and leave no next step. The author flags it plainly: he never ran the loop once; the whole section comes from source, docs, and config - unverified.',
          },
          {
            type: 'p',
            zh: '一个相关的被否方案：2026 年 7 月 12 日有人提议把工作流能力砍成「真正被用到的前台核心」，理由是它带着一整套没人订阅的进度观测系统——六个事件、一套协议消息、一本配对账本，生产环境零个监听者，只有测试在用。否决只有一句话：这套进度观测是刻意设计的对外观察接口，该做的是给它找一个消费者，而不是删掉。诊断被完全承认（现有事件确实缺少归属信息，一个全局监听者根本没法把它路由到正确的会话），处方被否决，结论是「重新设计相关性契约」。8 月界面上看不到任何工作流进度条，原因就在这儿。到 0.1.7-rc.1，后台任务面板能看实时输出、后台任务跑完会把会话叫醒，这个消费者算是找到了。',
            en: 'A related rejected proposal: on 2026-07-12 someone suggested cutting workflow capability down to the front-end core actually used, because it carried a whole progress-observation system nobody subscribed to - six events, a protocol message set, a pairing ledger, zero production listeners, tests only. The veto was one sentence: this observation surface is a deliberately designed external interface; find it a consumer instead of deleting it. The diagnosis was fully accepted (the events really lack attribution; a global listener cannot route them to the right session), the prescription rejected, the verdict "redesign the relevance contract". Why no workflow progress bar appeared in the Aug UI. By 0.1.7-rc.1 the background task panel shows live output and finished tasks wake the session - a consumer found.',
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'scheduled-tasks',
        title: { zh: '定时任务：左边栏的一级入口', en: 'Scheduled Tasks: A First-Class Sidebar Entry' },
        blocks: [
          {
            type: 'p',
            zh: '8 月作者在附录里写过，定时任务这个能力出厂零命中，要自己加八行接线才能用。到 0.2 版，它成了左边栏的一级入口「自动化任务」，标准模式里多了四件工具：建、删、列、改定时任务。空态页面那句话说明了主要用法：在对话里让它建，建好的会出现在这里。',
            en: 'In August the author noted scheduled tasks shipped with zero hits - you had to wire eight lines yourself before anything fired. By 0.2 it is a first-class sidebar entry called Automated Tasks, and standard mode gained four tools: create, delete, list, and modify scheduled tasks. The empty-state page spells out the main usage: ask for it in conversation, and whatever gets created shows up here.',
            source: ORANGE_BOOK,
          },
          {
            type: 'list',
            ordered: false,
            zh: [
              '按发布说明，最短可以每分钟跑一次。',
              '提醒类工具在标准、创造和 PTC 模式里有；极简模式和子代理里没有。',
              '桌面端关了窗口，任务照样在后台跑。',
              '作者没有建任何任务，页面就到此为止：一个定时任务建了就是真的会按时跑、按时花钱，他不想在测试目录里留一个。',
            ],
            en: [
              'Per the release notes, the shortest interval is once per minute.',
              'Reminder tools exist in standard, creator, and PTC modes - not in minimal mode, not inside subagents.',
              'On desktop, tasks keep running in the background even with the window closed.',
              'The author created none, stopping this section at the page itself: a scheduled task really fires on time and really spends on time, and he refused to leave one living in a test directory.',
            ],
            source: ORANGE_BOOK,
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '自主长跑会安静烧掉什么', en: 'What Autonomous Long Runs Silently Burn' },
            zh: '把活交给它自己跑，账单就不再由你翻页了。定时任务按时跑也按时花钱，关窗不停；Ralph 循环每一轮都是一个全新子会话带完整提示词，产品默认上限 64 轮、包默认 256 轮，而「完成」只是工人的自我宣称；目标的自动轮次有机械闸门，但没有预算闸门。自主性换来的代价是：没有任何一道闸门替你数钱——轮数上限、字数上限、报告超限判失败，管的是形状，不管的是金额。上线任何无人盯的长跑之前，先把轮数、频率和模型档位按「最坏一轮全价」设一遍上限。',
            en: 'Once the work runs itself, the bill stops turning pages with you. Scheduled tasks fire on time and spend on time, window closed or not. Every Ralph round is a fresh subconversation carrying the full prompt, capped at 64 rounds by product default but 256 by package default, while "done" remains a worker self-declaration. Goal rounds have a mechanical gate but no budget gate. Autonomy trades away one thing: no gate counts your money for you - round caps, word limits, and oversize-report failures police shape, not cost. Before any unattended long run, set your round, frequency, and model-tier limits as if every round paid full price.',
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'long-run-checklist',
        title: { zh: '交活之前确认的五件事', en: 'Five Things to Confirm Before Handing Off' },
        blocks: [
          {
            type: 'checklist',
            items: [
              {
                zh: '子代理的深度与并发：默认一层、最多 8 个，在设置→插件「子智能体」里改；实验性「智能体团队」默认关。',
                en: 'Subagent depth and concurrency: one level, eight at most, under Settings - Plugins - Sub-agents; the experimental Agents Team stays off by default.',
              },
              {
                zh: '目标重启不自续：「激活」故意不持久化，第二天打开电脑它没有已经跑了一晚上，要继续得亲口再说一次。',
                en: 'Goals do not survive a restart by themselves: activation is deliberately unpersisted, so it has not been running overnight, and resuming needs you to say it again.',
              },
              {
                zh: '「卡住」有三轮机械闸门，但困难、不确定、还有活没干完都不算卡住——这是给模型托词设的防线。',
                en: 'Stuck has a three-round mechanical gate, yet difficulty, uncertainty, or unfinished useful work do not qualify - a line drawn against model excuses.',
              },
              {
                zh: 'Ralph 循环 0.1.7-rc.1 起默认关；记住产品上限 64 轮而不是包的 256，且完成只是自我宣称、无独立评估。',
                en: 'Ralph is off by default since 0.1.7-rc.1; remember the product cap of 64 rounds, not the package 256, and that completion is self-declared with no independent assessment.',
              },
              {
                zh: '定时任务真的会按时跑、按时花钱，桌面端关窗不停；先在能承担成本的目录里建，别随手留。',
                en: 'Scheduled tasks really fire and really bill, even with the desktop window closed; create them only where the cost is acceptable, and do not leave stray ones behind.',
              },
            ],
          },
          {
            type: 'links',
            title: { zh: '接着看', en: 'Keep Reading' },
            items: [
              {
                label: { zh: '第 10 章：Skill、MCP、插件', en: 'Chapter 10: Skills, MCP, Plugins' },
                href: '/chapter/skills-mcp-plugins',
                desc: { zh: '长活里的子代理和技能都住在插件体系里', en: 'Subagents and skills in a long run both live inside the plugin system' },
                tag: 'internal',
              },
              {
                label: { zh: '工具箱', en: 'Toolkit' },
                href: '/toolkit',
                desc: { zh: '命令与配置速查', en: 'Command and config cheatsheets' },
                tag: 'internal',
              },
              {
                label: { zh: '橙皮书全文', en: 'The Orange Book (full text)' },
                href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/',
                desc: { zh: '本章全部事实的主源', en: 'Primary source for every fact in this chapter' },
                tag: 'external',
              },
              {
                label: { zh: '上游仓库', en: 'Upstream repository' },
                href: 'https://github.com/deepseek-ai/DeepSeek-Harness',
                tag: 'external',
              },
            ],
          },
        ],
      },
    ],
    sources: [
      ORANGE_BOOK,
      REPO,
      { label: 'deepseek-harness on npm', href: 'https://www.npmjs.com/package/deepseek-harness' },
    ],
    sisters: ['agent-loop-engineering', 'a2a-patterns', 'agent-memory-patterns'],
  },
  {
    slug: 'skills-mcp-plugins',
    num: '10',
    part: 'architecture',
    icon: 'library',
    level: 'advanced',
    minutes: 18,
    accent: 'blue',
    title: { zh: 'Skill、MCP、插件，谁管谁', en: 'Skills, MCP, Plugins: Who Wraps Whom' },
    subtitle: {
      zh: '仓库简介写着 Everything is a Plugin——而 skill 和 MCP 本身就是两个普通插件。',
      en: 'Everything is a Plugin - and skills and MCP turn out to be ordinary plugins themselves.',
    },
    promise: {
      zh: '能分清三层各自改哪一层，知道搬家时哪些直接可用、哪些会掉东西。',
      en: 'Tell which layer each of the three touches, and know what carries over in a migration and what quietly drops.',
    },
    sections: [
      {
        id: 'everything-is-a-plugin',
        title: { zh: '一个错位：插件不是第三样东西', en: 'The Misalignment: Plugins Are Not a Third Thing' },
        blocks: [
          {
            type: 'p',
            zh: '从 Claude Code 搬过来的第一天会撞上一个错位：skill 原封不动就能用，MCP 你也知道怎么配，可这个产品从仓库简介到官方文档，满屏都在说插件。仓库一句话简介是 DeepSeek Harness: Everything is a Plugin.，「插件」在文档里的密度高得反常。疑问很朴素：既然 skill 和 MCP 都有了，插件是拿来干嘛的？是不是还得再学一样东西？答案——dsh 把 skill 和 MCP 本身做成了普通插件。',
            en: 'Day one of migrating from Claude Code you hit a misalignment: skills work untouched, you already know MCP configs, yet everything from the repo tagline to the official docs talks about plugins. The one-line intro reads DeepSeek Harness: Everything is a Plugin, and the word appears with abnormal density. The plain question: if I have skills and MCP already, what are plugins for - another thing to learn? The answer: dsh made skills and MCP ordinary plugins themselves.',
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '这条「一切皆插件」曾经有过一个专用格式：后缀 `.dsh-plugin`，配套一应俱全——专属清单文件、自动生成的包装层、独立的缓存、装载器里的内置分支，以及仓库专用的 skill 适配器和 MCP 适配器。也就是说，skill 和 MCP 曾经在这套体系里有自己的专用通道。2026 年 8 月 9 日，整套删掉。',
            en: 'Everything is a Plugin once had a bespoke format: the `.dsh-plugin` suffix, with a dedicated manifest, an auto-generated wrapper, its own cache, built-in branches in the loader - and repository-specific adapters just for skills and MCP. Skills and MCP used to have special channels inside this system. On 2026-08-09 the whole thing was deleted.',
            source: ORANGE_BOOK,
          },
          {
            type: 'quote',
            zh: '一个提供 Skills 的包，挂载 @deepseek-ai/dsh-skill-filesystem；一个提供 MCP 服务器的包，挂载 @deepseek-ai/dsh-mcp-client；提供原生能力的包，挂载一个普通的、编译好的 Cordis 插件。（删除笔记原文的中译，笔记文件名为 2026-08-09-remove-repository-plugin.md）',
            en: 'A package providing Skills mounts @deepseek-ai/dsh-skill-filesystem; a package providing MCP servers mounts @deepseek-ai/dsh-mcp-client; a package providing native capability mounts an ordinary, compiled Cordis plugin. (Chinese translation of the removal note 2026-08-09-remove-repository-plugin.md.)',
            cite: { zh: '2026-08-09 删除笔记', en: 'The 2026-08-09 removal note' },
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '翻成人话：skill 和 MCP 不需要特殊通道，它们就是普通插件，用普通包管理器装就行。他们判断这条专用路径跟已有的普通路径「在安装和组合第三方包这件事上重复了」，而重复的代价是两条安装命令、两种清单格式、两套出错和缓存的身份，服务的却是同一个包。删的时候连「留个解析器做迁移」都拒绝了，理由是产品还没发正式版、没有兼容义务，留一个解析器等于让一份已经删掉的约定继续活着。旧的 `.dsh-plugin` 包直接停止工作：不迁移，不自动清理。',
            en: 'In plain language: skills and MCP need no special channel - they are normal plugins installed by the normal package manager. The team judged the bespoke path duplicated the existing ordinary one at installing and composing third-party packages, and duplication cost two install commands, two manifest formats, and two failure-and-cache identities for the same package. Even leaving a parser for migration was refused: no stable release yet means no compatibility obligation, and a leftover parser keeps a deleted convention alive. Old `.dsh-plugin` packages simply stopped working - no migration, no automatic cleanup.',
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'one-yaml-list',
        title: { zh: '一份配置里，skill 和主循环并排站着', en: 'One YAML Where Skills and the Main Loop Stand Side by Side' },
        blocks: [
          {
            type: 'p',
            zh: '这话不用听我说。dsh 有个命令能把「我现在到底由哪些零件拼成」整份打印出来。作者在网页版跑过一次，拿到的清单里跟 skill 有关的是四行，同一份文件往下翻两百行，是 agent 主循环和模型适配器那两行。上面那段是整个 skill 系统，下面那段是它怎么一轮一轮地干活、它去问哪个模型——在这份清单里，它们跟 skill 是同一种物件、同一种删法。想把 skill 整个关掉，就是加一行 disabled: true，跟关掉任何一个别的零件的手势完全一样。',
            en: 'You do not have to take the author word for it: dsh has a command that prints exactly which parts you are assembled from. Running it on the web build, the list shows four skill-related rows, and two hundred lines further down sit the agent main loop and the model adapter. The first block is the whole skill system; the second is how it works turn by turn and which model it asks. In this manifest they are the same kind of object as skills, deletable the same way - switching skills off is one disabled: true line, the identical gesture used for every other part.',
            source: ORANGE_BOOK,
          },
          {
            type: 'code',
            lang: 'bash',
            title: '把零件清单原样打印出来',
            code: `dsh --profile web --dump-default-config`,
            note: {
              zh: '10 月在 0.2.1-rc.2 上，这条命令输出 1,229 行 YAML、190 行插件骨架。',
              en: 'In October on 0.2.1-rc.2 this command emitted 1,229 YAML lines with a 190-row plugin skeleton.',
            },
            source: ORANGE_BOOK,
          },
          {
            type: 'code',
            lang: 'yaml',
            title: 'dump 出来的四行 skill 与主循环、MCP 挂法（照抄原文缩进整理）',
            code: `# 跟 skill 有关的四行：
- id: skill
  name: '@deepseek-ai/dsh-skill'
- id: skill-filesystem
  name: '@deepseek-ai/dsh-skill-filesystem'
- id: skill-badge
  name: '@deepseek-ai/dsh-skill-badge'
  disabled: true
- id: tool-skill
  name: '@deepseek-ai/dsh-tool-skill'

# 同一份文件往下翻两百行：agent 主循环 + DeepSeek 模型适配器
- id: agent-loop
  name: '@deepseek-ai/dsh-agent-loop'
- id: llm-deepseek
  name: '@deepseek-ai/dsh-llm-deepseek'

# MCP 在仓库里只有一个包；接一台服务器就是加一行：
- id: mcp-github
  name: '@deepseek-ai/dsh-mcp-client'
  config:
    serverName: github
    transport: stdio
    command: npx
    args: ['-y', '@modelcontextprotocol/server-github']`,
            note: {
              zh: '一台服务器一行，两台就两行——同一个包被装载两次、配置不同。skill-badge 那行 disabled: true 是出厂自带的，第 6 节会回到它。',
              en: 'One server is one row, two servers are two rows - the same package loaded twice with different configs. The skill-badge disabled: true line ships in the factory default; section six returns to it.',
            },
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '这顺带回答了一个很具体的搬家问题：Claude Code 那种把所有服务器塞进一个大对象里的配置，不能整块端过来，得拆成一行一行地写。还得交代默认状态：作者 dump 出来的那份配置里，MCP 一行都没有——包随安装带上了，但默认一台服务器也不挂。官方理由很直接：每一条服务器启动命令都是「agent 沙箱之外的可信可执行代码」，这行命令是拿你本人的权限跑的，不受 agent 那套限制管，所以不替你做主。',
            en: 'That settles one concrete migration question: Claude Code config that jams every server into one big object cannot be carried across in a block - it has to be rewritten row by row. Default state matters too: the dumped config had zero MCP rows. The bridge package installs, but no server is attached by default. The official reason is blunt: every server launch command is trusted executable code running outside the agent sandbox, under your own permissions, beyond the agent limits - so they refuse to decide it for you.',
            source: ORANGE_BOOK,
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: 'MCP 搬家会掉的东西', en: 'What Drops Off During an MCP Migration' },
            zh: 'MCP 桥只接工具这一类。协议的三个动词是工具、资源、提示模板，dsh 目前明确只桥接第一个，资源和提示模板不做。你要是挂着七八个 MCP 服务器在干活——靠 resources 喂文档、靠 prompts 当模板的那部分——搬过来会静默掉东西。再加上默认无服务器启用（每条服务端命令都是沙箱之外的可信可执行代码），搬家后要逐台重新显式挂载、逐个确认哪些能力其实没被桥过来。',
            en: 'The MCP bridge carries tools only. The protocol has three verbs - tools, resources, prompts - and dsh explicitly bridges just the first; resources and prompts are not bridged. If you work with seven or eight MCP servers attached, the parts fed through resources or prompts silently drop in migration. Layer on the zero-servers-enabled default (each server command is trusted executable code outside the agent sandbox) and the honest procedure is: re-attach every server explicitly, then verify which capabilities never crossed the bridge at all.',
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'three-layers',
        title: { zh: '三层各自在改什么', en: 'What Each of the Three Layers Changes' },
        blocks: [
          {
            type: 'table',
            head: [
              { zh: '它改变什么', en: 'What it changes' },
              { zh: '你交付的是什么', en: 'What you ship' },
              { zh: '谁写得动', en: 'Who can write it' },
            ],
            rows: [
              [
                { zh: 'Skills：模型知道该怎么做事', en: 'Skills: how the model knows to do things' },
                { zh: '一段 Markdown', en: 'A piece of Markdown' },
                { zh: '任何会打字的人', en: 'Anyone who can type' },
              ],
              [
                { zh: 'MCP：模型能调用到哪些外部能力', en: 'MCP: which external capabilities the model can call' },
                { zh: '一条命令或一个网址', en: 'One command or one URL' },
                { zh: '会照着抄配置的人', en: 'Anyone who can copy a config block' },
              ],
              [
                { zh: '插件：这个产品本身是什么', en: 'Plugins: what the product itself is' },
                { zh: '一个 npm 包', en: 'An npm package' },
                { zh: '写 TypeScript 的开发者', en: 'TypeScript developers' },
              ],
            ],
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '拿餐厅来比：Skills 是菜谱本，写清楚宫保鸡丁怎么做，厨师翻开照做，厨房一点没变；MCP 是跟外部供应商的对接协议，让这家店能点到隔壁的食材和设备，厨房也没变；插件是厨房本身的模块化——灶台、抽油烟机、冷库、收银台，每一样都能整个拆下来换掉，连「厨师的工作流程」都能换。',
            en: 'Restaurant analogy: skills are the recipe binder - the kung pao steps get read and followed, kitchen unchanged. MCP is the protocol with outside suppliers - the restaurant can order produce and equipment next door, kitchen still unchanged. Plugins are the modularization of the kitchen itself: stove, hood, cold room, register - each unbolted and swapped whole, including the chef workflow.',
            source: ORANGE_BOOK,
          },
          {
            type: 'list',
            ordered: false,
            zh: [
              'skill 替代不了插件：skill 就是文本，只能影响模型的判断。你没法用一篇 Markdown 把底下的模型换掉、把会话记录从一种格式换成另一种、或者给整个产品换一套界面。',
              'MCP 也替代不了插件：协议的动词只有工具、资源、提示模板三个。「换掉 agent 的主循环」这种动作，协议里根本没有对应的概念，连这个词都没有，谈不上实不实现。',
              '插件替代得了那两样，但不划算：理论上完全可以——skill 和 MCP 本来就是拿插件实现的——可写一个 skill 是写一篇 Markdown，写一个插件是发一个 npm 包、配好构建、过类型检查。所以 dsh 保留了 skill 和 MCP 两层。',
            ],
            en: [
              'A skill cannot replace a plugin: a skill is text and only shapes the model judgment. No Markdown file swaps the underlying model, reformats session records, or reskins the product.',
              'MCP cannot replace a plugin either: the protocol verbs are just tools, resources, prompts. Swapping the agent main loop has no corresponding concept in the spec - not even the word - so implementation never comes up.',
              'Plugins can replace both, but it is not worth it: theoretically yes, since skills and MCP are plugins already - yet a skill is one Markdown file while a plugin is an npm package with a build and type checking. Which is why dsh keeps the skill and MCP layers.',
            ],
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'extension-point-map',
        title: { zh: '29 行对照表：每个功能一个扩展点', en: 'The 29-Row Map: Every Feature Is an Extension Point' },
        blocks: [
          {
            type: 'p',
            zh: '仓库里有一张「每项产品功能都映射到一个扩展点」的表，8 月一共 29 行，skill 和 MCP 排在末尾，和界面、持久化并列。下面摘其中约十行——每一行的包名都能在 dump-default-config 的输出里找到实证。',
            en: 'The repository keeps a table mapping every product feature to one extension point: 29 rows as of August, with skills and MCP listed at the bottom, side by side with UI and persistence. About ten of those rows are excerpted below, and every package name is attested in the dump-default-config output.',
            source: ORANGE_BOOK,
          },
          {
            type: 'table',
            head: [
              { zh: '产品功能', en: 'Product feature' },
              { zh: '对应的扩展点（插件包）', en: 'Extension point (plugin package)' },
              { zh: '证据', en: 'Evidence' },
            ],
            rows: [
              [
                { zh: 'agent 主循环', en: 'Agent main loop' },
                { zh: '`agent-loop` / @deepseek-ai/dsh-agent-loop', en: '`agent-loop` / @deepseek-ai/dsh-agent-loop' },
                { zh: 'dump 清单里与 timer 平级的一行', en: 'A dump row peer to the timer' },
              ],
              [
                { zh: '模型适配', en: 'Model adapter' },
                { zh: '`llm` + `llm-deepseek`', en: '`llm` + `llm-deepseek`' },
                { zh: '@deepseek-ai/dsh-llm、dsh-llm-deepseek', en: '@deepseek-ai/dsh-llm, dsh-llm-deepseek' },
              ],
              [
                { zh: '会话日志 / 持久化', en: 'Session log / persistence' },
                { zh: '`session`', en: '`session`' },
                { zh: 'dsh-session；上传件是 session-log-deepseek', en: 'dsh-session; the uploader is session-log-deepseek' },
              ],
              [
                { zh: 'skill 系统', en: 'Skill system' },
                { zh: '`skill` / `skill-filesystem` / `tool-skill`', en: '`skill` / `skill-filesystem` / `tool-skill`' },
                { zh: '四行 YAML 清单，见第 2 节', en: 'The four YAML rows in section 2' },
              ],
              [
                { zh: 'MCP 接入', en: 'MCP connectivity' },
                { zh: '`mcp-github` 等，每服务器一行', en: '`mcp-github` etc, one row per server' },
                { zh: '同一个 dsh-mcp-client 包装两次', en: 'Same dsh-mcp-client package loaded twice' },
              ],
              [
                { zh: '沙箱', en: 'Sandbox' },
                { zh: '`sandbox`', en: '`sandbox`' },
                { zh: '@deepseek-ai/dsh-sandbox-local', en: '@deepseek-ai/dsh-sandbox-local' },
              ],
              [
                { zh: '跑 shell 命令', en: 'Running shell commands' },
                { zh: '`shell` 契约 + `bash-local`/`bash-sandbox` + `tool-bash`', en: '`shell` contract + `bash-local`/`bash-sandbox` + `tool-bash`' },
                { zh: '第 11 章整章的例子', en: 'The worked example of chapter 11' },
              ],
              [
                { zh: '文件编辑工具', en: 'File editing tools' },
                { zh: '`tool-fs`', en: '`tool-fs`' },
                { zh: '被网页包补丁 disabled: true 的那行', en: 'The row the web-app patch disables' },
              ],
              [
                { zh: '网页界面', en: 'Web UI' },
                { zh: '`ui-conversation`、`ui-trajectory` 等', en: '`ui-conversation`, `ui-trajectory`, ...' },
                { zh: 'ui- 开头 8 月 27 行、10 月 51 行', en: 'ui- rows: 27 in Aug, 51 in Oct' },
              ],
              [
                { zh: '计时器', en: 'Timer' },
                { zh: '`timer`', en: '`timer`' },
                { zh: '@deepseek-ai/cordis-plugin-timer，dump 第一行', en: '@deepseek-ai/cordis-plugin-timer, first dump row' },
              ],
            ],
            note: {
              zh: '这是 29 行全表的摘读，不是全表；行与行格式一模一样，skill 和 MCP 与界面、持久化平级并列。',
              en: 'This is a readable excerpt, not the full table: 29 rows total, all in identical format, with skills and MCP ranked beside UI and persistence.',
            },
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'minimal-plugin',
        title: { zh: '一个最小插件，一共几行', en: 'The Smallest Plugin Is a Few Lines' },
        blocks: [
          {
            type: 'code',
            lang: 'ts',
            title: '官方教程里最小的插件例子',
            code: `import type { Context } from '@deepseek-ai/cordis'

export const name = 'hello-plugin'

export function apply(ctx: Context) {
  // Required dependencies are ready before apply runs.
  console.log('[hello-plugin] plugin loaded!')
}`,
            note: {
              zh: '文档给插件的定义只有一句：一个导出 apply 函数的 TypeScript 模块。没有清单文件、没有注册中心、没有一长串生命周期钩子——紧接着还补了一句 That is the complete configuration.（这就是全部配置）。',
              en: 'The docs define a plugin in one line: a TypeScript module exporting apply. No manifest, no registry, no long list of lifecycle hooks - followed by the sentence That is the complete configuration.',
            },
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '要把它发出去给别人用，也是三个文件：一个 package.json 声明「我贡献了什么」，一个 YAML 补丁文件写明「我要往那份零件清单里插哪几行」，一个模块本体。装的时候敲一条 dsh plugin 命令——这条命令的真身有点好笑：它基本上只是 pnpm 的转发器。官方参考手册直说，它在配置目录不存在时先建一个，然后把你给的参数原样转发给 pnpm，工作目录切到那个配置目录。所以 add、remove、update 这些动词全都原样可用，从 npm 装、从 git 装、从本地目录装、从压缩包装都行。8 月他们没做插件市场，直接把整个 npm 生态借过来了。',
            en: 'Publishing it takes three files: a package.json declaring what you contribute, a YAML patch stating which rows to insert into the parts manifest, and the module body. Installing is one dsh plugin command - and the command itself is a bit of a joke: it is essentially a pnpm forwarder. The official reference says plainly that it creates the config directory if missing, forwards your arguments verbatim to pnpm, and sets the working directory there. So add, remove, and update all work as-is, installing from npm, git, a local directory, or a zip. In August they built no marketplace and simply borrowed the entire npm ecosystem.',
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '到 0.2 版，这一层多了一个界面。左边栏「插件」是管理页：上面是内置插件的配置（子智能体、网页搜索、Agent 循环、终端），中间是实验性插件的开关（10 月全新安装时四个开关全是关的），底下是已安装插件。「添加插件」能填 npm 包名、GitHub 仓库地址或本地目录，安装源可以选中国大陆镜像；下拉箭头里还有一项「让 Agent 创建插件」。点添加时弹出一段提醒，原样抄下：「请确认插件来源可信。插件在本机以你的权限运行，来源不明的插件可能损坏 DeepSeek Harness，或读取和泄露你的数据。」按发布说明还支持自定义插件市场：填一个 JSON 索引地址就多一个「发现」标签，官方自己不内置任何索引源——作者没配过。',
            en: 'By 0.2 this layer gained a UI. The sidebar Plugins page stacks three sections: built-in plugin configs (sub-agents, web search, agent loop, terminal), experimental toggles (all four off on a fresh October install), and installed plugins. Add Plugin accepts an npm name, a GitHub repo, or a local directory, with a mainland-China mirror option, and its dropdown hides one more entry: Let the Agent Create a Plugin. The add dialog warns verbatim: confirm the plugin source is trusted - plugins run on your machine under your permissions, and an unknown source can damage DeepSeek Harness or read and leak your data. Release notes also allow a custom marketplace: one JSON index URL adds a Discover tab; nothing is built in, and the author never configured one.',
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '实测边界要讲清：8 月作者没实测过装完之后能不能真的跑起来。10 月他让它在创造模式里自己写了一个、装上、重启后在四个模式里都能用，本地目录这条安装链路算是走通了；从 npm 或 GitHub 装别人写的插件，仍然没试。官方插件模板现在都带着兼容的 dsh 版本范围、多语言的名称和图标，这样插件才能在插件页里好好显示——这些是可选的，他那个汉字计数器没写版本范围也装上了，最后是 7 个文件。',
            en: 'Test boundaries stated honestly: nothing was verified end-to-end in August. In October the author had it write one itself in creator mode, install it, and after restart it worked in all four modes - the local-directory install path is walked. Installing others plugins from npm or GitHub remains untried. Official plugin templates now carry compatible dsh version ranges plus localized names and icons so they display properly on the plugins page; all optional - his character-counter plugin shipped without a version range, installed anyway, ending at 7 files.',
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'skills-directly',
        title: { zh: 'Skill 直接用：白捡的一池子', en: 'Skills Work As-Is: A Free Pool' },
        blocks: [
          {
            type: 'p',
            zh: 'Claude Code 的 skill 能不能直接用？能，是有意为之。格式上 dsh 认的是跟 Anthropic 那套完全同构的写法：一个文件夹配一个 SKILL.md，或者干脆一个 Markdown 文件；开头元信息必填名字和描述。可选字段两个开关——一个不许模型自己调、一个允许人手动调——写法跟 Claude Code 一模一样。同构到什么程度：连有人提议把驼峰拼写也认成别名都被否掉了，理由是外部格式就照 Claude 那套写。',
            en: 'Do Claude Code skills work as-is? Yes, deliberately. dsh accepts the format fully isomorphic to the Anthropic one: a folder with a SKILL.md, or just a Markdown file, whose front matter requires name and description. The two optional switches - block model invocation, allow manual invocation - are spelled exactly as in Claude Code. How isomorphic? A proposal to even accept camelCase spellings as aliases was rejected, on the grounds that the external format follows Claude exactly.',
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '目录上，它扫六个位置，其中排第五的那个是 ~/.agents/skills——本机三个 agent 共读的那棵树。所以作者那一池 skill（8 月 57 个，10 月 74 个）是被白捡走的，一行没改、一个软链没加。',
            en: 'For discovery it scans six paths, and the fifth one is ~/.agents/skills - the tree three agents on the machine share. So the authors entire skill pool (57 in August, 74 in October) was picked up for free: zero edits, zero new symlinks.',
            source: ORANGE_BOOK,
          },
          {
            type: 'stats',
            items: [
              {
                value: '6',
                label: { zh: 'skill 扫描路径数', en: 'Skill scan paths' },
                sub: { zh: '第五个是三个 agent 共读的 ~/.agents/skills', en: 'The fifth is the shared ~/.agents/skills tree' },
              },
              {
                value: '57 → 74',
                label: { zh: '作者本机加载的 skill 数（8 月 → 10 月）', en: 'Skills loaded on the author machine (Aug to Oct)' },
                sub: { zh: '零改动白捡', en: 'Inherited with zero changes' },
              },
              {
                value: '500 字符',
                label: { zh: '目录里描述的默认截断上限', en: 'Default description truncation in the catalog' },
                sub: { zh: '模型平时只看到名字和描述两样', en: 'The model normally sees only name and description' },
              },
            ],
          },
          {
            type: 'callout',
            tone: 'tip',
            title: { zh: '一个要当心的落差：~/.claude/skills 不在名单里', en: 'One Gap to Watch: ~/.claude/skills Is Not Scanned' },
            zh: '六个扫描位置里不包含 ~/.claude/skills。作者这台机器碰巧没事，因为那个位置早就是一个指向公共目录的软链；但如果你的 Claude Code skill 实打实存在那个目录里，dsh 看不见——得自己配一条自定义路径，或者做个软链把它接过去。',
            en: 'The six scan paths do not include ~/.claude/skills. The author machine got lucky: that location was already a symlink into the shared directory. If your Claude Code skills physically live there, dsh simply cannot see them - add a custom scan path or bridge it with a symlink.',
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '模型自己用写文件的工具造出一个新 skill，同一步就能看见它。一般做法是靠文件监听器发现变化，中间必然有延迟；dsh 的第一方写入和编辑工具，在写到可能影响 skill 的路径时会顺手把目录标记为失效，所以写完就能列进清单，不用等。这是「让 agent 自己长本事」这条路上一个很实的地基。',
            en: 'When the model writes a new skill with its own file tools, it sees it in the same step. The usual approach is a file watcher paying a discovery delay; dsh first-party write and edit tools mark the directory stale whenever they touch a skill-affecting path, so a freshly written skill is already listable with no wait. That is solid ground under the road where agents grow their own capabilities.',
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '发了个官方内置 skill，然后在默认配置里把它关掉——skill-badge 那行的 disabled: true 就是这个意思：随包发出去，想用得自己去打开那一行。而且模型平时看到的 skill 目录只有名字和描述两样，正文、路径、来源都不给，连「什么时候该用它」那个字段都不进目录；模型得先明确调用一次，才拿得到正文。再往前追一步，把 skill 正文直接塞进系统提示词的方案，他们在设计阶段就否了，理由是这样会「摧毁渐进式披露，让每一次请求都为可能用不上的指令付费」。',
            en: 'They shipped an official built-in skill and then disabled it in the default config - the skill-badge disabled: true line means exactly that: it travels with the package, and you flip it on yourself if you want it. The catalog the model sees carries name and description only: no body, no path, no provenance, not even the when-to-use field; the model must explicitly invoke once to get the text. Going further back, the design that stuffs skill bodies straight into the system prompt was rejected during design, because it would destroy progressive disclosure and make every request pay for instructions it may never use.',
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '一个相关的被否方案：2026 年 7 月 12 日有人提议把 skill 注册表上一个接口整个剪掉，理由很充分——整个仓库里没有一个地方调用它，还拖着一套运行时假提供方、保留名规则和缓存分支。提案被否，说明只有一句：直接在运行时注册 skill，是刻意留给第三方插件的扩展路径。skill 也正是这么被对待的：明明可以做成内置功能，偏要做成一个谁都能替换、谁都能接管的普通零件。',
            en: 'One more vetoed proposal: on 2026-07-12 someone moved to cut a skill-registry interface entirely, with a strong case - not one call site in the whole repo, dragging along a runtime fake provider, reserved-name rules, and cache branches. Rejected, with a one-line rationale: registering skills directly at runtime is the extension path deliberately left open for third-party plugins. Skills are treated the same way: what could have been a built-in was instead made into an ordinary part anyone can replace or take over.',
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'costs-and-ecosystem',
        title: { zh: '「一切皆插件」的反面：三道代价', en: 'The Other Side of Everything-is-a-Plugin: Three Costs' },
        blocks: [
          {
            type: 'list',
            ordered: true,
            zh: [
              '学习曲线是第一道。写 skill 会打字就行，接 MCP 会照抄配置就行；写一个 dsh 插件，你得先懂底层框架的一整套概念：依赖注入、副作用模型、事件链上「往下传」的语义、配置校验的写法。仓库为此备了一份入门读物、四课教程、五篇接口文档、三层九篇开发指南——光是教人写插件就得配一套教材，这本身就是成本。',
              '版本是第二道。README 上那句话是全大写的：会有破坏兼容性的变更。项目规则里有一整节叫「预发布立场：地基优先于爆炸半径」，开头一句是「第一个正式版发布时删掉本节」。`.dsh-plugin` 整套被删干净就是这条政策的直接产物。现在写 dsh 插件的人，得有地板随时被抽走的心理准备。',
              '然后是生态。8 月发现机制只有一个 GitHub 标签，没有市场、没有搜索、没有安装量：调研时 238 个仓库打了这个标签，8 月 14 日凌晨 476 个，10 月 20 日早上 21,435 个，话题页有了正式标题 DeepSeek Harness Plugins 和一段介绍，一万八千多人关注。但打标签不等于是插件——按 star 排第一的是一个逆向工程的命令行工具，里面同样混着蹭热度的仓库，两万个里多少是真能装进 dsh 的，作者没抽样。',
            ],
            en: [
              'Learning curve first. A skill needs typing; an MCP server needs copying a config; a dsh plugin requires the whole underlying framework vocabulary - dependency injection, the effect model, pass-down semantics on the event chain, config validation idioms. The repo backs this with an intro reader, four tutorial lessons, five API documents, and a three-tier nine-piece development guide. Shipping a textbook just to teach plugin writing is itself a cost.',
              'Versioning second. The README sentence is in capitals: breaking changes ahead. A project-rules section titled Pre-release stance: foundations over blast radius opens with delete this section when the first stable release ships. The wholesale deletion of `.dsh-plugin` is that policy direct product, and today plugin authors need the psychological readiness of a floor that can be pulled out at any moment.',
              'Ecosystem last. In August the only discovery mechanism was one GitHub topic - no marketplace, no search, no install counts: 238 tagged repos at survey time, 476 by the early morning of Aug 14, 21,435 by the morning of Oct 20, when the topic page finally got its official title DeepSeek Harness Plugins, an intro, and 18k+ watchers. But a tag is not a plugin: the top-starred one is a reverse-engineered CLI, freeloaders mixed in, and how many of the twenty thousand actually install into dsh the author never sampled.',
            ],
            source: ORANGE_BOOK,
          },
          {
            type: 'quote',
            zh: '8 月我的判断是：dsh 的插件层能力最强，门槛也最高，生态却是空的。两个月后，门槛被「让 Agent 创建插件」拉低了一截，生态的数量起来了，质量还说不清。而它的 skill 层和 MCP 层，能直接白嫖别人已经跑起来的生态。',
            en: 'My August verdict: dsh plugin layer is the most capable and the hardest to enter, and its ecosystem was empty. Two months later the Let-the-Agent-Create-a-Plugin entry lowered the barrier one notch, the ecosystem gained raw count but quality stays unclear - while its skill and MCP layers get to free-ride ecosystems other people already run.',
            cite: { zh: '花叔，橙皮书第 10 节', en: 'Huashu, Orange Book section 10' },
            source: ORANGE_BOOK,
          },
          {
            type: 'links',
            title: { zh: '接着看', en: 'Keep Reading' },
            items: [
              {
                label: { zh: '第 11 章：两个插件抢同一件活', en: 'Chapter 11: Two Plugins After the Same Job' },
                href: '/chapter/plugin-conflicts',
                desc: { zh: '插件冲突怎么判、清单怎么叠', en: 'Conflict arbitration and how the manifest stacks' },
                tag: 'internal',
              },
              {
                label: { zh: '第 9 章：长任务', en: 'Chapter 9: Long Tasks' },
                href: '/chapter/long-tasks',
                tag: 'internal',
              },
              {
                label: { zh: 'MCP 规范', en: 'MCP Specification' },
                href: 'https://modelcontextprotocol.io/',
                desc: { zh: '工具、资源、提示模板三个动词的出处', en: 'Where the tools/resources/prompts verbs come from' },
                tag: 'external',
              },
              {
                label: { zh: 'MCP GitHub server', en: 'MCP GitHub server' },
                href: 'https://github.com/modelcontextprotocol/server-github',
                tag: 'external',
              },
              {
                label: { zh: 'Claude Code 文档', en: 'Claude Code Docs' },
                href: 'https://docs.anthropic.com/en/docs/claude-code/overview',
                desc: { zh: 'skill 外部格式的对齐对象', en: 'The format dsh skills stay isomorphic to' },
                tag: 'external',
              },
            ],
          },
        ],
      },
    ],
    sources: [
      ORANGE_BOOK,
      { label: 'MCP 规范 / Model Context Protocol', href: 'https://modelcontextprotocol.io/' },
      { label: 'modelcontextprotocol/server-github', href: 'https://github.com/modelcontextprotocol/server-github' },
      { label: 'Claude Code overview', href: 'https://docs.anthropic.com/en/docs/claude-code/overview' },
    ],
    sisters: ['agent-skillhub-patterns', 'mcp-patterns', 'harness-engineering'],
  },
  {
    slug: 'plugin-conflicts',
    num: '11',
    part: 'architecture',
    icon: 'puzzle',
    level: 'advanced',
    minutes: 16,
    accent: 'violet',
    title: { zh: '两个插件都想管文件编辑，谁赢', en: 'When Two Plugins Want the Same Tool' },
    subtitle: {
      zh: '答案是「没有谁赢」——因为这套系统不允许两个同时在。',
      en: 'Nobody wins, because the system never allows two at once.',
    },
    promise: {
      zh: '能看懂插件冲突怎么判、清单怎么叠出来，装坏了知道该往哪儿看。',
      en: 'Read conflict arbitration and manifest stacking, and know where to look when an install goes bad.',
    },
    sections: [
      {
        id: 'first-come-wins',
        title: { zh: '先到的赢，后到的当场报错', en: 'First Comes, First Throws on the Second' },
        blocks: [
          {
            type: 'p',
            zh: '装了两个都想接管文件编辑的插件，谁赢？有没有优先级？出了事我怎么知道是哪个插件干的？这个问题不玄——任何用过插件生态的人都被它咬过一次：两个东西都说自己管某件事，系统不吭声，随便挑了一个，你花半小时才反应过来行为是被谁改的。答案先给出来：这套系统里没有谁赢，因为它不允许两个同时在。同一个位置上只站一个，第二个来的当场抛错，而且错误信息里会点名先到的是哪一个。',
            en: 'You install two plugins that both want to own file editing - who wins, is there a priority, and how would you even know which one changed the behavior? Not a hypothetical: anyone who has used a plugin ecosystem got bitten once, when two things claim the same job, the system stays silent, picks one arbitrarily, and you burn half an hour discovering whose hands moved. The answer up front: nobody wins, because the system refuses to let two stand at once. One slot holds exactly one owner; the second arrival throws on the spot, and the error names the incumbent.',
            source: ORANGE_BOOK,
          },
          {
            type: 'code',
            lang: 'ts',
            title: '冲突的全部答案在源码里只有一行（vendor/cordis/src/reflect.ts:290）',
            code: `throw new Error(\`service "\${name}" has been registered at <\${this.store[key].fiber.name}>\`)`,
            note: {
              zh: '翻译成人话：「这个位置已经被某某占了」，然后当场失败，并且告诉你占位的是谁。',
              en: 'In plain English: this slot is already registered at whoever-got-here-first - instant failure, with the incumbent named.',
            },
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '顺着这条规矩，产品层还加了一条更严的纪律。写给模型看的那份编辑指南里有一句（发行包里就带着这份文件）：一行「对外提供服务」的配置，不许松散地摆在预设里——没有隔离域的服务会进到进程全局的位置上，于是第二个会话挂同一个预设时就会跟第一个撞车；挂载会直接拒绝它，而不是让这次撞车在后面某个时刻才浮出来。反方向的规矩同样明确：只消费、不提供服务的行，不许自己包一层隔离域，否则它反而找不到要用的东西。包错了和没包，是同一类错误。所以想换掉文件编辑，别去装第二个插件，去把配置里那一行换成别的实现——这个系统的扩展方式是替换，叠加在这里不成立。',
            en: 'The product layer tightens the rule further. The model-facing editing guide shipped inside the release package states that a service-providing row must never sit loosely in a preset - a service without an isolation domain lands in a process-global slot, so a second session mounting the same preset collides with the first; mounting rejects it outright instead of letting the collision surface later. The reverse rule is equally explicit: consumer-only rows must not wrap themselves in an isolation domain, or they lose sight of what they need. Wrong wrapping and no wrapping are the same class of error. Practical upshot: to replace file editing, do not install a second plugin - swap that one config line for a different implementation. Extension here means replacement; layering does not apply.',
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'one-job-three-roles',
        title: { zh: '一件活，被拆成三个角色', en: 'One Job, Split Into Three Roles' },
        blocks: [
          {
            type: 'p',
            zh: '拿最典型的那件活举例：跑 shell 命令——就是那个黑框框，你敲一行字它执行一行。你可能以为这是一个功能、一个模块，但在这个仓库里它是四个包。',
            en: 'Take the most typical job: running shell commands - the black box that executes one line per keystroke-entry. You would assume one feature, one module. In this repository it is four packages.',
            source: ORANGE_BOOK,
          },
          {
            type: 'table',
            head: [
              { zh: '包', en: 'Package' },
              { zh: '它是什么角色', en: 'Its role' },
            ],
            rows: [
              [
                { zh: '`shell`', en: '`shell`' },
                { zh: '只定义契约：一个执行器长什么样、接受什么、返回什么。不干活', en: 'The contract only: what an executor looks like, what it takes, what it returns. Does no work' },
              ],
              [
                { zh: '`bash-local`', en: '`bash-local`' },
                { zh: '一个实现：直接在你本机跑', en: 'One implementation: runs straight on your machine' },
              ],
              [
                { zh: '`bash-sandbox`', en: '`bash-sandbox`' },
                { zh: '另一个实现：先套上沙箱再跑', en: 'The other implementation: wraps a sandbox first' },
              ],
              [
                { zh: '`tool-bash`', en: '`tool-bash`' },
                { zh: '模型那一侧看到的工具，也就是模型知道「我可以跑命令」的那个入口', en: 'The model-facing tool - the entry through which the model knows it may run commands' },
              ],
            ],
            source: ORANGE_BOOK,
          },
          {
            type: 'quote',
            zh: 'A leaf cordis.yml selects one executor implementation and the model-facing tools it needs.（一份末梢配置文件挑一个执行器实现，外加它需要的那些面向模型的工具。）注意那个「一个」：选哪个实现是组装时的事，本机跑还是沙箱里跑，是你在配置里挑的一行。',
            en: 'A leaf cordis.yml selects one executor implementation and the model-facing tools it needs. Note the word "one": choosing the implementation is an assembly-time act - run locally or run sandboxed is one line you pick in config.',
            cite: { zh: 'packages/shell/README.md', en: 'packages/shell/README.md' },
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '为什么非要拆成三份？2026 年 6 月 13 日的设计笔记写了理由：这三者的变化速度根本不一样——定义几乎不动，实现经常换，模型看到的东西一变就得改提示词。捆在一起，换个执行器就会搅动模型看到的工具描述，尽管契约根本没变。拆开的回报写在架构文档里，很具体：文件系统和子进程这两个实现共享同一个执行世界，所以把它们指向一个远程沙箱，Bash、终端、代码跳转会跟着一起搬过去，不需要给任何一个分叉出新版本——改配置里的一行，本地 agent 就变成了远程 agent。类比是插座标准：规范本身很薄，接在上面的电器可以无穷多，换发电方式插头形状也不变。',
            en: 'Why three-way it at all? The 2026-06-13 design note answers: the three change at completely different rates - the definition barely moves, implementations churn often, and anything model-facing forces a prompt rewrite the moment it shifts. Bundled, swapping an executor would disturb the tool descriptions the model sees even though the contract never changed. The payoff is concrete and sits in the architecture doc: the filesystem and subprocess implementations share one execution world, so pointing both at a remote sandbox relocates Bash, terminals, and code-jump together - no fork of any of them needed. One config line turns a local agent into a remote agent. The analogy is a plug standard: the spec is thin, infinitely many appliances hang off it, and changing how power is generated leaves the plug shape untouched.',
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'vendored-kernel',
        title: { zh: '这套地基不是 DeepSeek 造的', en: 'The Foundation Was Not Built by DeepSeek' },
        blocks: [
          {
            type: 'p',
            zh: '上面这些规矩，一条都不是 DeepSeek 发明的。底下那个框架叫 Cordis，作者是一个叫 Shigma 的中文开发者，2022 年 5 月建的仓库；DeepSeek 公开之前它是一个几百星的个人项目，到 10 月 20 日是九千两百多星。DeepSeek 的做法是把它整份源码拷进自己仓库，连同几个配套库一共九个包，核心那部分两千六百多行 TypeScript——比很多公司的一个业务模块还小。拷进来之后按自己的需要动了刀，改动清单编号到 18 条，每一条都写清楚改了什么、为什么改。8 月 10 日那次改名：九个包全部改成 @deepseek-ai/ 开头的名字，理由是每个包都把这个框架声明成依赖，发布产品就等于连框架一起发布出去；用上游的名字发出去，就是在包仓库上抢注了别人的名字，而在那些代理转发的镜像上，同名条目会盖住真正的上游包，把错误的框架装进毫不相干的项目里。仓库里保留着上游作者的邮箱字段，没抹掉。',
            en: 'Not one of those rules was invented by DeepSeek. The framework underneath is Cordis, created by a Chinese developer going by Shigma in May 2022 - a personal project with a few hundred stars before DeepSeek went public, past 9,200 stars by October 20. DeepSeek vendored its entire source into the repository: nine packages counting the companion libraries, with a core of just over 2,600 lines of TypeScript - smaller than one business module at many companies. The fork then took its own cuts: a logged change list numbered to 18 entries, each stating what changed and why. The August 10 rename moved all nine packages under the @deepseek-ai/ prefix, because every package declares the framework as a dependency - shipping the product means shipping the framework - and publishing under upstream names would squat those names on the registry, where on proxied mirrors the same-named entries would shadow the real upstream packages and install the wrong framework into unrelated projects. The upstream author email fields were kept, not scrubbed.',
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '为什么不老老实实用包管理器装？决策笔记里的理由是这个仓库最早的一批笔记之一，写在项目第一天：上游当时还是候选版本，而 agent 主循环的正确性直接压在这个框架的内部行为上，上游一个版本号跳动就能打断他们，而且没有本地修复通道。',
            en: 'Why not just install it from a package manager? The decision note is among the first batch in the repo, written on project day one: upstream was still a release candidate, the correctness of the agent main loop rested directly on this framework internal behavior, and a single upstream version bump could break them with no local fix channel.',
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '看到这儿容易觉得这是一次单方面的拿来主义。翻提交记录发现不是：Shigma 本人在这个仓库里有两次提交，都在文档上——7 月 31 日加了那篇论文，8 月 13 日加了论文预览版的链接。那篇论文叫《一种时空可组合性的编程范式》，「时空可组合性」翻成人话就是：拆得干净（时间），拼得对（空间）——卸一个东西要能把它的痕迹全部撤销；拼得对说的是谁依赖谁不用人排顺序。论文的草稿日期是 2026 年 8 月 13 日，跟这个仓库对外公开是同一天，理论和实现同日亮相；到 10 月，dsh 的 README 引用它时给的是 arXiv 编号 2608.25512。',
            en: 'Easy to read as one-way appropriation; the commit log says otherwise. Shigma himself has two commits in this repository, both documentation: July 31 adding the paper, August 13 adding the preview link. The paper is titled A Programming Paradigm for Spacetime Composability - in plain words: detach cleanly (time), compose correctly (space): unmounting must fully undo a thing traces, and who-depends-on-whom must need no human ordering. The draft is dated 2026-08-13, the very day the repo opened - theory and implementation premiered together - and by October the dsh README cites it as arXiv:2608.25512.',
            source: ORANGE_BOOK,
          },
          {
            type: 'stats',
            items: [
              {
                value: '9 / 2,600+',
                label: { zh: '拷进来的包数 / 核心框架 TypeScript 行数', en: 'Vendored packages / core framework TypeScript lines' },
              },
              {
                value: '18',
                label: { zh: '逐条记录的改动数', en: 'Logged vendor changes, each with a reason' },
              },
              {
                value: '2022-05',
                label: { zh: '上游仓库建站时间（作者 Shigma）', en: 'Upstream repo started (author Shigma)' },
                sub: { zh: '2026-08-10 九个包改名 @deepseek-ai/', en: 'All nine packages renamed to @deepseek-ai/ on 2026-08-10' },
              },
              {
                value: '2',
                label: { zh: 'Shigma 本人在 DSH 仓库的提交次数', en: 'Shigma own commits in the DSH repo' },
                sub: { zh: '7/31 加论文、8/13 加预览链接，都是文档', en: 'Paper on 7/31, preview link on 8/13 - both docs' },
              },
            ],
          },
        ],
      },
      {
        id: 'undo-everything',
        title: { zh: '拆得干净，靠一条不给你选的规矩', en: 'Detaching Cleanly Rests on a Mandatory Rule' },
        blocks: [
          {
            type: 'p',
            zh: '「拆得干净」在代码里的落法只有一条：你注册任何东西的那一刻，必须同时交出怎么撤销它。监听器、工具、定时器、提示词段落，一律如此。插件被卸载时，框架按倒序把这些全部收回。像租东西时必须同时填的那张归还单：你租投影仪，登记的那一刻就得写清楚「还的时候关电源、拔线、放回三楼柜子」。这条规矩带来一个漂亮的推论——教程原文：Because unloading releases effects and loading follows dependencies, HMR can replace a running plugin by unloading and loading it.（因为卸载会释放掉这些副作用、加载又会遵循依赖关系，所以热重载只要卸了再装就能替换一个正在运行的插件。）热重载是前面两条规则的自然推论，没人专门写它。',
            en: 'Detaching cleanly lands in code as one rule: the moment you register anything, you must also hand over how to undo it. Listeners, tools, timers, prompt sections, all without exception; when a plugin unmounts, the framework reclaims them in reverse order. Like a rental return slip you must fill in at pickup: rent a projector and the form at registration already says switch off, unplug, back to the third-floor closet. The rule buys a beautiful corollary - the tutorial sentence: Because unloading releases effects and loading follows dependencies, HMR can replace a running plugin by unloading and loading it. Hot reload is a theorem of the two earlier rules; nobody wrote it on purpose.',
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '对你的实际意义：改自己那份配置文件是热生效的，不用重启；改坏了它会保留上一棵能跑的树继续运行，并广播一条配置更新失败。这是这套架构少有的、外行也能直接吃到的好处。',
            en: 'What that means for you: edits to your own config file take effect hot, no restart, and a broken edit keeps the last working tree running while broadcasting a config-update failure. One of the rare benefits this architecture hands directly to non-experts.',
            source: ORANGE_BOOK,
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '代价：它失败的时候不出声', en: 'The Price: Failures That Make No Sound' },
            zh: '拆卸是异步的、可重入的。当一堆东西互相依赖、又同时在拆，你会得到一类全新的 bug：安静的挂起。框架改动清单第 12 条记了一个现场：一次失败的初次加载触发回滚，回滚去销毁热重载插件，而热重载插件的拆卸正在等一个排在同一批操作后面的刷新——转了一圈，锁死了，原文是 a deadlock that exited 13 with no diagnostic：进程以退出码 13 结束，一个字的诊断都没有。还有一条是设计：一个插件如果声明它需要某个没人提供的服务，它会永远等下去，什么都不打印——不报错，因为等待是合法状态，提供方随时可能在之后被挂上来。插件没加载，不报错。像点了外卖但骑手一直没接单，App 不会告诉你出事了，它就静静挂着。这在框架层是对的，在产品启动那一刻是灾难，所以 DeepSeek 只在「启动」这个特定时刻加了两道审计：第一道在配置树挂完后检查「有启用的条目却没有对应实例」，把每一个解析不了的插件名报出来；第二道再等每一个条目真正活过来，失败的带原始堆栈，还在等的报出它到底缺哪几个服务。两道审计干的事，是把框架的「等待是合法的」在启动这一刻强行翻译成「等待就是失败」。落到你身上的判据：如果某个功能「好像没生效」，先怀疑它压根没被挂上，而不是怀疑配置写错了——配置写错了它会大声报错，「包不在」才是那种安静的失败。',
            en: 'Teardown is asynchronous and reentrant. When many interdependent things unload at once you get a brand-new bug class: the silent hang. Vendor change entry 12 records a crime scene: a failed initial load triggered rollback, rollback destroyed the HMR plugin, and the HMR plugin teardown was waiting on a refresh queued behind the same batch - one full circle, locked. The original words: a deadlock that exited 13 with no diagnostic - exit code 13, not one word of output. And one behavior is by design: a plugin whose inject names a service nobody provides waits forever, printing nothing, because waiting is a legitimate state - the provider may still be mounted later. A plugin that never loads raises no error, like a food order no rider accepts: the app just hangs quietly. Correct at framework level, a disaster at the moment a product starts - so DeepSeek added two audits scoped to exactly that moment. The first, after the config tree mounts, flags enabled entries with no instance and reports every unresolvable plugin name; the second waits for every entry to actually live, failures with original stacks, still-waiting ones reported by which services they lack. Together they force-translate the framework "waiting is legal" into "waiting is failure" at boot. The rule you keep: when a feature seems not to work, suspect it was never mounted before suspecting a config typo - a typo fails loudly; a missing package is the kind that fails silently.',
            source: ORANGE_BOOK,
          },
          {
            type: 'callout',
            tone: 'note',
            title: { zh: '一处作者不替你裁决的矛盾', en: 'One Contradiction the Author Refuses to Adjudicate' },
            zh: '仓库里两份文档对「插件之间发消息有几种方式」说法不一致：入门篇列了 4 种，教程和自动生成的接口目录是 5 种，多出来的那种叫 bail。两份都在发行的文档里，没有找到哪一份是笔误的证据，所以橙皮书如实标出来，不替它选一个当定论。',
            en: 'Two shipped documents disagree on how many ways plugins can exchange messages: the reader lists 4, the tutorial and the auto-generated API directory list 5, the extra one called bail. Both are in the released docs and there is no evidence which is the typo, so the book flags it as-is and picks neither.',
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'dump-tree',
        title: { zh: '我先把它的启动清单打出来了', en: 'First, Dump the Boot Manifest' },
        blocks: [
          {
            type: 'code',
            lang: 'bash',
            title: '把出厂那棵插件树原样打印出来',
            code: `dsh --profile web --dump-default-config`,
            note: {
              zh: '8 月在本机跑一次输出 490 行 YAML、骨架 129 行插件；10 月在 0.2.1-rc.2 上再跑，输出 1,229 行、骨架 190 行，两个月多了 61 个零件。',
              en: 'The Aug run emitted 490 YAML lines with a 129-row plugin skeleton; re-run in October on 0.2.1-rc.2 it emitted 1,229 lines with 190 rows - 61 more parts in two months.',
            },
            source: ORANGE_BOOK,
          },
          {
            type: 'code',
            lang: 'yaml',
            title: '8 月那份 129 行清单的开头、中间和结尾',
            code: `- id: timer
  name: '@deepseek-ai/cordis-plugin-timer'
- id: llm
  name: '@deepseek-ai/dsh-llm'
- id: session
  name: '@deepseek-ai/dsh-session'
...
- id: sandbox
  name: '@deepseek-ai/dsh-sandbox-local'
- id: agent-loop
  name: '@deepseek-ai/dsh-agent-loop'
...
- id: ui-conversation
  name: '@deepseek-ai/dsh-client-ui-conversation'
- id: ui-trajectory
  name: '@deepseek-ai/dsh-client-ui-trajectory'`,
            note: {
              zh: '第一行是个计时器，往下是模型适配器、会话记录、沙箱，再往下是 agent 主循环，最后二十几行是网页界面上你看得见的每一块。它们全在同一个列表里，格式一模一样。10 月那份的前两行是插件管理器（一个工具侧、一个本体），计时器排第三，第 8 行是 session-log-deepseek——默认开着的会话日志上传。',
              en: 'Row one is a timer; below it the model adapter, session records, sandbox, then the agent main loop; the last twenty-some rows are every block of the web UI you can see. All in one list, one identical format. In October the first two rows are the plugin managers (tool side and core), the timer slides to row three, and row eight is session-log-deepseek - the on-by-default session log upload.',
            },
            source: ORANGE_BOOK,
          },
          {
            type: 'code',
            lang: 'yaml',
            title: '每隔几行插一句出处标记：每一行是谁放进来的、谁动过它',
            code: `# == @deepseek-ai/dsh-base
- id: skill
  name: '@deepseek-ai/dsh-skill'
# == @deepseek-ai/dsh-base, patched by @deepseek-ai/dsh-web-app
- id: tool-fs
  name: '@deepseek-ai/dsh-tool-fs'
  disabled: true`,
            note: {
              zh: '「这行来自基础包」「这行来自基础包、但被网页包改过」。8 月 129 行里有 24 处出处标记、25 行标着已停用；10 月 190 行里还是 24 处出处标记、23 行停用。你不用翻源码就知道每一行的来历。',
              en: '"From the base package", "from the base package but patched by the web package". The Aug 129 rows carry 24 provenance marks and 25 disabled rows; the Oct 190 rows carry the same 24 marks with 23 disabled. You never open the source to know where each row came from.',
            },
            source: ORANGE_BOOK,
          },
          {
            type: 'steps',
            items: [
              {
                title: { zh: '起点是空的', en: 'The start is empty' },
                desc: {
                  zh: 'profile 目录里那个根配置文件的内容真的就是两个字符 []，而且每次启动都会被重新覆写成空的——它存在的唯一理由是加载器需要一个真实的文件当锚点。',
                  en: 'The root profile config really contains the two characters [], and every boot overwrites it back to empty. Its sole reason to exist: the loader needs a real file as an anchor.',
                },
              },
              {
                title: { zh: '基础包补丁（78 行插件）', en: 'Base-package patch (78 plugin rows)' },
                desc: {
                  zh: '8 月的启动顺序第一站：把基础包的补丁叠到空列表上。',
                  en: 'First fold in the Aug boot sequence: the base package patch onto the empty list.',
                },
              },
              {
                title: { zh: '网页包的补丁', en: 'The web-app package patch' },
                desc: {
                  zh: '上面 tool-fs 那行就是在这一站被 disabled: true 的。',
                  en: 'The tool-fs row above was flipped to disabled: true at this station.',
                },
              },
              {
                title: { zh: '你的 profile 补丁', en: 'Your profile patch' },
                desc: {
                  zh: 'profile 是一份具名的组合，存在你自己电脑的目录里，web 和 headless 两份是随包送的模板。',
                  en: 'A profile is a named composition stored in your own directory; web and headless ship as templates.',
                },
              },
              {
                title: { zh: '你的全局补丁（家目录），再到命令行 --patch', en: 'Your global patch (home dir), then command-line --patch' },
                desc: {
                  zh: '0.2 版把顺序改成：先叠 profile 声明的各个组合包（bundle，别人打包好的一摞配置行加对应代码）的补丁，再叠 profile 自己的补丁、家目录下的全局补丁，最后是命令行 --patch 给的补丁。思路没变。',
                  en: 'Version 0.2 reordered it: first the patches of the bundle packages the profile names (a bundle is someone else pre-packed stack of config rows plus code), then the profile own patch, then the home-directory global patch, and finally the command-line --patch. Same idea.',
                },
              },
            ],
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '补丁怎么改一行？靠 id。你想让网页版不挂某个工具，不需要复制整棵树，只要写一行同名 id 的补丁，它就会盖住原来那一行。但这里有个反直觉的规则，官方自己写在限制清单里：补丁是整段替换，不是逐字段合并——你想改一个数字，得把这一行的所有字段抄一遍。听着很笨，好处是任何时候你看一眼就知道这行最终生效的完整配置是什么，没有藏在别处的继承链。顺带一句：8 月那 25 行停用的插件里，压缩、清理、命令这几样是从这棵宿主树搬进了每个模式自己的配置里。',
            en: 'How does a patch change a row? By id. To keep the web build from mounting some tool you do not copy the tree - one patch row with the same id covers the original. But one counterintuitive rule, written by the officials themselves in their limitations list: patches replace the whole row, never merge field by field - to change one number you re-copy every field of that row. It sounds dumb; the payoff is that any glance shows the full effective config of that row, with no inheritance chain hidden elsewhere. Aside: among the 25 disabled rows in August, compaction, cleanup, and commands were not removed but relocated from this host tree into each mode own config.',
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'no-privileged-core',
        title: { zh: '「没有特权内核」在代码里是什么样', en: 'No Privileged Kernel, as Seen in Code' },
        blocks: [
          {
            type: 'quote',
            zh: '产品的每一部分都是插件，包括模型适配器、工具注册表、会话日志，以及 agent 主循环本身，所以每一部分都能从配置里替换掉。没有一个特权内核等着你去打补丁：你扩展 dsh 的方式是在其它插件旁边再挂一个插件，而注册都是可撤销的，插件卸载时自动收回。',
            en: 'Every part of the product is a plugin - the model adapter, the tool registry, the session log, and the agent main loop itself - so every part is replaceable from config. There is no privileged kernel waiting for you to patch it: you extend dsh by mounting another plugin beside the others, and every registration is undoable, reclaimed automatically when a plugin unmounts.',
            cite: { zh: 'DSH 架构文档的宣言', en: 'The DSH architecture doc manifesto' },
            source: ORANGE_BOOK,
          },
          {
            type: 'diagram',
            id: 'plugin-layers',
            caption: {
              zh: '清单从空列表一层层叠出来：基础包 78 行、网页包补丁、你的 profile、全局补丁——skill、MCP、界面、主循环全都住在同一棵平级的列表里，这一张图的结论是「没有哪一行是内核」。',
              en: 'The manifest stacks up from an empty list: 78 base rows, the web-app patch, your profile, the global patch - skills, MCP, UI, and the main loop all live in one peer-level list, and the point of this diagram is that no row is a kernel.',
            },
          },
          {
            type: 'p',
            zh: '正面回答：在配置层面，agent 主循环和第一行那个计时器是完全平级的两行——格式一样，出处标记一样，都可以被一行 id 相同的补丁盖掉。基础包的补丁文件里，agent-loop 就老老实实排在 timer、llm、tools 中间，没有任何特殊待遇。理论上给 agent-loop 那一行加一句停用，这个 agent 就没有循环了；但话得说死：作者没有实跑验证「关掉主循环会怎样」，能确认的只有它在配置文件里的格式和别的行完全平级——「关掉它就真的没了」还是「关掉后会优雅地报个错」，都不替你断言，这条要等真跑一次才能写，未验证。不过问题问得对，答案可能跟你预期的不一样：在这套系统里，拔错零件最可能的后果是安静——底层框架把「依赖的服务还没出现就一直等着，不报错也不打印」定成了合法状态，这是热插拔能成立的前提，而产品只在启动那一刻把它硬翻译成失败。你卸错一个包，程序照常启动、界面照常打开、某个功能就是不干活。',
            en: 'The direct answer: at config level the agent main loop and that first timer row are fully peer lines - same format, same provenance marks, each coverable by one patch row of the same id. In the base patch file agent-loop sits quietly between timer, llm, and tools with zero special treatment. In theory, one disabled line on agent-loop and the agent has no loop; but to be honest, the author never ran that experiment. The only confirmable fact is that the row is format-equal to all others - whether switching it off truly removes the loop or fails gracefully is left unasserted and marked unverified. The question is still the right one, and the answer may surprise you: in this system the likeliest consequence of pulling the wrong part is silence. The framework made wait-forever-without-error a legal state - the precondition for hot-swapping - and the product force-translates it to failure only at boot. Pull the wrong package and the program starts, the UI opens, and one feature simply never works.',
            source: ORANGE_BOOK,
          },
          {
            type: 'table',
            head: [
              { zh: '口径', en: 'Measure' },
              { zh: '8 月', en: 'Aug' },
              { zh: '10 月', en: 'Oct' },
            ],
            rows: [
              [
                { zh: 'dump 输出 YAML 总行数', en: 'Total YAML lines from the dump' },
                { zh: '490', en: '490' },
                { zh: '1,229', en: '1,229' },
              ],
              [
                { zh: '插件骨架行数', en: 'Plugin skeleton rows' },
                { zh: '129', en: '129' },
                { zh: '190', en: '190' },
              ],
              [
                { zh: '出处标记（# == 行）', en: 'Provenance marks (# == lines)' },
                { zh: '24', en: '24' },
                { zh: '24', en: '24' },
              ],
              [
                { zh: '标停用的行数', en: 'Disabled rows' },
                { zh: '25', en: '25' },
                { zh: '23', en: '23' },
              ],
              [
                { zh: 'ui- 开头的界面行数', en: 'ui- rows (the frontend)' },
                { zh: '27', en: '27' },
                { zh: '51', en: '51' },
              ],
              [
                { zh: '设置/插件页里能点着改的卡', en: 'Cards you can actually toggle in settings' },
                { zh: '3 张（实跑显示 133 个插件在运行）', en: '3 cards (runtime showed 133 plugins live)' },
                { zh: '4 张 + 4 个实验性开关', en: '4 cards + 4 experimental toggles' },
              ],
            ],
            note: {
              zh: '8 月实跑的 133 比启动清单 129 行多出来的几个，作者没追是从哪来的。190 行里的绝大多数仍然只能通过配置文件改；设置页右上角有「打开配置文件」按钮，就是给这条路的。',
              en: 'Where the Aug runtime count of 133 exceeds the 129 boot rows, the author did not chase the difference. Most of the 190 October rows remain config-file-only; the settings page offers an Open Config File button as the road there.',
            },
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '这个落差是这东西现在最容易挨骂的一处：通篇讲插件，界面上却找不到插件在哪。这是分层：插件的组装是配置文件的事，插件的运行时偏好才是设置页的事。他们的架构笔记点名说，Codex、Claude Code、Kimi、OpenCode 这几家最后都收敛到了同一个切分上。知道即可，但你得知道，否则你会在设置页里找一个永远不存在的入口。',
            en: 'That gap is the most flammable spot of the current product: plugin-everywhere in prose, no plugins page to find in the UI. It is layering: assembly belongs to the config file, runtime preferences to settings. Their architecture notes name-check that Codex, Claude Code, Kimi, and OpenCode all converged on the same cut. Just know it - otherwise you will hunt settings for an entry that never exists.',
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '连界面也长在同一棵树上：清单后半段全是 ui- 开头的行，8 月 27 行、10 月 51 行，从主题、侧边栏一直到轨迹视图——前端也是插件树，和后端是同一棵。浏览器里的代码和服务器上的代码是两个世界，怎么让浏览器里的一个插件安全地喊到服务器上某个方法？他们的做法叫 typert：后端方法上打一个标记，构建时读 TypeScript 源码，把这些方法编译成一份前端能直接调用的契约文件；没打标记的方法不会出现在前端类型里，也调不到。整个仓库打了标记的方法只有三十来个，其余全部走别的通道。和常见做法比，差别落在两点：契约是真的生成成文件，所以前端插件可以住在独立的 npm 包里；契约在运行时是活的注册表，所以一个前端插件被卸载，它调后端的那条线跟着断干净、在途的调用会被中止。这两点合起来，让「插件」这个词在浏览器那一侧也成立。',
            en: 'Even the UI grows on the same tree: the back half of the manifest is all ui- rows - 27 in August, 51 in October, from the theme and sidebar through the trajectory view. The frontend is a plugin tree too, the same one as the backend. Browser code and server code are two worlds; how does a browser-side plugin safely call a server method? Their answer is typert: mark a backend method, and at build time read the TypeScript source and compile the marked methods into a contract file the frontend calls directly; unmarked methods never appear in frontend types and cannot be reached. Only around thirty methods in the whole repo carry the mark; everything else goes through other channels. Against the common setup, two differences do the work: the contract is genuinely generated into a file, so frontend plugins can live in their own npm packages; and the contract is a live registry at runtime, so unmounting a frontend plugin cleanly cuts its backend lines and aborts calls in flight. Together they make plugin mean something on the browser side too.',
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'expensive-deletions',
        title: { zh: '两次很贵的删除', en: 'Two Expensive Deletions' },
        blocks: [
          {
            type: 'p',
            zh: '第一处：他们删掉了网页里的 YAML 编辑器。既然一切都是配置，网页上放一个配置编辑器看起来顺理成章——他们做了，然后删了。8 月创建一份新模式的唯一方式变成「复制一份现成的，再改」，不提供空白新建（到 0.2 版，Agent 预设页每张卡片能「查看配置」，是只读的；新建入口变成「让 Agent 帮我创建预设模式」，交给 agent 去写，它要写配置也得过你的批准）。理由两句话，都很硬：「从零写 YAML 这件事人类根本不干」——空白编辑器看着是自由，实际上没人会对着空文件从头写出一份能跑的插件组合；「当编辑器很弱，当能力很宽」——网页文本框没有补全、没有高亮、没有 diff，当编辑器弱得可怜，可它接受的文本里允许写可执行表达式，粘进去的任何东西下一次挂载就是在你机器上跑任意代码。它帮不了你写对，却足够让你写错到很远的地方去。删掉之后还有连锁反应：既然手改文件成了唯一入口，常驻的挂载层就得按文件的修改时间和大小分代，否则改完文件得重启进程才生效。一个删除动作，逼出一个新机制。',
            en: 'Deletion one: they shipped a web YAML editor, then removed it. If everything is config, an in-page config editor seems the natural next step - they built it, then deleted it. In August the only way to create a new mode became copy an existing one and edit; blank creation was gone (by 0.2 the agent-preset cards offer read-only View Config, and the new entry is Let the Agent Create a Preset Mode - the agent writes the config, and it still needs your approval). Two hard reasons, quoted: humans simply never write YAML from scratch - a blank editor looks like freedom but no one composes a working plugin stack from an empty file; weak as an editor, wide as a capability - the web textbox has no completion, no highlighting, no diff, pathetically weak as an editor, yet its text accepts executable expressions, so anything you paste runs arbitrary code on your machine at next mount. It cannot help you write right, only help you write wrong from very far away. The chain reaction also got recorded: with hand-editing files the only entry point, the resident mount layer had to generate by file mtime and size, or every edit would demand a restart. One deletion forced a new mechanism into existence.',
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '第二处：他们做了一整个终端界面，然后整包删掉。7 月中旬立项做全屏终端界面，这条线做得非常认真——光设计笔记就写了 40 篇，7 月 21 日一天写了 14 篇，从欢迎横幅的品牌渐变、状态栏要不要显示缓存命中率，到差异卡片的行宽、步骤计时显示在哪个位置，全都单独写过一篇。然后 8 月 4 日，一篇笔记把整个终端界面包删除：源码、测试、终端快照、依赖声明、文档，一起删。',
            en: 'Deletion two: they built an entire terminal UI, then deleted the package. The full-screen TUI was greenlit in mid-July and taken dead seriously - 40 design notes for that line alone, 14 written on July 21 itself, covering everything from the welcome banner gradient and whether the status bar should show cache-hit rate to diff-card line width and where step timing renders. Then on August 4 a single note deleted the whole terminal package: source, tests, snapshots, dependency declarations, docs, gone together.',
            source: ORANGE_BOOK,
          },
          {
            type: 'list',
            ordered: false,
            zh: [
              '「留着但不发布」——否。一个不受支持的东西留在仓库里，仍会被人当成可复用的产品面来读。',
              '「移到示例目录」——否。原话是「移动代码不提供当前的产品需求、被维护的部署，或组装好的验收」，换个文件夹并不会让它重新有人负责。',
              '「留一个兼容包或者别名」——否。依赖它的配置行直接失败，不做翻译。',
            ],
            en: [
              'Keep but do not release - vetoed. An unsupported thing still in the repo reads to people as a reusable product surface.',
              'Move it to an examples folder - vetoed. In the original words, moving code provides no current product demand, no maintained deployment, no assembled acceptance; a different folder does not re-assign ownership.',
              'Ship a compatibility package or an alias - vetoed. Config rows depending on it simply fail; no translation layer.',
            ],
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '三条否决指向同一个判据：一个没有消费者、没有维护者、没有验收的东西，摆在哪儿都是负债，只是负债的伪装程度不同。',
            en: 'All three vetoes point at one criterion: something with no consumer, no maintainer, and no acceptance is a liability wherever you park it - only the camouflage differs.',
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '终端界面现在在哪？在仓库外面，一个叫 turtle-ui 的独立项目里，仓库文档里那条命令写的就是用普通的装插件方式装上去。但要提醒：8 月作者按那条命令指向的地址去查，这个仓库对外打不开，照着敲装不上；10 月没再查。而他们把这件事当成设计的验证——那个外部项目后来自己加了两个命令行参数，启动器一行代码没改。把分量摊开说：终端界面是大多数同类编码 agent 的唯一形态，是 Claude Code、Codex 这一类产品的整张脸；这个团队先花两周多把它做出来，再一次性删干净，然后用一个仓库外的插件把它装回去。',
            en: 'Where is the terminal UI now? Outside the repository, in a standalone project called turtle-ui, and the documented command installs it as an ordinary plugin. The caveat: when the author checked the address that command pointed to in August, the repo was not publicly reachable - following it would fail - and October brought no recheck, so this is unverified. The team treats the episode as a design proof: that external project later added two command-line arguments of its own, and the launcher changed not one line. To weigh it fully: a terminal UI is the sole shape of most comparable coding agents, the entire face of Claude Code and Codex products; this team spent two-plus weeks building that face, deleted it in one act, then bolted it back on from outside the repository as a plugin.',
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '本章最后一个被否方案：2026 年 7 月 19 日，有人提议把上下文压缩的「定义包」和它唯一的那个实现包合并成一个，理由很硬——就一个实现，分成两个包看着像是在还没有第二个实现时就先抽象了，提案还引用「三个角色」那份设计笔记支持自己。结果被否，理由只有一句：更多压缩后端已经在路线图上，所以定义包和实现包保持分开。这类被否的笔记 8 月全仓只留了 11 篇，10 月是 8 篇——因为他们的规矩是：一条被否的记录只在它还能拦住一个诱人的错误时才保留。',
            en: 'The last veto of this chapter: on 2026-07-19 someone proposed merging the compaction definition package with its one and only implementation package - hard reasoning: one implementation, and two packages look like premature abstraction before a second exists; the proposal even cited the three-roles design note in support. Vetoed, in one line: more compaction backends are already on the roadmap, so definition and implementation stay split. Repos of rejected notes like this shrank from 11 in August to 8 in October, because their rule reads: a rejection stays on the shelf only while it can still block one tempting mistake.',
            source: ORANGE_BOOK,
          },
          {
            type: 'links',
            title: { zh: '接着看', en: 'Keep Reading' },
            items: [
              {
                label: { zh: '第 12 章：几乎全由 AI 写出来的代码库', en: 'Chapter 12: The AI-Written Codebase' },
                href: '/chapter/ai-codebase',
                desc: { zh: '这些删除、否决和门禁背后的施工现场', en: 'The construction site behind these deletions, vetoes, and gates' },
                tag: 'internal',
              },
              {
                label: { zh: '第 10 章：Skill、MCP、插件', en: 'Chapter 10: Skills, MCP, Plugins' },
                href: '/chapter/skills-mcp-plugins',
                tag: 'internal',
              },
              {
                label: { zh: 'Cordis 论文 arXiv:2608.25512', en: 'Cordis paper arXiv:2608.25512' },
                href: 'https://arxiv.org/abs/2608.25512',
                desc: { zh: '「一种时空可组合性的编程范式」', en: 'A programming paradigm for spacetime composability' },
                tag: 'external',
              },
              {
                label: { zh: '上游仓库', en: 'Upstream repository' },
                href: 'https://github.com/deepseek-ai/DeepSeek-Harness',
                tag: 'external',
              },
            ],
          },
        ],
      },
    ],
    sources: [
      ORANGE_BOOK,
      { label: 'Cordis 论文 / arXiv:2608.25512', href: 'https://arxiv.org/abs/2608.25512' },
      REPO,
    ],
    sisters: ['harness-engineering', 'better-agent', 'agent-ontology'],
  },
  {
    slug: 'ai-codebase',
    num: '12',
    part: 'architecture',
    icon: 'brain',
    level: 'advanced',
    minutes: 14,
    accent: 'green',
    title: { zh: '几乎全由 AI 写出来的代码库', en: 'What an AI-Written Codebase Looks Like' },
    subtitle: {
      zh: '一支工业级团队让 agent 替自己写了两个月代码，施工现场一条没删，全公开了。',
      en: 'A serious team let agents write its code for two months - and published the construction site untouched.',
    },
    promise: {
      zh: '能从提交数、笔记制度、门禁和泄漏清理程序里，认出一个 AI 主写代码库该长什么样。',
      en: 'Recognize what an agent-authored codebase looks like from commit counts, note policy, gates, and a leak-trimming tool.',
    },
    sections: [
      {
        id: 'construction-site',
        title: { zh: '第一次原样端出来的施工现场', en: 'The Construction Site, Served Raw' },
        blocks: [
          {
            type: 'p',
            zh: '这一章跟你明天要干的活没关系，它回答的是另一个问题：不是「一个人配一个 AI」的野路子，而是一支正经团队全面用 agent 开发，那个现场到底长什么样、规矩会变成什么样子。这个数没人能猜，因为没人给你看——产品发出来是干净的，提交历史通常也被压平过，你看得到成品，看不到施工。DSH 是作者见到的第一个把施工现场原样端出来的仓库：683 篇设计笔记、每一次否决的理由、一整套逼着 AI 交作业的检查程序，甚至连「AI 写英文文档时不小心漏出中文」这种事，都有一个专门的工具在处理。',
            en: 'This chapter has nothing to do with tomorrow chore. It answers a different question: not one-person-plus-one-AI improvisation, but what does the site look like when a serious team lets agents do all its development, and what do its rules become. Nobody can guess, because nobody shows you - released products are clean and commit histories get flattened; you see the building, never the construction. DSH is the first repository the author has seen serve the construction site raw: 683 design notes, the reason behind every veto, a full battery of gates forcing the AI to hand in its homework, and even a dedicated tool for the case of an AI leaving Chinese words inside English documentation.',
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '一个容易看漏的前提：这个 GitHub 仓库是 2026 年 8 月 13 日当天才建的，而第一条提交是 6 月 10 日。两个月的开发史发生在一个私有仓库里，公开那天一次性推上来。你现在能翻到的每一篇笔记、每一次否决，都是他们主动选择不删的。',
            en: 'A premise easy to miss: the GitHub repository was created on 2026-08-13 itself, while the first commit dates to June 10. Two months of development happened in a private repository, pushed up in one act on publication day. Every note and every veto you can still browse was something they chose not to delete.',
            source: ORANGE_BOOK,
          },
          {
            type: 'callout',
            tone: 'note',
            title: { zh: '施工现场的四类痕迹', en: 'Four Kinds of Tracks on the Site' },
            zh: '翻这个仓库，agent 的痕迹落在四类东西上：设计笔记（8 月 683 篇，含每次否决的理由）、机械门禁（8 月数到 27 道检查加 12 个生成器）、分支命名（合并记录里 codex/ 前缀出现 203 次）、以及为 AI 准备的基础设施本身（比如清理英文文档里漏出中文词的程序）。唯独提交署名是例外——全是真人邮箱。',
            en: 'Four kinds of artifacts betray who wrote the code: design notes (683 in August, each veto reason recorded), mechanical gates (counted: 27 checks plus 12 generators), branch naming (the codex/ prefix appears 203 times in merge records), and the infrastructure built for AI itself (a program that scrubs Chinese words leaking into English docs). Commit signatures are the one exception - all real human emails.',
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'the-numbers',
        title: { zh: '先看这几个数', en: 'Start With the Numbers' },
        blocks: [
          {
            type: 'table',
            head: [
              { zh: '项', en: 'Measure' },
              { zh: '8 月 13 日公开时', en: 'At publication, Aug 13' },
              { zh: '10 月 20 日', en: 'Oct 20' },
            ],
            rows: [
              [
                { zh: '提交次数', en: 'Commits' },
                { zh: '12,293', en: '12,293' },
                { zh: '22,395', en: '22,395' },
              ],
              [
                { zh: '开发天数', en: 'Development days' },
                { zh: '64（6 月 10 日起）', en: '64 (since June 10)' },
                { zh: '约 129（到 10 月 17 日最新版本）', en: '~129 (through the Oct 17 release)' },
              ],
              [
                { zh: '单日最高提交', en: 'Peak single-day commits' },
                { zh: '887（7 月 30 日）', en: '887 (July 30)' },
                { zh: '没重算（浅克隆无完整历史）', en: 'Not recomputed (shallow clone lacks full history)' },
              ],
              [
                { zh: '设计笔记', en: 'Design notes' },
                { zh: '683 篇', en: '683' },
                { zh: '约 1,268 篇', en: '~1,268' },
              ],
              [
                { zh: 'markdown 文档 vs TypeScript 代码文件', en: 'Markdown docs vs TypeScript files' },
                { zh: '2,355 对 2,319（文档比代码还多）', en: '2,355 vs 2,319 (more docs than code)' },
                { zh: '4,507 对 5,200（代码反超，文档仍同一量级）', en: '4,507 vs 5,200 (code overtook; docs still same order)' },
              ],
              [
                { zh: '被否掉的笔记', en: 'Rejected notes kept' },
                { zh: '11 篇', en: '11' },
                { zh: '8 篇', en: '8' },
              ],
            ],
            note: {
              zh: '8 月那段日均 192 次提交；7 月 30 日单日 887 次、同一天还产出 47 篇设计笔记；7 月 27 到 31 日五天一共 3,282 次提交。10 月列是作者照同样数法在 GitHub 接口和一份浅克隆上取的，「单日最高」和人数口径没法重算，留着 8 月的数。',
              en: 'The August stretch averaged 192 commits a day; July 30 alone produced 887 commits plus 47 design notes; the five days of July 27-31 totaled 3,282 commits. October columns were taken by the same counting method against the GitHub API and a shallow clone, so peak-day and headcounts could not be recomputed and keep their August values.',
            },
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '人数这个数字得多说两句，因为它有四个口径，随手挑一个就会跟别处对不上：git 历史里带署名带邮箱的作者条目 46 条，按邮箱去重 40，按署名去重 37，而 GitHub 接口认的贡献者只有 22（网页上那栏显示得更少，19）。同一个人换过邮箱，所以前几个数一路缩水；GitHub 只算能关联到账号的那部分，所以它最小。安全的说法是「三十几个人，GitHub 认下来二十出头」。到 10 月，GitHub 认下来的贡献者是 44 个（算上匿名的 57 个）。8 月公开那天，三十几个人，两个月，一万两千次提交。',
            en: 'The headcount needs a warning: it has four measures and picking one at random will disagree with everywhere else. Raw author entries in git history with name and email: 46; deduplicated by email: 40; by display name: 37; contributors the GitHub API acknowledges: 22 (the webpage shows even fewer, 19). People changed email addresses, so the first numbers shrink step by step, and GitHub, counting only linkable accounts, sits at the floor. The safe phrasing is a thirty-something team, twenty-something GitHub-acknowledged. By October GitHub acknowledged 44, or 57 counting anonymous. On publication day in August: thirty-some people, two months, twelve thousand commits.',
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'governing-quote',
        title: { zh: '那句解释一切的话', en: 'The Sentence That Explains Everything' },
        blocks: [
          {
            type: 'quote',
            zh: 'This codebase is developed primarily by coding agents. Agents follow enforced gates far more reliably than prose conventions, and a lot of work is not a cost argument when agents do the labor.（这个代码库主要由编码 agent 开发。相比写在文档里的约定，agent 遵守被强制执行的检查要可靠得多；而当劳动由 agent 完成时，「工作量很大」不构成一个成本论据。）',
            en: 'This codebase is developed primarily by coding agents. Agents follow enforced gates far more reliably than prose conventions, and a lot of work is not a cost argument when agents do the labor.',
            cite: { zh: '开工第二天写下的一篇制度笔记', en: 'A process note written on project day two' },
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '读这本书的时候你大概反复冒出同一个疑问：为什么规则这么密？为什么每个包都要写 README？为什么改一行代码要配一篇文档？换成任何一家传统公司，这些提案在会上活不过三分钟，反对理由永远是同一句：工作量太大了，谁写？而当写的那个不是人的时候，这句反对话直接失效了。反对的成本没了，规则的密度就能一路加到「凡是能机器检查的，全部机器检查」。这句话的适用范围远远超出这个仓库：你自己用 AI 干活的时候，那些你嫌麻烦所以从来不做的事，值得重新过一遍——「麻烦」这个理由已经不成立了。',
            en: 'Reading this book you keep asking: why so many rules? Why a README per package? Why must a one-line change carry a document? At any traditional company these proposals would not survive three minutes in a meeting, always to the same objection: too much work, who writes it? When the writer is not a person, that objection dies on the spot. With nothing left to cost, rule density climbs until everything machine-checkable is machine-checked. The sentence travels far beyond this repository: if you work with AI yourself, the things you never do because they are tedious deserve a second pass - tedious has stopped being an argument.',
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'notes-as-policy',
        title: { zh: '每改一次交一篇作业', en: 'Every Change Hands In Homework' },
        blocks: [
          {
            type: 'p',
            zh: '683 篇笔记是制度逼出来的，规矩有三条：',
            en: 'The 683 notes are policy output. Three rules:',
            source: ORANGE_BOOK,
          },
          {
            type: 'list',
            ordered: true,
            zh: [
              '每个非平凡的改动，必须在同一个提交里新增或更新至少一篇笔记。代码和笔记捆在一起走，不许后补。',
              '笔记里必须写清楚「我们否决了哪些方案」。这一节缺了，自动检查过不去，代码合不进去——一个不写清它打败了什么的决策，会招来翻旧账，而翻旧账正是这套笔记要防的事。补充一句：「替代方案是被记录的，绝不是被发明的」（制度定下来之前的老笔记若确实无从考证，就必须永久带上一行注释，明说这里的替代方案没被记录——宁可在档案上留一个诚实的窟窿，也不许补一段编出来的理由）。',
              '笔记归档之后哈希冻结，永久不许改：不修、不译、不重排、不移动、不删除，也不许再拿它当现在的权威。一个只能往后追加的清单记着每份文件的指纹，谁动过一个字，检查程序立刻知道——作者数了一下，那份清单里躺着 426 条封存记录。',
            ],
            en: [
              'Every non-trivial change must add or update at least one note in the same commit. Code and note travel bound together; no backfilling later.',
              'Every note must state which alternatives were rejected. Missing that section, the automated check fails and the code cannot merge - a decision that does not record what it beat invites relitigation, and relitigation is exactly what these notes prevent. One addendum: alternatives are recorded, never invented. Old notes predating the policy that genuinely lack the record must permanently carry a line saying so; an honest hole in the archive is preferred to an invented rationale.',
              'Once archived, a note is hash-frozen forever: no edits, no translation, no reordering, no moving, no deletion, and it may never again be cited as current authority. An append-only ledger stores each file fingerprint - touch one character and the checker knows instantly. The author counted 426 seal records in that ledger.',
            ],
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '还有一个细节：笔记的分类不写在文件里，而是编进文件路径——一篇笔记放在哪个文件夹，它就属于哪一类、处在哪个状态。「在文件头部写一行分类」的方案被否了，理由是那等于把路径已经承载的事实又抄一遍，而抄第二遍的东西迟早会跟第一遍打架。',
            en: 'A telling detail: note classification is not written inside the file but encoded in its path - whichever folder a note sits in is its category and its state. The proposal to put a classification line in the front matter was rejected because it would copy a fact the path already carries, and the second copy eventually fights the first.',
            source: ORANGE_BOOK,
          },
          {
            type: 'table',
            head: [
              { zh: '笔记状态', en: 'Note status' },
              { zh: '8 月（683 篇）', en: 'Aug (683)' },
              { zh: '10 月（约 1,268 篇）', en: 'Oct (~1,268)' },
            ],
            rows: [
              [
                { zh: '已实现', en: 'Implemented' },
                { zh: '505', en: '505' },
                { zh: '294', en: '294' },
              ],
              [
                { zh: '已归档', en: 'Archived' },
                { zh: '142', en: '142' },
                { zh: '924', en: '924' },
              ],
              [
                { zh: '提了还没做', en: 'Proposed, not done' },
                { zh: '25', en: '25' },
                { zh: '42', en: '42' },
              ],
              [
                { zh: '提了被否掉', en: 'Proposed, rejected' },
                { zh: '11', en: '11' },
                { zh: '8', en: '8' },
              ],
            ],
            note: {
              zh: '10 月归档的远多于实现的，说明大量 8 月的笔记在两个月里被新决定取代了。被否笔记的保留规矩：一篇被否的笔记，只在它还能拦住一个「看起来很诱人的错误」时才保留，否则连同译本一起删掉——留下来的那 11 篇（8 月），等于团队自己认证的「未来还会有人再想一遍的坑」。',
              en: 'October archives far exceed implementations, i.e. many August notes were superseded by newer decisions within two months. The retention rule for rejections: a rejected note survives only while it can still block one tempting mistake, otherwise it goes, translation included. The 11 survivors of August are the team own certified list of traps someone will be tempted to re-enter.',
            },
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '683 篇笔记没有目录页，这是被明令禁止的：分类检查程序会直接拒绝根目录下出现一个总目录文件。他们本来是有的，7 月 19 日一篇提案把它删掉了，理由只有一句：每一个新增、移动或重命名笔记的分支，哪怕彼此毫无关系，都会重写同一个生成文件，让这个产物变成一个可预测的合并冲突热点。放弃的东西也写清楚了：读者从此失去一个按时间排的总览页，改用文件夹和全库搜索。这条判断只有在 agent 高频并行开发的前提下才成立——人手一天改三次的项目，目录页当然该留着；一天 887 次提交、几十条分支同时在跑的项目，最大的敌人是「所有人同时改同一个文件」。',
            en: 'The 683 notes have no index page, and that is forbidden by name: the classification checker rejects any master index file in the root. One existed until a July 19 proposal deleted it with a single-sentence reason: every branch that adds, moves, or renames a note - however unrelated to the others - rewrites the same generated file, turning the artifact into a predictable merge-conflict hotspot. What was given up is also written down: readers lose a chronological overview and get folders plus full-text search instead. The judgment only holds under high-frequency parallel agent development - a project with three human edits a day should keep its index; a project at 887 commits a day with dozens of live branches has one worst enemy: everyone editing the same file at once.',
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'gates-and-traces',
        title: { zh: '27 道检查和留给人的那一道', en: 'Twenty-Seven Gates and the One Left to Humans' },
        blocks: [
          {
            type: 'stats',
            items: [
              {
                value: '27 / 12',
                label: { zh: '机械检查数 / 生成器数（8 月）', en: 'Mechanical checks / generators (Aug)' },
                sub: { zh: '数法：35 个 verify 文件剔除 8 个测试；17 个生成器文件剔除 5 个测试。看到「35 个门禁」是把测试数进去了；10 月 verify 文件涨到 76 个，未按同口径重数', en: 'Method: 35 verify files minus 8 tests; 17 generator files minus 5 tests. A count of 35 gates includes the test files; October grew verify files to 76, not recounted on the same basis' },
              },
              {
                value: '220',
                label: { zh: 'README 里带「已知局限」小节的文件数（实测一个没漏）', en: 'READMEs carrying the known-limitations section (checked, zero misses)' },
              },
              {
                value: '426',
                label: { zh: '笔记归档哈希封存的记录条数', en: 'Hash-seal records for archived notes' },
              },
            ],
          },
          {
            type: 'p',
            zh: '这 27 道检查管的事情包括：笔记格式对不对、分类跟文件夹一致不一致、归档的封条动过没有、文档里的链接有没有失效、中英文文档配对齐了没有、每个包的 README 有没有写「已知局限」那一段。最后这条被门禁强制：缺了，合并不进去——他们把「我们哪里不行」做成了一道通不过就合不进的门禁。',
            en: 'The 27 checks police: note formatting, classification matching its folder, whether archive seals were touched, dead documentation links, zh/en document pairing, and whether every package README carries its known-limitations section. The last one is gate-enforced - missing it, the merge cannot land. They turned where we fall short into a gate that blocks merges.',
            source: ORANGE_BOOK,
          },
          {
            type: 'code',
            lang: 'md',
            title: '每个包 README 的最后一段（门禁强制，8 月数到 220 个文件里都有）',
            code: `## 已知局限与待办

<!-- 这一段不是自觉，是门禁：缺了合并不进去。 -->
<!-- 他们把「我们哪里不行」做成了通不过就合不进的检查。 -->`,
            note: {
              zh: '该段标题原文为「已知局限与待办」，作者实测 220 个文件里都有这一段，一个没漏。',
              en: 'The section is titled Known Limitations and TODOs; the author counted it present in all 220 files with zero misses.',
            },
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '而「每个非平凡改动必须带一篇笔记」这条规则，是全套制度里唯一没有自动检查的一条。他们在提案里明确否掉了「加一个自动判断改动大小的检查」，理由是机器没法可靠地判断一个改动在语义上平凡不平凡，加了只会带来误报和表面合规。这一条明写着交给人来审。能机械化的一律机械化，判断力留给人。',
            en: 'Yet the rule every non-trivial change carries a note is the single rule in the whole system with no automated check. They explicitly vetoed adding a check that judges change size automatically: a machine cannot reliably decide whether a change is semantically trivial, and adding one buys only false positives and cosmetic compliance. This one is written down as reserved for human review. Everything mechanical gets mechanized; judgment stays human.',
            source: ORANGE_BOOK,
          },
          {
            type: 'code',
            lang: 'text',
            title: '合并记录里的分支前缀统计（8 月，作者手数）',
            code: `worktree/   210   # 用于并行开发的 worktree 分支
codex/      203   # 某类编码 agent 建分支时的默认命名习惯，203 次不是手滑
agent/       15
claude/       3`,
            note: {
              zh: '但边界也得划清楚：提交的署名全是真人邮箱，翻遍提交记录没有一条写着「本次由 AI 协作完成」。署名归属是人，agent 的痕迹在分支名、在吞吐量、在为它准备的那套基础设施里。',
              en: 'The boundary must be drawn: every commit is signed with a real human email, and not one record says co-authored with AI. Attribution is human; the agent fingerprints live in branch names, throughput, and the infrastructure built for it.',
            },
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '最外行也能看懂的那条证据：他们的工具库里有一个专门的清理程序，名字直译过来是「修剪思维链泄漏」。所谓思维链泄漏，指 AI 写出来的文字带着写作现场的痕迹——引用只有那次对话才看得见的东西、叙述改动过程而不是当前状态、或者对着一个已经离场的评审者辩解「这个写法是安全的」。它列了八类要清理的毛病，第八类是这样定义的：在整体是英文的文字里，出现没翻译掉的工作语言碎片，给的例子是「端」「设计稿」，还有一行中文的分隔符。把这条拆开看：要写一个程序去擦掉英文文档里漏出来的中文词，前提有两个——写这些文档的东西真的在自动生成英文，而它脑子里的工作语言是中文。一个证据同时说明两件事：agent 在深度参与，以及工作语言里有中文。',
            en: 'The most layperson-readable piece of evidence: their toolbox holds a dedicated cleaner whose name translates to trim chain-of-thought leaks. A chain-of-thought leak is AI-written text carrying traces of its own writing session - references only that conversation could see, narration of the change process instead of current state, or pleas to a reviewer long gone that this form is safe. It enumerates eight categories to clean, and category eight is defined as: untranslated fragments of the working language appearing inside otherwise-English prose; the worked examples are a single-character Chinese word, the phrase for design mockup written in Chinese, and a Chinese separator line. Unpack it: to write a program that scrubs Chinese words leaking into English documentation, two premises must hold - the writer really auto-generates English, and its working language is Chinese. One artifact proves both at once: agents are deeply involved, and Chinese is in the mix.',
            source: ORANGE_BOOK,
          },
        ],
      },
      {
        id: 'people-and-doors',
        title: { zh: '一个人、一条推文、一扇锁着的门', en: 'One Person, One Tweet, One Locked Door' },
        blocks: [
          {
            type: 'p',
            zh: '提交量排第一的是崔添翼（Tianyi Cui）：8 月公开时一个人 5,235 次提交，占全仓 42.6%，前三个人加起来 7,746 次、占 63%；到 10 月他是 6,864 次、约占 30.6%，仍然第一，其后四位分别是两千多到一千多次。团队在变大，他的占比在下降。他的履历有公开信息可查：2026 年 3 月加入 DeepSeek，出任新组建的 Harness 团队负责人；据南华早报报道，他此前在量化交易公司 Jane Street 待了将近九年，做软件开发和研究，方向是股票和固定收益，离开后联合创办过一家量化公司。',
            en: 'The top committer is Tianyi Cui: 5,235 solo commits at August publication, 42.6 percent of the repository, with the top three together at 7,746 and 63 percent; by October his 6,864 still lead at about 30.6 percent, and the next four each sit between roughly one and two thousand. The team grew while his share fell. The background is publicly documented: he joined DeepSeek in March 2026 to lead the newly formed Harness team; per South China Morning Post he spent nearly nine years at quant trading firm Jane Street in software development and research on equities and fixed income, then co-founded another quant company.',
            source: ORANGE_BOOK,
          },
          {
            type: 'quote',
            zh: '另外从代码上来看，DSH 有非常多函数式编程的影子，不熟悉 Ocaml/Haskell 可能一上来会比较难理解，可以多让 Agent ELI5 一下。',
            en: 'Reading the code, DSH carries a strong functional-programming flavor; if you are not comfortable with OCaml or Haskell it may be hard at first - lean on an Agent to ELI5 it for you.',
            cite: { zh: '内测开发者 JY（@jiayuan_jy）', en: 'Beta developer JY (@jiayuan_jy)' },
            source: { label: 'JY 推文', href: 'https://x.com/jiayuan_jy/status/2087911060154314963' },
          },
          {
            type: 'p',
            zh: '为什么要提 Jane Street？它以 OCaml 这门函数式语言立身，这是公开事实。但「他本人在那里主要写 OCaml」是作者的推断，不是查到的事实——没有任何一手材料能坐实，可以当成一条挺顺的因果线，但别当结论用。JY 那句话的实用价值在另一头：如果你打算翻这份代码，先做好心理准备，它的写法跟你在大多数前端项目里见到的不一样。',
            en: 'Why mention Jane Street? It is a publicly known fact that the firm is built on OCaml. But that he personally wrote mostly OCaml there is the author inference, not a found fact - no primary source confirms it; enjoy it as a plausible causal line, never as a conclusion. The practical half of JY warning is elsewhere: before reading this code, brace yourself - its style is not what most frontend projects teach you.',
            source: ORANGE_BOOK,
          },
          {
            type: 'p',
            zh: '仓库里最像活化石的一处：躺着一整套完备的问题单管理设施——五个提单模板，分别对应 bug、功能、想法、调研、任务；一个策略引擎，带标签白名单、p0 到 p3 的优先级、状态机、审计标记；配套还有一条专门测这套策略的测试命令。然后你去仓库首页看，问题单功能是关着的，所有反馈全部导去讨论区。到 10 月仍然关着，讨论区累计一万多条。0.1.5 版起产品里多了一个 /feedback，可以直接从会话里提交反馈。这套闸门显然不是为公开发布做的，它是内部研发流程的产物，开源的时候被原样端了出来——你现在能看到一家公司内部怎么给自己的活分优先级、怎么定状态流转，只是那道门对外锁着。选择的代价发布当天就来了：仓库公开后不到三小时，讨论区涌进 184 条，Windows 用户的安装问题、中文路径被截断、还有人报了一个沙箱边界能被绕过的安全问题，全都混在一起，没有标签，没有优先级。',
            en: 'The most living-fossil spot in the repo: a complete issue-tracker apparatus lies there unused - five intake templates for bugs, features, ideas, research, and tasks; a policy engine with a label whitelist, p0-through-p3 priorities, a state machine, and audit marks; even a dedicated test command for the policy. Yet on the repo homepage issues are switched off and all feedback routes to Discussions, still off by October, where 10k+ posts accumulated; since 0.1.5 the product adds /feedback for filing from inside a session. The apparatus clearly was not built for public release - it is internal process served raw at open-sourcing, so you can now see how this company prioritizes its own work and defines state transitions, behind a door locked to the outside. The price arrived on day zero: within three hours of publication Discussions took in 184 posts - Windows install failures, Chinese path truncation, and someone reporting the sandbox boundary could be bypassed - all mixed, no labels, no priorities.',
            source: ORANGE_BOOK,
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '同一件事，两种反应——这条线请你自行判断', en: 'One Event, Two Reactions - Judge This Line Yourself' },
            zh: '2026 年 3 月底，Anthropic 更新 Claude Code 安装包时手滑，把一个 60MB 的调试文件留在了发布包里，1902 个源文件被完整还原出来；作者花几个小时把那 1902 个文件翻了一遍写成文章。而他的反应是「终于能看见一个真正好用的 harness 里面长什么样了」；在另一边，同样是 2026 年 3 月，崔添翼入职 DeepSeek 带一支全新的 Harness 团队，5 月起在 X 上公开招人、招聘帖直说「从零开始造一个 Code Harness」，6 月 10 日仓库第一条提交落下。他们为什么组这支团队，公开材料里没有说。作者自己加了免责声明：泄露和入职发生在同一个月，谁先谁后钉不到日期，公开材料没有任何一句把两件事挂上因果——这条线是他自己连的，你可以不认。',
            en: 'In late March 2026, Anthropic slipped while updating the Claude Code package and left a 60MB debug file in the release, from which 1,902 source files were fully reconstructed; the author spent hours reading all 1,902 and wrote it up. His reaction was at last a look inside a genuinely good harness. On the other side, also in March 2026, Tianyi Cui joined DeepSeek to lead a brand-new Harness team; by May the team was recruiting on X with posts saying straight out: build a Code Harness from scratch; on June 10 the repository first commit landed. Why they formed this team is nowhere stated publicly. The author attaches his own disclaimer: the leak and the hiring happened in the same month, the ordering cannot be pinned to dates, and no public material links the two as cause and effect - the line is his own, and you may decline to draw it.',
            source: ORANGE_BOOK,
          },
          {
            type: 'checklist',
            title: { zh: '本章的「未验证」清单（作者自己标的）', en: 'The Unverified List (as the author flags it)' },
            items: [
              {
                zh: '683 篇笔记具体哪一篇是 agent 一稿写成、哪一篇被人改过——查不出来，标未验证。',
                en: 'Which of the 683 notes an agent drafted in one pass and which a human revised - unrecoverable, marked unverified.',
              },
              {
                zh: '「崔添翼本人在 Jane Street 主要写 OCaml」是推断，无一手工材料，别当结论用。',
                en: 'That Cui personally wrote mostly OCaml at Jane Street is inference without primary material - not a conclusion.',
              },
              {
                zh: '泄露与入职的先后：同月发生，日期钉不住，公开材料未挂任何因果。',
                en: 'Ordering of the leak and the hiring: same month, undateable, no causal link in any public material.',
              },
              {
                zh: '10 月的单日最高提交与人数口径未重算（浅克隆无完整历史）；10 月 verify 文件涨到 76 个，未按 27/12 同口径重数。',
                en: 'October peak-day commits and headcounts not recomputed (a shallow clone lacks full history); verify files grew to 76 in October without a recount on the 27/12 basis.',
              },
            ],
          },
          {
            type: 'links',
            title: { zh: '接着看', en: 'Keep Reading' },
            items: [
              {
                label: { zh: '第 11 章：两个插件抢同一件活', en: 'Chapter 11: When Two Plugins Want the Same Tool' },
                href: '/chapter/plugin-conflicts',
                desc: { zh: '被删掉的终端界面与那些被否的笔记住在这一层', en: 'The deleted terminal UI and the vetoed notes live on that layer' },
                tag: 'internal',
              },
              {
                label: { zh: '第 9 章：长任务', en: 'Chapter 9: Long Tasks' },
                href: '/chapter/long-tasks',
                tag: 'internal',
              },
              {
                label: { zh: '发布门禁', en: 'Release Gates' },
                href: '/gates',
                desc: { zh: '27 道检查在本站的速查', en: 'The 27 checks as a cheatsheet on this site' },
                tag: 'internal',
              },
              {
                label: { zh: '上游仓库', en: 'Upstream repository' },
                href: 'https://github.com/deepseek-ai/DeepSeek-Harness',
                desc: { zh: '683 篇笔记和全部否决记录都在里面', en: 'All 683 notes and every veto are in there' },
                tag: 'external',
              },
              {
                label: { zh: 'Claude Code 文档', en: 'Claude Code Docs' },
                href: 'https://docs.anthropic.com/en/docs/claude-code/overview',
                desc: { zh: '2026 年 3 月泄露事件主角的正式文档', en: 'Official docs of the product at the center of the March 2026 leak' },
                tag: 'external',
              },
            ],
          },
        ],
      },
    ],
    sources: [
      ORANGE_BOOK,
      REPO,
      { label: '内测开发者 JY 的推文 / JY on X', href: 'https://x.com/jiayuan_jy/status/2087911060154314963' },
      { label: 'Claude Code overview', href: 'https://docs.anthropic.com/en/docs/claude-code/overview' },
    ],
    sisters: ['agent-observability-patterns', 'agent-loop-engineering', 'agent-evaluation-patterns'],
  },
]


