import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { NodeState } from '../../models';
import { SELECTED_STATE, LOCKED_STATE } from '../../components/constants';

interface Props {
  topX: number;
  topY: number;
  bottomX: number;
  direction: 'left' | 'right';
  state: NodeState;
}

function AngledLine({ topX, topY, bottomX, direction, state }: Props) {
  // no one:
  // css:
  const leftHorizontalStyles = {
    left: `${topX - 3}px`,
    transform: 'scaleX(-1)',
    transformOrigin: '0 0',
    top: `${topY + 24}px`,
    width: `${topX - bottomX - 6}px`,
  };

  const rightHorizontalStyles = {
    left: `${topX + 3}px`,
    top: `${topY + 24}px`,
    width: `${bottomX - topX - 6}px`,
  };

  return (
    <AngledLineContainer>
      <AngledLineVertical
        data-testid="angled-line-one"
        className={classnames({
          'AngledLine--rounded-bottom-right': direction === 'right',
          'AngledLine--rounded-top-right': direction === 'left',
          'AngledLine__line-one--selected': state === SELECTED_STATE,
          'AngledLine--unlocked': state !== LOCKED_STATE,
        })}
        style={{
          top: `${topY - 1}px`,
          left: `${topX + 3}px`,
          width: '29px',
        }}
      />
      <AngledLineHoriztonal
        data-testid="angled-line-two"
        className={classnames({
          'AngledLine__line-two--selected': state === SELECTED_STATE,
          'AngledLine--unlocked': state !== LOCKED_STATE,
        })}
        style={
          direction === 'left' ? leftHorizontalStyles : rightHorizontalStyles
        }
      />
      <AngledLineVertical
        data-testid="angled-line-three"
        className={classnames({
          'AngledLine--rounded-top-left': direction === 'right',
          'AngledLine--rounded-bottom-left': direction === 'left',
          'AngledLine__line-three--selected': state === SELECTED_STATE,
          'AngledLine--unlocked': state !== LOCKED_STATE,
        })}
        style={{
          top: `${topY + 24}px`,
          left: `${bottomX + 3}px`,
          width: '31px',
        }}
      />
    </AngledLineContainer>
  );
}

export default AngledLine;

const AngledLineContainer = styled.div`
  height: 56px;
`;

const StyledAngledLine = styled.div`
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
  transition: opacity 0.6s;
`;

const AngledLineVertical = styled(StyledAngledLine)`
  transform: rotate(90deg);
  transform-origin: 0 0;
`;

const AngledLineHoriztonal = styled(StyledAngledLine)`
  border-left: none;
  border-right: none;
`;
