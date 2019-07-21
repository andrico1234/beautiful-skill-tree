import React from 'react';
import { render } from '@testing-library/react';
import Icon, { Props } from '../Icon';

function renderComponent(props: Props) {
  return render(
    <Icon
      src={props.src}
      title={props.title}
      containerWidth={props.containerWidth}
    />
  );
}

describe('Icon component', () => {
  it('should render the correct icon', () => {
    const { queryByAltText, getByTestId } = renderComponent({
      src: './',
      title: 'test icon.',
      containerWidth: 20,
    });

    expect(queryByAltText('test icon.')).toBeTruthy();
    expect(getByTestId('icon-container')).toHaveStyleRule('width', '20px');
  });
});
