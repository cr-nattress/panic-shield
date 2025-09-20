# Component Refactoring Backlog

## Overview
This backlog contains the refactoring plan for oversized Next.js components in the panic-shield application. The goal is to improve maintainability without breaking functionality.

## Structure

```
backlog/
├── epics/
│   ├── EP-NEXT-Component-Refactor.md   # Main epic for refactoring initiative
│   ├── EP-006-Grounding-UI-Fix.md      # Grounding exercise UI enhancements
│   ├── EP-007-Additional-Component-Refactoring.md  # Additional large components
│   └── EP-008-Application-Header.md    # App header with menu drawer
├── stories/
│   ├── US-NEXT-001-refactor-PanicPage.md
│   ├── US-NEXT-002-refactor-TrendsPage.md
│   ├── US-NEXT-003-refactor-EmotionWheel.md
│   ├── US-NEXT-004-refactor-AchievementsPage.md
│   ├── US-NEXT-005-refactor-EmotionChart.md
│   ├── US-GND-001 through US-GND-009   # Grounding UI fixes
│   ├── US-REF-001 through US-REF-004   # Additional refactoring
│   └── US-HDR-001 through US-HDR-012   # Header implementation
├── templates/
│   └── PR-Refactor.md                  # PR template for refactoring
├── register.json                       # Machine-readable component registry
├── refactor-map.md                     # Visual extraction strategy
└── README.md                           # This file
```

## Active Epics

### EP-008: Application Header with Menu Drawer
**Priority**: High | **Status**: Ready for Development | **Effort**: 7-10 days

Implement unified application header with hamburger menu drawer to provide:
- Consistent app identity and navigation
- Universal access to theme toggle and settings
- Quick stats and user profile section
- Emergency contacts always available
- Professional mobile app experience

**User Stories**: 12 stories (US-HDR-001 through US-HDR-012)

### EP-006: Grounding UI Enhancement
**Priority**: Critical | **Status**: In Progress | **Effort**: 3-5 days

Fix critical UI issues in the grounding exercise:
- Text visibility and contrast
- Touch target sizes
- Bottom navigation visibility
- Input field improvements

**User Stories**: 9 stories (US-GND-001 through US-GND-009)

## Component Registry

The `register.json` file contains a machine-readable list of components flagged for refactoring:

| Component | LOC | Severity | Priority |
|-----------|-----|----------|----------|
| PanicPage.tsx | 703 | Critical | P0 |
| TrendsPage.tsx | 461 | High | P1 |
| EmotionWheel.tsx | 433 | High | P1 |
| AchievementsPage.tsx | 425 | High | P2 |
| EmotionChart.tsx | 468 | High | P2 |
| LogPageStyles.tsx | 432 | Medium | P3 |
| LogPage.tsx | 257 | Medium | P3 |

## Thresholds

Components are flagged when they exceed:
- **Lines of Code**: > 250 LOC
- **JSX Depth**: > 6 levels
- **Cyclomatic Complexity**: > 12
- **Props Count**: > 10 props
- **Hook Count**: > 8 hooks

## How to Use This Backlog

### 1. Starting a Refactor
1. Pick the highest priority unstarted story
2. Read the full user story document
3. Create a feature branch: `refactor/US-NEXT-XXX-component-name`
4. Follow the tasks in order

### 2. Naming Conventions
- **Branches**: `refactor/US-NEXT-XXX-component-name`
- **Commits**: `refactor(ComponentName): extract SubComponent`
- **PRs**: `[US-NEXT-XXX] Refactor ComponentName`
- **Tests**: `ComponentName.test.tsx`, `ComponentName.visual.test.tsx`

### 3. Linking Stories to Epic
Each story references the main epic `EP-NEXT-Component-Refactor`. Update the epic's checklist as stories complete.

### 4. How to Cut a PR Safely

#### Pre-PR Checklist
```markdown
- [ ] All tests passing locally
- [ ] Visual regression tests captured
- [ ] No console errors or warnings
- [ ] Lint and typecheck pass
- [ ] Component under 250 LOC
- [ ] Storybook stories updated (if applicable)
```

#### PR Structure
1. **Title**: `[US-NEXT-XXX] Refactor ComponentName`
2. **Description**: Link to user story
3. **Screenshots**: Before/after for UI components
4. **Test Evidence**: Coverage reports, test outputs
5. **Risk Assessment**: Note any concerns
6. **Rollback Plan**: How to revert if issues arise

#### Review Process
1. Self-review against acceptance criteria
2. Run full test suite
3. Deploy to preview environment
4. Request 2 reviewers (1 familiar with component, 1 fresh eyes)
5. Address feedback in separate commits
6. Squash merge when approved

### 5. Safety Rules

#### Never Break These Rules
1. **No Behavior Changes**: Refactoring means zero functional changes
2. **Test First**: Write characterization tests before any changes
3. **Incremental**: Extract one piece at a time
4. **Backward Compatible**: Props and APIs must stay the same
5. **Visual Accuracy**: Pixel-perfect matching required

#### When to Stop and Reassess
- Tests are failing that weren't before
- Visual differences detected
- Performance degraded by >10%
- Complexity increased rather than decreased
- Team disagreement on approach

### 6. Testing Strategy

#### Required Tests
1. **Characterization Tests**: Capture current behavior
2. **Unit Tests**: Each extracted component
3. **Integration Tests**: Component interactions
4. **Visual Regression**: Screenshot comparisons
5. **Performance Tests**: Render time and memory

#### Test Commands
```bash
# Run all tests
npm test

# Run specific component tests
npm test ComponentName

# Visual regression tests
npm run test:visual

# Performance benchmarks
npm run test:perf
```

### 7. Rollback Procedures

#### Immediate Rollback (Critical Issues)
1. Revert the merge commit
2. Deploy previous version
3. Notify team in #panic-shield-dev
4. Create incident report

#### Gradual Rollback (Non-Critical)
1. Feature flag to old implementation
2. Monitor metrics for 24 hours
3. Fix issues in new branch
4. Re-deploy when ready

### 8. Success Metrics

Track these for each refactor:
- Lines of code reduction
- Test coverage increase
- Build time impact
- Bundle size change
- Performance metrics
- Bugs introduced (should be 0)

### 9. Common Patterns

#### Extract Hook Pattern
```typescript
// Before
function Component() {
  // 100 lines of logic
  return <div>...</div>;
}

// After
function Component() {
  const logic = useComponentLogic();
  return <div>...</div>;
}
```

#### Extract Subcomponent Pattern
```typescript
// Before
return <div>{/* 200 lines */}</div>;

// After
return (
  <div>
    <Header />
    <Content />
    <Footer />
  </div>
);
```

### 10. Resources

- [Epic Document](./epics/EP-NEXT-Component-Refactor.md)
- [Refactor Map](./refactor-map.md)
- [Component Registry](./register.json)
- [PR Template](./templates/PR-Refactor.md)

## Questions?

Contact the team lead or post in #panic-shield-dev channel.