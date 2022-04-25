// Dependencies
import type * as Stitches from '@stitches/react';
import type * as React from 'react';
import type * as Vimeo from 'vimeo__player';

// Internals
import type { IframeProps } from '.';

export type VimeoPosterQuality =
  | '120x90'
  | '480x360'
  | '320x180'
  | '640x480'
  | '1280x720'
  | string;

export interface VimeoLiteProps extends React.ComponentPropsWithoutRef<'div'> {
  /**
   * This can be either an url to a video or a video ID.
   */
  urlOrId: string;
  /**
   * Preconnect or not ads, this is the adnetwork from Vimeo.
   *
   * @default false
   */
  adNetwork?: boolean;
  /**
   * The aspect ratio of the video.
   *
   * @default 16/9
   */
  aspectRatio?: number;
  /**
   * It’s like the style attribute, but it supports tokens, media queries, nesting and token-aware values.
   */
  css?: Stitches.CSS;
  /**
   * A custom thumbnail image url to show instead of the original youtube thumbnail
   *
   * @default false
   */
  customThumbnail?: string;
  /**
   * Properties of the iframe element.
   */
  iframeProps?: IframeProps;
  /**
   * List of available parameters:
   * https://developer.vimeo.com/player/sdk/embed
   */
  playerParameters?: Omit<Vimeo.Options, 'id' | 'url'>;
  /**
   * The different dimensions of the poster image.
   *
   * @default "480x360"
   */
  poster?: VimeoPosterQuality;
  /**
   * The `data-title` to insert in the `iframe`
   *
   * @default "React Vimeo Lite"
   */
  title?: string;
}
