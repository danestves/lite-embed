// Internals
import addPrefetch from "./add-prefetch";
import type { WarmConnectionsProps } from "./types";

function warmYoutubeConnections({
  preconnected,
  setPreconnected,
  adNetwork,
}: WarmConnectionsProps) {
  if (preconnected) return;

  // The iframe document and the majority of its subresources are all taken directly from youtube.com.
  addPrefetch("preconnect", "https://www.youtube-nocookie.com");
  // The botguard script can be found on google.com.
  addPrefetch("preconnect", "https://www.google.com");

  // These ad-related domains may or may not be on the critical path. Domain-specific throttling could be used to confirm.
  if (adNetwork) {
    addPrefetch("preconnect", "https://googleads.g.doubleclick.net");
    addPrefetch("preconnect", "https://static.doubleclick.net");
  }

  setPreconnected(true);
}

export default warmYoutubeConnections;
