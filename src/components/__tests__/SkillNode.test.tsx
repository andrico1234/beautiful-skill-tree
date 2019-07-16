import React from 'react';
import { render, cleanup, act, fireEvent } from '@testing-library/react';
import SkillNode from '../SkillNode';
import { NodeState } from 'models';

function fireResize(width: number) {
  // @ts-ignore
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
}

function renderComponent(nodeState: NodeState = 'locked') {
  return render(
    <SkillNode
      parentState="unlocked"
      nodeState={nodeState}
      skill={{
        children: [],
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

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should successfully render the skill node', () => {
    const { getByTestId } = renderComponent();

    expect(getByTestId('skill-node-overlay')).toHaveClass('SkillNode__overlay');
  });

  it("should not change the state of the node when clicked while it's parent is lockaed", () => {
    const { getByTestId } = renderComponent();

    const node = getByTestId('test-node');

    expect(node).toHaveClass('Node Node--locked');

    fireEvent.click(node);

    expect(node).toHaveClass('Node Node--locked');
  });

  it('should handle resizing of the window correctly', () => {
    const resizeEvent = document.createEvent('Event');
    resizeEvent.initEvent('resize', true, true);

    renderComponent();

    // empty until i can work out how to attach the renderedComponnet to the DOM
    // otherwise getBoundingClientRect() always returns 0.
    act(() => {
      fireResize(400);
    });
  });
});
