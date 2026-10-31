import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type ThemeMode = 'light' | 'dark' | 'system'
type Resolved = 'light' | 'dark'

type ThemeValue = {
  mode: ThemeMode
  resolved: Resolved
  setMode: (mode: ThemeMode) => void
  cycle: () => void
}

const ThemeContext = createContext<ThemeValue | null>(null)

function readMode(): ThemeMode {
  try {
    const stored = localStorage.getItem('dsh-theme')
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored
  } catch {
    /* ignore */
  }
  return 'system'
}

function resolve(mode: ThemeMode): Resolved {
  if (mode !== 'system') return mode
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(readMode)
  const [resolved, setResolved] = useState<Resolved>(() => resolve(readMode()))

  const apply = useCallback((nextMode: ThemeMode) => {
    const nextResolved = resolve(nextMode)
    setResolved(nextResolved)
    const root = document.documentElement
    root.dataset.theme = nextResolved
    root.dataset.themeMode = nextMode
    root.style.colorScheme = nextResolved
  }, [])

  const setMode = useCallback(
    (next: ThemeMode) => {
      setModeState(next)
      apply(next)
      try {
        localStorage.setItem('dsh-theme', next)
      } catch {
        /* ignore */
      }
    },
    [apply],
  )

  useEffect(() => {
    apply(mode)
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      if (mode === 'system') apply('system')
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [mode, apply])

  const cycle = useCallback(() => {
    const order: ThemeMode[] = ['light', 'dark', 'system']
    setMode(order[(order.indexOf(mode) + 1) % order.length])
  }, [mode, setMode])

  const value = useMemo(() => ({ mode, resolved, setMode, cycle }), [mode, resolved, setMode, cycle])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
