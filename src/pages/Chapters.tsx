import { Link } from 'react-router-dom'
import { Shell } from '../components/layout/Shell'
import { Reveal } from '../components/Reveal'
import { Icon } from '../components/Icon'
import { chapters, partGroups, totalReadMinutes } from '../content/chapters'
import { levelLabel } from '../content/types'
import { site, ui } from '../content/site'
import { useLang } from '../i18n/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'

export function Chapters() {
  const { t, zh } = useLang()
  usePageMeta({
    title: zh ? '章节目录' : 'Chapter index',
    description: t(site.description),
  })

  return (
    <Shell>
      <div className="page-head">
        <p className="eyebrow">
          <Icon name="library" size={12} />
          {t(ui.allChapters)}
        </p>
        <h1 className="display">{zh ? '全书目录' : 'The whole map'}</h1>
        <p>
          {zh
            ? `${chapters.length} 个入口 · ${partGroups.length} 个部分 · 约 ${totalReadMinutes} 分钟阅读量。每章自带可复制命令、来源链接和延伸阅读。`
            : `${chapters.length} doors · ${partGroups.length} parts · about ${totalReadMinutes} minutes of reading. Every chapter ships copy-runnable commands, sources and further reading.`}
        </p>
      </div>

      {partGroups.map((group, groupIndex) => (
        <Reveal as="section" key={group.part.id} delay={groupIndex * 60} className="chapter-section">
          <div className="chapter-section-head">
            <span className="chapter-num">{group.part.num}</span>
            <h2>{t(group.part.title)}</h2>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--muted)', marginTop: -8, marginBottom: 16 }}>{t(group.part.desc)}</p>

          <div className="chapter-grid">
            {group.items.map((chapter, index) => (
              <Reveal key={chapter.slug} delay={index * 35}>
                <Link className="chapter-card" to={`/chapter/${chapter.slug}`}>
                  <div className="chapter-card-top">
                    <span className="chapter-num">{chapter.num}</span>
                    <Icon name={chapter.icon} size={16} style={{ color: 'var(--faint)' }} />
                  </div>
                  <h3>{t(chapter.title)}</h3>
                  <p>{t(chapter.subtitle)}</p>
                  <div className="chapter-card-foot">
                    <span className="meta-tag accent">{t(levelLabel[chapter.level])}</span>
                    <span>
                      {chapter.minutes} {t(ui.minutes)}
                    </span>
                    <span style={{ marginLeft: 'auto' }}>
                      <Icon name="arrowRight" size={12} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Reveal>
      ))}
    </Shell>
  )
}
