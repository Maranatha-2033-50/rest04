import { useParams } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import { company } from '../data/site'

const tabs = [
  { label: '대표 인사말', to: '/about/greeting' },
  { label: '서비스 소개', to: '/about/services' },
  { label: '연혁', to: '/about/history' },
]

function Greeting() {
  return (
    <div className="mx-auto max-w-container section-x">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-brand-navy to-brand-royal
                          dark:from-gray-800 dark:to-brand-navy
                          flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">👤</div>
              <p className="text-sm opacity-70">대표 사진</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <span className="badge mb-4">대표 인사말</span>
          <h3 className="mb-6 text-3xl font-extrabold text-brand-navy dark:text-white">
            취약점을 알면,<br />합격이 보입니다
          </h3>
          <div className="space-y-5 text-base leading-8 text-neutral-600 dark:text-neutral-400">
            <p>에듀포커스를 방문해 주신 여러분께 진심으로 감사드립니다.</p>
            <p>
              저는 오랜 교육 현장 경험을 통해 한 가지 사실을 깨달았습니다.
              학습자가 실패하는 이유는 노력이 부족해서가 아니라,
              자신의 취약점을 정확히 모르기 때문이라는 것입니다.
            </p>
            <p>
              에듀포커스는 AI 기반 취약점 분석 기술로 각 학습자가 어디에서 막히는지를 정밀하게 파악하고,
              그 취약점을 집중적으로 보완할 수 있는 맞춤 학습 루틴을 제공합니다.
            </p>
            <p>
              IELTS, DELF, 컴퓨터활용능력, 정보처리기사, 한국사능력검정 등
              주요 어학·자격증 시험에서 여러분의 합격을 위해 에듀포커스가 함께하겠습니다.
            </p>
          </div>
          <div className="mt-10 border-t border-gray-100 dark:border-gray-800 pt-8">
            <p className="font-bold text-brand-navy dark:text-white text-lg">{company.nameKo} 대표</p>
            <p className="text-neutral-500 dark:text-neutral-400 mt-1">{company.fullName}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Services() {
  const services = [
    {
      icon: '🌐', title: '어학 — IELTS · DELF',
      desc: 'IELTS와 DELF A1~C2 전 레벨에 걸쳐 영역별 취약점 분석과 집중 학습 루틴을 제공합니다.',
      tags: ['IELTS', 'DELF A1-A2', 'DELF B1-B2', 'DELF C1-C2'],
    },
    {
      icon: '📋', title: '자격증 집중 학습',
      desc: '컴퓨터활용능력, 정보처리기사, 한국사능력검정 합격을 위한 단계별 취약점 집중 학습을 제공합니다.',
      tags: ['컴활 1·2급', '정보처리기사', '한능검 심화·기본'],
    },
    {
      icon: '📚', title: '교과목 과외',
      desc: '영어·수학·과학·국어 핵심 교과목에서 취약 단원을 집중 보완하는 맞춤 과외 서비스입니다.',
      tags: ['영어', '수학', '과학', '국어'],
    },
    {
      icon: '🤖', title: 'AI 취약점 분석 앱',
      desc: '학습 데이터를 AI로 분석해 취약점 리포트·맞춤 루틴·집중 문제를 자동 제공하는 앱입니다.',
      tags: ['취약점 분석', '맞춤 루틴', '집중 문제'],
    },
  ]

  return (
    <div className="mx-auto max-w-container section-x">
      <div className="mb-12 text-center">
        <span className="badge mb-3">서비스 소개</span>
        <h3 className="text-3xl font-extrabold text-brand-navy dark:text-white">에듀포커스 핵심 서비스</h3>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {services.map((s) => (
          <div key={s.title} className="card p-8">
            <div className="text-4xl mb-4">{s.icon}</div>
            <h4 className="mb-3 text-xl font-bold text-brand-navy dark:text-white">{s.title}</h4>
            <p className="mb-5 text-sm leading-7 text-neutral-600 dark:text-neutral-400">{s.desc}</p>
            <div className="flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <span key={t} className="badge text-xs">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function History() {
  const milestones = [
    { year: '2026', event: 'AI 학습앱 v2.0 출시 — 취약점 리포트 고도화' },
    { year: '2025', event: 'DELF C1·C2 과정 및 정보처리기사 집중 과정 런칭' },
    { year: '2024', event: 'AI 기반 취약점 분석 엔진 자체 개발 · 특허 출원' },
    { year: '2023', event: '에듀포커스 설립 · IELTS·컴활·한능검 서비스 시작' },
  ]

  return (
    <div className="mx-auto max-w-container section-x">
      <div className="mb-12 text-center">
        <span className="badge mb-3">연혁</span>
        <h3 className="text-3xl font-extrabold text-brand-navy dark:text-white">에듀포커스의 발자취</h3>
      </div>
      <div className="relative border-l-2 border-brand-royal/30 dark:border-brand-sky/30 pl-10 space-y-10">
        {milestones.map((m) => (
          <div key={m.year} className="relative">
            <div className="absolute -left-[2.85rem] flex h-8 w-8 items-center justify-center rounded-full
                            bg-brand-royal dark:bg-brand-sky text-white dark:text-gray-950
                            text-xs font-bold shadow">
              {m.year.slice(2)}
            </div>
            <p className="text-sm font-bold text-brand-royal dark:text-brand-sky mb-1">{m.year}</p>
            <p className="text-neutral-700 dark:text-neutral-300">{m.event}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function About() {
  const { tab } = useParams()
  const content = { greeting: <Greeting />, services: <Services />, history: <History /> }
  const current = content[tab] ?? <Greeting />

  return (
    <SubPageLayout sectionTitle="회사소개" tabs={tabs} headLabel="About">
      {current}
    </SubPageLayout>
  )
}
