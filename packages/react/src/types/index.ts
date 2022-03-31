// Dependencies
import type * as Stitches from '@stitches/react';

export interface IframeProps extends React.ComponentPropsWithoutRef<'iframe'> {
  /**
   * It’s like the style attribute, but it supports tokens, media queries, nesting and token-aware values.
   */
  css?: Stitches.CSS;
}

export * from './vimeo';
export * from './youtube';
