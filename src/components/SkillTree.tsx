import React, { useContext, useState } from 'react';
import { Skill, SavedDataType, ContextStorage } from '../models';
import SkillTreeSegment from './SkillTreeSegment';
import HSeparator from './ui/HSeparator';
import CalculateNodeCount from './CalculateNodeCount';
import { SkillTreeProvider } from '../context/SkillContext';
import styled, { BaseThemedCssFunction } from 'styled-components';
import MobileContext from '../context/MobileContext';
import SkillCountSubtitle from './SkillCountSubtitle';

const css: BaseThemedCssFunction<any> = require('styled-components').css;

export interface Props {
  treeId: string;
  data: Skill[];
  title: string;
  collapsible?: boolean;
  savedData?: SavedDataType;
  handleSave?: (
    storage: ContextStorage,
    treeId: string,
    skills: SavedDataType
  ) => void;
}

interface CollapsibleContainerProps {
  isCollapsible: boolean;
}

interface HeaderCaretProps {
  isCollapsible: boolean;
  isVisible: boolean;
}

interface VisibilityContainerProps {
  isVisible: boolean;
}

const defaultParentPosition = {
  center: 0,
};

function SkillTree({
  data,
  title,
  treeId,
  savedData,
  handleSave,
  collapsible = false,
}: Props) {
  const { isMobile } = useContext(MobileContext);
  const [isVisible, setVisibility] = useState(true);

  function toggleVisibility() {
    if (!collapsible) return;

    return setVisibility(!isVisible);
  }

  return (
    <SkillTreeProvider
      treeId={treeId}
      savedData={savedData}
      handleSave={handleSave}
    >
      <CalculateNodeCount data={data} />
      <SkillTreeContainer>
        <SkillTreeHeader
          tabIndex={0}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.keyCode === 13) {
              toggleVisibility();
            }
          }}
          onClick={toggleVisibility}
          isCollapsible={collapsible}
        >
          <div style={{ position: 'relative' }}>
            <HeaderCaret isCollapsible={collapsible} isVisible={isVisible}>
              ▲
            </HeaderCaret>
            <SkillTreeTitle id={treeId}>{title}</SkillTreeTitle>
          </div>
          <SkillCountSubtitle />
        </SkillTreeHeader>
        <VisibilityContainer
          data-testid="visibility-container"
          isVisible={isVisible}
        >
          <StyledSkillTree isCollapsible={collapsible}>
            {data.map((skill, i) => {
              const displaySeparator = data.length - 1 !== i && isMobile;

              return (
                <React.Fragment key={skill.id}>
                  <SkillTreeSegment
                    parentHasMultipleChildren={false}
                    shouldBeUnlocked={true}
                    parentPosition={defaultParentPosition}
                    hasParent={false}
                    skill={skill}
                  />
                  <HSeparator display={displaySeparator} />
                </React.Fragment>
              );
            })}
          </StyledSkillTree>
        </VisibilityContainer>
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

const SkillTreeHeader = styled.div<CollapsibleContainerProps>`
  ${({ isCollapsible }) =>
    isCollapsible &&
    css`
      background: ${({ theme }) => theme.treeBackgroundColor};
      border: ${({ theme }) => theme.border};
      border-radius: ${({ theme }) => theme.borderRadius};
      cursor: pointer;
      min-width: 300px;
      user-select: none;
    `}
`;

const HeaderCaret = styled.span<HeaderCaretProps>`
  display: ${({ isCollapsible }) => (isCollapsible ? 'inline' : 'none')};
  font-family: ${({ theme }) => theme.headingFont};
  font-size: 1.5em;
  left: 8px;
  position: absolute;
  transform: rotate(90deg);
  transition: 0.15s transform ease-out;

  ${({ isVisible }) =>
    isVisible &&
    css`
      transform: rotate(180deg);
    `}
`;

const SkillTreeTitle = styled.h2`
  font-family: ${({ theme }) => theme.headingFont};
  margin-bottom: 0;
  min-width: 152px;
  text-align: center;
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

const VisibilityContainer = styled.div<VisibilityContainerProps>`
  transition: transform 0.15s ease-out, opacity 0.15s ease-out,
    max-height 0.15s ease-out;
  height: auto;
  max-height: 10000px;
  opacity: 1;
  overflow: hidden;
  transform: scaleY(1);
  transform-origin: top;

  ${({ isVisible }) =>
    !isVisible &&
    css`
      transform: scaleY(0);
      max-height: 0;
      opacity: 0;
    `}
`;
