// Internals
import { getVimeoPosterUrl } from "../src";

describe("getVimeoPosterUrl()", () => {
  it("should return the correct vimeo poster url for a video id", async () => {
    let url = await getVimeoPosterUrl({
      videoId: "148751763",
      poster: "480x360",
    });

    expect(url).toBe(
      "https://i.vimeocdn.com/video/547780029-f88d4f8479438491f8fdc617ce106c5345b39101aa4efc23bd336993f706e8ec-d_480x360.jpg"
    );
  });

  it("should return a custom thumbnail url", async () => {
    let thumbnail =
      "https://i.vimeocdn.com/video/547780029-f88d4f8479438491f8fdc617ce106c5345b39101aa4efc23bd336993f706e8ec-d_1280x720.jpg";
    let url = await getVimeoPosterUrl({
      videoId: "148751763",
      customThumbnail: thumbnail,
    });

    expect(url).toBe(thumbnail);
  });
});
