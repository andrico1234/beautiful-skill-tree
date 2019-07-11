import React from 'react';
import { render, fireEvent, cleanup, act } from '@testing-library/react';
import SkillNode from '../SkillNode';
import { Skill } from '../../models';
import { legsPushData } from '../__mocks__/mockData';

function fireResize(width: number) {
  // @ts-ignore
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
}

function renderComponent(children: Skill[] = []) {
  return render(
    <SkillNode
      skill={{
        children,
        id: 'test-node',
        icon: './hey',
        title: 'Hey there',
        tooltipDescription: 'Description',
      }}
    />
  );
}

describe('SkillNode component', () => {
  afterEach(cleanup);

  it('should show and hide the tooltip on mouseenter and mouseleave', () => {
    const { getByTestId, queryByText } = renderComponent();

    const skillNode = getByTestId('test-node');

    fireEvent.mouseEnter(skillNode);

    expect(queryByText('Hey there')).toBeTruthy();
    expect(queryByText('Description')).toBeTruthy();

    fireEvent.mouseLeave(skillNode);

    expect(queryByText('Hey there')).toBeNull();
    expect(queryByText('Description')).toBeNull();
  });

  it('should still show and hide the tooltip when hovering over the tool tip', () => {
    const { getByTestId, queryByText } = renderComponent();

    const skillNode = getByTestId('test-node');

    fireEvent.mouseEnter(skillNode);

    expect(queryByText('Hey there')).toBeTruthy();
    expect(queryByText('Description')).toBeTruthy();

    const tooltipContainer = getByTestId('tooltip-container');

    fireEvent.mouseEnter(tooltipContainer);

    expect(queryByText('Hey there')).toBeTruthy();
    expect(queryByText('Description')).toBeTruthy();

    fireEvent.mouseLeave(tooltipContainer);

    expect(queryByText('Hey there')).toBeNull();
    expect(queryByText('Description')).toBeNull();
  });

  it('should handle resizing of the window correctly', () => {
    const resizeEvent = document.createEvent('Event');
    resizeEvent.initEvent('resize', true, true);

    renderComponent(legsPushData);

    // empty until i can work out how to attach the renderedComponnet to the DOM
    // otherwise getBoundingClientRect() always returns 0.
    act(() => {
      fireResize(400);
    });
  });
});
