import React, { useContext } from 'react';
import SkillTreeGroupContext from '../context/SkillTreeGroupContext';

interface Props {
  children: (totalCount: number) => React.ReactNode;
}

function SkillTreeGroup(props: Props) {
  const { totalCount } = useContext(SkillTreeGroupContext);
  return <div className="SkillTreeGroup">{props.children(totalCount)}</div>;
}

export default SkillTreeGroup;
