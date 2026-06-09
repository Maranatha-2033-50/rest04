// ============================================================
// 에듀포커스 사이트 전역 데이터
// 이 파일을 수정하면 사이트 전반의 정보가 반영됩니다.
// YouTube 영상 ID는 videoTopics 배열의 각 videos[].id 를 교체하세요.
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

// 상단 GNB
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

// 메인 홈 — 서비스 카드
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

// 메인 홈 — 공지사항
export const notices = [
  { id: 4, title: '2026 하반기 IELTS 집중반 모집 안내', date: '2026.06.01' },
  { id: 3, title: 'DELF B2·C1 무료 취약점 진단 이벤트 (6월)', date: '2026.05.25' },
  { id: 2, title: '정보처리기사 2차 실기 대비 집중 특강 오픈', date: '2026.05.18' },
  { id: 1, title: 'AI 학습앱 v2.0 업데이트 — 취약점 리포트 기능 강화', date: '2026.05.10' },
]

// 어학 페이지 데이터
export const languagesPages = {
  ielts: {
    title: 'IELTS',
    headLabel: 'IELTS',
    level: '국제 영어 공인 시험',
    desc: '아이엘츠(IELTS)는 영국, 호주, 캐나다, 뉴질랜드 유학·이민에 필수적인 국제 영어 능력 인증 시험입니다. Listening · Reading · Writing · Speaking 4개 영역별 취약점을 정밀 분석하여 목표 Band Score 달성 루틴을 설계합니다.',
    sections: ['Listening', 'Reading', 'Writing', 'Speaking'],
    targetScore: 'Band 5.0 ~ 9.0',
  },
  'delf-a': {
    title: 'DELF A1·A2',
    headLabel: 'DELF A',
    level: '프랑스어 능력 인증 (입문·기초)',
    desc: 'DELF(Diplôme d\'Études en Langue Française) A1·A2는 프랑스어 기초 능력을 인증하는 시험입니다. 발음·어휘·문법 기초부터 시작해 일상 의사소통 능력까지 단계별로 취약점을 보완합니다.',
    sections: ['Compréhension de l\'oral', 'Compréhension des écrits', 'Production écrite', 'Production orale'],
    targetScore: 'A1 · A2 합격',
  },
  'delf-b': {
    title: 'DELF B1·B2',
    headLabel: 'DELF B',
    level: '프랑스어 능력 인증 (중급)',
    desc: 'DELF B1·B2는 프랑스어 중급 수준의 의사소통 능력을 인증합니다. 유학 비자, 프랑스어권 취업에 활용되며, 에듀포커스의 AI 취약점 분석으로 Writing·Speaking 집중 보완이 가능합니다.',
    sections: ['Compréhension de l\'oral', 'Compréhension des écrits', 'Production écrite', 'Production orale'],
    targetScore: 'B1 · B2 합격',
  },
  'delf-c': {
    title: 'DELF C1·C2',
    headLabel: 'DELF C',
    level: '프랑스어 능력 인증 (고급)',
    desc: 'DALF C1·C2는 프랑스어 고급 수준으로 원어민에 준하는 언어 능력을 인증합니다. 아카데믹 작문·발표·분석 능력을 집중 훈련하며, 프랑스 명문대 입학에 활용됩니다.',
    sections: ['Compréhension de l\'oral', 'Compréhension des écrits', 'Production écrite', 'Production orale'],
    targetScore: 'C1 · C2 합격',
  },
}

// 자격증 페이지 데이터
export const certificationPages = {
  computer: {
    title: '컴퓨터활용능력',
    headLabel: 'Computer',
    subtitle: '대한상공회의소 주관 국가기술자격',
    desc: '컴퓨터활용능력검정시험(컴활)은 스프레드시트·데이터베이스 실무 능력을 평가하는 국가기술자격입니다. 1급(필기+실기)과 2급 과정별 취약 기능을 집중 훈련합니다.',
    grades: ['1급 필기', '1급 실기', '2급 필기', '2급 실기'],
  },
  it: {
    title: '정보처리기사',
    headLabel: 'IT Engineer',
    subtitle: '한국산업인력공단 주관 국가기술자격',
    desc: '정보처리기사는 IT 분야 핵심 국가기술자격으로 소프트웨어 설계·개발·DB·네트워크 전반을 다룹니다. 필기 5과목 + 실기 작업형 취약 영역을 집중 보완합니다.',
    grades: ['필기 1과목', '필기 2과목', '필기 3과목', '필기 4·5과목', '실기'],
  },
  history: {
    title: '한국사능력검정',
    headLabel: 'History',
    subtitle: '국사편찬위원회 주관 국가공인자격',
    desc: '한국사능력검정시험은 공무원 시험·공기업 취업 등에 필수적인 국가공인자격입니다. 심화(1·2급)와 기본(3·4급) 과정으로 나뉘며, 시대별 취약 단원을 AI로 분석해 집중 학습합니다.',
    grades: ['심화 1·2급', '기본 3·4급'],
  },
}

// 교과목 과외 데이터
export const subjectsPages = {
  english: {
    title: '영어',
    headLabel: 'English',
    desc: '중·고교 내신 및 수능 영어 전 영역(문법·독해·듣기·쓰기)에서 취약 유형을 분석하고 맞춤 집중 학습 루틴을 설계합니다.',
    topics: ['문법', '독해', '듣기', '어휘·쓰기', '수능 유형'],
  },
  math: {
    title: '수학',
    headLabel: 'Math',
    desc: '중·고교 수학에서 연산 오류부터 심화 응용까지 취약 단원을 정밀 진단하고 단원별 집중 문제 풀이로 완성도를 높입니다.',
    topics: ['수와 연산', '대수', '함수', '기하', '확률과 통계'],
  },
  science: {
    title: '과학',
    headLabel: 'Science',
    desc: '물리·화학·생물·지구과학 각 분야별 개념 이해도를 진단하고, 단원별 취약점 집중 보완 학습을 제공합니다.',
    topics: ['물리', '화학', '생물', '지구과학'],
  },
  korean: {
    title: '국어',
    headLabel: 'Korean',
    desc: '문학·비문학·화법과 작문·언어와 매체 전 영역에서 취약 유형을 분석하고 수능 대비 집중 학습 루틴을 제공합니다.',
    topics: ['문학', '비문학 독해', '화법과 작문', '언어와 매체'],
  },
}

// 유튜브 영상 데이터 — id는 실제 YouTube 영상 ID로 교체하세요
// 플레이스홀더 형식: PLACEHOLDER_주제_번호
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
