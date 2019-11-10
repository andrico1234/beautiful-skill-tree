import React from 'react';
import { render } from '@testing-library/react';
import SkillEdge, { Props } from '../SkillEdge';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../theme';

const defaultProps: Props = {
  parentHasMultipleChildren: false,
  state: 'unlocked',
  direction: 'right',
  parentCenterPosition: 0,
  childCenterPosition: 0,
};

function renderComponent(props = defaultProps) {
  return render(
    <ThemeProvider theme={defaultTheme}>
      <SkillEdge {...props} />
    </ThemeProvider>
  );
}

describe('SkillEdge', () => {
  describe('straight lines', () => {
    it('should be inactive if the next node is unlocked', async () => {
      const { getByTestId } = renderComponent();

      const skillEdge = getByTestId('straight-line');

      expect(skillEdge).toHaveStyleRule('opacity', '1');
      expect(skillEdge).not.toHaveStyleRule(
        'background-position',
        'left bottom'
      );
    });

    it('should be inactive if the next node is locked', () => {
      const { getByTestId } = renderComponent();

      const skillEdge = getByTestId('straight-line');

      expect(skillEdge).toHaveStyleRule('opacity', '1');
      expect(skillEdge).not.toHaveStyleRule(
        'background-position',
        'left bottom'
      );
    });

    it('should be active if the next node is selected', () => {
      const props: Props = { ...defaultProps, state: 'selected' };

      const { getByTestId } = renderComponent(props);

      const skillEdge = getByTestId('straight-line');

      expect(skillEdge).toHaveStyleRule('opacity', '1');
      expect(skillEdge).toHaveStyleRule('background-position', 'left bottom');
    });
  });

  describe('angled lines', () => {
    const leftAngledLinePosition = {
      parentCenterPosition: 100,
      childCenterPosition: 100,
    };

    const rightAngledLinePosition = {
      parentCenterPosition: 100,
      childCenterPosition: 150,
    };

    it('should be inactive if the next node is unlocked', async () => {
      const props = {
        ...defaultProps,
        ...leftAngledLinePosition,
        parentHasMultipleChildren: true,
      };

      const { getByTestId } = renderComponent(props);

      const skillEdgeOne = getByTestId('upper-angled-line');
      const skillEdgeTwo = getByTestId('middle-angled-line');
      const skillEdgeThree = getByTestId('lower-angled-line');

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
      const props = {
        ...defaultProps,
        ...leftAngledLinePosition,
        parentHasMultipleChildren: true,
      };

      const { getByTestId } = renderComponent(props);

      const skillEdgeOne = getByTestId('upper-angled-line');
      const skillEdgeTwo = getByTestId('middle-angled-line');
      const skillEdgeThree = getByTestId('lower-angled-line');

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
      const props = {
        ...defaultProps,
        ...rightAngledLinePosition,
        parentHasMultipleChildren: true,
      };

      const { getByTestId } = renderComponent(props);

      const skillEdgeOne = getByTestId('upper-angled-line');
      const skillEdgeTwo = getByTestId('middle-angled-line');
      const skillEdgeThree = getByTestId('lower-angled-line');

      expect(skillEdgeOne).toHaveStyleRule('background-position', 'right top');
      expect(skillEdgeTwo).toHaveStyleRule('background-position', 'right top');
      expect(skillEdgeThree).toHaveStyleRule(
        'background-position',
        'right top'
      );
    });
  });
});
