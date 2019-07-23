const mockTheme = {
  backgroundColor: 'grey',
  border: '2px solid white',
  borderRadius: '4px',
  primaryFont: `comic-sans`,
  primaryFontColor: 'white',
  tree: {
    backgroundColor: 'red',
  },
  heading: {
    font: 'comic-sans',
  },
  node: {
    backgroundColor: 'grey',
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
    iconNodeWidth: '1000px',
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
    border: '1px solid black',
  },
};

export default mockTheme;
