# User Story: Typography and Visual Hierarchy

## Story
As a user, I want clear visual hierarchy in the interface so that I can easily understand the importance of different information and navigate the app intuitively.

## Current State
- Headers lack weight variation
- All text appears with similar visual importance
- Subtitles blend with main headings
- No clear information hierarchy

## Acceptance Criteria
- [ ] Main headings use font-weight: 700 (bold)
- [ ] Subtitles use font-weight: 400 (regular) with smaller size
- [ ] Body text uses appropriate line-height (1.5-1.6)
- [ ] Consistent font sizes across similar elements
- [ ] Clear distinction between primary and secondary text
- [ ] Typography scale follows 1.25 ratio (Minor Third)

## Technical Requirements
```css
/* Typography Scale */
--font-size-xs: 0.75rem;   /* 12px */
--font-size-sm: 0.875rem;  /* 14px */
--font-size-base: 1rem;    /* 16px */
--font-size-lg: 1.25rem;   /* 20px */
--font-size-xl: 1.5rem;    /* 24px */
--font-size-2xl: 2rem;     /* 32px */
--font-size-3xl: 2.5rem;   /* 40px */

/* Font Weights */
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

## Implementation Tasks
- [ ] Create typography design tokens
- [ ] Update all heading components
- [ ] Apply consistent font weights
- [ ] Update subtitle styling
- [ ] Test readability across devices
- [ ] Document typography system

## Testing
- Visual regression testing
- Readability testing
- Accessibility testing for font sizes
- Cross-browser compatibility

## Effort Estimate
**Size**: Small (2 days)

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

Fixes: US-UI-001-typography-hierarchy"
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
