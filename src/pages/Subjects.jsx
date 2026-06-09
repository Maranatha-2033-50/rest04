import { useParams } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import { subjectsPages, subjectFeatures } from '../data/site'

const tabs = [
  { label: '영어', to: '/subjects/english' },
  { label: '수학', to: '/subjects/math' },
  { label: '과학', to: '/subjects/science' },
  { label: '국어', to: '/subjects/korean' },
]

function SubjectContent({ data }) {
  return (
    <div className="mx-auto max-w-container section-x">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* 좌측 */}
        <div>
          <span className="badge mb-4">교과목 과외</span>
          <h3 className="mb-4 text-2xl font-extrabold text-brand-navy dark:text-white">
            {data.title} 취약 단원 집중 과외
          </h3>
          <p className="mb-8 leading-8 text-neutral-600 dark:text-neutral-400">{data.desc}</p>

          <div className="card p-6 mb-6">
            <p className="mb-4 text-sm font-bold text-brand-royal dark:text-brand-sky uppercase tracking-wide">
              주요 학습 단원
            </p>
            <div className="flex flex-wrap gap-2">
              {data.topics.map((t) => (
                <span key={t} className="badge">{t}</span>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <p className="mb-4 text-sm font-bold text-brand-royal dark:text-brand-sky uppercase tracking-wide">
              취약 단원 집중 과외 과정
            </p>
            <ul className="space-y-3">
              {data.learningSteps.map((s, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full
                                   bg-brand-royal dark:bg-brand-sky text-white dark:text-gray-950
                                   text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 우측 */}
        <div>
          <div className="card p-8 mb-6">
            <p className="mb-4 text-sm font-bold text-brand-royal dark:text-brand-sky uppercase tracking-wide">
              과외 특징
            </p>
            <ul className="space-y-4">
              {subjectFeatures.map((f) => (
                <li key={f.title} className="flex items-start gap-4">
                  <span className="text-2xl">{f.icon}</span>
                  <div>
                    <p className="font-semibold text-neutral-800 dark:text-neutral-200">{f.title}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{f.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-brand-navy to-brand-royal
                          dark:from-gray-900 dark:to-brand-navy p-8 text-white">
            <p className="mb-2 text-xs font-semibold tracking-widest text-brand-sky/80 uppercase">AI 취약점 분석</p>
            <p className="mb-4 text-xl font-bold">AI 앱으로 {data.title}<br />취약 단원을 먼저 확인하세요</p>
            <p className="mb-6 text-sm text-white/70 leading-relaxed">
              과외 시작 전 AI 진단으로 취약 단원을 파악하면 더 효율적인 학습이 가능합니다.
            </p>
            <a href="/ai-app"
              className="inline-flex items-center gap-2 rounded-full bg-white/20
                         hover:bg-white/30 transition px-5 py-2.5 text-sm font-semibold">
              무료 진단 시작 →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Subjects() {
  const { tab } = useParams()
  const data = subjectsPages[tab] ?? subjectsPages['english']

  return (
    <SubPageLayout sectionTitle="교과목 과외" tabs={tabs} headLabel={data.headLabel}>
      <SubjectContent data={data} />
    </SubPageLayout>
  )
}
