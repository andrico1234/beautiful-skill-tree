import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Tooltip from '../Tooltip';
import helpers from '../../../helpers';

jest.mock('../../../helpers', () => ({
  getIsElementInWindow: jest.fn(),
}));

function renderComponent() {
  return render(
    <Tooltip handleMouseEnter={() => null} handleMouseLeave={() => null} />
  );
}

describe('Tooltip component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(cleanup);

  it('should render the placeholder text if none is provider', () => {
    const { queryByText } = renderComponent();

    expect(queryByText('Title')).toBeTruthy();
    expect(queryByText('Some information')).toBeTruthy();
  });

  it('should render the tooltip at normal height if contained within the window', () => {
    const spy = jest.spyOn(helpers, 'getIsElementInWindow');
    spy.mockReturnValueOnce(false);

    const { getByTestId } = renderComponent();

    const tooltipContainer = getByTestId('tooltip-container');

    expect(tooltipContainer).toHaveClass(
      'Tooltip__hover-container--outside-window'
    );
  });

  it('should render the tooltip at adjusted height if contained outside of the window', () => {
    const spy = jest.spyOn(helpers, 'getIsElementInWindow');
    spy.mockReturnValueOnce(true);

    const { getByTestId } = renderComponent();

    const tooltipContainer = getByTestId('tooltip-container');

    expect(tooltipContainer).not.toHaveClass(
      'Tooltip__hover-container--outside-window'
    );
  });
});
