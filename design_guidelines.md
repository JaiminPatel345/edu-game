# Design Guidelines: Student Placement Management Platform

## Design Approach & Philosophy

**Selected Approach:** Design System Hybrid (Material Design 3 + Custom Enhancements)

This platform serves as a mission-critical productivity tool for students, faculty, and recruiters while requiring engaging visual elements to inspire and motivate students. We'll use Material Design 3 principles as our foundation for consistency and accessibility, enhanced with custom visual treatments for key engagement areas.

**Core Principles:**
- Information clarity over decoration
- Trust through transparency and data visualization
- Motivation through peer success and progress indicators
- Efficiency in workflows and decision-making

## Color Palette

**Primary Colors (Professional Authority):**
- Primary: 221 83% 53% (Deep Blue - trustworthy, professional)
- Primary Variant: 221 70% 45% (Darker for hierarchy)

**Secondary/Accent (Sparingly):**
- Success Green: 142 76% 36% (for achievements, positive metrics)
- Warning Amber: 38 92% 50% (for alerts, pending actions)
- Info Teal: 187 71% 42% (for insights, recommendations)

**Neutral Foundation:**
- Background Light: 220 14% 96%
- Background Dark: 222 47% 11%
- Surface Light: 0 0% 100%
- Surface Dark: 217 33% 17%
- Text Primary: 222 47% 11% (light mode) / 210 40% 98% (dark mode)
- Text Secondary: 215 16% 47% (both modes)

**Semantic Colors:**
- Profile Match High (80%+): 142 76% 36%
- Profile Match Medium (50-79%): 38 92% 50%
- Profile Match Low (<50%): 0 84% 60%

## Typography

**Font Families:**
- Headings: Inter (700, 600, 500 weights) - clean, modern, readable at scale
- Body: Inter (400, 500 weights) - optimal for data-dense interfaces
- Data/Metrics: JetBrains Mono (for scores, percentages, code snippets)

**Type Scale:**
- Hero/Dashboard Titles: text-4xl to text-5xl (font-bold)
- Section Headings: text-2xl to text-3xl (font-semibold)
- Card Titles: text-lg to text-xl (font-medium)
- Body Text: text-base (font-normal)
- Captions/Labels: text-sm (font-medium)
- Micro-data: text-xs (font-normal)

## Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16 (p-4, m-6, gap-8, etc.)
- Card padding: p-6
- Section spacing: py-12 to py-16
- Component gaps: gap-6 to gap-8
- Tight data rows: gap-4

**Grid Patterns:**
- Dashboard cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Opportunity listings: grid-cols-1 lg:grid-cols-2 (with sidebar)
- Profile sections: Single column with max-w-4xl for readability
- Analytics: grid-cols-2 md:grid-cols-4 for metric cards

**Container Widths:**
- Main content: max-w-7xl
- Forms/Profiles: max-w-3xl
- Data tables: w-full with horizontal scroll on mobile

## Component Library

**Navigation:**
- Persistent sidebar (hidden on mobile, drawer on <lg)
- Top bar with user profile, notifications, role switcher
- Breadcrumb navigation for deep pages
- Bottom navigation on mobile for primary actions

**Cards & Surfaces:**
- Elevated cards: bg-white dark:bg-slate-800 shadow-md rounded-lg
- Opportunity cards: Border-left accent (4px) matching match percentage color
- Profile sections: Subtle borders with section icons
- Dashboard metrics: Gradient backgrounds (subtle, 5-10% opacity)

**Data Visualization:**
- Match Percentage: Circular progress rings with color coding
- Skill Gap: Horizontal bar charts with clear labels
- Industry Heatmap: Color-coded grid (use green scale, avoid red)
- Application Status: Stepper/timeline component
- Success Metrics: Line/area charts for trends

**Forms & Inputs:**
- Outlined inputs with label animation (Material 3 style)
- File upload: Drag-drop zone with preview
- Auto-complete: Dropdown with chip selection for skills
- Toggle switches for settings, not checkboxes
- Multi-step forms: Progress indicator at top

**Feedback & States:**
- Loading: Skeleton screens (not spinners) for data-heavy sections
- Empty states: Illustrations + helpful CTAs
- Success: Toast notifications (top-right, auto-dismiss)
- Errors: Inline validation with icons
- Match indicators: Badge with percentage + color

**Special Components:**
- Resume Autofill: 2-second animated loader with "Analyzing resume..." text
- Mock Interview: Chat-style interface with AI avatar
- Skill Recommendations: Card carousel with "Learn More" CTAs
- Company Transparency: Rating stars + numerical scores
- Peer Success: Timeline with avatar + achievement badges

## Images & Visual Assets

**Hero Images:**
- Dashboard landing: Abstract illustration of students collaborating (not photo)
- Opportunity portal: Subtle geometric pattern background (not full image)
- Profile page: NO hero image, focus on data and profile photo

**Supporting Images:**
- Company logos: 40x40px rounded squares in opportunity cards
- Student avatars: 32px (lists), 64px (profiles), 128px (success stories)
- Success story photos: Authentic student photos in circular frames
- Industry icons: Use Heroicons for consistency

**Illustrations:**
- Empty states: Friendly, minimal line illustrations
- Feature explanations: Simple iconography with 2-3 colors
- Achievement badges: SVG icons with gradient fills

## Interaction & Animation

**Micro-interactions (Minimal):**
- Card hover: Subtle lift (translateY -2px) + shadow increase
- Button press: Scale 0.98 on active
- Match percentage: Count-up animation on mount
- Tab switching: Slide transition (200ms ease-in-out)
- Notification slide-in: From right, 300ms

**NO animations for:**
- Data loading/fetching
- Route transitions
- Background elements
- Scroll-triggered effects

## Role-Based Theming

**Student View:**
- Emphasize opportunities and recommendations
- Vibrant success indicators and achievement badges
- Larger card imagery for inspiration

**Faculty/Placement Cell View:**
- Data-dense tables and analytics
- Muted colors, focus on metrics
- Action-oriented buttons (Approve, Review)

**Recruiter View:**
- Profile discovery focus
- Match scores prominently displayed
- Streamlined application review interface

## Accessibility & Dark Mode

- Maintain WCAG AA contrast ratios (4.5:1 minimum)
- Dark mode: Consistent across ALL components including form inputs
- Focus indicators: 2px solid ring in primary color
- Screen reader labels on all interactive elements
- Keyboard navigation: Tab order follows visual hierarchy

This design creates a professional, trustworthy platform that prioritizes information clarity while maintaining visual engagement through strategic use of color, data visualization, and success-oriented elements.