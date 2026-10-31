import { Link, useParams } from 'react-router-dom'
import { Shell } from '../components/layout/Shell'
import type { OutlineItem } from '../components/layout/Outline'
import { ContentRenderer } from '../components/ContentRenderer'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { chapterBySlug, neighbourOf } from '../content/chapters'
import { levelLabel, partById } from '../content/types'
import { nav, sisters, sisterUrl, site, ui } from '../content/site'
import { useLang } from '../i18n/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { NotFound } from './NotFound'

export function ChapterPage() {
  const { slug = '' } = useParams()
  const { t, zh } = useLang()
  const chapter = chapterBySlug(slug)

  usePageMeta({
    title: chapter ? `${chapter.num} · ${t(chapter.title)}` : t(site.name),
    description: chapter ? t(chapter.subtitle) : t(site.description),
  })

  if (!chapter) return <NotFound />

  const part = partById(chapter.part)
  const { prev, next } = neighbourOf(chapter.slug)
  const outline: OutlineItem[] = chapter.sections.map((section, index) => ({
    id: `${chapter.slug}-${section.id}`,
    title: { zh: `${index + 1}. ${section.title.zh}`, en: `${index + 1}. ${section.title.en}` },
  }))

  return (
    <Shell outline={outline}>
      <header className="chapter-hero">
        <nav className="chapter-breadcrumbs" aria-label={zh ? '面包屑导航' : 'Breadcrumb'}>
          <Link to="/">{t(nav.home)}</Link>
          <Icon name="chevronRight" size={10} />
          <Link to="/chapters">{t(ui.allChapters)}</Link>
          <Icon name="chevronRight" size={10} />
          <Link to={`/chapter/${chapter.slug}`}>{part ? t(part.title) : ''}</Link>
          <Icon name="chevronRight" size={10} />
          <span style={{ color: 'var(--ink-2)' }}>{chapter.num}</span>
        </nav>

        <div className="chapter-hero-grid">
          <div>
            <div className="chapter-meta-row">
              <span className="meta-tag accent">
                <Icon name={chapter.icon} size={12} />
                {chapter.num} · {t(levelLabel[chapter.level])}
              </span>
              <span className="meta-tag">
                <Icon name="clock" size={12} />
                {chapter.minutes} {t(ui.minutes)}
              </span>
              {part ? <span className="meta-tag">{part.num} · {t(part.title)}</span> : null}
            </div>
            <h1 className="display">{t(chapter.title)}</h1>
            <p className="lead">{t(chapter.subtitle)}</p>
          </div>
          <div className="chapter-promise">
            <p className="chapter-promise-label">{zh ? '读完你能做到' : 'What you can do after this'}</p>
            <p>{t(chapter.promise)}</p>
          </div>
        </div>

        <div className="chapter-hero-foot">
          <Link className="btn btn-sm btn-ghost" to="/lab">
            <Icon name="flask" size={13} />
            {t(ui.goLab)}
          </Link>
          <button
            className="btn btn-sm btn-ghost"
            type="button"
            onClick={() => {
              const url = `${window.location.origin}${window.location.pathname}${window.location.search}#/chapter/${chapter.slug}`
              void navigator.clipboard?.writeText(url)
            }}
          >
            <Icon name="copy" size={13} />
            {t(ui.copyLink)}
          </button>
        </div>
      </header>

      {chapter.sections.map((section, index) => (
        <section className="chapter-section" id={`${chapter.slug}-${section.id}`} key={section.id}>
          <div className="chapter-section-head">
            <span className="chapter-section-num">{String(index + 1).padStart(2, '0')}</span>
            <h2>{t(section.title)}</h2>
          </div>
          <Reveal>
            <div className="rich">
              <ContentRenderer blocks={section.blocks} />
            </div>
          </Reveal>
        </section>
      ))}

      <div className="chapter-end">
        <div>
          <p className="eyebrow">
            <Icon name="target" size={12} />
            {chapter.num} · {t(chapter.title)}
          </p>
          <h3>{t(ui.endTitle)}</h3>
          <p>{t(ui.endDesc)}</p>
        </div>
        <div className="hero-actions" style={{ margin: 0 }}>
          <Link className="btn btn-accent" to="/lab">
            <Icon name="flask" size={15} />
            {t(ui.goLab)}
          </Link>
          <Link className="btn btn-ghost" to="/gates">
            {t(nav.gates)}
          </Link>
        </div>
      </div>

      {chapter.sources.length > 0 ? (
        <section className="chapter-sources">
          <h3>{t(ui.sources)}</h3>
          <ul>
            {chapter.sources.map((source, index) => (
              <li key={index}>
                <a href={source.href} target="_blank" rel="noreferrer noopener">
                  <Icon name="external" size={11} />
                  {source.label}
                  <span>{new URL(source.href).hostname}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {chapter.sisters && chapter.sisters.length > 0 ? (
        <section className="chapter-sources">
          <h3>{t(ui.sisterLink)}</h3>
          <div className="link-grid">
            {chapter.sisters.map((sisterSlug) => {
              const sister = sisters.find((item) => item.slug === sisterSlug)
              if (!sister) return null
              return (
                <a className="link-card" key={sisterSlug} href={sisterUrl(sisterSlug)} target="_blank" rel="noreferrer noopener">
                  <strong>
                    {t(sister.title)}
                    <Icon name="arrowUpRight" size={12} style={{ marginLeft: 5, verticalAlign: '-1px' }} />
                  </strong>
                  <span>{t(sister.desc)}</span>
                </a>
              )
            })}
          </div>
        </section>
      ) : null}

      <nav className="chapter-nav" aria-label={zh ? '章节翻页' : 'Chapter navigation'}>
        {prev ? (
          <Link className="chapter-nav-card" to={`/chapter/${prev.slug}`}>
            <span>
              <Icon name="arrowLeft" size={11} />
              {t(ui.prev)}
            </span>
            <strong>
              {prev.num} · {t(prev.title)}
            </strong>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link className="chapter-nav-card next" to={`/chapter/${next.slug}`}>
            <span>
              {t(ui.next)}
              <Icon name="arrowRight" size={11} />
            </span>
            <strong>
              {next.num} · {t(next.title)}
            </strong>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </Shell>
  )
}
