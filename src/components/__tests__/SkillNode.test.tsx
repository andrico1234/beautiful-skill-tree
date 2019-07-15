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

  test.todo('starts off unlocked if it has no parent');
  test.todo('starts off unlocked if its parent is selected');
  test.todo('starts off locked if none of its parents is selected');
  test.todo('gets set to locked if none of its parents becomes selected');
  test.todo('gets set to unlocked if one of its parents becomes selected');

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
