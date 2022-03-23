// Dependencies
import * as React from "react";
import {
  addPrefetch,
  canUseWebP,
  getVimeoId,
  getVimeoPlayerOptions,
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
    if (preconnected) return;

    // The iframe document and most of its subresources come right off player.vimeo.com
    addPrefetch("preconnect", "https://player.vimeo.com");
    // Images come right off i.vimeocdn.com
    addPrefetch("preconnect", "https://i.vimeocdn.com");
    // CSS and JS come right off f.vimeo.com
    addPrefetch("preconnect", "https://f.vimeocdn.com");

    if (adNetwork) {
      // Metrics for the videos
      addPrefetch("preconnect", "https://fresnel.vimeocdn.com");
    }

    setPreconnected(true);
  };

  const addIframe = () => {
    if (iframe) return;

    setIframe(true);
  };

  React.useEffect(() => {
    const getPosterUrl = async () => {
      if (typeof customThumbnail === "string") {
        return customThumbnail;
      }

      let result = await fetch(
        `https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${videoId}`
      ).then((res) => res.json());

      let thumbnailUrl = result?.thumbnail_url || "";

      // Replace the current size with the poster variable
      // i.e https://i.vimeocdn.com/video/554912674-5b4fc6c5c9041034676a60ecf1cc987c8a79e35ddb4352782efaa7f1cf96f107-d_295x166
      return `${thumbnailUrl.replace(/\d+x\d+/, poster)}.${
        canUseWebP() ? "webp" : "jpg"
      }`;
    };

    getPosterUrl().then((url) => setPosterUrl(url));
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
          {...iframeProps}
        ></StyledIframe>
      ) : (
        <StyledButton type="button" aria-label="Play">
          <StyledVimeoIcon />
        </StyledButton>
      )}
    </StyledAspectRatio>
  );
}

const VimeoLite = React.forwardRef(RenderVimeoLite);

export default VimeoLite;
