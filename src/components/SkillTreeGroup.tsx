import React, { useContext } from 'react';
import SkillAppContext from '../context/SkillAppContext';

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
    SkillAppContext
  );

  const treeData = {
    skillCount,
    selectedSkillCount,
    resetSkills,
  };

  return <div className="SkillTreeGroup">{props.children(treeData)}</div>;
}

export default SkillTreeGroup;
