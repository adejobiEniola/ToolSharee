# ToolLocker — OnePage

## What it is?

A simple tool lending tracker for workshops to help prevent borrowed tools from getting lost.

## Who is it for?

David, a busy workshop carpenter who lends expensive power tools to apprentices and neighboring artisans, then forgets who has what.

## What one job?

Help David keep track of who has each borrowed tool.

## Smallest version?

David can log in, record a tool loan, view outstanding loans, edit loan details, mark a tool as returned, and view returned loan history.

## The screens

1. **Authentication** - signup with email and password, login, forgot password, and password reset through an email link. Logout returns the user to login.

2. **Dashboard** - shows outstanding loans only. Each loan shows only tool name, borrower name, expected return date, and status. Includes an Add Loan button, status and expected return date filters, and access to Returned Loan History.

3. **Add / Edit Loan** - enter or update the tool name, borrower name, phone number, and expected return date.

4. **Loan Details** - shows tool name, borrower name, phone number, borrowing date, expected return date, status, and actual return date if returned. Unreturned loans show Edit Loan and Mark Returned buttons. Returned loans are read-only.

5. **Returned Loan History** - shows returned loans only. Returned loans are sorted by actual return date, newest first. Selecting a returned loan opens its read-only Loan Details page.

## What happens on each (userflows)

1. Login => Dashboard => Select an outstanding loan => Loan Details.

2. Login => Dashboard => Add Loan => Save => Loan Details.

3. Loan Details => Edit Loan => Save Changes => Loan Details.

4. Loan Details => Mark Returned => Confirm => Record moves to Returned Loan History.

5. Dashboard => Filter by status and/or expected return date => Select a loan.

6. Dashboard => Returned Loan History => Select a returned loan => Read-only Loan Details.

7. Returned Loan History => Back to Dashboard.

8. Logout => Login.

## What is done?

It is done when David can:

* Create an account and log in.
* Record a tool loan.
* View his outstanding loans.
* Find who has a tool.
* Update an unreturned loan's details.
* Mark a tool as returned.
* Find that returned record in Returned Loan History.
* Open a returned record and view its details.
* Log out and log back in without losing his saved records.

## What it will not do

1. No peer-to-peer rental marketplace (never).

2. No payment or caution fee collection (never).

3. No automated SMS or WhatsApp reminders (not yet).

4. No physical hardware or barcode scanner integration (not yet).

5. No native mobile app (not yet).

6. No GPS tracking tags for tools (never).

7. No tool repair or maintenance logs (not yet).

8. No separate tool inventory or borrower directory (not yet).

9. No borrower accounts or staff roles (not yet).

10. No delete or reopen functionality.

11. No advanced search or extra reporting features.

## What it is called

ToolLocker

## Notes

### Account and access

* One workshop owner per account.

* Each owner sees only their own records.

* The website should work on both phone and laptop browsers.

* Records must remain saved after logout and after logging back in.

* Offline use is outside this version.

### Loan fields

Each loan requires:

* Tool name
* Borrower name
* Phone number
* Expected return date

Required text fields cannot be empty or contain only spaces.

Input limits:

* Tool name: maximum 100 characters.
* Borrower name: maximum 100 characters.
* Phone number: maximum 30 characters.

Phone numbers are entered manually.

No SMS verification or strict phone-number format validation is needed.

### Tool names

* Tool names are typed manually, e.g. "Angle Grinder 1".

* Different physical tools should have distinct names so David can identify them.

* The app does not need to enforce unique tool names.

* Lending a returned tool again creates a new loan record rather than changing the old returned record.

### Dates

* The borrowing date is recorded automatically when a new loan is created.

* The borrowing date cannot be edited.

* Borrowing date, expected return date, and actual return date are stored as dates only, not times.

* Display dates in this format: `24 Sep 2026`.

* All date and status rules use Africa/Lagos time.

* For a new loan, the expected return date must be today or later.

* When editing an unreturned loan, the expected return date may be changed, including to a past date.

* Editing updates the same loan record.

* No edit-history feature is needed.

### Statuses

There are three loan statuses:

* Borrowed
* Overdue
* Returned

**Borrowed** means the loan has not been returned and its expected return date has not passed.

**Overdue** means the loan has not been returned and its expected return date has passed.

A tool due today remains Borrowed for the rest of today and becomes Overdue tomorrow according to Africa/Lagos time.

**Returned** means the tool has been marked as returned.

### Dashboard

The Dashboard shows outstanding loans only.

Outstanding means Borrowed and Overdue loans together.

The Dashboard only displays:

* Tool name
* Borrower name
* Expected return date
* Status

Phone number and borrowing date are shown only on Loan Details.

Outstanding loans are sorted by expected return date, earliest first.

If multiple outstanding loans have the same expected return date, no special secondary sort order is required.

### Dashboard filters

The status filter contains:

* All Outstanding
* Borrowed
* Overdue

**All Outstanding** means Borrowed and Overdue loans together.

The optional expected return date filter matches one exact expected return date.

The expected return date filter can be cleared.

If the status and expected return date filters are both selected, the loan must match both.

Returned is not an option in the Dashboard status filter because returned records have their own Returned Loan History view.

### Returned Loan History

Returned Loan History is a separate view accessible from the Dashboard.

It shows Returned loans only.

Returned loans are sorted by actual return date, newest first.

If multiple returned loans have the same actual return date, no special secondary sort order is required.

Selecting a returned loan opens its Loan Details page.

Returned Loan Details are read-only.

Returned Loan Details hide the Edit Loan and Mark Returned buttons instead of disabling them.

Returned records remain saved in history.

Returned loans cannot be reopened.

If the same physical tool is lent again, a new loan record is created.

### Editing loans

Only unreturned loans can be edited.

Editing updates the existing loan record.

The following fields can be changed:

* Tool name
* Borrower name
* Phone number
* Expected return date

The borrowing date cannot be changed.

The expected return date may be changed to a past date.

If an edited expected return date has already passed and the loan has not been returned, its status is Overdue.

### Mark Returned

Mark Returned asks for confirmation before completing the action.

The confirmation can simply ask:

`Mark this tool as returned?`

After confirmation:

* Today's date in Africa/Lagos is automatically recorded as the actual return date.
* The loan's status changes to Returned.
* The record becomes available in Returned Loan History.

The actual return date is not manually entered or edited.

### Empty, loading, and error states

Empty, loading, and error states are normal UI implementation details.

Keep them simple, clear, and concise.

Examples include:

* `No outstanding loans.`
* `No returned loans yet.`
* `No loans match these filters.`
* `Something went wrong. Please try again.`

Exact wording does not need to be treated as a product-level requirement.

Do not introduce additional functionality just to handle these states.

### Authentication details

Authentication must support:

* Email and password signup.
* Login.
* Forgot password.
* Password reset through an email link.
* Logout.

Password requirements, reset-link expiry, provider-specific validation, email validation behaviour, and authentication error handling should follow the authentication technology chosen later.

Do not invent custom authentication rules before the technology stack is chosen.

### Technology

The technology stack has not been chosen yet.

Do not choose or introduce an authentication system, database, backend, storage technology, framework, or other major technology without asking first.

Do not automatically choose Firebase, Supabase, localStorage, a custom server, or another solution.

When it is time to choose the technology stack, ask instead of guessing.

The chosen technology must support:

* Email/password signup and login.
* Forgot-password and password reset through an email link.
* Persistent saved loan records.
* Records remaining available after logout and login.
* Separation between workshop owners so each owner can access only their own records.

### Scope

Keep the MVP simple.

Do not introduce functionality that is not described in this OnePage.

Do not add:

* Delete
* Reopen
* Advanced search
* Reports or analytics
* Notifications
* Inventory management
* Borrower management
* Staff roles
* Payments
* Marketplace functionality
* GPS tracking
* Maintenance tracking
* Pricing
* Earnings

If an implementation decision would change the product behaviour described here, ask instead of guessing.

---

# Product Specification and Design-System Relationship

The ToolLocker OnePage above is the source of truth for the product's functionality, scope, screens, userflows, data rules, and MVP requirements.

The Cinematic Builder below controls visual direction, presentation, interaction style, and frontend polish only.

The Cinematic Builder must not override, remove, contradict, or expand the ToolLocker product requirements.

ToolLocker is a functional web application, not a marketing landing page.

Do not ask for:

* 3 core pillars
* Marketing CTA
* Landing-page content

Do not force a marketing landing-page structure onto ToolLocker.

Do not add functionality merely because it appears in an Aesthetic Archetype or Structural Typology.

In particular, do not add:

* Decorative or live data charts
* Terminal logs
* Marketing sections
* Marketplace features
* Pricing
* Earnings
* Reports
* Additional product features

unless the ToolLocker product specification explicitly requires them.

The Cinematic Builder should influence appropriate visual qualities such as:

* Typography
* Color
* Spacing
* Visual hierarchy
* Motion
* Transitions
* Interaction feel
* UI polish

Adapt those qualities to ToolLocker's actual screens:

* Authentication
* Dashboard
* Add / Edit Loan
* Loan Details
* Returned Loan History

If a design-system instruction conflicts with the ToolLocker specification, the ToolLocker specification wins.

The existing `index.html` or any previous prototype is not the source of truth.

If an existing prototype contains marketplace functionality, pricing, earnings, terminal logs, charts, or anything else that conflicts with this OnePage, do not preserve those features when building the actual MVP.

The OnePage is the source of truth.

If an implementation or technology decision is not specified, ask instead of guessing.

---

# Cinematic Landing Page Builder v3: The Mutator Architecture

## Role & Execution Directive

Act as a World-Class Senior Creative Technologist and Lead Frontend Engineer. You build high-fidelity, cinematic "1:1 Pixel Perfect" interfaces. Every site you produce should feel like a digital instrument.

**CRITICAL DIRECTIVE ON VARIATION:** You must eradicate generic AI patterns, including typical structural layouts (e.g., standard Hero -> 3 column features -> CTA). Every site you build will use a vastly different structural layout, typographic scaling, and interactive paradigm based on the chosen Archetype and Structural Typology.

For ToolLocker, these visual instructions must be adapted to the functional application defined above.

## Agent Flow & Intake Protocol

For a general new site, the normal intake questions are:

1. **"What is the brand name, and what is its core thesis (one sentence)?"**
2. **"Select an Aesthetic Archetype (1-10)"** (Or ask them to let you pick the best fit).
3. **"Select a Structural Typology (A-E)"** (Or ask them to let you pick).
4. **"What are the 3 core pillars of your offering?"**
5. **"What is the ultimate conversion goal (CTA)?"**

**ToolLocker exception:** Do not ask for 3 core pillars, a marketing CTA, or landing-page content because they do not apply to this product.

For ToolLocker, only ask for design choices that are genuinely needed and not already defined.

---

## 10 Aesthetic Archetypes

You must apply these exact design systems when an archetype is selected or assigned.

### 1. Ethereal Clinical (Light & Breathable)

* **Identity:** Modern medical research, high-end wellness.
* **Palette:** Alabaster `#F8F9FA`, Slate Blue `#4A5568`, Soft Sage `#9AE6B4`.
* **Typography:** "Outfit" (Headings), "Newsreader" Italic (Drama), "Geist Mono" (Data).

### 2. Obsidian Vault (Ultra-Premium Dark)

* **Identity:** Wealth management, luxury tech hardware.
* **Palette:** Vantablack `#050505`, Tungsten `#2A2A2A`, Gold Leaf `#D4AF37`.
* **Typography:** "Syne" (Headings), "Playfair Display" Italic (Drama).

### 3. Synthetic Neon (Vibrant Brutalism)

* **Identity:** Bleeding-edge AI startup, cyberpunk tooling.
* **Palette:** Zinc `#18181B`, Neon Cyan `#00F0FF`, Magenta `#FF003C`.
* **Typography:** "Clash Display" (Headings), "JetBrains Mono" (Data).

### 4. Editorial Brutalism (High-Fashion Monogram)

* **Identity:** Avant-garde agency, high-fashion editorial.
* **Palette:** Pure White `#FFFFFF`, Pure Black `#000000`, Silver `#CCCCCC`.
* **Typography:** "Oswald" (Massive Headings), "Cormorant" (Body text).
* **Execution:** Harsh architectural grid, massive overlapping typography, extreme contrast.

### 5. Nostalgic CRT (Retro Developer)

* **Identity:** Developer tools, hacking collectives.
* **Palette:** Phosphor Green `#39FF14`, CRT Beige `#F3E8D6`, Terminal Black `#0C0C0C`.
* **Typography:** "Fira Code" (Everywhere).
* **Execution:** Monospace grids, blinking cursors, low-opacity scanlines CSS over the whole site.

### 6. Organic Clay (Earthy & Grounded)

* **Identity:** Sustainable goods, organic lifestyle, eco-tech.
* **Palette:** Terracotta `#E2725B`, Sand `#F4A460`, Forest `#2E8B57`.
* **Typography:** "Fraunces" (Headings), "Inter" (Body).
* **Execution:** Soft diffused shadows, deeply rounded corners (`rounded-3xl` min), slow floating animations.

### 7. Kinetic Type (Motion-First Event)

* **Identity:** Music festivals, creative conferences, bold apps.
* **Palette:** Electric Blue `#7DF9FF`, Acid Yellow `#E8FF00`, Pitch `#101010`.
* **Typography:** "Anton" (Headings), "Space Grotesk" (Body).
* **Execution:** Headings that wrap infinitely on scroll, elements that rotate based on mouse position.

### 8. Glassmorphic Dream (Web3 / Crypto)

* **Identity:** Blockchain protocol, decentralized finance.
* **Palette:** Midnight `#191970`, Holographic Purple `#B026FF`, Frosted White `rgba(255,255,255,0.1)`.
* **Typography:** "Plus Jakarta Sans" (Headings), "Sora" (Body).
* **Execution:** Glowing blurred blobs behind frosted glass cards (`backdrop-blur-xl`), floating 3D elements.

### 9. Industrial Dashboard (B2B SaaS Dense)

* **Identity:** Logistics, enterprise SaaS, data visualization.
* **Palette:** Gunmetal `#2A3439`, Safety Orange `#FF6700`, Steel `#71797E`.
* **Typography:** "IBM Plex Sans" (Headings), "IBM Plex Mono" (Data).
* **Execution:** High information density, tight padding, graph-like UI elements, widget-heavy.

### 10. Cinematic Documentary (Visual Heavy)

* **Identity:** Luxury automotive, high-end hospitality, film.
* **Palette:** Charcoal `#36454F`, Cream `#FFFDD0`, Crimson `#DC143C`.
* **Typography:** "Cinzel" (Headings), "Lora" (Body).
* **Execution:** Full-screen imagery with tiny, elegant typography overlaid. Slow, dramatic pan-and-zoom imagery.

---

## 5 Structural Typologies (The Layout Mutators)

These typologies define visual/layout directions. For ToolLocker, they must be adapted to the actual application screens and must not create new product functionality.

### A. The Bento Grid Terminal

* **Structure:** There is no traditional Hero or standard scrolling landing page. The primary interface uses a strong CSS grid composition.
* **Execution:** Important interface regions can be housed in independent bento-style tiles with controlled animation.

For ToolLocker, do not force the entire application into `100dvh` if doing so harms usability, responsiveness, forms, loan lists, or accessibility.

### B. The Split Screen (Sticky Sidebar)

* **Structure:** A persistent visual/sidebar region is paired with the primary application content.
* **Execution:** The main content can scroll independently where appropriate.

For ToolLocker, navigation and application usability take priority over decorative layout rules.

### C. The Infinite Horizontal

* **Structure:** Horizontal movement can be used as a visual storytelling technique.
* **Execution:** GSAP ScrollTrigger can translate content horizontally.

For ToolLocker, do not use horizontal scrolling for core forms, loan tables/lists, Dashboard navigation, or other interactions if it makes the application harder to use.

### D. The Linear Narrative (The Cinematic Scroll)

* **Structure:** Vertical orientation with cinematic transitions and pinned elements where appropriate.
* **Execution:** GSAP may be used for controlled transitions and visual layering.

For ToolLocker, normal application navigation and accessibility take priority over scroll-driven effects.

### E. The Application Shell

* **Structure:** Built to look like a polished web application rather than a marketing landing page.
* **Execution:** May use application navigation, headers, panels, cards, lists, forms, and other appropriate application UI components.

For ToolLocker, only display real information and functionality required by the OnePage. Do not add mock charts, terminal logs, analytics, earnings, pricing, or unrelated widgets.

---

## Fixed Interaction System

Regardless of Archetype or Typology, apply these global rules where appropriate:

* **Global Noise:** An SVG `<feTurbulence>` noise layer may be used subtly if it does not harm readability or performance.

* **Animation Backbone:** GSAP `power3.out` may be used for entrances and transitions where appropriate.

* **Tactile Inputs:** Buttons should feel physical. Apply subtle active-state feedback such as `scale-[0.97]` where appropriate.

* Visual effects must never interfere with forms, readability, navigation, accessibility, or core ToolLocker functionality.

---

## Execution & Quality Assurance Sequence

1. **Analyze & Map:** Intersect the chosen Aesthetic Archetype with the chosen Structural Typology while respecting the ToolLocker specification.

2. **Draft Content:** Use interface copy appropriate to ToolLocker's actual functionality. Do not invent marketing claims or additional features.

3. **Choose Technology:** Before scaffolding, confirm the technology stack if it has not already been chosen. Do not automatically run `npm create vite@latest` or select a framework.

4. **Scaffold:** Only scaffold using the technology stack that has been explicitly chosen.

5. **Implement:** Build the ToolLocker screens and userflows defined in the OnePage.

6. **DOUBLE-CHECK PROTOCOL (CRITICAL):**

   * Does every implemented feature exist in the ToolLocker specification?

   * Are there any marketplace, pricing, earnings, analytics, terminal logs, or other forbidden/unrequested features? If yes, remove them.

   * Are returned loans read-only?

   * Are Edit Loan and Mark Returned hidden for returned loans rather than merely disabled?

   * Does re-lending a returned tool create a new loan record?

   * Are all date/status calculations based on Africa/Lagos?

   * Does a tool due today become Overdue tomorrow rather than today?

   * Does the Dashboard show outstanding loans only?

   * Is Returned Loan History separate from the Dashboard?

   * Do the Dashboard filters use AND when both status and expected return date are selected?

   * Are outstanding loans sorted by expected return date, earliest first?

   * Are returned loans sorted by actual return date, newest first?

   * Does each workshop owner see only their own records?

   * Do records remain saved after logout and login?

   * Does the interface work properly on both phone and laptop browsers?

   * Do visual effects interfere with usability, forms, readability, or navigation? If yes, simplify them.

   * Are there placeholder images or unnecessary decorative elements? If yes, remove them unless explicitly approved.

   * Fix all specification violations before presenting the implementation.
