import { Link } from 'react-router-dom'
import { Shell } from '../components/layout/Shell'
import { Icon } from '../components/Icon'
import { ReleaseGates, gateItems } from '../components/labs/ReleaseGates'
import { useLang } from '../i18n/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { site } from '../content/site'

export function Gates() {
  const { t, zh } = useLang()
  usePageMeta({
    title: zh ? '发布门禁' : 'Release gates',
    description: t(site.description),
  })

  return (
    <Shell>
      <div className="page-head">
        <p className="eyebrow">
          <Icon name="shieldCheck" size={12} />
          {zh ? '发布门禁' : 'Release gates'}
        </p>
        <h1 className="display">{zh ? '上线之前，把这 12 道过一遍' : 'Walk these 12 gates before you ship'}</h1>
        <p>
          {zh
            ? `这本书最有用的部分不是它教了你什么，而是它替你把坑踩了一遍：四次事故复盘、六条文档与代码不一致、一份没人写的保留期策略。门禁清单就是把这些教训反向写成的检查项。勾过的状态只存在你这台机器的 localStorage 里（键名 dsh-gates-v1），不上传、不联网。`
            : `The most valuable part of this book is not what it taught, but the pits it fell into for you: four postmortems, six places where docs and code disagree, and a retention policy nobody wrote. These gates are those lessons rewritten as checks. Your ticks live only in this browser’s localStorage (key dsh-gates-v1) — nothing is uploaded.`}
        </p>
      </div>

      <ReleaseGates />

      <aside className="callout note" style={{ marginTop: 26 }}>
        <div className="callout-head">
          <Icon name="activity" size={14} />
          {zh ? `这 ${gateItems.length} 道门禁是怎么来的` : `How these ${gateItems.length} gates were derived`}
        </div>
        <p>
          {zh
            ? '每一条都能追回橙皮书里的一段实测或一次事故：门禁 02 到 05 逐条对应事故 0001–0004；06、07 来自 10 月 20 日官方价目页与那场番茄钟的账；08、09 来自遥测默认值与会话日志的保留期事实；10 来自插件注册冲突的报错原文；11 来自创造模式的重启边界；12 是这本书自己抓到的三处「文档落后于代码」。'
            : 'Each line traces back to a measured run or an incident in the orange book: gates 02–05 map one-to-one onto postmortems 0001–0004; 06 and 07 come from the Oct 20 official price list and the tomato-clock bill; 08 and 09 from telemetry defaults and the session-log retention fact; 10 from the verbatim registration-conflict error; 11 from creator mode’s restart boundary; 12 is the three cases where this book caught documentation lagging code.'}
        </p>
        <div className="chip-row" style={{ marginTop: 10 }}>
          <Link className="chip" to="/chapter/postmortems">
            {zh ? '事故复盘' : 'Postmortems'}
            <Icon name="arrowRight" size={10} />
          </Link>
          <Link className="chip" to="/chapter/pitfalls">
            {zh ? '避坑清单' : 'Pitfalls'}
            <Icon name="arrowRight" size={10} />
          </Link>
          <Link className="chip" to="/chapter/cost">
            {zh ? '成本这一章' : 'Cost chapter'}
            <Icon name="arrowRight" size={10} />
          </Link>
        </div>
      </aside>
    </Shell>
  )
}
