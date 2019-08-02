import React, { useContext } from 'react';
import { Skill, Skills } from '../models';
import SkillTreeSegment from './SkillTreeSegment';
import HSeparator from './ui/HSeparator';
import CalculateTotalNodes from './CalculateNodeCount';
import { SkillTreeProvider } from '../context/SkillContext';
import styled from 'styled-components';
import MobileContext from '../context/MobileContext';

interface Props {
  treeId: string;
  data: Skill[];
  title: string;
  savedData?: Skills;
}

const defaultParentPosition = {
  bottom: 0,
  center: 0,
};

function SkillTree({ data, title, treeId, savedData }: Props) {
  const { isMobile } = useContext(MobileContext);

  return (
    <SkillTreeProvider treeId={treeId} savedData={savedData}>
      <CalculateTotalNodes data={data} />
      <SkillTreeContainer>
        <SkillTreeTitle>{title}</SkillTreeTitle>
        <StyledSkillTree>
          {data.map((skill, i) => {
            return (
              <React.Fragment key={skill.id}>
                <SkillTreeSegment
                  shouldBeUnlocked={true}
                  parentPosition={defaultParentPosition}
                  hasParent={false}
                  skill={skill}
                />
                {data.length - 1 !== i && isMobile && <HSeparator />}
              </React.Fragment>
            );
          })}
        </StyledSkillTree>
      </SkillTreeContainer>
    </SkillTreeProvider>
  );
}

export default SkillTree;

const SkillTreeContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  margin: 0 8px 48px;
  min-width: fit-content;

  @media (min-width: 900px) {
    margin: 0 8px 16px;
    min-width: initial;
    padding: 16px;
  }
`;

const SkillTreeTitle = styled.h2`
  font-family: ${({ theme }) => theme.headingFont};
  min-width: 152px;
  text-align: center;

  @media (min-width: 900px) {
    min-height: 56px;
  }
`;

const StyledSkillTree = styled.div`
  background: ${({ theme }) => theme.treeBackgroundColor};
  border: ${({ theme }) => theme.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  display: flex;
  padding: 16px 0;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;
