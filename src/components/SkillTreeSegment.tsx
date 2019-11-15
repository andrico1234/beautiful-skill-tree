import React, { useRef, useEffect, useContext, useCallback } from 'react';
import { isEmpty } from 'lodash';
import SkillNode from './SkillNode';
import SkillEdge from './SkillEdge';
import { Skill } from '../models';
import { Nullable } from '../models/utils';
import SkillContext from '../context/SkillContext';
import { SELECTED_STATE, LOCKED_STATE, UNLOCKED_STATE } from './constants';

type Props = {
  skill: Skill;
  parentPosition: number;
  parentHasMultipleChildren: boolean;
  shouldBeUnlocked: boolean;
} & typeof SkillTreeSegment.defaultProps;

function SkillTreeSegment({
  skill,
  hasParent,
  parentHasMultipleChildren,
  parentPosition,
  shouldBeUnlocked,
}: Props) {
  const {
    mounting,
    skills,
    updateSkillState,
    decrementSelectedCount,
    incrementSelectedCount,
  } = useContext(SkillContext);

  const skillNodeRef: React.MutableRefObject<Nullable<HTMLDivElement>> = useRef(
    null
  );

  const nodeState = skills[skill.id] ? skills[skill.id].nodeState : 'locked';

  useEffect(() => {
    if (mounting) return;

    if (nodeState === SELECTED_STATE && !shouldBeUnlocked) {
      decrementSelectedCount();
      return updateSkillState(skill.id, LOCKED_STATE, skill.optional);
    }

    if (nodeState === UNLOCKED_STATE && !shouldBeUnlocked) {
      return updateSkillState(skill.id, LOCKED_STATE, skill.optional);
    }

    if (!shouldBeUnlocked) {
      return;
    }

    if (nodeState === LOCKED_STATE && shouldBeUnlocked) {
      return updateSkillState(skill.id, UNLOCKED_STATE, skill.optional);
    }
  }, [nodeState, shouldBeUnlocked, mounting]);

  useEffect(() => {
    if (mounting) return;

    if (isEmpty(skills)) {
      return updateSkillState(skill.id, UNLOCKED_STATE);
    }

    return;
  }, [mounting]);

  return (
    <div
      style={{
        margin: !hasParent ? '16px 0' : '',
      }}
    >
      {hasParent && (
        <SkillEdge
          parentHasMultipleChildren={parentHasMultipleChildren}
          state={nodeState}
          childNodeRef={skillNodeRef}
          parentPosition={parentPosition}
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
    </div>
  );
}

SkillTreeSegment.defaultProps = {
  hasParent: true,
};

export default SkillTreeSegment;
