// Internals
import { getYoutubePlayerOptions } from "../src";

describe("getYoutubePlayerOptions()", () => {
  it("should return the correct url given a set of options", () => {
    let url = getYoutubePlayerOptions({
      url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      videoId: "dQw4w9WgXcQ",
      opts: {
        autoplay: 1,
        controls: 1,
        loop: 1,
        modestbranding: 1,
        playsinline: 1,
        rel: 1,
      },
    });

    expect(url).toBe(
      "https://www.youtube.com/watch?v=dQw4w9WgXcQ?autoplay=1&controls=1&loop=1&modestbranding=1&playsinline=1&rel=1"
    );
  });
});
