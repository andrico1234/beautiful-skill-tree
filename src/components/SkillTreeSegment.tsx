import React, { useRef, useEffect, useState, useContext } from 'react';
import { throttle } from 'lodash';
import SkillNode from './SkillNode';
import SkillEdge from './SkillEdge';
import { Skill, ParentPosition, ChildPosition, NodeState } from '../models';
import { Nullable } from '../models/utils';
import SkillContext from '../context/SkillContext';

interface Props {
  skill: Skill;
  parentPosition: ParentPosition;
  parentNodeId?: string;
  parentState: NodeState;
}

const defaultParentPosition: ChildPosition = {
  top: 0,
  center: 0,
};

const SkillTreeSegment = React.memo(function({
  skill,
  parentNodeId,
  parentPosition,
  parentState,
}: Props) {
  const [childPosition, setChildPosition] = useState(defaultParentPosition);
  const { skills } = useContext(SkillContext);
  const nodeState = skills[skill.id];

  const skillNodeRef: React.MutableRefObject<Nullable<HTMLDivElement>> = useRef(
    null
  );

  useEffect(() => {
    function calculatePosition() {
      const {
        top,
        left,
        width,
      } = skillNodeRef.current!.getBoundingClientRect();

      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      setChildPosition({
        top: top + scrollY,
        center: left + width / 2 + scrollX,
      });
    }

    window.addEventListener('resize', throttle(calculatePosition, 250));
    calculatePosition();

    return function cleanup() {
      window.removeEventListener('resize', throttle(calculatePosition));
    };
  }, []);

  return (
    <div className="SkillTreeSegment">
      {parentNodeId && (
        <SkillEdge
          nodeState={nodeState}
          position={{
            topX: parentPosition.center,
            topY: parentPosition.bottom,
            bottomX: childPosition.center,
            bottomY: childPosition.top,
          }}
        />
      )}
      <div ref={skillNodeRef}>
        <SkillNode
          skill={skill}
          parentState={parentState}
          nodeState={nodeState}
          parentNodeId={parentNodeId}
        />
      </div>
    </div>
  );
});

export default SkillTreeSegment;
