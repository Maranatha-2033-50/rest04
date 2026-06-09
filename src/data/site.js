// ============================================================
// 에듀포커스 사이트 전역 데이터 — 단일 진실 소스 (Single Source of Truth)
//
// [다국어 확장 가이드 — Phase 2 준비사항]
// 현재: 모든 문자열은 한국어(KO) 단일 값으로 관리
// 향후: 아래 패턴으로 각 문자열 필드를 { ko: '...', en: '...' } 객체로 전환
//   Before: title: 'IELTS'
//   After:  title: { ko: 'IELTS', en: 'IELTS' }
// 컴포넌트에서는 useLang() 훅 + t(data.title) 헬퍼로 현재 언어 값 추출
// ============================================================

export const company = {
  name: 'EDUFOCUS',
  nameKo: '에듀포커스',
  fullName: 'EDUFOCUS EDU Corp.',
  slogan: '내 취약점을 알면, 합격이 보입니다',
  copyright: '© 2026 EDUFOCUS EDU Corp. All rights reserved.',
  intro: [
    '에듀포커스는 AI 기반 취약점 분석 기술로 학습자 개인의 약점을 정밀하게 파악하고, 최단 경로로 목표 점수에 도달할 수 있도록 설계된 집중 학습 루틴을 제공합니다.',
    'IELTS, DELF, 컴퓨터활용능력검정, 정보처리기사, 한국사능력검정 등 주요 어학·자격증 시험과 교과목 과외를 통해 학습자의 합격을 함께 준비합니다.',
  ],
  offices: [
    {
      label: '본사',
      address: '서울특별시 강남구 테헤란로 123 에듀포커스빌딩 5층',
      tel: '02-1234-5678',
      fax: '02-1234-5679',
    },
    {
      label: '학습센터',
      address: '서울특별시 마포구 독막로 45 에듀포커스 러닝센터',
      tel: '02-9876-5432',
      fax: '02-9876-5433',
    },
  ],
  familySites: [
    { name: 'AI 학습앱 다운로드 (iOS)', url: 'https://apps.apple.com' },
    { name: 'AI 학습앱 다운로드 (Android)', url: 'https://play.google.com' },
    { name: '에듀포커스 유튜브 채널', url: 'https://youtube.com' },
  ],
  footerLinks: [
    { label: '이용약관', to: '/terms' },
    { label: '개인정보처리방침', to: '/privacy', strong: true },
    { label: '고객센터', to: '/support' },
  ],
}

// ── 상단 GNB ────────────────────────────────────────────────
export const nav = [
  {
    label: '어학',
    to: '/languages/ielts',
    children: [
      { label: 'IELTS', to: '/languages/ielts' },
      { label: 'DELF A1·A2', to: '/languages/delf-a' },
      { label: 'DELF B1·B2', to: '/languages/delf-b' },
      { label: 'DELF C1·C2', to: '/languages/delf-c' },
    ],
  },
  {
    label: '자격증',
    to: '/certifications/computer',
    children: [
      { label: '컴퓨터활용능력', to: '/certifications/computer' },
      { label: '정보처리기사', to: '/certifications/it' },
      { label: '한국사능력검정', to: '/certifications/history' },
    ],
  },
  {
    label: '교과목',
    to: '/subjects/english',
    children: [
      { label: '영어', to: '/subjects/english' },
      { label: '수학', to: '/subjects/math' },
      { label: '과학', to: '/subjects/science' },
      { label: '국어', to: '/subjects/korean' },
    ],
  },
  {
    label: '학습 동영상',
    to: '/videos/ielts',
    children: [
      { label: 'IELTS 영상', to: '/videos/ielts' },
      { label: 'DELF 영상', to: '/videos/delf' },
      { label: '컴활 영상', to: '/videos/computer' },
      { label: '정처기 영상', to: '/videos/it' },
      { label: '한능검 영상', to: '/videos/history' },
      { label: 'AI앱 활용법', to: '/videos/ai-app' },
    ],
  },
  {
    label: 'AI 학습앱',
    to: '/ai-app',
    children: [
      { label: '앱 소개', to: '/ai-app' },
      { label: '취약점 분석', to: '/ai-app#analysis' },
      { label: '다운로드', to: '/ai-app#download' },
    ],
  },
  {
    label: '회사소개',
    to: '/about/greeting',
    children: [
      { label: '대표 인사말', to: '/about/greeting' },
      { label: '서비스 소개', to: '/about/services' },
      { label: '연혁', to: '/about/history' },
      { label: '고객센터', to: '/support' },
    ],
  },
]

// ── 메인 홈 ─────────────────────────────────────────────────
export const serviceCards = [
  {
    key: 'languages',
    icon: '🌐',
    title: '어학',
    desc: 'IELTS · DELF 시험별 취약점을 분석하고 목표 점수 달성을 위한 집중 학습 루틴을 설계합니다.',
    to: '/languages/ielts',
    tags: ['IELTS', 'DELF A1-C2'],
  },
  {
    key: 'certifications',
    icon: '📋',
    title: '자격증',
    desc: '컴퓨터활용능력, 정보처리기사, 한국사능력검정 합격을 위한 단계별 취약점 집중 학습을 제공합니다.',
    to: '/certifications/computer',
    tags: ['컴활', '정처기', '한능검'],
  },
  {
    key: 'subjects',
    icon: '📚',
    title: '교과목 과외',
    desc: '영어·수학·과학·국어 핵심 교과목에서 취약한 단원을 집중 보완해 성적을 끌어올립니다.',
    to: '/subjects/english',
    tags: ['영어', '수학', '과학', '국어'],
  },
]

export const notices = [
  { id: 4, title: '2026 하반기 IELTS 집중반 모집 안내', date: '2026.06.01' },
  { id: 3, title: 'DELF B2·C1 무료 취약점 진단 이벤트 (6월)', date: '2026.05.25' },
  { id: 2, title: '정보처리기사 2차 실기 대비 집중 특강 오픈', date: '2026.05.18' },
  { id: 1, title: 'AI 학습앱 v2.0 업데이트 — 취약점 리포트 기능 강화', date: '2026.05.10' },
]

// ── 어학 ─────────────────────────────────────────────────────
// learningSteps: 각 탭별 고유한 5단계 학습 과정
export const languagesPages = {
  ielts: {
    title: 'IELTS',
    headLabel: 'IELTS',
    level: '국제 영어 공인 시험',
    desc: '아이엘츠(IELTS)는 영국, 호주, 캐나다, 뉴질랜드 유학·이민에 필수적인 국제 영어 능력 인증 시험입니다. Listening · Reading · Writing · Speaking 4개 영역별 취약점을 정밀 분석하여 목표 Band Score 달성 루틴을 설계합니다.',
    sections: ['Listening', 'Reading', 'Writing', 'Speaking'],
    targetScore: 'Band 5.0 ~ 9.0',
    learningSteps: [
      'AI 취약점 진단 테스트 (Listening · Reading · Writing · Speaking 영역별 측정)',
      '영역별 취약 유형 분석 리포트 제공',
      '목표 Band Score 달성 맞춤 학습 루틴 설계',
      '취약 유형 집중 문제 반복 훈련',
      '정기 모의 IELTS 및 Band Score 예측 피드백',
    ],
  },
  'delf-a': {
    title: 'DELF A1·A2',
    headLabel: 'DELF A',
    level: '프랑스어 능력 인증 (입문·기초)',
    desc: 'DELF(Diplôme d\'Études en Langue Française) A1·A2는 프랑스어 기초 능력을 인증하는 시험입니다. 발음·어휘·문법 기초부터 시작해 일상 의사소통 능력까지 단계별로 취약점을 보완합니다.',
    sections: ['Compréhension de l\'oral', 'Compréhension des écrits', 'Production écrite', 'Production orale'],
    targetScore: 'A1 · A2 합격',
    learningSteps: [
      'DELF A1·A2 레벨 진단 테스트 (기초 어휘·문법 수준 측정)',
      '4개 평가 영역별 취약점 분석 리포트 제공',
      '기초 어휘·문법·발음 집중 보완 루틴 설계',
      '취약 유형 집중 문제 반복 훈련',
      '모의 DELF A1·A2 시험 및 영역별 피드백',
    ],
  },
  'delf-b': {
    title: 'DELF B1·B2',
    headLabel: 'DELF B',
    level: '프랑스어 능력 인증 (중급)',
    desc: 'DELF B1·B2는 프랑스어 중급 수준의 의사소통 능력을 인증합니다. 유학 비자, 프랑스어권 취업에 활용되며, 에듀포커스의 AI 취약점 분석으로 Writing·Speaking 집중 보완이 가능합니다.',
    sections: ['Compréhension de l\'oral', 'Compréhension des écrits', 'Production écrite', 'Production orale'],
    targetScore: 'B1 · B2 합격',
    learningSteps: [
      'DELF B1·B2 레벨 진단 테스트 (중급 의사소통 능력 측정)',
      '영역별 취약점 분석 리포트 제공',
      '작문(Production écrite)·구술(Production orale) 집중 학습 루틴 설계',
      '취약 유형 집중 문제 반복 훈련',
      '모의 DELF B1·B2 시험 및 등급별 피드백',
    ],
  },
  'delf-c': {
    title: 'DELF C1·C2',
    headLabel: 'DELF C',
    level: '프랑스어 능력 인증 (고급)',
    desc: 'DALF C1·C2는 프랑스어 고급 수준으로 원어민에 준하는 언어 능력을 인증합니다. 아카데믹 작문·발표·분석 능력을 집중 훈련하며, 프랑스 명문대 입학에 활용됩니다.',
    sections: ['Compréhension de l\'oral', 'Compréhension des écrits', 'Production écrite', 'Production orale'],
    targetScore: 'C1 · C2 합격',
    learningSteps: [
      'DALF C1·C2 레벨 진단 테스트 (고급 언어 능력 측정)',
      '아카데믹 영역별 취약점 상세 분석 리포트 제공',
      '논증적 작문·발표·분석 집중 루틴 설계',
      '고난도 취약 유형 집중 문제 반복 훈련',
      '모의 DALF 시험 및 원어민 수준 피드백',
    ],
  },
}

// ── 자격증 ───────────────────────────────────────────────────
// learningSteps: 각 자격증별 고유한 5단계 학습 과정
// targetAudience: 각 자격증별 추천 대상 4항목
export const certificationPages = {
  computer: {
    title: '컴퓨터활용능력',
    headLabel: 'Computer',
    subtitle: '대한상공회의소 주관 국가기술자격',
    desc: '컴퓨터활용능력검정시험(컴활)은 스프레드시트·데이터베이스 실무 능력을 평가하는 국가기술자격입니다. 1급(필기+실기)과 2급 과정별 취약 기능을 집중 훈련합니다.',
    grades: ['1급 필기', '1급 실기', '2급 필기', '2급 실기'],
    learningSteps: [
      'AI 취약 기능 진단 테스트 (스프레드시트·데이터베이스 영역별 측정)',
      '과목·기능별 취약점 분석 리포트 제공',
      '취약 기능 집중 개념 정리 및 실습 훈련',
      '기출 유형 반복 풀이 루틴 적용',
      '최신 기출 모의고사 및 채점 피드백',
    ],
    targetAudience: [
      '컴퓨터활용능력 첫 도전으로 어디서 시작해야 할지 모르는 분',
      '기출을 여러 번 풀었지만 점수가 오르지 않는 분',
      '엑셀·액세스 특정 기능에서 반복적으로 실수하는 분',
      '단기간에 합격 점수를 달성해야 하는 분',
    ],
  },
  it: {
    title: '정보처리기사',
    headLabel: 'IT Engineer',
    subtitle: '한국산업인력공단 주관 국가기술자격',
    desc: '정보처리기사는 IT 분야 핵심 국가기술자격으로 소프트웨어 설계·개발·DB·네트워크 전반을 다룹니다. 필기 5과목 + 실기 작업형 취약 영역을 집중 보완합니다.',
    grades: ['필기 1과목', '필기 2과목', '필기 3과목', '필기 4·5과목', '실기'],
    learningSteps: [
      'AI 취약 과목 진단 테스트 (필기 5개 과목 수준 측정)',
      '과목별 취약 단원 분석 리포트 제공',
      '취약 단원 집중 개념 및 이론 정리',
      '기출 문제 유형별 반복 풀이',
      '최신 기출 모의고사 및 실기 작업형 피드백',
    ],
    targetAudience: [
      '정보처리기사 첫 도전으로 어디서 시작해야 할지 모르는 분',
      '필기 합격 후 실기 작업형에서 막히는 분',
      '특정 과목에서 반복적으로 오답이 나오는 분',
      '단기간에 합격 점수를 달성해야 하는 분',
    ],
  },
  history: {
    title: '한국사능력검정',
    headLabel: 'History',
    subtitle: '국사편찬위원회 주관 국가공인자격',
    desc: '한국사능력검정시험은 공무원 시험·공기업 취업 등에 필수적인 국가공인자격입니다. 심화(1·2급)와 기본(3·4급) 과정으로 나뉘며, 시대별 취약 단원을 AI로 분석해 집중 학습합니다.',
    grades: ['심화 1·2급', '기본 3·4급'],
    learningSteps: [
      'AI 취약 시대·단원 진단 테스트',
      '시대별 취약 단원 분석 리포트 제공',
      '취약 시대·테마 집중 개념 정리',
      '사료 분석·유물 유형 반복 훈련',
      '최신 기출 모의고사 및 급수별 피드백',
    ],
    targetAudience: [
      '한국사능력검정 첫 도전으로 어디서 시작해야 할지 모르는 분',
      '기출을 여러 번 풀었지만 급수 상승이 안 되는 분',
      '특정 시대·단원에서 반복적으로 틀리는 분',
      '단기간에 심화 1급 합격을 달성해야 하는 분',
    ],
  },
}

// ── 교과목 과외 ──────────────────────────────────────────────
// learningSteps: 각 교과목별 고유한 5단계 학습 과정
export const subjectsPages = {
  english: {
    title: '영어',
    headLabel: 'English',
    desc: '중·고교 내신 및 수능 영어 전 영역(문법·독해·듣기·쓰기)에서 취약 유형을 분석하고 맞춤 집중 학습 루틴을 설계합니다.',
    topics: ['문법', '독해', '듣기', '어휘·쓰기', '수능 유형'],
    learningSteps: [
      '진단 평가로 취약 단원 및 유형 파악 (문법·독해·듣기 영역)',
      '영역별 취약 원인 분석 및 개념 재정립',
      '취약 유형 집중 문제 풀이',
      '오답 패턴 분석 및 반복 훈련',
      '내신·수능 실전 유형 문제 적용 연습',
    ],
  },
  math: {
    title: '수학',
    headLabel: 'Math',
    desc: '중·고교 수학에서 연산 오류부터 심화 응용까지 취약 단원을 정밀 진단하고 단원별 집중 문제 풀이로 완성도를 높입니다.',
    topics: ['수와 연산', '대수', '함수', '기하', '확률과 통계'],
    learningSteps: [
      '진단 평가로 취약 단원 및 연산 오류 파악',
      '단원별 개념 이해도 취약 원인 분석',
      '취약 단원 집중 문제 풀이',
      '오답 패턴 분석 및 반복 훈련',
      '내신·수능 심화 응용 문제 적용 연습',
    ],
  },
  science: {
    title: '과학',
    headLabel: 'Science',
    desc: '물리·화학·생물·지구과학 각 분야별 개념 이해도를 진단하고, 단원별 취약점 집중 보완 학습을 제공합니다.',
    topics: ['물리', '화학', '생물', '지구과학'],
    learningSteps: [
      '진단 평가로 취약 과목 및 개념 파악 (물·화·생·지)',
      '분야별 개념 이해도 취약 원인 분석',
      '취약 개념 집중 문제 풀이',
      '오답 패턴 분석 및 반복 훈련',
      '내신·수능 실전 문제 적용 연습',
    ],
  },
  korean: {
    title: '국어',
    headLabel: 'Korean',
    desc: '문학·비문학·화법과 작문·언어와 매체 전 영역에서 취약 유형을 분석하고 수능 대비 집중 학습 루틴을 제공합니다.',
    topics: ['문학', '비문학 독해', '화법과 작문', '언어와 매체'],
    learningSteps: [
      '진단 평가로 취약 영역 및 유형 파악 (문학·비문학·화작·언매)',
      '영역별 취약 원인 분석 및 개념 재정립',
      '취약 유형 집중 문제 풀이',
      '오답 패턴 분석 및 반복 훈련',
      '내신·수능 실전 유형 문제 적용 연습',
    ],
  },
}

// ── 교과목 — 과외 특징 (전 과목 공통) ───────────────────────
export const subjectFeatures = [
  {
    icon: '🎯',
    title: '취약점 정밀 진단',
    desc: 'AI 진단 테스트로 취약한 단원·유형을 빠르게 파악합니다',
  },
  {
    icon: '📊',
    title: '맞춤 학습 루틴',
    desc: '개인별 취약 패턴에 따른 최적화된 학습 계획을 제공합니다',
  },
  {
    icon: '🔄',
    title: '반복 훈련 시스템',
    desc: '취약 유형 집중 반복으로 완전 학습을 달성합니다',
  },
  {
    icon: '📈',
    title: '진도 추적 관리',
    desc: '주간 성취도 리포트로 학습 진도를 체계적으로 관리합니다',
  },
]

// ── AI 학습앱 — 핵심 기능 카드 ──────────────────────────────
export const aiAppFeatures = [
  {
    icon: '🔍',
    title: '취약점 정밀 분석',
    desc: '문제 풀이 데이터를 분석해 단원·유형·문항 수준별로 취약점을 정밀하게 파악합니다.',
  },
  {
    icon: '🗺️',
    title: '맞춤 학습 루틴 설계',
    desc: '취약점 분석 결과를 기반으로 목표 점수 달성까지 최단 경로의 학습 루틴을 자동 설계합니다.',
  },
  {
    icon: '📝',
    title: '취약점 집중 문제 제공',
    desc: 'AI가 취약 유형에 특화된 문제를 선별·생성하여 반복 훈련이 가능한 문제 세트를 제공합니다.',
  },
  {
    icon: '📊',
    title: '학습 진도 리포트',
    desc: '주간·월간 학습 성취도 리포트로 취약점 개선 현황과 목표 달성률을 한눈에 확인합니다.',
  },
  {
    icon: '🔔',
    title: '스마트 복습 알림',
    desc: '망각 곡선 기반으로 복습 타이밍을 자동 계산하여 최적의 시점에 알림을 보냅니다.',
  },
  {
    icon: '🎯',
    title: '목표 점수 시뮬레이션',
    desc: '현재 학습 속도와 취약점 개선 추이를 분석해 목표 시험일 예상 점수를 시뮬레이션합니다.',
  },
]

// ── AI 학습앱 — 지원 시험 목록 ──────────────────────────────
export const aiAppSupportedExams = [
  { label: 'IELTS', sub: 'Band 5~9' },
  { label: 'DELF A1·A2', sub: '프랑스어 입문·기초' },
  { label: 'DELF B1·B2', sub: '프랑스어 중급' },
  { label: 'DELF C1·C2', sub: '프랑스어 고급' },
  { label: '컴퓨터활용능력', sub: '1급·2급' },
  { label: '정보처리기사', sub: '필기·실기' },
  { label: '한국사능력검정', sub: '심화·기본' },
]

// ── 회사소개 — 서비스 소개 ──────────────────────────────────
export const aboutServices = [
  {
    icon: '🌐',
    title: '어학 — IELTS · DELF',
    desc: 'IELTS와 DELF A1~C2 전 레벨에 걸쳐 영역별 취약점 분석과 집중 학습 루틴을 제공합니다.',
    tags: ['IELTS', 'DELF A1-A2', 'DELF B1-B2', 'DELF C1-C2'],
  },
  {
    icon: '📋',
    title: '자격증 집중 학습',
    desc: '컴퓨터활용능력, 정보처리기사, 한국사능력검정 합격을 위한 단계별 취약점 집중 학습을 제공합니다.',
    tags: ['컴활 1·2급', '정보처리기사', '한능검 심화·기본'],
  },
  {
    icon: '📚',
    title: '교과목 과외',
    desc: '영어·수학·과학·국어 핵심 교과목에서 취약 단원을 집중 보완하는 맞춤 과외 서비스입니다.',
    tags: ['영어', '수학', '과학', '국어'],
  },
  {
    icon: '🤖',
    title: 'AI 취약점 분석 앱',
    desc: '학습 데이터를 AI로 분석해 취약점 리포트·맞춤 루틴·집중 문제를 자동 제공하는 앱입니다.',
    tags: ['취약점 분석', '맞춤 루틴', '집중 문제'],
  },
]

// ── 회사소개 — 연혁 ─────────────────────────────────────────
export const aboutHistory = [
  { year: '2026', event: 'AI 학습앱 v2.0 출시 — 취약점 리포트 고도화' },
  { year: '2025', event: 'DELF C1·C2 과정 및 정보처리기사 집중 과정 런칭' },
  { year: '2024', event: 'AI 기반 취약점 분석 엔진 자체 개발 · 특허 출원' },
  { year: '2023', event: '에듀포커스 설립 · IELTS·컴활·한능검 서비스 시작' },
]

// ── 이용약관 ─────────────────────────────────────────────────
// 구조: { ko: { lastUpdated, sections[] }, en: { ... } }
// 다국어 전환 시 컴포넌트에서 lang 파라미터로 ko/en 선택
export const termsContent = {
  ko: {
    lastUpdated: '2026년 1월 1일',
    sections: [
      {
        heading: '제1조 (목적)',
        body: '이 약관은 에듀포커스(이하 "회사")가 제공하는 온라인 교육 서비스(이하 "서비스")의 이용 조건 및 절차, 회사와 이용자의 권리·의무 및 책임 사항을 규정함을 목적으로 합니다.',
      },
      {
        heading: '제2조 (정의)',
        body: '"서비스"란 회사가 제공하는 AI 기반 취약점 분석, 학습 루틴 설계, 학습 동영상, 교과목 과외 등 일체의 학습 지원 서비스를 의미합니다. "이용자"란 본 약관에 동의하고 회사가 제공하는 서비스를 이용하는 자를 의미합니다.',
      },
      {
        heading: '제3조 (서비스의 제공 및 변경)',
        body: '회사는 연중무휴 24시간 서비스 제공을 원칙으로 하나, 시스템 점검·운영상의 사유로 서비스를 일시 중단할 수 있습니다. 서비스 내용이나 구성을 변경하는 경우 사전에 공지하며, 이용자는 변경 내용에 동의하지 않을 경우 서비스 이용을 중단할 수 있습니다.',
      },
      {
        heading: '제4조 (이용계약의 체결)',
        body: '이용계약은 이용자가 회원 가입 신청을 하고 회사가 이를 승낙함으로써 성립합니다. 회사는 다음 각 호에 해당하는 경우 신청을 거절할 수 있습니다. ① 허위 정보를 기재한 경우 ② 타인의 명의를 도용한 경우 ③ 기타 이용 신청 요건을 충족하지 못한 경우.',
      },
      {
        heading: '제5조 (이용자의 의무)',
        body: '이용자는 서비스 이용 시 다음 행위를 하여서는 안 됩니다. ① 타인의 개인정보 또는 결제 정보 도용 ② 서비스 내 콘텐츠의 무단 복제·배포 ③ 회사 또는 제3자의 지식재산권 침해 ④ 서비스의 정상적인 운영을 방해하는 행위.',
      },
      {
        heading: '제6조 (서비스 이용 제한)',
        body: '회사는 이용자가 본 약관의 의무를 위반하거나 서비스의 정상적인 운영을 방해하는 경우, 사전 통보 없이 서비스 이용을 제한하거나 이용계약을 해지할 수 있습니다.',
      },
      {
        heading: '제7조 (손해배상)',
        body: '회사의 귀책사유로 이용자에게 손해가 발생한 경우 회사는 관련 법령에 따라 배상 책임을 집니다. 단, 이용자의 귀책사유로 인한 손해에 대해서는 이용자가 책임을 부담합니다.',
      },
      {
        heading: '제8조 (면책조항)',
        body: '회사는 천재지변·전쟁 등 불가항력 사유로 서비스를 제공하지 못한 경우 면책됩니다. 이용자가 직접 게재한 정보의 신뢰성·정확성에 관해 회사는 별도의 책임을 지지 않습니다.',
      },
      {
        heading: '부칙',
        body: '이 약관은 2026년 1월 1일부터 시행합니다.',
      },
    ],
  },
  en: {
    lastUpdated: 'January 1, 2026',
    sections: [
      {
        heading: 'Section 1: Purpose',
        body: 'These Terms of Service govern your use of EDUFOCUS educational services and platform. By accessing or using our services, you agree to be bound by these terms and all applicable laws and regulations.',
      },
      {
        heading: 'Section 2: Services',
        body: 'EDUFOCUS provides AI-powered learning analytics, customized study routines, video-based learning content, and subject tutoring services. The company reserves the right to modify or discontinue any service feature with prior notice.',
      },
      {
        heading: 'Section 3: User Account',
        body: 'Users must provide accurate and complete information when registering. You are responsible for maintaining the confidentiality of your account credentials. EDUFOCUS reserves the right to suspend accounts found in violation of these terms.',
      },
      {
        heading: 'Section 4: User Obligations',
        body: 'Users agree not to: misuse or misrepresent personal information; reproduce or distribute platform content without authorization; infringe upon intellectual property rights; or engage in any activity that disrupts normal service operations.',
      },
      {
        heading: 'Section 5: Limitation of Liability',
        body: 'EDUFOCUS shall not be liable for indirect, incidental, or consequential damages arising from service use. In no event shall our liability exceed the fees paid by the user in the preceding three months.',
      },
      {
        heading: 'Section 6: Governing Law',
        body: 'These terms shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms will be resolved through appropriate legal channels in the relevant jurisdiction.',
      },
      {
        heading: 'Addendum',
        body: 'These Terms of Service are effective as of January 1, 2026.',
      },
    ],
  },
}

// ── 개인정보처리방침 ──────────────────────────────────────────
// 구조: { ko: { lastUpdated, sections[] }, en: { ... } }
// EN 버전: PIPEDA(캐나다) 및 글로벌 서비스 표준 기반 플레이스홀더
export const privacyContent = {
  ko: {
    lastUpdated: '2026년 1월 1일',
    sections: [
      {
        heading: '제1조 (수집하는 개인정보의 항목)',
        body: '회사는 서비스 제공을 위해 다음의 개인정보를 수집합니다. [필수] 이름, 이메일 주소, 학습 진도 데이터. [선택] 연락처, 학습 목표, 응시 예정 시험 정보. 서비스 이용 과정에서 IP 주소, 쿠키, 접속 로그 등이 자동으로 수집될 수 있습니다.',
      },
      {
        heading: '제2조 (개인정보의 수집 및 이용 목적)',
        body: '수집된 개인정보는 다음 목적으로만 활용됩니다. ① 서비스 제공 및 AI 취약점 분석 기능 운영 ② 맞춤 학습 루틴 설계 및 진도 리포트 생성 ③ 공지사항 전달 및 고객 지원 ④ 서비스 품질 개선을 위한 통계 분석 (개인 식별 불가 형태).',
      },
      {
        heading: '제3조 (개인정보의 보유 및 이용 기간)',
        body: '회사는 원칙적으로 개인정보의 수집 및 이용 목적이 달성되면 지체 없이 파기합니다. 단, 관련 법령(전자상거래 등에서의 소비자보호에 관한 법률 등)에 의해 보관이 필요한 정보는 해당 규정에 따라 보유합니다.',
      },
      {
        heading: '제4조 (개인정보의 파기 절차 및 방법)',
        body: '이용 목적이 달성된 후 별도 데이터베이스로 이관하여 보관하다 법령에 따라 파기합니다. 전자적 파일은 복구 불가능한 기술적 방법으로 완전 삭제하며, 종이 문서는 분쇄 또는 소각하여 파기합니다.',
      },
      {
        heading: '제5조 (이용자 및 법정대리인의 권리와 행사 방법)',
        body: '이용자는 언제든지 자신의 개인정보를 열람·수정·삭제하고 처리 정지를 요청할 수 있습니다. 만 14세 미만 아동의 경우 법정대리인이 이 권리를 행사할 수 있습니다. 요청은 고객센터(문의하기)를 통해 접수됩니다.',
      },
      {
        heading: '제6조 (개인정보의 안전성 확보 조치)',
        body: '회사는 개인정보보호를 위해 다음 조치를 시행합니다. ① SSL 암호화 전송 적용 ② 개인정보 접근 권한 최소화 및 관리 ③ 정기적인 보안 취약점 점검 및 업데이트.',
      },
      {
        heading: '제7조 (개인정보 보호책임자)',
        body: '회사는 개인정보 처리에 관한 업무를 총괄하는 개인정보 보호책임자를 지정하고 있습니다. 개인정보 관련 문의·불만·피해 구제는 고객센터(문의하기 페이지)를 통해 접수할 수 있습니다.',
      },
      {
        heading: '부칙',
        body: '이 방침은 2026년 1월 1일부터 시행합니다. 방침이 변경될 경우 시행 7일 전에 공지사항을 통해 고지합니다.',
      },
    ],
  },
  en: {
    lastUpdated: 'January 1, 2026',
    sections: [
      {
        heading: 'Section 1: Collection of Personal Information',
        body: 'EDUFOCUS collects personal information including name, email address, and learning analytics data to provide our AI-powered educational services. This Privacy Policy complies with global and Canadian privacy standards, including the Personal Information Protection and Electronic Documents Act (PIPEDA) and applicable international data protection regulations.',
      },
      {
        heading: 'Section 2: Purpose of Collection and Use',
        body: 'We collect and use personal information solely to: provide personalized AI-driven learning analytics and weak-point diagnosis; design customized study routines; generate learning progress reports; deliver service announcements and customer support; and improve service quality through anonymized statistical analysis.',
      },
      {
        heading: 'Section 3: Retention and Disposal',
        body: 'Personal information is retained only as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law. Upon request or account deletion, data will be securely disposed of using industry-standard irreversible deletion methods.',
      },
      {
        heading: 'Section 4: User Rights',
        body: 'Under PIPEDA and applicable global privacy standards, you have the right to: access your personal information held by EDUFOCUS; correct inaccurate or incomplete information; withdraw consent for non-essential data processing; and request deletion of your personal data. Requests can be submitted through our Support page and will be addressed within 10 business days.',
      },
      {
        heading: 'Section 5: Security Measures',
        body: 'EDUFOCUS employs industry-standard security measures to protect your personal information, including SSL-encrypted data transmission, role-based access controls, and regular security audits. We are committed to maintaining the confidentiality and integrity of all data entrusted to us.',
      },
      {
        heading: 'Section 6: Cross-Border Data Transfers',
        body: 'If personal information is transferred outside your jurisdiction, EDUFOCUS ensures that appropriate safeguards are in place, consistent with PIPEDA requirements and applicable international privacy frameworks, to protect your information to a standard equivalent to that in your home jurisdiction.',
      },
      {
        heading: 'Section 7: Privacy Officer',
        body: 'EDUFOCUS has designated a Privacy Officer responsible for overseeing compliance with this policy and applicable privacy legislation. For privacy-related inquiries, corrections, or complaints, please contact us via our Support page. We are committed to resolving privacy concerns promptly and transparently.',
      },
      {
        heading: 'Addendum',
        body: 'This Privacy Policy is effective as of January 1, 2026. We will notify users of any material changes at least 7 days before they take effect.',
      },
    ],
  },
}

// ── 유튜브 영상 ──────────────────────────────────────────────
// id: 실제 YouTube 영상 ID로 교체 (PLACEHOLDER_주제_번호 형식)
export const videoTopics = [
  {
    key: 'ielts',
    label: 'IELTS',
    to: '/videos/ielts',
    videos: [
      { id: 'PLACEHOLDER_IELTS_01', title: 'IELTS Listening 고득점 전략 A' },
      { id: 'PLACEHOLDER_IELTS_02', title: 'IELTS Reading 시간 관리 비법' },
      { id: 'PLACEHOLDER_IELTS_03', title: 'IELTS Writing Task 2 고득점 루틴' },
      { id: 'PLACEHOLDER_IELTS_04', title: 'IELTS Speaking Band 7+ 달성법' },
      { id: 'PLACEHOLDER_IELTS_05', title: 'IELTS 취약 유형 집중 공략 (Listening)' },
      { id: 'PLACEHOLDER_IELTS_06', title: 'IELTS Academic vs General 차이점 총정리' },
      { id: 'PLACEHOLDER_IELTS_07', title: 'IELTS Writing Task 1 그래프 묘사 완성' },
      { id: 'PLACEHOLDER_IELTS_08', title: 'IELTS Reading True/False/NG 공략법' },
      { id: 'PLACEHOLDER_IELTS_09', title: 'IELTS 단기 점수 향상 집중 루틴' },
      { id: 'PLACEHOLDER_IELTS_10', title: 'IELTS Speaking 실전 모의 테스트' },
      { id: 'PLACEHOLDER_IELTS_11', title: 'IELTS 취약점 분석 — AI 앱 활용법' },
      { id: 'PLACEHOLDER_IELTS_12', title: 'IELTS 최신 기출 경향 분석 2026' },
    ],
  },
  {
    key: 'delf',
    label: 'DELF',
    to: '/videos/delf',
    videos: [
      { id: 'PLACEHOLDER_DELF_01', title: 'DELF A2 Production orale 합격 전략' },
      { id: 'PLACEHOLDER_DELF_02', title: 'DELF B1 Compréhension écrite 완전 정복' },
      { id: 'PLACEHOLDER_DELF_03', title: 'DELF B2 Production écrite 고득점 루틴' },
      { id: 'PLACEHOLDER_DELF_04', title: 'DELF C1 취약 영역 집중 공략법' },
      { id: 'PLACEHOLDER_DELF_05', title: 'DELF 프랑스어 어휘 집중 암기법' },
      { id: 'PLACEHOLDER_DELF_06', title: 'DELF 시험 구성과 채점 기준 총정리' },
      { id: 'PLACEHOLDER_DELF_07', title: 'DELF A1 기초 회화 집중 훈련' },
      { id: 'PLACEHOLDER_DELF_08', title: 'DELF B1 듣기 취약 유형 공략' },
      { id: 'PLACEHOLDER_DELF_09', title: 'DELF B2 구술 시험 실전 연습' },
      { id: 'PLACEHOLDER_DELF_10', title: 'DELF C2 최고 난이도 대비 전략' },
      { id: 'PLACEHOLDER_DELF_11', title: 'DELF 취약점 AI 분석 활용 사례' },
      { id: 'PLACEHOLDER_DELF_12', title: 'DELF 2026 출제 경향 분석' },
    ],
  },
  {
    key: 'computer',
    label: '컴퓨터활용능력',
    to: '/videos/computer',
    videos: [
      { id: 'PLACEHOLDER_COMP_01', title: '컴활 1급 엑셀 함수 집중 정리 A' },
      { id: 'PLACEHOLDER_COMP_02', title: '컴활 1급 엑셀 매크로·VBA 핵심' },
      { id: 'PLACEHOLDER_COMP_03', title: '컴활 1급 액세스 DB 설계 완성' },
      { id: 'PLACEHOLDER_COMP_04', title: '컴활 2급 스프레드시트 집중 특강' },
      { id: 'PLACEHOLDER_COMP_05', title: '컴활 필기 기출 취약 유형 분석' },
      { id: 'PLACEHOLDER_COMP_06', title: '컴활 실기 시험 시간 관리 전략' },
      { id: 'PLACEHOLDER_COMP_07', title: '컴활 1급 함수 집중 정리 B (통계·텍스트)' },
      { id: 'PLACEHOLDER_COMP_08', title: '컴활 1급 차트 작성 완전 정복' },
      { id: 'PLACEHOLDER_COMP_09', title: '컴활 2급 실기 최빈 오류 정리' },
      { id: 'PLACEHOLDER_COMP_10', title: '컴활 취약점 AI 분석 활용법' },
      { id: 'PLACEHOLDER_COMP_11', title: '컴활 1급 쿼리 작성 집중 훈련' },
      { id: 'PLACEHOLDER_COMP_12', title: '컴활 최신 기출 복원 풀이 2026' },
    ],
  },
  {
    key: 'it',
    label: '정보처리기사',
    to: '/videos/it',
    videos: [
      { id: 'PLACEHOLDER_IT_01', title: '정처기 필기 1과목 소프트웨어 설계' },
      { id: 'PLACEHOLDER_IT_02', title: '정처기 필기 2과목 소프트웨어 개발' },
      { id: 'PLACEHOLDER_IT_03', title: '정처기 필기 3과목 데이터베이스 구축' },
      { id: 'PLACEHOLDER_IT_04', title: '정처기 필기 4과목 프로그래밍 언어' },
      { id: 'PLACEHOLDER_IT_05', title: '정처기 필기 5과목 정보시스템 구축 관리' },
      { id: 'PLACEHOLDER_IT_06', title: '정처기 실기 작업형 집중 대비' },
      { id: 'PLACEHOLDER_IT_07', title: '정처기 취약 알고리즘 집중 정리' },
      { id: 'PLACEHOLDER_IT_08', title: '정처기 SQL 핵심 쿼리 완성' },
      { id: 'PLACEHOLDER_IT_09', title: '정처기 필기 단기 완성 전략' },
      { id: 'PLACEHOLDER_IT_10', title: '정처기 취약점 AI 분석 활용 사례' },
      { id: 'PLACEHOLDER_IT_11', title: '정처기 실기 서술형 답안 작성법' },
      { id: 'PLACEHOLDER_IT_12', title: '정처기 최신 기출 경향 분석 2026' },
    ],
  },
  {
    key: 'history',
    label: '한국사능력검정',
    to: '/videos/history',
    videos: [
      { id: 'PLACEHOLDER_HIST_01', title: '한능검 심화 선사~삼국 핵심 정리' },
      { id: 'PLACEHOLDER_HIST_02', title: '한능검 심화 고려~조선 취약 포인트' },
      { id: 'PLACEHOLDER_HIST_03', title: '한능검 심화 근현대사 집중 공략' },
      { id: 'PLACEHOLDER_HIST_04', title: '한능검 기본 3·4급 단기 합격 전략' },
      { id: 'PLACEHOLDER_HIST_05', title: '한능검 사료 분석 유형 완전 정복' },
      { id: 'PLACEHOLDER_HIST_06', title: '한능검 취약 단원 AI 분석 활용법' },
      { id: 'PLACEHOLDER_HIST_07', title: '한능검 심화 문화사 핵심 정리' },
      { id: 'PLACEHOLDER_HIST_08', title: '한능검 연표 암기 핵심 테크닉' },
      { id: 'PLACEHOLDER_HIST_09', title: '한능검 지도·유물 유형 집중 공략' },
      { id: 'PLACEHOLDER_HIST_10', title: '한능검 최빈 오답 TOP 20 분석' },
      { id: 'PLACEHOLDER_HIST_11', title: '한능검 최신 기출 복원 풀이 2026' },
      { id: 'PLACEHOLDER_HIST_12', title: '한능검 심화 50일 완성 루틴 공개' },
    ],
  },
  {
    key: 'ai-app',
    label: 'AI앱 활용',
    to: '/videos/ai-app',
    videos: [
      { id: 'PLACEHOLDER_AI_01', title: 'AI 취약점 분석 앱 기본 사용법' },
      { id: 'PLACEHOLDER_AI_02', title: 'AI 학습 루틴 설계 — IELTS 편' },
      { id: 'PLACEHOLDER_AI_03', title: 'AI 학습 루틴 설계 — 자격증 편' },
      { id: 'PLACEHOLDER_AI_04', title: 'AI 취약점 리포트 해석하는 법' },
      { id: 'PLACEHOLDER_AI_05', title: 'AI 맞춤 문제 생성 기능 활용법' },
      { id: 'PLACEHOLDER_AI_06', title: 'AI 앱으로 자기주도학습 루틴 만들기' },
      { id: 'PLACEHOLDER_AI_07', title: 'AI 오답 노트 자동 생성 기능' },
      { id: 'PLACEHOLDER_AI_08', title: 'AI 앱 주간 학습 목표 설정법' },
      { id: 'PLACEHOLDER_AI_09', title: 'AI 취약점 집중 문제 추천 알고리즘' },
      { id: 'PLACEHOLDER_AI_10', title: 'AI 앱 활용 30일 합격 챌린지' },
      { id: 'PLACEHOLDER_AI_11', title: 'AI 앱 v2.0 신기능 완전 소개' },
      { id: 'PLACEHOLDER_AI_12', title: 'AI 기반 자기주도학습 성공 사례 모음' },
    ],
  },
]
