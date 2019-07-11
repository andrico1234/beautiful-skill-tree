import React from 'react';
import classnames from 'classnames';

interface Props {
  position: {
    topX: number;
    topY: number;
    bottomX: number;
    bottomY: number;
  };
  className: string;
  direction: 'left' | 'right';
  isActive: boolean;
}

function AngledLine({ position, direction, className, isActive }: Props) {
  const { topX, topY, bottomX } = position;

  // no one:
  // css:
  const leftHorizontalStyles = {
    left: `${topX - 3}px`,
    transform: 'scaleX(-1)',
    transformOrigin: '0 0',
    top: `${topY + 24}px`,
    width: `${topX - bottomX - 6}px`,
  };

  const rightHorizontalStyles = {
    left: `${topX + 3}px`,
    top: `${topY + 24}px`,
    width: `${bottomX - topX - 6}px`,
  };

  return (
    <React.Fragment>
      <div
        data-testid="angled-line-one"
        className={classnames(`${className} AngledLine AngledLine--vertical`, {
          'AngledLine--rounded-bottom-right': direction === 'right',
          'AngledLine--rounded-top-right': direction === 'left',
          'AngledLine__line-one--active': isActive,
        })}
        style={{
          top: `${topY - 1}px`,
          left: `${topX + 3}px`,
          width: '29px',
        }}
      />
      <div
        data-testid="angled-line-two"
        className={classnames(
          `${className} AngledLine AngledLine--horizontal`,
          {
            'AngledLine__line-two--active': isActive,
          }
        )}
        style={
          direction === 'left' ? leftHorizontalStyles : rightHorizontalStyles
        }
      />
      <div
        data-testid="angled-line-three"
        className={classnames(`${className} AngledLine AngledLine--vertical`, {
          'AngledLine--rounded-top-left': direction === 'right',
          'AngledLine--rounded-bottom-left': direction === 'left',
          'AngledLine__line-three--active': isActive,
        })}
        style={{
          top: `${topY + 24}px`,
          left: `${bottomX + 3}px`,
          width: '31px',
        }}
      />
    </React.Fragment>
  );
}

export default AngledLine;
