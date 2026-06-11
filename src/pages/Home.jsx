import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { serviceCards, notices, videoTopics, heroSlides } from '../data/site'
import { useLang } from '../context/LanguageContext'

// ─── Editorial images — natural light, minimal studio (Unsplash) ────────────
const HERO_BG =
  'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=1920&q=80'

const SERVICE_IMG = {
  languages:      'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
  certifications: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=800&q=80',
  subjects:       'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80',
}

const VIDEO_IMG = [
  'https://images.unsplash.com/photo-1434030216411-0b793f4b6f6a?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=600&q=80',
]

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  const { t } = useLang()
  const [idx, setIdx] = useState(0)
  const go = (dir) => setIdx((i) => (i + dir + heroSlides.length) % heroSlides.length)

  useEffect(() => {
    const timer = setInterval(() => setIdx((i) => (i + 1) % heroSlides.length), 5500)
    return () => clearInterval(timer)
  }, [])

  const s = heroSlides[idx]

  return (
    <section className="relative min-h-[calc(100vh-5rem)] w-full overflow-hidden flex items-center">
      {/* 에디토리얼 배경 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${HERO_BG}')` }}
      />
      {/* 그라디언트 오버레이 */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy/96 via-brand-royal/88 to-brand-sky/70
                      dark:from-gray-950/97 dark:via-brand-navy/92 dark:to-brand-royal/82" />
      {/* 도트 패턴 */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
          backgroundSize: '60px 60px, 40px 40px',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-container section-x py-24">
        <div className="transition-all duration-700">
          <span className="badge mb-6 inline-block border border-brand-sky/30 bg-brand-sky/10 text-brand-sky text-xs tracking-widest uppercase">
            {t(s.accent)}
          </span>
          <h1 className="mb-6 whitespace-pre-line text-5xl font-extrabold leading-tight text-white
                         md:text-7xl lg:text-8xl drop-shadow">
            {t(s.tagline)}
          </h1>
          <p className="mb-10 max-w-2xl text-lg text-white/80 leading-relaxed md:text-xl">
            {t(s.sub)}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to={s.cta.to} className="btn-primary text-base px-8 py-3.5 shadow-lg">
              {t(s.cta.label)} →
            </Link>
            <Link to="/videos/ielts"
              className="inline-flex items-center gap-2 rounded-full border border-white/40
                         text-white px-8 py-3.5 text-base font-semibold
                         hover:bg-white/10 transition-colors">
              {t({ ko: '학습 동영상 →', en: 'Learning Videos →' })}
            </Link>
            <a href="https://study-mate-nine-phi.vercel.app/signup"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/30
                         text-white px-8 py-3.5 text-base font-semibold
                         hover:bg-white/25 transition-colors">
              {t({ ko: '무료로 시작하기 →', en: 'Get Started Free →' })}
            </a>
          </div>
        </div>
      </div>

      {/* 슬라이드 네비 */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-6">
        <button type="button"
          aria-label={t({ ko: '이전', en: 'Previous' })}
          onClick={() => go(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full
                     border border-white/40 text-white hover:bg-white/20 transition">
          ‹
        </button>
        <div className="flex gap-2">
          {heroSlides.map((_, i) => (
            <button key={i} type="button"
              aria-label={t({ ko: `슬라이드 ${i + 1}`, en: `Slide ${i + 1}` })}
              onClick={() => setIdx(i)}
              className={['h-1.5 rounded-full transition-all',
                i === idx ? 'w-8 bg-white' : 'w-2 bg-white/40'].join(' ')}
            />
          ))}
        </div>
        <button type="button"
          aria-label={t({ ko: '다음', en: 'Next' })}
          onClick={() => go(1)}
          className="flex h-9 w-9 items-center justify-center rounded-full
                     border border-white/40 text-white hover:bg-white/20 transition">
          ›
        </button>
      </div>
    </section>
  )
}

// ─── Services ────────────────────────────────────────────────────────────────
function Services() {
  const { t, lang } = useLang()
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-gray-950 transition-colors">
      <div className="mx-auto max-w-container section-x">
        <div className="mb-14 text-center">
          <span className="badge mb-3">{t({ ko: '학습 서비스', en: 'Services' })}</span>
          <h2 className="text-4xl font-extrabold text-brand-navy dark:text-white md:text-5xl">
            {lang === 'ko'
              ? <><span>취약점을 분석하고,</span><br className="hidden sm:block" /><span>합격을 설계합니다</span></>
              : <><span>Diagnose your weak points,</span><br className="hidden sm:block" /><span>design your path to success.</span></>}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {serviceCards.map((s) => (
            <Link key={s.key} to={s.to}
              className="card group overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
              {/* 에디토리얼 이미지 헤더 */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={SERVICE_IMG[s.key] ?? SERVICE_IMG.subjects}
                  alt={t(s.title)}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0
                             group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span className="text-2xl">{s.icon}</span>
                  <span className="text-white text-sm font-bold tracking-wide">{t(s.title)}</span>
                </div>
              </div>
              <div className="p-7 flex flex-col flex-1">
                <p className="mb-5 text-sm leading-7 text-neutral-600 dark:text-neutral-400 flex-1">
                  {t(s.desc)}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {s.tags.map((tag) => (
                    <span key={tag} className="badge text-xs">{tag}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-sm font-semibold
                                text-brand-royal dark:text-brand-sky group-hover:gap-3 transition-all">
                  {t({ ko: '자세히 보기', en: 'Learn more' })} <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── AI Band ─────────────────────────────────────────────────────────────────
function AIBand() {
  const { t, lang } = useLang()
  return (
    <section className="relative overflow-hidden
                        bg-gradient-to-r from-brand-navy to-brand-royal
                        dark:from-gray-900 dark:to-brand-navy
                        py-24 md:py-32 transition-colors">
      <div className="absolute right-0 top-0 h-full w-1/2 opacity-5"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
      />
      <div className="relative mx-auto max-w-container section-x">
        <div className="max-w-2xl">
          <span className="badge mb-4 border-brand-sky/30 bg-brand-sky/10 text-brand-sky">
            {t({ ko: 'AI 학습 기술', en: 'AI Technology' })}
          </span>
          <h2 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            {lang === 'ko'
              ? <>AI가 내 취약점을<br />정밀하게 분석합니다</>
              : <>AI precisely analyzes<br />your weak points</>}
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-white/80">
            {t({
              ko: '에듀포커스 AI 학습앱은 학습 데이터를 분석하여 취약한 유형·단원을 자동으로 파악하고, 최단 경로로 목표 점수에 도달하는 맞춤 학습 루틴을 설계합니다.',
              en: 'The EDUFOCUS AI app analyzes your performance data to automatically pinpoint weak types and units, then builds a personalized routine to reach your target score by the shortest path.',
            })}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/ai-app" className="btn-primary text-base px-8 py-3.5">
              {t({ ko: 'AI 앱 소개 →', en: 'About the AI App →' })}
            </Link>
            <Link to="/videos/ai-app"
              className="inline-flex items-center gap-2 rounded-full border border-white/40
                         text-white px-8 py-3.5 text-base font-semibold hover:bg-white/10 transition-colors">
              {t({ ko: '활용법 영상 보기 →', en: 'Watch How-To Videos →' })}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Latest Videos ────────────────────────────────────────────────────────────
function LatestVideos() {
  const { t, lang } = useLang()
  const featured = videoTopics[0].videos.slice(0, 3)

  return (
    <section className="py-24 md:py-32 bg-brand-light dark:bg-gray-900 transition-colors">
      <div className="mx-auto max-w-container section-x">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="badge mb-3">{t({ ko: '최신 학습 영상', en: 'Latest Videos' })}</span>
            <h2 className="text-3xl font-extrabold text-brand-navy dark:text-white md:text-4xl">
              {t({ ko: '학습 TIP 동영상', en: 'Study Tip Videos' })}
            </h2>
          </div>
          <Link to="/videos/ielts"
            className="text-sm font-semibold text-brand-royal dark:text-brand-sky hover:underline">
            {t({ ko: '전체 영상 보기 →', en: 'View All Videos →' })}
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((v, i) => (
            <div key={v.id} className="card overflow-hidden group cursor-pointer">
              {/* 에디토리얼 썸네일 */}
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={VIDEO_IMG[i % VIDEO_IMG.length]}
                  alt={t(v.title)}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0
                             group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-brand-navy/35 flex items-center justify-center
                                group-hover:bg-brand-navy/15 transition-colors duration-300">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full
                                  bg-white/25 backdrop-blur-sm border border-white/50
                                  group-hover:scale-110 transition-transform duration-300">
                    <svg className="text-white ml-1" width="24" height="24"
                      viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="font-semibold text-neutral-800 dark:text-neutral-200 leading-snug">{t(v.title)}</p>
                <p className="mt-1 text-xs text-brand-royal dark:text-brand-sky">
                  {t({ ko: 'IELTS 학습 TIP', en: 'IELTS Study Tips' })}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-3 flex-wrap">
          {videoTopics.map((topic) => (
            <Link key={topic.key} to={topic.to}
              className="btn-outline text-xs px-5 py-2">
              {t(topic.label)}{lang === 'ko' ? ' 영상' : ' Videos'}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Notices ─────────────────────────────────────────────────────────────────
function Notices() {
  const { t } = useLang()
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-gray-950 transition-colors">
      <div className="mx-auto max-w-container section-x">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="badge mb-3">{t({ ko: '소식', en: 'News' })}</span>
            <h2 className="text-3xl font-extrabold text-brand-navy dark:text-white md:text-4xl">
              {t({ ko: '공지사항', en: 'Announcements' })}
            </h2>
          </div>
          <Link to="/support"
            className="text-sm font-semibold text-brand-royal dark:text-brand-sky hover:underline">
            {t({ ko: '전체보기 →', en: 'View All →' })}
          </Link>
        </div>

        <ul className="divide-y divide-neutral-100 dark:divide-gray-800">
          {notices.map((n) => (
            <li key={n.id}>
              <Link to="/support"
                className="flex flex-col justify-between gap-1 py-5 transition
                           hover:text-brand-royal dark:hover:text-brand-sky
                           sm:flex-row sm:items-center">
                <span className="font-semibold text-neutral-800 dark:text-neutral-200 md:text-lg">
                  {typeof n.title === 'object' ? t(n.title) : n.title}
                </span>
                <span className="text-sm text-neutral-400 dark:text-neutral-500">{n.date}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <AIBand />
      <LatestVideos />
      <Notices />
    </>
  )
}
