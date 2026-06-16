import { useState, useRef, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useLang } from '../context/LanguageContext'

// 에듀포커스 AI 상담 챗봇 — 우측 하단 플로팅 위젯.
// 모든 LLM 호출은 Supabase Edge Function(edufocus-chat) 프록시를 경유한다.
const ui = {
  title: { ko: 'AI 학습 컨설턴트', en: 'AI Learning Consultant' },
  subtitle: { ko: '에듀포커스 · 온라인 상담', en: 'EDUFOCUS · Online' },
  greeting: {
    ko: '안녕하세요! 에듀포커스 AI 학습 컨설턴트입니다. 어학·자격증·교과목 학습이나 AI 취약점 분석에 대해 무엇이든 물어보세요 😊',
    en: "Hi! I'm the EDUFOCUS AI learning consultant. Ask me anything about languages, certifications, subjects, or AI weak-point analysis 😊",
  },
  placeholder: { ko: '메시지를 입력하세요...', en: 'Type a message...' },
  typing: { ko: 'AI 컨설턴트가 답변을 입력 중입니다...', en: 'AI consultant is typing...' },
  open: { ko: 'AI 상담 챗봇 열기', en: 'Open AI chatbot' },
  close: { ko: '챗봇 닫기', en: 'Close chatbot' },
  send: { ko: '전송', en: 'Send' },
  error: {
    ko: '죄송합니다, 일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요.',
    en: 'Sorry, something went wrong. Please try again in a moment.',
  },
}

export default function ChatbotPopup() {
  const { lang } = useLang()
  const tt = (obj) => obj[lang] ?? obj.ko

  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false) // 슬라이드업/페이드인 전환용
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
  }, [messages, loading])

  useEffect(() => {
    if (open && mounted) inputRef.current?.focus()
  }, [open, mounted])

  async function sendMessage() {
    const text = input.trim()
    if (!text || loading) return

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

          {/* 입력창 */}
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
        </div>
      )}

      {/* 플로팅 버튼 (FAB) */}
      <button
        type="button"
        aria-label={open ? tt(ui.close) : tt(ui.open)}
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-8 right-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand-royal text-white shadow-lg transition hover:scale-105 hover:bg-brand-navy dark:bg-brand-sky dark:hover:brightness-110"
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </>
  )
}
