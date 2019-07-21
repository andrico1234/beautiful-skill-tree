import React, { useContext } from 'react';
import { render } from '@testing-library/react';
import CalculateSkillNodes from '../CalculateNodeCount';
import { Skill } from '../../models';
import AppContext from '../../context/AppContext';
import { SkillTreeProvider } from '../../context/SkillContext';
import { ThemeProvider } from 'styled-components';
import defaultTheme from '../../theme';

interface GetDummyCounterProps {
  children: (skillCount: number) => JSX.Element;
}

function GetDummyCounter({ children }: GetDummyCounterProps) {
  const { skillCount } = useContext(AppContext);

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
          <ThemeProvider theme={defaultTheme}>
            <SkillTreeProvider treeId="hey">
              <CalculateSkillNodes data={data} />>
            </SkillTreeProvider>
          </ThemeProvider>
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
});
