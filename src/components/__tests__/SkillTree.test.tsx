import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SkillTree from '../SkillTree';
import MockLocalStorage from '../__mocks__/mockLocalStorage';
import { SkillProvider } from '../../context/SkillContext';

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

// @ts-ignore
const storage = new MockLocalStorage(defaultStoreContents);

function renderComponent() {
  return render(
    <SkillProvider appId="test" storage={storage}>
      <SkillTree title="borderlands" data={mockSkillTreeData} />
    </SkillProvider>
  );
}

describe('SkillTree', () => {
  afterEach(() => {
    storage.setItem('skills-test', JSON.stringify({}));
    return cleanup();
  });

  it('renders the correct number of Nodes', () => {
    const { queryAllByTestId } = renderComponent();

    expect(queryAllByTestId(/item-/).length).toBe(4);
  });

  it('should activate the first style on click', async () => {
    const { getByTestId } = renderComponent();

    const topNode = getByTestId('item-one');

    fireEvent.click(topNode);

    expect(topNode).toHaveClass('Node Node--selected');
  });

  it('should deactivate the first style on secondclick', async () => {
    const { getByTestId } = renderComponent();

    const topNode = getByTestId('item-one');

    fireEvent.click(topNode);

    expect(topNode).toHaveClass('Node Node--selected');

    fireEvent.click(topNode);

    expect(topNode).toHaveClass('Node');
    expect(topNode).not.toHaveClass('Node Node--selected');
  });

  it('should successfully selected all nodes when clicked in succession', async () => {
    const { getByTestId } = renderComponent();

    const topNode = getByTestId('item-one');
    const middleNode = getByTestId('item-two');
    const bottomNode = getByTestId('item-three');

    fireEvent.click(topNode);

    expect(topNode).toHaveClass('Node Node--selected');

    fireEvent.click(middleNode);

    expect(middleNode).toHaveClass('Node Node--selected');

    fireEvent.click(bottomNode);

    expect(bottomNode).toHaveClass('Node Node--selected');
  });

  it('should not select a node whose dependencies are not selected', async () => {
    const { getByTestId } = renderComponent();

    const middleNode = getByTestId('item-two');

    fireEvent.click(middleNode);

    expect(middleNode).not.toHaveClass('Node Node--selected');
    expect(middleNode).not.toHaveStyle(`background-color: #f44336`);
  });

  it('should load the correct skills that are saved to localstorage', () => {
    const defaultSkills = {
      'item-one': 'selected',
      'item-two': 'unlocked',
      'item-three': 'locked',
    };

    storage.setItem(`skills-test`, JSON.stringify(defaultSkills));

    const { getByTestId } = renderComponent();

    const topNode = getByTestId('item-one');
    const middleNode = getByTestId('item-two');
    const bottomNode = getByTestId('item-three');

    expect(topNode).toHaveClass('Node Node--selected');
    expect(middleNode).toHaveClass('Node Node--unlocked');
    expect(bottomNode).toHaveClass('Node Node--locked');
  });

  it('should diplay the separator component on mobile', () => {
    //@ts-ignore
    window.innerWidth = 200;

    const { queryByTestId } = renderComponent();

    expect(queryByTestId('h-separator')).toBeTruthy();
  });
});
