// Dependencies
import * as React from 'react';
import {
  getVimeoId,
  getVimeoPlayerOptions,
  getVimeoPosterUrl,
  warmVimeoConnections,
} from '@lite-embed/utils';

// Internals
import {
  StyledAspectRatio,
  StyledButton,
  StyledIframe,
  StyledVimeoIcon,
} from './vimeo-lite.styles';
import type { VimeoLiteProps } from '@/types';

function RenderVimeoLite(
  {
    urlOrId,
    adNetwork,
    aspectRatio = 16 / 9,
    css,
    customThumbnail,
    iframeProps,
    playerParameters,
    poster = '480x360',
    title,
    ...props
  }: VimeoLiteProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [preconnected, setPreconnected] = React.useState(false);
  const [iframe, setIframe] = React.useState(false);
  const [posterUrl, setPosterUrl] = React.useState('');

  const videoId = encodeURIComponent(getVimeoId(urlOrId));
  const iframeSrc = `https://player.vimeo.com/video/${videoId}?h=${Math.random()}`;

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
      data-testid="vimeo-lite-aspect-ratio"
      data-title={title}
      onClick={addIframe}
      onPointerOver={warmConnections}
      ratio={aspectRatio}
      ref={ref}
      {...props}
    >
      {iframe ? (
        <StyledIframe
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          data-testid="le-vi-iframe"
          height={315}
          src={getVimeoPlayerOptions({
            url: iframeSrc,
            adNetwork,
            ...playerParameters,
          })}
          title={title}
          width={560}
          {...iframeProps}
        ></StyledIframe>
      ) : (
        <StyledButton
          aria-label="Play"
          data-testid="le-vi-button"
          type="button"
        >
          <StyledVimeoIcon />
        </StyledButton>
      )}
    </StyledAspectRatio>
  );
}

const VimeoLite = React.forwardRef(RenderVimeoLite);

export default VimeoLite;
