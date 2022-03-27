// Dependencies
import * as React from "react";
import {
  getYouTubeId,
  getYoutubePlayerOptions,
  warmYoutubeConnections,
} from "@lite-embed/utils";

// Internals
import {
  StyledAspectRatio,
  StyledButton,
  StyledIframe,
  StyledYouTubeIcon,
} from "./youtube-lite.styles";
import type { YouTubeLiteProps } from "@/types";

function RenderYouTubeLite(
  {
    urlOrId,
    adNetwork,
    aspectRatio = 16 / 9,
    css,
    customThumbnail,
    iframeProps,
    noCookie = true,
    playerParameters,
    playlist,
    poster = "hqdefault",
    title,
    ...props
  }: YouTubeLiteProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  let [preconnected, setPreconnected] = React.useState(false);
  let [iframe, setIframe] = React.useState(false);

  let videoId = encodeURIComponent(getYouTubeId(urlOrId));
  let posterUrl =
    typeof customThumbnail === "string"
      ? customThumbnail
      : `https://i.ytimg.com/vi/${videoId}/${poster}.jpg`;
  let youtubeUrl = noCookie
    ? "https://www.youtube-nocookie.com"
    : "https://www.youtube.com";
  let iframeSrc = !playlist
    ? `${youtubeUrl}/embed/${videoId}`
    : `${youtubeUrl}/embed/videoseries`;

  const warmConnections = () => {
    return warmYoutubeConnections({
      preconnected,
      setPreconnected,
      adNetwork,
    });
  };

  const addIframe = () => {
    if (iframe) return;

    setIframe(true);
  };

  return (
    <StyledAspectRatio
      css={{
        backgroundImage: `url(${posterUrl})`,
        ...css,
      }}
      onPointerOver={warmConnections}
      onClick={addIframe}
      data-title={title}
      ref={ref}
      ratio={aspectRatio}
      {...props}
    >
      {iframe ? (
        <StyledIframe
          width={560}
          height={315}
          title={title}
          src={getYoutubePlayerOptions({
            url: iframeSrc,
            videoId,
            isPlaylist: playlist,
            ...playerParameters,
          })}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          data-testid="youtube-lite-iframe"
          {...iframeProps}
        ></StyledIframe>
      ) : (
        <StyledButton
          type="button"
          data-testid="youtube-lite-button"
          aria-label="Play"
        >
          <StyledYouTubeIcon />
        </StyledButton>
      )}
    </StyledAspectRatio>
  );
}

const YouTubeLite = React.forwardRef(RenderYouTubeLite);

export default YouTubeLite;
