import React, {
  useRef,
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';
import { throttle, isEmpty } from 'lodash';
import styled from 'styled-components';
import SkillNode from './SkillNode';
import SkillEdge from './SkillEdge';
import { Skill, ParentPosition, ChildPosition } from '../models';
import { Nullable } from '../models/utils';
import SkillContext from '../context/SkillContext';
import { SELECTED_STATE, LOCKED_STATE, UNLOCKED_STATE } from './constants';

type Props = {
  skill: Skill;
  parentPosition: ParentPosition;
  shouldBeUnlocked: boolean;
} & typeof SkillTreeSegment.defaultProps;

const defaultParentPosition: ChildPosition = {
  center: 0,
};

function SkillTreeSegment({
  skill,
  hasParent,
  parentPosition,
  shouldBeUnlocked,
}: Props) {
  const [childPosition, setChildPosition] = useState(defaultParentPosition);
  const {
    skills,
    updateSkillState,
    decrementSelectedCount,
    incrementSelectedCount,
  } = useContext(SkillContext);

  const skillNodeRef: React.MutableRefObject<Nullable<HTMLDivElement>> = useRef(
    null
  );

  const nodeState = skills[skill.id] ? skills[skill.id].nodeState : 'locked';

  function calculatePosition() {
    const { left, width } = skillNodeRef.current!.getBoundingClientRect();

    const scrollX = window.scrollX;

    setChildPosition({
      center: left + width / 2 + scrollX,
    });
  }

  useEffect(() => {
    if (nodeState === SELECTED_STATE && !shouldBeUnlocked) {
      decrementSelectedCount();
      return updateSkillState(skill.id, LOCKED_STATE);
    }

    if (nodeState === UNLOCKED_STATE && !shouldBeUnlocked) {
      return updateSkillState(skill.id, LOCKED_STATE);
    }

    if (!shouldBeUnlocked) {
      return;
    }

    if (nodeState === LOCKED_STATE && shouldBeUnlocked) {
      return updateSkillState(skill.id, UNLOCKED_STATE);
    }
  }, [nodeState, shouldBeUnlocked]);

  useEffect(() => {
    window.addEventListener('resize', throttle(calculatePosition, 500));
    calculatePosition();

    if (isEmpty(skills)) {
      return updateSkillState(skill.id, UNLOCKED_STATE);
    }

    return function cleanup() {
      window.removeEventListener('resize', throttle(calculatePosition, 500));
    };
  }, []);

  return (
    <StyledSkillTreeSegment>
      {hasParent && (
        <SkillEdge
          nodeState={nodeState}
          topX={parentPosition.center}
          topY={parentPosition.bottom}
          bottomX={childPosition.center}
        />
      )}
      <div ref={skillNodeRef}>
        <SkillNode
          incSkillCount={useCallback(incrementSelectedCount, [])}
          decSkillCount={useCallback(decrementSelectedCount, [])}
          updateSkillState={updateSkillState}
          skill={skill}
          nodeState={nodeState}
        />
      </div>
    </StyledSkillTreeSegment>
  );
}

SkillTreeSegment.defaultProps = {
  hasParent: true,
};

export default SkillTreeSegment;

const StyledSkillTreeSegment = styled.div`
  @media (min-width: 900px) {
    margin: 0;
  }
`;
