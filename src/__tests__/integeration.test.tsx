import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SkillTreeGroup, SkillProvider, SkillTree, SkillType } from '../index';

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

function renderComponent(renderComplexTree = false) {
  return render(
    <SkillProvider>
      <SkillTreeGroup>
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

      expect(getByTestId('html')).toHaveClass('Node Node--unlocked');
      expect(getByTestId('css')).toHaveClass('Node Node--locked');
      expect(getByTestId('javascript-basics')).toHaveClass('Node Node--locked');
    });

    it('should handle sequential clicking of the nodes', () => {
      const { getByTestId } = renderComponent();

      const htmlNode = getByTestId('html');
      const cssNode = getByTestId('css');
      const jsNode = getByTestId('javascript-basics');

      expect(htmlNode).toHaveClass('Node Node--unlocked');
      expect(cssNode).toHaveClass('Node Node--locked');
      expect(jsNode).toHaveClass('Node Node--locked');

      fireEvent.click(htmlNode);

      expect(htmlNode).toHaveClass('Node Node--selected');
      expect(cssNode).toHaveClass('Node Node--unlocked');
      expect(jsNode).toHaveClass('Node Node--locked');

      fireEvent.click(cssNode);

      expect(htmlNode).toHaveClass('Node Node--selected');
      expect(cssNode).toHaveClass('Node Node--selected');
      expect(jsNode).toHaveClass('Node Node--unlocked');

      fireEvent.click(jsNode);

      expect(htmlNode).toHaveClass('Node Node--selected');
      expect(cssNode).toHaveClass('Node Node--selected');
      expect(jsNode).toHaveClass('Node Node--selected');

      fireEvent.click(jsNode);

      expect(htmlNode).toHaveClass('Node Node--selected');
      expect(cssNode).toHaveClass('Node Node--selected');
      expect(jsNode).toHaveClass('Node Node--unlocked');

      fireEvent.click(cssNode);

      expect(htmlNode).toHaveClass('Node Node--selected');
      expect(cssNode).toHaveClass('Node Node--unlocked');
      expect(jsNode).toHaveClass('Node Node--locked');

      fireEvent.click(htmlNode);

      expect(htmlNode).toHaveClass('Node Node--unlocked');
      expect(cssNode).toHaveClass('Node Node--locked');
      expect(jsNode).toHaveClass('Node Node--locked');
    });

    it('should deselect all child nodes when then parent is deselected', () => {
      const { getByTestId } = renderComponent();

      const htmlNode = getByTestId('html');
      const cssNode = getByTestId('css');
      const jsNode = getByTestId('javascript-basics');

      expect(htmlNode).toHaveClass('Node Node--unlocked');
      expect(cssNode).toHaveClass('Node Node--locked');
      expect(jsNode).toHaveClass('Node Node--locked');

      fireEvent.click(htmlNode);

      expect(htmlNode).toHaveClass('Node Node--selected');
      expect(cssNode).toHaveClass('Node Node--unlocked');
      expect(jsNode).toHaveClass('Node Node--locked');

      fireEvent.click(cssNode);

      expect(htmlNode).toHaveClass('Node Node--selected');
      expect(cssNode).toHaveClass('Node Node--selected');
      expect(jsNode).toHaveClass('Node Node--unlocked');

      fireEvent.click(htmlNode);

      expect(htmlNode).toHaveClass('Node Node--unlocked');
      expect(cssNode).toHaveClass('Node Node--locked');
      expect(jsNode).toHaveClass('Node Node--locked');
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

      expect(jsNode).toHaveClass('Node Node--locked');

      fireEvent.click(jsNode);

      expect(selectedCount).toHaveTextContent('0');
      expect(jsNode).toHaveClass('Node Node--locked');
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

      expect(htmlNode).toHaveClass('Node Node--unlocked');
      expect(cssNode).toHaveClass('Node Node--locked');
      expect(jsNode).toHaveClass('Node Node--locked');
    });
  });

  describe('complex data structure', () => {
    it('should render a complex tree', () => {
      const { queryByText, getByTestId } = renderComponent(true);

      expect(queryByText('Frontend')).toBeTruthy();
      expect(queryByText('Backend')).toBeTruthy();

      expect(getByTestId('selected-count')).toHaveTextContent('0');
      expect(getByTestId('total-count')).toHaveTextContent('10');

      expect(getByTestId('languages')).toHaveClass('Node Node--unlocked');
      expect(getByTestId('python')).toHaveClass('Node Node--locked');
      expect(getByTestId('javascript')).toHaveClass('Node Node--locked');
      expect(getByTestId('nodejs')).toHaveClass('Node Node--locked');
      expect(getByTestId('typescript')).toHaveClass('Node Node--locked');
      expect(getByTestId('golang')).toHaveClass('Node Node--locked');
    });

    it('should display the correct states of branched nodes', () => {
      const { getByTestId } = renderComponent(true);

      expect(getByTestId('selected-count')).toHaveTextContent('0');

      const languageNode = getByTestId('languages');
      const jsNode = getByTestId('javascript');
      const tsNode = getByTestId('typescript');
      const nodeNode = getByTestId('nodejs');

      fireEvent.click(languageNode);

      expect(jsNode).toHaveClass('Node Node--unlocked');
      expect(tsNode).toHaveClass('Node Node--locked');
      expect(nodeNode).toHaveClass('Node Node--locked');

      fireEvent.click(jsNode);

      expect(jsNode).toHaveClass('Node Node--selected');
      expect(tsNode).toHaveClass('Node Node--unlocked');
      expect(nodeNode).toHaveClass('Node Node--unlocked');

      fireEvent.click(tsNode);

      expect(jsNode).toHaveClass('Node Node--selected');
      expect(tsNode).toHaveClass('Node Node--selected');
      expect(nodeNode).toHaveClass('Node Node--unlocked');

      fireEvent.click(jsNode);

      expect(jsNode).toHaveClass('Node Node--unlocked');
      expect(tsNode).toHaveClass('Node Node--locked');
      expect(nodeNode).toHaveClass('Node Node--locked');
    });
  });
});
