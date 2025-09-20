import React, { useEffect, useState } from 'react';

export interface TooltipData {
  title?: string;
  value?: string | number;
  label?: string;
  color?: string;
  additionalInfo?: Array<{
    label: string;
    value: string | number;
  }>;
}

export interface ChartTooltipProps {
  data: TooltipData | null;
  position: { x: number; y: number } | null;
  visible: boolean;
  offset?: { x: number; y: number };
  className?: string;
}

/**
 * ChartTooltip component for displaying contextual information on hover
 * Handles positioning, content formatting, and visibility
 */
export default function ChartTooltip({
  data,
  position,
  visible,
  offset = { x: 10, y: -10 },
  className = ''
}: ChartTooltipProps) {
  const [adjustedPosition, setAdjustedPosition] = useState(position);

  useEffect(() => {
    if (!position || !visible) {
      setAdjustedPosition(null);
      return;
    }

    // Adjust position to keep tooltip in viewport
    const adjustPosition = () => {
      const tooltip = document.querySelector('.chart-tooltip') as HTMLElement;
      if (!tooltip) return position;

      const rect = tooltip.getBoundingClientRect();
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight
      };

      let adjustedX = position.x + offset.x;
      let adjustedY = position.y + offset.y;

      // Adjust X position if tooltip would go off screen
      if (adjustedX + rect.width > viewport.width) {
        adjustedX = position.x - rect.width - offset.x;
      }

      // Adjust Y position if tooltip would go off screen
      if (adjustedY + rect.height > viewport.height) {
        adjustedY = position.y - rect.height - offset.y;
      }

      // Ensure tooltip doesn't go negative
      adjustedX = Math.max(0, adjustedX);
      adjustedY = Math.max(0, adjustedY);

      return { x: adjustedX, y: adjustedY };
    };

    // Use a small delay to ensure the tooltip is rendered
    const timeoutId = setTimeout(() => {
      setAdjustedPosition(adjustPosition());
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [position, visible, offset]);

  if (!visible || !data || !adjustedPosition) {
    return null;
  }

  return (
    <>
      <div
        className={`chart-tooltip ${className}`}
        style={{
          position: 'fixed',
          left: adjustedPosition.x,
          top: adjustedPosition.y,
          zIndex: 1000
        }}
      >
        <div className="tooltip-content">
          {data.title && (
            <div className="tooltip-title">
              {data.color && (
                <div
                  className="tooltip-color-indicator"
                  style={{ backgroundColor: data.color }}
                />
              )}
              {data.title}
            </div>
          )}

          {data.label && (
            <div className="tooltip-label">{data.label}</div>
          )}

          {data.value !== undefined && (
            <div className="tooltip-value">
              {typeof data.value === 'number' ? data.value.toFixed(1) : data.value}
            </div>
          )}

          {data.additionalInfo && data.additionalInfo.length > 0 && (
            <div className="tooltip-additional">
              {data.additionalInfo.map((info, i) => (
                <div key={i} className="tooltip-info-row">
                  <span className="info-label">{info.label}:</span>
                  <span className="info-value">
                    {typeof info.value === 'number' ? info.value.toFixed(1) : info.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .chart-tooltip {
          background: var(--popover);
          border: 1px solid var(--border);
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          pointer-events: none;
          animation: tooltipFadeIn 0.15s ease-out;
        }

        @keyframes tooltipFadeIn {
          from {
            opacity: 0;
            transform: translateY(4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .tooltip-content {
          padding: 8px 12px;
          max-width: 200px;
        }

        .tooltip-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 600;
          font-size: 13px;
          color: var(--popover-foreground);
          margin-bottom: 4px;
        }

        .tooltip-color-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .tooltip-label {
          font-size: 12px;
          color: var(--muted-foreground);
          margin-bottom: 2px;
        }

        .tooltip-value {
          font-size: 14px;
          font-weight: 600;
          color: var(--popover-foreground);
        }

        .tooltip-additional {
          margin-top: 6px;
          padding-top: 6px;
          border-top: 1px solid var(--border);
        }

        .tooltip-info-row {
          display: flex;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 2px;
          font-size: 11px;
        }

        .info-label {
          color: var(--muted-foreground);
        }

        .info-value {
          color: var(--popover-foreground);
          font-weight: 500;
        }
      `}</style>
    </>
  );
}

/**
 * Hook for managing tooltip state and positioning
 */
export function useChartTooltip() {
  const [tooltip, setTooltip] = useState<{
    data: TooltipData | null;
    position: { x: number; y: number } | null;
    visible: boolean;
  }>({
    data: null,
    position: null,
    visible: false
  });

  const showTooltip = (data: TooltipData, event: React.MouseEvent) => {
    const clientRect = (event.currentTarget as Element).getBoundingClientRect();
    setTooltip({
      data,
      position: {
        x: event.clientX,
        y: event.clientY
      },
      visible: true
    });
  };

  const hideTooltip = () => {
    setTooltip(prev => ({
      ...prev,
      visible: false
    }));
  };

  const updateTooltipPosition = (event: React.MouseEvent) => {
    if (tooltip.visible) {
      setTooltip(prev => ({
        ...prev,
        position: {
          x: event.clientX,
          y: event.clientY
        }
      }));
    }
  };

  return {
    tooltip,
    showTooltip,
    hideTooltip,
    updateTooltipPosition
  };
}

/**
 * Specialized tooltip components for different chart types
 */
export function TimelineTooltip({
  data,
  position,
  visible
}: Pick<ChartTooltipProps, 'data' | 'position' | 'visible'>) {
  if (!data) return null;

  return (
    <ChartTooltip
      data={{
        title: data.label,
        value: `Intensity: ${data.value}`,
        color: data.color,
        additionalInfo: data.additionalInfo
      }}
      position={position}
      visible={visible}
      className="timeline-tooltip"
    />
  );
}

export function DistributionTooltip({
  data,
  position,
  visible
}: Pick<ChartTooltipProps, 'data' | 'position' | 'visible'>) {
  if (!data) return null;

  return (
    <ChartTooltip
      data={{
        title: data.title,
        value: `Count: ${data.value}`,
        color: data.color,
        additionalInfo: data.additionalInfo
      }}
      position={position}
      visible={visible}
      className="distribution-tooltip"
    />
  );
}

export function IntensityTooltip({
  data,
  position,
  visible
}: Pick<ChartTooltipProps, 'data' | 'position' | 'visible'>) {
  if (!data) return null;

  return (
    <ChartTooltip
      data={{
        title: data.title,
        value: `Avg Intensity: ${data.value}`,
        color: data.color,
        additionalInfo: data.additionalInfo
      }}
      position={position}
      visible={visible}
      className="intensity-tooltip"
    />
  );
}

export function WeeklyTooltip({
  data,
  position,
  visible
}: Pick<ChartTooltipProps, 'data' | 'position' | 'visible'>) {
  if (!data) return null;

  return (
    <ChartTooltip
      data={{
        title: data.title,
        value: `Count: ${data.value}`,
        color: data.color,
        additionalInfo: data.additionalInfo
      }}
      position={position}
      visible={visible}
      className="weekly-tooltip"
    />
  );
}