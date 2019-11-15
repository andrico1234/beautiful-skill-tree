import React, { useContext } from 'react';
import SkillContext from '../context/SkillContext';

function SkillCountSubtitle() {
  const { skillCount } = useContext(SkillContext);

  return (
    <p style={{ marginTop: 0, textAlign: 'center' }}>{skillCount} skills</p>
  );
}

export default SkillCountSubtitle;
