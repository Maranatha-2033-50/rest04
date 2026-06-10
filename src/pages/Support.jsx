import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const INQUIRY_TYPES = [
  { value: '', label: '문의 유형을 선택해주세요' },
  { value: 'languages', label: '어학 문의' },
  { value: 'certifications', label: '자격증 문의' },
  { value: 'subjects', label: '교과목 과외 문의' },
  { value: 'ai-app', label: 'AI 학습앱 문의' },
  { value: 'system', label: '시스템 및 기타 오류' },
]

const INITIAL_FORM = {
  name: '',
  email: '',
  type: '',
  subject: '',
  message: '',
}

function FieldLabel({ htmlFor, required, children }) {
  return (
    <label htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-semibold text-neutral-700 dark:text-neutral-300">
      {children}
      {required && <span className="ml-1 text-brand-amber">*</span>}
    </label>
  )
}

const inputBase =
  'w-full rounded-xl border border-gray-200 dark:border-gray-700 ' +
  'bg-white dark:bg-gray-900 ' +
  'px-4 py-3 text-sm text-neutral-800 dark:text-neutral-200 ' +
  'placeholder:text-neutral-400 dark:placeholder:text-neutral-600 ' +
  'outline-none transition ' +
  'focus:border-brand-royal dark:focus:border-brand-sky ' +
  'focus:ring-2 focus:ring-brand-royal/20 dark:focus:ring-brand-sky/20'

export default function Support() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = '이름을 입력해주세요.'
    if (!form.email.trim()) next.email = '이메일 주소를 입력해주세요.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = '올바른 이메일 형식이 아닙니다.'
    if (!form.type) next.type = '문의 유형을 선택해주세요.'
    if (!form.subject.trim()) next.subject = '제목을 입력해주세요.'
    if (!form.message.trim()) next.message = '문의 내용을 입력해주세요.'
    return next
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setSubmitError(null)
    setSubmitting(true)

    const { error } = await supabase.from('inquiries').insert({
      name: form.name.trim(),
      email: form.email.trim(),
      type: form.type,
      title: form.subject.trim(),
      content: form.message.trim(),
    })

    setSubmitting(false)

    if (error) {
      setSubmitError('문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
      return
    }

    setSubmitted(true)
  }

  return (
    <div>
      {/* 페이지 헤더 */}
      <div className="w-full bg-gradient-to-br from-brand-navy to-brand-royal
                      dark:from-gray-900 dark:to-brand-navy flex items-center justify-center py-16 md:py-24">
        <div className="section-x text-center">
          <p className="text-xs font-semibold tracking-widest text-brand-sky/80 uppercase mb-3">
            SUPPORT
          </p>
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">고객센터</h1>
          <p className="mt-4 text-white/70 text-sm md:text-base">
            문의사항을 남겨주시면 빠르게 답변 드리겠습니다.
          </p>
        </div>
      </div>

      {/* 본문 */}
      <div className="bg-brand-light dark:bg-gray-950 transition-colors py-16 md:py-24 min-h-[60vh]">
        <div className="mx-auto max-w-2xl section-x">

          {submitted ? (
            /* 제출 완료 상태 */
            <div className="card p-10 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full
                              bg-green-100 dark:bg-green-900/30">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                  className="text-green-600 dark:text-green-400">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2 className="mb-3 text-2xl font-extrabold text-brand-navy dark:text-white">
                문의가 정상적으로 접수되었습니다.
              </h2>
              <p className="mb-2 text-neutral-600 dark:text-neutral-400">
                <span className="font-semibold text-brand-royal dark:text-brand-sky">{form.email}</span>
                로 접수 확인 메일이 발송됩니다.
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                영업일 기준 1~3일 내에 담당자가 답변 드리겠습니다.
              </p>
              <button
                type="button"
                onClick={() => { setForm(INITIAL_FORM); setSubmitted(false) }}
                className="mt-8 btn-outline px-8 py-3 text-sm"
              >
                새 문의 작성하기
              </button>
            </div>
          ) : (
            /* 문의 폼 */
            <div className="card p-8 md:p-10">
              <div className="mb-8">
                <span className="badge mb-3">문의하기</span>
                <h2 className="text-2xl font-extrabold text-brand-navy dark:text-white">
                  에듀포커스에 문의하세요
                </h2>
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <span className="text-brand-amber font-semibold">*</span> 표시 항목은 필수 입력사항입니다.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* 이름 + 이메일 */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <FieldLabel htmlFor="name" required>이름</FieldLabel>
                    <input
                      id="name" type="text" autoComplete="name"
                      placeholder="홍길동"
                      value={form.name} onChange={set('name')}
                      className={inputBase}
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <FieldLabel htmlFor="email" required>이메일 주소</FieldLabel>
                    <input
                      id="email" type="email" autoComplete="email"
                      placeholder="example@email.com"
                      value={form.email} onChange={set('email')}
                      className={inputBase}
                    />
                    {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
                  </div>
                </div>

                {/* 문의 유형 */}
                <div>
                  <FieldLabel htmlFor="type" required>문의 유형</FieldLabel>
                  <select
                    id="type"
                    value={form.type} onChange={set('type')}
                    className={inputBase + ' cursor-pointer'}
                  >
                    {INQUIRY_TYPES.map((t) => (
                      <option key={t.value} value={t.value} disabled={t.value === ''}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  {errors.type && <p className="mt-1.5 text-xs text-red-500">{errors.type}</p>}
                </div>

                {/* 제목 */}
                <div>
                  <FieldLabel htmlFor="subject" required>제목</FieldLabel>
                  <input
                    id="subject" type="text"
                    placeholder="문의 제목을 입력해주세요"
                    value={form.subject} onChange={set('subject')}
                    className={inputBase}
                  />
                  {errors.subject && <p className="mt-1.5 text-xs text-red-500">{errors.subject}</p>}
                </div>

                {/* 문의 내용 */}
                <div>
                  <FieldLabel htmlFor="message" required>문의 내용</FieldLabel>
                  <textarea
                    id="message" rows={7}
                    placeholder="문의 내용을 자세히 작성해주세요."
                    value={form.message} onChange={set('message')}
                    className={inputBase + ' resize-none leading-relaxed'}
                  />
                  {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
                </div>

                {/* 서버 오류 메시지 */}
                {submitError && (
                  <p className="rounded-xl bg-red-50 dark:bg-red-900/20 px-4 py-3 text-sm text-red-600 dark:text-red-400">
                    {submitError}
                  </p>
                )}

                {/* 제출 버튼 */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full py-3.5 text-base font-bold disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? '제출 중...' : '문의 제출하기'}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
