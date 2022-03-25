<script setup lang="ts">
defineProps({
  backgroundImage: {
    type: String,
    default: "",
    required: true,
  },
});
</script>

<template>
  <div data-le="aspect-ratio-item">
    <slot></slot>
  </div>
</template>

<style scoped>
[data-le="aspect-ratio-item"] {
  background-color: #000;
  background-image: v-bind("backgroundImage");
  background-position: center;
  background-size: cover;
  contain: content;
  cursor: pointer;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
