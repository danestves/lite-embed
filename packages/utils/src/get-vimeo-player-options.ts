// Dependencies
import { Options } from 'vimeo__player';

interface VimeoOptions extends Omit<Options, 'id' | 'url'> {
  adNetwork?: boolean;
  url: string;
}

function getVimeoPlayerOptions({
  url,
  adNetwork,
  autoplay = true,
  ...opts
}: VimeoOptions) {
  let options: Options = {
    url,
    autoplay,
    dnt: !adNetwork,
    ...opts,
  };
  // @ts-ignore: we can use numbers on the values
  let params = new URLSearchParams(options);

  return `${url}?${params.toString()}`;
}

export type { VimeoOptions };
export default getVimeoPlayerOptions;
