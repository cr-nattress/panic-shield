# US-REF-006: Refactor ChartTooltip Component

## User Story
As a developer, I need to refactor the ChartTooltip component to improve its modularity and reduce complexity.

## Current State
- **File**: `charts/ChartTooltip.tsx`
- **Lines of Code**: 356
- **Issues**: Complex rendering logic, mixed chart type handling, inline calculations

## Acceptance Criteria
- [ ] Component reduced to under 250 LOC
- [ ] Extract tooltip content renderers by chart type
- [ ] Create tooltip positioning hook
- [ ] Separate tooltip styles into modules
- [ ] Maintain all tooltip variations
- [ ] Add visual regression tests

## Technical Tasks
1. Create `useTooltipPosition` hook
2. Extract `TooltipContent` components by type
3. Create `TooltipContainer` wrapper
4. Move calculations to utility functions
5. Add Storybook stories for all variations

## Priority: P1 (High)