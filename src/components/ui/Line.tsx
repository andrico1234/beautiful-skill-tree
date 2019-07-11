import React from 'react';

interface LineProps {
  bottomX: number;
  bottomY: number;
  topX: number;
  topY: number;
  className: string;
}

function Line({ className, topX, topY, bottomX, bottomY }: LineProps) {
  const dy = bottomY - topY;
  const dx = bottomX - topX;

  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
  const length = Math.sqrt(dx * dx + dy * dy);
  const leftOffset = 3; // this is the element height halved, since absolute element isn't centered,

  return (
    <div
      data-testid="straight-line"
      className={className}
      style={{
        border: '1px solid white',
        height: '4px',
        position: 'absolute',
        top: `${topY - 1}px`,
        left: `${topX + leftOffset}px`,
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 0',
        width: length,
      }}
    />
  );
}

export default Line;
