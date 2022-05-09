// Dependencies
import got from 'got';

// Internals
import canUseWebP from './can-use-webp';

type GetVimeoPosterUrlProps = {
  videoId: string;
  customThumbnail?: string;
  poster?: string;
};

async function getVimeoPosterUrl({
  videoId,
  customThumbnail,
  poster,
}: GetVimeoPosterUrlProps) {
  if (typeof customThumbnail === 'string') {
    return customThumbnail;
  }

  const data = await got
    .get(`https://vimeo.com/api/oembed.json?url=https%3A//vimeo.com/${videoId}`)
    .json();

  const thumbnailUrl = (data as any).thumbnail_url || '';

  // Replace the current size with the poster variable
  // i.e https://i.vimeocdn.com/video/554912674-5b4fc6c5c9041034676a60ecf1cc987c8a79e35ddb4352782efaa7f1cf96f107-d_295x166
  return `${thumbnailUrl.replace(/\d+x\d+/, poster)}.${
    canUseWebP() ? 'webp' : 'jpg'
  }`;
}

export type { GetVimeoPosterUrlProps };
export default getVimeoPosterUrl;
