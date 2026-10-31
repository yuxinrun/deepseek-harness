import { useEffect, useRef } from 'react'
import type { EChartsOption } from 'echarts'
import { useTheme } from '../../theme/ThemeContext'
import { useLang } from '../../i18n/LanguageContext'

export type ChartTokens = {
  ink: string
  muted: string
  faint: string
  line: string
  panel: string
  accent: string
  accent2: string
  orange: string
  green: string
  red: string
  blue: string
}

export function useChartTokens(): ChartTokens {
  const { resolved } = useTheme()
  void resolved
  if (typeof window === 'undefined') {
    return {
      ink: '#14132b',
      muted: '#696886',
      faint: '#9796b3',
      line: 'rgba(24,22,60,.1)',
      panel: '#ffffff',
      accent: '#5b5bf5',
      accent2: '#8b5cf6',
      orange: '#f97316',
      green: '#0f9f6e',
      red: '#dc3d4b',
      blue: '#2563eb',
    }
  }
  const css = getComputedStyle(document.documentElement)
  const get = (name: string, fallback: string) => css.getPropertyValue(name).trim() || fallback
  return {
    ink: get('--ink', '#14132b'),
    muted: get('--muted', '#696886'),
    faint: get('--faint', '#9796b3'),
    line: get('--line', 'rgba(24,22,60,.1)'),
    panel: get('--panel', '#ffffff'),
    accent: get('--accent', '#5b5bf5'),
    accent2: get('--accent-2', '#8b5cf6'),
    orange: get('--orange', '#f97316'),
    green: get('--green', '#0f9f6e'),
    red: get('--red', '#dc3d4b'),
    blue: get('--blue', '#2563eb'),
  }
}

type Props = {
  option: (tokens: ChartTokens) => EChartsOption
  height?: number
  ariaLabel: string
}

export function EChart({ option, height = 280, ariaLabel }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const tokens = useChartTokens()
  const { resolved } = useTheme()
  const { lang } = useLang()
  const key = `${resolved}-${lang}-${tokens.ink}-${tokens.panel}`
  const optionRef = useRef(option)
  optionRef.current = option

  useEffect(() => {
    let disposed = false
    let cleanup = () => {}
    import('echarts').then((echarts) => {
      if (disposed || !ref.current) return
      const chart = echarts.init(ref.current, undefined, { renderer: 'canvas' })
      chart.setOption(optionRef.current(tokens))
      const ro = new ResizeObserver(() => chart.resize())
      ro.observe(ref.current)
      cleanup = () => {
        ro.disconnect()
        chart.dispose()
      }
    })
    return () => {
      disposed = true
      cleanup()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return <div ref={ref} className="w-full" style={{ height }} role="img" aria-label={ariaLabel} />
}
