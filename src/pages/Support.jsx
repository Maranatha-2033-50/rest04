import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useLang } from '../context/LanguageContext'

const INQUIRY_TYPES = [
  { value: '', label: { ko: '문의 유형을 선택해주세요', en: 'Select an inquiry type' } },
  { value: 'languages', label: { ko: '어학 문의', en: 'Language programs' } },
  { value: 'certifications', label: { ko: '자격증 문의', en: 'Certification exams' } },
  { value: 'subjects', label: { ko: '교과목 과외 문의', en: 'Subject tutoring' } },
  { value: 'ai-app', label: { ko: 'AI 학습앱 문의', en: 'AI learning app' } },
  { value: 'system', label: { ko: '시스템 및 기타 오류', en: 'System & other issues' } },
]

const INITIAL_FORM = {
  name: '',
  email: '',
  type: '',
  subject: '',
  message: '',
}

// 고객센터 다국어 팩
const T = {
  pageTitle: { ko: '고객센터', en: 'Support Center' },
  pageSub: { ko: '문의사항을 남겨주시면 빠르게 답변 드리겠습니다.', en: 'Leave us a message and we’ll respond promptly.' },
  successTitle: { ko: '문의가 정상적으로 접수되었습니다.', en: 'Your inquiry has been received.' },
  successNote: { ko: '영업일 기준 1~3일 내에 담당자가 답변 드리겠습니다.', en: 'Our team will reply within 1–3 business days.' },
  newInquiry: { ko: '새 문의 작성하기', en: 'Write a new inquiry' },
  badge: { ko: '문의하기', en: 'Contact Us' },
  formTitle: { ko: '에듀포커스에 문의하세요', en: 'Get in touch with EDUFOCUS' },
  labelName: { ko: '이름', en: 'Name' },
  labelEmail: { ko: '이메일 주소', en: 'Email address' },
  labelType: { ko: '문의 유형', en: 'Inquiry type' },
  labelSubject: { ko: '제목', en: 'Subject' },
  labelMessage: { ko: '문의 내용', en: 'Message' },
  phName: { ko: '홍길동', en: 'e.g. John Doe' },
  phSubject: { ko: '문의 제목을 입력해주세요', en: 'Enter a subject' },
  phMessage: { ko: '문의 내용을 자세히 작성해주세요.', en: 'Describe your inquiry in detail.' },
  submit: { ko: '문의 제출하기', en: 'Submit inquiry' },
  submitting: { ko: '제출 중...', en: 'Submitting...' },
  submitError: { ko: '문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.', en: 'Something went wrong while sending your inquiry. Please try again shortly.' },
  vName: { ko: '이름을 입력해주세요.', en: 'Please enter your name.' },
  vEmail: { ko: '이메일 주소를 입력해주세요.', en: 'Please enter your email address.' },
  vEmailFormat: { ko: '올바른 이메일 형식이 아닙니다.', en: 'Please enter a valid email address.' },
  vType: { ko: '문의 유형을 선택해주세요.', en: 'Please select an inquiry type.' },
  vSubject: { ko: '제목을 입력해주세요.', en: 'Please enter a subject.' },
  vMessage: { ko: '문의 내용을 입력해주세요.', en: 'Please enter your message.' },
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
  const { t, lang } = useLang()
  const [form, setForm] = useState(INITIAL_FORM)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = t(T.vName)
    if (!form.email.trim()) next.email = t(T.vEmail)
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = t(T.vEmailFormat)
    if (!form.type) next.type = t(T.vType)
    if (!form.subject.trim()) next.subject = t(T.vSubject)
    if (!form.message.trim()) next.message = t(T.vMessage)
    return next
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setErrors({})
    setSubmitError(null)
    setSubmitting(true)

    const payload = {
      name:    form.name.trim(),
      email:   form.email.trim(),
      type:    form.type,
      title:   form.subject.trim(),
      content: form.message.trim(),
    }

    const { error } = await supabase.from('inquiries').insert(payload)

    setSubmitting(false)

    if (error) {
      setSubmitError(t(T.submitError))
      return
    }

    // Slack 실시간 알림 (VITE_SLACK_WEBHOOK_URL 설정 시 동작) — 사내 알림이므로 한국어 고정
    const webhookUrl = import.meta.env.VITE_SLACK_WEBHOOK_URL
    if (webhookUrl) {
      const typeLabel = {
        languages:      '어학',
        certifications: '자격증',
        subjects:       '교과목 과외',
        'ai-app':       'AI 학습앱',
        system:         '시스템 및 기타',
      }[payload.type] ?? payload.type

      fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: '*[에듀포커스 상담신청]*',
          blocks: [
            {
              type: 'header',
              text: { type: 'plain_text', text: '📬 새 상담 신청이 접수되었습니다', emoji: true },
            },
            {
              type: 'section',
              fields: [
                { type: 'mrkdwn', text: `*이름*\n${payload.name}` },
                { type: 'mrkdwn', text: `*이메일*\n${payload.email}` },
                { type: 'mrkdwn', text: `*문의 유형*\n${typeLabel}` },
                { type: 'mrkdwn', text: `*제목*\n${payload.title}` },
              ],
            },
            {
              type: 'section',
              text: { type: 'mrkdwn', text: `*내용*\n${payload.content}` },
            },
          ],
        }),
      }).catch(() => { /* 알림 실패가 메인 흐름에 영향 없도록 */ })
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
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">{t(T.pageTitle)}</h1>
          <p className="mt-4 text-white/70 text-sm md:text-base">
            {t(T.pageSub)}
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
                {t(T.successTitle)}
              </h2>
              <p className="mb-2 text-neutral-600 dark:text-neutral-400">
                {lang === 'ko' ? (
                  <>
                    <span className="font-semibold text-brand-royal dark:text-brand-sky">{form.email}</span>
                    로 접수 확인 메일이 발송됩니다.
                  </>
                ) : (
                  <>
                    A confirmation email is on its way to{' '}
                    <span className="font-semibold text-brand-royal dark:text-brand-sky">{form.email}</span>.
                  </>
                )}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500">
                {t(T.successNote)}
              </p>
              <button
                type="button"
                onClick={() => { setForm(INITIAL_FORM); setSubmitted(false) }}
                className="mt-8 btn-outline px-8 py-3 text-sm"
              >
                {t(T.newInquiry)}
              </button>
            </div>
          ) : (
            /* 문의 폼 */
            <div className="card p-8 md:p-10">
              <div className="mb-8">
                <span className="badge mb-3">{t(T.badge)}</span>
                <h2 className="text-2xl font-extrabold text-brand-navy dark:text-white">
                  {t(T.formTitle)}
                </h2>
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                  {lang === 'ko' ? (
                    <><span className="text-brand-amber font-semibold">*</span> 표시 항목은 필수 입력사항입니다.</>
                  ) : (
                    <>Fields marked with <span className="text-brand-amber font-semibold">*</span> are required.</>
                  )}
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* 이름 + 이메일 */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <FieldLabel htmlFor="name" required>{t(T.labelName)}</FieldLabel>
                    <input
                      id="name" type="text" autoComplete="name"
                      placeholder={t(T.phName)}
                      value={form.name} onChange={set('name')}
                      className={inputBase}
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <FieldLabel htmlFor="email" required>{t(T.labelEmail)}</FieldLabel>
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
                  <FieldLabel htmlFor="type" required>{t(T.labelType)}</FieldLabel>
                  <select
                    id="type"
                    value={form.type} onChange={set('type')}
                    className={inputBase + ' cursor-pointer'}
                  >
                    {INQUIRY_TYPES.map((opt) => (
                      <option key={opt.value} value={opt.value} disabled={opt.value === ''}>
                        {t(opt.label)}
                      </option>
                    ))}
                  </select>
                  {errors.type && <p className="mt-1.5 text-xs text-red-500">{errors.type}</p>}
                </div>

                {/* 제목 */}
                <div>
                  <FieldLabel htmlFor="subject" required>{t(T.labelSubject)}</FieldLabel>
                  <input
                    id="subject" type="text"
                    placeholder={t(T.phSubject)}
                    value={form.subject} onChange={set('subject')}
                    className={inputBase}
                  />
                  {errors.subject && <p className="mt-1.5 text-xs text-red-500">{errors.subject}</p>}
                </div>

                {/* 문의 내용 */}
                <div>
                  <FieldLabel htmlFor="message" required>{t(T.labelMessage)}</FieldLabel>
                  <textarea
                    id="message" rows={7}
                    placeholder={t(T.phMessage)}
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
                    {submitting ? t(T.submitting) : t(T.submit)}
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
