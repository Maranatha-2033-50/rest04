import { Link } from 'react-router-dom'
import { videoTopics, aiAppFeatures, aiAppSupportedExams, studyMateApp } from '../data/site'
import { useLang } from '../context/LanguageContext'

function HeroSection() {
  const { t, lang } = useLang()

  return (
    <section className="bg-gradient-to-br from-brand-navy via-brand-royal to-brand-sky
                        dark:from-gray-950 dark:via-brand-navy dark:to-brand-royal
                        py-24 md:py-36 transition-colors">
      <div className="mx-auto max-w-container section-x">
        <div className="max-w-2xl">
          <span className="badge mb-6 border-brand-sky/30 bg-brand-sky/10 text-brand-sky text-xs tracking-widest uppercase">
            {t({ ko: 'AI 학습 기술', en: 'AI Learning Technology' })}
          </span>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl">
            {lang === 'ko'
              ? <>AI 취약점 분석으로<br />합격을 설계합니다</>
              : <>Engineer Your Success<br />with AI Weak-Point Analysis</>}
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-white/80">
            {t({
              ko: '에듀포커스 AI 학습앱은 학습자의 취약점을 정밀 분석하고, IELTS·DELF·자격증 목표 점수 달성까지 최단 경로의 학습 루틴을 자동으로 설계합니다.',
              en: 'The EDUFOCUS AI app precisely analyzes your weak points and automatically designs the shortest-path study routine to hit your target score across IELTS, DELF, and certification exams.',
            })}
          </p>
          <div id="download" className="flex flex-wrap gap-4">
            <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-white text-brand-navy
                         px-8 py-3.5 text-base font-bold shadow hover:shadow-lg transition">
              <span>🍎</span> {t({ ko: 'iOS 다운로드', en: 'Download for iOS' })}
            </a>
            <a href="https://play.google.com" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-white/20 text-white
                         border border-white/30 px-8 py-3.5 text-base font-bold hover:bg-white/30 transition">
              <span>🤖</span> {t({ ko: 'Android 다운로드', en: 'Download for Android' })}
            </a>
            <a href={studyMateApp.url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-brand-amber text-white
                         px-8 py-3.5 text-base font-bold shadow-lg hover:brightness-110 transition">
              <span>🚀</span> {t(studyMateApp.label)}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const { t, lang } = useLang()
  return (
    <section id="analysis" className="py-24 md:py-32 bg-white dark:bg-gray-950 transition-colors">
      <div className="mx-auto max-w-container section-x">
        <div className="mb-14 text-center">
          <span className="badge mb-3">{lang === 'ko' ? '핵심 기능' : 'Key Features'}</span>
          <h2 className="text-3xl font-extrabold text-brand-navy dark:text-white md:text-4xl">
            {lang === 'ko'
              ? <>AI가 나의 취약점을 파악하고<br />학습 루틴을 설계합니다</>
              : <>AI identifies your weak points<br />and designs your study routine</>}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {aiAppFeatures.map((f, i) => (
            <div key={i} className="card p-7 hover:shadow-md transition-shadow">
              <div className="mb-4 text-4xl">{f.icon}</div>
              <h3 className="mb-3 text-lg font-bold text-brand-navy dark:text-white">{t(f.title)}</h3>
              <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">{t(f.desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SupportedExams() {
  const { t, lang } = useLang()
  return (
    <section className="py-20 bg-brand-light dark:bg-gray-900 transition-colors">
      <div className="mx-auto max-w-container section-x">
        <div className="mb-10 text-center">
          <span className="badge mb-3">{lang === 'ko' ? '지원 시험' : 'Supported Exams'}</span>
          <h2 className="text-2xl font-extrabold text-brand-navy dark:text-white md:text-3xl">
            {lang === 'ko' ? '주요 어학·자격증 시험 지원' : 'Major Language & Certification Exams Supported'}
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {aiAppSupportedExams.map((e, i) => (
            <div key={i} className="card px-6 py-4 text-center min-w-[140px]">
              <p className="font-bold text-brand-royal dark:text-brand-sky">{t(e.label)}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{t(e.sub)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function VideoSection() {
  const { t } = useLang()
  const aiVideos = videoTopics.find((v) => v.key === 'ai-app')
  const preview = aiVideos?.videos.slice(0, 2) ?? []

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-gray-950 transition-colors">
      <div className="mx-auto max-w-container section-x">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="badge mb-3">{t({ ko: '학습 동영상', en: 'Learning Videos' })}</span>
            <h2 className="text-2xl font-extrabold text-brand-navy dark:text-white md:text-3xl">
              {t({ ko: 'AI 앱 활용법 영상', en: 'AI App How-To Videos' })}
            </h2>
          </div>
          <Link to="/videos/ai-app"
            className="text-sm font-semibold text-brand-royal dark:text-brand-sky hover:underline">
            {t({ ko: '전체 영상 보기 →', en: 'View All Videos →' })}
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {preview.map((v) => (
            <div key={v.id} className="card overflow-hidden">
              <div className="aspect-video w-full bg-brand-navy/10 dark:bg-gray-800
                              flex flex-col items-center justify-center gap-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-full
                                bg-brand-royal/20 dark:bg-brand-sky/20">
                  <svg className="text-brand-royal dark:text-brand-sky ml-1"
                    width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-xs text-neutral-400 dark:text-neutral-500">
                  {t({ ko: 'YouTube 영상 준비 중', en: 'YouTube Video Coming Soon' })}
                </p>
              </div>
              <div className="p-5">
                <p className="font-semibold text-neutral-800 dark:text-neutral-200">{t(v.title)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function AIApp() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <SupportedExams />
      <VideoSection />
    </>
  )
}
