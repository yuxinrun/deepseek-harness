import type { Chapter } from '../types'

export const startChapters: Chapter[] = [
  {
    slug: 'quickstart',
    num: '01',
    part: 'start',
    icon: 'rocket',
    level: 'starter',
    minutes: 12,
    accent: 'orange',
    title: { zh: '十分钟，让它干成第一件活', en: 'Ten Minutes to Your First Real Task' },
    subtitle: {
      zh: '从零装到跑通番茄钟，中间会撞哪几屏、哪几个坑',
      en: 'From a fresh install to a working pomodoro page — the screens you hit and the traps you fall into.',
    },
    promise: {
      zh: '读完这章你能在自己的电脑上从零装起 dsh、绕开 Node 版本和代理两个坑、把第一个真实任务丢给它跑通，并看懂第一屏会话日志。',
      en: 'You will install dsh from scratch on your own machine, dodge the Node-version and proxy traps, land your first real task, and read what the first session log actually contains.',
    },
    sections: [
      {
        id: 'two-paths',
        title: { zh: '两条路：桌面安装包还是 npx', en: 'Two lanes: desktop installer or npx' },
        blocks: [
          {
            type: 'p',
            zh: '8 月只有一条路：先装 Node.js，再敲一行 npx。0.2 版多了一条——官网 [deepseek.com/harness](https://www.deepseek.com/harness) 直接给桌面安装包，macOS（苹果芯片）和 Windows（64 位）各一个。作者用 HEAD 请求量过大小：**Mac 的 dmg 约 265MB，Windows 的 exe 约 289MB**，10 月 17 日更新过；官网写着要 macOS 13 以上，Intel 芯片的 Mac 暂不支持。按官方发布说明，桌面端自带 Node，不用另外装开发工具链，菜单栏里还能一键把 `dsh` 命令装进系统 PATH。',
            en: 'In August there was one lane: install Node.js first, then run npx. Version 0.2 added a desktop installer on [deepseek.com](https://www.deepseek.com/) — a **macOS (Apple silicon) dmg around 265MB** and a **Windows (64-bit) exe around 289MB**, updated on 10-17. The site requires macOS 13 or newer, and Intel Macs are not supported. Per the official release notes the desktop app bundles its own Node runtime, so you need no separate dev toolchain, and a menu-bar item can drop the `dsh` command onto your PATH.',
            source: { label: 'DeepSeek 官网 / DeepSeek', href: 'https://www.deepseek.com/' },
          },
          {
            type: 'p',
            zh: '**但这一章后面每一屏，都来自 npx 拉起来的网页版。** 桌面版长什么样、首次引导怎么走、关窗后是不是真在后台跑，橙皮书作者没实测，本书也不替他猜。不想碰终端的读者，作者建议直接下桌面版；下面这条 npx 的路，留给已经装了 Node.js、或者想把它放进脚本里跑的人。',
            en: '**Every screen in the rest of this chapter comes from the web version launched by npx.** What the desktop app looks like, how its first-run wizard flows, and whether tasks truly keep running after you close the window were never tested by the orange-book author, so this guide will not guess on his behalf. If you would rather not touch a terminal, download the desktop build; the npx path below is for people who already have Node.js or want to run dsh from a script.',
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '预览版：功能会变，别当正式版用', en: 'Preview build: things still move' },
            zh: '浏览器打开的第一屏就写着「**DeepSeek Harness 目前的 0.2 版本仍处于预览阶段**」，「产品功能以及插件 API 都会继续快速迭代」。到 10 月 20 日，仓库 star 25.4 万、fork 三万出头、提交从 8 月的 12,293 次涨到 22,395 次，两个多月发了 31 个版本，**到今天没有一个是正式版**，最新的 0.2.1-rc.2 仍标着「预览版」。本章所有数字默认是 10 月的 0.2.1-rc.2 快照；凡是 8 月公开时的数，都单独写明「8 月」。',
            en: 'The first browser screen already says **DeepSeek Harness 0.2 is still in preview** and that the product features and plugin API will keep iterating fast. On 10-20 the repo sat at 254K stars, just over 30K forks, and 22,395 commits (up from 12,293 in August); over two months it shipped 31 releases and **not one is a stable release** — the newest, 0.2.1-rc.2, is still labelled preview. Every number here is the October 0.2.1-rc.2 snapshot; anything measured back in the August launch is marked explicitly as August.',
            source: { label: 'DeepSeek-Harness 仓库 / Upstream Repo', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
          },
        ],
      },
      {
        id: 'npx-three-traps',
        title: { zh: 'npx 的三个坎', en: 'The three traps in one npx line' },
        blocks: [
          {
            type: 'p',
            zh: '官方那句「在已安装 Node.js 开发工具链的系统中，可以使用 npx 命令快速启动」，一句话里塞了三个坎。Node.js 你可以当成一个底座，装完电脑就能跑某一类程序，桌面上看不到任何图标；npx 是 Node.js 自带的一条命令。先把终端打开：**Mac 上按 Command 加空格、输入「终端」回车；Windows 上开始菜单搜「终端」**。然后确认有没有 Node：',
            en: 'The official line — "on systems with the Node.js toolchain installed you can launch quickly with npx" — stuffs three traps into one sentence. Think of Node.js as a base runtime: once it is installed your machine can run a whole class of programs, but there is no icon on your desktop. `npx` is a command that ships with Node.js. Open a terminal first: **on a Mac press Command + Space, type Terminal and hit Enter; on Windows search the Start menu for Terminal.** Then check whether Node is present:',
          },
          {
            type: 'code',
            lang: 'bash',
            title: '先确认有没有 Node',
            code: 'node -v',
            note: {
              zh: '回你一个 v 开头的版本号就是有；回你 `command not found`，去 [nodejs.org](https://nodejs.org/en/download) 下安装包。',
              en: 'A version string starting with v means it is installed; a `command not found` means grab an installer from [nodejs.org](https://nodejs.org/en/download).',
            },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: 'README 不锁 Node 版本，安装器也不拦', en: 'Neither README nor the installer pins Node' },
            zh: '**README 只说装 Node.js，没写版本。** 仓库根目录写的是 22.19 以上或 24 以上，但发到 npm 上的 dsh 包**没带这个门槛**——安装器不会替你拦住一个太老的版本。作者这台是 v26，跑通了。换句话说，你装到一个 18 或 20 的老 Node，安装照样通过，报错留到运行时才炸。别指望 npx 帮你把关。',
            en: '**The README only says "install Node.js" and never names a version.** The repo root requires 22.19+ or 24+, but the dsh package published to npm **does not carry that constraint** — the installer will not stop you on a too-old Node. The author ran it on v26 without issues. Practically: install on Node 18 or 20 and setup still succeeds; the failure surfaces only at runtime. Do not expect npx to police this for you.',
            source: { label: 'Node.js 下载 / Node.js', href: 'https://nodejs.org/en/download' },
          },
          {
            type: 'p',
            zh: '然后是那一行启动命令：',
            en: 'Then the launch command itself:',
          },
          {
            type: 'code',
            lang: 'bash',
            title: '第一次启动（npx 网页版）',
            code: 'npx @deepseek-ai/dsh web',
            note: {
              zh: '第一次敲，它要下载。加 `--no-open` 可以不让它弹浏览器。',
              en: 'The first run downloads the package. Add `--no-open` to keep the browser from launching.',
            },
          },
          {
            type: 'p',
            zh: '第一次运行就是**第二道坎**：作者在清空了的 npm 缓存上计了时，**2 分 45 秒才打出网址**，前面两分半屏幕上只有一个转圈的符号，没有百分比、没有大小、没有任何进度。8 月有 Windows 用户在讨论区报过第一次跑了 **8 分多钟毫无反馈**（讨论帖 #176），到 10 月这个帖子还开着，进度条也还没有。**别以为它卡了，它在下。**',
            en: 'The first run is the **second trap**: timed on an emptied npm cache it took **2 minutes 45 seconds to print a URL**. For the previous two and a half minutes the screen showed only a spinner — no percentage, no size, no progress of any kind. In August a Windows user reported the first launch running **more than 8 minutes with no feedback** (discussion thread #176); as of October that thread is still open and the progress bar still has not arrived. **Do not assume it hung — it is downloading.**',
          },
          {
            type: 'p',
            zh: '下载量多大？npm 缓存涨了 **257MB**，解出来的安装目录占 **844MB**，是 8 月那次的 **2.5 倍**。多出来的主要是一个随包带的 LibreOffice 组件，用来在侧栏里预览 Word、Excel、PPT。想自己称：',
            en: 'How big is the download? The npm cache grew by **257MB** and the unpacked install directory occupies **844MB** — **2.5 times** the August footprint. Most of the extra is a bundled LibreOffice component used to preview Word, Excel and PPT in the sidebar. To measure it yourself:',
          },
          {
            type: 'code',
            lang: 'bash',
            title: '称一下 npx 缓存体积',
            code: 'du -sh ~/.npm/_npx/*/node_modules',
          },
          {
            type: 'callout',
            tone: 'tip',
            title: { zh: '第三道坎：npx 按命令原文缓存', en: 'Third trap: npx caches by the exact command string' },
            zh: '打出网址之后它会**自动用默认浏览器打开**（8 月版不会，你得自己复制地址）。不想弹浏览器，加 `--no-open`；通过 SSH 远程启动时它只打印地址不弹。`127.0.0.1` 就是「这台电脑自己」，可以放心打开。一个只有量过才知道的浪费：**npx 按命令原文缓存**——8 月作者三次敲的写法不同（加不加 `@latest`、加不加版本号），本机就躺了三份一模一样的安装包，合计约 1GB。想每次都用同一份，就固定用同一行命令；**想卸干净，光删 `~/.dsh` 不够，`~/.npm/_npx/` 里那几份也得删。**',
            en: 'After printing the URL it **opens your default browser automatically** (the August build did not — you had to copy the address yourself). Suppress it with `--no-open`; over SSH it prints the address without launching anything, and `127.0.0.1` simply means this machine, safe to open. The third trap is one you only find by measuring: **npx caches by the verbatim command string.** In August the author ran three different spellings (with and without `@latest`, with and without a version) and ended up with three identical install packages on disk, roughly 1GB combined. Reuse one copy by always running the same line — and to uninstall cleanly, deleting `~/.dsh` alone is **not** enough, you also have to clear `~/.npm/_npx/`.',
          },
        ],
      },
      {
        id: 'first-screen',
        title: { zh: '第一屏：两个入口和默认工作区', en: 'First screen: two entry points and the default workspace' },
        blocks: [
          {
            type: 'steps',
            items: [
              {
                title: { zh: '预览版说明', en: 'Preview notice' },
                desc: {
                  zh: '浏览器一开先弹「预览版说明」：「DeepSeek Harness 目前的 0.2 版本仍处于预览阶段……现在，新的桌面端面向广泛用户，开发者相关的进阶功能可在配置中开启使用。」底下一个「继续」。这一屏跟着浏览器语言走，浏览器是英文就整屏英文。',
                  en: 'The browser opens on the "preview notice": "DeepSeek Harness 0.2 is still in preview... the new desktop build is now aimed at a general audience; developer-oriented advanced features can be enabled in settings." A single "Continue" button below. This screen follows your browser language — English browser, English screen.',
                },
              },
              {
                title: { zh: '登录 DeepSeek 账号，或添加 API Key', en: 'Sign in, or add an API key' },
                desc: {
                  zh: '点继续，第二个弹窗叫「开始使用」：「登录 DeepSeek 账号，或添加 API Key，即可开始使用。你的项目和文件保存在本地。」',
                  en: 'Click continue and the second modal, "Get started", appears: "Sign in with a DeepSeek account, or add an API key, to begin. Your projects and files stay on this machine."',
                },
              },
              {
                title: { zh: '两个入口不是一回事', en: 'Two doors, not the same one' },
                desc: {
                  zh: '这里是 8 月很多人卡住的地方，现在多了一条路。「登录」用的是 DeepSeek 平台账号，走账号余额和赠金；「添加 API Key」要去 DeepSeek 开放平台单独申请一把 key，按用量扣钱。**你在 deepseek.com 上聊天的那个身份，和开放平台的 key 仍然不是一回事。**',
                  en: 'This is where many people got stuck in August; now there is a second door. "Sign in" uses your DeepSeek platform account and draws on its balance and grants. "Add API key" means requesting a separate key from the DeepSeek open platform, billed by usage. **Your deepseek.com chat identity is still not the same thing as the open-platform key.**',
                },
              },
              {
                title: { zh: '填 key、保存并继续', en: 'Paste the key, save, continue' },
                desc: {
                  zh: '作者走的是 API Key：点「添加 API Key」，填进去，「保存并继续」。保存之后输入框右下角出现默认模型 **DeepSeek-V4.1-Flash**，旁边一个「1017」的小徽标，推理等级 **High**。点开模型列表，只有两项：V4.1-Flash 1017 和 V4-Pro。',
                  en: 'The author took the API-key path: click "Add API key", paste it, "Save and continue". After saving, the input box shows the default model **DeepSeek-V4.1-Flash** in its bottom-right corner with a small "1017" badge and reasoning level **High**. Open the model list and there are only two entries: V4.1-Flash 1017 and V4-Pro.',
                },
              },
            ],
          },
          {
            type: 'callout',
            tone: 'note',
            title: { zh: '作者没走的那条路', en: 'The path the author did not take' },
            zh: '「我是订阅玩家，各家会员买了一堆，平时几乎不碰 API，这把 key 是为了跑它才去开的；账号登录那条我没点进去试。」所以账号登录到底怎么扣费、有没有免费额度，橙皮书不替你猜，本书也不。',
            en: '"I am a subscription buyer, hoarding memberships across vendors, and I almost never touch raw APIs — I opened this key just to run dsh. I did not click through the account-login path." So how account billing actually deducts, whether there is a free tier — neither the orange book nor this guide will guess for you.',
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '开机弹窗的折中被否', en: 'The first-run popup: compromise rejected' },
            zh: '开机第一屏那个声明弹窗，他们在 8 月公开当天动手删掉过。删除决定写在一篇工程笔记里，理由是「**内部测试的定位表述本身，不应该出现在发布版本里**」；同一篇还否掉了「只删掉其中讲遥测的那段、留着弹窗」的折中方案，判词是：**一个没有实质内容的强制首屏，纯粹是摩擦**。结果同一天他们又把它加回来了，只加回了一个简洁版。到 10 月，那个弹窗换了标题叫「预览版说明」，内容从「面向 Harness 开发者进行测试」改成了「新的桌面端面向广泛用户」。',
            en: 'The team actually deleted this first-run disclaimer popup on the August launch day. The decision was logged in an engineering note: "the positioning statement about internal testing should not appear in a shipped release." The same note rejected the compromise of "drop only the telemetry paragraph, keep the popup", verdict: **a mandatory first screen with no substance is pure friction.** They then added it back the very same day, as a simplified version. By October the popup was renamed to "preview notice", its body shifted from "for testing by harness developers" to "the new desktop build is for a broad audience".',
          },
          {
            type: 'p',
            zh: '8 月版填完 key，输入框是灰的，写着「选择一个工作区开始」。**0.2 版全新安装会自动建一个「默认工作区」和一场空白会话，打开就能打字。** 默认工作区落在哪？',
            en: 'In August, once the key was in, the input box stayed grey and read "select a workspace to begin". **A fresh 0.2 install instead auto-creates a default workspace plus a blank session — type right away.** Where does it land?',
          },
          {
            type: 'code',
            lang: 'text',
            title: '默认工作区路径',
            code: '~/Documents/deepseek-harness/default-workspace',
            note: {
              zh: '作者把 dsh 的数据目录整个指到了一个临时文件夹，它照样在我的「文稿」目录下建了这个文件夹。想换地方：左边栏「工作区」右边的加号，添加你自己的文件夹。',
              en: 'The author pointed dsh\'s data directory at a temp folder — it still created this workspace under Documents. To move it, click the plus button next to "Workspaces" in the left sidebar and add your own folder.',
            },
          },
          {
            type: 'p',
            zh: '工作区不只是一个文件夹，这件事到 0.2 版也没变。一条工作区记录里有一个绝对路径、一个显示名、一本按顺序排的会话账本。围绕它有三处反直觉：',
            en: 'A workspace is not just a folder, and 0.2 did not change that. A workspace record bundles an absolute path, a display name, and an ordered session ledger. Three counterintuitive facts orbit it:',
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'table',
            head: [
              { zh: '你大概会以为', en: 'What you would expect' },
              { zh: '实际是', en: 'What actually happens' },
            ],
            rows: [
              [
                { zh: '工作区就是那条路径', en: 'A workspace is that path' },
                { zh: '它的身份是一个**随机编号**。路径会被系统重写，编号不会变。', en: 'Its identity is a **random ID**. The path gets rewritten by the OS; the ID never changes.' },
              ],
              [
                { zh: '拿个快捷方式指过去，能多登记一个', en: 'A shortcut pointing at it registers a second one' },
                { zh: '判重看的是路径的**真身**，快捷方式会撞成同一条记录。', en: 'Dedup looks at the **real target**; a shortcut collapses onto the same record.' },
              ],
              [
                { zh: '删掉工作区等于删掉里面的东西', en: 'Deleting a workspace deletes its contents' },
                { zh: '文件夹、文件、聊过的记录**全留着**，那些会话跑进「未分组」。', en: 'The folder, the files, the chat history are **all kept**; those sessions move into "Ungrouped".' },
              ],
            ],
            note: {
              zh: '这张表来自 8 月读的**工作区模块说明**，10 月作者没逐条复测。',
              en: 'This table comes from the **workspace module notes** read in August; the author did not re-verify each row in October.',
            },
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
        ],
      },
      {
        id: 'proxy-trap',
        title: { zh: '第一个任务失败了，红字写着 MALFORMED_RESPONSE', en: 'Your first task fails: MALFORMED_RESPONSE in red' },
        blocks: [
          {
            type: 'code',
            lang: 'text',
            title: '会话里只有一行红字',
            code: '本轮运行失败 DeepSeek Messages stream: event precedes message_start\nMALFORMED_RESPONSE',
            note: {
              zh: '报错说的是「模型返回的格式不对」，真正的原因是网络代理。',
              en: 'The message reads "malformed model response", but the actual cause is a network proxy.',
            },
          },
          {
            type: 'p',
            zh: '作者的第一个任务就是这样挂的。**真正的原因跟模型无关**——那台电脑开着代理软件，终端里有 `http_proxy` 这类环境变量，dsh 照着走了代理。日志里看，请求发出去**两秒内服务端就回了成功**，接着读到的流格式不对，就报了这个错；代理为什么把流弄坏了，作者没查。把这几个变量清掉重启，同一个任务一次就过。',
            en: 'That is exactly how the author\'s first task died. **The cause has nothing to do with the model** — that machine ran proxy software, the terminal carried `http_proxy`-style environment variables, and dsh obeyed them. In the logs the request succeeds server-side within two seconds, then the stream arrives in the wrong format and the error fires. Why the proxy corrupted the stream was never investigated. Clear the variables, restart, and the same task passes on the first try.',
          },
          {
            type: 'code',
            lang: 'bash',
            title: '国内读者最省事的做法：启动前清掉代理',
            code: 'unset http_proxy https_proxy all_proxy HTTP_PROXY HTTPS_PROXY ALL_PROXY\nnpx @deepseek-ai/dsh web',
            note: {
              zh: '**看到 MALFORMED_RESPONSE，先想代理。** 在同一个终端里清完再启动。',
              en: '**When you see MALFORMED_RESPONSE, think proxy first.** Clear the variables in the same terminal, then launch.',
            },
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '开着代理软件的读者，大概率撞上这一下', en: 'If you run a proxy, you will very likely hit this' },
            zh: '这个坑**界面上完全不提**。作者 10 月在一个全新目录里把 0.2.1-rc.2 从零装了一遍，截了每一屏，也撞上了这个坑。国内开着代理软件的读者，大概率会撞上——因为 dsh 照抄终端里的 `http_proxy` / `https_proxy` / `all_proxy` 环境变量，服务端 2 秒回成功、流格式却不对，报错文案却写着「模型返回格式不对」，把你往模型侧引。',
            en: 'The UI never mentions this trap. When the author reinstalled 0.2.1-rc.2 from an empty directory in October, screenshotting every screen, he hit it too. If you run a proxy — common in mainland networks — you almost certainly will. dsh blindly honours `http_proxy`, `https_proxy`, and `all_proxy` from your terminal; the server returns success within two seconds, but the streamed format is broken, and the error text blames the model, not the proxy.',
          },
        ],
      },
      {
        id: 'first-task',
        title: { zh: '第一件活：一个 573 行的番茄钟', en: 'Your first job: a 573-line pomodoro' },
        blocks: [
          {
            type: 'p',
            zh: '作者给它的第一句真活，原话照抄：',
            en: 'The first real task the author typed, verbatim:',
          },
          {
            type: 'code',
            lang: 'text',
            title: '第一件活的原话',
            code: '在当前目录做一个单文件网页index.html：番茄钟，25分钟倒计时，有开始、暂停、重置三个按钮，页面简洁。做完后用bash列出目录确认文件已经生成。',
            note: {
              zh: '模式默认标准模式，模型默认 Flash + High 档，**一个设置都没改**。',
              en: 'Default standard mode, default Flash + High reasoning, **nothing changed in settings**.',
            },
          },
          {
            type: 'stats',
            items: [
              {
                value: '4:53',
                label: { zh: '完成用时', en: 'Wall-clock time' },
                sub: { zh: '17 步', en: '17 tool steps' },
              },
              {
                value: '573',
                label: { zh: 'index.html 行数', en: 'Lines in index.html' },
                sub: { zh: '+573 −0，本轮新建的文件', en: '+573 −0, files created this turn' },
              },
              {
                value: '816K',
                label: { zh: 'token 用量', en: 'Tokens consumed' },
                sub: { zh: '缓存命中 98.2%', en: 'Cache hit 98.2%' },
              },
              {
                value: '250 tok/s',
                label: { zh: '输出速度', en: 'Output throughput' },
                sub: { zh: '1 轮 17 步', en: '1 turn, 17 steps' },
              },
            ],
          },
          {
            type: 'p',
            zh: '它写出来的是一个 573 行的网页，**还自己用浏览器在电脑和手机两个尺寸下截图核对了两轮**，才回来交差。这一屏上的几样东西，值得逐条读：',
            en: 'What it produced was a 573-line web page — and **it screenshotted the page in a browser at both desktop and mobile sizes, twice, to double-check its own work** before handing back. The completion screen contains several things worth reading one by one:',
          },
          {
            type: 'list',
            zh: [
              '**折叠起来的过程。** 收尾回答上方有一行「已完成，用时 4 分 53 秒」，带一个小箭头。它想了什么、调了哪些工具，默认折起来，点开按阶段列出：「执行了命令」「已写入文件并执行了命令」「已读取图片，执行了命令，修改了文件」。8 月版这些是平铺在对话流里的，0.2 版改成默认折叠，设置里「工作步骤收起时机」可以改。',
              '**文件改动卡片。** 「已编辑 index.html +573 −0」。这份名单来自改文件的工具自己上报的位置，**模型忘了跟你说它改了什么，那个文件也会出现在这儿**。点它，右边滑出一个侧栏，标签写着「第 1 轮改动」，逐行绿色的差异视图。改已有文件时这里是红绿对照。',
              '**用量。** 卡片下面「用量 816K tok」，点开是明细：缓存命中 **98.2%**，未缓存输入 **13,816**，缓存读取 **768,896**，输出 **33,601**，模型那一栏写的是 `deepseek-official/deepseek-flash`。**界面里没有金额，只有 token。** 这一场按 10 月低谷价约**一毛六**，怎么算的在[成本与缓存](/chapter/cost)。',
              '**输入框底下那一行。** 「1 轮 17 步 · 250 tok/s」「816K tok · 缓存命中 98%」，最右一个小圆环写着 **6%**，那是上下文占用：模型这一轮眼前能看见的全部文字占了上限的多少。',
              '**对话 / 轨迹页签。** 页面顶上还有「对话」和「轨迹」两个页签。轨迹那一页把这场对话摊平成一本时间账。这两个页签和文件差异视图都归设置里一个叫「**显示代码工作视图**」的开关管，**默认开着**。',
            ],
            en: [
              '**The collapsed process.** Above the final answer sits a "Done in 4:53" line with a chevron. What it thought and which tools it called are folded away by default; expand it and the trace is grouped by phase — "Ran a command", "Wrote a file and ran a command", "Read an image, ran a command, edited a file". In August these sat flat in the conversation flow; 0.2 folds them, controlled by a "when to collapse work steps" setting.',
              '**The file-change card.** "Edited index.html +573 −0". This list comes from the editing tool itself reporting which files it touched — **even if the model forgets to mention them, the files still show up here**. Clicking it slides open a sidebar labelled "Round 1 changes" with a line-by-line green diff. Editing existing files shows the usual red/green diff.',
              '**Usage.** Below the card: "816K tokens". Expand and you get the breakdown: **98.2% cache hit**, **13,816** uncached input, **768,896** cache read, **33,601** output, with `deepseek-official/deepseek-flash` named as the model. **The UI shows tokens, never money.** This run is roughly **one mao six** at October off-peak rates; the maths lives in the [cost chapter](/chapter/cost).',
              '**The line under the input box.** "1 turn · 17 steps · 250 tok/s" and "816K tok · 98% cache hit". On the far right a small ring reads **6%**, that is context usage — how much of the ceiling the model can currently see on this turn.',
              '**Chat / Trace tabs.** The header offers a "Chat" tab and a "Trace" tab. Trace flattens the conversation into a time ledger. Both tabs and the file diff view are gated by a single switch called **"show code work view"** in settings — **on by default**.',
            ],
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'quote',
            zh: '我问它「在当前目录做一个单文件网页 index.html：番茄钟，25 分钟倒计时，有开始、暂停、重置三个按钮」——4 分 53 秒，17 步，它交回来一个 573 行的页面，还自己截图核对了两轮。',
            en: '"In the current directory, build a single-file web page index.html: a pomodoro timer, 25-minute countdown, with start, pause, reset buttons" — 4 minutes 53 seconds, 17 steps, one 573-line page handed back, screenshots checked twice.',
            cite: { zh: '作者的第一件活', en: 'The author\'s first job' },
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
        ],
      },
      {
        id: 'first-log',
        title: { zh: '第一份会话日志长什么样', en: 'What the first session log looks like' },
        blocks: [
          {
            type: 'p',
            zh: '昨天聊的还在。左边栏按工作区列着所有会话。它们在盘上的位置是：',
            en: 'Yesterday\'s chats are still here. The left sidebar lists every session, grouped by workspace. On disk they live at:',
          },
          {
            type: 'code',
            lang: 'text',
            title: '会话在磁盘上的位置',
            code: '~/.dsh/sessions/<workspace>/<session>/session.v4.jsonl.zstd',
            note: {
              zh: '一个工作区一个文件夹，一场会话一个子文件夹，里面一个**压缩过的** JSONL 日志。文件名里那个 `v4` 是格式版本；8 月是不带版本号的 `session.jsonl.zstd`，老文件会被迁移成新版本另存，**原文件保留**。',
              en: 'One folder per workspace, one subfolder per session, containing a **compressed** JSONL log. The `v4` in the filename is the format version; August logs were `session.jsonl.zstd` with no version, and old files get migrated and saved under the new name while **the original is preserved**.',
            },
          },
          {
            type: 'p',
            zh: '解压打开它，前三行跟你说的话没有半点关系：',
            en: 'Decompress and open one, and the first three lines have nothing to do with what you said:',
          },
          {
            type: 'code',
            lang: 'json',
            title: '会话日志的前三行',
            code: '{"type": "permission/preset", "seq": 0, "data": {"preset": "workspace-write"}}\n{"type": "sandbox/mode", "seq": 1, "data": {"mode": "workspace-write"}}\n{"type": "approval/policy", "seq": 2, "data": {"policy": "ask"}}',
            note: {
              zh: '三句人话：跑在「工作区内修改」这一档、文件沙箱也是这一档、需要授权的操作问我。**这就是你什么都没设置时的出厂状态**。细节在[权限](/chapter/permissions)。',
              en: 'In plain words: "run under workspace-write", "the file sandbox is workspace-write too", "ask me before anything needs approval". **This is the factory state when you have changed nothing.** Full detail in the [permissions chapter](/chapter/permissions).',
            },
          },
          {
            type: 'p',
            zh: '这份日志里的**事件类型**，8 月是 44 种，10 月仓库里的事件目录是 62 种。**其中模型能看见的只有 5 种**（8 月是 3 种）：你说了什么、它说了什么、工具返回了什么，再加上系统消息和开发者消息。审批问过没有、你怎么答的、沙箱什么模式、权限中途换过没有——**全部只进日志、不进模型的眼睛**。所以「上周那次它到底是在什么权限下改的这个文件」，翻日志就有答案。',
            en: 'The **event type catalogue** grew from 44 in August to 62 in October. **The model can only see 5 of those** (3 in August): what you said, what it said, what tools returned, plus system messages and developer messages. Whether an approval was asked, how you answered, what mode the sandbox was in, whether permissions changed mid-run — **all of that only enters the log, never the model\'s eyes.** So "under which permission did it edit that file last week" has an answer if you open the log.',
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '会话日志默认会上传', en: 'Session logs upload by default' },
            zh: '设置→通用设置的最底下有一个开关，原文「**在使用官方模型 API 时上传 Session Log，帮助改进 DeepSeek 模型与产品**」，全新安装时它是**开着的**，作者没碰过它。上传的不只是你说的话：官方文档列的内容包括系统提示词、对话、工具参数和工具结果，也就是**它替你读过的文件内容**；API Key 不在里面。不想传，去那儿关掉。',
            en: 'The bottom of Settings → General has a switch: "**Upload Session Log when using the official model API, to improve DeepSeek models and products**". On a fresh install it is **on**, and the author never touched it. It uploads more than your words — the official docs list the system prompt, the conversation, tool arguments and tool results, i.e. **the contents of every file it read on your behalf**. API keys are not in it. If that bothers you, switch it off there.',
            source: { label: 'DeepSeek 官方文档 / DeepSeek Docs', href: 'https://api-docs.deepseek.com/' },
          },
          {
            type: 'list',
            zh: [
              '想自己打开一份日志看：用 `zstd -dc ~/.dsh/sessions/*/session-*/session.v4.jsonl.zstd`，逐行都是 JSON 事件。',
              '**npx 版那个终端窗口不能关**。网页是靠它活着的，关掉窗口网页就白了。明天把同一行命令再敲一遍，第二次不用再下载，作者这台**8 秒内就起来**。记住是「同一行」，写法变了 npx 会当成另一个东西重下一份。桌面版没有这个问题，按官方说法关了窗口任务还在后台跑。',
              '删除会话：从 0.1.7 起，归档能筛选、能恢复了；**删除入口作者没找到**，右键会话不出菜单，会话旁的「…」他没点。想真删，仍然可以去上面那个目录里手动删文件夹。',
              '8 月版在 Windows 上遇到含某些汉字的中文路径会把路径截断，官方在 **0.1.2-alpha.1** 修了（讨论帖 #151），升级就好。',
            ],
            en: [
              'To open a log yourself: `zstd -dc ~/.dsh/sessions/*/session-*/session.v4.jsonl.zstd` — every line is a JSON event.',
              '**The terminal window for the npx version must stay open.** The web page lives because of that process; close the window and the page goes blank. Next day, run the same command again — the second start needs no download and, on the author\'s machine, came up **in under 8 seconds**. Same command *literally* — change the spelling and npx treats it as a new package and re-downloads everything. The desktop build has no such issue: per the official notes, tasks keep running in the background after you close the window.',
              'Deleting sessions: from 0.1.7 archiving supports filter and restore; **the author could not find a delete entry** — right-clicking a session pops no menu, and he never clicked the "…" next to a session. To truly delete one, remove its folder in the directory above.',
              'The August build truncated some Chinese paths on Windows when they contained certain Han characters. Fixed officially in **0.1.2-alpha.1** (discussion thread #151); upgrading resolves it.',
            ],
          },
        ],
      },
      {
        id: 'harness-layers',
        title: { zh: '你装的到底是什么：模型外面那层壳', en: 'What you actually installed: the shell around the model' },
        blocks: [
          {
            type: 'p',
            zh: '先把称呼的事说了。官方通篇讲「面向全球 Harness 开发者」，橙皮书作者第一次读也犹豫了一下：他从来不会写代码，做的产品全是 AI 写的，算不算被点到名的人。算。**harness 直译是「挽具」，就是套在模型外面的那层壳。模型是厨师，harness 是厨房，会用厨房的不必是厨具工程师。**',
            en: 'First, the naming. The official site keeps saying "for harness developers worldwide", and the orange-book author — who does not write code himself and ships products built entirely by AI — wondered whether he counted. He does. **A harness is literally the rigging you put around a model: the shell wrapped over it. The model is the chef, the harness is the kitchen; you do not have to be a kitchen-equipment engineer to use a kitchen.**',
          },
          {
            type: 'p',
            zh: '第二件事：deepseek.com 上打开的是聊天页面，你说话它回话，**碰不到你电脑里的东西**。DeepSeek Harness（往下用它的命令名 `dsh` 称呼）装在你电脑上，能读你的文件、改你的文件、替你敲命令。**模型还是那个模型，多出来的是一双手。**',
            en: 'Second, the distinction: deepseek.com opens a chat page — you talk, it answers, and **it cannot touch anything on your machine**. DeepSeek Harness, called `dsh` by its command name from here on, is installed on your computer: it can read your files, edit your files, and run commands for you. **Same model, plus a pair of hands.**',
          },
          {
            type: 'diagram',
            id: 'harness-layers',
            caption: {
              zh: '模型在最中心，套在它外面那层壳——**工具、权限、记忆、日志**——就是 dsh；你装的不是一台新模型，是一双手加一副护栏。',
              en: 'The model sits at the core; the shell wrapped around it — **tools, permissions, memory, logs** — is dsh. What you installed is not a new model but a pair of hands plus a set of guardrails.',
            },
          },
          {
            type: 'table',
            head: [
              { zh: '层', en: 'Layer' },
              { zh: '它管什么', en: 'What it owns' },
              { zh: '本指南哪一章细说', en: 'Which chapter goes deeper' },
            ],
            rows: [
              [
                { zh: '模型（不在 dsh 里）', en: 'The model (not part of dsh)' },
                { zh: 'DeepSeek 服务器上的 V4.1-Flash / V4-Pro，负责思考。10 月模型列表只有这两项。', en: 'V4.1-Flash / V-Pro on DeepSeek servers — the thinking. The October model list has exactly two entries.' },
                { zh: '—', en: '—' },
              ],
              [
                { zh: '工具', en: 'Tools' },
                { zh: '读、写、改文件，跑命令，搜代码，上网，派子代理，定时任务……**标准模式 10 月 31 件**。', en: 'Read, write, edit, run shell, search, browse, spawn sub-agents, schedule... **31 tools in standard mode in October**.' },
                { zh: '[四种模式](/chapter/modes)', en: '[The four modes](/chapter/modes)' },
              ],
              [
                { zh: '权限', en: 'Permissions' },
                { zh: '文件沙箱三档 + 审批策略两值。默认「工作区内修改 + 问」，操作系统的内核帮你焊门。', en: 'Three sandbox tiers plus a two-value approval policy. Factory default is workspace-write with ask; the OS kernel holds the door.' },
                { zh: '[它被允许碰什么](/chapter/permissions)', en: '[What it may touch](/chapter/permissions)' },
              ],
              [
                { zh: '记忆', en: 'Memory' },
                { zh: '技能库 `~/.agents/skills`、`AGENTS.md` 全局规则、每轮往上下文里塞的那一段技能目录。', en: 'The skill folder `~/.agents/skills`, the `AGENTS.md` global rule file, and the skills catalogue injected into context on every turn.' },
                { zh: '[从 Claude Code 搬过来](/chapter/migration)', en: '[Moving in from Claude Code](/chapter/migration)' },
              ],
              [
                { zh: '日志', en: 'Logs' },
                { zh: '一份只追加的事件流，出厂权限、审批、沙箱模式各占一条事件。10 月仓库里的事件目录 62 种，模型能看见 5 种。', en: 'An append-only event stream where the factory permission, the approval and the sandbox mode each get their own event line. October\'s event catalogue is 62 types; the model sees 5.' },
                { zh: '第 5 章「每一次运行都有迹可循」', en: 'Chapter 5: every run is traceable' },
              ],
            ],
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'quote',
            zh: '「可以把 DSH 想象成一个乐高汽车玩具。DeepSeek 官方提供的这个 Coding Agent，只是他们自己拼出来的一套官方预置。你完全可以把里面的零件换成自己喜欢的：换引擎、换轮胎、换挡风玻璃，或者加装其他模组。甚至最后拼出来的东西，也不一定还是一辆汽车。」',
            en: '"Think of DSH as a LEGO car set. The coding agent DeepSeek ships is just the official build they assembled themselves. You can swap in your own parts: change the engine, the tires, the windshield, or bolt on extra modules. What you end up with may not even be a car."',
            cite: { zh: 'Jiayuan Zhang（JY），内测开发者，2026-08-13', en: 'Jiayuan Zhang (JY), internal-test developer, 2026-08-13' },
            source: { label: 'Jiayuan Zhang 推文 / JY on X', href: 'https://x.com/jiayuan_jy/status/2087911060154314963' },
          },
          {
            type: 'callout',
            tone: 'idea',
            title: { zh: '类比有一处失真', en: 'Where the analogy lies' },
            zh: '乐高拼错了车立不起来，你一眼看得见；**这东西拆错了通常是安静地不工作**，某个零件永远卡在「待加载」，一声不吭。这种沉默的失败在专门讲踩坑的那一章有细说。',
            en: 'A wrongly-built LEGO car visibly will not stand; **this thing, mis-assembled, usually just fails silently** — a part stuck in "pending load" forever, without a sound. Silent failures get their own section in the pitfalls chapter.',
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'links',
            title: { zh: '接下来去哪儿', en: 'Where to go next' },
            items: [
              {
                label: { zh: '它被允许碰什么', en: 'What it is allowed to touch' },
                href: '/chapter/permissions',
                desc: { zh: '权限预设的三段式、审批卡片、操作系统的门。', en: 'The three-part permission preset, the approval card, the OS-level door.' },
                tag: '本章下一节',
              },
              {
                label: { zh: '四种模式', en: 'The four modes' },
                href: '/chapter/modes',
                desc: { zh: '标准 / PTC / 极简 / 创造，一张表看完。', en: 'Standard, PTC, minimal, creator — one table.' },
              },
              {
                label: { zh: '从 Claude Code 搬过来', en: 'Migrating from Claude Code' },
                href: '/chapter/migration',
                desc: { zh: '哪些家当能直接用、哪些要改、哪些搬不过去。', en: 'What carries over, what needs changes, what does not.' },
              },
              {
                label: { zh: '上游仓库', en: 'Upstream repository' },
                href: 'https://github.com/deepseek-ai/DeepSeek-Harness',
                desc: { zh: 'README 只说装 Node.js，没写版本；仓库根目录写的是 22.19+ 或 24+。', en: 'README only says "install Node.js" without a version; the repo root requires 22.19+ or 24+.' },
                tag: '外链',
              },
              {
                label: { zh: 'npm 包页', en: 'npm package page' },
                href: 'https://www.npmjs.com/package/deepseek-harness',
                desc: { zh: 'dsh 在 npm 上发布的位置。', en: 'Where dsh is published on npm.' },
                tag: '外链',
              },
              {
                label: { zh: '橙皮书原文', en: 'The orange book' },
                href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/',
                desc: { zh: '花叔《DeepSeek Harness：从开机到拆开》。', en: 'Huashu\'s "DeepSeek Harness: from power-on to teardown".' },
                tag: '外链',
              },
            ],
          },
        ],
      },
    ],
    sources: [
      { label: '花叔《DeepSeek Harness》橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
      { label: 'DeepSeek 官网 / DeepSeek', href: 'https://www.deepseek.com/' },
      { label: 'DeepSeek-Harness 仓库 / Upstream Repo', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
      { label: 'Node.js 下载 / Node.js', href: 'https://nodejs.org/en/download' },
      { label: 'DeepSeek 官方文档 / DeepSeek Docs', href: 'https://api-docs.deepseek.com/' },
    ],
    sisters: ['harness-engineering', 'better-agent'],
  },
  {
    slug: 'permissions',
    num: '02',
    part: 'start',
    icon: 'shield',
    level: 'starter',
    minutes: 14,
    accent: 'blue',
    title: { zh: '它被允许碰什么', en: 'What It Is Allowed to Touch' },
    subtitle: {
      zh: '默认档位、审批卡片、撞墙之后那一道梯子',
      en: 'The default tier, the approval card, and the ladder it hands you when it hits a wall.',
    },
    promise: {
      zh: '读完这章你能读懂会话日志开头的三行权限、看懂升权卡片的每一步、知道操作系统真正拦的是什么、以及那个被官方明说的凭据缺口。',
      en: 'You will be able to read the three permission lines at the head of every session log, follow each step of an escalation card, know what the operating system actually blocks, and understand the credential gap the docs admit out loud.',
    },
    sections: [
      {
        id: 'factory-log',
        title: { zh: '出厂状态，写在日志最前面三行', en: 'The factory state, written in the log\'s first three lines' },
        blocks: [
          {
            type: 'p',
            zh: '装一个能在你电脑上跑命令、改文件的东西，第一个该问的是它被允许碰什么。作者 8 月在本机跑过一次最简单的任务——一句「用一句中文说明当前目录下有哪些文件」，然后去翻它留下的会话日志。10 月用 0.2.1-rc.2 做番茄钟那一场，他又翻了一遍。**两次日志的开头一模一样，前三行跟你说的话没有半点关系：**',
            en: 'When you install something that can run commands and edit files on your machine, the first question is what it is allowed to touch. In August the author ran the simplest possible task locally—"describe, in one Chinese sentence, what files are in the current directory"—then opened the session log it left behind. In October, doing the pomodoro on 0.2.1-rc.2, he opened it again. **Both logs start identically, and the first three lines have nothing to do with what he said:**',
          },
          {
            type: 'code',
            lang: 'json',
            title: '会话日志的权限三件套（seq 0 / 1 / 2）',
            code: '{"type": "permission/preset", "seq": 0, "data": {"preset": "workspace-write"}}\n{"type": "sandbox/mode", "seq": 1, "data": {"mode": "workspace-write"}}\n{"type": "approval/policy", "seq": 2, "data": {"policy": "ask"}}',
            note: {
              zh: '翻译过来三句人话：这次跑在「工作区内修改」这一档（日志里的英文名叫 `workspace-write`）；文件沙箱也是这一档；遇到需要授权的操作，问我。**你什么都没设置的时候，这就是出厂状态。**',
              en: 'In plain words: this run is on the "edit inside the workspace" tier (the English log name is `workspace-write`); the file sandbox is on the same tier; and when something needs authorisation, ask me. **When you have set nothing at all, this is the factory state.**',
            },
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'p',
            zh: '作者特意把这三行放在最前面，因为它回答的正是那句「会不会弄坏我电脑」。默认状态下，**它能动的只有你打开的那个项目目录，加上系统的临时目录**。你的桌面、你的下载文件夹、你别的项目，都在圈外。想动圈外的东西，它得先问你，而你可以说不。',
            en: 'The author put these three lines first on purpose, because they answer the exact fear—"will it wreck my computer?" By default **it can touch only the project directory you opened, plus the system temp area.** Your Desktop, your Downloads folder, your other projects are all outside the circle. To reach outside it has to ask you first, and you can say no.',
          },
          {
            type: 'callout',
            tone: 'note',
            title: { zh: '这三行是这个产品对权限的正式记账', en: 'These three lines are the product\'s official permission ledger' },
            zh: '这次会话开在哪一档、沙箱是什么模式、审批策略是什么，**各占一条事件**，跟你说的每句话、它调的每个工具并排躺在同一份**只追加**的日志里。所以「上周那次它到底是在什么权限下改的这个文件」，翻日志就有答案。想导出当前这份出厂配置看全貌，用这条命令（导出来是一棵 YAML 树）：',
            en: 'Which tier the session opened on, what mode the sandbox is in, what the approval policy is — **each gets its own event**, sitting alongside every one of your messages and every tool call in the same **append-only** log. So "under which permission did it edit that file last week" has an answer if you read the log. To dump the full factory config (it comes out as a YAML tree) run:',
          },
          {
            type: 'code',
            lang: 'bash',
            title: '导出出厂启动清单（YAML）',
            code: 'npx @deepseek-ai/dsh --profile web --dump-default-config > tree.yml',
            note: {
              zh: '一份出厂启动清单，敲这条导出来，能一行行看见它开机时到底装了什么——权限预设、沙箱模式、审批策略都在里面。',
              en: 'Running this exports the factory boot list so you can see, line by line, exactly what loads at startup — the permission preset, sandbox mode and approval policy are all in there.',
            },
          },
        ],
      },
      {
        id: 'two-knobs',
        title: { zh: '两个旋钮：文件沙箱三档 + 问不问', en: 'Two knobs: a three-tier sandbox and the ask flag' },
        blocks: [
          {
            type: 'p',
            zh: '权限这件事在这里其实是**两个独立的旋钮**，界面上被打包成一个选择器给你，就在输入框左下角。第一个旋钮是文件沙箱，三档，0.2 版的中文标签和 8 月不一样了：',
            en: 'Permissions here are really **two independent knobs**, bundled into one selector in the UI at the lower-left of the input box. The first knob is the file sandbox, with three tiers; the 0.2 Chinese labels differ from August\'s:',
          },
          {
            type: 'table',
            head: [
              { zh: '档位', en: 'Tier' },
              { zh: '它能干什么', en: 'What it can do' },
              { zh: '什么时候用', en: 'When to use it' },
            ],
            rows: [
              [
                { zh: '**仅可查看**（8 月叫「只读」）', en: '**View only** (August: "read-only")' },
                { zh: '什么都能看，一个字都改不了。', en: 'Sees everything, changes nothing—not a single character.' },
                { zh: '让它读代码、做分析、写方案，你不想它动手。', en: 'Reading code, analysis, drafting a plan—when you do not want it to act.' },
              ],
              [
                { zh: '**工作区内修改**（默认，8 月叫「工作区可写」）', en: '**Edit inside workspace** (default; August: "workspace writable")' },
                { zh: '只能改你选定的那个目录和系统临时区，别处一律拒绝。', en: 'Edits only the folder you chose plus the system temp area; everything else is refused.' },
                { zh: '绝大多数情况。', en: 'The vast majority of the time.' },
              ],
              [
                { zh: '**完全权限**（8 月叫「完全放开」）', en: '**Full access** (August: "fully open")' },
                { zh: '不设限。', en: 'No limits.' },
                { zh: '你完全知道自己在干什么的时候。', en: 'When you know exactly what you are doing.' },
              ],
            ],
            note: {
              zh: '出厂勾在中间那档。实验性的「自动审查」要先去插件页打开对应插件才会出现在这里。',
              en: 'Factory default is the middle tier. The experimental "auto review" tier only appears after you enable its plugin on the plugin page.',
            },
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'p',
            zh: '第二个旋钮更简单，只有两个值：`ask`（问我）和 `never`（不问，需要授权的操作直接拒掉）。出厂的三个档位里，**前两档都配 `ask`，完全权限配 `never`**。0.2 版还多了一个实验性的第四档「自动审查」：每次工具调用之前，让模型自己判断该不该放行，它挂在插件页里一个**默认关着**的「自动授权审查」插件后面——作者没开过它，书里不评价它靠不靠谱。',
            en: 'The second knob is simpler, with just two values: `ask` (ask me) and `never` (do not ask; anything needing authorisation is rejected outright). Across the three factory tiers, **the first two pair with `ask` and full access pairs with `never`.** 0.2 adds an experimental fourth tier, "auto review": before every tool call the model judges whether to let it through. It hides behind an "auto authorise review" plugin that is **off by default**—the author never enabled it, so the book makes no claim about whether it is trustworthy.',
          },
          {
            type: 'code',
            lang: 'text',
            title: '8 月切到「完全放开」时的界面原文',
            code: '确认启用 Full access？启用 Full access 后，agent 将减少确认步骤，\n并且可以直接执行更多操作，包括敏感操作、文件修改或外部命令。\n仅建议在你信任当前任务时使用。\n\n[ 我已了解风险，并愿意继续 ]',
            note: {
              zh: '怎么改档位：点输入框左下角那个选择器；设置→通用设置的「权限」一项改的是**新会话**的默认档。**如果当前有终端会话开着，切换沙箱模式会被拒绝**——因为用宽权限开出来的那个终端会活过你这次降权。先关掉终端再切。',
              en: 'To change tiers: click the selector at the lower-left of the input box; the "Permissions" row under Settings → General changes the default for **new sessions**. **If a terminal session is currently open, switching the sandbox mode is refused**—because a terminal opened with wide permissions outlives your downgrade. Close the terminal before switching.',
            },
          },
        ],
      },
      {
        id: 'approval-card',
        title: { zh: '审批卡片长什么样，以及点了「拒绝」之后', en: 'What the approval card looks like, and what "reject" actually does' },
        blocks: [
          {
            type: 'p',
            zh: '出厂状态下，会弹窗的场景基本就是**某个操作想临时把沙箱开大**。这跟原本预期差得挺远：**它并不是一天到晚都要问你。** 写工作区外的文件、在创造模式里安装插件，弹的都是这一种。通用的那种「这次调用需要人来批」的信号，全仓只有一个地方会发出来——那个把 Claude Code 钩子配置桥接过来的包；它发在 npm 上了，但装 dsh 不会连带装上它，要自己单独装。所以你不装它，就不会有别的东西来找你审批。',
            en: 'In the factory state, the popup basically only fires when **an operation tries to widen the sandbox on the spot**. This is far from the obvious expectation: **it does not ask you constantly.** Writing a file outside the workspace, or installing a plugin in creator mode—those are the triggers. The generic "this call needs a human to approve" signal is emitted from exactly one place in the whole repo: the package that bridges Claude Code hook configs. It is on npm, but installing dsh does not pull it in—you install it separately. So if you do not install it, nothing else will ever come asking for approval.',
          },
          {
            type: 'p',
            zh: '真正会弹的是升权。而且**它不是一个盖在页面上的模态框，它把输入框整个顶掉**。卡片顶上一条琥珀色的「等待审批」，中间用大字显示模型自己写的理由，理由下面是灰色等宽字体的那条命令原文，右下角两个按钮：「拒绝」和「允许一次」。命令和理由都是**长度不设上限**的模型文本，所以它们在卡片里滚动，**按钮永远留在滚动区外面**——不然遇到一条超长命令你就点不到按钮了。',
            en: 'What really pops up is escalation. And **it is not a modal floating over the page—it replaces the input box entirely.** An amber "awaiting approval" strip on top, the model\'s own reason in large text in the middle, the literal command in grey monospace below it, and two buttons at the bottom right: "reject" and "allow once". Both the command and the reason are model text with **no length cap**, so they scroll inside the card while **the buttons stay pinned outside the scroll area**—otherwise one overlong command would put the buttons out of reach.',
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'diagram',
            id: 'approval-flow',
            caption: {
              zh: '模型想写圈外 → 内核拒绝 → 收到标记＋梯子 → 带理由重试一次 → 卡片弹到你面前；只有「允许一次」，没有「总是允许」。',
              en: 'Model wants to write outside the circle → kernel denies it → it gets a marker plus a ladder → retries once with a reason → the card pops in front of you; only "allow once" exists, never "always allow".',
            },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '没有「总是允许」，也没有白名单', en: 'No "always allow", no whitelist' },
            zh: '只有「允许一次」，没有「总是允许」。没有记忆规则，没有白名单，没有「这条命令以后别再问我了」。**同一条命令下次再来，它还是会问。**',
            en: 'Only "allow once" exists; there is no "always allow". No remembered rules, no whitelist, no "stop asking me about this command". **The same command next time will still ask.**',
          },
          {
            type: 'p',
            zh: '你点「拒绝」之后，模型收到的是这么一句：',
            en: 'After you hit "reject", this is exactly what the model receives:',
          },
          {
            type: 'code',
            lang: 'text',
            title: '模型收到的拒绝回执',
            code: 'the user rejected escalating this command to "danger-full-access"',
            note: {
              zh: '另外三种结局各有各的措辞：这一轮被你叫停，是「审批被取消」；跑在没有界面的环境里压根没人可问，是「没有可用的审批通道」；组合里根本没装审批服务，是「没有可用的审批服务」。**四句话逐字不同，因为它们要让模型知道该改方案还是该放弃。**',
              en: 'Three other outcomes each get their own wording: you stopped the turn — "approval cancelled"; running headless with no one to ask — "no approval channel available"; the composition has no approval service installed — "no approval service available". **All four read literally differently, because each tells the model whether to change approach or give up.**',
            },
          },
          {
            type: 'list',
            zh: [
              '**拒绝之后什么都没跑。** 这条命令从来没有执行过，工具结果里连一行输出都不会有，**不存在跑了一半被掐断这回事**。',
              '**没人应答等于拒绝。** 应答的人不在、抛了异常、返回了一个词表之外的值，全部归成「不可用」，而不可用一律按拒绝处理。所以你要是在**自动化脚本**里跑它，任何需要审批的操作都会直接失败，不会因为「没人明确说不行」就放行。',
            ],
            en: [
              '**Rejecting runs nothing.** The command never executed, and the tool result will not contain even one line of output—**there is no "it ran halfway and got cut off".**',
              '**No answer equals rejection.** If the responder is absent, throws an exception, or returns a value outside the accepted vocabulary, it is all classed as "unavailable", and unavailable always means rejection. So if you run it in an **automated script**, any operation needing approval fails outright—"nobody said no" is never treated as a yes.',
            ],
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
        ],
      },
      {
        id: 'ladder',
        title: { zh: '撞墙那一刻：只升不降，还有那句被撤回的话', en: 'The moment it hits a wall: up only, once, and the line they retracted' },
        blocks: [
          {
            type: 'p',
            zh: '假设它在工作区内修改这一档下想往工作区外面写个文件。内核拒绝它之后，它**逐字**收到的是这两行：',
            en: 'Suppose it is on the "edit inside workspace" tier and wants to write a file outside the workspace. After the kernel denies it, it receives these two lines **verbatim**:',
          },
          {
            type: 'code',
            lang: 'text',
            title: '内核回给模型的拒绝＋梯子',
            code: '[sandbox: file access denied under workspace-write mode]\n[sandbox: escalation available — retry this exact operation once with sandbox_permissions\n (the narrowest wider mode that suffices) + justification; the approval prompt asks the user]',
            note: {
              zh: '第一行说「你被拒了，当前是 workspace-write 这一档」。第二行是梯子：你可以带上**两个参数**原样重试一次，一个是要升到的档位（那个带下划线的 `sandbox_permissions`），一个是你的理由；末尾还加了一句「这会弹到人面前去问」。',
              en: 'The first line says "you were denied, the current tier is workspace-write". The second is the ladder: you may retry the exact operation once with **two parameters**—the tier you want to escalate to (`sandbox_permissions`, the underscored one) and your justification. It ends with "the approval prompt asks the user".',
            },
          },
          {
            type: 'p',
            zh: '作者去目录里看了，那个文件**不存在**。8 月那次的原话是「我不会绕过它用其他方式硬写」，两次都没换条路去硬写。这条梯子有**三道闸**：',
            en: 'The author checked the folder: the file **does not exist**. In August its words were "I will not work around it by hard-writing another way", and neither run tried a side door. The ladder has **three gates**:',
          },
          {
            type: 'diagram',
            id: 'permission-bounds',
            caption: {
              zh: '工作区是圈、临时区是安全垫、圈外一律拒绝——升权只能往严格更宽的档位走，且仅可查看是地板，谁都不能降到它。',
              en: 'The workspace is the circle, temp is the safety mat, everything outside is refused—escalation can only move to a strictly wider tier, and view-only is the floor no one can descend to.',
            },
          },
          {
            type: 'steps',
            items: [
              {
                title: { zh: '只能升不能平移', en: 'Up only, never sideways' },
                desc: {
                  zh: '而且必须是**严格更宽**的档位；一个不变宽的请求根本不会去打扰你，在执行那一刻就被打回了。',
                  en: 'And it must move to a **strictly wider** tier; a request that does not widen anything never bothers you—it is bounced at the moment of execution.',
                },
              },
              {
                title: { zh: '仅可查看是地板', en: 'View-only is the floor' },
                desc: {
                  zh: '没有任何东西能往下升到它——它是最低权限，不是一个可以「升到」的目标。',
                  en: 'Nothing can escalate down to it—it is the lowest permission, not a target you can "escalate to".',
                },
              },
              {
                title: { zh: '重试只有一次，且不能投机', en: 'One retry, never speculative' },
                desc: {
                  zh: '必须在**同一轮里**，不能先申请一个宽权限放着以后用，文档原话是「**升权从不投机**」。',
                  en: 'It must happen **in the same turn**—you cannot grab a wide permission now and bank it for later. The docs\' words: "**escalation is never speculative**."',
                },
              },
            ],
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'quote',
            zh: '他们换来的那条原则，我觉得能迁移到任何一个给 AI 立规矩的场合：**不要在开头劝退，要在撞墙时给梯子。**',
            en: 'The principle they landed on, which I think transfers to any setting where you lay rules down for an AI: **do not discourage it up front—hand it a ladder when it hits the wall.**',
            cite: { zh: '橙皮书作者，关于「软性封锁」被撤下的复盘', en: 'The orange-book author, on why "soft blocking" was pulled' },
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'p',
            zh: '他们最早的做法很符合直觉：把沙箱模式写进那段固定的系统提示词，每个请求都带着「Bash 命令跑在只读文件沙箱下」这句话。听起来只有好处：模型知道自己被限制了，不会白费力气。**然后线上数据把这个直觉打碎了。** 带着这句话的时候，**模型会拒绝去尝试那些本来会被拒、但完全可以升权拿到的工作。** 第一次人工会话的 12 轮里，有 **5 轮以零次工具调用结束**——它什么都没干，直接在回答里跟人解释「我没有权限」。',
            en: 'Their earliest approach was intuitive: bake the sandbox mode into the fixed system prompt, so every request carried the line "Bash commands run under a read-only file sandbox". Sounded purely good—the model knows its limits and stops wasting effort. **Then production data shattered that intuition.** With that line present, **the model refused to even attempt work that would be denied but was fully reachable via escalation.** In the first manual session, 5 of 12 rounds ended with **zero tool calls**—it did nothing and just explained to the human, "I do not have permission."',
          },
          {
            type: 'callout',
            tone: 'idea',
            title: { zh: '这叫「软性封锁」', en: 'They named it "soft blocking"' },
            zh: '沙箱本来只该拦住越界的动作，结果它把模型的**尝试意愿**一起拦掉了。这条被写进了被拒方案清单，理由一栏写的是「**先发货了，然后基于线上证据移除**」。作者把本机跑出来的标准模式系统提示词从头翻到尾：8 月四千一百个字符，10 月五千六百个字符，**两版都没有一个沙箱字样**；策略是作为一条**单独的运行时上下文**发进去的，10 月那一场里它的原文开头是 `Current DSH file policy: workspace-write.`。',
            en: 'The sandbox was only supposed to block out-of-bounds actions, but it also blocked the model\'s **willingness to try**. This went onto the rejected-plan list with the reason "shipped first, then removed based on online evidence". The author read the standard-mode system prompt he captured locally from start to finish: 4,100 characters in August, 5,608 in October—**neither version contains the word "sandbox" anywhere.** The policy is sent instead as a **separate runtime context**, whose October text opens with `Current DSH file policy: workspace-write.`',
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'code',
            lang: 'text',
            title: '仅可查看那一档的运行时上下文措辞',
            code: 'Current DSH file policy: read-only. ... Do not refuse a required modification from\nthis policy alone: try an available tool normally and follow any denial and\nescalation guidance it returns.',
            note: {
              zh: '翻译：「别光凭这条策略就拒绝，正常去试那个工具，然后按它返回的拒绝提示和升权指引走。」——给梯子，不劝退。',
              en: 'In plain words: "do not refuse a required change on the strength of this policy alone; try the tool normally, then follow whatever denial message and escalation guidance it hands back." A ladder, not a deterrent.',
            },
          },
        ],
      },
      {
        id: 'credential-gap',
        title: { zh: '一道写完又被撤回的凭据保护（文档化的缺口）', en: 'A credential guard that was built, shipped, then withdrawn' },
        blocks: [
          {
            type: 'p',
            zh: '先说清楚它保护的是什么。你的模型密钥存放在一个**明文的凭据文件**里，权限位是 **0600**，意思是「只有文件的主人能读」。问题在于，文件的主人是你，而模型的 bash 和文件工具跑的**也是你这个用户**。0600 挡得住这台机器上的其他系统用户，**挡不住模型**。而「工作区内修改」这一档只管写不管读，所以它想读这个文件，**读得到**，跟读任何一个你自己的文件一样。',
            en: 'Start with what it protects. Your model key lives in a **plaintext credential file** with permission bits **0600**, meaning "only the owner can read". The catch: the owner is you, and the model\'s bash and file tools run as **that same user**. 0600 keeps out other system users on the machine—**it does not keep out the model.** And the "edit inside workspace" tier governs writing, not reading, so if the model wants to read this file, **it can**, just like any file you own.',
          },
          {
            type: 'p',
            zh: '他们做过一道加固：给沙箱加一条「这个路径禁止读」的规则，专门点名凭据文件。写完了，上线了，然后被自己的证据撤回。原因是两条平台事实：Linux 那条路必须先在一棵已经被设成只读的目录树里创建挂载点，所以只要那个父目录还不存在，它就拒绝整个约束——也就是**每一台还没存过凭据的新机器**都会中招；另一条路则没法从自己已经给出的读权限里做减法，于是**每一次调用都会为一个它从未真正藏住的文件汇报「只管住了一部分」**。',
            en: 'They built one hardening pass: a "this path is read-forbidden" rule in the sandbox, naming the credential file specifically. It was written, shipped, then withdrawn by their own evidence. Two platform facts did it in. On the Linux path you must first create a mount point inside a tree already set read-only, so if that parent directory does not exist yet, the whole constraint is refused—which means **every brand-new machine that has never stored a credential** trips on it. The other path cannot subtract from read access it has already granted, so **every call would report "partially covered" for a file it never actually hid.**',
          },
          {
            type: 'quote',
            zh: '「一个在它生效的地方破坏约束、在它不生效的地方谎报状态的保护，比一个被文档化的缺席更糟。」',
            en: '"A protection that breaks the constraint where it does apply and misreports its state where it does not is worse than a gap that is simply documented."',
            cite: { zh: '橙皮书原文抄录，他们撤掉加固的理由', en: 'Verbatim in the orange book—their stated reason for pulling the guard' },
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '存下来的凭据，对模型没有边界', en: 'Stored credentials have no boundary against the model' },
            zh: '所以他们撤掉了保护，改成在文档里把这件事明说：**存下来的凭据对模型没有边界。** 他们守住的东西窄得多：没有任何界面把这个文件塞进进程的环境变量，模型也拿不到一条指向它的现成路径，**要读到那个值，得它自己刻意去读一条没人给过它的路径**。文档给这件事定了性：**这叫谨慎，不叫边界。** 真正的答案（一个模型进程根本读不到的系统钥匙串）被记成待办，而不是用一个半成品去暗示它已经有了。第二个被否的方案：把凭据目录位置从模型环境变量里拿掉，作为纵深防御考虑过，然后作为「**有真实代价的表演**」被否决——默认位置本来就是有文档的约定，模型自己能推出来，而这个变量是合法工具找到状态的方式，藏起指针只会让「没有边界」更难被看见。',
            en: 'So they removed the protection and said it plainly in the docs: **stored credentials have no boundary against the model.** What they actually kept is far narrower: no UI ever puts this file into the process environment, and the model is not handed a ready path to it—**to read the value the model would have to deliberately go fetch a path nobody gave it.** The docs classify this honestly: **that is caution, not a boundary.** The real answer (a system keychain the model process fundamentally cannot read) was filed as a to-do rather than hinted at with a half-built stand-in. The second rejected plan: strip the credential directory location from the model\'s environment as defense-in-depth—considered, then rejected as "**a performance with a real cost**." The default location is a documented convention the model can infer on its own, and the variable is how legitimate tools find state; hiding the pointer only makes "there is no boundary" harder to see.',
          },
          {
            type: 'p',
            zh: '作者的忠告：**别把生产环境的密钥放进这台机器，或者接受「它读得到」这个前提再用。这一条我建议你现在就决定，别等出事。**',
            en: 'The author\'s advice: **do not put production keys on this machine, or accept the premise that the model can read them before you use it. Decide this now, not after an incident.**',
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
        ],
      },
      {
        id: 'os-doors',
        title: { zh: '真正拦住你的是操作系统，不是一段 JavaScript', en: 'The OS does the blocking, not a line of JavaScript' },
        blocks: [
          {
            type: 'p',
            zh: '上面说的拒绝，不是一段 JavaScript 在那儿做 if 判断。**真正拦住的是操作系统。** 三个平台三套机制：macOS 用系统自带的 `sandbox-exec`；Linux 优先用 `bubblewrap`、不行就退到内核的 `Landlock`；Windows 用**受限令牌**。顺便纠正一个容易写错的说法：**它不用 seccomp**——全仓提到 seccomp 的只有两处，都在一篇**被否决的笔记**里。',
            en: 'The denials above are not JavaScript doing an `if`. **The operating system does the real blocking.** Three platforms, three mechanisms: macOS uses the built-in `sandbox-exec`; Linux prefers `bubblewrap` and falls back to the kernel\'s `Landlock`; Windows uses a **restricted token**. And a common mis-statement to correct: **it does not use seccomp**—seccomp appears only twice in the entire repo, both inside a **rejected** note.',
          },
          {
            type: 'table',
            head: [
              { zh: '操作系统', en: 'Operating system' },
              { zh: '沙箱后端', en: 'Sandbox backend' },
              { zh: '要点', en: 'Key point' },
            ],
            rows: [
              [
                { zh: 'macOS', en: 'macOS' },
                { zh: '`sandbox-exec`（系统自带）', en: '`sandbox-exec` (built in)' },
                { zh: '这扇门是用一个被苹果标为「**已弃用**」的工具焊的；他们的对策是加一个探测——万一哪天真没了，就**拒绝执行**。', en: 'The door is welded with a tool Apple has marked "**deprecated**"; their mitigation is a probe—if it ever truly disappears, dsh **refuses to run**.' },
              ],
              [
                { zh: 'Linux', en: 'Linux' },
                { zh: '`bubblewrap` 优先，退到内核 `Landlock`', en: '`bubblewrap` first, falling back to kernel `Landlock`' },
                { zh: '那个启动器是他们**自己写的**，约三百行的 C 代码：先给自己戴上手铐，再变身成你要跑的那条命令，变身之后手铐还在。', en: 'The launcher is **written by them**, roughly three hundred lines of C: it handcuffs itself first, then execs the command you wanted, and the handcuffs stay on after exec.' },
              ],
              [
                { zh: 'Windows', en: 'Windows' },
                { zh: '受限令牌', en: 'Restricted token' },
                { zh: '一些边界情况会落到「部分执法」这一档。', en: 'Some edge cases fall into the "partial enforcement" tier.' },
              ],
            ],
            note: {
              zh: '这三样共同的性质是**自己焊死的门**：进程在开工前跟内核说一句「从现在起，我这一支的所有后代只准动这几个路径」，内核记下来，然后进程自己也没法把这句话收回去。哪怕它后面被完全攻陷、执行了任意代码，那段代码也只能在圈里活动。',
              en: 'All three share the property of a **self-welded door**: before starting, the process tells the kernel "from now on every descendant of mine may only touch these paths", the kernel records it, and the process itself cannot take that sentence back. Even if it is later fully compromised and runs arbitrary code, that code can only move inside the circle.',
            },
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'list',
            zh: [
              '**焊死不等于焊得严。** 它自己有一档叫「部分执法」，意思是这个后端只管住了承诺里的一部分（旧内核、Windows 那条路上的一些边界情况都会落到这一档）。它会老实告诉你，但够不够用要你自己判断。',
              '**焊的只有文件。** 网络完全不在这套词汇的管辖范围内，这是设计者明写的空白。沙箱拦得住「改你的文件」，拦不住「往外发请求」。',
              '**沙箱不可用时，它停下来。** macOS 那扇门用的是被苹果标为「已弃用」的工具，他们加了探测——真没了就拒绝执行，而不是悄悄降级。',
            ],
            en: [
              '**Welded does not mean watertight.** It has its own "partial enforcement" tier, meaning the backend held only part of its promise (old kernels and some Windows edge cases land here). It tells you honestly, but whether that is enough is your call.',
              '**Only files are welded.** Networking is entirely outside this vocabulary\'s jurisdiction—an acknowledged gap by design. The sandbox stops "change your file"; it does not stop "send a request out".',
              '**When the sandbox is unavailable, it stops.** The macOS door is welded with a tool Apple flagged "deprecated"; they added a probe—if it truly vanishes, dsh refuses to execute rather than quietly degrading.',
            ],
          },
        ],
      },
      {
        id: 'perm-checklist',
        title: { zh: '上手前的权限清单', en: 'A permissions checklist before you start' },
        blocks: [
          {
            type: 'checklist',
            title: { zh: '开第一句话之前，逐条对一遍', en: 'Walk this before your first message' },
            items: [
              { zh: '确认会话开在「**工作区内修改**」档（日志第 0 行 `permission/preset: workspace-write`）。', en: 'Confirm the session opens on "**edit inside workspace**" (log line 0 `permission/preset: workspace-write`).' },
              { zh: '确认审批策略是「**问**」（日志第 2 行 `approval/policy: ask`），别在自动化脚本里指望它会替你放行。', en: 'Confirm the approval policy is "**ask**" (log line 2 `approval/policy: ask`)—never count on it auto-approving inside a script.' },
              { zh: '知道**没有「总是允许」**：同一条升权命令下次还会再问。', en: 'Know that **there is no "always allow"**: the same escalation asks again next time.' },
              { zh: '决定要不要用生产密钥——**存下来的凭据对模型没有边界**（0600 挡不住同用户的 bash）。', en: 'Decide whether to use production keys—**stored credentials have no boundary against the model** (0600 does not stop bash running as your user).' },
              { zh: '记住这套词汇**只管文件、不管网络**；往外发请求不在沙箱管辖内。', en: 'Remember this vocabulary **governs files, not the network**; sending requests out is outside the sandbox.' },
              { zh: '要切换沙箱档位前，**先关掉当前开着的终端会话**，否则切换被拒绝。', en: 'Before switching tiers, **close any open terminal session**, or the switch is refused.' },
            ],
          },
          {
            type: 'links',
            title: { zh: '延伸阅读', en: 'Go deeper' },
            items: [
              {
                label: { zh: '四种模式', en: 'The four modes' },
                href: '/chapter/modes',
                desc: { zh: '创造模式装插件那一步要你点「允许一次」交出完全权限。', en: 'Installing a plugin in creator mode is the step where you hand over full access via "allow once".' },
              },
              {
                label: { zh: '从 Claude Code 搬过来', en: 'Migrating from Claude Code' },
                href: '/chapter/migration',
                desc: { zh: 'Claude Code 那份逐条权限名单，跟这里的三档门禁是反着理解的。', en: 'Claude Code\'s per-rule permission list is the opposite mental model from these three tiers.' },
              },
              {
                label: { zh: '上游仓库', en: 'Upstream repository' },
                href: 'https://github.com/deepseek-ai/DeepSeek-Harness',
                desc: { zh: '沙箱后端、事件目录、被否方案都在源码和笔记里。', en: 'Sandbox backends, the event catalogue and rejected plans all live in the source and notes.' },
                tag: '外链',
              },
            ],
          },
        ],
      },
    ],
    sources: [
      { label: '花叔《DeepSeek Harness》橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
      { label: 'DeepSeek-Harness 仓库 / Upstream Repo', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
      { label: 'DeepSeek 官方文档 / DeepSeek Docs', href: 'https://api-docs.deepseek.com/' },
    ],
    sisters: ['harness-engineering', 'agent-loop-engineering'],
  },
  {
    slug: 'modes',
    num: '03',
    part: 'start',
    icon: 'gauge',
    level: 'starter',
    minutes: 10,
    accent: 'violet',
    title: { zh: '四种模式，人话版', en: 'The Four Modes, in Plain Words' },
    subtitle: {
      zh: '开工前那道四选一，其实压根不在同一个维度上',
      en: 'The four-way choice before you start—four options that are not on the same axis at all.',
    },
    promise: {
      zh: '读完这章你能一眼分清标准 / PTC / 极简 / 创造各自干什么、选错了能不能改、以及它们在你还没开口前各烧多少入场 token。',
      en: 'You will tell standard, PTC, minimal and creator apart at a glance, know whether a mis-pick can be undone, and see how many entry tokens each one burns before you even speak.',
    },
    sections: [
      {
        id: 'not-same-axis',
        title: { zh: '四个选项，压根不在同一个维度', en: 'Four options, not on the same axis' },
        blocks: [
          {
            type: 'p',
            zh: '新会话输入框上方，「默认工作区」旁边就是模式选择器。点开，四行字排成一列，句式统一，看着像四个档位，像空调的低中高。**但它们其实是新手区、高手区、跑分区和极客区，只是界面上没有一个字这么告诉你。** 前三个是给不同的人、在不同场合用的：一个用来干活，一个换了种使唤法，还有一个是拿来测模型的。第四个高一层，它改的是 dsh 本身，它能给另外三个加工具，也能捏出第五个模式。',
            en: 'Above the input box of a new session, next to "default workspace", sits the mode selector. Open it and four lines stack up in identical phrasing—easy to mistake for four fan speeds. **They are really the beginner lane, the power-user lane, the benchmark lane and the hacker lane, but no word on the UI says so.** The first three serve different people in different settings: one for actual work, one that changes how you command it, one for testing the model. The fourth sits a level higher—it edits dsh itself, can add tools to the other three, and can even mint a fifth mode.',
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'callout',
            tone: 'tip',
            title: { zh: '先给答案：选标准模式，别管另外三个', en: 'Short answer: pick standard and ignore the other three' },
            zh: '默认就是标准模式，它也是这四个里**唯一被设计成「99% 的人 99% 的时候用」**的那个。作者直接替你把这个决定做掉：先用标准模式，另外三个后面再说，现在别管。',
            en: 'Standard is the default, and it is the **only one of the four designed for "99% of people, 99% of the time."** The author makes the call for you: start on standard, worry about the other three later, ignore them now.',
          },
          {
            type: 'diagram',
            id: 'modes-radar',
            caption: {
              zh: '四个模式在「谁用」和「改不改 dsh 本身」两根轴上散开——标准、PTC、极简都在用 dsh，只有创造模式改的是 dsh。',
              en: 'The four modes scatter across two axes—"who uses it" and "does it change dsh itself": standard, PTC and minimal all use dsh; only creator mode changes dsh.',
            },
          },
          {
            type: 'list',
            zh: [
              '**标准模式**——那个你已经认识的编码 agent，31 件工具，绝大多数人用它。',
              '**PTC 模式**——能力不减，但模型改成写一段程序去调别的工具（只剩 `run_code` 一件），系统提示词因此涨到四万多字符。',
              '**极简模式**——3 件工具、系统提示词仅 225 字符，给测模型基础能力用的。',
              '**创造模式**——34 件工具，让 agent 写插件、装插件，改的是 dsh 本身，也能捏出第五个模式。',
            ],
            en: [
              '**Standard** — the coding agent you already recognise: 31 tools, the one almost everyone should use.',
              '**PTC** — no capability lost, but the model switches to writing a program that calls the other tools (only `run_code` remains), and the system prompt balloons past forty thousand characters.',
              '**Minimal** — 3 tools, a 225-character system prompt, built for benchmarking a model\'s base ability.',
              '**Creator** — 34 tools; the agent writes and installs plugins, edits dsh itself, and can even mint a fifth mode.',
            ],
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
        ],
      },
      {
        id: 'tools-and-prompts',
        title: { zh: '工具数与系统提示词：一张对照表', en: 'Tool counts and system prompts: one table' },
        blocks: [
          {
            type: 'p',
            zh: '下面这张表的工具数，是作者 10 月在四个模式下各发一句话、**从会话日志的请求头里数出来的**（不是读文档读出来的）。标准模式从 8 月的 25 件涨到 10 月的 31 件；PTC 只剩 1 件；极简 3 件；创造是标准 31 件＋两件只读自检工具＋一个插件管理器，共 34 件。',
            en: 'The tool counts below were counted by the author in October—one line sent in each mode, then read **out of the request headers in the session log**, not out of the docs. Standard grew from 25 tools in August to 31 in October; PTC is down to a single tool; minimal has 3; creator is standard\'s 31 plus two read-only self-check tools plus a plugin manager, 34 in total.',
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'table',
            head: [
              { zh: '模式（内部代号）', en: 'Mode (internal codename)' },
              { zh: '模型手里的工具', en: 'Tools in hand' },
              { zh: '10 月系统提示词字符数', en: 'Oct system-prompt chars' },
              { zh: '它其实是干什么的', en: 'What it is really for' },
            ],
            rows: [
              [
                { zh: '标准模式（standard）', en: 'Standard (`standard`)' },
                { zh: '**31 件**', en: '**31**' },
                { zh: '5,608 字符（8 月 4,100）', en: '5,608 chars (Aug 4,100)' },
                { zh: '文件、命令行、检索、技能、计划、目标、子代理、工作流、定时任务、联网——就用它。', en: 'Files, shell, search, skills, planning, goals, sub-agents, workflows, scheduling, web—just use this one.' },
              ],
              [
                { zh: 'PTC 模式（ptc）', en: 'PTC (`ptc`)' },
                { zh: '**1 件**（`run_code`）', en: '**1** (`run_code`)' },
                { zh: '41,267 字符（8 月 35,643）', en: '41,267 chars (Aug 35,643)' },
                { zh: '能力不减，但模型改成写一段程序去调别的工具。提示词因此涨到四万多字符，8 月实测第一轮反而多花约 9%。', en: 'No capability lost, but the model switches to writing a program that calls the other tools. The prompt balloons past 40K chars; in August the first round actually cost ~9% more.' },
              ],
              [
                { zh: '极简模式（minimal）', en: 'Minimal (`minimal`)' },
                { zh: '**3 件**（命令行、读图、切换工作目录）', en: '**3** (shell, read image, change working dir)' },
                { zh: '225 字符', en: '225 chars' },
                { zh: '系统提示词只有一两百字符，给测模型基础能力用的。', en: 'A system prompt of only a couple hundred characters, made for benchmarking a model\'s base ability.' },
              ],
              [
                { zh: '创造模式（cordis）', en: 'Creator (`cordis`)' },
                { zh: '**34 件**', en: '**34**' },
                { zh: '（= 标准 31 件 ＋ 2 件只读自检 ＋ 插件管理器）', en: '(= standard 31 + 2 read-only self-check + plugin manager)' },
                { zh: '让 agent 写插件、装插件，改的是 dsh 本身，也能捏出第五个模式。', en: 'Lets the agent write and install plugins, edits dsh itself, and can mint a fifth mode.' },
              ],
            ],
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'p',
            zh: '自己数一遍。这场番茄钟在 10 月打出来就是 31，工具清单全文躺在日志的 `request/header` 记录里：',
            en: 'Count it yourself. This October pomodoro run printed 31; the full tool list lives in the log\'s `request/header` records:',
          },
          {
            type: 'code',
            lang: 'bash',
            title: '从会话日志里数工具数',
            code: "zstd -dc ~/.dsh/sessions/*/session-*/session.v4.jsonl.zstd | python3 -c \"import json,sys; [print(len(d['data']['header']['tools'])) for d in map(json.loads, sys.stdin) if d.get('type')=='request/header']\"",
            note: {
              zh: '10 月这条命令在番茄钟那一场打出来是 **31**，31 件工具；8 月的文件名不带 `.v4`，打出来是 25。路径里那个星号会把所有会话都卷进来，只想看一场就把它换成那一场的目录名。',
              en: 'In October this command printed **31** for the pomodoro run, 31 tools; August\'s filenames lack `.v4` and printed 25. The wildcard sweeps in every session—swap it for one folder name to scope to a single run.',
            },
          },
          {
            type: 'callout',
            tone: 'note',
            title: { zh: '两处跟 8 月不一样', en: 'Two things changed since August' },
            zh: '标准模式从 25 件涨到 31 件：多了**提问用户、交付文件卡片、四件定时任务、网页抓取、切换工作目录**，少了一个叫 **Ralph 的循环工具**和一个**按原文替换的编辑器**（代码里叫 `str_replace_editor`）。极简模式 8 月是「命令行加一个编辑器、没有上下文压缩」，现在换成了**命令行加读图，也支持上下文压缩了**。',
            en: 'Standard grew from 25 to 31: it added **ask-the-user, file-delivery cards, four scheduler tools, web fetch, and change-working-dir**, and dropped a loop tool called **Ralph** plus a **literal-replace editor** (in code, `str_replace_editor`). Minimal in August was "shell plus one editor, no context compaction"; it is now **shell plus read-image, and it supports context compaction too**.',
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
        ],
      },
      {
        id: 'entry-token-cost',
        title: { zh: '还没开口，四个模式各烧多少入场费', en: 'Before you speak: each mode\'s entry fee' },
        blocks: [
          {
            type: 'p',
            zh: '第一个请求真正发出去的输入里，一大半是 harness 替你先付的「入场费」——系统提示词＋工具说明书＋塞进上下文的那份技能目录。番茄钟那一场的第一个请求是 **18,117 个 token**（其中 **17,920 个命中了缓存**，因为前一场失败的会话已经把同样的开头焐热了）。8 月这场是 13,838 个 token。',
            en: 'Most of the real first-request input is an **entry fee** the harness pays before you speak: system prompt + tool manuals + the skill catalogue injected into context. The pomodoro\'s first request was **18,117 tokens** (of which **17,920 hit cache**, because an earlier failed session had already warmed the same prefix). The August equivalent was 13,838 tokens.',
            source: { label: 'DeepSeek 定价页 / DeepSeek Pricing', href: 'https://api-docs.deepseek.com/quick_start/pricing' },
          },
          {
            type: 'table',
            head: [
              { zh: '模式', en: 'Mode' },
              { zh: '入场费怎么变', en: 'How the entry fee moves' },
              { zh: '为什么', en: 'Why' },
            ],
            rows: [
              [
                { zh: '标准', en: 'Standard' },
                { zh: '10 月 18,117（8 月 13,838），大头是工具说明书和技能目录', en: '18,117 in Oct (13,838 in Aug); the bulk is tool manuals plus the skill catalogue' },
                { zh: '31 件工具的说明书最长；你问的那句话只是一条窄缝。', en: '31 tool manuals dominate; your actual question is just a thin slice.' },
              ],
              [
                { zh: 'PTC', en: 'PTC' },
                { zh: '工具参数表从 26,894 字符缩到 897，但首轮反而**多花约 9%**', en: 'Tool-param table shrinks from 26,894 to 897 chars, yet the first round **costs ~9% more**' },
                { zh: '那 25 件工具的定义一个字没消失，只是从工具清单挪进了系统提示词（涨到四万多字符）。', en: 'Those 25 tool definitions did not vanish—they moved from the tool list into the system prompt (now past 40K chars).' },
              ],
              [
                { zh: '极简', en: 'Minimal' },
                { zh: '系统提示词仅 225 字符，入场费最低', en: 'A 225-character system prompt makes it the cheapest to enter' },
                { zh: '没有搜索、没有子代理、没有上网，**也没有你的技能库**——那份 1.6 万字符的技能目录不再进上下文。', en: 'No search, no sub-agents, no web—and **no skill library**; the ~16K-char skill catalogue stops entering context.' },
              ],
            ],
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: 'PTC「收成 1 件工具」不等于省钱', en: '"Collapsing PTC to one tool" is not a saving' },
            zh: 'PTC 听起来把一堆工具收成 1 件（`run_code`），应该更省——**8 月实测结果是反的**。工具说明书确实从 26,894 字符缩到 897，但系统提示词从 4,100 涨到 35,643。25 件工具的类型定义一个字都没消失，只是换了个格式、从信封外面搬进信封里面。换算到第一轮真正发出去的输入，**不但没省，还多花了约 9%**。10 月作者只在 PTC 里问了一句不调工具的话，量到模型手里仍然只有 `run_code` 一件，系统提示词涨到 41,267 字符。',
            en: 'PTC sounds cheaper—many tools collapsed into one (`run_code`). **The August measurement came out the opposite way.** Tool manuals did shrink from 26,894 to 897 characters, but the system prompt grew from 4,100 to 35,643. Those 25 tool type definitions never disappeared; they only switched format and moved from outside the envelope to inside it. Measured against the real first-round input, it did not save—**it spent about 9% more.** In October the author asked one no-tool line in PTC and again measured exactly one tool, `run_code`, with the system prompt grown to 41,267 characters.',
          },
        ],
      },
      {
        id: 'can-i-switch',
        title: { zh: '选错了能不能改', en: 'Can you undo a wrong pick' },
        blocks: [
          {
            type: 'diagram',
            id: 'mode-decision',
            caption: {
              zh: '决策树：绝大多数时候直接落到标准模式；要测模型底子在极简、让模型写程序编排走 PTC、要改 dsh 本身才进创造。',
              en: 'Decision tree: almost all paths land on standard; test the raw model in minimal, let the model orchestrate via code in PTC, and only touch creator when you mean to change dsh itself.',
            },
          },
          {
            type: 'p',
            zh: '模式在**新会话那一屏**选。第一句话发出去之后，会话头上只剩一个写着模式名的**灰色标签，点它没反应**。想换，开一场新会话。',
            en: 'You pick the mode **on the new-session screen**. After the first message goes out, all that remains in the session header is a **grey label showing the mode name; clicking it does nothing.** To switch, start a new session.',
          },
          {
            type: 'quote',
            zh: '「Switching is allowed only while a session is blank. Once a turn has run, that history was produced under the preset\'s tools and swapping them would strand logged tool calls.」——只有在会话还是空白时才允许切换。一旦跑过一轮，那段历史就是在这套工具下产生的，换掉工具会让已经记下的调用变成孤儿。',
            en: '"Switching is allowed only while a session is blank. Once a turn has run, that history was produced under the preset\'s tools and swapping them would strand logged tool calls." You may switch only while the session is empty; run a turn and that history was produced under this preset\'s tools—swap them and every logged call becomes an orphan.',
            cite: { zh: '8 月橙皮书作者读到的一篇内部工程笔记', en: 'An August engineering note the author read internally' },
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'p',
            zh: '**他们是故意的：不想在那儿放一个按下去必定失败的按钮。** 还有一个现象是装完插件才看到的：**你装的插件对四个模式都生效。** 作者在创造模式里装了那个数汉字的插件之后，极简模式手里也多了它，从 3 件变成 4 件。',
            en: '**This is deliberate: they refused to leave a button there that always fails when pressed.** One effect the author only saw after installing a plugin: **a plugin you install applies to all four modes.** After he installed the count-Chinese-characters plugin in creator mode, minimal picked it up too—3 tools became 4.',
          },
          {
            type: 'list',
            zh: [
              '**标准模式**给你能干完整编码活的 agent，能力面跟你在别的编码 agent 里习惯的那一档对齐。绝大多数人用它。本书后面凡是没特别说明的数字，都是标准模式下量的。',
              '**不用标准会怎样：** 极简模式没有搜索、没有子代理、没有你的技能库；PTC 能力不减，但它改变了模型说话的形状；创造模式能改 dsh 本身，装插件那一步要你点「允许一次」交出完全权限。',
            ],
            en: [
              '**Standard** gives you an agent that can finish real coding work, with a capability surface matching the tier you are used to in other coding agents. Most people use it. Every number later in this book that is not otherwise qualified was measured in standard mode.',
              '**If you do not use standard:** minimal has no search, no sub-agents, no skill library; PTC keeps all capability but changes the shape of how the model speaks; creator can edit dsh itself, and installing a plugin is the step that makes you click "allow once" and hand over full access.',
            ],
          },
        ],
      },
      {
        id: 'scope-limits',
        title: { zh: '这四选一只在网页版和桌面版存在', en: 'This four-way choice exists only in web and desktop' },
        blocks: [
          {
            type: 'p',
            zh: '最后一条范围限定：**这四个模式只在网页版和桌面版的界面里存在。** 设置→Agent 预设那一页能看到它们各自的说明和用法，四个的内部代号分别是 `standard`、`ptc`、`minimal`、`cordis`。**你要是走没有界面的命令行模式或者 Python 那条路，没有「四选一」这回事，用的是另一套配置。**',
            en: 'One last scope limit: **these four modes exist only in the web and desktop UI.** Under Settings → Agent presets you see each mode\'s description and usage; the four internal codenames are `standard`, `ptc`, `minimal`, `cordis`. **If you run the headless command-line mode or the Python path, there is no four-way choice at all—you are on a different config system.**',
          },
          {
            type: 'code',
            lang: 'bash',
            title: '看每个模式的配置文件行数',
            code: 'wc -l config/agent-presets/*/agent.cordis.yml',
            note: {
              zh: '极简模式那份配置只有 62 行，搜一遍，`skill` 这个词零命中（这条是读配置读出来的，那个模式作者没实跑过）——**在那个模式下，你的技能库整个不存在。**',
              en: 'The minimal-mode config is only 62 lines; search it and the word `skill` has zero hits (read from the config, not actually run by the author). **In that mode, your entire skill library simply does not exist.**',
            },
          },
          {
            type: 'callout',
            tone: 'note',
            title: { zh: '还有一个开关管着这道题', en: 'One more switch governs this whole question' },
            zh: '设置→通用设置里的「**显示代码工作视图**」。按设置页的说明和官方文档，它**开着的时候，模式选择器才给你完整的四个模式、才有轨迹页和代码差异视图**。出厂是开着的。关掉之后选择器变成什么样，作者没截对比图。',
            en: 'Under Settings → General there is "**show code work view**." Per the settings page and the official docs, **while it is on the mode selector gives you all four modes, the trace page, and the code diff view.** It is on at the factory. What the selector degrades into when switched off was not screenshotted by the author.',
            source: { label: 'DeepSeek 官方文档 / DeepSeek Docs', href: 'https://api-docs.deepseek.com/' },
          },
          {
            type: 'links',
            title: { zh: '延伸阅读', en: 'Go deeper' },
            items: [
              {
                label: { zh: 'PTC 原理（§08）', en: 'PTC internals (§08)' },
                href: '/chapter/ptc',
                desc: { zh: '让模型写一段程序去批量调工具，能力不减但形状变了。', en: 'Let the model write a program to batch-call tools—full capability, different shape.' },
              },
              {
                label: { zh: '创造模式（§07）', en: 'Creator mode (§07)' },
                href: '/chapter/creator-mode',
                desc: { zh: '让 agent 自己写插件、装插件，改的是 dsh 本身。', en: 'The agent writes and installs plugins—editing dsh itself.' },
              },
              {
                label: { zh: 'Anthropic 代码执行工具', en: 'Anthropic Code Execution Tool' },
                href: 'https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/code-execution-tool',
                desc: { zh: 'PTC 这条思路不是 DeepSeek 首创，Anthropic 的 Programmatic Tool Calling 是同一路。', en: 'PTC is not a DeepSeek invention—Anthropic\'s Programmatic Tool Calling is the same idea.' },
                tag: '外链',
              },
              {
                label: { zh: '成本与缓存（§06）', en: 'Cost & caching (§06)' },
                href: '/chapter/cost',
                desc: { zh: '那 18,117 个入场 token 值多少钱，缓存命中怎么算。', en: 'What the 18,117 entry tokens cost, and how cache hits are priced.' },
              },
            ],
          },
        ],
      },
    ],
    sources: [
      { label: '花叔《DeepSeek Harness》橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
      { label: 'Anthropic 代码执行工具 / Anthropic Code Execution', href: 'https://docs.anthropic.com/en/docs/agents-and-tools/tool-use/code-execution-tool' },
      { label: 'DeepSeek 官方文档 / DeepSeek Docs', href: 'https://api-docs.deepseek.com/' },
      { label: 'DeepSeek 定价页 / DeepSeek Pricing', href: 'https://api-docs.deepseek.com/quick_start/pricing' },
    ],
    sisters: ['harness-engineering', 'agent-ontology', 'better-agent'],
  },
  {
    slug: 'migration',
    num: '04',
    part: 'start',
    icon: 'merge',
    level: 'starter',
    minutes: 15,
    accent: 'green',
    title: { zh: '从 Claude Code 搬过来，哪些能直接用', en: 'Migrating from Claude Code' },
    subtitle: {
      zh: '换不换新 agent，看你那堆家当能不能搬进去',
      en: 'Whether to switch agents comes down to whether your existing pile of stuff fits through the door.',
    },
    promise: {
      zh: '读完这章你能知道 skill、AGENTS.md、MCP、钩子哪些原样能用、哪些要补一条命令、哪些根本搬不过去，以及那个「装好了其实一条都没生效」的大小写坑。',
      en: 'You will know which of your skills, AGENTS.md, MCP servers and hooks work as-is, which need one extra command, which cannot be carried at all—and the casing trap where a hook "installs fine" yet blocks nothing.',
    },
    sections: [
      {
        id: 'first-question',
        title: { zh: '我装完问它的第一句话', en: 'The first thing I asked after installing' },
        blocks: [
          {
            type: 'p',
            zh: '装完之后，作者没让它写代码，打的第一句话是：**把你现在能调用的技能全部列出来，一行一个。** 因为他不写代码，攒下的全部家当就是那一堆 skill 文件夹——公众号写作的、生图的、剪视频的、模拟某个人怎么思考的。任何一个新工具，**能不能读到它们，决定要不要认真对待它。** 它列了 **57 条**。数了一遍那个目录，也是 57 个。一个不少。（10 月目录涨到 74 个，它的技能目录里也是 74 条。）**没装任何东西，没改任何配置文件。**',
            en: 'Right after installing, the author did not ask it to write code. His first line was: **list every skill you can currently call, one per line.** He does not write code—his entire estate is a pile of skill folders: WeChat writing, image generation, video editing, simulating how a specific person thinks. For any new tool, **whether it can read them decides whether the tool is worth taking seriously.** It listed **57**. Counting the folder: also 57. Not one missing. (By October the folder had grown to 74 and its skill catalogue showed 74.) **He installed nothing and changed no config file.**',
          },
          {
            type: 'code',
            lang: 'bash',
            title: '别用错数法：ls 会把 .git 也当成一份技能',
            code: 'ls ~/.agents/skills | wc -l\nls -d ~/.agents/skills/*/ | wc -l',
            note: {
              zh: '第一次数用的是 `ls ~/.agents/skills | wc -l`，得到 **58**——`ls` 把目录里那个 `.git` 也当成一份技能算进去了。要数文件夹得写成 `ls -d ~/.agents/skills/*/ | wc -l`。书里每个数字都尽量给出数法，你能自己复现的才算数。',
              en: 'The first count used `ls ~/.agents/skills | wc -l` and got **58**—`ls` was counting the `.git` entry as a skill. To count folders you have to write `ls -d ~/.agents/skills/*/ | wc -l`. Every number in the book comes with its measurement recipe: a figure you cannot reproduce yourself does not count.',
            },
          },
          {
            type: 'p',
            zh: 'DSH 在每次对话开头，会往上下文里塞一段技能目录。作者从会话日志里把它捞了出来——**这是 DeepSeek 的产品，在读我为 Claude Code 写的东西，而且是原样读走的。零配置。**',
            en: 'DSH injects a skill catalogue into the context at the start of every conversation. The author fished it out of a session log—**this is a DeepSeek product reading the things he wrote for Claude Code, verbatim. Zero configuration.**',
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'code',
            lang: 'text',
            title: '技能目录是这样被注入上下文的',
            code: '<system-reminder>\nA skill is a reusable set of task-specific instructions.\nThe following skills are available in this session:\n\n<available_skills>\n- `agent-reach`: Give your AI agent eyes to see the entire internet...\n ...\n- `zhang-xiaolong-perspective`: 张小龙的视角：产品定义、功能取舍、平台\n  规则设计、去中心化生态。说「用张小龙的视角」「张小龙会怎么看」…\n</available_skills>\n</system-reminder>',
            note: {
              zh: '中间 56 条略。模型平时看到的 skill 目录，只有名字和描述两样，描述还会被截断，默认上限 500 字符。',
              en: 'The middle 56 entries are elided. What the model normally sees of a skill is just its name and description, and the description is truncated at a default ceiling of 500 characters.',
            },
          },
        ],
      },
      {
        id: 'three-column',
        title: { zh: '结论摊开，以及你自己怎么验', en: 'The verdict, and how to verify it yourself' },
        blocks: [
          {
            type: 'table',
            head: [
              { zh: '你在 Claude Code 里的家当', en: 'Your Claude Code estate' },
              { zh: '结论', en: 'Verdict' },
              { zh: '代价（实测）', en: 'Cost (tested)' },
            ],
            rows: [
              [
                { zh: '`~/.agents/skills`、项目里的 `.agents/skills`、`AGENTS.md` / `CLAUDE.md`', en: '`~/.agents/skills`, project `.agents/skills`, `AGENTS.md` / `CLAUDE.md`' },
                { zh: '**能直接用**', en: '**Works as-is**' },
                { zh: '无。57 个 skill 全部被列出；规则文件两份内容一样时自动去重。', en: 'None. All 57 skills were listed; duplicate rule files auto-dedupe when byte-identical.' },
              ],
              [
                { zh: '`~/.claude/skills` 下的 skill、`~/.claude/CLAUDE.md`（全局规则）', en: 'Skills under `~/.claude/skills`, global `~/.claude/CLAUDE.md`' },
                { zh: '**默认看不见**', en: '**Invisible by default**' },
                { zh: 'skill 补一条软链（或改一行配置）；全局规则放到 `~/.agents/AGENTS.md` 它就读（0.2 起）。', en: 'Add one symlink (or one config line) for skills; move global rules to `~/.agents/AGENTS.md` and it will read them (from 0.2 on).' },
              ],
              [
                { zh: 'MCP 服务器', en: 'MCP servers' },
                { zh: '**要改**：能用，配置自己写', en: '**Needs edits**: works, you write the config' },
                { zh: '实测跑通，5 分钟，4 分钟在装包。', en: 'Verified working in 5 minutes, 4 of which were spent waiting on npm.' },
              ],
              [
                { zh: '`.claude/hooks.json`（钩子）', en: '`.claude/hooks.json` (hooks)' },
                { zh: '**要改**：装两个包＋写配置＋改大小写', en: '**Needs edits**: two packages + config + casing' },
                { zh: '实测拦住了工具调用。30 个事件支持 7 个（8 月数）。', en: 'Verified to actually block a tool call. 7 of 30 events supported (an August count).' },
              ],
              [
                { zh: '把一个任务外包给 Claude Code', en: 'Outsourcing a task to Claude Code' },
                { zh: '**要改**：能用，要多下一份包', en: '**Needs edits**: works, but download one more package' },
                { zh: '8 月实测跑通，用自己的订阅登录态；0.2 改成插件页按需安装，没复测。', en: 'Worked in August using his subscription login; in 0.2 it moved to a plugin-page install, which he could not re-verify.' },
              ],
              [
                { zh: '会话记录', en: 'Session history' },
                { zh: '**搬不过去**：完全不通', en: '**Cannot carry**: totally incompatible' },
                { zh: '没有导入器，两边不是一种东西。', en: 'There is no importer; the two sides store different things.' },
              ],
              [
                { zh: '自定义斜杠命令', en: 'Custom slash commands' },
                { zh: '**搬不过去**：不支持', en: '**Cannot carry**: not supported' },
                { zh: '8 月只有 6 条，10 月多了几条，仍不能自己加。', en: 'Only 6 in August; a few more in October; you still cannot add your own.' },
              ],
              [
                { zh: '权限档位、`settings.json`', en: 'Permission tiers, `settings.json`' },
                { zh: '**搬不过去**：别硬映射', en: '**Cannot carry**: do not force a mapping' },
                { zh: '概念对不上，见本章末。', en: 'The concepts do not line up; see the end of this chapter.' },
              ],
            ],
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'quote',
            zh: '一句话版：文字类的资产几乎完全兼容，skill 和规则文件放那儿它就认。配置类的（MCP、钩子、权限）零件都在，接线得你自己接。历史数据完全不通。',
            en: 'In one line: text-shaped assets are almost fully compatible—drop a skill or rule file in place and it is picked up. Configuration (MCP, hooks, permissions) has every part present but you must do the wiring yourself. Historical data does not transfer at all.',
            cite: { zh: '橙皮书作者对整章的总结', en: 'The author\'s own summary of the chapter' },
          },
          {
            type: 'callout',
            tone: 'note',
            title: { zh: '这个说法的失真处', en: 'Where that summary misleads' },
            zh: 'skill 能直接用，**跟 DeepSeek 做没做兼容层没关系**。`~/.agents/skills` 本来就是几家 agent 产品约定俗成的公共抽屉，DSH 只是把它列进了自己的扫描路径。',
            en: 'Skills working as-is has **nothing to do with DeepSeek writing a compatibility layer.** `~/.agents/skills` was already the shared drawer a few agent products settled on by convention—DSH simply listed it among its scan paths.',
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '这一章是全书的例外：数字默认是 8 月的', en: 'This chapter is the book\'s exception: numbers default to August' },
            zh: '搬家实测是 **8 月在 0.1 版**上做的，正文里的实测数字默认是 8 月的。10 月在 0.2.1-rc.2 上复查了能复查的几处，结果写进了各小节。**外包给 Claude Code、Codex 的能力，按发布说明改成了插件页按需安装的组合包，作者在插件页没找到这个入口，没有复测。** 本章的搬家实测全部是在无界面模式跑的，钩子、MCP、外包子代理这三条路都没在网页界面里复验过一遍。',
            en: 'The migration testing was done **in August against 0.1**, so the numbers in this chapter default to August unless noted. October rechecks on 0.2.1-rc.2 are folded into the individual sections where they exist. **The capability to outsource tasks to Claude Code or Codex was, per the release notes, turned into an on-demand plugin-page bundle; the author could not find that entry on the plugin page and did not retest it.** Every migration test in this chapter was run in headless mode—the hook, MCP and outsourced-subagent paths were never re-verified inside the web UI.',
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'p',
            zh: '上面那一列写的是这台机器上的结果。**搬家这件事没有「一般情况」**，每个人抽屉里的东西不一样，所以三条最要紧的，给你最短的验法，自己跑一遍比信那张表管用。',
            en: 'That column reflects one machine. **There is no "typical case" for migration** — everyone\'s drawers hold different things. For the three items that matter most, here is the shortest check, and running it yourself beats trusting the table.',
          },
          {
            type: 'steps',
            items: [
              {
                title: { zh: 'skill 有没有被读到', en: 'Are skills being read' },
                desc: {
                  zh: '装完第一句话就打「把你现在能调用的技能全部列出来，一行一个」，拿它列出来的条数跟 `ls -d ~/.agents/skills/*/ | wc -l` 对一遍。对不上，就是有 skill 的名字字段写错了被静默作废了。',
                  en: 'First message after install: "list every skill you can call, one per line." Compare its count against `ls -d ~/.agents/skills/*/ | wc -l`. A mismatch means a skill with a bad `name` field has been silently voided.',
                },
              },
              {
                title: { zh: '规则文件有没有生效', en: 'Are rule files in force' },
                desc: {
                  zh: '笨办法三步：在一个临时目录里放三份规则文件、每份埋一个只有你认得的暗号、让模型把它收到的规则来源原样复述一遍。十分钟，你会知道自己这套目录结构下它到底读了几份。',
                  en: 'A dumb but reliable trick: place three rule files in a temp folder, embed a passphrase only you recognise in each one, and ask the model to recite the sources of the rules it received. Ten minutes, and you know how many files it actually read under your layout.',
                },
              },
              {
                title: { zh: '钩子拦没拦住', en: 'Are hooks actually blocking' },
                desc: {
                  zh: '这条最要紧，因为它是**静默失效**的。把要拦的工具名写成全小写，挂上去，跑一句最简单的 shell 任务，看它是不是真的被拦住了。**拦不住的时候，它一句报错都不会给你。**',
                  en: 'The most important one, because it **fails silently**. Write the tool name you want to block in all lowercase, install the hook, run one trivial shell command, and see whether it really gets stopped. **When it fails to stop anything, it will not print a single error.**',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'skills-and-rules',
        title: { zh: '六个扫描路径 · 只看一层 · AGENTS.md 与 CLAUDE.md', en: 'Six scan paths, one level deep, AGENTS.md vs CLAUDE.md' },
        blocks: [
          {
            type: 'p',
            zh: 'DSH 按顺序扫**六个位置**（10 月起 skill 目录有文件监听，新增、改名、删除不用重启）：项目里的两个、你自己配的一个、它自己家目录下的一个、公共抽屉 `~/.agents/skills`，还有一个随包自带的。公共抽屉是默认值，不需要任何配置。',
            en: 'DSH scans **six locations in order** (from October the skill folders are file-watched: adds, renames and deletions take effect without a restart): two inside the project, one you configure yourself, one in its own home, the shared drawer `~/.agents/skills`, and one shipped in the package. The shared drawer is a default; it needs no configuration.',
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'list',
            zh: [
              '**它读的是文件里写的名字，不是文件夹的名字。** 一个文件夹叫 `huashu-weread`，DSH 列出来的名字却是 `huashu-weread-advisor`。Claude Code 也这样。',
              '**它只往下看一层。** 文件夹里直接放一份说明书才算数，再往里嵌套的它不认，官方文档写的是刻意排除。这条对作者反而是好消息：本机另一个 agent 会把嵌套子目录也当 skill 扫出来，扫出一堆垃圾。',
              '**说明书开头那个名字字段拼错一个字，整份 skill 作废**，只留一条警告。它只认**全小写加连字符**的写法。',
              '**`~/.claude/skills` 不在扫描名单里。** 对只用 Claude Code 的人来说，那是个实实在在的文件夹，DSH 看不见它。补救是**一条软链命令**的事，只是没人告诉你要补。',
            ],
            en: [
              '**It reads the name inside the file, not the folder name.** A folder called `huashu-weread` shows up as `huashu-weread-advisor`. Claude Code does the same.',
              '**It only looks one level down.** A manual placed directly inside a folder counts; anything nested deeper is ignored, and the docs call that deliberate. For the author this is good news — another agent on his machine scans nested sub-folders too and picks up garbage.',
              '**A single typo in the `name` field at the head of the manual voids the whole skill**, leaving only a warning line. It accepts **lowercase with hyphens** and nothing else.',
              '**`~/.claude/skills` is not on the scan list.** For a Claude-Code-only user that is a real folder DSH cannot see. The fix is **one symlink command**—but nobody tells you to run it.',
            ],
          },
          {
            type: 'p',
            zh: 'AGENTS.md 和 CLAUDE.md，**它两个都读**。作者的验证是那个笨办法：第一轮，`CLAUDE.md` 是指向 `AGENTS.md` 的软链（本机真实结构），模型报回来**两条来源、两个暗号**，`CLAUDE.md` 没有单独出现。第二轮，换成一份**内容不同**的真文件，模型报回来**三条来源、三个暗号**，`AGENTS.md` 排在前面。',
            en: 'Both `AGENTS.md` and `CLAUDE.md` are read. The author ran the dumb trick: first round, `CLAUDE.md` was a symlink to `AGENTS.md` (his real layout) and the model reported **two sources, two passphrases**—`CLAUDE.md` did not appear separately. Second round, replace it with a real file of **different content** and the model reported **three sources, three passphrases**, with `AGENTS.md` listed first.',
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '去重的门槛是「逐字节相同」', en: 'Dedupe only fires when the two files are byte-identical' },
            zh: '同一个目录下，两份文件**内容逐字节相同**就只算一份，**漂移了就两份都塞进去**。后一种情况你会白花一份 token。',
            en: 'Inside one directory, the two files count as one **only when their bytes are identical**. Drift apart, and **both are packed in**—the second copy of tokens is money you will burn for nothing.',
          },
          {
            type: 'p',
            zh: '全局规则：8 月它只认自己家目录下那份；**0.2.1-rc.1 起先读 `$DSH_HOME/AGENTS.md`，再读 `~/.agents/AGENTS.md`**（环境变量 **`DSH_AGENTS_HOME` 可以改位置**）。作者那份 4,790 字符的全局规则在 10 月的会话日志里原样出现，标着来源。**你放在 `~/.claude/CLAUDE.md` 的那份它仍然读不到**，挪过去或者做软链。`.claude/rules/` 那个目录和 `@某个路径` 这种导入写法，8 月它明说不支持，用了就当普通文字原样塞给模型。',
            en: 'Global rules: in August it only read its own home copy. **From 0.2.1-rc.1 it reads `$DSH_HOME/AGENTS.md` first, then `~/.agents/AGENTS.md`**—the environment variable **`DSH_AGENTS_HOME` moves the location.** The author\'s 4,790-character global rule appeared verbatim in his October session log with its source tagged. **A file at `~/.claude/CLAUDE.md` is still unreadable**; move it or symlink it. The `.claude/rules/` directory and `@path`-style imports were declared unsupported back in August—write them and they are packed to the model as ordinary text.',
          },
          {
            type: 'callout',
            tone: 'note',
            title: { zh: '它不监视规则文件的外部编辑', en: 'Rule files are not watched for external edits' },
            zh: '你改完 `AGENTS.md` 不会立刻生效，得等它**下一次读写更深的目录**或者**上下文压缩之后**。',
            en: 'Editing `AGENTS.md` on disk does not take effect immediately—you have to wait for it to **read or write a deeper directory**, or for **context compaction** to run.',
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '这四条的前提：标准模式', en: 'All four above assume standard mode' },
            zh: '上面这些建立在**标准模式**前提下。极简模式那份配置只有 62 行，搜一遍 `skill` 这个词零命中（这条是读配置读出来的，那个模式没实跑过）。**在那个模式下，你的技能库整个不存在。**',
            en: 'Everything above assumes **standard mode**. The minimal-mode config is 62 lines with zero hits for the word `skill` (read from config; the author never actually ran that mode). **In minimal mode, your entire skill library does not exist.**',
          },
        ],
      },
      {
        id: 'mcp-and-packages',
        title: { zh: 'MCP 要自己接线 · 35 个包藏在货架上', en: 'MCP is on you · the 35 packages sitting on the shelf' },
        blocks: [
          {
            type: 'list',
            zh: [
              '**好消息**：那个负责连接外部工具的客户端本身就在默认安装里。工具的命名规则也和 Claude Code 一模一样，`mcp__服务器名__工具名`。',
              '**坏消息**：它默认一个都不挂。作者把两份实际组装的配置 dump 出来搜了一遍，命中数是 **0**。它也不会去读你现成的配置文件，无论是项目里的还是 Claude 桌面版的，整个源码和文档翻一遍，**零命中**。**你的 MCP 清单，它一个字都不看。**',
              '全流程实测：**5 分钟**，其中 **4 分钟在等 npm 装包**。挂上之后让它存一句话，另起一个全新会话再问，原样答了出来——**跨会话召回成立**。',
              '四个坑（8 月）：密钥得写在那段配置里，因为它启动子进程前会把看起来像凭据的环境变量全擦掉。服务器崩了不会自动重连，工具还挂在那儿，调用打进一个已经关掉的管道。当时只桥接了工具这一类能力，0.2 补上了读资源，**提示模板仍然不支持**。启动超时用的是 **60 秒默认值**，一个反应慢的服务器会拖慢整个启动。',
            ],
            en: [
              '**Good news:** the MCP client itself is in the default install. Tool naming matches Claude Code exactly: `mcp__server__tool`.',
              '**Bad news:** by default it attaches nothing. Dumping the two real assembled configs and grepping them returned **0 hits**. It does not read your existing config file either — not the project one, not the Claude desktop one — a full pass across source and docs yields **zero hits**. **It will not look at your MCP list at all.**',
              'Full measured flow: **5 minutes, 4 of which were spent waiting on npm.** After attaching, he wrote a fact to it, opened a fresh session, asked again — the answer came back verbatim. **Cross-session recall works.**',
              'Four gotchas from August: keys must be written into the config block, because dsh scrubs anything that looks like a credential from the child process environment. If a server crashes there is no automatic reconnect; the tool stays registered but the call goes into a closed pipe. Only the tools capability was bridged then; 0.2 added resources but **prompt templates are still unsupported.** The launch timeout uses a **60-second default**, so a slow server drags the whole boot.',
            ],
          },
          {
            type: 'p',
            zh: '表里那几项「要多装一条」的，指的是同一批东西：**8 月仓库有 219 个包，装完你本机只有 184 个**，差的 **35 个**（钩子桥、外包给别的产品能力、语言服务、云端沙箱）全都发到 npm 上了，只是不会连带装上。**它们不是没发布，只是要你多敲一条命令。** 普通人会真心想要的五样：语言服务、持久终端、会话检索、换搜索源、外包子代理。他们考虑过「装上但默认休眠」，否掉了——休眠的零件不启动任何进程，**包却还是会进到每一次生产安装里**，为一个默认关着的功能让每个人白下 245MB。10 月按仓库算，**不在默认安装里的官方包是 48 个**。',
            en: 'Every "one more install" in the table refers to the same batch of things: **the August repo had 219 packages, a fresh install landed 184.** The **35** missing ones (the hook bridge, external-agent outsourcing, language services, cloud sandbox) are all published on npm — they simply are not pulled in with the main install. **They were released; you just have to run one more command.** The five a normal person would actually want: language services, persistent terminal, session search, alternate search source, and the outsourced sub-agent. They considered "install but sleep by default" and rejected it — dormant parts start no process, but **the package would still land in every production install**, making everyone download 245MB for a feature that ships off. Counting the repo in October, **48 official packages are outside the default install.**',
          },
          {
            type: 'code',
            lang: 'bash',
            title: '别信任何二手结论：自己去打 npm 接口',
            code: "curl -s -o /dev/null -w \"%{http_code}\" \\\n  https://registry.npmjs.org/@deepseek-ai/dsh-lsp\n# 200",
            note: {
              zh: '作者第一轮查到「35 个包不在安装闭包里」顺手写下结论：这 35 个包**不随产品发布**。第二轮把这 35 个包名逐个打到 npm 官方接口上——**35 个包，35 个都是 200，它们全都发布了。** 正确的说法：摆在货架上，只是装主程序时不连带装上。「仓库里有、装上没有」和「压根没发布」，在所有能搜到的中英文资料里都被混成了一件事。',
              en: 'The author first found "35 packages are not in the install closure" and wrote down the wrong conclusion: those 35 are **not shipped with the product**. On the second pass he hit npm\'s registry API with each of the 35 names — **35 packages, 35 x 200, all of them published.** The correct phrasing is: on the shelf, but not pulled in by the main install. "In the repo, not in the install" and "never published at all" are conflated in almost every source, Chinese and English.',
            },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '装这类包必须加 @next', en: 'You must add @next to install these packages' },
            zh: '还有一个坑跟搬家直接相关，**到 10 月仍然成立**：这些包在 npm 上的**默认版本标签还停在旧版**，照常规命令装会装到 8 月初的旧版——10 月时已经**落后三十多个版本**，接口跟你机器上的主程序对不上。作者装钩子桥就吃了这一下，一口气吐了 **9 条依赖警告**，**包名后面加 `@next`** 才拿得到跟主程序同一批的版本。装完它还会提醒你**这个包没接上去**——文件已经落到硬盘上，你还得**再写一段配置把它挂进运行时**。',
            en: 'There is another trap that hits migration directly and **was still true in October:** the default dist-tag on npm for these packages still points at an old version. Installing with the ordinary command lands you on the early-August build — by October that is **more than 30 versions behind**, and its interface does not line up with the main program on your disk. The author tripped on exactly this while installing the hook bridge and got **9 dependency warnings in one go**; adding **`@next`** to the package name was what finally pulled the same batch as the main program. After install it still warns you the package is **not wired in**—the files are on disk, but you have to **write a config block to hook it into the runtime.**',
          },
        ],
      },
      {
        id: 'hooks-bridge',
        title: { zh: '一份 Claude Code 的 hooks.json，真的拦住了它', en: 'A Claude Code hooks.json really did stop it' },
        blocks: [
          {
            type: 'p',
            zh: '钩子说人话就是「AI 干每件事之前先问一句门卫」，Claude Code 那边最常见的用法是提交前检查。DSH 请了一个**能听懂 Claude Code 方言的翻译**，但翻得不全：按它自己说明书里的对照表，**Claude Code 那边 30 个事件它只认 7 个**，剩下 23 个既不翻译也不吭声（这个总数是它的自述，作者没有另行核对）。认的是这几个：**会话开始、每句话提交前、工具调用前后、停止、子代理起止。**',
            en: 'Hooks, plainly, are "ask the bouncer before the AI does anything"; in Claude Code the common use is a pre-commit check. DSH hired a translator who understands the Claude Code dialect, but the translation is partial: per the bridge\'s own mapping table **it recognises only 7 of Claude Code\'s 30 events**, silently dropping the other 23 (this total is the bridge\'s own claim; the author did not independently verify it). The 7 it does map are: **session start, before each submitted message, before and after each tool call, on stop, and on sub-agent start/end.**',
            source: { label: 'Claude Code 文档 / Claude Code Docs', href: 'https://docs.claude.com/en/docs/claude-code/settings' },
          },
          {
            type: 'p',
            zh: '作者写了一份最小的钩子配置，只有一条规则：拦住所有 shell 命令，理由写成一句能一眼认出来的暗号。挂上，跑一句最简单的任务。模型的原话：',
            en: 'He wrote a minimal hook config with a single rule: block every shell command, and put a passphrase in the reason he would recognise at a glance. He attached it and ran the smallest possible task. The model\'s own words:',
          },
          {
            type: 'code',
            lang: 'text',
            title: '一份 Claude Code 钩子把 DeepSeek 拦下了',
            code: '我跑了，但没跑成——bash 被拦下来了。\n结果没有输出 hello，而是返回了一个错误：\nError: HUASHU-HOOK-BLOCKED: bash is forbidden by\nthe Claude Code hooks.json bridge',
            note: {
              zh: '**一份 Claude Code 的钩子配置，原样拦住了 DeepSeek 的工具调用。你在那边攒下的安全规则不用重写。**',
              en: '**A Claude Code hooks config, unchanged, blocked a DeepSeek tool call. Your safety rules from the other side do not have to be rewritten.**',
            },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: 'Bash 和 bash：静默失效', en: 'Bash vs bash: silent failure' },
            zh: '还有一个坑。把规则里要拦的工具名从 `bash` 改成 **`Bash`**，也就是 Claude Code 里的**正确写法**，别的一个字不动，再跑一次。**它执行了。输出了 hello。钩子静默失效，一句报错都没有。** 原因是两边给工具起的名字不一样：Claude Code 用的是首字母大写那套，DSH 全是小写。规则匹配的就是工具名，对不上就整条不触发，**而且它不会告诉你「我今天一个人都没拦」**。所以照搬一份钩子配置过来，多半不会报错——装好了，看着在跑，其实一条都没生效。',
            en: 'And the trap that matters most. Take the tool name you are blocking and change it from `bash` to **`Bash`**—which is the **correct spelling in Claude Code**—leave everything else alone and run again. **It executed. It printed hello. The hook failed silently and did not emit a single error.** The reason is that the two products named the same tool differently: Claude Code uses the capitalized form, DSH is all-lowercase. The rule matches on the tool name, and when the name does not match the whole rule never fires, **and nothing tells you "I stopped nobody today."** Which is why copying a Claude Code hooks config over will most likely not raise any error either—it installs, it looks like it is running, and in reality not one rule takes effect.',
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'callout',
            tone: 'note',
            title: { zh: '一处能力缺口，和一个未验证的补注', en: 'One capability gap, and an unverified footnote' },
            zh: '还有一处是能力缺口：Claude Code 那边的「**预先批准**」这个动作，DSH 侧根本没有对应物——它只有拒绝和问一下两种，翻译器再全也变不出来。（Codex 那套钩子作者**没实测、只读了文档，10 个事件支持 5 个**，这条标未验证。）',
            en: 'One gap is capability, not naming: Claude Code\'s **pre-approve** action has no counterpart in DSH, which only has reject and ask; no amount of translating conjures a third. (The Codex hooks were **not tested, only read from docs: 5 of 10 events supported**—flagged as unverified.)',
          },
        ],
      },
      {
        id: 'outsource',
        title: { zh: '让 DeepSeek 去使唤我本机的 Claude Code', en: 'Let DeepSeek drive the Claude Code on my machine' },
        blocks: [
          {
            type: 'p',
            zh: '这是作者跑通的第二条重头戏。DSH 设计上能把一个回合**外包给隔壁的 Claude Code 或者 Codex**，发布当天他们把这个能力从默认安装里拆走了。装回来的过程计了时：**3 分 37 秒，多出 259MB**，其中 **245MB 是一个预编译的 Anthropic 二进制文件**，而这次装进去的 DeepSeek 自己的代码，一共 **464KB**。装完还得自己写一段配置把它挂上。',
            en: 'This was the second heavyweight path he got running. DSH can, by design, **outsource a whole turn to the neighbouring Claude Code or Codex**; on launch day the team pulled that capability out of the default install. Re-installing it took a measured **3 minutes 37 seconds and added 259MB**, of which **245MB is a pre-built Anthropic binary**—while the DeepSeek code actually installed in this pass totals just **464KB**. After installing you still have to write a config block to wire it up.',
          },
          {
            type: 'quote',
            zh: 'DeepSeek 的模型去问 Claude 一句「你是哪个产品的哪个模型」，把原话转述回来：「我是 Claude Code 里的 Claude Opus 4.5。」',
            en: 'The DeepSeek model was asked to prompt Claude with "which product are you in, which model are you?" and to relay the answer verbatim: **"I am Claude Opus 4.5, inside Claude Code."**',
            cite: { zh: '橙皮书作者 8 月实测', en: 'The author\'s August measurement' },
          },
          {
            type: 'callout',
            tone: 'idea',
            title: { zh: '整个过程不需要任何 API key', en: 'The whole flow needed no API key' },
            zh: '对我这种订阅用户，有一个细节比功能本身重要：**它故意不去覆盖 Claude 官方 SDK 的配置来源，所以那边照常读本机的登录态。** 整个过程不需要任何 API key——这是作者原本以为会卡死的那道墙，结果它压根不存在。',
            en: 'For a subscription user there is a detail more important than the feature itself: **the bridge deliberately does not override Claude\'s official SDK configuration source, so Claude Code reads the local login state as usual.** The entire flow needed no API key — the wall the author expected to be stopped by simply was not there.',
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'list',
            zh: [
              '**边界一：** 外包出去的子代理拿不到父会话的对话和人格。',
              '**边界二：** 它不会在 Claude Code 那边留下会话记录。',
              '**边界三：** 它也不会弹窗等你确认。',
              '**文档层面的坑：** 随包自带的配置文件里，那两行外包能力旁边还留着一句注释，写着「把停用标记去掉就能用」。你照做会打开一个**永远等不到东西的空位**，因为它点名要的那个零件已经不在包里了。仓库里两个相关说明文件**至今还写着「随包配置已经加载了这个」**。提交记录：说明文件最后一次改是 8 月 10 号，把包拆走发生在 8 月 13 号，也就是公开当天。',
            ],
            en: [
              '**Boundary one:** the outsourced sub-agent never sees the parent conversation or its persona.',
              '**Boundary two:** it does not leave a session record on the Claude Code side.',
              '**Boundary three:** it does not pop an approval card for you either.',
              '**A documentation-level trap:** next to those two outsourcing lines the shipped config file still carries a comment saying "remove the disabled flag and it works." Doing exactly that opens an **empty slot that will never receive anything**, because the part it names is no longer in the package. Two related docs in the repo **still say "the shipped config already loads this."** Git history: those docs were last touched August 10; the package was split out August 13—launch day.',
            ],
          },
          {
            type: 'p',
            zh: '顺便交代一句搬家范围之外的事：官方在 PyPI 上有一个 **`deepseek-harness-sdk`** 包，8 月 13 日公开当天就发了，10 月版本是 0.2.1rc2，官方文档里有一篇 Python SDK 指南。**橙皮书作者本人没用过它**，只能告诉你它在那儿。8 月那句「Python 栈的人别来，它是 TypeScript 生态、没有桥」是**写错了**。',
            en: 'One thing outside the migration checklist: DeepSeek maintains **`deepseek-harness-sdk` on PyPI**, first published on 08-13 (launch day) and at version 0.2.1rc2 in October, with a Python SDK guide in the official docs. The author has not used it personally and can only report that it exists. The August line telling Python users not to bother, "it is a TypeScript ecosystem with no bridge," was **wrong**.',
            source: { label: 'deepseek-harness-sdk (PyPI)', href: 'https://pypi.org/project/deepseek-harness-sdk/' },
          },
        ],
      },
      {
        id: 'three-things-stuck',
        title: { zh: '三样确实搬不了的东西', en: 'Three things that genuinely do not cross' },
        blocks: [
          {
            type: 'p',
            zh: '**会话记录，8 月完全不通。** Claude Code 存的是**消息**，一句你说的一句它说的，用父子关系串成树。DSH 存的是**事件流**，压缩过——解开一次 36 行的会话数了数，里面有推理片段、审批策略、沙箱模式、每一步的起止，其中只有少数几种是模型看得见的。**事件流能还原出聊天记录，反过来做不到，因为大部分格子是空的。** 作者在源码和文档里搜过导入器，**零命中**。',
            en: '**Session history: fully incompatible as of August.** Claude Code stores **messages**—one from you, one from it, chained into a parent-child tree. DSH stores an **event stream**, compressed—opening a 36-line session he counted reasoning fragments, the approval policy, the sandbox mode and start/end stamps for every step, of which only a few types are visible to the model. **An event stream can be reconstructed into chat history, but not the other way, because most of the boxes are empty.** Grepping the source and docs for an importer: **zero hits**.',
          },
          {
            type: 'table',
            head: [
              { zh: 'Claude Code 里', en: 'In Claude Code' },
              { zh: '在 DSH 里', en: 'In DSH' },
            ],
            rows: [
              [
                { zh: '`/compact`', en: '`/compact`' },
                { zh: '`/compact`，**对得上**', en: '`/compact`—**maps directly**' },
              ],
              [
                { zh: '计划模式（快捷键切档）', en: 'Plan mode (keyboard shortcut toggle)' },
                { zh: '`/plan`，做成了命令', en: '`/plan`, turned into a command' },
              ],
              [
                { zh: '`/export`', en: '`/export`' },
                { zh: '`/export`，**只有网页版有**', en: '`/export`—**web only**' },
              ],
              [
                { zh: '`/permissions`', en: '`/permissions`' },
                { zh: '`/permission`，**单数**，只能三选一', en: '`/permission`—**singular**, three-way choice only' },
              ],
              [
                { zh: '目录里丢 md 自定义命令', en: 'Drop an md file to add a custom command' },
                { zh: '**没有**这个入口', en: '**No such entry**' },
              ],
              [
                { zh: '—', en: '—' },
                { zh: '`/goal`、`/feedback`，**DSH 独有**', en: '`/goal` and `/feedback`, **DSH only**' },
              ],
            ],
            note: {
              zh: '**自定义斜杠命令不支持。** Claude Code 里你在一个目录丢个 markdown 文件就多一条命令，DSH 没这个入口。8 月它一共 6 条，全是插件注册的，想加一条得写代码；10 月源码里还能看到 `/new`、`/clear`、`/model`、`/rename`，用户可见的完整清单作者没逐条点。这张对照表是 8 月的。',
              en: '**Custom slash commands are not supported.** In Claude Code dropping a markdown file into a folder adds a command; DSH has no such entry. In August it had exactly 6, all registered by plugins—adding one meant writing code. In October the source still shows `/new`, `/clear`, `/model`, `/rename`, but the author did not enumerate the full user-visible set. This mapping table is August\'s.',
            },
            source: { label: '花叔《DeepSeek Harness》橙皮书 / Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
          },
          {
            type: 'callout',
            tone: 'warn',
            title: { zh: '权限档位：同一个词，两边意思相反', en: 'Permission tiers: the same word means opposite things' },
            zh: '别硬映射，会搬反。Claude Code 的权限是一份**逐条的名单**：这条命令能跑、那个文件不能读。DSH 是**三个门禁等级加一个「要不要叫保安」的开关**，没有按工具名的规则表。同一个词在两边意思相反：DSH 里那个表示「不问」的开关，机制上是需要升权就直接驳回（[第 2 章](/chapter/permissions)讲过），但出厂配置只把它跟「完全权限」绑在一起，而那一档本来就没有需要升权的操作，所以你体感到的是**不弹窗也不拦**。Claude Code 里字面意思相近的那个档位，是**不弹窗直接拒绝**。同一个词，一边体感是全放行，一边是全拦死，照字面搬会搬到反面。还有一层：DSH 的门禁等级是**操作系统层面**的，进程主动把权限交出去就要不回来；Claude Code 的名单是程序自己在检查自己。',
            en: 'Do not force a mapping—this one reverses polarity. Claude Code permissions are a **per-rule list**: this command may run, that file may not be read. DSH is **three gate tiers plus an "call the guard or not" switch**, with no rule table keyed on tool names. The same word carries opposite meanings on the two sides. DSH\'s "do not ask" switch is mechanistically "escalation is refused outright" (see [Chapter 2](/chapter/permissions)), but the factory config only ever pairs it with "full access", a tier that by definition has no operations needing escalation—so what you feel is **no popups and no blocking**. In Claude Code, the similarly-named tier means **no popup, straight rejection**. One word, one side feels like everything passes, the other feels like everything is blocked; porting by the literal wording lands you on the opposite setting. And underneath: DSH\'s tiers are enforced **by the operating system**—once the process hands permissions back it cannot get them again—while Claude Code\'s list is a program checking itself.',
            source: { label: 'Claude Code 概览 / Claude Code Overview', href: 'https://docs.anthropic.com/en/docs/claude-code/overview' },
          },
          {
            type: 'callout',
            tone: 'idea',
            title: { zh: '被否掉的方案：不留「我猜你想写的是这个」的兼容层', en: 'A rejected plan: no "we guess what you meant" compat layer' },
            zh: '前面说过，skill 那份说明书开头的名字字段写错一个字，整个 skill 就作废。有人提过一个很人道的方案：**把驼峰写法也当成合法别名收下来**，别让人因为一个大小写丢掉整份技能。**否了。** 理由：外部格式就是 Claude 那套短横线拼写的约定，而这个产品还没发正式版，没有任何已发布的兼容义务。**宁可让写错的那份整个消失，也不留一个「我猜你想写的是这个」的兼容层。** 好处是你永远不用猜某个 skill 到底以哪种拼写生效；代价是搬过来之后，**值得花五分钟把所有 skill 的名字字段扫一遍**。（出自 2026-07-28-skill-invocation-policy 那篇笔记的被拒方案一节）',
            en: 'Already mentioned: a single typo in a skill\'s `name` field voids the whole skill. Someone proposed a humane fix—**accept camelCase as a legal alias**, so nobody loses a skill over one character of casing. **Rejected.** The reason: the external format is Claude\'s hyphen-lowercase convention, and this product has not shipped a stable release, so there is no compatibility obligation published. **They would rather let the mis-typed one vanish entirely than keep a "we guess what you meant" compat layer.** The upside: you never have to guess which spelling a skill actually resolves under. The cost: after a move it is **worth five minutes sweeping every skill\'s name field.** (From the rejected-plan section of the note `2026-07-28-skill-invocation-policy`.)',
          },
          {
            type: 'links',
            title: { zh: '搬家路上常用的链接', en: 'Links you will want while moving' },
            items: [
              {
                label: { zh: '十分钟上手', en: 'Ten-minute quickstart' },
                href: '/chapter/quickstart',
                desc: { zh: '装完 dsh 再回头看这一章。', en: 'Come back here after dsh is installed.' },
              },
              {
                label: { zh: '它被允许碰什么', en: 'What it may touch' },
                href: '/chapter/permissions',
                desc: { zh: '审批卡片、升权梯子、系统提示词里的运行时策略。', en: 'Approval cards, the escalation ladder, and the runtime policy in the system prompt.' },
              },
              {
                label: { zh: '四种模式', en: 'The four modes' },
                href: '/chapter/modes',
                desc: { zh: '技能库在极简模式下整个不存在。', en: 'Your skill library does not exist at all in minimal mode.' },
              },
              {
                label: { zh: 'Claude Code 设置', en: 'Claude Code settings' },
                href: 'https://docs.claude.com/en/docs/claude-code/settings',
                desc: { zh: '对照 hooks、settings.json、permissions 名单，看看搬什么。', en: 'Reference for hooks, settings.json and the permissions list—what you are moving.' },
                tag: '外链',
              },
              {
                label: { zh: 'Claude Code 最佳实践', en: 'Claude Code best practices' },
                href: 'https://www.anthropic.com/engineering/claude-code-best-practices',
                desc: { zh: 'Anthropic 官方那篇——里面的 skill / hooks / MCP 概念是搬家时的对照物。', en: 'Anthropic\'s own essay—its skill, hooks and MCP concepts are what you cross-check against.' },
                tag: '外链',
              },
              {
                label: { zh: 'deepseek-harness-sdk on PyPI', en: 'deepseek-harness-sdk on PyPI' },
                href: 'https://pypi.org/project/deepseek-harness-sdk/',
                desc: { zh: '官方 Python SDK，8 月 13 日公开当天已发，10 月版本 0.2.1rc2。', en: 'The official Python SDK, first published on August 13 and at 0.2.1rc2 in October.' },
                tag: '外链',
              },
              {
                label: { zh: '上游仓库', en: 'Upstream repository' },
                href: 'https://github.com/deepseek-ai/DeepSeek-Harness',
                desc: { zh: '35 个不随默认安装的包，就在仓库里。', en: 'The 35 packages outside the default install live in this repo.' },
                tag: '外链',
              },
            ],
          },
        ],
      },
    ],
    sources: [
      { label: '花叔《DeepSeek Harness》橙皮书 / Huashu Orange Book', href: 'https://www.huasheng.ai/orange-books/deepseek-harness/read/' },
      { label: 'Claude Code 概览 / Claude Code Overview', href: 'https://docs.anthropic.com/en/docs/claude-code/overview' },
      { label: 'Claude Code 设置 / Claude Code Settings', href: 'https://docs.claude.com/en/docs/claude-code/settings' },
      { label: 'deepseek-harness-sdk (PyPI)', href: 'https://pypi.org/project/deepseek-harness-sdk/' },
      { label: 'DeepSeek-Harness 仓库 / Upstream Repo', href: 'https://github.com/deepseek-ai/DeepSeek-Harness' },
    ],
    sisters: ['mcp-patterns', 'agent-skillhub-patterns', 'harness-engineering'],
  },
]
