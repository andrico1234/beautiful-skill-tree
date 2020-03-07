import React, { useContext } from 'react';
import SkillContext from '../context/SkillContext';
import styled from 'styled-components';

function SkillCountSubtitle() {
  const { skillCount, selectedCount } = useContext(SkillContext);
  const percentageCompleted = Math.ceil((selectedCount / skillCount) * 100);

  return (
    <StyledSkillCountSubtitle>
      {skillCount} skills | {percentageCompleted}%
    </StyledSkillCountSubtitle>
  );
}

const StyledSkillCountSubtitle = styled.p`
  font-family: ${({ theme }) => theme.headingFont};
  margin-top: 0;
  text-align: center;
`;

export default SkillCountSubtitle;
