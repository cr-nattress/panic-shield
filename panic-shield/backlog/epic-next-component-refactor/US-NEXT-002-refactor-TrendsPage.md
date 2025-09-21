# User Story: Refactor TrendsPage Component

## Story
As a user analyzing my emotional patterns, I want the trends visualization to work exactly as before while the code is refactored for better maintainability and performance.

## Current State
- Component: `components/TrendsPage.tsx`
- Lines of Code: 461
- Cyclomatic Complexity: 14
- JSX Nesting Depth: 7
- Issues: Mixed data fetching, calculations, and rendering logic

## Acceptance Criteria
- [ ] No visual or behavioral regressions
- [ ] All trend visualizations display correctly:
  - [ ] 7-day emotion chart
  - [ ] Pattern analysis cards
  - [ ] Time-of-day breakdown
  - [ ] Trigger frequency analysis
- [ ] Data calculations remain accurate
- [ ] Performance stable or improved
- [ ] Extracted components:
  - [ ] `TrendsSummaryCard.tsx` (80 LOC)
  - [ ] `EmotionPatterns.tsx` (100 LOC)
  - [ ] `TimeAnalysis.tsx` (90 LOC)
- [ ] Extracted hooks:
  - [ ] `useTrendsData.ts` for data fetching
- [ ] Extracted utilities:
  - [ ] `trendCalculations.ts` for analysis logic
- [ ] Component reduced to under 250 LOC
- [ ] All builds pass

## Tasks
### Phase 1: Test Creation
- [ ] Create snapshot tests for current output
- [ ] Test data calculation accuracy
- [ ] Document edge cases (no data, single entry, etc.)

### Phase 2: Data Layer Extraction
- [ ] Create `useTrendsData.ts` hook
- [ ] Extract data fetching logic
- [ ] Implement caching strategy
- [ ] Test data loading states

### Phase 3: Summary Card Extraction
- [ ] Create `TrendsSummaryCard.tsx`
- [ ] Extract summary calculation logic
- [ ] Create reusable card component
- [ ] Style with existing theme

### Phase 4: Pattern Analysis Extraction
- [ ] Create `EmotionPatterns.tsx`
- [ ] Extract pattern detection logic
- [ ] Create visualization components
- [ ] Test pattern accuracy

### Phase 5: Time Analysis Extraction
- [ ] Create `TimeAnalysis.tsx`
- [ ] Extract time-based calculations
- [ ] Create time chart component
- [ ] Verify timezone handling

### Phase 6: Integration
- [ ] Wire components together
- [ ] Remove old code
- [ ] Performance testing
- [ ] Full regression test

## Test Plan
### Unit Tests
- Calculation functions with various datasets
- Component rendering with mock data
- Hook behavior testing

### Integration Tests
- Data flow from storage to display
- Chart interactions
- Filter/sort functionality

### Performance Tests
- Large dataset rendering
- Calculation performance
- Memory usage monitoring

## Risks & Rollback Plan

### Risks
1. **Calculation Accuracy** - Statistical calculations might differ
   - Mitigation: Extensive unit testing with known results

2. **Chart Rendering Issues** - Visualization might break
   - Mitigation: Visual regression testing

### Rollback Plan
- Single commit revert strategy
- Previous calculations preserved for comparison

## Estimates
- **Size**: Medium (3-4 days)
- **Complexity**: Medium
- **Risk**: Medium
- **Priority**: P1

### Breakdown:
- Test creation: 0.5 days
- Data layer extraction: 1 day
- Component extractions: 1.5 days
- Integration: 0.5 days
- Testing: 0.5 days

## Definition of Done
- [ ] All acceptance criteria met
- [ ] Test coverage ≥ 80%
- [ ] Performance benchmarks met
- [ ] Code review complete
- [ ] Documentation updated

## Git Commit Guidelines

### Commit After Completion
**IMPORTANT**: Create a commit immediately after completing this user story.

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

Fixes: <story-id>
```

### Example Commit
```bash
git add -A
git commit -m "refactor(components): extract sub-components and hooks

- Increased placeholder opacity from 0.2 to 0.7
- Fixed text contrast to meet WCAG AA standards (4.5:1)
- Added text shadows for better legibility
- Improved icon visibility with drop shadows

Fixes: US-NEXT-002-refactor-TrendsPage"
```

### Commit Types
- `feat`: New feature
- `fix`: Bug fix or improvement
- `refactor`: Code refactoring
- `style`: CSS/styling changes
- `docs`: Documentation only
- `test`: Test additions/changes
- `perf`: Performance improvements

### Pre-Commit Checklist
- [ ] All tests passing
- [ ] Lint checks passed
- [ ] Visual regression captured
- [ ] Story acceptance criteria met
- [ ] Code reviewed (if applicable)

### Push Guidelines
1. Commit locally first
2. Run tests: `npm test`
3. Push to feature branch: `git push origin feature/<story-id>`
4. Create PR if ready for review
