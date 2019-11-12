import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Node from '../Node';

const mockClickHandler = jest.fn();

const mockSkillData = {
  id: '123',
  title: 'Mock Skill',
  tooltip: {
    content: '',
  },
  children: [],
};

function renderComponent() {
  return render(
    <Node
      handleClick={mockClickHandler}
      id="123"
      currentState="selected"
      skill={mockSkillData}
    />
  );
}

describe('Node component', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Accessibility', () => {
    it('can select the skill by using the enter key', () => {
      const { getByText } = renderComponent();

      fireEvent.keyDown(getByText('Mock Skill'), {
        keyCode: 13,
      });

      expect(mockClickHandler).toHaveBeenCalledTimes(1);
    });

    it("won't select the skill when a key other than 'enter' is pressed", () => {
      const { getByText } = renderComponent();

      fireEvent.keyDown(getByText('Mock Skill'), {
        keyCode: 14,
      });

      expect(mockClickHandler).toHaveBeenCalledTimes(0);
    });
  });
});
