import type { Block, Source } from '../content/types'
import { ui } from '../content/site'
import { useLang } from '../i18n/LanguageContext'
import { RichText } from './RichText'
import { CodeBlock } from './CodeBlock'
import { Icon, type IconName } from './Icon'
import { Diagram } from './diagrams/Diagram'

function SourceChip({ source }: { source?: Source }) {
  const { t } = useLang()
  if (!source) return null
  return (
    <a className="source-chip" href={source.href} target="_blank" rel="noreferrer noopener">
      {t(ui.source)}
      <Icon name="external" size={9} />
      {source.label}
    </a>
  )
}

const calloutIcon: Record<'tip' | 'warn' | 'idea' | 'note', IconName> = {
  tip: 'check',
  warn: 'alert',
  idea: 'spark',
  note: 'activity',
}

export function ContentRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="block-stack">
      {blocks.map((block, index) => (
        <BlockView key={index} block={block} />
      ))}
    </div>
  )
}

function BlockView({ block }: { block: Block }) {
  const { lang } = useLang()
  const bi = (value: { zh: string; en: string }) => value[lang]
  const bl = (value: { zh: string[]; en: string[] }) => value[lang]

  switch (block.type) {
    case 'p':
      return (
        <p>
          <RichText text={bi(block)} /> <SourceChip source={block.source} />
        </p>
      )

    case 'list': {
      const items = bl(block)
      const Tag = block.ordered ? 'ol' : 'ul'
      return (
        <div>
          <Tag className={block.ordered ? 'number-list' : 'bullet-list'}>
            {items.map((item, index) => (
              <li key={index}>
                <RichText text={item} />
              </li>
            ))}
          </Tag>
          <SourceChip source={block.source} />
        </div>
      )
    }

    case 'cards':
      return (
        <div className="card-grid">
          {block.items.map((item, index) => (
            <div className="info-card" key={index}>
              {item.icon ? (
                <span className="ic">
                  <Icon name={item.icon} size={17} />
                </span>
              ) : null}
              <h4>{bi(item.title)}</h4>
              <p>
                <RichText text={bi(item.desc)} />
              </p>
            </div>
          ))}
        </div>
      )

    case 'callout':
      return (
        <aside className={`callout ${block.tone}`}>
          <div className="callout-head">
            <Icon name={calloutIcon[block.tone]} size={14} />
            {bi(block.title)}
          </div>
          <p>
            <RichText text={bi(block)} /> <SourceChip source={block.source} />
          </p>
        </aside>
      )

    case 'code':
      return (
        <div>
          <CodeBlock
            code={block.code}
            lang={block.lang}
            title={block.title}
            note={block.note ? bi(block.note) : undefined}
          />
          {block.source ? (
            <p className="block-source">
              <SourceChip source={block.source} />
            </p>
          ) : null}
        </div>
      )

    case 'table':
      return (
        <div>
          <div className="table-wrap">
            <div className="table-scroll">
              <table className="dsh-table">
                <thead>
                  <tr>
                    {block.head.map((cell, index) => (
                      <th key={index} scope="col">
                        {bi(cell)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>
                          {cellIndex === 0 ? (
                            <strong style={{ color: 'var(--ink)' }}>{bi(cell)}</strong>
                          ) : (
                            <RichText text={bi(cell)} />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {block.note ? <p className="table-note">{bi(block.note)}</p> : null}
          </div>
          <SourceChip source={block.source} />
        </div>
      )

    case 'steps':
      return (
        <div>
          <ol className="step-list">
            {block.items.map((item, index) => (
              <li className="step-item" key={index}>
                <span className="step-num">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <h4>{bi(item.title)}</h4>
                  <p>
                    <RichText text={bi(item.desc)} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <SourceChip source={block.source} />
        </div>
      )

    case 'checklist':
      return (
        <div>
          <div className="checklist-box">
            {block.title ? <p className="checklist-head">{bi(block.title)}</p> : null}
            <ul>
              {block.items.map((item, index) => (
                <li key={index}>
                  <Icon name="check" size={13} />
                  <span>
                    <RichText text={bi(item)} />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {block.source ? (
            <p className="block-source">
              <SourceChip source={block.source} />
            </p>
          ) : null}
        </div>
      )

    case 'diagram':
      return <Diagram id={block.id} caption={bi(block.caption)} />

    case 'stats':
      return (
        <div>
          <div className="stat-grid">
            {block.items.map((item, index) => (
              <div className="stat-card" key={index}>
                <p className="stat-value">{item.value}</p>
                <p className="stat-label">{bi(item.label)}</p>
                {item.sub ? <p className="stat-sub">{bi(item.sub)}</p> : null}
              </div>
            ))}
          </div>
          {block.source ? (
            <p className="block-source">
              <SourceChip source={block.source} />
            </p>
          ) : null}
        </div>
      )

    case 'quote':
      return (
        <div>
          <blockquote className="pull-quote">
            <p>
              <RichText text={bi(block)} />
            </p>
            {block.cite ? <cite>{bi(block.cite)}</cite> : null}
            <SourceChip source={block.source} />
          </blockquote>
        </div>
      )

    case 'links':
      return (
        <section>
          {block.title ? (
            <p
              className="checklist-head"
              style={{
                borderRadius: 9,
                background: 'var(--panel-2)',
                border: '1px solid var(--line)',
                marginBottom: 10,
              }}
            >
              {bi(block.title)}
            </p>
          ) : null}
          <div className="link-grid">
            {block.items.map((item, index) => {
              const external = item.href.startsWith('http')
              const href = external ? item.href : `${import.meta.env.BASE_URL}#${item.href}`
              return (
                <a
                  className="link-card"
                  key={index}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                >
                  <strong>
                    {bi(item.label)}
                    {external ? <Icon name="arrowUpRight" size={12} style={{ marginLeft: 5, verticalAlign: '-1px' }} /> : null}
                  </strong>
                  {item.desc ? <span>{bi(item.desc)}</span> : null}
                  {item.tag ? (
                    <span className="chip" style={{ alignSelf: 'flex-start', marginTop: 4 }}>
                      {item.tag}
                    </span>
                  ) : null}
                </a>
              )
            })}
          </div>
        </section>
      )

    default:
      return null
  }
}
