import { useParams } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import { languagesPages } from '../data/site'

const tabs = [
  { label: 'IELTS', to: '/languages/ielts' },
  { label: 'DELF A1·A2', to: '/languages/delf-a' },
  { label: 'DELF B1·B2', to: '/languages/delf-b' },
  { label: 'DELF C1·C2', to: '/languages/delf-c' },
]

function SkillSection({ sections }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {sections.map((s) => (
        <div key={s}
          className="card p-5 text-center hover:border-brand-royal dark:hover:border-brand-sky transition-colors">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full
                          bg-brand-royal/10 dark:bg-brand-sky/10 mx-auto">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2"
              className="text-brand-royal dark:text-brand-sky">
              <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">{s}</p>
        </div>
      ))}
    </div>
  )
}

function ExamInfo({ data }) {
  return (
    <div className="mx-auto max-w-container section-x">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* 좌측: 시험 소개 */}
        <div>
          <span className="badge mb-4">{data.level}</span>
          <h3 className="mb-4 text-2xl font-extrabold text-brand-navy dark:text-white">
            {data.title} 취약점 집중 학습
          </h3>
          <p className="mb-8 leading-8 text-neutral-600 dark:text-neutral-400">{data.desc}</p>

          <div className="card p-6 mb-6">
            <p className="mb-3 text-sm font-bold text-brand-royal dark:text-brand-sky uppercase tracking-wide">
              목표 점수
            </p>
            <p className="text-2xl font-extrabold text-brand-navy dark:text-white">{data.targetScore}</p>
          </div>

          <div className="card p-6">
            <p className="mb-4 text-sm font-bold text-brand-royal dark:text-brand-sky uppercase tracking-wide">
              에듀포커스 학습 과정
            </p>
            <ul className="space-y-3">
              {[
                'AI 취약점 진단 테스트',
                '영역별 취약 유형 분석 리포트 제공',
                '맞춤 집중 학습 루틴 설계',
                '취약점 집중 문제 반복 훈련',
                '정기 모의시험 및 진도 점검',
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full
                                   bg-brand-royal dark:bg-brand-sky text-white dark:text-gray-950
                                   text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 우측: 평가 영역 */}
        <div>
          <p className="mb-6 text-sm font-bold text-brand-royal dark:text-brand-sky uppercase tracking-wide">
            평가 영역
          </p>
          <SkillSection sections={data.sections} />

          {/* AI 앱 연계 */}
          <div className="mt-8 rounded-2xl bg-gradient-to-br from-brand-navy to-brand-royal
                          dark:from-gray-900 dark:to-brand-navy p-8 text-white">
            <p className="mb-2 text-xs font-semibold tracking-widest text-brand-sky/80 uppercase">
              AI 취약점 분석
            </p>
            <p className="mb-4 text-xl font-bold">
              에듀포커스 AI 앱으로<br />나만의 루틴을 만드세요
            </p>
            <p className="mb-6 text-sm text-white/70 leading-relaxed">
              AI가 {data.title} 각 영역의 취약점을 자동 분석하고 집중 학습 문제를 제공합니다.
            </p>
            <a href="/ai-app"
              className="inline-flex items-center gap-2 rounded-full bg-white/20
                         hover:bg-white/30 transition px-5 py-2.5 text-sm font-semibold">
              AI 앱 자세히 보기 →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Languages() {
  const { tab } = useParams()
  const data = languagesPages[tab] ?? languagesPages['ielts']

  return (
    <SubPageLayout sectionTitle="어학" tabs={tabs} headLabel={data.headLabel}>
      <ExamInfo data={data} />
    </SubPageLayout>
  )
}
