# Hero Storyboard — Abhinesh Portfolio

## Objective

Create a **3–4 scroll hero** that tells a story but gets to the work quickly.

The hero is one continuous transformation, not four disconnected sections.

---

## SCROLL 01 — HOOK

### Main statement

# I GO WHERE THE PROBLEM IS.

### Supporting metadata

`FORWARD-DEPLOYED PRODUCT DESIGNER`

`PRODUCT · UX · AI · BUILD`

### Visual

Use the cinematic workspace background:

- dark creative workspace
- laptop
- desk
- sunset
- plant
- cat
- design references
- warm light
- deep shadows
- negative space for typography

### Motion

Very subtle:

- slow environmental camera movement
- sunset/light variation
- cloud movement
- tiny plant movement
- subtle cat breathing/blink

Text remains HTML and sits above the image.

---

## SCROLL 02 — PERSONALITY

### Main statement

# I DON'T NEED A PERFECT BRIEF.

### Supporting copy

> Give me a messy problem, an ambitious idea, or a product that does not exist yet. I'll figure out what needs to be built.

### Visual transition

The first statement moves/reduces.

The environment opens up or changes subtly.

Introduce a human/work detail without creating a standard profile card.

---

## SCROLL 03 — METHOD

### Main statement

# FROM AMBIGUITY TO SOMETHING REAL.

### Process

`UNDERSTAND → FRAME → PROTOTYPE → BUILD → TEST → SHIP`

### Transition

Use scattered elements from the previous state and make them converge.

Possible sequence:

```text
SCATTERED INPUTS
      ↓
CONNECTED LINES
      ↓
ORDERED STEPS
      ↓
ONE DIRECTIONAL SYSTEM
```

The interaction should communicate clarity emerging from ambiguity.

Do not use generic process cards.

---

## SCROLL 04 — WORK

### Main statement

# SOME PROBLEMS I'VE BUILT AROUND.

Immediately introduce the first project.

### Example

`01 / FUNDEDGLOBAL`

> How do you make financial complexity feel trustworthy?

`FINTECH · WEB APP · PRODUCT DESIGN`

Then reveal the real project visual.

This is the transition from **positioning to proof**.

---

# Hero transition language

The entire sequence should feel like:

```text
I GO WHERE THE PROBLEM IS.
             ↓
I DON'T NEED A PERFECT BRIEF.
             ↓
FROM AMBIGUITY TO SOMETHING REAL.
             ↓
SOME PROBLEMS I'VE BUILT AROUND.
```

The typography, image, lines and motion should carry the transitions.

---

# Technical guidance

Prefer:

- HTML text
- CSS typography
- separate background image
- CSS transforms
- opacity
- lightweight scroll progress
- IntersectionObserver where useful

Avoid heavy WebGL/canvas unless the effect genuinely needs it.

Avoid animation libraries for trivial transitions.

---

# Responsive behavior

### Desktop

Large editorial typography and asymmetric image composition.

### Tablet

Reduce type scale and simplify transitions.

### Mobile

Do not force desktop composition.

Use a simplified single-column experience while preserving the message and visual hierarchy.

---

# Success criteria

The hero succeeds when:

1. The positioning is understood immediately.
2. The experience feels alive and premium.
3. Motion has narrative purpose.
4. The designer's personality is visible.
5. Real work appears by scroll 3–4.
6. It does not feel like an animation demo.
7. The transition into the first project feels inevitable.
