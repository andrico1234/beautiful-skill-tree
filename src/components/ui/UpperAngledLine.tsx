import React from 'react';
import styled, { BaseThemedCssFunction } from 'styled-components';
import { NodeState, Direction } from '../../models';
import { SELECTED_STATE, LOCKED_STATE } from '../../components/constants';
import { StyledAngledLine, AngledLineVerticalProps } from './AngledLine';

const keyframes = require('styled-components').keyframes;
const css: BaseThemedCssFunction<any> = require('styled-components').css;

interface Props {
  direction: Direction;
  state: NodeState;
}

function UpperAngledLine(props: Props) {
  const { direction, state } = props;

  return (
    <AngledLineVerticalTop
      data-testid="upper-angled-line"
      direction={direction}
      selected={state === SELECTED_STATE}
      unlocked={state !== LOCKED_STATE}
    />
  );
}

export default UpperAngledLine;

const AngledLineVerticalTop = styled(StyledAngledLine)<AngledLineVerticalProps>`
  transform: rotate(90deg) translateY(-50%);
  transform-origin: 0 0;
  left: 50%;
  top: -1px;
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
