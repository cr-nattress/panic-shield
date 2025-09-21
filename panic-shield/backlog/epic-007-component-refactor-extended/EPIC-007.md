# EP-007: Additional Component Refactoring

## Epic Overview
**Priority**: HIGH
**Status**: Ready for Development
**Created**: 2024-09-20
**Target Release**: v0.3.0

## Problem Statement
Following the initial refactoring effort (EP-NEXT-Component-Refactor), additional components have been identified that exceed the established thresholds for maintainability. These components exhibit the same issues: excessive lines of code (>250), deep JSX nesting, high complexity, and mixed responsibilities.

## Goals
- Reduce all identified components to under 250 LOC
- Extract reusable logic into custom hooks
- Separate concerns into focused sub-components
- Improve testability and maintainability
- Maintain 100% functional parity

## Success Metrics
- [ ] All components under 250 LOC
- [ ] JSX depth reduced to < 6 levels
- [ ] Cyclomatic complexity < 12
- [ ] Test coverage increased to > 80%
- [ ] Zero functional regressions

## Components Identified for Refactoring

### Newly Identified (Not in Original Backlog)
| Component | Current LOC | Priority | Severity |
|-----------|------------|----------|----------|
| achievements/RecentUnlocks.tsx | 490 | P0 | Critical |
| charts/EmotionChart.tsx | 475 | P0 | Critical |
| wheel/TriggerInput.tsx | 473 | P0 | Critical |
| charts/ChartDataPoints.tsx | 445 | P1 | High |
| wheel/QuickActions.tsx | 399 | P1 | High |
| charts/ChartTooltip.tsx | 356 | P1 | High |
| achievements/ProgressMetrics.tsx | 326 | P2 | Medium |
| wheel/IntensitySelector.tsx | 306 | P2 | Medium |
| achievements/AchievementCard.tsx | 300 | P2 | Medium |
| charts/types/WeeklyChart.tsx | 262 | P3 | Low |
| wheel/WheelSegment.tsx | 255 | P3 | Low |
| AchievementsPageRefactored.tsx | 253 | P3 | Low |

## User Stories

### Critical Priority (P0)
- [US-REF-001](epic-additional-refactoring/US-REF-001-recent-unlocks.md) - Refactor RecentUnlocks component
- [US-REF-002](epic-additional-refactoring/US-REF-002-emotion-chart-update.md) - Further refactor EmotionChart component
- [US-REF-003](epic-additional-refactoring/US-REF-003-trigger-input.md) - Refactor TriggerInput component

### High Priority (P1)
- [US-REF-004](epic-additional-refactoring/US-REF-004-chart-data-points.md) - Refactor ChartDataPoints component
- [US-REF-005](epic-additional-refactoring/US-REF-005-quick-actions.md) - Refactor QuickActions component
- [US-REF-006](epic-additional-refactoring/US-REF-006-chart-tooltip.md) - Refactor ChartTooltip component

### Medium Priority (P2)
- [US-REF-007](epic-additional-refactoring/US-REF-007-progress-metrics.md) - Refactor ProgressMetrics component
- [US-REF-008](epic-additional-refactoring/US-REF-008-intensity-selector.md) - Refactor IntensitySelector component
- [US-REF-009](epic-additional-refactoring/US-REF-009-achievement-card.md) - Refactor AchievementCard component

### Low Priority (P3)
- [US-REF-010](epic-additional-refactoring/US-REF-010-weekly-chart.md) - Refactor WeeklyChart component
- [US-REF-011](epic-additional-refactoring/US-REF-011-wheel-segment.md) - Refactor WheelSegment component
- [US-REF-012](epic-additional-refactoring/US-REF-012-achievements-cleanup.md) - Clean up AchievementsPageRefactored

## Technical Approach

### Common Patterns to Apply

1. **Extract Custom Hooks**
   - Move state logic to `use[Component]Logic` hooks
   - Extract data fetching to `use[Component]Data` hooks
   - Separate animation logic to `use[Component]Animation` hooks

2. **Component Decomposition**
   - Header/Body/Footer pattern for large UI blocks
   - Extract repeated JSX patterns into sub-components
   - Create specialized components for complex UI elements

3. **Separation of Concerns**
   - Move calculations to utility functions
   - Extract styling logic to separate files
   - Isolate business logic from presentation

4. **Performance Optimization**
   - Add React.memo where appropriate
   - Use useMemo for expensive calculations
   - Implement useCallback for stable references

## Dependencies
- Complete existing refactoring stories (EP-NEXT)
- Ensure test coverage before starting
- Visual regression testing setup
- Performance benchmarking tools

## Testing Strategy
- Write characterization tests before refactoring
- Maintain visual regression test suite
- Performance benchmarks before/after
- Integration tests for component interactions
- Unit tests for extracted logic

## Risk Mitigation
- Feature flags for gradual rollout
- Maintain old components during transition
- Automated rollback procedures
- Comprehensive monitoring

## Documentation
See [README.md](epic-additional-refactoring/README.md) for detailed component analysis and refactoring solutions.

## Related Links
- Original Epic: [EP-NEXT-Component-Refactor](EP-NEXT-Component-Refactor.md)
- Component Registry: [register.json](register.json)
- Refactoring Guidelines: [README.md](README.md)