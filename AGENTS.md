<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wanderlast

Next.js 16 App Router app (a travel landing page), single package (not a monorepo). All source is under `src/`: routes in `src/app` (`layout.tsx`, `page.tsx` landing, `add-destination/`), feature components in `src/components/*.tsx` (navbar, banner, why-choose-us, testimonials, cta, footer), shadcn primitives in `src/components/ui/`, helpers in `src/lib` and `src/hooks`. Path alias `@/*` → `src/*`. Images live in `public/images/` and are referenced as `/images/…` via `next/image`.

- The root layout (`src/app/layout.tsx`) already wraps **every** route in `Navbar` + `Footer` and sets the font — don't re-add them per page.
- `README.md` is stock create-next-app boilerplate (it points at `app/page.tsx`, which doesn't exist here). Ignore it; this file is accurate.

## Commands (npm; `package-lock.json` is the lockfile)

- `npm run dev` — Turbopack dev server; also regenerates `.next/types` and the managed block above.
- `npm run build` — compile **and** TypeScript check in one; strongest single verification. It does **not** run ESLint, so a green build ≠ lint pass.
- `npm run lint` — bare `eslint` over the repo; single file: `npx eslint src/path/file.tsx`.
- `npx tsc --noEmit` — standalone typecheck, but needs Next's generated types first: on a fresh clone it fails with `Cannot find name 'LayoutProps'` until you run `npm run build` (or `next dev`) once.
- No test runner, formatter, pre-commit, or CI config exists — verification is lint + typecheck + build.

### Lint is red at baseline (pre-existing)

In the current working tree `npm run lint` exits 1 before you touch anything: `react-hooks/set-state-in-effect` errors in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts`. Don't chase these, but also don't add new violations — the react-hooks rules here reject `setState` called synchronously inside an effect.

## Next.js 16 behavior (configured in `next.config.ts`)

- `cacheComponents: true` + `partialPrefetching: true`: data caching follows the Cache Components model (`'use cache'` + `cacheLife()`), not the older `revalidate` APIs — see `node_modules/next/dist/docs/01-app/01-getting-started/08-caching.md`.
- `reactCompiler: true`: React Compiler is on; components are auto-memoized.
- Turbopack builds; CSS flows through the `@tailwindcss/turbopack` rule. There is no `tailwind.config` or `postcss.config` — Tailwind v4 is configured entirely in `src/app/globals.css` (`@import "tailwindcss"`, `@theme inline`, shadcn CSS variables).
- `PageProps<'/…'>` / `LayoutProps<'/…'>` are **global types Next generates** into `.next/types/` and `.next/dev/types/routes.d.ts` (referenced via `next-env.d.ts`); don't declare local equivalents.
- Brand color tokens (`bg-brand`, `text-brand`, `hover:bg-brand-strong`) are custom `@theme inline` entries in `src/app/globals.css`, not stock Tailwind colors.

## shadcn/ui

- `components.json` style `base-nova` (RSC on, Tailwind v4). Add components with `npx shadcn add <name>`; generated files in `src/components/ui` are yours to edit in place.
- `cn` comes from the `cn` npm package: `import { cn } from "cn"` (`clsx`/`tailwind-merge` are not used; `src/lib/utils.ts` re-exports it).
- Code highlighting is allowlisted: `src/lib/highlighter.tsx` holds a `languages` map — a language not listed there silently renders unhighlighted (add to `aliases` too if it's a shorthand).
