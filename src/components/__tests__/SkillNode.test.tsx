import React from 'react';
import { render, cleanup, act, fireEvent } from '@testing-library/react';
import SkillNode from '../SkillNode';
import { NodeState } from 'models';

const setNodeStateMock = jest.fn();

function fireResize(width: number) {
  // @ts-ignore
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
}

function renderComponent(nodeState: NodeState = 'locked') {
  return render(
    <SkillNode
      parentState="unlocked"
      setNodeState={setNodeStateMock}
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

  describe('supports full keyboard navigation', () => {
    test.todo('moves to the parent when the up arrow key is pressed');
    test.todo(
      'moves to its rightward sibling when the right arrow key is pressed'
    );
    test.todo(
      'moves to its _leftward sibling when the _left arrow key is pressed'
    );
    test.todo('moves to a child node when the down arrow key is pressed');
    test.todo('moves to the original child when down is pressed after up');
    test.todo(
      'becomes selected when enter is pressed and it has focus is in unlocked state'
    );
    test.todo(
      'becomes unlocked when enter is pressed and it has focus is in selected state'
    );
    test.todo('moves to the next node when tab is pressed');
  });

  it('should successfully render the skill node', () => {
    const { getByTestId } = renderComponent();

    expect(getByTestId('skill-node-overlay')).toHaveClass('SkillNode__overlay');
  });

  it('should not invoke the click handler update when the Node is click whenlocked', () => {
    const { getByTestId } = renderComponent();

    const node = getByTestId('test-node');

    expect(node).toHaveClass('Node Node--locked');

    expect(setNodeStateMock).toHaveBeenCalledTimes(3);

    fireEvent.click(node);

    expect(setNodeStateMock).toHaveBeenCalledTimes(3);
  });

  it('should handle the state update correctly when the Node is clicked', () => {
    const { getByTestId } = renderComponent('unlocked');

    const node = getByTestId('test-node');

    expect(node).toHaveClass('Node Node--unlocked');

    expect(setNodeStateMock).toHaveBeenCalledTimes(2);

    fireEvent.click(node);

    expect(setNodeStateMock).toHaveBeenCalledTimes(3);
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
