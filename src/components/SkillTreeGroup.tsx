import * as React from 'react';
import AppContext from '../context/AppContext';
import styled, { ThemeProvider } from 'styled-components';
import defaultTheme from '../theme/index';

export interface TreeData {
  skillCount: number;
  selectedSkillCount: number;
  resetSkills: VoidFunction;
}

type Props = {
  children: (treeData: TreeData) => React.ReactNode;
} & typeof defaultProps;

const defaultProps = {
  theme: defaultTheme,
};

function SkillTreeGroup({ theme, children }: Props) {
  const { skillCount, selectedSkillCount, resetSkills } = React.useContext(
    AppContext
  );

  const treeData = {
    skillCount,
    selectedSkillCount,
    resetSkills,
  };

  return (
    <ThemeProvider theme={theme}>
      <StyleSkillTreeGroup>{children(treeData)}</StyleSkillTreeGroup>
    </ThemeProvider>
  );
}

SkillTreeGroup.defaultProps = defaultProps;

export default SkillTreeGroup;

const StyleSkillTreeGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: ${({ theme }) => theme.primaryFont};
  color: ${({ theme }) => theme.primaryFontColor};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  justify-content: center;
  margin: 0 0 48px;
  min-width: fit-content;
}

@media (min-width: 900px) {
  .SkillTreeGroup {
    flex-wrap: nowrap;
  }
`;
