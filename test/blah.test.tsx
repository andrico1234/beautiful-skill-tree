import React from 'react';
import { render } from '@testing-library/react';
import { Thing } from '../src';

function renderComponent() {
  return render(<Thing />);
}

describe('Index component', () => {
  it('should', () => {
    const { queryByText } = renderComponent();

    expect(
      queryByText('the snozzberries taste like snozzberries')
    ).toBeTruthy();
  });
});
