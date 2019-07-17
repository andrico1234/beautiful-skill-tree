import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import CalculateSkillNodes from '../CalculateNodeCount';
import { Skill } from 'models';
import SkillAppContext from '../../context/SkillAppContext';
import { SkillTreeProvider } from '../../context/SkillTreeContext';
import {
  legsPullData,
  legsPushData,
} from '../../components/__mocks__/mockData';

interface GetDummyCounterProps {
  children: (skillCount: number) => JSX.Element;
}

function GetDummyCounter({ children }: GetDummyCounterProps) {
  const { skillCount } = useContext(SkillAppContext);

  return children(skillCount);
}

function renderComponent(data: Skill[]) {
  let counter = 0;

  function getCounter() {
    return counter;
  }

  const api = render(
    <GetDummyCounter>
      {skillCount => {
        counter = skillCount;
        return (
          <SkillTreeProvider treeId="hey">
            <CalculateSkillNodes data={data} />>
          </SkillTreeProvider>
        );
      }}
    </GetDummyCounter>
  );

  return {
    ...api,
    getCounter: getCounter(),
  };
}

describe('CalculateSkillNodes component', () => {
  it('should let the counter remain at 0 when no data is passed through', () => {
    const { getCounter } = renderComponent([]);

    expect(getCounter).toBe(0);
  });

  it('should correctly calculate a single branch tree', async () => {
    const { getCounter, debug } = renderComponent(legsPullData);
    debug();

    expect(getCounter).toBe(6);
  });

  it('should correctly calculate a tree with multiples branches', () => {
    const { getCounter } = renderComponent(legsPushData);

    expect(getCounter).toBe(6);
  });
});
