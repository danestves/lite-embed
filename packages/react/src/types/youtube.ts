// Dependencies
import type * as Stitches from "@stitches/react";
import type * as React from "react";
import type * as Youtube from "youtube-player/dist/types";

// Internals
import type { IframeProps } from ".";

export type YoutubePosterQuality =
  | "maxresdefault"
  | "0"
  | "1"
  | "2"
  | "3"
  | "default"
  | "hqdefault"
  | "mqdefault"
  | "sddefault";

export interface YouTubeLiteProps
  extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * This can be either an url to a video or a video ID.
   */
  urlOrId: string;
  /**
   * Preconnect or not doubleclick ads, this is the adnetwork from Google.
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
   * If you use GDPR and don't want YouTube cookies enable this option
   *
   * @default false
   */
  noCookie?: boolean;
  /**
   * By appending parameters to the IFrame URL, you can customize the playback experience in your application.
   * For example, you can automatically play videos using the [`autoplay`](https://developers.google.com/youtube/player_parameters#autoplay)
   * parameter or cause a video to play repeatedly using the [`loop`](https://developers.google.com/youtube/player_parameters#loop) parameter.
   * You can also use the [`enablejsapi`](https://developers.google.com/youtube/player_parameters#enablejsapi) parameter to enable the player
   * to be controlled via the [IFrame Player API](https://developers.google.com/youtube/iframe_api_reference).
   *
   * List of available parameters:
   * https://developers.google.com/youtube/player_parameters#Parameters
   */
  playerParameters?: Youtube.Options["playerVars"];
  /**
   * If the video URL contains a playlist or not
   *
   * @default false
   */
  playlist?: boolean;
  /**
   * The different quality to show the poster
   * see: https://developers.google.com/youtube/v3/docs/thumbnails
   * for more information
   *
   * @default "hqdefault"
   */
  poster?: YoutubePosterQuality;
  /**
   * The `data-title` to insert in the `iframe`
   *
   * @default "React YouTube Lite"
   */
  title?: string;
}
