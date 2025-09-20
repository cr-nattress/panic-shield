# User Story: Color Contrast Improvements

## Story
As a user with visual impairments, I want sufficient color contrast throughout the app so that I can easily read all text and distinguish interface elements.

## Current State
- Gray text on white backgrounds lacks contrast
- Some text may not meet WCAG AA standards
- Insufficient contrast in disabled states
- Light text on colored backgrounds needs review

## Acceptance Criteria
- [ ] All text meets WCAG 2.1 AA contrast ratios (4.5:1 normal, 3:1 large)
- [ ] Primary text uses #333333 on white
- [ ] Secondary text uses #666666 on white
- [ ] Disabled states maintain 3:1 minimum contrast
- [ ] Interactive elements have 3:1 contrast against backgrounds
- [ ] Error and success states meet contrast requirements

## Technical Requirements
```css
/* Color Contrast Standards */
--text-primary: #333333;    /* 12.63:1 on white */
--text-secondary: #666666;  /* 5.74:1 on white */
--text-muted: #999999;      /* 2.85:1 - use sparingly */
--text-disabled: #AAAAAA;   /* 2.32:1 - disabled only */

/* On Dark Backgrounds */
--text-on-dark: #FFFFFF;
--text-on-dark-secondary: #E0E0E0;

/* Interactive Elements */
--link-color: #0066CC;      /* 5.48:1 on white */
--link-hover: #0052A3;      /* 7.04:1 on white */
```

## Implementation Tasks
- [ ] Audit current color contrast ratios
- [ ] Update text color tokens
- [ ] Fix low contrast text
- [ ] Update link colors
- [ ] Review colored backgrounds
- [ ] Test with accessibility tools
- [ ] Document color system

## Testing
- WCAG contrast checker tools
- Accessibility audit (axe, WAVE)
- Color blindness simulation
- Screen reader testing
- User testing with visually impaired users

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

Fixes: US-UI-005-color-contrast"
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
