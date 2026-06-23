# Meeth Amin — Portfolio

**Live:** [meethcodes.github.io](https://meethcodes.github.io)

Midnight Garage themed portfolio for an AIML Engineer — built with React, TypeScript, Vite, Tailwind, Framer Motion, and a RAG-powered chatbot.

## Features

- Cinematic dark UI with purple-teal gradient accents
- Typing hero, 3D particle field (desktop), recruiter mode, UI sounds
- Live GitHub stats and repository feed
- RAG resume chatbot (Groq + Cloudflare Worker)
- Web3Forms contact integration

## Local Development

```bash
npm install
npm run dev
```

## Environment Variables

Copy `.env.example` to `.env.local`:

| Variable | Description |
|----------|-------------|
| `VITE_WEB3FORMS_KEY` | Web3Forms access key |
| `VITE_CHAT_API_URL` | Cloudflare Worker chat endpoint |

## Deploy (GitHub Pages)

Pushes to `main` auto-deploy via GitHub Actions to `gh-pages`.

Optional GitHub secrets:
- `VITE_WEB3FORMS_KEY`
- `VITE_CHAT_API_URL`

## Chat Worker Setup

```bash
# 1. Login to Cloudflare
npx wrangler login

# 2. Set Groq API key (free at groq.com)
npx wrangler secret put GROQ_API_KEY

# 3. Deploy worker
npm run worker:deploy

# 4. Add worker URL to .env.local and GitHub secret VITE_CHAT_API_URL
```

## Add Your Headshot

Place your photo at `public/imgs/me.png` (recommended 400×400px).

## Phase 2 — Projects

Featured projects section is a placeholder until new repos go public. Send repo names + screenshots to enable full project cards.

## Tech Stack

React 18 · TypeScript · Vite · Tailwind CSS · Framer Motion · GSAP · Lenis · React Three Fiber · TanStack Query · Cloudflare Workers · Groq
