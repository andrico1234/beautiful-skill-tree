import * as React from 'react';
import { throttle } from 'lodash';
import styled, { BaseThemedCssFunction } from 'styled-components';
import Tippy from '@tippy.js/react';
import { LOCKED_STATE, UNLOCKED_STATE, SELECTED_STATE } from './constants';
import SkillTreeSegment from './SkillTreeSegment';
import Tooltip from './ui/Tooltip';
import { Skill, NodeState } from '../models';
import Node from './ui/Node';
import MobileContext from '../context/MobileContext';

const keyframes = require('styled-components').keyframes;
const css: BaseThemedCssFunction<any> = require('styled-components').css;

interface Props {
  skill: Skill;
  nodeState: NodeState;
  incSkillCount: (optional?: boolean) => void;
  decSkillCount: (optional?: boolean) => void;
  updateSkillState: (
    key: string,
    updatedState: NodeState,
    optional?: boolean
  ) => void;
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
  const { children, title, tooltip, id, optional } = skill;
  const { direction = 'top', content } = tooltip;
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
      incSkillCount(optional);
      return updateSkillState(id, SELECTED_STATE, optional);
    }

    decSkillCount(optional);
    return updateSkillState(id, UNLOCKED_STATE, optional);
  }

  React.useEffect(() => {
    calculatePosition();
    calculateOverlayWidth();

    window.addEventListener('resize', throttle(handleResize, 500));

    return function cleanup() {
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
          interactive
          placement={isMobile ? 'top' : direction}
          hideOnClick={false}
          content={<Tooltip content={content} title={title} />}
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
                hasParent={true}
                parentPosition={parentPosition}
                shouldBeUnlocked={
                  (optional && nodeState === UNLOCKED_STATE) ||
                  nodeState === SELECTED_STATE
                }
                skill={child}
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
  left: 3px;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  width: ${props => props.childWidth + 4}px;
  z-index: 10;

  @media (min-width: 410px) {
    left: 8px;
  }

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
