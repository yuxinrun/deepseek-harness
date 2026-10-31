import { useState, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Shell } from '../components/layout/Shell'
import { Icon, type IconName } from '../components/Icon'
import { ModeLab } from '../components/labs/ModeLab'
import { CostCalculator } from '../components/labs/CostCalculator'
import { PermissionSim } from '../components/labs/PermissionSim'
import { useLang } from '../i18n/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { site } from '../content/site'
import type { Pair } from '../content/types'

type Tab = { id: string; icon: IconName; label: Pair; intro: Pair; node: ReactNode }

const tabs: Tab[] = [
  {
    id: 'mode',
    icon: 'route',
    label: { zh: '模式选择', en: 'Mode picker' },
    intro: {
      zh: '三个问题决定你该用哪一种模式——标准、极简、创造还是 PTC。答完给出答案、工具数量和系统提示词长度，并说清它为什么这么判。',
      en: 'Three questions decide which mode fits: standard, minimal, creator or PTC. You get the verdict, the tool count, the prompt size and the reasoning behind it.',
    },
    node: <ModeLab />,
  },
  {
    id: 'cost',
    icon: 'coins',
    label: { zh: '成本计算器', en: 'Cost calculator' },
    intro: {
      zh: '拖动滑块看一场任务的钱花在哪：入场费、内容长度、skill 目录、缓存命中率、峰谷价。按 10 月 20 日官方价目算，能复现书里那场番茄钟的 ¥0.16。',
      en: 'Drag the sliders to see where the money goes: entry fee, content length, skill index, cache-hit rate, peak hours. Built on the official Oct 20 price list, and it reproduces the book’s tomato-clock run at ¥0.16.',
    },
    node: <CostCalculator />,
  },
  {
    id: 'permission',
    icon: 'shield',
    label: { zh: '权限模拟器', en: 'Permission simulator' },
    intro: {
      zh: '选一档，再看七个真实动作分别会发生什么：放行、举手问你，还是直接拒绝。每一格都写了它为什么是这个答案。',
      en: 'Pick a tier, then watch seven real actions resolve: allowed, asked, or denied — each cell explains why it landed there.',
    },
    node: <PermissionSim />,
  },
]

export function Lab() {
  const { t, zh } = useLang()
  const [params, setParams] = useSearchParams()
  const [active, setActive] = useState(() => tabs.find((tab) => tab.id === params.get('tab'))?.id ?? 'mode')
  const current = tabs.find((tab) => tab.id === active) ?? tabs[0]

  usePageMeta({
    title: zh ? '实战实验室' : 'Lab',
    description: t(site.description),
  })

  return (
    <Shell outline={tabs.map((tab) => ({ id: `lab-${tab.id}`, title: tab.label }))}>
      <div className="page-head">
        <p className="eyebrow">
          <Icon name="flask" size={12} />
          {zh ? '实战实验室' : 'Interactive lab'}
        </p>
        <h1 className="display">{zh ? '先在这里算明白，再去花真钱' : 'Work it out here before you spend real money'}</h1>
        <p>
          {zh
            ? '三个模块全部跑在你的浏览器里，不上传任何东西。里面的每一个数字都来自橙皮书的实测或官方价目页，出处写在结果旁边。'
            : 'All three modules run in your browser and upload nothing. Every number inside comes from a measured run in the orange book or the official price list, with its source beside the result.'}
        </p>
      </div>

      <div className="tool-tabs" role="tablist" aria-label={zh ? '实验室模块' : 'Lab modules'} id={`lab-${current.id}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={tab.id === active}
            className={`tool-tab ${tab.id === active ? 'is-active' : ''}`}
            onClick={() => {
              setActive(tab.id)
              setParams({ tab: tab.id })
            }}
          >
            <Icon name={tab.icon} size={12} style={{ display: 'inline', verticalAlign: '-2px', marginRight: 5 }} />
            {t(tab.label)}
          </button>
        ))}
      </div>

      <p className="lab-intro">{t(current.intro)}</p>
      {current.node}
    </Shell>
  )
}
