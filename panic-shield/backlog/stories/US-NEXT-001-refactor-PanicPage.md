# User Story: Refactor PanicPage Component

## Story
As a user of the panic mode feature, I want the UI to work exactly as before while the underlying code is refactored for better maintainability, so that future enhancements can be made more easily.

## Current State
- Component: `components/PanicPage.tsx`
- Lines of Code: 703
- Cyclomatic Complexity: 18
- JSX Nesting Depth: 8
- Hook Count: 12
- Issues: Monolithic structure mixing UI, state, animations, and multiple exercise types

## Acceptance Criteria
- [ ] No visual or behavioral regressions (baseline screenshots match)
- [ ] All panic mode features work identically:
  - [ ] Breathing exercises with all 4 patterns
  - [ ] 5-4-3-2-1 grounding exercise
  - [ ] Emergency contacts display and interaction
  - [ ] Shake detection for quick access
  - [ ] Haptic feedback where supported
- [ ] Props remain backward compatible (component signature unchanged)
- [ ] Extracted components:
  - [ ] `BreathingExercise.tsx` component created and tested
  - [ ] `GroundingExercise.tsx` component created and tested
  - [ ] `EmergencyContacts.tsx` component created and tested
  - [ ] `ExerciseSelector.tsx` component created and tested
- [ ] Extracted hooks:
  - [ ] `useBreathingPattern.ts` hook for breathing logic
  - [ ] `usePanicMode.ts` hook for panic mode state
- [ ] Extracted utilities:
  - [ ] `breathingPatterns.ts` for pattern configurations
- [ ] All builds pass (build, lint, test, typecheck)
- [ ] Component reduced to under 250 LOC
- [ ] Test coverage maintained or improved

## Tasks
### Phase 1: Test Creation
- [ ] Create visual regression test baseline
- [ ] Write characterization tests for current behavior
- [ ] Document all user interactions and edge cases
- [ ] Set up test fixtures for different states

### Phase 2: Breathing Exercise Extraction
- [ ] Create `BreathingExercise.tsx` component
- [ ] Extract breathing patterns to configuration
- [ ] Create `useBreathingPattern.ts` hook
- [ ] Wire up with adapter in PanicPage
- [ ] Verify no regressions

### Phase 3: Grounding Exercise Extraction
- [ ] Create `GroundingExercise.tsx` component
- [ ] Extract grounding logic and state
- [ ] Create props interface for data passing
- [ ] Integrate with PanicPage
- [ ] Test all 5 senses input

### Phase 4: Emergency Contacts Extraction
- [ ] Create `EmergencyContacts.tsx` component
- [ ] Extract contact data and handlers
- [ ] Ensure click/tap handlers work
- [ ] Test crisis hotline prominence

### Phase 5: Exercise Selector Extraction
- [ ] Create `ExerciseSelector.tsx` component
- [ ] Extract selection logic
- [ ] Maintain animation transitions
- [ ] Test navigation between exercises

### Phase 6: Final Integration
- [ ] Create `usePanicMode.ts` master hook
- [ ] Wire all components together
- [ ] Remove old code from PanicPage
- [ ] Full regression testing
- [ ] Performance profiling

## Test Plan
### Unit Tests
- Each extracted component tested in isolation
- Hook testing with React Testing Library
- Utility function testing

### Integration Tests
- Exercise switching flows
- Timer and animation sequences
- State persistence across exercises
- Emergency contact interactions

### Visual Regression Tests
- Screenshots of all exercise states
- Animation keyframes captured
- Responsive design breakpoints
- Dark/light mode if applicable

### Manual Testing Checklist
- [ ] Breathing exercise - all 4 patterns
- [ ] Pattern switching mid-exercise
- [ ] Pause/resume functionality
- [ ] Grounding exercise text input
- [ ] Emergency contact links
- [ ] Back navigation
- [ ] Shake detection trigger
- [ ] Haptic feedback on supported devices

## Risks & Rollback Plan

### Risks
1. **Animation Timing Issues** - Breathing animations might break
   - Mitigation: Extensive animation testing, frame-by-frame comparison

2. **State Management Bugs** - Exercise state might not persist correctly
   - Mitigation: Comprehensive state testing, logging

3. **Mobile Gesture Conflicts** - Touch/shake detection might fail
   - Mitigation: Device-specific testing, feature detection

### Rollback Plan
1. Feature flag to toggle between old/new implementation
2. Git revert prepared with single commit
3. Hotfix branch ready for emergency patches
4. Previous version tagged and deployable

## Estimates
- **Size**: Large (5-8 days)
- **Complexity**: High
- **Risk**: High (critical user-facing feature)
- **Priority**: P0 (Highest - 703 LOC)

### Breakdown:
- Test creation: 1 day
- Breathing exercise extraction: 1.5 days
- Grounding exercise extraction: 1 day
- Emergency contacts extraction: 0.5 days
- Exercise selector extraction: 1 day
- Integration and testing: 2 days
- Buffer for issues: 1 day

## Dependencies
- Test framework setup complete
- Visual regression testing available
- Shake detection library compatible
- Haptic feedback API available

## Definition of Done
- [ ] All acceptance criteria met
- [ ] Zero visual regressions confirmed
- [ ] Code review approved by 2 engineers
- [ ] Test coverage ≥ 80%
- [ ] Documentation updated
- [ ] Performance metrics stable
- [ ] Deployed to staging environment
- [ ] Stakeholder sign-off received

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

Fixes: US-NEXT-001-refactor-PanicPage"
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
