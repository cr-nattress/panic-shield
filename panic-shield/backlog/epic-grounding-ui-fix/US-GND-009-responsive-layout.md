# US-GND-009: Optimize Responsive Layout

## User Story
**As a** user on various devices
**I want** the grounding exercise to adapt to my screen size
**So that** I have an optimal experience regardless of device

## Priority: P3 (Low)
## Story Points: 2
## Sprint: Backlog

## Problem
- Layout not optimized for tablets
- Landscape orientation issues
- Text size inconsistent across devices
- Desktop view has too much whitespace
- Small phones may have overlap issues

## Acceptance Criteria
- [ ] Works on 320px to 2560px widths
- [ ] Landscape orientation handled
- [ ] Tablet layout optimized
- [ ] Desktop has max-width container
- [ ] Font sizes scale appropriately

## Technical Tasks
1. **Responsive container**
   ```css
   .grounding-container {
     width: 100%;
     max-width: 600px;
     margin: 0 auto;
     padding: 16px;
   }
   
   @media (min-width: 768px) {
     .grounding-container {
       padding: 24px;
     }
   }
   
   @media (min-width: 1024px) {
     .grounding-container {
       max-width: 720px;
       padding: 32px;
     }
   }
   ```

2. **Responsive typography**
   ```css
   .exercise-title {
     font-size: clamp(1.5rem, 4vw, 2rem);
     line-height: 1.3;
   }
   
   .exercise-description {
     font-size: clamp(0.875rem, 2.5vw, 1rem);
   }
   
   .grounding-input {
     font-size: clamp(1rem, 2.5vw, 1.125rem);
   }
   ```

3. **Landscape adjustments**
   ```css
   @media (orientation: landscape) and (max-height: 500px) {
     .grounding-card {
       padding: 12px 16px;
     }
     
     .grounding-input {
       min-height: 44px;
       padding: 8px 16px;
       margin-bottom: 8px;
     }
     
     .progress-dots {
       position: fixed;
       top: 8px;
       right: 16px;
     }
   }
   ```

4. **Grid layout for tablets**
   ```css
   @media (min-width: 768px) and (orientation: landscape) {
     .input-group {
       display: grid;
       grid-template-columns: 1fr 1fr;
       gap: 16px;
     }
     
     .grounding-input:nth-child(5) {
       grid-column: 1 / -1;
     }
   }
   ```

## UI Issues Being Fixed
| Issue | Current State | Fixed State |
|-------|--------------|------------|
| Mobile width | Fixed | Fluid responsive |
| Tablet layout | Not optimized | Grid layout |
| Desktop width | Full width | Max 720px |
| Font scaling | Fixed sizes | Clamp() scaling |
| Landscape | Cramped | Adjusted spacing |

## Testing Checklist
- [ ] Test all breakpoints
- [ ] Rotate devices
- [ ] Check on real devices
- [ ] Test with zoom
- [ ] Verify text doesn't truncate
- [ ] Test with long content

## Files to Modify
- `/components/panic/GroundingExercise.tsx`
- Responsive styles file

## Definition of Done
- [ ] All breakpoints tested
- [ ] No horizontal scroll
- [ ] Content always visible
- [ ] Touch targets maintained
- [ ] Performance not impacted

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

Fixes: US-GND-009-responsive-layout"
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
