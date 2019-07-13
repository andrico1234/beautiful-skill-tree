import React from 'react';
import classnames from 'classnames';
import { NodeState } from '../../models';
import { SELECTED_STATE, LOCKED_STATE } from '../../components/constants';

interface LineProps {
  bottomX: number;
  bottomY: number;
  topX: number;
  topY: number;
  state: NodeState;
}

function Line({ topX, topY, state }: LineProps) {
  return (
    <div className="Line__container">
      <div
        data-testid="straight-line"
        className={classnames('Line', {
          'Line--selected': state === SELECTED_STATE,
          'Line--unlocked': state !== LOCKED_STATE,
        })}
        style={{
          top: `${topY - 1}px`,
          left: `${topX + 3}px`,
        }}
      />
    </div>
  );
}

export default Line;
