import * as React from 'react';
import styled from 'styled-components';

type Props = {
  tooltipDescription: string;
  title: string;
};

const TooltipContent = React.memo(function({
  tooltipDescription,
  title,
}: Props) {
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <p>{tooltipDescription}</p>
    </React.Fragment>
  );
});

export default TooltipContent;

const Title = styled.h1`
  margin: 8px 0;
`;
