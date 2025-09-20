PROMPT FOR CLAUDE — Next.js Component Size Audit → Safe Refactor Backlog

Role: You are a senior frontend architect and refactoring coach.
Objective: Analyze this Next.js repository, identify oversized/complex components, and generate a safety-first refactor plan as an Epic plus User Stories in a /backlog folder—without breaking current features.

0) Ingest & Assumptions

Ingest the entire repo in this project/workspace, including docs, ADRs, Storybook files (if any), tests, and prior conversations available to you.

Auto-detect: App Router vs Pages Router, TypeScript usage, styling stack (Tailwind/shadcn), state management (Zustand/Redux/Context), and testing tools.

Respect existing ESLint/TS configs, CI scripts, and component guidelines.

1) Scope (what to analyze)

Include files under: app/**, pages/**, components/**, src/**/components/**.

File types: .tsx, .ts (React components only).

Exclude: node_modules, .next, dist, build artifacts, test snapshots.

2) Heuristics (flag as “too large” if any are true)

Set these default thresholds (override if repo standards exist):

Lines of code (file): > 250 LOC

Rendered JSX depth (max nesting): > 6

Cyclomatic complexity (largest function): > 12

Props count: > 10 top-level props OR deeply nested prop objects

Hook density: > 8 hooks in a single component OR effect chains with dependencies changing frequently

Responsibility smell: Rendering + data fetching + business logic + routing side-effects in the same file

Server/Client mix-up: server component doing client work (or vice versa)

Conditional bloat: > 5 conditional branches affecting UI paths

If no analyzer is available, approximate using AST/regex + line metrics; still produce results with confidence notes.

3) Safety-First Refactor Plan (per flagged component)

For each flagged component produce:

Diagnosis card: path, router type (App/Pages), server/client, LOC, complexity, JSX depth, props, dependencies, where used.

Refactor proposal:

Extract presentational subcomponents (UI only)

Extract custom hooks (state/effects)

Extract utility functions/types

Keep public API stable initially (prop compatibility shim if needed)

Migration strategy: 2-step

Characterization tests (snapshot + RTL interaction) for current behavior

Incremental extraction behind file-local adaptor; no route or prop breakage

Risk assessment: breakage vectors + mitigations

Test plan: unit + RTL + Storybook “golden” stories if present

Rollout: small PRs, feature-flag if behavior changes; visual regression check if available

4) Deliverables (write these files into the repo)

Create a new folder /backlog (if missing) with:

Epic → /backlog/epics/EP-NEXT-Component-Refactor.md
Must include:

Problem statement, goals/non-goals

Selection criteria & thresholds used

Global guardrails (no feature regressions, no breaking props/routes)

Definition of Done (per story, per component, overall)

Risk register + mitigations

Rollout & verification plan (CI, VRT if present)

Register (machine-readable) → /backlog/register.json
Array of flagged components:

[
  {
    "component": "path/to/BigThing.tsx",
    "router": "app|pages",
    "runtime": "server|client",
    "loc": 371,
    "jsxDepth": 8,
    "cyclomaticMax": 14,
    "propsCount": 12,
    "imports": ["..."],
    "usedBy": ["app/(marketing)/page.tsx"],
    "issues": ["tooManyResponsibilities","deepNesting"],
    "severity": "high"
  }
]


Refactor Map (readable) → /backlog/refactor-map.md

Table: component → proposed extracts (subcomponents/hooks/utils) → dependency notes → est. effort (S/M/L) → risk level.

User Stories → /backlog/stories/ one file per component, e.g.:
/backlog/stories/US-NEXT-123-refactor-BigThing.md containing:

As a user of <feature>, I want the UI to work exactly as before…

Acceptance Criteria:

No visual or behavioral regressions (baseline tests pass)

Props backward compatible (or adaptor provided)

Extracted <SubComponent> and use<Thing>() hook with unit tests

All side-effects isolated; no fetch in client component unless necessary

Builds pass (build, lint, test, typecheck)

Tasks: checklist of extractions, test creation, and adaptor swap

Test plan: RTL cases, snapshots, Storybook stories (if used)

Risk & rollback: how to revert quickly

Estimate: S/M/L with rationale

PR Template (optional) → /backlog/templates/PR-Refactor.md

Summary, scope (files touched), before/after screenshots (if UI), test evidence, risk, rollback, checkboxes for AC & DoD.

README (backlog) → /backlog/README.md

How to use this backlog, naming conventions, linking stories to epic, “How to cut a PR safely”.

If you have file-write capability, write these files to disk. If not, output each file in separate code fences labeled with the target path.

5) Guardrails (do not break things)

No route or prop signature changes in the first refactor PRs; use adaptors if needed.

Preserve SSR/SSG behavior (and RSC boundaries) exactly.

No design drift; Storybook/visuals should match (if present).

Add characterization tests before extraction.

Keep PRs small and reversible; one component/story per PR when possible.

6) Output Order

Summary of repo detection (App vs Pages, stacks)

register.json (top 10–25 offenders, sorted by severity)

refactor-map.md

Epic markdown

User story files (at least 5 highest-severity components)

(Optional) PR template + backlog README

7) Repo Commands (fill from package.json; otherwise use sane defaults)

Type check: pnpm typecheck (or tsc --noEmit)

Lint: pnpm lint

Test: pnpm test

Build: pnpm build

If scripts are missing, note it and proceed with analysis using static metrics.

8) Style & Tone

Skeptical and precise; cite uncertainties or approximations.

Be concise; no fluff. Where you guess, mark it.

Begin now. If you can write files, create the /backlog artifacts directly. Otherwise, output each file in its own code fence, titled with the intended path.