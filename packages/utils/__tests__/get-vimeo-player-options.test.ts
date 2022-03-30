// Internals
import { getVimeoPlayerOptions } from "../src";

describe("getVimeoPlayerOptions()", () => {
  it("should return the correct url given a set of options", () => {
    let url = getVimeoPlayerOptions({
      url: "https://player.vimeo.com/video/67019023",
      autoplay: true,
      color: "#ff0000",
      controls: true,
      loop: true,
      muted: true,
      playsinline: true,
      title: true,
      width: 640,
      height: 360,
    });

    expect(url).toBe(
      "https://player.vimeo.com/video/67019023?url=https%3A%2F%2Fplayer.vimeo.com%2Fvideo%2F67019023&autoplay=true&dnt=true&color=%23ff0000&controls=true&loop=true&muted=true&playsinline=true&title=true&width=640&height=360"
    );
  });
});
