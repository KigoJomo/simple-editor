# Simple Editor

A shared rich-text editor experiment built with Tiptap and Convex ProseMirror Sync.

Users can create an article with a title and short overview, open its document, and edit the body. Convex stores the article record and synchronises ProseMirror steps between open editors.

## What is implemented

- article creation and listing
- a Tiptap editor with headings, lists, blockquotes, code, links, and basic text formatting
- live document sync through `@convex-dev/prosemirror-sync`
- stable document IDs separate from Convex article IDs
- loading, empty, and missing-article states

There is no authentication or per-document access control. Anyone connected to the same deployment can list and edit every article, so this is a sync experiment, not a production editor.

## Run it locally

You need pnpm and a Convex deployment.

```bash
pnpm install
pnpm exec convex dev
pnpm dev
```

Convex writes `NEXT_PUBLIC_CONVEX_URL` during setup.

## Checks

```bash
pnpm lint
pnpm build
```
