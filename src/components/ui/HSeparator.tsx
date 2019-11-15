import * as React from 'react';

interface Props {
  display: boolean;
}

function HSeparator({ display }: Props) {
  return (
    <div style={{ height: '2px' }}>
      {display && <hr style={{ margin: 0 }} data-testid="h-separator" />}
    </div>
  );
}

export default HSeparator;
