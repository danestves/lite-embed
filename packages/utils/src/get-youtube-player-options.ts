// Dependencies
import type * as Youtube from "youtube-player/dist/types";

type YoutubeOptions = {
  isPlaylist?: boolean;
  url: string;
  videoId: string;
  opts?: Youtube.Options["playerVars"];
};

function getYoutubePlayerOptions({
  url,
  videoId,
  isPlaylist,
  opts,
}: YoutubeOptions) {
  let options: Youtube.Options["playerVars"] = {
    ...(!isPlaylist
      ? {
          autoplay: 1,
        }
      : {
          list: videoId,
        }),
    ...opts,
  };
  // @ts-ignore: we can use numbers on the values
  let params = new URLSearchParams(options);

  return `${url}?${params.toString()}`;
}

export type { YoutubeOptions };
export default getYoutubePlayerOptions;
