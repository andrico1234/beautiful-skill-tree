const defaultTheme = {
  backgroundColor: 'transparent',
  border: '2px solid white',
  borderRadius: '4px',
  primaryFont: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
  primaryFontColor: 'white',
  tree: {
    backgroundColor: '#282c34',
  },
  heading: {
    font: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
  },
  node: {
    backgroundColor: '#282c34',
    borderColor: 'white',
    overlayColor: 'white',
    activeBackgroundColor: `linear-gradient(
      to right,
      #d0e6a5 0%,
      #86e3ce 50%,
      #ccabd8 100%
    )`,
    hoverBorder: '4px solid',
    hoverBorderColor: `linear-gradient(
      to right,
      #d0e6a5 0%,
      #86e3ce 50%,
      #ccabd8 100%
    )`,
    iconNodeWidth: '64px',
    mobile: {
      textNodeHeight: '32px',
      textNodeWidth: '108px',
      fontSize: '14px',
    },
    desktop: {
      textNodeHeight: '28px',
      textNodeWidth: '144px',
      fontSize: '16px',
    },
  },
  edge: {
    border: '1px solid white',
  },
};

export const SkillThemeType = typeof defaultTheme;

export default defaultTheme;
