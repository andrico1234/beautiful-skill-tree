import React from 'react';
import Line from './ui/Line';
import AngledLine from './ui/AngledLine';
import { NodeState } from '../models';

interface Props {
  topX: number;
  topY: number;
  bottomX: number;
  nodeState: NodeState;
}

const SkillEdge = React.memo(function({
  topX,
  topY,
  bottomX,
  nodeState,
}: Props) {
  if (Math.floor(topX) === Math.floor(bottomX)) {
    return <Line state={nodeState} />;
  }

  return (
    <AngledLine
      topX={topX}
      topY={topY}
      bottomX={bottomX}
      state={nodeState}
      direction={topX < bottomX ? 'right' : 'left'}
    />
  );
});

export default SkillEdge;
