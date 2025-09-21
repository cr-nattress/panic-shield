# US-REF-002: Further Refactor EmotionChart Component

## User Story
**As a** developer maintaining the charting system
**I want** to refactor the EmotionChart component further
**So that** different chart types are modular and calculations are optimized

## Priority: P0 (Critical)
## Story Points: 8
## Current LOC: 475 → Target: <250

## Problem Analysis
- **Current Issues**:
  - 475 lines handling multiple chart types
  - Heavy data processing in render cycle
  - Complex SVG generation logic inline
  - Repeated calculation patterns
  - Mixed chart configuration and rendering
  - No memoization of expensive operations

## Acceptance Criteria
- [ ] Component reduced to under 250 LOC
- [ ] Chart types split into separate components
- [ ] Data processing extracted to hooks
- [ ] Calculations memoized properly
- [ ] SVG generation abstracted
- [ ] Performance improved by 30%+
- [ ] All chart types still functional

## Refactoring Tasks

### 1. Create Chart Type Components
```typescript
// New file: components/charts/types/LineChart.tsx
export function LineChart({ data, config }: ChartProps) {
  const points = useLinePoints(data, config);
  return (
    <g className="line-chart">
      <path d={points.path} />
      {points.dots.map(dot => <circle key={dot.id} {...dot} />)}
    </g>
  );
}

// Similar for BarChart, AreaChart, etc.
```

### 2. Extract Data Processing Hook
```typescript
// New file: hooks/useChartData.ts
export function useChartData(rawData: EmotionLog[], chartType: ChartType) {
  const processedData = useMemo(() => {
    switch (chartType) {
      case 'line':
        return processLineData(rawData);
      case 'bar':
        return processBarData(rawData);
      case 'area':
        return processAreaData(rawData);
      default:
        return rawData;
    }
  }, [rawData, chartType]);

  const scales = useMemo(() => {
    return calculateScales(processedData);
  }, [processedData]);

  return { processedData, scales };
}
```

### 3. Create Chart Calculation Utilities
```typescript
// New file: utils/chartCalculations.ts
export const chartCalculations = {
  processLineData(data: EmotionLog[]): LineData {
    // Extract from component
  },
  
  processBarData(data: EmotionLog[]): BarData {
    // Extract from component
  },
  
  calculateScales(data: ProcessedData): Scales {
    // Memoized scale calculations
  },
  
  generatePath(points: Point[]): string {
    // SVG path generation
  }
};
```

### 4. Implement Chart Factory
```typescript
// New file: components/charts/ChartFactory.tsx
const chartComponents = {
  line: LineChart,
  bar: BarChart,
  area: AreaChart,
  scatter: ScatterChart
};

export function ChartFactory({ type, ...props }: ChartFactoryProps) {
  const ChartComponent = chartComponents[type];
  if (!ChartComponent) {
    console.warn(`Unknown chart type: ${type}`);
    return null;
  }
  return <ChartComponent {...props} />;
}
```

### 5. Refactored Main Component
```typescript
// Refactored: components/charts/EmotionChart.tsx
export function EmotionChart({ data, type = 'line', config }: EmotionChartProps) {
  const { processedData, scales } = useChartData(data, type);
  const dimensions = useChartDimensions(config);
  
  return (
    <div className="emotion-chart">
      <svg width={dimensions.width} height={dimensions.height}>
        <ChartAxes scales={scales} dimensions={dimensions} />
        <ChartGrid dimensions={dimensions} />
        <ChartFactory
          type={type}
          data={processedData}
          scales={scales}
          dimensions={dimensions}
        />
      </svg>
      <ChartLegend data={processedData} />
    </div>
  );
}
```

## Files to Create/Modify
- [ ] Create `components/charts/types/LineChart.tsx`
- [ ] Create `components/charts/types/BarChart.tsx`
- [ ] Create `components/charts/types/AreaChart.tsx`
- [ ] Create `components/charts/ChartFactory.tsx`
- [ ] Create `hooks/useChartData.ts`
- [ ] Create `hooks/useChartDimensions.ts`
- [ ] Enhance `utils/chartCalculations.ts`
- [ ] Refactor `components/charts/EmotionChart.tsx`

## Performance Optimizations
```typescript
// Memoize expensive calculations
const memoizedPath = useMemo(
  () => generatePath(points),
  [points]
);

// Use React.memo for chart types
export const LineChart = React.memo(LineChartComponent);

// Implement virtualization for large datasets
const visiblePoints = useVirtualization(allPoints, viewport);
```

## Testing Requirements
- [ ] Unit tests for calculation utilities
- [ ] Component tests for each chart type
- [ ] Integration test for ChartFactory
- [ ] Performance benchmarks
- [ ] Visual regression tests
- [ ] Data edge cases (empty, single point, etc.)

## Definition of Done
- [ ] Component under 250 LOC
- [ ] All chart types working
- [ ] 30%+ performance improvement
- [ ] Tests passing with >80% coverage
- [ ] No visual regressions
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
git commit -m "refactor(components): refactor component to improve maintainability

- Increased placeholder opacity from 0.2 to 0.7
- Fixed text contrast to meet WCAG AA standards (4.5:1)
- Added text shadows for better legibility
- Improved icon visibility with drop shadows

Fixes: US-REF-002-emotion-chart-update"
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
