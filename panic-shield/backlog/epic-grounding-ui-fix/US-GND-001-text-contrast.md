# US-GND-001: Fix Text Visibility and Contrast

## User Story
**As a** user experiencing panic
**I want** to clearly see all text and placeholders in the grounding exercise
**So that** I can focus on the calming technique without straining to read

## Priority: P0 (Critical)
## Story Points: 3
## Sprint: Current

## Problem
- Placeholder text opacity is ~20%, making it nearly invisible
- White text on light purple background fails WCAG contrast requirements
- Input field text lacks sufficient weight and visibility
- Eye icon has poor contrast against background

## Acceptance Criteria
- [ ] All placeholder text has minimum opacity of 0.7
- [ ] All text elements pass WCAG AA contrast ratio (4.5:1)
- [ ] Input text is fully opaque and readable
- [ ] Icons have sufficient contrast (3:1 minimum)
- [ ] Text remains readable in both light and dark modes

## Technical Tasks
1. **Update placeholder styles**
   ```css
   input::placeholder {
     opacity: 0.7;
     color: rgba(255, 255, 255, 0.8);
   }
   ```

2. **Fix input text visibility**
   ```css
   input {
     color: white;
     opacity: 1;
     font-weight: 500;
   }
   ```

3. **Add text shadows for legibility**
   ```css
   .grounding-input {
     text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
   }
   ```

4. **Improve icon contrast**
   ```css
   .sense-icon {
     opacity: 0.9;
     filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
   }
   ```

## UI Issues Being Fixed
| Issue | Current State | Fixed State |
|-------|--------------|------------|
| Placeholder opacity | ~0.2 | 0.7 |
| Text color contrast | 2.1:1 (fail) | 4.5:1 (pass) |
| Input text weight | 400 | 500 |
| Icon visibility | Poor | Good with shadow |

## Testing Checklist
- [ ] Test with WAVE accessibility tool
- [ ] Verify with color contrast analyzer
- [ ] Test in bright sunlight conditions (mobile)
- [ ] Verify in dark mode
- [ ] Test with Windows high contrast mode

## Files to Modify
- `/components/panic/GroundingExercise.tsx`
- `/styles/grounding.css` (create if needed)
- `/app/panic-mode.css`

## Definition of Done
- [ ] All text passes automated contrast testing
- [ ] Manual testing confirms readability
- [ ] Code reviewed and approved
- [ ] No regression in other screens
- [ ] Documentation updated

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
git commit -m "fix(grounding): improve grounding exercise UI

- Increased placeholder opacity from 0.2 to 0.7
- Fixed text contrast to meet WCAG AA standards (4.5:1)
- Added text shadows for better legibility
- Improved icon visibility with drop shadows

Fixes: US-GND-001-text-contrast"
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
