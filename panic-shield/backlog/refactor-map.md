# Component Refactoring Map

## Overview
This map outlines the extraction strategy for each oversized component in the panic-shield codebase.

## Refactoring Priority & Extraction Plan

| Component | Current LOC | Proposed Extracts | Dependencies | Effort | Risk |
|-----------|------------|-------------------|--------------|--------|------|
| **PanicPage.tsx** | 703 | • `BreathingExercise.tsx` (150 LOC)<br>• `GroundingExercise.tsx` (120 LOC)<br>• `EmergencyContacts.tsx` (80 LOC)<br>• `ExerciseSelector.tsx` (100 LOC)<br>• `useBreathingPattern.ts` hook<br>• `usePanicMode.ts` hook<br>• `breathingPatterns.ts` utils | shakeDetection, storage | **L** | **High** |
| **TrendsPage.tsx** | 461 | • `TrendsSummaryCard.tsx` (80 LOC)<br>• `EmotionPatterns.tsx` (100 LOC)<br>• `TimeAnalysis.tsx` (90 LOC)<br>• `useTrendsData.ts` hook<br>• `trendCalculations.ts` utils | EmotionChart, storage | **M** | **Medium** |
| **EmotionWheel.tsx** | 433 | • `WheelSegment.tsx` (60 LOC)<br>• `IntensitySelector.tsx` (80 LOC)<br>• `TriggerInput.tsx` (70 LOC)<br>• `QuickActions.tsx` (50 LOC)<br>• `useEmotionSelection.ts` hook<br>• `wheelGeometry.ts` utils | storage, gamification | **M** | **Medium** |
| **AchievementsPage.tsx** | 425 | • `AchievementCard.tsx` (60 LOC)<br>• `StreakDisplay.tsx` (80 LOC)<br>• `ProgressMetrics.tsx` (90 LOC)<br>• `useAchievements.ts` hook<br>• `achievementLogic.ts` utils | storage, gamification | **M** | **Low** |
| **EmotionChart.tsx** | 468 | • `ChartAxes.tsx` (80 LOC)<br>• `ChartDataPoints.tsx` (100 LOC)<br>• `ChartTooltip.tsx` (60 LOC)<br>• `useChartData.ts` hook<br>• `chartCalculations.ts` utils | types | **M** | **Low** |
| **LogPageStyles.tsx** | 432 | • Move to `LogPage.module.css`<br>• Extract theme constants<br>• Create style utilities | None | **S** | **Low** |
| **LogPage.tsx** | 257 | • `EmotionLogItem.tsx` (50 LOC)<br>• `LogFilters.tsx` (60 LOC)<br>• `useLogData.ts` hook | storage, LogPageStyles | **S** | **Low** |

## Extraction Patterns

### 1. Hook Extraction Pattern
```typescript
// Before: Mixed logic in component
function Component() {
  const [state, setState] = useState();
  // 50+ lines of logic
  return <div>...</div>;
}

// After: Clean separation
function Component() {
  const { state, handlers } = useComponentLogic();
  return <div>...</div>;
}
```

### 2. Subcomponent Extraction Pattern
```typescript
// Before: Nested JSX
return (
  <div>
    {/* 100+ lines of nested JSX */}
  </div>
);

// After: Composed components
return (
  <div>
    <Header {...headerProps} />
    <Content {...contentProps} />
    <Footer {...footerProps} />
  </div>
);
```

### 3. Utility Extraction Pattern
```typescript
// Before: Inline calculations
const result = /* complex calculation */;

// After: Extracted utilities
import { calculate } from './utils';
const result = calculate(data);
```

## Implementation Order

### Sprint 1: Critical Path (Week 1-2)
1. **PanicPage.tsx** - Highest priority due to 703 LOC and critical functionality
   - Day 1-2: Write characterization tests
   - Day 3-4: Extract BreathingExercise component
   - Day 5-6: Extract GroundingExercise component
   - Day 7-8: Extract remaining components and hooks

### Sprint 2: Core Features (Week 3)
2. **EmotionWheel.tsx** - Core user interaction component
   - Day 1: Write tests
   - Day 2-3: Extract subcomponents
   - Day 4: Extract hooks and utilities

3. **TrendsPage.tsx** - Data visualization priority
   - Day 1: Write tests
   - Day 2-3: Extract chart components
   - Day 4: Extract data hooks

### Sprint 3: Secondary Components (Week 4)
4. **AchievementsPage.tsx**
   - Day 1-2: Extract display components and hooks

5. **EmotionChart.tsx**
   - Day 1-2: Extract chart subcomponents

6. **LogPageStyles.tsx** & **LogPage.tsx**
   - Day 3: Migrate styles to CSS modules
   - Day 4: Clean up LogPage component

## Risk Mitigation Strategies

### High Risk (PanicPage)
- Extensive manual testing of all panic mode features
- A/B testing with feature flags
- Gradual rollout to subset of users
- Hotfix plan ready

### Medium Risk (EmotionWheel, TrendsPage)
- Automated visual regression tests
- Component snapshot testing
- Preview deployments for stakeholder review

### Low Risk (Styles, Simple Extractions)
- Standard PR review process
- Automated testing sufficient

## Success Criteria
- All components under 250 LOC
- No runtime errors in production
- Performance metrics stable or improved
- 100% feature parity maintained
- Test coverage increased by 20%+

## Notes
- Effort estimates: **S** (Small: 1-2 days), **M** (Medium: 3-4 days), **L** (Large: 5+ days)
- Risk levels based on: user impact, complexity, and data dependencies
- All extractions follow the adapter pattern for backward compatibility