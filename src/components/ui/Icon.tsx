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
      <Image src={src} alt={title} />
    </StyledIcon>
  );
});

export default Icon;

const StyledIcon = styled.div.attrs<StyledIconProps>(props => ({
  style: {
    height: `${props.containerWidth}px`,
    width: `${props.containerWidth}px`,
  },
}))<StyledIconProps>`
  display: flex;
`;

const Image = styled.img`
  pointer-events: none;
  height: 75%;
  margin: auto;
  width: 75%;
`;
