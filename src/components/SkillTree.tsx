import React, { useState, useEffect } from 'react';
import { throttle } from 'lodash';
import { Skill } from '../models';
import SkillTreeSegment from './SkillTreeSegment';
import HSeparator from './ui/HSeparator';
import CalculateTotalNodes from './CalculateNodeCount';
import { SkillTreeProvider } from '../context/SkillContext';
import styled from 'styled-components';

interface Props {
  treeId: string;
  data: Skill[];
  title: string;
}

const defaultParentPosition = {
  bottom: 0,
  center: 0,
};

function SkillTree({ data, title, treeId }: Props) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    function setState() {
      setIsMobile(window.innerWidth < 900);
    }

    window.addEventListener('resize', throttle(setState, 250));
    setState();

    return function cleanup() {
      window.removeEventListener('resize', throttle(setState, 250));
    };
  }, []);

  return (
    <SkillTreeProvider treeId={treeId}>
      <CalculateTotalNodes data={data} />
      <SkillTreeContainer>
        <SkillTreeTitle>{title}</SkillTreeTitle>
        <StyledSkillTree>
          {data.map((skill, i) => {
            return (
              <React.Fragment key={skill.id}>
                <SkillTreeSegment
                  parentState="unlocked"
                  parentPosition={defaultParentPosition}
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
  margin: 0 8px 48px;
  min-width: fit-content;

  @media (min-width: 900px) {
    margin: 0 8px 16px;
    min-width: initial;
  }
`;

const SkillTreeTitle = styled.h2`
  min-width: 152px;
  text-align: center;

  @media (min-width: 900px) {
    min-height: 56px;
  }
`;

const StyledSkillTree = styled.div`
  border: 1px solid white;
  border-radius: 4px;
  display: flex;
  padding: 16px 0;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 900px) {
    flex-direction: row;
  }
`;
