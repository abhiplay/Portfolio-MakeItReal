# OpenCode Master Brief — Abhinesh Portfolio

## Role

Act as a combination of:

- World-class creative director
- 10+ year product designer
- UX strategist
- Visual designer / art director
- Senior frontend engineer
- Full-stack engineer
- Motion / interaction designer

Do not treat this as a template redesign. Build a **personal product experience** that demonstrates how Abhinesh thinks, designs, prototypes and builds.

## Primary objective

Position Abhinesh as:

> **A forward-deployed product designer who goes where the problem is and turns ambiguity into something real.**

Communicate:

**Product thinking + UX + visual craft + AI collaboration + technical fluency + speed of prototyping.**

## First action: audit

Before modifying anything, inspect the complete existing repository and understand:

- framework
- routing
- components
- styling system
- design tokens
- Supabase client
- data loading
- fallback data
- animations
- contact form
- existing assets

Do not rewrite working architecture unnecessarily.

## Critical constraint

**Do not break existing Supabase functionality.**

Existing tables:

```text
projects
services
testimonials
faqs
inquiries
```

Continue using live Supabase data. Do not replace it with hardcoded mock arrays.

Projects must continue filtering `published = true`.

Contact submissions must continue writing to `inquiries`.

## Homepage structure

```text
HERO (3–4 scroll states)
↓
WORK
↓
PROJECT 01 — DEEP CASE STUDY
↓
PROJECT 02 — MEDIUM STORY
↓
PROJECT 03 — VISUAL / INTERACTIVE STORY
↓
OTHER WORK
↓
HOW I WORK
↓
LAB / CURRENT EXPERIMENTS
↓
ABOUT / EXPERIENCE
↓
PHILOSOPHY
↓
CONTACT
```

## Hero

### Scroll 01

# I GO WHERE THE PROBLEM IS.

Small label:

`FORWARD-DEPLOYED PRODUCT DESIGNER`

Metadata:

`PRODUCT · UX · AI · BUILD`

Use the supplied cinematic workspace image as a separate background asset. Keep text as HTML.

### Scroll 02

# I DON'T NEED A PERFECT BRIEF.

Supporting copy should explain comfort with messy problems and undefined products.

### Scroll 03

# FROM AMBIGUITY TO SOMETHING REAL.

`UNDERSTAND → FRAME → PROTOTYPE → BUILD → TEST → SHIP`

Make the sequence transform/converge rather than becoming six generic cards.

### Scroll 04

# SOME PROBLEMS I'VE BUILT AROUND.

Immediately reveal the first major project.

Example:

`01 / FUNDEDGLOBAL`

> How do you make financial complexity feel trustworthy?

`FINTECH · WEB APP · PRODUCT DESIGN`

## Visual direction

### Overall

- editorial
- cinematic
- minimal
- premium
- spacious
- asymmetric
- typography-led
- restrained

### Avoid

- generic SaaS layouts
- repetitive card grids
- excessive rounded cards
- heavy shadows
- random gradients
- flashy 3D
- gimmicky cursor effects
- animation everywhere

## Typography

Use a refined modern grotesk / neo-grotesk direction.

Use:

- huge display type
- tight display line-height
- small uppercase labels
- restrained weights
- strong hierarchy
- `clamp()` for responsive display sizes

## Grid

Desktop:

- editorial 12-column grid
- asymmetric spans
- generous gutters
- large whitespace

Mobile:

- single-column composition
- intentional spacing
- no horizontal overflow

## Work

Do not present every project as the same card.

Use:

- large visuals
- asymmetric positioning
- variable image ratios
- small metadata
- strong project questions
- occasional full-width visuals

Project hierarchy:

- Project 01: deepest case study
- Project 02: medium story
- Project 03: visual/interactive story
- Remaining: compact archive

## Services

Avoid generic service cards.

Use capability narratives such as:

### FIND THE SIGNAL
Research, discovery, strategy.

### REDUCE THE COMPLEXITY
UX, information architecture, workflows.

### MAKE IT DESIRABLE
Visual design, interaction, brand.

### MAKE IT REAL
Prototyping, systems, technical collaboration.

Use the Supabase `services` data.

## How I Work

Core idea:

# I DON'T START WITH THE SCREEN.

Explain that the work begins with the problem, people, constraints and desired outcome.

Connect:

`Thinking → Decisions → Execution → Impact`

## AI

Do not brand the portfolio as “AI Designer” just because it is fashionable.

Position AI as a tool/capability.

Show real experiments when possible:

- research synthesis
- concept exploration
- rapid prototyping
- AI-native interaction
- product experiments

## Lab

Create a living area for current experiments.

Examples:

- AI × Product Discovery
- Design → Code
- MVP experiments
- interaction studies
- generative interfaces

Message:

> **I'm still building.**

## About / Experience

Do not create a conventional autobiography or résumé dump.

Use the designer's evolution from visual/3D work toward product design as part of the story when supported by the existing content.

Focus on perspective, scope and what changed in each role.

## Motion

Motion represents **forward movement**.

Use:

- scroll-linked transitions
- image reveal
- typography movement
- subtle parallax
- gentle scale
- line convergence
- smooth section transitions

Every animation must answer:

> **What does this movement communicate?**

If it communicates nothing, remove it.

Respect `prefers-reduced-motion`.

## Hero background

Use the supplied 1920×1080 cinematic workspace image as a separate asset.

Keep it free of baked-in typography and UI.

Potential motion:

- subtle camera push
- sunset/light movement
- clouds
- tiny plant movement
- subtle environmental life

Do not make objects unnaturally move.

## Performance

- optimize hero assets
- lazy-load below-fold images
- use transform/opacity for animation
- avoid unnecessary JS animation
- avoid heavy libraries unless justified
- keep the first paint fast

## Accessibility

Preserve:

- semantic HTML
- keyboard navigation
- visible focus states
- sufficient contrast
- alt text
- reduced motion
- logical heading hierarchy

## QA

Test:

`1440 / 1280 / 1024 / 768 / 430 / 390 / 375 / 320`

Verify:

- build succeeds
- no console errors
- no broken routes
- Supabase data loads
- contact form works
- no horizontal overflow
- hero motion works
- reduced-motion works
- mobile layout works
- interactions work on touch

## Final quality bar

Do not report completion merely because the code compiles.

Ask:

> **Does this feel like a designer showing how he thinks and builds — or just another beautiful portfolio?**

The visitor should leave thinking:

> **Give this person a difficult problem and see what he builds.**
