import * as React from 'react';
import AppContext from '../context/AppContext';
import styled, { ThemeProvider } from 'styled-components';
import defaultTheme from '../theme/index';
import { DeepPartial } from '../models/utils';
import { SkillGroupData } from '../models';
import FilterContext from '../context/FilterContext';

type Props = {
  children: (treeData: SkillGroupData) => React.ReactNode;
} & DeepPartial<typeof defaultProps>;

const defaultProps = {
  theme: defaultTheme,
};

function SkillTreeGroup({ theme, children }: Props) {
  const { skillCount, selectedSkillCount, resetSkills } = React.useContext(
    AppContext
  );

  const { handleFilter } = React.useContext(FilterContext);
  const skillTreeTheme = React.useMemo(() => ({ ...defaultTheme, ...theme }), [
    theme,
  ]);

  const treeData: SkillGroupData = {
    skillCount,
    selectedSkillCount,
    resetSkills,
    handleFilter,
  };

  return (
    <ThemeProvider theme={skillTreeTheme}>
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
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  justify-content: center;
  margin: 0 0 48px;
  min-width: fit-content;
`;
