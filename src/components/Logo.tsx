import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'

export function LogoMark({ size = 34, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={`logo-mark ${className}`}
      role="img"
      aria-label="DeepSeek Harness"
    >
      <defs>
        <linearGradient id="logo-bg" x1="6" y1="6" x2="58" y2="58" gradientUnits="userSpaceOnUse">
          <stop stopColor="#5B5BF5" />
          <stop offset="0.55" stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#FF7A2F" />
        </linearGradient>
        <linearGradient id="logo-rein" x1="20" y1="40" x2="44" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD3A8" />
          <stop offset="1" stopColor="#FFFFFF" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="60" height="60" rx="17" fill="url(#logo-bg)" />
      <rect x="2" y="2" width="60" height="60" rx="17" fill="none" stroke="rgba(255,255,255,.28)" strokeWidth="1.5" />
      <path d="M22 19.5 12.5 28.5a4.6 4.6 0 0 0 0 7L22 44.5" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M42 19.5 51.5 28.5a4.6 4.6 0 0 1 0 7L42 44.5" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23.5 39.5c1.2-16 15.8-16 17 0" stroke="url(#logo-rein)" strokeWidth="3" strokeLinecap="round" />
      <circle cx="23.5" cy="39.5" r="4" fill="#FFD3A8" stroke="#fff" strokeWidth="1.6" />
      <circle cx="40.5" cy="39.5" r="4" fill="#FFD3A8" stroke="#fff" strokeWidth="1.6" />
      <circle cx="32" cy="27.5" r="3.6" fill="#fff" />
      <circle cx="32" cy="27.5" r="1.5" fill="#8B5CF6" />
    </svg>
  )
}

export function Logo() {
  const { lang } = useLang()
  return (
    <Link to="/" className="brand" aria-label={lang === 'zh' ? 'DeepSeek Harness 实战指南首页' : 'DeepSeek Harness Field Guide home'}>
      <LogoMark />
      <span className="brand-text">
        <strong>{lang === 'zh' ? 'DeepSeek Harness' : 'DeepSeek Harness'}</strong>
        <small>{lang === 'zh' ? '实战指南 · 从开机到拆开' : 'FIELD GUIDE · FIRST RUN TO INTERNALS'}</small>
      </span>
    </Link>
  )
}
