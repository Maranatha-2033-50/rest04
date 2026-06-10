import { useParams } from 'react-router-dom'
import SubPageLayout from '../components/SubPageLayout'
import { company, aboutServices, aboutHistory } from '../data/site'
import { useLang } from '../context/LanguageContext'

const tabs = [
  { label: { ko: '대표 인사말', en: "CEO's Message" }, to: '/about/greeting' },
  { label: { ko: '서비스 소개', en: 'Our Services' }, to: '/about/services' },
  { label: { ko: '연혁', en: 'History' }, to: '/about/history' },
]

function Greeting() {
  const { t, lang } = useLang()

  return (
    <div className="mx-auto max-w-container section-x">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-brand-navy to-brand-royal
                          dark:from-gray-800 dark:to-brand-navy
                          flex items-center justify-center">
            <div className="text-center text-white">
              <div className="text-6xl mb-4">👤</div>
              <p className="text-sm opacity-70">{lang === 'ko' ? '대표 사진' : 'CEO Photo'}</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-3">
          <span className="badge mb-4">{lang === 'ko' ? '대표 인사말' : "CEO's Message"}</span>
          <h3 className="mb-6 text-3xl font-extrabold text-brand-navy dark:text-white">
            {t({ ko: '취약점을 알면,\n합격이 보입니다', en: 'Know Your Weaknesses,\nAchieve Your Goals' })}
          </h3>
          <div className="space-y-5 text-base leading-8 text-neutral-600 dark:text-neutral-400">
            {lang === 'ko' ? (
              <>
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
              </>
            ) : (
              <>
                <p>Thank you for visiting EDUFOCUS.</p>
                <p>
                  Through years of experience in education, I've come to one clear insight:
                  learners don't fail because they lack effort —
                  they fail because they don't know precisely where their weak points lie.
                </p>
                <p>
                  EDUFOCUS uses AI-powered weak-point analysis to identify exactly where each learner
                  struggles, then delivers a personalized study routine to close those gaps with focus.
                </p>
                <p>
                  Whether your goal is IELTS, DELF, Computer Applications, IT Engineering,
                  or Korean History, EDUFOCUS is here to help you pass.
                </p>
              </>
            )}
          </div>
          <div className="mt-10 border-t border-gray-100 dark:border-gray-800 pt-8">
            <p className="font-bold text-brand-navy dark:text-white text-lg">
              {lang === 'ko' ? `${company.nameKo} 대표` : `${company.name} CEO`}
            </p>
            <p className="text-neutral-500 dark:text-neutral-400 mt-1">{company.fullName}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Services() {
  const { t, lang } = useLang()

  return (
    <div className="mx-auto max-w-container section-x">
      <div className="mb-12 text-center">
        <span className="badge mb-3">{lang === 'ko' ? '서비스 소개' : 'Our Services'}</span>
        <h3 className="text-3xl font-extrabold text-brand-navy dark:text-white">
          {t({ ko: '에듀포커스 핵심 서비스', en: 'EDUFOCUS Core Services' })}
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {aboutServices.map((s, i) => (
          <div key={i} className="card p-8">
            <div className="text-4xl mb-4">{s.icon}</div>
            <h4 className="mb-3 text-xl font-bold text-brand-navy dark:text-white">{t(s.title)}</h4>
            <p className="mb-5 text-sm leading-7 text-neutral-600 dark:text-neutral-400">{t(s.desc)}</p>
            <div className="flex flex-wrap gap-2">
              {s.tags.map((tag) => (
                <span key={tag} className="badge text-xs">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function History() {
  const { t, lang } = useLang()

  return (
    <div className="mx-auto max-w-container section-x">
      <div className="mb-12 text-center">
        <span className="badge mb-3">{lang === 'ko' ? '연혁' : 'History'}</span>
        <h3 className="text-3xl font-extrabold text-brand-navy dark:text-white">
          {t({ ko: '에듀포커스의 발자취', en: 'EDUFOCUS Milestones' })}
        </h3>
      </div>
      <div className="relative border-l-2 border-brand-royal/30 dark:border-brand-sky/30 pl-10 space-y-10">
        {aboutHistory.map((m) => (
          <div key={m.year} className="relative">
            <div className="absolute -left-[2.85rem] flex h-8 w-8 items-center justify-center rounded-full
                            bg-brand-royal dark:bg-brand-sky text-white dark:text-gray-950
                            text-xs font-bold shadow">
              {m.year.slice(2)}
            </div>
            <p className="text-sm font-bold text-brand-royal dark:text-brand-sky mb-1">{m.year}</p>
            <p className="text-neutral-700 dark:text-neutral-300">{t(m.event)}</p>
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
    <SubPageLayout
      sectionTitle={{ ko: '회사소개', en: 'About Us' }}
      tabs={tabs}
      headLabel="About"
    >
      {current}
    </SubPageLayout>
  )
}
