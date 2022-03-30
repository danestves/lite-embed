// Internals
import { getThumbnailDimensions } from "../src";

describe("getThumbnailDimensions()", () => {
  it("should return the correct dimensions for a thumbnail", () => {
    let dimensions = getThumbnailDimensions({
      height: 360,
      width: 640,
    });

    expect(dimensions.width).toBe(640);
    expect(dimensions.height).toBe(360);
  });

  it("should return the correct dimensions for a thumbnail with a width that is a multiple of 320", () => {
    let dimensions = getThumbnailDimensions({
      height: 360,
      width: 640,
    });

    expect(dimensions.width).toBe(640);
    expect(dimensions.height).toBe(360);
  });

  it("should return the correct dimensions for a thumbnail with a width that is not a multiple of 320", () => {
    let dimensions = getThumbnailDimensions({
      height: 360,
      width: 641,
    });

    expect(dimensions.width).toBe(700);
    expect(dimensions.height).toBe(393);
  });
});
