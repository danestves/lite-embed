type ThumbnailDimensionsProps = {
  height: number;
  width: number;
};

function getThumbnailDimensions({ height, width }: ThumbnailDimensionsProps) {
  let roundedHeight = height;
  let roundedWidth = width;

  // If the original width is a multiple of 320 then we should
  // not round up. This is to keep the native image dimensions
  // so that they match up with the actual frames from the video.
  //
  // For example 640x360, 960x540, 1280x720, 1920x1080
  //
  // Round up to nearest 100 px to improve cacheability at the
  // CDN. For example, any width between 601 pixels and 699
  // pixels will render the thumbnail at 700 pixels width.
  if (roundedWidth % 320 !== 0) {
    roundedWidth = Math.ceil(width / 100) * 100;
    roundedHeight = Math.round((roundedWidth / width) * height);
  }

  return {
    width: roundedWidth,
    height: roundedHeight,
  };
}

export type { ThumbnailDimensionsProps };
export default getThumbnailDimensions;
