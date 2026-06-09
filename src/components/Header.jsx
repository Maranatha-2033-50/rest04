import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { nav, company } from '../data/site'

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
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains('dark')
  )

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [dark])

  return (
    <header className="sticky top-0 z-50 w-full">
      <nav
        className="bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800 transition-colors"
        onMouseLeave={() => setHovered(null)}
      >
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
            {nav.map((item) => (
              <li
                key={item.label}
                className="group flex items-center"
                onMouseEnter={() => setHovered(item.label)}
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
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* 우측: 다크모드 토글 + 햄버거 */}
          <div className="flex items-center gap-3">
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

        {/* 데스크탑 서브메뉴 드롭다운 */}
        <div
          className={[
            'hidden overflow-hidden border-b bg-white dark:bg-gray-950 transition-all duration-200 lg:block',
            hovered
              ? 'max-h-60 opacity-100 border-gray-100 dark:border-gray-800'
              : 'max-h-0 border-b-0 opacity-0',
          ].join(' ')}
        >
          <div className="mx-auto flex max-w-container justify-end px-20">
            {nav.map((item) => (
              <ul
                key={item.label}
                className="flex w-44 flex-col gap-3 py-6"
                onMouseEnter={() => setHovered(item.label)}
              >
                {hovered === item.label &&
                  item.children.map((c) => (
                    <li key={c.label + c.to}>
                      <Link
                        to={c.to}
                        className="block text-center text-sm text-neutral-600 dark:text-neutral-400
                                   transition hover:font-semibold hover:text-brand-royal dark:hover:text-brand-sky"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            ))}
          </div>
        </div>
      </nav>

      {/* 모바일 패널 */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm overflow-y-auto
                          bg-white dark:bg-gray-950 p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-xl font-extrabold text-brand-navy dark:text-brand-sky">
                {company.name}
              </span>
              <button
                type="button"
                aria-label="메뉴 닫기"
                className="text-2xl text-neutral-500 dark:text-neutral-400"
                onClick={() => setMobileOpen(false)}
              >
                ✕
              </button>
            </div>
            <ul className="flex flex-col gap-2">
              {nav.map((item) => (
                <li key={item.label} className="border-b border-neutral-100 dark:border-gray-800 pb-2">
                  <Link
                    to={item.to}
                    className="block py-2 text-lg font-bold text-neutral-900 dark:text-neutral-100"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                  <ul className="flex flex-col">
                    {item.children.map((c) => (
                      <li key={c.label + c.to}>
                        <Link
                          to={c.to}
                          className="block py-1.5 pl-3 text-sm text-neutral-500 dark:text-neutral-400
                                     hover:text-brand-royal dark:hover:text-brand-sky"
                          onClick={() => setMobileOpen(false)}
                        >
                          {c.label}
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
