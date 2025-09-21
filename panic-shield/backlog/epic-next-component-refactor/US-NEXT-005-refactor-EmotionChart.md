# User Story: Refactor EmotionChart Component

## Story
As a user viewing emotion trends, I want the chart visualizations to work exactly as before while the code is refactored for better performance and maintainability.

## Current State
- Component: `components/charts/EmotionChart.tsx`
- Lines of Code: 468
- Cyclomatic Complexity: 15
- JSX Nesting Depth: 7
- Issues: Complex SVG rendering mixed with data calculations

## Acceptance Criteria
- [ ] No visual or behavioral regressions
- [ ] All chart features work:
  - [ ] Line graph rendering
  - [ ] Data point interactions
  - [ ] Axis labels and scales
  - [ ] Tooltips on hover
  - [ ] Responsive sizing
- [ ] Performance stable or improved
- [ ] Extracted components:
  - [ ] `ChartAxes.tsx` (80 LOC)
  - [ ] `ChartDataPoints.tsx` (100 LOC)
  - [ ] `ChartTooltip.tsx` (60 LOC)
- [ ] Extracted hooks:
  - [ ] `useChartData.ts` for data processing
- [ ] Extracted utilities:
  - [ ] `chartCalculations.ts` for scaling/positioning
- [ ] Component reduced to under 250 LOC

## Tasks
### Phase 1: Test Creation
- [ ] Visual regression baselines
- [ ] Data accuracy tests
- [ ] Interaction tests
- [ ] Responsive behavior tests

### Phase 2: Axes Extraction
- [ ] Create `ChartAxes.tsx`
- [ ] Extract axis rendering logic
- [ ] Maintain label formatting
- [ ] Test scale accuracy

### Phase 3: Data Points Extraction
- [ ] Create `ChartDataPoints.tsx`
- [ ] Extract point and line rendering
- [ ] Preserve animations
- [ ] Test all data scenarios

### Phase 4: Tooltip Extraction
- [ ] Create `ChartTooltip.tsx`
- [ ] Extract tooltip logic and rendering
- [ ] Maintain positioning logic
- [ ] Test hover interactions

### Phase 5: Calculation Utilities
- [ ] Create `chartCalculations.ts`
- [ ] Extract scale calculations
- [ ] Optimize math operations
- [ ] Test edge cases

### Phase 6: Integration
- [ ] Create `useChartData.ts` hook
- [ ] Wire components together
- [ ] Performance optimization
- [ ] Full regression test

## Test Plan
### Unit Tests
- Scale calculations with various ranges
- Data point positioning
- Tooltip content generation

### Visual Tests
- Chart rendering at different sizes
- Empty state appearance
- Dense data rendering

### Performance Tests
- Large dataset rendering time
- Animation smoothness
- Memory usage

### Interaction Tests
- Hover tooltips
- Touch interactions
- Zoom/pan if applicable

## Risks & Rollback Plan

### Risks
1. **SVG Rendering Issues** - Chart might not render correctly
   - Mitigation: Extensive visual testing

2. **Performance Degradation** - Multiple components might slow rendering
   - Mitigation: Performance profiling and optimization

3. **Data Accuracy Issues** - Calculations might differ
   - Mitigation: Unit tests with known data

### Rollback Plan
- Component toggle via props
- Performance comparison metrics

## Estimates
- **Size**: Medium (3 days)
- **Complexity**: Medium
- **Risk**: Low
- **Priority**: P2

### Breakdown:
- Test creation: 0.5 days
- Component extractions: 1.5 days
- Utilities extraction: 0.5 days
- Integration: 0.5 days

## Dependencies
- Chart design specifications
- Performance benchmarking tools
- SVG testing utilities

## Definition of Done
- [ ] All acceptance criteria met
- [ ] Performance improved or stable
- [ ] Test coverage ≥ 85%
- [ ] Visual accuracy confirmed
- [ ] Code review approved
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

Fixes: US-NEXT-005-refactor-EmotionChart"
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
