// Internals
import { getYouTubeId } from "../src";

describe("getYouTubeId()", () => {
  it("should return the correct youtube id given an array of youtube urls", () => {
    let urls = [
      "https://www.youtube.com/v/dQw4w9WgXcQ?fs=1&amp;hl=en_US&amp;rel=0",
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ#t=0m10s",
      "https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0",
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      "https://youtu.be/dQw4w9WgXcQ",
      "https://youtube.com/shorts/dQw4w9WgXcQ?feature=share",
      "https://youtube.com/shorts/dQw4w9WgXcQ",
    ];

    let id = "dQw4w9WgXcQ";

    urls.forEach((url) => {
      expect(getYouTubeId(url)).toBe(id);
    });
  });
});
