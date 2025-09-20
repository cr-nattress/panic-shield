# US-GND-008: Add Micro-Animations

## User Story
**As a** user in distress
**I want** gentle, calming animations
**So that** the interface feels responsive and soothing

## Priority: P3 (Low)
## Story Points: 3
## Sprint: Backlog

## Problem
- Interface feels static and unresponsive
- No smooth transitions between states
- Lacking visual polish
- Missing feedback for interactions
- Could help with calming effect

## Acceptance Criteria
- [ ] Smooth entrance animations
- [ ] Gentle hover effects
- [ ] Subtle breathing animation
- [ ] No jarring or fast movements
- [ ] Respects prefers-reduced-motion

## Technical Tasks
1. **Entrance animations**
   ```css
   @keyframes fadeInUp {
     from {
       opacity: 0;
       transform: translateY(20px);
     }
     to {
       opacity: 1;
       transform: translateY(0);
     }
   }
   
   .grounding-card {
     animation: fadeInUp 0.6s ease-out;
   }
   
   .grounding-input {
     animation: fadeInUp 0.4s ease-out backwards;
   }
   
   .grounding-input:nth-child(1) { animation-delay: 0.1s; }
   .grounding-input:nth-child(2) { animation-delay: 0.2s; }
   .grounding-input:nth-child(3) { animation-delay: 0.3s; }
   .grounding-input:nth-child(4) { animation-delay: 0.4s; }
   .grounding-input:nth-child(5) { animation-delay: 0.5s; }
   ```

2. **Breathing hint animation**
   ```css
   @keyframes gentleBreath {
     0%, 100% { transform: scale(1); opacity: 0.8; }
     50% { transform: scale(1.05); opacity: 1; }
   }
   
   .sense-icon {
     animation: gentleBreath 4s ease-in-out infinite;
   }
   ```

3. **Smooth state transitions**
   ```css
   * {
     transition-property: transform, opacity, background-color;
     transition-duration: 0.3s;
     transition-timing-function: ease-out;
   }
   
   .grounding-input {
     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
   }
   ```

4. **Respect motion preferences**
   ```css
   @media (prefers-reduced-motion: reduce) {
     *,
     *::before,
     *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

## UI Issues Being Fixed
| Issue | Current State | Fixed State |
|-------|--------------|------------|
| Page load | Instant/jarring | Smooth fade in |
| Interactions | No feedback | Gentle responses |
| Visual polish | Static | Refined motion |
| Accessibility | No consideration | Motion preferences |
| Calming effect | Missing | Breathing hints |

## Testing Checklist
- [ ] Animations run at 60fps
- [ ] No jank or stuttering
- [ ] Reduced motion works
- [ ] Not distracting
- [ ] Enhances calm feeling
- [ ] Mobile performance OK

## Files to Modify
- `/components/panic/GroundingExercise.tsx`
- Create animations.css file

## Definition of Done
- [ ] Animations implemented
- [ ] Performance validated
- [ ] Motion preferences work
- [ ] User feedback positive
- [ ] No accessibility issues

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

Fixes: US-GND-008-animations"
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
