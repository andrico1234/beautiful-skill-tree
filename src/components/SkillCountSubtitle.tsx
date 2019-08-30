import React, { useContext } from 'react';
import styled from 'styled-components';
import SkillContext from '../context/SkillContext';

function SkillCountSubtitle() {
  const { skillCount } = useContext(SkillContext);

  return (
    <StyledSkillCountSubtitle>({skillCount} skills)</StyledSkillCountSubtitle>
  );
}

export default SkillCountSubtitle;

const StyledSkillCountSubtitle = styled.p`
  margin: 0;
`;
