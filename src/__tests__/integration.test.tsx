import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SkillTreeGroup, SkillProvider, SkillTree, SkillType } from '../index';
import defaultTheme, { SkillTheme } from '../theme';
import mockTheme from '../__mocks__/mockTheme';

const simpleData: SkillType[] = [
  {
    id: 'html',
    title: 'html',
    tooltipDescription: 'the method of structuring websites',
    icon: '../',
    children: [
      {
        id: 'css',
        title: 'css',
        tooltipDescription: 'how to affect the appearance of a website',
        children: [
          {
            id: 'javascript-basics',
            title: 'javascript basics',
            tooltipDescription: 'adding interactivity',
            children: [],
          },
        ],
      },
    ],
  },
];

const complexData: SkillType[] = [
  {
    id: 'languages',
    title: 'languages',
    tooltipDescription:
      'used as the building blocks for creating amazing projects',
    icon: '../',
    children: [
      {
        id: 'python',
        title: 'python',
        tooltipDescription: 'language one',
        children: [],
      },
      {
        id: 'javascript',
        title: 'javascript',
        tooltipDescription: 'language one',
        children: [
          {
            id: 'typescript',
            title: 'typescript',
            tooltipDescription: 'language one',
            children: [],
          },
          {
            id: 'nodejs',
            title: 'nodejs',
            tooltipDescription: 'language one',
            children: [],
          },
        ],
      },
      {
        id: 'golang',
        title: 'golang',
        tooltipDescription: 'language one',
        children: [],
      },
    ],
  },
  {
    id: 'paradigms',
    title: 'OOP',
    tooltipDescription: 'for objects',
    children: [],
  },
];

function renderComponent(
  renderComplexTree = false,
  theme: Partial<SkillTheme> = defaultTheme
) {
  const skillTreeTheme = { ...defaultTheme, ...theme };

  return render(
    <SkillProvider>
      <SkillTreeGroup theme={skillTreeTheme}>
        {({ skillCount, selectedSkillCount, resetSkills }) => {
          return (
            <React.Fragment>
              <h2 className="Example__heading">
                Completed skills:{' '}
                <span data-testid="selected-count">{selectedSkillCount}</span>/
                <span data-testid="total-count">{skillCount}</span>
                <button data-testid="reset-button" onClick={resetSkills}>
                  Reset
                </button>
              </h2>
              <SkillTree treeId="fe" title="Frontend" data={simpleData} />
              <SkillTree
                treeId="be"
                title="Backend"
                data={renderComplexTree ? complexData : []}
              />
            </React.Fragment>
          );
        }}
      </SkillTreeGroup>
    </SkillProvider>
  );
}

describe('SkillTreeGroup component', () => {
  describe('simple data structure', () => {
    it('should render a simple tree', () => {
      const { queryByText, getByTestId } = renderComponent();

      expect(queryByText('Frontend')).toBeTruthy();
      expect(queryByText('Backend')).toBeTruthy();

      expect(getByTestId('selected-count')).toHaveTextContent('0');
      expect(getByTestId('total-count')).toHaveTextContent('3');

      expect(getByTestId('html')).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );
      expect(getByTestId('css')).toHaveStyleRule('opacity', '0.65');
      expect(getByTestId('javascript-basics')).toHaveStyleRule(
        'opacity',
        '0.65'
      );
    });

    it('should handle sequential clicking of the nodes', () => {
      const { getByTestId } = renderComponent();

      const htmlNode = getByTestId('html');
      const cssNode = getByTestId('css');
      const jsNode = getByTestId('javascript-basics');

      expect(htmlNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );
      expect(cssNode).toHaveStyleRule('opacity', '0.65');
      expect(jsNode).toHaveStyleRule('opacity', '0.65');

      fireEvent.click(htmlNode);

      expect(htmlNode).toHaveStyleRule('background', /linear-gradient/);
      expect(cssNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );
      expect(jsNode).toHaveStyleRule('opacity', '0.65');

      fireEvent.click(cssNode);

      expect(htmlNode).toHaveStyleRule('background', /linear-gradient/);
      expect(cssNode).toHaveStyleRule('background', /linear-gradient/);
      expect(jsNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );

      fireEvent.click(jsNode);

      expect(htmlNode).toHaveStyleRule('background', /linear-gradient/);
      expect(cssNode).toHaveStyleRule('background', /linear-gradient/);
      expect(jsNode).toHaveStyleRule('background', /linear-gradient/);

      fireEvent.click(jsNode);

      expect(htmlNode).toHaveStyleRule('background', /linear-gradient/);
      expect(cssNode).toHaveStyleRule('background', /linear-gradient/);
      expect(jsNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );

      fireEvent.click(cssNode);

      expect(htmlNode).toHaveStyleRule('background', /linear-gradient/);
      expect(cssNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );
      expect(jsNode).toHaveStyleRule('opacity', '0.65');

      fireEvent.click(htmlNode);

      expect(htmlNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );
      expect(cssNode).toHaveStyleRule('opacity', '0.65');
      expect(jsNode).toHaveStyleRule('opacity', '0.65');
    });

    it('should deselect all child nodes when then parent is deselected', () => {
      const { getByTestId } = renderComponent();

      const htmlNode = getByTestId('html');
      const cssNode = getByTestId('css');
      const jsNode = getByTestId('javascript-basics');

      expect(htmlNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );
      expect(cssNode).toHaveStyleRule('opacity', '0.65');
      expect(jsNode).toHaveStyleRule('opacity', '0.65');

      fireEvent.click(htmlNode);

      expect(htmlNode).toHaveStyleRule('background', /linear-gradient/);
      expect(cssNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );
      expect(jsNode).toHaveStyleRule('opacity', '0.65');

      fireEvent.click(cssNode);

      expect(htmlNode).toHaveStyleRule('background', /linear-gradient/);
      expect(cssNode).toHaveStyleRule('background', /linear-gradient/);
      expect(jsNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );

      fireEvent.click(htmlNode);

      expect(htmlNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );
      expect(cssNode).toHaveStyleRule('opacity', '0.65');
      expect(jsNode).toHaveStyleRule('opacity', '0.65');
    });

    it('should display the correct counter on sequential node selection ', () => {
      const { getByTestId } = renderComponent();

      const htmlNode = getByTestId('html');
      const cssNode = getByTestId('css');

      const selectedCount = getByTestId('selected-count');
      const totalCount = getByTestId('total-count');

      expect(selectedCount).toHaveTextContent('0');
      expect(totalCount).toHaveTextContent('3');

      fireEvent.click(htmlNode);

      expect(selectedCount).toHaveTextContent('1');
      expect(totalCount).toHaveTextContent('3');

      fireEvent.click(cssNode);

      expect(selectedCount).toHaveTextContent('2');
      expect(totalCount).toHaveTextContent('3');

      fireEvent.click(cssNode);

      expect(selectedCount).toHaveTextContent('1');
      expect(totalCount).toHaveTextContent('3');
    });

    it('should not select a locked node', () => {
      const { getByTestId } = renderComponent();

      const jsNode = getByTestId('javascript-basics');
      const selectedCount = getByTestId('selected-count');

      expect(selectedCount).toHaveTextContent('0');

      expect(jsNode).toHaveStyleRule('opacity', '0.65');

      fireEvent.click(jsNode);

      expect(selectedCount).toHaveTextContent('0');
      expect(jsNode).toHaveStyleRule('opacity', '0.65');
    });

    it('should reset the counter when the top node is selected', () => {
      const { getByTestId } = renderComponent();

      const htmlNode = getByTestId('html');
      const cssNode = getByTestId('css');
      const jsNode = getByTestId('javascript-basics');

      const selectedCount = getByTestId('selected-count');

      expect(selectedCount).toHaveTextContent('0');

      fireEvent.click(htmlNode);
      fireEvent.click(cssNode);
      fireEvent.click(jsNode);

      expect(selectedCount).toHaveTextContent('3');

      fireEvent.click(htmlNode);

      expect(selectedCount).toHaveTextContent('0');
    });

    it('should reset the counter and the nodes when the reset button is clicked', () => {
      const { getByTestId } = renderComponent();

      const htmlNode = getByTestId('html');
      const cssNode = getByTestId('css');
      const jsNode = getByTestId('javascript-basics');

      const selectedCount = getByTestId('selected-count');
      const resetButton = getByTestId('reset-button');

      expect(selectedCount).toHaveTextContent('0');

      fireEvent.click(htmlNode);
      fireEvent.click(cssNode);
      fireEvent.click(jsNode);

      expect(selectedCount).toHaveTextContent('3');

      fireEvent.click(resetButton);

      expect(selectedCount).toHaveTextContent('0');

      expect(htmlNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );
      expect(cssNode).toHaveStyleRule('opacity', '0.65');
      expect(jsNode).toHaveStyleRule('opacity', '0.65');
    });
  });

  describe('complex data structure', () => {
    it('should render a complex tree', () => {
      const { queryByText, getByTestId } = renderComponent(true);

      expect(queryByText('Frontend')).toBeTruthy();
      expect(queryByText('Backend')).toBeTruthy();

      expect(getByTestId('selected-count')).toHaveTextContent('0');
      expect(getByTestId('total-count')).toHaveTextContent('10');

      expect(getByTestId('languages')).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );
      expect(getByTestId('python')).toHaveStyleRule('opacity', '0.65');
      expect(getByTestId('javascript')).toHaveStyleRule('opacity', '0.65');
      expect(getByTestId('nodejs')).toHaveStyleRule('opacity', '0.65');
      expect(getByTestId('typescript')).toHaveStyleRule('opacity', '0.65');
      expect(getByTestId('golang')).toHaveStyleRule('opacity', '0.65');
    });

    it('should display the correct states of branched nodes', () => {
      const { getByTestId } = renderComponent(true);

      expect(getByTestId('selected-count')).toHaveTextContent('0');

      const languageNode = getByTestId('languages');
      const jsNode = getByTestId('javascript');
      const tsNode = getByTestId('typescript');
      const nodeNode = getByTestId('nodejs');

      fireEvent.click(languageNode);

      expect(jsNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );
      expect(tsNode).toHaveStyleRule('opacity', '0.65');
      expect(nodeNode).toHaveStyleRule('opacity', '0.65');

      fireEvent.click(jsNode);

      expect(jsNode).toHaveStyleRule('background', /linear-gradient/);
      expect(tsNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );
      expect(nodeNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );

      fireEvent.click(tsNode);

      expect(jsNode).toHaveStyleRule('background', /linear-gradient/);
      expect(tsNode).toHaveStyleRule('background', /linear-gradient/);
      expect(nodeNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );

      fireEvent.click(jsNode);

      expect(jsNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );
      expect(tsNode).toHaveStyleRule('opacity', '0.65');
      expect(nodeNode).toHaveStyleRule('opacity', '0.65');
    });
  });

  describe('custom themes', () => {
    it('should change the appearance of the components', () => {
      const { getByTestId } = renderComponent(false, mockTheme);
      const htmlNode = getByTestId('html');

      expect(htmlNode).toHaveStyleRule('background', 'grey');
    });
  });
});
