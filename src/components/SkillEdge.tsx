import React from 'react';
import Line from './ui/Line';
// import AngledLine from './ui/AngledLine';
import UpperAngledLine from './ui/UpperAngledLine';
import { NodeState } from '../models';

interface Props {
  topX: number;
  topY: number;
  bottomX: number;
  nodeState: NodeState;
}

const SkillEdge = React.memo(function({ topX, bottomX, nodeState }: Props) {
  if (Math.floor(topX) === Math.floor(bottomX)) {
    return <Line state={nodeState} />;
  }

  return (
    <UpperAngledLine
      state={nodeState}
      direction={topX < bottomX ? 'right' : 'left'}
    />
  );
});

export default SkillEdge;
