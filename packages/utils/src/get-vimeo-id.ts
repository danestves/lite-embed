function getVimeoId(url: string) {
  const arr = url.split(
    /(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/
  );

  return undefined !== arr[5] ? arr[5] : arr[0];
}

export default getVimeoId;
