import React, { useContext } from 'react';
import SkillContext from '../context/SkillContext';

export interface TreeData {
  skillCount: number;
  selectedSkillCount: number;
}

interface Props {
  children: (treeData: TreeData) => React.ReactNode;
}

function SkillTreeGroup(props: Props) {
  const { skillCount, selectedSkillCount } = useContext(SkillContext);

  const treeData = {
    skillCount,
    selectedSkillCount,
  };

  return <div className="SkillTreeGroup">{props.children(treeData)}</div>;
}

export default SkillTreeGroup;
