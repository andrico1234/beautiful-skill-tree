import React from 'react';
import styled, { BaseThemedCssFunction } from 'styled-components';
import { NodeState } from '../../models';
import { SELECTED_STATE, LOCKED_STATE } from '../../components/constants';

const keyframes = require('styled-components').keyframes;
const css: BaseThemedCssFunction<any> = require('styled-components').css;

type Direction = 'left' | 'right';

interface Props {
  parentCenterPosition: number;
  childCenterPosition: number;
  direction: Direction;
  state: NodeState;
}

interface AngledLineProps {
  unlocked: boolean;
  selected: boolean;
}

interface AngledLineHoriztonalProps {
  direction: Direction;
  width: number;
}

function MiddleAngledLine(props: Props) {
  const { direction, parentCenterPosition, childCenterPosition, state } = props;

  const width =
    direction === 'left'
      ? parentCenterPosition - childCenterPosition - 6
      : childCenterPosition - parentCenterPosition - 6;

  return (
    <AngledLineHoriztonal
      data-testid="angled-line-two"
      direction={direction}
      unlocked={state !== LOCKED_STATE}
      selected={state === SELECTED_STATE}
      width={width}
    />
  );
}

export default MiddleAngledLine;

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

const AngledLineHoriztonal = styled(StyledAngledLine)<
  AngledLineHoriztonalProps
>`
  border-left: none;
  border-right: none;
  top: -32px;
  left: 50%;
  width: ${props => props.width}px;

  ${props =>
    props.direction === 'left' &&
    `
      transform: translateX(3px) scale(-1);
  `}
  ${props =>
    props.direction === 'right' &&
    `
      transform: translateX(-105%);
      transform-origin: 0 0;
  `}

  ${props =>
    props.selected &&
    css`
      animation: ${slideDownAngledLineMiddle} 1s 1;
      background-position: left bottom;
    `}
`;

const slideDownAngledLineMiddle = keyframes`
  from,
  30% {
    background-position: right top;
  }

  to {
    background-position: left bottom;
  }
`;
