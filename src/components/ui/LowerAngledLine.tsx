import React from 'react';
import { NodeState, Direction } from '../../models';
import { LOCKED_STATE, SELECTED_STATE } from '../../components/constants';
import styled, { BaseThemedCssFunction } from 'styled-components';
import { StyledAngledLine, AngledLineVerticalProps } from './AngledLine';
import { SkillTheme } from '../../theme';

const keyframes = require('styled-components').keyframes;
const css: BaseThemedCssFunction<SkillTheme> = require('styled-components').css;

interface Props {
  direction: Direction;
  state: NodeState;
}

function LowerAngledLine(props: Props) {
  const { state, direction } = props;

  return (
    <AngledLineVerticalBottom
      unlocked={state !== LOCKED_STATE}
      direction={direction}
      data-testid="lower-angled-line"
      selected={state === SELECTED_STATE}
    />
  );
}

export default LowerAngledLine;

const AngledLineVerticalBottom = styled(StyledAngledLine)<
  AngledLineVerticalProps
>`
  transform: rotate(90deg) translateY(-50%);
  transform-origin: 0 0;
  left: 50%;
  top: 24px;
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
