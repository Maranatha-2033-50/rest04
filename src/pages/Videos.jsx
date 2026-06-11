import { useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import { videoTopics } from '../data/site'
import { useLang } from '../context/LanguageContext'

const VIDEOS_PER_PAGE = 6 // 2열 × 3행

function VideoCard({ video }) {
  const { t } = useLang()
  const isPlaceholder = !video.id || video.id.startsWith('PLACEHOLDER')

  return (
    <div className="card overflow-hidden">
      {isPlaceholder ? (
        <div className="aspect-video w-full bg-gradient-to-br from-brand-light to-brand-royal/10
                        dark:from-gray-800 dark:to-brand-navy/40
                        flex flex-col items-center justify-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full
                          bg-brand-royal/20 dark:bg-brand-sky/20">
            <svg className="text-brand-royal dark:text-brand-sky ml-1" width="28" height="28"
              viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            {t({ ko: 'YouTube 영상 준비 중', en: 'YouTube Video Coming Soon' })}
          </p>
        </div>
      ) : (
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}`}
            title={t(video.title)}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="h-full w-full"
          />
        </div>
      )}
      <div className="p-4">
        <p className="font-semibold leading-snug text-neutral-800 dark:text-neutral-200">
          {t(video.title)}
        </p>
      </div>
    </div>
  )
}

function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null
  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      <button
        type="button"
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        className="flex h-10 w-10 items-center justify-center rounded-full border
                   border-gray-200 dark:border-gray-700
                   text-neutral-500 dark:text-neutral-400
                   disabled:opacity-30 hover:border-brand-royal hover:text-brand-royal
                   dark:hover:border-brand-sky dark:hover:text-brand-sky transition"
      >
        ‹
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPage(p)}
          className={[
            'flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition',
            p === page
              ? 'border-brand-royal bg-brand-royal text-white dark:border-brand-sky dark:bg-brand-sky dark:text-gray-950'
              : 'border-gray-200 dark:border-gray-700 text-neutral-600 dark:text-neutral-400 hover:border-brand-royal hover:text-brand-royal dark:hover:border-brand-sky dark:hover:text-brand-sky',
          ].join(' ')}
        >
          {p}
        </button>
      ))}

      <button
        type="button"
        onClick={() => onPage(page + 1)}
        disabled={page === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-full border
                   border-gray-200 dark:border-gray-700
                   text-neutral-500 dark:text-neutral-400
                   disabled:opacity-30 hover:border-brand-royal hover:text-brand-royal
                   dark:hover:border-brand-sky dark:hover:text-brand-sky transition"
      >
        ›
      </button>
    </div>
  )
}

export default function Videos() {
  const { topic } = useParams()
  const { t, lang } = useLang()
  const [pages, setPages] = useState({})

  const current = videoTopics.find((vt) => vt.key === topic) ?? videoTopics[0]
  const page = pages[current.key] ?? 1
  const totalPages = Math.ceil(current.videos.length / VIDEOS_PER_PAGE)
  const slice = current.videos.slice((page - 1) * VIDEOS_PER_PAGE, page * VIDEOS_PER_PAGE)

  const handlePage = (p) => {
    setPages((prev) => ({ ...prev, [current.key]: p }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div>
      {/* 페이지 헤더 */}
      <div className="w-full bg-gradient-to-br from-brand-navy to-brand-royal
                      dark:from-gray-900 dark:to-brand-navy flex items-center justify-center py-16 md:py-24">
        <div className="text-center section-x">
          <p className="text-xs font-semibold tracking-widest text-brand-sky/80 uppercase mb-2">
            LEARNING VIDEOS
          </p>
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">
            {t({ ko: '학습 동영상', en: 'Learning Videos' })}
          </h1>
          <p className="mt-4 text-white/70 text-sm md:text-base">
            {t({
              ko: '주제별 학습 TIP 영상과 AI 앱 활용법을 확인하세요',
              en: 'Explore topic-by-topic study tips and AI app how-to videos',
            })}
          </p>
        </div>
      </div>

      {/* 주제 탭 — 가로 스크롤 */}
      <div className="sticky top-20 z-30 bg-white dark:bg-gray-950 shadow-sm
                      border-b border-gray-100 dark:border-gray-800 transition-colors">
        <div className="mx-auto max-w-container section-x">
          <ul className="flex overflow-x-auto font-semibold">
            {videoTopics.map((vt) => (
              <li key={vt.key} className="shrink-0">
                <NavLink
                  to={vt.to}
                  onClick={() => setPages((prev) => ({ ...prev, [vt.key]: 1 }))}
                  className={({ isActive }) =>
                    [
                      'block whitespace-nowrap border-b-2 px-4 py-4 text-sm transition md:px-6 md:py-5',
                      isActive
                        ? 'border-brand-royal text-brand-royal dark:border-brand-sky dark:text-brand-sky'
                        : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-brand-royal dark:hover:text-brand-sky',
                    ].join(' ')
                  }
                >
                  {t(vt.label)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 영상 그리드 2×3 */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-950 transition-colors">
        <div className="mx-auto max-w-container section-x">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold text-brand-navy dark:text-white">
              {lang === 'ko' ? `${t(current.label)} 학습 영상` : `${t(current.label)} Videos`}
            </h2>
            <span className="text-sm text-neutral-400 dark:text-neutral-500">
              {lang === 'ko'
                ? `${page} / ${totalPages} 페이지 · 총 ${current.videos.length}개`
                : `Page ${page} / ${totalPages} · ${current.videos.length} videos`}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {slice.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>

          <Pagination page={page} totalPages={totalPages} onPage={handlePage} />

          <p className="mt-8 text-center text-xs text-neutral-400 dark:text-neutral-600">
            {t({
              ko: '* 영상이 준비되는 대로 순차적으로 업데이트됩니다.',
              en: '* Videos are being added and will appear here as they become available.',
            })}
          </p>
        </div>
      </section>
    </div>
  )
}
