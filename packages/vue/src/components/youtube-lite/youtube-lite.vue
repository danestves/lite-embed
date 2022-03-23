<script setup lang="ts">
// Dependencies
import {
  addPrefetch,
  getYouTubeId,
  getYoutubePlayerOptions,
} from "@lite-embed/utils";
import { ref } from "vue";
import type * as Youtube from "youtube-player/dist/types";
import type { PropType } from "vue";

// Internals
import { AspectRatio, AspectRatioItem } from "../aspect-ratio";
import YoutubeIcon from "../icons/youtube-icon.vue";
import type { PosterQuality } from "@/types";

let props = defineProps({
  urlOrId: {
    type: String,
    required: true,
  },
  adNetwork: {
    type: Boolean,
    default: false,
    required: false,
  },
  aspectRatio: {
    type: [Number, String],
    default: 16 / 9,
    validator(value: number | string) {
      return !isNaN(parseFloat(value as string));
    },
    required: false,
  },
  customThumbnail: {
    type: String,
    required: false,
  },
  noCookie: {
    type: Boolean,
    default: false,
    required: false,
  },
  playerParameters: {
    type: Object as PropType<Youtube.Options["playerVars"]>,
    default: () => ({}),
    required: false,
  },
  playlist: {
    type: Boolean,
    default: false,
    required: false,
  },
  poster: {
    type: String as PropType<PosterQuality>,
    default: "hqdefault",
    required: false,
  },
  title: {
    type: String,
    default: "Vue YouTube Lite",
    required: false,
  },
});

let preconnected = ref(false);
let iframe = ref(false);

let videoId = decodeURIComponent(getYouTubeId(props.urlOrId));
let posterUrl = props.customThumbnail
  ? props.customThumbnail
  : `https://i.ytimg.com/vi/${videoId}/${props.poster}.jpg`;
let youtubeUrl = props.noCookie
  ? "https://www.youtube-nocookie.com"
  : "https://www.youtube.com";
let youtubeVideoUrl = !props.playlist
  ? `${youtubeUrl}/embed/${videoId}`
  : `${youtubeUrl}/embed/videoseries`;
let iframeSrc = getYoutubePlayerOptions({
  url: youtubeVideoUrl,
  videoId: videoId,
  isPlaylist: props.playlist,
  ...props.playerParameters,
});

const warmConnections = () => {
  if (preconnected.value) return;

  // The iframe document and the majority of its subresources are all taken directly from youtube.com.
  addPrefetch("preconnect", "https://www.youtube-nocookie.com");
  // The botguard script can be found on google.com.
  addPrefetch("preconnect", "https://www.google.com");

  // These ad-related domains may or may not be on the critical path. Domain-specific throttling could be used to confirm.
  if (props.adNetwork) {
    addPrefetch("preconnect", "https://googleads.g.doubleclick.net");
    addPrefetch("preconnect", "https://static.doubleclick.net");
  }

  preconnected.value = true;
};

const addIframe = () => {
  if (iframe.value) return;

  iframe.value = true;
};
</script>

<template>
  <aspect-ratio
    :aspect-ratio="aspectRatio"
    v-on:pointerover="warmConnections"
    v-on:click="addIframe"
  >
    <aspect-ratio-item :background-image="`url(${posterUrl})`">
      <iframe
        v-if="iframe"
        data-le="iframe"
        :title="$props.title"
        :src="iframeSrc"
      ></iframe>
      <youtube-icon v-else data-le="icon" />
    </aspect-ratio-item>
  </aspect-ratio>
</template>

<style scoped>
[data-le="iframe"] {
  border: 0;
  height: 100%;
  width: 100%;
}

[data-le="icon"] {
  box-sizing: border-box;
  color: #212121;
  height: auto;
  left: 50%;
  opacity: 0.8;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  width: 68px;
  z-index: 1;
}

[data-le="aspect-ratio"]:hover [data-le="icon"] {
  color: #f00;
  opacity: 1;
}
</style>
