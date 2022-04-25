function getYouTubeId(url: string) {
  const arr = url.split(
    /(youtu.*be.*)\/(watch\?v=|embed\/|v|shorts|)(.*?((?=[&#?])|$))/gm
  );

  return undefined !== arr[3] ? arr[3] : arr[0];
}

export default getYouTubeId;
