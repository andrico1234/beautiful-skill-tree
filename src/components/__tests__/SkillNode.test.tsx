import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SkillNode from '../SkillNode';
import { NodeState } from 'models';

function renderComponent(nodeState: NodeState = 'locked') {
  return render(
    <SkillNode
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
    // @ts-ignore
    window.innerWidth = 200;

    renderComponent();

    // check that hr exists
  });
});
