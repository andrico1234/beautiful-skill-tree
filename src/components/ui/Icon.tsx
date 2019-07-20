import React from 'react';
import styled from 'styled-components';

export interface Props {
  containerWidth: number;
  src: string;
  title: string;
}

interface StyledIconProps {
  containerWidth: number;
}

const Icon = React.memo(function({ src, title, containerWidth }: Props) {
  return (
    <StyledIcon data-testid="icon-container" containerWidth={containerWidth}>
      <Image
        style={{ pointerEvents: 'none' }}
        src={src}
        alt={title}
        className="Icon"
      />
    </StyledIcon>
  );
});

export default Icon;

const StyledIcon = styled.div<StyledIconProps>`
  display: flex;
  height: ${props => props.containerWidth};
  width: ${props => props.containerWidth};
`;

const Image = styled.img`
  pointer-events: none;
`;
