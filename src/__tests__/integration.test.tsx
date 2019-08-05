import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SkillTreeGroup, SkillProvider, SkillTree, SkillType } from '../index';
import defaultTheme, { SkillTheme } from '../theme';
import mockTheme from '../__mocks__/mockTheme';
import MockLocalStorage from '../__mocks__/mockLocalStorage';

const simpleData: SkillType[] = [
  {
    id: 'html',
    title: 'html',
    tooltip: {
      content: 'the method of structuring websites',
    },
    icon: '../',
    children: [
      {
        id: 'css',
        title: 'css',
        tooltip: {
          content:
            "Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk.",
        },
        children: [
          {
            id: 'javascript-basics',
            title: 'javascript basics',
            tooltip: {
              content: 'adding interactivity',
            },
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
    tooltip: {
      content: 'used as the building blocks for creating amazing projects',
    },

    icon: '../',
    children: [
      {
        id: 'python',
        title: 'python',
        tooltip: {
          content: 'used as the building blocks for creating amazing projects',
        },
        children: [],
      },
      {
        id: 'javascript',
        title: 'javascript',
        tooltip: {
          content: 'used as the building blocks for creating amazing projects',
        },
        children: [
          {
            id: 'typescript',
            title: 'typescript',
            tooltip: {
              content:
                'used as the building blocks for creating amazing projects',
            },
            children: [],
          },
          {
            id: 'nodejs',
            title: 'nodejs',
            tooltip: {
              content:
                'used as the building blocks for creating amazing projects',
            },
            children: [],
          },
        ],
      },
      {
        id: 'golang',
        title: 'golang',
        tooltip: {
          content: 'used as the building blocks for creating amazing projects',
        },
        children: [],
      },
    ],
  },
  {
    id: 'paradigms',
    title: 'OOP',
    tooltip: {
      content: 'used as the building blocks for creating amazing projects',
    },
    children: [],
  },
];

const optionalNodeData: SkillType[] = [
  {
    id: 'html-req',
    title: 'html',
    tooltip: {
      content: 'the method of structuring websites',
    },
    icon: '../',
    children: [
      {
        id: 'css-opt',
        title: 'css',
        optional: true,
        tooltip: {
          content:
            "Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk.",
        },
        children: [
          {
            id: 'javascript-basics-req',
            title: 'javascript basics',
            tooltip: {
              content: 'adding interactivity',
            },
            children: [],
          },
        ],
      },
    ],
  },
];

function renderComponent(
  secondarySkillTree: SkillType[],
  theme: Partial<SkillTheme> = defaultTheme
) {
  const skillTreeTheme = { ...defaultTheme, ...theme };

  return render(
    <SkillProvider>
      <SkillTreeGroup theme={skillTreeTheme}>
        {({ skillCount, selectedSkillCount, resetSkills }: SkillTreeGroup) => {
          const totalSkillCount = skillCount.required + skillCount.optional;
          const totalSelectedSkillCount =
            selectedSkillCount.optional + selectedSkillCount.required;
          return (
            <React.Fragment>
              <h2 className="Example__heading">
                Completed skills:
                <span data-testid="selected-count">
                  {totalSelectedSkillCount}
                </span>
                /<span data-testid="total-count">{totalSkillCount}</span>
                <button data-testid="reset-button" onClick={resetSkills}>
                  Reset
                </button>
              </h2>
              <SkillTree treeId="fe" title="Frontend" data={simpleData} />
              <SkillTree
                treeId="be"
                title="Backend"
                data={secondarySkillTree}
              />
            </React.Fragment>
          );
        }}
      </SkillTreeGroup>
    </SkillProvider>
  );
}

afterEach(() => {
  window.localStorage.setItem('skills-be', JSON.stringify({}));
  window.localStorage.setItem('skills-fe', JSON.stringify({}));
});

beforeAll(() => {
  //@ts-ignore
  window.localStorage = new MockLocalStorage();
});

describe('SkillTreeGroup component', () => {
  describe('simple data structure', () => {
    it('should render a simple tree', () => {
      const { queryByText, getByTestId } = renderComponent([]);

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
      const { getByTestId } = renderComponent([]);

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
      const { getByTestId } = renderComponent([]);

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
      const { getByTestId } = renderComponent([]);

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
      const { getByTestId } = renderComponent([]);

      const jsNode = getByTestId('javascript-basics');
      const selectedCount = getByTestId('selected-count');

      expect(selectedCount).toHaveTextContent('0');

      expect(jsNode).toHaveStyleRule('opacity', '0.65');

      fireEvent.click(jsNode);

      expect(selectedCount).toHaveTextContent('0');
      expect(jsNode).toHaveStyleRule('opacity', '0.65');
    });

    it('should reset the counter when the top node is selected', () => {
      const { getByTestId } = renderComponent([]);

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
      const { getByTestId } = renderComponent([]);

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
      const { queryByText, getByTestId } = renderComponent(complexData);

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

    it('should correctly handle optional nodes', () => {
      const { getByTestId } = renderComponent(optionalNodeData);

      const htmlNode = getByTestId('html-req');
      const cssNode = getByTestId('css-opt');
      const jsNode = getByTestId('javascript-basics-req');

      fireEvent.click(htmlNode);

      expect(htmlNode).toHaveStyleRule('background', /linear-gradient/);
      expect(cssNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );
      expect(jsNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );

      fireEvent.click(jsNode);

      expect(htmlNode).toHaveStyleRule('background', /linear-gradient/);
      expect(cssNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );
      expect(jsNode).toHaveStyleRule('background', /linear-gradient/);
    });

    it('should display the correct states of branched nodes', () => {
      const { getByTestId } = renderComponent(complexData);

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
      const { getByTestId } = renderComponent([], mockTheme);
      const htmlNode = getByTestId('html');

      expect(htmlNode).toHaveStyleRule('background', 'grey');
    });
  });
});
