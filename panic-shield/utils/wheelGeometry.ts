/**
 * Utility functions for calculating wheel geometry, segment positions, and SVG paths
 */

export interface Point {
  x: number;
  y: number;
}

export interface SegmentPath {
  path: string;
  centerX: number;
  centerY: number;
  startAngle: number;
  endAngle: number;
}

export interface WheelConfig {
  centerX: number;
  centerY: number;
  innerRadius: number;
  outerRadius: number;
  segments: number;
  startAngle?: number;
}

/**
 * Convert degrees to radians
 */
export const degToRad = (degrees: number): number => {
  return (degrees * Math.PI) / 180;
};

/**
 * Convert radians to degrees
 */
export const radToDeg = (radians: number): number => {
  return (radians * 180) / Math.PI;
};

/**
 * Calculate a point on a circle
 */
export const pointOnCircle = (
  centerX: number,
  centerY: number,
  radius: number,
  angleRad: number
): Point => {
  return {
    x: centerX + radius * Math.cos(angleRad),
    y: centerY + radius * Math.sin(angleRad)
  };
};

/**
 * Calculate segment angles for a wheel with given number of segments
 */
export const calculateSegmentAngles = (
  totalSegments: number,
  segmentIndex: number,
  startAngle: number = -90
): { startAngle: number; endAngle: number; midAngle: number } => {
  const anglePerSegment = 360 / totalSegments;
  const segmentStartAngle = startAngle + (anglePerSegment * segmentIndex);
  const segmentEndAngle = segmentStartAngle + anglePerSegment;
  const midAngle = segmentStartAngle + (anglePerSegment / 2);

  return {
    startAngle: segmentStartAngle,
    endAngle: segmentEndAngle,
    midAngle
  };
};

/**
 * Generate SVG path for a wheel segment (arc)
 */
export const generateSegmentPath = (
  centerX: number,
  centerY: number,
  innerRadius: number,
  outerRadius: number,
  startAngleDeg: number,
  endAngleDeg: number
): SegmentPath => {
  const startAngleRad = degToRad(startAngleDeg);
  const endAngleRad = degToRad(endAngleDeg);

  // Calculate points
  const outerStart = pointOnCircle(centerX, centerY, outerRadius, startAngleRad);
  const outerEnd = pointOnCircle(centerX, centerY, outerRadius, endAngleRad);
  const innerStart = pointOnCircle(centerX, centerY, innerRadius, startAngleRad);
  const innerEnd = pointOnCircle(centerX, centerY, innerRadius, endAngleRad);

  // Large arc flag (1 if arc > 180 degrees)
  const largeArcFlag = Math.abs(endAngleDeg - startAngleDeg) > 180 ? 1 : 0;

  // Build path
  const path = [
    `M ${outerStart.x} ${outerStart.y}`, // Move to outer start
    `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEnd.x} ${outerEnd.y}`, // Outer arc
    `L ${innerEnd.x} ${innerEnd.y}`, // Line to inner end
    `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStart.x} ${innerStart.y}`, // Inner arc (reverse)
    'Z' // Close path
  ].join(' ');

  // Calculate center point for text/icon placement
  const midAngleRad = degToRad((startAngleDeg + endAngleDeg) / 2);
  const labelRadius = (innerRadius + outerRadius) / 2;
  const labelCenter = pointOnCircle(centerX, centerY, labelRadius, midAngleRad);

  return {
    path,
    centerX: labelCenter.x,
    centerY: labelCenter.y,
    startAngle: startAngleDeg,
    endAngle: endAngleDeg
  };
};

/**
 * Check if a point is inside a segment (for hit detection)
 */
export const isPointInSegment = (
  x: number,
  y: number,
  centerX: number,
  centerY: number,
  innerRadius: number,
  outerRadius: number,
  startAngleDeg: number,
  endAngleDeg: number
): boolean => {
  // Calculate distance from center
  const dx = x - centerX;
  const dy = y - centerY;
  const distance = Math.sqrt(dx * dx + dy * dy);

  // Check if within radius range
  if (distance < innerRadius || distance > outerRadius) {
    return false;
  }

  // Calculate angle
  let angle = radToDeg(Math.atan2(dy, dx));

  // Normalize angle to 0-360
  if (angle < 0) angle += 360;

  // Normalize start and end angles
  let normalizedStart = startAngleDeg;
  let normalizedEnd = endAngleDeg;

  if (normalizedStart < 0) normalizedStart += 360;
  if (normalizedEnd < 0) normalizedEnd += 360;

  // Handle wrap-around case
  if (normalizedEnd < normalizedStart) {
    return angle >= normalizedStart || angle <= normalizedEnd;
  }

  return angle >= normalizedStart && angle <= normalizedEnd;
};

/**
 * Calculate grid positions for core emotions (fallback for non-wheel layout)
 */
export const calculateGridPosition = (
  index: number,
  total: number,
  columns: number = 2
): { row: number; col: number } => {
  const row = Math.floor(index / columns);
  const col = index % columns;
  return { row, col };
};

/**
 * Generate positions for sub-emotions in a circular arrangement around a core
 */
export const generateSubEmotionPositions = (
  coreX: number,
  coreY: number,
  subEmotionCount: number,
  radius: number = 80,
  startAngle: number = 0
): Point[] => {
  const positions: Point[] = [];
  const angleStep = (2 * Math.PI) / subEmotionCount;

  for (let i = 0; i < subEmotionCount; i++) {
    const angle = startAngle + (i * angleStep);
    positions.push(pointOnCircle(coreX, coreY, radius, angle));
  }

  return positions;
};

/**
 * Calculate bounding box for a set of points
 */
export const calculateBoundingBox = (points: Point[]): {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
} => {
  if (points.length === 0) {
    return { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0 };
  }

  const minX = Math.min(...points.map(p => p.x));
  const maxX = Math.max(...points.map(p => p.x));
  const minY = Math.min(...points.map(p => p.y));
  const maxY = Math.max(...points.map(p => p.y));

  return {
    minX,
    minY,
    maxX,
    maxY,
    width: maxX - minX,
    height: maxY - minY
  };
};

/**
 * Get optimal viewBox for SVG based on wheel configuration
 */
export const getWheelViewBox = (config: WheelConfig, padding: number = 20): string => {
  const size = (config.outerRadius + padding) * 2;
  const offset = config.outerRadius + padding;
  return `${config.centerX - offset} ${config.centerY - offset} ${size} ${size}`;
};

/**
 * Calculate animation delay for staggered entrance effects
 */
export const calculateStaggerDelay = (
  index: number,
  totalItems: number,
  maxDelay: number = 200,
  staggerType: 'sequential' | 'radial' | 'random' = 'sequential'
): number => {
  switch (staggerType) {
    case 'sequential':
      return (index / totalItems) * maxDelay;
    case 'radial':
      // Start from opposite sides and meet in middle
      const middle = Math.floor(totalItems / 2);
      const distance = Math.abs(index - middle);
      return (distance / middle) * maxDelay;
    case 'random':
      return Math.random() * maxDelay;
    default:
      return 0;
  }
};