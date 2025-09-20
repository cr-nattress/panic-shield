# US-REF-004: Refactor ChartDataPoints Component

## User Story
**As a** developer working on data visualization
**I want** to refactor the ChartDataPoints component
**So that** different visualization types are modular and maintainable

## Priority: P1 (High)
## Story Points: 5
## Current LOC: 445 → Target: <250

## Problem Analysis
- **Current Issues**:
  - 445 lines handling multiple visualization types
  - Repeated calculation patterns across types
  - Complex coordinate mathematics inline
  - No clear separation between point types
  - Missing factory pattern for extensibility
  - Heavy SVG manipulation in render

## Acceptance Criteria
- [ ] Component reduced to under 250 LOC
- [ ] Each visualization type in separate component
- [ ] Coordinate calculations extracted
- [ ] Factory pattern implemented
- [ ] Base class for common functionality
- [ ] Performance maintained or improved
- [ ] New visualization types easily added

## Refactoring Tasks

### 1. Create Base DataPoint Class
```typescript
// New file: components/charts/points/BaseDataPoint.tsx
export abstract class BaseDataPoint {
  protected data: DataPoint[];
  protected dimensions: Dimensions;
  protected scales: Scales;
  
  constructor(data: DataPoint[], dimensions: Dimensions, scales: Scales) {
    this.data = data;
    this.dimensions = dimensions;
    this.scales = scales;
  }
  
  protected calculatePosition(point: DataPoint): Position {
    return {
      x: this.scales.x(point.x),
      y: this.scales.y(point.y)
    };
  }
  
  abstract render(): JSX.Element;
}
```

### 2. Implement Specific Point Types
```typescript
// New file: components/charts/points/CirclePoints.tsx
export class CirclePoints extends BaseDataPoint {
  render(): JSX.Element {
    return (
      <g className="circle-points">
        {this.data.map((point, index) => {
          const pos = this.calculatePosition(point);
          return (
            <circle
              key={index}
              cx={pos.x}
              cy={pos.y}
              r={point.radius || 4}
              fill={point.color || '#000'}
              className="data-point-circle"
            />
          );
        })}
      </g>
    );
  }
}

// Similar for BarPoints, LinePoints, etc.
```

### 3. Create Coordinate Utility
```typescript
// New file: utils/coordinateCalculations.ts
export const coordinates = {
  cartesianToSVG(x: number, y: number, height: number): Point {
    return { x, y: height - y };
  },
  
  polarToCartesian(radius: number, angle: number): Point {
    return {
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle)
    };
  },
  
  calculatePath(points: Point[]): string {
    if (points.length < 2) return '';
    
    const [first, ...rest] = points;
    const path = [`M ${first.x} ${first.y}`];
    
    rest.forEach(point => {
      path.push(`L ${point.x} ${point.y}`);
    });
    
    return path.join(' ');
  },
  
  calculateBezier(points: Point[]): string {
    // Smooth curve calculation
  }
};
```

### 4. Implement Point Factory
```typescript
// New file: components/charts/points/PointFactory.tsx
import { CirclePoints } from './CirclePoints';
import { BarPoints } from './BarPoints';
import { LinePoints } from './LinePoints';
import { AreaPoints } from './AreaPoints';

const pointTypes = {
  circle: CirclePoints,
  bar: BarPoints,
  line: LinePoints,
  area: AreaPoints
};

export function createDataPoints(
  type: PointType,
  data: DataPoint[],
  dimensions: Dimensions,
  scales: Scales
): BaseDataPoint {
  const PointClass = pointTypes[type];
  
  if (!PointClass) {
    throw new Error(`Unknown point type: ${type}`);
  }
  
  return new PointClass(data, dimensions, scales);
}
```

### 5. Refactored Main Component
```typescript
// Refactored: components/charts/ChartDataPoints.tsx
export function ChartDataPoints({
  data,
  type = 'circle',
  dimensions,
  scales,
  interactive = false,
  onPointHover,
  onPointClick
}: ChartDataPointsProps) {
  const points = useMemo(
    () => createDataPoints(type, data, dimensions, scales),
    [type, data, dimensions, scales]
  );
  
  const interactionHandlers = usePointInteraction({
    enabled: interactive,
    onHover: onPointHover,
    onClick: onPointClick
  });
  
  return (
    <g
      className="chart-data-points"
      {...interactionHandlers}
    >
      {points.render()}
      {interactive && (
        <InteractionLayer
          data={data}
          dimensions={dimensions}
          scales={scales}
        />
      )}
    </g>
  );
}
```

### 6. Create Interaction Hook
```typescript
// New file: hooks/usePointInteraction.ts
export function usePointInteraction({
  enabled,
  onHover,
  onClick
}: InteractionOptions) {
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!enabled) return;
    
    const point = findNearestPoint(e.clientX, e.clientY);
    if (point !== hoveredPoint) {
      setHoveredPoint(point);
      onHover?.(point);
    }
  }, [enabled, hoveredPoint, onHover]);
  
  const handleClick = useCallback((e: MouseEvent) => {
    if (!enabled) return;
    
    const point = findNearestPoint(e.clientX, e.clientY);
    if (point) {
      onClick?.(point);
    }
  }, [enabled, onClick]);
  
  return {
    onMouseMove: handleMouseMove,
    onClick: handleClick,
    hoveredPoint
  };
}
```

## Files to Create/Modify
- [ ] Create `components/charts/points/BaseDataPoint.tsx`
- [ ] Create `components/charts/points/CirclePoints.tsx`
- [ ] Create `components/charts/points/BarPoints.tsx`
- [ ] Create `components/charts/points/LinePoints.tsx`
- [ ] Create `components/charts/points/PointFactory.tsx`
- [ ] Create `utils/coordinateCalculations.ts`
- [ ] Create `hooks/usePointInteraction.ts`
- [ ] Refactor `components/charts/ChartDataPoints.tsx`

## Testing Requirements
- [ ] Unit tests for coordinate calculations
- [ ] Unit tests for each point type
- [ ] Factory pattern tests
- [ ] Interaction hook tests
- [ ] Visual regression tests
- [ ] Performance benchmarks
- [ ] Edge cases (empty data, single point)

## Definition of Done
- [ ] Component under 250 LOC
- [ ] All visualization types working
- [ ] Factory pattern implemented
- [ ] Tests passing with >80% coverage
- [ ] Performance maintained
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

Fixes: US-REF-004-chart-data-points"
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
