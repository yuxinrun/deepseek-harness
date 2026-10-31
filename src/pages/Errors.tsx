import { Link } from 'react-router-dom'
import { Shell } from '../components/layout/Shell'
import { Icon } from '../components/Icon'
import { ErrorMuseum, exhibits } from '../components/labs/ErrorMuseum'
import { useLang } from '../i18n/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { site } from '../content/site'

export function Errors() {
  const { t, zh } = useLang()
  usePageMeta({
    title: zh ? '错误博物馆' : 'Error museum',
    description: t(site.description),
  })

  return (
    <Shell>
      <div className="page-head">
        <p className="eyebrow">
          <Icon name="bug" size={12} />
          {zh ? '错误博物馆' : 'Error museum'}
        </p>
        <h1 className="display">{zh ? `${exhibits.length} 件展品，都真的发生过` : `${exhibits.length} exhibits, all of them real`}</h1>
        <p>
          {zh
            ? '每一次翻车按同一套格式陈列：现象、根因、解决，再加一句能从这次事故里带走的规矩。四件来自橙皮书逐字记录的事后复盘（0001–0004），两件是本站作者自己踩到、书里没写的：代理把流读坏只报一个词，和钩子目录改名之后 skill 集体失踪。'
            : 'Every failure is displayed the same way: symptom, root cause, fix, plus one rule you can take away. Four exhibits come from the orange book’s verbatim postmortems (0001–0004); two were found by the author of this site and are not in the book: a proxy corrupting the stream that reports a single word, and a hooks directory renamed out of existence.'}
        </p>
      </div>

      <ErrorMuseum />

      <aside className="callout tip" style={{ marginTop: 26 }}>
        <div className="callout-head">
          <Icon name="check" size={14} />
          {zh ? '读展品的顺序' : 'How to walk the museum'}
        </div>
        <p>
          {zh
            ? '先看你正准备做的那件事对应的展品，再看相邻的。0001 教你别用单元测试替代真实路径，0002 教你别把「失败」录成「正确」，0003 教你验收要看确切地址，0004 教你别拿被关程序的 stderr 当沙箱状态。剩下的两件共同点是：报错信息里没有真凶，真凶在你自己的环境里。'
            : 'Start with the exhibit closest to what you are about to do, then the neighbours. 0001 teaches you not to substitute unit tests for the real delivery path; 0002 not to record a failure as the expected answer; 0003 to verify the exact address; 0004 not to read sandbox status from the confined program’s stderr. The two extra exhibits share one trait: the error message does not name the culprit — the culprit is in your own environment.'}
        </p>
        <div className="chip-row" style={{ marginTop: 10 }}>
          <Link className="chip" to="/chapter/postmortems">
            {zh ? '完整复盘原文' : 'Full postmortems'}
            <Icon name="arrowRight" size={10} />
          </Link>
          <Link className="chip" to="/gates">
            {zh ? '变成检查项' : 'Turn it into checks'}
            <Icon name="arrowRight" size={10} />
          </Link>
        </div>
      </aside>
    </Shell>
  )
}
