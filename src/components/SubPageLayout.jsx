import { NavLink } from 'react-router-dom'

export default function SubPageLayout({ sectionTitle, tabs, headLabel, children }) {
  return (
    <div>
      {/* Sticky 탭 네비 */}
      <div className="sticky top-20 z-30 bg-white dark:bg-gray-950 shadow-sm
                      border-b border-gray-100 dark:border-gray-800 transition-colors">
        <div className="mx-auto max-w-container section-x pt-10">
          <div className="flex flex-col-reverse justify-between md:flex-row">
            <h2 className="mb-6 text-3xl font-bold leading-none text-brand-navy dark:text-brand-sky
                           md:mb-10 md:text-4xl">
              {sectionTitle}
            </h2>
            <p className="mb-3 text-sm font-medium text-neutral-400 dark:text-neutral-500 md:mb-0">
              홈 <span className="mx-2 text-neutral-300">/</span> {sectionTitle}
            </p>
          </div>

          <ul className="flex w-full overflow-x-auto font-semibold">
            {tabs.map((t) => (
              <li key={t.to} className="shrink-0">
                <NavLink
                  to={t.to}
                  className={({ isActive }) =>
                    [
                      'block whitespace-nowrap border-b-2 px-4 py-4 text-sm transition md:px-8 md:py-5 md:text-base',
                      isActive
                        ? 'border-brand-royal text-brand-royal dark:border-brand-sky dark:text-brand-sky'
                        : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-brand-royal dark:hover:text-brand-sky',
                    ].join(' ')
                  }
                >
                  {t.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 페이지 헤더 */}
      <div className="w-full bg-gradient-to-br from-brand-navy to-brand-royal dark:from-gray-900 dark:to-brand-navy
                      flex items-center justify-center" style={{ aspectRatio: '32/9' }}>
        <div className="text-center">
          <p className="text-sm font-semibold tracking-widest text-brand-sky/80 uppercase mb-2">
            {headLabel}
          </p>
          <p className="text-3xl font-bold text-white md:text-5xl">{sectionTitle}</p>
        </div>
      </div>

      {/* 본문 */}
      <div className="border-b border-neutral-200 dark:border-gray-800 py-16 md:py-24 transition-colors">
        {children}
      </div>
    </div>
  )
}
