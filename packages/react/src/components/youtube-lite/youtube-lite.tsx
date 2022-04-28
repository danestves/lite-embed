// Dependencies
import * as React from 'react';
import {
  getYouTubeId,
  getYoutubePlayerOptions,
  warmYoutubeConnections,
} from '@lite-embed/utils';

// Internals
import {
  StyledAspectRatio,
  StyledButton,
  StyledIframe,
  StyledYouTubeIcon,
} from './youtube-lite.styles';
import type { YouTubeLiteProps } from '@/types';

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
    poster = 'hqdefault',
    title,
    ...props
  }: YouTubeLiteProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  const [preconnected, setPreconnected] = React.useState(false);
  const [iframe, setIframe] = React.useState(false);

  const videoId = encodeURIComponent(getYouTubeId(urlOrId));
  const posterUrl =
    typeof customThumbnail === 'string'
      ? customThumbnail
      : `https://i.ytimg.com/vi/${videoId}/${poster}.jpg`;
  const youtubeUrl = noCookie
    ? 'https://www.youtube-nocookie.com'
    : 'https://www.youtube.com';
  const iframeSrc = !playlist
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
        '&::before': { content: iframe ? 'none' : '""' },
      }}
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
          data-testid="le-yt-iframe"
          height={315}
          src={getYoutubePlayerOptions({
            url: iframeSrc,
            videoId,
            isPlaylist: playlist,
            ...playerParameters,
          })}
          title={title}
          width={560}
          {...iframeProps}
        ></StyledIframe>
      ) : (
        <StyledButton
          aria-label="Play"
          data-testid="le-yt-button"
          type="button"
        >
          <StyledYouTubeIcon />
        </StyledButton>
      )}
    </StyledAspectRatio>
  );
}

const YouTubeLite = React.forwardRef(RenderYouTubeLite);

export default YouTubeLite;
