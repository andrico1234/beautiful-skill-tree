import * as React from 'react';

interface Props {
  handleFilter: (query: string) => void;
}

function FilterInput(props: Props) {
  const { handleFilter } = props;
  return (
    <input
      style={{ height: '32px' }}
      onChange={e => handleFilter(e.target.value)}
      placeholder="Search for skill..."
    />
  );
}

export default FilterInput;
