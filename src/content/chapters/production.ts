import type { Chapter } from '../types'

export const productionChapters: Chapter[] = [
  {
    slug: 'postmortems',
    num: '13',
    part: 'production',
    icon: 'bug',
    level: 'production',
    minutes: 20,
    accent: 'orange',
    title: { zh: '四次事故复盘，四句该抄下来的话', en: 'Four Postmortems and the Four Lines Worth Copying' },
    subtitle: { zh: '公开不到24小时，仓库里已躺着四篇「我们是怎么搞砸的」', en: 'Less than 24 hours after launch, the repo already carried four "how we broke it" write-ups.' },
    promise: {
      zh: '读完你能给一句「测试全过了」定价，并知道该回头追问 agent 哪一句话。',
      en: 'You will be able to price a "all tests pass" report and know exactly which question to put back to the agent.',
    },
    sections: [
      {
        id: 'the-postmortem-directory',
        title: { zh: '这个目录本身：什么 bug 才配有复盘', en: 'The Directory Itself: What Earns a Postmortem' },
        blocks: [
          {
            type: 'p',
            zh: '2026年8月13日公开，不到 24 小时，仓库 `docs/postmortem/` 里已经有四篇写明「我们是怎么搞砸的」的事故复盘，编号 0001 到 0004。花叔翻了两遍才确认这不是文档模板，是真事。四篇的共同点很硬：把「我们的流程为什么没拦住」当正文，把那一行修复当脚注。',
            en: 'DeepSeek Harness went public on 2026-08-13. Fewer than 24 hours later, docs/postmortem/ already held four write-ups numbered 0001 to 0004, each one explicitly about how the team broke something. The author read them twice before accepting they described real incidents rather than a documentation template. All four share one structure: why the process failed to catch it is the body, and the one-line fix is a footnote.',
            source: { label: '橙皮书（花叔）/ Orange Book (Huashu)', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'code',
            lang: 'text',
            title: 'docs/postmortem/ 的固定结构',
            code: `0001 - 0004, and every incident ships three files:
  one English copy, one Chinese copy, plus one alignment file that keeps the two in sync.

Section order inside every postmortem:
  1. summary        摘要
  2. timeline       时间线
  3. root cause     根因
  4. guards added   新增的防护措施
  5. lessons        经验教训

The directory README also records what kind of bug earns a write-up:
the three admission rules below.`,
            note: {
              zh: '四篇每篇三个文件：英文一份、中文一份，外加一份给两边对齐用的。0001 的标题里点名了那行出事的代码；Status: resolved 之后附着修复的 PR 编号。',
              en: 'Each incident ships three files - an English copy, a Chinese copy, plus one alignment file keeping the two in sync. The 0001 title names the offending line of code, and after Status: resolved comes the fixing PR number.',
            },
          },
          {
            type: 'list',
            zh: [
              '**机制隐蔽**：换一位细心的工程师，也得费同样的劲才能重新推一遍。',
              '**系统性**：漏出去的原因是测试与约定之间的缺口，不是一次手滑。',
              '**重新发现的代价高**：这一次烧掉了真实的调试时间，下一次还会。',
            ],
            en: [
              '**Subtle mechanism**: an equally careful engineer would burn the same effort rediscovering it.',
              '**Systemic**: it escaped because of a gap between the tests and the conventions, not because someone slipped.',
              '**Expensive to rediscover**: this one consumed real debugging hours, and the next one will too.',
            ],
            source: { label: '橙皮书（花叔）/ Orange Book (Huashu)', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'callout',
            tone: 'note',
            title: { zh: '这三条门槛，比四篇复盘本身更值得抄', en: 'The three admission rules are worth copying before the postmortems are' },
            zh: '大多数团队的复盘写成了 bug 流水账，所以没人读。这里把「配不配写」定成了三条可判的条件，等于给复盘加了一道准入门禁：一次纯粹的笔误不写，一个只有作者自己能复现的怪现象也不写。反过来说，能被写进这个目录的，都是流程级的问题。',
            en: 'Most teams write postmortems as incident logs, which is why nobody reads them. Making "does this qualify" a three-condition gate puts a review bar on the postmortem itself: a plain typo does not qualify, and neither does a quirk only the author can reproduce. Which means anything that did make it into that directory was a process-level failure.',
          },
        ],
      },
      {
        id: 'pm-0001-one-hundred-green',
        title: { zh: '0001：178 个绿色测试，跑的是旧代码', en: '0001: 178 Green Tests Running Stale Code' },
        blocks: [
          {
            type: 'p',
            zh: '他们做了一座桥，让编辑器（Zed）能把这个 agent 当成内置助手挂上去。这座桥有 178 个单元测试，行覆盖率 100%。真实编辑器连上来的那一瞬间，第一个请求就崩了，报错是拿不到一个本该注入的服务。',
            en: 'The team built a bridge that lets an editor (Zed) attach this agent as a built-in assistant. That bridge carried 178 unit tests and 100% line coverage. The moment a real editor connected, the very first request crashed: a service that should have been injected was missing.',
          },
          {
            type: 'code',
            lang: 'ts',
            title: '根因是一行多余的代码',
            code: `// A plugin normally hands several sibling exports to the loader side by side:
export const name = 'editor-bridge'
export const requires = ['<the services this plugin needs>'] // the request form
export function apply(ctx: Context) { /* wire the capability in */ }

// The extra line that broke production:
export default apply

// Loader rule: if a default export exists, the loader reads ONLY that one.
// So name, requires and the rest of the siblings were dropped as a group,
// including the form listing which services the plugin asks for.
// The plugin booted in an environment where it had requested nothing,
// and reached for a service that was never injected.`,
            note: {
              zh: '178 个测试全是手工把插件挂上去的，手工挂载这条路根本不经过加载器——所以你用手把零件按在位置上试了 178 次都好用，出厂时是机器装的，机器认的是另一套规则。',
              en: 'All 178 tests mounted the plugin by hand, and hand mounting never goes through the loader. It is the press-the-part-into-place 178 times and it always holds situation, while the factory installs it by a different set of rules.',
            },
          },
          {
            type: 'stats',
            items: [
              { value: '178', label: { zh: '单元测试数', en: 'Unit tests' }, sub: { zh: '全绿', en: 'all green' } },
              { value: '100%', label: { zh: '行覆盖率', en: 'Line coverage' }, sub: { zh: '始终满足', en: 'never dropped below this' } },
              { value: '1', label: { zh: '端到端测试', en: 'End-to-end test' }, sub: { zh: '要 API 密钥，CI 里被跳过', en: 'needed an API key, skipped in CI' } },
              { value: '0', label: { zh: '生产可用', en: 'Worked in production' }, sub: { zh: '首个请求即崩', en: 'crashed on the first request' } },
            ],
          },
          {
            type: 'p',
            zh: '更扎人的在后面。他们其实有一个真会走完整流程的测试，但它要 API 密钥才能跑，持续集成没有密钥就直接跳过；而它在本地之所以显示「通过」，只是因为电脑上残留着一份更早编译出来的旧代码，被恰好拿去跑了。',
            en: 'The sharper part came next. There was exactly one test that ran the whole flow, but it needed an API key, and CI skipped it without one. It appeared to pass locally only because a stale build was still sitting on disk and got picked up instead.',
          },
          {
            type: 'quote',
            zh: '尽管有178个绿色单元测试和100%行覆盖率，这座桥在生产环境中完全无法工作。',
            en: 'Despite 178 green unit tests and 100% line coverage, the bridge did not work at all in production.',
            cite: { zh: '复盘 0001 摘要 / Postmortem 0001, summary', en: 'Postmortem 0001, summary' },
            source: { label: 'DeepSeek-Harness 仓库 / Repository', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
          },
          {
            type: 'quote',
            zh: '覆盖率证明代码行被执行过；它不能说明功能是否按交付方式正常工作。',
            en: 'Coverage proves lines were executed; it says nothing about whether the feature works in the way it is actually shipped.',
            cite: { zh: '复盘 0001 结论 / Postmortem 0001, conclusion', en: 'Postmortem 0001, conclusion' },
          },
          {
            type: 'p',
            zh: '这句话对写代码的人是闷棍，对不写代码的人是尺子：下次 AI 报「覆盖率 100%」，该问的不是数字，而是**「你验的是我交出去的那一份吗」**。',
            en: 'For engineers this line is a blow to the head; for people who never write code it is a ruler. Next time an AI reports 100% coverage, the question is not the number but **whether what it verified is the thing you actually ship**.',
          },
          {
            type: 'list',
            zh: [
              '崩溃之后，调查先走的是一个非常优雅的解释：框架内部有代理机制，服务查找只往上找祖先、不横着找兄弟，所以找不到。这个解释成立、机制也真实存在，他们顺着它推理了好几个小时。',
              '然后有人做了件笨事：往框架源码里插一句打印，跑一遍真实进程，看它到底走到哪一步炸的。几分钟后真相出来——异常抛在插件加载那一刻，跟那套优雅机制毫无关系。',
              '那个优雅的解释后来也被证明是对的，**只不过它是第二个 bug**：删掉多余那行之后，它才浮出水面。',
            ],
            en: [
              'The investigation first took an elegant route: the framework proxies services and looks only up the ancestor chain, never sideways at siblings, so the lookup must fail. The explanation held and the mechanism was real, and they reasoned along it for hours.',
              'Then someone did the dumb thing: dropped one print statement into the framework source and ran a real process to see where it actually threw. Minutes later the answer was there - the exception fired at plugin load time, unrelated to the elegant mechanism.',
              'And the elegant explanation turned out to be correct too, **just as the second bug**: it only surfaced after the extra line was deleted.',
            ],
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '信 trace，不信理论', en: 'Trust traces, not theories' },
            zh: '复盘最后一条经验教训的原话是「相信跟踪结果，不要迷信理论」：数小时看似合理但实际错误的推理，输给了一句打印语句。这条对所有跟 AI 一起干活的人都成立——让它去跑一遍、把过程打出来，比听它讲一段听起来很有道理的分析强。两个 bug 叠在一起时，第一个解释可以处处自洽却仍然错，因为它解释的是另一个还没暴露的问题。',
            en: 'The last lesson in that postmortem reads: believe traces, not theories. Hours of plausible-but-wrong reasoning lost to a single print statement. This transfers to anyone working with an AI: make it run the thing and print the process, rather than listen to a well-argued analysis. When two bugs stack, the first explanation can be internally consistent and still wrong, because it is explaining a different problem that has not surfaced yet.',
          },
        ],
      },
      {
        id: 'pm-0002-wrong-slot',
        title: { zh: '0002：写错位置的开关，和刷新过的快照', en: '0002: The Switch in the Wrong Slot, and Refreshed Snapshots' },
        blocks: [
          {
            type: 'p',
            zh: '第二篇的现场更荒诞。他们想让读文件、写文件、改文件这三件工具「有条件地启用」，于是在配置文件里各给它们写了一个开关，开关的值是一小段现算的表达式。语法完全合法，加载时一句警告都没有。',
            en: 'The second incident is more absurd. The team wanted the read, write and edit tools to be conditionally enabled, so they gave each one a switch in the config file whose value was a small computed expression. The syntax was perfectly legal and the loader did not warn once.',
          },
          {
            type: 'code',
            lang: 'yaml',
            title: '表达式落在了错误的那一格',
            code: `# Expressions are computed inside the plugin's own parameters.
config:
  enabled: <computed expression>   # but this slot is read VERBATIM

# Read verbatim, the value is an expression object.
# Any object is truthy in this harness.
# => read / write / edit ended up permanently DISABLED in every mode.`,
            note: {
              zh: '七个用到文件系统的测试场景，加一个混合场景，全都在调用一个根本不存在的工具——而这些测试是绿的。',
              en: 'Seven filesystem scenarios plus one mixed scenario were all calling a tool that did not exist - and every one of those tests was green.',
            },
          },
          {
            type: 'p',
            zh: '测试之所以绿，因为它们是快照测试：跑一遍，把输出存下来当「预期结果」，下次比对。有人在这中间刷新过一次快照，于是满屏的「找不到这个工具」被原样存成了新的正确答案。从那以后，测试每次都在忠实地验证「它稳定地失败」。',
            en: 'They were green because they were snapshot tests: run once, store the output as the expected result, compare next time. Someone refreshed a snapshot along the way, so a screen full of "tool not found" was saved verbatim as the new correct answer. From then on each run faithfully verified that it fails reliably.',
          },
          {
            type: 'quote',
            zh: '快照刷新是 fixture 的生产过程，不是正确性审查。诸如已注册工具缺失这类语义上不可能的结果，需要独立于预期输出的断言。',
            en: 'Refreshing a snapshot is how fixtures get manufactured, not a correctness review. Semantically impossible outcomes, such as a registered tool going missing, need assertions that are independent of the expected output.',
            cite: { zh: '复盘 0002 / Postmortem 0002', en: 'Postmortem 0002' },
            source: { label: 'DeepSeek-Harness 仓库 / Repository', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
          },
          {
            type: 'list',
            zh: [
              '配置里那一格不许再出现表达式：有一道**门禁扫描全仓库的配置文件**并直接拒绝——见[发布门禁](/gates)。',
              '快照工具从此拒绝把「找不到工具」这类结果收进预期输出。',
              '文件系统场景改用一份显式的独立配置层，不再依赖现算表达式。',
            ],
            en: [
              'Expressions are no longer allowed in that slot: a **gate scans every config file in the repo** and rejects them outright - see the [gate reference](/gates).',
              'The snapshot tool now refuses to record missing-tool results into expected output.',
              'Filesystem scenarios moved to an explicit, separate config layer instead of relying on computed expressions.',
            ],
          },
          {
            type: 'callout',
            tone: 'idea',
            title: { zh: '这道禁令后来被自己推翻：靠求值关掉，不是靠禁止', en: 'The ban was later reversed: the hazard was closed by evaluation, not prohibition' },
            zh: '2026年8月11日的一篇笔记记着，加载器现在会真的去求值那一格，而且只有那一格——因为 Windows 那条线需要按平台开关某些配置行。他们的说法是：这个隐患是靠求值关掉的，不是靠禁止。教训没有变成一条永久禁令，它变成了一段代码。',
            en: 'A note dated 2026-08-11 records that the loader now genuinely evaluates that slot, and only that slot, because the Windows line needs per-platform rows. Their wording: the hazard was closed by evaluation, not by prohibition. The lesson did not harden into a permanent ban; it hardened into code.',
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '这个 bug 没有把文件系统权限放进标准模式——而捷径会放进去', en: 'The bug never granted filesystem access to standard mode - a shortcut would have' },
            zh: '复盘特意写明：这个 bug 没有让默认模式意外获得文件系统权限；而且当时如果图省事直接去修那个表达式，反而会真的制造出这个风险。修一个禁用方向的 bug，最容易的改法是让表达式成立，那一步会把三个写文件工具在所有人机器上一次放开。方向比症状重要：先问这次修复会不会多授予什么。',
            en: 'The postmortem states it deliberately: the bug never let standard mode gain filesystem access unexpectedly, and had they taken the easy route of fixing the expression itself, that is exactly what would have created the risk. Fixing a disable-direction bug tempts you to make the expression evaluate true, which would have switched three file-writing tools on for everyone at once. Direction matters more than symptom: ask what the fix additionally grants.',
          },
        ],
      },
      {
        id: 'pm-0003-substitute-server',
        title: { zh: '0003：它说做完了，但它验的不是你那台', en: '0003: It Said Done, but Verified a Different Server Than Yours' },
        blocks: [
          {
            type: 'p',
            zh: '四篇里最适合非技术读者的一篇，因为它讲的是 agent 最常见的那种错法。场景：用户正在 3081 端口的网页界面里跟它对话，让它改这个界面的主题。它改完源码，接下来做了三件事，一件比一件离谱。',
            en: 'The most accessible of the four, because it captures the most common failure mode of agents. Setup: the user is talking to it inside the web UI on port 3081 and asks it to change that UI theme. It edits the source, then does three things, each worse than the last.',
          },
          {
            type: 'steps',
            items: [
              {
                title: { zh: '把验收甩给用户', en: 'Hand the verification to the user' },
                desc: { zh: '「你自己打开看看」——第一轮它一个目标都没验。', en: '"Open it yourself and take a look" - the first round verified nothing at all.' },
              },
              {
                title: { zh: '自己起了个精简服务，拿到 200 就宣布成功', en: 'Start a stripped dev server, declare success on HTTP 200' },
                desc: { zh: '命令一探，服务器回了「一切正常」的状态码，它就宣布成功；用户浏览器里是一片空白，因为完整界面还需要宿主注入一份启动清单，精简版不注入。网络通了，不等于页面能看。', en: 'A probe returned an all-good status code and that was enough. The browser showed a blank page, because the full UI needs a host-injected manifest and the stripped server does not inject one. A reachable network is not a renderable page.' },
              },
              {
                title: { zh: '又起一个新端口，只验收这一台', en: 'Boot a second port and verify only that one' },
                desc: { zh: '第三步它找到了正确的启动方式，但起在 3334 端口，然后只检查 3334，并报告完成。用户真正在用的 3081，它从头到尾没探过一次。', en: 'Now it found the correct launch method, but booted it on port 3334 and checked only 3334, then reported completion. Port 3081, the one the user was actually on, was never probed.' },
              },
              {
                title: { zh: '直到用户连着指出三个错误', en: 'Until the user flagged three errors in a row' },
                desc: { zh: '它这才回头去看现有进程——而那时 3081 上早就显示新主题了。', en: 'Only then did it inspect the existing processes - and 3081 had been showing the new theme the whole time.' },
              },
            ],
          },
          {
            type: 'table',
            head: [
              { zh: '这件事', en: 'The fact' },
              { zh: '能不能互相推出', en: 'Does it imply the others' },
              { zh: '0003 里对应的现场', en: 'What it looked like in 0003' },
            ],
            rows: [
              [
                { zh: '网络就绪', en: 'Network reachable' },
                { zh: '不能。端口开着、状态码 200，只说明有人在听', en: 'No. An open port and a 200 only prove something is listening' },
                { zh: '精简开发服务器回了 200', en: 'The stripped dev server returned 200' },
              ],
              [
                { zh: '构建成功', en: 'Build succeeded' },
                { zh: '不能。产物能编译，不代表页面被装配完整', en: 'No. Compiling output does not mean the page was assembled completely' },
                { zh: '源码确实改对了', en: 'The source edit was in fact correct' },
              ],
              [
                { zh: '启动清单在位', en: 'Manifest present' },
                { zh: '不能，反过来也不能。这一项只有宿主注入才成立', en: 'No, and not in reverse either. Only the host injects this one' },
                { zh: '精简版不注入，浏览器一片空白', en: 'The stripped server never injects it, so the browser went blank' },
              ],
            ],
            note: {
              zh: '复盘原文把这三件事实分开列成经验教训：网络就绪、构建成功、启动清单，是三件不同的事实。',
              en: 'The postmortem lists these as separate lessons: network-ready, build-success and manifest-present are three different facts.',
            },
          },
          {
            type: 'p',
            zh: '根因不在模型偷懒，而在**这套组合没有把「你这个会话跑在哪个网址、哪个进程、什么模式」告诉模型**。模型只知道当前目录，而那是用户选的工作区，不是应用目录，于是它猜错了。',
            en: 'The root cause was not a lazy model. **The harness never surfaced which URL, which process and which mode the current session runs in.** The model only knew the working directory, which is the workspace the user picked rather than the application directory, so it guessed wrong.',
          },
          {
            type: 'code',
            lang: 'bash',
            title: '修法：把会话网址和运行模式交给模型',
            code: `# postmortem 0003 fix, as recorded in the book:
#   expose the current session URL and run mode to the model,
#   visible both in context and queryable from a shell command
echo "$DSH_WEB_URL"     # the exact address this session is served on
echo "$DSH_WEB_MODE"    # which run mode the host is in

# plus: the misleading stripped dev server now refuses to start
#       at the launch stage, so it can never return a happy 200 again`,
            note: {
              zh: '10月的系统提示词改成了从运行时上下文里读网址；这两个环境变量还在不在，花叔没有核对。那个会误导人的精简版服务器，从此在启动阶段直接拒绝跑起来。',
              en: "In the October build the system prompt reads the URL from runtime context instead; the author did not check whether these two environment variables still exist. The misleading stripped server now refuses to start at the launch stage.",
            },
          },
          {
            type: 'list',
            zh: [
              '**验收必须指定确切的目标地址**，并且从外部观察改动有没有在那个地址上生效——不是观察「我起的这一台」。',
              '**一台替代服务，永远证明不了你那台页面变了。**',
              '把自己的验收链路画出来：哪一步是我在观察，哪一步是 agent 在观察，中间隔着的那台服务器是谁起的。',
            ],
            en: [
              '**Verification must name the exact target address** and observe the change landing on that address from outside - not observe "the instance I just started".',
              '**A substitute server never proves that your page changed.**',
              'Draw your own acceptance chain: which step you observed, which step the agent observed, and who started the server in between.',
            ],
          },
        ],
      },
      {
        id: 'pm-0004-in-band',
        title: { zh: '0004：一次空搜索被判成沙箱故障', en: '0004: An Empty Search Convicted the Sandbox' },
        blocks: [
          {
            type: 'p',
            zh: '在比较老的 Linux 内核上，负责把命令关进沙箱的那个小程序每次执行前会先打印一行提示：「我只能做到部分约束」。这是善意提醒，不是错误。而它真正失败的时候，会打印另一行诊断，并且以一个固定的退出码退出。问题是——两种情况的开头是同一个前缀。',
            en: 'On older Linux kernels the sandbox runner prints an advisory line before every execution: partial constraint only. That line is a courtesy, not an error. When the runner genuinely fails it prints a different diagnostic and exits with a fixed status. The trouble: both lines begin with the same prefix.',
          },
          {
            type: 'code',
            lang: 'text',
            title: '误判链条',
            code: `advisory line : <prefix> ... partial enforcement   (normal, every run)
fatal line    : <prefix> ... <fatal diagnostic>    (real failure)

harness gate  : starts with <prefix>  AND  exit code != 0  =>  "sandbox unavailable"

then:
  the search tool is asked for a keyword in the project -> no match -> exit code 1   (normal empty result)
  + the advisory line shares the prefix
  => judged "sandbox unavailable"
  => wrapped one layer up as a generic "search failed"

Result: a valid confined result was rejected or mislabelled. Nothing ran unconstrained.`,
            note: {
              zh: '没搜到，变成了系统故障。harness 偷了个懒，只用前缀来分辨善意提醒和致命诊断。',
              en: 'A nothing-found answer turned into a system failure. The harness shortcut was to tell courtesy and catastrophe apart by prefix alone.',
            },
          },
          {
            type: 'p',
            zh: '他们的影响评估同样克制：**约束没有被削弱，也没有任何命令因此跑在无约束状态下**，损失在可用性和诊断的完整性上——有效的受限结果被拒绝或者被贴错标签。',
            en: 'Their impact assessment stays equally restrained: **no constraint was weakened and nothing ran unconstrained**. The damage landed on availability and on diagnostic integrity - valid confined results were rejected or given the wrong label.',
          },
          {
            type: 'quote',
            zh: 'stderr仍是带内归因通道。受限子进程可以故意复现runner的门控致命诊断行与退出状态，造成可用性或诊断误归因。',
            en: 'stderr is still an in-band attribution channel. A confined subprocess can deliberately reproduce the runner gating fatal diagnostic line and exit status, causing availability loss or diagnostic misattribution.',
            cite: { zh: '复盘 0004 根因段 / Postmortem 0004, root cause', en: 'Postmortem 0004, root cause' },
            source: { label: 'DeepSeek-Harness 仓库 / Repository', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '翻译成人话：沙箱靠读被关起来的程序吐出的文字来判断出事', en: 'In plain words: the sandbox judges itself by reading the output of the thing it locked up' },
            zh: '那个程序完全可以照着格式把那行字打一遍。他们没有假装这已经解决：加更多证据能避免这次这种意外撞车，但无法验证是谁写的那行字，真正的修法是**另开一条带外通道**，属于后续加固工作。一个还在预览版的产品，在自己的事故复盘里写下「我这个判断依据原理上可以被伪造」——花叔说自己没见过第二家。这类问题请回[错误博物馆](/errors)对照现场。',
            en: 'That subprocess could print the line in exactly that format itself. The team does not pretend this is solved: more evidence would prevent this accidental collision but cannot verify who wrote the line, and the real fix is **an out-of-band channel**, filed as future hardening. A product still in preview writing "my gating signal is forgeable in principle" into its own postmortem is, per the author, something he has not seen a second vendor do. For the live symptom, see the [error museum](/errors).',
          },
        ],
      },
      {
        id: 'lessons-hardened',
        title: { zh: '四篇之外：教训被固化成了什么', en: 'Beyond the Four: What the Lessons Were Hardened Into' },
        blocks: [
          {
            type: 'p',
            zh: '复盘写得再漂亮，人也会忘。所以花叔更在意后头这两样，它们把教训变成了机器强制。第一样：**8月每一个包都得带一份运行时 invariant 文件**，219 个包一个不漏，其中 184 份是空的；空得有规矩——第一行注释必须以 `No runtime invariant:` 开头，写清楚这个包为什么没得可查，有一道门禁机械拒绝糊弄的写法。这一样到 10 月已经没有了：0.2.1-rc.1 的发布说明写着「移除运行时 invariant 插件及各包的 ./invariant 导出」，**为什么拆，书里没找到对应的笔记**。',
            en: 'Beautiful postmortems still get forgotten, so what matters is the two things that turned lessons into machine enforcement. First: **in August every package had to ship a runtime-invariant file**, 219 packages with no exceptions, 184 of them empty - and empty had rules. The first comment line had to start with `No runtime invariant:` and state why that package had nothing checkable, with a gate mechanically rejecting lazy wording. By October this was gone: the 0.2.1-rc.1 release notes read "remove the runtime invariant plugin and each package\'s ./invariant export", and **the book found no note explaining why it was torn out**.',
            source: { label: '橙皮书（花叔）/ Orange Book (Huashu)', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'code',
            lang: 'text',
            title: '崩溃恢复时合成给模型看的那句话',
            code: `# case A: the tool call was recorded, but no result was ever persisted
This tool call was interrupted after being recorded, but no result was ever
persisted. Its outcome is unknown. Decide whether to retry from the semantics
of this tool: retry only when the operation is read-only or idempotent; if it
may have side effects, verify the external state first, or ask the user.
Do not retry blindly.

# case B: interrupted before the call was ever recorded as started
This call was interrupted before it was recorded as started. Retry if still needed.`,
            note: {
              zh: '两句话的差别，是「我不知道那个删除命令有没有执行」和「那个删除命令肯定没执行」的差别。断电重启后，它把不确定性原样交给模型，并当场给出判断规则。这套机制 10 月还在，文案是 8 月抄的，花叔没逐字复核。',
              en: 'The gap between the two messages is the gap between "I do not know whether that delete command ran" and "that delete command definitely did not run". On restart the harness hands the uncertainty to the model intact, plus a decision rule. The mechanism is still present in October; the wording was copied in August and not re-verified word for word.',
            },
          },
          {
            type: 'quote',
            zh: '一个回合可以包含大量真实工作，包括很多步骤和很大的工具输出。把它丢掉的代价，比留下一条脏记录的代价更贵。',
            en: 'A single turn can contain a large amount of real work, with many steps and very large tool outputs. The cost of discarding it is higher than the cost of keeping one dirty record.',
            cite: { zh: '否决 2026-06-20 提案的理由 / Reason the 2026-06-20 proposal was rejected', en: 'Reason the 2026-06-20 proposal was rejected' },
          },
          {
            type: 'p',
            zh: '上面那段文案本来差点不存在。2026年6月20日有一份提案，主张把这套「补齐」机制整个删掉：崩溃之后加载日志时，直接丢掉最后一个完整回合之后的所有内容，干净利落，也不用凭空造出一条没有任何工具产生过的结果。提案给自己的理由是「产品还没发布，这套恢复语义没有被真实用户验证过」。它被否了——**把一个回合丢掉，代价比留下一条脏记录更贵**。这份提案到 10 月还躺在被否决的目录里，那个目录 8 月有 11 篇，10 月是 8 篇。',
            en: 'That wording nearly never existed. A proposal dated 2026-06-20 argued for deleting the synthesis mechanism entirely: on reload, drop everything after the last complete turn - clean, and no need to invent a result no tool ever produced. Its own justification was that the product had not shipped and this recovery semantics had never been validated by real users. It was rejected: **discarding a turn costs more than keeping one dirty record**. The proposal still sat in the rejected directory in October; that directory held 11 entries in August and 8 in October.',
            source: { label: '橙皮书（花叔）/ Orange Book (Huashu)', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'p',
            zh: '最后一条不在四篇复盘里，是设计笔记里的内存实测。结论本身很干净：agent 销毁之后占的内存几乎全数归还。但笔记的结论句是——',
            en: 'The last item is not one of the four; it comes from a memory-measurement design note. The raw finding is clean: almost all memory is returned after an agent is destroyed. But the note closes with this -',
          },
          {
            type: 'quote',
            zh: '所以泄漏的不是对象图，是生命周期。',
            en: 'So what leaks is not the object graph; it is the lifecycle.',
            cite: { zh: '内存实测设计笔记 / Memory measurement design note', en: 'Memory measurement design note' },
          },
          {
            type: 'callout',
            tone: 'note',
            title: { zh: '因为网页版的宿主压根不销毁 agent', en: 'Because the web host simply never destroys agents' },
            zh: '创建出来的句柄被直接扔掉，登记表里也没有任何淘汰机制。8月这条挂着一个待办标记，没做；10月修没修，书里没查到。把「我这里有个已知的泄漏，而且我知道它为什么泄漏，我还没修」写进公开仓库，和前面那句「我的判断依据可以被伪造」是同一种姿态。',
            en: 'The handles created are discarded outright and the registry has no eviction mechanism at all. In August this carried a pending marker and was not done; whether October fixed it is not verified in the book. Writing "we have a known leak, we know why, and we have not fixed it" into a public repo is the same posture as "my gating signal is forgeable".',
          },
        ],
      },
      {
        id: 'four-lines',
        title: { zh: '四句该抄下来的话，各自怎么用', en: 'The Four Lines, and How to Use Each One' },
        blocks: [
          {
            type: 'table',
            head: [
              { zh: '编号', en: 'Entry' },
              { zh: '该抄下来的那句', en: 'The line worth copying' },
              { zh: '你下次能做的具体动作', en: 'The concrete move you can make next time' },
            ],
            rows: [
              [
                { zh: '0001', en: '0001' },
                { zh: '覆盖率证明代码行被执行过；它不能说明功能是否按交付方式正常工作。', en: 'Coverage proves lines were executed; it says nothing about whether the feature works in the way it is shipped.' },
                { zh: '让 agent 用真实装载路径跑一次：走加载器，不走手工挂载；CI 里被跳过的测试要单独报出来。', en: 'Make the agent run once through the real loading path - through the loader, not hand mounting - and report any test CI skipped.' },
              ],
              [
                { zh: '0002', en: '0002' },
                { zh: '快照刷新是 fixture 的生产过程，不是正确性审查。', en: 'Refreshing a snapshot is how fixtures get manufactured, not a correctness review.' },
                { zh: '快照变更 PR 里加一条与预期输出无关的断言（工具是否存在、字段是否非空），并规定谁有权刷新。', en: 'Add an assertion independent of the expected output (does the tool exist, is the field non-empty) and decide who is allowed to refresh.' },
              ],
              [
                { zh: '0003', en: '0003' },
                { zh: '一台替代服务，永远证明不了你那台页面变了。', en: 'A substitute server never proves that your page changed.' },
                { zh: '验收语里写明确切地址或实例名，并要求从外部观察改动；把「200」「构建过了」当未完成。', en: 'Name the exact address or instance in the acceptance criterion and require outside observation; treat "got 200" and "it built" as not done.' },
              ],
              [
                { zh: '0004', en: '0004' },
                { zh: 'stderr 仍是带内归因通道。', en: 'stderr is still an in-band attribution channel.' },
                { zh: '任何用日志文本加退出码做的判断都当作可伪造：状态走结构化通道或带外通道传。', en: 'Treat any decision made from log text plus exit status as forgeable; carry state over a structured or out-of-band channel.' },
              ],
            ],
            source: { label: '橙皮书（花叔）/ Orange Book (Huashu)', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'callout',
            tone: 'tip',
            title: { zh: '把这四句贴在你和 agent 之间', en: 'Paste these four between you and the agent' },
            zh: '这四篇复盘回答的是同一个问题：AI 报告「测试全过了」的时候，这句话该信几分。答案是——它信的是自己那套验证方式，跟你交付出去的那一份之间有没有对应关系，只有你知道。所以下面这四句不是给 DeepSeek 的，是给任何一句「我验过了」。',
            en: 'All four postmortems answer the same question: how much should you trust an AI reporting that all tests pass. The answer is that it trusts its own verification method, and only you know whether that maps onto the artifact you actually shipped. So these four lines are not for DeepSeek - they are for every "I already checked it" you will ever read.',
          },
          {
            type: 'links',
            title: { zh: '接着读', en: 'Read next' },
            items: [
              { label: { zh: '避坑清单：现场记录', en: 'The Pitfall Checklist, From the Field' }, href: '/chapter/pitfalls', desc: { zh: '复盘之外，日常使用会撞上的那二十几条', en: 'The two-dozen-odd things daily use actually hits' }, tag: '14' },
              { label: { zh: '它在赌什么，代价是什么', en: 'What It Is Betting, and What That Costs' }, href: '/chapter/bets', desc: { zh: '这些 bug 背面那四个选择', en: 'The four choices on the back of these bugs' }, tag: '15' },
              { label: { zh: '发布门禁', en: 'Release Gates' }, href: '/gates', desc: { zh: '0002 那三条防护里最硬的一条就是门禁', en: 'The hardest of the three guards in 0002 is a gate' } },
              { label: { zh: '错误博物馆', en: 'Error Museum' }, href: '/errors', desc: { zh: '沙箱误判、审批文案等现场原文', en: 'Sandbox misjudgement, approval wording and other live strings' } },
              { label: { zh: '橙皮书 §12', en: 'Orange Book, section 12' }, href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/', desc: { zh: '四篇复盘的完整原始出处', en: 'The full original source for the four postmortems' }, tag: 'source' },
              { label: { zh: 'DeepSeek-Harness 仓库', en: 'DeepSeek-Harness repository' }, href: 'https://github.com/deepseek-ai/DeepSeek-Harness', desc: { zh: 'docs/postmortem/ 0001-0004', en: 'docs/postmortem/ 0001-0004' }, tag: 'github' },
            ],
          },
        ],
      },
    ],
    sources: [
      { label: '橙皮书（花叔）/ Orange Book (Huashu)', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
      { label: 'DeepSeek-Harness 仓库 docs/postmortem/ / Repository postmortems', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
      { label: 'DeepSeek 官网 / DeepSeek', href: 'https://www.deepseek.com/' },
    ],
    sisters: ['agent-evaluation-patterns', 'agent-observability-patterns', 'harness-engineering'],
  },
  {
    slug: 'pitfalls',
    num: '14',
    part: 'production',
    icon: 'alert',
    level: 'production',
    minutes: 17,
    accent: 'blue',
    title: { zh: '避坑清单：现场记录', en: 'The Pitfall Checklist, From the Field' },
    subtitle: { zh: '三十几条都是本机撞出来的，每条给一句「怎么避」', en: 'Thirty-odd traps actually hit on one machine, each with the way around it.' },
    promise: {
      zh: '读完你能在装完的第一天把静默失效的那几类全部验一遍，并知道自己每一笔钱花在哪。',
      en: 'You will be able to test every silently-failing class on day one and know where each unit of money went.',
    },
    sections: [
      {
        id: 'docs-lag',
        title: { zh: '第一坑是文档：它已经落后于代码', en: 'Trap One Is the Docs: They Already Lag the Code' },
        blocks: [
          {
            type: 'p',
            zh: '花叔在 8 月抓到三处「文档说的和运行时不一样」，全部是实测，不是猜。**一**，创造模式那个包的说明文件写「五个模型可见的工具」，他实测运行时里是七个，其中一个已经拆成了三个。**二**，有个工具早就改了名字，旧名字却还留在随产品发出去的一份 skill 文件里，而那份文件是喂给模型看的。**三**，它把底层框架的 9 个包整个抄进自己仓库，三处文档都写着这些包「设为私有，从不发布」，实际上 9 个包里压根没有那个私有字段，逐个查过，**9 个全都发到 npm 上了**。',
            en: 'Three doc-versus-runtime mismatches were caught in August, all from measurement rather than guesswork. (1) The creator-mode package README said "five model-visible tools" while the runtime held seven, one of which had already been split into three. (2) A tool had been renamed long ago, yet the old name still sat in a skill file shipped with the product - and that file is fed to the model. (3) Nine vendored packages from the underlying framework were described in three separate places as private and never published; none of the nine even carried the private field, and every one of them is on npm.',
            source: { label: '橙皮书（花叔）/ Orange Book (Huashu)', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'quote',
            zh: '文档写错顶多骗到人，这个直接骗模型。',
            en: 'A wrong doc page misleads at most a human; a wrong skill file misleads the model directly.',
            cite: { zh: '花叔，第二处现场 / Huashu, on the second find', en: 'Huashu, on the second find' },
          },
          {
            type: 'code',
            lang: 'bash',
            title: '把「没发布」这类二手结论自己验一遍',
            code: `# does a package the docs call private actually exist on npm?
curl -s -o /dev/null -w "%{http_code}" \\
  https://registry.npmjs.org/@deepseek-ai/dsh-lsp
# 200  -> it is published. The author ran this for 35 package names: 35x 200.

# which version does the default tag actually point at?
npm view @deepseek-ai/dsh-base dist-tags --json

# what is mounted in YOUR runtime right now (factory tree vs your edits)
npx @deepseek-ai/dsh --profile web --dump-default-config > tree.yml
npx @deepseek-ai/dsh --profile web --dump-config > my-tree.yml`,
            note: {
              zh: '「仓库里有、装上没有」和「压根没发布」是两回事——花叔自己第一轮就把它写反过：查到 35 个包不在安装闭包里，顺手写下「这 35 个包不随产品发布」。唯一的解法是自己去打那个接口，看它返回 200 还是 404；他把 35 个包名逐个打过一遍，35 个都是 200。',
              en: '"In the repo but not in the install" and "never published" are two different things - the author wrote it backwards on his own first pass, reading "outside the install closure" as "not shipped with the product". The only cure is to hit the registry yourself and read 200 or 404; he probed all 35 package names one by one and every one returned 200.',
            },
          },
          {
            type: 'checklist',
            title: { zh: '文档类：四条', en: 'Documentation traps: four' },
            items: [
              { zh: '**现象**：照 README 写的工具数、包名去理解运行时，对不上。／**为什么**：一天几百次提交，文档必然落后；8 月那两处到 10 月已随创造模式重构不再成立。／**怎么避**：任何「A 代码里写着、装上是 B」的地方，先怀疑版本差；以 --dump-config 和会话日志为准。', en: '**Symptom**: README tool counts and package names do not match your runtime. **Why**: hundreds of commits a day guarantee docs lag; both August findings were already obsolete after the creator-mode rewrite. **Avoid it**: when code says A but install shows B, suspect version lag first - trust --dump-config and the session log.' },
              { zh: '**现象**：你装到的那一版比 GitHub 上那份快照还新半步（仓库版本号写 rc.5，npm 和机器上已是 rc.6）。／**为什么**：仓库快照和发包之间有差。／**怎么避**：报问题、比行为时把 npm 上的实际版本一起写上。', en: '**Symptom**: what you install is half a step ahead of the GitHub snapshot - the repo said rc.5 while npm and your machine already had rc.6. **Why**: publishing trails the tagged snapshot. **Avoid it**: quote the installed npm version whenever you report behaviour.' },
              { zh: '**现象**：一份喂给模型的 skill 文件里挂着已改名的旧工具名，模型照着调，报未知工具。／**为什么**：随产品分发的 skill 文件也属于文档，没有人复核它。／**怎么避**：自己那批 skill 里凡点名工具名的，用 `npx @deepseek-ai/dsh --profile headless "列出你现在能调用的工具，一行一个"` 对一遍。', en: '**Symptom**: a model-facing skill file references a tool name that was renamed, so the call comes back unknown tool. **Why**: skill files shipped with the product are documentation too, and nobody reviewed them. **Avoid it**: diff every skill that names a tool against the live list from a headless run.' },
              { zh: '**现象**：随包配置里那两行外包能力旁边留着注释「把停用标记去掉就能用」，照做会打开一个永远等不到东西的空位。／**为什么**：点名要的那个零件已在公开当天（8月13日）被从生产包里拆走，说明文件最后改动是 8月10日。／**怎么避**：把注释当旧文档；先确认包在不在默认安装里（下一节给了命令），缺的单独装并加 @next。搬家的完整清单在[第 4 章](/chapter/migration)。', en: '**Symptom**: an in-package config comment says "remove the disabled marker and it works"; doing so opens a slot that never receives anything. **Why**: the component it names was cut from the production install on launch day, 2026-08-13, while the file was last edited 2026-08-10. **Avoid it**: treat config comments as stale docs; check what is in the default closure, then install the missing package separately with @next. The full moving-in list is in [chapter 4](/chapter/migration).' },
            ],
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '这个阶段的任何文档你都不能直接信，包括这本书', en: 'At this stage no documentation can be taken at face value - including this book' },
            zh: '这是花叔自己写的免责句，也是本章的用法说明：下面每一条都带「现象」，是因为他都撞过；但版本一动，坑可能搬家、也可能消失。0.2 版把设置改存到每个 profile 自己的插件配置里、命令行和网页的凭据读取也分开了，8 月那几处里至少两处可能已经不成立，他没复测。凡「没复测」「没实跑过」的，我在正文里逐条标了。',
            en: 'This is the author\'s own disclaimer and it is the usage note for this chapter: every item below carries a symptom because he hit it. But versions move, so traps migrate or vanish. The 0.2 release relocated settings into per-profile plugin config and split credential lookup between CLI and web, so at least two of the August traps may already be gone - he did not retest. Anything unverified is labelled as such in the body text.',
          },
        ],
      },
      {
        id: 'install-and-disk',
        title: { zh: '安装、磁盘与那三份重复缓存', en: 'Install, Disk, and the Three Duplicate Caches' },
        blocks: [
          {
            type: 'p',
            zh: 'npx 那条路一句话里塞了三个坎。官方原话是「在已安装 Node.js 开发工具链的系统中，可以使用 npx 命令快速启动」。README 只说装 Node.js，没写版本；仓库根目录写的是 **22.19 以上或 24 以上**，但发到 npm 上的 dsh 包没带这个门槛，**安装器不会替你拦住一个太老的版本**。',
            en: 'The npx route packs three traps into one sentence. The official wording is that npx offers a quick start on systems with a Node.js toolchain installed. The README only says install Node.js, with no version; the repo root requires **22.19 or newer, or 24 or newer**, but the npm package does not carry that constraint, so **the installer will not stop you on an ancient Node**.',
            source: { label: '橙皮书（花叔）/ Orange Book (Huashu)', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'code',
            lang: 'bash',
            title: '装之前、装完、卸的时候',
            code: `node -v                 # must be >= 22.19, or >= 24. The npm package will not check this for you.

npx @deepseek-ai/dsh web              # first run on an empty cache: ~2m45s, no progress bar at all
npx @deepseek-ai/dsh web --no-open    # stop it grabbing your default browser (0.1.0-rc.8 onwards it auto-opens)
npx @deepseek-ai/dsh web --port 3095  # pin the port if you want a stable address to verify against

# where the real disk usage lives
du -sh ~/.dsh
du -sh ~/.npm/_npx/*/                 # the big number is HERE, not in ~/.dsh
du -sh ~/.npm/_npx/*/node_modules     # October: one install unpacks ~844MB, npm cache grows ~257MB

# proxy software on? clear it in the SAME terminal before launching
unset http_proxy https_proxy all_proxy HTTP_PROXY HTTPS_PROXY ALL_PROXY
npx @deepseek-ai/dsh web`,
            note: {
              zh: '开着代理时界面只报 MALFORMED_RESPONSE，完全不提代理。看到这个词先想代理。',
              en: 'Behind a proxy the UI reports only MALFORMED_RESPONSE and never mentions the proxy. Treat that string as a proxy symptom.',
            },
          },
          {
            type: 'stats',
            items: [
              { value: '~1GB', label: { zh: '三种 npx 写法留下的重复安装', en: 'Duplicate installs from three npx spellings' }, sub: { zh: '本机实测，8月', en: 'measured on one machine, Aug' } },
              { value: '844MB', label: { zh: '一次安装的解包体积', en: 'Unpacked size of one install' }, sub: { zh: '8月是 342MB', en: '342MB in Aug' } },
              { value: '2分45秒', label: { zh: '空缓存首次启动', en: 'First start on an empty cache' }, sub: { zh: '无进度条，只有转圈', en: 'no progress bar, just a spinner' } },
              { value: '16', label: { zh: '本机遗留的外溢临时目录', en: 'Leftover spill directories on that machine' }, sub: { zh: '绝大多数是空的', en: 'mostly empty' } },
            ],
          },
          {
            type: 'checklist',
            title: { zh: '安装与磁盘：七条', en: 'Install and disk: seven' },
            items: [
              { zh: '**现象**：第一次敲 npx，两分半屏幕上只有一个转圈符号，没有百分比、没有大小。／**为什么**：没有进度条；8月有 Windows 用户在讨论帖 #176 报第一次跑了 8 分多钟毫无反馈，到 10 月那帖还开着。／**怎么避**：别以为它卡了，它在下；要快就固定用同一行命令复用缓存。', en: '**Symptom**: the first npx run shows only a spinner for two and a half minutes - no percentage, no size. **Why**: there is no progress bar; a Windows user reported over 8 silent minutes in discussion thread #176, still open in October. **Avoid it**: assume it is downloading, and reuse one exact command line so the cache applies.' },
              { zh: '**现象**：本机躺了三份一模一样的安装包，合计约 1GB。／**为什么**：npx 按命令原文缓存，加不加 @latest、加不加版本号都算另一条命令。／**怎么避**：固定用同一行命令；卸载时光删 `~/.dsh` 不够，`~/.npm/_npx/` 里那几份也得删。', en: '**Symptom**: three byte-identical installs on one machine, roughly 1GB total. **Why**: npx caches by the literal command string, so @latest or a version suffix each creates a new copy. **Avoid it**: standardise on one exact command; uninstalling means deleting `~/.dsh` AND the copies under `~/.npm/_npx/`.' },
              { zh: '**现象**：多出来的 500MB 主要在哪儿——随包带的 LibreOffice 组件，用来在侧栏预览 Word、Excel、PPT。／**为什么**：8月那次安装只有 342MB，10月涨到 844MB（2.5 倍）。／**怎么避**：书里没给关掉它的开关，至少知道磁盘花在了哪；`du -sh ~/.npm/_npx/*/node_modules` 自己称。', en: '**Symptom**: most of the growth is a bundled LibreOffice component used for sidebar previews of Word, Excel and PPT. **Why**: one install was 342MB in August and 844MB (2.5x) in October. **Avoid it**: the book records no switch to turn it off, so at minimum know where the bytes went and weigh them yourself with du -sh ~/.npm/_npx/*/node_modules.' },
              { zh: '**现象**：网页白屏了，昨天还在。／**为什么**：npx 版是靠那个终端窗口活着的，关掉窗口网页就白了。／**怎么避**：窗口不能关；明天把同一行命令再敲一遍，第二次不用下载（本机 8 秒内起来）。桌面端按官方说法关了窗口任务照样在后台跑。', en: '**Symptom**: the web page goes blank although it worked yesterday. **Why**: the npx build lives only as long as that terminal window. **Avoid it**: keep the window open, or rerun the same line the next day - the second start needs no download (8 seconds on that machine). Per the release notes the desktop build keeps tasks running after the window closes.' },
              { zh: '**现象**：清磁盘时只清了 `~/.dsh`。／**为什么**：外溢出来的大工具结果文件不在 `~/.dsh` 里，在系统临时目录下面，而且每跑一次 dsh 就新建一个、不回收；本机跑了几次就有 16 个这种目录，绝大多数是空的。／**怎么避**：清的时候系统临时目录一起看；这也解释了为什么模型看到的截断结果里会带一个临时文件路径。', en: '**Symptom**: you clean only `~/.dsh`. **Why**: spilled tool outputs do not live there - they sit under the system temp directory, and every dsh run creates a new one that is never reclaimed; a few runs produced 16 such directories, mostly empty. **Avoid it**: sweep the system temp directory too, which is also why truncated tool results hand the model a temp path.' },
              { zh: '**现象**：`~/.dsh/sessions/` 只会一直涨。／**为什么**：跨项目恢复之后每个项目的会话日志都堆在同一个目录，官方笔记原话是本决策不引入任何保留期策略——**它不会自己删，硬盘是你的**。／**怎么避**：自己排一个清理任务；界面上没有「删除会话」入口，只能进这个目录删文件夹，目录名是项目路径压平的，中文会转成码点。', en: '**Symptom**: `~/.dsh/sessions/` only ever grows. **Why**: since cross-project resume, every project\'s session logs land in one directory, and the design note states plainly that this decision introduces no retention policy - **it never deletes by itself; the disk is yours**. **Avoid it**: schedule your own cleanup. There is no delete-session control in the UI; you remove folders here, whose names are flattened project paths with Chinese turned into code points.' },
              { zh: '**现象**：会话格式换代后，同一场会话在盘上躺着两代文件。／**为什么**：0.2 版做了迁移（版本号从 0 升到 4），每一代都有到下一代的转换，老文件原样保留、新版本另存一份；8月那个版本还明说老格式直接拒读、不做迁移。／**怎么避**：算磁盘、写脚本时把 `session.jsonl.zstd` 和 `session.v4.jsonl.zstd` 都算进去。', en: '**Symptom**: after a format generation change one session exists as two files. **Why**: 0.2 added migration (version 0 to 4) where each generation converts to the next, keeping the old file and writing a new one; the August build explicitly refused to read older formats at all. **Avoid it**: count both `session.jsonl.zstd` and `session.v4.jsonl.zstd` when measuring disk or scripting over logs.' },
            ],
          },
        ],
      },
      {
        id: 'packages-not-mounted',
        title: { zh: '装上了不等于挂上了', en: 'Installed Is Not Mounted' },
        blocks: [
          {
            type: 'p',
            zh: '8 月仓库有 219 个包，装完你本机只有 184 个，差的 35 个（钩子桥、外包给别的产品、语言服务、云端沙箱等）全都发到 npm 上了，只是不连带装上。10 月按仓库算，不在默认安装里的官方包涨到 **48 个**，多出的主要是浏览器操作、电脑操作、SSH 远程这几组实验能力。他们考虑过「装上但默认休眠」，否掉了：休眠的零件不启动进程，包却会进到每一次生产安装里，为一个默认关着的功能让每个人白下 245MB。',
            en: 'In August the repo held 219 packages while a fresh install produced 184 on disk. The 35 missing ones (hook bridge, delegating to another product, language services, cloud sandbox and more) are all published on npm - they are simply not pulled in. By October the count of official packages outside the default install had risen to **48**, mostly the browser-control, computer-control and SSH experimental groups. The team considered shipping them dormant and rejected it: dormant components start no process yet still enter every production install, making everyone download 245MB for something switched off by default.',
            source: { label: '橙皮书（花叔）/ Orange Book (Huashu)', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'code',
            lang: 'bash',
            title: '额外包的唯一正确装法（@next 不能省）',
            code: `# WRONG: without the tag you get the stale "latest" build,
# 30+ versions behind your main package, with a mismatched interface.
npx @deepseek-ai/dsh plugin --profile web add @deepseek-ai/dsh-hooks-claude-code

# RIGHT
npx @deepseek-ai/dsh plugin --profile web add @deepseek-ai/dsh-hooks-claude-code@next

# installing is not mounting. Mount it into the runtime with a patch file:
npx @deepseek-ai/dsh --profile headless --patch my.yml "你的任务"

# the command is essentially a pnpm forwarder: it creates the config
# directory if missing, then passes your arguments straight to pnpm,
# with the working directory set to that config directory.
# add / remove / update all work as-is, from npm, git, a local dir, or an archive.`,
            note: {
              zh: '花叔装钩子桥就吃了没加 @next 这一下，一口气吐了 9 条依赖警告；包名后面加 @next 才拿到跟主程序同一批的版本。装完它还会提醒「这个包没接上去」——文件已落到硬盘，你还得再写一段配置把它挂进运行时。',
              en: 'Installing the hook bridge without @next produced 9 dependency warnings in a row; adding the tag finally matched the main package build. Afterwards it still warns that the package is not connected - the files are on disk, and you must write a config patch to mount it.',
            },
          },
          {
            type: 'checklist',
            title: { zh: '包与配置：六条', en: 'Packages and config: six' },
            items: [
              { zh: '**现象**：`dsh plugin` 报错找不到 pnpm。／**为什么**：插件管理器用 pnpm 装包，很多机器上没有；一劳永逸的 `corepack enable pnpm` 会往 `/opt/homebrew/bin` 写东西，属于系统改动。／**怎么避**：自己装一次 pnpm；注意 agent 的自动绕法是在 npx 缓存目录里放一个小脚本把 pnpm 指过去，**缓存一清又会再撞**。', en: '**Symptom**: `dsh plugin` fails with pnpm not found. **Why**: the plugin manager installs through pnpm, which many machines lack, and the permanent fix `corepack enable pnpm` writes into `/opt/homebrew/bin`, i.e. a system change. **Avoid it**: install pnpm once yourself, and note that the agent\'s automatic workaround drops a shim in the npx cache directory - **clearing that cache brings the failure back**.' },
              { zh: '**现象**：界面上「添加插件」支持 npm 包名、GitHub 仓库地址、本地目录，还能选中国大陆镜像；自定义插件市场要填一个 JSON 索引地址。／**为什么**：官方不内置任何索引源，8月更是直接把整个 npm 生态借过来当发现机制。／**怎么避**：装第三方插件前先读弹窗那段提醒——「插件在本机以你的权限运行，来源不明的插件可能损坏 DeepSeek Harness，或读取和泄露你的数据」。', en: '**Symptom**: the add-plugin dialog accepts an npm name, a GitHub repo URL or a local directory, with a mainland mirror option, and custom plugin markets need a JSON index URL you must supply. **Why**: no index is built in; in August the discovery mechanism was simply the whole npm ecosystem. **Avoid it**: read the dialog warning first - plugins run with your own privileges on this machine, and an untrusted one can break the harness or read and leak your data.' },
              { zh: '**现象**：切沙箱模式被拒绝。／**为什么**：当前有终端会话开着时，用宽权限开出来的那个终端会活过你这次降权。／**怎么避**：先关掉终端再切。同一条纪律也解释了为什么模式只在空白会话才让切——换清单等于换模型手里那套工具，跑过的对话是在旧工具下产生的。', en: '**Symptom**: switching sandbox mode is refused. **Why**: an open terminal session started under wider privileges would outlive your downgrade. **Avoid it**: close the terminal first. The same logic is why modes are only switchable on an empty session - changing the manifest changes the tools the model holds, and the transcript was produced under the old ones.' },
              { zh: '**现象**：密钥文件权限不对，整个进程根本起不来。／**为什么**：密钥文件必须是仅自己可读；好在报错里会把 chmod 那条修复命令原样给你。／**怎么避**：照抄报错里的 chmod。另外缺密钥、密钥里混进换行、密钥无效这三种报错并不一样，别一律当成「没配上」。', en: '**Symptom**: with the wrong permission bits on the credential file the process refuses to start at all. **Why**: that file must be owner-read-only, and the error prints the exact chmod fix. **Avoid it**: copy the chmod from the error. Note also that a missing key, a key with a stray newline, and an invalid key produce three different errors - do not collapse them into "not configured".' },
              { zh: '**现象**：在无界面模式里找不到斜杠命令，也没有审批弹窗。／**为什么**：四选一的模式菜单只在网页版存在，无界面直接按标准那份走；`--profile headless` 那条既没有斜杠命令也没有人可弹窗。／**怎么避**：需要审批的自动化路径要重新设计——这里没人应答等于拒绝，见下一节。要试错先换个家目录：`DSH_HOME=/tmp/dsh-test npx @deepseek-ai/dsh ...`，所有数据都落在这个新家里。', en: '**Symptom**: no slash commands and no approval prompt in headless mode. **Why**: the four-way mode picker exists only in the web UI, and headless follows the standard manifest; the `--profile headless` path has neither slash commands nor anyone to prompt. **Avoid it**: redesign any automation that needs approval, because no answer counts as a refusal - see the next section. To experiment safely, run under a different home: `DSH_HOME=/tmp/dsh-test npx @deepseek-ai/dsh ...`, so every byte lands in that new home.' },
              { zh: '**现象**：多租户、并发、按会话计费这类需求接不住。／**为什么**：这套东西从设计上就没有这些，产品还在预览版，README 上那句「将会有破坏兼容性的变更」是全大写。／**怎么避**：别把插件和自定义模式沉淀成资产——三个月内一定变；skill 可以，那是共用格式，搬得走。详见[第 15 章](/chapter/bets)。', en: '**Symptom**: multi-tenant, concurrent, per-session billing needs are not served. **Why**: they were never in the design, and the product is still preview with an all-caps "breaking changes will happen" in its README. **Avoid it**: do not sink assets into plugins or custom modes - they will change inside three months; skills are fine because that format is shared and portable. See [chapter 15](/chapter/bets).' },
            ],
          },
        ],
      },
      {
        id: 'migration-traps',
        title: { zh: '从 Claude Code 搬过来，最坏的是静默失效', en: 'Moving In from Claude Code: the Worst Kind Fails Silently' },
        blocks: [
          {
            type: 'table',
            head: [
              { zh: '你搬过来的东西', en: 'What you move in' },
              { zh: '现象', en: 'Symptom' },
              { zh: '为什么 / 怎么避', en: 'Why, and how to avoid it' },
            ],
            rows: [
              [
                { zh: '`~/.claude/skills` 里的 skill', en: 'Skills under `~/.claude/skills`' },
                { zh: '默认完全看不见，一条都不列', en: 'Invisible by default; none are listed' },
                { zh: '扫描名单是六个位置，第五个才是公共抽屉 `~/.agents/skills`。补一条软链或配一条自定义路径就行——只是没人告诉你要补。', en: 'The scan list has six paths and the shared drawer `~/.agents/skills` is only the fifth. One symlink or one custom path fixes it - nobody just tells you to.' },
              ],
              [
                { zh: 'SKILL.md 开头那段元信息', en: 'The metadata block at the top of SKILL.md' },
                { zh: '名字字段拼错一个字母，整份 skill 作废，只留一条警告', en: 'One typo in the name field voids the whole skill, leaving only a warning' },
                { zh: '只认全小写加连字符；把驼峰当合法别名的提议被明确否掉（外部格式就照 Claude 那套）。代价是搬完后值得花五分钟把所有 skill 的名字字段扫一遍。', en: 'Lowercase-hyphen only; the proposal to accept camelCase as an alias was rejected outright (the external format stays Claude\'s). So budget five minutes to sweep every skill name after moving.' },
              ],
              [
                { zh: '嵌套目录里的 skill', en: 'Skills nested below the top folder' },
                { zh: '不认，官方写的是刻意排除', en: 'Not picked up - deliberately excluded' },
                { zh: '文件夹里直接放一份说明书才算数，再往里套一层就看不见。', en: 'A manual file directly inside the folder counts; one level deeper does not.' },
              ],
              [
                { zh: '文件夹名当显示名', en: 'Folder name as the display name' },
                { zh: '列出来的是 `huashu-weread-advisor`，你的文件夹叫 `huashu-weread`', en: 'It lists `huashu-weread-advisor` while your folder is `huashu-weread`' },
                { zh: '它读文件里写的名字，不是文件夹名（Claude Code 也这样）。按名字引用时别按目录名猜。', en: 'The declared name inside the file wins, not the folder name (Claude Code behaves the same). Never reference a skill by its directory name.' },
              ],
              [
                { zh: '.claude/hooks.json', en: 'The .claude/hooks.json file' },
                { zh: '装好了、看着在跑、一条都没生效，而且一句报错都没有', en: 'Installed, appears to run, not one rule fires, and no error is ever shown' },
                { zh: '要拦的工具名写成 Claude Code 的正确大写 `Bash`，DSH 的工具名全是小写 `bash`，名字对不上整条不触发。30 个事件它只认 7 个（8月的自述），剩下 23 个既不翻译也不吭声。', en: 'A rule blocking `Bash` (Claude\'s correct spelling) never matches, because every DSH tool name is lowercase `bash`. Of 30 events it recognises only 7 (its own August claim); the other 23 are neither translated nor mentioned.' },
              ],
              [
                { zh: '极简模式 + 你的技能库', en: 'Minimal mode plus your skill library' },
                { zh: '技能库整个不存在', en: 'Your whole skill library stops existing' },
                { zh: '极简那份配置只有 62 行（0.1.7-rc.1 起是补丁写法，78 行），搜 skill 这个词零命中；那条是读配置读出来的，这个模式作者没实跑过。', en: 'The minimal manifest is 62 lines (78 as a patch since 0.1.7-rc.1) with zero hits for the word skill; that came from reading the config, and the author never ran the mode.' },
              ],
              [
                { zh: '`~/.claude/CLAUDE.md` 全局规则', en: 'The `~/.claude/CLAUDE.md` global rules' },
                { zh: '读不到；`.claude/rules/` 目录和 `@某个路径` 导入写法也不支持，用了就当普通文字原样塞给模型', en: 'Not read; `.claude/rules/` and `@path` imports are unsupported and get passed to the model as plain text' },
                { zh: '0.2.1-rc.1 起先读 `$DSH_HOME/AGENTS.md`，再读 `~/.agents/AGENTS.md`（`DSH_AGENTS_HOME` 可改位置）。挪过去或做软链。', en: 'Since 0.2.1-rc.1 it reads `$DSH_HOME/AGENTS.md` then `~/.agents/AGENTS.md` (relocatable via `DSH_AGENTS_HOME`). Move the file or symlink it.' },
              ],
              [
                { zh: '会话记录 / 自定义斜杠命令 / 权限档位', en: 'Session history / custom slash commands / permission tiers' },
                { zh: '完全不通 / 不能自己加 / 搬不了', en: 'No import at all / not extensible / not portable' },
                { zh: 'DSH 存的是压缩过的事件流，能还原聊天记录、反过来做不到，源码和文档里搜导入器零命中；8月只有 6 条斜杠命令，全是插件注册的；权限档位概念对不上——`/permissions` 对 `/permission`（单数，只能三选一）。', en: 'DSH stores a compacted event stream: it can rebuild a chat log but not the reverse, and searching the source and docs for an importer returns zero hits. August had 6 slash commands, all plugin-registered. And the permission concepts do not map - `/permissions` versus `/permission`, singular, three-way choice only.' },
              ],
            ],
            source: { label: '橙皮书（花叔）/ Orange Book (Huashu)', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'code',
            lang: 'bash',
            title: '三条最要紧的，自己验一遍',
            code: `# 1. are my skills actually read? count them the right way
ls -d ~/.agents/skills/*/ | wc -l      # 74 in October on that machine
ls ~/.agents/skills | wc -l            # WRONG: counts .git too -> 58 instead of 57
# then ask the agent: "list every skill you can invoke, one per line" and diff.

# 2. do my rule files actually take effect? the dumb three-step test:
#    put three rule files in a scratch repo, bury one passphrase in each,
#    then ask the model to recite the rule sources it received verbatim.

# 3. did my hook really block? write the tool name ALL LOWERCASE,
#    run one trivial shell task, and confirm it was stopped.
#    Silence is not success: if it does not block, you get no error at all.`,
            note: {
              zh: '同一目录下 AGENTS.md 与 CLAUDE.md 内容逐字节相同就只算一份，漂移了就两份都塞进去——后一种你会白花一份 token。它还不监视规则文件的外部编辑：你改完不会立刻生效，得等它下一次读写更深的目录或者上下文压缩之后。',
              en: 'In the same directory, byte-identical AGENTS.md and CLAUDE.md count as one; once they drift both get injected, and the second one is wasted tokens. Rule-file edits are also not watched: a change only lands after the next deeper directory access or a context compaction.',
            },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '存下来的凭据，对模型没有边界', en: 'Saved credentials have no boundary against the model' },
            zh: '密钥存在一个明文凭据文件里，权限位 0600——只有文件主人能读。而文件主人是你，模型的 bash 和文件工具跑的也是你这个用户；0600 挡得住这台机器上的其他系统用户，挡不住模型，工作区内修改那一档又只管写不管读。他们真做过一道禁止读该路径的沙箱加固，写完、上线、然后被自己的证据撤回（Linux 那条路会拒绝每一台还没存过凭据的新机器，另一条路没法从已有读权限里做减法），结论原话是：一个在它生效的地方破坏约束、在它不生效的地方谎报状态的保护，比一个被文档化的缺席更糟。现在文档给这件事定的性是**谨慎，不叫边界**：没有界面把这个文件塞进进程环境变量，模型也拿不到一条指向它的现成路径，要读到得它自己刻意去读一条没人给过它的路径。所以：**别把生产环境的密钥放进这台机器**，或者接受「它读得到」这个前提再用。',
            en: 'The key lives in a plaintext credential file with permission bits 0600 - owner read only. But the owner is you, and the model\'s bash and file tools also run as you. 0600 keeps out other system users, not the model, and workspace-write constrains writes only, not reads. The team did build a deny-read sandbox rule for that path, shipped it, then withdrew it on their own evidence: the Linux route rejects every new machine that has no credentials yet, and the other route cannot subtract from read access it already granted. Their conclusion, verbatim: a protection that breaks the constraint where it applies and misreports state where it does not is worse than a documented absence. What remains is characterised in the docs as **prudence, not a boundary** - no surface injects the file into the process environment, the model gets no ready path to it, and reading it takes deliberately guessing a path nobody handed over. So: **do not put production secrets on this machine**, or accept the premise that the model can read them.',
          },
        ],
      },
      {
        id: 'money-traps',
        title: { zh: '账单：计价器是打开的', en: 'Money: the Meter Is Running' },
        blocks: [
          {
            type: 'list',
            zh: [
              '按量，没有包月：登录走 DeepSeek 平台账号的余额和赠金，或者挂 API Key，都是**用多少扣多少**；余额扣完会提示，API Key 这边账单一直涨。原来那种「反正已经交过钱了」的安全感没有了。',
              '峰谷定价（8月17日起）：北京时间**工作日上午 9-12、下午 2-6 是高峰**，价格是其余时段的两倍，低谷价正好是高峰价的一半。同一件活白天做和晚上做，钱差一倍。',
              '内置联网搜索走官方 Search 和 Fetch 两个接口，**北京时间 11 月 1 日零点起各按每千次成功请求 5 元收费**。',
              '10 月价目（元/百万 token）：Flash 输入命中 0.02/0.04、未命中 1/2、输出 4/8；Pro 输入命中 0.15/0.30、未命中 4.5/9、输出 13.5/27（每组前值低谷、后值高峰）。',
            ],
            en: [
              'Metered, never flat: sign in against DeepSeek platform balance and credit, or bring an API key, and **you pay per unit**. Balance exhaustion prompts; an API key bill just keeps growing. The "already paid for it" comfort is gone.',
              'Peak and off-peak pricing (since 2026-08-17): in Beijing time, **weekday 09:00-12:00 and 14:00-18:00 is peak** at double the off-peak rate - the off-peak price is exactly half. The same job costs twice as much by day.',
              'The built-in web search goes through the official Search and Fetch endpoints, **each billed at CNY 5 per 1,000 successful requests from midnight, 2026-11-01 Beijing time**.',
              'October price sheet (CNY per million tokens): Flash input cache-hit 0.02/0.04, miss 1/2, output 4/8; Pro input hit 0.15/0.30, miss 4.5/9, output 13.5/27 (first value off-peak, second peak).',
            ],
            source: { label: 'DeepSeek 定价页 / DeepSeek Pricing', href: 'https://api-docs.deepseek.com/quick_start/pricing' },
          },
          {
            type: 'table',
            head: [
              { zh: '计费规则', en: 'Billing rule' },
              { zh: '数值', en: 'The number' },
              { zh: '什么时候开始生效', en: 'When it takes effect' },
            ],
            rows: [
              [
                { zh: '峰谷定价（8月17日起改的）', en: 'Peak / off-peak pricing (changed 2026-08-17)' },
                { zh: '高峰 = 其余时段的两倍；低谷价正好是高峰价的一半', en: 'Peak costs double; off-peak is exactly half' },
                { zh: '北京时间工作日上午 9-12、下午 2-6（法定节假日除外）', en: 'Weekdays 09:00-12:00 and 14:00-18:00 Beijing time, public holidays excluded' },
              ],
              [
                { zh: '内置联网搜索', en: 'Built-in web search' },
                { zh: 'Search、Fetch 两个接口各按每千次成功请求 5 元', en: 'Search and Fetch each at CNY 5 per 1,000 successful requests' },
                { zh: '北京时间 11 月 1 日零点起开始收费', en: 'Billing starts midnight 2026-11-01 Beijing time' },
              ],
              [
                { zh: '缓存命中价（Flash）', en: 'Cache-hit unit price (Flash)' },
                { zh: '未命中价的 1/50；输入命中 0.02/0.04 元每百万 token', en: '1/50 of the miss price; input hits 0.02/0.04 CNY per million tokens' },
                { zh: '64 个 token 一个存储单元，不足 64 的不缓存；缓存写入不收费，寿命几小时到几天', en: '64 tokens per storage block, remainders never cached; cache writes are free, lifetime hours to days' },
              ],
              [
                { zh: '缓存命中价（Pro）', en: 'Cache-hit unit price (Pro)' },
                { zh: '现在是未命中的 1/30（8 月是 1/120）', en: 'Now 1/30 of the miss price (it was 1/120 in August)' },
                { zh: '9月10日 V4.1-Flash 上线时下调了 Flash，Pro 不变', en: 'Flash was cut when V4.1-Flash launched on 2026-09-10; Pro stayed the same' },
              ],
              [
                { zh: '默认推理档', en: 'Default reasoning tier' },
                { zh: 'High；8 月那一跑 3,797 个输出 token 里 1,444 个是思考 token（38%）', en: 'High; of 3,797 output tokens in the August run, 1,444 were thinking tokens (38%)' },
                { zh: '思考 token 不显示在界面上，但按输出价计费', en: 'Thinking tokens are not printed in the UI but bill at the output rate' },
              ],
            ],
            note: {
              zh: '换算示例（番茄钟那场，凌晨低谷）：76.9 万命中乘 0.02 元约 1 分 5 厘，1.4 万未命中乘 1 元约 1 分 4 厘，3.4 万输出乘 4 元约 1 毛 3，合计约 0.16 元；高峰价约 0.33 元。',
              en: 'Worked example (the pomodoro run, off-peak): 769k hit tokens at 0.02 CNY is about CNY 0.0105, 14k missed at 1 CNY about 0.0104, 34k output at 4 CNY about 0.13 - roughly CNY 0.16 total, or CNY 0.33 at peak.',
            },
            source: { label: 'DeepSeek 定价页 / DeepSeek Pricing', href: 'https://api-docs.deepseek.com/quick_start/pricing' },
          },
          {
            type: 'checklist',
            title: { zh: '花钱类：八条', en: 'Billing traps: eight' },
            items: [
              { zh: '**现象**：用量明细里没有一个金额，只有 token。／**为什么**：这个产品自己不算钱。／**怎么避**：从会话日志把三个数（命中输入、未命中输入、输出）乘单价相加；现成的算法见[成本计算器](/lab?tab=cost)。', en: '**Symptom**: the usage panel shows not one currency figure, only tokens. **Why**: the product does not do money maths itself. **Avoid it**: multiply the three numbers from the session log (cache-hit input, miss input, output) by unit price and add; the worked calculation is in the [cost calculator](/lab?tab=cost).' },
              { zh: '**现象**：上下文进度条显示 40%，可能实际已经 90%。／**为什么**：那把尺子是「4 个字符 = 1 token」，量英文差不多，**花叔实测中文密度是 1.71 个字符一个 token**。它每次模型回话会带回真实数字校准，但中文长对话里偏差越攒越多。／**怎么避**：中文用户把进度条当乐观下界看，别当余额看。', en: '**Symptom**: the context bar reads 40% when reality is nearer 90%. **Why**: the gauge assumes **4 characters per token**, fine for English, while measured Chinese density on that machine was **1.71 characters per token**. Each model reply recalibrates with the true number, but drift accumulates across a long Chinese conversation. **Avoid it**: treat the bar as an optimistic lower bound, not a balance.' },
              { zh: '**现象**：命令行明确指定跑 flash，日志里写的却是 pro，3 倍差价静默发生。／**为什么**：同一时间另一个窗口开着网页版，在网页上点了一下模型下拉框，那个选择被写进共享的全局设置文件，而这个文件的层级压过命令行参数，命令行上没有任何提示。／**怎么避**：跑之前看一眼那份设置文件，跑完先看日志里的请求上下文。0.2 版把设置改存到每个 profile 自己的插件配置里，这个坑可能已不在，**作者没复测**。', en: '**Symptom**: you pin flash on the command line and the log says pro - a 3x price difference, silently. **Why**: a web UI open in another window wrote a dropdown choice into the shared global settings file, and that file outranks CLI arguments with no hint on the terminal. **Avoid it**: read that settings file before running and the request context in the log afterwards. The 0.2 release moved settings into per-profile plugin config, so this trap may be gone - **not retested**.' },
              { zh: '**现象**：以为缓存命中省 50 倍。／**为什么**：1/50 说的是**单价**，输出 token 不打折；同一跑如果缓存全部失效，成本从 $0.0034 变成 $0.0121，只有 3.55 倍。而且**64 个 token 是一个存储单元，不足 64 的不缓存**，四个命中数全是 64 的整数倍。／**怎么避**：「省 50 倍」这种话不能写；Pro 的命中价现在是未命中的 1/30（8 月是 1/120），别把两个模型的口径混用。', en: '**Symptom**: you assume a cache hit makes things 50x cheaper. **Why**: 1/50 is a **unit price**, and output tokens pay full; if the cache missed entirely the same run went from $0.0034 to $0.0121, i.e. 3.55x. Storage comes in **64-token blocks, so remainders are never cached** - all four hit counts in the trace were exact multiples of 64. **Avoid it**: never write "50x cheaper"; and note Pro\'s hit price is now 1/30 of miss (1/120 in August), so the two models do not share one ratio.' },
              { zh: '**现象**：钱花在输出上，而不是花在给它看的东西上。／**为什么**：番茄钟那一场缓存命中 98%，输出 token 只占总量 4%，却占了账单八成多；默认推理档是 High，8 月那一跑 3,797 个输出 token 里 1,444 个是思考 token（38%），**不打印在界面上但照价收费**。／**怎么避**：想省钱，少让它写长东西比少给它看东西有用；三档 Low/High/Max 里调低能砍掉这部分，但质量影响作者没测。', en: '**Symptom**: the money goes to output, not to what you showed it. **Why**: that pomodoro run hit cache 98%, so output was 4% of tokens yet over 80% of the bill, and the default reasoning tier is High - of 3,797 output tokens in the August run, 1,444 were thinking tokens (38%), **never printed in the UI but billed at full output price**. **Avoid it**: to save, make it write less rather than show it less; dropping from High may cut that share, though the author did not measure the quality cost.' },
              { zh: '**现象**：一个新会话刚开口就先付一万多 token。／**为什么**：入场费。8 月逐项称重：13,838 里 25 件工具说明书 6,510（47.0%）、本机 skill 目录 6,242（45.1%）、系统提示词 844、环境快照 129、协议固定开销 82，**你实际问的那句话 29 个 token（0.2%）**。／**怎么避**：先数自己的抽屉 `ls -d ~/.agents/skills/*/ | wc -l`，这个数字直接决定开机成本；那 57 个 skill 让开机成本从约 7,600 涨到 13,838（+82%），而这场任务真正用到的 skill 是零。', en: '**Symptom**: a brand-new session costs over 13,000 tokens before it answers. **Why**: the entry fee. Weighed block by block in August, of 13,838 tokens: 25 tool descriptions took 6,510 (47.0%), the local skill catalog 6,242 (45.1%), the system prompt 844, the environment snapshot 129, protocol overhead 82, and **your actual question 29 (0.2%)**. **Avoid it**: count your drawer first with `ls -d ~/.agents/skills/*/ | wc -l`, because that number decides your boot cost - those 57 skills lifted it from roughly 7,600 to 13,838 (+82%) in a task that used zero skills.' },
              { zh: '**现象**：入场费不是一次性的。／**为什么**：**每开一个新会话付一次，每派一个子代理付一次**；0.2 版起还多端走了 `~/.agents/AGENTS.md`（作者那份 4,790 个字符，每场照付）。／**怎么避**：别为省一次提问开三个会话；skill 简介控制在短字符内是公摊成本（作者全局规则里就写着新写 skill 简介控制在 200 字符内）。', en: '**Symptom**: the entry fee is not one-off. **Why**: **every new session pays it and every sub-agent pays it**, and since 0.2 the global rules file is also loaded (4,790 characters on that machine, paid every session). **Avoid it**: do not open three sessions to avoid re-asking one; keeping skill descriptions short is a shared cost - the author\'s own global rule caps new skill descriptions at 200 characters for exactly this reason.' },
              { zh: '**现象**：会话中途改一下配置，下一轮账单跳回全价。／**为什么**：缓存吃的是稳定前缀。作者从每个包的 README 必填的 KV Cache effect 一节归纳出三条：不要在会话中途改配置、换人格、开关工具；要贴图就开头贴，别贴到一半；**顺序也算数，工具重排一次，内容一个字没改，缓存照样掉**。／**怎么避**：要改就在新会话开头改。自动压缩那个坑也被同样方式修掉了——摘要请求原本是另发一个请求、用一套专门的摘要系统提示词，等于同一段历史按全价付两次，改法是把它搬到对话尾部。', en: '**Symptom**: you tweak a setting mid-session and the next turn reverts to full price. **Why**: caching feeds on a stable prefix. Three rules the author drew from the mandatory KV Cache effect section of every README: do not change config, persona or tool switches mid-session; attach images at the start, not halfway; and **order counts too - reshuffle the tools and the cache drops without changing a character**. **Avoid it**: make changes at the start of a new session. The same reasoning fixed auto-compaction, whose separate summariser request with its own system prompt paid full price twice for one history; the summary instruction was moved to the tail of the conversation instead.' },
            ],
          },
          {
            type: 'p',
            zh: '最后一个反直觉：**PTC 模式把 25 件工具收成 1 件，并不省钱**。它省的是中间结果的体积，那张工具报关单一个字没省，只是从系统提示词外面搬进了里面——8 月同一任务同批文件的对照跑里，工具说明书从 26,894 字符缩到 897，系统提示词从 4,100 涨到 35,643，首轮输入反而多约 9%（13,842 对 15,040），端到端 21.9 秒对 305.9 秒，输出 token 1,416 对 17,235。小任务上它稳输。完整的机制账在[第 8 章](/chapter/ptc)那组数字里，本章只提醒一句：别拿 §06 那张宽松对照表去算总账（两侧模型和任务都不同）。',
            en: 'One more counter-intuitive item: **collapsing 25 tools into 1 does not save money**. PTC shrinks intermediate results, while the tool declaration loses not a character - it just moves inside the system prompt. In the August same-task, same-files comparison the tool schema went from 26,894 to 897 characters while the system prompt grew from 4,100 to 35,643, first-turn input rose about 9% (13,842 versus 15,040), wall time was 21.9s versus 305.9s, and output tokens 1,416 versus 17,235. On small jobs it reliably loses. The full mechanic is in the chapter 8 numbers; this chapter only warns you not to settle a bill using the loose section 6 table, whose two sides differ in both model and task.',
            source: { label: '橙皮书（花叔）/ Orange Book (Huashu)', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
        ],
      },
      {
        id: 'state-and-approval',
        title: { zh: '状态、审批与遥测：三处最容易记错的', en: 'State, Approval and Telemetry: the Three You Will Misremember' },
        blocks: [
          {
            type: 'checklist',
            title: { zh: '长活与状态：八条', en: 'Long-running work and state: eight' },
            items: [
              { zh: '**现象**：你以为点过一次「允许」以后就不再问。／**为什么**：审批卡片上只有「拒绝」和「允许一次」，**没有「总是允许」，没有记忆规则，没有白名单**；同一条命令下次来还会问。／**怎么避**：把重复的越界操作看成设计信号——要么改工作区边界，要么换权限档位，别指望它学会。', en: '**Symptom**: you assume one click of Allow means never again. **Why**: the card offers only Reject and Allow once - **no Always allow, no remembered rules, no whitelist** - and the same command asks again next time. **Avoid it**: treat repeated escalations as a design signal: widen the workspace boundary or change the tier rather than expecting it to learn.' },
              { zh: '**现象**：自动化脚本里所有需要审批的操作直接失败。／**为什么**：**没人应答等于拒绝**——应答的人不在、抛异常、返回词表之外的值，全部归成「不可用」，不可用一律按拒绝处理。／**怎么避**：需要放行的路径要么预先设计成不需要升权，要么接受失败；四个结局的文案各不相同（拒绝、审批被取消、没有可用的审批通道、没有可用的审批服务），就是让模型知道该改方案还是该放弃。', en: '**Symptom**: every approval-requiring operation fails inside automation. **Why**: **no response equals refusal** - an absent approver, a thrown exception or a value outside the word list are all classed unavailable, and unavailable is always refused. **Avoid it**: either design those paths to need no escalation or accept the failure. The four outcomes carry four different wordings (rejected, cancelled, no approval channel available, no approval service available) precisely so the model knows whether to change plan or give up.' },
              { zh: '**现象**：想「先申请一个宽权限放着以后用」。／**为什么**：这条梯子有三道闸：只能升不能平移且必须严格更宽；仅可查看是地板，没有任何东西能往下升到它；重试只有一次且必须在同一轮里，**升权从不投机**。／**怎么避**：一次一次问，认了这个设计。', en: '**Symptom**: you want to acquire a wide permission now and bank it for later. **Why**: the ladder has three gates - escalation only, never sideways, and only to a strictly wider tier; read-only is a floor nothing can be lowered to; and retry happens once, within the same turn, because **escalation is never speculative**. **Avoid it**: ask one operation at a time and accept the design.' },
              { zh: '**现象**：agent 一次工具都不试，直接在回答里跟你解释「我没有权限」。／**为什么**：官方最早把沙箱模式写进固定的系统提示词，每个请求都带一句「Bash 命令跑在只读文件沙箱下」；线上数据把这个直觉打碎了——第一次人工会话的 12 轮里，有 5 轮以零次工具调用结束。他们叫它**软性封锁**：沙箱本来只该拦住越界的动作，结果把模型的尝试意愿一起拦掉了。这条被写进被拒方案清单，理由一栏是「先发货了，然后基于线上证据移除」。／**怎么避**：他们换来的原则可以抄给任何给 AI 立规矩的场合——**不要在开头劝退，要在撞墙时给梯子**；它要是拿权限当理由拒绝尝试，明确要求它先正常试一次，再按拒绝提示里的升权路径走。见[权限边界](/chapter/permissions)。', en: '**Symptom**: the agent attempts zero tool calls and instead explains in its reply that it lacks permission. **Why**: the team originally wrote the sandbox mode into the fixed system prompt, so every request carried "Bash commands run under a read-only file sandbox". Live data shattered that intuition - in the first human session, 5 of 12 turns ended with zero tool calls. They called it **soft blocking**: the sandbox was meant to stop only out-of-bounds actions, but it suppressed the model\'s willingness to attempt along with them. The decision sits in the rejected-proposal list, reason column: "shipped it, then removed it on production evidence". **Avoid it**: the principle they swapped in transfers to any setting where you write rules for an AI - **do not discourage at the start, hand a ladder when it hits the wall**; if your agent refuses to try citing permissions, tell it to attempt the tool normally first and then follow the denial-and-escalation path in the prompt. See [permission boundaries](/chapter/permissions).' },
              { zh: '**现象**：合上电脑一晚上，回来发现目标已经跑了一夜。／**为什么**：不会。目标的「激活」开关**故意不写进持久记录**，重新打开一个会话它自己永远不开始干目标里的活，要继续你得亲口再说一次。／**怎么避**：把它当保险而不是 bug；反过来说，你依赖它自己接着干的时候，一定要显式再唤醒。', en: '**Symptom**: you close the lid overnight expecting the goal to keep working. **Why**: it will not - the activation switch is **deliberately not persisted**, so reopening a session never auto-starts the goal, and continuing takes you saying so again. **Avoid it**: treat this as a fuse, not a bug; conversely, when you do depend on it resuming, explicitly wake it.' },
              { zh: '**现象**：标准模式工具清单里找不到 Ralph 循环。／**为什么**：0.1.7-rc.1 起它**默认不再启用**，要用得自己在配置里打开。轮数上限也有两个数：8 月出厂标准模式设的是 64，而包本身的默认值是 256——别把包的默认值当成产品的实际值。／**怎么避**：读任何上限前先分清「包默认」和「出厂配置」。', en: '**Symptom**: the Ralph loop is missing from the standard tool manifest. **Why**: since 0.1.7-rc.1 it is **not enabled by default** and must be switched on in config. The turn cap comes in two numbers: the shipped standard mode used 64 while the package default is 256 - do not read a package default as the product value. **Avoid it**: separate "package default" from "shipped config" before trusting any limit.' },
              { zh: '**现象**：8 月它给自己造的那只「手」，一次重启就没了。／**为什么**：动态生成的插件只活在进程内存里，不创建文件、不装包、不改配置、不能跨重启存活，也无法被自动提升为正式插件。10 月这条路换成了插件管理器加审批卡片（每装一次点一次）。／**怎么避**：两次实测的完整过程在[第 7 章](/chapter/creator-mode)；要长期留着就走正式插件安装；顺带记住插件冲突规矩（[第 11 章](/chapter/plugin-conflicts)）——同一位置只站一个，第二个当场抛错并点名先到者，**想换实现去改配置里那一行，不是再装一个**。', en: '**Symptom**: the hand the August build grew for itself died on the first restart. **Why**: dynamically generated plugins exist only in process memory - no files, no installs, no config changes, no survival across restart, and no automatic promotion to a real plugin. October replaced this with the plugin manager plus an approval card, one click per install. **Avoid it**: install properly for persistence - the two live runs are in [chapter 7](/chapter/creator-mode) - and remember the conflict rule, worked out in [chapter 11](/chapter/plugin-conflicts): one occupant per slot, the second throws immediately naming the first, and **changing an implementation means editing that one config line, not stacking another plugin**.' },
              { zh: '**现象**：定时任务建完开始按时花钱。／**为什么**：最短可以每分钟跑一次；提醒类工具在标准、创造和 PTC 模式里有，**极简模式和子代理里没有**；桌面端关了窗口任务照样在后台跑。作者自己没建任何一个，理由是一条定时任务建了就是真的会按时跑、按时花钱。／**怎么避**：先在一个隔离的 `DSH_HOME` 里试，或者给它一个明确会停的轮数上限。', en: '**Symptom**: a scheduled task starts spending on the clock. **Why**: the shortest interval is every minute; reminder tools exist in standard, creator and PTC modes but **not in minimal mode or sub-agents**, and the desktop build keeps running after the window closes. The author created none at all, on the grounds that a created schedule really does run and really does cost. **Avoid it**: try one under an isolated `DSH_HOME` first, or give it an explicit stop condition.' },
            ],
          },
          {
            type: 'code',
            lang: 'text',
            title: '撞墙那一刻，模型逐字收到的两行（工作区内修改档）',
            code: `[sandbox: file access denied under workspace-write mode]
[sandbox: escalation available — retry this exact operation once with sandbox_permissions
(the narrowest wider mode that suffices) + justification; the approval prompt asks the user]`,
            note: {
              zh: '第一行说「你被拒了，当前是 workspace-write 这一档」。第二行是梯子：带上要升到的最窄更宽档（sandbox_permissions）和一句理由，原样重试一次，审批卡片会弹到人面前。10月实测的标准模式系统提示词里一个字沙箱字样都没有——策略是作为单独的运行时上下文发进去的，原文开头是 Current DSH file policy: workspace-write.。',
              en: 'Line one says "you were denied, current tier is workspace-write". Line two is the ladder: retry this exact operation once with the narrowest wider mode (sandbox_permissions) plus a justification, and the approval prompt surfaces to the human. In the October measurement the standard-mode system prompt contains not one occurrence of the word sandbox - the policy ships as a separate runtime context whose text opens with Current DSH file policy: workspace-write.',
            },
          },
          {
            type: 'code',
            lang: 'bash',
            title: '遥测：开关在哪、什么关不掉',
            code: `# Settings -> General, at the very bottom:
#   "Upload Session Log when using the official model API, to improve DeepSeek models and products"
#   Fresh installs ship this SWITCHED ON.

rm ~/.dsh/.anonymous-user-id     # delete this and the next start regenerates a new anonymous id

# What leaves the machine while the switch is on (per the official doc list):
#   system prompt, the conversation, tool arguments, tool results
#   -> i.e. the contents of files you let it read, plus your global rules
# The API key is NOT in that list.`,
            note: {
              zh: '那串匿名 UUID 在启动时就生成本机文件（作者在自己还没打开浏览器前就看到了），之后**随每一次发往 DeepSeek 的请求走**，10 月的模块说明仍写着它不受遥测设置影响——上传那个开关能关，它关不掉，它只是一个编号。',
              en: 'The anonymous UUID is generated on disk at start-up (present before the author even opened a browser) and then **travels with every request to DeepSeek**; October module docs still state it is unaffected by the telemetry switch. The upload switch can be turned off; this one cannot - it is only a number.',
            },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '这套权限词汇只管文件，不管网络', en: 'This permission vocabulary governs files, never the network' },
            zh: '官方文档明写：沙箱拦得住「改你的文件」，拦不住「往外发请求」。而且三个平台是三套机制——macOS 用系统自带的 `sandbox-exec`（一个被苹果标记为已弃用的工具，他们的对策是加探测，哪天真没了就拒绝执行）、Linux 优先 bubblewrap 否则退到内核 Landlock、Windows 用受限令牌；**它不用 seccomp**（全仓提到 seccomp 只有两处，都在一篇被否决的笔记里）。三套共同的性质是「自己焊死的门」：限制记在内核里，进程自己也收不回，被完全攻陷也只能在圈里活动。但还有两个诚实的空白：它有一档叫「部分执法」（旧内核、Windows 的一些边界情况会落到这档，它会告诉你，够不够用你自己判断）；网络完全不在管辖范围内。别把「它在沙箱里跑」当成「它出不了这台机器」。',
            en: 'The official docs say it plainly: the sandbox stops "modify your files", not "send requests out". The three platforms use three different mechanisms - macOS uses the system `sandbox-exec` (a tool Apple has marked deprecated, so the team added a probe and refuses to execute if it disappears), Linux prefers bubblewrap and falls back to kernel Landlock, and Windows uses restricted tokens. **It does not use seccomp**; only two mentions exist repo-wide, both inside a rejected note. What all three share is a self-welded door: the constraint is recorded in the kernel and the process cannot take it back, so even fully compromised code stays inside the circle. Two honest gaps remain: there is a partial-enforcement tier (older kernels and some Windows edge cases land there - it tells you, and whether that suffices is your judgement), and the network is entirely outside this vocabulary. Never read "it runs sandboxed" as "it cannot leave this machine".',
          },
          {
            type: 'callout',
            tone: 'tip',
            title: { zh: '计划模式拦不住东西，子代理也不会替你验收', en: 'Plan mode blocks nothing, and a sub-agent will not verify for you' },
            zh: '文档写得很直白：计划模式只是软性指引，真正的限制来自沙箱和审批策略，两边互不读写对方状态；进了计划模式工具清单一个字都不变，只在提示里加一句「现在别用」——原因是藏起来会改变提示词开头，把已经暖起来的缓存打掉。另一条：派出去的儿子代理拿不到父会话的对话和人格，它的汇报说明书原话是**「你把活干完了」本身并不是一个结果**；默认只往下派一层、同时最多留 8 个子代理（设置→插件里的「子智能体」能改）。',
            en: 'The docs are blunt: plan mode is soft guidance only, real limits come from the sandbox and the approval policy, and neither reads the other\'s state. Entering plan mode leaves the tool list untouched and merely adds "do not use them now" to the prompt - because hiding tools would change the prompt prefix and flush a warm cache. Related: a dispatched sub-agent receives neither the parent conversation nor its persona, and its report instruction states outright that **"you finished the job" is not itself a result**. By default delegation goes one level deep with at most 8 concurrent sub-agents, editable under Settings -> plugins -> sub-agents.',
          },
        ],
      },
      {
        id: 'preflight',
        title: { zh: '装完第一天，先跑这十五分钟', en: 'Day One: Spend These Fifteen Minutes' },
        blocks: [
          {
            type: 'checklist',
            title: { zh: '开箱预检：十项', en: 'Pre-flight: ten checks' },
            items: [
              { zh: '`node -v` 是不是 22.19+ 或 24+（npm 包不会替你拦）。', en: 'Is `node -v` 22.19+ or 24+ (the npm package will not stop an old one for you).' },
              { zh: '去设置→通用设置最底下，把「上传 Session Log」关掉；确认你记住了那串匿名 UUID 关不掉。', en: 'Turn off Upload Session Log at the bottom of Settings -> General, and accept that the anonymous UUID cannot be turned off.' },
              { zh: '第一句话就打「把你现在能调用的技能全部列出来，一行一个」，和 `ls -d ~/.agents/skills/*/ | wc -l` 对数；对不上就是 skill 名字字段写错被静默作废。', en: 'As your first message, ask it to list every skill it can invoke, one per line, and diff against `ls -d ~/.agents/skills/*/ | wc -l`; a mismatch means silently voided skill names.' },
              { zh: '用三份规则文件埋暗号，验一遍它到底读了哪几份、是不是重复塞了。', en: 'Bury passphrases in three rule files and confirm which ones it actually read and whether duplicates got injected.' },
              { zh: '确认 `~/.dsh/` 里的凭据文件权限是仅自己可读，并当场决定这台机器上放不放生产密钥。', en: 'Confirm the credential file under `~/.dsh/` is owner-read-only and decide right now whether production keys live on this machine.' },
              { zh: '跑一句最普通的话，然后 `zstd -dc ~/.dsh/sessions/*/session-*/session.v4.jsonl.zstd | head` 看日志；确认它是压缩不是加密，你现在就能读到模型读过的东西。', en: 'Run one trivial sentence, then `zstd -dc ~/.dsh/sessions/*/session-*/session.v4.jsonl.zstd | head`. Confirm it is compressed, not encrypted - you can read what the model read.' },
              { zh: '看一眼 `~/.dsh/sessions/` 的总量，决定你的清理周期（它没有任何自动保留策略）。', en: 'Check the size of `~/.dsh/sessions/` and set your own cleanup cadence - there is no retention policy at all.' },
              { zh: '如果要用钩子：写一条只拦 `bash`（全小写）的规则，跑一句 shell 任务确认真被拦住。拦不住时它一句报错都不会给你。', en: 'For hooks: write one rule blocking lowercase `bash`, run a shell task and confirm it really stopped. If it does not stop you, it will not say so.' },
              { zh: '如果要用 MCP：记住默认一台都不挂、它不读你任何现成配置文件；资源和提示模板别指望（0.2 补上了读资源，提示模板始终不支持），启动超时默认 60 秒会拖慢整个启动。', en: 'For MCP: nothing is mounted by default and it reads none of your existing config files; do not count on prompts (0.2 added reading resources, prompt templates remain unsupported), and the 60-second startup timeout will slow the whole boot.' },
              { zh: '在隔离目录做一次试验再动真机器：`DSH_HOME=/tmp/dsh-test npx @deepseek-ai/dsh --profile headless "你的任务"`。', en: 'Trial-run in an isolated home before touching the real machine: `DSH_HOME=/tmp/dsh-test npx @deepseek-ai/dsh --profile headless "your task"`.' },
            ],
          },
          {
            type: 'links',
            title: { zh: '接着读', en: 'Read next' },
            items: [
              { label: { zh: '四次事故复盘', en: 'The four postmortems' }, href: '/chapter/postmortems', desc: { zh: '这些坑在源头是怎么被写下来的', en: 'How these traps got written down at the source' }, tag: '13' },
              { label: { zh: '它在赌什么，代价是什么', en: 'What It Is Betting, and What That Costs' }, href: '/chapter/bets', desc: { zh: '坑的背面是四个选择', en: 'Behind every trap sits one of four choices' }, tag: '15' },
              { label: { zh: '发布门禁', en: 'Release Gates' }, href: '/gates', desc: { zh: '哪些坑是被门禁机械拦住的', en: 'Which traps a gate mechanically blocks' } },
              { label: { zh: '错误博物馆', en: 'Error Museum' }, href: '/errors', desc: { zh: 'MALFORMED_RESPONSE、密钥、审批四类原文', en: 'MALFORMED_RESPONSE, credential and approval strings' } },
              { label: { zh: '成本计算器', en: 'Cost Calculator' }, href: '/lab?tab=cost', desc: { zh: '把三个 token 数换成钱', en: 'Turn the three token counts into money' } },
              { label: { zh: 'DeepSeek 定价页 / DeepSeek Pricing', en: 'DeepSeek Pricing' }, href: 'https://api-docs.deepseek.com/quick_start/pricing', desc: { zh: '峰谷单价与缓存命中价', en: 'Peak, off-peak and cache-hit unit prices' }, tag: 'external' },
              { label: { zh: 'MCP 规范', en: 'MCP Specification' }, href: 'https://modelcontextprotocol.io/', desc: { zh: '工具、资源、提示模板三类能力', en: 'The three capability classes: tools, resources, prompts' }, tag: 'external' },
            ],
          },
        ],
      },
    ],
    sources: [
      { label: '橙皮书（花叔）/ Orange Book (Huashu)', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
      { label: 'DeepSeek 定价页 / DeepSeek Pricing', href: 'https://api-docs.deepseek.com/quick_start/pricing' },
      { label: 'deepseek-harness on npm', href: 'https://www.npmjs.com/package/deepseek-harness' },
      { label: 'Node.js 下载 / Node.js Downloads', href: 'https://nodejs.org/en/download' },
      { label: 'MCP 规范 / MCP Specification', href: 'https://modelcontextprotocol.io/' },
    ],
    sisters: ['harness-engineering', 'agent-skillhub-patterns', 'llm-gateway-patterns'],
  },
  {
    slug: 'bets',
    num: '15',
    part: 'production',
    icon: 'scale',
    level: 'production',
    minutes: 14,
    accent: 'violet',
    title: { zh: '它在赌什么，代价是什么', en: 'What It Is Betting, and What That Costs' },
    subtitle: { zh: '四个选择的正面和背面，只写好处的清单是广告', en: 'Four choices, both sides. A list of only benefits is an advert, not a judgement.' },
    promise: {
      zh: '读完你能判断这个还在预览版的东西值不值得你往里投时间，以及哪一半会白学。',
      en: 'You will be able to judge whether a preview-stage thing deserves your hours, and which half of what you learn will be wasted.',
    },
    sections: [
      {
        id: 'how-to-judge',
        title: { zh: '先说下判断的方法', en: 'How the Judgement Is Made' },
        blocks: [
          {
            type: 'p',
            zh: '花叔在这一节不做总结，他下判断。理由很实在：一个还在预览版的东西，值不值得你往里投时间，答案不在功能列表里，在它替你做掉的那几个选择，以及每个选择的背面它扔掉了什么。**只写好处的清单是广告，不是判断。**',
            en: 'This section does not summarise; it renders a verdict. The reasoning is practical: whether a preview-stage product deserves your time is not answered by a feature list but by the choices it made for you, and by what it threw away on the back of each one. **A list of benefits only is advertising, not judgement.**',
            source: { label: '橙皮书（花叔）/ Orange Book (Huashu)', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'p',
            zh: '它的说明文件里有一句全大写的英文：将会有破坏兼容性的变更。这句话的杀伤力不在劝不劝你装，在劝不劝你把它接进日常干活的流程——它劝退的是后者，于是把人锁死在「玩玩」这一档。',
            en: 'Its README carries one sentence in all capitals: breaking changes will happen. The damage is not in whether you install it but in whether you wire it into daily work - it discourages the latter, which locks people into the "just playing" tier.',
          },
          {
            type: 'list',
            zh: [
              '**会白学的那一半**：具体的配置写法、你手捏的那套模式、你写的插件接口。这些三个月内一定会变，它自己都说了会变。',
              '**不会白学的那一半**：它替你做的那几个判断。判断跟版本号无关——你看懂它为什么在这里放弃了 A、保住了 B，这个理解在你评估下一个 agent 产品时照样有效。',
            ],
            en: [
              '**The half that will be wasted**: the exact config syntax, the mode you hand-built, the plugin interfaces you wrote. All of it will change within three months - the project says so itself.',
              '**The half that will not**: the judgements it made for you. Judgements are version-free. Once you see why it dropped A and kept B here, that reading still applies when you size up the next agent product.',
            ],
          },
          {
            type: 'stats',
            items: [
              { value: '25.4万 / 3.08万', label: { zh: 'star / fork', en: 'stars / forks' }, sub: { zh: '仓库首页，10月20日 08:16', en: 'repo home, 2026-10-20 08:16' } },
              { value: '22,395', label: { zh: '提交次数', en: 'commits' }, sub: { zh: '8月是 12,293 次', en: '12,293 in Aug' } },
              { value: '31', label: { zh: '发布过的版本', en: 'published releases' }, sub: { zh: '全部标预发布，没有一个正式版', en: 'all pre-release, not one stable' } },
              { value: '0.2.1-rc.2', label: { zh: '书里最新的实测版本', en: 'newest build actually tested in the book' }, sub: { zh: '仍标着「预览版」', en: 'still labelled preview' } },
            ],
          },
        ],
      },
      {
        id: 'bet-everything-plugin',
        title: { zh: '第一注：一切皆插件', en: 'Bet One: Everything Is a Plugin' },
        blocks: [
          {
            type: 'p',
            zh: '这句口号有多字面？连 agent 的主循环本身，都是配置文件里可以加一行 `disabled: true` 关掉的一项。它自己的说法是：**没有一个特权内核等着你去打补丁**。更有说服力的自证是他们删掉的东西——一个专门的插件格式 `.dsh-plugin`，里面给 skill 和 MCP 留了特殊通道，2026年8月9日全删，理由是 skill 和 MCP 不需要特殊通道，它们就是普通插件，用普通包管理器装就行。删的时候连「留个解析器做迁移」都拒绝了：产品还没发正式版、没有兼容义务，留一个解析器等于让一份已经删掉的约定继续活着。',
            en: 'How literal is the slogan? The agent main loop itself is an entry you can switch off with one `disabled: true` line in a config file. Their own wording: **there is no privileged kernel waiting for you to patch it**. The more convincing proof is what they deleted - a bespoke plugin format, `.dsh-plugin`, which gave skills and MCP special channels, removed wholesale on 2026-08-09 on the grounds that skills and MCP need no special channel: they are ordinary plugins installed by an ordinary package manager. They even refused to leave a parser for migration: no stable release yet means no compatibility obligation, and a leftover parser keeps a deleted convention alive.',
            source: { label: '橙皮书（花叔）/ Orange Book (Huashu)', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'code',
            lang: 'yaml',
            title: '同一份清单里，skill 和主循环是同一种物件',
            code: `- id: skill
  name: '@deepseek-ai/dsh-skill'
- id: skill-badge
  name: '@deepseek-ai/dsh-skill-badge'
  disabled: true            # shipped by default, switched off by default

# two hundred lines further down, same shape, same way to switch off:
- id: agent-loop
  name: '@deepseek-ai/dsh-agent-loop'
- id: llm-deepseek
  name: '@deepseek-ai/dsh-llm-deepseek'`,
            note: {
              zh: '这是 `--dump-default-config` 打出来的出厂清单：10 月 190 行、23 行停用、1,229 行 YAML；8 月是 129 行、25 行停用。想把 skill 整个关掉，就是加一行 disabled: true，跟关掉任何别的零件的手势完全一样。',
              en: 'Straight out of the factory manifest dumped by --dump-default-config: October holds 190 lines, 23 switched off, 1,229 lines of YAML; August held 129 lines with 25 off. Turning the whole skill system off is one disabled: true line - the identical gesture for any other part.',
            },
          },
          {
            type: 'quote',
            zh: '如果拿Coding Agent的标准来说，当前DSH的体验确实不如Claude Code / Codex那么完善。整个项目还很早期，接口一直在变化，插件生态也才刚刚开始，质量肯定是层次不齐的。',
            en: 'Judged as a coding agent, the current DSH experience is genuinely less polished than Claude Code or Codex. The project is still early, the interfaces keep changing, the plugin ecosystem has only just started, and quality is inevitably uneven.',
            cite: { zh: '内测开发者 JY（@jiayuan_jy），2026-08-13 / Internal tester JY', en: 'Internal tester JY (@jiayuan_jy), 2026-08-13' },
            source: { label: 'JY 推文 / JY post', href: 'https://x.com/jiayuan_jy/status/2087911060154314963' },
          },
          {
            type: 'table',
            head: [
              { zh: '赌什么', en: 'What is bet' },
              { zh: '扔掉什么', en: 'What is paid' },
              { zh: '可以指着看的数', en: 'The number you can point at' },
            ],
            rows: [
              [
                { zh: '有人真会来拆、来换、来重装，收益全部押在生态上', en: 'That people really will take it apart, swap parts, reinstall - the payoff is all on the ecosystem' },
                { zh: '当下的体验：接口一直在变，生态质量层次不齐', en: 'Today\'s experience: interfaces keep moving, ecosystem quality is uneven' },
                { zh: 'JY 那句话出自一个提前一个月进仓库、亲手用过的人', en: 'JY\'s line comes from someone who had repo access a month early and used it by hand' },
              ],
              [
                { zh: '口号成立：没有任何特权内核', en: 'The slogan holds: no privileged kernel at all' },
                { zh: '口号和界面之间有一段落差，这是它现在最劝退人的地方', en: 'There is a gap between the slogan and the UI, and it is the single most off-putting thing today' },
                { zh: '8 月：运行时里 133 个插件在转，设置页里能点着改的只有 3 张卡；10 月：清单 190 行，设置页 4 张卡', en: 'August: 133 plugins running in the runtime, 3 clickable cards in Settings; October: 190 manifest rows, 4 cards' },
              ],
              [
                { zh: '门槛压低后会有第三方写插件', en: 'A lower bar will bring third-party plugin authors' },
                { zh: '学习曲线本身：写插件要先懂依赖注入、副作用模型、事件链传递语义、配置校验', en: 'The learning curve: writing a plugin means learning dependency injection, the effect model, event-chain semantics, config validation' },
                { zh: '仓库为这一层配了入门读物、四课教程、五篇接口文档、三层九篇开发指南；打 dsh-plugin 标签的仓库 238 → 476（8月14日凌晨）→ 21,435（10月20日）', en: 'It ships a primer, four tutorials, five API docs and nine dev guides; dsh-plugin tagged repos went 238 to 476 (early 2026-08-14) to 21,435 (2026-10-20)' },
              ],
            ],
            source: { label: '橙皮书（花叔）/ Orange Book (Huashu)', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '第二道代价是版本：地板随时可能被抽走', en: 'The second cost is versioning: the floor can be pulled out' },
            zh: '项目规则里有一整节叫「预发布立场：地基优先于爆炸半径」，开头一句是「第一个正式版发布时删掉本节」。`.dsh-plugin` 那整套被删干净就是这条政策的直接产物。现在写 dsh 插件的人，得有地板随时被抽走的心理准备——所以「别沉淀插件和自定义模式」不是保守建议，是这一注的定价。底层框架 Cordis 的星标同期从八百多涨到 9,264。',
            en: 'The project rules carry a whole section titled "pre-release stance: foundation over blast radius", whose first line reads "delete this section when the first stable release ships". The wholesale removal of `.dsh-plugin` is a direct product of that policy. Anyone writing a plugin today needs the psychological readiness that the floor can be pulled out at any time - so "do not sink assets into plugins or custom modes" is not conservatism, it is the price tag on this bet. Over the same window the underlying framework Cordis went from eight hundred-something stars to 9,264.',
          },
        ],
      },
      {
        id: 'bet-traceable',
        title: { zh: '第二注：每一次运行都有迹可循', en: 'Bet Two: Every Run Leaves a Trace' },
        blocks: [
          {
            type: 'p',
            zh: '一次会话是一条只能往后追加、不能回头改的事件流。其中模型看得见的只是少数几种：你说了什么、它说了什么、工具返回了什么。剩下的模型一个字都读不到，纯粹记给人和审计看。',
            en: 'A session is an append-only event stream that cannot be edited retroactively. Only a few record types are visible to the model: what you said, what it said, what a tool returned. Everything else the model never reads at all - it exists for humans and for audit.',
          },
          {
            type: 'diagram',
            id: 'event-stream',
            caption: {
              zh: '同一份只追加日志，模型那一面是被投影出来的少数几行，其余全部只进硬盘不进上下文——这就是「有迹可循」的物理形状。',
              en: 'One append-only log: the model\'s view is a projected minority of its lines, everything else lands on disk but never in context. That is the physical shape of "every run leaves a trace".',
            },
          },
          {
            type: 'p',
            zh: '为了守住这条规矩，它做过一个很反直觉的取舍。PTC 模式里，模型写的那段代码本来可以跑在一个常驻内核里、变量跨调用存活，又快又省。8 月他们拒绝了，理由是**跨调用的状态不进日志，会破坏「每次请求都是日志的纯函数」这条不变式**。0.2.1-rc.1 起加了一个可选的内存模式，默认仍然是每次全新。',
            en: 'Holding that line forced a counter-intuitive trade. In PTC mode the code the model writes could have run in a persistent kernel, variables surviving across calls - faster and cheaper. In August they refused it, because **state that crosses calls does not enter the log and breaks the invariant that every request is a pure function of the log**. From 0.2.1-rc.1 an optional memory mode was added, and the default is still a fresh state every time.',
          },
          {
            type: 'p',
            zh: '**Anthropic 在自己的代码执行接口里恰恰加了这个特性，两家往相反方向走：一边赌性能，一边赌可重建。**作为对照，Anthropic 文档里同一件事被写成警告——别把那个字段当安全边界，你的客户端仍然要准备好处理模型的直呼。',
            en: '**Anthropic added exactly that capability to its own code-execution interface, so the two went in opposite directions: one betting on performance, the other on rebuildability.** For contrast, Anthropic documents the same thing as a warning - do not treat that field as a security boundary, your client must still handle the model calling directly.',
            source: { label: 'Anthropic 代码执行工具 / Anthropic Code Execution Tool', href: 'https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/code-execution-tool' },
          },
          {
            type: 'list',
            zh: [
              '**扔掉的代价一：磁盘。**8 月仓库里最普通的样本——跑一条 echo 再回一个词——日志里落下 **35 条物理记录**；花叔那句「当前目录下有哪些文件」是 44 行。这就是「有迹可循」的字面价格。',
              '**扔掉的代价二：它不会自己删。**跨工作区恢复会话那篇笔记把话写在明面上：这台机器上每个项目的会话日志都存在同一个目录，而且**本决策不引入任何保留期策略**。翻译过来就是：它不会自己删，硬盘是你的。',
              '**换来的东西**：`Model-visible 等价于 logged` 这条写死的规矩，加上发请求前把真要发出的消息列表和从日志重算出来的消息列表逐项比对（模型、系统提示词、温度、输出上限、工具清单，六项），对不上就抛异常、这次请求发不出去。在绝大多数 agent 产品里，「模型到底看到了什么」是一个没有人能回答的问题；这套日志机制本身在[第 5 章](/chapter/event-sourcing)，在这里它能逐字节复原。',
            ],
            en: [
              '**Cost one: disk.** The most ordinary August sample - run one echo, reply one word - laid down **35 physical log records**; the author\'s "what files are in this directory" sentence produced 44 lines. That is the literal price of traceability.',
              '**Cost two: it never self-deletes.** The cross-workspace resume note says it plainly: on this machine every project\'s session logs land in the same directory, and **this decision introduces no retention policy**. In other words: nothing gets deleted automatically; the disk is yours.',
              '**What you get back**: the hard rule that model-visible equals logged, plus a pre-request comparison of the outbound message list against the list recomputed from the log, item by item across six fields (model, system prompt, temperature, output cap, tools). If they disagree the request throws and is not sent. In most agent products "what exactly did the model see" is unanswerable; here it can be reconstructed byte for byte.',
            ],
          },
        ],
      },
      {
        id: 'bet-skills-mcp',
        title: { zh: '第三注：skill 和 MCP 做成插件', en: 'Bet Three: Skills and MCP as Ordinary Plugins' },
        blocks: [
          {
            type: 'p',
            zh: '这一注最容易被误读，所以先把结论摆出来：**它对花叔是净赚的，对很多人是净亏的。** 他们那张「每项产品功能都映射到一个扩展点」的表，8 月一共 29 行，skill 和 MCP 排在末尾，和界面、持久化并列——也就是说这两样没有任何特殊地位。',
            en: 'This bet is the easiest to misread, so the conclusion goes first: **it is a net gain for the author and a net loss for many people.** On the table mapping every product feature to one extension point - 29 rows in August - skills and MCP sit at the bottom alongside UI and persistence, with no special status at all.',
          },
          {
            type: 'cards',
            items: [
              {
                icon: 'check',
                title: { zh: '净赚：skill 池白捡', en: 'Net win: the skill pool comes free' },
                desc: {
                  zh: '正因为 skill 只是「一个会扫描目录的普通插件」，扫描路径就能做得很宽。本机 `~/.agents/skills` 那一池 skill——8 月 57 个，10 月 74 个——一行没改、一个软链没加，它直接读到了。格式跟 Anthropic 那套完全同构，连驼峰别名都拒绝收，就是为了不出现「猜哪种拼写生效」。',
                  en: 'Because a skill is merely "an ordinary plugin that scans directories", the scan paths can be wide. The local pool under `~/.agents/skills` - 57 in August, 74 in October - was read with not one line changed and not one symlink added. The format is structurally identical to Anthropic\'s, and even camelCase aliases are refused, precisely so nobody has to guess which spelling is live.',
                },
              },
              {
                icon: 'x',
                title: { zh: '净亏：MCP 只桥接工具', en: 'Net loss: MCP bridges tools only' },
                desc: {
                  zh: 'MCP 协议只有工具、资源、提示模板三类动词，DSH 明确不做提示模板（0.2 补上了读资源，提示模板至今不支持），默认一个服务端都不开。理由很硬气：每条服务端启动命令都是 agent 沙箱之外的可信可执行代码——那行命令是拿你本人的权限跑的。挂七八个 MCP 在干活的人，搬过来会掉东西。',
                  en: 'The MCP protocol has three verb classes - tools, resources, prompts. DSH rules prompts out explicitly (0.2 added reading resources; prompt templates are still unsupported) and mounts zero servers by default, on firm grounds: every server command is trusted executable code outside the agent sandbox, launched with your own privileges. If you work with seven or eight MCP servers, moving here loses things.',
                },
              },
            ],
          },
          {
            type: 'code',
            lang: 'yaml',
            title: '接一台 MCP 服务器 = 往清单里加一行',
            code: `- id: mcp-github
  name: '@deepseek-ai/dsh-mcp-client'
  config:
    serverName: github
    transport: stdio
    command: npx
    args: ['-y', '@modelcontextprotocol/server-github']

# one server per row; two servers are two rows (the same package loaded twice
# with different config). Claude Code's single big object holding every server
# cannot be moved over as a block - it has to be written row by row.
# and the factory manifest ships ZERO such rows: nothing is mounted by default.`,
            note: {
              zh: '工具命名规则和 Claude Code 一模一样（`mcp__服务器名__工具名`），负责连接的客户端本身在默认安装里；但把两份实际组装的配置 dump 出来搜服务器，命中数是 0，它也不会去读你任何现成的配置文件（项目里的、Claude 桌面版的），整个源码和文档翻一遍，零命中。',
              en: 'Tool naming is identical to Claude Code (`mcp__server__tool`) and the client itself is in the default install; but dumping both assembled configs returns zero server hits, and it reads none of your existing config files - project-level or Claude desktop - a full source-and-docs search returns zero.',
            },
          },
          {
            type: 'p',
            zh: '再加上搬家那一列藏着的坑：有一批官方包不在默认安装里（8 月 35 个、10 月 48 个），要单独敲命令装，照最直觉的写法还会装到旧版（不加 `@next`）。这其中包括接 Claude Code 钩子的桥、接编辑器的协议、语言服务。所以第三注的真实成本不是格式，是**接线全在你身上**。具体清单见[避坑清单](/chapter/pitfalls)。',
            en: 'Add the migration trap: a batch of official packages sits outside the default install (35 in August, 48 in October), each needing its own install command, and the most intuitive spelling installs a stale build without `@next`. That batch includes the Claude Code hook bridge, the editor protocol, and language services. So the real cost of bet three is not the format but **the wiring being entirely on you**. The itemised list is in [the pitfall checklist](/chapter/pitfalls).',
            source: { label: '橙皮书（花叔）/ Orange Book (Huashu)', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
        ],
      },
      {
        id: 'bet-model-company',
        title: { zh: '第四注：模型公司自己下场做 harness', en: 'Bet Four: a Model Company Building Its Own Harness' },
        blocks: [
          {
            type: 'p',
            zh: '为什么模型公司要亲自做这一层？有个外部数据比任何自述都硬。Composio 在 2026年8月11日做过一次实测：**固定 DeepSeek V4-Flash 这一个模型不变，套 8 个不同的 harness，跑 30 个跨软件的复杂工作流，一共 240 次。通过率从 46.7% 到 66.7%，每次成功的成本相差约 7 倍。**模型一个字没改。花叔留了句交代：这组数（连同另一个常被引用的「便宜 105 倍」）他都没有独立复现，是照着对方公开的方法学读的。',
            en: 'Why would a model company build this layer itself? One external dataset is harder evidence than any self-description. Composio ran a measurement on 2026-08-11: **one fixed model, DeepSeek V4-Flash, wrapped in 8 different harnesses, 30 cross-software complex workflows, 240 runs in total. Pass rate ranged from 46.7% to 66.7%, and the cost per success varied about 7-fold.** Not one character of the model changed. The author adds one caveat: he did not independently reproduce this dataset - nor the often-quoted "105x cheaper" figure - he read them off the published methodologies.',
            source: { label: 'Composio', href: 'https://composio.dev/' },
          },
          {
            type: 'quote',
            zh: '有7个任务，成败只取决于我们用了哪个harness。',
            en: 'On seven tasks, success or failure depended only on which harness we used.',
            cite: { zh: 'Composio 官推 / Composio\'s own post', en: 'Composio\'s own post' },
            source: { label: 'Composio', href: 'https://composio.dev/' },
          },
          {
            type: 'p',
            zh: '把这一层交给别人，等于把「我的模型好不好用」的一半交出去，任务失败时还分不清是模型的锅还是脚手架的锅。四种模式里最不起眼的极简模式就是这条逻辑的证据：只留一个持久命令行、一个读图工具、一个切换工作目录的工具（10 月实测 3 件，系统提示词 225 个字符，标准模式是 5,608），官方说它是给最小环境下的模型基准测试用的。8 月那份设计笔记里连「即使权限全放开，工具参数表里仍会挂着沙箱权限和申请理由两个字段，模型仍然看得见有个沙箱在」都要去掉——**它要去掉的是限制在模型眼里的痕迹**，因为那样测的就不是模型了。',
            en: 'Handing this layer to someone else means handing over half of "is my model usable", and when a task fails you cannot tell model from scaffolding. The least conspicuous of the four modes is the evidence for that logic: minimal mode keeps only a persistent command line, one image reader and one directory switcher (3 tools measured in October, a 225-character system prompt against 5,608 in standard mode), and the official purpose is benchmarking the model in a minimal environment. The August design note even objected that with permissions fully open the tool schema would still carry sandbox-permission and justification fields, so the model would still see a sandbox - **what they removed was the trace of constraint in the model\'s eyes**, because then the score would no longer be the model\'s.',
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '扔掉的是中立性，而且可以指着看', en: 'Neutrality is the price, and you can point at it' },
            zh: '设置里「在使用官方模型 API 时上传 Session Log，帮助改进 DeepSeek 模型与产品」这个开关**出厂就是开的**，位置在设置→通用设置的最底下。还有一个匿名编号：跑起来之后本机会生成一串 UUID，**随每一次发往 DeepSeek 的请求走**，10 月的模块说明仍写着它不受遥测设置影响（想换一个，删掉 `~/.dsh/.anonymous-user-id`，下次启动重新生成）。上传开着的时候，对话、工具参数和工具结果都会上传，也就是你让它读过的文件内容和你的全局规则；API Key 不在里面。不想传就关开关；那个匿名编号关不掉，它只是一个编号。',
            en: 'The Settings switch "Upload Session Log when using the official model API, to improve DeepSeek models and products" **ships switched on**, at the very bottom of Settings -> General. There is also an anonymous identifier: once running, the machine generates a UUID that **travels with every request to DeepSeek**, and October module docs still state it is unaffected by the telemetry setting (to change it, delete `~/.dsh/.anonymous-user-id` and a new one is generated at next start). With upload on, the conversation, tool arguments and tool results all leave - that is, the contents of files you let it read plus your global rules. The API key is not among them. Turn the switch off if you do not want to send; the anonymous id cannot be turned off, it is only a number.',
          },
          {
            type: 'p',
            zh: '还有一处姿态值得记：「我们哪里不行」这件事不是靠自觉，是被门禁强制的。每个包的说明文件必须以一个固定结构结尾，其中有一段叫「已知限制与待办」——缺了合不进去，8 月花叔数到 220 个文件里都有它。**他们把「我们哪里不行」做成了一道通不过就合不进的门禁。**中立性丢在数据流向上，诚实守在文本里。见[发布门禁](/gates)。',
            en: 'One more posture deserves recording: "where we fall short" is not left to goodwill but enforced by a gate. Every package README must end in a fixed structure containing a known limitations and to-do section; without it a change does not merge, and in August the author counted it present in 220 files. **They turned "what we are bad at" into a gate that blocks merges.** Neutrality is spent on the data path; honesty is held on the text path. See the [release gates](/gates).',
          },
        ],
      },
      {
        id: 'price-list',
        title: { zh: '代价清单：坏消息集中放一遍', en: 'The Price List: All Bad News in One Place' },
        blocks: [
          {
            type: 'table',
            head: [
              { zh: '这一条', en: 'The item' },
              { zh: '对你意味着什么', en: 'What it means for you' },
            ],
            rows: [
              [
                { zh: '说明文件里全大写的「将会有破坏兼容性的变更」', en: 'The all-caps "breaking changes will happen" in the README' },
                { zh: '别沉淀插件和自定义模式；skill 可以，那是共用格式，搬得走', en: 'Do not sink assets into plugins or custom modes; skills are fine - shared format, portable' },
              ],
              [
                { zh: '内测开发者亲口说体验不如现成的那几个完善', en: 'The internal tester says outright it is less polished than the incumbents' },
                { zh: '当主力干活会难受，当框架拆着玩正合适', en: 'Painful as a daily driver, ideal as a framework to take apart' },
              ],
              [
                { zh: '插件生态刚开始，质量层次不齐', en: 'The plugin ecosystem has just started and quality is uneven' },
                { zh: '打插件标签的仓库 8月14日凌晨 476 个、10月20日 21,435 个，但打标签不等于是插件（按 star 排第一的那个是逆向工程的命令行工具）', en: 'Tagged repos: 476 on 2026-08-14, 21,435 on 2026-10-20 - but a tag is not a plugin (the top-starred one is a reverse-engineering CLI tool)' },
              ],
              [
                { zh: '文档已经在多处落后于代码', en: 'Documentation already lags the code in several places' },
                { zh: '照文档抄的命令，先自己跑一遍验', en: 'Run every doc-sourced command once yourself before trusting it' },
              ],
              [
                { zh: '会话日志默认上传；匿名编号跟着请求走，不受遥测设置影响', en: 'Session logs upload by default; the anonymous id rides along with every request regardless of the telemetry setting' },
                { zh: '设置里先把上传关掉；涉密项目自己判断', en: 'Switch the upload off first thing; judge for yourself on classified projects' },
              ],
              [
                { zh: '「每一次运行都有迹可循」没有保留期策略', en: 'Traceability comes with no retention policy' },
                { zh: '磁盘是你自己的，清理周期也得你自己排', en: 'The disk is yours and so is the cleanup schedule' },
              ],
            ],
            source: { label: '橙皮书（花叔）/ Orange Book (Huashu)', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'p',
            zh: '"文档落后于代码"这一条，8 月抓到三个现场：创造模式的包说明写「五个模型可见的工具」而运行时实测七个；一个早已改名的工具的旧名还留在喂给模型看的 skill 文件里；三处文档都写随源码带进来的 9 个包「设为私有，从不发布」，而实际上 9 个包里压根没有那个私有字段，**逐个查过，9 个全都发到 npm 上了**。一个每天几百次提交的仓库，文档落后是必然的——花叔自己在 §04 也写反过一次（把「不在安装闭包里」写成「不随产品发布」）。所以这个阶段的任何文档你都不能直接信，包括这本书。',
            en: 'The documentation-lag item had three live scenes in August: the creator-mode package README said five model-visible tools while the runtime held seven; an old name of a long-renamed tool still sat in a skill file fed to the model; and three separate docs described the nine vendored source-carried packages as private and never published, when none of the nine had the private field and **every one of them is on npm**. In a repository with hundreds of commits a day, docs lagging is inevitable - the author got one backwards himself (reading "outside the install closure" as "not published"). At this stage no documentation can be taken at face value, including this book.',
            source: { label: 'deepseek-harness on npm', href: 'https://www.npmjs.com/package/deepseek-harness' },
          },
          {
            type: 'quote',
            zh: '在还没有任何第三方来实现它的时候，一个单独的接口包看起来就像是提前抽象。',
            en: 'While no third party has implemented it yet, a separate interface package just looks like premature abstraction.',
            cite: { zh: '存储后端接口包提案的诊断段 / Diagnosis in the storage-backend interface package proposal', en: 'Diagnosis in the storage-backend interface package proposal' },
          },
          {
            type: 'p',
            zh: '他们认真考虑过把「会话怎么存」那个接口包折回主包里。否决的理由不是「你说得不对」，而是笔记里那句原话：如果第三方的存储后端已经是一个公共生态，这个独立接口包就是更干净的边界；发布前它才像多余的。**他们承认这是一个赌注，然后赌了。**同一批被否决的记录里还有一条关于压缩的定义包与实现包是否合并——2026年7月19日提的合并建议被一句「更多压缩后端已经在路线图上」否掉。那个目录 8 月有 11 篇，10 月是 8 篇，规矩是一条被否的记录只在它还能拦住一个诱人的错误时才保留。',
            en: 'They seriously considered folding the session-storage interface package back into the main package. The rejection did not say "you are wrong"; the note reads: if third-party storage backends were already a public ecosystem, the standalone interface package would be the cleaner boundary - before release it merely looks redundant. **They admitted it was a bet, and then placed it.** Another entry in the same rejected batch asks whether the compaction definition package and its single implementation package should merge; the 2026-07-19 suggestion was killed by one line - more compaction backends are on the roadmap. That directory held 11 records in August and 8 in October, under the rule that a rejection is kept only while it still blocks a tempting mistake.',
          },
        ],
      },
      {
        id: 'who-for',
        title: { zh: '谁该来，谁别来，以及那只手的答案', en: 'Who Should Come, Who Should Not, and the Answer About the Hand' },
        blocks: [
          {
            type: 'list',
            zh: [
              '**适合一**：想搞明白 agent 底下到底怎么转的。在花叔见过的开源实现里，它是唯一一个把完整答案摊开、还配了一千多篇设计笔记的。',
              '**适合二**：要做插件、做工具、做界面的。生态刚起来，插件页和「让 Agent 创建插件」把门槛又拉低了一截。',
              '**适合三**：像我这样攒了一堆 skill 资产、想找个不用搬家就能试的新窝的。',
              '**不适合一**：要多租户、要并发、要按会话给客户计费的——现在没这东西。',
              '**不适合二**：只想找个更顺手的编码助手、不想折腾的——别来。虽然 0.2 版有了桌面端，它仍然标着预览版。',
            ],
            en: [
              '**Fit one**: you want to understand what actually happens under an agent. Of every open-source implementation the author has seen, this is the only one that lays the full answer out and pairs it with over a thousand design notes.',
              '**Fit two**: you build plugins, tools or interfaces. The ecosystem is brand new, and the plugin page plus "let the agent create a plugin" lowered the bar another notch.',
              '**Fit three**: you have accumulated a pile of skill assets and want a new home where you do not have to move. ',
              '**Not fit one**: you need multi-tenancy, concurrency, or per-session billing for customers - none of that exists today.',
              '**Not fit two**: you just want a smoother coding assistant and no tinkering - stay away. Version 0.2 added a desktop app, but it is still labelled preview.',
            ],
          },
          {
            type: 'callout',
            tone: 'note',
            title: { zh: '8 月我写错的那一条：Python 栈的人别来', en: 'The August line that was wrong: Python people stay away' },
            zh: '那句理由是「它是 TypeScript 生态、没有桥」。**这句写错了。**PyPI 上有官方的 `deepseek-harness-sdk`，2026年8月13日公开当天就已经发了，10 月是 0.2.1rc2，官方文档里有一篇 Python SDK 指南。花叔的交代是：我没用过它，只能告诉你它在那儿。',
            en: 'The August reasoning was "it is a TypeScript ecosystem with no bridge". **That line was wrong.** An official `deepseek-harness-sdk` exists on PyPI, published on launch day 2026-08-13, at 0.2.1rc2 in October, with a Python SDK guide in the official docs. The author\'s own caveat: he has not used it and can only tell you that it is there.',
            source: { label: 'PyPI: deepseek-harness-sdk', href: 'https://pypi.org/project/deepseek-harness-sdk/' },
          },
          {
            type: 'p',
            zh: '8 月写这本书时，§07 结尾他留了半句：**它能给自己长出一只手，但这只手活不过一次重启。**当时的判断是——卡住这一步的不是技术，是那条不变式：一旦允许 agent 写下能改变下次启动的东西，日志就得管到跨会话、管到你硬盘上那个配置目录里去。所以不是做不到，是不敢默认打开。两个月后的答案是：**他们改了，但改的不只是一个默认值。**10 月那套在内存里挂插件的工具默认拿掉了，换成插件管理器。',
            en: 'Writing the book in August, the closing half-sentence of section 7 was: **it can grow itself a hand, but that hand does not survive a restart.** The judgement then was that what blocked it was not technology but the invariant - once an agent may write things that change the next boot, the log has to reach across sessions and into the config directory on your disk. So they were not unable; they dared not ship it on by default. Two months later the answer is: **they changed it, but not just a default.** In October the in-memory plugin mounting tools were removed from the default set and replaced by the plugin manager.',
            source: { label: '橙皮书（花叔）/ Orange Book (Huashu)', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'table',
            head: [
              { zh: '那条不变式管不到的东西', en: 'What the invariant does not cover' },
              { zh: '10 月交给了谁', en: 'Who it was handed to in October' },
              { zh: '那一面答什么', en: 'The question that surface answers' },
            ],
            rows: [
              [
                { zh: '跨会话的改动会不会偷偷改变模型看见的东西', en: 'Whether cross-session changes quietly alter what the model sees' },
                { zh: '会话日志', en: 'The session log' },
                { zh: '这一场里模型看见了什么', en: 'What the model saw in this session' },
              ],
              [
                { zh: '这台机器上的 agent 身上装了什么', en: 'What is installed on the agent on this machine' },
                { zh: '插件页与插件安装记录', en: 'The plugin page and its install records' },
                { zh: '装了什么、谁装的', en: 'What is installed and who installed it' },
              ],
              [
                { zh: '是谁同意这么改的', en: 'Who agreed to the change' },
                { zh: '审批卡片', en: 'The approval card' },
                { zh: '是谁同意的', en: 'Who said yes' },
              ],
            ],
            note: {
              zh: '三样东西各管一段。花叔的评语：这比我 8 月想的那条路慢，也比它稳。',
              en: 'Three surfaces, each owning one segment. The author\'s comment: slower than the road he imagined in August, and steadier than it.',
            },
          },
          {
            type: 'p',
            zh: '最后是作者自己的账：他不会把它换成主力——他的活是写文章、做视频、做产品，主力工具要的是稳，不是可拆。会用它的地方有两个：一是拿它当 skill 生态的第二块试金石，同一套 skill 在两个不同的 harness 上都跑得通，这套东西才算真的活着；二是当素材，因为**它是我见过第一个把「模型到底看到了什么」完整摊给你看的产品**。对一个不写代码的人来说，这本书真正掀掉的是天花板：连主循环都是一行可关的配置，这对写代码的人是架构选择，对他是「原来那一层也可以谈」。',
            en: 'The author\'s own ledger closes it: he is not switching his main tool to it. His work is writing, video and product, and a primary tool must be stable, not take-apart. He keeps two uses for it. One, as a second touchstone for the skill ecosystem - the same skill set running on two different harnesses is the only way to prove it is really alive. Two, as raw material, because **it is the first product he has seen that lays out completely what the model actually saw.** For someone who does not write code, what this book lifts is the ceiling: if even the main loop is one switchable config line, then what is an architectural choice for an engineer is, for him, proof that layer is negotiable too.',
          },
          {
            type: 'links',
            title: { zh: '接着读', en: 'Read next' },
            items: [
              { label: { zh: '四次事故复盘', en: 'The four postmortems' }, href: '/chapter/postmortems', desc: { zh: '这四注的现场代价是怎么被写进仓库的', en: 'How the price of these four bets got written into the repo' }, tag: '13' },
              { label: { zh: '避坑清单：现场记录', en: 'The Pitfall Checklist' }, href: '/chapter/pitfalls', desc: { zh: '每一条坏消息对应的具体坑和验法', en: 'The concrete trap and check behind each piece of bad news' }, tag: '14' },
              { label: { zh: '发布门禁', en: 'Release Gates' }, href: '/gates', desc: { zh: '「已知限制与待办」那一道通不过就合不进的关', en: 'The gate that blocks merges without a limitations section' } },
              { label: { zh: '上游仓库', en: 'Upstream repository' }, href: 'https://github.com/deepseek-ai/DeepSeek-Harness', desc: { zh: 'README 那句全大写声明的原文', en: 'The all-caps disclaimer, in its own words' }, tag: 'github' },
              { label: { zh: 'Claude Code 文档', en: 'Claude Code docs' }, href: 'https://docs.anthropic.com/en/docs/claude-code/overview', desc: { zh: '被拿来当体验基准的那一个', en: 'The experience benchmark everyone is measured against' }, tag: 'external' },
              { label: { zh: 'OpenAI Codex', en: 'OpenAI Codex' }, href: 'https://openai.com/index/introducing-codex/', desc: { zh: '另一个被点名的对照组', en: 'The other named comparison point' }, tag: 'external' },
            ],
          },
        ],
      },
    ],
    sources: [
      { label: '橙皮书（花叔）/ Orange Book (Huashu)', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
      { label: 'Composio', href: 'https://composio.dev/' },
      { label: 'JY 推文 / JY post', href: 'https://x.com/jiayuan_jy/status/2087911060154314963' },
      { label: 'Anthropic 代码执行工具 / Anthropic Code Execution', href: 'https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/code-execution-tool' },
      { label: 'PyPI: deepseek-harness-sdk', href: 'https://pypi.org/project/deepseek-harness-sdk/' },
    ],
    sisters: ['agent-loop-engineering', 'harness-engineering', 'mcp-patterns'],
  },
]


