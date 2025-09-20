# User Story: Border Radius Consistency

## Story
As a user, I want consistent corner rounding throughout the app so that the interface feels cohesive and professionally designed.

## Current State
- Panic page has inconsistent corner rounding
- Different border radius values across components
- No standardized system for rounded corners
- Visual inconsistency between cards and buttons

## Acceptance Criteria
- [ ] Establish border radius design tokens
- [ ] Cards use 12-16px border radius consistently
- [ ] Buttons use 8px border radius consistently
- [ ] Input fields use 6px border radius
- [ ] Modal dialogs use 16px border radius
- [ ] Small elements (badges, chips) use 4px border radius

## Technical Requirements
```css
/* Border Radius Tokens */
--radius-xs: 4px;   /* Badges, chips */
--radius-sm: 6px;   /* Input fields */
--radius-md: 8px;   /* Buttons */
--radius-lg: 12px;  /* Cards */
--radius-xl: 16px;  /* Modals, large cards */
--radius-2xl: 20px; /* Special emphasis */
--radius-full: 9999px; /* Circular elements */
```

## Implementation Tasks
- [ ] Create border radius design tokens
- [ ] Audit all components for border radius usage
- [ ] Update card components
- [ ] Update button components
- [ ] Update input components
- [ ] Update modal components
- [ ] Test visual consistency

## Testing
- Visual regression testing
- Component audit checklist
- Design review
- Cross-browser rendering

## Effort Estimate
**Size**: Small (1-2 days)

## Git Commit Guidelines

### Commit After Completion
**IMPORTANT**: Create a commit immediately after completing this user story.

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

Fixes: <story-id>
```

### Example Commit
```bash
git add -A
git commit -m "style(ui): improve UI consistency and accessibility

- Increased placeholder opacity from 0.2 to 0.7
- Fixed text contrast to meet WCAG AA standards (4.5:1)
- Added text shadows for better legibility
- Improved icon visibility with drop shadows

Fixes: US-UI-002-border-radius-consistency"
```

### Commit Types
- `feat`: New feature
- `fix`: Bug fix or improvement
- `refactor`: Code refactoring
- `style`: CSS/styling changes
- `docs`: Documentation only
- `test`: Test additions/changes
- `perf`: Performance improvements

### Pre-Commit Checklist
- [ ] All tests passing
- [ ] Lint checks passed
- [ ] Visual regression captured
- [ ] Story acceptance criteria met
- [ ] Code reviewed (if applicable)

### Push Guidelines
1. Commit locally first
2. Run tests: `npm test`
3. Push to feature branch: `git push origin feature/<story-id>`
4. Create PR if ready for review
