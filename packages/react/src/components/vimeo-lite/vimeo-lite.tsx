// Dependencies
import * as React from "react";
import {
  getVimeoId,
  getVimeoPlayerOptions,
  getVimeoPosterUrl,
  warmVimeoConnections,
} from "@lite-embed/utils";

// Internals
import {
  StyledAspectRatio,
  StyledButton,
  StyledIframe,
  StyledVimeoIcon,
} from "./vimeo-lite.styles";
import type { VimeoLiteProps } from "@/types";

function RenderVimeoLite(
  {
    urlOrId,
    adNetwork,
    aspectRatio = 16 / 9,
    css,
    customThumbnail,
    iframeProps,
    playerParameters,
    poster = "480x360",
    title,
    ...props
  }: VimeoLiteProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  let [preconnected, setPreconnected] = React.useState(false);
  let [iframe, setIframe] = React.useState(false);
  let [posterUrl, setPosterUrl] = React.useState("");

  let videoId = encodeURIComponent(getVimeoId(urlOrId));
  let iframeSrc = `https://player.vimeo.com/video/${videoId}?h=${Math.random()}`;

  const warmConnections = () => {
    return warmVimeoConnections({
      preconnected,
      setPreconnected,
      adNetwork,
    });
  };

  const addIframe = () => {
    if (iframe) return;

    setIframe(true);
  };

  React.useEffect(() => {
    getVimeoPosterUrl({
      videoId,
      customThumbnail,
      poster,
    }).then((url) => setPosterUrl(url));
  }, []);

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
      data-testid="vimeo-lite-aspect-ratio"
      {...props}
    >
      {iframe ? (
        <StyledIframe
          width={560}
          height={315}
          title={title}
          src={getVimeoPlayerOptions({
            url: iframeSrc,
            adNetwork,
            ...playerParameters,
          })}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          data-testid="vimeo-lite-iframe"
          {...iframeProps}
        ></StyledIframe>
      ) : (
        <StyledButton
          type="button"
          aria-label="Play"
          data-testid="vimeo-lite-button"
        >
          <StyledVimeoIcon />
        </StyledButton>
      )}
    </StyledAspectRatio>
  );
}

const VimeoLite = React.forwardRef(RenderVimeoLite);

export default VimeoLite;
