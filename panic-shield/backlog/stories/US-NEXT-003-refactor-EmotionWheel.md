# User Story: Refactor EmotionWheel Component

## Story
As a user selecting emotions, I want the emotion wheel to work exactly as before while the code is refactored for better maintainability and reusability.

## Current State
- Component: `components/EmotionWheel.tsx`
- Lines of Code: 433
- Cyclomatic Complexity: 16
- JSX Nesting Depth: 9
- Hook Count: 5
- Issues: Complex wheel rendering logic mixed with state management and user interactions

## Acceptance Criteria
- [ ] No visual or behavioral regressions
- [ ] All wheel interactions work identically:
  - [ ] Emotion selection with 36 sub-emotions
  - [ ] Intensity selection (1-3 dots)
  - [ ] Trigger input and tags
  - [ ] Quick action buttons
  - [ ] Undo functionality
- [ ] Animation transitions preserved
- [ ] Touch/click areas unchanged
- [ ] Extracted components:
  - [ ] `WheelSegment.tsx` (60 LOC)
  - [ ] `IntensitySelector.tsx` (80 LOC)
  - [ ] `TriggerInput.tsx` (70 LOC)
  - [ ] `QuickActions.tsx` (50 LOC)
- [ ] Extracted hooks:
  - [ ] `useEmotionSelection.ts` for selection logic
- [ ] Extracted utilities:
  - [ ] `wheelGeometry.ts` for positioning calculations
- [ ] Component reduced to under 250 LOC

## Tasks
### Phase 1: Test Creation
- [ ] Visual regression baseline capture
- [ ] Interaction test suite
- [ ] Touch/click area mapping
- [ ] Animation timing tests

### Phase 2: Wheel Segment Extraction
- [ ] Create `WheelSegment.tsx`
- [ ] Extract segment rendering logic
- [ ] Preserve hover/active states
- [ ] Test all 36 sub-emotions

### Phase 3: Intensity Selector Extraction
- [ ] Create `IntensitySelector.tsx`
- [ ] Extract intensity state and UI
- [ ] Maintain dot animation
- [ ] Test selection feedback

### Phase 4: Trigger Input Extraction
- [ ] Create `TriggerInput.tsx`
- [ ] Extract trigger management
- [ ] Preserve tag functionality
- [ ] Test autocomplete behavior

### Phase 5: Quick Actions Extraction
- [ ] Create `QuickActions.tsx`
- [ ] Extract action buttons
- [ ] Maintain undo logic
- [ ] Test action handlers

### Phase 6: Geometry Utilities
- [ ] Create `wheelGeometry.ts`
- [ ] Extract positioning math
- [ ] Optimize calculations
- [ ] Test all positions

### Phase 7: Integration
- [ ] Create `useEmotionSelection.ts` hook
- [ ] Wire components together
- [ ] Remove old code
- [ ] Full regression testing

## Test Plan
### Unit Tests
- Geometry calculations
- State management in hooks
- Individual component rendering

### Integration Tests
- Full emotion selection flow
- Intensity changes
- Trigger additions
- Undo operations

### Visual Tests
- Wheel rendering at different sizes
- Hover/active states
- Animation smoothness
- Responsive behavior

### Accessibility Tests
- Keyboard navigation
- Screen reader compatibility
- Touch target sizes

## Risks & Rollback Plan

### Risks
1. **Wheel Geometry Breaking** - Positions might shift
   - Mitigation: Precise visual regression testing

2. **Touch Areas Changing** - Selection might become difficult
   - Mitigation: Touch area testing on devices

3. **Animation Jank** - Transitions might stutter
   - Mitigation: Performance profiling

### Rollback Plan
- Feature flag for old/new implementation
- Staged rollout by user percentage

## Estimates
- **Size**: Medium (3-4 days)
- **Complexity**: High
- **Risk**: Medium (core feature)
- **Priority**: P1

### Breakdown:
- Test creation: 0.5 days
- Component extractions: 2 days
- Hook/utility creation: 0.5 days
- Integration: 0.5 days
- Testing: 0.5 days

## Dependencies
- Emotion wheel design specs
- Touch testing devices available
- Animation testing tools

## Definition of Done
- [ ] All acceptance criteria met
- [ ] Zero visual regressions
- [ ] Performance stable
- [ ] Test coverage ≥ 85%
- [ ] Code review approved
- [ ] Accessibility audit passed

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

Fixes: US-NEXT-003-refactor-EmotionWheel"
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
