# US-REF-011: Refactor WheelSegment Component

## User Story
As a developer, I need to refactor the WheelSegment component to improve its clarity and maintainability.

## Current State
- **File**: `wheel/WheelSegment.tsx`
- **Lines of Code**: 255
- **Issues**: Complex SVG calculations, inline styles, tight coupling to wheel logic

## Acceptance Criteria
- [ ] Component reduced to under 250 LOC
- [ ] Extract SVG path calculations
- [ ] Separate interaction handlers
- [ ] Move styles to constants
- [ ] Maintain visual accuracy
- [ ] Add unit tests for calculations

## Technical Tasks
1. Create `useSegmentGeometry` hook
2. Extract SVG path utilities
3. Create `SegmentLabel` component
4. Move colors and styles to theme
5. Add calculation unit tests

## Priority: P3 (Low)