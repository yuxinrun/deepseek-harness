import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { useLang } from '../i18n/LanguageContext'
import { ui } from '../content/site'

type Token = { text: string; cls?: string }

function tokenize(line: string): Token[] {
  const regex =
    /(\/\/.*$|#(?!\{).*$|'[^']*'|"[^"]*"|`[^`]*`|\b(?:const|let|var|function|return|if|else|for|while|await|async|import|from|export|default|new|class|type|interface|extends|true|false|null|undefined|throw|try|catch|of|in|as)\b|\b\d+(?:\.\d+)?\b)/g
  const out: Token[] = []
  let last = 0
  let m: RegExpExecArray | null
  while ((m = regex.exec(line))) {
    if (m.index > last) out.push({ text: line.slice(last, m.index) })
    const value = m[0]
    let cls = ''
    if (value.startsWith('//') || value.startsWith('#')) cls = 'text-[rgba(232,233,255,.36)]'
    else if (/^['"`]/.test(value)) cls = 'text-[#a7f3d0]'
    else if (/^\d/.test(value)) cls = 'text-[#fbbf24]'
    else cls = 'text-[#a5b4fc]'
    out.push({ text: value, cls })
    last = m.index + value.length
  }
  if (last < line.length) out.push({ text: line.slice(last) })
  return out
}

export function CodeBlock({
  code,
  lang = 'bash',
  title,
  note,
}: {
  code: string
  lang?: string
  title?: string
  note?: string
}) {
  const [copied, setCopied] = useState(false)
  const { lang: language } = useLang()
  const lines = code.replace(/\n$/, '').split('\n')

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard may be unavailable */
    }
  }

  return (
    <div className="code-shell">
      <div className="code-head">
        <span className="code-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="code-title">{title ?? 'terminal'}</span>
        <span className="code-lang">{lang}</span>
        <button className={`copy-btn ${copied ? 'is-copied' : ''}`} onClick={copy} type="button" aria-label={language === 'zh' ? '复制代码' : 'Copy code'}>
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? ui.copied[language] : ui.copy[language]}
        </button>
      </div>
      <div className="code-body">
        <pre>
          <code>
            {lines.map((line, index) => (
              <span key={index} className="block">
                <span className="ln">{index + 1}</span>
                {tokenize(line).map((token: Token, tokenIndex: number) => (
                  <span key={tokenIndex} className={token.cls}>
                    {token.text}
                  </span>
                ))}
                {'\n'}
              </span>
            ))}
          </code>
        </pre>
      </div>
      {note ? <div className="code-note">{note}</div> : null}
    </div>
  )
}
