# Product Requirements Document
## "Hana" — AI Voice & Sign Language Learning Companion

**Document owner:** [Your name]
**Status:** Draft v1.0
**Last updated:** September 2026

---

## 1. Executive Summary

Hana is an AI-powered friendship-and-learning companion, presented as a cute, original anime-style avatar, that lets a person **talk** (voice/text) and **learn/practice sign language** with a single character. The product's core differentiator is combining a warm, persistent "friend" personality with a rigorous, professionally-validated sign-language curriculum — not a generic chatbot bolted onto a translation gimmick.

**One-line vision:** *A friendly anime tutor that teaches beginner ASL (or the target sign language) through voice, text, professionally validated sign demonstrations, and camera-based practice — and is also just fun to talk to.*

This PRD defines the MVP and the phased roadmap toward a full two-way conversational sign-language companion. It intentionally scopes the first release small and reliable rather than attempting real-time universal sign translation, which is not achievable responsibly in v1.

---

## 2. Problem Statement

- Learning a sign language is hard to do alone: most apps are flashcard-style, impersonal, and don't give feedback on whether you're actually forming the sign correctly.
- Existing conversational AI companions (voice/text chat, anime avatars) don't support sign language at all.
- Existing sign-language apps rarely have a "friend" layer — a consistent character that remembers your progress and makes practice feel social rather than academic.
- Sign language is not a universal, one-size-fits-all system — building for "sign language" in general (rather than one specific, well-validated language) leads to shallow, inaccurate, and potentially disrespectful products.

**Opportunity:** Combine (a) an emotionally engaging AI companion, (b) accurate, expert-validated sign-language instruction, and (c) camera-based practice feedback into one product.

---

## 3. Goals & Non-Goals

### 3.1 Goals (v1 / MVP)
- Deliver a likeable, persistent anime avatar companion usable via **text and voice**.
- Teach a **beginner curriculum in one sign language** (recommended: ASL, or whichever matches your primary target market) covering alphabet, fingerspelling, and 100–300 common signs/phrases.
- Let the avatar **demonstrate signs accurately** via professionally captured/validated reference content.
- Let users **practice in front of a camera** and get basic, encouraging feedback on a limited, well-defined set of signs.
- Track learner progress (streaks, mastered signs, quiz scores).
- Establish a personality and safety framework that is warm and encouraging without fostering unhealthy emotional dependence or misrepresenting the AI as Deaf, a certified interpreter, or a replacement for human instruction.

### 3.2 Non-Goals (explicitly out of scope for v1)
- Real-time, unrestricted two-way sign-language translation ("universal sign translator"). This is a Phase 5 stretch goal, not an MVP promise.
- Supporting multiple sign languages simultaneously.
- Fully generative (non-validated) sign animation as the primary teaching content.
- Photorealistic avatar or licensed/copied anime characters (avatar must be original IP).
- Certifying users as fluent or interpreter-qualified.

---

## 4. Target Users & Personas

| Persona | Description | Primary need |
|---|---|---|
| **Curious Beginner** | Hearing person who wants to learn basic sign language for a friend, family member, job, or general interest | Fun, low-pressure way to learn without a classroom |
| **CODA / Family Learner** | Has a Deaf or hard-of-hearing family member and wants to communicate better | Practical everyday phrases, patient repeatable practice |
| **Student/Hobbyist** | Enjoys anime/companion-app style engagement, wants a "friend" to practice with daily | Habit-forming, gamified, emotionally engaging experience |
| **Deaf/HoH User (secondary, v2+)** | May use the product for peer conversation practice or to help hearing contacts learn | Respectful, accurate representation; not the primary MVP target since real conversational sign recognition isn't ready in v1 |

**Important note:** v1 should be marketed and framed honestly as a **beginner learning tool with a companion character** — not as a substitute for Deaf teachers, interpreters, or community immersion.

---

## 5. Core Product Principles (non-negotiable)

1. Start with **one** sign language. Do not attempt to be sign-language-agnostic in v1.
2. **Involve Deaf educators, native signers, and interpreters from day one** — in curriculum design, content validation, and personality/tone review. Budget and timeline must reflect this as a real workstream, not an afterthought.
3. Treat facial expression and body posture as **part of the language**, not decoration — this affects avatar design and camera-feedback scope.
4. Never claim that hand-gesture recognition equals full sign-language translation.
5. Use an **original** anime character (design, voice, name) — no imitation of existing copyrighted characters.
6. Captions/text accompany every spoken output; every sign demonstration has a text/voice equivalent (accessibility both ways).
7. Camera and microphone access require **clear, explicit privacy controls and consent**, with local-processing options considered given sensitivity of biometric-adjacent data (hand/face tracking).
8. The system should remain **useful even when recognition fails** (graceful fallback to text/voice, never a dead end).
9. Personality is warm and encouraging, but explicitly **does not pretend to be human, Deaf, or a certified interpreter**, and encourages users toward qualified human teachers for serious fluency.

---

## 6. Feature Set

### 6.1 MVP (Phase 1–2 features, shippable as v1.0)

| Feature | Description |
|---|---|
| Avatar & personality | Original 2D/3D anime avatar ("Hana" or user-chosen name) with a defined personality (kind, patient, encouraging, honest about its limits). Basic customization: voice, outfit, name. |
| Text chat | Free-form conversation with the AI, in-character. |
| Voice conversation | Speech-to-text input, LLM response, text-to-speech output with lip-sync/expression. |
| Sign demonstration | Avatar performs signs from a **professionally recorded/validated** library (100–300 signs), with slow-motion playback option. |
| Lesson structure | Curated beginner curriculum: alphabet/fingerspelling, greetings, numbers, common phrases — organized into short lessons. |
| Camera-based practice (limited) | User mimics a sign in front of the camera; system checks against a small, well-defined set of isolated signs and gives basic, hedge-appropriate feedback ("looks close, try raising your hand slightly" rather than definitive pass/fail). |
| Quizzes & repetition | Multiple-choice / recall quizzes on vocabulary learned so far. |
| Progress tracking | Streaks, signs mastered, lesson completion, simple stats dashboard. |
| Memory | Remembers learner's name, chosen level/goals, and lesson history across sessions. |
| Safety/consent UI | Explicit camera/mic permission flow, data-use explanation, option to use text/voice-only mode without camera. |

### 6.2 Phase 3+ (post-MVP)

| Phase | Features |
|---|---|
| Phase 3 – Sign recognition expansion | Broader isolated-sign recognition, better fingerspelling recognition, richer practice feedback (hand position, movement, non-manual markers like facial grammar). |
| Phase 4 – Avatar sign output at scale | Animated (not just pre-recorded) sign output for a larger vocabulary; 3D hand/body/face animation reviewed by native signers; phrase-level sign generation. |
| Phase 5 – Real-time two-way signing | Continuous sign recognition, sentence-level understanding, contextual grammar handling, real-time avatar signing responses — the "full companion" vision. |
| Ongoing | Additional sign languages (BSL, ISL, Auslan, etc.) as separate, fully-validated curricula — not simultaneous translation between them. |

---

## 7. User Journeys

### 7.1 First-time onboarding
1. User creates account, picks avatar name/voice/appearance.
2. Short onboarding conversation: avatar introduces itself, explains what it can and can't do (sets honest expectations), asks about the user's goals (casual interest, family communication, etc.).
3. User is offered first lesson (Greetings) or free-chat mode.

### 7.2 Learning a sign (example)
1. Avatar shows the sign for "Thank you," slowed down, with text + spoken meaning and a short hand-position explanation.
2. User opts to try it via camera.
3. System captures attempt, compares to reference, gives supportive, specific feedback.
4. Sign is added to "practiced" list; spaced-repetition logic schedules a future review.

### 7.3 Casual conversation
1. User opens app just to talk (no lesson).
2. Avatar responds in personality, can naturally suggest "want to review your signs from yesterday?" without being pushy or manipulative.

---

## 8. Functional Requirements

- **FR1**: System shall support text input/output and voice input/output in the same conversation thread.
- **FR2**: System shall play back sign-language reference video/animation for any sign in the current curriculum, with normal and slow-motion speed options.
- **FR3**: System shall capture short camera clips on user request for sign-practice attempts and return feedback within a few seconds.
- **FR4**: System shall persist learner profile (name, level, goals, lesson history, mastered signs) across sessions.
- **FR5**: System shall never present unvalidated, AI-generated sign content as an authoritative demonstration in the curriculum path (only in clearly-labeled experimental/advanced areas, if at all).
- **FR6**: System shall provide a text/voice-only mode requiring no camera permission.
- **FR7**: System shall log user consent for camera/microphone/data use and allow revocation at any time, with data deletion on request.
- **FR8**: System shall allow personality/appearance customization within the bounds of the original-character constraint (no impersonation of real people or existing copyrighted characters).

## 9. Non-Functional Requirements

- **Latency**: Voice round-trip (speech-in to spoken avatar response) target under ~2–3 seconds for MVP; sign-recognition feedback under ~3–5 seconds.
- **Accessibility**: Every audio output has captions/text; every visual sign demonstration has a text description; UI usable via screen reader where applicable.
- **Privacy & data sensitivity**: Camera/hand-tracking and voice data are sensitive — minimize retention, prefer on-device processing where feasible for hand-tracking (e.g., MediaPipe running client-side), encrypt any stored media, and be explicit in the privacy policy about biometric-adjacent data handling.
- **Reliability**: Graceful degradation — if camera recognition fails or is unavailable, the lesson continues via text/voice rather than blocking progress.
- **Content governance**: A defined review pipeline where every sign in the curriculum has been validated by a native signer/Deaf educator before shipping, with a visible "last reviewed" record internally.
- **Localization**: MVP ships in one sign language + one spoken/written language pairing; architecture should not hard-code assumptions that block adding more later.

---

## 10. AI Personality & Safety Specification

The AI character should be instructed (system-prompt / fine-tuning level) to:

- Be kind, patient, and encouraging without being saccharine or manipulative.
- Never mock or shame mistakes; use specific, actionable corrections ("try moving your hand slightly higher") rather than blunt "wrong."
- Clearly and periodically remind users it is not Deaf, not a certified interpreter, and not a replacement for human teachers or Deaf community immersion — especially before any point where accuracy really matters (e.g., before using signs in real situations).
- Encourage connection with qualified Deaf teachers and community resources for serious fluency.
- Avoid fostering unhealthy emotional dependence — it can be warm and "friend-like" in tone, but should not encourage exclusivity, discourage the user's real-world relationships, or role-play as a substitute for human connection.
- Admit uncertainty rather than fabricate a sign or translation it hasn't been validated on.

This specification should be treated as a first-class deliverable (a written "character & safety bible"), not an afterthought prompt.

---

## 11. System Architecture (Recommended)

```
User speaks/types
      ↓
Speech-to-text (if voice)
      ↓
AI conversation/teaching engine (LLM + lesson-state logic)
      ↓
Response
   ├── Text display
   ├── Text-to-speech + avatar lip-sync/expression
   └── Sign-language reference playback (validated library)

User signs (camera)
      ↓
Hand/body/face tracking (client-side, e.g., MediaPipe)
      ↓
Sign recognition (limited, curated vocabulary)
      ↓
Match/confidence result
      ↓
Feedback via AI conversation engine → voice/text/avatar response
```

### 11.1 Suggested Tech Stack (MVP)

| Layer | Options |
|---|---|
| Frontend (web) | React / Next.js, WebRTC (camera/mic), Three.js or a VRM-compatible renderer for the 3D avatar |
| Frontend (mobile, if pursued in parallel or later) | Flutter or React Native; Unity for a richer 3D character |
| Speech-to-text | OpenAI Whisper, Google Speech-to-Text, Azure Speech, or Deepgram |
| Conversation engine | LLM API with a strict system prompt encoding personality, teaching rules, and safety constraints (see Section 10) |
| Text-to-speech | Azure Neural TTS, ElevenLabs, Google Cloud TTS, or Amazon Polly — original voice, licensed appropriately |
| Sign recognition | MediaPipe Hands/Holistic for prototyping; custom-trained classifier for the curated MVP vocabulary |
| Avatar | Original VRM model + Three.js (web) or Unity; Live2D as a lighter-weight 2D alternative for early prototyping |
| Backend | Python (FastAPI) |
| Database | PostgreSQL (user profiles, lesson progress, curriculum content metadata) |
| Auth | Firebase Auth or Auth0 |
| Media storage | Cloud object storage (validated sign videos/animations, avatar assets) |
| Hosting | Vercel (frontend) + AWS/Azure/GCP (backend, ML inference, storage) |

---

## 12. Content & Curriculum Plan

- **Sign language chosen**: [Fill in — recommend ASL unless your primary market clearly points elsewhere.]
- **Content sourcing**: Contract with Deaf educators/native signers to record the initial 100–300 sign library and validate lesson scripts. This is a real budget line item, not a "nice to have."
- **First lesson set** (example, matches MVP scope): Hello / My name is… / What is your name? / Thank you / Please / Sorry / Yes / No / How are you? / I am learning sign language.
- **Curriculum structure**: Alphabet & fingerspelling → Greetings & introductions → Numbers → Everyday phrases → Simple Q&A conversation practice.
- **Validation pipeline**: Every piece of instructional content passes native-signer review before release; track this status per lesson.

---

## 13. Success Metrics

| Category | Metric |
|---|---|
| Engagement | Daily/weekly active learners, streak retention (7-day, 30-day) |
| Learning outcomes | Signs marked "mastered," quiz accuracy over time, lesson completion rate |
| Companion engagement | Free-chat session frequency/length (used as a secondary, not primary, success signal — avoid optimizing purely for dependency) |
| Quality | Native-signer content validation coverage (% of curriculum reviewed), camera-feedback accuracy on the curated sign set |
| Trust & safety | Consent-flow completion rate, opt-outs from camera mode, support tickets related to feedback tone/accuracy |
| Retention | 30-day and 90-day retention |

---

## 14. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Inaccurate or disrespectful sign content | Mandatory native-signer/Deaf-educator validation before any content ships |
| Users mistake basic gesture recognition for full translation | Explicit in-product messaging about current limits; avoid marketing overreach |
| Emotional over-attachment to the avatar | Personality guardrails (Section 10); avoid dark-pattern engagement loops |
| Camera/voice data sensitivity | Client-side processing where possible, minimal retention, clear consent UI, deletion on request |
| Scope creep toward "universal real-time sign translator" | Phased roadmap (Section 6.2) with MVP explicitly bounded (Section 3.2) |
| IP/character risk | Original avatar design and voice, no derivative-of-existing-anime-character designs |
| Licensing costs (TTS voice, avatar assets) | Budget commercial rights for AI-generated/original voice and character assets up front |

---

## 15. Open Questions

1. Which sign language is the primary target for v1 (ASL is the widest-reach default, but confirm against your actual target market)?
2. Web-first, mobile-first, or both in parallel?
3. Will sign-recognition processing run client-side (privacy-friendlier, harder to iterate on models) or server-side (easier to improve, more data-handling responsibility)?
4. What's the plan and budget for contracting Deaf educators/native signers — advisory board vs. per-lesson contractors?
5. Monetization model (freemium lessons, subscription, one-time purchase) — affects how curriculum is gated.
6. Target platforms for the avatar renderer (Three.js/VRM vs. Unity) — trade-off between web reach and animation quality.

---

## 16. Recommended Roadmap Summary

| Stage | Focus | Rough Scope |
|---|---|---|
| Stage 1 | Conversation prototype | Text + voice chat, simple 2D/3D avatar, no sign features yet |
| Stage 2 | Educational content (MVP) | Lessons, validated sign video/animation library, quizzes, progress tracking |
| Stage 3 | Sign recognition | Camera input, fingerspelling + small isolated-sign set, basic feedback |
| Stage 4 | Avatar sign output at scale | 3D animated signing beyond pre-recorded library, native-signer-reviewed |
| Stage 5 | Real-time two-way signing | Continuous recognition, sentence-level grammar, full companion vision |

**Recommended MVP cut line: end of Stage 2, with a narrow slice of Stage 3 (limited camera practice) included** — this matches Section 6.1 above and is the version this PRD is written to support building first.

---

*This PRD is intended as a living document — update Sections 8–15 as decisions are made on the open questions in Section 15.*
