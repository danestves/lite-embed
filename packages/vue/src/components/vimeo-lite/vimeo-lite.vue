<script setup lang="ts">
// Dependencies
import {
  getVimeoId,
  getVimeoPlayerOptions,
  getVimeoPosterUrl,
  warmVimeoConnections,
} from '@lite-embed/utils';
import { onMounted, ref } from 'vue';
import type * as Vimeo from 'vimeo__player';
import type { PropType } from 'vue';

// Internals
import { AspectRatio, AspectRatioItem } from '../aspect-ratio';
import PlayIcon from '../icons/play-icon.vue';
import type { VimeoPosterQuality } from '@/types';

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
    default: '',
    required: false,
  },
  playerParameters: {
    type: Object as PropType<Omit<Vimeo.Options, 'id' | 'url'>>,
    default: () => ({}),
    required: false,
  },
  poster: {
    type: String as PropType<VimeoPosterQuality>,
    default: '640x480',
    required: false,
  },
  title: {
    type: String,
    default: 'Vue Vimeo Lite',
    required: false,
  },
});

let preconnected = ref(false);
let iframe = ref(false);
let posterUrl = ref('');

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
    @click="addIframe"
    @pointerover="warmConnections"
  >
    <aspect-ratio-item :background-image="`url(${posterUrl})`">
      <iframe
        v-if="iframe"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class="le-vi-iframe"
        data-testid="le-vi-iframe"
        :src="iframeSrc"
        :title="$props.title"
      ></iframe>
      <button
        v-else
        aria-label="Play"
        class="le-vi-play-button"
        data-testid="le-vi-button"
        type="button"
      >
        <play-icon class="le-vi-play-icon" />
      </button>
    </aspect-ratio-item>
  </aspect-ratio>
</template>

<style scoped>
.le-vi-iframe {
  border: 0;
  height: 100%;
  width: 100%;
}

.le-vi-play-button {
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

.le-aspect-ratio:hover .le-vi-play-button {
  background-color: #00adef;
}

.le-vi-play-icon {
  box-sizing: border-box;
  display: inline-flex;
  height: 20px;
  width: 20px;
}
</style>
