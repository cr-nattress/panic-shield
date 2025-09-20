# US-GND-003: Improve Input Field Spacing

## User Story
**As a** user filling out the grounding exercise
**I want** adequate spacing between input fields
**So that** I can easily distinguish and focus on each item

## Priority: P1 (High)
## Story Points: 2
## Sprint: Current

## Problem
- Input fields are cramped with less than 8px gaps
- Card container has insufficient padding (~12px)
- No visual breathing room between sections
- Title too close to first input field
- Overall cluttered appearance causes stress

## Acceptance Criteria
- [ ] Minimum 16px gap between input fields
- [ ] Card padding increased to 24px horizontal, 20px vertical
- [ ] Title has 24px margin bottom
- [ ] Visual hierarchy clearly established
- [ ] Layout feels open and calming

## Technical Tasks
1. **Update card container padding**
   ```css
   .grounding-card {
     padding: 24px 20px;
     margin: 16px;
   }
   ```

2. **Fix input field spacing**
   ```css
   .grounding-input {
     margin-bottom: 16px;
     padding: 16px 20px;
     min-height: 56px;
   }
   
   .grounding-input:last-child {
     margin-bottom: 0;
   }
   ```

3. **Improve title spacing**
   ```css
   .exercise-title {
     margin-bottom: 24px;
     line-height: 1.4;
   }
   
   .exercise-description {
     margin-bottom: 32px;
     line-height: 1.5;
   }
   ```

4. **Add section spacing**
   ```css
   .exercise-section {
     margin-bottom: 32px;
   }
   
   .input-group {
     display: flex;
     flex-direction: column;
     gap: 16px;
   }
   ```

## UI Issues Being Fixed
| Issue | Current State | Fixed State |
|-------|--------------|------------|
| Input gap | <8px | 16px |
| Card padding | ~12px | 24px/20px |
| Title margin | ~8px | 24px |
| Min touch size | ~40px | 56px |
| Section separation | None | 32px |

## Testing Checklist
- [ ] Measure actual pixel spacing in browser
- [ ] Test on small screens (320px width)
- [ ] Verify touch targets are 44px minimum
- [ ] Check visual balance and harmony
- [ ] Test with 5+ inputs visible

## Files to Modify
- `/components/panic/GroundingExercise.tsx`
- Related style files

## Definition of Done
- [ ] All spacing matches specifications
- [ ] Layout feels open and uncluttered
- [ ] No text truncation on mobile
- [ ] Approved by UX review
- [ ] Code reviewed and merged

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

Fixes: US-GND-003-input-spacing"
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
