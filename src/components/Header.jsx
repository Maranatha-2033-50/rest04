import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { nav, company, studyMateApp } from '../data/site'
import { useLang } from '../context/LanguageContext'

function SunIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Header() {
  const { lang, toggleLang, t } = useLang()
  const [efLoggedIn, setEfLoggedIn] = useState(() => localStorage.getItem('ef_logged_in') === 'true')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoveredIdx, setHoveredIdx] = useState(null)
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  // 크로스 도메인 세션 브릿지: 스터디메이트 로그인 후 ?login_status=success 감지
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('login_status') === 'success') {
      localStorage.setItem('ef_logged_in', 'true')
      setEfLoggedIn(true)
      // URL 정리 — 쿼리 파라미터 제거 후 해시만 유지
      window.history.replaceState({}, '', window.location.pathname + window.location.hash)
    }
  }, [])

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  function handleSignOut() {
    localStorage.removeItem('ef_logged_in')
    setEfLoggedIn(false)
    window.location.href = studyMateApp.signoutUrl
  }

  const myPageLabel = lang === 'ko' ? '마이페이지' : 'My Page'
  const signOutLabel = lang === 'ko' ? '로그아웃' : 'Sign Out'
  const loginLabel = lang === 'ko' ? '로그인' : 'Log In'
  const signupLabel = lang === 'ko' ? '회원가입' : 'Sign Up'

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav className="bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 transition-colors">
        <div className="mx-auto flex h-20 max-w-container items-center justify-between px-4 md:px-10 lg:px-20">

          {/* 로고 */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight text-brand-navy dark:text-brand-sky"
          >
            {company.name}
            <span className="ml-2 hidden text-sm font-semibold text-brand-royal dark:text-brand-sky/70 sm:inline">
              에듀포커스
            </span>
          </Link>

          {/* 데스크탑 메뉴 */}
          <ul className="hidden items-stretch lg:flex">
            {nav.map((item, idx) => (
              <li
                key={idx}
                className="relative flex items-center"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'px-5 py-7 text-base font-semibold transition-colors',
                      isActive
                        ? 'text-brand-royal dark:text-brand-sky'
                        : 'text-neutral-700 dark:text-neutral-300 hover:text-brand-royal dark:hover:text-brand-sky',
                    ].join(' ')
                  }
                >
                  {t(item.label)}
                </NavLink>

                {hoveredIdx === idx && item.children?.length > 0 && (
                  <ul className="absolute left-1/2 top-full z-50 min-w-[180px] -translate-x-1/2
                                  rounded-xl border border-gray-100 dark:border-gray-800
                                  bg-white dark:bg-gray-950 shadow-xl py-2">
                    {item.children.map((c, ci) => (
                      <li key={ci}>
                        <Link
                          to={c.to}
                          onClick={() => setHoveredIdx(null)}
                          className="block px-5 py-2.5 text-sm text-neutral-600 dark:text-neutral-400
                                     whitespace-nowrap hover:text-brand-royal dark:hover:text-brand-sky
                                     hover:bg-brand-light dark:hover:bg-gray-800 transition-colors"
                        >
                          {t(c.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* 우측: 인증 버튼 + 언어 토글 + 다크모드 토글 + 햄버거 */}
          <div className="flex items-center gap-2">
            {/* 무료 상담 신청 CTA — 데스크탑 */}
            <Link to="/consultation"
              className="hidden lg:inline-flex items-center rounded-full bg-brand-amber px-4 py-2
                         text-xs font-bold text-white hover:brightness-110 transition">
              {lang === 'ko' ? '무료 상담 신청' : 'Free Consultation'}
            </Link>

            {/* 로그인 상태에 따라 버튼 동적 전환 — 데스크탑만 */}
            {efLoggedIn ? (
              <>
                <a href={studyMateApp.url}
                  className="hidden lg:inline-flex items-center rounded-full border border-gray-200
                             dark:border-gray-700 px-4 py-2 text-xs font-semibold
                             text-neutral-700 dark:text-neutral-300
                             hover:border-brand-royal dark:hover:border-brand-sky
                             hover:text-brand-royal dark:hover:text-brand-sky transition-colors">
                  {myPageLabel}
                </a>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="hidden lg:inline-flex items-center rounded-full bg-gray-100
                             dark:bg-gray-800 px-4 py-2 text-xs font-semibold
                             text-neutral-600 dark:text-neutral-300
                             hover:bg-red-50 hover:text-red-600
                             dark:hover:bg-red-900/30 dark:hover:text-red-400 transition-colors">
                  {signOutLabel}
                </button>
              </>
            ) : (
              <>
                <a href={studyMateApp.loginUrl}
                  className="hidden lg:inline-flex items-center rounded-full border border-gray-200
                             dark:border-gray-700 px-4 py-2 text-xs font-semibold
                             text-neutral-700 dark:text-neutral-300
                             hover:border-brand-royal dark:hover:border-brand-sky
                             hover:text-brand-royal dark:hover:text-brand-sky transition-colors">
                  {loginLabel}
                </a>
                <a href={studyMateApp.signupUrl}
                  className="hidden lg:inline-flex items-center rounded-full bg-brand-royal text-white
                             px-4 py-2 text-xs font-semibold
                             hover:bg-brand-navy dark:hover:bg-brand-sky transition-colors">
                  {signupLabel}
                </a>
              </>
            )}

            {/* KR / EN 언어 토글 */}
            <button
              type="button"
              onClick={toggleLang}
              aria-label={lang === 'ko' ? 'Switch to English' : '한국어로 전환'}
              className="flex h-9 items-center gap-0.5 rounded-full border px-3
                         border-gray-200 dark:border-gray-700
                         text-xs font-bold transition-colors
                         hover:border-brand-royal dark:hover:border-brand-sky"
            >
              <span className={lang === 'ko' ? 'text-brand-royal dark:text-brand-sky' : 'text-neutral-400 dark:text-neutral-600'}>
                KR
              </span>
              <span className="mx-0.5 text-neutral-300 dark:text-neutral-700">·</span>
              <span className={lang === 'en' ? 'text-brand-royal dark:text-brand-sky' : 'text-neutral-400 dark:text-neutral-600'}>
                EN
              </span>
            </button>

            {/* 다크모드 토글 */}
            <button
              type="button"
              aria-label={dark ? '라이트 모드로 전환' : '다크 모드로 전환'}
              onClick={() => setDark((d) => !d)}
              className="flex h-9 w-9 items-center justify-center rounded-full
                         bg-gray-100 dark:bg-gray-800
                         text-gray-600 dark:text-gray-300
                         hover:bg-brand-light dark:hover:bg-gray-700 transition-colors"
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>

            {/* 햄버거 (모바일) */}
            <button
              type="button"
              aria-label="메뉴 열기"
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <span className="h-0.5 w-6 bg-neutral-800 dark:bg-neutral-200" />
              <span className="h-0.5 w-6 bg-neutral-800 dark:bg-neutral-200" />
              <span className="h-0.5 w-6 bg-neutral-800 dark:bg-neutral-200" />
            </button>
          </div>
        </div>
      </nav>

      {/* 모바일 패널 */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm overflow-y-auto
                          bg-white dark:bg-gray-950 p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xl font-extrabold text-brand-navy dark:text-brand-sky">
                {company.name}
              </span>
              <div className="flex items-center gap-2">
                {/* 모바일 언어 토글 */}
                <button
                  type="button"
                  onClick={toggleLang}
                  className="flex h-8 items-center gap-0.5 rounded-full border px-2.5
                             border-gray-200 dark:border-gray-700 text-xs font-bold transition-colors"
                >
                  <span className={lang === 'ko' ? 'text-brand-royal dark:text-brand-sky' : 'text-neutral-400 dark:text-neutral-600'}>KR</span>
                  <span className="mx-0.5 text-neutral-300 dark:text-neutral-700">·</span>
                  <span className={lang === 'en' ? 'text-brand-royal dark:text-brand-sky' : 'text-neutral-400 dark:text-neutral-600'}>EN</span>
                </button>
                <button
                  type="button"
                  aria-label="메뉴 닫기"
                  className="text-2xl text-neutral-500 dark:text-neutral-400"
                  onClick={() => setMobileOpen(false)}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* 무료 상담 신청 CTA — 모바일 */}
            <Link to="/consultation"
              onClick={() => setMobileOpen(false)}
              className="mb-4 block rounded-xl bg-brand-amber py-3 text-center text-sm font-bold text-white
                         hover:brightness-110 transition">
              {lang === 'ko' ? '무료 상담 신청하기' : 'Apply for Free Consultation'}
            </Link>

            {/* 모바일 인증 버튼 */}
            <div className="mb-6 flex gap-3">
              {efLoggedIn ? (
                <>
                  <a href={studyMateApp.url}
                    className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700
                               py-2.5 text-center text-sm font-semibold
                               text-neutral-700 dark:text-neutral-300
                               hover:border-brand-royal hover:text-brand-royal transition-colors">
                    {myPageLabel}
                  </a>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="flex-1 rounded-xl border border-red-200 dark:border-red-800
                               py-2.5 text-center text-sm font-semibold
                               text-red-600 dark:text-red-400 transition-colors">
                    {signOutLabel}
                  </button>
                </>
              ) : (
                <>
                  <a href={studyMateApp.loginUrl}
                    className="flex-1 rounded-xl border border-gray-200 dark:border-gray-700
                               py-2.5 text-center text-sm font-semibold
                               text-neutral-700 dark:text-neutral-300
                               hover:border-brand-royal hover:text-brand-royal
                               dark:hover:border-brand-sky dark:hover:text-brand-sky transition-colors">
                    {loginLabel}
                  </a>
                  <a href={studyMateApp.signupUrl}
                    className="flex-1 rounded-xl bg-brand-royal text-white
                               py-2.5 text-center text-sm font-semibold
                               hover:bg-brand-navy dark:hover:bg-brand-sky transition-colors">
                    {signupLabel}
                  </a>
                </>
              )}
            </div>

            <ul className="flex flex-col gap-2">
              {nav.map((item, idx) => (
                <li key={idx} className="border-b border-neutral-100 dark:border-gray-800 pb-2">
                  <Link
                    to={item.to}
                    className="block py-2 text-lg font-bold text-neutral-900 dark:text-neutral-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    {t(item.label)}
                  </Link>
                  <ul className="flex flex-col">
                    {item.children?.map((c, ci) => (
                      <li key={ci}>
                        <Link
                          to={c.to}
                          className="block py-1.5 pl-3 text-sm text-neutral-500 dark:text-neutral-400
                                     hover:text-brand-royal dark:hover:text-brand-sky"
                          onClick={() => setMobileOpen(false)}
                        >
                          {t(c.label)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}
