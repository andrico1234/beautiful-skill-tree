import React from 'react';
import './Icon.css';

export interface Props {
  containerWidth: number;
  src: string;
  title: string;
}

function Icon({ src, title, containerWidth }: Props) {
  return (
    <div
      data-testid="icon-container"
      style={{
        height: `${containerWidth}px`,
        width: `${containerWidth}px`,
        display: 'flex',
      }}
    >
      <img
        style={{ pointerEvents: 'none' }}
        src={src}
        alt={title}
        className="Icon"
      />
    </div>
  );
}

export default Icon;
