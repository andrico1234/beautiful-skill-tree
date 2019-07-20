import React from 'react';
import classnames from 'classnames';
import { NodeState } from '../../models';
import { SELECTED_STATE, LOCKED_STATE } from '../../components/constants';
import styled from 'styled-components';

interface LineProps {
  topX: number;
  topY: number;
  state: NodeState;
}

interface StyledLineProps {
  topX: number;
  topY: number;
}

function Line({ topX, topY, state }: LineProps) {
  return (
    <LineContainer>
      <StyledLine
        topY={topY}
        topX={topX}
        data-testid="straight-line"
        className={classnames({
          'Line--selected': state === SELECTED_STATE,
          'Line--unlocked': state !== LOCKED_STATE,
        })}
      />
    </LineContainer>
  );
}

export default Line;

const LineContainer = styled.div`
  height: 56px;
`;

const StyledLine = styled.div<StyledLineProps>`
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0) 51%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 210% 100%;
  background-position: right top;
  border: 1px solid white;
  height: 4px;
  position: absolute;
  opacity: 0.5;
  top: ${props => props.topY - 1}px;
  left: ${props => props.topX + 3}px;
  transform: rotate(90deg);
  transform-origin: 0 0;
  transition: opacity 0.6s;
  width: 56px;
`;
