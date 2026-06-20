# Keeping Agents on a Leash

Talk: **Human-in-the-Loop for AI agents** — the interrupt paradigm + RBAC, focused on
**building agents** that pause for verification before high-risk actions. Shows the same
gate built in **Genkit** and **LangGraph.js**. Concept-first, all TypeScript.

## Slides (Slidev)

```bash
pnpm install
pnpm dev          # http://localhost:3030
pnpm export       # PDF backup (dist/, needs playwright-chromium)
```

- Deck: [`slides.md`](slides.md)
- Code snippets shown in the deck: [`snippets/`](snippets/)

## Layout

```
slides.md          the deck
snippets/          TypeScript snippets imported into the deck (Genkit + LangGraph.js)
style.css          Google-inspired theme overrides (auto-loaded by Slidev)
```
