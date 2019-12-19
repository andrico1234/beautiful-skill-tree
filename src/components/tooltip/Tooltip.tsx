import React, { useContext } from 'react';
import TooltipContent from './TooltipContent';
import styled, { ThemeContext } from 'styled-components';
import Tippy from '@tippy.js/react';
import { Tooltip } from '../../models';
import useMobile from '../../hooks/useMobile';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';
import { SkillTheme } from 'theme';

interface Props {
  children: React.ReactElement;
  title: string;
  tooltip: Tooltip;
}

function Tooltip(props: Props) {
  const { children, tooltip, title } = props;
  const { direction = 'top', content } = tooltip;
  const { tooltipZIndex } = useContext<SkillTheme>(ThemeContext);
  const isMobile = useMobile();

  const placement = React.useMemo(() => (isMobile ? 'top' : direction), [
    isMobile,
    direction,
  ]);

  const memoizedContent = React.useMemo(() => {
    return <TooltipContent content={content} title={title} />;
  }, [content, title]);

  return (
    <StyledTippy
      interactive
      placement={placement}
      hideOnClick={false}
      animation="shift-away"
      arrow={false}
      appendTo={document.body}
      touch="hold"
      zIndex={tooltipZIndex}
      content={memoizedContent}
    >
      {children}
    </StyledTippy>
  );
}

export default Tooltip;

const StyledTippy = styled(Tippy)`
  background-color: ${({ theme }) => theme.treeBackgroundColor};
  border: ${({ theme }) => theme.border};
  border-image-source: ${({ theme }) => theme.nodeHoverBorderColor};
  border-image-slice: 1;
  border-radius: ${({ theme }) => theme.borderRadius};
  padding: 0 8px;
  text-align: left;
  width: 320px;

  .tippy-backdrop {
    background-color: ${({ theme }) => theme.treeBackgroundColor};
  }
`;
