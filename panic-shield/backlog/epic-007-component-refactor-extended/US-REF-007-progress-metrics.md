# US-REF-007: Refactor ProgressMetrics Component

## User Story
As a developer, I need to refactor the ProgressMetrics component to improve readability and testability.

## Current State
- **File**: `achievements/ProgressMetrics.tsx`
- **Lines of Code**: 326
- **Issues**: Complex metric calculations, nested conditionals, tight coupling

## Acceptance Criteria
- [ ] Component reduced to under 250 LOC
- [ ] Extract metric calculation logic
- [ ] Create individual metric display components
- [ ] Implement proper data fetching patterns
- [ ] Maintain all metric displays
- [ ] Add performance optimizations

## Technical Tasks
1. Create `useProgressMetrics` hook
2. Extract `MetricCard` component
3. Create `MetricChart` component
4. Implement memoization for calculations
5. Add loading and error states

## Priority: P2 (Medium)