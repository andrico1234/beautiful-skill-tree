import React, { useContext } from 'react';
import SkillTreeGroupContext from '../context/SkillTreeGroupContext';
import { SkillProvider } from '../context/SkillContext';

interface Props {
  children: (skillCount: number) => React.ReactNode;
}

function SkillTreeGroup(props: Props) {
  const { skillCount } = useContext(SkillTreeGroupContext);

  return (
    <SkillProvider appId="calisthenics-skills" storage={localStorage}>
      <div className="SkillTreeGroup">{props.children(skillCount)}</div>
    </SkillProvider>
  );
}

export default SkillTreeGroup;
