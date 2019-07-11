import React from 'react';

interface Props {
  children: React.ReactNode;
}

function SkillTreeGroup(props: Props) {
  return <div className="SkillTreeGroup">{props.children}</div>;
}

export default SkillTreeGroup;
