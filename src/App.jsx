import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ScrollToTopButton from './components/ScrollToTopButton'
import ChatbotPopup from './components/ChatbotPopup'

import Home from './pages/Home'
import Languages from './pages/Languages'
import Certifications from './pages/Certifications'
import Subjects from './pages/Subjects'
import Videos from './pages/Videos'
import AIApp from './pages/AIApp'
import About from './pages/About'
import SimplePage from './pages/SimplePage'
import Support from './pages/Support'
import ConsultationForm from './components/ConsultationForm'

export default function App() {
  return (
    <div className="min-w-[320px]">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* 어학 */}
          <Route path="/languages" element={<Navigate to="/languages/ielts" replace />} />
          <Route path="/languages/:tab" element={<Languages />} />

          {/* 자격증 */}
          <Route path="/certifications" element={<Navigate to="/certifications/computer" replace />} />
          <Route path="/certifications/:tab" element={<Certifications />} />

          {/* 교과목 */}
          <Route path="/subjects" element={<Navigate to="/subjects/english" replace />} />
          <Route path="/subjects/:tab" element={<Subjects />} />

          {/* 학습 동영상 */}
          <Route path="/videos" element={<Navigate to="/videos/ielts" replace />} />
          <Route path="/videos/:topic" element={<Videos />} />

          {/* AI 학습앱 */}
          <Route path="/ai-app" element={<AIApp />} />

          {/* 회사소개 */}
          <Route path="/about" element={<Navigate to="/about/greeting" replace />} />
          <Route path="/about/:tab" element={<About />} />

          {/* 고객센터 */}
          <Route path="/support" element={<Support />} />

          {/* 1:1 무료 맞춤 상담 신청 */}
          <Route path="/consultation" element={<ConsultationForm />} />

          {/* 약관 / 정책 */}
          <Route path="/terms" element={<SimplePage title={{ ko: '이용약관', en: 'Terms of Service' }} contentKey="terms" />} />
          <Route path="/privacy" element={<SimplePage title={{ ko: '개인정보처리방침', en: 'Privacy Policy' }} contentKey="privacy" />} />

          <Route path="*" element={<SimplePage title={{ ko: '페이지를 찾을 수 없습니다', en: 'Page Not Found' }} />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTopButton />
      <ChatbotPopup />
    </div>
  )
}
