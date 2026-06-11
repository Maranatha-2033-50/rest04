import { Link } from 'react-router-dom'
import { company } from '../data/site'
import { useLang } from '../context/LanguageContext'

export default function Footer() {
  const { t } = useLang()
  const relatedSitesLabel = t({ ko: '관련 사이트', en: 'Related Sites' })
  return (
    <footer className="mt-auto">
      {/* 상단: 브랜드 소개 */}
      <div className="bg-brand-light dark:bg-gray-900 transition-colors">
        <div className="mx-auto max-w-container section-x py-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-16">
            <div className="shrink-0">
              <p className="text-2xl font-extrabold tracking-tight text-brand-navy dark:text-brand-sky">
                {company.name}
              </p>
              <p className="mt-1 text-sm font-medium text-brand-royal dark:text-brand-sky/70">
                {t(company.slogan)}
              </p>
            </div>
            <div className="flex-grow space-y-3 text-sm leading-7 text-neutral-600 dark:text-neutral-400">
              {company.intro.map((p, i) => (
                <p key={i}>{t(p)}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 하단: 주소·링크·카피라이트 */}
      <div className="bg-brand-navy dark:bg-gray-950 text-white transition-colors">
        <div className="mx-auto max-w-container section-x py-10">
          <div className="flex flex-col gap-8 md:flex-row md:justify-between">
            {/* 주소 */}
            <div className="flex flex-col gap-3 text-sm">
              {company.offices.map((o, i) => (
                <div key={i} className="flex flex-col gap-1 md:flex-row md:gap-8">
                  <span className="w-24 shrink-0 font-bold text-brand-sky">{t(o.label)}</span>
                  <ul className="flex flex-col gap-1 text-neutral-400 md:flex-row md:gap-6">
                    <li className="md:w-64">{t(o.address)}</li>
                    <li>Tel {o.tel}</li>
                    <li>Fax {o.fax}</li>
                  </ul>
                </div>
              ))}
            </div>

            {/* 관련 사이트 */}
            <div className="w-full md:w-52">
              <select
                aria-label={relatedSitesLabel}
                className="w-full rounded border border-gray-600 bg-transparent px-4 py-2.5
                           text-sm font-bold text-neutral-300 cursor-pointer"
                defaultValue=""
                onChange={(e) => { if (e.target.value) window.open(e.target.value, '_blank') }}
              >
                <option value="" disabled>{relatedSitesLabel}</option>
                {company.familySites.map((f) => (
                  <option key={f.url} value={f.url} className="text-black">{t(f.name)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 정책 링크 + 카피 */}
          <div className="mt-8 flex flex-col justify-between gap-4
                          border-t border-gray-700 pt-6 text-sm
                          md:flex-row md:items-center">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {company.footerLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={
                      l.strong
                        ? 'font-bold text-white hover:text-brand-sky'
                        : 'text-neutral-400 hover:text-white transition-colors'
                    }
                  >
                    {t(l.label)}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-neutral-500 text-xs">{company.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
