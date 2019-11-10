import React from 'react';
import { NodeState } from '../../models';
import { LOCKED_STATE, SELECTED_STATE } from '../../components/constants';
import styled, { BaseThemedCssFunction } from 'styled-components';

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

function LowerAngledLine(props: Props) {
  const { state, direction } = props;

  return (
    <AngledLineVerticalBottom
      unlocked={state !== LOCKED_STATE}
      direction={direction}
      data-testid="angled-line-three"
      selected={state === SELECTED_STATE}
    />
  );
}

export default LowerAngledLine;

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

const AngledLineVerticalBottom = styled(AngledLineVertical)<
  AngledLineVerticalProps
>`
  left: 50%;
  top: -32px;
  width: 31px;

  ${props =>
    props.direction === 'right' &&
    `
        border-top-left-radius: 8px;
      `}

  ${props =>
    props.direction === 'left' &&
    `
      border-bottom-left-radius: 8px;
    `}

    ${props =>
      props.selected &&
      css`
        animation: ${slideDownAngledLineBottom} 1.2s 1 ease-out;
        background-position: left bottom;
      `}
`;

const slideDownAngledLineBottom = keyframes`
  from,
  70% {
    background-position: right top;
  }

  to {
    background-position: left bottom;
  }
`;
