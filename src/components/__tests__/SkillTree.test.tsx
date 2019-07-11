import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import SkillTree from '../SkillTree';
import MockLocalStorage from '../__mocks__/mockLocalStorage';
import uuid4 from 'uuid/v4';

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
];

function renderComponent(id: string) {
  return render(
    <SkillTree id={id} title="borderlands" data={mockSkillTreeData} />
  );
}

describe('SkillTree', () => {
  let currentId: string;

  beforeEach(() => {
    currentId = uuid4();

    const defaultStoreContents = {
      [`skills-${currentId}`]: JSON.stringify({}),
    };

    // @ts-ignore
    window.localStorage = new MockLocalStorage(defaultStoreContents);
  });

  afterEach(cleanup);

  it('renders the correct number of Nodes', () => {
    const { queryAllByTestId } = renderComponent(currentId);

    expect(queryAllByTestId(/item-/).length).toBe(3);
  });

  it('should activate the first style on click', async () => {
    const { getByTestId } = renderComponent(currentId);

    const topNode = getByTestId('item-one');

    fireEvent.click(topNode);

    expect(topNode).toHaveClass('Node Node--selected');
  });

  it('should deactivate the first style on secondclick', async () => {
    const id = uuid4();
    currentId = id;

    const { getByTestId } = renderComponent(id);

    const topNode = getByTestId('item-one');

    fireEvent.click(topNode);

    expect(topNode).toHaveClass('Node Node--selected');

    fireEvent.click(topNode);

    expect(topNode).toHaveClass('Node');
    expect(topNode).not.toHaveClass('Node Node--selected');
  });

  it('should successfully selected all nodes when clicked in succession', async () => {
    const id = uuid4();
    currentId = id;

    const { getByTestId } = renderComponent(id);

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
    const id = uuid4();
    currentId = id;

    const { getByTestId } = renderComponent(id);

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

    window.localStorage.setItem(
      `skills-${currentId}`,
      JSON.stringify(defaultSkills)
    );

    const { getByTestId } = renderComponent(currentId);

    const topNode = getByTestId('item-one');
    const middleNode = getByTestId('item-two');
    const bottomNode = getByTestId('item-three');

    expect(topNode).toHaveClass('Node Node--selected');
    expect(middleNode).toHaveClass('Node Node--unlocked');
    expect(bottomNode).toHaveClass('Node Node--locked');
  });
});
