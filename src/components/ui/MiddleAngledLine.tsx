import React from 'react';
import styled, { BaseThemedCssFunction } from 'styled-components';
import { NodeState, Direction } from '../../models';
import { SELECTED_STATE, LOCKED_STATE } from '../../components/constants';
import { StyledAngledLine, AngledLineHoriztonalProps } from './AngledLine';
import { SkillTheme } from '../../theme';

const keyframes = require('styled-components').keyframes;
const css: BaseThemedCssFunction<SkillTheme> = require('styled-components').css;

interface Props {
  parentCenterPosition: number;
  childCenterPosition: number;
  direction: Direction;
  state: NodeState;
}

function MiddleAngledLine(props: Props) {
  const { direction, parentCenterPosition, childCenterPosition, state } = props;

  const width =
    direction === 'left'
      ? parentCenterPosition - childCenterPosition - 6
      : childCenterPosition - parentCenterPosition - 6;

  return (
    <AngledLineHoriztonal
      data-testid="middle-angled-line"
      direction={direction}
      unlocked={state !== LOCKED_STATE}
      selected={state === SELECTED_STATE}
      width={width}
    />
  );
}

export default MiddleAngledLine;

const AngledLineHoriztonal = styled(StyledAngledLine)<
  AngledLineHoriztonalProps
>`
  border-left: none;
  border-right: none;
  top: 24px;
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
