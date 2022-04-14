# `@lite-embed/react`

Embed a YouTube or Vimeo video in your React app

```bash
npm add @lite-embed/react
# or
yarn add @lite-embed/react
```

## Usage

```tsx
// Dependencies
import { Vimeo, YoutubeLite } from '@lite-embed/react';

export default function App() {
  return (
    <>
      <YoutubeLite
        urlOrId="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        // or
        // urlOrId="dQw4w9WgXcQ"
      />

      <VimeoLite
        urlOrId="https://vimeo.com/476064230"
        // or
        // urlOrId="476064230"
      />
    </>
  );
}
```

For an advanced use, please refer to the [docs](https://lite-embed.vercel.app/docs/react/installation)
