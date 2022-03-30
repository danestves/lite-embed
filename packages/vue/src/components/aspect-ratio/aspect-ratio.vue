<script setup lang="ts">
defineProps({
  aspectRatio: {
    type: [Number, String],
    default: 16 / 9,
    validator(value: number | string) {
      if (typeof value === "number") {
        return !isNaN(value);
      }

      return !isNaN(parseFloat(value));
    },
    required: false,
  },
});
</script>

<template>
  <div data-le="aspect-ratio">
    <slot></slot>
  </div>
</template>

<style scoped>
[data-le="aspect-ratio"] {
  position: relative;
  padding-bottom: calc(100% / (v-bind("aspectRatio")));
  width: 100%;
}
</style>
