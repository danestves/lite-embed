// Internals
import addPrefetch from "./add-prefetch";
import type { WarmConnectionsProps } from "./types";

function warmVimeoConnections({
  preconnected,
  setPreconnected,
  adNetwork,
}: WarmConnectionsProps) {
  if (preconnected) return;

  // The iframe document and most of its subresources come right off player.vimeo.com
  addPrefetch("preconnect", "https://player.vimeo.com");
  // Images come right off i.vimeocdn.com
  addPrefetch("preconnect", "https://i.vimeocdn.com");
  // CSS and JS come right off f.vimeo.com
  addPrefetch("preconnect", "https://f.vimeocdn.com");

  if (adNetwork) {
    // Metrics for the videos
    addPrefetch("preconnect", "https://fresnel.vimeocdn.com");
  }

  setPreconnected(true);
}

export default warmVimeoConnections;
