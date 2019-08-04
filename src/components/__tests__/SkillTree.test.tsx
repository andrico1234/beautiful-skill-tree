import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import SkillTree from '../SkillTree';
import MockLocalStorage from '../../__mocks__/mockLocalStorage';
import { SkillProvider } from '../../context/AppContext';
import SkillTreeGroup from '../../components/SkillTreeGroup';
import { Skill, SkillCount, ContextStorage } from '../../models/index';
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

type Props = {
  treeId: string;
  data: Skill[];
  title: string;
  savedData?: SavedDataType;
  handleSave?: (
    storage: ContextStorage,
    treeId: string,
    skills: SavedDataType
  ) => void;
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
      return resetSkills();
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

    expect(topNode).toHaveStyleRule('opacity', '0.65');
    expect(middleNode).toHaveStyleRule('opacity', '0.65');
    expect(bottomNode).toHaveStyleRule('opacity', '0.65');

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

  describe('when custom saving + loading is used', () => {
    it('should correctly load the custom saved data passed through', () => {
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

    it('should correctly save the data using the custom onSave handler', () => {
      const handleSave = jest.fn();

      const customSavingProps = {
        ...defaultProps,
        handleSave,
        savedData: mockSavedData,
      };

      renderComponent(customSavingProps);

      act(() => {
        window.dispatchEvent(new Event('beforeunload'));
      });

      expect(handleSave).toHaveBeenCalledWith(
        window.localStorage,
        'bl',
        mockSavedData
      );
    });
  });

  xdescribe('resizing', () => {
    function fireResize(width: number) {
      // @ts-ignore
      window.innerWidth = width;
      window.dispatchEvent(new Event('resize'));
    }

    it('should handle resizing from desktop to mobile', () => {
      const resizeEvent = document.createEvent('Event');

      // @ts-ignore
      window.innerWidth = 1000;
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
