import React from 'react';
import TooltipContent from './TooltipContent';
import styled from 'styled-components';
import Tippy from '@tippy.js/react';
import { Tooltip } from '../../models';
import MobileContext from '../../context/MobileContext';

import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/shift-away.css';

interface Props {
  children: React.ReactElement;
  title: string;
  tooltip: Tooltip;
}

function Tooltip(props: Props) {
  const { children, tooltip, title } = props;
  const { direction = 'top', content } = tooltip;
  const { isMobile } = React.useContext(MobileContext);

  return (
    <StyledTippy
      interactive
      placement={isMobile ? 'top' : direction}
      hideOnClick={false}
      animation="shift-away"
      arrow={false}
      appendTo={document.body}
      touch="hold"
      content={<TooltipContent content={content} title={title} />}
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
