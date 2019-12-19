const defaultTheme = {
  backgroundColor: 'transparent',
  border: '2px solid white',
  borderRadius: '4px',
  primaryFont: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
  primaryFontColor: 'white',
  treeBackgroundColor: '#282c34',
  headingFont: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
  headingFontColor: 'white',
  headingFontSize: '24px',
  headingHoverColor: '#35373b',
  headingHoverColorTransition: 'background 0.3s ease-out',
  tooltipBackgroundColor: 'white',
  tooltipFontColor: '#16181c',
  tooltipZIndex: 99999,
  nodeBackgroundColor: '#282c34',
  nodeBorderColor: 'white',
  nodeAlternativeFontColor: 'white',
  nodeAltenativeActiveFontColor: 'white',
  nodeOverlayColor: 'white',
  nodeAlternativeActiveBackgroundColor: `
  linear-gradient(
    to right,
    #b9e562 0%,
    #41e2bd 50%,
    #c284d8 100%
  )`,
  nodeActiveBackgroundColor: `linear-gradient(
      to right,
      #b9e562 0%,
      #41e2bd 50%,
      #c284d8 100%
    )`,
  nodeHoverBorder: '4px solid',
  nodeHoverBorderColor: `linear-gradient(
      to right,
      #b9e562 0%,
      #41e2bd 50%,
      #c284d8 100%
    )`,
  nodeIconWidth: '64px',
  nodeMobileTextNodeHeight: '32px',
  nodeMobileTextNodeWidth: '108px',
  nodeMobileFontSize: '14px',
  nodeDesktopTextNodeHeight: '28px',
  nodeDesktopTextNodeWidth: '144px',
  nodeDesktopFontSize: '16px',
  edgeBorder: '1px solid white',
};

export type SkillTheme = typeof defaultTheme;

export default defaultTheme;
