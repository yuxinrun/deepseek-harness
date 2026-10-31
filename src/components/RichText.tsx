import { Fragment, type ReactNode } from 'react'

const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g

const base = import.meta.env.BASE_URL

function internalHref(href: string) {
  return `${base}#${href}`
}

function renderLink(raw: string, key: number): ReactNode {
  const match = raw.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
  if (!match) return raw
  const [, label, href] = match
  const external = href.startsWith('http')
  return (
    <a
      key={key}
      href={external ? href : internalHref(href)}
      {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
    >
      {label}
    </a>
  )
}

export function RichText({ text }: { text: string }) {
  const parts = text.split(pattern)
  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={index}>{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return <code key={index}>{part.slice(1, -1)}</code>
        }
        if (part.startsWith('[') && part.includes('](')) {
          return <Fragment key={index}>{renderLink(part, index)}</Fragment>
        }
        return <Fragment key={index}>{part}</Fragment>
      })}
    </>
  )
}
