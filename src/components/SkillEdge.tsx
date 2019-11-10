import React from 'react';
import { NodeState } from '../models';
import Line from './ui/Line';
import UpperAngledLine from './ui/UpperAngledLine';
import MiddleAngledLine from './ui/MiddleAngledLine';
import LowerAngledLine from './ui/LowerAngledLine';

interface Props {
  parentHasMultipleChildren: boolean;
  state: NodeState;
  direction: 'left' | 'right';
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
    <>
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
    </>
  );
}

export default SkillEdge;
