// Since this function reads from the navigator, ensure that all invocation
// take place inside of `useEffect`. This is to ensure that compatibility with gatsby,
// or any application rendered server side, is not broken. This is because globals like
// navigator and window aren't available on the server side, so these functions will need
// to be invoked at runtime.
function isIOSDevice() {
  var iDevices = [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod',
  ];

  if (!navigator) false;

  if (!!navigator.platform) {
    while (iDevices.length) {
      if (navigator.platform === iDevices.pop()) {
        return true;
      }
    }
  }

  return false;
}

export default isIOSDevice;
