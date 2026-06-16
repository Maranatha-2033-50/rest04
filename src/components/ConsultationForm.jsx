import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

// ============================================================
// 1:1 무료 맞춤 상담 신청 폼
// 제출 데이터는 Supabase `consultation_requests` 테이블로 insert 된다.
// 테이블이 아직 없다면 아래 SQL 로 먼저 생성하세요 (Supabase SQL Editor):
//
//   create table public.consultation_requests (
//     id          bigint generated always as identity primary key,
//     name        text not null,
//     phone       text not null,
//     domain      text,
//     message     text not null,
//     created_at  timestamptz not null default now()
//   );
//   alter table public.consultation_requests enable row level security;
//   create policy "anon insert" on public.consultation_requests
//     for insert to anon with check (true);
//
// 테이블/Supabase 미설정 시에도 폼은 깨지지 않고 로컬 처리 후 완료 안내를 노출한다.
// ============================================================

const DOMAINS = [
  { value: '', label: '관심 교육 도메인을 선택해주세요' },
  { value: 'domestic', label: '국내 내신/수능' },
  { value: 'a-level', label: '영국 A-Level' },
  { value: 'ontario', label: '캐나다 온타리오' },
  { value: 'ielts-general', label: 'IELTS 일반' },
  { value: 'ielts-review', label: 'IELTS 첨삭' },
  { value: 'it-cert', label: 'IT 자격증' },
  { value: 'korean-history', label: '한국사' },
]

// 챗봇·외부 동선에서 넘어오는 intent/category 값을 도메인 value 로 매핑 (별칭 허용).
const CATEGORY_ALIASES = {
  domestic: 'domestic', naesin: 'domestic', suneung: 'domestic', csat: 'domestic',
  'a-level': 'a-level', alevel: 'a-level', uk: 'a-level',
  ontario: 'ontario', canada: 'ontario', ca: 'ontario',
  ielts: 'ielts-general', 'ielts-general': 'ielts-general', general: 'ielts-general',
  'ielts-review': 'ielts-review', review: 'ielts-review',
  'it-cert': 'it-cert', it: 'it-cert', cert: 'it-cert', certification: 'it-cert',
  'korean-history': 'korean-history', history: 'korean-history', korean: 'korean-history',
}

function resolveDomain(searchParams) {
  const raw = (searchParams.get('category') || searchParams.get('intent') || '').toLowerCase()
  if (!raw) return ''
  if (CATEGORY_ALIASES[raw]) return CATEGORY_ALIASES[raw]
  return DOMAINS.some((d) => d.value === raw) ? raw : ''
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

export default function ConsultationForm() {
  const [searchParams] = useSearchParams()

  const [form, setForm] = useState(() => ({
    name: '',
    phone: '',
    domain: resolveDomain(searchParams),
    message: '',
  }))
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const set = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = '성함을 입력해주세요.'
    if (!form.phone.trim()) next.phone = '연락처를 입력해주세요.'
    if (!form.domain) next.domain = '관심 교육 도메인을 선택해주세요.'
    if (!form.message.trim()) next.message = '문의사항을 입력해주세요.'
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
      name: form.name.trim(),
      phone: form.phone.trim(),
      domain: form.domain,
      message: form.message.trim(),
    }

    try {
      if (supabase) {
        const { error } = await supabase.from('consultation_requests').insert(payload)
        if (error) throw error
      } else {
        // Supabase 미설정 — 로컬 처리. 위 SQL 가이드대로 테이블 생성 후 연동하세요.
        console.warn('[consultation] Supabase 미설정 — 로컬 처리되었습니다.', payload)
      }
      setSubmitted(true)
    } catch (err) {
      console.error('[consultation] insert 실패:', err)
      setSubmitError('상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      {/* 페이지 헤더 */}
      <div className="w-full bg-gradient-to-br from-brand-navy to-brand-royal
                      dark:from-gray-900 dark:to-brand-navy flex items-center justify-center py-16 md:py-24">
        <div className="section-x text-center">
          <p className="text-xs font-semibold tracking-widest text-brand-sky/80 uppercase mb-3">
            PREMIUM CONSULTING
          </p>
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">1:1 무료 맞춤 상담 신청</h1>
          <p className="mt-4 text-white/70 text-sm md:text-base">
            전문 컨설턴트가 학습 목표와 취약점을 진단하고, 합격까지의 최단 경로를 설계해 드립니다.
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
                상담 신청이 완료되었습니다.
              </h2>
              <p className="mx-auto max-w-md leading-relaxed text-neutral-600 dark:text-neutral-400">
                성함과 연락처, 문의사항을 남겨주시면 <span className="font-semibold text-brand-royal dark:text-brand-sky">24시간 내로 연락</span> 드리겠습니다.
              </p>
              <button
                type="button"
                onClick={() => {
                  setForm({ name: '', phone: '', domain: resolveDomain(searchParams), message: '' })
                  setSubmitted(false)
                }}
                className="mt-8 btn-outline px-8 py-3 text-sm"
              >
                새 상담 신청하기
              </button>
            </div>
          ) : (
            /* 상담 신청 폼 */
            <div className="card p-8 md:p-10">
              <div className="mb-8">
                <span className="badge mb-3">무료 상담 신청</span>
                <h2 className="text-2xl font-extrabold text-brand-navy dark:text-white">
                  맞춤 상담을 신청하세요
                </h2>
                <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                  <span className="text-brand-amber font-semibold">*</span> 표시 항목은 필수 입력사항입니다.
                </p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* 성함 + 연락처 */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <FieldLabel htmlFor="name" required>성함</FieldLabel>
                    <input
                      id="name" type="text" autoComplete="name"
                      placeholder="홍길동"
                      value={form.name} onChange={set('name')}
                      className={inputBase}
                    />
                    {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <FieldLabel htmlFor="phone" required>연락처</FieldLabel>
                    <input
                      id="phone" type="tel" autoComplete="tel"
                      placeholder="010-1234-5678"
                      value={form.phone} onChange={set('phone')}
                      className={inputBase}
                    />
                    {errors.phone && <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                {/* 관심 교육 도메인 */}
                <div>
                  <FieldLabel htmlFor="domain" required>관심 교육 도메인</FieldLabel>
                  <select
                    id="domain"
                    value={form.domain} onChange={set('domain')}
                    className={inputBase + ' cursor-pointer'}
                  >
                    {DOMAINS.map((d) => (
                      <option key={d.value} value={d.value} disabled={d.value === ''}>
                        {d.label}
                      </option>
                    ))}
                  </select>
                  {errors.domain && <p className="mt-1.5 text-xs text-red-500">{errors.domain}</p>}
                </div>

                {/* 문의사항 */}
                <div>
                  <FieldLabel htmlFor="message" required>문의사항</FieldLabel>
                  <textarea
                    id="message" rows={7}
                    placeholder="현재 학습 상황과 목표, 궁금하신 점을 자유롭게 작성해주세요."
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
                    {submitting ? '신청 중...' : '무료 상담 신청하기'}
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
