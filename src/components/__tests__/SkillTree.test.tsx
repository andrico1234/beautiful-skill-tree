import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import SkillTree, { Props } from '../SkillTree';
import MockLocalStorage from '../../__mocks__/mockLocalStorage';
import SkillProvider from '../../components/SkillProvider';
import SkillTreeGroup from '../../components/SkillTreeGroup';
import { Skill, SkillCount } from '../../models/index';
import { SavedDataType } from '../../';

const mockSkillTreeData: Skill[] = [
  {
    id: 'item-one',
    icon: './222',
    tooltip: {
      content:
        "Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk.",
    },
    title: 'Phasewalker',
    children: [
      {
        id: 'item-two',
        tooltip: {
          content:
            "Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk.",
        },
        icon: './222',
        title: 'Phasewalker',
        children: [
          {
            id: 'item-three',
            optional: true,
            tooltip: {
              content:
                "Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk.",
            },
            title: 'Phasewalker',
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: 'item-four',
    icon: './222',
    tooltip: {
      content: 'second tree',
    },
    title: 'hasewaler÷',
    children: [],
  },
];

const mockSavedData: SavedDataType = {
  'item-one': {
    optional: false,
    nodeState: 'selected',
  },
  'item-two': {
    optional: false,
    nodeState: 'unlocked',
  },
  'item-three': {
    optional: true,
    nodeState: 'locked',
  },
  'item-four': {
    optional: false,
    nodeState: 'unlocked',
  },
};

const defaultStoreContents = {
  [`skills-bl`]: JSON.stringify({}),
};

function renderComponent(props: Props) {
  let selectedSkillCount: SkillCount;
  let resetSkills: VoidFunction;

  const api = render(
    <SkillProvider>
      <SkillTreeGroup>
        {treeData => {
          selectedSkillCount = treeData.selectedSkillCount;
          resetSkills = treeData.resetSkills;
          return <SkillTree {...props} />;
        }}
      </SkillTreeGroup>
    </SkillProvider>
  );

  return {
    ...api,
    resetSkillsHandler() {
      act(() => {
        resetSkills();
      });
    },
    getSelectedSkillCount() {
      return selectedSkillCount;
    },
  };
}

afterEach(() => {
  window.localStorage.setItem('skills-bl', JSON.stringify({}));
});

beforeEach(() => {
  //@ts-ignore
  window.localStorage = new MockLocalStorage(defaultStoreContents);
});

const defaultProps = {
  treeId: 'bl',
  title: 'borderlands',
  data: mockSkillTreeData,
};

describe('SkillTree', () => {
  it('creates the correct number of Nodes', () => {
    const { queryAllByTestId } = renderComponent(defaultProps);

    expect(queryAllByTestId(/item-/).length).toBe(4);
  });

  it('on first click should activate the node', () => {
    const { getByTestId, getSelectedSkillCount } = renderComponent(
      defaultProps
    );

    const topNode = getByTestId('item-one');

    fireEvent.click(topNode);

    expect(topNode).toHaveStyleRule('background', /linear-gradient/);
    expect(getSelectedSkillCount()).toEqual({
      optional: 0,
      required: 1,
    });
  });

  it('on second click should deactivate the first style', () => {
    const { getByTestId, getSelectedSkillCount } = renderComponent(
      defaultProps
    );

    const topNode = getByTestId('item-one');

    fireEvent.click(topNode);

    expect(topNode).toHaveStyleRule('background', /linear-gradient/);

    fireEvent.click(topNode);

    expect(topNode).toHaveStyleRule('background', '#282c34');
    expect(topNode).not.toHaveStyleRule('background', /linear-gradient/);

    expect(getSelectedSkillCount()).toEqual({
      optional: 0,
      required: 0,
    });
  });

  it('should fire the custom clickHandler', () => {
    const handleNodeSelect = jest.fn();

    const { getByTestId } = renderComponent({
      ...defaultProps,
      handleNodeSelect,
    });

    const topNode = getByTestId('item-one');

    fireEvent.click(topNode);

    expect(handleNodeSelect).toHaveBeenCalledWith({
      key: 'item-one',
      state: 'selected',
    });

    fireEvent.click(topNode);

    expect(handleNodeSelect).toHaveBeenCalledWith({
      key: 'item-one',
      state: 'unlocked',
    });
  });

  it('on sequential clicks should select all nodes', async () => {
    const { getByTestId, getSelectedSkillCount } = renderComponent(
      defaultProps
    );

    const topNode = getByTestId('item-one');
    const middleNode = getByTestId('item-two');
    const bottomNode = getByTestId('item-three');

    fireEvent.click(topNode);

    expect(topNode).toHaveStyleRule('background', /linear-gradient/);

    fireEvent.click(middleNode);

    expect(middleNode).toHaveStyleRule('background', /linear-gradient/);

    fireEvent.click(bottomNode);

    expect(bottomNode).toHaveStyleRule('background', /linear-gradient/);

    expect(getSelectedSkillCount()).toEqual({
      optional: 1,
      required: 2,
    });
  });

  it('on disabled click no selected a node', () => {
    const { getByTestId, getSelectedSkillCount } = renderComponent(
      defaultProps
    );

    const middleNode = getByTestId('item-two');

    fireEvent.click(middleNode);

    expect(middleNode).not.toHaveStyleRule('background', /linear-gradient/);
    expect(middleNode).not.toHaveStyleRule('background-color', '#f44336');
    expect(getSelectedSkillCount()).toEqual({
      optional: 0,
      required: 0,
    });
  });

  it('should deselect all skill trees when resetSkills is invoked', () => {
    const {
      getByTestId,
      getSelectedSkillCount,
      resetSkillsHandler,
    } = renderComponent(defaultProps);

    const topNode = getByTestId('item-one');
    const middleNode = getByTestId('item-two');
    const bottomNode = getByTestId('item-three');

    fireEvent.click(topNode);
    fireEvent.click(middleNode);
    fireEvent.click(bottomNode);

    expect(topNode).toHaveStyleRule('background', /linear-gradient/);
    expect(middleNode).toHaveStyleRule('background', /linear-gradient/);
    expect(bottomNode).toHaveStyleRule('background', /linear-gradient/);

    expect(getSelectedSkillCount()).toEqual({
      optional: 1,
      required: 2,
    });

    resetSkillsHandler();

    expect(getSelectedSkillCount()).toEqual({
      optional: 0,
      required: 0,
    });
  });

  it('should diplay the separator component on mobile', () => {
    //@ts-ignore
    window.innerWidth = 200;

    const { queryByTestId } = renderComponent(defaultProps);

    expect(queryByTestId('h-separator')).toBeTruthy();
  });

  describe('saving and loading', () => {
    it('should load the correct skills that are saved to the store', () => {
      const defaultSkills = {
        'item-one': {
          nodeState: 'selected',
          optional: false,
        },
        'item-two': {
          nodeState: 'unlocked',
          optional: false,
        },
        'item-three': {
          nodeState: 'locked',
          optional: false,
        },
      };

      window.localStorage.setItem(`skills-bl`, JSON.stringify(defaultSkills));

      const { getByTestId, getSelectedSkillCount } = renderComponent(
        defaultProps
      );

      const topNode = getByTestId('item-one');
      const middleNode = getByTestId('item-two');
      const bottomNode = getByTestId('item-three');

      expect(topNode).toHaveStyleRule('background', /linear-gradient/);
      expect(middleNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );
      expect(bottomNode).toHaveStyleRule('opacity', '0.65');

      expect(getSelectedSkillCount()).toEqual({
        optional: 0,
        required: 1,
      });
    });

    it('should save the current data with the custom save hanlder', () => {
      const handleSave = jest.fn();

      const customSavingProps = {
        ...defaultProps,
        savedData: mockSavedData,
        handleSave,
      };

      const mockDataToSave = {
        ...mockSavedData,
        'item-one': {
          optional: false,
          nodeState: 'unlocked',
        },
        'item-two': {
          optional: false,
          nodeState: 'locked',
        },
      };

      const { getByTestId } = renderComponent(customSavingProps);

      fireEvent.click(getByTestId('item-one'));

      expect(handleSave).toHaveBeenCalledWith(
        window.localStorage,
        'bl',
        mockDataToSave
      );
    });

    it('should correctly load the custom saved data', () => {
      const customSavingProps = {
        ...defaultProps,
        savedData: mockSavedData,
      };

      const { getByTestId } = renderComponent(customSavingProps);

      const topNode = getByTestId('item-one');
      const middleNode = getByTestId('item-two');
      const bottomNode = getByTestId('item-three');
      const loneNode = getByTestId('item-four');

      expect(topNode).toHaveStyleRule('background', /linear-gradient/);
      expect(middleNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );
      expect(bottomNode).toHaveStyleRule('opacity', '0.65');
      expect(loneNode).toHaveStyleRule(
        'box-shadow',
        '0 0 6px 0 rgba(255,255,255,0.5)'
      );
    });
  });

  describe('collapsing', () => {
    it('should hide and show a collapsible tree on header click', () => {
      const props = {
        ...defaultProps,
        collapsible: true,
      };

      const { getByText, getByTestId, queryByText } = renderComponent(props);

      fireEvent.click(getByText('borderlands'));

      expect(queryByText('▲')).toHaveStyle('display: inline;');
      expect(getByTestId('visibility-container')).toHaveStyle('opacity: 0;');

      fireEvent.click(getByText('borderlands'));

      expect(getByTestId('visibility-container')).toHaveStyle('opacity: 1;');
    });

    it('should not cause a non-collapsible tree to react on header click', () => {
      const { getByText, getByTestId, queryByText } = renderComponent(
        defaultProps
      );

      fireEvent.click(getByText('borderlands'));

      expect(queryByText('▲')).toHaveStyle('display: none;');
      expect(getByTestId('visibility-container')).toHaveStyle('opacity: 1;');
    });
  });

  describe('Keyboard Accessibility', () => {
    it('can collapse the skill tree using the keyboard', () => {
      const props = {
        ...defaultProps,
        collapsible: true,
      };

      const { getByText, getByTestId } = renderComponent(props);

      fireEvent.keyDown(getByText('borderlands'), {
        keyCode: 13,
      });

      expect(getByTestId('visibility-container')).toHaveStyle('opacity: 0;');

      fireEvent.click(getByText('borderlands'));

      expect(getByTestId('visibility-container')).toHaveStyle('opacity: 1;');
    });

    it("won't collapse the skill tree when a different key is pressed", () => {
      const props = {
        ...defaultProps,
        collapsible: true,
      };

      const { getByText, getByTestId } = renderComponent(props);

      fireEvent.keyDown(getByText('borderlands'), {
        keyCode: 14,
      });

      expect(getByTestId('visibility-container')).toHaveStyle('opacity: 1;');
    });
  });

  describe('resizing', () => {
    function fireResize(width: number) {
      // @ts-ignore
      window.innerWidth = width;
      window.dispatchEvent(new Event('resize'));
    }

    it('should handle resizing from desktop to mobile', () => {
      const resizeEvent = document.createEvent('Event');

      // @ts-ignore
      window.innerWidth = 1300;
      resizeEvent.initEvent('resize', true, true);

      const { queryByTestId } = renderComponent(defaultProps);

      expect(queryByTestId('h-separator')).toBeFalsy();

      act(() => {
        fireResize(400);
      });

      expect(queryByTestId('h-separator')).toBeTruthy();
    });
  });
});
