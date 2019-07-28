import * as React from 'react';
import AppContext from '../context/AppContext';
import styled, { ThemeProvider } from 'styled-components';
import defaultTheme from '../theme/index';
import { DeepPartial } from 'models/utils';
import { SkillGroupData } from '../models';
import { MobileProvider } from '../context/MobileContext';

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

  const skillTreeTheme = { ...defaultTheme, ...theme };

  const treeData = {
    skillCount,
    selectedSkillCount,
    resetSkills,
  };

  return (
    <ThemeProvider theme={skillTreeTheme}>
      <MobileProvider>
        <StyleSkillTreeGroup>{children(treeData)}</StyleSkillTreeGroup>
      </MobileProvider>
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
