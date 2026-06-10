import { useParams } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import { certificationPages } from '../data/site'
import { useLang } from '../context/LanguageContext'

const tabs = [
  { label: { ko: '컴퓨터활용능력', en: 'Computer Applications' }, to: '/certifications/computer' },
  { label: { ko: '정보처리기사', en: 'IT Engineer' }, to: '/certifications/it' },
  { label: { ko: '한국사능력검정', en: 'Korean History' }, to: '/certifications/history' },
]

function GradeCards({ grades }) {
  const { t } = useLang()
  return (
    <div className="flex flex-wrap gap-3">
      {grades.map((g, i) => (
        <span key={i}
          className="rounded-xl border border-brand-royal/20 dark:border-brand-sky/20
                     bg-brand-light dark:bg-brand-navy/20
                     text-brand-royal dark:text-brand-sky
                     px-5 py-2.5 text-sm font-semibold">
          {t(g)}
        </span>
      ))}
    </div>
  )
}

function CertContent({ data }) {
  const { t, lang } = useLang()

  return (
    <div className="mx-auto max-w-container section-x">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* 좌측 */}
        <div>
          <span className="badge mb-4">{t(data.subtitle)}</span>
          <h3 className="mb-4 text-2xl font-extrabold text-brand-navy dark:text-white">
            {t(data.title)} {lang === 'ko' ? '취약점 집중 학습' : 'Intensive Weak-Point Training'}
          </h3>
          <p className="mb-8 leading-8 text-neutral-600 dark:text-neutral-400">{t(data.desc)}</p>

          <div className="card p-6 mb-6">
            <p className="mb-4 text-sm font-bold text-brand-royal dark:text-brand-sky uppercase tracking-wide">
              {lang === 'ko' ? '과정 구성' : 'Course Structure'}
            </p>
            <GradeCards grades={data.grades} />
          </div>

          <div className="card p-6">
            <p className="mb-4 text-sm font-bold text-brand-royal dark:text-brand-sky uppercase tracking-wide">
              {lang === 'ko' ? '집중 학습 과정' : 'Intensive Study Process'}
            </p>
            <ul className="space-y-3">
              {data.learningSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full
                                   bg-brand-royal dark:bg-brand-sky text-white dark:text-gray-950
                                   text-xs font-bold mt-0.5">
                    {i + 1}
                  </span>
                  {t(step)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 우측 */}
        <div>
          <div className="card p-8 mb-6">
            <p className="mb-4 text-sm font-bold text-brand-royal dark:text-brand-sky uppercase tracking-wide">
              {lang === 'ko' ? '이런 분께 추천드립니다' : 'Recommended For'}
            </p>
            <ul className="space-y-3">
              {data.targetAudience.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-700 dark:text-neutral-300">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-amber" />
                  {t(item)}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-brand-navy to-brand-royal
                          dark:from-gray-900 dark:to-brand-navy p-8 text-white">
            <p className="mb-2 text-xs font-semibold tracking-widest text-brand-sky/80 uppercase">
              {lang === 'ko' ? 'AI 취약점 분석' : 'AI Weak-Point Analysis'}
            </p>
            <p className="mb-4 text-xl font-bold">
              {lang === 'ko'
                ? `AI가 ${t(data.title)}\n취약 단원을 찾아드립니다`
                : `AI pinpoints your weak\n${t(data.title)} units`}
            </p>
            <p className="mb-6 text-sm text-white/70 leading-relaxed">
              {lang === 'ko'
                ? '수백 문항 데이터를 분석해 내가 틀리는 유형·단원을 자동으로 파악하고 집중 학습 루틴을 설계합니다.'
                : 'Analyzes hundreds of practice items to identify your weak types and units, then designs your focused study routine.'}
            </p>
            <a href="/ai-app"
              className="inline-flex items-center gap-2 rounded-full bg-white/20
                         hover:bg-white/30 transition px-5 py-2.5 text-sm font-semibold">
              {lang === 'ko' ? 'AI 앱 자세히 보기 →' : 'Learn About the AI App →'}
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
    <SubPageLayout
      sectionTitle={{ ko: '자격증', en: 'Certifications' }}
      tabs={tabs}
      headLabel={data.headLabel}
    >
      <CertContent data={data} />
    </SubPageLayout>
  )
}
