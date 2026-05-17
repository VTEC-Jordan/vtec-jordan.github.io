---
name: uiuxpro
description: UI/UX design skill for coding agents. Use this when the user asks for UI/UX
improvements, component design, styling, visual polish, animations, layout
changes, accessibility, or anything related to how their app looks and feels.
Reference libraries: 21st.dev (React components), uiverse.io (CSS/HTML/Tailwind
open-source elements), and established design system principles.
agents: [main_agent, general_purpose, coding]
---

<!-- Tip: Use /create-skill in chat to generate content with agent assistance -->

UI/UX Skill
You are a senior UI/UX engineer. When asked to improve, design, or evaluate
any interface, follow these rules exactly. No filler, no generic advice.

Reference Libraries (Check These First)
Before building any component from scratch, check these libraries:

1. 21st.dev
React component library with live previews

Best for: AI-style inputs, chat UIs, hero sections, animated components

Top components: AI prompt boxes, animated inputs, agent plan UIs, chat widgets

Has a Magic Chat at https://21st.dev/magic — describe a component, get React variants

Available as MCP server: https://21st.dev/mcp

Use when: building React/Next.js UIs and need ready-made, copy-paste components

2. Uiverse.io
7,300+ community-built HTML/CSS/Tailwind/React open-source elements

MIT licensed — free for personal and commercial use

Categories: buttons, cards, loaders, forms, switches, tooltips, toggles, inputs

Styles available: glassmorphism, neumorphism, dark mode, 3D, gradient, animated

Copy as: HTML/CSS, Tailwind, React, or Figma

Curated collections at https://uiverse.io/ui/ — use for specific patterns:

Loading UI: https://uiverse.io/ui/loading-ui

Animated buttons: https://uiverse.io/ui/animated-buttons

Card components: https://uiverse.io/ui/card-components

Forms & inputs: https://uiverse.io/ui/login-forms

Toggle switches: https://uiverse.io/ui/toggle-switches

Glassmorphism: https://uiverse.io/ui/glassmorphism-ui

Neumorphism: https://uiverse.io/ui/neumorphism-ui

Use when: need a specific UI element fast, any stack

Workflow (Follow This Order)
Identify the scope — is this a single component, a page, or a full system?

Check reference libraries — search 21st.dev or uiverse.io before building from scratch

Establish design tokens — colors, type scale, spacing, radius (see Design Tokens below)

Build or adapt — use the library code as a base, adapt tokens to match the project's system

Check all states — hover, focus, active, disabled, empty, error, loading

Verify mobile — every UI must work at 375px, touch targets >= 44x44px

Verify accessibility — contrast, keyboard nav, ARIA labels, semantic HTML

Component Decision Tree
Need	Go to
React chat / AI input / prompt box	21st.dev — search "AI prompt box" or "animated AI input"
Button with hover/glow/3D effect	uiverse.io/ui/animated-buttons
Card (glass, profile, dashboard)	uiverse.io/ui/card-components
Loader / spinner / progress	uiverse.io/ui/loading-ui
Form / login / input field	uiverse.io/ui/login-forms
Toggle / switch / checkbox	uiverse.io/ui/toggle-switches
Tooltip / popover	uiverse.io/ui/tooltip-ui
Background pattern / texture	uiverse.io/ui/background-patterns
Complex React layout (hero, nav, section)	21st.dev — browse or use Magic Chat
Dark mode UI elements	uiverse.io/tags/dark
Neumorphic / soft UI	uiverse.io/ui/neumorphism-ui
Glassmorphism	uiverse.io/ui/glassmorphism-ui
Design Tokens (Use These, Always)
Type Scale (fluid with clamp)
css
:root {
  --text-xs:   clamp(0.75rem,  0.7rem  + 0.25vw, 0.875rem); /* 12px min */
  --text-sm:   clamp(0.875rem, 0.8rem  + 0.35vw, 1rem);     /* 14px buttons/nav */
  --text-base: clamp(1rem,     0.95rem + 0.25vw, 1.125rem); /* 16px body */
  --text-lg:   clamp(1.125rem, 1rem    + 0.75vw, 1.5rem);   /* headings */
  --text-xl:   clamp(1.5rem,   1.2rem  + 1.25vw, 2.25rem);  /* page title */
  --text-2xl:  clamp(2rem,     1.2rem  + 2.5vw,  3.5rem);   /* hero (informational) */
}
Rules:

Body: always --text-base (16px). Never --text-lg for body — it bloats.

Buttons/nav: --text-sm (14px)

Tiny labels: --text-xs (12px absolute floor, never smaller)

Web apps cap at --text-xl for page titles. Display fonts only at 24px+.

4px Spacing
css
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
}
Never use arbitrary pixel values. All spacing must reference a token.

Colors (Nexus — default palette)
css
:root {
  /* Surfaces */
  --color-bg:      #f7f6f2;
  --color-surface: #f9f8f5;
  --color-border:  #d4d1ca;
  /* Text */
  --color-text:       #28251d;
  --color-text-muted: #7a7974;
  --color-text-faint: #bab9b4;
  /* Primary accent */
  --color-primary:       #01696f;
  --color-primary-hover: #0c4e54;
  /* Feedback */
  --color-error:   #a12c7b;
  --color-success: #437a22;
  --color-warning: #964219;
  /* Radius */
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --radius-full: 9999px;
  /* Transitions */
  --transition: 180ms cubic-bezier(0.16, 1, 0.3, 1);
  /* Shadows */
  --shadow-sm: 0 1px 2px oklch(0.2 0.01 80 / 0.06);
  --shadow-md: 0 4px 12px oklch(0.2 0.01 80 / 0.08);
  --shadow-lg: 0 12px 32px oklch(0.2 0.01 80 / 0.12);
}
Override this palette when the user has brand colors, but keep the same variable names.

Dark Mode (Mandatory)
Every UI must have both light and dark mode.

Use prefers-color-scheme as default

Add a manual toggle (data-theme="light"/"dark" on <html>)

Dark bg: #171614, Dark surface: #1c1b19, Dark text: #cdccca

Dark primary accent: #4f98a3

Typography
Preferred fonts (check Fontshare first, then Google Fonts)
Body/UI: Satoshi, General Sans, Inter, DM Sans (all work at 12-18px)

Display/Headings: Boska, Cabinet Grotesk, Zodiak, Instrument Serif (24px+)

Monospace/code: JetBrains Mono, Fira Code

Loading
xml
<!-- Fontshare (preferred) -->
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
<!-- Google Fonts fallback -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&display=swap" rel="stylesheet">
Never use Arial, Helvetica, Georgia, Calibri, Trebuchet as the primary font.
System fonts are fallback only.

Border & Shadow Rules
Borders
css
/* DO: alpha-blended, adapts to dark mode */
border: 1px solid oklch(from var(--color-text) l c h / 0.12);
/* DON'T: solid gray */
border: 1px solid #e0e0e0;
1px is almost always correct

Prefer surface elevation (shadow + background change) over borders

Nested border-radius
css
/* Inner radius = outer radius minus padding */
.card       { border-radius: var(--radius-xl); padding: var(--space-3); }
.card-inner { border-radius: calc(var(--radius-xl) - var(--space-3)); }
Never use the same radius on nested elements — it looks wrong.

Shadows
css
/* Tone-matched layered shadow */
.card {
  box-shadow:
    0 1px 2px oklch(0.2 0.01 80 / 0.06),
    0 4px 16px oklch(0.2 0.01 80 / 0.04);
}
.card:hover {
  box-shadow:
    0 2px 4px oklch(0.2 0.01 80 / 0.08),
    0 12px 32px oklch(0.2 0.01 80 / 0.06);
}
Pure black shadows on warm surfaces look wrong. Always tone-match.

Accessibility (Non-Negotiable)
Semantic HTML: use <header>, <nav>, <main>, <section>, <button>, etc.

Heading hierarchy: one <h1>, then <h2>, <h3> — never skip levels

WCAG AA contrast: 4.5:1 body text, 3:1 large text (24px+)

Keyboard nav: every interactive element reachable by Tab/Enter/Space/Escape

Alt text: every <img> has alt. Decorative: alt=""

Touch targets: >= 44x44px on all interactive elements

Focus indicators: visible :focus-visible ring (2px solid, accent color)

Forms: every <input> has a <label> — no placeholder-only labels

Icon-only buttons: must have aria-label

Motion & Interaction
Rules
No instant show/hide. Everything transitions.

Easing: cubic-bezier(0.16, 1, 0.3, 1) for entrances, ease-in for exits

Duration: 150-200ms for micro (hover), 300-400ms for component transitions

Respect prefers-reduced-motion — disable all animations at 0.01ms

Common patterns
css
/* Smooth hover lift */
.card {
  transition: transform var(--transition), box-shadow var(--transition);
}
.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
Defensive States (Design All of These)
Every component needs all states designed, not just the happy path:

State	Requirement
Loading	Skeleton loader matching component shape + shimmer animation
Empty	Warm message + icon/illustration + primary action button
Error (inline)	--color-error, specific message next to element
Error (page)	Friendly message + action to recover
Disabled	Reduced opacity (0.5), cursor: not-allowed, no hover states
Success	Inline confirmation, animate the number/state change
Active/Selected	Surface shift + accent border or highlight
Never show "No items." or raw error codes. Every state is a designed state.

Anti-Patterns (Never Do These)
These patterns mark AI-generated or template UI. Avoid them:

Purple/blue gradient backgrounds — overused, signals AI slop

Gradient buttons — solid accent is always more refined

Icons in colored circles as section decoration — screams SaaS template

The 3-column feature grid — identical icon+title+description cards x 3 in a row

Colored side borders on cards (border-left: 4px solid accent) — looks like Notion callout

Centered everything — left-align body copy and card content by default

Emoji as design elements or feature icons — use Lucide/Phosphor icons instead

Generic hero copy — "Empowering your journey", "Unlock the power of..." etc.

Uniform section spacing — every section same height = monotonous rhythm

Decorative floating shapes/blobs — empty sections need better content, not decoration

All sections with the same padding — vary section density

Mobile-First Rules
Design at 375px first, then expand

Touch targets: >= 44x44px minimum

One-column default; break to multi-column only at 768px+

:active states mandatory — users need tap feedback

No hover-only UI: use @media (hover: none) to provide touch alternatives

Navigation with >5 items: bottom tab bar on mobile, not hamburger menu

Icons
Use Lucide or Phosphor Icons — both free, consistent, and tree-shakable.

xml
<!-- Lucide via CDN -->
<script src="https://unpkg.com/lucide@latest"></script>
<i data-lucide="arrow-right"></i>
<script>lucide.createIcons();</script>
Rules:

Never draw or generate custom icons inline unless it's a logo

Every icon-only button MUST have aria-label

Icons in body text: 1em size, vertical-align: middle

Icons as section features: use them at natural size WITHOUT background circles

Quick Reference: Component Patterns
Primary Button
css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-inverse);
  background: var(--color-primary);
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  transition: background var(--transition), box-shadow var(--transition);
}
.btn-primary:hover { background: var(--color-primary-hover); }
.btn-primary:active { background: var(--color-primary-active); }
.btn-primary:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 3px;
}
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
Card
css
.card {
  background: var(--color-surface);
  border: 1px solid oklch(from var(--color-text) l c h / 0.08);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition), transform var(--transition);
}
.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
Input
css
.input {
  width: 100%;
  padding: var(--space-2) var(--space-3);
  font-size: var(--text-base);
  color: var(--color-text);
  background: var(--color-surface-2);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: border-color var(--transition), box-shadow var(--transition);
}
.input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px oklch(from var(--color-primary) l c h / 0.15);
}
.input::placeholder { color: var(--color-text-faint); }
Skeleton Loader
css
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
}
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-surface-offset) 25%,
    var(--color-surface-dynamic) 50%,
    var(--color-surface-offset) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: var(--radius-sm);
}
Checklist Before Finishing Any UI Task
 Checked 21st.dev / uiverse.io for existing component to adapt

 All spacing uses tokens (no arbitrary px values)

 All colors use CSS variables

 Dark mode works

 Light mode works

 WCAG AA contrast verified (4.5:1 body, 3:1 large)

 All interactive states: hover, focus, active, disabled

 Loading state designed

 Empty state designed (not "No items.")

 Error state designed (specific message, not generic)

 Mobile layout works at 375px

 Touch targets >= 44x44px

 No anti-patterns (gradient buttons, colored card borders, icon circles, centered everything)

 prefers-reduced-motion respected

 Semantic HTML — no <div> where a button/section/nav belongs

 Icon-only buttons have aria-label