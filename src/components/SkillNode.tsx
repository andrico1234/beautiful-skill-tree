import * as React from 'react';
import { throttle } from 'lodash';
import styled, { keyframes, css } from 'styled-components';
import Tippy from '@tippy.js/react';
import MobileContext from '../context/MobileContext';
import { LOCKED_STATE, UNLOCKED_STATE, SELECTED_STATE } from './constants';
import SkillTreeSegment from './SkillTreeSegment';
import TooltipContent from './ui/TooltipContent';
import { Skill, NodeState } from '../models';
import Node from './ui/Node';

interface Props {
  skill: Skill;
  nodeState: NodeState;
  incSkillCount: VoidFunction;
  decSkillCount: VoidFunction;
  updateSkillState: (key: string, updatedState: NodeState) => void;
}

interface SkillNodeOverlayProps {
  childWidth: number;
  selected: boolean;
}

function SkillNode({
  skill,
  nodeState,
  incSkillCount,
  decSkillCount,
  updateSkillState,
}: Props) {
  const { children, title, tooltip, id } = skill;
  const { direction = 'bottom', description, visible } = tooltip;
  const { isMobile } = React.useContext(MobileContext);
  const [parentPosition, setParentPosition] = React.useState({
    bottom: 0,
    center: 0,
  });

  const skillNodeRef: React.RefObject<HTMLDivElement> = React.useRef(null);
  const childWidth: React.MutableRefObject<number> = React.useRef(0);

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

  function handleResize() {
    calculatePosition();
    calculateOverlayWidth();
  }

  function handleClick() {
    if (nodeState === LOCKED_STATE) {
      return null;
    }

    if (nodeState === UNLOCKED_STATE) {
      incSkillCount();
      return updateSkillState(id, SELECTED_STATE);
    }

    decSkillCount();
    return updateSkillState(id, UNLOCKED_STATE);
  }

  React.useEffect(() => {
    calculatePosition();
    calculateOverlayWidth();

    window.addEventListener('resize', throttle(handleResize, 500));

    return () => {
      window.removeEventListener('resize', throttle(handleResize, 500));
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
          placement={isMobile ? 'top' : direction}
          visible={isMobile ? undefined : visible} // this is buggy on screen size changes
          hideOnClick={false}
          content={
            <TooltipContent tooltipDescription={description} title={title} />
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

export default React.memo(SkillNode);

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
  background-color: ${({ theme }) => theme.nodeOverlayColor};
  border-radius: ${({ theme }) => theme.borderRadius};
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
  background-color: ${({ theme }) => theme.treeBackgroundColor};
  border: ${({ theme }) => theme.border};
  border-image-source: ${({ theme }) => theme.nodeHoverBorderColor};
  border-image-slice: 1;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 0 8px;
  text-align: left;
  width: 320px;

  .tippy-backdrop {
    background-color: ${({ theme }) => theme.treeBackgroundColor};
  }
`;

const SkillTreeSegmentWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
