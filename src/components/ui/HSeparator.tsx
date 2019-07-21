import * as React from 'react';
import styled from 'styled-components';

function HSeparator() {
  return <Hr data-testid="h-separator" />;
}

export default HSeparator;

const Hr = styled.hr`
  width: 100%;
`;
