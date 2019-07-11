export function getIsElementInWindow(
  windowHeight: number,
  elTopPosition: number,
  elHeight: number
) {
  if (windowHeight > elTopPosition + elHeight) {
    return true;
  }

  return false;
}

export default {
  getIsElementInWindow,
};
