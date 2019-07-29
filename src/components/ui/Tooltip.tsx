import * as React from 'react';
import styled from 'styled-components';

type Props = {
  content: React.ReactNode;
  title: string;
};

const Tooltip = React.memo(function({ content, title }: Props) {
  return (
    <React.Fragment>
      <Title>{title}</Title>
      <ContentContainer>{content}</ContentContainer>
    </React.Fragment>
  );
});

export default Tooltip;

const Title = styled.h1`
  margin: 8px 0;
`;

const ContentContainer = styled.div`
  margin: 8px 0;
`;
