import React, { useContext } from 'react';
import SkillContext from '../context/SkillContext';
import styled from 'styled-components';

function SkillCountSubtitle() {
  const { skillCount } = useContext(SkillContext);

  return (
    <StyledSkillCountSubtitle style={{ marginTop: 0, textAlign: 'center' }}>
      {skillCount} skills
    </StyledSkillCountSubtitle>
  );
}

const StyledSkillCountSubtitle = styled.div`
  font-family: ${({ theme }) => theme.headingFont};
  margin-top: 0;
  text-align: center;
`;

export default SkillCountSubtitle;
