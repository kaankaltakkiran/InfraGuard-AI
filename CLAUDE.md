# CLAUDE.md

## Project Name

InfraGuard AI

## Project Overview

InfraGuard AI is a modern landing website for an AI-powered Terraform Pull Request review product.

The product helps DevOps, Cloud, Platform Engineering, and Security teams review Terraform infrastructure changes faster and more safely. It combines deterministic infrastructure tools with AI-generated explanations.

The website should clearly communicate that the AI does not make final infrastructure decisions. Instead, it summarizes trusted scanner results, cost changes, and style issues so human reviewers can approve Pull Requests with better context.

## Core Idea

Terraform Pull Requests are difficult to review because a small code change can affect:

* IAM permissions
* public network exposure
* storage encryption
* logging and monitoring
* backup configuration
* monthly cloud cost
* Terraform style and maintainability

InfraGuard AI solves this by collecting multiple review signals and turning them into one clear Pull Request review summary.

## Target Users

* DevOps Engineers
* Cloud Engineers
* Platform Engineering teams
* Security teams
* FinOps teams
* Engineering managers
* Companies using Terraform and GitHub Actions

## Main Value Proposition

“Review Terraform changes with security, cost, and style insights in one AI-assisted Pull Request comment.”

## Key Features

### 1. Security Review

Show that the system can analyze Terraform changes using tools such as:

* tfsec
* Checkov

It should detect risky infrastructure patterns such as:

* public access
* weak IAM permissions
* missing encryption
* insecure defaults
* exposed cloud resources

### 2. Cost Review

Show that the system can estimate cloud cost impact using Infracost.

It should highlight:

* estimated monthly cost
* cost delta introduced by the Pull Request
* expensive resource changes
* cost risks before merge

### 3. Style and Quality Review

Show that the system can check Terraform quality using:

* tflint
* terraform fmt

It should help teams keep Terraform code clean, consistent, and maintainable.

### 4. AI Explanation Layer

The AI should not invent findings or decide whether infrastructure should be approved.

The AI only explains scanner-backed evidence in plain language.

Important message:

“Deterministic tools find the facts. AI explains them. Humans make the final decision.”

### 5. Pull Request Comment

The product should output a single clear Pull Request comment containing:

* summary of findings
* severity counts
* affected files
* security issues
* cost changes
* style issues
* practical remediation suggestions
* links to file and line numbers

### 6. Configurable Merge Gates

The product should support different enforcement modes:

* comment-only mode
* block on critical findings
* block on high findings
* block on medium findings

This allows teams to start safely and increase enforcement over time.

## Website Goal

Create a polished SaaS-style landing page that explains the product clearly and builds trust with technical users.

The website should feel modern, clean, professional, and developer-focused.

## Suggested Tech Stack

Use:

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui
* Framer Motion for subtle animations
* Lucide icons

## Design Style

The design should be:

* dark themed by default
* modern DevOps/SaaS style
* clean and technical
* enterprise-friendly
* not too flashy
* easy to scan

Suggested visual style:

* dark navy / slate background
* green, blue, or violet accent colors
* code blocks
* GitHub Pull Request style preview cards
* infrastructure graph visuals
* risk score badges
* severity chips: Critical, High, Medium, Low

## Page Sections

### 1. Hero Section

Headline:

AI-assisted Terraform Pull Request reviews

Subheadline:

InfraGuard AI combines Terraform scanners, cost analysis, and AI-generated explanations into one clear Pull Request review comment.

Primary CTA:

Get Started

Secondary CTA:

View Demo

Hero visual:

A mock GitHub Pull Request comment showing:

* Security: 2 high findings
* Cost: +$184/month
* Style: 3 formatting issues
* Recommendation: Review before merge

### 2. Problem Section

Title:

Terraform reviews are harder than they look

Explain that small Terraform diffs can change security, cost, and availability. CI tools often produce too much raw output across different jobs, making it hard for reviewers to understand what actually matters.

### 3. Solution Section

Title:

One review comment. All the important signals.

Explain that InfraGuard AI collects scanner results, cost estimates, and lint output, then creates a ranked and readable summary.

### 4. Three Review Lanes

Create three feature cards:

Security Lane:

* tfsec
* Checkov
* IAM, encryption, public exposure, risky defaults

Cost Lane:

* Infracost
* monthly estimate
* cost delta
* expensive resource changes

Style Lane:

* tflint
* terraform fmt
* maintainable Terraform conventions

### 5. AI Boundary Section

Title:

AI explains. It does not decide.

Explain that scanners are the source of truth. AI only rewrites and summarizes the evidence so humans can act faster.

Include this sentence prominently:

Deterministic tools find the facts. AI explains them. Humans approve the change.

### 6. Workflow Section

Show this flow visually:

Pull Request opened
→ Terraform files detected
→ Security, cost, and style tools run
→ Findings are normalized
→ AI explains the impact
→ One Pull Request comment is updated

### 7. Demo Comment Section

Show a realistic Pull Request review comment mockup:

Terraform Review Summary

Security:

* High: Public storage bucket detected
* Medium: Missing encryption configuration

Cost:

* Monthly estimate: $420
* PR delta: +$84/month

Style:

* terraform fmt failed in modules/network/main.tf
* tflint warning in variables.tf

Recommended Action:
Do not merge until high security findings are reviewed.

### 8. Adoption Section

Title:

Start with visibility. Enforce when ready.

Explain that teams can start in comment-only mode, then gradually block merges based on severity.

Modes:

* none: comment only
* critical: block critical findings
* high: block high and critical findings
* medium: block medium and above

### 9. Use Cases Section

Include cards for:

* Platform teams managing multiple Terraform repos
* Security teams wanting earlier visibility
* DevOps teams reducing manual review time
* FinOps teams catching cost increases before merge
* Engineering teams standardizing infrastructure review

### 10. Final CTA

Headline:

Make Terraform reviews faster, safer, and easier to understand.

CTA:

Start Reviewing Pull Requests

Secondary CTA:

Book a Demo

## Tone of Voice

Use clear, confident, technical language.

Avoid exaggerated AI marketing.

Do not say the product replaces engineers.

Do say it helps engineers review faster with better evidence.

## Important Messaging Rules

Use these principles across the website:

* AI is assistant, not approver.
* Scanner-backed evidence is the source of truth.
* Human reviewers stay in control.
* The product reduces CI noise.
* The product makes Pull Request reviews easier to understand.
* The product is useful for Terraform, DevSecOps, Platform Engineering, and FinOps workflows.

## Components to Build

Create reusable components:

* HeroSection
* ProblemSection
* FeatureCard
* ReviewLaneCard
* WorkflowSteps
* PullRequestCommentMockup
* SeverityBadge
* PricingOrCTASection
* Footer
* Navbar

## Navigation

Navbar items:

* Product
* How It Works
* Use Cases
* Demo
* Pricing
* Contact

## Footer

Footer should include:

* Product
* Use Cases
* Docs
* GitHub
* Contact
* Privacy
* Terms

## Example Hero Copy

Headline:
AI-assisted Terraform PR reviews

Subheadline:
Catch security risks, cost changes, and Terraform quality issues before merge. InfraGuard AI turns scanner output into one clear Pull Request review comment.

CTA:
Get Started

Secondary CTA:
View Demo

## Example Tagline Options

* Infrastructure review, without the CI noise.
* Security, cost, and style review for Terraform Pull Requests.
* Turn Terraform diffs into clear infrastructure risk reviews.
* AI explanations for scanner-backed Terraform findings.
* I aim to provide a visual interface for terraform plan outputs, analyze risks using AI, and perform an analysis by looking at the project files.

## Implementation Notes

Build a responsive landing page.

The site should work well on desktop and mobile.

Use realistic mock data.

Do not implement authentication yet.

Do not implement a real backend yet.

Focus on a beautiful, convincing landing page that can later connect to GitHub Actions or a backend API.

## Output Expected

Create the complete frontend landing page with clean code, reusable components, and a professional design.

Use TypeScript and Tailwind CSS.

Keep the code maintainable and easy to extend.
