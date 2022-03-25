// Internals
import canUseWebP from "./can-use-webp";

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
}

export type { GetVimeoPosterUrlProps };
export default getVimeoPosterUrl;
