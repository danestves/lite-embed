<script setup lang="ts">
// Dependencies
import {
  getYouTubeId,
  getYoutubePlayerOptions,
  warmYoutubeConnections,
} from '@lite-embed/utils';
import { ref } from 'vue';
import type * as Youtube from 'youtube-player/dist/types';
import type { PropType } from 'vue';

// Internals
import { AspectRatio, AspectRatioItem } from '../aspect-ratio';
import YoutubeIcon from '../icons/youtube-icon.vue';
import type { PosterQuality } from '@/types';

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
      if (typeof value === 'number') {
        return !isNaN(value);
      }

      return !isNaN(parseFloat(value));
    },
    required: false,
  },
  customThumbnail: {
    type: String,
    default: '',
    required: false,
  },
  noCookie: {
    type: Boolean,
    default: true,
    required: false,
  },
  playerParameters: {
    type: Object as PropType<Youtube.Options['playerVars']>,
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
    default: 'hqdefault',
    required: false,
  },
  title: {
    type: String,
    default: 'Vue YouTube Lite',
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
  ? 'https://www.youtube-nocookie.com'
  : 'https://www.youtube.com';
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
  return warmYoutubeConnections({
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
</script>

<template>
  <aspect-ratio
    :aspect-ratio="aspectRatio"
    data-testid
    @click="addIframe"
    @pointerover="warmConnections"
  >
    <aspect-ratio-item :background-image="`url(${posterUrl})`">
      <iframe
        v-if="iframe"
        :title="$props.title"
        :src="iframeSrc"
        data-le="iframe"
        data-testid="le-yt-iframe"
      ></iframe>
      <button
        v-else
        class="le-yt-button"
        data-testid="le-yt-button"
        type="button"
      >
        <youtube-icon class="le-yt-icon" />
      </button>
    </aspect-ratio-item>
  </aspect-ratio>
</template>

<style scoped>
[data-le='aspect-ratio-item']::before {
  content: '';
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAADGCAYAAAAT+OqFAAAAdklEQVQoz42QQQ7AIAgEF/T/D+kbq/RWAlnQyyazA4aoAB4FsBSA/bFjuF1EOL7VbrIrBuusmrt4ZZORfb6ehbWdnRHEIiITaEUKa5EJqUakRSaEYBJSCY2dEstQY7AuxahwXFrvZmWl2rh4JZ07z9dLtesfNj5q0FU3A5ObbwAAAABJRU5ErkJggg==');
  background-repeat: repeat-x;
  background-position: top;
  box-sizing: content-box;
  display: block;
  height: 60px;
  padding-bottom: 50px;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: all 0.25s cubic-bezier(0, 0, 0.2, 1);
  width: 100%;
  z-index: 25;
}

[data-le='iframe'] {
  border: 0;
  height: 100%;
  width: 100%;
}

.le-yt-button {
  appearance: none;
  border: 0;
  box-sizing: border-box;
  height: auto;
  left: 50%;
  margin: 0;
  outline: none;
  padding: 0;
  position: absolute;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  width: 68px;
  z-index: 1;
}

.le-yt-icon {
  box-sizing: border-box;
  color: #212121;
  height: auto;
  opacity: 0.8;
  transition: all 0.2s cubic-bezier(0, 0, 0.2, 1);
  width: 68px;
}

[data-le='aspect-ratio']:hover .le-yt-icon {
  color: #f00;
  opacity: 1;
}
</style>
