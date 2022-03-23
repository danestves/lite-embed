type YoutubeOptions = {
  isPlaylist?: boolean;
  url: string;
  videoId: string;
  opts?: YT.PlayerVars;
};

function getYoutubePlayerOptions({
  url,
  videoId,
  isPlaylist,
  opts,
}: YoutubeOptions) {
  let options: YT.PlayerVars = {
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
