import { useMemo, useState } from 'react'
import { Icon } from '../Icon'
import { EChart } from '../charts/EChart'
import { useLang } from '../../i18n/LanguageContext'

const prices = {
  flash: { label: 'DeepSeek-V4-Flash', cached: 0.02, input: 1, output: 4 },
  pro: { label: 'DeepSeek-V4-Pro', cached: 0.15, input: 4.5, output: 13.5 },
} as const

const BASE_ENTRY = 8719 // 18,117 入场费减去 74 个 skill 目录的 9,398 token
const SKILL_TOKENS = 127
const DENSITY = { code: 256, chinese: 200 } as const

function Slider({
  id,
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  onChange,
}: {
  id: string
  label: string
  value: number
  min: number
  max: number
  step?: number
  unit: string
  onChange: (value: number) => void
}) {
  return (
    <div className="control-row">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
      <output htmlFor={id}>
        {value.toLocaleString('en-US')}
        {unit}
      </output>
    </div>
  )
}

export function CostCalculator() {
  const { zh } = useLang()
  const [steps, setSteps] = useState(17)
  const [contentKB, setContentKB] = useState(13.4)
  const [skills, setSkills] = useState(74)
  const [cacheHit, setCacheHit] = useState(98.2)
  const [model, setModel] = useState<keyof typeof prices>('flash')
  const [peak, setPeak] = useState(false)
  const [density, setDensity] = useState<keyof typeof DENSITY>('code')

  const table = prices[model]

  const result = useMemo(() => {
    const entry = BASE_ENTRY + skills * SKILL_TOKENS
    const growth = contentKB * DENSITY[density]
    const outputPerStep = 1976
    let totalInput = 0
    for (let index = 0; index < steps; index += 1) totalInput += entry + index * growth
    const cachedTokens = totalInput * (cacheHit / 100)
    const uncachedTokens = totalInput - cachedTokens
    const outputTokens = steps * outputPerStep
    const multiplier = peak ? 2 : 1
    const cachedCost = (cachedTokens * table.cached * multiplier) / 1e6
    const uncachedCost = (uncachedTokens * table.input * multiplier) / 1e6
    const outputCost = (outputTokens * table.output * multiplier) / 1e6
    const total = cachedCost + uncachedCost + outputCost
    const worstCase = (totalInput * table.input * multiplier) / 1e6 + outputCost
    return {
      entry,
      growth,
      totalInput,
      cachedTokens,
      uncachedTokens,
      outputTokens,
      cachedCost,
      uncachedCost,
      outputCost,
      total,
      worstCase,
      ratio: total > 0 ? worstCase / total : 1,
    }
  }, [steps, contentKB, skills, cacheHit, table, peak, density])

  const money = (value: number) => `¥${value < 1 ? value.toFixed(4) : value.toFixed(2)}`

  return (
    <div className="lab-shell">
      <div className="lab-head">
        <span className="lab-icon" style={{ background: 'linear-gradient(135deg, var(--orange), #fb923c)', boxShadow: '0 10px 22px -12px var(--orange)' }}>
          <Icon name="coins" size={19} />
        </span>
        <div>
          <h3>{zh ? '成本计算器' : 'Cost calculator'}</h3>
          <p>
            {zh
              ? '锚点是 10 月那条约 18,117 token 的入场费和番茄钟实测（17 步、768,896 缓存 + 13,816 未命中 + 33,601 输出 ≈ ¥0.16）。默认值就是那一局。'
              : 'Anchored on October’s ~18,117-token entry fee and the measured pomodoro run (17 steps, 768,896 cached + 13,816 uncached + 33,601 output ≈ ¥0.16). Those are the defaults.'}
          </p>
        </div>
      </div>

      <div className="lab-body">
        <div className="lab-controls">
          <Slider id="cost-steps" label={zh ? '任务步数' : 'Steps'} value={steps} min={1} max={64} unit={zh ? ' 步' : ''} onChange={setSteps} />
          <Slider
            id="cost-content"
            label={zh ? '每步新增内容' : 'New content per step'}
            value={contentKB}
            min={0.5}
            max={40}
            step={0.2}
            unit=" KB"
            onChange={setContentKB}
          />
          <Slider id="cost-skills" label={zh ? '本机 skill 数量' : 'Skills installed'} value={skills} min={0} max={200} unit={zh ? ' 个' : ''} onChange={setSkills} />
          <Slider id="cost-cache" label={zh ? '缓存命中率' : 'Cache hit rate'} value={cacheHit} min={0} max={100} step={0.2} unit="%" onChange={setCacheHit} />

          <div className="control-row" style={{ gridTemplateColumns: zh ? '150px minmax(0,1fr)' : '190px minmax(0,1fr)', gap: 10 }}>
            <label>{zh ? '模型' : 'Model'}</label>
            <div className="segmented" role="group">
              {(Object.keys(prices) as (keyof typeof prices)[]).map((key) => (
                <button key={key} type="button" className={model === key ? 'is-active' : ''} onClick={() => setModel(key)}>
                  {prices[key].label}
                </button>
              ))}
            </div>
          </div>

          <div className="control-row" style={{ gridTemplateColumns: zh ? '150px minmax(0,1fr)' : '190px minmax(0,1fr)', gap: 10 }}>
            <label>{zh ? '时段' : 'Time band'}</label>
            <div className="segmented" role="group">
              <button type="button" className={!peak ? 'is-active' : ''} onClick={() => setPeak(false)}>
                {zh ? '平峰' : 'Off-peak'}
              </button>
              <button type="button" className={peak ? 'is-active' : ''} onClick={() => setPeak(true)}>
                {zh ? '高峰 ×2' : 'Peak ×2'}
              </button>
            </div>
          </div>

          <div className="control-row" style={{ gridTemplateColumns: zh ? '150px minmax(0,1fr)' : '190px minmax(0,1fr)', gap: 10 }}>
            <label>{zh ? '内容类型' : 'Content type'}</label>
            <div className="segmented" role="group">
              <button type="button" className={density === 'code' ? 'is-active' : ''} onClick={() => setDensity('code')}>
                {zh ? '代码 / 英文（4 字一 token）' : 'Code / English (4 chars)'}
              </button>
              <button type="button" className={density === 'chinese' ? 'is-active' : ''} onClick={() => setDensity('chinese')}>
                {zh ? '中文（1.71 字一 token）' : 'Chinese (1.71 chars)'}
              </button>
            </div>
          </div>
        </div>

        <div className="card-grid" style={{ marginTop: 20 }}>
          <div className="lab-result">
            <p className="lab-result-label">{zh ? '这一局的账单' : 'Bill for this run'}</p>
            <p className="lab-result-value">
              {money(result.total)}
              <small>{zh ? (peak ? '高峰价' : '平峰价') : peak ? 'peak' : 'off-peak'}</small>
            </p>
            <p>
              {zh
                ? `输入合计 ${Math.round(result.totalInput).toLocaleString('en-US')} token，入场费 ${result.entry.toLocaleString('en-US')}（skill 目录占 ${(skills * SKILL_TOKENS).toLocaleString('en-US')}）。`
                : `Total input ${Math.round(result.totalInput).toLocaleString('en-US')} tokens; entry fee ${result.entry.toLocaleString('en-US')} of which ${(skills * SKILL_TOKENS).toLocaleString('en-US')} is the skill index.`}
            </p>
          </div>
          <div className="lab-result">
            <p className="lab-result-label">{zh ? '缓存全丢会怎样' : 'If the cache misses everything'}</p>
            <p className="lab-result-value">
              {money(result.worstCase)}
              <small>×{result.ratio.toFixed(2)}</small>
            </p>
            <p>
              {zh
                ? '命中率从 98.2% 掉到 0% 并没有 50 倍那么吓人：缓存单价是 1/50，但钱主要花在输出上。倍数取决于你的输入/输出比例。'
                : 'Dropping from 98.2% to 0% is not the 50× everyone fears: the cached unit price is 1/50, but output is where the money is. The ratio depends on your input/output mix.'}
            </p>
          </div>
        </div>

        <div className="chart-box" style={{ marginTop: 14 }}>
          <p className="chart-title">{zh ? '钱花在哪儿' : 'Where the money goes'}</p>
          <p className="chart-sub">{zh ? '人民币，按上面的滑块实时计算' : 'RMB, recomputed from the sliders'}</p>
          <EChart
            height={240}
            ariaLabel={zh ? '成本构成条形图' : 'Cost breakdown bars'}
            option={(tokens) => ({
              grid: { left: 84, right: 24, top: 12, bottom: 26 },
              tooltip: {
                trigger: 'axis',
                backgroundColor: tokens.panel,
                borderColor: tokens.line,
                textStyle: { color: tokens.ink, fontSize: 11 },
                valueFormatter: (value) => `¥${value}`,
              },
              xAxis: {
                type: 'value',
                axisLabel: { color: tokens.muted, fontSize: 10, formatter: '¥{value}' },
                splitLine: { lineStyle: { color: tokens.line } },
              },
              yAxis: {
                type: 'category',
                data: [
                  zh ? '输出 token' : 'Output tokens',
                  zh ? '未命中输入' : 'Uncached input',
                  zh ? '缓存命中输入' : 'Cached input',
                ],
                axisLabel: { color: tokens.muted, fontSize: 11 },
                axisLine: { lineStyle: { color: tokens.line } },
                axisTick: { show: false },
              },
              series: [
                {
                  type: 'bar',
                  barWidth: 16,
                  itemStyle: { borderRadius: [0, 5, 5, 0] },
                  label: { show: true, position: 'right', color: tokens.muted, fontSize: 10, formatter: '¥{c}' },
                  data: [
                    { value: Number(result.outputCost.toFixed(4)), itemStyle: { color: tokens.orange } },
                    { value: Number(result.uncachedCost.toFixed(4)), itemStyle: { color: tokens.blue } },
                    { value: Number(result.cachedCost.toFixed(4)), itemStyle: { color: tokens.accent } },
                  ],
                },
              ],
            })}
          />
        </div>

        <div className="chip-row" style={{ marginTop: 14 }}>
          <span className={`chip ${peak ? 'warn' : 'ok'}`}>
            <Icon name="clock" size={11} />
            {zh ? '高峰＝工作日 9–12、14–18 CST，价格 ×2' : 'Peak = weekdays 9-12 & 14-18 CST, price ×2'}
          </span>
          <span className="chip">
            <Icon name="database" size={11} />
            {zh ? '缓存按 64 token 为单位计费，写入不收费' : 'Cache is billed in 64-token units; writing the cache is free'}
          </span>
          <span className="chip warn">
            <Icon name="alert" size={11} />
            {zh ? '11 月 1 日起 Search / Fetch 每千次成功请求 ¥5' : 'From Nov 1, Search / Fetch cost ¥5 per 1k successful requests'}
          </span>
        </div>
      </div>
    </div>
  )
}
