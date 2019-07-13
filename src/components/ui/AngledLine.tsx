import React from 'react';
import classnames from 'classnames';
import { NodeState } from '../../models';
import { SELECTED_STATE, LOCKED_STATE } from '../../components/constants';

interface Props {
  topX: number;
  topY: number;
  bottomX: number;
  direction: 'left' | 'right';
  state: NodeState;
}

function AngledLine({ topX, topY, bottomX, direction, state }: Props) {
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
    <div className="AngledLine__container">
      <div
        data-testid="angled-line-one"
        className={classnames(`AngledLine AngledLine--vertical`, {
          'AngledLine--rounded-bottom-right': direction === 'right',
          'AngledLine--rounded-top-right': direction === 'left',
          'AngledLine__line-one--selected': state === SELECTED_STATE,
          'AngledLine--unlocked': state !== LOCKED_STATE,
        })}
        style={{
          top: `${topY - 1}px`,
          left: `${topX + 3}px`,
          width: '29px',
        }}
      />
      <div
        data-testid="angled-line-two"
        className={classnames(`AngledLine AngledLine--horizontal`, {
          'AngledLine__line-two--selected': state === SELECTED_STATE,
          'AngledLine--unlocked': state !== LOCKED_STATE,
        })}
        style={
          direction === 'left' ? leftHorizontalStyles : rightHorizontalStyles
        }
      />
      <div
        data-testid="angled-line-three"
        className={classnames(`AngledLine AngledLine--vertical`, {
          'AngledLine--rounded-top-left': direction === 'right',
          'AngledLine--rounded-bottom-left': direction === 'left',
          'AngledLine__line-three--selected': state === SELECTED_STATE,
          'AngledLine--unlocked': state !== LOCKED_STATE,
        })}
        style={{
          top: `${topY + 24}px`,
          left: `${bottomX + 3}px`,
          width: '31px',
        }}
      />
    </div>
  );
}

export default AngledLine;
