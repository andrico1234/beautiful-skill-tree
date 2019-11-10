import React from 'react';
import styled, { BaseThemedCssFunction } from 'styled-components';
import { NodeState } from '../../models';
import { SELECTED_STATE, LOCKED_STATE } from '../../components/constants';

const keyframes = require('styled-components').keyframes;
const css: BaseThemedCssFunction<any> = require('styled-components').css;

type Direction = 'left' | 'right';

interface Props {
  direction: Direction;
  state: NodeState;
}

interface AngledLineProps {
  unlocked: boolean;
  selected: boolean;
}

interface AngledLineVerticalProps {
  direction: Direction;
}

function UpperAngledLine(props: Props) {
  const { direction, state } = props;

  return (
    <div style={{ height: '56px' }}>
      <AngledLineVerticalTop
        data-testid="angled-line-one"
        direction={direction}
        selected={state === SELECTED_STATE}
        unlocked={state !== LOCKED_STATE}
      />
    </div>
  );
}

export default UpperAngledLine;

const StyledAngledLine = styled.div<AngledLineProps>`
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 0) 51%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 210% 100%;
  background-position: right top;
  border: ${({ theme }) => theme.edgeBorder};
  height: 4px;
  position: absolute;
  opacity: 0.5;
  transition: opacity 0.6s;

  ${props =>
    props.unlocked &&
    `
      opacity: 1;
  `}
`;

const AngledLineVertical = styled(StyledAngledLine)`
  transform: rotate(90deg) translateY(-50%);
  transform-origin: 0 0;
`;

const AngledLineVerticalTop = styled(AngledLineVertical)<
  AngledLineVerticalProps
>`
  left: 50%;
  top: 0;
  width: 29px;

  ${props =>
    props.direction === 'right' &&
    `
      border-bottom-right-radius: 8px;
    `}

  ${props =>
    props.direction === 'left' &&
    `
      border-top-right-radius: 8px;
    `}

  ${props =>
    props.selected &&
    css`
      animation: ${slideDownAngledLineTop} 0.3s 1 ease-in;
      background-position: left bottom;
    `}
`;

const slideDownAngledLineTop = keyframes`
  from,
  33% {
    background-position: right top;
  }

  to {
    background-position: left bottom;
  }
`;
