# Keeping Agents on a Leash

Talk: **Human-in-the-Loop for AI agents** — the interrupt paradigm + RBAC, focused on
**building agents** that pause for verification before high-risk actions. Shows the same
gate built in **Genkit** and **LangGraph.js**. Concept-first, all TypeScript.

## Links

- **Live slides:** [mainawycliffe.github.io/io-extended-slides](https://mainawycliffe.github.io/io-extended-slides/)
- Deck source: [`slides.md`](slides.md)
- Code snippets shown in the deck: [`snippets/`](snippets/)

## Slides (Slidev)

```bash
pnpm install
pnpm dev          # http://localhost:3030
pnpm export       # PDF backup (dist/, needs playwright-chromium)
```

## Deploy

Hosted on GitHub Pages from the `gh-pages` branch.

```bash
pnpm run deploy   # builds with the /io-extended-slides/ base path and pushes dist/ to gh-pages
```

One-time setup: **Settings → Pages → Source: "Deploy from a branch" → `gh-pages` / `(root)`**.

## Resources

Frameworks & tooling used in the talk:

- [Slidev](https://sli.dev/) — the presentation framework this deck is built with
- [Firebase Genkit](https://genkit.dev/) — see its interrupt / human-in-the-loop tooling
- [LangGraph.js](https://langchain-ai.github.io/langgraphjs/) — graph-based agent framework
- [LangGraph human-in-the-loop](https://langchain-ai.github.io/langgraphjs/concepts/human_in_the_loop/) — the interrupt/approval concept

## Layout

```
slides.md          the deck
snippets/          TypeScript snippets imported into the deck (Genkit + LangGraph.js)
style.css          Google-inspired theme overrides (auto-loaded by Slidev)
```
