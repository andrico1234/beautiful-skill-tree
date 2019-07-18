import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import SkillTree from '../SkillTree';
import MockLocalStorage from '../__mocks__/mockLocalStorage';
import { SkillProvider } from '../../context/AppContext';
import SkillTreeGroup from '../../components/SkillTreeGroup';
import { SkillTreeProvider } from '../../context/SkillContext';

const mockSkillTreeData = [
  {
    id: 'item-one',
    icon: './222',
    tooltipDescription:
      "Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk.",
    title: 'Phasewalker',
    children: [
      {
        id: 'item-two',
        icon: './222',
        tooltipDescription:
          "Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk.",
        title: 'Phasewalker',
        children: [
          {
            id: 'item-three',
            tooltipDescription:
              "Lilith's Action Skill is Phasewalk, which allows her to turn invisible and increase her running speed. Upon entering and exiting Phasewalk, Lilith releases a Phase Blast that damages enemies around her. While in Phasewalk, Lilith cannot shoot, jump, or collect loot, and a melee attack will cause her to exit Phasewalk.",
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
    tooltipDescription: 'second tree',
    title: 'hasewaler÷',
    children: [],
  },
];

const defaultStoreContents = {
  [`skills-test`]: JSON.stringify({}),
};

const storage = new MockLocalStorage(defaultStoreContents);

function renderComponent() {
  let selectedSkillCount: number;
  let resetSkills: VoidFunction;

  const api = render(
    <SkillProvider>
      <SkillTreeGroup>
        {treeData => {
          selectedSkillCount = treeData.selectedSkillCount;
          resetSkills = treeData.resetSkills;
          return (
            <SkillTreeProvider treeId="hey">
              <SkillTree
                treeId="bl"
                title="borderlands"
                data={mockSkillTreeData}
              />
            </SkillTreeProvider>
          );
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

function fireResize(width: number) {
  // @ts-ignore
  window.innerWidth = width;
  window.dispatchEvent(new Event('resize'));
}

afterEach(() => {
  storage.setItem('skills-test', JSON.stringify({}));
});

describe('SkillTree', () => {
  it('creates the correct number of Nodes', () => {
    const { queryAllByTestId } = renderComponent();

    expect(queryAllByTestId(/item-/).length).toBe(4);
  });

  it('on first click should activate the node', () => {
    const { getByTestId, getSelectedSkillCount } = renderComponent();

    const topNode = getByTestId('item-one');

    fireEvent.click(topNode);

    expect(topNode).toHaveClass('Node Node--selected');
    expect(getSelectedSkillCount()).toBe(1);
  });

  it('on second click should deactivate the first style', () => {
    const { getByTestId, getSelectedSkillCount } = renderComponent();

    const topNode = getByTestId('item-one');

    fireEvent.click(topNode);

    expect(topNode).toHaveClass('Node Node--selected');

    fireEvent.click(topNode);

    expect(topNode).toHaveClass('Node');
    expect(topNode).not.toHaveClass('Node Node--selected');

    expect(getSelectedSkillCount()).toBe(0);
  });

  it('on sequential clicks should select all nodes', async () => {
    const { getByTestId, getSelectedSkillCount } = renderComponent();

    const topNode = getByTestId('item-one');
    const middleNode = getByTestId('item-two');
    const bottomNode = getByTestId('item-three');

    fireEvent.click(topNode);

    expect(topNode).toHaveClass('Node Node--selected');

    fireEvent.click(middleNode);

    expect(middleNode).toHaveClass('Node Node--selected');

    fireEvent.click(bottomNode);

    expect(bottomNode).toHaveClass('Node Node--selected');

    expect(getSelectedSkillCount()).toBe(3);
  });

  it('on disabled click no selected a node', () => {
    const { getByTestId, getSelectedSkillCount } = renderComponent();

    const middleNode = getByTestId('item-two');

    fireEvent.click(middleNode);

    expect(middleNode).not.toHaveClass('Node Node--selected');
    expect(middleNode).not.toHaveStyle(`background-color: #f44336`);
    expect(getSelectedSkillCount()).toBe(0);
  });

  it('should load the correct skills that are saved to the store', () => {
    const defaultSkills = {
      'item-one': 'selected',
      'item-two': 'unlocked',
      'item-three': 'locked',
    };

    storage.setItem(`skills-test`, JSON.stringify(defaultSkills));

    const { getByTestId, getSelectedSkillCount } = renderComponent();

    const topNode = getByTestId('item-one');
    const middleNode = getByTestId('item-two');
    const bottomNode = getByTestId('item-three');

    expect(topNode).toHaveClass('Node Node--selected');
    expect(middleNode).toHaveClass('Node Node--unlocked');
    expect(bottomNode).toHaveClass('Node Node--locked');

    expect(getSelectedSkillCount()).toBe(1);
  });

  xit('should deselect all skill trees when resetSkills is invoked', () => {
    const {
      getByTestId,
      getSelectedSkillCount,
      resetSkillsHandler,
    } = renderComponent();

    const topNode = getByTestId('item-one');
    const middleNode = getByTestId('item-two');
    const bottomNode = getByTestId('item-three');

    fireEvent.click(topNode);
    fireEvent.click(middleNode);
    fireEvent.click(bottomNode);

    expect(topNode).toHaveClass('Node Node--selected');
    expect(middleNode).toHaveClass('Node Node--selected');
    expect(bottomNode).toHaveClass('Node Node--selected');

    expect(getSelectedSkillCount()).toBe(3);

    resetSkillsHandler();

    expect(topNode).toHaveClass('Node Node--unlocked');
    expect(middleNode).toHaveClass('Node Node--locked');
    expect(bottomNode).toHaveClass('Node Node--locked');

    expect(getSelectedSkillCount()).toBe(0);
  });

  it('should diplay the separator component on mobile', () => {
    //@ts-ignore
    window.innerWidth = 200;

    const { queryByTestId } = renderComponent();

    expect(queryByTestId('h-separator')).toBeTruthy();
  });

  xit('should correctly handle resizing from desktop to mobile', () => {
    const resizeEvent = document.createEvent('Event');

    // @ts-ignore
    window.innerWidth = 1000;
    resizeEvent.initEvent('resize', false, false);

    const { queryByTestId } = renderComponent();

    expect(queryByTestId('h-separator')).toBeFalsy();

    act(() => {
      fireResize(400);
    });

    expect(queryByTestId('h-separator')).toBeTruthy();
  });
});
