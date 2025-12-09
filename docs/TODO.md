## TODO

- [ ] Confirm UX flow: modal vs inline expansion for project details.
- [ ] Define initial project seed data (3–5 items with tags).
- [ ] Build layout skeleton: header (name entry + status), project grid, detail/cta area, propose form, toast area.
- [ ] Implement state model (user name, selectedProjectId, projects list, UI flags).
- [ ] Name gate: disable join/propose until a name is set; show inline error.
- [ ] Project cards: render title, short description, tags, signup count, quick actions.
- [ ] Detail view: show full description, signup count, join/switch/give up actions.
- [ ] Join/switch logic: enforce single active project; adjust counts on switch.
- [ ] Give up logic: clear selection; decrement count safely.
- [ ] Propose form: validate title/description, optional tags; prepend new project card.
- [ ] Toasts/inline confirmations for join/switch/leave/propose.
- [ ] Empty states for no projects and no selection.
- [ ] Responsive styling for small screens (card wrapping, readable spacing).
- [ ] Accessibility pass: labels, focus, contrast, and button semantics.
- [ ] Optional: reset/seed controls for quick testing.
