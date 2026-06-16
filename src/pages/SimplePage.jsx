import { termsContent, privacyContent } from '../data/site'
import { useLang } from '../context/LanguageContext'

const contentMap = {
  terms: termsContent,
  privacy: privacyContent,
}

function LegalContent({ data, isPrivacy }) {
  const { lang } = useLang()
  const current = data[lang] ?? data.ko

  return (
    <div className="mx-auto max-w-3xl section-x py-16 md:py-24">
      <div className="card overflow-hidden">
        {/* 문서 헤더 */}
        <div className={[
          'px-8 py-6 border-b border-gray-100 dark:border-gray-800',
          isPrivacy
            ? 'bg-brand-navy dark:bg-gray-900'
            : 'bg-brand-light dark:bg-gray-900',
        ].join(' ')}>
          <p className={[
            'text-xs font-semibold tracking-widest uppercase mb-1',
            isPrivacy ? 'text-brand-sky/80' : 'text-brand-royal/70 dark:text-brand-sky/70',
          ].join(' ')}>
            {isPrivacy ? 'PRIVACY POLICY' : 'TERMS OF SERVICE'}
          </p>
          <p className={[
            'text-sm',
            isPrivacy ? 'text-white/60' : 'text-neutral-500 dark:text-neutral-400',
          ].join(' ')}>
            {lang === 'ko' ? `최종 업데이트: ${current.lastUpdated}` : `Last updated: ${current.lastUpdated}`}
          </p>
        </div>

        {/* 본문 — 현재 lang에 해당하는 섹션만 렌더링 */}
        <div className="px-8 py-8">
          <div className="space-y-7">
            {current.sections.map((sec, i) => (
              <div key={i}>
                <h3 className={[
                  'mb-2 text-sm font-bold',
                  isPrivacy
                    ? 'text-brand-royal dark:text-brand-sky'
                    : 'text-brand-navy dark:text-neutral-200',
                ].join(' ')}>
                  {sec.heading}
                </h3>
                <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400 whitespace-pre-line">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SimplePage({ title, contentKey }) {
  const { t, lang } = useLang()
  const content = contentKey ? contentMap[contentKey] : null
  const isPrivacy = contentKey === 'privacy'

  const titleText = t(title)
  const breadcrumb = lang === 'ko' ? `홈 / ${titleText}` : `Home / ${titleText}`

  return (
    <div>
      {/* 페이지 헤더 */}
      <div className={[
        'w-full flex items-center justify-center py-16 md:py-24',
        isPrivacy
          ? 'bg-gradient-to-br from-brand-navy via-brand-royal to-brand-sky dark:from-gray-950 dark:via-brand-navy dark:to-brand-royal'
          : 'bg-gradient-to-br from-brand-navy to-brand-royal dark:from-gray-900 dark:to-brand-navy',
      ].join(' ')}>
        <div className="section-x text-center">
          <p className="text-xs font-semibold tracking-widest text-brand-sky/80 uppercase mb-3">
            {breadcrumb}
          </p>
          <h1 className={[
            'font-extrabold text-white md:text-5xl',
            isPrivacy ? 'text-4xl' : 'text-3xl',
          ].join(' ')}>
            {titleText}
          </h1>
          {isPrivacy && (
            <p className="mt-4 text-white/70 text-sm">
              {lang === 'ko'
                ? '개인정보는 소중히 보호됩니다'
                : 'Your privacy is our priority'}
            </p>
          )}
        </div>
      </div>

      {/* 콘텐츠 */}
      {content ? (
        <div className="bg-brand-light dark:bg-gray-950 transition-colors">
          <LegalContent data={content} isPrivacy={isPrivacy} />
        </div>
      ) : (
        <div className="mx-auto max-w-container section-x py-24 text-center">
          <p className="text-xl font-medium text-neutral-600 dark:text-neutral-400">
            {lang === 'ko'
              ? <>&ldquo;{titleText}&rdquo; 페이지 콘텐츠가 준비 중입니다.</>
              : <>The &ldquo;{titleText}&rdquo; page content is coming soon.</>}
          </p>
          <p className="mt-3 text-neutral-400 dark:text-neutral-500">
            {lang === 'ko' ? '실제 운영 시 내용으로 교체하세요.' : 'Replace this with real content before launch.'}
          </p>
        </div>
      )}
    </div>
  )
}
