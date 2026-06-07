# InfraGuard AI

> AI-assisted Terraform Pull Request reviews — security, cost, and style insights in one comment.

## What is this?

InfraGuard AI is a SaaS landing page for an AI-powered Terraform PR review product. It helps DevOps, Cloud, Platform Engineering, Security, and FinOps teams catch infrastructure risks **before merge**.

The product combines deterministic scanner output (tfsec, Checkov, Infracost, tflint) with AI-generated explanations and posts a single, structured review comment on every Terraform PR.

**The AI does not make approval decisions.** Scanners produce the findings. The AI explains them in plain language. Humans approve or block the PR.

---

## Features

| Feature | Description |
|---|---|
| Security Review | tfsec + Checkov — IAM, public exposure, encryption, insecure defaults |
| Cost Review | Infracost — monthly estimate, PR cost delta, expensive resource changes |
| Style Review | tflint + terraform fmt — formatting, missing descriptions, deprecated syntax |
| AI Explanation | Plain-language summaries of scanner findings, not invented risks |
| Merge Gates | Configurable enforcement: comment-only → block on critical/high/medium |
| Plan Analyzer | Upload or paste a `terraform plan` output for instant client-side risk analysis |

---

## Tech Stack

- **Next.js 15** — App Router, TypeScript
- **Tailwind CSS v3** — Custom dark navy design system
- **Framer Motion v11** — Scroll-triggered animations, parallax, spring physics
- **Lucide React** — Icons
- **Geist** — Font (Sans + Mono)

---

## Do I need a backend?

**Currently: No.**

This repository is a **frontend-only landing page**. Everything runs client-side:

- The Terraform plan analyzer parses plan text/JSON in the browser using regex and JSON parsing — no server needed.
- All review data shown in the UI is mock data from `lib/mock-data.ts`.
- There is no authentication, database, or API calls to a backend.

**When you do need a backend:**

A real production version would need a backend to:

| Capability | What you'd need |
|---|---|
| Run tfsec / Checkov / tflint on PR diffs | A worker (Node.js, Python, Go) triggered by GitHub webhooks |
| Call Infracost | Infracost CLI + cloud credentials |
| Call an AI model (Claude/GPT) | Anthropic or OpenAI API key, server-side only |
| Post PR comments to GitHub | GitHub App or PAT with `pull_requests: write` scope |
| Store review history | A database (Postgres, SQLite, etc.) |
| GitHub Actions integration | A GitHub App + webhook endpoint |

A minimal backend would be: **a GitHub App webhook receiver** that runs scanners in a sandboxed environment, calls Claude via the Anthropic API, and posts the comment back to the PR via the GitHub API.

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
app/
  layout.tsx          # Root layout, Geist font, metadata
  page.tsx            # Assembles all landing page sections
  globals.css         # Design tokens, utilities, scrollbar, animations

components/
  Navbar.tsx          # Sticky glassmorphism navbar, mobile drawer
  Footer.tsx          # 4-column footer with links
  HeroSection.tsx     # Full-viewport hero with animated PR comment card
  ProblemSection.tsx  # 6-tile problem grid
  SolutionSection.tsx # Before/After terminal vs InfraGuard summary
  ReviewLanesSection.tsx  # Security / Cost / Style lane cards
  AIBoundarySection.tsx   # Scanners → AI → Human flow
  WorkflowSteps.tsx       # 6-step animated workflow timeline
  PullRequestCommentMockup.tsx  # Realistic GitHub PR comment replica
  SeverityBadge.tsx       # Reusable severity chip (Critical/High/Medium/Low)
  AdoptionSection.tsx     # Enforcement mode selector
  PlanAnalyzer.tsx        # Terraform plan upload & client-side analyzer
  UseCasesSection.tsx     # Team-specific use case cards
  CTASection.tsx          # Final call-to-action banner
  ScrollProgress.tsx      # Top-of-page scroll progress bar

lib/
  mock-data.ts        # Realistic mock PR review data
  plan-analyzer.ts    # Client-side Terraform plan parser and risk detector
  utils.ts            # cn() utility (clsx + tailwind-merge)

types/
  index.ts            # Shared TypeScript interfaces
```

---

## Design System

- **Background:** `#0a0f1e` deep navy
- **Accent:** violet `#7c3aed` primary, indigo `#6366f1` secondary
- **Security:** emerald `#10b981`
- **Cost:** amber `#f59e0b`
- **Style:** sky `#0ea5e9`
- **Pattern:** glassmorphism — `bg-white/5 backdrop-blur-xl border border-white/10`

---

## License

MIT
