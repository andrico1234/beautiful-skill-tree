import React from 'react';
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
  if (position.topX === position.bottomX) {
    return <Line {...position} state={nodeState} />;
  }

  return (
    <AngledLine
      {...position}
      state={nodeState}
      direction={position.topX < position.bottomX ? 'right' : 'left'}
    />
  );
}

export default SkillEdge;
