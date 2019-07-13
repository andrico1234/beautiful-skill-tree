import React from 'react';
import { render, cleanup } from '@testing-library/react';
import SkillEdge from '../SkillEdge';
import { NodeState } from 'models';

const defaultPosition = {
  topX: 0,
  topY: 0,
  bottomX: 0,
  bottomY: 0,
};

function renderComponent(startingState: NodeState, position = defaultPosition) {
  let state = startingState;

  return render(<SkillEdge nodeState={state} position={position} />);
}

describe('SkillEdge', () => {
  afterEach(cleanup);

  describe('straight lines', () => {
    it('should be inactive if the next node is unlocked', async () => {
      const startingState = 'unlocked';

      const { getByTestId } = renderComponent(startingState);

      const skillEdge = getByTestId('straight-line');

      expect(skillEdge).not.toHaveClass('SkillEdge--active');
    });

    it('should be inactive if the next node is locked', () => {
      const startingState = 'unlocked';

      const { getByTestId } = renderComponent(startingState);

      const skillEdge = getByTestId('straight-line');

      expect(skillEdge).not.toHaveClass('SkillEdge--active');
    });

    it('should be active if the next node is selected', () => {
      const startingState = 'selected';

      const { getByTestId } = renderComponent(startingState);

      const skillEdge = getByTestId('straight-line');

      expect(skillEdge).toHaveClass('SkillEdge SkillEdge--active');
    });
  });

  describe('angled lines', () => {
    const leftAngledLinePosition = {
      topX: 100,
      topY: 100,
      bottomX: 50,
      bottomY: 150,
    };

    const rightAngledLinePosition = {
      topX: 100,
      topY: 100,
      bottomX: 150,
      bottomY: 150,
    };

    it('should be inactive if the next node is unlocked', async () => {
      const startingState = 'unlocked';

      const { getByTestId } = renderComponent(
        startingState,
        leftAngledLinePosition
      );

      const skillEdgeOne = getByTestId('angled-line-one');
      const skillEdgeTwo = getByTestId('angled-line-two');
      const skillEdgeThree = getByTestId('angled-line-three');

      expect(skillEdgeOne).not.toHaveClass('AngledLine__line-one--active');
      expect(skillEdgeTwo).not.toHaveClass('AngledLine__line-two--active');
      expect(skillEdgeThree).not.toHaveClass('AngledLine__line-three--active');
    });

    it('should be inactive if the next node is locked', () => {
      const startingState = 'unlocked';

      const { getByTestId } = renderComponent(
        startingState,
        leftAngledLinePosition
      );

      const skillEdgeOne = getByTestId('angled-line-one');
      const skillEdgeTwo = getByTestId('angled-line-two');
      const skillEdgeThree = getByTestId('angled-line-three');

      expect(skillEdgeOne).not.toHaveClass('AngledLine__line-one--active');
      expect(skillEdgeTwo).not.toHaveClass('AngledLine__line-two--active');
      expect(skillEdgeThree).not.toHaveClass('AngledLine__line-three--active');
    });

    it('should be active if the next node is selected', () => {
      const startingState = 'selected';

      const { getByTestId } = renderComponent(
        startingState,
        rightAngledLinePosition
      );

      const skillEdgeOne = getByTestId('angled-line-one');
      const skillEdgeTwo = getByTestId('angled-line-two');
      const skillEdgeThree = getByTestId('angled-line-three');

      expect(skillEdgeOne).toHaveClass('AngledLine__line-one--active');
      expect(skillEdgeTwo).toHaveClass('AngledLine__line-two--active');
      expect(skillEdgeThree).toHaveClass('AngledLine__line-three--active');
    });
  });
});
