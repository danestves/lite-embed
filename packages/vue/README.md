# `@lite-embed/vue`

Embed a YouTube or Vimeo video in your Vue app

```bash
npm add @lite-embed/vue
# or
yarn add @lite-embed/vue
```

## Usage

```vue
<script setup lang="ts">
// Dependencies
import { VimeoLite, YoutubeLite } from '@lite-embed/vue';
</script>

<template>
  <div>
    <vimeo-lite url-or-id="https://vimeo.com/476064230"></vimeo-lite>
    <!-- or -->
    <vimeo-lite url-or-id="476064230"></vimeo-lite>

    <youtube-lite
      url-or-id="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    ></youtube-lite>
    <!-- or -->
    <youtube-lite url-or-id="dQw4w9WgXcQ"></youtube-lite>
  </div>
</template>
```

For an advanced use, please refer to the [docs](https://lite-embed.vercel.app/docs/vue/installation)
