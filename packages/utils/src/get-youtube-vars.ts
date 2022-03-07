type GetYoutubeVarsProps = {
  isPlaylist?: boolean;
  url: string;
  videoId: string;
  opts?: YT.PlayerVars;
};

function getYoutubeVars({
  url,
  videoId,
  isPlaylist,
  opts,
}: GetYoutubeVarsProps) {
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

export type { GetYoutubeVarsProps };
export default getYoutubeVars;
