import React from 'react';
import classnames from 'classnames';
import { SELECTED_STATE, LOCKED_STATE } from './constants';
import Line from './ui/Line';
import AngledLine from './ui/AngledLine';
import { NodeState } from 'models';

interface Props {
  position: {
    topX: number;
    topY: number;
    bottomX: number;
    bottomY: number;
  };
  nodeState: NodeState;
}

function SkillEdge({ position, nodeState }: Props) {
  const isActive = nodeState === SELECTED_STATE;
  const isUnlocked = nodeState !== LOCKED_STATE;

  if (position.topX === position.bottomX) {
    return (
      <div className="SkillEdge__container">
        <Line
          {...position}
          className={classnames('SkillEdge', {
            'SkillEdge--active': isActive,
            'SkillEdge--unlocked': isUnlocked,
          })}
        />
      </div>
    );
  }

  return (
    <div className="SkillEdge__container">
      <AngledLine
        isActive={isActive}
        position={position}
        direction={position.topX < position.bottomX ? 'right' : 'left'}
        className={classnames('SkillEdge', {
          'SkillEdge--unlocked': isUnlocked,
        })}
      />
    </div>
  );
}

export default SkillEdge;
