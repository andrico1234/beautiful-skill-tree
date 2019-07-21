import * as React from 'react';
import { throttle, Cancelable } from 'lodash';
import styled, { keyframes, css } from 'styled-components';
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

interface SkillNodeOverlayProps {
  childWidth: number;
  selected: boolean;
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
      <StyledSkillNode>
        <SkillNodeOverlay
          selected={nodeState === SELECTED_STATE}
          childWidth={childWidth.current}
          data-testid="skill-node-overlay"
        />
        <StyledTippy
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
        </StyledTippy>
      </StyledSkillNode>

      {children.length > 0 && (
        <SkillTreeSegmentWrapper>
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
        </SkillTreeSegmentWrapper>
      )}
    </React.Fragment>
  );
}

export default SkillNode;

const fadeout = keyframes`
  from,
  30% {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
`;

const StyledSkillNode = styled.div`
  margin: 0 auto;
  position: relative;
  width: fit-content;
`;

const SkillNodeOverlay = styled.span<SkillNodeOverlayProps>`
  background-color: white;
  border-radius: 4px;
  height: 100%;
  left: 8px;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  width: ${props => props.childWidth + 4}px;
  z-index: 10;

  @media (min-width: 900px) {
    left: 16px;
  }

  ${props =>
    props.selected &&
    css`
      animation: ${fadeout} 3.5s 1;
    `}
`;

const StyledTippy = styled(Tippy)`
  background-color: #282c34;
  border: 2px solid;
  border-image-source: linear-gradient(
    to right,
    #d0e6a5 0%,
    #86e3ce 50%,
    #ccabd8 100%
  );
  border-image-slice: 1;
  border-radius: 4px;
  padding: 0 8px;
  text-align: left;
  width: 320px;

  .tippy-backdrop {
    background-color: #282c34;
  }
`;

const SkillTreeSegmentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
