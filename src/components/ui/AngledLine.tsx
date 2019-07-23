import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { NodeState } from '../../models';
import { SELECTED_STATE, LOCKED_STATE } from '../../components/constants';

type direction = 'left' | 'right';

interface Props {
  topX: number;
  topY: number;
  bottomX: number;
  direction: 'left' | 'right';
  state: NodeState;
}

interface AngledLineProps {
  unlocked: boolean;
  selected: boolean;
}

interface AngledLineVerticalProps {
  top: number;
  left: number;
  direction: direction;
}

interface AngledLineHoriztonalProps {
  direction: direction;
  top: number;
  left: number;
  width: number;
}

function AngledLine({ topX, topY, bottomX, direction, state }: Props) {
  return (
    <AngledLineContainer>
      <AngledLineVerticalTop
        data-testid="angled-line-one"
        top={topY - 1}
        left={topX + 3}
        direction={direction}
        selected={state === SELECTED_STATE}
        unlocked={state !== LOCKED_STATE}
      />
      <AngledLineHoriztonal
        data-testid="angled-line-two"
        top={topY + 24}
        direction={direction}
        unlocked={state !== LOCKED_STATE}
        selected={state === SELECTED_STATE}
        left={direction === 'left' ? topX - 3 : topX + 3}
        width={direction === 'left' ? topX - bottomX - 6 : bottomX - topX - 6}
      />
      <AngledLineVerticalBottom
        unlocked={state !== LOCKED_STATE}
        top={topY + 24}
        left={bottomX + 3}
        direction={direction}
        data-testid="angled-line-three"
        selected={state === SELECTED_STATE}
      />
    </AngledLineContainer>
  );
}

export default AngledLine;

const AngledLineContainer = styled.div`
  height: 56px;
`;

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
  transform: rotate(90deg);
  transform-origin: 0 0;
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

const AngledLineVerticalTop = styled(AngledLineVertical)<
  AngledLineVerticalProps
>`
  left: ${props => props.left}px;
  top: ${props => props.top}px;
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

const slideDownAngledLineMiddle = keyframes`
  from,
  30% {
    background-position: right top;
  }

  to {
    background-position: left bottom;
  }
`;

const AngledLineHoriztonal = styled(StyledAngledLine)<
  AngledLineHoriztonalProps
>`
  border-left: none;
  border-right: none;
  left: ${props => props.left}px;
  top: ${props => props.top}px;
  width: ${props => props.width}px;

  ${props =>
    props.direction === 'left' &&
    `
      transform: scaleX(-1);
      transform-origin: 0 0;
  `}

  ${props =>
    props.selected &&
    css`
      animation: ${slideDownAngledLineMiddle} 1s 1;
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

const AngledLineVerticalBottom = styled(AngledLineVertical)<
  AngledLineVerticalProps
>`
  left: ${props => props.left}px;
  top: ${props => props.top}px;
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
