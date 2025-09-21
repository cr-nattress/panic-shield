# Epic: Next.js Component Refactoring

## Problem Statement
Analysis of the panic-shield codebase reveals 7 components exceeding recommended size and complexity thresholds. These oversized components (250+ LOC) present maintenance challenges, testing difficulties, and violate single responsibility principles. The most critical offenders are PanicPage.tsx (703 LOC), TrendsPage.tsx (461 LOC), and EmotionWheel.tsx (433 LOC), with cyclomatic complexity exceeding 12 and JSX nesting depths up to 9 levels.

## Goals
- Reduce all component files to under 250 LOC
- Decrease cyclomatic complexity to below 12
- Limit JSX nesting depth to maximum 6 levels
- Separate concerns (UI, state, business logic, data fetching)
- Improve testability through smaller, focused units
- Maintain 100% feature parity with zero regressions

## Non-Goals
- UI/UX redesigns or improvements
- Performance optimizations beyond natural refactoring benefits
- Adding new features or capabilities
- Changing public APIs or prop interfaces (initially)
- Migrating to different state management solutions
- Converting server/client component boundaries

## Selection Criteria & Thresholds
Components flagged based on:
- **Lines of Code**: > 250 LOC
- **JSX Depth**: > 6 levels of nesting
- **Cyclomatic Complexity**: > 12 (largest function)
- **Props Count**: > 10 top-level props
- **Hook Density**: > 8 hooks in single component
- **Mixed Responsibilities**: UI + data fetching + business logic in same file

## Global Guardrails
1. **No Breaking Changes**: All refactors must maintain backward compatibility
2. **Characterization Tests First**: Write tests capturing current behavior before refactoring
3. **Incremental Extraction**: Use file-local adaptors to prevent route/prop breakage
4. **Small PRs**: One component per PR, reviewable in under 30 minutes
5. **Feature Flags**: Use flags for any behavior that might change
6. **Visual Regression**: Screenshot comparisons before/after each refactor

## Definition of Done

### Per Story
- [ ] Characterization tests written and passing
- [ ] Component extracted into smaller units
- [ ] All tests passing (unit, integration, e2e if present)
- [ ] Props remain backward compatible
- [ ] No visual regressions
- [ ] Code review approved
- [ ] Documentation updated

### Per Component
- [ ] LOC under 250
- [ ] Cyclomatic complexity under 12
- [ ] JSX depth maximum 6 levels
- [ ] Single responsibility achieved
- [ ] Test coverage maintained or improved

### Overall Epic
- [ ] All flagged components refactored
- [ ] Zero production incidents from refactoring
- [ ] Performance metrics stable or improved
- [ ] Team trained on new patterns
- [ ] Refactoring guidelines documented

## Risk Register & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Runtime errors from extraction | Medium | High | Comprehensive test coverage, staged rollout |
| Performance degradation | Low | Medium | Performance testing, monitoring |
| Prop interface changes break consumers | Medium | High | Adapter pattern, deprecation warnings |
| State management bugs | Medium | High | Extensive integration testing |
| SSR/Hydration mismatches | Low | High | SSR testing suite, preview deployments |
| Team velocity impact | High | Medium | Time-boxed refactoring, parallel tracks |

## Rollout & Verification Plan

### Phase 1: Foundation (Week 1)
- Set up characterization test framework
- Create visual regression testing pipeline
- Document refactoring patterns
- Train team on approach

### Phase 2: Critical Components (Weeks 2-3)
- Refactor PanicPage.tsx (Critical)
- Refactor TrendsPage.tsx (High)
- Refactor EmotionWheel.tsx (High)

### Phase 3: Secondary Components (Week 4)
- Refactor AchievementsPage.tsx
- Refactor EmotionChart.tsx
- Extract LogPageStyles from component

### Phase 4: Verification (Week 5)
- Full regression testing
- Performance benchmarking
- Documentation updates
- Retrospective

## Success Metrics
- 100% of flagged components under thresholds
- 0 production incidents attributed to refactoring
- Test coverage increased by minimum 20%
- Build time reduced by 10%+
- Component reusability increased (measured by import count)

## Dependencies
- Testing framework properly configured
- CI/CD pipeline supports visual regression testing
- Team availability for code reviews
- Feature flag system in place (if needed)

## Acceptance Criteria
- All components meet size/complexity thresholds
- No user-facing changes or regressions
- Performance metrics stable or improved
- All tests passing in CI
- Documentation complete