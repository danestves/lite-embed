<script setup lang="ts">
// Dependencies
import {
  getVimeoId,
  getVimeoPlayerOptions,
  getVimeoPosterUrl,
  warmVimeoConnections,
} from "@lite-embed/utils";
import { onMounted, ref } from "vue";
import type * as Vimeo from "vimeo__player";
import type { PropType } from "vue";

// Internals
import { AspectRatio, AspectRatioItem } from "../aspect-ratio";
import PlayIcon from "../icons/play-icon.vue";
import type { VimeoPosterQuality } from "@/types";

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
  playerParameters: {
    type: Object as PropType<Omit<Vimeo.Options, "id" | "url">>,
    default: () => ({}),
    required: false,
  },
  poster: {
    type: String as PropType<VimeoPosterQuality>,
    default: "640x480",
    required: false,
  },
  title: {
    type: String,
    default: "Vue Vimeo Lite",
    required: false,
  },
});

let preconnected = ref(false);
let iframe = ref(false);
let posterUrl = ref("");

let videoId = decodeURIComponent(getVimeoId(props.urlOrId));
let vimeoUrl = `https://player.vimeo.com/video/${videoId}?h=${Math.random()}`;
let iframeSrc = getVimeoPlayerOptions({
  url: vimeoUrl,
  adNetwork: props.adNetwork,
  ...props.playerParameters,
});

const warmConnections = () => {
  return warmVimeoConnections({
    preconnected: preconnected.value,
    setPreconnected: (value) => {
      preconnected.value = value;
    },
    adNetwork: props.adNetwork,
  });
};

const addIframe = () => {
  if (iframe.value) return;

  iframe.value = true;
};

onMounted(() => {
  getVimeoPosterUrl({
    videoId,
    customThumbnail: props.customThumbnail,
    poster: props.poster,
  }).then((url) => {
    posterUrl.value = url;
  });
});
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
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        data-testid="le-vi-iframe"
      ></iframe>
      <button
        v-else
        type="button"
        data-le="vimeo-play-button"
        aria-label="Play"
        data-testid="le-vi-button"
      >
        <play-icon data-le="vimeo-play-icon" />
      </button>
    </aspect-ratio-item>
  </aspect-ratio>
</template>

<style scoped>
[data-le="iframe"] {
  border: 0;
  height: 100%;
  width: 100%;
}

[data-le="vimeo-play-button"] {
  appearance: none;
  background-color: rgba(30, 30, 30, 0.9);
  border: 0;
  border-radius: 5px;
  box-sizing: border-box;
  color: #fff;
  height: 40px;
  left: 50%;
  line-height: normal;
  margin: 0;
  padding: 0;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  transition: opacity 250ms ease-out, background-color 40ms, color 40ms;
  vertical-align: baseline;
  width: 65px;
}

[data-le="aspect-ratio"]:hover [data-le="vimeo-play-button"] {
  background-color: #00adef;
}

[data-le="vimeo-play-icon"] {
  box-sizing: border-box;
  height: 20px;
  width: 20px;
}
</style>
