export default function SimplePage({ title }) {
  return (
    <div>
      <div className="w-full bg-gradient-to-br from-brand-navy to-brand-royal dark:from-gray-900 dark:to-brand-navy flex items-center justify-center py-16 md:py-24">
        <div className="section-x text-center">
          <p className="text-xs font-semibold tracking-widest text-brand-sky/80 uppercase mb-3">
            홈 / {title}
          </p>
          <h2 className="text-3xl font-extrabold text-white md:text-5xl">{title}</h2>
        </div>
      </div>

      <div className="mx-auto max-w-container section-x py-24 text-center">
        <p className="text-xl font-medium text-neutral-600 dark:text-neutral-400">
          &ldquo;{title}&rdquo; 페이지 콘텐츠가 준비 중입니다.
        </p>
        <p className="mt-3 text-neutral-400 dark:text-neutral-500">
          실제 운영 시 내용으로 교체하세요.
        </p>
      </div>
    </div>
  )
}
