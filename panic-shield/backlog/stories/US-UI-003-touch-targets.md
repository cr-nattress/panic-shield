# User Story: Touch Target Optimization

## Story
As a mobile user, I want all interactive elements to be easily tappable so that I can use the app comfortably without accidental misclicks.

## Current State
- Arrow indicators (>) in emotion cards are too small
- Some buttons may not meet minimum touch target sizes
- Insufficient padding around clickable elements
- No visual indication of tap areas

## Acceptance Criteria
- [ ] All touch targets minimum 44x44px (WCAG 2.1 AAA)
- [ ] Arrow indicators expanded to full card click area
- [ ] Adequate spacing between adjacent touch targets (8px minimum)
- [ ] Visual feedback on touch/tap
- [ ] Extended hit areas for small icons
- [ ] Proper padding for all interactive elements

## Technical Requirements
```css
/* Touch Target Standards */
.touch-target {
  min-height: 44px;
  min-width: 44px;
  position: relative;
}

/* Extended Hit Area */
.small-icon::before {
  content: '';
  position: absolute;
  inset: -8px; /* Extends hit area by 8px */
  z-index: 1;
}

/* Card Click Areas */
.emotion-card {
  cursor: pointer;
  padding: 16px;
  /* Entire card is clickable */
}
```

## Implementation Tasks
- [ ] Audit all interactive elements for size
- [ ] Expand emotion card click areas
- [ ] Increase button padding where needed
- [ ] Add extended hit areas to icons
- [ ] Ensure proper spacing between targets
- [ ] Add touch feedback animations
- [ ] Test on actual devices

## Testing
- Touch target size audit
- Mobile device testing (iOS/Android)
- Accessibility testing
- User testing with various hand sizes
- Tap accuracy testing

## Effort Estimate
**Size**: Medium (2-3 days)

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

Fixes: US-UI-003-touch-targets"
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
