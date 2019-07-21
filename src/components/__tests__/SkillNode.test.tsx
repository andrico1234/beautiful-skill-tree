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

    expect(getByTestId('skill-node-overlay')).toHaveStyleRule(
      'background-color',
      'white'
    );
  });

  it("should not change the state of the node when clicked while it's parent is lockaed", () => {
    const { getByTestId } = renderComponent();

    const node = getByTestId('test-node');

    expect(node).toHaveStyleRule('opacity', '0.65');

    fireEvent.click(node);

    expect(node).toHaveStyleRule('opacity', '0.65');
  });

  it('should handle resizing of the window correctly', () => {
    // @ts-ignore
    window.innerWidth = 200;

    renderComponent();

    // check that hr exists
  });
});
