const defaultTheme = {
  backgroundColor: '#282c34',
  border: '2px solid white',
  borderRadius: '4px',
  primaryFont: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
  primaryFontColor: 'white',
  node: {
    backgroundColor: '#282c34',
    overlayColor: 'white',
    activeBackgroundColor: `linear-gradient(
      to right,
      #d0e6a5 0%,
      #86e3ce 50%,
      #ccabd8 100%
    )`,
    borderColor: `linear-gradient(
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
    hoverBorder: '4px solid',
  },
  edge: {
    border: '1px solid white',
  },
};

export default defaultTheme;
