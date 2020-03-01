import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

interface VisibilityContainerProps {
  isVisible: boolean;
}

interface Props {
  isVisible: boolean;
  children: React.ReactNode;
}

function VisibilityContainer(props: Props) {
  const { isVisible, children } = props;
  const [hasBeenVisible, setHasBeenVisibleState] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setHasBeenVisibleState(true);
    }
  }, [isVisible, setHasBeenVisibleState]);

  if (!hasBeenVisible) return null;

  return (
    <StyledVisibilityContainer
      data-testid="visibility-container"
      isVisible={isVisible}
    >
      {children}
    </StyledVisibilityContainer>
  );
}

export default VisibilityContainer;

const StyledVisibilityContainer = styled.div<VisibilityContainerProps>`
  transition: transform 0.15s ease-out, opacity 0.15s ease-out,
    max-height 0.15s ease-out, visibility 0.15s ease-out;
  height: auto;
  max-height: 10000px;
  min-width: 304px;
  opacity: 1;
  overflow: hidden;
  visibility: visible;
  transform: scaleY(1);
  transform-origin: top;

  ${({ isVisible }) =>
    !isVisible &&
    css`
      transition: transform 0.15s ease-out, opacity 0.15s ease-out,
        max-height 0.15s ease-out, visibility 0.15s 0.15s ease-out;
      transform: scaleY(0);
      visibility: hidden;
      max-height: 0;
      width: 304px;
      opacity: 0;
    `}
`;
