import React, { useCallback, useContext } from 'react';
import styled, { BaseThemedCssFunction, ThemeContext } from 'styled-components';
import SkillCountSubtitle from './SkillCountSubtitle';
import { SkillTheme } from '../theme';
import Tippy from '@tippy.js/react';

const css: BaseThemedCssFunction<SkillTheme> = require('styled-components').css;

interface Props {
  handleClick: () => void;
  collapsible: boolean;
  isVisible: boolean;
  id: string;
  title: string;
  description?: string;
}

interface HeaderCaretProps {
  isCollapsible: boolean;
  isVisible: boolean;
}

interface CollapsibleContainerProps {
  isCollapsible: boolean;
}

function SkillTreeHeader(props: Props) {
  const { handleClick, collapsible, isVisible, id, title, description } = props;
  const { tooltipZIndex } = useContext<SkillTheme>(ThemeContext);

  const memoizedHandleKeyDown = useCallback(
    function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
      if (e.keyCode === 13) {
        handleClick();
      }
    },
    [handleClick]
  );

  return (
    <StyledTippy
      zIndex={tooltipZIndex}
      enabled={Boolean(description)}
      content={description || ''}
    >
      <StyledSkillTreeHeader
        tabIndex={0}
        onKeyDown={memoizedHandleKeyDown}
        onClick={handleClick}
        isCollapsible={collapsible}
      >
        <div style={{ position: 'relative' }}>
          <HeaderCaret isCollapsible={collapsible} isVisible={isVisible}>
            ▲
          </HeaderCaret>
          <SkillTreeTitle id={id}>{title}</SkillTreeTitle>
        </div>
        <SkillCountSubtitle />
      </StyledSkillTreeHeader>
    </StyledTippy>
  );
}

export default SkillTreeHeader;

const StyledSkillTreeHeader = styled.div<CollapsibleContainerProps>`
  ${({ isCollapsible }) =>
    isCollapsible &&
    css`
      background: ${({ theme }) => theme.treeBackgroundColor};
      border: ${({ theme }) => theme.border};
      border-radius: ${({ theme }) => theme.borderRadius};
      cursor: pointer;
      min-width: 300px;
      transition: ${({ theme }) => theme.headingHoverColorTransition};
      user-select: none;

      &:hover {
        background: ${({ theme }) => theme.headingHoverColor};
      }
    `}
`;

const HeaderCaret = styled.span<HeaderCaretProps>`
  color: ${({ theme }) => theme.headingFontColor};
  display: ${({ isCollapsible }) => (isCollapsible ? 'inline' : 'none')};
  font-family: ${({ theme }) => theme.headingFont};
  font-size: ${({ theme }) => theme.headingFontSize};
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

const StyledTippy = styled(Tippy)`
  background: ${({ theme }) => theme.tooltipBackgroundColor};
  color: ${({ theme }) => theme.tooltipFontColor};

  &[data-placement^='top'] {
    .tippy-arrow {
      border-top-color: ${({ theme }) => theme.tooltipBackgroundColor};
    }
  }
`;

const SkillTreeTitle = styled.h2`
  font-family: ${({ theme }) => theme.headingFont};
  margin-bottom: 0;
  min-width: 152px;
  text-align: center;
`;
