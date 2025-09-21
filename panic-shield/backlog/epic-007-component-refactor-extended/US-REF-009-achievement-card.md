# US-REF-009: Refactor AchievementCard Component

## User Story
As a developer, I need to refactor the AchievementCard component to improve its reusability and maintainability.

## Current State
- **File**: `achievements/AchievementCard.tsx`
- **Lines of Code**: 300
- **Issues**: Duplicate rendering logic, complex progress calculations, tight coupling

## Acceptance Criteria
- [ ] Component reduced to under 250 LOC
- [ ] Extract progress calculation logic
- [ ] Create badge rendering sub-component
- [ ] Implement card variants
- [ ] Maintain all card types
- [ ] Add prop validation

## Technical Tasks
1. Create `useAchievementProgress` hook
2. Extract `AchievementBadge` component
3. Create `ProgressBar` component
4. Implement card variant system
5. Add TypeScript prop interfaces

## Priority: P2 (Medium)