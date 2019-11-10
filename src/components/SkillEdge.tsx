import React from 'react';
import { NodeState, Direction } from '../models';
import Line from './ui/Line';
import UpperAngledLine from './ui/UpperAngledLine';
import MiddleAngledLine from './ui/MiddleAngledLine';
import LowerAngledLine from './ui/LowerAngledLine';

export interface Props {
  parentHasMultipleChildren: boolean;
  state: NodeState;
  direction: Direction;
  parentCenterPosition: number;
  childCenterPosition: number;
}

function SkillEdge(props: Props) {
  const {
    parentHasMultipleChildren,
    state,
    direction,
    parentCenterPosition,
    childCenterPosition,
  } = props;

  if (!parentHasMultipleChildren) return <Line state={state} />;

  return (
    <div style={{ height: '56px' }}>
      <UpperAngledLine state={state} direction={direction} />
      <div style={{ position: 'relative' }}>
        <MiddleAngledLine
          parentCenterPosition={parentCenterPosition}
          childCenterPosition={childCenterPosition}
          state={state}
          direction={direction}
        />
        <LowerAngledLine direction={direction} state={state} />
      </div>
    </div>
  );
}

export default SkillEdge;
