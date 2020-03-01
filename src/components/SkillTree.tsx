import React, { useState, useCallback } from 'react';
import {
  Skill,
  SavedDataType,
  ContextStorage,
  NodeSelectEvent,
} from '../models';
import SkillTreeSegment from './SkillTreeSegment';
import HSeparator from './ui/HSeparator';
import VisibilityContainer from './VisibilityContainer';
import CalculateNodeCount from './CalculateNodeCount';
import { SkillTreeProvider } from '../context/SkillContext';
import styled from 'styled-components';
import SkillTreeHeader from './SkillTreeHeader';
import AddToFilterIndex from './filter/AddToFilterIndex';
import FilterListener from './filter/FilterListener';
import useMobile from '../hooks/useMobile';

export interface Props {
  treeId: string;
  data: Skill[];
  title: string;
  description?: string;
  collapsible?: boolean;
  closedByDefault?: boolean;
  savedData?: SavedDataType;
  handleSave?: (
    storage: ContextStorage,
    treeId: string,
    skills: SavedDataType
  ) => void;
  handleNodeSelect?: (e: NodeSelectEvent) => void;
}

interface CollapsibleContainerProps {
  isCollapsible: boolean;
}

function SkillTree({
  data,
  title,
  description,
  closedByDefault,
  treeId,
  savedData,
  handleSave,
  handleNodeSelect,
  collapsible = false,
}: Props) {
  const isMobile = useMobile();
  const [isVisible, setVisibility] = useState(!closedByDefault ? true : false);

  const memoizedToggleVisibility = useCallback(
    function toggleVisibility() {
      if (!collapsible) return;

      return setVisibility(!isVisible);
    },
    [isVisible]
  );

  return (
    <React.Fragment>
      <AddToFilterIndex treeId={treeId} skills={data} />
      <FilterListener
        isVisible={isVisible}
        setVisibility={setVisibility}
        treeId={treeId}
      />
      <SkillTreeProvider
        treeId={treeId}
        savedData={savedData}
        handleSave={handleSave}
        sendNodeSelectDataToClient={handleNodeSelect}
      >
        <CalculateNodeCount data={data} />
        <SkillTreeContainer>
          <SkillTreeHeader
            isVisible={isVisible}
            handleClick={memoizedToggleVisibility}
            collapsible={collapsible}
            id={treeId}
            description={description}
            title={title}
          />
          <VisibilityContainer isVisible={isVisible}>
            <StyledSkillTree isCollapsible={collapsible}>
              {data.map((skill, i) => {
                const displaySeparator = data.length - 1 !== i && isMobile;

                return (
                  <React.Fragment key={skill.id}>
                    <SkillTreeSegment
                      shouldBeUnlocked
                      skill={skill}
                      hasParent={false}
                      parentPosition={0}
                      parentHasMultipleChildren={false}
                    />
                    <HSeparator display={displaySeparator} />
                  </React.Fragment>
                );
              })}
            </StyledSkillTree>
          </VisibilityContainer>
        </SkillTreeContainer>
      </SkillTreeProvider>
    </React.Fragment>
  );
}

export default SkillTree;

const SkillTreeContainer = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  margin: 0 8px 48px;
  min-width: 304px;

  @media (min-width: 900px) {
    margin: 0 8px 16px;
    padding: 16px;
  }
`;

const StyledSkillTree = styled.div<CollapsibleContainerProps>`
  background: ${({ theme }) => theme.treeBackgroundColor};
  border: ${({ theme }) => theme.border};
  border-top: ${({ isCollapsible }) => (isCollapsible ? '0' : 'auto')};
  border-radius: ${({ theme }) => theme.borderRadius};
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;
