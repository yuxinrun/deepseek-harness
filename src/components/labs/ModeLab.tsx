import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../Icon'
import { Reveal } from '../Reveal'
import { useLang } from '../../i18n/LanguageContext'
import type { Pair } from '../../content/types'

type Answer = 'yes' | 'no' | 'unsure'

const questions: { q: Pair; hint: Pair }[] = [
  {
    q: {
      zh: '你希望它自己写代码来扩展能力（新工具、新插件）吗？',
      en: 'Do you want it to write code that extends its own capability (new tools, new plugins)?',
    },
    hint: {
      zh: '创造模式在 10 月把「内存里挂插件」换成了插件管理器，装的东西能留在机器上。',
      en: 'In October creator mode swapped the in-memory plugin hook for a plugin manager, so what it installs survives on your machine.',
    },
  },
  {
    q: {
      zh: '这一批活儿能不能编排成一段程序：循环、分支、批量调用？',
      en: 'Can this batch of work be expressed as a program: loops, branches, batched calls?',
    },
    hint: {
      zh: 'PTC 只给它一个 run_code 工具。8 月实测：墙钟 21.9 秒 vs 标准模式 305.9 秒。',
      en: 'PTC hands the model a single run_code tool. Measured in Aug: 21.9s wall clock versus 305.9s in standard mode.',
    },
  },
  {
    q: {
      zh: '你在做基准测试，或者环境需要最小上下文吗？',
      en: 'Are you benchmarking, or does the environment need a minimal context?',
    },
    hint: {
      zh: '极简模式只留一个命令行、一个读图工具和一个切换目录的工具，系统提示 225 字。',
      en: 'Minimal mode keeps one shell, one image reader and one directory switch; the system prompt is 225 characters.',
    },
  },
]

const verdicts: Record<string, { name: Pair; detail: Pair; slug: string; tools: string; prompt: string }> = {
  creator: {
    name: { zh: '创造模式', en: 'Creator mode' },
    detail: {
      zh: '34 个工具，多出来的是插件管理那几只手（install_bundle / remove_bundle）。8 月那一次跑完 49 步、56 次调用，2 分 26 秒，产出一个能用的数词插件目录。',
      en: '34 tools; the extra ones are plugin management (install_bundle / remove_bundle). The August run took 49 steps, 56 calls and 2m26s to produce a working counter module.',
    },
    slug: '/chapter/creator-mode',
    tools: '34',
    prompt: '≈ 8 月实测 32 → 33',
  },
  ptc: {
    name: { zh: 'PTC 模式', en: 'PTC mode' },
    detail: {
      zh: '一个 run_code 工具，模型写程序来调别的工具。首轮输入只比标准模式高 9%，但输出降到 1,416 token（思考只烧 739）。代价：41,267 字的系统提示，上手更硬。',
      en: 'One run_code tool; the model programs the other tools. First-round input is only 9% higher than standard, while output drops to 1,416 tokens (739 of thinking). The price: a 41,267-character system prompt.',
    },
    slug: '/chapter/ptc',
    tools: '1',
    prompt: '41,267 字 / chars',
  },
  minimal: {
    name: { zh: '极简模式', en: 'Minimal mode' },
    detail: {
      zh: '3 个工具、225 字提示。官方说法是给最小环境下的模型基准测试用的；日常干活不要用它，会缺手缺脚。',
      en: '3 tools, a 225-character prompt. Officially for benchmarking in a minimal environment — not for daily work, it is deliberately missing hands.',
    },
    slug: '/chapter/modes',
    tools: '3',
    prompt: '225 字 / chars',
  },
  standard: {
    name: { zh: '标准模式', en: 'Standard mode' },
    detail: {
      zh: '31 个工具、5,608 字提示，入场费约 18,117 token。三个问题都答不上来，就用它——它是默认档，也是唯一被日常任务验证过的档。',
      en: '31 tools, a 5,608-character prompt, roughly 18,117 tokens of entry fee. If none of the three questions applies, use it — it is the default and the only tier proven by daily work.',
    },
    slug: '/chapter/modes',
    tools: '31',
    prompt: '5,608 字 / chars',
  },
}

export function ModeLab() {
  const { t, zh } = useLang()
  const [answers, setAnswers] = useState<Answer[]>(['unsure', 'unsure', 'unsure'])

  const result = useMemo(() => {
    const [extend, orchestrate, benchmark] = answers
    if (extend === 'yes') return verdicts.creator
    if (orchestrate === 'yes') return verdicts.ptc
    if (benchmark === 'yes') return verdicts.minimal
    return verdicts.standard
  }, [answers])

  const nearMiss = answers.filter((answer) => answer === 'unsure').length

  return (
    <div className="lab-shell">
      <div className="lab-head">
        <span className="lab-icon">
          <Icon name="flask" size={19} />
        </span>
        <div>
          <h3>{zh ? '模式选择实验室' : 'Mode selection lab'}</h3>
          <p>
            {zh
              ? '三个问题决定你该切哪一档。答案不确定就选「说不准」，它会退回默认档。'
              : 'Three questions pick your tier. Choose “not sure” and it falls back to the default.'}
          </p>
        </div>
      </div>

      <div className="lab-body">
        <div className="lab-controls">
          {questions.map((question, index) => (
            <div key={index} className="control-row" style={{ gridTemplateColumns: '1fr', gap: 8 }}>
              <label htmlFor={`mode-q-${index}`} style={{ fontSize: '0.86rem', lineHeight: 1.6 }}>
                {t(question.q)}
              </label>
              <div>
                <div className="segmented" role="group" id={`mode-q-${index}`}>
                  {(['yes', 'no', 'unsure'] as Answer[]).map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={answers[index] === option ? 'is-active' : ''}
                      aria-pressed={answers[index] === option}
                      onClick={() =>
                        setAnswers((previous) => previous.map((value, position) => (position === index ? option : value)))
                      }
                    >
                      {option === 'yes' ? (zh ? '是' : 'Yes') : option === 'no' ? (zh ? '否' : 'No') : (zh ? '说不准' : 'Not sure')}
                    </button>
                  ))}
                </div>
                <p style={{ marginTop: 6, fontSize: '0.74rem', color: 'var(--faint)', lineHeight: 1.6 }}>{t(question.hint)}</p>
              </div>
            </div>
          ))}
        </div>

        <Reveal>
          <div className="lab-result" style={{ marginTop: 20 }}>
            <p className="lab-result-label">{zh ? '推荐' : 'Recommended'}</p>
            <p className="lab-result-value">
              {t(result.name)}
              <small>
                {result.tools} {zh ? '个工具' : 'tools'} · {result.prompt}
              </small>
            </p>
            <p>{t(result.detail)}</p>
            {nearMiss > 0 ? (
              <p style={{ marginTop: 8, fontSize: '0.74rem', color: 'var(--orange)' }}>
                {zh
                  ? `你还有 ${nearMiss} 题选了「说不准」。不确定就别改默认档——模式切换的成本在系统提示里，不在你身上。`
                  : `${nearMiss} question(s) still “not sure”. When in doubt, stay on the default — switching modes costs the system prompt, not you.`}
              </p>
            ) : null}
            <div className="chip-row" style={{ marginTop: 12 }}>
              {Object.values(verdicts).map((verdict) => (
                <span className={`chip ${verdict.name.zh === result.name.zh ? 'ok' : ''}`} key={verdict.slug + verdict.name.en}>
                  {t(verdict.name)} · {verdict.tools}
                </span>
              ))}
            </div>
            <Link className="link-arrow" to={result.slug} style={{ marginTop: 12 }}>
              {zh ? '去读这一章' : 'Read that chapter'}
              <Icon name="arrowRight" size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
