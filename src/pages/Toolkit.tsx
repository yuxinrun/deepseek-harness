import { Link } from 'react-router-dom'
import { Shell } from '../components/layout/Shell'
import { Icon } from '../components/Icon'
import { ToolkitCenter } from '../components/labs/ToolkitCenter'
import { useLang } from '../i18n/LanguageContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { site } from '../content/site'

export function Toolkit() {
  const { t, zh } = useLang()
  usePageMeta({
    title: zh ? '工具箱' : 'Toolkit',
    description: t(site.description),
  })

  return (
    <Shell>
      <div className="page-head">
        <p className="eyebrow">
          <Icon name="wrench" size={12} />
          {zh ? '工具箱' : 'Toolkit'}
        </p>
        <h1 className="display">{zh ? '六段可以直接贴的模板' : 'Six templates you can paste straight in'}</h1>
        <p>
          {zh
            ? '安装与首跑、配置导出与补丁、权限三件套、插件清单行、最小插件骨架、会话日志取证。每段都能整块复制，每段下面写着它为什么是这个值、以及哪些写法是本站明确不建议照着抄的。'
            : 'Install and first run, config and patch, the permission trio, plugin-manifest rows, the minimal plugin skeleton, and session-log forensics. Each block copies whole, and each one says why the value is what it is — including which spellings this site explicitly advises against.'}
        </p>
      </div>

      <ToolkitCenter />

      <div className="chip-row" style={{ marginTop: 22 }}>
        <Link className="chip" to="/chapter/commands">
          {zh ? '命令速查（第 16 章）' : 'Command reference (ch 16)'}
          <Icon name="arrowRight" size={10} />
        </Link>
        <Link className="chip" to="/chapter/templates">
          {zh ? '模板详解（第 17 章）' : 'Template walkthrough (ch 17)'}
          <Icon name="arrowRight" size={10} />
        </Link>
        <Link className="chip" to="/lab">
          {zh ? '去实验室算一遍' : 'Model it in the lab'}
          <Icon name="arrowRight" size={10} />
        </Link>
      </div>
    </Shell>
  )
}
