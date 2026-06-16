import { useState, useRef, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useLang } from '../context/LanguageContext'

// 에듀포커스 AI 상담 챗봇 — 프리미엄 관리형 ARS 퍼널.
// ① 4단계 FAQ 트리(드롭다운·무비용) → ② AI 실시간 상담(로그인 게이트) / 전문가 1:1 무료 상담(상담 신청 페이지 연동).
const ui = {
  title: { ko: 'AI 학습 컨설턴트', en: 'AI Learning Consultant' },
  subtitle: { ko: '에듀포커스 · 프리미엄 상담', en: 'EDUFOCUS · Premium' },
  fabLabel: { ko: 'AI 학습 컨설턴트와 맞춤형 상담', en: 'Chat with our AI consultant' },
  greeting: {
    ko: '안녕하세요, 에듀포커스 수석 학습 컨설턴트입니다 😊\n아래 메뉴에서 관심 분야를 선택해 주시면, 단계별로 가장 정확한 솔루션을 안내해 드리겠습니다.',
    en: "Hello, I'm the EDUFOCUS lead learning consultant 😊\nSelect your area of interest below and I'll guide you, step by step, to the most precise solution.",
  },
  selectMenu: { ko: '📋 메뉴를 선택해 주세요', en: '📋 Choose a menu' },
  selectFinal: { ko: '✨ 다음 단계를 선택해 주세요', en: '✨ Choose your next step' },
  freeConsult: {
    ko: '성함과 연락처, 문의사항을 남겨주시면 24시간 내로 연락 드리겠습니다.',
    en: 'Leave your name, contact, and question, and our team will reach out within 24 hours.',
  },
  consultCta: { ko: '📋 무료 상담 신청 페이지로 이동', en: '📋 Go to the consultation form' },
  placeholder: { ko: '메시지를 입력하세요...', en: 'Type a message...' },
  typing: { ko: 'AI 컨설턴트가 답변을 입력 중입니다...', en: 'AI consultant is typing...' },
  aiSwitch: {
    ko: '실시간 AI 상담 모드로 전환되었습니다. 궁금하신 점을 자유롭게 입력해 주세요 😊',
    en: 'Switched to live AI chat. Feel free to type your question 😊',
  },
  bannerTitle: { ko: '진행하기 위해서 로그인하고 무료상담하기', en: 'Log in to continue and get a free consultation' },
  bannerSub: {
    ko: '로그인하시면 AI 실시간 상담을 무료로 이용하실 수 있어요.',
    en: 'Log in to use the live AI consultation for free.',
  },
  googleLogin: { ko: '구글로 로그인', en: 'Sign in with Google' },
  kakaoLogin: { ko: '카카오로 로그인', en: 'Sign in with Kakao' },
  open: { ko: 'AI 상담 챗봇 열기', en: 'Open AI chatbot' },
  close: { ko: '챗봇 닫기', en: 'Close chatbot' },
  send: { ko: '전송', en: 'Send' },
  error: {
    ko: '죄송합니다, 일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요.',
    en: 'Sorry, something went wrong. Please try again in a moment.',
  },
}

// 최종 전환 노드 — 모든 여정의 끝단에 결합되는 두 가지 액션.
const FINAL_ACTIONS = [
  { id: 'ai', action: 'ai', label: { ko: '✨ AI와 실시간 상담하기', en: '✨ Start live AI chat' } },
  { id: 'free', action: 'free', label: { ko: '📞 전문가와 1:1 무료 상담 신청', en: '📞 Request a 1:1 free expert consultation' } },
]

// 내비게이션 특수 옵션 — 드롭다운 최하단에 상태에 따라 결합.
const BACK_OPTION = { id: '__back', action: 'back', label: { ko: '↩ 이전 단계로 돌아가기', en: '↩ Go back to the previous step' } }
const RESTART_OPTION = { id: '__restart', action: 'restart', label: { ko: '🔄 처음부터 다시 물어보기', en: '🔄 Start over from the beginning' } }

// 3단계 공통 해결 질문 — 모든 세부 트랙에서 동일하게 분기되는 핵심 질문 2종.
const COMMON_QUESTIONS = [
  {
    id: 'SYS',
    label: {
      ko: '여타 인강과 다른 에듀포커스 AI 시스템(오답 지우개·플래너)의 관리 방식은?',
      en: 'How does the EDUFOCUS AI system (wrong-answer eraser · planner) manage learning differently from typical online lectures?',
    },
    answer: {
      ko: '에듀포커스 AI 시스템은 일방향 인강과 근본적으로 다릅니다. ‘오답 지우개’가 틀린 문항의 취약 유형을 자동 분류하고, AI 플래너가 목표일까지 최단 경로의 개인별 학습 플랜을 설계하고 매일 갱신합니다. 망각 곡선 기반 복습 알림과 주간 성취도 리포트로, 학습이 방치되지 않고 끝까지 밀착 관리되는 경험을 제공합니다.',
      en: 'Unlike one-way video lectures, the EDUFOCUS AI system auto-classifies your weak question types with the “wrong-answer eraser,” while the AI planner designs and updates a personalized study plan along the shortest path to your goal date. Forgetting-curve review reminders and weekly progress reports ensure your learning is managed closely, end to end.',
    },
  },
  {
    id: 'PRC',
    label: {
      ko: '1:1 밀착 매니징 컨설팅 프로그램의 구체적인 비용과 절차는?',
      en: 'What are the exact cost and process of the 1:1 managed consulting program?',
    },
    answer: {
      ko: '1:1 밀착 매니징 컨설팅은 ① 무료 취약점 진단 → ② 전담 컨설턴트의 영역별 분석 리포트 → ③ 목표·기간 맞춤 학습 플랜 설계 → ④ 주간 점검 및 리포트의 순서로 진행됩니다. 수강료는 과정·기간·관리 범위에 따라 차등 책정되며, 정확한 견적은 무료 상담을 통해 1:1로 정밀하게 안내해 드립니다.',
      en: 'The 1:1 managed consulting runs as: ① free weak-point diagnosis → ② a dedicated consultant’s skill-by-skill report → ③ a goal/timeline-tailored study plan → ④ weekly check-ins and reports. Tuition varies by program, duration, and management scope; we provide an exact 1:1 quote during your free consultation.',
    },
  },
]

// 정제된 4단계 마스터 FAQ 트리: 1) 고객 분류 → 2) 세부 트랙 → 3) 공통 질문 → 4) 핵심 답변.
// 세부 트랙(Depth 2) 노드의 intent 는 무료 상담 페이지(/#/consultation?intent=...) 도메인 값과 매핑된다.
const FAQ_TREE = [
  {
    id: 'academic',
    label: { ko: '🏫 1등급·글로벌 명문대 — 내신·수능 및 국내외 교과', en: '🏫 Top grades & elite universities — school & CSAT prep' },
    children: [
      { id: 'KS', intent: 'domestic', label: { ko: '대한민국 내신·수능 압도적 1등급 로드맵', en: 'Korea school & CSAT — top-grade roadmap' }, children: COMMON_QUESTIONS },
      { id: 'UK', intent: 'a-level', label: { ko: '영국 A-Level 의대·명문대 타겟 트랙', en: 'UK A-Level — med/elite university track' }, children: COMMON_QUESTIONS },
      { id: 'CA', intent: 'ontario', label: { ko: '캐나다 온타리오(ON) 주립대 합격 트랙', en: 'Canada Ontario (ON) — provincial university track' }, children: COMMON_QUESTIONS },
    ],
  },
  {
    id: 'global-language',
    label: { ko: '🇬🇧 유학·이민·취업 — 글로벌 어학(IELTS) 마스터', en: '🇬🇧 Study abroad·immigration·career — global English (IELTS)' },
    children: [
      { id: 'IE_1', intent: 'ielts-general', label: { ko: 'IELTS 이민·교환학생 목표 트랙', en: 'IELTS — immigration & exchange track' }, children: COMMON_QUESTIONS },
      { id: 'IE_2', intent: 'ielts-review', label: { ko: 'IELTS Writing & Speaking 정밀 첨삭 트랙', en: 'IELTS Writing & Speaking precision review track' }, children: COMMON_QUESTIONS },
    ],
  },
  {
    id: 'credentials',
    label: { ko: '💼 초고속 스펙 업그레이드 — 국가 핵심 IT/공기업 자격증', en: '💼 Fast-track credentials — key national IT & public-sector certifications' },
    children: [
      { id: 'IT', intent: 'it-cert', label: { ko: '취업 프리패스 자격증 (컴활 1급·정보처리기사)', en: 'Career fast-pass certs (Computer Apps L1 · IT Engineer)' }, children: COMMON_QUESTIONS },
      { id: 'HS', intent: 'korean-history', label: { ko: '공기업·대기업 목표 (한국사능력검정시험)', en: 'Public/large-enterprise goal (Korean History test)' }, children: COMMON_QUESTIONS },
    ],
  },
]

const CONSULT_BASE = `${import.meta.env.BASE_URL}#/consultation`

export default function ChatbotPopup() {
  const { lang } = useLang()
  const tt = (obj) => obj[lang] ?? obj.ko

  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false) // 슬라이드업/페이드인 전환용
  const [mode, setMode] = useState('faq') // 'faq' | 'auth' | 'ai'
  const [options, setOptions] = useState(FAQ_TREE) // 현재 드롭다운 선택지
  const [history, setHistory] = useState([]) // 역방향 내비게이션 스냅샷 스택
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [selectedIntent, setSelectedIntent] = useState('') // 선택한 도메인(상담 페이지 연동용)
  const [consultHref, setConsultHref] = useState(null) // 무료 상담 CTA 링크
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([{ role: 'assistant', content: tt(ui.greeting) }])

  const scrollRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setMounted(true))
      return () => cancelAnimationFrame(id)
    }
    setMounted(false)
  }, [open])

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight
  }, [messages, loading, mode, consultHref])

  useEffect(() => {
    if (open && mounted && mode === 'ai') inputRef.current?.focus()
  }, [open, mounted, mode])

  const isFinal = options === FINAL_ACTIONS

  // 드롭다운 선택 — 선택 시에만 대화가 누적된다.
  function selectOption(opt) {
    setDropdownOpen(false)

    // 이전 단계로 롤백 — 직전 depth의 옵션과 대화 상태를 복원.
    if (opt.action === 'back') {
      const snap = history[history.length - 1]
      if (snap) {
        setOptions(snap.options)
        setMessages((prev) => prev.slice(0, snap.messageCount))
        setHistory((prev) => prev.slice(0, -1))
        setConsultHref(null)
        setDropdownOpen(true)
      }
      return
    }
    // 처음부터 다시 — 1단계 카테고리 상태로 완전 초기화.
    if (opt.action === 'restart') {
      setMode('faq')
      setOptions(FAQ_TREE)
      setHistory([])
      setSelectedIntent('')
      setConsultHref(null)
      setMessages([{ role: 'assistant', content: tt(ui.greeting) }])
      return
    }
    if (opt.action === 'ai') {
      enterAiConsult(opt)
      return
    }
    if (opt.action === 'free') {
      // 확신 메시지 출력 + 도메인 intent 를 실은 상담 페이지 CTA 동적 생성.
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: tt(opt.label) },
        { role: 'assistant', content: tt(ui.freeConsult) },
      ])
      setConsultHref(selectedIntent ? `${CONSULT_BASE}?intent=${selectedIntent}` : CONSULT_BASE)
      setOptions(FINAL_ACTIONS)
      return
    }

    if (opt.answer) {
      // 리프 노드 = 여정의 최종 단계 → 답변 출력 후 최종 액션만 매핑.
      setMessages((prev) => [
        ...prev,
        { role: 'user', content: tt(opt.label) },
        { role: 'assistant', content: tt(opt.answer) },
      ])
      setConsultHref(null)
      setOptions(FINAL_ACTIONS)
    } else {
      // 분기 노드 → 중간 안내 텍스트 없이 곧바로 하위 옵션으로 이어준다.
      if (opt.intent) setSelectedIntent(opt.intent)
      setHistory((prev) => [...prev, { options, messageCount: messages.length }])
      setMessages((prev) => [...prev, { role: 'user', content: tt(opt.label) }])
      setOptions(opt.children)
      setDropdownOpen(true)
    }
  }

  // AI 실시간 상담 진입 — 로그인 게이트 작동.
  async function enterAiConsult(opt) {
    setMessages((prev) => [...prev, { role: 'user', content: tt(opt.label) }])
    setConsultHref(null)
    if (!supabase) {
      setMode('auth')
      return
    }
    try {
      const { data } = await supabase.auth.getSession()
      if (data?.session) {
        setMode('ai')
        setMessages((prev) => [...prev, { role: 'assistant', content: tt(ui.aiSwitch) }])
      } else {
        setMode('auth')
      }
    } catch {
      setMode('auth')
    }
  }

  async function handleOAuth(provider) {
    if (!supabase) {
      setMessages((prev) => [...prev, { role: 'assistant', content: tt(ui.error) }])
      return
    }
    try {
      await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: window.location.href },
      })
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: tt(ui.error) }])
    }
  }

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading || mode !== 'ai') return

    const nextMessages = [...messages, { role: 'user', content: text }]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)

    try {
      if (!supabase) throw new Error('Supabase client not configured')
      const { data, error } = await supabase.functions.invoke('edufocus-chat', {
        body: { messages: nextMessages.map((m) => ({ role: m.role, content: m.content })) },
      })
      if (error || !data?.reply) throw error || new Error('No reply')
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: tt(ui.error) }])
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const aiMode = mode === 'ai'

  return (
    <>
      {/* 채팅 패널 — FAB 위에 슬라이드업, 뷰포트 클램프로 좌표 가드 */}
      {open && (
        <div
          role="dialog"
          aria-label={tt(ui.title)}
          className={[
            'fixed bottom-28 right-8 z-50 flex flex-col overflow-hidden',
            'w-[min(380px,calc(100vw-2.5rem))] h-[min(560px,calc(100vh-9rem))]',
            'rounded-2xl border border-gray-100 dark:border-gray-800',
            'bg-white dark:bg-gray-900 shadow-2xl',
            'transition-all duration-300 ease-out',
            mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
          ].join(' ')}
        >
          {/* 헤더 */}
          <div className="flex items-center justify-between gap-3 bg-brand-navy dark:bg-gray-950 px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-sky/20 text-brand-sky">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-white">{tt(ui.title)}</p>
                <p className="text-[11px] text-brand-sky/80">{tt(ui.subtitle)}</p>
              </div>
            </div>
            <button
              type="button"
              aria-label={tt(ui.close)}
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 채팅 스크롤 영역 */}
          <div
            ref={scrollRef}
            className="flex-1 space-y-3 overflow-y-auto bg-brand-light/40 dark:bg-gray-900 px-4 py-4"
          >
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                <div
                  className={[
                    'max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed',
                    m.role === 'user'
                      ? 'bg-brand-royal text-white rounded-br-sm'
                      : 'bg-white dark:bg-gray-800 text-neutral-800 dark:text-neutral-100 border border-gray-100 dark:border-gray-700 rounded-bl-sm',
                  ].join(' ')}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-3">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-royal/70 dark:bg-brand-sky" style={{ animationDelay: '0ms' }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-royal/70 dark:bg-brand-sky" style={{ animationDelay: '150ms' }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-brand-royal/70 dark:bg-brand-sky" style={{ animationDelay: '300ms' }} />
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">{tt(ui.typing)}</span>
                </div>
              </div>
            )}
          </div>

          {/* 푸터: 모드별 렌더 — FAQ 드롭다운 / 로그인 게이트 / AI 입력창 */}
          {mode === 'faq' && (
            <div className="relative border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-3">
              {/* 무료 상담 신청 CTA — free 액션 선택 시 동적 노출 */}
              {consultHref && (
                <a
                  href={consultHref}
                  className="mb-2 block w-full rounded-xl bg-brand-amber px-4 py-2.5 text-center text-sm font-bold text-white shadow-sm transition hover:brightness-110"
                >
                  {tt(ui.consultCta)}
                </a>
              )}

              {/* 펼침 목록 — 위로 오버레이되어 대화를 밀어 올리지 않음 */}
              {dropdownOpen && (
                <div className="absolute bottom-full left-3 right-3 z-20 mb-2 max-h-56 overflow-y-auto rounded-xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 py-1 shadow-xl">
                  {options.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => selectOption(opt)}
                      className="block w-full px-4 py-2.5 text-left text-sm text-neutral-700 dark:text-neutral-200 transition-colors hover:bg-brand-light dark:hover:bg-gray-700"
                    >
                      {tt(opt.label)}
                    </button>
                  ))}

                  {/* 최종 단계: 처음부터 다시 / 중간 단계: 이전 단계로 (연한 스타일로 구분) */}
                  {isFinal ? (
                    <button
                      type="button"
                      onClick={() => selectOption(RESTART_OPTION)}
                      className="mt-1 block w-full border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 px-4 py-2.5 text-left text-sm text-gray-400 dark:text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {tt(RESTART_OPTION.label)}
                    </button>
                  ) : history.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => selectOption(BACK_OPTION)}
                      className="mt-1 block w-full border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/60 px-4 py-2.5 text-left text-sm text-gray-400 dark:text-gray-500 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {tt(BACK_OPTION.label)}
                    </button>
                  ) : null}
                </div>
              )}
              <button
                type="button"
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex w-full items-center justify-between rounded-xl border border-brand-royal/40 dark:border-brand-sky/40 bg-brand-light/60 dark:bg-gray-800 px-4 py-2.5 text-sm font-semibold text-brand-royal dark:text-brand-sky transition-colors hover:bg-brand-light dark:hover:bg-gray-700"
              >
                <span>{isFinal ? tt(ui.selectFinal) : tt(ui.selectMenu)}</span>
                <svg
                  width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                  className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>
          )}

          {mode === 'auth' && (
            <div className="space-y-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-4">
              {/* 프리미엄 마케팅 배너 */}
              <div className="rounded-xl bg-gradient-to-r from-brand-navy to-brand-royal px-4 py-3 text-center">
                <p className="text-sm font-bold text-white">{tt(ui.bannerTitle)}</p>
                <p className="mt-1 text-[11px] text-brand-sky/90">{tt(ui.bannerSub)}</p>
              </div>
              {/* 소셜 로그인 버튼 — 구글 / 카카오 */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => handleOAuth('google')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-600 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition hover:bg-gray-50"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z" />
                  </svg>
                  {tt(ui.googleLogin)}
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuth('kakao')}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FEE500] px-4 py-2.5 text-sm font-semibold text-[#191600] transition hover:brightness-95"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#191600">
                    <path d="M12 3C6.99 3 3 6.2 3 10.13c0 2.52 1.68 4.73 4.2 5.99-.18.64-.66 2.37-.76 2.74-.12.46.17.45.36.33.15-.1 2.36-1.6 3.32-2.26.6.09 1.23.13 1.88.13 5.01 0 9-3.2 9-7.13S17.01 3 12 3z" />
                  </svg>
                  {tt(ui.kakaoLogin)}
                </button>
              </div>
            </div>
          )}

          {mode === 'ai' && (
            <div className="flex items-end gap-2 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-3">
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={tt(ui.placeholder)}
                className="max-h-24 flex-1 resize-none rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 focus:border-brand-royal focus:outline-none dark:focus:border-brand-sky"
              />
              <button
                type="button"
                aria-label={tt(ui.send)}
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-royal text-white transition hover:bg-brand-navy disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-brand-sky"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}

      {/* 플로팅 버튼 (FAB) — 닫힘: 호버 확장 텍스트 배지 Pill / 열림: 원형 닫기 버튼 */}
      {open ? (
        <button
          type="button"
          aria-label={tt(ui.close)}
          onClick={() => setOpen(false)}
          className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-royal text-white shadow-lg transition hover:scale-105 hover:bg-brand-navy dark:bg-brand-sky dark:hover:brightness-110"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      ) : (
        <button
          type="button"
          aria-label={tt(ui.open)}
          onClick={() => setOpen(true)}
          className="group fixed bottom-8 right-8 z-50 flex items-center rounded-full bg-brand-royal text-white shadow-lg transition-all hover:bg-brand-navy dark:bg-brand-sky dark:hover:brightness-110"
        >
          {/* 호버 시 0fr→1fr 그리드 트랜지션으로 부드럽게 확장되는 텍스트 배지 */}
          <span className="grid grid-cols-[0fr] transition-all duration-300 ease-out group-hover:grid-cols-[1fr]">
            <span className="overflow-hidden whitespace-nowrap pl-5 text-sm font-semibold">
              {tt(ui.fabLabel)}
            </span>
          </span>
          <span className="flex h-14 w-14 shrink-0 items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </span>
        </button>
      )}
    </>
  )
}
