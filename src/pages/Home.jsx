import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { serviceCards, notices, videoTopics } from '../data/site'

const heroSlides = [
  {
    tagline: '내 취약점을 알면,\n합격이 보입니다',
    sub: 'AI 기반 취약점 분석으로 나만의 집중 학습 루틴을 설계합니다',
    cta: { label: 'AI 취약점 진단 시작', to: '/ai-app' },
    accent: 'IELTS · DELF · 컴활 · 정처기 · 한능검',
  },
  {
    tagline: '어학부터 자격증까지,\n당신의 합격을 함께',
    sub: 'IELTS, DELF, 컴퓨터활용능력, 정보처리기사, 한국사능력검정 전문 학습 플랫폼',
    cta: { label: '서비스 둘러보기', to: '/languages/ielts' },
    accent: '취약 단원 집중 공략 · 맞춤 루틴 설계',
  },
  {
    tagline: '유튜브 학습 TIP과\nAI 앱으로 자기주도학습',
    sub: '주제별 학습 TIP 영상과 AI 취약점 분석 앱으로 혼자서도 합격할 수 있습니다',
    cta: { label: '학습 동영상 보기', to: '/videos/ielts' },
    accent: 'IELTS · DELF · 컴활 · 정처기 · 한능검 · AI앱 활용',
  },
]

function Hero() {
  const [idx, setIdx] = useState(0)
  const go = (dir) => setIdx((i) => (i + dir + heroSlides.length) % heroSlides.length)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % heroSlides.length), 5500)
    return () => clearInterval(t)
  }, [])

  const s = heroSlides[idx]

  return (
    <section className="relative min-h-[calc(100vh-5rem)] w-full overflow-hidden
                        bg-gradient-to-br from-brand-navy via-brand-royal to-brand-sky
                        dark:from-gray-950 dark:via-brand-navy dark:to-brand-royal
                        flex items-center">
      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)',
          backgroundSize: '60px 60px, 40px 40px',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-container section-x py-24">
        {/* 슬라이드 컨텐츠 */}
        <div className="transition-all duration-700">
          <span className="badge mb-6 inline-block border border-brand-sky/30 bg-brand-sky/10 text-brand-sky text-xs tracking-widest uppercase">
            {s.accent}
          </span>
          <h1 className="mb-6 whitespace-pre-line text-5xl font-extrabold leading-tight text-white
                         md:text-7xl lg:text-8xl drop-shadow">
            {s.tagline}
          </h1>
          <p className="mb-10 max-w-2xl text-lg text-white/80 leading-relaxed md:text-xl">
            {s.sub}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to={s.cta.to} className="btn-primary text-base px-8 py-3.5 shadow-lg">
              {s.cta.label} →
            </Link>
            <Link to="/videos/ielts"
              className="inline-flex items-center gap-2 rounded-full border border-white/40
                         text-white px-8 py-3.5 text-base font-semibold
                         hover:bg-white/10 transition-colors">
              학습 동영상 →
            </Link>
          </div>
        </div>
      </div>

      {/* 슬라이드 네비 */}
      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center gap-6">
        <button type="button" aria-label="이전" onClick={() => go(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full
                     border border-white/40 text-white hover:bg-white/20 transition">
          ‹
        </button>
        <div className="flex gap-2">
          {heroSlides.map((_, i) => (
            <button key={i} type="button" aria-label={`슬라이드 ${i + 1}`}
              onClick={() => setIdx(i)}
              className={['h-1.5 rounded-full transition-all',
                i === idx ? 'w-8 bg-white' : 'w-2 bg-white/40'].join(' ')}
            />
          ))}
        </div>
        <button type="button" aria-label="다음" onClick={() => go(1)}
          className="flex h-9 w-9 items-center justify-center rounded-full
                     border border-white/40 text-white hover:bg-white/20 transition">
          ›
        </button>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-gray-950 transition-colors">
      <div className="mx-auto max-w-container section-x">
        <div className="mb-14 text-center">
          <span className="badge mb-3">학습 서비스</span>
          <h2 className="text-4xl font-extrabold text-brand-navy dark:text-white md:text-5xl">
            취약점을 분석하고,<br className="hidden sm:block" /> 합격을 설계합니다
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {serviceCards.map((s) => (
            <Link key={s.key} to={s.to}
              className="card group p-8 hover:shadow-lg hover:-translate-y-1 transition-all">
              <div className="mb-5 text-5xl">{s.icon}</div>
              <h3 className="mb-3 text-2xl font-bold text-brand-navy dark:text-white group-hover:text-brand-royal dark:group-hover:text-brand-sky transition-colors">
                {s.title}
              </h3>
              <p className="mb-5 text-sm leading-7 text-neutral-600 dark:text-neutral-400">{s.desc}</p>
              <div className="flex flex-wrap gap-2">
                {s.tags.map((tag) => (
                  <span key={tag} className="badge text-xs">{tag}</span>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold
                              text-brand-royal dark:text-brand-sky group-hover:gap-3 transition-all">
                자세히 보기 <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function AIBand() {
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
          <span className="badge mb-4 border-brand-sky/30 bg-brand-sky/10 text-brand-sky">AI 학습 기술</span>
          <h2 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-5xl">
            AI가 내 취약점을<br />정밀하게 분석합니다
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-white/80">
            에듀포커스 AI 학습앱은 학습 데이터를 분석하여 취약한 유형·단원을 자동으로 파악하고,
            최단 경로로 목표 점수에 도달하는 맞춤 학습 루틴을 설계합니다.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/ai-app" className="btn-primary text-base px-8 py-3.5">
              AI 앱 소개 →
            </Link>
            <Link to="/videos/ai-app"
              className="inline-flex items-center gap-2 rounded-full border border-white/40
                         text-white px-8 py-3.5 text-base font-semibold hover:bg-white/10 transition-colors">
              활용법 영상 보기 →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

function LatestVideos() {
  const featured = videoTopics[0].videos.slice(0, 3)

  return (
    <section className="py-24 md:py-32 bg-brand-light dark:bg-gray-900 transition-colors">
      <div className="mx-auto max-w-container section-x">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="badge mb-3">최신 학습 영상</span>
            <h2 className="text-3xl font-extrabold text-brand-navy dark:text-white md:text-4xl">
              학습 TIP 동영상
            </h2>
          </div>
          <Link to="/videos/ielts"
            className="text-sm font-semibold text-brand-royal dark:text-brand-sky hover:underline">
            전체 영상 보기 →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((v) => (
            <div key={v.id} className="card overflow-hidden group">
              <div className="aspect-video w-full bg-brand-navy/10 dark:bg-gray-800
                              flex flex-col items-center justify-center gap-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-full
                                bg-brand-royal/20 dark:bg-brand-sky/20">
                  <svg className="text-brand-royal dark:text-brand-sky ml-1" width="24" height="24"
                    viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-xs text-neutral-400 dark:text-neutral-500">YouTube 영상 준비 중</p>
              </div>
              <div className="p-5">
                <p className="font-semibold text-neutral-800 dark:text-neutral-200 leading-snug">{v.title}</p>
                <p className="mt-1 text-xs text-brand-royal dark:text-brand-sky">IELTS 학습 TIP</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center gap-4 flex-wrap">
          {videoTopics.map((t) => (
            <Link key={t.key} to={t.to}
              className="btn-outline text-xs px-5 py-2">
              {t.label} 영상
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

function Notices() {
  return (
    <section className="py-24 md:py-32 bg-white dark:bg-gray-950 transition-colors">
      <div className="mx-auto max-w-container section-x">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="badge mb-3">소식</span>
            <h2 className="text-3xl font-extrabold text-brand-navy dark:text-white md:text-4xl">
              공지사항
            </h2>
          </div>
          <Link to="/support"
            className="text-sm font-semibold text-brand-royal dark:text-brand-sky hover:underline">
            전체보기 →
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
                  {n.title}
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
