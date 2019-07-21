import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import styled from 'styled-components';

export interface TreeData {
  skillCount: number;
  selectedSkillCount: number;
  resetSkills: VoidFunction;
}

interface Props {
  children: (treeData: TreeData) => React.ReactNode;
}

function SkillTreeGroup(props: Props) {
  const { skillCount, selectedSkillCount, resetSkills } = useContext(
    AppContext
  );

  const treeData = {
    skillCount,
    selectedSkillCount,
    resetSkills,
  };

  return <StyleSkillTreeGroup>{props.children(treeData)}</StyleSkillTreeGroup>;
}

export default SkillTreeGroup;

const StyleSkillTreeGroup = styled.div`
  background-color: #282c34;
  display: flex;
  flex-wrap: wrap;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  color: white;
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
