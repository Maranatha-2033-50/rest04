import { Link } from 'react-router-dom'
import { videoTopics } from '../data/site'

const features = [
  {
    icon: '🔍',
    title: '취약점 정밀 분석',
    desc: '문제 풀이 데이터를 분석해 단원·유형·문항 수준별로 취약점을 정밀하게 파악합니다.',
  },
  {
    icon: '🗺️',
    title: '맞춤 학습 루틴 설계',
    desc: '취약점 분석 결과를 기반으로 목표 점수 달성까지 최단 경로의 학습 루틴을 자동 설계합니다.',
  },
  {
    icon: '📝',
    title: '취약점 집중 문제 제공',
    desc: 'AI가 취약 유형에 특화된 문제를 선별·생성하여 반복 훈련이 가능한 문제 세트를 제공합니다.',
  },
  {
    icon: '📊',
    title: '학습 진도 리포트',
    desc: '주간·월간 학습 성취도 리포트로 취약점 개선 현황과 목표 달성률을 한눈에 확인합니다.',
  },
  {
    icon: '🔔',
    title: '스마트 복습 알림',
    desc: '망각 곡선 기반으로 복습 타이밍을 자동 계산하여 최적의 시점에 알림을 보냅니다.',
  },
  {
    icon: '🎯',
    title: '목표 점수 시뮬레이션',
    desc: '현재 학습 속도와 취약점 개선 추이를 분석해 목표 시험일 예상 점수를 시뮬레이션합니다.',
  },
]

const supportedExams = [
  { label: 'IELTS', sub: 'Band 5~9' },
  { label: 'DELF A1·A2', sub: '프랑스어 입문·기초' },
  { label: 'DELF B1·B2', sub: '프랑스어 중급' },
  { label: 'DELF C1·C2', sub: '프랑스어 고급' },
  { label: '컴퓨터활용능력', sub: '1급·2급' },
  { label: '정보처리기사', sub: '필기·실기' },
  { label: '한국사능력검정', sub: '심화·기본' },
]

function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-brand-navy via-brand-royal to-brand-sky
                        dark:from-gray-950 dark:via-brand-navy dark:to-brand-royal
                        py-24 md:py-36 transition-colors">
      <div className="mx-auto max-w-container section-x">
        <div className="max-w-2xl">
          <span className="badge mb-6 border-brand-sky/30 bg-brand-sky/10 text-brand-sky text-xs tracking-widest uppercase">
            AI 학습 기술
          </span>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl">
            AI 취약점 분석으로<br />합격을 설계합니다
          </h1>
          <p className="mb-10 text-lg leading-relaxed text-white/80">
            에듀포커스 AI 학습앱은 학습자의 취약점을 정밀 분석하고,
            IELTS·DELF·자격증 목표 점수 달성까지 최단 경로의 학습 루틴을 자동으로 설계합니다.
          </p>
          <div id="download" className="flex flex-wrap gap-4">
            <a href={`https://apps.apple.com`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-white text-brand-navy
                         px-8 py-3.5 text-base font-bold shadow hover:shadow-lg transition">
              <span>🍎</span> iOS 다운로드
            </a>
            <a href={`https://play.google.com`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-full bg-white/20 text-white
                         border border-white/30 px-8 py-3.5 text-base font-bold hover:bg-white/30 transition">
              <span>🤖</span> Android 다운로드
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  return (
    <section id="analysis" className="py-24 md:py-32 bg-white dark:bg-gray-950 transition-colors">
      <div className="mx-auto max-w-container section-x">
        <div className="mb-14 text-center">
          <span className="badge mb-3">핵심 기능</span>
          <h2 className="text-3xl font-extrabold text-brand-navy dark:text-white md:text-4xl">
            AI가 나의 취약점을 파악하고<br />학습 루틴을 설계합니다
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card p-7 hover:shadow-md transition-shadow">
              <div className="mb-4 text-4xl">{f.icon}</div>
              <h3 className="mb-3 text-lg font-bold text-brand-navy dark:text-white">{f.title}</h3>
              <p className="text-sm leading-7 text-neutral-600 dark:text-neutral-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SupportedExams() {
  return (
    <section className="py-20 bg-brand-light dark:bg-gray-900 transition-colors">
      <div className="mx-auto max-w-container section-x">
        <div className="mb-10 text-center">
          <span className="badge mb-3">지원 시험</span>
          <h2 className="text-2xl font-extrabold text-brand-navy dark:text-white md:text-3xl">
            주요 어학·자격증 시험 지원
          </h2>
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {supportedExams.map((e) => (
            <div key={e.label} className="card px-6 py-4 text-center min-w-[140px]">
              <p className="font-bold text-brand-royal dark:text-brand-sky">{e.label}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{e.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function VideoSection() {
  const aiVideos = videoTopics.find((t) => t.key === 'ai-app')
  const preview = aiVideos?.videos.slice(0, 2) ?? []

  return (
    <section className="py-24 md:py-32 bg-white dark:bg-gray-950 transition-colors">
      <div className="mx-auto max-w-container section-x">
        <div className="mb-12 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="badge mb-3">학습 동영상</span>
            <h2 className="text-2xl font-extrabold text-brand-navy dark:text-white md:text-3xl">
              AI 앱 활용법 영상
            </h2>
          </div>
          <Link to="/videos/ai-app"
            className="text-sm font-semibold text-brand-royal dark:text-brand-sky hover:underline">
            전체 영상 보기 →
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
                <p className="text-xs text-neutral-400 dark:text-neutral-500">영상 준비 중</p>
              </div>
              <div className="p-5">
                <p className="font-semibold text-neutral-800 dark:text-neutral-200">{v.title}</p>
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
