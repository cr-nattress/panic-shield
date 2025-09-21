# US-REF-005: Refactor QuickActions Component

## User Story
As a developer, I need to refactor the QuickActions component to reduce its complexity and improve maintainability.

## Current State
- **File**: `wheel/QuickActions.tsx`
- **Lines of Code**: 399
- **Issues**: Mixed responsibilities, complex state management, inline styles

## Acceptance Criteria
- [ ] Component reduced to under 250 LOC
- [ ] Extract action handlers to custom hook
- [ ] Separate action items into sub-components
- [ ] Move styles to CSS modules
- [ ] Maintain all existing functionality
- [ ] Add unit tests for extracted logic

## Technical Tasks
1. Create `useQuickActions` hook for action logic
2. Extract `QuickActionItem` component
3. Create `QuickActionsGrid` layout component
4. Move inline styles to CSS module
5. Write comprehensive tests

## Priority: P1 (High)