# ZeNA – ZeAI Soft Chatbot (React + Vite)

ZeNA is the AI-powered chatbot widget for **ZeAI Soft**, converted from a single HTML file into a fully structured **React 18 + Vite** project.

---

## Project Structure

```
src/
│
├── components/
│   ├── Chatbot.tsx          # Root widget – composes FloatingButton + ChatWindow
│   ├── ChatWindow.tsx       # Chat window with message list and input bar
│   ├── Header.tsx           # Chat window header (name, status, close button)
│   ├── FloatingButton.tsx   # Floating action button with notification badge
│   ├── Message.tsx          # Renders a single message (bot or user)
│   ├── TypingIndicator.tsx  # Animated three-dot typing indicator
│   ├── QuickButtons.tsx     # Row of quick-reply buttons
│   ├── GlassCard.tsx        # Glassmorphic list card for menu items
│   ├── DynamicForm.tsx      # Dynamic form renderer with validation
│   ├── SocialLinks.tsx      # Instagram / WhatsApp / LinkedIn buttons
│   ├── ThankYou.tsx         # Thank-you confirmation card
│   └── ZenaAvatar.tsx       # SVG robot avatar (shared across components)
│
├── data/
│   ├── services.ts          # Service definitions (label, key, description, req)
│   ├── training.ts          # Training programs, learning areas, hackathon domains
│   └── knowledgeBase.ts     # Knowledge base entries, MENU items, fallback words
│
├── hooks/
│   └── useChatbot.ts        # All chatbot state + flow logic (the brain)
│
├── App.tsx                  # Root app – demo page + <Chatbot />
├── main.tsx                 # Vite entry point
└── styles.css               # All original CSS (preserved exactly)
```

---

## Features Preserved

- ✅ Floating action button with pulse animation and notification badge
- ✅ Glassmorphic chat window (open/close animation)
- ✅ Typing indicator with three-dot bounce animation
- ✅ Bot and user message bubbles with fade-in animation
- ✅ Timestamps on every message
- ✅ Quick-reply buttons for all flows
- ✅ Glass card list for service and training menus
- ✅ Dynamic form with real-time validation
- ✅ Thank-you confirmation card
- ✅ Social links (Instagram, WhatsApp, LinkedIn)
- ✅ Service flow (6 services → details → contact form)
- ✅ Training flow (Skill-Up, GIP, Hackathon 2026, Kirthika)
- ✅ Learning Areas sub-flow with per-area forms
- ✅ Business Collaboration form
- ✅ Enquiry mode with knowledge-base lookup
- ✅ Free-text keyword routing
- ✅ Fallback handling for off-topic messages
- ✅ Responsive design (full-screen on mobile)
- ✅ Auto-scroll to latest message
- ✅ Enter key to send, Shift+Enter for newline
- ✅ Auto-growing textarea

---

## Tech Stack

| Tool | Version |
|------|---------|
| React | 18 |
| Vite | 5+ |
| TypeScript | 5+ |
| No jQuery | ✅ |
| No DOM manipulation | ✅ |

---

## Installation (Standalone)

> These steps are for running the standalone ZIP outside of the Replit monorepo.

### 1. Prerequisites

- Node.js 18+
- npm or pnpm

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Start development server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for production

```bash
npm run build
```

The production build is output to `dist/`.

### 5. Preview production build

```bash
npm run preview
```

### 6. Deploy to GitHub Pages

1. Push the project to a GitHub repository.
2. In GitHub, enable Pages and select the GitHub Actions deployment source.
3. Run:

```bash
npm run deploy
```

The app will be published at:

```text
https://<your-username>.github.io/zena-chatbot-react/
```

---

## Embedding in Your Website

Replace the demo page content in `src/App.tsx` with your own website content. The `<Chatbot />` component is a self-contained floating widget that you can drop into any page:

```tsx
import Chatbot from './components/Chatbot';

function MyPage() {
  return (
    <>
      {/* your page content */}
      <Chatbot />
    </>
  );
}
```

Import `styles.css` in your entry file:

```tsx
import './styles.css';
```

---

## Customization

| What to change | Where |
|---------------|-------|
| Services list | `src/data/services.ts` |
| Training programs | `src/data/training.ts` |
| Knowledge base answers | `src/data/knowledgeBase.ts` |
| Main menu items | `src/data/knowledgeBase.ts` → `MENU` |
| Social links URLs | `src/components/SocialLinks.tsx` |
| Colors / theme | `src/styles.css` → `:root` CSS variables |
| Chatbot flows | `src/hooks/useChatbot.ts` |

---

## Key Architecture Decisions

- **`useChatbot` hook** — all chatbot state and flow logic is centralised here. Components are purely presentational.
- **Messages as data** — messages are stored as plain objects in `useState`. Interactive extras (buttons, forms) store their callbacks directly as closures in the message object.
- **`enquiryModeRef`** — stored as a `useRef` (not `useState`) so callbacks always read the latest value without stale closure issues.
- **`withTyping(fn, delay)`** — simulates the typing indicator by setting `isTyping = true`, waiting `delay` ms, then setting `isTyping = false` and calling `fn`. Sequential chains use nested `setTimeout` calls exactly like the original.
- **`DynamicForm`** — tracks its own `submitted` state to prevent double-submission, and uses `useRef` to read input values at submit time (uncontrolled inputs for performance).
