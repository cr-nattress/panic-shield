# US-REF-001: Refactor RecentUnlocks Component

## User Story
**As a** developer maintaining the panic-shield app
**I want** to refactor the RecentUnlocks component
**So that** it becomes more maintainable and testable

## Priority: P0 (Critical)
## Story Points: 8
## Current LOC: 490 → Target: <250

## Problem Analysis
- **Current Issues**:
  - 490 lines of code (nearly 2x threshold)
  - Renders entire achievement history inline
  - Complex date grouping logic mixed with UI
  - Animation logic intertwined with data processing
  - Deep JSX nesting (7+ levels)
  - Multiple responsibilities in single component

## Acceptance Criteria
- [ ] Component reduced to under 250 LOC
- [ ] Date grouping logic extracted to utility
- [ ] Individual unlock items as separate components
- [ ] Animation logic in custom hook
- [ ] All existing functionality preserved
- [ ] Performance improved or maintained
- [ ] Test coverage > 80%

## Refactoring Tasks

### 1. Extract UnlockItem Component
```typescript
// New file: components/achievements/UnlockItem.tsx
interface UnlockItemProps {
  achievement: Achievement;
  isNew?: boolean;
  onView?: (id: string) => void;
}

export function UnlockItem({ achievement, isNew, onView }: UnlockItemProps) {
  // Extract individual achievement rendering
  return (
    <div className="unlock-item">
      {/* Simplified item UI */}
    </div>
  );
}
```

### 2. Create Date Grouping Utility
```typescript
// New file: utils/dateGrouping.ts
export function groupUnlocksByDate(unlocks: Achievement[]) {
  return unlocks.reduce((groups, unlock) => {
    const date = formatDate(unlock.unlockedAt);
    if (!groups[date]) groups[date] = [];
    groups[date].push(unlock);
    return groups;
  }, {} as Record<string, Achievement[]>);
}
```

### 3. Extract Animation Hook
```typescript
// New file: hooks/useUnlockAnimations.ts
export function useUnlockAnimations(unlocks: Achievement[]) {
  const [animatingIds, setAnimatingIds] = useState<Set<string>>(new Set());
  
  const animateUnlock = useCallback((id: string) => {
    setAnimatingIds(prev => new Set(prev).add(id));
    setTimeout(() => {
      setAnimatingIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 500);
  }, []);

  return { animatingIds, animateUnlock };
}
```

### 4. Create History Hook
```typescript
// New file: hooks/useUnlockHistory.ts
export function useUnlockHistory() {
  const [unlocks, setUnlocks] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    loadUnlockHistory().then(setUnlocks).finally(() => setLoading(false));
  }, []);

  const groupedUnlocks = useMemo(
    () => groupUnlocksByDate(unlocks),
    [unlocks]
  );

  return { groupedUnlocks, loading };
}
```

### 5. Refactored Main Component
```typescript
// Refactored: components/achievements/RecentUnlocks.tsx
export function RecentUnlocks() {
  const { groupedUnlocks, loading } = useUnlockHistory();
  const { animatingIds, animateUnlock } = useUnlockAnimations();

  if (loading) return <LoadingState />;

  return (
    <div className="recent-unlocks">
      {Object.entries(groupedUnlocks).map(([date, unlocks]) => (
        <DateGroup key={date} date={date}>
          {unlocks.map(unlock => (
            <UnlockItem
              key={unlock.id}
              achievement={unlock}
              isNew={animatingIds.has(unlock.id)}
              onView={() => animateUnlock(unlock.id)}
            />
          ))}
        </DateGroup>
      ))}
    </div>
  );
}
```

## Files to Create/Modify
- [ ] Create `components/achievements/UnlockItem.tsx`
- [ ] Create `components/achievements/DateGroup.tsx`
- [ ] Create `hooks/useUnlockHistory.ts`
- [ ] Create `hooks/useUnlockAnimations.ts`
- [ ] Create `utils/dateGrouping.ts`
- [ ] Refactor `components/achievements/RecentUnlocks.tsx`
- [ ] Create tests for all new components/utilities

## Testing Requirements
- [ ] Unit tests for dateGrouping utility
- [ ] Unit tests for hooks
- [ ] Component tests for UnlockItem
- [ ] Integration test for RecentUnlocks
- [ ] Visual regression tests
- [ ] Performance benchmarks

## Definition of Done
- [ ] All acceptance criteria met
- [ ] Code review passed
- [ ] Tests passing with >80% coverage
- [ ] No visual regressions
- [ ] Performance maintained or improved
- [ ] Documentation updated