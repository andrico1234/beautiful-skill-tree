import React, { useContext } from 'react';
import SkillTreeGroupContext from '../context/SkillTreeGroupContext';

interface Props {
  children: (skillCount: number) => React.ReactNode;
}

function SkillTreeGroup(props: Props) {
  const { skillCount } = useContext(SkillTreeGroupContext);
  return <div className="SkillTreeGroup">{props.children(skillCount)}</div>;
}

export default SkillTreeGroup;
