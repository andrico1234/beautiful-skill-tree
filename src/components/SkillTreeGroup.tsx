import React, { useContext } from 'react';
import SkillContext from '../context/SkillContext';

interface Props {
  children: (skillCount: number) => React.ReactNode;
}

function SkillTreeGroup(props: Props) {
  const { skillCount } = useContext(SkillContext);

  return <div className="SkillTreeGroup">{props.children(skillCount)}</div>;
}

export default SkillTreeGroup;
