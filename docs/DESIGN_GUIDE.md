# ☕ Universal Design System — ARQA Coffee

**Versi 1.0** — Platform-agnostic (Web, Mobile, dll.)

---

## 1. Color Tokens

| Token | Hex | Description |
|---|---|---|
| `bg` | `#0A1A1F` | Base background — very dark teal |
| `bg-secondary` | `#112830` | Secondary surface (input, drawer, scrollbar track) |
| `surface` | `#162E38` | Card / surface color |
| `surface-hover` | `#1C3A45` | Elevated surface (hover state, secondary button) |
| `primary` | `#E07A3A` | Brand accent — warm orange |
| `primary-light` | `#F4A261` | Lighter accent (text gradient, secondary accent) |
| `primary-dark` | `#C46830` | Darker accent (button gradient endpoint) |
| `on-surface` | `#F0EBE3` | Primary text color — warm off-white |
| `text-muted` | `#7A9BA5` | Secondary / muted text |
| `border` | `#1F3D4A` | Borders, dividers, stroke |
| `success` | `#27AE60` | Success state — green |
| `warning` | `#F39C12` | Warning state — yellow |
| `danger` | `#E74C3C` | Error / danger — red |
| `info` | `#3498DB` | Info state — blue |

### 1.1 Usage by Notification Type

| Type | Color | Use Case |
|---|---|---|
| order | `#E07A3A` | New order, status change |
| payment | `#27AE60` | Payment confirmed |
| stock | `#E74C3C` | Low stock alert |
| delivery | `#3498DB` | Delivery assigned/completed |
| warning | `#F39C12` | General warning |
| info | `#95A5A6` | General info |

### 1.2 Status to Color Mapping

| Status | Color | Background |
|---|---|---|
| pending | `#F39C12` | same at 15% opacity |
| cooking | `#E07A3A` | same at 15% opacity |
| ready | `#27AE60` | same at 15% opacity |
| delivering | `#3498DB` | same at 15% opacity |
| completed | `#7A9BA5` | same at 15% opacity |
| cancelled / rejected | `#E74C3C` | same at 15% opacity |
| paid | `#27AE60` | same at 15% opacity |
| unpaid | `#E74C3C` | same at 15% opacity |

### 1.3 Role Colors

| Role | Color |
|---|---|
| Admin | `#E74C3C` — red |
| Manager | `#3498DB` — blue |
| Cashier | `#27AE60` — green |
| Kitchen | `#E07A3A` — orange |
| Courier | `#9B59B6` — purple |
| Customer | `#1ABC9C` — teal |

---

## 2. Typography

### 2.1 Font Families

| Usage | Font | Fallback |
|---|---|---|
| Body / UI | Poppins | sans-serif |
| Display / Headings | Playfair Display | serif |
| Receipt / Print | Segoe UI | sans-serif |

### 2.2 Type Scale

| Level | Weight | Size (dp/sp) | Line Height | Usage |
|---|---|---|---|---|
| Display XL | 900 | 48 | 1.2 | App name on login screen |
| Display L | 700 | 36 | 1.2 | Hero headings (login) |
| Heading 1 | 700 | 24 | 1.3 | Page titles |
| Heading 2 | 600 | 20 | 1.3 | Section headings |
| Heading 3 | 600 | 18 | 1.4 | Modal titles, stat values |
| Body | 400 | 14 | 1.5 | Primary body text |
| Body Small | 400 | 13 | 1.5 | Secondary descriptions |
| Caption | 500 | 12 | 1.4 | Labels, footnotes |
| Label | 600 | 11 | 1.3 | Badges, timestamps |
| Tiny | 500 | 10 | 1.3 | Meta, promo codes, tab labels |
| Micro | 600 | 9 | 1.2 | Discount badges in cart |
| Nano | 500 | 8 | 1.2 | Inline discount icons |

### 2.3 Font Weights

| Weight | Use Case |
|---|---|
| 400 / Regular | Body text, descriptions |
| 500 / Medium | Secondary buttons, tab items, category chips |
| 600 / Semibold | Labels, button text, item titles |
| 700 / Bold | Headings, stat values, strong emphasis |
| 900 / Black | App logo, hero display |

---

## 3. Spacing Scale

| Token | dp | Usage |
|---|---|---|
| `space-0.5` | 2 | Tight inline gaps |
| `space-1` | 4 | Icon-to-text spacing, tight stacks |
| `space-2` | 8 | Button groups, filter chips gap, below labels |
| `space-3` | 12 | Card items, modal form sections, stat content |
| `space-4` | 16 | Card-to-card, main content padding H, section separator |
| `space-5` | 20 | Login role cards, drawer header padding |
| `space-6` | 24 | Major section separators, carousel dots gap |
| `space-8` | 32 | Login form sections |
| `space-10` | 40 | Login heading spacing |
| `space-12` | 48 | Empty state padding V |

---

## 4. Border Radius

| Token | Value | Usage |
|---|---|---|
| `radius-none` | 0 | — |
| `radius-sm` | 6 | Small action buttons (edit/delete inline) |
| `radius-md` | 8 | Small buttons, quantity controls, stock bar |
| `radius-input` | 10 | Input fields, modal secondary buttons |
| `radius-lg` | 12 | Primary buttons, toasts, cancel buttons, order cards |
| `radius-xl` | 14 | Stat cards, map containers, order cards |
| `radius-2xl` | 16 | Cards, menu cards, promo cards, avatar containers |
| `radius-3xl` | 20 | Modals, QR scanner area, badges (pill) |
| `radius-4xl` | 24 | Login glass panel |
| `radius-pill` | 999 | Category chips, badges, notification dots, avatars |

---

## 5. Elevation & Shadow

| Level | Description | Specification |
|---|---|---|
| 0 — Flat | Default surface | No shadow, 1dp border |
| 1 — Subtle | Card hover | translateY(-2), border tint primary at 30% |
| 2 — Raised | Menu card hover | translateY(-4), shadow: rgba(0,0,0,.3) blur 30 |
| 3 — Floating | Primary button hover | translateY(-2), shadow: primary at 35% blur 25 |
| 4 — Modal | Modal overlay | rgba(0,0,0,.6) full screen |
| 5 — Toast | Toast notification | shadow: rgba(0,0,0,.4) blur 30 |
| 6 — Glow | Pending item pulse | box-shadow: primary at 10% blur 20 → 25% blur 40 (3s loop) |
| 7 — Scanner line | QR scanner line | box-shadow: primary blur 10 |

---

## 6. Component Specifications

### 6.1 Button System

**Primary Button**

| Property | Value |
|---|---|
| Height | 48dp |
| Padding H | 28dp |
| Radius | 12dp |
| Background | Gradient primary → primary-dark (135°) |
| Text | White, 14dp, semibold (600) |
| Hover | Lift 2dp, shadow primary 35% blur 25 |
| Active | Lift back to 0 |

**Secondary Button**

| Property | Value |
|---|---|
| Height | 44dp |
| Padding H | 22dp |
| Radius | 12dp |
| Background | surface-hover |
| Border | 1dp border |
| Text | on-surface, 14dp, medium (500) |
| Hover | Background shifts to border color |

**Small Button**

| Property | Value |
|---|---|
| Height | 32dp |
| Padding H | 16dp |
| Radius | 8dp |
| Font | 12dp |

**Danger Button**

| Property | Value |
|---|---|
| Height | 32dp |
| Padding H | 16dp |
| Radius | 8dp |
| Background | danger |
| Text | White, 12dp, medium (500) |
| Hover | Opacity 85% |

**Ghost / Cancel Button** (modals)

| Property | Value |
|---|---|
| Height | 44dp |
| Radius | 10dp |
| Background | rgba(255,255,255,.05) |
| Border | 1dp border |

### 6.2 Input Field

| Property | Value |
|---|---|
| Height | 48dp |
| Padding H | 16dp |
| Radius | 10dp |
| Background | bg-secondary |
| Border | 1dp border |
| Text | on-surface, 14dp, Poppins |
| Placeholder | text-muted |
| Focus | Border shifts to primary |
| Width | 100% of container |

### 6.3 Card System

**Default Card**

| Property | Value |
|---|---|
| Padding | 20dp all sides |
| Radius | 16dp |
| Background | surface |
| Border | 1dp border |
| Hover | Border tint primary at 30% |

**Stat Card**

| Property | Value |
|---|---|
| Padding | 18dp all sides |
| Radius | 14dp |
| Background | surface |
| Border | 1dp border |
| Hover | Lift 2dp, border tint primary at 30% |

**Menu Card**

| Property | Value |
|---|---|
| Radius | 16dp |
| Overflow | Hidden |
| Image height | 140dp, object-fit cover, full width |
| Content padding | 12dp |
| Hover | Lift 4dp, shadow elevation level 2 |

**Order Card**

| Property | Value |
|---|---|
| Padding | 16dp all sides |
| Radius | 14dp |
| Background | surface |
| Border | 1dp border |
| Hover | Border tint primary at 30% |

### 6.4 Bottom Navigation

| Property | Value |
|---|---|
| Position | Fixed to bottom edge |
| Height | ~60dp (8dp padding + safe area) |
| Background | bg at 95% opacity, blur 20dp |
| Border top | 1dp border |
| Layout | Horizontal evenly distributed |
| Icon size | 20dp |
| Label size | 10dp |
| Item gap | 4dp (vertical between icon & label) |
| Item padding V | 6dp |
| Item padding H | 12dp |
| Active state | primary color, icon scale 1.1 |
| Notification dot | 8dp circle, danger, border bg 2dp |

### 6.5 Side Drawer (Admin & Manager only)

| Property | Value |
|---|---|
| Position | Fixed left, full height |
| Width | 260dp (≥768px) / 240dp (<768px) |
| Background | bg-secondary |
| Border right | 1dp border |
| Transition | Slide from left, 300ms ease |
| Default | Hidden (offscreen left) |
| Backdrop | Full screen, 50% black |
| Item height | 52dp (14dp padding V × 2) |
| Item layout | Icon (20dp) + label (14dp), gap 12dp |
| Item hover / active | primary bg 10% opacity, text turns primary |
| Header | Padding 20dp H × 20dp V, avatar 40dp + name + role |
| Footer | Absolute bottom, logout button |
| Nav items | 10 items |

### 6.6 Tab Navigation

| Property | Value |
|---|---|
| Item padding | 10dp V × 16dp H |
| Font | 13dp, medium (500) |
| Default color | text-muted |
| Active indicator | 2dp bottom border in primary |
| Hover color | on-surface |
| White-space | nowrap (horizontal scroll on overflow) |

### 6.7 Modal

| Property | Value |
|---|---|
| Overlay | Full screen, 60% black, z-index 500 |
| Content max width | 480dp |
| Content padding | 28dp all sides |
| Content radius | 20dp |
| Content background | surface |
| Content border | 1dp border |
| Content max height | 85% of viewport |
| Entry animation | Fade up 300ms |
| Mobile margin | 10dp horizontal |

### 6.8 Toast / Snackbar

| Property | Value |
|---|---|
| Position | Fixed top-right |
| Max width | 360dp |
| Radius | 12dp |
| Padding | 14dp V × 20dp H |
| Font | 13dp, medium (500) |
| Shadow | elevation level 5 |
| Duration | 3.5s auto-dismiss |
| Entry | Slide in from right (400ms) |
| Exit | Slide out to right (300ms) |
| Types | success (green), warning (yellow), error (red), info (blue) |

### 6.9 Status Badge

| Property | Value |
|---|---|
| Radius | Pill (20dp) |
| Padding | 4dp V × 10dp H |
| Font | 11dp, semibold (600) |
| Background | Status color at 15% opacity |
| Text | Status color at 100% |
| Display | Inline-block |

### 6.10 Category Chip

| Property | Value |
|---|---|
| Height | ~36dp |
| Padding | 8dp V × 18dp H |
| Radius | Pill (25dp) |
| Font | 13dp, medium (500) |
| Default | surface bg, border, text-muted |
| Active / Hover | primary bg, white text |

### 6.11 Quantity Stepper

| Property | Value |
|---|---|
| Size | 32dp × 32dp (square) |
| Radius | 8dp |
| Background | surface-hover |
| Border | 1dp border |
| Text | on-surface, bold (700) |
| Hover | primary bg |

### 6.12 Stock Progress Bar

| Property | Value |
|---|---|
| Height | 8dp |
| Radius | 4dp (pill) |
| Track background | bg |
| Fill | Color-coded, transition width 500ms ease |

### 6.13 Promo Carousel

| Property | Value |
|---|---|
| Container | Relative, overflow hidden, margin bottom 20dp |
| Track | Flex row, gap 12dp, transition 800ms cubic-bezier |
| Card width | 260dp, flex-shrink 0 |
| Dot nav | 8dp circle, active → 24dp wide pill in primary |
| Auto-rotate | Every 5s, pause on hover |
| Interaction | Draggable (touch + mouse) |

### 6.14 QR Scanner Area

| Property | Value |
|---|---|
| Size | 220dp × 220dp |
| Border | 3dp solid primary |
| Radius | 20dp |
| Corner brackets | 30dp, primary-light, top-left + bottom-right |
| Scan line | 2dp height, primary glow, animate top 10% → 85% (2s loop) |

### 6.15 Avatar

| Property | Value |
|---|---|
| Size (large) | 80dp × 80dp |
| Size (medium) | 56dp × 56dp |
| Size (small) | 40dp × 40dp |
| Size (mini) | 32dp × 32dp |
| Radius | Pill (circle) or 16dp (rounded) |
| Text | Initial, centered, bold, proportional, white on primary |

### 6.16 Chat Bubble

| Property | Value |
|---|---|
| Max width | 80% of container |
| Radius | 16dp |
| Sent bubble | primary bg, white text |
| Received bubble | bg-secondary bg, on-surface text |
| Timestamp | 10dp, 70% opacity, right-aligned |
| Image in bubble | Full width, max-height 200dp |

### 6.17 Notification Badge (Bell)

| Property | Value |
|---|---|
| Size | 20dp × 20dp circle |
| Background | danger |
| Text | White, 10dp, bold |
| Position | Absolute top-right relative to bell |
| Border | 2dp matches header background |

### 6.18 Data Table

| Property | Value |
|---|---|
| Width | 100% |
| Font | 13–14dp |
| Border collapse | Yes |
| Row separator | 1dp bottom border |
| Header | Left-aligned, text-muted |
| Cell padding V | 8dp |

---

## 7. Animation & Motion

### 7.1 Animation Specifications

| Name | Duration | Easing | Iteration | Description |
|---|---|---|---|---|
| fade-up | 500ms | ease | 1 | Entry: translateY(20) → 0, opacity 0 → 1 |
| slide-in | 400ms | ease | 1 | Toast: translateX(100%) → 0 |
| slide-out | 300ms | ease | 1 | Toast: 0 → translateX(100%) |
| float | 3s | ease-in-out | infinite | Decorative Y float |
| breathe | 3s | ease-in-out | infinite | Pending item glow pulse |
| scan-line | 2s | ease-in-out | infinite | QR scanner line |
| shimmer | 1.5s | linear | infinite | Loading skeleton sweep |
| pulse | 0.6s | ease | infinite | Scale 1 → 1.05 → 1 |
| spin | 1s | linear | infinite | 360° rotation |

### 7.2 Transition Defaults

| Element | Duration | Property |
|---|---|---|
| Interactive elements | 200–300ms | all (color, bg, border, transform) |
| Drawer | 300ms | transform |
| Stock bar | 500ms | width |
| Carousel | 800ms | transform |

### 7.3 Accessibility (Reduced Motion)

When user prefers reduced motion:
- All animation durations set to 0s
- All transition durations set to 0s

---

## 8. Iconography (Font Awesome 6 — Solid)

### 8.1 Navigation Icons

| Icon | Usage |
|---|---|
| `bars` | Drawer toggle |
| `bell` | Notifications |
| `chevron-right` | List arrows, "Selengkapnya" |
| `right-from-bracket` | Logout |
| `table-cells` | Table management |
| `clock-rotate-left` | History |
| `route` | Active delivery |
| `box` | Available deliveries |
| `gauge-high` | Dashboard / overview |
| `tags` | Promos |
| `calendar-check` | Attendance |

### 8.2 Role Icons (Login)

| Role | Icon |
|---|---|
| Admin | `shield-halved` |
| Manager | `chart-line` |
| Cashier | `cash-register` |
| Kitchen | `fire-burner` |
| Courier | `motorcycle` |
| Customer | `user` |
| App logo | `mug-hot` |

### 8.3 Action Icons

| Icon | Usage |
|---|---|
| `plus` | Add new |
| `pen` | Edit |
| `trash` | Delete |
| `search` | Search |
| `qrcode` | QR scanner |
| `download` | Download QR |
| `upload` / `link` | Image upload |
| `print` | Print invoice |
| `times` / `times-circle` | Close, cancel, remove |
| `arrow-right` | "Selengkapnya" |
| `check` / `check-circle` | Success, complete |
| `user-plus` | Register new customer |
| `lock` | Forgot password |

### 8.4 Status & Info Icons

| Icon | Usage |
|---|---|
| `exclamation-triangle` | Warning, low stock |
| `info-circle` | Info |
| `ban` | Rejected / cancelled |
| `tag` | Discount / promo |
| `chair` | Dine-in table |
| `motorcycle` | Delivery |
| `map-marker-alt` / `location-dot` | Tracking / geo |
| `clock` | Time, check-in |
| `wallet` | Payment status |
| `comment-alt` / `paper-plane` | Chat |
| `note-sticky` | Order notes |
| `phone` | Phone |
| `hand-holding-dollar` | Settle delivery |
| `sign-in-alt` | Check-in |
| `sign-out-alt` | Check-out |

### 8.5 Empty State Icons

| Icon | Context |
|---|---|
| `mug-saucer` | No menu found |
| `shopping-bag` | Empty cart |
| `receipt` | No orders |
| `inbox` | No active orders |
| `bell-slash` | No notifications |
| `fire-burner` | Kitchen queue empty |

### 8.6 Bottom Nav Icons by Role

| Role | Tabs (icon sequence) |
|---|---|
| Customer | `utensils` / `shopping-bag` / `receipt` / `user` |
| Cashier | `clipboard-list` / `credit-card` / `chart-bar` / `table-cells` / `user` |
| Kitchen | `fire-burner` / `clock-rotate-left` / `user` |
| Courier | `box` / `route` / `clock-rotate-left` / `user` |
| Admin | `gauge-high` / `tags` / `calendar-check` / `user` |
| Manager | `gauge-high` / `tags` / `calendar-check` / `user` |

---

## 9. Layout & App Shell

### 9.1 Screen Structure

**Standard layout** (customer, cashier, kitchen, courier):

```
┌───────────────────────────────────┐
│           HEADER (sticky)         │  ← 52dp
│  [icon] Logo         🔔 (notif)   │
├───────────────────────────────────┤
│                                   │
│           MAIN CONTENT            │
│     max-width 1024, centered      │  ← padding 16dp H
│     padding-bottom 96dp           │     (avoid bottom nav overlap)
│                                   │
├───────────────────────────────────┤
│       BOTTOM NAV (fixed)          │  ← ~60dp
│  [Tab1] [Tab2] [Tab3] [Tab4]      │
└───────────────────────────────────┘
```

**Admin / Manager layout** (with side drawer):

```
┌───────────┬───────────────────────┐
│  DRAWER   │      HEADER           │
│  260dp    │  [☰] Logo  🔔        │
│  (240dp   ├───────────────────────┤
│   mobile) │                       │
│           │    MAIN CONTENT       │
│ [Avatar]  │  max-width 1024       │
│ [Name]    │  centered             │
│ [Role]    │                       │
│           │                       │
│ Nav item  │                       │
│ Nav item  │                       │
│ Nav item  │                       │
│ Nav item  │                       │
│ Nav item  │                       │
│           │                       │
│ [Keluar]  │                       │
└───────────┴───────────────────────┘
     ← Drawer toggles open/close →
     ← Backdrop 50% black when open →
```

**Login screen**:

```
┌───────────────────────────────────────┐
│                                       │
│      Decorative radial circles        │
│      (3 layers, various opacity)      │
│                                       │
│       ┌──── [App Logo + Name] ──┐     │
│       │    ARQA Coffee           │     │
│       │    Smart Cafe Management │     │
│       └──────────────────────────┘     │
│                                       │
│       ┌── Glass Panel ────────────┐   │
│       │   Pilih Peran & Masuk     │   │
│       │                            │   │
│       │  ┌────┐ ┌────┐ ┌────┐    │   │
│       │  │Admin│ │Mgr │ │Cash│    │   │
│       │  └────┘ └────┘ └────┘    │   │
│       │  ┌────┐ ┌────┐ ┌────┐    │   │
│       │  │Kit.│ │Cour│ │Cust│    │   │
│       │  └────┘ └────┘ └────┘    │   │
│       │                            │   │
│       │  [Email] [Pass] [Login]   │   │
│       │  Register | Lupa Pass     │   │
│       └────────────────────────────┘   │
│                                       │
│      v1.0 MVP footer                  │
└───────────────────────────────────────┘
```

### 9.2 Header Details

| Property | Value |
|---|---|
| Position | Sticky top (z-index above content) |
| Height | 52dp (flex, center-aligned) |
| Background | surface at 85% opacity, blur 24dp |
| Bottom border | 1dp border |
| Inner max width | 1024dp, centered |
| Inner padding H | 16dp |
| Logo area | 32dp icon + brand name (14dp, bold) |
| Action area | Notification bell (40dp, rounded-xl) |

### 9.3 Main Content Area

| Property | Value |
|---|---|
| Max width | 1024dp |
| Alignment | Center (auto horizontal margin) |
| Padding H | 16dp |
| Padding V | 16dp |
| Padding bottom | 96dp (for bottom nav clearance) |

### 9.4 Bottom Navigation Details

| Property | Value |
|---|---|
| Position | Fixed bottom, full width |
| Height | ~60dp |
| Background | bg at 95% opacity, blur 20dp |
| Top border | 1dp border |
| Layout | Flex, space-around |
| Tab count per role | Customer: 4, Cashier: 5, Kitchen: 3, Courier: 4, Admin: 4, Manager: 4 |
| Active indicator | primary color, icon scale 1.1 |
| Notification dot | 8dp circle, danger, top-right |

### 9.5 Side Drawer Details

| Property | Value |
|---|---|
| Width | 260dp (≥768px) / 240dp (<768px) |
| Background | bg-secondary |
| Right border | 1dp border |
| Default state | Offscreen left |
| Open animation | translateX: -100% → 0, 300ms ease |
| Item padding | 14dp V × 24dp H |
| Item layout | Icon (20dp) + label (14dp), gap 12dp |
| Active state | primary bg 10% opacity + primary text |
| Header | Avatar 40dp + name (14dp) + role (12dp) |
| Footer | Absolute bottom, logout button |
| Nav items | 10 items (admin & manager) |

### 9.6 Common Page Structure

```
┌───────────────────────────────────┐
│  Heading section                  │
│  ┌─ Page Title ────────────────┐  │
│  │  24dp bold / 20dp muted desc│  │
│  └─────────────────────────────┘  │
│  ┌─ Stat cards row ────────────┐  │
│  │ [card] [card] [card] [card] │  │
│  └─────────────────────────────┘  │
│  ┌─ Search/filter bar ─────────┐  │
│  │ [🔍 input]                  │  │
│  │ [chip1] [chip2] [chip3]     │  │
│  └─────────────────────────────┘  │
│  ┌─ Content area ──────────────┐  │
│  │  Grid or list of items      │  │
│  │  [card] [card]              │  │
│  └─────────────────────────────┘  │
└───────────────────────────────────┘
```

### 9.7 Grid Column Variations

| Columns | Usage |
|---|---|
| 2 | Menu items, login roles (mobile), stat rows |
| 2 → 3 (≥768px) | Login role cards |
| 2 → 4 (≥768px) | Tables grid, charts, quick stats |
| 2 → 5 (≥768px) | Finance stats |
| 2 → 6 (≥768px) | Admin overview stat cards |
| 2 → 8 (≥768px, 4-col) | Table status grid |
| 2 side-by-side (≥768px) | Chart + list layout |

### 9.8 Common Layout Patterns

**Search / Filter Bar**

```
┌───────────────────────────────────────┐
│  [🔍]  Cari...          [input field] │
│  [Semua] [Kopi] [Non-Kopi] [Food]     │  ← horizontal scroll
└───────────────────────────────────────┘
```

**Form Layout**

```
Label (12dp, semibold, muted, block, margin bottom 4dp)
┌──────────────────────────────────┐
│  Input field                     │  ← 48dp height, full width
│  14dp text, 16dp padding H      │
└──────────────────────────────────┘

[Primary Button] (full width, margin top 16dp)
```

**Empty State Layout**

```
┌───────────────────────────────────┐
│          (padding V: 48dp)        │
│                                   │
│          ┌─────────────┐          │
│          │  Icon (48dp) │          │
│          │  (muted/tint)│          │
│          └─────────────┘          │
│                                   │
│       Tidak ada [data]            │  ← text-muted, centered
│                                   │
└───────────────────────────────────┘
```

**Dual Action Button (Modal)**

```
┌─────────────────┐  ┌──────────────────┐
│  [Batal / Cancel]│  │  [Konfirmasi]    │
│  ghost style     │  │  primary style   │
└─────────────────┘  └──────────────────┘
```

**Date Range Filter**

```
┌─────────────────┐  ┌─────────────────┐
│  [📅 date pick] │  │  [📅 date pick] │
└─────────────────┘  └─────────────────┘
```

---

## 10. Z-Index Stack

| Level | Elements |
|---|---|
| 1 | Map containers |
| 10 | Map controls (Leaflet) |
| 50 | Header (sticky) |
| 100 | Bottom navigation |
| 199 | Drawer backdrop overlay |
| 200 | Side drawer |
| 500 | Modal overlay + content |
| 10000 | Toast / snackbar container |

---

## 11. Responsive Behavior

| Breakpoint | Changes |
|---|---|
| < 768dp | 1–2 column grids, bottom nav, drawer width 240dp, modals have 10dp margin |
| ≥ 768dp | Multi-column grids (2–8), side drawer 260dp, side-by-side layouts |

---

## 12. Accessibility

- All interactive elements must have visible focus states
- Color contrast meets WCAG AA minimum
- `prefers-reduced-motion: reduce` disables all animations (0s)
- Touch targets: minimum 44dp for interactive controls
- Form inputs have associated labels
