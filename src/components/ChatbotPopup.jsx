import { useState, useRef, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useLang } from '../context/LanguageContext'

// 에듀포커스 AI 상담 챗봇 — 우측 하단 플로팅 위젯.
// 하이브리드 흐름: ① FAQ 가이드(로컬·무비용) → ② AI 실시간 상담(Edge Function 경유).
const ui = {
  title: { ko: 'AI 학습 컨설턴트', en: 'AI Learning Consultant' },
  subtitle: { ko: '에듀포커스 · 온라인 상담', en: 'EDUFOCUS · Online' },
  fabLabel: { ko: 'AI 학습 컨설턴트와 맞춤형 상담', en: 'Chat with our AI consultant' },
  greeting: {
    ko: '안녕하세요! 에듀포커스 AI 학습 컨설턴트입니다 😊\n아래 자주 묻는 질문에서 바로 답을 확인하거나, 실시간 AI 상담을 시작해 보세요.',
    en: "Hi! I'm the EDUFOCUS AI learning consultant 😊\nPick a question below for an instant answer, or start a live AI chat.",
  },
  faqHeading: { ko: '💡 자주 묻는 질문', en: '💡 Frequently asked' },
  guidePlaceholder: {
    ko: '먼저 자주 묻는 질문을 선택해 주세요',
    en: 'Pick a frequently asked question first',
  },
  placeholder: { ko: '메시지를 입력하세요...', en: 'Type a message...' },
  typing: { ko: 'AI 컨설턴트가 답변을 입력 중입니다...', en: 'AI consultant is typing...' },
  aiCta: { ko: '✨ AI와 실시간 상담하기', en: '✨ Start live AI chat' },
  aiSwitch: {
    ko: '실시간 AI 상담 모드로 전환되었습니다. 궁금하신 점을 자유롭게 입력해 주세요 😊',
    en: 'Switched to live AI chat. Feel free to type your question 😊',
  },
  open: { ko: 'AI 상담 챗봇 열기', en: 'Open AI chatbot' },
  close: { ko: '챗봇 닫기', en: 'Close chatbot' },
  send: { ko: '전송', en: 'Send' },
  error: {
    ko: '죄송합니다, 일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요.',
    en: 'Sorry, something went wrong. Please try again in a moment.',
  },
}

// 시나리오형 FAQ — 클릭 시 Edge Function 호출 없이 로컬에서 즉시 답변(비용 0).
const FAQ_DATA = [
  {
    id: 'solution',
    q: { ko: '에듀포커스 교육 솔루션은 무엇인가요?', en: 'What is the EDUFOCUS solution?' },
    a: {
      ko: '에듀포커스는 AI 기반 취약점 분석으로 학습자 개인의 약점을 정밀 진단하고, 최단 경로로 목표 점수에 도달하는 집중 학습 루틴을 제공합니다. 어학(IELTS·DELF), 자격증(컴활·정보처리기사·한국사능력검정), 교과목 과외(영어·수학·과학·국어), 그리고 AI 학습앱까지 한 곳에서 지원합니다.',
      en: 'EDUFOCUS uses AI-powered weak-point analysis to precisely diagnose each learner\'s gaps and build a focused study routine that reaches your target score by the shortest path. We cover languages (IELTS·DELF), certifications (Computer Applications·IT Engineer·Korean History), subject tutoring (English·Math·Science·Korean), and our AI learning app — all in one place.',
    },
  },
  {
    id: 'apply',
    q: { ko: '맞춤형 컨설턴트 프로그램 신청 방법', en: 'How to apply for the consultant program' },
    a: {
      ko: "상단 메뉴의 'AI 학습앱'에서 무료 취약점 진단을 시작하거나, 회원가입 후 마이페이지에서 맞춤형 컨설턴트 프로그램을 신청하실 수 있습니다. 진단 결과를 바탕으로 1:1 맞춤 학습 루틴을 설계해 드립니다. 더 자세한 안내가 필요하시면 아래 실시간 AI 상담을 통해 바로 도와드릴게요!",
      en: "Start a free weak-point diagnosis from the 'AI Learning App' menu, or sign up and apply for the personalized consultant program from My Page. We'll design a 1:1 study routine based on your results. Need more help? Start a live AI chat below!",
    },
  },
  {
    id: 'process',
    q: { ko: '상담 진행 절차와 비용 안내', en: 'Consultation process & pricing' },
    a: {
      ko: '상담은 ① 무료 AI 취약점 진단 → ② 영역별 분석 리포트 제공 → ③ 1:1 컨설팅으로 맞춤 학습 루틴 설계 순으로 진행됩니다. 비용은 과정·기간에 따라 달라지므로, 정확한 금액은 고객센터 또는 아래 실시간 AI 상담을 통해 안내받으실 수 있습니다.',
      en: 'The process is: ① free AI weak-point diagnosis → ② a skill-by-skill analysis report → ③ a 1:1 consultation to design your study routine. Pricing depends on the program and duration — for an exact quote, please reach our support center or start a live AI chat below.',
    },
  },
]

export default function ChatbotPopup() {
  const { lang } = useLang()
  const tt = (obj) => obj[lang] ?? obj.ko

  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false) // 슬라이드업/페이드인 전환용
  const [mode, setMode] = useState('faq') // 'faq' | 'ai'
  const [faqAnswered, setFaqAnswered] = useState(false)
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
  }, [messages, loading, mode, faqAnswered])

  useEffect(() => {
    if (open && mounted && mode === 'ai') inputRef.current?.focus()
  }, [open, mounted, mode])

  // FAQ 칩 클릭 — 백엔드 호출 없이 로컬 정적 데이터로 즉시 답변 렌더링.
  function handleFaq(faq) {
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: tt(faq.q) },
      { role: 'assistant', content: tt(faq.a) },
    ])
    setFaqAnswered(true)
  }

  // FAQ → AI 실시간 상담 모드 전환. 이후 입력은 Edge Function 으로 라우팅.
  function startAiMode() {
    setMode('ai')
    setMessages((prev) => [...prev, { role: 'assistant', content: tt(ui.aiSwitch) }])
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

            {/* FAQ 칩 — FAQ 모드에서만 노출, 클릭 시 로컬 답변(무비용) */}
            {!aiMode && (
              <div className="pt-1">
                <p className="mb-2 px-1 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                  {tt(ui.faqHeading)}
                </p>
                <div className="grid gap-2">
                  {FAQ_DATA.map((faq) => (
                    <button
                      key={faq.id}
                      type="button"
                      onClick={() => handleFaq(faq)}
                      className="rounded-xl border border-brand-royal/30 dark:border-brand-sky/30 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-left text-sm font-medium text-brand-royal dark:text-brand-sky transition-colors hover:bg-brand-light dark:hover:bg-gray-700"
                    >
                      {tt(faq.q)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI 전환 CTA — FAQ 답변을 본 뒤 동적 노출 */}
          {!aiMode && faqAnswered && (
            <div className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 pt-3">
              <button
                type="button"
                onClick={startAiMode}
                className="w-full rounded-xl bg-gradient-to-r from-brand-royal to-brand-sky px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:brightness-110"
              >
                {tt(ui.aiCta)}
              </button>
            </div>
          )}

          {/* 입력창 — AI 모드에서만 활성화 */}
          <div className="flex items-end gap-2 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-3">
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              disabled={!aiMode}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={aiMode ? tt(ui.placeholder) : tt(ui.guidePlaceholder)}
              className="max-h-24 flex-1 resize-none rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3.5 py-2.5 text-sm text-neutral-800 dark:text-neutral-100 placeholder:text-neutral-400 focus:border-brand-royal focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-800/50 dark:focus:border-brand-sky"
            />
            <button
              type="button"
              aria-label={tt(ui.send)}
              onClick={sendMessage}
              disabled={!aiMode || loading || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-royal text-white transition hover:bg-brand-navy disabled:cursor-not-allowed disabled:opacity-40 dark:hover:bg-brand-sky"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z" />
              </svg>
            </button>
          </div>
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
