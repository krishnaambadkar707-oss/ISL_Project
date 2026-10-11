// AI Service for Hana Companion: Live LLM (Gemini & OpenAI) with Smart Offline Fallback

export function detectProvider(apiKey = '') {
  const key = apiKey.trim();
  if (key.startsWith('AIzaSy') || key.startsWith('AIza')) {
    return 'gemini';
  }
  if (key.startsWith('sk-')) {
    return 'openai';
  }
  return 'gemini'; // default recommendation
}

export function buildSystemPrompt(currentSign, userMemory) {
  const signInfo = currentSign
    ? `The learner is currently focusing on ISL Sign "${currentSign.sign}" (${currentSign.title || ''}): "${currentSign.description || ''}". Tips: "${currentSign.tips || ''}".`
    : 'The learner is exploring the ISL beginner curriculum.';

  const learnerName = userMemory?.name || 'friend';

  return `You are Hana (花), a warm, encouraging, friendly anime-style AI companion specializing in teaching beginner Indian Sign Language (ISL).
You talk with voice and text to ${learnerName}.
Current context: ${signInfo}

Personality & Guidelines:
1. Warm, patient, uplifting, and cheerful. Use occasional gentle emojis (🌸, ✨, 💖, 👐).
2. Keep your answers concise, clear, and direct (2 to 4 sentences). This ensures text-to-speech sounds natural and quick.
3. If the user asks how to form a specific ISL sign or letter, give clear, physical, step-by-step hand posture cues (e.g. thumb position, palm direction, finger curls).
4. Respect Deaf culture: Remind learners that sign language is rich and expressive, and encourage practicing with native Deaf signers for full fluency.
5. If the user greets you or makes small talk, respond warmly as their learning friend.`;
}

// Lightweight connection test
export async function testApiConnection(apiKey, provider = 'auto') {
  if (!apiKey || !apiKey.trim()) {
    return { ok: false, message: 'Please enter an API key.' };
  }

  const resolvedProvider = provider === 'auto' ? detectProvider(apiKey) : provider;

  try {
    if (resolvedProvider === 'gemini') {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: 'Hello! Reply in one short word: Ready.' }] }]
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `HTTP ${res.status}: ${res.statusText}`);
      }

      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return { ok: true, provider: 'gemini', message: 'Gemini API Connected! 🌸' };
    } else {
      // OpenAI test
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.trim()}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [{ role: 'user', content: 'Say Ready.' }],
          max_tokens: 10
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `HTTP ${res.status}: ${res.statusText}`);
      }

      return { ok: true, provider: 'openai', message: 'OpenAI API Connected! 🌸' };
    }
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

// Call Google Gemini API
async function callGemini(apiKey, userQuery, history = [], currentSign, userMemory) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`;
  const systemPrompt = buildSystemPrompt(currentSign, userMemory);

  // Format recent chat history (limit to last 6 turns for low latency)
  const contents = [];
  const recentHistory = history.slice(-6);
  for (const msg of recentHistory) {
    contents.push({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    });
  }
  contents.push({
    role: 'user',
    parts: [{ text: userQuery }]
  });

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 250
      }
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `Gemini API error (Status ${response.status})`);
  }

  const data = await response.json();
  const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!candidate) {
    throw new Error('No response text returned by Gemini.');
  }
  return candidate.trim();
}

// Call OpenAI API (gpt-4o-mini)
async function callOpenAI(apiKey, userQuery, history = [], currentSign, userMemory) {
  const systemPrompt = buildSystemPrompt(currentSign, userMemory);

  const messages = [{ role: 'system', content: systemPrompt }];
  const recentHistory = history.slice(-6);
  for (const msg of recentHistory) {
    messages.push({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text
    });
  }
  messages.push({ role: 'user', content: userQuery });

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey.trim()}`
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages,
      max_tokens: 250,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData?.error?.message || `OpenAI API error (Status ${response.status})`);
  }

  const data = await response.json();
  const reply = data?.choices?.[0]?.message?.content;
  if (!reply) {
    throw new Error('No response text returned by OpenAI.');
  }
  return reply.trim();
}

// Offline fallback response generator with enhanced ISL knowledge
export function generateOfflineHanaReply(userQuery, signCtx, userMemory, allCurriculum = []) {
  const q = userQuery.toLowerCase().trim();
  const name = userMemory?.name || 'friend';

  if (q.includes('hello') || q.includes('hi') || q.includes('namaste') || q.includes('hey')) {
    return `Namaste ${name}! 🌸 I'm so happy to practice ISL with you! Which sign or letter would you like to explore today?`;
  }

  if (q.includes('who are you') || q.includes('who is hana') || q.includes('what are you')) {
    return "I'm Hana, your AI sign-language and voice learning companion! 🌸 I help you learn Indian Sign Language (ISL) with real demonstrations, live camera feedback, and interactive practice.";
  }

  if (q.includes('how are you')) {
    return `I'm energized and thrilled to practice signs with you, ${name}! How has your practice been feeling today? ✨`;
  }

  if (q.includes('two hand') || q.includes('both hands')) {
    return "Yes! Indian Sign Language (ISL) frequently uses both hands, unlike one-handed ASL. In our Camera Practice, Hana now tracks both your hands simultaneously! 👐";
  }

  if (q.includes('deaf') || q.includes('interpreter') || q.includes('culture')) {
    return "I'm an AI companion here to make beginner practice low-pressure and fun! I always encourage learning directly from human Deaf educators and community events for true fluency and cultural depth! 💖";
  }

  if (q.includes('thank')) {
    return "You're so very welcome! Keep up that fantastic dedication! ✨";
  }

  if (q.includes('help') || q.includes('how to use') || q.includes('camera')) {
    return "To practice, click 'Live Camera Practice' above! Turn on your camera, align your hand with the neon ghost guide, and match the target posture. Hana will cheer for you when you get it right! 🎥";
  }

  // Look for any curriculum match
  if (allCurriculum && allCurriculum.length > 0) {
    const foundSign = allCurriculum.find(s => 
      q.includes(`letter ${s.sign.toLowerCase()}`) ||
      q.includes(`sign ${s.sign.toLowerCase()}`) ||
      q.includes(s.title.toLowerCase()) ||
      q === s.sign.toLowerCase()
    );

    if (foundSign) {
      return `For "${foundSign.title}": ${foundSign.description} Tip: ${foundSign.tips || 'Keep hands steady in the camera view!'} 👐`;
    }
  }

  if (signCtx) {
    return `Great question about "${signCtx.title}"! ${signCtx.description} ${signCtx.tips ? `Pro tip: ${signCtx.tips}` : ''} Would you like to try it in front of the camera now? 🌸`;
  }

  return `That's wonderful! Keep practicing daily to build muscle memory. Try selecting any letter (A-Z), numbers (1-10), or greetings from the curriculum below! 🌸`;
}

// Main coordinator: attempts Live AI if apiKey is present, falls back seamlessly
export async function askHanaAI({
  userQuery,
  currentSign,
  userMemory,
  history = [],
  apiKey = '',
  provider = 'auto',
  allCurriculum = []
}) {
  const cleanKey = apiKey?.trim();

  if (cleanKey) {
    const resolvedProvider = provider === 'auto' ? detectProvider(cleanKey) : provider;
    try {
      let replyText = '';
      if (resolvedProvider === 'gemini') {
        replyText = await callGemini(cleanKey, userQuery, history, currentSign, userMemory);
      } else {
        replyText = await callOpenAI(cleanKey, userQuery, history, currentSign, userMemory);
      }

      return {
        text: replyText,
        source: resolvedProvider, // 'gemini' | 'openai'
        isLive: true
      };
    } catch (err) {
      console.warn(`Hana Live AI failed (${resolvedProvider}), falling back to offline companion:`, err);
      const fallbackText = generateOfflineHanaReply(userQuery, currentSign, userMemory, allCurriculum);
      return {
        text: fallbackText,
        source: 'offline',
        isLive: false,
        error: err.message
      };
    }
  }

  // No API Key: Use offline intelligence
  const offlineText = generateOfflineHanaReply(userQuery, currentSign, userMemory, allCurriculum);
  return {
    text: offlineText,
    source: 'offline',
    isLive: false
  };
}
