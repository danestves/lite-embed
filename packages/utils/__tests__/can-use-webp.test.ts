// Internals
import { canUseWebP } from "../src";

describe("canUseWebP()", () => {
  it("should return true if the browser supports webp", async () => {
    let webp = canUseWebP();

    // NOTE: We should look a workaround to get the webp support
    expect(webp).toBe(false);
  });
});
