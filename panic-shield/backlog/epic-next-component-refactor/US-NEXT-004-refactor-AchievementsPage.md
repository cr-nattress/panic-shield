# User Story: Refactor AchievementsPage Component

## Story
As a user viewing my achievements, I want the gamification features to work exactly as before while the code is refactored for better maintainability.

## Current State
- Component: `components/AchievementsPage.tsx`
- Lines of Code: 425
- Cyclomatic Complexity: 12
- JSX Nesting Depth: 6
- Issues: Mixed display logic with achievement calculations and data fetching

## Acceptance Criteria
- [ ] No visual or behavioral regressions
- [ ] All achievement features work:
  - [ ] Streak display with fire animations
  - [ ] XP progress bar
  - [ ] Achievement badges (locked/unlocked)
  - [ ] Level progression
  - [ ] Recent achievements feed
- [ ] Animations and transitions preserved
- [ ] Extracted components:
  - [ ] `AchievementCard.tsx` (60 LOC)
  - [ ] `StreakDisplay.tsx` (80 LOC)
  - [ ] `ProgressMetrics.tsx` (90 LOC)
- [ ] Extracted hooks:
  - [ ] `useAchievements.ts` for achievement logic
- [ ] Extracted utilities:
  - [ ] `achievementLogic.ts` for calculations
- [ ] Component reduced to under 250 LOC

## Tasks
### Phase 1: Test Creation
- [ ] Snapshot tests for achievement states
- [ ] Animation timing tests
- [ ] Achievement unlock logic tests

### Phase 2: Streak Display Extraction
- [ ] Create `StreakDisplay.tsx`
- [ ] Extract fire animation logic
- [ ] Maintain streak calculation
- [ ] Test pause mechanism

### Phase 3: Achievement Card Extraction
- [ ] Create `AchievementCard.tsx`
- [ ] Extract badge rendering
- [ ] Preserve locked/unlocked states
- [ ] Test all achievement types

### Phase 4: Progress Metrics Extraction
- [ ] Create `ProgressMetrics.tsx`
- [ ] Extract XP/level calculations
- [ ] Create progress bar component
- [ ] Test level transitions

### Phase 5: Logic Extraction
- [ ] Create `useAchievements.ts` hook
- [ ] Create `achievementLogic.ts` utilities
- [ ] Centralize achievement definitions
- [ ] Test calculation accuracy

### Phase 6: Integration
- [ ] Wire components together
- [ ] Remove old code
- [ ] Performance optimization
- [ ] Full regression test

## Test Plan
### Unit Tests
- Achievement unlock conditions
- XP calculations
- Streak logic with edge cases

### Visual Tests
- Badge appearance (locked/unlocked)
- Progress bar animations
- Fire animation levels

### Integration Tests
- Achievement unlock flow
- Data persistence
- Real-time updates

## Risks & Rollback Plan

### Risks
1. **Animation Breaking** - Fire/progress animations might fail
   - Mitigation: Frame-by-frame testing

2. **Achievement Logic Errors** - Unlocks might not trigger
   - Mitigation: Comprehensive logic testing

### Rollback Plan
- Quick revert capability
- Achievement state backup

## Estimates
- **Size**: Medium (3 days)
- **Complexity**: Medium
- **Risk**: Low
- **Priority**: P2

### Breakdown:
- Test creation: 0.5 days
- Component extractions: 1.5 days
- Logic extraction: 0.5 days
- Integration: 0.5 days

## Definition of Done
- [ ] All acceptance criteria met
- [ ] Animations smooth
- [ ] Test coverage ≥ 80%
- [ ] Code review complete
- [ ] Performance stable

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
git commit -m "refactor(components): extract sub-components and hooks

- Increased placeholder opacity from 0.2 to 0.7
- Fixed text contrast to meet WCAG AA standards (4.5:1)
- Added text shadows for better legibility
- Improved icon visibility with drop shadows

Fixes: US-NEXT-004-refactor-AchievementsPage"
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
