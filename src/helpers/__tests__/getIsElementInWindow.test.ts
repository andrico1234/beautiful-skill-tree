import { getIsElementInWindow } from '../index';

describe('getIsElementInWindow', () => {
  it("should return true if element is contained within the window's dimensions", () => {
    const result = getIsElementInWindow(100, 50, 49);

    expect(result).toBe(true);
  });

  it("should return false if element is contained outside of the window's dimensions", () => {
    const result = getIsElementInWindow(100, 50, 51);

    expect(result).toBe(false);
  });
});
