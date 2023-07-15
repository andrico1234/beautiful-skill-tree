import React, { useEffect, useState } from 'react';
import { throttle } from 'lodash';
import { NodeState } from '../models';
import Line from './ui/Line';
import UpperAngledLine from './ui/UpperAngledLine';
import MiddleAngledLine from './ui/MiddleAngledLine';
import LowerAngledLine from './ui/LowerAngledLine';
import { Nullable } from 'models/utils';

export interface Props {
  parentHasMultipleChildren: boolean;
  childNodeRef: React.MutableRefObject<Nullable<HTMLDivElement>>;
  state: NodeState;
  parentPosition: number;
}

function SkillEdge(props: Props) {
  const {
    parentHasMultipleChildren,
    state,
    childNodeRef,
    parentPosition,
  } = props;

  const [childPosition, setChildPosition] = useState(0);
  const direction = parentPosition < childPosition ? 'right' : 'left';

  if (!parentHasMultipleChildren) {
    return <Line state={state} />;
  }

  function calculatePosition() {
    const { left, width } = childNodeRef.current!.getBoundingClientRect();

    const scrollX = window.scrollX;

    setChildPosition(left + width / 2 + scrollX);
  }

  useEffect(() => {
    const throttledHandleResize = throttle(calculatePosition, 200);

    window.addEventListener('resize', throttledHandleResize);
    calculatePosition();

    return function cleanup() {
      window.removeEventListener('resize', throttledHandleResize);
    };
  }, []);

  return (
    <div style={{ height: '56px' }}>
      <UpperAngledLine state={state} direction={direction} />
      <div style={{ position: 'relative' }}>
        <MiddleAngledLine
          parentPosition={parentPosition}
          childPosition={childPosition}
          state={state}
          direction={direction}
        />
        <LowerAngledLine direction={direction} state={state} />
      </div>
    </div>
  );
}

export default SkillEdge;
