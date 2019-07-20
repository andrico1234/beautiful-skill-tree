import * as React from 'react';
import classnames from 'classnames';
import { throttle, Cancelable } from 'lodash';
import Tippy from '@tippy.js/react';
import SkillContext, { ISkillContext } from '../context/SkillContext';
import { LOCKED_STATE, UNLOCKED_STATE, SELECTED_STATE } from './constants';
import SkillTreeSegment from './SkillTreeSegment';
import TooltipContent from './ui/TooltipContent';
import { Skill, NodeState } from '../models';
import Node from './ui/Node';

interface Props {
  skill: Skill;
  nodeState: NodeState;
}

function SkillNode({ skill, nodeState }: Props) {
  const { children, title, tooltipDescription, id } = skill;

  const [isMobile, setMobileState] = React.useState(window.innerWidth < 900);
  const [parentPosition, setParentPosition] = React.useState({
    bottom: 0,
    center: 0,
  });

  const {
    incrementSelectedSkillCount,
    decrementSelectedSkillCount,
    updateSkillState,
  }: ISkillContext = React.useContext(SkillContext);

  const skillNodeRef: React.RefObject<HTMLDivElement> = React.useRef(null);
  const childWidth: React.MutableRefObject<number> = React.useRef(0);

  function handleClick() {
    if (nodeState === LOCKED_STATE) {
      return null;
    }

    if (nodeState === UNLOCKED_STATE) {
      incrementSelectedSkillCount();
      return updateSkillState(id, SELECTED_STATE);
    }

    decrementSelectedSkillCount();
    return updateSkillState(id, UNLOCKED_STATE);
  }

  React.useLayoutEffect(() => {
    const throttledResize: VoidFunction & Cancelable = throttle(
      handleResize,
      200
    );

    function handleResize() {
      calculatePosition();
      calculateOverlayWidth();

      setMobileState(window.innerWidth < 900);
    }

    function calculatePosition() {
      const {
        bottom,
        left,
        right,
      } = skillNodeRef.current!.getBoundingClientRect();

      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      setParentPosition({
        bottom: bottom + scrollY,
        center: (right - left) / 2 + left + scrollX,
      });
    }

    function calculateOverlayWidth() {
      childWidth.current = skillNodeRef.current!.clientWidth;
    }

    calculatePosition();
    calculateOverlayWidth();

    window.addEventListener('resize', throttledResize);

    return () => {
      window.removeEventListener('resize', throttledResize);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="SkillNode">
        <span
          data-testid="skill-node-overlay"
          style={{ width: childWidth.current + 4 }}
          className={classnames('SkillNode__overlay', {
            'SkillNode__overlay--selected': nodeState === SELECTED_STATE,
          })}
        />
        <Tippy
          className="Tooltip"
          placement={isMobile ? 'top' : 'bottom'}
          content={
            <TooltipContent
              tooltipDescription={tooltipDescription}
              title={title}
            />
          }
        >
          <Node
            handleClick={handleClick}
            id={id}
            currentState={nodeState}
            skill={skill}
            ref={skillNodeRef}
          />
        </Tippy>
      </div>
      {children.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {children.map(child => {
            return (
              <SkillTreeSegment
                key={child.id}
                parentPosition={parentPosition}
                parentState={nodeState}
                skill={child}
                parentNodeId={id}
              />
            );
          })}
        </div>
      )}
    </React.Fragment>
  );
}

export default SkillNode;
