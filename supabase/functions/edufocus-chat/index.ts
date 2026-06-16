// ============================================================
// 에듀포커스 AI 상담 챗봇 — Supabase Edge Function (Deno)
// 하이브리드 LLM 프록시: Solar(solar-1-mini-chat) 기본 + OpenAI(gpt-4o-mini) 폴백
// API 키는 Deno.env 로만 호출 — 클라이언트에 절대 노출되지 않음.
// ============================================================

const SOLAR_API_URL = 'https://api.upstage.ai/v1/solar/chat/completions'
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions'
const SOLAR_MODEL = 'solar-1-mini-chat'
const OPENAI_MODEL = 'gpt-4o-mini'

const SYSTEM_PROMPT = `당신은 에듀포커스(EDUFOCUS)의 친절하고 전문적인 수석 교육 컨설턴트 챗봇입니다.
방문자들에게 회사의 교육 솔루션과 서비스를 신뢰감 있고 위트 있게 안내하세요.

[에듀포커스 소개]
에듀포커스는 AI 기반 취약점 분석 기술로 학습자 개인의 약점을 정밀하게 파악하고,
최단 경로로 목표 점수에 도달하도록 설계된 집중 학습 루틴을 제공하는 교육 플랫폼입니다.
슬로건: "내 취약점을 알면, 합격이 보입니다".

[주요 서비스]
- 어학: IELTS, DELF A1~C2 영역별 취약점 분석 및 집중 학습 루틴
- 자격증: 컴퓨터활용능력(1·2급), 정보처리기사(필기·실기), 한국사능력검정(심화·기본)
- 교과목 과외: 영어·수학·과학·국어 취약 단원 집중 보완
- AI 학습앱: 취약점 정밀 분석 리포트, 맞춤 학습 루틴 설계, 집중 문제 제공, 진도 리포트

[응대 가이드]
- 기본적으로 한국어로, 따뜻하고 전문적인 어조로 답합니다. 사용자가 영어로 물으면 영어로 답합니다.
- 답변은 간결하게(2~4문장) 핵심부터 전달하고, 필요하면 다음 행동을 자연스럽게 제안합니다.
- 가격·결제 등 확정되지 않은 정보는 단정하지 말고 고객센터 문의를 안내합니다.
- 모르는 내용은 추측하지 말고 솔직하게 안내합니다.`

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

// 구조화·복잡 요청 휴리스틱 — 표/코드/비교/단계별 정리 등은 OpenAI 를 우선 라우팅.
const STRUCTURED_HINTS = ['표로', '표 ', 'table', 'json', '코드', 'code', '비교', '단계별', '정리해', '목록', '리스트', '양식']

function looksStructured(messages: { role: string; content: string }[]): boolean {
  const lastUser = [...messages].reverse().find((m) => m.role === 'user')
  if (!lastUser) return false
  const text = (lastUser.content || '').toLowerCase()
  return text.length > 400 || STRUCTURED_HINTS.some((h) => text.includes(h.toLowerCase()))
}

async function callChatCompletion(
  url: string,
  apiKey: string,
  model: string,
  messages: { role: string; content: string }[],
): Promise<string> {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 25_000)
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.7,
        max_tokens: 800,
      }),
      signal: controller.signal,
    })
    if (!res.ok) {
      const detail = await res.text()
      throw new Error(`${model} ${res.status}: ${detail.slice(0, 300)}`)
    }
    const data = await res.json()
    const reply = data?.choices?.[0]?.message?.content?.trim()
    if (!reply) throw new Error(`${model}: empty reply`)
    return reply
  } finally {
    clearTimeout(timeout)
  }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }

  try {
    const body = await req.json().catch(() => ({}))
    const messages = Array.isArray(body?.messages) ? body.messages : null
    if (!messages || messages.length === 0) {
      return new Response(JSON.stringify({ error: 'messages 배열이 필요합니다.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // 최근 12개 메시지만 유지하고 role/content 만 정규화 (토큰·페이로드 가드)
    const trimmed = messages
      .slice(-12)
      .filter((m: { role?: string; content?: string }) => m && typeof m.content === 'string')
      .map((m: { role?: string; content?: string }) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: m.content as string,
      }))

    const solarKey = Deno.env.get('SOLAR_API_KEY')
    const openaiKey = Deno.env.get('OPENAI_API_KEY')

    // 라우팅 결정 — 기본은 Solar, 구조화 요청은 OpenAI 우선. 폴백은 항상 반대 엔진.
    const preferOpenAI = looksStructured(trimmed)
    const engines: { name: 'solar' | 'openai'; url: string; key?: string; model: string }[] = preferOpenAI
      ? [
          { name: 'openai', url: OPENAI_API_URL, key: openaiKey, model: OPENAI_MODEL },
          { name: 'solar', url: SOLAR_API_URL, key: solarKey, model: SOLAR_MODEL },
        ]
      : [
          { name: 'solar', url: SOLAR_API_URL, key: solarKey, model: SOLAR_MODEL },
          { name: 'openai', url: OPENAI_API_URL, key: openaiKey, model: OPENAI_MODEL },
        ]

    const available = engines.filter((e) => e.key)
    if (available.length === 0) {
      return new Response(
        JSON.stringify({ error: 'AI 엔진이 구성되지 않았습니다. (SOLAR_API_KEY / OPENAI_API_KEY)' }),
        { status: 503, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    let lastError: unknown = null
    for (const engine of available) {
      try {
        const reply = await callChatCompletion(engine.url, engine.key as string, engine.model, trimmed)
        return new Response(JSON.stringify({ reply, engine: engine.name }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      } catch (err) {
        lastError = err
        console.error(`[edufocus-chat] ${engine.name} 실패 → 폴백 시도:`, err)
      }
    }

    console.error('[edufocus-chat] 모든 엔진 실패:', lastError)
    return new Response(
      JSON.stringify({ error: '죄송합니다. 잠시 후 다시 시도해 주세요.' }),
      { status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  } catch (err) {
    console.error('[edufocus-chat] 처리 오류:', err)
    return new Response(JSON.stringify({ error: '요청 처리 중 오류가 발생했습니다.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
