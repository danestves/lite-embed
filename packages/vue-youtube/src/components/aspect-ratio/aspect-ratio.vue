<template>
  <div data-lt="aspect-ratio">
    <slot></slot>
  </div>
</template>

<style scoped>
[data-lt="aspect-ratio"] {
  position: relative;
  padding-bottom: calc(100% / (var(--aspect-ratio, 16 / 9)));
  width: 100%;
}
</style>
