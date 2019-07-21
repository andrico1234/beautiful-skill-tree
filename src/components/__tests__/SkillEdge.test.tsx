import React from 'react';
import { render } from '@testing-library/react';
import SkillEdge from '../SkillEdge';
import { NodeState } from 'models';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../theme';

const defaultPosition = {
  topX: 0,
  topY: 0,
  bottomX: 0,
};

function renderComponent(startingState: NodeState, position = defaultPosition) {
  let state = startingState;
  const { topX, topY, bottomX } = position;

  return render(
    <ThemeProvider theme={defaultTheme}>
      <SkillEdge nodeState={state} topX={topX} topY={topY} bottomX={bottomX} />
    </ThemeProvider>
  );
}

describe('SkillEdge', () => {
  describe('straight lines', () => {
    it('should be inactive if the next node is unlocked', async () => {
      const startingState = 'unlocked';

      const { getByTestId } = renderComponent(startingState);

      const skillEdge = getByTestId('straight-line');

      expect(skillEdge).toHaveStyleRule('opacity', '1');
      expect(skillEdge).not.toHaveStyleRule(
        'background-position',
        'left bottom'
      );
    });

    it('should be inactive if the next node is locked', () => {
      const startingState = 'unlocked';

      const { getByTestId } = renderComponent(startingState);

      const skillEdge = getByTestId('straight-line');

      expect(skillEdge).toHaveStyleRule('opacity', '1');
      expect(skillEdge).not.toHaveStyleRule(
        'background-position',
        'left bottom'
      );
    });

    it('should be active if the next node is selected', () => {
      const startingState = 'selected';

      const { getByTestId } = renderComponent(startingState);

      const skillEdge = getByTestId('straight-line');

      expect(skillEdge).toHaveStyleRule('opacity', '1');
      expect(skillEdge).toHaveStyleRule('background-position', 'left bottom');
    });
  });

  describe('angled lines', () => {
    const leftAngledLinePosition = {
      topX: 100,
      topY: 100,
      bottomX: 50,
    };

    const rightAngledLinePosition = {
      topX: 100,
      topY: 100,
      bottomX: 150,
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

      expect(skillEdgeOne).toHaveStyleRule('opacity', '1');
      expect(skillEdgeOne).not.toHaveStyleRule(
        'background-position',
        'left bottom'
      );

      expect(skillEdgeTwo).toHaveStyleRule('opacity', '1');
      expect(skillEdgeTwo).not.toHaveStyleRule(
        'background-position',
        'left bottom'
      );

      expect(skillEdgeThree).toHaveStyleRule('opacity', '1');
      expect(skillEdgeThree).not.toHaveStyleRule(
        'background-position',
        'left bottom'
      );
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

      expect(skillEdgeOne).not.toHaveStyleRule(
        'background-position',
        'left bottom'
      );
      expect(skillEdgeTwo).not.toHaveStyleRule(
        'background-position',
        'left bottom'
      );
      expect(skillEdgeThree).not.toHaveStyleRule(
        'background-position',
        'left bottom'
      );
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

      expect(skillEdgeOne).toHaveStyleRule(
        'background-position',
        'left bottom'
      );
      expect(skillEdgeTwo).toHaveStyleRule(
        'background-position',
        'left bottom'
      );
      expect(skillEdgeThree).toHaveStyleRule(
        'background-position',
        'left bottom'
      );
    });
  });
});
