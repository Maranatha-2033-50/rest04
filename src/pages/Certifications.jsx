import { useParams } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import { certificationPages } from '../data/site'

const tabs = [
  { label: '컴퓨터활용능력', to: '/certifications/computer' },
  { label: '정보처리기사', to: '/certifications/it' },
  { label: '한국사능력검정', to: '/certifications/history' },
]

function GradeCards({ grades }) {
  return (
    <div className="flex flex-wrap gap-3">
      {grades.map((g) => (
        <span key={g}
          className="rounded-xl border border-brand-royal/20 dark:border-brand-sky/20
                     bg-brand-light dark:bg-brand-navy/20
                     text-brand-royal dark:text-brand-sky
                     px-5 py-2.5 text-sm font-semibold">
          {g}
        </span>
      ))}
    </div>
  )
}

function CertContent({ data }) {
  return (
    <div className="mx-auto max-w-container section-x">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* 좌측 */}
        <div>
          <span className="badge mb-4">{data.subtitle}</span>
          <h3 className="mb-4 text-2xl font-extrabold text-brand-navy dark:text-white">
            {data.title} 취약점 집중 학습
          </h3>
          <p className="mb-8 leading-8 text-neutral-600 dark:text-neutral-400">{data.desc}</p>

          <div className="card p-6 mb-6">
            <p className="mb-4 text-sm font-bold text-brand-royal dark:text-brand-sky uppercase tracking-wide">
              과정 구성
            </p>
            <GradeCards grades={data.grades} />
          </div>

          <div className="card p-6">
            <p className="mb-4 text-sm font-bold text-brand-royal dark:text-brand-sky uppercase tracking-wide">
              집중 학습 과정
            </p>
            <ul className="space-y-3">
              {[
                'AI 취약 영역 진단 테스트',
                '과목/단원별 취약점 분석 리포트',
                '취약 단원 집중 개념 정리',
                '기출 유형 반복 풀이 루틴',
                '최신 기출 모의고사 및 피드백',
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

        {/* 우측 */}
        <div>
          <div className="card p-8 mb-6">
            <p className="mb-4 text-sm font-bold text-brand-royal dark:text-brand-sky uppercase tracking-wide">
              이런 분께 추천드립니다
            </p>
            <ul className="space-y-3">
              {[
                `${data.title} 첫 도전으로 어디서 시작해야 할지 모르는 분`,
                '기출을 여러 번 풀었지만 점수가 오르지 않는 분',
                '특정 과목/단원에서 반복적으로 실수하는 분',
                '단기간에 합격 점수를 달성해야 하는 분',
              ].map((t, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-amber" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-brand-navy to-brand-royal
                          dark:from-gray-900 dark:to-brand-navy p-8 text-white">
            <p className="mb-2 text-xs font-semibold tracking-widest text-brand-sky/80 uppercase">AI 취약점 분석</p>
            <p className="mb-4 text-xl font-bold">
              AI가 {data.title}<br />취약 단원을 찾아드립니다
            </p>
            <p className="mb-6 text-sm text-white/70 leading-relaxed">
              수백 문항 데이터를 분석해 내가 틀리는 유형·단원을 자동으로 파악하고
              집중 학습 루틴을 설계합니다.
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

export default function Certifications() {
  const { tab } = useParams()
  const data = certificationPages[tab] ?? certificationPages['computer']

  return (
    <SubPageLayout sectionTitle="자격증" tabs={tabs} headLabel={data.headLabel}>
      <CertContent data={data} />
    </SubPageLayout>
  )
}
