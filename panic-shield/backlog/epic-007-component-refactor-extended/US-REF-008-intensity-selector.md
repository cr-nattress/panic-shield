# US-REF-008: Refactor IntensitySelector Component

## User Story
As a developer, I need to refactor the IntensitySelector component to simplify its implementation and improve accessibility.

## Current State
- **File**: `wheel/IntensitySelector.tsx`
- **Lines of Code**: 306
- **Issues**: Complex animation logic, accessibility concerns, inline styles

## Acceptance Criteria
- [ ] Component reduced to under 250 LOC
- [ ] Extract animation logic to custom hook
- [ ] Improve keyboard navigation
- [ ] Add ARIA labels and roles
- [ ] Maintain visual design
- [ ] Add accessibility tests

## Technical Tasks
1. Create `useIntensityAnimation` hook
2. Extract `IntensityLevel` component
3. Implement keyboard navigation
4. Add proper ARIA attributes
5. Create accessibility test suite

## Priority: P2 (Medium)