# Implementation Plan - "Hana" AI Voice & Sign Language Companion

An analysis of all provided documents ([PRD_AI_SignLanguage_Companion.md](file:///c:/Users/krish/OneDrive/Desktop/Agent/PRD_AI_SignLanguage_Companion.md), [This is a strong idea an AI friends.txt](file:///c:/Users/krish/OneDrive/Desktop/Agent/This%20is%20a%20strong%20idea%20an%20AI%20friends.txt), and [Edit prompt - OpenAI API.html](file:///c:/Users/krish/OneDrive/Desktop/Agent/Edit%20prompt%20-%20OpenAI%20API.html)) reveals a unified vision: building an engaging, emotionally warm AI companion named **Hana** that pairs an anime avatar with voice/text chat, ASL sign-language lessons with slow-motion 3D demonstrations, and real-time client-side camera gesture feedback.

---

## Analysis & Synthesis of Source Documents

From our detailed audit of all 3 documents, the core directives and non-negotiables are:
1. **Target Language Focus**: Focus strictly on **American Sign Language (ASL)** for v1.
2. **Avatar Companion**: Original anime-style companion ("Hana") with expressiveness, speech captions, lip-sync, customizable voice/appearance, and warm non-judgmental personality guardrails.
3. **Validated Sign Demonstrations**: Accurate 3D procedural sign demonstrations with slow-motion (0.5x, 1x) playback and anatomical hand descriptions.
4. **Camera Practice with MediaPipe**: Client-side hand tracking via MediaPipe. Real-time feedback on hand shape, palm orientation, and movement elevation with encouraging, constructive feedback ("Hand shape looks close! Try raising your palm slightly").
5. **Structured Beginner Curriculum**:
   - *Module 1*: Alphabet & Fingerspelling (A–Z)
   - *Module 2*: Everyday Greetings & Courtesy (Hello, Thank You, Please, Sorry, Yes, No, I Love You)
   - *Module 3*: Numbers (1–10)
   - *Module 4*: Interactive Q&A Conversations
6. **Gamified Progress & Memory**: Streak tracking, mastered vocabulary, interactive quizzes, local persistent user memory (name, goals, lesson progress).
7. **Privacy & Accessibility**: 100% on-device MediaPipe hand processing, explicit camera permission flow, text/voice-only fallback modes, and transparent AI disclaimers (does not pretend to be human or a certified Deaf interpreter).

---

## User Review Required

> [!IMPORTANT]
> - **Architecture**: We will build a single-page modern web application using **Vite + React**, **Three.js** (for 3D avatar rendering & sign animations), **MediaPipe Hands** (for camera gesture recognition), and **Web Speech API** (for speech-to-text & text-to-speech synthesis).
> - **Privacy**: All camera video streams and hand landmark computations will run strictly on-device in the user's browser.
> - **API Credentials**: The app will run out-of-the-box with built-in companion response logic, and optionally accept an OpenAI / Gemini API key in settings for advanced conversational depth.

---

## Open Questions

> [!NOTE]
> None at this stage. All requirements are clearly detailed in the PRD and reference files.

---

## Proposed System Architecture & Features

```
               ┌─────────────────────────────────────────────────────────┐
               │                User Interface (React + CSS)              │
               └───────────┬─────────────────────────┬───────────────────┘
                           │                         │
            ┌──────────────▼──────────────┐   ┌──────▼─────────────────────┐
            │   3D Canvas Avatar Engine   │   │  MediaPipe Hand Tracking   │
            │ (Three.js 3D Hands/Avatar)  │   │  (Webcam + Landmark AI)    │
            └──────────────┬──────────────┘   └──────┬─────────────────────┘
                           │                         │
            ┌──────────────▼─────────────────────────▼───────────────────┐
            │          Hana Companion Core Logic & AI Engine             │
            │  (Voice/Text Chat, Lesson Engine, Feedback Evaluator)      │
            └──────────────────────────────┬─────────────────────────────┘
                                           │
                            ┌──────────────▼──────────────┐
                            │    Local Memory & Storage   │
                            │   (Streaks, Mastery, Goals) │
                            └─────────────────────────────┘
```

---

## Proposed Changes

### Project Structure & Setup

#### [NEW] [package.json](file:///c:/Users/krish/OneDrive/Desktop/Agent/package.json)
- Project setup with React 18, Vite, Three.js (`three`), `@react-three/fiber`, `@react-three/drei`, `@mediapipe/hands`, `@mediapipe/camera_utils`, `lucide-react`, `canvas-confetti`.

#### [NEW] [vite.config.js](file:///c:/Users/krish/OneDrive/Desktop/Agent/vite.config.js)
- Vite configuration with React plugin and server port settings.

---

### Core Design System & Styles

#### [NEW] [src/index.css](file:///c:/Users/krish/OneDrive/Desktop/Agent/src/index.css)
- Premium dark glassmorphic design system: custom HSL color palette (neon violet, warm rose, cyan accents), smooth micro-animations, glassmorphism cards, glowing buttons, responsive grid, font pairing (Outfit / Inter).

---

### Avatar & 3D Sign Demonstrator Engine

#### [NEW] [src/components/AvatarCanvas.jsx](file:///c:/Users/krish/OneDrive/Desktop/Agent/src/components/AvatarCanvas.jsx)
- Three.js 3D Canvas rendering Hana's anime avatar, interactive face expressions (happy, encouraging, thinking, teaching), lip-sync visualizer, and rigged 3D hands performing ASL signs with pose interpolation.
- Supports slow-motion (0.5x, 1x) and camera angle rotatable 3D controls.

---

### Camera & MediaPipe Hand Tracking Engine

#### [NEW] [src/components/CameraPractice.jsx](file:///c:/Users/krish/OneDrive/Desktop/Agent/src/components/CameraPractice.jsx)
- Real-time webcam integration with MediaPipe Hands overlay.
- Visual hand skeleton rendering on HTML canvas with landmark node highlights.
- Real-time gesture evaluator matching user's hand shape against reference target signs (Alphabet A-Z, Hello, Thank You, Please, Yes, No, I Love You, Numbers 1-10).
- Immediate, encouraging feedback generator with precision score and actionable tips.

---

### Companion Voice & Conversation Engine

#### [NEW] [src/components/VoiceTextChat.jsx](file:///c:/Users/krish/OneDrive/Desktop/Agent/src/components/VoiceTextChat.jsx)
- Dual mode voice/text chat thread with synchronized audio captions.
- Web Speech API integration for speech recognition (mic input) and Speech Synthesis (Hana's voice output).
- Hana personality prompt engine enforcing warm, patient, safety-aware responses.

---

### Curriculum & Learning Modules

#### [NEW] [src/data/aslCurriculum.js](file:///c:/Users/krish/OneDrive/Desktop/Agent/src/data/aslCurriculum.js)
- Complete structured ASL curriculum data:
  - **Alphabet & Fingerspelling**: A through Z with 3D landmark poses, hand orientation guides, and common tips.
  - **Greetings & Courtesy**: Hello, Thank You, Please, Sorry, Yes, No, I Love You, Good Morning.
  - **Numbers**: 1 through 10.
  - **Conversational Sentences**: "My name is...", "Nice to meet you", "I am learning ASL".

#### [NEW] [src/components/LessonModule.jsx](file:///c:/Users/krish/OneDrive/Desktop/Agent/src/components/LessonModule.jsx)
- Interactive lesson player combining:
  1. Hana's 3D demonstration + verbal explanation.
  2. Anatomical tips & hand shape guide.
  3. Live camera practice mode with real-time feedback.
  4. Quiz check to validate sign mastery.

---

### Quizzes, Progress & Personalization

#### [NEW] [src/components/QuizView.jsx](file:///c:/Users/krish/OneDrive/Desktop/Agent/src/components/QuizView.jsx)
- Interactive quizzes: Multiple-choice sign identification, camera sign-off challenges, flashcards, and speed drills with confetti celebrations.

#### [NEW] [src/components/ProgressDashboard.jsx](file:///c:/Users/krish/OneDrive/Desktop/Agent/src/components/ProgressDashboard.jsx)
- Learner statistics dashboard: Daily streak tracker, mastered signs grid, lesson completion progress, practice time log, and achievement badges.

#### [NEW] [src/components/SettingsModal.jsx](file:///c:/Users/krish/OneDrive/Desktop/Agent/src/components/SettingsModal.jsx)
- Customization & Privacy controls: Avatar voice pitch/speed selection, theme presets, camera permission toggles, fallback text-only mode, data reset, and optional LLM API key setting.

---

### Main Application Layout

#### [NEW] [src/App.jsx](file:///c:/Users/krish/OneDrive/Desktop/Agent/src/App.jsx)
- Main application shell linking Dashboard, Curriculum, Camera Practice, Voice/Text Chat with Hana, Quizzes, and Settings modal.

---

## Verification Plan

### Automated Build & Lint Verification
- Initialize project dependencies via `npm install`.
- Run Vite production build (`npm run build` or `npx vite build`) to verify clean compilation without TypeScript or bundler errors.

### Manual Verification
- Test 3D Avatar rendering & expression changes.
- Test MediaPipe camera feed and hand landmark tracking overlay.
- Verify real-time ASL sign gesture recognition for letters (e.g. A, B, C, V, Y, I Love You) and greetings.
- Test Speech Synthesis (TTS) voice generation and Speech Recognition (STT).
- Verify quiz scoring, streak tracking, and local storage state persistence.
