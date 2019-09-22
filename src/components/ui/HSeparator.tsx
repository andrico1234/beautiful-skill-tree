import * as React from 'react';
import styled from 'styled-components';

interface Props {
  display: boolean;
}

function HSeparator({ display }: Props) {
  return <Separator>{display && <hr data-testid="h-separator" />}</Separator>;
}

export default HSeparator;

const Separator = styled.div`
  height: 2px;

  hr {
    margin: 0;
  }
`;
