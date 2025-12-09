## AI Coding Hackathon Web App Requirements

- **Purpose**: Let participants join the hackathon by name, browse available coding projects as cards, sign up for exactly one project at a time, switch projects, or give up their current selection. Allow proposing new project ideas.
- **Audience**: Hackathon participants and organizers viewing the single-page web app in a browser.
- **Tech stack**: Client-side web app (HTML/CSS/JS). No backend required; use in-memory state only.

### Core User Flows
- **Enter name**: User must provide a non-empty name to start. Show clear error messaging if missing.
- **Browse projects**: Projects displayed as responsive cards with title, description, tech tags, and current signup count.
- **View details**: Selecting a card reveals detail view/modal with fuller description and signup stats.
- **Sign up**: User can join one project at a time. Joining increments the project’s signup count and marks it as “Your project”.
- **Switch**: Joining a new project automatically frees the previous project and updates both counts.
- **Give up**: User can leave their current project without joining another; counts update accordingly.
- **Propose project**: Form to submit a new project idea (title, description, optional tech tags). Newly added projects appear as cards at the top of the list with signup count 0 and are available to join immediately.

### Functional Requirements
- Require name before enabling join/propose actions.
- Prevent multiple simultaneous project assignments for a user.
- Update counts reactively on join/switch/give up.
- Persist current selection and project list in-memory for the session; no backend calls.
- Validate forms: non-empty name, project title, and description; show inline errors.
- Provide reset/clear-all action for organizers during testing (optional).

### UX and UI
- Friendly hackathon branding (colors, badge/pill for “Your project”).
- Cards: title, short description, tech tags, signup count, quick actions (View/Join).
- Detail view or expandable area with fuller description and primary actions.
- Sticky header with user name entry and current selection status.
- Empty states: no projects, no selection.
- Responsive layout: cards wrap on small screens; comfortable spacing.
- Toast/inline confirmations for join/switch/leave and proposal submissions.

### Accessibility & Usability
- Keyboard focusable interactive elements and visible focus styles.
- Sufficient color contrast; avoid color-only state cues.
- ARIA labels for buttons/inputs where helpful; associate labels with inputs.
- Announce errors; prevent submission when invalid.
- Avoid motion; keep interactions lightweight.

### Data Model (front-end state)
- `userName: string`
- `selectedProjectId: string | null`
- `projects: Array<{ id, title, description, tags: string[], signups: number }>`
- `ui: { modalProjectId?: string, toasts?: [...] }` (implementation detail)

### Initial Sample Projects
- AI Mentor Chatbot (JS/Node) — mentor-style guidance.
- Code Review Copilot (Python) — suggests reviews.
- DevOps Flow Analyzer (Go) — detects pipeline bottlenecks.

### Non-Goals / Out of Scope
- Authentication, persistence, or backend APIs.
- Real-time multi-user sync.
- Payments, scoring, or judging logic.

### Acceptance Criteria
- User cannot join or propose without entering a name.
- Cards show accurate live signup counts; switching updates counts correctly.
- Detail view shows selected state and actions (Join/Switch/Give up).
- Proposing a project immediately adds a card and can be joined.
- Responsive cards render without layout breakage at mobile widths.
- Basic accessibility checks pass (labels, focusable controls, contrast-friendly styling).
