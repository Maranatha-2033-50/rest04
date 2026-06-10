import { useParams } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import { subjectsPages, subjectFeatures } from '../data/site'
import { useLang } from '../context/LanguageContext'

const tabs = [
  { label: { ko: '영어', en: 'English' }, to: '/subjects/english' },
  { label: { ko: '수학', en: 'Math' }, to: '/subjects/math' },
  { label: { ko: '과학', en: 'Science' }, to: '/subjects/science' },
  { label: { ko: '국어', en: 'Korean' }, to: '/subjects/korean' },
]

function SubjectContent({ data }) {
  const { t, lang } = useLang()

  return (
    <div className="mx-auto max-w-container section-x">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* 좌측 */}
        <div>
          <span className="badge mb-4">{lang === 'ko' ? '교과목 과외' : 'Subject Tutoring'}</span>
          <h3 className="mb-4 text-2xl font-extrabold text-brand-navy dark:text-white">
            {t(data.title)} {lang === 'ko' ? '취약 단원 집중 과외' : 'Weak-Unit Intensive Tutoring'}
          </h3>
          <p className="mb-8 leading-8 text-neutral-600 dark:text-neutral-400">{t(data.desc)}</p>

          <div className="card p-6 mb-6">
            <p className="mb-4 text-sm font-bold text-brand-royal dark:text-brand-sky uppercase tracking-wide">
              {lang === 'ko' ? '주요 학습 단원' : 'Core Study Topics'}
            </p>
            <div className="flex flex-wrap gap-2">
              {data.topics.map((topic, i) => (
                <span key={i} className="badge">{t(topic)}</span>
              ))}
            </div>
          </div>

          <div className="card p-6">
            <p className="mb-4 text-sm font-bold text-brand-royal dark:text-brand-sky uppercase tracking-wide">
              {lang === 'ko' ? '취약 단원 집중 과외 과정' : 'Weak-Unit Tutoring Process'}
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
              {lang === 'ko' ? '과외 특징' : 'Tutoring Features'}
            </p>
            <ul className="space-y-4">
              {subjectFeatures.map((f, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="text-2xl">{f.icon}</span>
                  <div>
                    <p className="font-semibold text-neutral-800 dark:text-neutral-200">{t(f.title)}</p>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{t(f.desc)}</p>
                  </div>
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
                ? `AI 앱으로 ${t(data.title)}\n취약 단원을 먼저 확인하세요`
                : `Check your ${t(data.title)}\nweak units with the AI app first`}
            </p>
            <p className="mb-6 text-sm text-white/70 leading-relaxed">
              {lang === 'ko'
                ? '과외 시작 전 AI 진단으로 취약 단원을 파악하면 더 효율적인 학습이 가능합니다.'
                : 'Identifying weak units with AI diagnosis before tutoring makes your sessions far more efficient.'}
            </p>
            <a href="/ai-app"
              className="inline-flex items-center gap-2 rounded-full bg-white/20
                         hover:bg-white/30 transition px-5 py-2.5 text-sm font-semibold">
              {lang === 'ko' ? '무료 진단 시작 →' : 'Start Free Diagnosis →'}
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
    <SubPageLayout
      sectionTitle={{ ko: '교과목 과외', en: 'Subjects' }}
      tabs={tabs}
      headLabel={data.headLabel}
    >
      <SubjectContent data={data} />
    </SubPageLayout>
  )
}
