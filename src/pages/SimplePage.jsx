import { termsContent, privacyContent } from '../data/site'

const contentMap = {
  terms: termsContent,
  privacy: privacyContent,
}

function LegalContent({ data, isPrivacy }) {
  return (
    <div className="mx-auto max-w-3xl section-x py-16 md:py-24">
      <div className="card overflow-hidden">
        {/* 문서 상단 메타 */}
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
            최종 업데이트: {data.ko.lastUpdated} &nbsp;·&nbsp; Last updated: {data.en.lastUpdated}
          </p>
        </div>

        {/* 한국어 본문 */}
        <div className="px-8 py-8 border-b border-gray-100 dark:border-gray-800">
          <div className="mb-5 flex items-center gap-3">
            <span className="badge">한국어</span>
          </div>
          <div className="space-y-6 max-h-96 overflow-y-auto pr-2
                          scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
            {data.ko.sections.map((sec, i) => (
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

        {/* 영문 본문 */}
        <div className="px-8 py-8">
          <div className="mb-5 flex items-center gap-3">
            <span className="badge border-brand-sky/30 bg-brand-sky/10 text-brand-sky">English</span>
            {isPrivacy && (
              <span className="text-xs text-neutral-400 dark:text-neutral-500">
                PIPEDA &amp; Global Privacy Standards
              </span>
            )}
          </div>
          <div className="space-y-6 max-h-96 overflow-y-auto pr-2
                          scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
            {data.en.sections.map((sec, i) => (
              <div key={i}>
                <h3 className={[
                  'mb-2 text-sm font-bold',
                  isPrivacy
                    ? 'text-brand-royal dark:text-brand-sky'
                    : 'text-brand-navy dark:text-neutral-200',
                ].join(' ')}>
                  {sec.heading}
                </h3>
                <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">
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
  const content = contentKey ? contentMap[contentKey] : null
  const isPrivacy = contentKey === 'privacy'

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
            홈 / {title}
          </p>
          <h1 className={[
            'font-extrabold text-white md:text-5xl',
            isPrivacy ? 'text-4xl' : 'text-3xl',
          ].join(' ')}>
            {title}
          </h1>
          {isPrivacy && (
            <p className="mt-4 text-white/70 text-sm">
              개인정보는 소중히 보호됩니다 · Your privacy is protected
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
            &ldquo;{title}&rdquo; 페이지 콘텐츠가 준비 중입니다.
          </p>
          <p className="mt-3 text-neutral-400 dark:text-neutral-500">
            실제 운영 시 내용으로 교체하세요.
          </p>
        </div>
      )}
    </div>
  )
}
